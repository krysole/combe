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
var JSAst = require('./JSAst');

var CombeAstRemoveUnecessaryNodes = require('./CombeAstRemoveUnecessaryNodes');
var CombeAstAnalyseLexicalScope = require('./CombeAstAnalyseLexicalScope');

var CombeAstToJSAst = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    // CombeAstRemoveUnecessaryNodes.analyse(ast);
    CombeAstAnalyseLexicalScope.analyse(ast);
    return this.new().visit(ast);
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
    return array.map(function (elem) {
      return self.visit(elem);
    });
  },
  
  visitThis: function (ast) {
    return JSAst.This();
  },
  
  visitVariable: function (ast) {
    return JSAst.Variable(ast.name);
  },
  
  visitLiteral: function (ast) {
    return JSAst.Variable(ast.value);
  },
  
  visitArray: function (ast) {
    return JSAst.Array(this.visitAll(ast.elements));
  },
  
  visitElision: function (ast) {
    return JSAst.Elision();
  },
  
  visitObject: function (ast) {
    return JSAst.Object(this.visitAll(ast.properties));
  },
  
  visitValueProperty: function (ast) {
    return JSAst.ValueProperty(ast.name, this.visit(ast.expression));
  },
  
  visitGetProperty: function (ast) {
    return JSAst.GetProperty(ast.name, this.visitAll(ast.statements));
  },
  
  visitSetProperty: function (ast) {
    return JSAst.SetProperty(ast.name, this.visitAll(ast.statements));
  },
  
  visitDot: function (ast) {
    return JSAst.Dot(this.visit(ast.receiver), ast.name);
  },
  
  visitAt: function (ast) {
    return JSAst.At(this.visit(ast.receiver), this.visit(ast.expression));
  },
  
  visitNew: function (ast) {
    return JSAst.New(this.visit(ast.constructor), this.visitAll(ast.arguments));
  },
  
  visitCall: function (ast) {
    return JSAst.Call(this.visit(ast.function), this.visitAll(ast.arguments));
  },
  
  visitCallMethod: function (ast) {
    return JSAst.CallMethod(
      this.visit(ast.receiver), 
      ast.name, 
      this.visitAll(ast.arguments)
    );
  },
  
  visitPostfix: function (ast) {
    return JSAst.Postfix(ast.operator, this.visit(ast.expression));
  },
  
  visitPrefix: function (ast) {
    return JSAst.Prefix(ast.operator, this.visit(ast.expression));
  },
  
  visitOperator: function (ast) {
    return JSAst.Operator(ast.operator, this.visit(ast.left), this.visit(ast.right));
  },
  
  visitDelete: function (ast) {
    return JSAst.Delete(this.visit(ast.expression));
  },
  
  visitVoid: function (ast) {
    return JSAst.Void(this.visit(ast.expression));
  },
  
  visitTypeof: function (ast) {
    return JSAst.Typeof(this.visit(ast.expression));
  },
  
  visitTernary: function (ast) {
    return JSAst.Ternary(
      this.visit(ast.condition),
      this.visit(ast.true),
      this.visit(ast.false)
    );
  },
  
  visitAssignment: function (ast) {
    return JSAst.Assignment(this.visit(ast.lvalue), this.visit(ast.rvalue));
  },
  
  visitOperatorAssignment: function (ast) {
    return JSAst.OperatorAssignment(ast.operator, 
      this.visit(ast.lvalue), this.visit(ast.rvalue)
    );
  },
  
  visitSequence: function (ast) {
    return JSAst.Sequence(this.visitAll(ast.expressions));
  },
  
  visitFunction: function (ast) {
    return JSAst.Function(ast.name, ast.argumentNames, this.visitAll(ast.statements));
  },
  
  visitExpressionStatement: function (ast) {
    return JSAst.ExpressionStatement(this.visit(ast.expression));
  },
  
  visitBlock: function (ast) {
    return JSAst.Block(this.visitAll(ast.statements));
  },
  
  visitVar: function (ast) {
    return JSAst.Var(this.visitAll(ast.variables));
  },
  
  visitVariableDeclaration: function (ast) {
    return JSAst.VariableDeclaration(
      ast.name,
      ast.expression ? this.visit(ast.expression) : null
    );
  },
  
  visitEmpty: function (ast) {
    return JSAst.Empty();
  },
  
  visitIf: function (ast) {
    return JSAst.If(
      this.visit(ast.condition),
      this.visit(ast.true),
      ast.false ? this.visit(ast.false) : null
    );
  },
  
  visitDoWhile: function (ast) {
    return JSAst.DoWhile(this.visit(ast.body), this.visit(ast.condition));
  },
  
  visitWhile: function (ast) {
    return JSAst.While(this.visit(ast.condition), this.visit(ast.body));
  },
  
  visitFor: function (ast) {
    return JSAst.For(
      this.visit(ast.initialize),
      this.visit(ast.condition),
      this.visit(ast.increment),
      this.visit(ast.body)
    );
  },
  
  visitForVar: function (ast) {
    return JSAst.ForVar(this.visitAll(ast.variables));
  },
  
  visitForIn: function (ast) {
    return JSAst.ForIn(
      this.visit(lvalue),
      this.visit(rvalue),
      this.visit(body)
    );
  },
  
  visitContinue: function (ast) {
    return JSAst.Continue(ast.label);
  },
  
  visitBreak: function (ast) {
    return JSAst.Break(ast.label);
  },
  
  visitReturn: function (ast) {
    return JSAst.Return(ast.expression ? this.visit(ast.expression) : null);
  },
  
  visitWith: function (ast) {
    return JSAst.With(this.visit(ast.subject), this.visit(ast.body));
  },
  
  visitSwitch: function (ast) {
    return JSAst.Switch(this.visit(ast.subject), this.visitAll(ast.clauses));
  },
  
  visitLabel: function (ast) {
    return JSAst.Label(ast.name, this.visit(ast.body));
  },
  
  visitThrow: function (ast) {
    return JSAst.Throw(this.visit(ast.expression));
  },
  
  visitTry: function (ast) {
    return JSAst.Try(
      this.visit(ast.block), 
      ast.catch ? this.visit(ast.catch) : null,
      ast.finally ? this.visit(ast.finally) : null
    );
  },
  
  visitDebugger: function (ast) {
    return JSAst.Debugger();
  },
  
  visitCaseClause: function (ast) {
    return JSAst.CaseClause(this.visit(ast.subject), this.visitAll(ast.statements));
  },
  
  visitDefaultClause: function (ast) {
    return JSAst.DefaultClause(this.visitAll(ast.statements));
  },
  
  visitCatch: function (ast) {
    return JSAst.Catch(ast.argumentName, this.visit(ast.block));
  },
  
  visitFinally: function (ast) {
    return JSAst.Finally(this.visit(ast.block));
  },
  
  visitFunctionDeclaration: function (ast) {
    return JSAst.FunctionDeclaration(
      ast.name, 
      ast.argumentNames,
      this.visitAll(ast.statements)
    );
  },
  
  visitProgram: function (ast) {
    return JSAst.Program(this.visitAll(ast.statements));
  },
  
  /// Combe Extensions
  
  visitExpressionBody: function (ast) {
    return this.generateRuleFromExpression(this.visit(ast.expression));
  },
  
  visitStatementsBody: function (ast) {
    return JSAst.Function(null, [], this.visitAll(ast.statements));
  },
  
  visitAstTemplate: function (ast) {
    throw new Error('Not Implemented Yet');
    this.visit(ast.body);
  },
  
  visitInterpolateExpression: function (ast) {
    throw new Error('Not Implemented Yet');
    this.visit(ast.body);
  },
  
  visitExpandInterpolate: function (ast) {
    throw new Error('Not Implemented Yet');
    this.visit(ast.body);
  },
  
  visitInterpolateStatements: function (ast) {
    throw new Error('Not Implemented Yet');
    this.visit(ast.body);
  },
  
  visitInterpolateIdentifier: function (ast) {
    throw new Error('Not Implemented Yet');
    this.visit(ast.body);
  },
  
  visitDescribeProperty: function (ast) {
    throw new Error('Not Implemented Yet');
    this.visit(ast.expression);
  },
  
  visitRangeInfinity: function (ast) {
    return null;
  },
  
  visitInclusiveRange: function (ast) {
    return JSAst.CallMethod(JSAst.Variable('Range'), 'inclusive', 
      [this.visit(ast.start), this.visit(ast.end)]);
  },
  
  visitExclusiveRange: function (ast) {
    return JSAst.CallMethod(JSAst.Variable('Range'), 'exclusive', 
      [this.visit(ast.start), this.visit(ast.end)]);
  },
  
  visitRule: function (ast) {
    var declareLocals = ast.lexicalScope.variables.difference(ast.argumentNames);
    
    return JSAst.Function(null, ast.argumentNames, [
      JSAst.Var(declareLocals.map(function (elem) {
        return JSAst.VariableDeclaration(elem, null);
      })),
      JSAst.Return(this.generateCallRule(this.visit(ast.pattern)))
    ]);
  },
  
  visitEmptyPattern: function (ast) {
    return JSAst.Function(null, [], []);
  },
  
  visitChoicePattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('_choice', this.visitAll(ast.patterns))
    );
  },
  
  visitConcatPattern: function (ast) {
    var patterns = this.visitAll(ast.patterns);
    var stmts = patterns.slice(0, patterns.length - 1).map(function (elem) {
      return JSAst.ExpressionStatement(elem);
    });
    stmts.push(JSAst.Return(patterns.last));
    return JSAst.Function(null, [], stmts);
  },
  
  visitActionPattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRule(this.visit(ast.body))
    );
  },
  
  visitPredicatePattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('_predicate', [
        this.generateCallRule(this.visit(ast.body))
      ])
    );
  },
  
  visitImmediatePattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRule(
        this.generateCallRule(this.visit(ast.body))
      )
    );
  },
  
  visitNotPattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('_not', [this.visit(ast.pattern)])
    );
  },
  
  visitLookaheadPattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('_lookahead', [this.visit(ast.pattern)])
    );
  },
  
  visitTokenOperatorPattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('tokenOperatorHandler', [this.visit(ast.pattern)])
    );
  },
  
  visitAnythingPattern: function (ast) {
    return JSAst.Dot(JSAst.This(), 'next');
  },
  
  visitBindPattern: function (ast) {
    return this.generateRuleFromExpression(
      JSAst.Assignment(
        JSAst.Variable(ast.name),
        this.generateCallRule(this.visit(ast.pattern), [])
      )
    );
  },
  
  visitRepeatPattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('_repeat', [this.visit(ast.pattern)])
    );
  },
  
  visitRepeat1Pattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('_repeat1', [this.visit(ast.pattern)])
    );
  },
  
  visitOptionalPattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('_optional', [this.visit(ast.pattern)])
    );
  },
  
  visitJSApplyPattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRule(
        this.visit(ast.pattern),
        this.visitAll(ast.arguments)
      )
    );
  },
  
  visitApplyPattern: function (ast) {
    return this.generateRuleFromExpression(
      this.generateCallRule(
        this.visit(ast.pattern),
        this.visitAll(ast.arguments)
      )
    );
  },
  
  visitNumberPattern: function (ast) {
    // Number pattern is not a number but a pattern function
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('numberPatternHandler', [JSAst.Literal(ast.value)])
    );
  },
  
  visitStringPattern: function (ast) {
    // String pattern is not a string but a pattern function
    return this.generateRuleFromExpression(
      this.generateCallRuleNamed('stringPatternHandler', [JSAst.Literal(ast.value)])
    );
  },
  
  visitVariablePattern: function (ast) {
    // Either a rule-local variable or a property of 'this'
    // Current lexical scope is the rule we're in, variables the rule specific locals
    if (ast.lexicalScope.variables.include(ast.name)) {
      return JSAst.Variable(ast.name);
    }
    else {
      return JSAst.Dot(JSAst.This(), ast.name);
    }
  },
  
  generateRuleFromExpression: function (expression) {
    return JSAst.Function(null, [], [
      JSAst.Return(expression)
    ]);
  },
  
  generateCallRuleNamed: function (ruleName, args) {
    return JSAst.CallMethod(JSAst.This(), ruleName, args);
  },
  
  generateCallRule: function (ruleAst, args) {
    if (ruleAst.is('Dot') && ruleAst.receiver.is('This')) {
      return this.generateCallRuleNamed(ruleAst.name, args);
    }
    else if (args && args.length !== 0) {
      return JSAst.CallMethod(ruleAst, 'call', [JSAst.This()].concat(args));
    }
    else if (ruleAst.is('Function') &&
             ruleAst.argumentNames.length === 0 &&
             ruleAst.statements.length === 1) {
      var stmt = ruleAst.statements[0];
      if (stmt.is('Return')) {
        return stmt.expression;
      }
      else if (stmt.is('Empty')) {
        return JSAst.Literal(undefined);
      }
      else {
        return JSAst.CallMethod(ruleAst, 'call', [JSAst.This()]);
      }
    }
    else {
      return JSAst.CallMethod(ruleAst, 'call', [JSAst.This()]);
    }
  },
  
});
