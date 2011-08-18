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

var Ast = require('./CombeAst');

var CombeAstAnalyseLexicalScope = module.exports = Class.new(Object, {
  
  analyse: function (ast) {
    this.new().visit(ast);
  },
  
}, {
  
  visit: function (ast) {
    var visitFunction = this['visit' + ast.type];
    if (visitFunction) {
      return visitFunction.call(this, ast);
    }
    else {
      throw new Error("Unknown CombeAst node type '" + ast.type + "'");
    }
  },
  
  visitAll: function (array) {
    var self = this;
    array.each(function (elem) {
      self.visit(elem);
    });
  },
  
  allSetLexicalScope: function (array, scope) {
    array.each(function (elem) {
      elem.lexicalScope = scope;
    });
  },
  
  visitThis: function (ast) {
  },
  
  visitVariable: function (ast) {
  },
  
  visitLiteral: function (ast) {
  },
  
  visitArray: function (ast) {
    this.allSetLexicalScope(ast.elements, ast.lexicalScope);
    this.visitAll(ast.elements);
  },
  
  visitElision: function (ast) {
  },
  
  visitObject: function (ast) {
    this.allSetLexicalScope(ast.properties, ast.lexicalScope);
    this.visitAll(ast.properties);
  },
  
  visitValueProperty: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitGetProperty: function (ast) {
    this.allSetLexicalScope(ast.statements, ast.lexicalScope);
    this.visitAll(ast.statements);
  },
  
  visitSetProperty: function (ast) {
    this.allSetLexicalScope(ast.statements, ast.lexicalScope);
    this.visitAll(ast.statements);
  },
  
  visitDot: function (ast) {
    ast.receiver.lexicalScope = ast.lexicalScope;
    this.visit(ast.receiver);
  },
  
  visitAt: function (ast) {
    ast.receiver.lexicalScope = ast.lexicalScope;
    this.visit(ast.receiver);
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitNew: function (ast) {
    ast.constructor.lexicalScope = ast.lexicalScope;
    this.visit(ast.constructor);
    this.allSetLexicalScope(ast.arguments, ast.lexicalScope);
    this.visitAll(ast.arguments);
  },
  
  visitCall: function (ast) {
    ast.function.lexicalScope = ast.lexicalScope;
    this.visit(ast.function);
    this.allSetLexicalScope(ast.arguments, ast.lexicalScope);
    this.visitAll(ast.arguments);
  },
  
  visitCallMethod: function (ast) {
    ast.receiver.lexicalScope = ast.lexicalScope;
    this.visit(ast.receiver);
    this.allSetLexicalScope(ast.arguments, ast.lexicalScope);
    this.visitAll(ast.arguments);
  },
  
  visitPostfix: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitPrefix: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitOperator: function (ast) {
    ast.left.lexicalScope = ast.lexicalScope;
    this.visit(ast.left);
    ast.right.lexicalScope = ast.lexicalScope;
    this.visit(ast.right);
  },
  
  visitDelete: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitVoid: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitTypeof: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitTernary: function (ast) {
    ast.condition.lexicalScope = ast.lexicalScope;
    this.visit(ast.condition);
    ast.true.lexicalScope = ast.lexicalScope;
    this.visit(ast.true);
    ast.false.lexicaScope = ast.lexicalScope;
    this.visit(ast.false);
  },
  
  visitAssignment: function (ast) {
    ast.lvalue.lexicalScope = ast.lexicalScope;
    this.visit(ast.lvalue);
    ast.rvalue.lexicalScope = ast.lexicalScope;
    this.visit(ast.rvalue);
  },
  
  visitOperatorAssignment: function (ast) {
    ast.lvalue.lexicalScope = ast.lexicalScope;
    this.visit(ast.lvalue);
    ast.rvalue.lexicalScope = ast.lexicalScope;
    this.visit(ast.rvalue);
  },
  
  visitSequence: function (ast) {
    this.allSetLexicalScope(ast.expressions, ast.lexicalScope);
    this.visitAll(ast.expressions);
  },
  
  visitFunction: function (ast) {
    ast.lexicalScope = {
      parent: ast.lexicalScope,
      variables: [],
      ast: ast
    };
    ast.lexicalScope.variables.pushAll(ast.argumentNames);
    this.allSetLexicalScope(ast.statements, ast.lexicalScope);
    this.visitAll(ast.statements);
  },
  
  visitExpressionStatement: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitBlock: function (ast) {
    this.allSetLexicalScope(ast.statements, ast.lexicalScope);
    this.visitAll(ast.statements);
  },
  
  visitVar: function (ast) {
    this.allSetLexicalScope(ast.variables, ast.lexicalScope);
    this.visitAll(ast.variables);
  },
  
  visitVariableDeclaration: function (ast) {
    ast.lexicalScope.variables.pushIfAbsent(ast.name);
    
    if (ast.expression) {
      ast.expression.lexicalScope = ast.lexicalScope;
      this.visit(ast.expression);
    }
  },
  
  visitEmpty: function (ast) {
  },
  
  visitIf: function (ast) {
    ast.condition.lexicalScope = ast.lexicalScope;
    this.visit(ast.condition);
    this.true.lexicalScope = ast.lexicalScope;
    this.visit(ast.true);
    if (ast.false) {
      ast.false.lexicalScope = ast.lexicalScope;
      this.visit(ast.false);
    }
  },
  
  visitDoWhile: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
    ast.condition.lexicalScope = ast.lexicalScope;
    this.visit(ast.condition);
  },
  
  visitWhile: function (ast) {
    ast.condition.lexicalScope = ast.lexicalScope;
    this.visit(ast.condition);
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitFor: function (ast) {
    ast.initialize.lexicalScope = ast.lexicalScope;
    this.visit(ast.initialize);
    ast.condition.lexicalScope = ast.lexicalScope;
    this.visit(ast.condition);
    ast.increment.lexicalScope = ast.lexicalScope;
    this.visit(ast.increment);
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitForVar: function (ast) {
    this.allSetLexicalScope(ast.variables, ast.lexicalScope);
    this.visitAll(ast.variables);
  },
  
  visitForIn: function (ast) {
    ast.lvalue.lexicalScope = ast.lexicalScope;
    this.visit(lvalue);
    ast.rvalue.lexicalScope = ast.lexicalScope;
    this.visit(rvalue);
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(body);
  },
  
  visitContinue: function (ast) {
  },
  
  visitBreak: function (ast) {
  },
  
  visitReturn: function (ast) {
    if (ast.expression) {
      ast.expression.lexicalScope = ast.lexicalScope;
      this.visit(ast.expression);
    }
  },
  
  visitWith: function (ast) {
    ast.subject.lexicalScope = ast.lexicalScope;
    this.visit(ast.subject);
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitSwitch: function (ast) {
    ast.subject.lexicalScope = ast.lexicalScope;
    this.visit(ast.subject);
    this.allSetLexicalScope(ast.clauses, ast.lexicalScope);
    this.visitAll(ast.clauses);
  },
  
  visitLabel: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitThrow: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitTry: function (ast) {
    ast.block.lexicalScope = ast.lexicalScope;
    this.visit(ast.block);
    if (ast.catch) {
      ast.catch.lexicalScope = ast.lexicalScope;
      this.visit(ast.catch);
    }
    if (ast.finally) {
      ast.finally.lexicalScope = ast.lexicalScope;
      this.visit(ast.finally);
    }
  },
  
  visitDebugger: function (ast) {
  },
  
  visitCaseClause: function (ast) {
    ast.subject.lexicalScope = ast.lexicalScope;
    this.visit(ast.subject);
    this.allSetLexicalScope(ast.statements, ast.lexicalScope);
    this.visitAll(ast.statements);
  },
  
  visitDefaultClause: function (ast) {
    this.allSetLexicalScope(ast.statements, ast.lexicalScope);
    this.visitAll(ast.statements);
  },
  
  visitCatch: function (ast) {
    ast.block.lexicalScope = ast.lexicalScope;
    this.visit(ast.block);
  },
  
  visitFinally: function (ast) {
    ast.block.lexicalScope = ast.lexicalScope;
    this.visit(ast.block);
  },
  
  visitFunctionDeclaration: function (ast) {
    ast.lexicalScope = {
      parent: ast.lexicalScope,
      variables: [],
      ast: ast
    };
    ast.lexicalScope.variables.pushAll(ast.argumentNames);
    this.allSetLexicalScope(ast.statements, ast.lexicalScope);
    this.visitAll(ast.statements);
  },
  
  visitProgram: function (ast) {
    ast.lexicalScope = {
      parent: null,
      variables: [],
      ast: ast
    };
    this.allSetLexicalScope(ast.statements, ast.lexicalScope);
    this.visitAll(ast.statements);
  },
  
  /// Combe Extensions
  
  visitExpressionBody: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitStatementsBody: function (ast) {
    this.allSetLexicalScope(ast.statements, ast.lexicalScope);
    this.visitAll(ast.statements);
  },
  
  visitAstTemplate: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitInterpolateExpression: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitExpandInterpolate: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitInterpolateStatements: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitInterpolateIdentifier: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitDescribeProperty: function (ast) {
    ast.expression.lexicalScope = ast.lexicalScope;
    this.visit(ast.expression);
  },
  
  visitRangeInfinity: function (ast) {
  },
  
  visitInclusiveRange: function (ast) {
    ast.start.lexicalScope = ast.lexicalScope;
    this.visit(ast.start);
    ast.end.lexicalScope = ast.lexicalScope;
    this.visit(ast.end);
  },
  
  visitExclusiveRange: function (ast) {
    ast.start.lexicalScope = ast.lexicalScope;
    this.visit(ast.start);
    ast.end.lexicalScope = ast.lexicalScope;
    this.visit(ast.end);
  },
  
  visitRule: function (ast) {
    ast.lexicalScope = {
      parent: ast.lexicalScope,
      variables: [],
      ast: ast
    },
    ast.lexicalScope.variables.pushAll(ast.argumentNames);
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
  },
  
  visitEmptyPattern: function (ast) {
  },
  
  visitChoicePattern: function (ast) {
    this.allSetLexicalScope(ast.patterns, ast.lexicalScope);
    this.visitAll(ast.patterns);
  },
  
  visitConcatPattern: function (ast) {
    this.allSetLexicalScope(ast.patterns, ast.lexicalScope);
    this.visitAll(ast.patterns);
  },
  
  visitActionPattern: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitPredicatePattern: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitImmediatePattern: function (ast) {
    ast.body.lexicalScope = ast.lexicalScope;
    this.visit(ast.body);
  },
  
  visitNotPattern: function (ast) {
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
  },
  
  visitLookaheadPattern: function (ast) {
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
  },
  
  visitTokenOperatorPattern: function (ast) {
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
  },
  
  visitAnythingPattern: function (ast) {
  },
  
  visitBindPattern: function (ast) {
    ast.lexicalScope.variables.pushIfAbsent(ast.name);
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
  },
  
  visitRepeatPattern: function (ast) {
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
  },
  
  visitRepeat1Pattern: function (ast) {
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
  },
  
  visitOptionalPattern: function (ast) {
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
  },
  
  visitJSApplyPattern: function (ast) {
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
    this.allSetLexicalScope(ast.arguments, ast.lexicalScope);
    this.visitAll(ast.arguments);
  },
  
  visitApplyPattern: function (ast) {
    ast.pattern.lexicalScope = ast.lexicalScope;
    this.visit(ast.pattern);
    this.allSetLexicalScope(ast.arguments, ast.lexicalScope);
    this.visitAll(ast.arguments);
  },
  
  visitNumberPattern: function (ast) {
  },
  
  visitStringPattern: function (ast) {
  },
  
  visitVariablePattern: function (ast) {
  },
  
});
