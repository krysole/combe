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

var Ast2 = require('./Ast2');

var AnalyseLexicalScope = require('./AnalyseLexicalScope');

var Pass2 = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    AnalyseLexicalScope.analyse(ast);
    
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
  
  
  visitFile: function (ast) { // [ body ]
    ast.visitChildren(this);
    
    var func = Ast2.Function([], ast.variables, ast.body.result);
    ast.result = Ast2.File(func);
  },
  
  
  visitBlock: function (ast) { // [ statements ]
    ast.visitChildren(this);
    
    ast.result = Ast2.Block(ast.statements.map(function (stmt) {
      return stmt.result;
    }));
  },
  
  
  visitIf: function (ast) { // [ condition, consiquent, alternative ]
    ast.visitChildren(this);
    
    var condition = Ast2.Call(
      Ast2.VariableLookup('__combe_ensureBoolean'),
      null,
      [ ast.condition.result ]
    );
    
    var alternative = (
      ast.alternative != null
      ? ast.alternative.result
      : Ast2.Null()
    );
    
    ast.result = Ast2.If(
      condition,
      ast.consiquent.result,
      alternative
    );
  },
  
  visitTryCatch: function (ast) { // [ tryblock, catchbinding, catchblock ]
    ast.visitChildren(this);
    
    ast.result = Ast2.TryCatch(
      ast.tryblock.result,
      ast.catchbinding.result,
      ast.catchblock.result
    );
  },
  
  
  visitFunction: function (ast) { // [ name, parameters, body ]
    // Todo: Implement...
  },
  
  visitMethod: function (ast) { // [ object, name, parameters, body ]
    // Todo: Implement...
  },
  
  visitVar: function (ast) { // [ name, rvalue ]
    ast.visitChildren(this);
    
    if (ast.rvalue != null) {
      ast.result = Ast2.VariableAssignment(ast.name, ast.rvalue.result);
    }
    else {
      ast.result = Ast2.Null()
    }
  },
  
  
  visitReturn: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    // Todo: Implement NonLocalReturn Analysis
    if (ast.isNonLocalReturn) {
      ast.result = Ast2.NonLocalReturn(ast.argument.result);
    }
    else {
      ast.result = Ast2.Return(ast.argument.result);
    }
  },
  
  visitThrow: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.result = Ast2.Throw(ast.argument.result);
  },
  
  
  visitOr: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    var rhs = Ast2.Function([], [], ast.rhs.result);
    
    ast.result = Ast2.Call(
      Ast2.VariableLookup('__combe_or');,
      null,
      [ ast.lhs.result, rhs ]
    );
  },
  
  visitXor: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.result = Ast2.Call(
      Ast2.VariableLookup('__combe_xor'),
      null,
      [ ast.lhs.result, ast.rhs.result ]
    );
  },
  
  visitAnd: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    var rhs = Ast2.Function([], [], ast.rhs.result);
    
    ast.result = Ast2.Call(
      Ast2.VariableLookup('__combe_and'),
      null,
      [ ast.lhs.result, rhs ]
    );
  },
  
  visitNot: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.result = Ast2.Call(
      Ast2.VariableLookup('__combe_not'),
      null,
      [ ast.argument.result ]
    );
  },
  
  
  visitOperator: function (ast) { // [ opname, lhs, rhs ]
    ast.visitChildren(this);
    
    ast.result = Ast2.Call(
      Ast2.PropertyLookup(
        Ast2.VariableLookup('__combe_InfixOperators'),
        ast.opname
      ),
      null,
      [ ast.lhs.result, ast.rhs.result ]
    );
  },
  
  visitPrefixOperator: function (ast) { // [ opname, argument ]
    ast.visitChildren(this);
    
    ast.result = Ast2.Call(
      Ast2.PropertyLookup(
        Ast2.VariableLookup('__combe_PrefixOperators'),
        ast.opname
      ),
      null,
      [ ast.argument.result ]
    );
  },
  
  
  visitVariableLookup: function (ast) { // [ name ]
    ast.result = Ast2.VariableLookup(ast.name);
  },
  
  visitVariableAssignment: function (ast) { // [ name, rvalue ]
    ast.visitChildren(this);
    
    ast.result = Ast2.VariableAssignment(ast.name, ast.rvalue.result);
  },
  
  
  visitMethodCall: function (ast) { // [ object, name, arguments ]
    // Todo: Implement...
  },
  
  visitSubscript: function (ast) { // [ object, arguments ]
    // Todo: Implement...
  },
  
  visitCall: function (ast) { // [ function, arguments ]
    // Todo: Implement...
  },
  
  
  visitArguments: function (ast) { // [ this, main, block, rvalue ]
    // Todo: Implement...
  },
  
  visitExpresionArgument: function (ast) { // [ argument ]
    // Todo: Implement...
  },
  
  visitBlockArgument: function (ast) { // [ argument ]
    // Todo: Implement...
  },
  
  
  visitAssociation: function (ast) { // [ key, value ]
    ast.visitChildren(this);
    
    ast.result = Ast2.MethodCall(
      Ast2.VariableLookup('__combe_Association'),
      'new',
      [
        key.result,
        key.result
      ]
    );
  },
  
  visitThis: function (ast) { // [ ]
    ast.result = Ast2.This();
  },
  
  visitNull: function (ast) { // [ ]
    ast.result = Ast2.Null();
  },
  
  visitUndefined: function (ast) { // [ ]
    ast.result = Ast2.Literal('Undefined', undefined);
  },
  
  visitTrue: function (ast) { // [ ]
    ast.result = Ast2.Literal('Boolean', ast.value);
  },
  
  visitFalse: function (ast) { // [ ]
    ast.result = Ast2.Literal('Boolean', ast.value);
  },
  
  visitString: function (ast) { // [ value ]
    ast.result = Ast2.Literal('String', ast.value);
  },
  
  visitNumber: function (ast) { // [ value ]
    ast.result = Ast2.Literal('Number', ast.value);
  },
  
  
  
  visitParameters: function (ast) { // [ this, main, block, rvalue ]
    // Todo: Implement...
  },
  
  visitContractionParameter: function (ast) { // [ name ]
    // Todo: Implement...
  },
  
  visitBlockParameter: function (ast) { // [ name ]
    // Todo: Implement...
  },
  
  visitParameter: function (ast) { // [ name ]
    // Todo: Implement...
  },
  
  visitIgnoredParameter: function (ast) { // [ ]
    // Todo: Implement...
  },
  
});
