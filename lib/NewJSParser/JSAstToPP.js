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
var PP = require('./PP');

// Todo: This transformation assumes that operator precedence analyses has been performed already.

var JSAstToPP = module.exports = Class.new(Object, {}, {
  
  visit: function (ast) {
    var visitFunction = this['visit' + ast.type];
    if (visitFunction) {
      return visitFunction.call(this, ast);
    }
    else {
      throw new Error("Unknown JSAst node type '" + ast.type + "'");
    }
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
    return this.optionalIndentBody('[', this.visitAll(ast.elements), ', ', ',', ']');
  },
  
  visitElision: function (ast) {
    return '/* elision */';
  },
  
  visitObject: function (ast) {
    return this.indentBody('{', this.visitAll(ast.properties), ',', '}');
  },
  
  visitValueProperty: function (ast) {
    return [ast.name, PP.optionalIndentedNewline(': ', ':', this.visit(ast.expression))];
  },
  
  visitGetProperty: function (ast) {
    return ['get ', ast.name, '() ',
      this.processStatements(ast.statements)];
  },
  
  visitSetProperty: function (ast) {
    return ['set ', ast.name, '(', ast.argumentName, ') ', 
      this.processStatements(ast.statements)];
  },
  
  visitDot: function (ast) {
    return [this.subexpr(ast, ast.receiver), '.', ast.name];
  },
  
  visitAt: function (ast) {
    return [this.subexpr(ast, ast.receiver), '[', this.visit(ast.expression), ']'];
  },
  
  visitNew: function (ast) {
    return ['new ', this.subexpr(ast, ast.receiver), this.processArguments(ast.arguments)];
  },
  
  visitCall: function (ast) {
    return [this.subexpr(ast, ast.function), this.processArguments(ast.arguments)];
  },
  
  visitCallMethod: function (ast) {
    return [this.subexpr(ast, ast.receiver), '.', this.name, 
      this.processArguments(ast.arguments)];
  },
  
  visitPostfix: function (ast) {
    return [this.subexpr(ast, ast.expression), ast.operator];
  },
  
  visitPrefix: function (ast) {
    return [ast.operator, this.subexpr(ast, ast.expression)];
  },
  
  visitOperator: function (ast) {
    return [this.subexpr(ast, ast.left), PP.optionalIndentedNewline(
      [' ', ast.operator, ' '], [' ', ast.operator], 
      this.subexpr(ast, ast.right))];
  },
  
  visitDelete: function (ast) {
    return ['delete ', this.subexpr(ast, ast.expression)];
  },
  
  visitVoid: function (ast) {
    return ['void ', this.subexpr(ast, ast.expression)];
  },
  
  visitTypeof: function (ast) {
    return ['typeof ', this.subexpr(ast, ast.expression)];
  },
  
  visitTernary: function (ast) {
    var s = PP.sharedOptionalNewline();
    return [this.subexpr(ast, ast.condition), PP.indented(
      s.prepending(' ? ', '? ', this.subexpr(ast, ast.true)),
      s.prepending(' : ', ': ', this.subexpr(ast, ast.false)))];
  },
  
  visitAssignment: function (ast) {
    return [this.visit(ast.lvalue), 
      PP.optionalIndentedNewline(' = ', ' =', this.subexpr(ast, ast.rvalue))];
  },
  
  visitOperatorAssignment: function (ast) {
    return [this.visit(ast.lvalue), ' ', this.operator, 
      PP.optionalIndentedNewline('= ', '=', this.subexpr(ast, ast.rvalue))];
  },
  
  visitSequence: function (ast) {
    var s = PP.sharedOptionalNewline();
    return ['(', PP.indented(s(), s.delimited(this.visitAll(ast.expressions), ', ', ','), s()), ')'];
  },
  
  visitFunction: function (ast) {
    return ['function ', ast.name, 
      '(', PP.delimited(this.argumentNames, ', '), ') ', 
      this.processStatements(ast.statements)];
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
  
  visitDeclare: function (ast) {
    var variables = this.visitAll(ast.variables);
    var rest = variables.slice(1).map(function (elem) {
      return [PP.newline, '    ', elem];
    }).interpolate(',');
    return ['var ', variables[0], rest, ';'];
  },
  
  visitEmpty: function (ast) {
    return ';';
  },
  
  visitIf: function (ast) {
    if (ast.false) {
      return [
        'if (', this.visit(ast.condition), ') ', this.visit(ast.true),
        PP.newline, 'else ' , this.visit(ast.false)
      ];
    }
    else {
      return ['if (', this.visit(ast.condition), ') ', this.visit(ast.true)];
    }
  },
  
  visitDoWhile: function (ast) {
    return ['do ', this.visit(ast.body), ' while (', this.visit(ast.condition), ');'];
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
  
  visitForIn: function (ast) {
    return ['for (', this.visit(ast.lvalue), ' in ', this.visit(ast.rvalue), ') ', 
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
    return ['switch (', this.visit(ast.subject), ') {', PP.newline,
      PP.appending(this.visitAll(ast.clauses), PP.newline),
      '}'];
  },
  
  visitLabel: function (ast) {
    return [ast.name, ': ', this.visit(ast.body)];
  },
  
  visitThrow: function (ast) {
    return ['throw ', this.visit(ast.expression), ';'];
  },
  
  visitTry: function (ast) {
    var c = ast.catch ? [PP.newline, this.visit(ast.catch)] : '';
    var f = ast.finally ? [PP.newline, this.visit(ast.finally)] : '';
    return ['try ', this.visit(ast.block), c, f];
  },
  
  visitDebugger: function (ast) {
    return 'debugger;';
  },
  
  visitCaseClause: function (ast) {
    return [this.visit(ast.subject), ':', PP.newline
      PP.indented(PP.newlineDelimited(this.visitAll(ast.statements)))];
  },
  
  visitDefaultClause: function (ast) {
    return ['default:', PP.newline
      PP.indented(PP.newlineDelimited(this.visitAll(ast.statements)))];
  },
  
  visitCatch: function (ast) {
    return ['catch (', ast.argumentName, ') ', this.visit(ast.block)];
  },
  
  visitFinally: function (ast) {
    return ['finally ', this.visit(ast.block)];
  },
  
  visitFunctionDeclaration: function (ast) {
    return ['function ', ast.name, 
      '(', PP.delimited(this.argumentNames, ', '), ') ', 
      this.processStatements(ast.statements)];
  },
  
  visitProgram: function (ast) {
    return [
      '// Generated code', PP.newline,
      PP.appending(this.visitAll(ast.statements), PP.newline)
    ];
  },
  
  processStatements: function (statements) {
    return ['{', PP.newline,
      PP.indented(PP.appending(this.visitAll(statements), PP.newline)), 
      '}'];
  },
  
  processArguments: function (arguments) {
    if (arguments.length > 1) {
      var s = PP.sharedOptionalNewline();
      return ['(', PP.indented(S(), s.delimited(this.visitAll(arguments), ', ', ','), S()), ')'];
    }
    else {
      return ['(', this.visitAll(arguments), ')'];
    }
  },
  
  indentBody: function (before, elements, delimiter, after) {
    return [before, 
      PP.indented(PP.newlineDelimited(elements, delimitier)), 
      after];
  },
  
  optionalIndentBody: function (before, elements, delimiterWithoutNewline, delimiterWithNewline, after) {
    return [before,
      PP.indented(PP.optionalNewlineDelimited(elements, delimitierWithoutNewline, delimiterWithNewline)),
      after];
  },
  
  subexpr: function (parent, ast) {
    if (parent.precedence > ast.precedence) {
      return ['(', this.visit(ast), ')'];
    }
    else {
      return this.visit(ast);
    }
  },
  
});
