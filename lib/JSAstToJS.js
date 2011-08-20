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

var JSAst = require('./JSAst');
var JSAstOperatorPrecedenceAnalysis = require('./JSAstOperatorPrecedenceAnalysis');

var JSAstToJS = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    JSAstOperatorPrecedenceAnalysis.analyse(ast);
    return Array.deepJoin(this.new().visit(ast));
  },
  
}, {
  
  initialize: function () {
    this.indentationLevel = 0;
  },
  
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
    return array.map(function (elem) {
      return self.visit(elem);
    });
  },
  
  visitThis: function (ast) {
    return 'this';
  },
  
  visitVariable: function (ast) {
    return ast.name;
  },
  
  visitLiteral: function (ast) {
    return Object.toSourceString(ast.value);
  },
  
  visitArray: function (ast) {
    var self = this;
    var result = ['['];
    this.indent();
    result.push(this.visitAll(ast.elements).map(function (elem) {
      return [self.newline(), elem];
    }).interpolate(','));
    this.dedent();
    result.pushAll([this.newline(), ']']);
    return result;
  },
  
  visitElision: function (ast) {
    return '/* elision */';
  },
  
  visitObject: function (ast) {
    var self = this;
    var result = ['{'];
    this.indent();
    result.push(this.visitAll(ast.properties).map(function (elem) {
      return [self.newline(), elem];
    }).interpolate(','));
    this.dedent();
    result.pushAll([this.newline(), '}']);
    return result;
  },
  
  visitValueProperty: function (ast) {
    return [ast.name, ': ', this.visit(ast.expression)];
  },
  
  visitGetProperty: function (ast) {
    return ['get ', ast.name, '() ', this.processStatements(ast.statements)];
  },
  
  visitSetProperty: function (ast) {
    return ['set ', ast.name, '(', ast.argumentName, ') ', 
      this.processStatements(ast.statements)];
  },
  
  visitDot: function (ast) {
    return [this.subexpr(ast.receiver), '.', ast.name];
  },
  
  visitAt: function (ast) {
    return [this.subexpr(ast.receiver), '[', this.visit(ast.expression), ']'];
  },
  
  visitNew: function (ast) {
    return ['new ', this.subexpr(ast.constructor), this.processArguments(ast.arguments)];
  },
  
  visitCall: function (ast) {
    return [this.subexpr(ast.function), this.processArguments(ast.arguments)];
  },
  
  visitCallMethod: function (ast) {
    return [this.subexpr(ast.receiver), '.', ast.name, 
      this.processArguments(ast.arguments)];
  },
  
  visitPostfix: function (ast) {
    return [this.subexpr(ast.expression), ast.operator];
  },
  
  visitPrefix: function (ast) {
    return [ast.operator, this.subexpr(ast.expression)];
  },
  
  visitOperator: function (ast) {
    return [this.subexpr(ast.left), ' ', ast.operator, ' ', 
      this.subexpr(ast.right)];
  },
  
  visitDelete: function (ast) {
    return ['delete ', this.subexpr(ast.expression)];
  },
  
  visitVoid: function (ast) {
    return ['void ', this.subexpr(ast.expression)];
  },
  
  visitTypeof: function (ast) {
    return ['typeof ', this.subexpr(ast.expression)];
  },
  
  visitTernary: function (ast) {
    return [this.subexpr(ast.condition), 
      ' ? ', this.subexpr(ast.true), 
      ' : ', this.subexpr(ast.false)];
  },
  
  visitAssignment: function (ast) {
    return [this.subexpr(ast.lvalue), ' = ', this.subexpr(ast.rvalue)];
  },
  
  visitOperatorAssignment: function (ast) {
    return [this.subexpr(ast.lvalue), ' ', ast.operator, '= ',
      this.subexpr(ast.rvalue)];
  },
  
  visitSequence: function (ast) {
    return ['(', this.visitAll(ast.expressions).interpolate(', '), ')'];
  },
  
  visitFunction: function (ast) {
    return ['(function ', ast.name, '(', 
      ast.argumentNames.interpolate(', '), ') ', 
      this.processStatements(ast.statements), ')'];
  },
  
  visitExpressionStatement: function (ast) {
    if (ast.expression.is('Function') || ast.expression.is('Object')) {
      return ['(', this.visit(ast.expression), ');'];
    }
    else {
      return [this.visit(ast.expression), ';'];
    }
  },
  
  visitBlock: function (ast) {
    return this.processStatements(ast.statements);
  },
  
  visitVar: function (ast) {
    if (ast.variables.some(function (elem) {
      return (elem.expression != null);
    })) {
      var result = ['var '];
      result.push(this.visit(ast.variables[0]));
      for (var i = 1; i < ast.variables.length; i++) {
        result.pushAll([',', this.newline(), '    ']);
        result.push(this.visit(ast.variables[i]));
      }
      result.push(';');
      return result;
    }
    else {
      var result = ['var '];
      result.push(this.visitAll(ast.variables).interpolate(', '));
      result.push(';');
      return result;
    }
  },
  
  visitVariableDeclaration: function (ast) {
    if (ast.expression) {
      return [ast.name, ' = ', this.visit(ast.expression)];
    }
    else {
      return ast.name;
    }
  },
  
  visitEmpty: function (ast) {
    return '/* empty */ ;';
  },
  
  visitIf: function (ast) {
    if (ast.false) {
      return [
        'if (', this.visit(ast.condition), ') ', this.visit(ast.true),
        this.newline(), 'else ' , this.visit(ast.false)
      ];
    }
    else {
      return ['if (', this.visit(ast.condition), ') ', this.visit(ast.true)];
    }
  },
  
  visitDoWhile: function (ast) {
    return ['do ', this.visit(ast.body), 
      this.newline(), ' while (', this.visit(ast.condition), ');'];
  },
  
  visitWhile: function (ast) {
    return ['while (', this.visit(ast.condition), ') ', this.visit(ast.body)];
  },
  
  visitFor: function (ast) {
    var init = ast.initialize ? [this.visit(ast.initialize), ' '] : '';
    var cond = ast.condition ? [this.visit(ast.condition), ' '] : '';
    var inc = ast.increment ? this.visit(ast.increment) : '';
    return ['for (', init, ';', cond, ';', inc, ') ', this.visit(ast.body)];
  },
  
  visitForVar: function (ast) {
    return ['var ', this.visitAll(ast.variables).interpolate(', ')];
  },
  
  visitForIn: function (ast) {
    return ['for (', (ast.lvalue.is('VariableDeclaration') ? 'var ' : ''),
      this.visit(ast.lvalue), ' in ', this.visit(ast.rvalue), ') ', 
      this.visit(ast.body)];
  },
  
  visitContinue: function (ast) {
    if (ast.label) {
      return ['continue ', ast.label, ';'];
    }
    else {
      return 'continue;'
    }
  },
  
  visitBreak: function (ast) {
    if (ast.label) {
      return ['break ', ast.label, ';'];
    }
    else {
      return 'break;';
    }
  },
  
  visitReturn: function (ast) {
    if (ast.expression) {
      return ['return ', this.visit(ast.expression), ';'];
    }
    else {
      return 'return;';
    }
  },
  
  visitWith: function (ast) {
    return ['with (', this.visit(ast.subject), ') ', this.visit(ast.body)];
  },
  
  visitSwitch: function (ast) {
    return [
      'switch (', this.visit(ast.subject), ') {', this.newline(), 
      this.visitAll(ast.clauses), this.newline(),
      '}'
    ];
  },
  
  visitLabel: function (ast) {
    return [ast.name, ': ', this.visit(ast.body)];
  },
  
  visitThrow: function (ast) {
    return ['throw ', this.visit(ast.expression), ';'];
  },
  
  visitTry: function (ast) {
    var result = ['try ', this.visit(ast.block)];
    if (ast.catch) {
      result.push(this.newline());
      result.push(this.visit(ast.catch));
    }
    if (ast.finally) {
      result.push(this.newline());
      result.push(this.visit(ast.finally));
    }
    return result;
  },
  
  visitDebugger: function (ast) {
    return 'debugger;';
  },
  
  visitCaseClause: function (ast) {
    var self = this;
    var result = [this.visit(ast.subject), ':'];
    this.indent();
    result.push(this.visitAll(ast.statements).map(function (elem) {
      return [self.newline(), elem];
    }));
    this.dedent();
    return result;
  },
  
  visitDefaultClause: function (ast) {
    var self = this;
    var result = ['default:'];
    this.indent();
    result.push(this.visitAll(ast.statements).map(function (elem) {
      return [self.newline(), elem];
    }));
    this.dedent();
    return result;
  },
  
  visitCatch: function (ast) {
    return ['catch (', ast.argumentName, ') ', this.visit(ast.block)];
  },
  
  visitFinally: function (ast) {
    return ['finally ', this.visit(ast.block)];
  },
  
  visitFunctionDeclaration: function (ast) {
    return ['function ', ast.name, '(', 
      this.argumentNames.interpolate(', '), ') ', 
      this.processStatements(ast.statements)];
  },
  
  visitProgram: function (ast) {
    return [
      '// Generated code', this.newline(),
      this.visitAll(ast.statements).interpolate(this.newline()), this.newline()
    ];
  },
  
  processStatements: function (statements) {
    var self = this;
    var result = ['{'];
    this.indent();
    result.push(this.visitAll(statements).map(function (elem) {
      return [self.newline(), elem];
    }));
    this.dedent();
    result.push(this.newline());
    result.push('}');
    return result;
  },
  
  processArguments: function (array) {
    return ['(', this.visitAll(array).interpolate(', '), ')'];
  },
  
  subexpr: function (ast) {
    if (ast.subexpr) {
      return ['(', this.visit(ast), ')'];
    }
    else {
      return this.visit(ast);
    }
  },
  
  indent: function () {
    this.indentationLevel++;
  },
  
  dedent: function () {
    this.indentationLevel--;
  },
  
  newline: function () {
    return ['\n', '  '.repeat(this.indentationLevel)];
  },
  
});
