'use strict'
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');
var EventEmitter = require('events').EventEmitter;
var esprima = require('esprima');
var escodegen = require('escodegen');
var pidusage = require('pidusage');
var jsBeautify = require('js-beautify').js_beautify;
var chalk = require('chalk');
var Pubsub = require('./Pubsub.js');
var helpers = require('../helpers.js');

var DEBUG = (process.env.DEBUG === 'true');
var WARNING = false;
var HUMAN_FRIENDLY = false;

// These greek letter prefixes are used to prevent conflicting names with user code.
var SCOPE_PREFIX = 'Σ';			// prefix for Scope identifiers
var PROPERTY_PREFIX = 'τ';		// prefix for injected properties
var ANONYMOUS_PREFIX = 'α';		// prefix for anonymous functions

var PROGRAM_MONITOR_NAMESPACE = 'program-monitor';	// Pubsub topic for code status

/* TODO:
 *   - require statements (instrumenting dependencies)
 *   - async callbacks in the event loop other than timers (I/O proxy)
 */

/* Currently Experimenting:
 *   - GC of scopes
 *   - wrapping user functions to detect end of function call and destroy the scope
 *   - Timer "freeze" and "unfreeze" for tracking relevant scopes during serialization
 *   - Timer removeChild(scope) for destroying callback's scope
 *   - Scope.getSerializable(options) - options.processed array for tracking objects already serialized
 *   - It might be possible to determine at time of instrumentation whether a function is a closure or not.
 *     For functions that do not need explicit scopes, we can optimize by not creating scopes.
 */

/** Static Scope object used during instrumentation.
 *  It is used to keep track of lexical scope of various AST nodes
 */
function StaticScope(func_name, parent){
	this.func_name = func_name;
	this.parent = parent || null;
	this.children = {};
	if (this.parent){
		// this.parent.children[this.uid] = this;
		if (HUMAN_FRIENDLY) this.id = func_name;
		else this.id = (Object.keys(this.parent.children).length).toString();
		this.parent.children[this.id] = this;
	}
	else {
		this.id = SCOPE_PREFIX;
	}

	this.params = {};
	this.hoisted = {};
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
			self.params[param.name] = param;
			self.refs[param.name] = {
				precedence: 0,
				name: self.identifier()+'.params.'+param.name
			}
		});
	}
	else return;

	body.forEach(function(node, index, body){
		if (node.type === 'VariableDeclaration'){
			node.declarations.forEach(function(declaration){
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

/** Object that wraps a node in the AST produced by esprima used for instrumenting the code
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
		var hoisted = '['+Object.keys(self.scope.hoisted).map(function(key){ return '['+key+','+self.scope.hoisted[key]+']' }).join(',')+']';
		if (Object.keys(self.scope.hoisted).length > 0) injections.push(self.scope.identifier()+'.hoist('+hoisted+')');
		var inject = esprima.parse(injections.join(';')).body;
		self.node.body.unshift.apply(self.node.body, inject);
	},
	FunctionDeclaration: function(self, is_expression){
		var func_scope = new StaticScope(self.node.id.name, self.scope);

		self.node.params.forEach(function(param){
			func_scope.params[param.name] = param;
			// func_scope.vars[param.name] = param;
			func_scope.refs[param.name] = param;
		});
		
		func_scope.initRefs(self.node);
		self.scope.refs[self.node.id.name] = self.node;
		// self.scope.funcs[self.node.id.name] = self.node;

		// self.hooks = [];
		self.node.body.body.forEach(function(node, index, body){
			// var hook = new AstHook(func_scope, node);
			// body[index] = hook.node;	// hook may have replaced the node
			// self.hooks.push(hook);
			body[index] = new AstHook(func_scope, node).node;
		})

		// After processing the body
		var injections = [];
		var params = '{'+self.node.params.map(function(param){ return param.name+':'+param.name }).join(',')+'}';
		var hoisted = '['+Object.keys(func_scope.hoisted).map(function(key){ return '['+key+','+func_scope.hoisted[key]+']' }).join(',')+']';
		injections.push(['var', func_scope.identifier(), '=', 'new '+SCOPE_PREFIX+".Scope(this, "+self.node.id.name+", '"+func_scope.id+"', "+func_scope.parent.identifier()+", "+params+", "+hoisted+")" ].join(' '));
		
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
				self.node.callee.object.name = SCOPE_PREFIX;
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
			var hook = new AstHook(self.scope, self.node.callee);
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
		self.node.left = new AstHook(self.scope, self.node.left).node;
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
		self.node.expression = (new AstHook(self.scope, self.node.expression)).node;
	},
	VariableDeclaration: function(self){

		if (self.node.declarations.length === 1){
			var declaration = self.node.declarations[0];
			// Store information about variable in StaticScope
			var var_name = declaration.id.name;
			// self.scope.vars[var_name] = declaration.init;
			self.scope.refs[var_name] = declaration.init;

			// var replace = esprima.parse(self.scope.identifier()+'.refs.'+var_name+' = '+self.scope.identifier()+'.vars.'+var_name+' = undefined').body[0];
			var replace = esprima.parse(self.scope.identifier()+'.refs.'+var_name+' = undefined').body[0];
			if (!isNative(declaration.init)){
				replace.expression.right = new AstHook(self.scope, declaration.init).node;
			}
			self.node = replace;
		}
		else {
			var replacements = [];
			self.node.declarations.forEach(function(declaration){
				// Store information about variable in StaticScope
				var var_name = declaration.id.name;
				self.scope.refs[var_name] = declaration.init;

				replacements.push(self.scope.identifier()+'.refs.'+var_name+' = undefined');
			});
			replacements = esprima.parse(replacements.join(',')).body[0];
			replacements.expression.expressions.forEach(function(statement){
				var var_name = statement.left.property.name;

				if (!isNative(self.scope.refs[var_name])){
					statement.right = new AstHook(self.scope, self.scope.refs[var_name]).node;
				}
			});
			self.node = replacements;
		}
	},
	WhileStatement: function(self){
		if (self.node.body.type !== "BlockStatement"){
			var block = esprima.parse("{}").body[0];
			block.body.push(self.node.body);
			self.node.body = block;
		}
		self.node.test = new AstHook(self.scope, self.node.test).node;

		// self.hooks = [];
		var block_hoisted = [];
		self.node.body.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			// self.hooks.push(hook);
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
		// self.hooks = [];
		var block_hoisted = [];
		self.node.body.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			// self.hooks.push(hook);
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

		// self.hooks = [];
		var block_hoisted = [];
		self.node.consequent.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			// self.hooks.push(hook);

			if (node.type === 'FunctionDeclaration'){
				// block_hoisted[node.id.name] = hook.result.protects;
				var inject = esprima.parse(self.scope.identifier()+'.refs.'+node.id.name+' = '+self.scope.identifier()+'.addFunction('+node.id.name+', '+hook.result.scope_created.protects.identifier()+', "'+node.id.name+'")').body[0];
				block_hoisted.push(inject);
			}
		})
		self.node.consequent.body.unshift.apply(self.node.consequent.body, block_hoisted);

		if (self.node.alternate){
			if (self.node.alternate.type === 'IfStatement'){
				var elif = new AstHook(self.scope, self.node.alternate);
				self.node.alternate = elif.node;
			}
			else {
				if (self.node.alternate.type !== 'BlockStatement'){
					var block = esprima.parse("{}").body[0];
					block.body.push(self.node.alternate);
					self.node.alternate = block;
				}

				var block_hoisted = [];
				self.node.alternate.body.forEach(function(node, index, body){
					var hook = new AstHook(self.scope, node);
					body[index] = hook.node;	// hook may have replaced the node
					// self.hooks.push(hook);
					// body[index] = new AstHook(self.scope, node).node;

					if (node.type === 'FunctionDeclaration'){
						// block_hoisted[node.id.name] = hook.result.protects;
						var inject = esprima.parse(self.scope.identifier()+'.addFunction('+node.id.name+', '+hook.result.scope_created.protects.identifier()+', "'+node.id.name+'")').body[0];
						block_hoisted.push(inject);
					}
				});
				self.node.alternate.body.unshift.apply(self.node.alternate.body, block_hoisted);
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
		self.hooks = [];
		self.node.properties.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node.value);
			node.value = hook.node;
			self.hooks.push(hook);
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
		var replace = esprima.parse(reference.identifier).body[0].expression;
		self.node = replace;
	},
}

/** Code object used for instrumented user code
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
	this.snapshots = [];

	this.status = Code.Status.READY;
	// this.process = null;

	// this.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, {
	// 	code_name: this.name,
	// 	source: this.source
	// })
}
Code.prototype = new EventEmitter();
Code.prototype.constructor = Code;
Code.prototype.save = function(file_path){
	var self = this;
	return new Promise(function(resolve, reject){
		fs.writeFile(file_path, jsBeautify(self.source), function(err){
			if (err) reject(err);
			else resolve(file_path);
		});
	});
}
Code.prototype.saveSnapshot = function(index, file_path){
	if (this.snapshots[index]){
		fs.writeFile(file_path, jsBeautify(JSON.stringify(this.snapshots[index].snapshot)), function(err){
			if (err) throw err;
		})
	}	
}
Code.prototype.saveLastSnapshot = function(file_path){
	if (this.snapshots.length > 0){
		fs.writeFile(file_path, jsBeautify(JSON.stringify(this.snapshots[this.snapshots.length-1].snapshot)), function(err){
			if (err) throw err;
		})
	}	
}
Code.prototype.saveSnapshots = function(dir_path){
	var self = this;
	dir_path = path.resolve(dir_path || './');
	self.snapshots.forEach(function(snap){
		fs.writeFile(path.join(dir_path, self.name+'-'+snap.created_at+'.json'),
			jsBeautify(JSON.stringify(snap.snapshot)),
			function(err){
				if (err) throw err;
			});
	})
}

Code.prototype.run = function(options){
	var self = this;
	return new Promise(function(resolve, reject){
		var started, ended;
		var forked = child_process.fork(path.join(__dirname, 'vm.js'));
		forked.send({ code: self.source, options: options }, function(){
			started = Date.now();
		});

		forked._requests = {};
		forked.on('close', function(exit_code, signal){
			console.log(chalk.red('Code '+self.name+' stdio closed ')+exit_code);
		});
		forked.on('error', function(err){
			reject(err);
		});
		forked.on('exit', function(exit_code, signal){
			ended = Date.now();
			// self.process = null;
			self.processes[forked.instance_id].status = Code.Status.EXITED;
			self.processes[forked.instance_id].elapsed = (ended - started);

			self.emit('run-finished', {
				exit_code: exit_code,
				signal: signal,
				elapsed: (ended - started)
			});
			console.log(chalk.red('Code '+self.name+' exited ')+exit_code+ ' --- '+(ended-started)+'ms');
		});
		forked.on('message', function(message){
			
			if (message.reply in forked._requests){
				forked._requests[message.reply].resolve(message.payload);
				delete forked._requests[message.reply];
			}
			else if (message.instance_id){ // should enter here just once when child process bootstraps
				forked.instance_id = message.instance_id;
				self.processes[forked.instance_id] = {
					id: forked.instance_id,
					pid: forked.pid,
					process: forked,
					status: Code.Status.RUNNING,
					// resourceUsage: []
				};
				resolve(self.processes[forked.instance_id]);
				
				self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, {
					code_name: self.name,
					instance_id: forked.instance_id,
					status: Code.Status.RUNNING,
					source: self.source
				})
			}
			else if (message.ctrl && message.ctrl === 'publish'){
				self.pubsub.publish(message.topic, message.message);
			}
			else if (message.timestamp){ // if there's timestamp, it's resource usage
				// self.processes[forked.instance_id].resourceUsage.push(message);
				self.pubsub.publish(self.name+'/'+forked.instance_id+'/resource', message);
			}
			else {
				console.log(chalk.yellow('[child:'+forked.pid+'] '+self.name+': ')+JSON.stringify(message));
			}
		});
		
		// self.process = forked;
		// self.status = Code.Status.RUNNING;
		// resolve(forked.pid);
	});
}
Code.prototype.ipcSend = function(instance_id, ctrl, kwargs){
	var self = this;
	return new Promise(function(resolve, reject){
		var instance = self.processes[instance_id];
		if (!instance) return reject('InstanceNotFound');
		// if (self.process !== null && self.process.connected){
		if (instance && instance.process.connected){
			var req_id = helpers.randKey(4);
			var deferred = helpers.defer();
			deferred.promise.then(function(reply){
				resolve(reply);
			}, function(err){
				reject(err);
			})
			// self.process._requests[req_id] = deferred;
			// self.process.send({ request: req_id, ctrl: ctrl, kwargs: kwargs });
			instance.process._requests[req_id] = deferred;
			instance.process.send({ request: req_id, ctrl: ctrl, kwargs: kwargs });
			setTimeout(function(){
				if (instance.process && req_id in instance.process._requests){
				// if (self.process && req_id in self.process._requests){
					deferred.reject({
						error: 'IPCTimeout',
						message: 'IPC Request timed out'
					});
					// delete self.process._requests[req_id];
					delete instance.process._requests[req_id];
				}
			}, 3000);
		}
		else {
			console.log(chalk.red('[ERROR] Code '+self.name+' ipcSend("'+instance_id+'", "'+ctrl+'"): No child process'));
		}	
	})
}

/** Pause the user code through IPC. This will work only if the user code was executed through Code.run.
 *    If the user code was executed as a standalone Node process (e.g. node user_code.js),
 *    it can only be paused through Pubsub.
 */
Code.prototype.pause = function(instance_id){
	var self = this;
	var instance = self.processes[instance_id];
	if (!instance) return Promise.reject('InstanceNotFound');
	if (instance.status === Code.Status.RUNNING){
		return self.ipcSend(instance_id, 'PAUSE').then(function(reply){
			instance.status = reply.status;
			self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, {
				code_name: self.name,
				instance_id: instance_id,
				status: instance.status
			})
			return instance.status;
		})
	}
	else {
		return Promise.resolve(instance.status)
	}
}
Code.prototype.resume = function(instance_id){
	var self = this;
	var instance = self.processes[instance_id];
	if (!instance) return Promise.reject('InstanceNotFound');
	if (instance.status === Code.Status.PAUSED){
		return this.ipcSend(instance_id, 'RESUME').then(function(reply){
			instance.status = reply.status;
			self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, {
				code_name: self.name,
				instance_id: instance_id,
				status: instance.status
			})
			return instance.status;
		})
	}
	else {
		return Promise.resolve(instance.status);
	}
}
Code.prototype.snapshot = function(instance_id, pause_after){
	var self = this;
	var instance = self.processes[instance_id];
	if (!instance) return Promise.reject('InstanceNotFound');
	return this.ipcSend(instance_id, 'SNAPSHOT', { pause_after: (pause_after || false) })
		.then(function(reply){
			self.snapshots.push({
				created_at: Date.now(),
				snapshot: reply.snapshot,
				time_taken: reply.time_taken
			})
			instance.status = reply.status;
			self.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, {
				code_name: self.name,
				instance_id: instance_id,
				status: instance.status
			});
			self.pubsub.publish(self.name+'/'+instance_id+'/snapshots', reply.snapshot);
			return reply.snapshot;
		});
}
Code.prototype.getStats = function(instance_id){
	var self = this;
	return this.ipcSend(instance_id, 'STATS')
}
Code.prototype.kill = function(){
	// if (this.process){
	// 	this.process.kill();
	// 	this.process = null;
	// 	this.status = Code.Status.READY;
	// }
	Object.values(this.processes).forEach(function(instance){
		instance.process.kill();
		instance.status = Code.Status.EXITED;
	})
}


/* Static methods */
Code.Status = {
	READY: 'Ready',
	RUNNING: 'Running',
	PAUSED: 'Paused',
	EXITED: 'Exited'
}

/**
 * Return instrumented code string
 * @param {string} raw_code
 */
Code.instrument = function(pubsub, code_name, raw_code){
	// var started = Date.now();
	var ast = esprima.parse(raw_code);

	var root_scope = new StaticScope('root');		// Create root scope (static scope)
	var hook = new AstHook(root_scope, ast);		// Process the AST

	// Prepare the things-js template
	var template_str = `(function(${SCOPE_PREFIX}){})(require('things-js').bootstrap('${pubsub.url}', '${code_name}'));`;
	var template = esprima.parse(template_str);
	// WARNING: the following depends on esprima output, and might break if esprima changes its format
	template.body[0].expression.callee.body.body = ast.body;

	var result = escodegen.generate(template);

	// var ended = Date.now();
	// (DEBUG && console.log(chalk.green('Instrumented in '+(ended - started)+'ms')));
	return result;
}

/** Create a dummy Code object without initializing the properties. This method is used when restoring code from a snapshot.
 */
Code.createEmpty = function(){
	var code = Object.create(Code.prototype);
	code.pubsub = null;
	code.name = null;
	code.source_raw = null;
	code.source = null;
	code.processes = {};
	code.snapshots = [];
	return code;
}
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
Code.fromSnapshot = function(snapshot){
	
	var code = Code.createEmpty();
	code.pubsub = new Pubsub(snapshot.meta.pubsub);
	code.name = snapshot.meta.code_name;
	// code.uid = snapshot.meta.uid;

	var watch = helpers.StopWatch().start();
	var content = Scope.generateCode(snapshot);
	watch.stop();
	
	Object.keys(snapshot.timers).forEach(function(id){
		content += Timer.generateCode(snapshot.timers[id]);
	});

	code.source = `(function(${SCOPE_PREFIX}){ ${content} })(require('things-js').bootstrap('${code.pubsub.url}', '${snapshot.meta.code_name}/${snapshot.meta.instance_id}'));`;
	// console.log(jsBeautify(code.source));
	code.source = jsBeautify(code.source);

	// code.pubsub.publish(PROGRAM_MONITOR_NAMESPACE, {
	// 	code_name: code.name,
	// 	source: code.source
	// });

	return code;
}
Code.fromSnapshotFile = function(snapshot_path){
	var snapshot = JSON.parse(fs.readFileSync(snapshot_path).toString());
	return Code.fromSnapshot(snapshot);
}


function Timer(root_scope, type, callback, timedelta, timer_id){
	this.id = (timer_id || helpers.randKey(8));
	this.root_scope = root_scope;
	if (root_scope) this.root_scope.timers[this.id] = this;
	
	this.ref = null;
	this.ref_type = null;
	this.type = type;
	this.callback = callback;
	this.timedelta = timedelta || 0;

	this.created_at = Date.now();

	this.called_at = undefined;
	this.cleared_at = undefined;
	this.stopped_at = undefined;

	this.freeze();
};
Timer.prototype.start = function(){
	var self = this;

	self.called_at = Date.now();
	this.ref = global['set'+this.type](function(){
		self.callback();
		self.cleared_at = Date.now();
		// self.callback[PROPERTY_PREFIX+'parent'].removeChild(self.callback[PROPERTY_PREFIX+'scope']);
		// ((self.type !== 'Interval') && ((delete self.root_scope.timers[self.id]), (self.unfreeze())) );
		((self.type !== 'Interval') && (delete self.root_scope.timers[self.id]) );
	}, self.timedelta);
	this.ref_type = this.type;
};
Timer.prototype.pause = function(){
	// console.log(chalk.red('    pausing ')+this.type+' '+this.id);
	global['clear'+this.ref_type](this.ref);
	this.ref = null;
	this.stopped_at = Date.now();
	this.remaining = this.timedelta - (this.stopped_at - (this.cleared_at || this.called_at));

	// console.log(this.type+' paused, elapsed = '+(this.stopped_at - (this.cleared_at || this.called_at))+', remaining = '+this.remaining);
	// console.log(this.stopped_at);
};
Timer.prototype.resume = function(){
	var self = this;
	if (self.remaining){
		if (self.type === 'Timeout'){
			// console.log('Timeout after '+self.remaining);
			self.called_at = Date.now();
			self.ref = setTimeout(function(){
				self.callback();
				self.cleared_at = Date.now();
				// self.callback[PROPERTY_PREFIX+'parent'].removeChild(self.callback[PROPERTY_PREFIX+'scope']);
				delete self.root_scope.timers[self.id]
			}, self.remaining);
			self.ref_type = self.type;
		}
		else if (self.type === 'Interval'){
			// console.log('Interval '+self.timedelta+' after '+self.remaining);
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
				self.ref_type = self.type;
				// console.log(chalk.blue('    resumed ')+self.type+' '+self.id);
			}, self.remaining);
			self.ref_type = 'Timeout';
		}	
	}
	else {
		return self.start();
	}
};
Timer.prototype.getSerializable = function(){
	return {
		id: this.id,
		type: this.type,
		callback: this.callback[PROPERTY_PREFIX+'uri'],
		timedelta: this.timedelta,
		called_at: this.called_at,
		cleared_at: this.cleared_at,
		stopped_at: this.stopped_at
	}
}
Timer.generateCode = function(obj){
	var callback = SCOPE_PREFIX+'.getFunction("'+obj.callback.split('/').slice(1).join('/')+'")'
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
// Experimental
Timer.prototype.freeze = function(){
	var scope = this.callback[PROPERTY_PREFIX+'parent'];
	while (scope){
		// scope.frozen = true;
		scope.in_use = true;
		scope = scope.parent;
	}
}
// Experimental
Timer.prototype.unfreeze = function(){
	var scope = this.callback[PROPERTY_PREFIX+'parent'];
	while (scope){
		// scope.frozen = false;
		scope.in_use = false;
		scope = scope.parent;
	}
}


/** Pre-processor before serializing Scope Tree; this is needed to serialize more complex objects.
 */
var NATIVE_TRANSFORMERS = {
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
			return SCOPE_PREFIX+'.getFunction("'+(item.value.split('/').slice(1).join('/'))+'")';
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
			})
			return safe;
		},
		makeCode: function(item){
			var handlers = '{'+Object.keys(item.value.handlers).map(function(topic){
				return '"'+topic+'":'+NATIVE_TRANSFORMERS['Function'].makeCode(item.value.handlers[topic])
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

	if (item.constructor && item.constructor.name in NATIVE_TRANSFORMERS) return NATIVE_TRANSFORMERS[item.constructor.name].makeSerializable(item);
	// If item.constructor is undefined, then object might have been created with Object.create(null). In this case, proceed normally as it's a native JS object.

	// For now, if it's a "require"d object, require it on the target node instead of migrating object.
	if ((PROPERTY_PREFIX+'import') in item){
		return {
			type: 'things-js.import',
			value: item[PROPERTY_PREFIX+'import']
		}
	};

	var safe = {};
	Object.keys(item).forEach(function(key){
		// if (key === PROPERTY_PREFIX+'scope'){
		// 	// console.log(item);
		// 	item[key].frozen = true;
		// }
		safe[key] = makeSerializable(item[key]);
	})
	
	return {
		type: item.constructor.name,
		proto_uri: item.constructor[PROPERTY_PREFIX+'uri'],
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
		return SCOPE_PREFIX+'.restoreObject({'+props.join(',')+'}, "'+item.proto_uri.split('/').slice(1).join('/')+'")'
	}
	else {
		return '{'+props.join(',')+'}';
	}
}

/** Scope object injected into the user code; it's used in the same execution context.
 * @constructor
 */
function Scope(instance, arg1, id, parent, params, hoisted, uid){
	var self = this;
	// EventEmitter.call(this);
	if (arg1 instanceof Function){
		this.func_name = arg1.name;
		// arg1[PROPERTY_PREFIX+'scope'] = this;
		if (parent){
			arg1[PROPERTY_PREFIX+'post'] = function(message){
				if (!self.in_use) parent.removeChild(self);
				// console.log(message);
			};
		}
		
		this.fn = arg1;

		if (instance instanceof arg1){
			// console.log(chalk.red("NEW SCOPE ")+arg1.name+' for instance ', instance);
			instance[PROPERTY_PREFIX+'scope'] = this;
			// console.log(chalk.blue("new "+arg1.name+" called! attaching scope to instance"));
		}
	}
	else {
		// console.log(chalk.red(id), instance, arg1);
		this.func_name = arg1;
	}
	this.id = id;
	this.uid = uid || this.id+'_'+helpers.randKey(4);
	this.parent = parent || null;
	// this.level = parent ? parent.level+1 : 0;

	this.children = {};
	if (this.parent){
		// this.parent.children[this.uid] = this;
		this.parent.addChild(this);
	}

	this.params = Object.assign({}, (params || {}));	// Important that we create a copy, otherwise this.refs points to the same object.
	this.hoisted = {};
	this.refs = params || {};
	this.funcs = {};

	this.wrapped = {};

	(hoisted && this.hoist(hoisted));	// shortcut for hoisting via argument
}
// Used only for debugging - unlike StaticScope, this identifier function is not involved in migration routine
Scope.prototype.identifier = function(){
	if (this.parent === null) return this.id;
	else return this.parent.identifier()+'_'+this.id;
}
Scope.prototype.uri = function(){
	if (this.parent === null) return SCOPE_PREFIX;
	else return this.parent.uri()+'/'+this.uid;
}
Scope.prototype.addChild = function(scope){
	this.children[scope.uid] = scope;
}
Scope.prototype.removeChild = function(scope){
	((scope.uid in this.children) && (delete this.children[scope.uid]));
}
Scope.prototype.getScope = function(uri){
	var tokens = (uri instanceof Array) ? uri : uri.split('/');
	if (tokens.length === 0) return this;
	if (tokens[0] in this.children){
		return this.children[tokens[0]].getScope(tokens.slice(1));
	}
	else {
		return undefined;
	}
}
Scope.prototype.protectAncestry = function(ancestor){
	this.in_use = true;
	
	if (!(ancestor) || (ancestor === this) || (!(this.parent))) return;
	else return this.parent.protectAncestry(ancestor);
}
Scope.prototype.hoist = function(funcs){
	var self = this;
	funcs.forEach(function(func_meta){
		// self.addFunction(func_meta[0], func_meta[1], func_meta[0].name);
		// self.hoisted[func_meta[0].name] = func_meta[0];
		// self.refs[func_meta[0].name] = func_meta[0];
		// self.refs[func_meta[0].name] = self.wrapped[func_meta[0].name];
		// self.refs[func_meta[0].name] = self.funcs[func_meta[0].name];

		self.refs[func_meta[0].name] = self.hoisted[func_meta[0].name] = self.addFunction(func_meta[0], func_meta[1], func_meta[0].name);
	})
}
/**
 * @param {Function} func - Function to add to scope
 * @param {string} uid - (optional) UID to assign for the func (used in restoration)
 */
Scope.prototype.addFunction = function(func, protects, uid){
	var self = this;

	// ATTN: Wrapping the function to detect end of a function call.
	//     we do this to destroy Scopes that are obviously not needed anymore.
	function wrapped(){
		if (this instanceof wrapped){
			return func.apply(this, arguments);
		}
		else {
			var result = func.apply(this, arguments);
			((typeof result !== 'function') 
				&& (!result || typeof result !== 'object') 
				&& func[PROPERTY_PREFIX+'post'](chalk.yellow(func.name)+' is done') );
			// console.log(chalk.yellow(func.name)+' is done');
			return result;
		}
	}

	// func[PROPERTY_PREFIX+'uid'] = uid || func.name+'.'+helpers.randKey(6);		// .uid is the unique identifier within the parent scope
	// wrapped[PROPERTY_PREFIX+'uri'] = func[PROPERTY_PREFIX+'uri'] = this.uri()+'/'+func[PROPERTY_PREFIX+'uid'];	// .uri is the universal identifier for the global scope
	// wrapped[PROPERTY_PREFIX+'parent'] = func[PROPERTY_PREFIX+'parent'] = this;						// parent is the parent scope
	// wrapped[PROPERTY_PREFIX+'protects'] = func[PROPERTY_PREFIX+'protects'] = protects || null;		// the eldest scope that this function depends on
	// wrapped[PROPERTY_PREFIX+'raw'] = func;

	// this.funcs[func[PROPERTY_PREFIX+'uid']] = func;				// store the function in the parent scope
	// this.wrapped[func[PROPERTY_PREFIX+'uid']] = wrapped;

	wrapped[PROPERTY_PREFIX+'uid'] = uid || func.name+'.'+helpers.randKey(6);		// .uid is the unique identifier within the parent scope
	wrapped[PROPERTY_PREFIX+'uri'] = this.uri()+'/'+wrapped[PROPERTY_PREFIX+'uid'];	// .uri is the universal identifier for the global scope
	wrapped[PROPERTY_PREFIX+'parent'] = this;						// parent is the parent scope
	wrapped[PROPERTY_PREFIX+'protects'] = protects || null;		// the eldest scope that this function depends on
	wrapped[PROPERTY_PREFIX+'raw'] = func;

	this.funcs[wrapped[PROPERTY_PREFIX+'uid']] = wrapped;
	
	return wrapped;
}
Scope.prototype.getFunction = function(uri){
	var tokens = uri.split('/');
	var scope = this.getScope(tokens.slice(0, -1));
	if (scope) return scope.funcs[tokens[tokens.length-1]];
	// if (scope) return scope.wrapped[tokens[tokens.length-1]];
	else throw "No Scope found for "+uri;
}
Scope.prototype.getRawFunction = function(uri){
	var tokens = uri.split('/');
	var scope = this.getScope(tokens.slice(0, -1));
	// if (scope) return scope.funcs[tokens[tokens.length-1]];
	if (scope) return scope.funcs[tokens[tokens.length-1]];
	else throw "No Scope found for "+uri;
}
function gcPrescan(obj){
	if (obj && (typeof obj === 'object') && (obj[PROPERTY_PREFIX+'scope'])){
		obj[PROPERTY_PREFIX+'scope'].protectAncestry();
		Object.keys(obj).forEach(function(prop){
			// Commented out for now, to optimize. Cycle detection missing
			if (prop !== PROPERTY_PREFIX+'scope'){
				gcPrescan(obj[prop]);
			}
			// if (typeof obj[prop] === 'function'){
			// 	obj[prop][PROPERTY_PREFIX+'parent'].protectAncestry(obj[PROPERTY_PREFIX+'protects']);
			// }
		})
	}
	else if (typeof obj === 'function'
		&& obj[PROPERTY_PREFIX+'parent']){	// TODO: need to handle "require"d objects
		obj[PROPERTY_PREFIX+'parent'].protectAncestry(obj[PROPERTY_PREFIX+'protects']);
		// obj[PROPERTY_PREFIX+'protects'].in_use = true;
	}
}
Scope.prototype.gc = function(sum, indent){
	var self = this;
	indent = indent || 0;
	// console.log(helpers.indent(indent)+chalk.blue(this.uri())+' GC Scan - '+(!!this.frozen));
	Object.keys(this.refs).forEach(function(key){
		var obj = self.refs[key];
		gcPrescan(obj);
	})
	// console.log(helpers.indent(indent)+chalk.blue(this.uri())+' Pruning');
	Object.values(this.children).forEach(function(child){
		sum += child.gc(0, indent+4);
		
	});
	// console.log(helpers.indent(indent)+chalk.red(this.uri())+' GC Frozen - '+(!!this.frozen));
	if (!(this.in_use) && this.parent){
		this.parent.removeChild(this);
		return 0;
	}
	else {
		// console.log(helpers.indent(indent)+chalk.yellow(this.uri()));
		return sum + 1;
	}
}

Scope.prototype.getSerializable = function(options){
	options = options || { processed: [] };
	var self = this;
	var safe = {
		id: self.id,
		uid: self.uid,
		func_name: self.func_name,
		params: {},
		hoisted: {},
		funcs: {},
		refs: {},
		children: {}
	}
	Object.keys(this.params).forEach(function(key){
		safe.params[key] = makeSerializable(self.params[key]);
	})
	// if (Object.keys(this.hoisted).length > 0){
	// 	console.log(chalk.red("Scope hoisted: ")+Object.keys(this.hoisted).join(', '));
	// }
	Object.keys(this.hoisted).forEach(function(key){
		// safe.hoisted[key] = self.wrapped[key][PROPERTY_PREFIX+'protects'].identifier();
		safe.hoisted[key] = self.hoisted[key][PROPERTY_PREFIX+'uid'];
	});

	Object.keys(this.funcs).forEach(function(key){
		safe.funcs[key] = {
			type: 'Function',
			value: self.funcs[key][PROPERTY_PREFIX+'raw'].toString(),
			protects: (self.funcs[key].protects ? self.funcs[key].protects.identifier() : self.identifier()),
			proto: makeSerializable(self.funcs[key].prototype),
			properties: {}
		}
		Object.keys(self.funcs[key]).forEach(function(prop){
			// console.log(prop);
			if (prop[0] !== PROPERTY_PREFIX){
				safe.funcs[key].properties[prop] = makeSerializable(self.funcs[key][prop]);
			}
		});
	});

	Object.keys(this.refs).forEach(function(key){
		if (self.refs[key] && self.refs[key].__uri){
		// if (options.processed.indexOf(self.refs[key].__uri) > -1){
			safe.refs[key] = {
				type: 'things-js.reference',
				uri: self.refs[key].__uri
			}
		}
		else {
			safe.refs[key] = makeSerializable(self.refs[key]);
			if (safe.refs[key] && (typeof safe.refs[key] === 'object')){
				self.refs[key].__uri = self.identifier()+'.refs.'+key;
				options.processed.push(self.refs[key].__uri);
			}
			
		}
	})
	Object.keys(this.children).forEach(function(key){
		// Experimental
		// if (self.children[key].in_use === true){
		// 	safe.children[key] = self.children[key].getSerializable(options);
		// }

		safe.children[key] = self.children[key].getSerializable(options);
	})
	return safe;
}

Scope.generateCode = function(obj, parent){
	var identifier;
	if (!parent){
		identifier = obj.id;
	}
	else {
		identifier = parent+'_'+obj.id;
	}
	
	var code = '';
	Object.keys(obj.hoisted).forEach(function(key){
		// code += obj.funcs[obj.hoisted[key]].value+';';
		code += obj.funcs[key].value+';';
	});
	Object.keys(obj.funcs).forEach(function(key){
		if (!(key in obj.hoisted)){
			code += identifier+'.addFunction('+obj.funcs[key].value+', '+obj.funcs[key].protects+', "'+key+'");';
		}
	});

	// Need to restore the closures first, as some of the references may be referring to objects created by the closures.
	Object.keys(obj.children).forEach(function(key){
		code += Scope.generateCode(obj.children[key], identifier);
	});

	// Process prototypes and properties of functions
	Object.keys(obj.funcs).forEach(function(key){
		var proto = obj.funcs[key].proto.value;
		Object.keys(proto).forEach(function(prop){
			code += identifier+'.funcs["'+key+'"].prototype.'+prop+' = '+makeCode(proto[prop])+';';
		})
		var props = obj.funcs[key].properties;
		Object.keys(props).forEach(function(prop){
			// code += identifier+'.wrapped["'+key+'"].'+prop+' = '+identifier+'.funcs["'+key+'"].'+prop+' = '+makeCode(props[prop])+';';
			code += identifier+'.funcs["'+key+'"].'+prop+' = '+makeCode(props[prop])+';';
		})
	});

	// Restore variables
	Object.keys(obj.refs).forEach(function(key){
		var item = makeCode(obj.refs[key]);
		// console.log(item);
		code += identifier+'.refs.'+key+' = '+item+';';
	});
	

	if (parent){
		var params = '{'+Object.keys(obj.params).map(function(key){ return key+':'+key }).join(',')+'}';
		var hoisted = '['+Object.keys(obj.hoisted).map(function(key){ return '['+key+','+obj.funcs[key].protects+']' }).join(',')+']';

		var template = '(function '+obj.func_name+'('+Object.keys(obj.params).join(',')+'){'
		template += 'var '+identifier+' = new '+SCOPE_PREFIX+'.Scope(this, '+obj.func_name+", '"+obj.id+"', "+parent+', '+params+', '+hoisted+', "'+obj.uid+'");';
		template += code;
		template += '}('+Object.values(obj.params).map(makeCode).join(',')+'));';
		code = template;
	}
	else {
		code = identifier+'.hoist(['+Object.keys(obj.hoisted).map(function(key){ return '['+key+','+obj.funcs[key].protects+']' }).join(',')+']);' + code;
	}

	return code;
}

/** Attach some functions that should be available only on the root scope.
 *    intercepted native functions (e.g. setTimeout, console.log, etc.) are replaced with custom functions
 */
function RootScope(pubsub_url, code_uri){
	Scope.call(this, null, 'root', SCOPE_PREFIX);
	var identity = code_uri.split('/');
	this.uid = SCOPE_PREFIX;
	this.meta = {
		pubsub: (process.connected ? new Pubsub.Dummy(pubsub_url) : new Pubsub(pubsub_url) ),
		code_name: identity[0],
		instance_id: (identity[1] || helpers.randKey())
	};
	this.timers = {};

	this.in_use = true;

	this.gc_timer = new Timer(null, 'Interval', this.gc.bind(this), 1000);
	this.gc_timer.start();
	// this.logging = './logs/'+code_name+'-'+Date.now()+'.log';
}
RootScope.prototype = new Scope();
RootScope.prototype.constructor = RootScope;

RootScope.prototype.Scope = Scope;
RootScope.prototype.Pubsub = Pubsub;

RootScope.prototype.snapshot = function(){
	var self = this;
	self.gc();	// Important - unused scopes should be discarded before snapshotting
	// var started = Date.now();
	var serialize_safe = Object.assign({
		meta : {
			pubsub: self.meta.pubsub.url,
			code_name: self.meta.code_name,
			instance_id: self.meta.instance_id
		},
		timers: {},
	}, self.getSerializable());
	Object.keys(self.timers).forEach(function(id){
		serialize_safe.timers[id] = self.timers[id].getSerializable();
	});
	// serialize_safe.meta.time_taken = (Date.now() - started);
	return serialize_safe
}
RootScope.prototype.createObject = function(){
	var args = Array.prototype.slice.call(arguments);	// args[0] is a wrapped function.
	function Constructor(){
		// return args[0][PROPERTY_PREFIX+'raw'].apply(this, args.slice(1));
		return args[0].apply(this, args.slice(1));
	}
	// if (typeof args[0][PROPERTY_PREFIX+'raw'].prototype === 'object'){
	if (typeof args[0].prototype === 'object'){
		// partial.prototype = Object.create(Constructor.prototype);
		// Constructor.prototype = args[0][PROPERTY_PREFIX+'raw'].prototype;
		Constructor.prototype = args[0].prototype;
	}
	return new Constructor;

	// var args = Array.prototype.slice.call(arguments);
	// var Constructor = this.getRawFunction(args[0]);
	// var created = new Constructor(args.slice(1));
	// return created;
}
RootScope.prototype.restoreObject = function(obj, proto_uri){
	// var proto = this.getRawFunction(proto_uri).prototype;
	var proto = this.getFunction(proto_uri).prototype;
	var created = Object.create(proto);
	Object.keys(obj).forEach(function(prop){
		created[prop] = obj[prop];
	});
	return created;
};
RootScope.prototype.require = function(module_path){
	var module = require(module_path);
	module[PROPERTY_PREFIX+'import'] = module_path;
	return module;
};
RootScope.prototype.log = function(){
	console.log.apply(null, arguments);
	// Publish console messages (TODO: make this user-configurable)
	this.meta.pubsub.publish(this.meta.code_name+'/'+this.meta.instance_id+'/console', Array.from(arguments));
};
RootScope.prototype.setTimeout = function(callback, timedelta, timer_id){
	var timer = new Timer(this, 'Timeout', callback, timedelta, timer_id);
	timer.start();
	return timer.id;
};
RootScope.prototype.setInterval = function(callback, timedelta, timer_id){
	var timer = new Timer(this, 'Interval', callback, timedelta, timer_id);
	timer.start();
	return timer.id;
};
RootScope.prototype.setImmediate = function(callback, timer_id){
	var timer = new Timer(this, 'Immediate', callback, 0, timer_id);
	timer.start();
	return timer.id;
};
RootScope.prototype.clearTimeout = function(timer_id){
	this.timers[timer_id].pause();
	delete this.timers[timer_id];
};
RootScope.prototype.clearInterval = function(timer_id){
	this.timers[timer_id].pause();
	delete this.timers[timer_id];
};
RootScope.prototype.clearImmediate = function(timer_id){
	this.timers[timer_id].pause();
	delete this.timers[timer_id];
};
RootScope.prototype.restoreInterval = function(callback, timedelta, timer_id, remaining){
	var timer = new Timer(this, 'Interval', callback, timedelta, timer_id);
	timer.remaining = remaining;
	timer.resume();
	return timer.id;
};

RootScope.prototype.pauseTimers = function(){
	Object.values(this.timers).forEach(function(timer){
		timer.pause();
		timer.freeze();	//Experimental
	});
	this.gc_timer.pause();
};
RootScope.prototype.resumeTimers = function(){
	Object.values(this.timers).forEach(function(timer){
		// timer.unfreeze();	//Experimental
		timer.resume();
	});
	this.gc_timer.resume();
};

RootScope.prototype.gc = function(){
	// console.log('---------')
	Object.values(this.timers).forEach(function(timer){
		// console.log('Protecting timer scope '+timer.callback[PROPERTY_PREFIX+'parent'].uri());
		timer.callback[PROPERTY_PREFIX+'parent'].protectAncestry(timer.callback[PROPERTY_PREFIX+'protects']);
		// console.log('    until '+timer.callback[PROPERTY_PREFIX+'protects'].uri());
	});
	var sum = Scope.prototype.gc.call(this, 0);
	(DEBUG && console.log(" --- "+sum+" scopes ---"));
	// console.log(" --- "+sum+" scopes ---")
};

var ProcessHandler = {
	PAUSE: function(root_scope){
		root_scope.pauseTimers();
		console.log(chalk.yellow('--- Paused <'+root_scope.meta.code_name+'> ---'));
		return { status: Code.Status.PAUSED };
	},
	RESUME: function(root_scope){
		console.log(chalk.green('--- Resuming <'+root_scope.meta.code_name+'> ---'));
		root_scope.resumeTimers();
		return { status: Code.Status.RUNNING };
	},
	SNAPSHOT: function(root_scope, kwargs){
		root_scope.pauseTimers();
		var status = Code.Status.PAUSED;
		console.log(chalk.yellow('--- Paused <'+root_scope.meta.code_name+'> ---'));
		
		var started = Date.now();
		var safe = root_scope.snapshot();
		var elapsed = Date.now() - started;

		console.log('Snapshot taken in '+elapsed+' ms');

		if (!kwargs.pause_after){
			console.log(chalk.green('--- Resuming <'+root_scope.meta.code_name+'> ---'));
			root_scope.resumeTimers();
			status = Code.Status.RUNNING;
		}

		return { status: status, snapshot: safe, time_taken: elapsed };
	},
	STATS: function(root_scope, kwargs){
		return { memory: process.memoryUsage() }
	}
}

Code.bootstrap = function(pubsub_url, code_uri){
	// Initialize Pubsub object, create root scope and return it.
	var root_scope = new RootScope(pubsub_url, code_uri);

	// IPC Listeners - same functionality can be done via Pubsub.
	// when using IPC the messages are coming directly from the Code instance.
	if (process.connected){
		process.send({ instance_id: root_scope.meta.instance_id });
		process.on('message', function(message){
			if (message.ctrl in ProcessHandler){
				var result = ProcessHandler[message.ctrl](root_scope, message.kwargs);
				process.send({ reply: message.request, payload: result });
			}
			else {
				process.send({ error: 'UnknownCtrl', message: message });
			}
		});

		// Report resource usage to master process (TODO: make this optional)
		setInterval(function(){
			var self = this;
			pidusage.stat(process.pid, function(err, stat) {
				process.send({
					timestamp: Date.now(),
					memory: process.memoryUsage(),
					cpu: stat.cpu
				})
				// self.pubsub.publish(self.id+'/resource', {
				// 	timestamp: Date.now(),
				// 	memory: process.memoryUsage(),
				// 	cpu: stat.cpu
				// })
			});
		}, 1000);
	}

	return root_scope
}

module.exports = Code;