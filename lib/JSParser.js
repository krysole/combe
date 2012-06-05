// Generated code
"use strict";
var TokenParser = require("./TokenParser");
var JSLexer = require("./JSLexer");
var JSAst = require("./JSAst");
var JSParser = module.exports = Class.new(TokenParser, {
  parseProgram: (function (string) {
    return this.parse(string, "program");
  }),
  parseExpression: (function (string) {
    return this.parse(string, "expression");
  }),
  parseStatement: (function (string) {
    return this.parse(string, "statement");
  }),
  parseSourceElement: (function (string) {
    return this.parse(string, "sourceElement");
  }),
  parse: (function (string, ruleName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var parser = this.new(JSLexer.new(string));
    var result = parser.match.apply(parser, [
      ruleName
    ].concat(args));
    if (!result) {
      if (parser.tokens.last) {
        console.log("  *JSParser Failed: Last token seen was " + parser.tokens.last);
      }
      else {
        console.log("  *JSParser Failed: No tokens parsed");
      }
    }
    return result;
  })
}, {
  primaryExpression: (function () {
    return this.memoize("817jnrOIMlolC6qe7ZkFDQ", (function () {
      var name, e;
      return this._choice(this.valueLiteral, (function () {
        this.stringPatternHandler("this");
        return JSAst.This();
      }), (function () {
        name = this.identifier();
        return JSAst.Variable(name);
      }), this.arrayLiteral, this.objectLiteral, (function () {
        this.stringPatternHandler("(");
        e = this.expression();
        this.stringPatternHandler(")");
        return e;
      }));
    }));
  }),
  valueLiteral: (function () {
    return this.memoize("4nBi+9TvhLjdukPp0j67ow", (function () {
      var v, n, s, r;
      return (function () {
        v = this._choice((function () {
          this.stringPatternHandler("null");
          return null;
        }), (function () {
          this.stringPatternHandler("true");
          return true;
        }), (function () {
          this.stringPatternHandler("false");
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
        return JSAst.Literal(v);
      }).call(this);
    }));
  }),
  arrayLiteral: (function () {
    return this.memoize("4JtZcWeXlu3RvROojvRQyw", (function () {
      var exprs;
      return (function () {
        this.stringPatternHandler("[");
        exprs = this.delimited(this.arrayElement, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("]");
        return JSAst.Array(exprs);
      }).call(this);
    }));
  }),
  arrayElement: (function () {
    return this.memoize("Ale5tWxyvR/1lpJY90cZlw", (function () {
      return this._choice(this.assignmentExpression, (function () {
        return JSAst.Elision();
      }));
    }));
  }),
  objectLiteral: (function () {
    return this.memoize("D/2eQ1gPIbD8UXmI4o/sTQ", (function () {
      var pdefs;
      return (function () {
        this.stringPatternHandler("{");
        pdefs = this.delimited(this.propertyAssignment, (function () {
          return this.stringPatternHandler(",");
        }));
        this._optional((function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("}");
        return JSAst.Object(pdefs);
      }).call(this);
    }));
  }),
  propertyAssignment: (function () {
    return this.memoize("Z9wQoSGEkYlx9gEqhQbU0g", (function () {
      var name, expr, body, argname;
      return this._choice((function () {
        name = this.propertyName();
        this.stringPatternHandler(":");
        expr = this.assignmentExpression();
        return JSAst.ValueProperty(name, expr);
      }), (function () {
        this.stringPatternHandler("get");
        name = this.propertyName();
        this.stringPatternHandler("(");
        this.stringPatternHandler(")");
        this.stringPatternHandler("{");
        body = this.functionBody();
        this.stringPatternHandler("}");
        return JSAst.GetProperty(name, body);
      }), (function () {
        this.stringPatternHandler("set");
        name = this.propertyName();
        this.stringPatternHandler("(");
        argname = this.identifier();
        this.stringPatternHandler(")");
        this.stringPatternHandler("{");
        body = this.functionBody();
        this.stringPatternHandler("}");
        return JSAst.SetProperty(name, argname, body);
      }));
    }));
  }),
  propertyName: (function () {
    return this.memoize("7FhPRgs7t4bbuAichZdpYQ", (function () {
      return this._choice(this.identifierName, (function () {
        this.stringPatternHandler("string");
        return token.value;
      }), (function () {
        this.stringPatternHandler("number");
        return token.value;
      }));
    }));
  }),
  memberExpression: (function () {
    return this.memoize("LajCYVU2pGNnGE3E9YFh+g", (function () {
      var expr, ctor, args;
      return (function () {
        expr = this._choice(this.primaryExpression, this.functionExpression, (function () {
          this.stringPatternHandler("new");
          ctor = this.memberExpression();
          args = this.arguments();
          return JSAst.New(ctor, args);
        }));
        this._repeat((function () {
          return expr = this.propertyAccessor(expr);
        }));
        return expr;
      }).call(this);
    }));
  }),
  newExpression: (function () {
    return this.memoize("7tr4K8yQq7oKug1QQp64KA", (function () {
      var ctor;
      return this._choice(this.memberExpression, (function () {
        this.stringPatternHandler("new");
        ctor = this.newExpression();
        return JSAst.New(ctor, [
          /* elision */
        ]);
      }));
    }));
  }),
  propertyAccessor: (function (subject) {
    var expr, name;
    return this._choice((function () {
      this.stringPatternHandler("[");
      expr = this.expression();
      this.stringPatternHandler("]");
      return JSAst.At(subject, expr);
    }), (function () {
      this.stringPatternHandler(".");
      name = this.identifierName();
      return JSAst.Dot(subject, name);
    }));
  }),
  callExpression: (function () {
    return this.memoize("4XUSJiK6fa2E4SbckR4xWQ", (function () {
      var expr, args;
      return (function () {
        expr = this.memberExpression();
        args = this.arguments();
        this._choice((function () {
          this._predicate((function () {
            return expr.is("Dot");
          }));
          return expr = JSAst.CallMethod(expr.receiver, expr.name, args);
        }), (function () {
          return expr = JSAst.Call(expr, args);
        }));
        this._repeat((function () {
          return this._choice((function () {
            args = this.arguments();
            return expr = JSAst.Call(expr, args);
          }), (function () {
            return expr = this.propertyAccessor(expr);
          }));
        }));
        return expr;
      }).call(this);
    }));
  }),
  arguments: (function () {
    return this.memoize("CuwWZCxe7D8SRs2bSLzqHw", (function () {
      var exprs;
      return (function () {
        this.stringPatternHandler("(");
        exprs = this.delimited(this.assignmentExpression, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(")");
        return exprs;
      }).call(this);
    }));
  }),
  leftHandSideExpression: (function () {
    return this.memoize("iI8skEJLXcapWypXsc6uQQ", (function () {
      return this._choice(this.callExpression, this.newExpression);
    }));
  }),
  postfixExpression: (function () {
    return this.memoize("+egdtu7BYc9qMsOBwGK+dw", (function () {
      var expr;
      return (function () {
        expr = this.leftHandSideExpression();
        return this._choice((function () {
          this._not(this.newline);
          this.stringPatternHandler("++");
          return JSAst.Postfix("++", expr);
        }), (function () {
          this._not(this.newline);
          this.stringPatternHandler("--");
          return JSAst.Postfix("--", expr);
        }), (function () {
          return expr;
        }));
      }).call(this);
    }));
  }),
  unaryExpression: (function () {
    return this.memoize("QUVTnjkr0hBqU/hmTJibxA", (function () {
      var expr, op;
      return this._choice(this.postfixExpression, (function () {
        this.stringPatternHandler("delete");
        expr = this.unaryExpression();
        return JSAst.Delete(expr);
      }), (function () {
        this.stringPatternHandler("void");
        expr = this.unaryExpression();
        return JSAst.Void(expr);
      }), (function () {
        this.stringPatternHandler("typeof");
        expr = this.unaryExpression();
        return JSAst.Typeof(expr);
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
        expr = this.unaryExpression();
        return JSAst.Prefix(op.type, expr);
      }));
    }));
  }),
  multiplicativeExpression: (function () {
    return this.memoize("TMI1O2CMlZyKonV0hHsTEA", (function () {
      var expr, op, rhs;
      return (function () {
        expr = this.unaryExpression();
        this._repeat((function () {
          op = this._choice((function () {
            return this.stringPatternHandler("*");
          }), (function () {
            return this.stringPatternHandler("/");
          }), (function () {
            return this.stringPatternHandler("%");
          }));
          rhs = this.unaryExpression();
          return expr = JSAst.Operator(op.type, expr, rhs);
        }));
        return expr;
      }).call(this);
    }));
  }),
  additiveExpression: (function () {
    return this.memoize("vZLyB4qAAKu6WWc8KVTKtQ", (function () {
      var expr, op, rhs;
      return (function () {
        expr = this.multiplicativeExpression();
        this._repeat((function () {
          op = this._choice((function () {
            return this.stringPatternHandler("+");
          }), (function () {
            return this.stringPatternHandler("-");
          }));
          rhs = this.multiplicativeExpression();
          return expr = JSAst.Operator(op.type, expr, rhs);
        }));
        return expr;
      }).call(this);
    }));
  }),
  shiftExpression: (function () {
    return this.memoize("d57IO6oOuu/MSGL2Ja6ZBQ", (function () {
      var expr, op, rhs;
      return (function () {
        expr = this.additiveExpression();
        this._repeat((function () {
          op = this._choice((function () {
            return this.stringPatternHandler("<<");
          }), (function () {
            return this.stringPatternHandler(">>");
          }), (function () {
            return this.stringPatternHandler(">>>");
          }));
          rhs = this.additiveExpression();
          return expr = JSAst.Operator(op.type, expr, rhs);
        }));
        return expr;
      }).call(this);
    }));
  }),
  inToken: (function (noIn) {
    return (function () {
      this._predicate((function () {
        return !noIn;
      }));
      return this.stringPatternHandler("in");
    }).call(this);
  }),
  relationalExpression: (function (noIn) {
    var expr, op, rhs;
    return (function () {
      expr = this.shiftExpression();
      this._repeat((function () {
        op = this._choice((function () {
          return this.stringPatternHandler("<");
        }), (function () {
          return this.stringPatternHandler(">");
        }), (function () {
          return this.stringPatternHandler("<=");
        }), (function () {
          return this.stringPatternHandler(">=");
        }), (function () {
          return this.stringPatternHandler("instanceof");
        }), (function () {
          return this.inToken(noIn);
        }));
        rhs = this.shiftExpression();
        return expr = JSAst.Operator(op.type, expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  equalityExpression: (function (noIn) {
    var expr, op, rhs;
    return (function () {
      expr = this.relationalExpression(noIn);
      this._repeat((function () {
        op = this._choice((function () {
          return this.stringPatternHandler("==");
        }), (function () {
          return this.stringPatternHandler("!=");
        }), (function () {
          return this.stringPatternHandler("===");
        }), (function () {
          return this.stringPatternHandler("!==");
        }));
        rhs = this.relationalExpression(noIn);
        return expr = JSAst.Operator(op.type, expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  bitwiseAndExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      expr = this.equalityExpression(noIn);
      this._repeat((function () {
        this.stringPatternHandler("&");
        rhs = this.equalityExpression(noIn);
        return expr = JSAst.Operator("&", expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  bitwiseXorExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      expr = this.bitwiseAndExpression(noIn);
      this._repeat((function () {
        this.stringPatternHandler("^");
        rhs = this.bitwiseAndExpression(noIn);
        return expr = JSAst.Operator("^", expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  bitwiseOrExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      expr = this.bitwiseXorExpression(noIn);
      this._repeat((function () {
        this.stringPatternHandler("|");
        rhs = this.bitwiseXorExpression(noIn);
        return expr = JSAst.Operator("|", expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  logicalAndExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      expr = this.bitwiseOrExpression(noIn);
      this._repeat((function () {
        this.stringPatternHandler("&&");
        rhs = this.bitwiseOrExpression(noIn);
        return expr = JSAst.Operator("&&", expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  logicalOrExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      expr = this.logicalAndExpression(noIn);
      this._repeat((function () {
        this.stringPatternHandler("||");
        rhs = this.logicalAndExpression(noIn);
        return expr = JSAst.Operator("||", expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  conditionalExpression: (function (noIn) {
    var cond, trueExpr, falseExpr;
    return (function () {
      cond = this.logicalOrExpression(noIn);
      return this._choice((function () {
        this.stringPatternHandler("?");
        trueExpr = this.assignmentExpression(noIn);
        this.stringPatternHandler(":");
        falseExpr = this.assignmentExpression(noIn);
        return JSAst.Ternary(cond, trueExpr, falseExpr);
      }), (function () {
        return cond;
      }));
    }).call(this);
  }),
  assignmentExpression: (function (noIn) {
    var lhs, rhs, op;
    return this._choice((function () {
      lhs = this.leftHandSideExpression();
      return this._choice((function () {
        this.stringPatternHandler("=");
        rhs = this.assignmentExpression(noIn);
        return JSAst.Assignment(lhs, rhs);
      }), (function () {
        op = this.operatorAssignmentToken();
        rhs = this.assignmentExpression(noIn);
        return JSAst.OperatorAssignment(op, lhs, rhs);
      }));
    }), this.conditionalExpression);
  }),
  operatorAssignmentToken: (function () {
    return this.memoize("1JKZBpik5LQRj6DIYkkulA", (function () {
      var t;
      return (function () {
        t = this.next();
        this._predicate((function () {
          return t.operatorAssignment;
        }));
        return t.operator;
      }).call(this);
    }));
  }),
  expression: (function () {
    return this.memoize("kIBctlPEET3TIP9Q2VevQg", (function () {
      return this.expressionNoInFlag();
    }));
  }),
  expressionNoInFlag: (function (noIn) {
    var exprs;
    return (function () {
      exprs = this.delimited1((function () {
        return this.assignmentExpression(noIn);
      }), (function () {
        return this.stringPatternHandler(",");
      }));
      return this._choice((function () {
        this._predicate((function () {
          return exprs.length === 1;
        }));
        return exprs[0];
      }), (function () {
        return JSAst.Sequence(exprs);
      }));
    }).call(this);
  }),
  statement: (function () {
    return this.memoize("VbcEGpJGOONg7Y4zZLBElg", (function () {
      return this._choice(this.block, this.variableStatement, this.emptyStatement, this.expressionStatement, this.ifStatement, this.doWhileStatement, this.whileStatement, this.forStatement, this.forInStatement, this.continueStatement, this.breakStatement, this.returnStatement, this.withStatement, this.labelledStatement, this.switchStatement, this.throwStatement, this.tryStatement, this.debuggerStatement);
    }));
  }),
  block: (function () {
    return this.memoize("Ty8QtXAXvKG01oaLVTRQyA", (function () {
      var stmts;
      return (function () {
        this.stringPatternHandler("{");
        stmts = this._repeat(this.statement);
        this.stringPatternHandler("}");
        return JSAst.Block(stmts);
      }).call(this);
    }));
  }),
  variableStatement: (function () {
    return this.memoize("RFGf9GELc/+V61vXmgJ+LQ", (function () {
      var lst;
      return (function () {
        this.stringPatternHandler("var");
        lst = this.variableDeclarationList();
        this.stringPatternHandler(";");
        return JSAst.Var(lst);
      }).call(this);
    }));
  }),
  variableDeclarationList: (function (noIn) {
    return this.delimited1((function () {
      return this.variableDeclaration(noIn);
    }), (function () {
      return this.stringPatternHandler(",");
    }));
  }),
  variableDeclaration: (function (noIn) {
    var name, expr;
    return (function () {
      name = this.identifier();
      this._optional((function () {
        this.stringPatternHandler("=");
        return expr = this.assignmentExpression(noIn);
      }));
      return JSAst.VariableDeclaration(name, expr);
    }).call(this);
  }),
  emptyStatement: (function () {
    return this.memoize("GisWy7eeZxenfHVrrAGONw", (function () {
      return (function () {
        this.stringPatternHandler(";");
        return JSAst.Empty();
      }).call(this);
    }));
  }),
  expressionStatement: (function () {
    return this.memoize("bflvsXM7UdSJe1j+OkKmrA", (function () {
      var expr;
      return (function () {
        this._not((function () {
          return this._choice((function () {
            return this.stringPatternHandler("{");
          }), (function () {
            return this.stringPatternHandler("function");
          }));
        }));
        expr = this.expression();
        this.stringPatternHandler(";");
        return JSAst.ExpressionStatement(expr);
      }).call(this);
    }));
  }),
  ifStatement: (function () {
    return this.memoize("Tixz2NEDcRdcEQElhe5B2Q", (function () {
      var cond, trueBranch, falseBranch;
      return (function () {
        this.stringPatternHandler("if");
        this.stringPatternHandler("(");
        cond = this.expression();
        this.stringPatternHandler(")");
        trueBranch = this.statement();
        return this._choice((function () {
          this.stringPatternHandler("else");
          falseBranch = this.statement();
          return JSAst.If(cond, trueBranch, falseBranch);
        }), (function () {
          return JSAst.If(cond, trueBranch, null);
        }));
      }).call(this);
    }));
  }),
  doWhileStatement: (function () {
    return this.memoize("cAdfvQTVnpIPeMZudQ5XNA", (function () {
      var stmt, cond;
      return (function () {
        this.stringPatternHandler("do");
        stmt = this.statement();
        this.stringPatternHandler("while");
        this.stringPatternHandler("(");
        cond = this.expression();
        this.stringPatternHandler(")");
        this.stringPatternHandler(";");
        return JSAst.DoWhile(stmt, cond);
      }).call(this);
    }));
  }),
  whileStatement: (function () {
    return this.memoize("cHF5UIc1JJ1bTmpWzWqhPg", (function () {
      var cond, stmt;
      return (function () {
        this.stringPatternHandler("while");
        this.stringPatternHandler("(");
        cond = this.expression();
        this.stringPatternHandler(")");
        stmt = this.statement();
        return JSAst.While(cond, stmt);
      }).call(this);
    }));
  }),
  forStatement: (function () {
    return this.memoize("nwpMoLSrsggQOVFhamd6Yw", (function () {
      var initExpr, condExpr, incExpr, stmt, declvars;
      return this._choice((function () {
        this.stringPatternHandler("for");
        this.stringPatternHandler("(");
        initExpr = this._optional((function () {
          return this.expressionNoInFlag(true);
        }));
        this.stringPatternHandler(";");
        condExpr = this._optional(this.expression);
        this.stringPatternHandler(";");
        incExpr = this._optional(this.expression);
        this.stringPatternHandler(")");
        stmt = this.statement();
        return JSAst.For(initExpr, condExpr, incExpr, stmt);
      }), (function () {
        this.stringPatternHandler("for");
        this.stringPatternHandler("(");
        this.stringPatternHandler("var");
        declvars = this.variableDeclarationList(true);
        this.stringPatternHandler(";");
        condExpr = this._optional(this.expression);
        this.stringPatternHandler(";");
        incExpr = this._optional(this.expression);
        this.stringPatternHandler(")");
        stmt = this.statement();
        return JSAst.For(JSAst.ForVar(declvars), condExpr, incExpr, stmt);
      }));
    }));
  }),
  forInStatement: (function () {
    return this.memoize("PXoyw71BpQOCvXtnx0/Mxg", (function () {
      var lvalue, subject, stmt, vardecl;
      return this._choice((function () {
        this.stringPatternHandler("for");
        this.stringPatternHandler("(");
        lvalue = this.leftHandSideExpression();
        this.stringPatternHandler("in");
        subject = this.expression();
        this.stringPatternHandler(")");
        stmt = this.statement();
        return JSAst.ForIn(lvalue, subject, stmt);
      }), (function () {
        this.stringPatternHandler("for");
        this.stringPatternHandler("(");
        this.stringPatternHandler("var");
        vardecl = this.variableDeclaration(true);
        this.stringPatternHandler("in");
        subject = this.expression();
        this.stringPatternHandler(")");
        stmt = this.statement();
        return JSAst.ForIn(vardecl, subject, stmt);
      }));
    }));
  }),
  continueStatement: (function () {
    return this.memoize("jw9OPK9Z45SBLMJTGlAMyA", (function () {
      var name;
      return (function () {
        this.stringPatternHandler("continue");
        this._not(this.newline);
        name = this._optional(this.identifier);
        this.stringPatternHandler(";");
        return JSAst.Continue(name);
      }).call(this);
    }));
  }),
  breakStatement: (function () {
    return this.memoize("NMSBWT8xsmBUkpBgkEetKA", (function () {
      var name;
      return (function () {
        this.stringPatternHandler("break");
        this._not(this.newline);
        name = this._optional(this.identifier);
        this.stringPatternHandler(";");
        return JSAst.Break(name);
      }).call(this);
    }));
  }),
  returnStatement: (function () {
    return this.memoize("puRN4+1hdTN4co5lZcT/TA", (function () {
      var expr;
      return (function () {
        this.stringPatternHandler("return");
        this._not(this.newline);
        expr = this._optional(this.expression);
        this.stringPatternHandler(";");
        return JSAst.Return(expr);
      }).call(this);
    }));
  }),
  withStatement: (function () {
    return this.memoize("/W9qzy4blIqi/dkqWRz4lg", (function () {
      var subject, stmt;
      return (function () {
        this.stringPatternHandler("with");
        this.stringPatternHandler("(");
        subject = this.expression();
        this.stringPatternHandler(")");
        stmt = this.statement();
        return JSAst.With(subject, stmt);
      }).call(this);
    }));
  }),
  switchStatement: (function () {
    return this.memoize("UdNUoT4qKIpT0+WzUw8n9g", (function () {
      var subject, cs;
      return (function () {
        this.stringPatternHandler("switch");
        this.stringPatternHandler("(");
        subject = this.expression();
        this.stringPatternHandler(")");
        this.stringPatternHandler("{");
        cs = [
          /* elision */
        ];
        this._repeat((function () {
          return this.caseClause(cs);
        }));
        this._optional((function () {
          this.defaultClause(cs);
          return this._repeat((function () {
            return this.caseClause(cs);
          }));
        }));
        this.stringPatternHandler("}");
        return JSAst.Switch(subject, cs);
      }).call(this);
    }));
  }),
  caseClause: (function (list) {
    var subject, stmts;
    return (function () {
      this.stringPatternHandler("case");
      subject = this.expression();
      this.stringPatternHandler(":");
      stmts = this._repeat(this.statement);
      return list.push(JSAst.CaseClause(subject, stmts));
    }).call(this);
  }),
  defaultClause: (function (ast) {
    var stmts;
    return (function () {
      this.stringPatternHandler("default");
      this.stringPatternHandler(":");
      stmts = this._repeat(this.statement);
      return ast.push(JSAst.DefaultClause(stmts));
    }).call(this);
  }),
  labelledStatement: (function () {
    return this.memoize("2lD1wlLjTI9geFwdW/KpAg", (function () {
      var name, stmt;
      return (function () {
        name = this.identifier();
        this.stringPatternHandler(":");
        stmt = this.statement();
        return JSAst.Label(name, stmt);
      }).call(this);
    }));
  }),
  throwStatement: (function () {
    return this.memoize("uZ8YMzjJMliRvB3t9z4rTg", (function () {
      var expr;
      return (function () {
        this.stringPatternHandler("throw");
        this._not(this.newline);
        expr = this.expression();
        this.stringPatternHandler(";");
        return JSAst.Throw(expr);
      }).call(this);
    }));
  }),
  tryStatement: (function () {
    return this.memoize("Tt3H3U1tKoDxDumdl4uvNw", (function () {
      var blk, c, f;
      return (function () {
        this.stringPatternHandler("try");
        blk = this.block();
        c = this._optional(this.catchClause);
        f = this._optional(this.finallyClause);
        return JSAst.Try(blk, c, f);
      }).call(this);
    }));
  }),
  catchClause: (function () {
    return this.memoize("TAiKhLjMcVeMbVA4jEt/tA", (function () {
      var name, blk;
      return (function () {
        this.stringPatternHandler("catch");
        this.stringPatternHandler("(");
        name = this.identifier();
        this.stringPatternHandler(")");
        blk = this.block();
        return JSAst.Catch(name, blk);
      }).call(this);
    }));
  }),
  finallyClause: (function () {
    return this.memoize("Slbf4sj97BofS7CCKPrUIg", (function () {
      var blk;
      return (function () {
        this.stringPatternHandler("finally");
        blk = this.block();
        return JSAst.Finally(blk);
      }).call(this);
    }));
  }),
  debuggerStatement: (function () {
    return this.memoize("OEdhKOcfaPFtjLx5/nKTjA", (function () {
      return (function () {
        this.stringPatternHandler("debugger");
        this.stringPatternHandler(";");
        return JSAst.Debugger();
      }).call(this);
    }));
  }),
  functionDeclaration: (function () {
    return this.memoize("9T1mBq4YkPi73mfy+064Fw", (function () {
      var name, args, stmts;
      return (function () {
        this.stringPatternHandler("function");
        name = this.identifier();
        args = this.functionArguments();
        this.stringPatternHandler("{");
        stmts = this.functionBody();
        this.stringPatternHandler("}");
        return JSAst.FunctionDeclaration(name, args, stmts);
      }).call(this);
    }));
  }),
  functionExpression: (function () {
    return this.memoize("5eSAfltWMEzdgY4VcRoNSw", (function () {
      var name, args, stmts;
      return (function () {
        this.stringPatternHandler("function");
        name = this._optional(this.identifier);
        args = this.functionArguments();
        this.stringPatternHandler("{");
        stmts = this.functionBody();
        this.stringPatternHandler("}");
        return JSAst.Function(name, args, stmts);
      }).call(this);
    }));
  }),
  functionArguments: (function () {
    return this.memoize("K8c083xO1DEpr4j7h7M8jg", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("(");
        args = this.delimited(this.identifier, (function () {
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
  program: (function () {
    return this.memoize("4Cei0yHDj6xrIrEnW3zXJg", (function () {
      var stmts;
      return (function () {
        stmts = this._repeat(this.sourceElement);
        this.eof();
        return JSAst.Program(stmts);
      }).call(this);
    }));
  }),
  sourceElement: (function () {
    return this.memoize("PZmnCEnnV6ceYYtnr6OlHA", (function () {
      return this._choice(this.statement, this.functionDeclaration);
    }));
  }),
  newline: (function () {
    return this.memoize("WGrvPIUhht+xyEsQs6Bx9Q", (function () {
      var token;
      return this._choice((function () {
        token = this.peekNext();
        return this._predicate((function () {
          return token.precededByNewline;
        }));
      }), this.eof);
    }));
  }),
  identifier: (function () {
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
  identifierName: (function () {
    return this.memoize("Tt+YKNnty4riXq7TAt17wA", (function () {
      var name;
      return (function () {
        name = this.stringPatternHandler("identifier");
        return name.text;
      }).call(this);
    }));
  }),
  nextToken: (function (tag) {
    var token = this.next();
    if (token.is(tag)) {
      return token;
    }
    else if ((token.is("identifier") && !token.namedTokenType) && (token.text === tag)) {
      return token;
    }
    else if ([
      "/",
      "/="
    ].include(tag) && [
      "unknown",
      "regex"
    ].include(token.type)) {
      return this.replaceNext("division");
    }
    else if ((tag === "regex") && [
      "unknown",
      "division"
    ].include(token.type)) {
      return this.replaceNext("regex");
    }
    else {
      this.fail();
    }
  })
});
