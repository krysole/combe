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

var Ast = require('../Runtime').Ast;


var JSAstToJSSource = module.exports = Class.new(Object, {

  initialize: function () {
    this.$indentationLevel = 0;
    this.$indentationString = '  ';
  },

  translate: function (ast) {
    var translateFunction = this['translate' + ast.type];
    if (translateFunction) {
      return translateFunction.call(this, ast);
    }
    else {
      throw new Error("No translation function for ast type: '" + ast.type + "'");
    }
  },

  translateThis: function (ast) {
    return 'this';
  },

  translateVariableLookup: function (ast) {
    return ast.name;
  },

  translateValueLiteral: function (ast) {
    return Object.toSourceString(ast.value);
  },

  translateArrayLiteral: function (ast) {
    var self = this;
    if (ast.children.length === 0) {
      return '[]';
    }
    var children = this.translateAllIndented(ast.children);
    return ['[\n', children.interpolate(',\n'), '\n', 
      this.indentation(), ']'];
  },

  translateElision: function (ast) {
    return '';
  },

  translateObjectLiteral: function (ast) {
    if (ast.children.length === 0) {
      return '{}';
    }
    var propDefs = this.translateAllIndented(ast.children);
    return ['{\n', propDefs.interpolate(',\n'), '\n',
      this.indentation(), '}'];
  },

  translateNew: function (ast) {
    var ctor = this.translate(ast.children[0]);
    var args = this.translateAll(ast.children.slice(1));
    return ['new (', ctor, ')(', args.interpolate(', '), ')'];
  },

  translatePropertyLookup: function (ast) {
    var children = this.translateAll(ast.children);
    return ['(', children[0], ')[', children[1], ']'];
  },

  translateDotPropertyLookup: function (ast) {
    var children = this.translateAll(ast.children);
    return ['(', children[0], ').', ast.name];
  },

  translateCall: function (ast) {
    var fn = this.translate(ast.children[0]);
    var args = this.translateAll(ast.children.slice(1));
    return ['(', fn, ')(', args.interpolate(', '), ')'];
  },

  translateCallProperty: function (ast) {
    var subject = this.translate(ast.children[0]);
    var args = this.translateAll(ast.children.slice(1));
    return ['(', subject, ').', ast.name, '(', args.interpolate(', '), ')'];
  },

  translatePostfixIncrement: function (ast) {
    return [
      '(', this.translate(ast.children[0]), ')',
      (ast.sign < 0 ? '--' : '++')
    ];
  },

  translateDelete: function (ast) {
    return ['delete (', this.translate(ast.children[0]), ')'];
  },

  translateVoid: function (ast) {
    return ['void (', this.translate(ast.children[0]), ')'];
  },

  translateTypeOf: function (ast) {
    return ['typeof (', this.translate(ast.children[0]), ')'];
  },

  translateUnaryOperator: function (ast) {
    return [ast.name, '(', this.translate(ast.children[0]), ')'];
  },

  translateOperator: function (ast) {
    var children = this.translateAll(ast.children);
    return ['(', children[0], ' ', ast.name, ' ', children[1], ')'];
  },

  translateConditionalExpression: function (ast) {
    var children = this.translateAll(ast.children);
    return ['(', children[0], ' ? ', children[1], ' : ', children[2], ')'];
  },

  translateAssignment: function (ast) {
    var children = this.translateAll(ast.children);
    return ['(', children[0], ' = ', children[1], ')'];
  },

  translateOperatorAssignment: function (ast) {
    var children = this.translateAll(ast.children);
    return ['(', children[0], ' ', ast.operator, '= ', children[1], ')'];
  },

  translateFunctionExpression: function (ast) {
    argnames = ast.argumentNames ? ast.argumentNames : [];
    return ['(function ', ast.name, '(', argnames.interpolate(', '), ') {\n',
      this.translateStatements(ast.children),
      this.indentation(), '})'];
  },

  translateExpressionSequence: function (ast) {
    return ['(', this.translateAll(ast.children).interpolate(', '), ')'];
  },

  translateValuePropertyDeclaration: function (ast) {
    return [ast.name, ': ', this.translate(ast.children[0])];
  },

  translateGetPropertyDeclaration: function (ast) {
    return ['get ', ast.name, '() {\n', 
      this.translateStatements(ast.children),
      this.indentation(), '}'];
  },

  translateSetPropertyDeclaration: function (ast) {
    return ['set ', ast.name, '(', ast.argumentName, ') {\n',
      this.translateStatements(ast.children),
      this.indentation(), '}'];
  },

  translateBlock: function (ast) {
    return ['{\n', 
      this.translateStatements(ast.children), 
      this.indentation(), '}'];
  },

  translateVariableDeclarationList: function (ast) {
    var self = this;
    var children = ast.children.map(function (elem) {
      return self.translateVariableDeclaration(elem, true);
    });
    return ['var ', children.interpolate(', '), ';'];
  },

  translateVariableDeclaration: function (ast, inVarDeclList) {
    var result = [];
    if (!inVarDeclList) {
      result.push('var ');
    }
    result.push(ast.name);
    if (ast.children.length > 0) {
      result.push(' = ');
      result.push(this.translate(ast.children[0]));
    }
    if (!inVarDeclList) {
      result.push(';');
    }
    return result;
  },

  translateIf: function (ast) {
    var children = this.translateAll(ast.children);
    var result = ['if (', children[0], ') ', children[1]];
    if (children.length === 3) {
      result.push(' else ', children[2]);
    }
    return result;
  },

  translateWhile: function (ast) {
    var children = this.translateAll(ast.children);
    return ['while (', children[0], ') ', 
      children[1]];
  },

  translateDoWhile: function (ast) {
    var children = this.translateAll(ast.children);
    return ['do ', children[1],
      ' while (', children[0], ');'
    ];
  },

  translateFor: function (ast) {
    var self = this;
    var initExpr;
    if (ast.children[0].is('VariableDeclarationList')) {
      var decls = ast.children[0].children.map(function (elem) {
        return self.translateVariableDeclaration(elem, true);
      });
      initExpr = ['var ', decls.interpolate(', ')];
    }
    else {
      initExpr = this.translate(ast.children[0]);
    }
    var condExpr = this.translate(ast.children[1]);
    var incExpr = this.translate(ast.children[2]);
    var blk = this.translate(ast.children[3]);
    return ['for (', initExpr, ';', condExpr, ';', incExpr, ') ', blk];
  },

  translateForIn: function (ast) {
    var lvalue;
    if (ast.children[0].is('VariableDeclaration')) {
      var decl = this.translate(ast.children[0]);
      lvalue = ['var ', decl];
    }
    else {
      lvalue = this.translate(ast.children[0]);
    }
    var subject = this.translate(ast.children[1]);
    var blk = this.translate(ast.children[2], true);
    return ['for (', lvalue, ' in ', subject, ') ', blk];
  },

  translateContinue: function (ast) {
    return ['continue', 
      (ast.label ? [' ', ast.label] : null), ';'];
  },

  translateBreak: function (ast) {
    return ['break',
      (ast.label ? [' ', ast.label] : null), ';'];
  },

  translateReturn: function (ast) {
    var what;
    if (ast.children.length > 0 && ast.children[0]) {
      what = this.translate(ast.children[0]);
    }
    return ['return ', what, ';'];
  },

  translateWith: function (ast) {
    var children = this.translateAll(ast.children);
    return ['with (', children[0], ') ', 
     children[1]];
  },

  translateSwitch: function (ast) {
    var children = this.translateAll(ast.children);
    return ['switch (', children[0], ') {\n',
      children.slice(1).interpolate('\n'), '\n}'];
  },

  translateCaseClause: function (ast) {
    return ['case ', this.translate(ast.children[0]), ':\n', 
      this.translateAllIndented(ast.children.slice(1))];
  },

  translateDefaultClause: function (ast) {
    return ['default:\n',
      this.translateAllIndented(ast.children)];
  },

  translateLabel: function (ast) {
    return [ast.name, ':\n',
      this.translate(ast.children[0])];
  },

  translateThrow: function (ast) {
    return ['throw ', this.translate(ast.children[0]), ';'];
  },

  translateTry: function (ast) {
    return ['try ', this.translate(ast.children[0]),
      (ast.children[1] ? this.translate(ast.children[1]) : null),
      (ast.children[2] ? ['finally ', this.translate(ast.children[2])] : null)];
  },

  translateCatch: function (ast) {
    return ['catch (', ast.name, ') ', this.translate(ast.children[0])];
  },

  translateEmptyStatement: function (ast) {
    return [';'];
  },

  translateDebugger: function (ast) {
    return ['debugger;'];
  },

  translateFunctionDeclaration: function (ast) {
    return ['function ', ast.name, '(', ast.argumentNames.interpolate(', '), ') {\n',
      this.translateStatements(ast.children),
      this.indentation(), '}'];
  },

  translateExpressionStatement: function (ast) {
    return [this.translate(ast.children[0]), ';'];
  },

  translateProgram: function (ast) {
    return this.translateAll(ast.children).interpolate('\n');
  },

  translateStatements: function (statements) {
    return this.translateAllIndented(statements).map(function (elem) {
      return [elem, '\n'];
    });
  },

  translateAllIndented: function (nodes) {
    return this.indented(function () {
      return this.mapIndented(this.translateAll(nodes));
    });
  },

  mapIndented: function (iolists) {
    var self = this;
    return iolists.map(function (elem) {
      return [self.indentation(), elem];
    });
  },

  translateAll: function (nodes) {
    var self = this;
    return nodes.map(function (elem) {
      return self.translate(elem);
    });
  },

  indent: function () {
    this.$indentationLevel += 1;
  },

  dedent: function () {
    this.$indentationLevel -= 1;
  },

  indented: function (what) {
    this.indent();
    try {
      return what.call(this);
    }
    finally {
      this.dedent();
    }
  },

  indentation: function () {
    return this.$indentationString.repeat(this.$indentationLevel);
  },

});
