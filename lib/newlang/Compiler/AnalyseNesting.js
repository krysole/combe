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

var AnalyseNesting = module.exports = Class.new(Object, {
  
  analyse: function (ast) {
    ast.visit(this.new());
  },
  
}, {
  
  visitFile: function (ast) { // [ body ]
    ast.body.statementLevel = true;
    ast.body.tailPosition = true;
    
    ast.visitChildren(this);
  },
  
  visitBlock: function (ast) { // [ statements ]
    ast.expressionOnly = false;
    
    ast.statements.each(function (stmt) {
      stmt.statementLevel = true;
      stmt.tailPosition = false;
    });
    if (ast.statements.length > 0) {
      ast.statements.last.tailPosition = ast.tailPosition;
    }
    
    ast.visitChildren(this);
  },
  
  visitIf: function (ast) { // [ condition, consiquent, alternative ]
    ast.expressionOnly = false;
    
    ast.condition.statementLevel = false;
    
    ast.consiquent.statementLevel = true;
    ast.consiquent.tailPosition = ast.tailPosition;
    
    if (ast.alternative != null) {
      ast.alternative.statementLevel = true;
      ast.alternative.tailPosition = ast.tailPosition;
    }
    
    ast.visitChildren(this);
  },
  
  visitTryCatch: function (ast) { // [ tryblock, catchbinding, catchblock ]
    ast.expressionOnly = false;
    
    ast.tryBlock.statementLevel = true;
    ast.tryBlock.tailPosition = ast.tailPosition;
    
    ast.catchBlock.statementLevel = true;
    ast.catchBlock.tailPosition = ast.tailPosition;
    
    ast.visitChildren(this);
  },
  
  visitVar: function (ast) { // [ name, rvalue ]
    ast.expressionOnly = true;
    
    if (ast.rvalue != null) {
      ast.rvalue.statementLevel = false;
    }
    
    ast.visitChildren(this);
  },
  
  visitReturn: function (ast) { // [ argument ]
    ast.expressionOnly = true;
    
    ast.argument.statementLevel = false;
    ast.argument.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitThrow: function (ast) { // [ argument ]
    ast.expressionOnly = true;
    
    ast.argument.statementLevel = false;
    ast.argument.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitOr: function (ast) { // [ lhs, rhs ]
    ast.expressionOnly = true;
    
    ast.lhs.statementLevel = false;
    ast.lhs.tailPosition = false;
    ast.rhs.statementLevel = false;
    ast.rhs.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitXor: function (ast) { // [ lhs, rhs ]
    ast.expressionOnly = true;
    
    ast.lhs.statementLevel = false;
    ast.lhs.tailPosition = false;
    ast.rhs.statementLevel = false;
    ast.rhs.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitAnd: function (ast) { // [ lhs, rhs ]
    ast.expressionOnly = true;
    
    ast.lhs.statementLevel = false;
    ast.lhs.tailPosition = false;
    ast.rhs.statementLevel = false;
    ast.rhs.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitNot: function (ast) { // [ argument ]
    ast.expressionOnly = true;
    
    ast.argument.statementLevel = false;
    ast.argument.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitOperator: function (ast) { // [ opname, lhs, rhs ]
    ast.expressionOnly = true;
    
    ast.opname.statementLevel = false;
    ast.opname.tailPosition = false;
    ast.lhs.statementLevel = false;
    ast.lhs.tailPosition = false;
    ast.rhs.statementLevel = false;
    ast.rhs.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitPrefixOperator: function (ast) { // [ opname, argument ]
    ast.expressionOnly = true;
    
    ast.opname.statementLevel = false;
    ast.opname.tailPosition = false;
    ast.argument.statementLevel = false;
    ast.argument.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitVariableAssignment: function (ast) { // [ name, rvalue ]
    ast.expressionOnly = true;
    
    ast.rvalue.statementLevel = false;
    ast.rvalue.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitMethodCallAssignment: function (ast) { // [ object, name, thisArgument, arguments, rvalue ]
    ast.expressionOnly = true;
    
    ast.object.statementLevel = false;
    ast.object.tailPosition = false;
    ast.name.statementLevel = false;
    ast.name.tailPosition = false;
    ast.thisArgument.statementLevel = false;
    ast.thisArgument.tailPosition = false;
    ast.arguments.each(function (arg) {
      arg.statementLevel = false;
      arg.tailPosition = false;
    });
    ast.rvalue.statementLevel = false;
    ast.rvalue.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitSubscriptAssignment: function (ast) { // [ object, arguments, rvalue ]
    ast.expressionOnly = true;
    
    ast.object.statementLevel = false;
    ast.object.tailPosition = false;
    ast.arguments.each(function (arg) {
      arg.statementLevel = false;
      arg.tailPosition = false;
    });
    ast.rvalue.statementLevel = false;
    ast.rvalue.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitVariableLookup: function (ast) { // [ name ]
    ast.expressionOnly = true;
  },
  
  visitMethodCall: function (ast) { // [ object, name, thisArgument, arguments ]
    ast.expressionOnly = true;
    
    ast.object.statementLevel = false;
    ast.object.tailPosition = false;
    ast.name.statementLevel = false;
    ast.name.tailPosition = false;
    ast.thisArgument.statementLevel = false;
    ast.thisArgument.tailPosition = false;
    ast.arguments.each(function (arg) {
      arg.statementLevel = false;
      arg.tailPosition = false;
    });
    
    ast.visitChildren(this);
  },
  
  visitSubscript: function (ast) { // [ object, arguments ]
    ast.expressionOnly = true;
    
    ast.object.statementLevel = false;
    ast.object.tailPosition = false;
    ast.arguments.each(function (arg) {
      arg.statementLevel = false;
      arg.tailPosition = false;
    });
    
    ast.visitChildren(this);
  },
  
  visitCall: function (ast) { // [ function, thisArgument, arguments ]
    ast.expressionOnly = true;
    
    ast.function.statementLevel = false;
    ast.function.tailPosition = false;
    ast.thisArgument.statementLevel = false;
    ast.thisArgument.tailPosition = false;
    ast.arguments.each(function (arg) {
      arg.statementLevel = false;
      arg.tailPosition = false;
    });
    
    ast.visitChildren(this);
  },
  
  visitExpandArguments: function (ast) { // [ argument ]
    ast.expressionOnly = true;
    
    ast.argument.statementLevel = false;
    ast.argument.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitAssociation: function (ast) { // [ key, value ]
    ast.expressionOnly = true;
    
    ast.key.statementLevel = false;
    ast.key.tailPosition = false;
    ast.value.statementLevel = false;
    ast.value.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitObject: function (ast) { // [ prototype, propertyDeclarations ]
    ast.expressionOnly = true;
    
    ast.prototype.statementLevel = false;
    ast.prototype.tailPosition = false;
    ast.propertyDeclarations.each(function (pdecl) {
      pdecl.statementLevel = true;
      pdecl.tailPosition = false;
    });
    
    ast.visitChildren(this);
  },
  
  visitThis: function (ast) { // [ ]
    ast.expressionOnly = true;
  },
  
  visitNull: function (ast) { // [ ]
    ast.expressionOnly = true;
  },
  
  visitUndefined: function (ast) { // [ ]
    ast.expressionOnly = true;
  },
  
  visitTrue: function (ast) { // [ ]
    ast.expressionOnly = true;
  },
  
  visitFalse: function (ast) { // [ ]
    ast.expressionOnly = true;
  },
  
  visitString: function (ast) { // [ value ]
    ast.expressionOnly = true;
  },
  
  visitNumber: function (ast) { // [ value ]
    ast.expressionOnly = true;
  },
  
  visitFunction: function (ast) { // [ thisParameter, parameters, body ]
    ast.expressionOnly = true;
    
    ast.body.statementLevel = true;
    ast.body.tailPosition = true;
    
    ast.visitChildren(this);
  },
  
  visitContractionParameter: function (ast) { // [ name ]
  },
  
  visitParameter: function (ast) { // [ name ]
  },
  
  visitIgnoredParameter: function (ast) { // [ ]
  },
  
  visitValuePropertyDeclaration: function (ast) { // [ name, argument ]
    ast.expressionOnly = false;
    
    ast.argument.statementLevel = false;
    ast.argument.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
  visitGetPropertyDeclaration: function (ast) { // [ name, thisParameter, parameters, body ]
    ast.expressionOnly = false;
    
    ast.name.statementLevel = false;
    ast.name.tailPosition = false;
    ast.body.statementLevel = true;
    ast.body.tailPosition = true;
    
    ast.visitChildren(this);
  },
  
  visitSetPropertyDeclaration: function (ast) { // [ name, thisParameter, parameters, body ]
    ast.expressionOnly = false;
    
    ast.name.statementLevel = false;
    ast.name.tailPosition = false;
    ast.body.statementLevel = true;
    ast.body.tailPosition = true;
    
    ast.visitChildren(this);
  },
  
  visitMethodPropertyDeclaration: function (ast) { // [ name, thisParameter, parameters, body ]
    ast.expressionOnly = false;
    
    ast.name.statementLevel = false;
    ast.name.tailPosition = false;
    ast.body.statementLevel = true;
    ast.body.tailPosition = true;
    
    ast.visitChildren(this);
  },
  
  visitDescribePropertyDeclaration: function (ast) { // [ name, argument ]
    ast.expressionOnly = false;
    
    ast.argument.statementLevel = false;
    ast.argument.tailPosition = false;
    
    ast.visitChildren(this);
  },
  
});
