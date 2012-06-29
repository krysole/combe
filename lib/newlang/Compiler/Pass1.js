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

var Ast1 = require('./Ast1');

var AnalyseLexicalScope = require('./AnalyseLexicalScope');
var AnalyseReturnStatements = require('./AnalyseReturnStatements');

var Pass1 = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    AnalyseLexicalScope.analyse(ast);
    AnalyseReturnStatements.analyse(ast);
    
    ast.visit(this.new());
    
    return ast.result;
  },
  
}, {
  
  attrArgument: function (value) {
    var self = this;
    
    if (value == null) {
      return null;
    }
    else if (Array.isArray(value)) {
      return value.map(function (elem) {
        return self.attrArgument(elem);
      });
    else if (typeof value === 'object' && value.result != null) {
      return value.result;
    }
    else {
      return value;
    }
  },
  
  ResultAst: Ast1, 
  
  visitUnspecified: function (ast) {
    ast.visitChildren(this);
    
    var ctor = this.ResultAst[ast.type];
    var attrs = [];
    var attrnames = ast.childrenAttributes;
    for (var i = 0; i < attrnames.length; i++) {
      attrs.push(this.attrArgument(ast[attrnames[i]]));
    }
    ast.result = ctor.apply(Ast1, attrs);
  },
  
  
  combePrefixedNames: [
    'unique',
    
    'catchReturn', 'return', 'Continue',
    'methodCall', 'call', 
    'expansion',
    
    'ensureBoolean', 'or', 'xor', 'and', 'not',
    
    'InfixOperators', 'PrefixOperators', 'PostfixOperators',
    
    'Association'
  ],
  
  
  visitFile: function (ast) { // [ body ]
    ast.visitChildren(this);
    
    var variables = [];
    var prologue = [];
    
    for (var i = 0; i < ast.moduleReturnGensymIndexCount; i++) {
      var rp = '__ReturnPoint' + i;
      variables.push(rp);
      prologue.push(
        Ast1.VariableAssignment(
          rp,
          Ast1.Call(
            Ast1.VariableLookup('__combe_unique'),
            [
              Ast1.String(rp)
            ]
          )
        )
      );
    }
    
    for (var i = 0; i < this.combePrefixedNames.length; i++) {
      var name = this.combePrefixedNames[i];
      variables.push('__combe_' + name);
      prologue.push(
        Ast1.VariableAssignment(
          '__combe_' + name,
          Ast1.PropertyLookup(
            Ast1.VariableLookup('__combe'),
            Ast1.String(name)
          )
        )
      );
    }
      
    
    var body = Ast1.Call(
      Ast1.Call(
        Ast1.VariableLookup('__combe_catchReturn'),
        [
          Ast1.VariableLookup('__ReturnPoint' + ast.returnGensymIndex),
          Ast1.Function(['__combe'], ast.variables, ast.body.result);
        ]
      ),
      []
    );
    
    body = Ast1.Block(prologue.concat([body]));
    
    ast.result = Ast1.File(Ast1.Function([], variables, body));
  },
  
  
  visitBlock: function (ast) { // [ statements ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Block(ast.statements.map(function (stmt) {
      return stmt.result;
    }));
  },
  
  
  visitIf: function (ast) { // [ condition, consiquent, alternative ]
    ast.visitChildren(this);
    
    var condition = Ast1.Call(
      Ast1.VariableLookup('__combe_ensureBoolean'),
      null,
      [ ast.condition.result ]
    );
    
    var alternative = (
      ast.alternative != null
      ? ast.alternative.result
      : Ast1.Null()
    );
    
    ast.result = Ast1.If(
      condition,
      ast.consiquent.result,
      alternative
    );
  },
  
  
  visitFunction: function (ast) { // [ name, this, parameters, body ]
    ast.visitChildren(this);
    
    this.processFunction(ast);
    
    if (ast.name != null) {
      ast.result = Ast1.VariableAssignment(
        ast.name,
        ast.func
      );
    }
    else {
      ast.result = ast.func;
    }
  },
  
  visitMethod: function (ast) { // [ object, name, this, parameters, rvalue, body ]
    ast.visitChildren(this);
    
    this.processFunction(ast);
    
    if (ast.object != null) {
      // Assign the method function to something
      var name = (
        ast.rvalue == null 
        ? ast.name 
        : Ast1.String(ast.name.value + '$assignment')
      );
    
      ast.result = Ast1.PropertyAssignment(
        ast.object.result,
        name,
        ast.func
      );
    }
    else {
      // Just return the method function
      ast.result = ast.func;
    }
  },
  
  visitBlock: function (ast) { // [ this, parameters, body ]
    ast.visitChildren(this);
    
    this.processFunction(ast);
    
    ast.result = ast.func;
  },
    
  processFunction: function (ast) { // Method or Function
    var contractionParameter = null;
    var contractionParameterIndex = null;
    var simpleParameterCount = 0;
    var params = [];
    var trailingParams = [];
    for (var i = 0; i < ast.parameters.length; i++) {
      if (ast.parameters[i].is('ContractionParameter')) {
        if (contractionParameter != null) {
          throw Error.new('Too many contraction parameters in parameter list');
        } 
        contractionParameter = ast.parameters[i].name;
        contractionParameterIndex = i;
      }
      else {
        simpleParameterCount++;
        if (contractionParameter != null) {
          trailingParams.push(ast.parameters[i].name);
        }
        else {
          params.push(ast.parameters[i].name);
        }
      }
    }
    if (ast.rvalue != null) {
      simpleParameterCount++;
      if (contractionParameter != null) {
        trailingParams.push(ast.rvalue.name);
      }
      else {
        params.push(ast.rvalue.name);
      }
    }
    
    var body;
    var variables;
    if (ast.this == null) {
      variables = ast.variables;
      body = ast.body.result;
    }
    else {
      var thisName = ast.this.name;
      
      variables = ast.variables;
      ast.variable.pushIfAbsent(thisName);
      body = Ast1.Block([
        Ast1.VariableAssignment(thisName, Ast1.This()),
        ast.body.result
      ]);
    }
    
    if (contractionParameter == null) {
      ast.func = Ast1.Function(
        params,
        ast.variables,
        body
      );
    }
    else {
      params.each(function (name) {
        variables.pushIfAbsent(name);
      });
      trailingParams.each(function (name) {
        variables.pushIfAbsent(name);
      });
      variables.pushIfAbsent(contractionParameter);
      
      
      variables.push('__argumentIndex');
      variables.push('__simpleParameterCount');
      variables.push('__contractionArgumentCount');
      variables.push('__endContractedArguments');
      
      var prologue = [];
      
      prologue.push( // __argumentIndex = 0
        Ast1.VariableAssignment('__argumentIndex', Ast1.Number(0))
      );
      prologue.push( // __simpleParameterCount = \(simpleParameterCount)
        Ast1.VariableAssignment('__simpleParameterCount', Ast1.Number(simpleParameterCount))
      );
      prologue.push( // __contractedArgumentCount = arguments.length - __simpleParameterCount
        Ast1.VariableAssignment(
          '__contractedArgumentCount',
          Ast1.InfixOperator('-',
            Ast1.PropertyLookup(
              Ast1.VariableLookup('arguments'),
              Ast1.String('length')
            ),
            Ast1.VariableLookup('__simpleParameterCount')
          )
        )
      );
      prologue.push( // __endContractedArguments = \(params.length) + __contractedArgumentCount
        Ast1.VariableAssignment(
          '__endContractionArguments',
          Ast1.InfixOperator('+',
            Ast1.Number(params.length),
            Ast1.VariableLookup('__contractedArgumentCount')
          )
        )
      );
      
        
      params.each(function (name) {
        prologue.push( // \(name) = arguments[__argumentIndex++]
          Ast1.VariableAssignment(
            name,
            Ast1.PropertyLookup(
              Ast1.VariableLookup('arguments'),
              Ast1.PostIncrementedVariableLookup('__argumentIndex')
            )
          )
        );
      });
      
      
      prologue.push( // \(name) = Array.slice(arguments, __argumentIndex, __endContractedArguments)
        Ast1.VariableAssignment(
          contractionParameter,
          Ast1.MethodCall(
            Ast1.VariableLookup('Array'),
            'slice',
            [
              Ast1.VariableLookup('__argumentIndex'),
              Ast1.VariableLookup('__endContractedArguments')
            ]
          )
        )
      );
      prologue.push( // __argumentIndex = __endContractedArguments
        Ast1.VariableAssignment(
          '__argumentIndex', 
          Ast1.VariableLookup('__endContractedArguments')
        )
      );
      
      
      trailingParams.each(function (name) {
        prologue.push( // \(name) = arguments[__argumentIndex++]
          Ast1.VariableAssignment(
            name,
            Ast1.PropertyLookup(
              Ast1.VariableLookup('arguments'),
              Ast1.PostIncrementedVariableLookup('__argumentIndex')
            )
          )
        );
      });
      
      prologue = Ast1.Block(prologue);
      
      ast.func = Ast1.Function(
        params,
        ast.variables,
        Ast1.Block([prologue, body])
      );
    }
    
    ast.func = Ast1.Call(
      Ast1.VariableLookup('__combe_catchReturn'),
      [
        Ast1.VariableLookup('__ReturnPoint' + ast.returnGensymIndex),
        ast.func
      ]
    );
  },
  
  visitDeclareVariable: function (ast) { // [ name, rvalue ]
    ast.visitChildren(this);
    
    if (ast.rvalue != null) {
      ast.result = Ast1.VariableAssignment(ast.name, ast.rvalue.result);
    }
    else {
      ast.result = Ast1.Null()
    }
  },
  
  
  visitReturn: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_return'),
      [
        Ast1.VariableLookup('__ReturnPoint' + ast.from.returnGensymIndex),
        ast.argument.result
      ]
    );
  },
  
  visitBreak: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_return'),
      [
        Ast1.VariableLookup('__ReturnPoint' + ast.from.returnGensymIndex),
        ast.argument.result
      ]
    );
  },
  
  visitContinue: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    var result = Ast1.Call(
      Ast1.VariableLookup('__combe_Continue'),
      [
        ast.argument.result
      ]
    );
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_return'),
      [
        Ast1.VariableLookup('__ReturnPoint' + ast.from.returnGensymIndex),
        result
      ]
    );
  },
  
  
  visitOr: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    var rhs = Ast1.Function([], [], ast.rhs.result);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_or');,
      null,
      [ ast.lhs.result, rhs ]
    );
  },
  
  visitXor: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_xor'),
      null,
      [ ast.lhs.result, ast.rhs.result ]
    );
  },
  
  visitAnd: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    var rhs = Ast1.Function([], [], ast.rhs.result);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_and'),
      null,
      [ ast.lhs.result, rhs ]
    );
  },
  
  visitNot: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_not'),
      null,
      [ ast.argument.result ]
    );
  },
  
  
  visitOperator: function (ast) { // [ opname, lhs, rhs ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.PropertyLookup(
        Ast1.VariableLookup('__combe_InfixOperators'),
        ast.opname
      ),
      null,
      [ ast.lhs.result, ast.rhs.result ]
    );
  },
  
  visitPrefixOperator: function (ast) { // [ opname, argument ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.PropertyLookup(
        Ast1.VariableLookup('__combe_PrefixOperators'),
        ast.opname
      ),
      null,
      [ ast.argument.result ]
    );
  },
  
  
  visitMethodCall: function (ast) { // [ object, name, this, arguments, block ] rvalue
    ast.visitChildren(this);
    
    var name = (ast.rvalue != null ? ast.name + '$assignment' : ast.name);
    var thisArg = (ast.this != null ? ast.this.result : null);
    var hasExpansionArgument = false;
    var args = ast.arguments.map(function (arg) {
      if (arg.is('ExpansionArgument')) {
        hasExpansionArgument = true;
      }
      return arg.result;
    });
    if (ast.rvalue) {
      assert(ast.block == null);
      ast.rvalue.visit(this);
      args.push(ast.rvalue.result);
    }
    if (ast.block) {
      assert(ast.rvalue == null);
      args.unshift(ast.block.result);
    }
    
    
    if (!hasExpansionArgument && thisArg == null) {
      ast.result = Ast1.MethodCall(
        ast.object.result,
        name,
        args
      );
    }
    else if (!hasExpansionArgument && thisArg != null) {
      ast.result = Ast1.MethodCall(
        Ast1.PropertyLookup(
          ast.object.result,
          name
        ),
        'apply',
        args
      );
    }
    else {
      ast.result = Ast1.Call(
        Ast1.VariableLookup('__combe_methodCall'),
        [
          ast.object.result,
          name,
          thisArg,
          args
        ]
      );
    }
  },
  
  visitSubscript: function (ast) { // [ object, arguments ] rvalue
    ast.visitChildren(this);
    
    var name = (ast.rvalue != null ? 'subscript$assignment' : 'subscript');
    var hasExpansionArgument = false;
    var args = ast.arguments.map(function (arg) {
      if (arg.is('ExpansionArgument')) {
        hasExpansionArgument = true;
      }
      return arg.result;
    });
    if (ast.rvalue) {
      ast.rvalue.visit(this);
      args.push(ast.rvalue.result);
    }
    
    if (!hasExpansionArgument) {
      ast.result = Ast1.MethodCall(
        ast.object.result,
        name,
        args
      );
    }
    else {
      ast.result = Ast1.Call(
        Ast1.PropertyLookup('__combe_methodCall'),
        [
          ast.object.result,
          name,
          Ast1.Null(),
          args
        ]
      );
    }
  },
  
  visitCall: function (ast) { // [ function, this, arguments, block ] !rvalue
    ast.visitChildren(this);
    
    if (ast.rvalue) {
      throw Error.new('Regular function calls may not include an assignment argument');
    }
    
    var thisArg = (ast.this != null ? ast.this.result : null);
    var hasExpansionArgument = false;
    var args = ast.arguments.map(function (arg) {
      if (arg.is('ExpansionArgument')) {
        hasExpansionArgument = true;
      }
      return arg.result;
    });
    if (ast.block) {
      args.unshift(ast.block.result);
    }
    
    if (!hasExpansionArgument && thisArg == null) {
      ast.result = Ast1.Call(
        ast.function.result,
        args
      );
    }
    else if (!hasExpansionArgument && thisArg != null) {
      args.unshift(thisArg);
      ast.result = Ast1.MethodCall(
        ast.function.result,
        'call',
        args
      );
    }
    else {
      ast.result = Ast1.Call(
        Ast1.VariableLookup('__combe_call'),
        [
          ast.function.result,
          thisArg,
          args
        ]
      );
    }
  },
  
  
  visitAssociation: function (ast) { // [ key, value ]
    ast.visitChildren(this);
    
    ast.result = Ast1.MethodCall(
      Ast1.VariableLookup('__combe_Association'),
      'new',
      [
        key.result,
        key.result
      ]
    );
  },
  
  visitExpansionArgument: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_expansion'),
      [
        ast.argument.result
      ]
    );
  },
  
  visitIgnoredParameter: function (ast) {
    ast.name = '__ignored';
  },
  
});
