//
// Combe - Improved JavaScript with Pattern Matching
//
// Copyright 2012 Lorenz Pretterhofer <krysole@alexicalmistake.com>
//
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
'use strict';
var combe = require('combe');

var crypto = require('crypto');

var Ast = require('./CombeAst');
var AnalyseScoping = require('./AnalyseScoping');

var CombeAstToJS = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    return Array.deepJoinIOList(this.translateToIOList(ast));
  },
  
  translateToIOList: function (ast) {
    AnalyseScoping.analyse(ast);
    
    ast.visit(this.new());
    
    return ast.code;
  },
  
}, {
  
  visitUnspecified: function (ast) {
    throw Error.new('Unrecognized Ast Node');
  },
  
  
  visitScript: function (ast) { // [ statements ]
    ast.visitChildren(this);
    
    var stmts = ast.statements.map(function (stmt) {
      return stmt.code;
    });
    
    ast.code = [
      '// Generated by Combe compiler\n',
      '"use strict";\n',
      'if (!__combe_runtimeLoaded) throw new Error("Combe runtime not loaded");\n',
      '(function () {\n',
        'var __combe_this = null;\n',
        'var __combe_return = null;\n',
        'try {\n',
          stmts,
        '}\n',
        'catch (__combe_e) {\n',
          'if (__combe_e === __combe_return) return __combe_return.value;\n',
          'throw __combe_e;\n',
        '}\n',
      '})();'
    ];
  },
  
  visitVarStatement: function (ast) { // [ declarations ]
    ast.visitChildren(this);
    
    var decls = ast.declarations.map(function (decl) {
      return decl.code;
    }).interpolate(', ');
    
    ast.code = [
      'var ', decls, ';\n'
    ];
  },
  
  visitExpressionStatement: function (ast) { // [ expression ]
    ast.visitChildren(this);
    
    ast.code = [ast.expression.code, ';\n'];
  },
  
  visitEmptyStatement: function (ast) { // [ ]
    ast.code = 'null;\n';
  },
  
  
  visitIfExpression: function (ast) { // [ condition, consiquent, alternative ]
    ast.visitChildren(this);
    
    var alt = ast.alternative != null ? ast.alternative.code : 'null';
    
    ast.code = [
      '(/* if */ ', ast.condition.code, '\n',
      '? /* then */ ', ast.consiquent.code, '\n',
      ': /* else */ ', alt, ')'
    ];
  },
  
  visitWhileExpression: function (ast) { // [ condition, body ]
    ast.visitChildren(this);
    
    var body = this.unwrapBlockAsStatements(ast.body);
    
    ast.code = [
      '(function () {\n',
        'while (', ast.condition.code, ') {\n',
          'try {\n',
            body,
          '}\n',
          'catch (__combe_e) {\n',
            'if (__combe_e === __combe_break) break;\n',
            'if (__combe_e === __combe_continue) continue;\n',
            'throw __combe_e;\n',
          '}\n',
        '}\n',
      '})()'
    ];
  },
  
  visitDoWhile: function (ast) { // [ body, condition ]
    ast.visitChildren(this);
    
    var body = this.unwrapBlockAsStatements(ast.body);
    
    ast.code = [
      '(function () {\n',
        'do {\n',
          'try {\n',
            body,
          '}\n',
          'catch (__combe_e) {\n',
            'if (__combe_e === __combe_break) break;\n',
            'if (__combe_e === __combe_continue) continue;\n',
            'throw __combe_e;\n',
          '}\n',
        '} while (', ast.condition.code, ');\n',
      '})()'
    ];
  },
  
  visitForExpression: function (ast) { // [ initialize, condition, increment, body ]
    ast.visitChildren(this);
    
    var init = ast.initialize != null ? ast.initialize.code : null;
    
    var cond = ast.condition != null ? ast.condition.code : null;
    
    var inc = ast.increment != null ? ast.increment.code : null;
    
    var body = this.unwrapBlockAsStatements(ast.body);
    
    ast.code = [
      '(function () {\n',
        'for (', init, '; ', cond, '; ', inc, ') {\n',
          'try {\n',
            body,
          '}\n',
          'catch (__combe_e) {\n',
            'if (__combe_e === __combe_break) break;\n',
            'if (__combe_e === __combe_continue) continue;\n',
            'throw __combe_e;\n',
          '}\n',
        '}\n',
      '})()'
    ];
  },
  
  visitForDeclaringExpression: function (ast) { // [ declarations, condition, increment, body ]
    ast.visitChildren(this);
    
    var decls = ['var ', ast.declarations.map(function (decl) {
      return decl.code;
    }).interpolate(', ')];
    
    var names = [];
    var inits = [];
    for (var i = 0; i < ast.declarations.length; i++) {
      var decl = ast.declarations[i];
      names.push(decl.name);
      inits.push(decl.expression.code);
    }
    names.interpolate(', ');
    inits.interpolate(', ');
    
    var cond = ast.condition != null ? ast.condition.code : null;
    
    var inc = ast.increment != null ? ast.increment.code : null;
    
    var body = this.unwrapBlockAsStatements(ast.body, true);
    
    ast.code = [
      '(function (', names, ') {\n',
        'while (', cond, ') {\n',
          body,
          inc, ';\n',
        '}\n',
      '})(', inits, ')'
    ];
    
    ast.code = [
      '(function (', names, ') {\n',
        'while (', cond, ') {\n',
          'try {\n',
            body,
          '}\n',
          'catch (__combe_e) {\n',
            'if (__combe_e === __combe_break) break;\n',
            'if (__combe_e !== __combe_continue) throw e;\n',
          '}\n',
          inc, ';\n',
        '}\n',
      '})(', inits, ')'
    ];
  },
  
  visitTryCatchExpression: function (ast) { // [ tryBody, catchVariable, catchBody, finallyBody ]
    ast.visitChildren(this);
    
    var tryFragment = [
      'try {\n',
        ast.tryBody.code, ';\n',
      '}\n'
    ];
    
    if (ast.catchBody != null) {
      var catchFragment = [
        'catch (', ast.catchVariable, ') {\n',
          ast.catchBody.code, ';\n',
        '}\n'
      ];
    }
    
    if (ast.finallyBody != null) {
      var finallyBody = [
        'finally {\n',
          ast.finallyBody.code, ';\n',
        '}\n'
      ];
    }
    
    ast.code = [
      '(function () {\n', 
        tryFragment,
        catchFragment,
        finallyBody,
      '})()'
    ];
  },
  
  visitThrowExpression: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.code = [
      '(function () { throw ', ast.argument.code, '; })()'
    ];
  },
  
  visitReturnExpression: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    var valueCode = ast.argument != null ? ast.argument.code : 'undefined';
    
    ast.code = [
      '(function () { throw (__combe_return = { value: ', valueCode, ' }); })()'
    ];
  },
  
  visitBreakExpression: function (ast) { // [ ]
    ast.code = [
      '(function () { throw __combe_break; })()'
    ];
  },
  
  visitContinueExpression: function (ast) { // [ ]
    ast.code = [
      '(function () { throw __combe_continue; })()'
    ];
  },
  
  visitSequenceExpression: function (ast) { // [ expressions ]
    ast.visitChildren(this);
    
    var exprs = ast.expressions.map(function (expr) {
      return expr.code;
    }).interpolate(', ');
    
    if (exprs.length === 0) {
      exprs = 'null';
    }
    
    ast.code = [
      '(', exprs, ')'
    ];
  },
  
  
  visitAssignment: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.code = [
      '(', ast.lhs.code, ' = ', ast.rhs.code, ')'
    ];
  },
  
  visitOperatorAssignment: function (ast) { // [ name, lhs, rhs ]
    ast.visitChildren(this);
    
    ast.code = [
      '(', ast.lhs.code, ' ', ast.name, ' ', ast.rhs.code, ')'
    ];
  },
  
  visitPrefixOperator: function (ast) { // [ name, argument ]
    ast.visitChildren(this);
    
    ast.code = [
      '(', ast.name, ast.argument.code, ')'
    ];
  },
  
  visitPostfixOperator: function (ast) { // [ name, argument ]
    ast.visitChildren(this);
    
    ast.code = [
      '(', ast.argument.code, ast.name, ')'
    ];
  },
  
  visitInfixOperator: function (ast) { // [ name, lhs, rhs ]
    ast.visitChildren(this);
    
    if (['==', '!='].include(ast.name)) {
      ast.code = [
        '__combe_infixOperators[', ast.name.quote(), '](',
          ast.lhs.code, ', ',
          ast.rhs.code,
        ')'
      ];
    }
    else {
      ast.code = [
        '(', ast.lhs.code, ' ', ast.name, ' ', ast.rhs.code, ')'
      ];
    }
  },
  
  
  visitCall: function (ast) { // [ function, arguments ]
    ast.visitChildren(this);
    
    var args = ast.arguments.map(function (arg) {
      return arg.code;
    }).interpolate(', ');
    
    ast.code = [
      ast.function.code, '(', args, ')'
    ];
  },
  
  visitSubscript: function (ast) { // [ subject, arguments ]
    ast.visitChildren(this);
    
    var args = ast.arguments.map(function (arg) {
      return arg.code;
    }).interpolate(', ');
    
    ast.code = [
      ast.subject.code, '.subscript(', args, ')'
    ];
  },
  
  visitMethodCall: function (ast) { // [ subject, name, arguments ]
    ast.visitChildren(this);
    
    // Todo: Change this to use a gensym'd variable as the subject and subscripting
    // when the name isn't compatable with JS '.'.
    
    var args = ast.arguments.map(function (arg) {
      return arg.code;
    }).interpolate(', ');
    
    ast.code = [
      ast.subject.code, '.', ast.name, '(', args, ')'
    ];
  },
  
  visitDot: function (ast) { // [ subject, name ]
    ast.visitChildren(this);
    
    // Todo: Check if the name is simple enough to use '.' instead.
    
    ast.code = [
      ast.subject.code, '[', ast.name.quote(), ']'
    ];
  },
  
  
  visitInclusiveRange: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.code = [
      'Range.inclusive(',
        ast.lhs.code, ', ',
        ast.rhs.code,
      ')'
    ];
  },
  
  visitExclusiveRange: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.code = [
      'Range.exclusive(',
        ast.lhs.code, ', ',
        ast.rhs.code,
      ')'
    ];
  },
  
  visitThis: function (ast) { // [ ]
    ast.code = '__combe_this';
  },
  
  visitVariable: function (ast) { // [ name ]
    ast.code = ast.name;
  },
  
  visitLiteral: function (ast) { // [ value ]
    if (ast.value === null) {
      ast.code = 'null';
    }
    else if (ast.value === undefined) {
      ast.code = 'undefined';
    }
    else if (ast.value === true) {
      ast.code = 'true';
    }
    else if (ast.value === false) {
      ast.code = 'false';
    }
    else if (typeof ast.value === 'string') {
      ast.code = ast.value.quote();
    }
    else if (typeof ast.value === 'number') {
      ast.code = ast.value.toString();
    }
    else if (ast.value instanceof RegExp) {
      ast.code = ast.value.toString();
    }
    else {
      throw Error.new('Unknown Ast (Literal) value type');
    }
  },
  
  visitArray: function (ast) { // [ elements ]
    ast.visitChildren(this);
    
    var elems = ast.elements.map(function (elem) {
      return elem.code;
    }).interpolate(', ');
    
    ast.code = [
      '[', elems, ']'
    ];
  },
  
  visitObject: function (ast) { // [ properties ]
    ast.visitChildren(this);
    
    var prologue = [
      'var __combe_object = {};\n'
    ];
    
    var decls = ast.properties.map(function (pdecl) {
      return [pdecl.code, ';\n'];
    });
    
    var epilogue = [
      'return __combe_object;\n'
    ];
    
    ast.code = [
      '(function () {\n',
        prologue,
        decls,
        epilogue,
      '})()'
    ];
  },
  
  
  visitFunction: function (ast) { // [ parameters, body ]
    ast.visitChildren(this);
    
    if (ast.parameters == null) {
      var params = null;
      var argsvar = null;
    }
    else if (typeof ast.parameters === 'string') {
      var params = null;
      var argsvar = ['var ', ast.parameters, ' = Array.slice(arguments);\n'];
    }
    else {
      var params = ast.parameters.interpolate(', ');
      var argsvar = null;
    }
    
    ast.code = [
      '(function (', params, ') {\n',
        'var __combe_this = this;\n',
        'var __combe_return = null;\n',
        argsvar,
        'try {\n',
          'return ', ast.body.code, ';\n',
        '}\n',
        'catch (__combe_e) {\n',
          'if (__combe_e === __combe_return) return __combe_return.value;\n',
          'throw __combe_e;\n',
        '}\n',
      '})'
    ];
  },
  
  visitRule: function (ast) { // [ parameters, body ]
    ast.visitChildren(this);
    
    if (ast.variables.length >= 1) {
      var vars = [
        'var ', ast.variables.interpolate(', '), ';\n'
      ];
    }
    else {
      var vars = null;
    }
    
    if (ast.parameters == null) {
      var innerFunction = [
        '(function () {\n',
          vars,
          'return ', ast.body.code, '.call(this);\n',
        '})'
      ];
      
      var innerFunctionCode = Array.deepJoinIOList(innerFunction);
      var hash = crypto.createHash('md5');
      hash.update(innerFunctionCode);
      var digest = hash.digest('base64').slice(0, -2); // without base64 suffix
      
      ast.code = [
        '(function () {\n',
          'return this.__combe_memoize(', digest.quote(), ', ', innerFunction, ');\n',
        '})'
      ];
    }
    else {
      if (typeof ast.parameters === 'string') {
        var params = null;
        var argsvar = ['var ', ast.parameters, ' = Array.slice(arguments);\n'];
      }
      else {
        var params = ast.parameters.interpolate(', ');
        var argsvar = null;
      }
      
      ast.code = [
        '(function (', params, ') {\n',
          argsvar,
          vars,
          'return ', ast.body.code, '.call(this);\n',
        '})'
      ];
    }
  },
  
  visitVariableDeclaration: function (ast) { // [ name, expression ]
    ast.visitChildren(this);
    
    // Note: These should always be attached to a JS var statement...
    if (ast.expression != null) {
      ast.code = [ast.name, ' = ', ast.expression.code];
    }
    else {
      ast.code = ast.name;
    }
  },
  
  
  visitBlock: function (ast) { // [ statements ]
    ast.visitChildren(this);
    
    var stmts = ast.statements.map(function (stmt) {
      return stmt.code;
    });
    
    ast.code = [
      '(function () {\n',
        stmts, // no default result
      '})()'
    ];
  },
  
  
  visitValueProperty: function (ast) { // [ name, value ]
    ast.visitChildren(this);
    
    ast.code = [
      '__combe_defineValueProperty(', 
        '__combe_object, ',
        ast.name.quote(), ', ',
        ast.value.code,
      ')'
    ];
  },
  
  visitGetProperty: function (ast) { // [ name, value ]
    ast.visitChildren(this);
    
    ast.code = [
      '__combe_defineGetProperty(', 
        '__combe_object, ',
        ast.name.quote(), ', ',
        ast.value.code,
      ')'
    ];
  },
  
  visitSetProperty: function (ast) { // [ name, value ]
    ast.visitChildren(this);
    
    ast.code = [
      '__combe.defineSetProperty(',
        '__combe_object, ',
        ast.name.quote(), ', ',
        ast.value.code,
      ')'
    ];
  },
  
  visitDescribeProperty: function (ast) { // [ name, value ]
    ast.visitChildren(this);
    
    ast.code = [
      '__combe.defineDescribedProperty(', 
        '__combe_object, ',
        ast.name.quote(), ', ',
        ast.value.code,
      ')'
    ];
  },
  
  visitChoicePattern: function (ast) { // [ patterns ]
    ast.visitChildren(this);
    
    var ps = ast.patterns.map(function (p) {
      return p.code;
    }).interpolate(', ');
    
    ast.code = [
      '(function () {\n',
        'return this.__combe_choice(', ps, ');\n',
      '})'
    ];
  },
  
  visitSequencePattern: function (ast) { // [ patterns ]
    ast.visitChildren(this);
    
    var ps = ast.patterns.slice(0, ast.patterns.length - 1).map(function (p) {
      return [p.code, '.call(this);\n'];
    });
    ps.push([
      'return ', ast.patterns.last.code, '.call(this);\n'
    ]);
    
    ast.code = [
      '(function () {\n',
        ps,
      '})'
    ];
  },
  
  visitNotPattern: function (ast) { // [ pattern ]
    ast.visitChildren(this);
    
    ast.code = [
      '(function () {\n',
        'return this.__combe_not(', ast.pattern.code, ');\n',
      '})'
    ];
  },
  
  visitLookaheadPattern: function (ast) { // [ pattern ]
    ast.visitChildren(this);
    
    ast.code = [
      '(function () {\n',
        'return this.__combe_lookahead(', ast.pattern.code, ');\n',
      '})'
    ];
  },
  
  visitHashOperatorPattern: function (ast) { // [ pattern ]
    ast.visitChildren(this);
    
    ast.code = [
      '(function () {\n',
        'return this.handleHashPattern(', ast.pattern.code, ');\n',
      '})'
    ];
  },
  
  visitRepeatPattern: function (ast) { // [ pattern ]
    ast.visitChildren(this);
    
    ast.code = [
      '(function () {\n',
        'return this.__combe_repeat(', ast.pattern.code, ');\n',
      '})'
    ];
  },
  
  visitNonZeroRepeatPattern: function (ast) { // [ pattern ]
    ast.visitChildren(this);
    
    ast.code = [
      '(function () {\n',
        'return this.__combe_nonZeroRepeat(', ast.pattern.code, ');\n',
      '})'
    ];
  },
  
  visitOptionalPattern: function (ast) { // [ pattern ]
    ast.visitChildren(this);
    
    ast.code = [
      '(function () {\n',
        'return this.__combe_optional(', ast.pattern.code, ');\n',
      '})'
    ];
  },
  
  visitBindPattern: function (ast) { // [ pattern, name ]
    ast.visitChildren(this);
    
    ast.code = [
      '(function () {\n',
        'return (', ast.name, ' = ', ast.pattern.code, '.call(this));\n',
      '})'
    ];
  },
  
  visitCallPattern: function (ast) { // [ pattern, arguments ]
    ast.visitChildren(this);
    
    var as = ast.arguments.map(function (a) {
      return a.code;
    }).interpolate(', ');
    
    ast.code = [
      '(function () {\n',
        'return ', ast.pattern.code, '.call(this, ', as, ');\n',
      '})'
    ];
  },
  
  visitPredicatePattern: function (ast) { // [ body ]
    ast.visitChildren(this);
    
    var pattern = [
      '(function () {\n',
        'var __combe_this = this;\n',
        'var __combe_return = null;\n',
        'try {\n',
          'return ', ast.body.code, ';\n',
        '}\n',
        'catch (__combe_e) {\n',
          'if (__combe_e === __combe_return) return __combe_return.value;\n',
          'throw __combe_e;\n',
        '}\n',
      '})'
    ];
    
    ast.code = [
      '(function () {\n',
        'return this.__combe_predicate(', pattern, ');\n',
      '})'
    ];
  },
  
  visitActionPattern: function (ast) { // [ body ]
    ast.visitChildren(this);
    
    ast.code = [
      '(function () {\n',
        'var __combe_this = this;\n',
        'var __combe_return = null;\n',
        'try {\n',
          'return ', ast.body.code, ';\n',
        '}\n',
        'catch (__combe_e) {\n',
          'if (__combe_e === __combe_return) return __combe_return.value;\n',
          'throw __combe_e;\n',
        '}\n',
      '})'
    ];
  },
  
  visitImmediateActionPattern: function (ast) { // [ body ]
    ast.visitChildren(this);
    
    var pattern = [
      '(function () {\n',
        'var __combe_this = this;\n',
        'var __combe_return = null;\n',
        'try {\n',
          'return ', ast.body.code, ';\n',
        '}\n',
        'catch (__combe_e) {\n',
          'if (__combe_e === __combe_return) return __combe_return.value;\n',
          'throw __combe_e;\n',
        '}\n',
      '})'
    ];
    
    ast.code = [
      pattern, '.call(this)'
    ];
  },
  
  visitStringPattern: function (ast) { // [ value ]
    ast.code = [
      '(function () {\n',
        'return this.handleStringPattern(', ast.value.quote(), ');\n',
      '})'
    ];
  },
  
  visitVariablePattern: function (ast) { // [ name ]
    if (ast.containingScope.variables.include(ast.name)) {
      ast.code = [ ast.name ];
    }
    else {
      ast.code = [ 'this.', ast.name ];
    }
  },
  
  
  unwrapBlockAsStatements: function (ast, ignoreDefAndVarTest) {
    if (ignoreDefAndVarTest == null) ignoreDefAndVarTest = false;
    
    if (ast == null) {
      return null;
    }
    else if (ast.type === 'Block') {
      var stmts = ast.statements.map(function (stmt) {
        return stmt.code;
      });
      
      if (ast.statements.some(function (stmt) {
        return ['VarStatement'].include(stmt.type);
      }) || ignoreDefAndVarTest) {
        return stmts;
      }
      else {
        return [
          '(function () {\n',
            stmts,
          '})()'
        ];
      }
    }
    else {
      return [ast.code, ';\n'];
    }
  },
  
  gensymIndex: 0,
  
  gensym: function (name) {
    if (name == null) name = 'unnamed';
    
    return '__combe_gensym_' + name + this.gensymIndex++;
  },
  
});
