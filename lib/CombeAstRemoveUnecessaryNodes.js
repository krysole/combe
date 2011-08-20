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
require('./JavaScriptExtensions');

var Ast = require('./CombeAst');

var CombeAstRemoveUnecessaryNodes = module.exports = Class.new(Object, {
  
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
  
  visitThis: function (ast) {
  },
  
  visitVariable: function (ast) {
  },
  
  visitLiteral: function (ast) {
  },
  
  visitArray: function (ast) {
    this.visitAll(ast.elements);
  },
  
  visitElision: function (ast) {
  },
  
  visitObject: function (ast) {
    this.visitAll(ast.properties);
  },
  
  visitValueProperty: function (ast) {
    this.visit(ast.expression);
  },
  
  visitGetProperty: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitSetProperty: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitDot: function (ast) {
    this.visit(ast.receiver);
  },
  
  visitAt: function (ast) {
    this.visit(ast.receiver);
    this.visit(ast.expression);
  },
  
  visitNew: function (ast) {
    this.visit(ast.constructor);
    this.visitAll(ast.arguments);
  },
  
  visitCall: function (ast) {
    this.visit(ast.function);
    this.visitAll(ast.arguments);
  },
  
  visitCallMethod: function (ast) {
    this.visit(ast.receiver);
    this.visitAll(ast.arguments);
  },
  
  visitPostfix: function (ast) {
    this.visit(ast.expression);
  },
  
  visitPrefix: function (ast) {
    this.visit(ast.expression);
  },
  
  visitOperator: function (ast) {
    this.visit(ast.left);
    this.visit(ast.right);
  },
  
  visitDelete: function (ast) {
    this.visit(ast.expression);
  },
  
  visitVoid: function (ast) {
    this.visit(ast.expression);
  },
  
  visitTypeof: function (ast) {
    this.visit(ast.expression);
  },
  
  visitTernary: function (ast) {
    this.visit(ast.condition);
    this.visit(ast.true);
    this.visit(ast.false);
  },
  
  visitAssignment: function (ast) {
    this.visit(ast.lvalue);
    this.visit(ast.rvalue);
  },
  
  visitOperatorAssignment: function (ast) {
    this.visit(ast.lvalue);
    this.visit(ast.rvalue);
  },
  
  visitSequence: function (ast) {
    this.visitAll(ast.expressions);
  },
  
  visitFunction: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitExpressionStatement: function (ast) {
    this.visit(ast.expression);
  },
  
  visitBlock: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitVar: function (ast) {
    this.visitAll(ast.variables);
  },
  
  visitVariableDeclaration: function (ast) {
    if (ast.expression) {
      this.visit(ast.expression);
    }
  },
  
  visitEmpty: function (ast) {
  },
  
  visitIf: function (ast) {
    this.visit(ast.condition);
    this.visit(ast.true);
    if (ast.false) {
      this.visit(ast.false);
    }
  },
  
  visitDoWhile: function (ast) {
    this.visit(ast.body);
    this.visit(ast.condition);
  },
  
  visitWhile: function (ast) {
    this.visit(ast.condition);
    this.visit(ast.body);
  },
  
  visitFor: function (ast) {
    this.visit(ast.initialize);
    this.visit(ast.condition);
    this.visit(ast.increment);
    this.visit(ast.body);
  },
  
  visitForVar: function (ast) {
    this.visitAll(ast.variables);
  },
  
  visitForIn: function (ast) {
    this.visit(lvalue);
    this.visit(rvalue);
    this.visit(body);
  },
  
  visitContinue: function (ast) {
  },
  
  visitBreak: function (ast) {
  },
  
  visitReturn: function (ast) {
    if (ast.expression) {
      this.visit(ast.expression);
    }
  },
  
  visitWith: function (ast) {
    this.visit(ast.subject);
    this.visit(ast.body);
  },
  
  visitSwitch: function (ast) {
    this.visit(ast.subject);
    this.visitAll(ast.clauses);
  },
  
  visitLabel: function (ast) {
    this.visit(ast.body);
  },
  
  visitThrow: function (ast) {
    this.visit(ast.expression);
  },
  
  visitTry: function (ast) {
    this.visit(ast.block);
    if (ast.catch) {
      this.visit(ast.catch);
    }
    if (ast.finally) {
      this.visit(ast.finally);
    }
  },
  
  visitDebugger: function (ast) {
  },
  
  visitCaseClause: function (ast) {
    this.visit(ast.subject);
    this.visitAll(ast.statements);
  },
  
  visitDefaultClause: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitCatch: function (ast) {
    this.visit(ast.block);
  },
  
  visitFinally: function (ast) {
    this.visit(ast.block);
  },
  
  visitFunctionDeclaration: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitProgram: function (ast) {
    this.visitAll(ast.statements);
  },
  
  /// Combe Extensions
  
  visitExpressionBody: function (ast) {
    this.visit(ast.expression);
  },
  
  visitStatementsBody: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitAstTemplate: function (ast) {
    this.visit(ast.body);
  },
  
  visitInterpolateExpression: function (ast) {
    this.visit(ast.body);
  },
  
  visitExpandInterpolate: function (ast) {
    this.visit(ast.body);
  },
  
  visitInterpolateStatements: function (ast) {
    this.visit(ast.body);
  },
  
  visitInterpolateIdentifier: function (ast) {
    this.visit(ast.body);
  },
  
  visitDescribeProperty: function (ast) {
    this.visit(ast.expression);
  },
  
  visitRangeInfinity: function (ast) {
  },
  
  visitInclusiveRange: function (ast) {
    this.visit(ast.start);
    this.visit(ast.end);
  },
  
  visitExclusiveRange: function (ast) {
    this.visit(ast.start);
    this.visit(ast.end);
  },
  
  visitRule: function (ast) {
    this.visit(ast.pattern);
  },
  
  visitEmptyPattern: function (ast) {
  },
  
  visitChoicePattern: function (ast) {
    this.visitAll(ast.patterns);
    
    var patterns = [];
    ast.patterns.each(function (elem) {
      if (elem.is('ChoicePattern')) {
        patterns.pushAll(elem.patterns);
      }
      else {
        patterns.push(elem);
      }
    });
    ast.patterns = patterns;
  },
  
  visitConcatPattern: function (ast) {
    this.visitAll(ast.patterns);
    
    var patterns = [];
    ast.patterns.each(function (elem) {
      if (elem.is('ConcatPattern')) {
        patterns.pushAll(elem.patterns);
      }
      else {
        patterns.push(elem);
      }
    });
    ast.patterns = patterns;
  },
  
  visitActionPattern: function (ast) {
    this.visit(ast.body);
  },
  
  visitPredicatePattern: function (ast) {
    this.visit(ast.body);
  },
  
  visitImmediatePattern: function (ast) {
    this.visit(ast.body);
  },
  
  visitNotPattern: function (ast) {
    this.visit(ast.pattern);
  },
  
  visitLookaheadPattern: function (ast) {
    this.visit(ast.pattern);
  },
  
  visitTokenOperatorPattern: function (ast) {
    this.visit(ast.pattern);
  },
  
  visitAnythingPattern: function (ast) {
  },
  
  visitBindPattern: function (ast) {
    this.visit(ast.pattern);
  },
  
  visitRepeatPattern: function (ast) {
    this.visit(ast.pattern);
  },
  
  visitRepeat1Pattern: function (ast) {
    this.visit(ast.pattern);
  },
  
  visitOptionalPattern: function (ast) {
    this.visit(ast.pattern);
  },
  
  visitJSApplyPattern: function (ast) {
    this.visit(ast.pattern);
    this.visitAll(ast.arguments);
  },
  
  visitApplyPattern: function (ast) {
    this.visit(ast.pattern);
    this.visitAll(ast.arguments);
  },
  
  visitNumberPattern: function (ast) {
  },
  
  visitStringPattern: function (ast) {
  },
  
  visitVariablePattern: function (ast) {
  },
  
});
