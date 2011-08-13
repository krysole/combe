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

var JSAst = require('./JSAst');

var JSAstOperatorPrecedenceAnalysis = module.exports = Class.new(Object, {
  
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
      throw new Error("Unknown JSAst node type '" + ast.type + "'");
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
    var self = this;
    ast.elements.each(function (elem) {
      self.visit(elem);
      elem.subexpr = false;
    });
  },
  
  visitElision: function (ast) {
  },
  
  visitObject: function (ast) {
    this.visitAll(ast.properties);
  },
  
  visitValueProperty: function (ast) {
    this.visit(ast.expression);
    ast.expression.subexpr = false;
  },
  
  visitGetProperty: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitSetProperty: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitDot: function (ast) {
    this.visit(ast.receiver);
    ast.receiver.subexpr = ast.receiver.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary', 
      'Prefix', 'Delete', 'Void', 'Typeof', 'Postfix'
    ]);
  },
  
  visitAt: function (ast) {
    this.visit(ast.receiver);
    ast.receiver.subexpr = ast.receiver.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary', 
      'Prefix', 'Delete', 'Void', 'Typeof', 'Postfix'
    ]);
    this.visit(ast.expression);
    ast.expresson.subexpr = false;
  },
  
  visitNew: function (ast) {
    var self = this;
    this.visit(ast.constructor);
    ast.constructor.subexpr = ast.constructor.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary', 
      'Prefix', 'Delete', 'Void', 'Typeof', 'Postfix'
    ]);
    ast.arguments.each(function (elem) {
      self.visit(elem);
      elem.subexpr = false;
    });
  },
  
  visitCall: function (ast) {
    var self = this;
    this.visit(ast.function);
    ast.function.subexpr = ast.function.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary', 
      'Prefix', 'Delete', 'Void', 'Typeof', 'Postfix'
    ]);
    ast.arguments.each(function (elem) {
      self.visit(elem);
      elem.subexpr = false;
    });
  },
  
  visitCallMethod: function (ast) {
    var self = this;
    this.visit(ast.receiver);
    ast.receiver.subexpr = ast.receiver.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary', 
      'Prefix', 'Delete', 'Void', 'Typeof', 'Postfix'
    ]);
    ast.arguments.each(function (elem) {
      self.visit(elem);
      elem.subexpr = false;
    });
  },
  
  visitPostfix: function (ast) {
    this.visit(ast.expression);
    ast.expression.subexpr = ast.expression.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary',
      'Prefix', 'Delete', 'Void', 'Typeof'
    ]);
  },
  
  visitPrefix: function (ast) {
    this.visit(ast.expression);
    ast.expression.subexpr = ast.expression.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary'
    ]);
  },
  
  visitOperator: function (ast) {
    this.processOperand(ast.operator, ast.left);
    this.processOperand(ast.operator, ast.right);
  },
  
  processOperand: function (type, operand) {
    this.visit(operand);
    if (operand.isAny(['Sequence', 'Assignment', 'OperatorAssignment', 
                       'Operator', 'Ternary'])) {
      operand.subexpr = true;
    }
    else if (operand.is('Operator')) {
      operand.subexpr = (this.operatorPrecedence[operand.type] < this.operatorPrecedence[type]);
    }
    else {
      operand.subexpr = false;
    }
  },
  
  operatorPrecedence: {
    '||':  1,
    '&&':  2,
    '|':   3,
    '^':   4,
    '&':   5,
    
    '==':  6,
    '!=':  6,
    '===': 6,
    '!==': 6,
    
    '<':   7,
    '>':   7,
    '<=':  7,
    '>=':  7,
    'instanceof': 7,
    'in':  7,
    
    '<<':  8,
    '>>':  8,
    '>>>': 8,
    
    '+':   9,
    '-':   9,
    
    '*':   10,
    '/':   10,
    '%':   10
  },
  
  visitDelete: function (ast) {
    this.visit(ast.expression);
    ast.expression.subexpr = ast.expression.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary'
    ]);
  },
  
  visitVoid: function (ast) {
    this.visit(ast.expression);
    ast.expression.subexpr = ast.expression.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary'
    ]);
  },
  
  visitTypeof: function (ast) {
    this.visit(ast.expression);
    ast.expression.subexpr = ast.expression.isAny([
      'Sequence', 'Assignment', 'OperatorAssignment', 'Operator', 'Ternary'
    ]);
  },
  
  visitTernary: function (ast) {
    this.visit(ast.condition);
    ast.condition.subexpr = 
      ast.condition.isAny(['Assignment', 'OperatorAssignment', 'Sequence']);
    this.visit(ast.true);
    ast.true.subexpr = ast.true.is('Sequence');
    this.visit(ast.false);
    ast.false.subexpr = ast.false.is('Sequence');
  },
  
  visitAssignment: function (ast) {
    this.visit(ast.lvalue);
    ast.lvalue.subexpr = false; // Only actual lvalues are valid, non of which need to be subexpressions
    this.visit(ast.rvalue);
    ast.rvalue.subexpr = ast.rvalue.is('Sequence');
  },
  
  visitOperatorAssignment: function (ast) {
    this.visit(ast.lvalue);
    ast.lvalue.subexpr = false; // Only actual lvalues are valid, non of which need to be subexpressions
    this.visit(ast.rvalue);
    ast.rvalue.subexpr = ast.rvalue.is('Sequence');
  },
  
  visitSequence: function (ast) {
    var self = this;
    ast.expressions.each(function (elem) {
      self.visit(elem);
      elem.subexpr = false;
    });
  },
  
  visitFunction: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitExpressionStatement: function (ast) {
    this.visit(ast.expression);
    if (['Function', 'Object'].include(ast.expression.type)) {
      ast.expression.subexpr = true;
    }
    else {
      ast.expression.subexpr = false;
    }
  },
  
  visitBlock: function (ast) {
    this.visitAll(ast.statements);
  },
  
  visitDeclare: function (ast) {
    this.visitAll(ast.variables);
  },
  
  visitEmpty: function (ast) {
  },
  
  visitIf: function (ast) {
    this.visit(ast.condition);
    ast.condition.subexpr = false;
    this.visit(ast.true);
    if (ast.false) this.visit(ast.false);
  },
  
  visitDoWhile: function (ast) {
    this.visit(ast.body);
    this.visit(ast.condition);
    ast.condition.subexpr = false;
  },
  
  visitWhile: function (ast) {
    this.visit(ast.condition);
    ast.condition.subexpr = false;
    this.visit(ast.body);
  },
  
  visitFor: function (ast) {
    this.visit(ast.initialize);
    ast.initialize.subexpr = false;
    this.visit(ast.condition);
    ast.condition.subexpr = false;
    this.visit(ast.increment);
    ast.increment.subexpr = false;
    this.visit(ast.body);
  },
  
  visitForIn: function (ast) {
    this.visit(lvalue);
    ast.lvalue.subexpr = false;
    this.visit(rvalue);
    ast.rvalue.subexpr = false;
    this.visit(body);
  },
  
  visitContinue: function (ast) {
  },
  
  visitBreak: function (ast) {
  },
  
  visitReturn: function (ast) {
    if (ast.expression) {
      this.visit(ast.expression);
      ast.expression.subexpr = false;
    }
  },
  
  visitWith: function (ast) {
    this.visit(ast.subject);
    ast.subject.subexpr = false;
    this.visit(ast.body);
  },
  
  visitSwitch: function (ast) {
    this.visit(ast.subject);
    ast.subject.subexpr = false;
    this.visitAll(ast.clauses);
  },
  
  visitLabel: function (ast) {
    this.visit(ast.body);
  },
  
  visitThrow: function (ast) {
    this.visit(ast.expression);
    ast.expression.subexpr = false;
  },
  
  visitTry: function (ast) {
    this.visit(ast.block);
    if (ast.catch) this.visit(ast.catch);
    if (ast.finally) this.visit(ast.finally);
  },
  
  visitDebugger: function (ast) {
  },
  
  visitCaseClause: function (ast) {
    this.visit(ast.subject);
    ast.subject.subexpr = false;
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
  
});
