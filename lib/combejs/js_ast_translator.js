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

var util = require('./util');
var Ast = require('./ast');

var JSAstTranslator = module.exports = function JSAstTranslator() {
  var self = Object.create(JSAstTranslator.prototype);
  self.$indentationLevel = 0;
  self.$indentationString = '  ';
  return self;
};

util.extend(JSAstTranslator.prototype, {
  
  translate: function (ast) {
    var translateFunction = this['translate' + ast.type];
    if (translateFunction) {
      return translateFunction.call(this, ast);
    } else {
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
    return util.toSourceString(ast.value);
  },
  
  translateArrayLiteral: function (ast) {
    if (ast.elements.length === 0) {
      return '[]';
    }
    var elements = this.translateAllIndented(ast.children);
    return ['[\n', elements.interpolate('\n'), '\n', 
      this.indentation(), ']'];
  },
  
  translateObjectLiteral: function (ast) {
    if (ast.elements.length === 0) {
      return '{}';
    }
    var propDefs = this.translateAllIndented(ast.children);
    return ['{\n', propDefs.interpolate('\n'), '\n',
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
  
  translateCall: function (ast) {
    var fn = this.translate(ast.children[0]);
    var args = this.translateAll(ast.children.slice(1));
    return ['(', fn, ')(', args.interpolate(', '), ')'];
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
    return ['(function ', ast.name, '(', ast.argumentNames.interpolate(', '), ') {\n',
      this.translateStatements(ast.children),
      this.indentation(), '})'];
  },
  
  translateExpressionSequence: function (ast) {
    return ['(', this.translateAll(ast.children).interpolate(', '), ')'];
  },
  
  translateValuePropertyDeclaration: function (ast) {
    return [this.indentation(), ast.name, ': ', this.translate(ast.children[0])];
  },
  
  translateGetPropertyDeclaration: function (ast) {
    return [this.indentation(), 'get ', ast.name, '() {\n', 
      this.translateStatements(ast.children),
      this.indentation(), '}'];
  },
  
  translateSetPropertyDeclaration: function (ast) {
    return [this.indentation(), 'set ', ast.name, '(', ast.argumentName, ') {\n',
      this.translateStatements(ast.children),
      this.indentation(), '}'];
  },
  
  translateBlock: function (ast, noInitialIndentation) {
    var initialIndentation = (noInitialIndentation ? null : this.indentation());
    return [initialIndentation, '{\n', 
      this.translateStatements(ast.children), 
      this.indentation(), '}'];
  },
  
  translateVariableDeclarationList: function (ast) {
    var self = this;
    var children = ast.children.map(function (elem) {
      return self.translateVariableDeclaration(elem, true);
    });
    return [this.indentation(), 'var ', children.interpolate(', '), ';'];
  },
  
  translateVariableDeclaration: function (ast, inVarDeclList) {
    var prefix = (inVarDeclList ? null : [this.indentation(), 'var ']);
    var affix = (inVarDeclList ? null : ';');
    return [prefix, ast.name, ' = ', this.translate(ast.children[0])];
  },
  
  translateIf: function (ast) {
    var result = [this.indentation(), 'if (', this.translate(ast.children[0]), ') ', 
      this.translateBlock(ast.children[1], true)];
    if (ast.children.length === 3) {
      result.push(' else ', this.translateBlock(ast.children[2], true));
    }
    return result;
  },
  
  translateWhile: function (ast) {
    return [this.indentation(), 'while (', this.translate(ast.children[0]), ') ', 
      this.translateBlock(ast.children[1], true)];
  },
  
  translateDoWhile: function (ast) {
    return [this.indentation(), 'do ', 
      this.translateBlock(ast.children[1], true),
      ' while (', this.translate(ast.children[0]), ');'
    ];
  },
  
  translateFor: function (ast) {
    var exprs = this.translateAll(ast.children.slice(0, 3));
    var blk = this.translateBlock(ast.children[3], true);
    return [this.indentation(), 'for (', exprs.interpolate('; '), ') ', blk];
  },
  
  translateForIn: function (ast) {
    // Todo: This needs to match the declare variable to the lvalue
  },
  
  translateContinue: function (ast) {
    return [this.indentation(), 'continue', 
      (ast.label ? [' ', ast.label] : null), ';'];
  },
  
  translateBreak: function (ast) {
    return [this.indentation(), 'break',
      (ast.label ? [' ', ast.label] : null), ';'];
  },
  
  translateReturn: function (ast) {
    var what;
    if (ast.children.length > 0 && ast.children[0]) {
      what = this.translate(ast.children[0]);
    }
    return [this.indentation(), 'return ', what, ';'];
  },
  
  translateWith: function (ast) {
    return [this.indentation(), 'with (', this.translate(ast.children[0]), ') ', 
      this.translateBlock(ast.children[1], true)];
  },
  
  translateSwitch: function (ast) {
    return [this.indentation(), 'switch (', this.translate(ast.children[0]), ') {\n',
      this.translateAll(ast.children.slice(1)).interpolate('\n'), '\n}'];
  },
  
  translateCaseClause: function (ast) {
    return [this.indentation(), 'case ', this.translate(ast.children[0]), ':\n', 
      this.translateAllIndented(ast.children.slice(1))];
  },
  
  translateDefaultClause: function (ast) {
    return [this.indentation(), 'default:\n',
      this.translateAllIndented(ast.children)];
  },
  
  translateLabel: function (ast) {
    return [this.indentation(), ast.name, ':\n',
      this.translate(ast.children[0])];
  },
  
  translateThrow: function (ast) {
    return [this.indentation(), 'throw ', this.translate(ast.children[0]), ';'];
  },
  
  translateTry: function (ast) {
    return [this.indentation(), 'try ', this.translateBlock(ast.children[0], true),
      (ast.children[1] ? this.translate(ast.children[1]) : null),
      (ast.children[2] ? ['finally ', this.translateBlock(ast.children[2], true)] : null)];
  },
  
  translateCatch: function (ast) {
    return ['catch (', ast.name, ') ', this.translateBlock(ast.children[0], true)];
  },
  
  translateEmptyStatement: function (ast) {
    return [this.indentation(), ';'];
  },
  
  translateDebugger: function (ast) {
    return [this.indentation(), 'debugger;'];
  },
  
  translateFunctionDeclaration: function (ast) {
    return [this.indentation(), 'function ', ast.name, '(', ast.argumentNames.interpolate(', '), ') {\n',
      this.translateStatements(ast.children),
      this.indentation(), '}'];
  },
  
  translateExpressionStatement: function (ast) {
    console.log(this.indentation().toSourceString());
    console.log(this.$indentationString.toSourceString());
    console.log(this.$indentationLevel);
    return [this.indentation(), this.translate(ast.children[0]), ';'];
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
      return this.translateAll(nodes);
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
    } finally {
      this.dedent();
    }
  },
  
  indentation: function () {
    return this.$indentationString.repeat(this.$indentationLevel);
  },
  
  newlineIndent: function () {
    return '\n' + this.indentation();
  },
  
  doubleNewlineIndent: function () {
    return '\n\n' + this.indentation();
  },
  
});
