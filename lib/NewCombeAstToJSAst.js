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

var crypto = require('crypto');


var JSAst = require('./JSAst');
var JSAstToJS = require('./JSAstToJS');


var Ast = require('./NewCombeAst');
var NewCombeAst_SimplifyPatterns = require('./NewCombeAst_SimplifyPatterns');
var NewCombeAst_AnalyseLexicalScoping = require('./NewCombeAst_AnalyseLexicalScoping');

var NewCombeAstToJSAst = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    NewCombeAst_SimplifyPatterns.analyse(ast);
    NewCombeAst_AnalyseLexicalScoping.analyse(ast);
    return ast.visit(this.new());
  },
  
}, {
  
  emitFunctionFromExpression: function (ast) {
    return JSAst.Function(null, [], [
      JSAst.Return(ast)
    ]);
  },
  
  emitInvokeRule: function (ast, args) {
    if (args == null) args = [];
    
    if (ast.is('Dot') && ast.receiver.is('This')) {
      return this.emitInvokeRuleNamed(ast.name, args);
    }
    else if (args != null && args.length !== 0) {
      return JSAst.CallMethod(ast, 'call', [JSAst.This()].concat(args));
    }
    else if (ast.is('Function') &&
             ast.argumentNames.length === 0 &&
             ast.statements.length === 1) {
      var statement = ast.statements[0];
      if (statement.is('Return')) {
        return statement.expression;
      }
      else if (statement.is('Empty')) {
        return JSAst.Literal(null);
      }
      else {
        return JSAst.CallMethod(ast, 'call', [JSAst.This()]);
      }
    }
    else {
      return JSAst.CallMethod(ast, 'call', [JSAst.This()]);
    }
  },
  
  emitInvokeRuleNamed: function (rulename, args) {
    if (args == null) args = [];
    
    return JSAst.CallMethod(JSAst.This(), rulename, args);
  },
  
  
  hashCode: function (ruleFunctionAst) {
    var codeString = JSAstToJS.translate(ruleFunctionAst);
    var hash = crypto.createHash('md5');
    hash.update(codeString);
    var hashString = hash.digest('base64');
    return hashString.slice(0, -2); // Remove base64 affix
  },
  
  
  visitUnspecified: function (ast) {
    throw Error.new('Invalid ast node type: ' + ast.type);
  },
  
  
  visitProgram: function (ast) { // [ statements ]
    return JSAst.Program(ast.statements.visitAll(this));
  },
  
  
  visitFunctionDeclaration: function (ast) { // [ name, parameters, statements ]
    return JSAst.FunctionDeclaration(
      ast.name,
      ast.parameters,
      ast.statements.visitAll(this)
    );
  },
  
  visitFunction: function (ast) { // [ name, parameters, statements ]
    return JSAst.Function(
      ast.name, 
      ast.parameters,
      ast.statements.visitAll(this)
    );
  },
  
  visitRule: function (ast) { // [ name, parameters, pattern ]
    var statements = [];
    
    if (ast.parameters == null) ast.parameters = [];
    
    var declareLocals = ast.lexicalScope.variables.difference(ast.parameters);
    if (declareLocals.length !== 0) {
      var decls = declareLocals.map(function (elem) {
        return JSAst.VariableDeclaration(elem, null);
      });
      statements.push(JSAst.Var(decls));
    }
    
    statements.push(JSAst.Return(this.emitInvokeRule(ast.pattern.visit(this))));
    
    var ruleFunction = JSAst.Function(null, ast.parameters, statements);
    
    if (ast.parameters.length === 0) {
      ruleFunction = this.emitFunctionFromExpression(
        this.emitInvokeRuleNamed('memoize', [
          JSAst.Literal(this.hashCode(ruleFunction)),
          ruleFunction
        ])
      );
    }
    
    return ruleFunction;
  },
  
  
  visitBlockStatement: function (ast) { // [ statements ]
    return JSAst.Block(ast.statements.visitAll(this));
  },
  
  visitVariableDeclarationStatement: function (ast) { // [ declarations ]
    return JSAst.Var(ast.declarations.visitAll(this));
  },
  
  visitIfStatement: function (ast) { // [ condition, consiquent, alternative ]
    return JSAst.If(
      ast.condition.visit(this),
      ast.consiquent.visit(this),
      (ast.alternative != null ? ast.alternative.visit(this) : null)
    );
  },
  
  visitWhileStatement: function (ast) { // [ condition, body ]
    return JSAst.While(
      ast.condition.visit(this),
      ast.body.visit(this)
    );
  },
  
  visitDoWhileStatement: function (ast) { // [ body, condition ]
    return JSAst.DoWhile(
      ast.body.visit(this),
      ast.condition.visit(this)
    );
  },
  
  visitForStatement: function (ast) { // [ initializaiton, condition, increment, body ]
    return JSAst.For(
      ast.initialization.visit(this),
      ast.condition.visit(this),
      ast.increment.visit(this),
      ast.body.visit(this)
    );
  },
  
  visitForDeclaringStatement: function (ast) { // [ declarations, condition, increment, body ]
    return JSAst.ForVar(
      ast.declarations.visitAll(this),
      ast.condition.visit(this),
      ast.increment.visit(this),
      ast.body.visit(this)
    );
  },
  
  visitForInStatement: function (ast) { // [ lvalue, subject, body ]
    return JSAst.ForIn(
      lvalue.visit(this),
      subject.visit(this),
      body.visit(this)
    );
  },
  
  visitSwitchStatement: function (ast) { // [ subject, clauses ]
    return JSAst.Switch(
      ast.subject.visit(this),
      ast.clauses.visitAll(this)
    );
  },
  
  visitTryCatchStatement: function (ast) { // [ tryBlock, catchParameter, catchBlock, finallyBlock ]
    return JSAst.Try(
      ast.tryBlock.visit(this),
      (catchBlock != null
        ? JSAst.Catch(catchParameter, catchBlock.visit(this))
        : null),
      (finallyBlock != null
        ? JSAst.Finally(finallyBlock.visit(this))
        : null)
    );
  },
  
  visitThrowStatement: function (ast) { // [ expression ]
    return JSAst.Throw(ast.expression.visit(this));
  },
  
  visitReturnStatement: function (ast) { // [ expression ]
    return JSAst.Return(
      (ast.expression != null ? ast.expression.visit(this) : null)
    );
  },
  
  visitBreakStatement: function (ast) { // [ label ]
    return JSAst.Break(ast.label);
  },
  
  visitContinueStatement: function (ast) { // [ label ]
    return JSAst.Break(ast.label);
  },
  
  visitDebuggerStatement: function (ast) { // [ ]
    return JSAst.Debugger();
  },
  
  visitLabelStatement: function (ast) { // [ label, body ]
    return JSAst.Label(ast.name, ast.body.visit(this));
  },
  
  visitExpressionStatement: function (ast) { // [ expression ]
    return JSAst.ExpressionStatement(ast.expression.visit(this));
  },
  
  visitEmptyStatement: function (ast) { // [ ]
    return JSAst.Empty();
  },
  
  
  visitCaseClause: function (ast) { // [ subject, statments ]
    return JSAst.CaseClause(
      ast.subject.visit(this),
      ast.statements.visitAll(this)
    );
  },
  
  visitDefaultClause: function (ast) { // [ statements ]
    return JSAst.DefaultClause(
      ast.statements.visitAll(this)
    );
  },
  
  
  visitVariableDeclaration: function (ast) { // [ name, expression ]
    return JSAst.VariableDeclaration(
      ast.name,
      (ast.expression != null ? ast.expression.visit(this) : null)
    );
  },
  
  
  visitCommaExpression: function (ast) { // [ expressions ]
    return JSAst.Sequence(
      ast.expressions.visitAll(this)
    );
  },
  
  visitAssignment: function (ast) { // [ lvalue, rvalue ]
    return JSAst.Assignment(
      ast.lvalue.visit(this),
      ast.rvalue.visit(this)
    );
  },
  
  visitOperatorAssignment: function (ast) { // [ operator, lvalue, rvalue ]
    return JSAst.OperatorAssignment(
      ast.operator,
      ast.lvalue.visit(this),
      ast.rvalue.visit(this)
    );
  },
  
  visitConditional: function (ast) { // [ condition, consiquent, alternative ]
    return JSAst.Ternary(
      ast.condition.visit(this),
      ast.consiquent.visit(this),
      ast.alternative.visit(this)
    );
  },
  
  visitDelete: function (ast) { // [ expression ]
    return JSAst.Delete(
      ast.expression.visit(this)
    );
  },
  
  visitVoid: function (ast) { // [ expression ]
    return JSAst.Void(
      ast.expression.visit(this)
    );
  },
  
  visitTypeof: function (ast) { // [ expression ]
    return JSAst.Typeof(
      ast.expression.visit(this)
    );
  },
  
  visitPrefixOperator: function (ast) { // [ name, expression ]
    return JSAst.Prefix(
      ast.name,
      ast.expression.visit(this)
    );
  },
  
  visitPostfixOperator: function (ast) { // [ name, expression ]
    return JSAst.Postfix(
      ast.name,
      ast.expression.visit(this)
    );
  },
  
  visitInfixOperator: function (ast) { // [ name, lhs, rhs ]
    return JSAst.Operator(
      ast.name,
      ast.lhs.visit(this),
      ast.rhs.visit(this)
    );
  },
  
  
  visitNew: function (ast) { // [ constructor, arguments ]
    var ctor = ast.constructor.visit(this);
    var args = (ast.arguments != null ? ast.arguments.visitAll(this) : []);
    return JSAst.New(ctor, args);
  },
  
  visitCall: function (ast) { // [ function, arguments ]
    return JSAst.Call(
      ast.function.visit(this),
      ast.arguments.visitAll(this)
    );
  },
  
  visitMethodCall: function (ast) { // [ subject, name, arguments ]
    return JSAst.CallMethod(
      ast.subject.visit(this),
      ast.name,
      ast.arguments.visitAll(this)
    );
  },
  
  visitDot: function (ast) { // [ subject, name ]
    return JSAst.Dot(
      ast.subject.visit(this),
      ast.name
    );
  },
  
  visitSubscript: function (ast) { // [ subject, expression ]
    return JSAst.At(
      ast.subject.visit(this),
      ast.expression.visit(this)
    );
  },
  
  visitVariable: function (ast) { // [ name ]
    return JSAst.Variable(ast.name);
  },
  
  
  visitInclusiveRange: function (ast) { // [ lhs, rhs ]
    return JSAst.CallMethod(JSAst.Variable('Range'), 'inclusive', [
      ast.lhs.visit(this),
      ast.rhs.visit(this)
    ]);
  },
  
  visitExclusiveRange: function (ast) { // [ lhs, rhs ]
    return JSAst.CallMethod(JSAst.Variable('Range'), 'exclusive', [
      ast.lhs.visit(this),
      ast.rhs.visit(this)
    ]);
  },
  
  visitArray: function (ast) { // [ elements ]
    return JSAst.Array(
      ast.elements.visitAll(this)
    );
  },
  
  visitObject: function (ast) { // [ propertyDeclarations ]
    return JSAst.Object(
      ast.propertyDeclarations.visitAll(this)
    );
  },
  
  visitLiteral: function (ast) { // [ value ]
    return JSAst.Literal(ast.value);
  },
  
  visitThis: function (ast) { // [ ]
    return JSAst.This();
  },
  
  
  visitRangeInfinity: function (ast) { // [ ]
    return null;
  },
  
  visitElision: function (ast) { // [ ]
    return JSAst.Elision();
  },
  
  
  visitValuePropertyDeclaration: function (ast) { // [ name, expression ]
    return JSAst.ValueProperty(
      ast.name,
      ast.expression.visit(this)
    );
  },
  
  visitGetPropertyDeclaration: function (ast) { // [ name, statements ]
    return JSAst.GetProperty(
      ast.name,
      ast.statements.visitAll(this)
    );
  },
  
  visitSetPropertyDeclaration: function (ast) { // [ name, parameter, statements ]
    return JSAst.SetProperty(
      ast.name,
      ast.parameter,
      ast.statements.visitAll(this)
    );
  },
  
  
  visitChoicePattern: function (ast) { // [ patterns ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('_choice', ast.patterns.visitAll(this))
    );
  },
  
  visitConcatPattern: function (ast) { // [ patterns ]
    assert(ast.patterns.length > 0);
    if (ast.patterns.length === 1) {
      return patterns[0].visit(this);
    }
    else {
      var statements = [];
      for (var i = 0; i < ast.patterns.length - 1; i++) {
        statements.push(
          JSAst.ExpressionStatement(
            this.emitInvokeRule(ast.patterns[i].visit(this))
          )
        );
      }
      statements.push(
        JSAst.Return(
          this.emitInvokeRule(ast.patterns.last.visit(this))
        )
      );
      return JSAst.Function(null, [], statements);
    }
  },
  
  visitNotPattern: function (ast) { // [ pattern ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('_not', [
        ast.pattern.visit(this)
      ])
    );
  },
  
  visitLookaheadPattern: function (ast) { // [ pattern ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('_lookahead', [
        ast.pattern.visit(this)
      ])
    );
  },
  
  visitTokenOperatorPattern: function (ast) { // [ pattern ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('tokenOperatorHandler', [
        ast.pattern.visit(this)
      ])
    );
  },
  
  
  visitAnythingPattern: function (ast) { // [ ]
    return JSAst.Dot(JSAst.This(), 'next');
  },
  
  visitEmptyPattern: function (ast) { // [ ]
    return JSAst.Dot(JSAst.This(), 'nothing');
  },
  
  
  visitBindPattern: function (ast) { // [ name, pattern ]
    return this.emitFunctionFromExpression(
      JSAst.Assignment(
        JSAst.Variable(ast.name),
        this.emitInvokeRule(ast.pattern.visit(this))
      )
    );
  },
  
  
  visitStarPattern: function (ast) { // [ pattern ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('_repeat', [
        ast.pattern.visit(this)
      ])
    );
  },
  
  visitPlusPattern: function (ast) { // [ pattern ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('_repeat1', [
        ast.pattern.visit(this)
      ])
    );
  },
  
  visitOptionalPattern: function (ast) { // [ pattern ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('_optional', [
        ast.pattern.visit(this)
      ])
    );
  },
  
  
  visitApplyPattern: function (ast) { // [ pattern, arguments ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRule(
        ast.pattern.visit(this),
        ast.arguments.visitAll(this)
      )
    );
  },
  
  visitApplyPatternArgumentsPattern: function (ast) { // [ pattern, arguments ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRule(
        ast.pattern.visit(this),
        ast.arguments.visitAll(this)
      )
    );
  },
  
  
  visitPredicatePattern: function (ast) { // [ body ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('_predicate', [
        ast.pattern.visit(this)
      ])
    );
  },
  
  visitActionPattern: function (ast) { // [ body ]
    return ast.body.visit(this);
  },
  
  visitImmediatePattern: function (ast) { // [ body ]
    return this.emitInvokeRule(ast.body.visit(this));
  },
  
  
  
  visitNumberPattern: function (ast) { // [ value ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('numberPatternHandler', [
        JSAst.Literal(ast.value)
      ])
    );
  },
  
  visitStringPattern: function (ast) { // [ value ]
    return this.emitFunctionFromExpression(
      this.emitInvokeRuleNamed('stringPatternHandler', [
        JSAst.Literal(ast.value)
      ])
    );
  },
  
  visitVariablePattern: function (ast) { // [ name ]
    if (ast.containingScope.variables.include(ast.name)) {
      return JSAst.Variable(ast.name);
    }
    else {
      return JSAst.Dot(JSAst.This(), ast.name);
    }
  },
  
  
  visitExpressionBody: function (ast) { // [ expression ]
    return this.emitFunctionFromExpression(ast.expression.visit(this));
  },
  
  visitStatementsBody: function (ast) { // [ statements ]
    return JSAst.Function(null, [], ast.statements.visitAll(this));
  },
  
});
