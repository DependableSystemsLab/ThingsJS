var esprima = require('esprima');
var escodegen = require('escodegen');
var fs = require('fs');
var jsBeautify = require('js-beautify').js_beautify;
var randomKey = require('../common.js').randomKey;
var requireFromString = require('../common.js').requireFromString;
var defer = require('../common.js').defer;
var Scope = require('./Scope.js');

var DEBUG_MODE = false;

/* Helper functions */
var PHONETIC_ALPHABET = ['alpha', 'bravo', 'charlie', 'delta', 'echo',
                         'foxtrot', 'golf', 'hotel', 'india', 'juliet',
                         'kilo', 'lima', 'mike', 'november', 'oscar',
                         'papa', 'quebec', 'romeo', 'sierra', 'tango',
                         'uniform', 'victor', 'whiskey', 'xray', 'yankee', 'zulu']

function printNodeVerbose(node, indent){
	if (DEBUG_MODE){
		console.log(indent+"Node: ("+node.constructor.name+"){");
		for (var key in node){
			if (typeof node[key] !== 'object'){
				console.log(indent+'  '+key+" : "+node[key]);
			}
			else if (node[key]){
				console.log(indent+'  '+key+" : ("+node[key].constructor.name+")");
			}
			else {
				console.log(indent+'  '+key+" : "+node[key]);
			}
		}
		console.log(indent+"}");	
	}
}
function printNode(node, indent){
	if (DEBUG_MODE){
		if (node.type === "VariableDeclaration"){
			for (var i=0; i < node.declarations.length; i++){
				var dec = node.declarations[i];
				if (dec.init){
					if (dec.init.type === "Identifier"){
						console.log(indent+node.kind+" "+dec.id.name+" = "+dec.init.name );	
					}
					else if (dec.init.type === "CallExpression"){
						console.log(indent+node.kind+" "+dec.id.name+" = "+dec.init.callee.name+"("+dec.init.arguments.map(function(item){ return item.raw }).join(", ")+")" );
					}
					else if (dec.init.type === "FunctionExpression"){
						console.log(indent+node.kind+" "+dec.id.name+" = function "+(dec.init.id || "")+"("+dec.init.params.map(function(item){ return item.name }).join(", ")+"){ ... }");
					}
					else {
						console.log(indent+node.kind+" "+dec.id.name+" = <"+dec.init.type+">" );
					}
				}
				else {
					console.log(indent+node.kind+" "+dec.id.name);
				}	
			}
		}
		else if (node.type === "FunctionExpression"){
			console.log(indent+"function "+(node.id || "")+"("+node.params.map(function(item){ return item.name }).join(", ")+"){ ... }");
		}
		else if (node.type === "AssignmentExpression"){
			if (node.right.type === "Identifier"){
				console.log(indent+node.left.name+" "+node.operator+" "+node.right.name);	
			}
			else if (node.right.type === "CallExpression"){
				console.log(indent+node.left.name+" "+node.operator+" "+node.right.callee.name+"("+node.right.arguments.map(function(item){ return item.raw }).join(", ")+")");
			}
			else {
				console.log(indent+node.left.name+" "+node.operator+" <"+node.right.type+"> "+node.right.raw);
			}
		}
		else {
			console.log(indent+" <"+node.type+"> NO PRINT FORMAT DEFINED");
			console.log(escodegen.generate(node));
		}	
	}
}
/* End of Helper functions */

/*
 * Helper CodeScope class that keeps track of the scope information while processing the parsed tree from esprima.
 * It keeps pointers to both parent and children
 * This is different from Scope in the sense that it does not keep track of different instances of functions.
 * This is a "static scope" object.
 */
function CodeScope(name, parent, creator){
	this.name = name;
	this.parent = parent;
	this.children = {};
	
	this.creator = creator;
	this.variables = {};
	this.functions = {};
	this.requires = {};
	
	if (parent instanceof CodeScope){
		parent.addChild(this);
	}
};
CodeScope.prototype.addChild = function(childScope){
	this.children[childScope.name] = childScope;
};
CodeScope.prototype.nextChildName = function(){
	var clen = Object.keys(this.children).length;
	if (clen >= 26) return 'func'+clen;
	else return PHONETIC_ALPHABET[clen];
};
CodeScope.prototype.getRoot = function(){
	var parent = this;
	while (parent.parent !== null){
		parent = parent.parent;
	}
	return parent;
};
CodeScope.prototype.getUID = function(){
	var parent = this.parent;
	var name = this.name;
	while (parent){
		name = parent.name +"_"+ name;
		parent = parent.parent;
	}
	return name;
};
CodeScope.prototype.getRank = function(){
	return this.getUID().split("_").length;
};
CodeScope.prototype.lookupVariableScope = function(varName){
	var parent = this;
	while (parent){
		if (Object.keys(parent.variables).indexOf(varName) > -1){
			break;
		}
		parent = parent.parent;
	}
	return parent;
	
};
CodeScope.prototype.lookupFunction = function(funcName){
	// Traverses up the chain of scopes until it finds a function with name = funcName
	var parent = this;
	while (parent){
		if (Object.keys(parent.functions).indexOf(funcName) > -1){
			return parent.functions[funcName];
		}
		parent = parent.parent;
	}
	return undefined;
};
CodeScope.prototype.protectAncestorScopes = function(scope){
	var parent = this;
	if (scope.getRank() < parent.getRank()){
		while (parent && parent.getUID() !== scope.getUID()){
			parent = parent.parent;
			parent.protect = true;
//			console.log("Protected "+parent.getUID());
		}
//		console.log("FINALLY "+parent.getUID());	
	}
	else {
//		console.log("Current scope "+this.getUID()+" equal or higher than scope "+scope.getUID());
	}
};
CodeScope.prototype.getProtectedAncestor = function(){
	var parent = this;
	while (parent.parent && parent.parent.protect === true){
		parent = parent.parent;
	}
	return parent;
};
//Use only for debugging
CodeScope.prototype.getIndent = function(){
	var parent = this.parent;
	var indent = "";
	while (parent){
		indent += "    ";
		parent = parent.parent;
	}
	return indent;
};
CodeScope.prototype.getURI = function(){
	var parent = this.parent;
	var name = this.name;
	while (parent){
		name = parent.name +"/"+ name;
		parent = parent.parent;
	}
	return name;
};
CodeScope.prototype.printDebug = function(){
	if (DEBUG_MODE){
		console.log("\n"+this.getIndent()+"Scope:  "+this.getURI());	
	}
};

/* Currently in API design stage; the code is not usable right now */

/* Code class
 * 
 * API:
 *   Code.initialize
 *   Code.saveToFile
 *   Code.run
 *   Code.pause
 */
function Code(source, pubsub, fromLocalPath, noInitialize){
	this.id = "code-"+randomKey();
	this.pubsub = undefined;
	this.migrationCount = undefined;
	
	this.sourcePath = undefined; // path of the input JS code that a ThingsJS developer would write
	this.sourceCode = undefined; // String content of the input JS code that a ThingsJS developer would write
	this.codeString = undefined; // String content of the instrumented version of the code, that would have all the Scope
	this.code = undefined; // JavaScript function in memory wrapping the instrumented version of the code
	
	this.snapshots = [];
	
	this.MEASUREMENTS = { start: undefined, end: undefined };
	
	this._parsedTree = undefined;
	this._workTree = undefined;
	this._functionTable = {};
	
	this._pauseDefer = undefined;
	this.$paused = undefined;
	this._saveSnapshot = false;
	
	if (!noInitialize){
		this.initialize(source, pubsub, fromLocalPath);	
	}
};
Code.prototype.setPubsub = function(pubsub){
	var self = this;
	self.pubsub = pubsub;
	
	//immediately subscribe to things that the instrumented code would be publishing form within
	if (self.pubsub.$ready){ //If it's not ready, then only instrumentation is possible
		self.pubsub.$ready.then(function(){
			self.pubsub.subscribe(self.id+'/snapshots', function onNewMessage(snapshot){
		  		console.log("<CODE> ["+self.id+"] : New Snapshot received from <CODE> ["+self.id+"]");
		  		self.snapshots.push(snapshot);
		  		
		  		self._pauseDefer.resolve(snapshot);
		  		if (self._saveSnapshot){
		  			self.saveLastSnapshot();
		  		}
	//	  			console.log(self.$paused);
		    });
		}, function(err){
			console.log(err);
		});
	}
};
Code.prototype.initialize = function(source, pubsub, fromLocalPath){
	if (pubsub) this.setPubsub(pubsub);
	
	if (fromLocalPath){
		this.sourcePath = source;
		this.sourceCode = fs.readFileSync(this.sourcePath).toString();	
	}
	else {
		this.sourcePath = this.id+".js";
		this.sourceCode = source;
	}
	
	this.MEASUREMENTS.start = Date.now();
	
	this._instrumentCode();
	this._convertToCode();
};
Code.prototype.getLastSnapshot = function(){
	return this.snapshots[this.snapshots.length-1];
};
Code.prototype.saveToFile = function(filename){
	if (!filename){
		filename = this.sourcePath.split(".");
		filename.splice(filename.length-1, 0, "things");
		filename = filename.join(".");
	}
	fs.writeFileSync(filename, this.codeString);
	console.log("<CODE> ["+this.id+"] : Created new Code at "+filename);
	
};
Code.prototype.saveLastSnapshot = function(filename){
	if (!filename){
		filename = this.sourcePath.split(".");
		filename.splice(filename.length-1, 1, this.id+"-snapshot", "json");
		filename = filename.join(".");
	}
	var snapshot = this.snapshots[this.snapshots.length-1];
	if (DEBUG_MODE){
		snapshot = jsBeautify(snapshot, { indent_size: 4 });
	}
	fs.writeFileSync(filename, snapshot);
	console.log("<CODE> ["+this.id+"] : Saved Snapshot at "+filename);
};
Code.prototype.run = function(){
	console.log("<CODE> ["+this.id+"] : Executing Code ["+this.id+"]");
	this.code();
};
Code.prototype.pause = function(saveSnapshot, flushAfter){
	// Creating a deferred Pause promise here because we need to ensure the snapshot is successfully retrieved (asynchronous).
	// This promise should be resolved in the subscribe handler
	// Later make an Array of promises to allow multiple snapshots
	this.pubsub.publish(this.id+'/cmd', {
		command: "snapshot",
        message: "Take a snapshot now",
        flush: (flushAfter || false)
    });
	this._pauseDefer = defer();
	this._saveSnapshot = saveSnapshot;
	this.$paused = this._pauseDefer.promise;
	return this.$paused;
};
Code.prototype.flush = function(){
	this.pubsub.publish(this.id+'/cmd', {
		command: "flush",
		message: "Destroy scope and clean up"
	});
};
Code.prototype.destroy = function(){
	//This method is called by CodeEngine, after it receives flush signal
	this.pubsub.unsubscribe(this.id+'/snapshots');
//	console.log("<CODE> ["+this.id+"] : Destroyed!");
};

/* Private functions for internal use (not strictly private, 
 *      but should not be considered as an exposed API function,
 *      similar to that of Python private methods)
 */
Code.prototype._instrumentCode = function(){
	
	this._parsedTree = esprima.parse(this.sourceCode, "utf8");
		
	// Process raw code body
	this._processFunctionDeclaration(this._parsedTree);
	
	// Inject some header code
	// The code injected here is responsible for exposing the Code to the pubsub channel
	// so that it can be stopped (and snapshot'ed) via a pubsub message
	var templateCode = `var things_js = require('things-js');
				  var Σ_global = new things_js.Scope('global');
				  Σ_global.setPubsub('${this.id}', '${this.pubsub.pubsub_url}')
				  	.then(function(){  }, function(err){ console.log('Failed to connect to Pubsub at ${this.pubsub.pubsub_url}') });
				  `;
	var template = esprima.parse(templateCode);
	//hacky way of locating the body of the .then block
	template.body[2].expression.arguments[0].body.body = this._parsedTree.body;
	
	
	var functionTable = "Σ_global.functionTable = {\n";
	for (var funcKey in this._functionTable){
		var func = this._functionTable[funcKey];
		functionTable += "'"+funcKey+"' : { scope: '"+func.scope.getURI()
										+"', name: '"+func.name
										+"', fnid: '"+func.fnid
										+"', assignedName: '"+func.assignedName
										+"', fullIdentifier: '"+func.fullIdentifier
										+"', hoisted: "+func.hoisted
										+", protect: '"+(func.protect || "")
										+"', signature: '"+func.signature
										+"', code: `"+func.code+"`, prototypeFunctions: { "
										+Object.keys(func.prototypeFunctions).map(function(key){ return key+" : '"+func.prototypeFunctions[key]+"'" }).join(", ")
										+" }, isProtoFunctionOf: '"+func.isProtoFunctionOf+"' },\n";
	}
	functionTable += "};";
	template.body.push(esprima.parse(functionTable));
	
	this._workTree = template;
};
Code.prototype._convertToCode = function(){
	var output = escodegen.generate(this._workTree);
	
	this.MEASUREMENTS.end = Date.now();
	console.log("<CODE> ["+this.id+"] : Instrumentation time - "+(this.MEASUREMENTS.end - this.MEASUREMENTS.start)+" ms");
		if (DEBUG_MODE){
			fs.appendFileSync("records/code-ids.log", (this.id+";"+this.sourcePath+"\n") );
			fs.appendFileSync("records/instrumentation.log", (this.id+";"+(this.MEASUREMENTS.end - this.MEASUREMENTS.start)+"\n") );
			output = jsBeautify(output, { indent_size: 4 });
		}
	
	this.codeString = output
//	console.log(this.codeString);
	this.code = requireFromString('module.exports = function(){\n\n'+this.codeString+'\n\n}');
	
};

/* functions for processing the parsed tree object given by esprima */
var supportedNodeTypes = ["AssignmentExpression", "CallExpression", "UpdateExpression", "VariableDeclaration", "FunctionDeclaration", "ReturnStatement"];
Code.prototype._processBodyBlock = function(body, scope){
	var injections = [];
	for (var i=0; i < body.length; i++){
		var item = body[i];
		
		if (item.type === "ExpressionStatement"){
//			console.log(indent+i+")  "+item.type+" - "+item.expression.type);
			if (supportedNodeTypes.indexOf(item.expression.type) > -1){
				var result = this['_process'+item.expression.type](item.expression, scope);
				if (result.injection){
					injections.unshift({ atIndex: i+1, code: result.injection });	
				}
				if (result.replace){
					body[i] = result.replace;
				}
			}
			else {
				console.log("["+item.expression.type+"] are currently not supported");	
			}
		}
		else if (item.type === "IfStatement"){
			this._processIfStatement(item, scope);
		}
		else if (item.type === "ForStatement"){
			// For Statements have a body - for statements can technically be bodyless, but we need to enforce enclosure within a body block
			if (item.body.type !== "BlockStatement"){
				var block = esprima.parse("{}").body[0];
				block.body.push(item.body);
				item.body = block;
			}
			this._processBodyBlock(item.body.body, scope);
		}
		else if (item.type === "WhileStatement" || item.type === "DoWhileStatement"){
			// While Statements have a body - while statements can technically be bodyless, but we need to enforce enclosure within a body block
			if (item.body.type !== "BlockStatement"){
				var block = esprima.parse("{}").body[0];
				block.body.push(item.body);
				item.body = block;
			}
			this._processBodyBlock(item.body.body, scope);
		}
		else {
//			console.log(indent+i+")  "+item.type);
			if (supportedNodeTypes.indexOf(item.type) > -1){
				var result = this['_process'+item.type](item, scope);
				if (result.injection){
					injections.unshift({ atIndex: i+1, code: result.injection });	
				}
			}
			else if (item.type !== "Program"){
				console.log("["+item.type+"] are currently not supported");
			}
		}
	};
	
//	console.log(indent+"Processing injections..."+injections.length)
	for (var i=0; i < injections.length; i ++){
		body.splice(injections[i].atIndex, 0, injections[i].code);
	};
};
Code.prototype._processFunctionDeclaration = function(node, parentScope, assignedName, fullIdentifier, isProtoFunctionOf){
	if (!parentScope){
		parentScope = new CodeScope('global', null);
	}
	var isFunctionScope = (node.type !== "Program" && node.sourceType !== "script");
	
	var scope;
	
	// If this is not the root node (i.e., any sub-function...)
	// duck-type checking the node
	if (isFunctionScope){
		
		//if anonymous function, de-anonymize by assigning a random name
		if (node.id === null){
			node.id = esprima.parse("function φ"+parentScope.nextChildName()+"(){}").body[0].id;
		}
		
		var funcName = ( node.id ? node.id.name : ( assignedName || parentScope.nextChildName() ) );
		var funcId = parentScope.getUID()+"_"+funcName+"_creator";
		scope = new CodeScope(funcName, parentScope, funcId);
		parentScope.functions[funcName] = funcId;
		
		this._functionTable[funcId] = {
			fnid: funcId,
			scope: scope,
			name: funcName,
			hoisted: (node.id && node.id.name && !assignedName && !fullIdentifier),
			assignedName: assignedName,
			fullIdentifier: fullIdentifier,
			signature: funcName+"("+node.params.map(function(param){ return param.name }).join(", ")+")",
			code: escodegen.generate(node, { format: { json: true } }),
			prototypeFunctions: {}
		}
		if (isProtoFunctionOf){
			this._functionTable[funcId].isProtoFunctionOf = isProtoFunctionOf;
			this._functionTable[isProtoFunctionOf].prototypeFunctions[funcName] = funcId;
		}
		
		// Check for params -- add these as local variables in CodeScope (i.e. save in closure)
		// This needs to be done before processing the body, as they need to be accessible to the
		// statements in the body
		for (var i=0; i < node.params.length; i++) {
			var param = node.params[i];
			
			var varName = param.name;
			scope.variables[varName] = varName; //Here we don't need value of the variable because we're at the instrumentation phase. i.e. not runtime
//			console.log(scope.getIndent()+"arg "+varName);
		}
	}
	else {
		scope = parentScope;
	}
	
	scope.printDebug(); // for DEBUG
	var indent = scope.getIndent() // for DEBUG
	printNode(node, indent); // for DEBUG
	
	var body = node.body;
	if (!(body instanceof Array) && body.type === "BlockStatement"){
		body = body.body;
	}
//	console.log(indent+"Body : ");
	this._processBodyBlock(body, scope);
	
	//Inject code once all the body is processed to avoid processing the injected code
	if (isFunctionScope){
		var injectCode = "var Σ_"+scope.getUID()+" = new things_js.Scope('"+scope.name+"', Σ_"+scope.parent.getUID()+", '"+scope.creator+"');\n";
		for (var i=0; i < node.params.length; i++){
			var param = node.params[i];
			var varName = param.name;
			injectCode += "Σ_"+ scope.getUID() + ".params."+varName+" = "+varName+";\n"
		}
		body.unshift( esprima.parse(injectCode) );
		
		if (body[body.length-1].type === "ReturnStatement"){
//			body.splice( body.length-1, 0, esprima.parse("Σ_"+scope.getUID()+".destroy();") );
		}
		else {
			body.push( esprima.parse("Σ_"+scope.getUID()+".destroy();") );	
		}
	}
	
	//By this time, the function block has finished instrumentation. Add the instrumented code for re-use when restoring
	if (isFunctionScope){
		this._functionTable[funcId].code = escodegen.generate(node, { format: { json: true } });
	}
	
	if (scope.parent){
		var protect = scope.getProtectedAncestor();
		if (protect && protect.getRank() <= scope.parent.getRank()){
			inject = "Σ_" + scope.parent.getUID() + ".addFunction("+(fullIdentifier || assignedName || scope.name)+", '"+scope.creator+"', Σ_"+protect.getUID()+");\n";
			
			this._functionTable[funcId].protect = protect.getUID();
		}
		else {
			inject = "Σ_" + scope.parent.getUID() + ".addFunction("+(fullIdentifier || assignedName || scope.name)+", '"+scope.creator+"');\n";
		}
		injectNode = esprima.parse(inject);	
	}
	else {
		injectNode = null;
	}
	
	return { 'scope': scope, 'injection': injectNode };
};
Code.prototype._processVariableDeclaration = function(node, parentScope){
	
	printNode(node, parentScope.getIndent()); // for DEBUG
	
	var inject = ""
	
	// There might be multiple declarations using commas
	for (var i=0; i < node.declarations.length; i++) {
		// Take note of the variable
		var declaration = node.declarations[i];
		var varName = declaration.id.name;
		var doNotBindScope = false;
		
		parentScope.variables[varName] = varName;
//		console.log(parentScope.getIndent()+varName);
		
		// If init is defined to something
		if (declaration.init) {
			if (declaration.init.type === "FunctionExpression") {
				var funcResult = this._processFunctionDeclaration(declaration.init, parentScope, varName);
				
				if (funcResult.injection){
					inject += escodegen.generate(funcResult.injection);
				}
			}
			else if (declaration.init.type === "CallExpression") {
				var result = this._processCallExpression(declaration.init, parentScope);
				if (result.replace){
					declaration.init = result.replace;
				}
				if (result.injection){
					inject += escodegen.generate(result.injection);
				}

				if (declaration.init.callee.name === "require"){
					inject += "Σ_"+parentScope.getUID()+".requires."+varName+" = '"+declaration.init.arguments[0].value+"';\n";
					doNotBindScope = true;
				}
				else if (declaration.init.callee.type === 'CallExpression' && declaration.init.callee.callee.name === "require"){
					inject += "Σ_"+parentScope.getUID()+".requires."+varName+" = '"+declaration.init.callee.arguments[0].value+"';\n";
					doNotBindScope = true;
				}
			}
			else if (declaration.init.type === "Identifier") {
//				console.log(parentScope.getIndent()+declaration.init.name);
			}
		}
		
		if (!doNotBindScope){
			inject += "Σ_"+parentScope.getUID()+".variables."+varName+" = "+varName+";\n";	
		}
	}
	var injectNode = esprima.parse(inject);
	
	return { 'scope': parentScope, 'injection': injectNode };
};
Code.prototype._processAssignmentExpression = function(node, parentScope){
	
	printNode(node, parentScope.getIndent()); // for DEBUG
	
	// Re-save the variable in it's scope
	var varName, inject = "", injectNode, skipInject = false, isProtoFunctionOf;
	
	//LHS
	if (node.left.type === "Identifier"){
		varName = node.left.name;
	}
	else if (node.left.type === "ComputedMemberExpression"){
		varName = node.left.object.name;
	}
	else if (node.left.type === "MemberExpression"){
		if (node.left.object.type === "ThisExpression"){
//			skipInject = true;
		}
		else if (node.left.object.property && node.left.object.property.type === "Identifier" && node.left.object.property.name === "prototype"){
			// Handle case where the assignment is a prototype function
			varName = node.left.property.name;
			isProtoFunctionOf = parentScope.lookupFunction(node.left.object.object.name);
//			console.log(isProtoFunctionOf);
		}
		else {
			//TODO: deal with member expression assignment (scope protection, etc)
		}
	}
	else {
		console.log("Could not process ["+node.left.type+"] `"+escodegen.generate(node.left)+"`");
	}
	
	var varScope = parentScope.lookupVariableScope(varName);
	if (!varScope){
		console.log("Could not find scope for <"+varName+">");
	}
	else {
		parentScope.protectAncestorScopes(varScope);
	}
	
	//RHS
	if (node.right.type === "Identifier"){
		//look for variable
	}
	else if (node.right.type === "CallExpression"){
		var result = this._processCallExpression(node.right, parentScope);
		if (result.replace){
			node.right = result.replace;
		}
		if (result.injection){
			inject += escodegen.generate(result.injection);
		}
	}
	else if (node.right.type === "BinaryExpression"){
		
	}
	else if (node.right.type === "FunctionExpression"){
		var fullIdentifier = escodegen.generate(node.left);
		var funcResult = this._processFunctionDeclaration(node.right, parentScope, varName, fullIdentifier, isProtoFunctionOf);
		if (funcResult.injection){
			inject += escodegen.generate(funcResult.injection);
		}
	}
	else {
		console.log("Could not process ["+node.right.type+"] ` "+escodegen.generate(node.right)+" `");
	}
	
	//Create injection
	if (node.left.type === "Identifier" && !skipInject){
		//Using Scope.js
//		console.log(varName);		
		// ASSUMPTION: If varScope is null or undefined, assume for now that the code isn't in 'strict' mode and just attach it to global
		if (!varScope) varScope = parentScope.getRoot();
		
		inject += "Σ_"+varScope.getUID()+".variables."+varName+" = "+varName+";\n";
		injectNode = esprima.parse(inject);
	}
	else if (node.right.type === "FunctionExpression" && !skipInject){
		injectNode = esprima.parse(inject);
	}
	else {
		injectNode = null;
	}
	
	return { 'scope': parentScope, 'injection': injectNode };
};
Code.prototype._processNewExpression = function(node, parentScope){
	
};
Code.prototype._processUpdateExpression = function(node, parentScope){
	
	printNode(node, parentScope.getIndent()); // for DEBUG
	
	// Re-save the variable in it's scope
	var varName, inject, injectNode;
	if (node.argument.type === "Identifier"){
		varName = node.argument.name;
	}
	else if (node.argument.type === "ComputedMemberExpression"){
		varName = node.argument.object.name;
	}
	else {
		console.log("Could not process ` "+escodegen.generate(node)+" `");
	}
	
	var varScope = parentScope.lookupVariableScope(varName);
	if (!varScope){
		console.log("Could not find scope for <"+varName+">");
	}
	else {
//		console.log(parentScope.getUID()+" protects : ", varScope.getUID());
		parentScope.protectAncestorScopes(varScope);
	}
	
	if (node.argument.type === "Identifier"){
		// ASSUMPTION: If varScope is null or undefined, assume for now that the code isn't in 'strict' mode and just attach it to global
		if (!varScope) varScope = parentScope.getRoot();
		
		inject = "Σ_"+varScope.getUID()+".variables."+varName+" = "+varName+";\n";
		injectNode = esprima.parse(inject);
	}
	else {
		injectNode = null;
	}
	
	return { 'scope': parentScope, 'injection': injectNode, 'protect': varScope };
};
Code.prototype._processCallExpression = function(node, parentScope){
	printNode(node, parentScope.getIndent()); // for DEBUG
	var replace = undefined;
	var injection = null;
	
	for (var i=0; i < node.arguments.length; i++){
		var arg = node.arguments[i];
		//if call has arguments, handle cases where the argument is a function (probably anonymous function)
		if (arg.type === "FunctionExpression"){
			var funcResult = this._processFunctionDeclaration(arg, parentScope);
			
			var protect = funcResult.scope.getProtectedAncestor();
			if (protect && protect.getRank() <= parentScope.getRank()){
				
				//wrap the expression with Scope.addFunction to attach properties like fnid
				node.arguments[i] = esprima.parse('Σ_'+parentScope.getUID()+".addFunction("+escodegen.generate(arg)+", '"+funcResult.scope.creator+"', Σ_"+protect.getUID()+")").body[0].expression;
			
			}
			else {
				//wrap the expression with Scope.addFunction to attach properties like fnid
				node.arguments[i] = esprima.parse('Σ_'+parentScope.getUID()+".addFunction("+escodegen.generate(arg)+", '"+funcResult.scope.creator+"')").body[0].expression;
			
			}
			
		}
		else if (arg.type === "CallExpression"){
			this._processCallExpression(arg, parentScope);
		}
	}
	
	//Handle setImmediate, setInterval, setTimeout
	if (node.callee.type === 'Identifier'){
		if (['setImmediate', 'setTimeout', 'setInterval', 'clearImmediate', 'clearTimeout', 'clearInterval'].indexOf(node.callee.name) > -1){
			replace = esprima.parse('Σ_global.'+escodegen.generate(node));
		}
		else if (node.callee.name === 'require'){
			// var moduleName = node.arguments[0].value;
			if (node.arguments[0].value === 'fs'){
				// moduleName = 'things-js/lib/mods/fs';
				replace = esprima.parse("require('things-js/lib/mods/fs')(Σ_global)").body[0].expression;
				// declaration.init.arguments[0].value = moduleName;
			}
			// injection = esprima.parse("Σ_"+parentScope.getUID()+".requires."+varName+" = '"+moduleName+"';\n");
			// doNotBindScope = true;
		}
	}
	else if (node.callee.type === "MemberExpression"){
		if (node.callee.object.type === "Identifier" && node.callee.object.name === "console" && node.callee.property.name === "log"){
			//Augment console.log calls
			node.callee.object.name = "Σ_global";
		}
	}
	else if (node.callee.type === "FunctionExpression"){
		this._processFunctionDeclaration(node.callee, parentScope);
	}
	return { 'scope': parentScope, 'injection': injection, 'replace': replace };
};
Code.prototype._processIfStatement = function(node, parentScope){
	// If Statements have a body - if statements can technically be bodyless, but we need to enforce enclosure within a body block
	if (node.consequent.type !== "BlockStatement"){
		var block = esprima.parse("{}").body[0];
		block.body.push(node.consequent);
		node.consequent = block;
	}
	this._processBodyBlock(node.consequent.body, parentScope);
	
	if (node.alternate){
		if (node.alternate.type === "BlockStatement"){
			this._processBodyBlock(node.alternate.body, parentScope);
		}
		else if (node.alternate.type === "IfStatement"){
			this._processIfStatement(node.alternate, parentScope);
		}
		else {
			var block = esprima.parse("{}").body[0];
			block.body.push(node.alternate);
			node.alternate = block;
			this._processBodyBlock(node.alternate.body, parentScope);
		}
	}
};
Code.prototype._processReturnStatement = function(node, parentScope){
	printNode(node, parentScope.getIndent()); // for DEBUG
	
	//Handling cases where a function is returned (probably anonymous function)
	if (node.argument && node.argument.type === "FunctionExpression"){
		var funcResult = this._processFunctionDeclaration(node.argument, parentScope);
		
		var protect = funcResult.scope.getProtectedAncestor();
		if (protect && protect.getRank() <= parentScope.getRank()){
			//wrap the expression with Scope.addFunction to attach properties like fnid
			node.argument = esprima.parse("Σ_"+parentScope.getUID()+".returnAndDestroy(Σ_"+parentScope.getUID()+".addFunction("+escodegen.generate(node.argument)+", '"+funcResult.scope.creator+"', Σ_"+protect.getUID()+"))").body[0].expression;
		}
		else {
			//wrap the expression with Scope.addFunction to attach properties like fnid
			node.argument = esprima.parse("Σ_"+parentScope.getUID()+".returnAndDestroy(Σ_"+parentScope.getUID()+".addFunction("+escodegen.generate(node.argument)+", '"+funcResult.scope.creator+"'))").body[0].expression;
		}
	}
	else if (node.argument){
		node.argument = esprima.parse("Σ_"+parentScope.getUID()+".returnAndDestroy("+escodegen.generate(node.argument)+")");
	}
	return { 'scope': parentScope, 'injection': null, 'replace': null };
};

/* Static Function for restoring code
 *   - this is static for now; later this can be cleaned up.
 *   - perhaps overload the Code constructor so that it can be initialized from snapshot and function definition */
Code.restoreCode = function(snapshotString, saveRestored){
	
//	console.log(snapshotString);
	console.log("\n>>> BEGIN RESTORATION >>>");
	
	var program = Scope.restore(snapshotString);
	
//	if (saveRestored){
//		var filename = 'inputs/a_test.restored.js'
//		fs.writeFileSync(filename, program.code);
//	}
	
	var restoredCode = new Code(undefined, undefined, undefined, true); //Need to initialize like this since Code is not made from source code.
	restoredCode.id = program.codeId;
	restoredCode.migrationCount = program.migrationCount;
	restoredCode.sourcePath = program.codeId+"-"+program.migrationCount+".js";
	restoredCode.codeString = program.code;
//	console.log(program.code);
	restoredCode.code = requireFromString('module.exports = function(){\n'+program.code+'\n}');
	
	return restoredCode;
	
};

module.exports = Code;