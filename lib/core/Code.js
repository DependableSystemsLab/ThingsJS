'use strict'
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');
var EventEmitter = require('events').EventEmitter;
var esprima = require('esprima');
var escodegen = require('escodegen');
var pidusage = require('pidusage');
var yaml = require('js-yaml');
var jsBeautify = require('js-beautify').js_beautify;
var chalk = require('chalk');
var Pubsub = require('./Pubsub.js');
var helpers = require('../helpers.js');

var DEBUG = (process.env.DEBUG === 'true');
var WARNING = false;
var HUMAN_FRIENDLY = false;

// These greek letter prefixes are used to prevent conflicting names with user code.
// var LIB_ALIAS = 'λ';
var SCOPE_PREFIX = 'Σ';			// prefix for Scope identifiers
var PROPERTY_PREFIX = 'τ';		// prefix for injected properties
var ANONYMOUS_PREFIX = 'α';		// prefix for anonymous functions

var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';	// Pubsub topic for code status

/* TODO:
 *   - require statements (instrumenting dependencies)
 *   - async callbacks in the event loop other than timers (I/O proxy)
 *   - Object creation scope - when serializing/restoring we need to restore the exact same object.
 *   - Timer optimization
 *   - IPC optimization
 */

/* Static Scope object used during instrumentation.
 *  It is used to keep track of lexical scope of various AST nodes
 */
function StaticScope(func_name, parent){
	this.func_name = func_name;
	this.parent = parent || null;
	this.children = {};
	if (this.parent){
		// this.parent.children[this.uid] = this;
		this.id = func_name;
		// if (HUMAN_FRIENDLY) this.id = func_name;
		// else this.id = (Object.keys(this.parent.children).length).toString();
		this.parent.children[this.id] = this;
	}
	else {
		this.id = SCOPE_PREFIX;
	}

	this.params = [];
	this.hoisted = {};
	this.declared = {};
	// this.funcs = {};

	this.refs = {};		// refs maps identifiers to params, vars, or funcs. We do this to emulate the lexical context of JS.

	this.protects = parent || null;
	// For debug
	this.level = parent ? parent.level+1 : 0;
}
StaticScope.prototype.identifier = function(){
	if (this.parent === null) return this.id;
	else return this.parent.identifier()+'_'+this.id;
}
StaticScope.prototype.initRefs = function(node){
	// First scan the body to find variable and function declarations.
	// JavaScript lexical scoping behaviour if variable, function, param has the same name is thus:
	//   0. if there is a reference in the parent scope, it refers to that.
	//   1. if there is a parameter, the reference first refers to the parameter
	//   2. if there are variable declarations (var foo), the reference refers to the variable
	//   3. if there are hoisted functions, this overwrites the reference
	//   --- upto 3. the references are updated prior to execution. 4. is applied sequentially during runtime
	//   4. if the declared identifier is assigned a value, from that line onwards the reference refers to the variable
	var self = this, body;
	if (node.type === 'Program'){
		body = node.body;
	}
	else if (node.type === 'FunctionDeclaration'){
		body = node.body.body;
		node.params.forEach(function(param){
			// self.params[param.name] = param;
			self.params.push(param.name);

			self.refs[param.name] = param;
		});
	}
	else return;

	body.forEach(function(node, index, body){
		if (node.type === 'VariableDeclaration'){
			node.declarations.forEach(function(declaration){
				self.declared[declaration.id.name] = declaration;
				self.refs[declaration.id.name] = declaration.id.name;
			})
		}
		else if (node.type === 'FunctionDeclaration'){
			self.hoisted[node.id.name] = node;	// node will be replaced with protected ancestor scope during top-down pass
			self.refs[node.id.name] = node.id.name;
		}
	});
}
StaticScope.prototype.findRef = function(raw_name){
	// if (raw_name in this.refs) return this.identifier()+'.refs.'+raw_name;
	if (raw_name in this.refs) return { scope: this, identifier: this.identifier()+'.refs.'+raw_name };
	if (raw_name === this.func_name) return { scope: null, identifier: raw_name+'.'+PROPERTY_PREFIX+'wrapped' };	// If the enclosing function is named, the identifier refers to the function
	if (this.parent !== null) return this.parent.findRef(raw_name);
	else {
		(WARNING && console.log(chalk.red('[WARNING] Could not find scope for ')+raw_name));
		return { scope: null, identifier: raw_name };
	}
}
StaticScope.prototype.protectAncestor = function(ancestor){
	if (ancestor.level < this.level){
		if (!(this.protects) || (this.protects.level < ancestor.level)) this.protects = ancestor;
	}
}

/* Object that wraps a node in the AST produced by esprima used for instrumenting the code
 * @param {StaticScope} scope - The lexical scope that the node belongs to
 * @param {object} node - An AST node
 */
function AstHook(scope, node){
	this.scope = scope;
	this.node = node;

	(DEBUG && this.debug(chalk.green('top-down')));
	if (this.node.type in AstHook.onEnter){
		this.result = AstHook.onEnter[this.node.type](this);
	}
	else {
		(DEBUG && console.log(chalk.yellow('[INFO] '+this.node.type+' remains the same')));
	}

	(DEBUG && this.debug(chalk.red('bottom-up')));
}
AstHook.prototype.debug = function(message){
	console.log(helpers.indent(this.scope.level*4)
		+chalk.blue(this.scope.id+':'+this.scope.func_name)
		+' '+chalk.yellow(this.node.type)+(this.node.type==='ExpressionStatement' ? (' ('+this.node.expression.type+')'): '')+'  '+(message || ''));
}
// Using dictionary for performance
AstHook.NATIVE_KEYWORDS = {
	'Object': null,
	'Function': null,
	'Array': null,
	'String': null,
	'Number': null,
	'Boolean': null,
	'Date': null,
	'Math': null,
	'JSON': null,
	'RegExp': null,
	'Error': null,
	'undefined': null,
	'eval': null,
	'arguments': null,
	'process': null,
	'global': null,
	'parseInt': null,
	'parseFloat': null
}
function _getMemberExpressionObject(node){
	if (node.type !== 'MemberExpression') return node;
	return _getMemberExpressionObject(node.object);
}
function isNative(node){
	return ( !node
			|| ((node.type === 'Identifier') && (node.name in AstHook.NATIVE_KEYWORDS))
			|| ((node.type === 'MemberExpression') && isNative(_getMemberExpressionObject(node.object)) ) )
}
AstHook.onEnter = {
	Program: function(self){
		self.scope.initRefs(self.node);

		self.hooks = [];
		self.node.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			self.hooks.push(hook);
		})

		// After processing the body
		var injections = [];

		var refs = '{'+Object.keys(self.scope.declared).map(function(name){ return name+':'+name }).join(',')+'}';
		var hoisted = Object.keys(self.scope.hoisted).map(function(key){ return '.hoist('+key+','+self.scope.hoisted[key]+')' }).join('');
		injections.push(`${SCOPE_PREFIX}.setExtractor(function(){ return this.capture({},${refs}); })
							${hoisted}`);

		var inject = esprima.parse(injections.join(';')).body;
		self.node.body.unshift.apply(self.node.body, inject);
	},
	FunctionDeclaration: function(self, is_expression){
		var func_scope = new StaticScope(self.node.id.name, self.scope);
		func_scope.initRefs(self.node);

		self.scope.refs[self.node.id.name] = self.node;
		// self.scope.funcs[self.node.id.name] = self.node;

		self.node.body.body.forEach(function(node, index, body){
			body[index] = new AstHook(func_scope, node).node;
		})

		// After processing the body
		var injections = [];
		var params = '{'+func_scope.params.map(function(param){ return param+':'+param }).join(',')+'}';
		var refs = '{'+Object.keys(func_scope.declared).map(function(name){ return name+':'+name }).join(',')+'}'
		var hoisted = Object.keys(func_scope.hoisted).map(function(key){ return '.hoist('+key+','+func_scope.hoisted[key]+')' }).join('');
		injections.push(`var ${func_scope.identifier()} = new ${SCOPE_PREFIX}.Scope(this, ${func_scope.parent.identifier()}, ${self.node.id.name}, function(){ return this.capture(${params}, ${refs}) })${hoisted}`);

		var inject = esprima.parse(injections.join(';')).body;
		self.node.body.body.unshift.apply(self.node.body.body, inject);

		// func_scope.protects is available now
		if (!is_expression){
			// If func_scope.func_name is not in self.scope.hoisted, it implies function was declared inside an if block or for block
			if (func_scope.func_name in self.scope.hoisted){
				self.scope.hoisted[func_scope.func_name] = func_scope.protects.identifier();	
			}
		}

		return { scope_created: func_scope };
	},
	FunctionExpression: function(self){
		// Similar to FunctionDeclaration, but here the function can be anonymous.

		// If function is anonymous, assign some name. We need the name for migration
		if (self.node.id === null){
			self.node.id = esprima.parse(ANONYMOUS_PREFIX+helpers.randKey(4)).body[0].expression;
		}

		// Using (FunctionDeclaration)
		var result = AstHook.onEnter.FunctionDeclaration(self, true);

		// FunctionExpression should be wrapped with addFunction call
		var replace = esprima.parse(self.scope.identifier()+'.addFunction()').body[0].expression;
		replace.arguments.push(self.node);
		if (result.scope_created.protects){
			replace.arguments.push(esprima.parse(result.scope_created.protects.identifier()).body[0].expression)
		}
		self.node = replace;
	},
	CallExpression: function(self){
		// Intercept console.log calls
		if (self.node.callee.type === 'MemberExpression'){
			if (self.node.callee.object.name === 'console'
				&& self.node.callee.property.name === 'log'){

				var replace = esprima.parse(SCOPE_PREFIX+'.console').body[0].expression;
				self.node.callee.object = replace;

				// self.node.callee.object.name = SCOPE_PREFIX;
			}
			else if (self.node.callee.object.name
				 && self.node.callee.object.name in AstHook.NATIVE_KEYWORDS){
				// Do nothing
			}
			else {
				var hook = new AstHook(self.scope, self.node.callee);
				self.node.callee = hook.node;
			}
		}
		else if (self.node.callee.type === 'Identifier'){
			if (['setImmediate', 'setTimeout', 'setInterval', 
				 'clearImmediate', 'clearTimeout', 'clearInterval',
				 'require'].indexOf(self.node.callee.name) > -1){
				var replace = esprima.parse(SCOPE_PREFIX+'.'+self.node.callee.name).body[0].expression;
				self.node.callee = replace;
			}
			else if (self.node.callee.name in AstHook.NATIVE_KEYWORDS){
				// Do nothing
			}
			else {
				var hook = new AstHook(self.scope, self.node.callee);
				self.node.callee = hook.node;
			}
		}
		else if (self.node.callee.type === 'FunctionExpression'){
			self.node.callee = new AstHook(self.scope, self.node.callee).node;
		}
		else if (self.node.callee.type === 'CallExpression'){
			var hook = new AstHook(self.scope, self.node.callee);
		}

		// handle arguments - replace variable references, etc.
		self.node.arguments.forEach(function(node, index, body){
			if (!isNative(node)){
				body[index] = new AstHook(self.scope, node).node;
			}
		});
	},
	AssignmentExpression: function(self){
		// self.node.left = new AstHook(self.scope, self.node.left).node;
		self.node.right = new AstHook(self.scope, self.node.right).node;
	},
	UpdateExpression: function(self){
		if (self.node.argument.type === 'Identifier'){
			var hook = new AstHook(self.scope, self.node.argument);
			self.node.argument = hook.node;
		}
		else if (self.node.argument.type === 'MemberExpression'){
			var hook = new AstHook(self.scope, self.node.argument);
			self.node.argument = hook.node;
		}
	},
	SequenceExpression: function(self){
		self.hooks = [];
		self.node.expressions.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			self.hooks.push(hook);
		})
	},
	ExpressionStatement: function(self){
		// return AstHook.onEnter[self.node.expression.type](self);
		self.node.expression = new AstHook(self.scope, self.node.expression).node;
	},
	VariableDeclaration: function(self){
		var replacements = [];
		self.node.declarations.forEach(function(declaration){
			// Store information about variable in StaticScope
			var var_name = declaration.id.name;
			self.scope.refs[var_name] = declaration.init;
			if (!isNative(declaration.init)){
				declaration.init = new AstHook(self.scope, declaration.init).node;	
			}
		});
	},
	WhileStatement: function(self){
		if (self.node.body.type !== "BlockStatement"){
			var block = esprima.parse("{}").body[0];
			block.body.push(self.node.body);
			self.node.body = block;
		}
		self.node.test = new AstHook(self.scope, self.node.test).node;

		var block_hoisted = [];
		self.node.body.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			if (node.type === 'FunctionDeclaration'){
				// block_hoisted[node.id.name] = hook.result.protects;
				var inject = esprima.parse(self.scope.identifier()+'.addFunction('+node.id.name+', '+hook.result.scope_created.protects.identifier()+', "'+node.id.name+'")').body[0];
				block_hoisted.push(inject);
			}
		});
		self.node.body.body.unshift.apply(self.node.body.body, block_hoisted);
	},
	DoWhileStatement: function(self){
		return AstHook.onEnter['WhileStatement'](self);
	},
	ForStatement: function(self){
		if (self.node.init){
			self.node.init = new AstHook(self.scope, self.node.init).node;
			if (self.node.init.type === 'ExpressionStatement') self.node.init = self.node.init.expression;	
		}
		if (self.node.test){
			self.node.test = new AstHook(self.scope, self.node.test).node;
			if (self.node.test.type === 'ExpressionStatement') self.node.test = self.node.test.expression;
		}
		if (self.node.update){
			self.node.update = new AstHook(self.scope, self.node.update).node;
			if (self.node.update.type === 'ExpressionStatement') self.node.update = self.node.update.expression;
		}

		if (self.node.body.type !== "BlockStatement"){
			var block = esprima.parse("{}").body[0];
			block.body.push(self.node.body);
			self.node.body = block;
		}
		var block_hoisted = [];
		self.node.body.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			if (node.type === 'FunctionDeclaration'){
				// block_hoisted[node.id.name] = hook.result.protects;
				var inject = esprima.parse(self.scope.identifier()+'.addFunction('+node.id.name+', '+hook.result.scope_created.protects.identifier()+', "'+node.id.name+'")').body[0];
				block_hoisted.push(inject);
			}
		})
		self.node.body.body.unshift.apply(self.node.body.body, block_hoisted);
		// return AstHook.onEnter['WhileStatement'](self);
	},
	ForInStatement: function(self){
		// ATTN: Hacky here... variable declarator in a for...in loop should be handled better.
		self.node.left = new AstHook(self.scope, self.node.left).node;
		if (self.node.left.type === 'ExpressionStatement'){
			self.node.left = self.node.left.expression;
			
			if (self.node.left.right && self.node.left.right.type === 'Identifier' && self.node.left.right.name === 'undefined'){
				self.node.left = self.node.left.left;
			}
		}
		self.node.right = new AstHook(self.scope, self.node.right).node;
		if (self.node.right.type === 'ExpressionStatement') self.node.right = self.node.right.expression;

		if (self.node.body.type !== "BlockStatement"){
			var block = esprima.parse("{}").body[0];
			block.body.push(self.node.body);
			self.node.body = block;
		}

		var block_hoisted = [];
		self.node.body.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			// body[index] = new AstHook(self.scope, node).node;	// hook may have replaced the node
			if (node.type === 'FunctionDeclaration'){
				// block_hoisted[node.id.name] = hook.result.protects;
				var inject = esprima.parse(self.scope.identifier()+'.addFunction('+node.id.name+', '+hook.result.scope_created.protects.identifier()+', "'+node.id.name+'")').body[0];
				block_hoisted.push(inject);
			}
		});
		self.node.body.body.unshift.apply(self.node.body.body, block_hoisted);
	},
	IfStatement: function(self){
		
		if (self.node.consequent.type !== "BlockStatement"){
			var block = esprima.parse("{}").body[0];
			block.body.push(self.node.consequent);
			self.node.consequent = block;
		}
		self.node.test = new AstHook(self.scope, self.node.test).node;

		// var block_hoisted = [];
		self.node.consequent.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			
			// TODO: hoisting within a conditional body
			// if (node.type === 'FunctionDeclaration'){
			// 	// block_hoisted[node.id.name] = hook.result.protects;
			// 	var inject = esprima.parse(self.scope.identifier()+'.refs.'+node.id.name+' = '+self.scope.identifier()+'.addFunction('+node.id.name+', '+hook.result.scope_created.protects.identifier()+', "'+node.id.name+'")').body[0];
			// 	block_hoisted.push(inject);
			// }
		})
		// self.node.consequent.body.unshift.apply(self.node.consequent.body, block_hoisted);

		if (self.node.alternate){
			if (self.node.alternate.type === 'IfStatement'){
				// var elif = new AstHook(self.scope, self.node.alternate);
				// self.node.alternate = elif.node;
				self.node.alternate = new AstHook(self.scope, self.node.alternate).node;
			}
			else {
				if (self.node.alternate.type !== 'BlockStatement'){
					var block = esprima.parse("{}").body[0];
					block.body.push(self.node.alternate);
					self.node.alternate = block;
				}

				// var block_hoisted = [];
				self.node.alternate.body.forEach(function(node, index, body){
					// var hook = new AstHook(self.scope, node);
					// body[index] = hook.node;	// hook may have replaced the node
					body[index] = new AstHook(self.scope, node).node;	// hook may have replaced the node
					// self.hooks.push(hook);
					// body[index] = new AstHook(self.scope, node).node;

					// if (node.type === 'FunctionDeclaration'){
					// 	// block_hoisted[node.id.name] = hook.result.protects;
					// 	var inject = esprima.parse(self.scope.identifier()+'.addFunction('+node.id.name+', '+hook.result.scope_created.protects.identifier()+', "'+node.id.name+'")').body[0];
					// 	block_hoisted.push(inject);
					// }
				});
				// self.node.alternate.body.unshift.apply(self.node.alternate.body, block_hoisted);
			}
		}
	},
	ReturnStatement: function(self){
		if (!isNative(self.node.argument)) self.node.argument = new AstHook(self.scope, self.node.argument).node;
	},
	ThrowStatement: function(self){
		self.node.argument = new AstHook(self.scope, self.node.argument).node;
	},
	NewExpression: function(self){
		// NewExpression has same signature as CallExpression
		return AstHook.onEnter.CallExpression(self);
	},
	ObjectExpression: function(self){
		
		self.node.properties.forEach(function(node, index, body){
			node.value = new AstHook(self.scope, node.value).node;
		})
	},
	ArrayExpression: function(self){
		self.node.elements.forEach(function(node, index, body){
			body[index] = new AstHook(self.scope, node).node;
		})
	},
	ConditionalExpression: function(self){
		self.node.test = new AstHook(self.scope, self.node.test).node;
		self.node.consequent = new AstHook(self.scope, self.node.consequent).node;
		self.node.alternate = new AstHook(self.scope, self.node.alternate).node;
	},
	LogicalExpression: function(self){
		var l_hook = new AstHook(self.scope, self.node.left);
		var r_hook = new AstHook(self.scope, self.node.right);
		self.node.left = l_hook.node;
		self.node.right = r_hook.node;
	},
	BinaryExpression: function(self){
		if (!isNative(self.node.left)) self.node.left = new AstHook(self.scope, self.node.left).node;
		if (!isNative(self.node.right)) self.node.right = new AstHook(self.scope, self.node.right).node;
	},
	UnaryExpression: function(self){
		self.node.argument = new AstHook(self.scope, self.node.argument).node;
	},
	MemberExpression: function(self){
		if (!(self.node.object.type === 'Identifier' && self.node.object.name in AstHook.NATIVE_KEYWORDS)){
			self.node.object = new AstHook(self.scope, self.node.object).node;
		}
		if (self.node.computed === true) self.node.property = new AstHook(self.scope, self.node.property).node;
	},
	Identifier: function(self){
		var reference = self.scope.findRef(self.node.name);
		(reference.scope && self.scope.protectAncestor(reference.scope));
		// var replace = esprima.parse(reference.identifier).body[0].expression;
		// self.node = replace;
	},
}

/** The Code object provides API for processing raw JavaScript code.
 * @constructor
 * @param {Pubsub} pubsub - Pubsub interface the code should use
 * @param {string} name - Name of the code (e.g. file name)
 * @param {string} raw_code - String content of the code
 */
function Code(pubsub, name, raw_code){
	if (!(this instanceof Code)) return new Code(pubsub, name, raw_code);
	EventEmitter.call(this);
	this.pubsub = pubsub;
	this.name = name;
	// this.uid = name+'/'+helpers.randKey(4);
	this.source_raw = raw_code || null;

	this.source = Code.instrument(pubsub, name, raw_code);

	this.processes = {};
	
	this.history = [];	// relevant only when Code is a restored program
}
Code.prototype = new EventEmitter();
Code.prototype.constructor = Code;

/** Save the instrumented code as a file
 * @param {string} file_path - the path to write to
 * @return {Promise} - On successful write, the Promise resolves to `file_path`.
 */
Code.prototype.save = function(file_path){
	var self = this;
	return new Promise(function(resolve, reject){
		fs.writeFile(file_path, jsBeautify(self.source), function(err){
			if (err) reject(err);
			else resolve(file_path);
		});
	});
}

/**
 * Execute a new process as a forked child process.
 * @param  {object} options - Options object used for initializing the Process object.
 * @return {Promise} - On successful execution, the Promise is resolved with a Process object.
 */
Code.prototype.run = function(options){
	var self = this;
	return new Promise(function(resolve, reject){
		var proc = new Process(self, options, self.history.slice());
		proc.on('started', function(id){
			self.processes[id] = proc;
			resolve(proc);
		});
	});
}

// Code.prototype.getStats = function(instance_id){
// 	var self = this;
// 	return this.ipcSend(instance_id, 'STATS')
// }

/* Pause the user code through IPC. This will work only if the user code was executed through Code.run.
 *    If the user code was executed as a standalone Node process (e.g. node user_code.js),
 *    it can only be paused through Pubsub.
 */


Code.prototype.kill = function(){
	return Promise.all(Object.values(this.processes).map(function(proc){
		return proc.kill();
	}));
}

Code._extractMeta = function(comments){
	var meta = {};
	for (var i=0; i < comments.length; i++){
		if (comments[i].type === 'Block' && comments[i].value.indexOf('things.meta') === 0){
			var body = comments[i].value.split('\n').slice(1,-1).join('\n');
			meta = yaml.safeLoad(body);
			break;
		}
	}
	return meta;
}

/**
 * Standalone static function for reading ThingsJS metadata from raw code
 * @param  {string} raw_code - Raw user code in UTF-8 string
 * @return {object} - Object representing the YAML metadata from the code
 */
Code.readMetadata = function(raw_code){
	return Code._extractMeta(esprima.parse(raw_code, { comment: true }).comments)
}

/**
 * Instrument raw JavaScript code and return a live-migratable version
 * @param {Pubsub} pubsub - The Pubsub instance to bind to the program instance
 * @param {string} code_name - The name to assign to the program instance
 * @param {string} raw_code - Raw user code in UTF-8 string
 * @return {string} - Instrumented (live-migratable) user code in UTF-8 string
 */
Code.instrument = function(pubsub, code_name, raw_code){
	// var started = Date.now();
	var ast = esprima.parse(raw_code, { comment: true });	// Comment may contain meta info

	var root_scope = new StaticScope('root');		// Create root scope (static scope)
	var hook = new AstHook(root_scope, ast);		// Process the AST

	// Process metadata about the program
	var meta = JSON.stringify(Code._extractMeta(ast.comments));

	// Prepare the things-js template
	var template_str = `require('things-js/lib/core/Code').bootstrap(module, function(${SCOPE_PREFIX}){}, '${pubsub.url}', '${code_name}', ${meta});`;
	var template = esprima.parse(template_str);
	// WARNING: the following depends on esprima output, and might break if esprima changes its format
	template.body[0].expression.arguments[1].body.body = ast.body;

	var result = escodegen.generate(template);

	// var ended = Date.now();
	// (DEBUG && console.log(chalk.green('Instrumented in '+(ended - started)+'ms')));
	// console.log(result);
	return result;
}

/* Create a dummy Code object without initializing the properties.
 * This function is used when restoring code from a snapshot.
 */
Code._createEmpty = function(){
	var code = Object.create(Code.prototype);
	code.pubsub = null;
	code.name = null;
	code.source_raw = null;
	code.source = null;
	code.processes = {};
	code.snapshots = [];
	code.history = [];	// relevant only when Code is a restored program
	return code;
}

/**
 * Create a new Code object from raw JavaScript code provided as a utf-8 string
 * @param  {Pubsub} pubsub    Pubsub object to use for instrumentation - this determines which Pubsub service a Process connects to
 * @param  {string} code_name - Name to assign the code (e.g. factorial.js)
 * @param  {string} raw_code - JavaScript code string
 * @return {Code}           Returns a new Code instance
 */
Code.fromString = function(pubsub, code_name, raw_code){
	return new Code(pubsub, code_name, raw_code);
}

/**
 * Create a new Code object from file path  
 * @param {string} file_path - the path to the raw JS file
 */
Code.fromFile = function(pubsub, file_path){
	return new Code(pubsub, path.basename(file_path), fs.readFileSync(file_path).toString());
}

/**
 * Create a new Code object from given Snapshot object
 * @param  {object} snapshot - The Snapshot object produced when Process.snapshot() is called
 * @return {Code}           Returns a new Code instance
 */
Code.fromSnapshot = function(snapshot, dummy_pubsub){
	
	var code = Code._createEmpty();
	code.pubsub = dummy_pubsub ? new Pubsub.Dummy(snapshot.meta.pubsub) : new Pubsub(snapshot.meta.pubsub);
	// code.pubsub = new Pubsub(snapshot.meta.pubsub);
	code.name = snapshot.meta.code_name;
	// code.uid = snapshot.meta.uid;

	// var watch = helpers.StopWatch().start();
	var content = Scope.generateCode(snapshot.tree);
	// watch.stop();
	
	Object.keys(snapshot.timers).forEach(function(id){
		content += Timer.generateCode(snapshot.timers[id]);
	});

	var meta = JSON.stringify(snapshot.meta.extra);

	code.source = `require('things-js/lib/core/Code').bootstrap(module, function(${SCOPE_PREFIX}){ ${content} }, '${code.pubsub.url}', '${snapshot.meta.code_name}/${snapshot.meta.instance_id}', ${meta});`;
	// console.log(jsBeautify(code.source));
	// code.source = jsBeautify(code.source);

	// code.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, {
	// 	code_name: code.name,
	// 	source: code.source
	// });

	return code;
}

/**
 * Create a new Code object from given Snapshot file. This static method calls Code.fromSnapshot after reading from file.
 * @param  {string} snapshot_path - The path to the snapshot file
 * @return {Code}           Returns a new Code instance
 */
Code.fromSnapshotFile = function(snapshot_path, dummy_pubsub){
	var snapshot = JSON.parse(fs.readFileSync(snapshot_path).toString());
	return Code.fromSnapshot(snapshot, dummy_pubsub);
}


/* Pre-processor before serializing Scope Tree; this is needed to serialize more complex objects.
 */
var NATIVE_TRANSFORMERS = {
	'Object': {
		makeSerializable: function(item){
			var safe = {
				type: 'Object',
				value: {}
			};
			Object.keys(item).forEach(function(key){
				safe.value[key] = makeSerializable(item[key]);
			});
			return safe;
		},
		makeCode: function(item){
			return '{'+Object.keys(item.value).map(function(key){ return key+' : '+makeCode(item.value[key]); }).join(',')+'}';
		}
	},
	'Date': {
		makeSerializable: function(item){
			return {
				type: 'Date',
				value: item.toISOString()
			}
		}
	},
	'Function': {
		makeCode: function(item){
			// return SCOPE_PREFIX+'.getFunction("'+(item.value.split('/').slice(1).join('/'))+'")';
			return SCOPE_PREFIX+'.getFunction("'+item.value+'")';
		}
	},
	'Scope': {
		makeSerializable: function(item){
			return {
				type: 'Scope',
				value: item.uri()
			}
		},
		makeCode: function(item){
			return SCOPE_PREFIX+'.getScope("'+(item.value.split('/').slice(1).join('/'))+'")';
		}
	},
	'Pubsub': {
		makeSerializable: function(item){
			var safe = {
				type: 'Pubsub',
				value: {
					id: item.id,
					url: item.url,
					handlers: {}
				}
			}
			Object.keys(item.handlers).forEach(function(topic){
				safe.value.handlers[topic] = makeSerializable(item.handlers[topic]);
			});
			return safe;
		},
		makeCode: function(item){
			var handlers = '{'+Object.keys(item.value.handlers).map(function(topic){
				return '"'+topic+'":'+makeCode(item.value.handlers[topic])
			}).join(',')+'}';
			return 'new '+SCOPE_PREFIX+'.Pubsub("'+item.value.url+'", { handlers: '+handlers+' })';
		}
	},
	'things-js.reference': {
		makeCode: function(item){
			return item.uri;
		}
	},
	'things-js.import': {
		makeCode: function(item){
			return SCOPE_PREFIX+'.require("'+item.value+'")';
		}
	},
	'undefined': {
		makeCode: function(item){ return 'undefined' }
	}
}
function makeSerializable(item){
	return makeSerializable[typeof item](item);
}
makeSerializable['boolean'] = function(item){
	return item;
}
makeSerializable['number'] = function(item){
	return item;
}
makeSerializable['string'] = function(item){
	return item;
}
makeSerializable['undefined'] = function(item){
	return { type: 'undefined' }
}
makeSerializable['object'] = function(item){
	if (!item) return item;
	if (item instanceof Array) return item.map(makeSerializable);
	// For now, if it's a "require"d object, require it on the target node instead of migrating object.
	if ((PROPERTY_PREFIX+'import') in item){
		return {
			type: 'things-js.import',
			value: item[PROPERTY_PREFIX+'import']
		}
	};

	if (item.constructor && item.constructor.name in NATIVE_TRANSFORMERS) return NATIVE_TRANSFORMERS[item.constructor.name].makeSerializable(item);
	// If item.constructor is undefined, then object might have been created with Object.create(null). In this case, proceed normally as it's a native JS object.

	var safe = {};
	Object.keys(item).forEach(function(key){
		// if (key === PROPERTY_PREFIX+'scope'){
		// 	// console.log(item);
		// 	item[key].frozen = true;
		// }
		if (key[0] !== PROPERTY_PREFIX) safe[key] = makeSerializable(item[key]);
	})
	
	return {
		type: item.constructor.name,
		proto_uri: item.constructor[PROPERTY_PREFIX+'uri'],
		scope_uri: item[PROPERTY_PREFIX+'scope'].uri(),
		value: safe
	}
}
makeSerializable['function'] = function(item){
	// For now, if it's a "require"d object, require it on the target node instead of migrating object.
	if ((PROPERTY_PREFIX+'import') in item){
		return {
			type: 'things-js.import',
			value: item[PROPERTY_PREFIX+'import']
		}
	};

	return {
		type: 'Function',
		value: item[PROPERTY_PREFIX+'uri']
	}
}

function makeCode(item){
	return makeCode[typeof item](item);
}
makeCode['boolean'] = function(item){
	return item;
}
makeCode['number'] = function(item){
	return item;
}
makeCode['string'] = function(item){
	return "'"+item+"'";
}
makeCode['object'] = function(item){
	if (item === null) return 'null';
	if (item instanceof Array) return '['+item.map(makeCode).join(',')+']';
	if (item.type in NATIVE_TRANSFORMERS) return NATIVE_TRANSFORMERS[item.type].makeCode(item);
	var props = [];
	Object.keys(item.value).forEach(function(key){
		props.push(key+' : '+makeCode(item.value[key]));
	});
	if (item.proto_uri){
		return SCOPE_PREFIX+'.restoreObject({'+props.join(',')+'}, "'+item.proto_uri+'", "'+item.scope_uri+'")';
	}
	else {
		return '{'+props.join(',')+'}';
	}
}

/* Scope object injected into the user code; it's used in the same execution context.
 * @constructor
 */
function Scope(instance, parent, func, extractor, uid){
	this.parent = parent;
	this.func = func;
	this.uid = uid || func.name+'-'+helpers.randKey();
	this.extractor = extractor;

	if (func instanceof Function && instance instanceof func) instance[PROPERTY_PREFIX+'scope'] = this;

	this.level = parent ? parent.level+1 : 0;

	this.funcs = {};
	this.hoisted = {};

	// if (parent) parent.children[this.uid] = this;
	// this.children = {};
}
Scope.prototype.identifier = function(){
	if (this.parent === null) return SCOPE_PREFIX;
	else return this.parent.identifier()+'_'+this.func.name;
}
Scope.prototype.uri = function(){
	if (this.parent) return this.parent.uri()+'/'+this.uid;
	return this.uid;
}
/* chainable function */
Scope.prototype.hoist = function(func, context){
	this.hoisted[func.name] = this.addFunction(func, context, func.name);
	return this
}

Scope.prototype.addFunction = function(func, context, uid){
	func[PROPERTY_PREFIX+'uid'] = uid || func.name+'-'+helpers.randKey();
	func[PROPERTY_PREFIX+'uri'] = this.uri()+'.'+func[PROPERTY_PREFIX+'uid'];
	func[PROPERTY_PREFIX+'owner'] = this;
	func[PROPERTY_PREFIX+'context'] = context;
	this.funcs[func[PROPERTY_PREFIX+'uid']] = func;
	return func;
}

// Expose a pointer on the parent scope to make this scope reachable from the root.
// Due to the explicit reference, this Scope will not be Garbage Collected.
Scope.prototype.restore = function(parent){
	if (!this.parent.restored) this.parent.restored = {};
	this.parent.restored[this.uid] = this;

	return this;
}

Scope.prototype.getScope = function(rri){
	// console.log(rri);
	var tokens = (rri instanceof Array) ? rri : rri.split('/');
	if (tokens.length === 0) return this;
	// if (tokens[0] in this.children){
	if (tokens[0] in this.restored){
		// return this.children[tokens[0]].getScope(tokens.slice(1));
		return this.restored[tokens[0]].getScope(tokens.slice(1));
	}
	else {
		return undefined;
	}
}

function extractObject(obj, scope){
	if (obj){
		if (typeof obj === 'function'
			&& obj[PROPERTY_PREFIX+'owner'] !== scope
			&& !obj[PROPERTY_PREFIX+'import']){
			obj[PROPERTY_PREFIX+'owner'].extractor();
			Object.values(obj.prototype).forEach(function(prop){
				extractObject(prop, scope);
			});
			Object.values(obj).forEach(function(prop){
				extractObject(prop, scope);
			});
		}
		else if (typeof obj === 'object'
				&& obj[PROPERTY_PREFIX+'scope']
				&& !obj[PROPERTY_PREFIX+'import']){
			obj[PROPERTY_PREFIX+'scope'].extractor();
			Object.values(obj).forEach(function(prop){
				extractObject(prop, scope);
			});
		}
	}
}

Scope.prototype.capture = function(params, refs){
	if (this.CAPTURING){
		( DEBUG && console.log(helpers.indent(this.level*4)+chalk.red("Capture in progress ")+this.uri()) );
		return;
	}
	this.CAPTURING = true;
	( DEBUG && console.log(helpers.indent(this.level*4)+chalk.yellow("Capturing ")+this.uri()) );
	var self = this;
	this.snap = {
		name: (this.func ? this.func.name : SCOPE_PREFIX),
		uri: this.uri(),
		hoisted: Object.keys(this.hoisted),
		funcs: {},
		params: {},
		refs: {},
		children: {}
	};

	Object.keys(params).forEach(function(name){
		self.snap.params[name] = makeSerializable(params[name]);

		extractObject(params[name], self);
	});

	Object.keys(this.funcs).forEach(function(uid){
		self.snap.funcs[uid] = {
			type: 'Function',
			value: self.funcs[uid].toString(),
			context: (self.funcs[uid][PROPERTY_PREFIX+'context'] ? self.funcs[uid][PROPERTY_PREFIX+'context'].identifier() : self.identifier()),
			proto: {},
			properties: {}
		}
		Object.keys(self.funcs[uid].prototype)
			.forEach(function(prop){
				if (prop[0] !== PROPERTY_PREFIX){
					self.snap.funcs[uid].proto[prop] = makeSerializable(self.funcs[uid].prototype[prop]);
				}
			});
		Object.keys(self.funcs[uid])
			.forEach(function(prop){
				if (prop[0] !== PROPERTY_PREFIX){
					self.snap.funcs[uid].properties[prop] = makeSerializable(self.funcs[uid][prop]);
				}
			});

		extractObject(self.funcs[uid], self);
	});

	Object.keys(refs).forEach(function(name){
		// console.log(name);
		self.snap.refs[name] = makeSerializable(refs[name]);

		extractObject(refs[name], self);
	});

	// This condition is true only in RootScope
	if (this.timers){
		Object.values(this.timers).forEach(function(timer){
			timer.callback[PROPERTY_PREFIX+'owner'].extractor();
		})
	}

	if (this.parent){
		// this.parent.children[this.uid] = this;
		this.parent.extractor();
		this.parent.snap.children[this.uid] = this.snap;
		( DEBUG && console.log(helpers.indent(this.level*4)+chalk.blue("added Snapshot to parent ")+this.uri()) );
	}

	( DEBUG && console.log(helpers.indent(this.level*4)+chalk.yellow("Captured ")+this.uri()) );
	this.CAPTURING = false;
	return this.snap;
}

Scope.generateCode = function(obj, parent_identifier, scope_uid){
	var identifier;
	if (!parent_identifier){
		identifier = obj.name;
	}
	else {
		identifier = parent_identifier+'_'+obj.name;
	}
	// console.log('Generating '+identifier);
	
	var code = '';

	obj.hoisted.forEach(function(name){
		code += obj.funcs[name].value+';';
	});

	Object.keys(obj.funcs).forEach(function(uid){
		if (obj.hoisted.indexOf(uid) < 0){
			code += identifier+'.addFunction('+obj.funcs[uid].value+', '+obj.funcs[uid].context+', "'+uid+'");';
		}
	});

	// Need to restore the closures first, as some of the references may be referring to objects created by the closures.
	Object.keys(obj.children).forEach(function(child_uid){
		code += Scope.generateCode(obj.children[child_uid], identifier, child_uid);
	});

	// Process prototypes and properties of functions
	Object.keys(obj.funcs).forEach(function(uid){
		var proto = obj.funcs[uid].proto;
		Object.keys(proto).forEach(function(prop){
			code += identifier+'.funcs["'+uid+'"].prototype.'+prop+' = '+makeCode(proto[prop])+';';
		})
		var props = obj.funcs[uid].properties;
		Object.keys(props).forEach(function(prop){
			// code += identifier+'.wrapped["'+key+'"].'+prop+' = '+identifier+'.funcs["'+key+'"].'+prop+' = '+makeCode(props[prop])+';';
			code += identifier+'.funcs["'+uid+'"].'+prop+' = '+makeCode(props[prop])+';';
		})
	});

	var params = Object.keys(obj.params).map(function(name){ return name+':'+name }).join(',');

	var refs = [];
	Object.keys(obj.refs).forEach(function(key){
		// var item = makeCode(obj.refs[key]);
		// console.log(item);
		code += 'var '+key+' = '+makeCode(obj.refs[key])+';';
		refs.push(key+':'+key);
	});
	refs = refs.join(',');

	if (parent_identifier){
		var template = '(function '+obj.name+'('+Object.keys(obj.params).join(',')+'){'
		template += 'var '+identifier+' = new '+SCOPE_PREFIX+'.Scope(this, '+parent_identifier+', '+obj.name+', function(){ return this.capture({'+params+'}, {'+refs+'}) }, "'+scope_uid+'").restore('+parent_identifier+')'+obj.hoisted.map(function(key){ return '.hoist('+key+', '+obj.funcs[key].context+')' }).join('') + ';';
		template += code;
		template += '}('+Object.values(obj.params).map(makeCode).join(',')+'));';
		code = template;
	}
	// if root scope
	else {
		code = identifier+'.setExtractor(function(){ return this.capture({}, {'+refs+'}) })'+obj.hoisted.map(function(key){ return '.hoist('+key+', '+obj.funcs[key].context+')' }).join('') + ';' + code;
	}

	return code;
}


function Timer(callback, timedelta, timer_id){
	this.id = (timer_id || helpers.randKey());
	this.callback = callback;
	this.timedelta = timedelta || 0;
	this.ref = null;
	// this.created_at = Date.now();
	this.called_at = undefined;
	this.cleared_at = undefined;
	this.stopped_at = undefined;
}
Timer.prototype.getSerializable = function(){
	return {
		id: this.id,
		// type: this.type,
		callback: this.callback[PROPERTY_PREFIX+'uri'],
		timedelta: this.timedelta,
		called_at: this.called_at,
		cleared_at: this.cleared_at,
		stopped_at: this.stopped_at
	}
}
Timer.generateCode = function(obj){
	// var callback = SCOPE_PREFIX+'.getFunction("'+obj.callback.split('/').slice(1).join('/')+'")'
	var callback = SCOPE_PREFIX+'.getFunction("'+obj.callback+'")'
	if (obj.type === 'Timeout'){
		return SCOPE_PREFIX+'.setTimeout('+callback+', '+(obj.stopped_at - obj.called_at)+', "'+obj.id+'");'
	}
	else if (obj.type === 'Interval'){
		var remaining = obj.timedelta - (obj.stopped_at - (obj.cleared_at || obj.called_at));
		return SCOPE_PREFIX+'.restoreInterval('+callback+', '+obj.timedelta+', "'+obj.id+'", '+remaining+');'
	}
	else if (obj.type === 'Immediate'){
		return SCOPE_PREFIX+'.setImmediate('+callback+', "'+obj.id+'");'
	}
}

function IntervalTimer(callback, timedelta, timer_id){
	Timer.call(this, callback, timedelta, timer_id);
}
IntervalTimer.prototype = Object.create(Timer.prototype);
IntervalTimer.prototype.constructor = IntervalTimer;
IntervalTimer.prototype.getSerializable = function(){
	return Object.assign(Timer.prototype.getSerializable.call(this), { type: 'Interval' });
}
IntervalTimer.prototype.start = function(){
	var self = this;
	self.called_at = Date.now();
	self.ref = setInterval(function(){
		self.callback();
		self.cleared_at = Date.now();
	}, self.timedelta);
	this.ref_type = 'Interval';
}
IntervalTimer.prototype.pause = function(){
	// console.log(chalk.red('    pausing ')+this.type+' '+this.id);
	global['clear'+this.ref_type](this.ref);
	this.ref = null;
	this.stopped_at = Date.now();
	this.remaining = this.timedelta - (this.stopped_at - (this.cleared_at || this.called_at));

	// console.log(this.type+' paused, elapsed = '+(this.stopped_at - (this.cleared_at || this.called_at))+', remaining = '+this.remaining);
	// console.log(this.stopped_at);
};
IntervalTimer.prototype.resume = function(){
	var self = this;
	if (self.remaining){
		self.called_at = Date.now();
		self.ref = setTimeout(function(){
			self.callback();
			self.cleared_at = Date.now();
			// self.callback[PROPERTY_PREFIX+'parent'].removeChild(self.callback[PROPERTY_PREFIX+'scope']);

			self.ref = setInterval(function(){
				self.callback();
				self.cleared_at = Date.now();
				// self.callback[PROPERTY_PREFIX+'parent'].removeChild(self.callback[PROPERTY_PREFIX+'scope']);
			}, self.timedelta);
			self.ref_type = 'Interval';
			// console.log(chalk.blue('    resumed ')+self.type+' '+self.id);
		}, self.remaining);
		self.ref_type = 'Timeout';
	}
	else {
		return self.start();
	}
};

function TimeoutTimer(callback, timedelta, timer_id){
	Timer.call(this, callback, timedelta, timer_id);
}
TimeoutTimer.prototype = Object.create(Timer.prototype);
TimeoutTimer.prototype.constructor = TimeoutTimer;
TimeoutTimer.prototype.getSerializable = function(){
	return Object.assign(Timer.prototype.getSerializable.call(this), { type: 'Timeout' });
}
TimeoutTimer.prototype.start = function(){
	var self = this;
	this.called_at = Date.now();
	this.ref = setTimeout(function(){
		self.callback();
		self.cleared_at = Date.now();
		(self.onClear && self.onClear());
	}, this.timedelta);
};
TimeoutTimer.prototype.pause = function(){
	// console.log(chalk.red('    pausing ')+this.type+' '+this.id);
	clearTimeout(this.ref);
	this.ref = null;
	this.stopped_at = Date.now();
	this.remaining = this.timedelta - (this.stopped_at - (this.cleared_at || this.called_at));
	// console.log(this.type+' paused, elapsed = '+(this.stopped_at - (this.cleared_at || this.called_at))+', remaining = '+this.remaining);
	// console.log(this.stopped_at);
};
TimeoutTimer.prototype.resume = function(){
	var self = this;
	if (self.remaining){
		self.called_at = Date.now();
		self.ref = setTimeout(function(){
			self.callback();
			self.cleared_at = Date.now();
		}, self.remaining);
	}
	else {
		return self.start();
	}
};

function ImmediateTimer(callback, timer_id){
	Timer.call(this, callback, 0, timer_id);
}
ImmediateTimer.prototype = Object.create(Timer.prototype);
ImmediateTimer.prototype.constructor = ImmediateTimer;
ImmediateTimer.prototype.getSerializable = function(){
	return Object.assign(Timer.prototype.getSerializable.call(this), { type: 'Immediate' });
}
ImmediateTimer.prototype.start = function(){
	var self = this;
	this.called_at = Date.now();
	this.ref = setImmediate(function(){
		self.callback();
		self.cleared_at = Date.now();
		(self.onClear && self.onClear());
	});
};
ImmediateTimer.prototype.pause = function(){
	clearImmediate(this.ref);
	this.ref = null;
	this.stopped_at = Date.now();
	this.remaining = this.timedelta - (this.stopped_at - (this.cleared_at || this.called_at));
};
ImmediateTimer.prototype.resume = ImmediateTimer.prototype.start;

/* */
var MasterIPCHandler = {
	'init': function(proc, payload){
		proc.id = payload.id;
		proc.meta = payload.meta;
		proc.status = Process.Status.RUNNING;
		proc.emit('started', proc.id);
		proc.code.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, {
			code_name: proc.code.name,
			instance_id: proc.id,
			meta: proc.meta,
			status: proc.status,
			source: proc.code.source,
			engine: proc.options.engine
		});
		// API methods (can be invoked over pubsub)
		var ctrls = {
			pause: proc.pause,
			resume: proc.resume,
			snapshot: proc.snapshot,
			kill: proc.kill
		}
		proc.code.pubsub.subscribe(proc.code.name+'/'+proc.id+'/cmd', function(message){
			if (message.ctrl in ctrls){
				proc[message.ctrl](message.kwargs)
				.then(function(result){
					if (message.request_id && message.reply_to){
						proc.code.pubsub.publish(message.reply_to, {
							reply_id: message.request_id,
							payload: result
						})
					}
				})
			}
			else {
				console.log(chalk.red('[Engine:'+self.id+'] Received unexpected message'));
			}
		});

		/* Experimental Code */
		// Question: should we REPLACE the process' stdio? or just intercept it like this?
		// var pipe_in = proc.code.pubsub.getInputPipe('proc/'+proc.id+'/stdin');
		// var pipe_out = proc.code.pubsub.getOutputPipe('proc/'+proc.id+'/stdout');
		// // console.log(proc.obj.stdio);
		// pipe_in.pipe(proc.obj.stdin);
		// proc.obj.stdout.pipe(pipe_out);
		/* End of Experimental Code */
	},
	'stats': function(proc, payload){
		proc.code.pubsub.publish(proc.code.name+'/'+proc.id+'/resource' , payload);
	},
	'publish': function(proc, payload){
		proc.code.pubsub.publish(payload.topic, payload.message);
	}
}
function Process(code, options, history){
	EventEmitter.call(this);
	var self = this;
	self.options = Object.assign({
		engine: undefined,
		enableStats: true,
		silent: false,
		// silent: true,
		onStdout: null
	}, options);

	var started, ended, elapsed;
	self.code = code;
	self.obj = child_process.fork(path.join(__dirname, 'vm.js'), [], { silent: (self.options.silent || !!self.options.onStdout) });
	// self.obj = child_process.fork(path.join(__dirname, 'vm.js'), [], { stdio: 'pipe' });
	self.meta = {};
	
	self.status = Process.Status.READY;
	self.snapshots = [];
	self.history = history || [];

	self._requests = {};
	self._error = null;

	if (self.options.onStdout) self.obj.stdout.on('data', self.options.onStdout);

	// Initialize runtime
	this.obj.send({
		code: self.code.source,
		options: {
			enableStats: this.options.enableStats
		} 
	}, function(){
		started = Date.now();
	});
	
	this.obj.on('close', function(exit_code, signal){
		(DEBUG && console.log(chalk.red('Process '+self.code.name+' stdio closed ')+exit_code) );
	});
	this.obj.on('error', function(err){
		console.log(chalk.red('Process '+self.code.name+' ERROR!'), err);
		// self.emit('error', err);
	});
	this.obj.on('exit', function(exit_code, signal){
		ended = Date.now();
		// self.process = null;

		self.status = Process.Status.EXITED;
		elapsed = (ended - started);
		
		(DEBUG && console.log(chalk.red('Code '+self.code.name+' exited ')+exit_code+ ' --- '+(ended-started)+'ms') );
		if (exit_code === 1) console.log(self._error);

		self.code.pubsub.unsubscribe(self.code.name+'/'+self.id+'/cmd')
			.then(function(topic){
				// console.log('unsubscribe success '+ topic);
			}, function(err){
				console.log(err);
			})

		self.emit('status-update', this.status);
		self.emit('finished', {
			exit_code: exit_code,
			signal: signal,
			error: self._error,
			history: self.history,
			elapsed: (ended - started)
		});
	});
	this.obj.on('message', function(message){
		( DEBUG && console.log(chalk.yellow('Child: ')+JSON.stringify(message)) );
		if (message.reply_id in self._requests){
			self._requests[message.reply_id].resolve(message.payload);
			delete self._requests[message.reply_id];
		}
		else if (message.error){
			self._error = message.error;
			// self.emit('error', message.error);
		}
		else {
			try {
				MasterIPCHandler[message.ctrl](self, message.payload);	
			}
			catch (e){
				console.log(e);
				console.log(chalk.red("ERROR - could not understand child process"), JSON.stringify(message));
			}
			
		}
	});

	this.code.pubsub.subscribe(PROGRAM_MONITOR_NAMESPACE+'/bcast', function(message){
		if (message.ctrl === 'report'){
			// self.reportStatus();
			var info = self.toJSON();
			info.instance_id = self.id
			self.code.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, info);
		}
		else {
			console.log(chalk.blue('[Broadcast] ')+JSON.stringify(message));
		}
	});

	this.on('started', function(){
		self.history.push({
			engine: self.options.engine,
			timestamp: Date.now(),
			event: 'start'
		})
	});
	this.on('finished', function(){
		self.history.push({
			engine: self.options.engine,
			timestamp: Date.now(),
			event: 'end'
		})
	});
	this.on('status-update', function(status){
		self.reportStatus();
		self.history.push({
			engine: self.options.engine,
			timestamp: Date.now(),
			event: 'status-update',
			event_data: status
		})
	});
}
Process.prototype = new EventEmitter();
Process.prototype.constructor = Process;

Process.prototype.toJSON = function(){
	return {
		id: this.id,
		code_name: this.code.name,
		meta: this.meta,
		status: this.status,
		engine: this.options.engine
	}
}

Process.Status = {
	READY: 'Ready',
	RUNNING: 'Running',
	PAUSED: 'Paused',
	EXITED: 'Exited'
}
Process.prototype.reportStatus = function(eventName){
	this.code.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, {
		code_name: this.code.name,
		instance_id: this.id,
		status: this.status,
		engine: this.options.engine,
		eventName: eventName
	})
	// The following catch is added for cases where the Pubsub object is already killed.
	// It can happen when a CodeEngine is killed before the Process finishes exiting gracefully.
	// In such cases, reportStatus failure can be tolerated (engine itself is "down")
	.catch(function(err){
		(DEBUG && console.log("Failed to report Process status", err))
	})
}

/** API method (can be invoked over pubsub) for killing the process */
Process.prototype.kill = function(){
	this.obj.kill();
	console.log(chalk.red('--- Killed <'+this.code.name+'> ---'));
	return Promise.resolve(Process.Status.EXITED);
}
Process.prototype.ipcSend = function(ctrl, kwargs){
	var self = this;
	return new Promise(function(resolve, reject){
		// var instance = self.processes[instance_id];
		// if (!instance) return reject('InstanceNotFound');
		// if (self.process !== null && self.process.connected){
		if (self.obj.connected){
			var req_id = helpers.randKey();
			var deferred = helpers.defer();
			deferred.promise.then(function(reply){
				resolve(reply);
			}, function(err){
				reject(err);
			})
			// self.process._requests[req_id] = deferred;
			// self.process.send({ request: req_id, ctrl: ctrl, kwargs: kwargs });
			self._requests[req_id] = deferred;
			self.obj.send({ request_id: req_id, ctrl: ctrl, kwargs: kwargs });
			setTimeout(function(){
				if (req_id in self._requests){
				// if (self.process && req_id in self.process._requests){
					deferred.reject({
						error: 'IPCTimeout',
						message: 'IPC Request timed out'
					});
					// delete self.process._requests[req_id];
					delete self._requests[req_id];
				}
			}, 3000);
		}
		else {
			console.log(chalk.red('[ERROR] Code '+self.code.name+' ipcSend("'+ctrl+'"): No child process'));
		}	
	})
}
/** API method (can be invoked over pubsub) for pausing the process */
Process.prototype.pause = function(){
	var self = this;
	if (self.status === Process.Status.RUNNING){
		return self.ipcSend('PAUSE')
			.then(function(reply){
				self.status = reply.status;
				console.log(chalk.yellow('--- Paused <'+self.code.name+'> ---'));
				self.emit('status-update', self.status);
				return self.status;
			})
	}
	else {
		return Promise.resolve(self.status)
	}
}
/** API method (can be invoked over pubsub) for resuming the process */
Process.prototype.resume = function(){
	var self = this;
	if (self.status === Process.Status.PAUSED){
		return self.ipcSend('RESUME').then(function(reply){
			self.status = reply.status;
			console.log(chalk.green('--- Resuming <'+self.code.name+'> ---'));
			self.emit('status-update', self.status);
			return self.status;
		})
	}
	else {
		return Promise.resolve(self.status);
	}
}
/** API method (can be invoked over pubsub) for getting a snapshot of the process */
Process.prototype.snapshot = function(pause_after){
	var self = this;
	return self.ipcSend('SNAPSHOT', { pause_after: (pause_after || false) })
		.then(function(reply){
			reply.snapshot.history = self.history;
			var snapshot_meta = {
				created_at: Date.now(),
				snapshot: reply.snapshot,
				time_taken: reply.time_taken
			};
			self.snapshots.push(snapshot_meta);
			self.code.pubsub.publish(self.code.name+'/'+self.id+'/snapshots', reply.snapshot);

			self.status = reply.status;
			console.log(chalk.magenta('--- Snapshot <'+self.code.name+'> --- '+reply.time_taken+' ms'));
			self.emit('status-update', self.status);
			return reply.snapshot;
		});
}
Process.prototype.getStats = function(instance_id){
	var self = this;
	return this.ipcSend('STATS')
}

Process.prototype.saveSnapshot = function(index, file_path){
	if (this.snapshots[index]){
		fs.writeFile(file_path, jsBeautify(JSON.stringify(this.snapshots[index].snapshot)), function(err){
			if (err) throw err;
		})
	}	
}
Process.prototype.saveLastSnapshot = function(file_path){
	if (this.snapshots.length > 0){
		fs.writeFile(file_path, jsBeautify(JSON.stringify(this.snapshots[this.snapshots.length-1].snapshot)), function(err){
			if (err) throw err;
		})
	}	
}
Process.prototype.saveSnapshots = function(dir_path){
	var self = this;
	dir_path = path.resolve(dir_path || './');
	self.snapshots.forEach(function(snap){
		fs.writeFile(path.join(dir_path, self.code.name+'-'+self.id+'-'+snap.created_at+'.json'),
			jsBeautify(JSON.stringify(snap.snapshot)),
			function(err){
				if (err) throw err;
			});
	})
}

/* */
var RuntimeHandler = {
	PAUSE: function(root_scope){
		root_scope.pauseTimers();
		// root_scope._logEvent(logStat('pause'));
		// console.log(chalk.yellow('--- Paused <'+root_scope.meta.code_name+'> ---'));
		return { status: Process.Status.PAUSED };
	},
	RESUME: function(root_scope){
		// console.log(chalk.green('--- Resuming <'+root_scope.meta.code_name+'> ---'));
		root_scope.resumeTimers();
		// root_scope._logEvent(logStat('resume'));
		return { status: Process.Status.RUNNING };
	},
	SNAPSHOT: function(root_scope, kwargs){
		root_scope.pauseTimers();
		var status = Process.Status.PAUSED;
		// root_scope._logEvent(logStat('snapshot'));
		// console.log(chalk.yellow('--- Paused <'+root_scope.meta.code_name+'> ---'));
		
		var started = Date.now();
		var safe = root_scope.snapshot();
		var elapsed = Date.now() - started;

		// console.log(chalk.magenta('--- Snapshot <'+root_scope.meta.code_name+'> --- '+elapsed+' ms'));

		if (!kwargs.pause_after){
			// console.log(chalk.green('--- Resuming <'+root_scope.meta.code_name+'> ---'));
			root_scope.resumeTimers();
			status = Process.Status.RUNNING;
		}

		return { status: status, snapshot: safe, time_taken: elapsed };
	},
	STATS: function(root_scope, kwargs){
		return { memory: process.memoryUsage() }
	}
}

function ProxyPubsub(url, options){
	var self = this;
	this.url = url || DEFAULT_PUBSUB_URL;
}
ProxyPubsub.prototype.kill = function(){ }
ProxyPubsub.prototype.publish = function(topic, message){
	process.send({ ctrl: 'publish', payload: { topic: topic, message: message } });
}

function RootScope(local_module, pubsub_url, code_uri, user_meta){
	if (!(this instanceof RootScope)) return new RootScope(local_module, pubsub_url, code_uri, user_meta);
	Scope.call(this, null, null, null, null, SCOPE_PREFIX);
	var self = this;
	var identity = code_uri.split('/');
	// this.uid = SCOPE_PREFIX;
	this._module = local_module;	// need reference to the local module object to require properly
	this.meta = {
		pubsub: (process.connected ? new ProxyPubsub(pubsub_url) : new Pubsub(pubsub_url) ),
		code_name: identity[0],
		instance_id: (identity[1] || helpers.randKey()),
		extra: user_meta
	};
	this.timers = {};
	// this.root = undefined;

	/* Attach Proxy objects */
	this.console = new ProxyConsole(this);

	if (process.connected){
		process.send({ ctrl: 'init', payload: { id: this.meta.instance_id, meta: user_meta } });
		process.on('message', function(message){
			if (message.ctrl in RuntimeHandler){
				var result = RuntimeHandler[message.ctrl](self, message.kwargs);
				process.send({ reply_id: message.request_id, payload: result });
			}
			else {
				process.send({ error: 'UnknownCtrl', message: message });
			}
		});

		// user code should not call this function
		// root_scope._logEvent = function(log){
		// 	process.send({ ctrl: 'log-event', payload: log });
		// }

		// root_scope._logEvent(logStat('bootstrap'));

		// /* Experimental Code */
		// var pubsub =  new Pubsub(pubsub_url);
		// // Question: should we REPLACE the process' stdio? or just intercept it like this?
		// var pipe_in = pubsub.getInputPipe('proc/'+this.meta.instance_id+'/stdin');
		// var pipe_out = pubsub.getOutputPipe('proc/'+this.meta.instance_id+'/stdout');
		// // console.log(proc.obj.stdio);
		// pipe_in.pipe(process.stdin);
		// process.stdout.pipe(pipe_out);
		// /* End of Experimental Code */
	}
}
RootScope.prototype = Object.create(Scope.prototype);
RootScope.prototype.constructor = RootScope;

RootScope.prototype.Scope = Scope;
RootScope.prototype.Pubsub = Pubsub;
RootScope.prototype.setExtractor = function(extractor){
	this.extractor = extractor;
	return this;
}
RootScope.prototype.snapshot = function(){
	var self = this;
	var snapshot = {
		meta : {
			pubsub: this.meta.pubsub.url,
			code_name: this.meta.code_name,
			instance_id: this.meta.instance_id,
			timestamp: Date.now(),
			extra: this.meta.extra
		},
		timers: {},
		tree: undefined
	}

	// Capture scope tree
	var scope_tree = this.extractor();
	snapshot.tree = scope_tree;

	// Capture pending timer events
	Object.values(this.timers).forEach(function(timer){
		snapshot.timers[timer.id] = timer.getSerializable();
	});

	// console.log(snapshot);
	return snapshot;
}

RootScope.prototype.pauseTimers = function(){
	Object.values(this.timers).forEach(function(timer){
		timer.pause();
	});
};
RootScope.prototype.resumeTimers = function(){
	Object.values(this.timers).forEach(function(timer){
		timer.resume();
	});
};
RootScope.prototype.clearTimer = function(timer_id){
	this.timers[timer_id].pause();
	delete this.timers[timer_id];
};
RootScope.prototype.getFunction = function(uri){
	var tokens = uri.split('.');
	var scope = this.getScope(tokens[0].split('/').slice(1));
	if (scope) return scope.funcs[tokens[1]];
	throw "No Scope found for "+uri;
}
RootScope.prototype.restoreObject = function(obj, proto_uri, scope_uri){
	// var proto = this.getRawFunction(proto_uri).prototype;
	var scope = this.getScope(scope_uri.split('/').slice(1));
	if (!scope) throw "No Scope found for "+scope_uri;

	var proto = this.getFunction(proto_uri).prototype;
	var created = Object.create(proto);
	created[PROPERTY_PREFIX+'scope'] = scope;
	Object.keys(obj).forEach(function(prop){
		created[prop] = obj[prop];
	});

	return created;
};
RootScope.prototype.restoreInterval = function(callback, timedelta, timer_id, remaining){
	var timer = new IntervalTimer(callback, timedelta, timer_id);
	this.timers[timer.id] = timer;
	timer.remaining = remaining;
	timer.resume();
	return timer.id;
};

/* Following are functions that override the global functions */
RootScope.prototype.require = function(module_path){
	var mod = this._module.require(module_path);
	mod[PROPERTY_PREFIX+'import'] = module_path;
	return mod;
};

function ProxyConsole(root_scope){
	this.root_scope = root_scope;
}
ProxyConsole.prototype.log = function(){
	console.log.apply(null, arguments);
	// Publish console messages (TODO: make this user-configurable)
	this.root_scope.meta.pubsub.publish(this.root_scope.meta.code_name+'/'+this.root_scope.meta.instance_id+'/console', Array.from(arguments));
}

RootScope.prototype.setInterval = function(callback, timedelta, timer_id){
	var timer = new IntervalTimer(callback, timedelta, timer_id);
	this.timers[timer.id] = timer;
	timer.start();
	return timer.id;
};
RootScope.prototype.setTimeout = function(callback, timedelta, timer_id){
	var self = this;
	var timer = new TimeoutTimer(callback, timedelta, timer_id);
	this.timers[timer.id] = timer;
	
	timer.onClear = function(){
		delete self.timers[timer.id];
	};
	timer.start();
	return timer.id;
};
RootScope.prototype.setImmediate = function(callback, timer_id){
	var self = this;
	var timer = new ImmediateTimer(callback, timer_id);
	this.timers[timer.id] = timer;

	timer.onClear = function(){
		delete self.timers[timer.id];
	};
	timer.start();
	return timer.id;
};
RootScope.prototype.clearInterval = RootScope.prototype.clearTimer;
RootScope.prototype.clearTimeout = RootScope.prototype.clearTimer;
RootScope.prototype.clearImmediate = RootScope.prototype.clearTimer;

Code.bootstrap = function(local_module, main, pubsub_url, code_uri, user_meta){
	return main(new RootScope(local_module, pubsub_url, code_uri, user_meta));
}

module.exports = Code;