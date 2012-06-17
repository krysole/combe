// Generated code
"use strict";
var BaseParser = require("./BaseParser");
var Ast = require("./NewCombeAst");
var NewCombeLexer = require("./NewCombeLexer");
var NewCombeParser = module.exports = Class.new(BaseParser, {
  parseProgram: (function (source, filename) {
    return this.parse(source, filename, "program");
  }),
  parseExpression: (function (source, filename) {
    return this.parse(source, filename, "expression");
  }),
  parseStatement: (function (source, filename) {
    return this.parse(source, filename, "statement");
  }),
  parseSourceElement: (function (source, filename) {
    return this.parse(source, filename, "sourceElement");
  }),
  parse: (function (source, filename, rulename) {
    var rest = Array.slice(arguments, 3);
    if (filename == null) filename = "(unnamed)";
    var parser = this.new(source, filename);
    var result = parser.match.apply(parser, [
      rulename
    ].concat(rest));
    if (!result) {
      var t = parser.tokens.last;
      var lc = t != null ? source.lineColumnAt(t.position).join(":") : "-1";
      var text = t != null ? ("[" + t.text) + "] " : "";
      throw Error.new(((("NewCombe Parser Failed: Furthest token was " + text) + filename) + ":") + lc);
    }
    return result;
  })
}, {
  initialize: (function (source, filename) {
    BaseParser.prototype.initialize.call(this, source);
    this.filename = filename;
    this.lexer = NewCombeLexer.new(source, filename);
    this.tokens = [
      /* elision */
    ];
    this.furthestToken = {
      position: 0,
      text: "<<notoken>>"
    };
  }),
  program: (function () {
    return this.memoize("+KqumU/JheAq7olpW1k7ng", (function () {
      var stmts;
      return (function () {
        stmts = this._repeat(this.sourceElement);
        this.eof();
        return Ast.Program(stmts);
      }).call(this);
    }));
  }),
  sourceElement: (function () {
    return this.memoize("PZmnCEnnV6ceYYtnr6OlHA", (function () {
      return this._choice(this.statement, this.functionDeclaration);
    }));
  }),
  functionDeclaration: (function () {
    return this.memoize("xSEFPeeTXqDNjVTEYjFtQQ", (function () {
      var name, args, stmts;
      return (function () {
        this.id("function");
        name = this.variableIdentifier();
        args = this.parameters();
        this.stringPatternHandler("{");
        stmts = this.functionBody();
        this.stringPatternHandler("}");
        return Ast.FunctionDeclaration(name, args, stmts);
      }).call(this);
    }));
  }),
  functionExpression: (function () {
    return this.memoize("EIXYn7/rqTwekXt+E68miA", (function () {
      var name, args, stmts;
      return (function () {
        this.id("function");
        name = this._optional(this.variableIdentifier);
        args = this.parameters();
        this.stringPatternHandler("{");
        stmts = this.functionBody();
        this.stringPatternHandler("}");
        return Ast.Function(name, args, stmts);
      }).call(this);
    }));
  }),
  parameters: (function () {
    return this.memoize("SO34wtVnurw3xXvGDtZ5Mg", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("(");
        args = this.delimited(this.variableIdentifier, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(")");
        return args;
      }).call(this);
    }));
  }),
  functionBody: (function () {
    return this.memoize("SQXOUs1x4ATQGMeeT3KpCg", (function () {
      return this._repeat(this.sourceElement);
    }));
  }),
  ruleExpression: (function () {
    return this.memoize("CleL4R4EHXzoGJ3/DC9qMQ", (function () {
      var name, args, p;
      return (function () {
        this.id("rule");
        name = this._optional(this.variableIdentifier);
        args = this._optional(this.parameters);
        this.stringPatternHandler("{");
        p = this.patternOpt();
        this.stringPatternHandler("}");
        return Ast.Rule(name, args, p);
      }).call(this);
    }));
  }),
  patternOpt: (function () {
    return this.memoize("RXM3ZircDjli9X/6YgahKQ", (function () {
      return this._choice(this.choicePattern, (function () {
        this._optional((function () {
          return this.stringPatternHandler("|");
        }));
        return Ast.EmptyPattern();
      }));
    }));
  }),
  statement: (function () {
    return this.memoize("9GDg1RYDuPrIit8Kbv/zZQ", (function () {
      return this._choice(this.block, this.variableDeclarationStatement, this.ifStatement, this.whileStatement, this.doWhileStatement, this.forStatement, this.forInStatement, this.switchStatement, this.tryCatchStatement, this.throwStatement, this.returnStatement, this.breakStatement, this.continueStatement, this.debuggerStatement, this.labelledStatement, this.expressionStatement, this.emptyStatement, this.withStatement);
    }));
  }),
  block: (function () {
    return this.memoize("UnGDp/gNHuMfDuV1JouyvA", (function () {
      var stmts;
      return (function () {
        this.stringPatternHandler("{");
        stmts = this._repeat(this.statement);
        this.stringPatternHandler("}");
        return Ast.BlockStatement(stmts);
      }).call(this);
    }));
  }),
  variableDeclarationStatement: (function () {
    return this.memoize("TL7S5ErIrjxQDW2GBLMWYw", (function () {
      var decls;
      return (function () {
        this.id("var");
        decls = this.delimited1((function () {
          return this.variableDeclaration(false);
        }), (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(";");
        return Ast.VariableDeclarationStatement(decls);
      }).call(this);
    }));
  }),
  variableDeclaration: (function (noInFlag) {
    var name, expr;
    return (function () {
      name = this.variableIdentifier();
      this._optional((function () {
        this.stringPatternHandler("=");
        return expr = this.assignmentExpression(noInFlag);
      }));
      return Ast.VariableDeclaration(name, expr);
    }).call(this);
  }),
  ifStatement: (function () {
    return this.memoize("3QFKPHnjvcYSFtEhumMfIw", (function () {
      var condition, consiquent, alternative;
      return (function () {
        this.id("if");
        this.stringPatternHandler("(");
        condition = this.expression();
        this.stringPatternHandler(")");
        consiquent = this.statement();
        this._optional((function () {
          this.id("else");
          return alternative = this.statement();
        }));
        return Ast.IfStatement(condition, consiquent, alternative);
      }).call(this);
    }));
  }),
  whileStatement: (function () {
    return this.memoize("vamMVDngmlzhIkkb/glETA", (function () {
      var condition, stmt;
      return (function () {
        this.id("while");
        this.stringPatternHandler("(");
        condition = this.expression();
        this.stringPatternHandler(")");
        stmt = this.statement();
        return Ast.WhileStatement(condition, stmt);
      }).call(this);
    }));
  }),
  doWhileStatement: (function () {
    return this.memoize("o+LT6GPfTQG8+kgKDqFJXA", (function () {
      var stmt, condition;
      return (function () {
        this.id("do");
        stmt = this.statement();
        this.id("while");
        this.stringPatternHandler("(");
        condition = this.expression();
        this.stringPatternHandler(")");
        this.stringPatternHandler(";");
        return Ast.DoWhileStatement(stmt, condition);
      }).call(this);
    }));
  }),
  forStatement: (function () {
    return this.memoize("45kvMTzdR4DLWoPvsVdVDQ", (function () {
      var initExpr, condExpr, incExpr, stmt, decls;
      return this._choice((function () {
        this.id("for");
        this.stringPatternHandler("(");
        initExpr = this._optional((function () {
          return this.expressionWithNoInFlag(true);
        }));
        this.stringPatternHandler(";");
        condExpr = this._optional(this.expression);
        this.stringPatternHandler(";");
        incExpr = this._optional(this.expression);
        this.stringPatternHandler(")");
        stmt = this.statement();
        return Ast.ForStatement(initExpr, condExpr, incExpr, stmt);
      }), (function () {
        this.id("for");
        this.stringPatternHandler("(");
        this.id("var");
        decls = this.delimited1((function () {
          return this.variableDeclaration(true);
        }), (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(";");
        condExpr = this._optional(this.expression);
        this.stringPatternHandler(":");
        incExpr = this._optional(this.expression);
        this.stringPatternHandler(")");
        stmt = this.statement();
        return Ast.ForDeclaringStatement(decls, condExpr, incExpr, stmt);
      }));
    }));
  }),
  forInStatement: (function () {
    return this.memoize("FW8JY5PXt+RwwMo2uO1mdg", (function () {
      var lvalue, subject, stmt, decl;
      return this._choice((function () {
        this.id("for");
        this.stringPatternHandler("(");
        lvalue = this.secondaryExpression();
        this.id("in");
        subject = this.expression();
        this.stringPatternHandler(")");
        stmt = this.statement();
        return Ast.ForInStatement(lvalue, subject, stmt);
      }), (function () {
        this.id("for");
        this.stringPatternHandler("(");
        this.id("var");
        decl = this.variableDeclaration(true);
        this.id("in");
        subject = this.expression();
        this.stringPatternHandler(")");
        stmt = this.statement();
        return Ast.ForInStatement(vardecl, subject, stmt);
      }));
    }));
  }),
  switchStatement: (function () {
    return this.memoize("uxa9YlnHrXyB1ykfOptfDQ", (function () {
      var subject, cs, d, cs2;
      return (function () {
        this.id("switch");
        this.stringPatternHandler("(");
        subject = this.expression();
        this.stringPatternHandler(")");
        this.stringPatternHandler("{");
        cs = this._repeat(this.caseClause);
        cs = this._optional((function () {
          d = this.defaultClause();
          cs2 = this._repeat(this.caseClause);
          return cs.concat([
            d
          ]).concat(cs2);
        }));
        this.stringPatternHandler("}");
        return Ast.SwitchStatement(subject, cs);
      }).call(this);
    }));
  }),
  caseClause: (function () {
    return this.memoize("IY7Sh/makQV/pTKb6M39rw", (function () {
      var subject, stmts;
      return (function () {
        this.id("case");
        subject = this.expression();
        this.stringPatternHandler(":");
        stmts = this._repeat(this.statement);
        return Ast.CaseClause(subject, stmts);
      }).call(this);
    }));
  }),
  defaultClause: (function () {
    return this.memoize("W5aFrz/tPxLjwaUtq6b5EQ", (function () {
      var stmts;
      return (function () {
        this.id("default");
        this.stringPatternHandler(":");
        stmts = this._repeat(this.statement);
        return Ast.DefaultClause(stmts);
      }).call(this);
    }));
  }),
  tryCatchStatement: (function () {
    return this.memoize("33IS+nCgyWhrmx0FVJUp3Q", (function () {
      var tryBlock, catchBinding, catchBlock, finallyBlock;
      return (function () {
        this.id("try");
        tryBlock = this.block();
        this._optional((function () {
          this.id("catch");
          this.stringPatternHandler("(");
          catchBinding = this.variableIdentifier();
          this.stringPatternHandler(")");
          return catchBlock = this.block();
        }));
        this._optional((function () {
          this.id("finally");
          return finallyBlock = this.block();
        }));
        return Ast.TryCatchStatement(tryBlock, catchBinding, catchBlock, finallyBlock);
      }).call(this);
    }));
  }),
  throwStatement: (function () {
    return this.memoize("z2GwhdNJe0jcJOldOatq5A", (function () {
      var t, expr;
      return (function () {
        t = this.id("throw");
        this._choice((function () {
          this._predicate((function () {
            return t.precedesNewline;
          }));
          return this.stringPatternHandler(";");
        }), (function () {
          expr = this._optional(this.expression);
          return this.stringPatternHandler(";");
        }));
        return Ast.ThrowStatement(expr);
      }).call(this);
    }));
  }),
  returnStatement: (function () {
    return this.memoize("zJqBwO0Q6WZQ7Lx+WeOr4w", (function () {
      var t, expr;
      return (function () {
        t = this.id("return");
        this._choice((function () {
          this._predicate((function () {
            return t.precedesNewline;
          }));
          return this.stringPatternHandler(";");
        }), (function () {
          expr = this._optional(this.expression);
          return this.stringPatternHandler(";");
        }));
        return Ast.ReturnStatement(expr);
      }).call(this);
    }));
  }),
  breakStatement: (function () {
    return this.memoize("+Rh0Msfzj3MlT3qL5NoFMA", (function () {
      var t, name;
      return (function () {
        t = this.id("break");
        this._choice((function () {
          this._predicate((function () {
            return t.precedesNewline;
          }));
          return this.stringPatternHandler(";");
        }), (function () {
          name = this._optional((function () {
            return this.stringPatternHandler("identifier");
          }));
          return this.stringPatternHandler(";");
        }));
        return Ast.BreakStatement(name);
      }).call(this);
    }));
  }),
  continueStatement: (function () {
    return this.memoize("XNc3eBRu+34RV1OrkXFNog", (function () {
      var t, name;
      return (function () {
        t = this.id("continue");
        this._choice((function () {
          this._predicate((function () {
            return t.precedesNewline;
          }));
          return this.stringPatternHandler(";");
        }), (function () {
          name = this._optional((function () {
            return this.stringPatternHandler("identifier");
          }));
          return this.stringPatternHandler(";");
        }));
        return Ast.ContinueStatement(name);
      }).call(this);
    }));
  }),
  debuggerStatement: (function () {
    return this.memoize("ejTXl+yM1WqqlYPax5LJHQ", (function () {
      return (function () {
        this.id("debugger");
        this.stringPatternHandler(";");
        return Ast.DebuggerStatement();
      }).call(this);
    }));
  }),
  labelledStatement: (function () {
    return this.memoize("gev63lbhnQ1iEdW53EO99A", (function () {
      var name, stmt;
      return (function () {
        name = this.stringPatternHandler("identifier");
        this.stringPatternHandler(":");
        stmt = this.statement();
        return Ast.LabelStatement(name, stmt);
      }).call(this);
    }));
  }),
  expressionStatement: (function () {
    return this.memoize("bEN7hLifftwWjYDMqUmiow", (function () {
      var expr;
      return (function () {
        this._not((function () {
          return this._choice((function () {
            return this.stringPatternHandler("{");
          }), (function () {
            return this.id("function");
          }), (function () {
            return this.id("rule");
          }));
        }));
        expr = this.expression();
        this.stringPatternHandler(";");
        return Ast.ExpressionStatement(expr);
      }).call(this);
    }));
  }),
  emptyStatement: (function () {
    return this.memoize("7x1Xu9OeZNq9vH2+/juYpw", (function () {
      return (function () {
        this.stringPatternHandler(";");
        return Ast.EmptyStatement();
      }).call(this);
    }));
  }),
  withStatement: (function () {
    return this.memoize("WM3vUAGcMsC3ukT40Gy/ag", (function () {
      var subject, stmt;
      return (function () {
        this.id("with");
        this.stringPatternHandler("(");
        subject = this.expression();
        this.stringPatternHandler(")");
        stmt = this.statement();
        return Error.new("with statement not allowed");
      }).call(this);
    }));
  }),
  id: (function (expectedName) {
    var name;
    return (function () {
      name = this.stringPatternHandler("identifier");
      this._predicate((function () {
        return name.text === expectedName;
      }));
      return name;
    }).call(this);
  }),
  variableIdentifier: (function () {
    return this.memoize("QxlNh+fLm4qBg2bNdWraVQ", (function () {
      var name;
      return (function () {
        name = this.stringPatternHandler("identifier");
        this._predicate((function () {
          return !name.reserved;
        }));
        return name.text;
      }).call(this);
    }));
  }),
  propertyName: (function () {
    return this.memoize("xBv1pNM82lnnQuAFtpaH8Q", (function () {
      var t;
      return this._choice((function () {
        t = this.stringPatternHandler("identifier");
        return t.text;
      }), (function () {
        t = this.stringPatternHandler("string");
        return t.value;
      }), (function () {
        t = this.stringPatternHandler("number");
        return t.text;
      }));
    }));
  }),
  expression: (function () {
    return this.memoize("y0nuheYJYtV/eSqdpVjYCw", (function () {
      return this.expressionWithNoInFlag(false);
    }));
  }),
  expressionWithNoInFlag: (function (noInFlag) {
    var exprs;
    return (function () {
      exprs = this.delimited1((function () {
        return this.assignmentExpression(noInFlag);
      }), (function () {
        return this.stringPatternHandler(",");
      }));
      return this._choice((function () {
        this._predicate((function () {
          return exprs.length === 1;
        }));
        return exprs[0];
      }), (function () {
        return Ast.CommaExpression(exprs);
      }));
    }).call(this);
  }),
  assignmentExpression: (function (noInFlag) {
    var lhs, rhs, op;
    return this._choice((function () {
      lhs = this.secondaryExpression();
      return this._choice((function () {
        this.stringPatternHandler("=");
        rhs = this.assignmentExpression(noInFlag);
        return Ast.Assignment(lhs, rhs);
      }), (function () {
        op = this.operatorAssignmentToken();
        rhs = this.assignmentExpression(noInFlag);
        return Ast.OperatorAssignment(op, lhs, rhs);
      }));
    }), (function () {
      return this.conditionalExpression(noInFlag);
    }));
  }),
  operatorAssignmentToken: (function () {
    return this.memoize("7st5dPL2fy0BodRi5/T7oA", (function () {
      return this._choice((function () {
        return this.stringPatternHandler("operatorAssignment");
      }), this.divisionAssignment);
    }));
  }),
  conditionalExpression: (function (noInFlag) {
    var condition, consiquent, alternative;
    return (function () {
      condition = this.logicalOrExpression(noInFlag);
      return this._choice((function () {
        this.stringPatternHandler("?");
        consiquent = this.assignmentExpression(noInFlag);
        this.stringPatternHandler(":");
        alternative = this.assignmentExpression(noInFlag);
        return Ast.Conditional(condition, consiquent, alternative);
      }), (function () {
        return condition;
      }));
    }).call(this);
  }),
  logicalOrExpression: (function (noInFlag) {
    return this.leftAssociative(this.logicalAndExpression, (function () {
      return this.stringPatternHandler("||");
    }), noInFlag);
  }),
  logicalAndExpression: (function (noInFlag) {
    return this.leftAssociative(this.bitwiseOrExpression, (function () {
      return this.stringPatternHandler("&&");
    }), noInFlag);
  }),
  bitwiseOrExpression: (function (noInFlag) {
    return this.leftAssociative(this.bitwiseXorExpression, (function () {
      return this.stringPatternHandler("|");
    }), noInFlag);
  }),
  bitwiseXorExpression: (function (noInFlag) {
    return this.leftAssociative(this.bitwiseAndExpression, (function () {
      return this.stringPatternHandler("^");
    }), noInFlag);
  }),
  bitwiseAndExpression: (function (noInFlag) {
    return this.leftAssociative(this.equalityExpression, (function () {
      return this.stringPatternHandler("&");
    }), noInFlag);
  }),
  equalityExpression: (function (noInFlag) {
    return this.leftAssociative(this.relationalExpression, (function () {
      return this._choice((function () {
        return this.stringPatternHandler("===");
      }), (function () {
        return this.stringPatternHandler("!==");
      }), (function () {
        return this.stringPatternHandler("==");
      }), (function () {
        return this.stringPatternHandler("!=");
      }));
    }), noInFlag);
  }),
  relationalExpression: (function (noInFlag) {
    return this.leftAssociative(this.shiftExpression, (function () {
      return this._choice((function () {
        return this.stringPatternHandler("<");
      }), (function () {
        return this.stringPatternHandler("<=");
      }), (function () {
        return this.stringPatternHandler(">=");
      }), (function () {
        return this.stringPatternHandler(">");
      }), (function () {
        return this.id("instanceof");
      }), (function () {
        return this.inToken(noInFlag);
      }));
    }));
  }),
  shiftExpression: (function () {
    return this.memoize("lDAfKUbYUWFywtOfWAqRyw", (function () {
      return this.leftAssociative(this.additiveExpression, (function () {
        return this._choice((function () {
          return this.stringPatternHandler("<<");
        }), (function () {
          return this.stringPatternHandler(">>");
        }), (function () {
          return this.stringPatternHandler(">>>");
        }));
      }));
    }));
  }),
  additiveExpression: (function () {
    return this.memoize("dZUcIPvBVFYMFOLVmbgEjg", (function () {
      return this.leftAssociative(this.multiplicitiveExpression, (function () {
        return this._choice((function () {
          return this.stringPatternHandler("+");
        }), (function () {
          return this.stringPatternHandler("-");
        }));
      }));
    }));
  }),
  multiplicitiveExpression: (function () {
    return this.memoize("CwEQqa9JGXNgho3j0kZQPQ", (function () {
      return this.leftAssociative(this.rangeExpression, (function () {
        return this._choice((function () {
          return this.stringPatternHandler("*");
        }), this.division, (function () {
          return this.stringPatternHandler("%");
        }));
      }));
    }));
  }),
  rangeExpression: (function () {
    return this.memoize("awQ/Rk4T12r4DBj2cFSlxA", (function () {
      var expr, rhs;
      return (function () {
        expr = this.prefixExpression();
        return this._choice((function () {
          this.stringPatternHandler("..");
          rhs = this._choice(this.rangeInfinity, this.prefixExpression);
          return Ast.InclusiveRange(expr, rhs);
        }), (function () {
          this.stringPatternHandler("...");
          rhs = this._choice(this.rangeInfinity, this.prefixExpression);
          return Ast.ExclusiveRange(expr, rhs);
        }), (function () {
          return expr;
        }));
      }).call(this);
    }));
  }),
  rangeInfinity: (function () {
    return this.memoize("e7EGFnKO7lguD7eCkjL/vg", (function () {
      return (function () {
        this.stringPatternHandler("*");
        return Ast.RangeInfinity();
      }).call(this);
    }));
  }),
  prefixExpression: (function () {
    return this.memoize("MuvAV6Dq9a2SkiZQ9ZyPEw", (function () {
      var expr, op;
      return this._choice((function () {
        this.id("delete");
        expr = this.prefixExpression();
        return Ast.Delete(expr);
      }), (function () {
        this.id("void");
        expr = this.prefixExpression();
        return Ast.Void(expr);
      }), (function () {
        this.id("typeof");
        expr = this.prefixExpression();
        return Ast.Typeof(expr);
      }), (function () {
        op = this._choice((function () {
          return this.stringPatternHandler("++");
        }), (function () {
          return this.stringPatternHandler("--");
        }), (function () {
          return this.stringPatternHandler("+");
        }), (function () {
          return this.stringPatternHandler("-");
        }), (function () {
          return this.stringPatternHandler("~");
        }), (function () {
          return this.stringPatternHandler("!");
        }));
        expr = this.prefixExpression();
        return Ast.PrefixOperator(op.text, expr);
      }), this.postfixExpression);
    }));
  }),
  postfixExpression: (function () {
    return this.memoize("+bFH7Gms9HyVeJkgK1JmyA", (function () {
      var expr, t;
      return (function () {
        expr = this.secondaryExpression();
        return this._choice((function () {
          t = this._choice((function () {
            return this.stringPatternHandler("++");
          }), (function () {
            return this.stringPatternHandler("--");
          }));
          this._predicate((function () {
            return !t.newlinePrecedes;
          }));
          return Ast.PostfixOperator(t.text, expr);
        }), (function () {
          return expr;
        }));
      }).call(this);
    }));
  }),
  leftAssociative: (function (operand, operator, noInFlag) {
    var expr, op, rhs;
    return (function () {
      expr = operand.call(this, noInFlag);
      this._repeat((function () {
        op = operator.call(this);
        rhs = operand.call(this, noInFlag);
        return expr = Ast.InfixOperator(op.text, expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  rightAssociative: (function (operand, operator, noInFlag) {
    var expr, op, rhs;
    return (function () {
      expr = operand.call(this, noInFlag);
      return this._choice((function () {
        op = operator.call(this);
        rhs = this.rightAssociative(operand, operator, noInFlag);
        return Ast.InfixOperator(op.text, expr, rhs);
      }), (function () {
        return expr;
      }));
    }).call(this);
  }),
  secondaryExpression: (function () {
    return this.memoize("iI8skEJLXcapWypXsc6uQQ", (function () {
      return this._choice(this.callExpression, this.newExpression);
    }));
  }),
  newExpression: (function () {
    return this.memoize("WO0k+P1cEkM+LZpciCdwaQ", (function () {
      var ctor;
      return this._choice(this.memberExpression, (function () {
        this.id("new");
        ctor = this.newExpression();
        return JSAst.New(ctor, [
          /* elision */
        ]);
      }));
    }));
  }),
  callExpression: (function () {
    return this.memoize("McJ+CHYR8YdgK4RWxO8lYA", (function () {
      var expr, args;
      return (function () {
        expr = this.memberExpression();
        args = this.arguments();
        this._choice((function () {
          this._predicate((function () {
            return expr.is("Dot");
          }));
          return expr = Ast.MethodCall(expr.subject, expr.name, args);
        }), (function () {
          return expr = Ast.Call(expr, args);
        }));
        this._repeat((function () {
          return this._choice((function () {
            args = this.arguments();
            return expr = Ast.Call(expr, args);
          }), (function () {
            return expr = this.propertyAccessor(expr);
          }));
        }));
        return expr;
      }).call(this);
    }));
  }),
  memberExpression: (function () {
    return this.memoize("yvAnAT7vEuaoRgFF61J3KQ", (function () {
      var expr, ctor, args;
      return (function () {
        expr = this._choice((function () {
          this.id("new");
          ctor = this.memberExpression();
          args = this.arguments();
          return Ast.New(ctor, args);
        }), this.functionExpression, this.ruleExpression, this.primaryExpression);
        this._repeat((function () {
          return expr = this.propertyAccessor(expr);
        }));
        return expr;
      }).call(this);
    }));
  }),
  propertyAccessor: (function (subject) {
    var expr, name;
    return this._choice((function () {
      this.stringPatternHandler("[");
      expr = this.expression();
      this.stringPatternHandler("]");
      return Ast.Subscript(subject, expr);
    }), (function () {
      this.stringPatternHandler(".");
      name = this.stringPatternHandler("identifier");
      return Ast.Dot(subject, name.text);
    }));
  }),
  arguments: (function () {
    return this.memoize("svM8FuQ3dJ8TrGbcuoOBbw", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("(");
        args = this.delimited(this.assignmentExpression, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(")");
        return args;
      }).call(this);
    }));
  }),
  primaryExpression: (function () {
    return this.memoize("E0UcSPnumEYMR3aw4GccfA", (function () {
      var name, e;
      return this._choice(this.valueLiteral, (function () {
        this.id("this");
        return Ast.This();
      }), (function () {
        name = this.variableIdentifier();
        return Ast.Variable(name);
      }), this.arrayLiteral, this.objectLiteral, (function () {
        this.stringPatternHandler("(");
        e = this.expression();
        this.stringPatternHandler(")");
        return e;
      }));
    }));
  }),
  valueLiteral: (function () {
    return this.memoize("9+lxiy3S7IoPwrk4JPoAvA", (function () {
      var value, n, s, r;
      return (function () {
        value = this._choice((function () {
          this.id("null");
          return null;
        }), (function () {
          this.id("true");
          return true;
        }), (function () {
          this.id("false");
          return false;
        }), (function () {
          n = this.stringPatternHandler("number");
          return n.value;
        }), (function () {
          s = this.stringPatternHandler("string");
          return s.value;
        }), (function () {
          r = this.stringPatternHandler("regex");
          return r.value;
        }));
        return Ast.Literal(value);
      }).call(this);
    }));
  }),
  arrayLiteral: (function () {
    return this.memoize("X+T+TwvKS6vq1yvxNaOlNg", (function () {
      var elems;
      return (function () {
        this.stringPatternHandler("[");
        elems = this.delimited(this.arrayElement, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("]");
        return Ast.Array(elems);
      }).call(this);
    }));
  }),
  arrayElement: (function () {
    return this.memoize("s2dvzK+fx4g4y+Ct4ntaow", (function () {
      return this._choice(this.assignmentExpression, (function () {
        return Ast.Elision();
      }));
    }));
  }),
  objectLiteral: (function () {
    return this.memoize("MhInClYxUa3WYMBfFEZROg", (function () {
      var decls;
      return (function () {
        this.stringPatternHandler("{");
        decls = this.delimited(this.propertyDeclaration, (function () {
          return this.stringPatternHandler(",");
        }));
        this._optional((function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("}");
        return Ast.Object(decls);
      }).call(this);
    }));
  }),
  propertyDeclaration: (function () {
    return this.memoize("fPKHp+qZoCUfYFWN8vAbDw", (function () {
      var name, expr, body, paramname;
      return this._choice((function () {
        name = this.propertyName();
        this.stringPatternHandler(":");
        expr = this.assignmentExpression();
        return Ast.ValuePropertyDeclaration(name, expr);
      }), (function () {
        this.id("get");
        name = this.propertyName();
        this.stringPatternHandler("(");
        this.stringPatternHandler(")");
        this.stringPatternHandler("{");
        body = this.functionBody();
        this.stringPatternHandler("}");
        return Ast.GetPropertyDeclaration(name, body);
      }), (function () {
        this.id("set");
        name = this.propertyName();
        this.stringPatternHandler("(");
        paramname = this.variableIdentifier();
        this.stringPatternHandler(")");
        this.stringPatternHandler("{");
        body = this.functionBody();
        this.stringPatternHandler("}");
        return Ast.SetPropertyDeclaration(name, paramname, body);
      }));
    }));
  }),
  pattern: (function () {
    return this.memoize("ZCwT4GIOysyO8lvu5uGAPQ", (function () {
      return this.choicePattern();
    }));
  }),
  choicePattern: (function () {
    return this.memoize("Qs8phFBHUmbWEySHPfH64w", (function () {
      var p, ps;
      return (function () {
        this._optional((function () {
          return this.stringPatternHandler("|");
        }));
        p = this.returnPattern();
        return this._choice((function () {
          ps = this._repeat1((function () {
            this.stringPatternHandler("|");
            return this.returnPattern();
          }));
          return this._choice((function () {
            this.stringPatternHandler("|");
            return Ast.ChoicePattern([
              p
            ].concat(ps).concat([
              Ast.EmptyPattern()
            ]));
          }), (function () {
            return Ast.ChoicePattern([
              p
            ].concat(ps));
          }));
        }), (function () {
          return p;
        }));
      }).call(this);
    }));
  }),
  returnPattern: (function () {
    return this.memoize("kVLRM6/fkU/uBh3Py4uszA", (function () {
      var p, expr, body;
      return this._choice((function () {
        p = this.concatPattern();
        return this._choice((function () {
          this.stringPatternHandler("->");
          expr = this.secondaryExpression();
          return Ast.ConcatPattern([
            p,
            Ast.ActionPattern(Ast.ExpressionBody(expr))
          ]);
        }), (function () {
          this.stringPatternHandler("->");
          body = this.jscodeBody();
          return Ast.ConcatPattern([
            p,
            Ast.ActionPattern(body)
          ]);
        }), (function () {
          return p;
        }));
      }), (function () {
        this.stringPatternHandler("->");
        expr = this.secondaryExpression();
        return Ast.ActionPattern(Ast.ExpressionBody(expr));
      }), (function () {
        this.stringPatternHandler("->");
        body = this.jscodeBody();
        return Ast.ActionPattern(body);
      }));
    }));
  }),
  concatPattern: (function () {
    return this.memoize("xfSKn0zBc/iF05qCEdQj2A", (function () {
      var p, ps;
      return (function () {
        p = this.prefixOperatorPattern();
        return this._choice((function () {
          ps = this._repeat1(this.prefixOperatorPattern);
          return Ast.ConcatPattern([
            p
          ].concat(ps));
        }), (function () {
          return p;
        }));
      }).call(this);
    }));
  }),
  prefixOperatorPattern: (function () {
    return this.memoize("WnmC5R23E0XTX3yhH/Hg2A", (function () {
      var p;
      return this._choice((function () {
        this.stringPatternHandler("~");
        p = this.prefixOperatorPattern();
        return Ast.NotPattern(p);
      }), (function () {
        this.stringPatternHandler("&");
        p = this.prefixOperatorPattern();
        return Ast.LookaheadPattern(p);
      }), (function () {
        this.stringPatternHandler("#");
        p = this.prefixOperatorPattern();
        return Ast.TokenOperatorPattern(p);
      }), this.postfixOperatorPattern);
    }));
  }),
  postfixOperatorPattern: (function () {
    return this.memoize("nLllMsu61VEFK20i76vxwQ", (function () {
      var p, name;
      return this._choice((function () {
        p = this.applyPattern();
        this._repeat((function () {
          return p = this.repeatOperatorPattern(p);
        }));
        return p;
      }), (function () {
        this.stringPatternHandler(":");
        this._not(this.ws);
        name = this.variableIdentifier();
        return Ast.BindPattern(name, Ast.AnythingPattern());
      }));
    }));
  }),
  repeatOperatorPattern: (function (p) {
    var name;
    return this._choice((function () {
      this.stringPatternHandler("*");
      return Ast.StarPattern(p);
    }), (function () {
      this.stringPatternHandler("+");
      return Ast.PlusPattern(p);
    }), (function () {
      this.stringPatternHandler("?");
      this._not((function () {
        this._not(this.ws);
        return this._choice((function () {
          return this.stringPatternHandler("(");
        }), (function () {
          return this.stringPatternHandler("{");
        }));
      }));
      return Ast.OptionalPattern(p);
    }), (function () {
      this._not(this.ws);
      this.stringPatternHandler(":");
      this._not(this.ws);
      name = this.variableIdentifier();
      return Ast.BindPattern(name, p);
    }));
  }),
  applyPattern: (function () {
    return this.memoize("jYXqStN9Yl61p1lOJnx4aQ", (function () {
      var p, args;
      return (function () {
        p = this.primaryPattern();
        this._repeat((function () {
          return this._choice((function () {
            this._not(this.ws);
            args = this.arguments();
            return p = Ast.ApplyPattern(p, args);
          }), (function () {
            this._not(this.ws);
            args = this.patternArguments();
            return p = Ast.ApplyPatternArgumentsPattern(p, args);
          }));
        }));
        return p;
      }).call(this);
    }));
  }),
  patternArguments: (function () {
    return this.memoize("P4Yz212LFQk+mU/O+9fJNw", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("[");
        args = this.delimited(this.pattern, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("]");
        return args;
      }).call(this);
    }));
  }),
  primaryPattern: (function () {
    return this.memoize("/R8baT+du/5JUAkqY7KPRQ", (function () {
      var p;
      return this._choice(this.predicatePattern, this.actionPattern, this.immediatePattern, this.literalPattern, this.variablePattern, (function () {
        this.stringPatternHandler("(");
        p = this.pattern();
        this.stringPatternHandler(")");
        return p;
      }));
    }));
  }),
  predicatePattern: (function () {
    return this.memoize("JDQGb/LuYkM82REH2xaw2A", (function () {
      var body;
      return (function () {
        this.stringPatternHandler("?");
        this._not(this.ws);
        body = this.jscodeBody();
        return Ast.PredicatePattern(body);
      }).call(this);
    }));
  }),
  actionPattern: (function () {
    return this.memoize("WsDJxtnysNSrHhHsK3ipTg", (function () {
      var body;
      return (function () {
        this.stringPatternHandler("!");
        this._not(this.ws);
        body = this.jscodeBody();
        return Ast.ActionPattern(body);
      }).call(this);
    }));
  }),
  immediatePattern: (function () {
    return this.memoize("d28oFNdjAZptwES3FXYFoA", (function () {
      var expr, body;
      return this._choice((function () {
        this.stringPatternHandler("%");
        this._not(this.ws);
        expr = this.secondaryExpression();
        return Ast.ImmediatePattern(Ast.ExpressionBody(expr));
      }), (function () {
        this.stringPatternHandler("%");
        this._not(this.ws);
        body = this.jscodeBody();
        return Ast.ImmediatePattern(body);
      }));
    }));
  }),
  literalPattern: (function () {
    return this.memoize("GsQACmy4StLB3B09Cvwqvg", (function () {
      var n, s;
      return this._choice((function () {
        n = this.stringPatternHandler("number");
        return Ast.NumberPattern(n.value);
      }), (function () {
        s = this.stringPatternHandler("string");
        return Ast.StringPattern(s.value);
      }));
    }));
  }),
  variablePattern: (function () {
    return this.memoize("Cz4VgqP/XTfT4C8txw81yA", (function () {
      var name;
      return (function () {
        name = this.variableIdentifier();
        return Ast.VariablePattern(name);
      }).call(this);
    }));
  }),
  jscodeBody: (function () {
    return this.memoize("VNWF2yagvR3cmyZGJkUjKA", (function () {
      var expr, stmts;
      return this._choice((function () {
        this.stringPatternHandler("(");
        expr = this.expression();
        this.stringPatternHandler(")");
        return Ast.ExpressionBody(expr);
      }), (function () {
        this.stringPatternHandler("{");
        stmts = this.functionBody();
        this.stringPatternHandler("}");
        return Ast.StatementsBody(stmts);
      }));
    }));
  }),
  t: (function (typename) {
    var token = this.next();
    if (token.type === typename) {
      return token;
    }
    else {
      this.fail();
    }
  }),
  inToken: (function (noInFlag) {
    return (function () {
      this._predicate((function () {
        return !noInFlag;
      }));
      return this.id("in");
    }).call(this);
  }),
  regex: (function () {
    try {
      return this.t("regex");
    }
    catch (e) {
      if (e === this.lexer.AmbiguousTokenFailure) {
        assert(this.position >= this.tokens.length);
        this.tokens.push(this.lexer.regex());
      }
      else {
        throw e;
      }
    }
  }),
  division: (function () {
    try {
      return this.t("/");
    }
    catch (e) {
      if (e === this.lexer.AmbiguousTokenFailure) {
        assert(this.position >= this.tokens.length);
        this.tokens.push(this.lexer.division());
      }
      else {
        throw e;
      }
    }
  }),
  divisionAssignment: (function () {
    try {
      return this.t("/=");
    }
    catch (e) {
      if (e === this.lexer.AmbiguousTokenFailure) {
        assert(this.position >= this.tokens.length);
        this.tokens.push(this.lexer.divisionAssignment());
      }
      else {
        throw e;
      }
    }
  }),
  peekNext: (function () {
    return this.tokenAt(this.position);
  }),
  next: (function () {
    return this.tokenAt(this.position++);
  }),
  eof: (function () {
    return this.memoize("DwZq90yhPcYc6qTdhHpXvA", (function () {
      return this.stringPatternHandler("eof");
    }));
  }),
  tokenAt: (function (position) {
    var token;
    assert(position < (this.tokens.length + 1));
    if (position >= this.tokens.length) {
      assert(this.tokens.isEmpty() || (this.tokens.last.type !== "eof"));
      this.tokens.push(this.lexer.nextToken());
    }
    return this.tokens[position];
  }),
  stringPatternHandler: (function (string) {
    return this.t(string);
  }),
  ws: (function () {
    if (this.position === 0) {
      return true;
    }
    else {
      var lastToken = this.tokenAt(this.position - 1);
      var currentToken = this.peekNext();
      if (currentToken.type === "eof") {
        return true;
      }
      else if ((lastToken.position + lastToken.length) < currentToken.position) {
        return true;
      }
      else {
        this.fail();
      }
    }
  })
});
