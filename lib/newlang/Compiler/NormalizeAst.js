//
// Combe - A Parsing Language for JavaScript
//
// Copyright 2011 Lorenz Pretterhofer
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';

var Ast = require('./Ast');

var AnalyseLexicalScope = require('./AnalyseLexicalScope');

var AstToJS = module.exports = Class.new(Object, {
  
  normalize: function (ast) {
    AnalyseLexicalScope.analyse(ast);
    
    ast.visit(this.new());
    
    return ast.normalized;
  },
  
}, {
  
  
  visitFile: function (ast) { // [ body ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.File(ast.body.normalized);
  },
  
  visitBlock: function (ast) { // [ statements ]
    ast.visitChildren(this);
    
    if (ast.statements.length === 0) {
      ast.normalized = Ast.Null();
    }
    else if (ast.statements.length === 1) {
      ast.normalized = ast.statements[0].normalized;
    }
    else {
      ast.normalized = Ast.Block(ast.statements.map(function (stmt) {
        return stmt.normalized;
      }));
    }
  },
  
  visitIf: function (ast) { // [ condition, consiquent, alternative ]
    ast.visitChildren(this);
    
    var alternative = (ast.alternative != null 
      ? ast.alternative.normalized 
      : Ast.Null()
    );
    
    ast.normalized = Ast.If(
      ast.condition.normalized,
      ast.consiquent.normalized,
      alternative
    );
  },
  
  visitTryCatch: function (ast) { // [ tryblock, catchbinding, catchblock ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.TryCatch(
      ast.tryblock.normalized,
      ast.catchbinding,
      ast.catchblock.normalized
    );
  },
  
  visitVar: function (ast) { // [ name, rvalue ]
    ast.visitChildren(this);
    
    if (ast.rvalue != null) {
      ast.normalized = Ast.VariableAssignment(ast.name, ast.rvalue.normalized);
    }
    else {
      ast.normalized = Ast.Null();
    }
  },
  
  visitReturn: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.Return(ast.argument.normalized);
  },
  
  visitThrow: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.Throw(ast.argument.normalized);
  },
  
  visitOr: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.Or(ast.lhs.normalized, ast.rhs.normalized);
  },
  
  visitXor: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.Xor(ast.lhs.normalized, ast.rhs.normalized);
  },
  
  visitAnd: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.And(ast.lhs.normalized, ast.rhs.normalized);
  },
  
  visitNot: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.Not(ast.argument.normalized);
  },
  
  visitOperator: function (ast) { // [ opname, lhs, rhs ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.Operator(ast.opname, ast.lhs.normalized, ast.rhs.normalized);
  },
  
  visitPrefixOperator: function (ast) { // [ opname, argument ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.PrefixOperator(ast.opname ast.argument.normalized);
  },
  
  visitVariableAssignment: function (ast) { // [ name, rvalue ]
    ast.visitChildren(this);
    
    ast.normalized = Ast.VariableAssignment(ast.name, ast.rvalue.normalized);
  },
  
  visitMethodCallAssignment: function (ast) { // [ object, name, thisArgument, arguments, rvalue ]
    ast.visitChildren(this);
    
    var name = ast.name.value + '$assignment';
    var args = ast.arguments.map(function (arg) {
      return arg.normalized;
    });
    args.push(ast.rvalue.normalized);
    
    if (thisArgument == null) {    
      ast.normalized = Ast.MethodCall(
        ast.object.normalized,
        name,
        null, // ignored in normalized ast
        args
      );
    }
    else {
      args = [
        ast.thisArgument.normalized,
        Ast.Array(args)
      ];
      
      ast.normalized = Ast.MethodCall(
        Ast.PropertyLookup(ast.object.normalized, Ast.String(name)),
        'apply',
        null,
        args
      );
    }
  },
  
  visitSubscriptAssignment: function (ast) { // [ object, arguments, rvalue ]
    ast.visitChildren(this);
    
    var args = ast.arguments.map(function (arg) {
      return arg.normalized;
    });
    args.push(ast.rvalue.normalized);
    
    ast.normalized = Ast.MethodCall(
      ast.object.normalized,
      'subscript$assignment',
      null,
      args
    );
  },
  
  // Todo: Normalize would make more sense if I were leaving the structure
  // of the Ast intact... If I'm simplifying it, then I should name this
  // SimplifyAst or similer.
  //
  // In either case, having a much simpler ast would probably make handling
  // the rather complicated last few steps translating to JS easier, and 
  // respectively, I may even want to have a final Ast closer again to JS
  // just to handle the last tier of expression/statement bullshit.
  // (Assuming that that Ast still supported non-local returns in the case
  // of a wrapped statement trying to do an early return...)
  
  visitVariableLookup: function (ast) { // [ name ]
    ast.visitChildren(this);
    
    ast.code = ast.name;
  },
  
  visitPropertyLookup: function (ast) { // [ object, name ]
    ast.visitChildren(this);
    
    ast.code = [ast.object.code, '[', ast.name.code, ']'];
  },
  
  visitMethodCall: function (ast) { // [ object, name, thisArgument, arguments ]
    ast.visitChildren(this);
    
    var argumentExpansionCount = 0;
    for (var i = 0; i < ast.arguments; i++) {
      if (ast.arguments[i].is('ExpandArguments')) {
        argumentExpansionCount++;
      }
    }
    
    var hasSimpleName = ast.name.value.match(/[a-zA-Z_$][a-zA-Z_$0-9]*/);
    
    if (hasSimpleName && argumentExpansionCount === 0 && ast.thisArgument == null) {
      // Simple method call, no this parameter
      
      var args = ast.arguments.map(function (argAst) { return argAst.code; });
      
      ast.code = [ast.object.code, '.', ast.name.value, '(', args.interpolate(', '), ')'];
    }
    else if (hasSimpleName && argumentExpansionCount === 0) {
      // Simple method call, with thisParameter
      
      var args = [ast.thisArgument.code];
      args.pushAll(ast.arguments.map(function (argAst) { return argAst.code; }));
      args = args.interpolate(', ');
      
      ast.code = [ast.object.code, '.', ast.name.value, '.call(', args, ')'];
    }
    else {
      // Build arguments array and use apply
      
      var thisArgument = (ast.thisArgument != null ? ast.thisArgument.code : 'null');
    
      var args = [
        '__combe.makeArray(', 
          ast.arguments.map(function (argAst) { return argAst.code; }).interpolate(', '), 
        ')'
      ];
    
      ast.code = [
        '__combe.applyMethod(', 
          ast.object.code, ', ', 
          ast.name.code, ', ', 
          thisArgument, ', ', 
          args, 
        ')'
      ];
    }
  },
  
  visitSubscript: function (ast) { // [ object, arguments ]
    ast.visitChildren(this);
    
    var argumentExpansionCount = 0;
    for (var i = 0; i < ast.arguments; i++) {
      if (ast.arguments[i].is('ExpandArguments')) {
        argumentExpansionCount++;
      }
    }
    
    if (argumentExpansionCount === 0) {
      // Simple method call, no this parameter
      
      var args = ast.arguments.map(function (argAst) { return argAst.code; });
      
      ast.code = [ast.object.code, '.subscript(', args.interpolate(', '), ')'];
    }
    else {
      // Build arguments array and use apply
    
      var args = [
        '__combe.makeArray(', 
          ast.arguments.map(function (argAst) { return argAst.code; }).interpolate(', '), 
        ')'
      ];
    
      ast.code = [
        '__combe.applyMethod(', 
          ast.object.code, ', ', 
          '"subscript", ',
          'null, ',
          args, 
        ')'
      ];
    }
  },
  
  visitCall: function (ast) { // [ function, thisArgument, arguments ]
    ast.visitChildren(this);
    
    var argumentExpansionCount = 0;
    for (var i = 0; i < ast.arguments; i++) {
      if (ast.arguments[i].is('ExpandArguments')) {
        argumentExpansionCount++;
      }
    }
    
    if (argumentExpansionCount === 0 && ast.thisArgument == null) {
      // Simple function call, no this parameter
      
      var args = ast.arguments.map(function (argAst) { return argAst.code; });
      
      ast.code = [ast.function.code, '(', args.interpolate(', '), ')'];
    }
    else if (argumentExpansionCount === 0) {
      // Simple function call with this parameter
      
      var args = [ast.thisArgument.code];
      args.pushAll(ast.arguments.map(function (argAst) { return argAst.code; }));
      args = args.interpolate(', ');
      
      ast.code = [ast.function.code, '.call(', args, ')'];
    }
    else {
      // Build arguments array and use apply
      
      var thisArgument = (ast.thisArgument != null ? ast.thisArgument.code : 'null');
      
      var args = [
        '__combe.makeArray(', 
          ast.arguments.map(function (argAst) { return argAst.code; }).interpolate(', '),
        ')'
      ];
      
      ast.code = [
        ast.function.code, '.apply(', 
          thisArgument, ', ',
          args,
        ')'
      ];
    }
  },
  
  visitExpandArguments: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.expand(', ast.argument.code, ')'];
  },
  
  visitAssociation: function (ast) { // [ key, value ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.association(', ast.key.code, ', ', ast.value.code, ')'];
  },
  
  visitObject: function (ast) { // [ prototype, propertyDeclarations ]
    ast.visitChildren(this);
    
    var prototype = (ast.prototype != null ? ast.prototype.code : '__combe.makeObject()');
    
    var propertyDeclarations = ast.propertyDeclarations.map(function (node) {
      return node.code;
    });
    
    ast.code = [
      '(function (__combeObject) {\n',
        propertyDeclarations,
        'return __combeObject;\n',
      '})(', prototype, ')'
    ];
        
  },
  
  visitThis: function (ast) { // [ ]
    ast.code = 'this';
  },
  
  visitNull: function (ast) { // [ ]
    ast.code = 'null';
  },
  
  visitUndefined: function (ast) { // [ ]
    ast.code = 'undefined';
  },
  
  visitTrue: function (ast) { // [ ]
    ast.code = 'true';
  },
  
  visitFalse: function (ast) { // [ ]
    ast.code = 'false';
  },
  
  visitString: function (ast) { // [ value ]
    ast.code = ast.value.quote();
  },
  
  visitNumber: function (ast) { // [ value ]
    ast.code = ast.value.toString();
  },
  
  visitFunction: function (ast) { // [ thisParameter, parameters, body ]
    ast.visitChildren(this);
    
    ast.code = this.processFunction(
      ast.thisParameter, 
      ast.parameters, 
      ast.variables, 
      ast.body
    );
  },
  
  visitContractionParameter: function (ast) { // [ name ]
    // Do Nothing (see processParameters())
  },
  
  visitParameter: function (ast) { // [ name ]
    // Do Nothing (see processParameters())
  },
  
  visitIgnoredParameter: function (ast) { // [ ]
    // Do Nothing (see processParameters())
  },
  
  visitValuePropertyDeclaration: function (ast) { // [ name, argument ]
    ast.visitChildren(this);
    
    ast.code = ['__combeObject[', ast.name.code, '] = ', ast.argument.code, ';\n'];
  },
  
  visitGetPropertyDeclaration: function (ast) { // [ name, thisParameter, parameters, body ]
    ast.visitChildren(this);
    
    var func = this.processFunction(
      ast.thisParameter, 
      ast.parameters, 
      ast.variables, 
      ast.body
    );
    
    ast.code = [
      '__combe.defineGetProperty(', 
        '__combeObject, ', 
        ast.name.code, ', ', 
        func,
      ');\n'
    ];
  },
  
  visitSetPropertyDeclaration: function (ast) { // [ name, thisParameter, parameters, body ]
    ast.visitChildren(this);
    
    var func = this.processFunction(
      ast.thisParameter, 
      ast.parameters, 
      ast.variables, 
      ast.body
    );
    
    ast.code = [
      '__combe.defineSetProperty(',
        '__combeObject, ', 
        ast.name.code, ', ',
        func,
      ');\n'
    ];
  },
  
  visitMethodPropertyDeclaration: function (ast) { // [ name, thisParameter, parameters, body ]
    ast.visitChildren(this);
    
    var func = this.processFunction(
      ast.thisParameter, 
      ast.parameters, 
      ast.variables, 
      ast.body
    );
    
    ast.code = [
      '__combeObject[', ast.name.code, '] = ', func, ';\n'
    ];
  },
  
  visitDescribePropertyDeclaration: function (ast) { // [ name, argument ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.defineDescribedProperty(__combeObject, ', ast.name.code, ', ', ast.argument.code, ');\n'];
  },
  
});
