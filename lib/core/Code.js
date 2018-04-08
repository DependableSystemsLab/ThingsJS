'use strict'
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');
var esprima = require('esprima');
var escodegen = require('escodegen');
var jsBeautify = require('js-beautify').js_beautify;
var chalk = require('chalk');
var Pubsub = require('./Pubsub.js');
var helpers = require('../helpers.js');

var DEBUG = (process.env.DEBUG === 'true');
var HUMAN_FRIENDLY = false;

// These greek letter prefixes are used to prevent conflicting names with user code.
var SCOPE_PREFIX = 'Σ';			// prefix for Scope identifiers
var PROPERTY_PREFIX = 'τ';		// prefix for injected properties
var ANONYMOUS_PREFIX = 'α';		// prefix for anonymous functions

/* TODO:
 *   - require statements (instrumenting dependencies)
 *   - async callbacks in the event loop other than timers
 *   - detecting the end of execution / scope destruction
 */

/* Currently Experimenting:
 *   - Timer "freeze" and "unfreeze" for tracking relevant scopes during serialization
 *   - Timer removeChild(scope) for destroying callback's scope
 *   - Scope.getSerializable(options) - options.processed array for tracking objects already serialized
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
	this.funcs = {};

	this.refs = {};		// refs maps identifiers to params, vars, or funcs. This is relevant only for StaticScope as this is applied in lexical context only.	

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
		// console.log(node);
		if (node.type === 'VariableDeclaration'){
			node.declarations.forEach(function(declaration){
				self.refs[declaration.id.name] = declaration.id.name;
			})
		}
		else if (node.type === 'FunctionDeclaration'){
			self.hoisted[node.id.name] = node;
			self.refs[node.id.name] = node.id.name;
		}
	});
}
StaticScope.prototype.findRef = function(raw_name){
	if (raw_name in this.refs) return this.identifier()+'.refs.'+raw_name;
	if (this.parent !== null) return this.parent.findRef(raw_name);
	else {
		console.log(chalk.red('[WARNING] Could not find scope for ')+raw_name);
		return raw_name;
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
		AstHook.onEnter[this.node.type](this);	
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
AstHook.NATIVE_KEYWORDS = ['Object', 'Function', 'Array', 'String', 'Number', 'Boolean', 'Date', 'Math', 'Error'];
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
		var hoisted = '['+Object.keys(self.scope.hoisted).join(',')+']';
		if (Object.keys(self.scope.hoisted).length > 0) injections.push(self.scope.identifier()+'.hoist('+hoisted+')');
		var inject = esprima.parse(injections.join(';')).body;
		self.node.body.unshift.apply(self.node.body, inject);
	},
	FunctionDeclaration: function(self){
		var func_scope = new StaticScope(self.node.id.name, self.scope);

		self.node.params.forEach(function(param){
			func_scope.params[param.name] = param;
			// func_scope.vars[param.name] = param;
			func_scope.refs[param.name] = param;
		});
		// func_scope.hoist(self.node);
		func_scope.initRefs(self.node);
		self.scope.funcs[self.node.id.name] = self.node;

		self.hooks = [];
		self.node.body.body.forEach(function(node, index, body){
			var hook = new AstHook(func_scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			self.hooks.push(hook);
		})

		// After processing the body
		var injections = [];
		var params = '{'+self.node.params.map(function(param){ return param.name+':'+param.name }).join(',')+'}';
		var hoisted = '['+Object.keys(func_scope.hoisted).join(',')+']';
		injections.push(['var', func_scope.identifier(), '=', 'new '+SCOPE_PREFIX+".Scope(this, "+self.node.id.name+", '"+func_scope.id+"', "+func_scope.parent.identifier()+", "+params+", "+hoisted+")" ].join(' '));
		
		var inject = esprima.parse(injections.join(';')).body;
		self.node.body.body.unshift.apply(self.node.body.body, inject);


	},
	FunctionExpression: function(self){
		// Similar to FunctionDeclaration, but here the function can be anonymous.

		// If function is anonymous, assign some name. We need the name for migration
		if (self.node.id === null){
			self.node.id = esprima.parse(ANONYMOUS_PREFIX+helpers.randKey(4)).body[0].expression;
			// console.log(self.node.id);
		}

		// Using (FunctionDeclaration)
		AstHook.onEnter.FunctionDeclaration(self);

		// FunctionExpression should be wrapped with addFunction call
		var replace = esprima.parse(self.scope.identifier()+'.addFunction()').body[0].expression;
		replace.arguments.push(self.node);
		self.node = replace;
	},
	CallExpression: function(self){
		// console.log(escodegen.generate(self.node));
		// Intercept console.log calls
		if (self.node.callee.type === 'MemberExpression'){
			if (self.node.callee.object.name === 'console'
				&& self.node.callee.property.name === 'log'){
				self.node.callee.object.name = SCOPE_PREFIX;
			}
			else if (AstHook.NATIVE_KEYWORDS.indexOf(self.node.callee.object.name) > -1){
				// Do nothing
			}
			else {
				var hook = new AstHook(self.scope, self.node.callee);
				self.node.callee = hook.node;
			}
		}
		else if (self.node.callee.type === 'Identifier'){
			if (['setImmediate', 'setTimeout', 'setInterval', 'clearImmediate', 'clearTimeout', 'clearInterval'].indexOf(self.node.callee.name) > -1){
				var replace = esprima.parse(SCOPE_PREFIX+'.'+self.node.callee.name).body[0].expression;
				self.node.callee = replace;
			}
			else if (AstHook.NATIVE_KEYWORDS.indexOf(self.node.callee.name) > -1){
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
		self.hooks = [];
		self.node.arguments.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			self.hooks.push(hook);
		});
	},
	AssignmentExpression: function(self){
		var l_hook = new AstHook(self.scope, self.node.left);
		self.node.left = l_hook.node;

		var r_hook = new AstHook(self.scope, self.node.right);
		self.node.right = r_hook.node;
	},
	UpdateExpression: function(self){
		if (self.node.argument.type === 'Identifier'){
			// var reference = self.scope.findRef(self.node.argument.name);
			// var replace = esprima.parse(reference).body[0].expression;
			// self.node.argument = replace;
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
			if (declaration.init !== null){
				// self.scope.updateRef(var_name, 'AssignmentExpression');
				var hook = new AstHook(self.scope, declaration.init);
				// replace.expression.right.right = hook.node;
				replace.expression.right = hook.node;
			}
			self.node = replace;
		}
		else {
			var replacements = [];
			self.node.declarations.forEach(function(declaration){
				// Store information about variable in StaticScope
				var var_name = declaration.id.name;
				// self.scope.vars[var_name] = declaration.init;
				self.scope.refs[var_name] = declaration.init;

				replacements.push(self.scope.identifier()+'.refs.'+var_name+' = undefined');
			});
			replacements = esprima.parse(replacements.join(',')).body[0];
			replacements.expression.expressions.forEach(function(statement){
				var var_name = statement.left.property.name;

				if (self.scope.refs[var_name] !== null){
					statement.right = self.scope.refs[var_name];
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

		self.hooks = [];
		self.node.body.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			self.hooks.push(hook);
		})
	},
	DoWhileStatement: function(self){
		return AstHook.onEnter['WhileStatement'](self);
	},
	ForStatement: function(self){
		self.node.init = new AstHook(self.scope, self.node.init).node;
		if (self.node.init.type === 'ExpressionStatement') self.node.init = self.node.init.expression;
		self.node.test = new AstHook(self.scope, self.node.test).node;
		if (self.node.test.type === 'ExpressionStatement') self.node.test = self.node.test.expression;
		self.node.update = new AstHook(self.scope, self.node.update).node;
		if (self.node.update.type === 'ExpressionStatement') self.node.update = self.node.update.expression;

		if (self.node.body.type !== "BlockStatement"){
			var block = esprima.parse("{}").body[0];
			block.body.push(self.node.body);
			self.node.body = block;
		}
		self.hooks = [];
		self.node.body.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			self.hooks.push(hook);
		})
		// return AstHook.onEnter['WhileStatement'](self);
	},
	IfStatement: function(self){
		// console.log(self);
		if (self.node.consequent.type !== "BlockStatement"){
			var block = esprima.parse("{}").body[0];
			block.body.push(self.node.consequent);
			self.node.consequent = block;
		}
		self.node.test = new AstHook(self.scope, self.node.test).node;

		self.hooks = [];
		self.node.consequent.body.forEach(function(node, index, body){
			var hook = new AstHook(self.scope, node);
			body[index] = hook.node;	// hook may have replaced the node
			self.hooks.push(hook);
		})

		if (self.node.alternate){
			if (self.node.alternate.type === 'IfStatement'){
				// AstHook.onEnter['IfStatement'](self.node.alternate);
				var elif = new AstHook(self.scope, self.node.alternate);
				self.node.alternate = elif.node;
			}
			else {
				if (self.node.alternate.type !== 'BlockStatement'){
					var block = esprima.parse("{}").body[0];
					block.body.push(self.node.alternate);
					self.node.alternate = block;
				}
				self.node.alternate.body.forEach(function(node, index, body){
					var hook = new AstHook(self.scope, node);
					body[index] = hook.node;	// hook may have replaced the node
					self.hooks.push(hook);
				})
			}
		}
	},
	ReturnStatement: function(self){
		if (self.node.argument !== null) self.node.argument = new AstHook(self.scope, self.node.argument).node;
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
	LogicalExpression: function(self){
		var l_hook = new AstHook(self.scope, self.node.left);
		var r_hook = new AstHook(self.scope, self.node.right);
		self.node.left = l_hook.node;
		self.node.right = r_hook.node;
	},
	BinaryExpression: function(self){
		var l_hook = new AstHook(self.scope, self.node.left);
		var r_hook = new AstHook(self.scope, self.node.right);
		self.node.left = l_hook.node;
		self.node.right = r_hook.node;
	},
	UnaryExpression: function(self){
		self.node.argument = new AstHook(self.scope, self.node.argument).node;
	},
	MemberExpression: function(self){
		self.node.object = new AstHook(self.scope, self.node.object).node;
		if (self.node.computed === true) self.node.property = new AstHook(self.scope, self.node.property).node;
	},
	Identifier: function(self){
		var reference = self.scope.findRef(self.node.name);
		var replace = esprima.parse(reference).body[0].expression;
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
	this.pubsub = pubsub;
	this.name = name;
	this.uid = name+'-'+helpers.randKey(4);
	this.source_raw = raw_code || null;

	this.source = Code.instrument(pubsub, name, raw_code);

	this.process = null;
	this.snapshots = [];
}
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
		var forked = child_process.fork(path.join(__dirname, 'vm.js'));
		forked.send({ code: self.source, options: options });

		forked._requests = {};
		forked.on('close', function(exit_code, signal){
			console.log(chalk.red('Code '+self.name+' stdio closed ')+exit_code);
		});
		forked.on('error', function(err){
			reject(err);
		});
		forked.on('exit', function(exit_code, signal){
			console.log(chalk.red('Code '+self.name+' exited ')+exit_code);
		});
		forked.on('message', function(message){
			// console.log('Child '+forked.pid+' sent:', message);
			if (message.reply in forked._requests){
				forked._requests[message.reply].resolve(message.payload);
				delete forked._requests[message.reply];
			}
			else {
				console.log(chalk.yellow('[child:'+forked.pid+'] '+self.name+': ')+JSON.stringify(message));
			}
		});
		
		self.process = forked;
		resolve(forked.pid);
	});
}
Code.prototype.ipcSend = function(ctrl, kwargs){
	var self = this;
	return new Promise(function(resolve, reject){
		if (self.process !== null && self.process.connected){
			var req_id = helpers.randKey(4);
			var deferred = helpers.defer();
			deferred.promise.then(function(reply){
				resolve(reply);
			}, function(err){
				reject(err);
			})
			self.process._requests[req_id] = deferred;
			self.process.send({ request: req_id, ctrl: ctrl, kwargs: kwargs });
			setTimeout(function(){
				if (req_id in self.process._requests){
					deferred.reject({
						error: 'IPCTimeout',
						message: 'IPC Request timed out'
					});
					delete self.process._requests[req_id];
				}
			}, 3000);
		}
		else {
			console.log(chalk.red('[ERROR] Code '+self.name+' ipcSend("'+ctrl+'"): No child process'));
		}	
	})
}
/** Pause the user code through IPC. This will work only if the user code was executed through Code.run.
 *    If the user code was executed as a standalone Node process (e.g. node user_code.js),
 *    it can only be paused through Pubsub.
 */
Code.prototype.pause = function(){
	return this.ipcSend('PAUSE');
}
Code.prototype.resume = function(){
	return this.ipcSend('RESUME');
}
Code.prototype.snapshot = function(pause_after){
	var self = this;
	return this.ipcSend('SNAPSHOT', { pause_after: (pause_after || false) }).then(function(snapshot){
		self.snapshots.push({
			created_at: Date.now(),
			snapshot: snapshot
		})
		return snapshot;
	});
}
Code.prototype.kill = function(){
	if (this.process) this.process.kill();
}


/* Static methods */
/**
 * Return instrumented code string
 * @param {string} raw_code
 */
Code.instrument = function(pubsub, code_name, raw_code){
	var started = Date.now();
	var ast = esprima.parse(raw_code);

	var root_scope = new StaticScope('root');		// Create root scope (static scope)
	var hook = new AstHook(root_scope, ast);		// Process the AST

	// Prepare the things-js template
	var template_str = `(function(${SCOPE_PREFIX}){})(require('things-js').bootstrap('${pubsub.url}', '${code_name}'));`;
	var template = esprima.parse(template_str);
	// WARNING: the following depends on esprima output, and might break if esprima changes its format
	template.body[0].expression.callee.body.body = ast.body;

	var result = escodegen.generate(template);

	var ended = Date.now();
	(DEBUG && console.log(chalk.green('Instrumented in '+(ended - started)+'ms')));
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
	code.process = null;
	code.snapshots = [];
	return code;
}
/**
 * Create a new Code object from file path  
 * @param {string} file_path - the path to the raw JS file
 */
Code.fromFile = function(pubsub, file_path){
	return new Code(pubsub, path.basename(file_path), fs.readFileSync(file_path).toString());
}
Code.fromString = function(pubsub, code_name, raw_code){
	return new Code(pubsub, code_name, raw_code);
}
Code.fromSnapshot = function(snapshot){
	// console.log(chalk.blue('Trying to restore from Snapshot String ')+snapshot_str.length);
	console.log(chalk.blue('Trying to restore from Snapshot'));
	
	var code = Code.createEmpty();
	code.pubsub = new Pubsub(snapshot.meta.pubsub);
	code.name = snapshot.meta.code_name;

	var content = Scope.generateCode(snapshot);

	Object.keys(snapshot.timers).forEach(function(id){
		content += Timer.generateCode(snapshot.timers[id]);
	});

	code.source = `(function(${SCOPE_PREFIX}){ ${content} })(require('things-js').bootstrap('${code.pubsub.url}', '${code.name}'));`;
	console.log(jsBeautify(code.source));

	return code;
}


function Timer(root_scope, type, callback, timedelta, timer_id){
	this.id = (timer_id || helpers.randKey(8));
	this.root_scope = root_scope;
	this.root_scope.timers[this.id] = this;
	
	this.ref = null;
	this.ref_type = null;
	this.type = type;
	this.callback = callback;
	this.timedelta = timedelta || 0;

	this.created_at = Date.now();

	this.called_at = undefined;
	this.cleared_at = undefined;
	this.stopped_at = undefined;
};
Timer.prototype.start = function(){
	var self = this;
	self.called_at = Date.now();
	this.ref = global['set'+this.type](function(){
		self.callback();
		self.cleared_at = Date.now();
		self.callback[PROPERTY_PREFIX+'parent'].removeChild(self.callback[PROPERTY_PREFIX+'scope']);
		((self.type !== 'Interval') && (delete self.root_scope.timers[self.id]));
	}, self.timedelta);
	this.ref_type = this.type;
};
Timer.prototype.pause = function(){
	// console.log(chalk.red('    pausing ')+this.type+' '+this.id);
	global['clear'+this.ref_type](this.ref);
	this.ref = null;
	this.stopped_at = Date.now();
	this.remaining = this.timedelta - (this.stopped_at - (this.cleared_at || this.called_at));

	console.log(this.type+' paused, elapsed = '+(this.stopped_at - (this.cleared_at || this.called_at))+', remaining = '+this.remaining);
	// console.log(this.stopped_at);
};
Timer.prototype.resume = function(){
	var self = this;
	if (self.remaining){
		if (self.type === 'Timeout'){
			console.log('Timeout after '+self.remaining);
			self.called_at = Date.now();
			self.ref = setTimeout(function(){
				self.callback();
				self.cleared_at = Date.now();
				self.callback[PROPERTY_PREFIX+'parent'].removeChild(self.callback[PROPERTY_PREFIX+'scope']);
				delete self.root_scope.timers[self.id]
			}, self.remaining);
			self.ref_type = self.type;
		}
		else if (self.type === 'Interval'){
			console.log('Interval '+self.timedelta+' after '+self.remaining);
			self.called_at = Date.now();
			self.ref = setTimeout(function(){
				self.callback();
				self.cleared_at = Date.now();
				self.callback[PROPERTY_PREFIX+'parent'].removeChild(self.callback[PROPERTY_PREFIX+'scope']);

				self.ref = setInterval(function(){
					self.callback();
					self.cleared_at = Date.now();
					self.callback[PROPERTY_PREFIX+'parent'].removeChild(self.callback[PROPERTY_PREFIX+'scope']);
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
		scope.frozen = true;
		scope = scope.parent;
	}
}
// Experimental
Timer.prototype.unfreeze = function(){
	var scope = this.callback[PROPERTY_PREFIX+'parent'];
	while (scope){
		scope.frozen = false;
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
			// console.log(chalk.yellow('trying to convert Function to code '+item));
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
makeSerializable['object'] = function(item){
	if (!item) return item;
	if (item instanceof Array) return item.map(makeSerializable);
	if (item.constructor.name in NATIVE_TRANSFORMERS) return NATIVE_TRANSFORMERS[item.constructor.name].makeSerializable(item);
	var safe = {};
	Object.keys(item).forEach(function(key){
		if (key === PROPERTY_PREFIX+'scope'){
			// console.log(item);
			item[key].frozen = true;
		}
		safe[key] = makeSerializable(item[key]);
	})
	return {
		type: item.constructor.name,
		proto_uri: item.constructor[PROPERTY_PREFIX+'uri'],
		value: safe
	}
}
makeSerializable['function'] = function(item){
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
	if (!item) return item;
	if (item instanceof Array) return '['+item.map(makeCode).join(',')+']';
	if (item.type in NATIVE_TRANSFORMERS) return NATIVE_TRANSFORMERS[item.type].makeCode(item);
	var props = [];
	Object.keys(item.value).forEach(function(key){
		props.push(key+' : '+makeCode(item.value[key]));
	});
	if (item.proto_uri){
		return SCOPE_PREFIX+'.createObject({'+props.join(',')+'}, "'+item.proto_uri.split('/').slice(1).join('/')+'")'
	}
	else {
		return '{'+props.join(',')+'}';
	}
}

/** Scope object injected into the user code; it's used in the same execution context.
 * @constructor
 */
function Scope(instance, arg1, id, parent, params, hoisted, uid){
	if (arg1 instanceof Function){
		this.func_name = arg1.name;
		arg1[PROPERTY_PREFIX+'scope'] = this;
		this.fn = arg1;

		if (instance instanceof arg1){
			// console.log(chalk.red("NEW SCOPE ")+arg1.name+' for instance ', instance);
			instance[PROPERTY_PREFIX+'scope'] = this;
			// console.log(chalk.blue("new "+arg1.name+" called! attaching scope to instance"));
		}
	}
	else {
		this.func_name = arg1;
	}
	this.id = id;
	this.uid = uid || this.id+'_'+helpers.randKey(4);
	this.parent = parent || null;
	this.children = {};
	if (this.parent){
		// this.parent.children[this.uid] = this;
		this.parent.addChild(this);
	}

	this.params = params || {};
	this.hoisted = {};
	this.refs = params || {};
	this.funcs = {};

	(hoisted && this.hoist(hoisted));	// shortcut for hoisting via argument
}
Scope.prototype.hoist = function(funcs){
	var self = this;
	funcs.forEach(function(func){
		func[PROPERTY_PREFIX+'uid'] = func.name;
		func[PROPERTY_PREFIX+'uri'] = self.uri()+'/'+func[PROPERTY_PREFIX+'uid'];
		func[PROPERTY_PREFIX+'parent'] = self;
		self.funcs[func[PROPERTY_PREFIX+'uid']] = func;
		self.hoisted[func.name] = func;
		self.refs[func.name] = func;
	})
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
/**
 * @param {Function} func - Function to add to scope
 * @param {string} uid - (optional) UID to assign for the func (used in restoration)
 */
Scope.prototype.addFunction = function(func, uid){
	func[PROPERTY_PREFIX+'uid'] = uid || func.name+'.'+helpers.randKey(6);	// .uid is the unique identifier within the parent scope
	func[PROPERTY_PREFIX+'uri'] = this.uri()+'/'+func[PROPERTY_PREFIX+'uid'];					// .uri is the universal identifier for the global scope
	func[PROPERTY_PREFIX+'parent'] = this;									// parent is the parent scope
	this.funcs[func[PROPERTY_PREFIX+'uid']] = func;						// store the function in the parent scope
	return func;
}
Scope.prototype.getFunction = function(uri){
	var tokens = uri.split('/');
	var scope = this.getScope(tokens.slice(0, -1));
	if (scope) return scope.funcs[tokens[tokens.length-1]];
	else throw "Could not find function "+uri;
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
	Object.keys(this.hoisted).forEach(function(key){
		safe.hoisted[key] = self.hoisted[key][PROPERTY_PREFIX+'uid'];
	})
	Object.keys(this.funcs).forEach(function(key){
		safe.funcs[key] = {
			type: 'Function',
			value: self.funcs[key].toString(),
			proto: makeSerializable(self.funcs[key].prototype),
			properties: {}
		}
		Object.keys(self.funcs[key]).forEach(function(prop){
			// console.log(prop);
			if (prop[0] !== PROPERTY_PREFIX){
				safe.funcs[key].properties[prop] = makeSerializable(self.funcs[key][prop]);
			}
		});
	})
	Object.keys(this.refs).forEach(function(key){
		if (self.refs[key].__uri){
		// if (options.processed.indexOf(self.refs[key].__uri) > -1){
			safe.refs[key] = {
				type: 'things-js.reference',
				uri: self.refs[key].__uri
			}
		}
		else {
			safe.refs[key] = makeSerializable(self.refs[key]);
			if (typeof safe.refs[key] === 'object'){
				self.refs[key].__uri = self.uri()+'.'+key;
				options.processed.push(self.refs[key].__uri);
			}
		}
	})
	Object.keys(this.children).forEach(function(key){
		// Experimental
		if (self.children[key].frozen === true){
			safe.children[key] = self.children[key].getSerializable(options);
		}

		// safe.children[key] = self.children[key].getSerializable(options);
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
		code += obj.funcs[obj.hoisted[key]].value+';';
	});
	Object.keys(obj.funcs).forEach(function(key){
		if (!(key in obj.hoisted)){
			code += identifier+'.addFunction('+obj.funcs[key].value+', "'+key+'");';
		}
	});

	// Need to restore the closures first, as some of the references may be referring to objects created by the closures.
	Object.keys(obj.children).forEach(function(key){
		code += Scope.generateCode(obj.children[key], identifier);
	});

	// Process prototypes
	Object.keys(obj.funcs).forEach(function(key){
		var proto = obj.funcs[key].proto.value;
		Object.keys(proto).forEach(function(prop){
			code += identifier+'.funcs["'+key+'"].prototype.'+prop+' = '+makeCode(proto[prop])+';';
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
		var hoisted = '['+Object.keys(obj.hoisted).join(',')+']';

		var template = '(function '+obj.func_name+'('+Object.keys(obj.params).join(',')+'){'
		template += 'var '+identifier+' = new '+SCOPE_PREFIX+'.Scope(this, '+obj.func_name+", '"+obj.id+"', "+parent+', '+params+', '+hoisted+', "'+obj.uid+'");';
		template += code;
		template += '}('+Object.values(obj.params).map(makeCode).join(',')+'));';
		code = template;
	}
	else {
		code = identifier+'.hoist(['+Object.keys(obj.hoisted).join(',')+']);' + code;
	}

	return code;
}

/** Attach some functions that should be available only on the root scope.
 *    intercepted native functions (e.g. setTimeout, console.log, etc.) are replaced with custom functions
 */
function RootScope(pubsub_url, code_name){
	Scope.call(this, null, 'root', SCOPE_PREFIX);
	this.uid = SCOPE_PREFIX;

	this.meta = {
		pubsub: new Pubsub(pubsub_url),
		code_name: code_name
	};
	this.timers = {};

}
RootScope.prototype = new Scope();
RootScope.prototype.Scope = Scope;
RootScope.prototype.createObject = function(obj, proto_uri){
	var proto = this.getFunction(proto_uri).prototype;
	var created = Object.create(proto);
	Object.keys(obj).forEach(function(prop){
		created[prop] = obj[prop];
	});
	return created;
}
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
	console.log(timer_id);
	console.log(Object.keys(this.timers));
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
};
RootScope.prototype.resumeTimers = function(){
	Object.values(this.timers).forEach(function(timer){
		timer.unfreeze();	//Experimental
		timer.resume();
	});
};
RootScope.prototype.log = function(){
	console.log.apply(null, arguments);
	// this.meta.pubsub.publish(this.meta.code_name+'/console', text);
};

var ProcessHandler = {
	PAUSE: function(root_scope){
		root_scope.pauseTimers();
		console.log(chalk.yellow('<'+root_scope.meta.code_name+'> Paused'));
		return true
	},
	RESUME: function(root_scope){
		console.log(chalk.green('<'+root_scope.meta.code_name+'> Resumed'));
		root_scope.resumeTimers();
		return true
	},
	SNAPSHOT: function(root_scope, kwargs){
		root_scope.pauseTimers();
		console.log(chalk.yellow('<'+root_scope.meta.code_name+'> Paused'));
		
		var serialize_safe = Object.assign({
			meta : {
				pubsub: root_scope.meta.pubsub.url,
				code_name: root_scope.meta.code_name
			},
			timers: {},
		}, root_scope.getSerializable());
		Object.keys(root_scope.timers).forEach(function(id){
			serialize_safe.timers[id] = root_scope.timers[id].getSerializable();
		})

		if (!kwargs.pause_after){
			console.log(chalk.green('<'+root_scope.meta.code_name+'> Resumed'));
			root_scope.resumeTimers();
		}

		return serialize_safe;
	}
}

Code.bootstrap = function(pubsub_url, code_name){
	// IPC Listeners - same functionality can be done via Pubsub.
	// when using IPC the messages are coming directly from the Code instance.
	process.on('message', function(message){
		console.log("Parent process sent IPC message:", message);
		if (message.ctrl in ProcessHandler){
			var result = ProcessHandler[message.ctrl](root_scope, message.kwargs);
			process.send({ reply: message.request, payload: result });
		}
		else {
			process.send({ error: 'UnknownCtrl', message: message });
		}
	});

	// Initialize Pubsub object, create root scope and return it.
	var root_scope = new RootScope(pubsub_url, code_name);

	return root_scope
}

module.exports = Code;