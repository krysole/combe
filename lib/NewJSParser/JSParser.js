"use strict";
var TokenParser = (require)("./TokenParser");
var JSLexer = (require)("./JSLexer");
var JSAst = (require)("./JSAst");
var JSParser = ((module).exports = (Class).new(TokenParser, {
  parseProgram: (function (string) {
    return (this).parse(string, "program");
  }),
  parseExpression: (function (string) {
    return (this).parse(string, "expression");
  }),
  parseStatement: (function (string) {
    return (this).parse(string, "statement");
  }),
  parseSourceElement: (function (string) {
    return (this).parse(string, "sourceElement");
  }),
  parse: (function (string, ruleName) {
    var args = (((Array).prototype).slice).call(arguments, 1);
    var parser = (this).new((JSLexer).new(string));
    var result = ((parser).match).apply(parser, ([
      ruleName
    ]).concat(args));
    if (!(result)) {
      if (((parser).tokens).last) {
        (console).log(("  *JSParser Failed: Last token seen was " + ((parser).tokens).last));
      } else {
        (console).log("  *JSParser Failed: No tokens parsed");
      }
    }
    return result;
  })
}, {
  primaryExpression: (function () {
    return (this).memoize("unnamed_dLC+f68hhMz1YSWZr5vBAQ", (function () {
      var name, e;
      return (this)._choice((this).valueLiteral, (function () {
        (this).stringPatternHandler("this");
        return (JSAst).This();
      }), (function () {
        (name = ((this).identifier).call(this));
        return (JSAst).Variable(name);
      }), (this).arrayLiteral, (this).objectLiteral, (function () {
        (this).stringPatternHandler("(");
        (e = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        return e;
      }));
    }));
  }),
  valueLiteral: (function () {
    return (this).memoize("unnamed_8taO20LPf6bNAZrsjwNFyg", (function () {
      var v, n, s, r;
      return ((function () {
        (v = (this)._choice((function () {
          (this).stringPatternHandler("null");
          return null;
        }), (function () {
          (this).stringPatternHandler("true");
          return true;
        }), (function () {
          (this).stringPatternHandler("false");
          return false;
        }), (function () {
          (n = (this).stringPatternHandler("number"));
          return (n).value;
        }), (function () {
          (s = (this).stringPatternHandler("string"));
          return (s).value;
        }), (function () {
          (r = (this).stringPatternHandler("regex"));
          return (r).value;
        })));
        return (JSAst).Literal(v);
      })).call(this);
    }));
  }),
  arrayLiteral: (function () {
    return (this).memoize("unnamed_ACnAkug3fPpaIMQ5aGYsdA", (function () {
      var exprs;
      return ((function () {
        (this).stringPatternHandler("[");
        (exprs = ((this).delimited).call(this, (this).arrayElement, (function () {
          return (this).stringPatternHandler(",");
        })));
        (this).stringPatternHandler("]");
        return (JSAst).Array(exprs);
      })).call(this);
    }));
  }),
  arrayElement: (function () {
    return (this).memoize("unnamed_tUHwlVE+qEYC18oSUL2Mjg", (function () {
      return (this)._choice((this).assignmentExpression, (function () {
        return (JSAst).Elision();
      }));
    }));
  }),
  objectLiteral: (function () {
    return (this).memoize("unnamed_U0OPoxAYtoWp3v49ooy9DA", (function () {
      var pdefs;
      return ((function () {
        (this).stringPatternHandler("{");
        (pdefs = ((this).delimited).call(this, (this).propertyAssignment, (function () {
          return (this).stringPatternHandler(",");
        })));
        (this)._optional((function () {
          return (this).stringPatternHandler(",");
        }));
        (this).stringPatternHandler("}");
        return (JSAst).Object(pdefs);
      })).call(this);
    }));
  }),
  propertyAssignment: (function () {
    return (this).memoize("unnamed_drB0NQmNH9eau94zLEp5Pg", (function () {
      var name, expr, body, argname;
      return (this)._choice((function () {
        (name = ((this).propertyName).call(this));
        (this).stringPatternHandler(":");
        (expr = ((this).assignmentExpression).call(this));
        return (JSAst).ValueProperty(name, expr);
      }), (function () {
        (this).stringPatternHandler("get");
        (name = ((this).propertyName).call(this));
        (this).stringPatternHandler("(");
        (this).stringPatternHandler(")");
        (this).stringPatternHandler("{");
        (body = ((this).functionBody).call(this));
        (this).stringPatternHandler("}");
        return (JSAst).GetProperty(name, body);
      }), (function () {
        (this).stringPatternHandler("set");
        (name = ((this).propertyName).call(this));
        (this).stringPatternHandler("(");
        (argname = ((this).identifier).call(this));
        (this).stringPatternHandler(")");
        (this).stringPatternHandler("{");
        (body = ((this).functionBody).call(this));
        (this).stringPatternHandler("}");
        return (JSAst).SetProperty(name, argname, body);
      }));
    }));
  }),
  propertyName: (function () {
    return (this).memoize("unnamed_pciarmA+Es1JWWGVLTcUcg", (function () {
      return (this)._choice((this).identifierName, (function () {
        (this).stringPatternHandler("string");
        return (token).value;
      }), (function () {
        (this).stringPatternHandler("number");
        return (token).value;
      }));
    }));
  }),
  memberExpression: (function () {
    return (this).memoize("unnamed_X/OWlTcc6O9uhy8Xb1fNDw", (function () {
      var expr, ctor, args;
      return ((function () {
        (expr = (this)._choice((this).primaryExpression, (this).functionExpression, (function () {
          (this).stringPatternHandler("new");
          (ctor = ((this).memberExpression).call(this));
          (args = ((this).arguments).call(this));
          return (JSAst).New(ctor, args);
        })));
        (this)._repeat((function () {
          return (expr = ((this).propertyAccessor).call(this, expr));
        }));
        return expr;
      })).call(this);
    }));
  }),
  newExpression: (function () {
    return (this).memoize("unnamed_B/Jx6o8RQuAXNZ9ddeRWcQ", (function () {
      var ctor;
      return (this)._choice((this).memberExpression, (function () {
        (this).stringPatternHandler("new");
        (ctor = ((this).newExpression).call(this));
        return (JSAst).New(ctor, [
          
        ]);
      }));
    }));
  }),
  propertyAccessor: (function (subject) {
    var expr, name;
    return (this)._choice((function () {
      (this).stringPatternHandler("[");
      (expr = ((this).expression).call(this));
      (this).stringPatternHandler("]");
      return (JSAst).At(subject, expr);
    }), (function () {
      (this).stringPatternHandler(".");
      (name = ((this).identifierName).call(this));
      return (JSAst).Dot(subject, name);
    }));
  }),
  callExpression: (function () {
    return (this).memoize("unnamed_ysk+QiFB/ceuUu8GmjQnSQ", (function () {
      var expr, args;
      return ((function () {
        (expr = ((this).memberExpression).call(this));
        (args = ((this).arguments).call(this));
        (this)._choice((function () {
          (this)._predicate((function () {
            return (expr).is("Dot");
          }));
          return (expr = (JSAst).CallMethod((expr).receiver, (expr).name, args));
        }), (function () {
          return (expr = (JSAst).Call(expr, args));
        }));
        (this)._repeat((function () {
          return (this)._choice((function () {
            (args = ((this).arguments).call(this));
            return (expr = (JSAst).Call(expr, args));
          }), (function () {
            return (expr = ((this).propertyAccessor).call(this, expr));
          }));
        }));
        return expr;
      })).call(this);
    }));
  }),
  arguments: (function () {
    return (this).memoize("unnamed_XGAM1ayrc7TO7KO2pU5XlA", (function () {
      var exprs;
      return ((function () {
        (this).stringPatternHandler("(");
        (exprs = ((this).delimited).call(this, (this).assignmentExpression, (function () {
          return (this).stringPatternHandler(",");
        })));
        (this).stringPatternHandler(")");
        return exprs;
      })).call(this);
    }));
  }),
  leftHandSideExpression: (function () {
    return (this).memoize("unnamed_zmBRLfHzoeQsW8H/aBgvHw", (function () {
      return (this)._choice((this).callExpression, (this).newExpression);
    }));
  }),
  postfixExpression: (function () {
    return (this).memoize("unnamed_SGcpFPvrUD2AXlYpLSREFg", (function () {
      var expr;
      return ((function () {
        (expr = ((this).leftHandSideExpression).call(this));
        return (this)._choice((function () {
          (this)._not((this).newline);
          (this).stringPatternHandler("++");
          return (JSAst).Postfix("++", expr);
        }), (function () {
          (this)._not((this).newline);
          (this).stringPatternHandler("--");
          return (JSAst).Postfix("--", expr);
        }), (function () {
          return expr;
        }));
      })).call(this);
    }));
  }),
  unaryExpression: (function () {
    return (this).memoize("unnamed_PoQCC8SBz7CboHSbFP7Tkw", (function () {
      var expr, op;
      return (this)._choice((this).postfixExpression, (function () {
        (this).stringPatternHandler("delete");
        (expr = ((this).unaryExpression).call(this));
        return (JSAst).Delete(expr);
      }), (function () {
        (this).stringPatternHandler("void");
        (expr = ((this).unaryExpression).call(this));
        return (JSAst).Void(expr);
      }), (function () {
        (this).stringPatternHandler("typeof");
        (expr = ((this).unaryExpression).call(this));
        return (JSAst).Typeof(expr);
      }), (function () {
        (op = (this)._choice((function () {
          return (this).stringPatternHandler("++");
        }), (function () {
          return (this).stringPatternHandler("--");
        }), (function () {
          return (this).stringPatternHandler("+");
        }), (function () {
          return (this).stringPatternHandler("-");
        }), (function () {
          return (this).stringPatternHandler("~");
        }), (function () {
          return (this).stringPatternHandler("!");
        })));
        (expr = ((this).unaryExpression).call(this));
        return (JSAst).Prefix((op).type, expr);
      }));
    }));
  }),
  multiplicativeExpression: (function () {
    return (this).memoize("unnamed_HwrtTDAUCqBIdse7TYc0Tg", (function () {
      var expr, op, rhs;
      return ((function () {
        (expr = ((this).unaryExpression).call(this));
        (this)._repeat((function () {
          (op = (this)._choice((function () {
            return (this).stringPatternHandler("*");
          }), (function () {
            return (this).stringPatternHandler("/");
          }), (function () {
            return (this).stringPatternHandler("%");
          })));
          (rhs = ((this).unaryExpression).call(this));
          return (expr = (JSAst).Operator((op).type, expr, rhs));
        }));
        return expr;
      })).call(this);
    }));
  }),
  additiveExpression: (function () {
    return (this).memoize("unnamed_QzxbRtKYe67nxCoZNMoMZA", (function () {
      var expr, op, rhs;
      return ((function () {
        (expr = ((this).multiplicativeExpression).call(this));
        (this)._repeat((function () {
          (op = (this)._choice((function () {
            return (this).stringPatternHandler("+");
          }), (function () {
            return (this).stringPatternHandler("-");
          })));
          (rhs = ((this).multiplicativeExpression).call(this));
          return (expr = (JSAst).Operator((op).type, expr, rhs));
        }));
        return expr;
      })).call(this);
    }));
  }),
  shiftExpression: (function () {
    return (this).memoize("unnamed_6f6kIyG5sSsMV0/AIaye6g", (function () {
      var expr, op, rhs;
      return ((function () {
        (expr = ((this).additiveExpression).call(this));
        (this)._repeat((function () {
          (op = (this)._choice((function () {
            return (this).stringPatternHandler("<<");
          }), (function () {
            return (this).stringPatternHandler(">>");
          }), (function () {
            return (this).stringPatternHandler(">>>");
          })));
          (rhs = ((this).additiveExpression).call(this));
          return (expr = (JSAst).Operator((op).type, expr, rhs));
        }));
        return expr;
      })).call(this);
    }));
  }),
  inToken: (function (noIn) {
    return ((function () {
      (this)._predicate((function () {
        return !(noIn);
      }));
      return (this).stringPatternHandler("in");
    })).call(this);
  }),
  relationalExpression: (function (noIn) {
    var expr, op, rhs;
    return ((function () {
      (expr = ((this).shiftExpression).call(this));
      (this)._repeat((function () {
        (op = (this)._choice((function () {
          return (this).stringPatternHandler("<");
        }), (function () {
          return (this).stringPatternHandler(">");
        }), (function () {
          return (this).stringPatternHandler("<=");
        }), (function () {
          return (this).stringPatternHandler(">=");
        }), (function () {
          return (this).stringPatternHandler("instanceof");
        }), (function () {
          return ((this).inToken).call(this, noIn);
        })));
        (rhs = ((this).shiftExpression).call(this));
        return (expr = (JSAst).Operator((op).type, expr, rhs));
      }));
      return expr;
    })).call(this);
  }),
  equalityExpression: (function (noIn) {
    var expr, op, rhs;
    return ((function () {
      (expr = ((this).relationalExpression).call(this, noIn));
      (this)._repeat((function () {
        (op = (this)._choice((function () {
          return (this).stringPatternHandler("==");
        }), (function () {
          return (this).stringPatternHandler("!=");
        }), (function () {
          return (this).stringPatternHandler("===");
        }), (function () {
          return (this).stringPatternHandler("!==");
        })));
        (rhs = ((this).relationalExpression).call(this, noIn));
        return (expr = (JSAst).Operator((op).type, expr, rhs));
      }));
      return expr;
    })).call(this);
  }),
  bitwiseAndExpression: (function (noIn) {
    var expr, rhs;
    return ((function () {
      (expr = ((this).equalityExpression).call(this, noIn));
      (this)._repeat((function () {
        (this).stringPatternHandler("&");
        (rhs = ((this).equalityExpression).call(this, noIn));
        return (expr = (JSAst).Operator("&", expr, rhs));
      }));
      return expr;
    })).call(this);
  }),
  bitwiseXorExpression: (function (noIn) {
    var expr, rhs;
    return ((function () {
      (expr = ((this).bitwiseAndExpression).call(this, noIn));
      (this)._repeat((function () {
        (this).stringPatternHandler("^");
        (rhs = ((this).bitwiseAndExpression).call(this, noIn));
        return (expr = (JSAst).Operator("^", expr, rhs));
      }));
      return expr;
    })).call(this);
  }),
  bitwiseOrExpression: (function (noIn) {
    var expr, rhs;
    return ((function () {
      (expr = ((this).bitwiseXorExpression).call(this, noIn));
      (this)._repeat((function () {
        (this).stringPatternHandler("|");
        (rhs = ((this).bitwiseXorExpression).call(this, noIn));
        return (expr = (JSAst).Operator("|", expr, rhs));
      }));
      return expr;
    })).call(this);
  }),
  logicalAndExpression: (function (noIn) {
    var expr, rhs;
    return ((function () {
      (expr = ((this).bitwiseOrExpression).call(this, noIn));
      (this)._repeat((function () {
        (this).stringPatternHandler("&&");
        (rhs = ((this).bitwiseOrExpression).call(this, noIn));
        return (expr = (JSAst).Operator("&&", expr, rhs));
      }));
      return expr;
    })).call(this);
  }),
  logicalOrExpression: (function (noIn) {
    var expr, rhs;
    return ((function () {
      (expr = ((this).logicalAndExpression).call(this, noIn));
      (this)._repeat((function () {
        (this).stringPatternHandler("||");
        (rhs = ((this).logicalAndExpression).call(this, noIn));
        return (expr = (JSAst).Operator("||", expr, rhs));
      }));
      return expr;
    })).call(this);
  }),
  conditionalExpression: (function (noIn) {
    var cond, trueExpr, falseExpr;
    return ((function () {
      (cond = ((this).logicalOrExpression).call(this, noIn));
      return (this)._choice((function () {
        (this).stringPatternHandler("?");
        (trueExpr = ((this).assignmentExpression).call(this, noIn));
        (this).stringPatternHandler(":");
        (falseExpr = ((this).assignmentExpression).call(this, noIn));
        return (JSAst).Ternary(cond, trueExpr, falseExpr);
      }), (function () {
        return cond;
      }));
    })).call(this);
  }),
  assignmentExpression: (function (noIn) {
    var lhs, rhs, op;
    return (this)._choice((function () {
      (lhs = ((this).leftHandSideExpression).call(this));
      return (this)._choice((function () {
        (this).stringPatternHandler("=");
        (rhs = ((this).assignmentExpression).call(this, noIn));
        return (JSAst).Assignment(lhs, rhs);
      }), (function () {
        (op = ((this).operatorAssignmentToken).call(this));
        (rhs = ((this).assignmentExpression).call(this, noIn));
        return (JSAst).OperatorAssignment(op, lhs, rhs);
      }));
    }), (this).conditionalExpression);
  }),
  operatorAssignmentToken: (function () {
    return (this).memoize("unnamed_oQvq+zj+vCuNyZ5LDiDZCA", (function () {
      var t;
      return ((function () {
        (t = ((this).next).call(this));
        (this)._predicate((function () {
          return (t).operatorAssignment;
        }));
        return (t).operator;
      })).call(this);
    }));
  }),
  expression: (function () {
    return (this).memoize("unnamed_W+Zy6NjwrGFzS69Ysu1JCA", (function () {
      return ((this).expressionNoInFlag).call(this);
    }));
  }),
  expressionNoInFlag: (function (noIn) {
    var exprs;
    return ((function () {
      (exprs = ((this).delimited1).call(this, (function () {
        return ((this).assignmentExpression).call(this, noIn);
      }), (function () {
        return (this).stringPatternHandler(",");
      })));
      return (this)._choice((function () {
        (this)._predicate((function () {
          return ((exprs).length === 1);
        }));
        return (exprs)[0];
      }), (function () {
        return (JSAst).Sequence(exprs);
      }));
    })).call(this);
  }),
  statement: (function () {
    return (this).memoize("unnamed_wmDcQyaVhcNBkrQAwI+FHw", (function () {
      return (this)._choice((this).block, (this).variableStatement, (this).emptyStatement, (this).expressionStatement, (this).ifStatement, (this).doWhileStatement, (this).whileStatement, (this).forStatement, (this).forInStatement, (this).continueStatement, (this).breakStatement, (this).returnStatement, (this).withStatement, (this).labelledStatement, (this).switchStatement, (this).throwStatement, (this).tryStatement, (this).debuggerStatement);
    }));
  }),
  block: (function () {
    return (this).memoize("unnamed_bYYIe56inAlovY0ZNQwQsg", (function () {
      var stmts;
      return ((function () {
        (this).stringPatternHandler("{");
        (stmts = (this)._repeat((this).statement));
        (this).stringPatternHandler("}");
        return (JSAst).Block(stmts);
      })).call(this);
    }));
  }),
  variableStatement: (function () {
    return (this).memoize("unnamed_gMqVuR41dxjnvn6AWB6FWA", (function () {
      var lst;
      return ((function () {
        (this).stringPatternHandler("var");
        (lst = ((this).variableDeclarationList).call(this));
        (this).stringPatternHandler(";");
        return (JSAst).Var(lst);
      })).call(this);
    }));
  }),
  variableDeclarationList: (function (noIn) {
    return ((this).delimited1).call(this, (function () {
      return ((this).variableDeclaration).call(this, noIn);
    }), (function () {
      return (this).stringPatternHandler(",");
    }));
  }),
  variableDeclaration: (function (noIn) {
    var name, expr;
    return ((function () {
      (name = ((this).identifier).call(this));
      (this)._optional((function () {
        (this).stringPatternHandler("=");
        return (expr = ((this).assignmentExpression).call(this, noIn));
      }));
      return (JSAst).VariableDeclaration(name, expr);
    })).call(this);
  }),
  emptyStatement: (function () {
    return (this).memoize("unnamed_tfad6NCpdGkpjx1akVG4Og", (function () {
      return ((function () {
        (this).stringPatternHandler(";");
        return (JSAst).Empty();
      })).call(this);
    }));
  }),
  expressionStatement: (function () {
    return (this).memoize("unnamed_SYQULn+NH5VAH4XhRYSrWA", (function () {
      var expr;
      return ((function () {
        (this)._not((function () {
          return (this)._choice((function () {
            return (this).stringPatternHandler("{");
          }), (function () {
            return (this).stringPatternHandler("function");
          }));
        }));
        (expr = ((this).expression).call(this));
        (this).stringPatternHandler(";");
        return (JSAst).ExpressionStatement(expr);
      })).call(this);
    }));
  }),
  ifStatement: (function () {
    return (this).memoize("unnamed_s7TcGtiY2naBOERc+8XOhA", (function () {
      var cond, trueBranch, falseBranch;
      return ((function () {
        (this).stringPatternHandler("if");
        (this).stringPatternHandler("(");
        (cond = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (trueBranch = ((this).statement).call(this));
        return (this)._choice((function () {
          (this).stringPatternHandler("else");
          (falseBranch = ((this).statement).call(this));
          return (JSAst).If(cond, trueBranch, falseBranch);
        }), (function () {
          return (JSAst).If(cond, trueBranch, null);
        }));
      })).call(this);
    }));
  }),
  doWhileStatement: (function () {
    return (this).memoize("unnamed_2crtcJbpYi3sCcDM6Bvw9g", (function () {
      var stmt, cond;
      return ((function () {
        (this).stringPatternHandler("do");
        (stmt = ((this).statement).call(this));
        (this).stringPatternHandler("while");
        (this).stringPatternHandler("(");
        (cond = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (this).stringPatternHandler(";");
        return (JSAst).DoWhile(stmt, cond);
      })).call(this);
    }));
  }),
  whileStatement: (function () {
    return (this).memoize("unnamed_XAfF0OOfE/KmD0fMRt+9DQ", (function () {
      var cond, stmt;
      return ((function () {
        (this).stringPatternHandler("while");
        (this).stringPatternHandler("(");
        (cond = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (JSAst).While(cond, stmt);
      })).call(this);
    }));
  }),
  forStatement: (function () {
    return (this).memoize("unnamed_+0TSi6LwpRtx2DKBeuyhgQ", (function () {
      var initExpr, condExpr, incExpr, stmt, declvars;
      return (this)._choice((function () {
        (this).stringPatternHandler("for");
        (this).stringPatternHandler("(");
        (initExpr = (this)._optional((function () {
          return ((this).expressionNoInFlag).call(this, true);
        })));
        (this).stringPatternHandler(";");
        (condExpr = (this)._optional((this).expression));
        (this).stringPatternHandler(";");
        (incExpr = (this)._optional((this).expression));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (JSAst).For(initExpr, condExpr, incExpr, stmt);
      }), (function () {
        (this).stringPatternHandler("for");
        (this).stringPatternHandler("(");
        (this).stringPatternHandler("var");
        (declvars = ((this).variableDeclarationList).call(this, true));
        (this).stringPatternHandler(";");
        (condExpr = (this)._optional((this).expression));
        (this).stringPatternHandler(";");
        (incExpr = (this)._optional((this).expression));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (JSAst).For((Ast).ForVar(declvars), condExpr, incExpr, stmt);
      }));
    }));
  }),
  forInStatement: (function () {
    return (this).memoize("unnamed_DPcnfbuHzwR2RPRpiHLa4w", (function () {
      var lvalue, subject, stmt, vardecl;
      return (this)._choice((function () {
        (this).stringPatternHandler("for");
        (this).stringPatternHandler("(");
        (lvalue = ((this).leftHandSideExpression).call(this));
        (this).stringPatternHandler("in");
        (subject = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (JSAst).ForIn(lvalue, subject, stmt);
      }), (function () {
        (this).stringPatternHandler("for");
        (this).stringPatternHandler("(");
        (this).stringPatternHandler("var");
        (vardecl = ((this).variableDeclaration).call(this, true));
        (this).stringPatternHandler("in");
        (subject = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (JSAst).ForIn(vardecl, subject, stmt);
      }));
    }));
  }),
  continueStatement: (function () {
    return (this).memoize("unnamed_myfyvOhs0fhzN0MJMQpM1A", (function () {
      var name;
      return ((function () {
        (this).stringPatternHandler("continue");
        (this)._not((this).newline);
        (name = (this)._optional((this).identifier));
        (this).stringPatternHandler(";");
        return (JSAst).Continue(name);
      })).call(this);
    }));
  }),
  breakStatement: (function () {
    return (this).memoize("unnamed_+zxcgn8Dd3ZFvvnhYBKl/w", (function () {
      var name;
      return ((function () {
        (this).stringPatternHandler("break");
        (this)._not((this).newline);
        (name = (this)._optional((this).identifier));
        (this).stringPatternHandler(";");
        return (JSAst).Break(name);
      })).call(this);
    }));
  }),
  returnStatement: (function () {
    return (this).memoize("unnamed_VS19ogKDP9T5ZRoDZ7P70w", (function () {
      var expr;
      return ((function () {
        (this).stringPatternHandler("return");
        (this)._not((this).newline);
        (expr = (this)._optional((this).expression));
        (this).stringPatternHandler(";");
        return (JSAst).Return(expr);
      })).call(this);
    }));
  }),
  withStatement: (function () {
    return (this).memoize("unnamed_g07llT/zyyLJsjjzDK+EGQ", (function () {
      var subject, stmt;
      return ((function () {
        (this).stringPatternHandler("with");
        (this).stringPatternHandler("(");
        (subject = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (JSAst).With(subject, stmt);
      })).call(this);
    }));
  }),
  switchStatement: (function () {
    return (this).memoize("unnamed_aEdcb9/FiSwzrwCCkhXS4g", (function () {
      var subject, cs;
      return ((function () {
        (this).stringPatternHandler("switch");
        (this).stringPatternHandler("(");
        (subject = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (this).stringPatternHandler("{");
        (cs = [
          
        ]);
        (this)._repeat((function () {
          return ((this).caseClause).call(this, cs);
        }));
        (this)._optional((function () {
          ((this).defaultClause).call(this, cs);
          return (this)._repeat((function () {
            return ((this).caseClause).call(this, cs);
          }));
        }));
        (this).stringPatternHandler("}");
        return (JSAst).Switch(subject, cs);
      })).call(this);
    }));
  }),
  caseClause: (function (list) {
    var subject, stmts;
    return ((function () {
      (this).stringPatternHandler("case");
      (subject = ((this).expression).call(this));
      (this).stringPatternHandler(":");
      (stmts = (this)._repeat((this).statement));
      return (list).push((JSAst).CaseClause(subject, stmts));
    })).call(this);
  }),
  defaultClause: (function (ast) {
    var stmts;
    return ((function () {
      (this).stringPatternHandler("default");
      (this).stringPatternHandler(":");
      (stmts = (this)._repeat((this).statement));
      return (ast).push((JSAst).DefaultClause(stmts));
    })).call(this);
  }),
  labelledStatement: (function () {
    return (this).memoize("unnamed_zIc94Jc82Vc5zv5c3pdmGw", (function () {
      var name, stmt;
      return ((function () {
        (name = ((this).identifier).call(this));
        (this).stringPatternHandler(":");
        (stmt = ((this).statement).call(this));
        return (JSAst).Label(name, stmt);
      })).call(this);
    }));
  }),
  throwStatement: (function () {
    return (this).memoize("unnamed_dwhFO9AgBnfCSDFqsGL9Yw", (function () {
      var expr;
      return ((function () {
        (this).stringPatternHandler("throw");
        (this)._not((this).newline);
        (expr = ((this).expression).call(this));
        (this).stringPatternHandler(";");
        return (JSAst).Throw(expr);
      })).call(this);
    }));
  }),
  tryStatement: (function () {
    return (this).memoize("unnamed_NhObwa1WJtc712wK8uoEkQ", (function () {
      var blk, c, f;
      return ((function () {
        (this).stringPatternHandler("try");
        (blk = ((this).block).call(this));
        (c = (this)._optional((this).catchClause));
        (f = (this)._optional((this).finallyClause));
        return (JSAst).Try(blk, c, f);
      })).call(this);
    }));
  }),
  catchClause: (function () {
    return (this).memoize("unnamed_jrQdBU09/KGvfFMzxeOFfA", (function () {
      var name, blk;
      return ((function () {
        (this).stringPatternHandler("catch");
        (this).stringPatternHandler("(");
        (name = ((this).identifier).call(this));
        (this).stringPatternHandler(")");
        (blk = ((this).block).call(this));
        return (JSAst).Catch(name, blk);
      })).call(this);
    }));
  }),
  finallyClause: (function () {
    return (this).memoize("unnamed_kPVdJZAoEdN5JwolPgG0mw", (function () {
      var blk;
      return ((function () {
        (this).stringPatternHandler("finally");
        (blk = ((this).block).call(this));
        return (JSAst).Finally(blk);
      })).call(this);
    }));
  }),
  debuggerStatement: (function () {
    return (this).memoize("unnamed_yACN8ZXZoy2bcalEdgzJqQ", (function () {
      return ((function () {
        (this).stringPatternHandler("debugger");
        (this).stringPatternHandler(";");
        return (JSAst).Debugger();
      })).call(this);
    }));
  }),
  functionDeclaration: (function () {
    return (this).memoize("unnamed_jEw7lcGZa5kvurdUwbK5BA", (function () {
      var name, args, stmts;
      return ((function () {
        (this).stringPatternHandler("function");
        (name = ((this).identifier).call(this));
        (args = ((this).functionArguments).call(this));
        (this).stringPatternHandler("{");
        (stmts = ((this).functionBody).call(this));
        (this).stringPatternHandler("}");
        return (JSAst).FunctionDeclaration(name, args, stmts);
      })).call(this);
    }));
  }),
  functionExpression: (function () {
    return (this).memoize("unnamed_Ng+laXNvZr3/ez2RRpPOZg", (function () {
      var name, args, stmts;
      return ((function () {
        (this).stringPatternHandler("function");
        (name = (this)._optional((this).identifier));
        (args = ((this).functionArguments).call(this));
        (this).stringPatternHandler("{");
        (stmts = ((this).functionBody).call(this));
        (this).stringPatternHandler("}");
        return (JSAst).Function(name, args, stmts);
      })).call(this);
    }));
  }),
  functionArguments: (function () {
    return (this).memoize("unnamed_CB0nfkFwE8bVHTE1m3jsvw", (function () {
      var args;
      return ((function () {
        (this).stringPatternHandler("(");
        (args = ((this).delimited).call(this, (this).identifier, (function () {
          return (this).stringPatternHandler(",");
        })));
        (this).stringPatternHandler(")");
        return args;
      })).call(this);
    }));
  }),
  functionBody: (function () {
    return (this).memoize("unnamed_xxWOErNkgW+IlUvY0BXCRw", (function () {
      return (this)._repeat((this).sourceElement);
    }));
  }),
  program: (function () {
    return (this).memoize("unnamed_f39e6w7h3gve4K3OzON8Dg", (function () {
      var stmts;
      return ((function () {
        (stmts = (this)._repeat((this).sourceElement));
        ((this).eof).call(this);
        return (JSAst).Program(stmts);
      })).call(this);
    }));
  }),
  sourceElement: (function () {
    return (this).memoize("unnamed_jcPvJOqCexHNh24Vs5SkUA", (function () {
      return (this)._choice((this).statement, (this).functionDeclaration);
    }));
  }),
  newline: (function () {
    return (this).memoize("unnamed_BSPm2Zu91MiYYuuTwwge4w", (function () {
      var token;
      return (this)._choice((function () {
        (token = ((this).peekNext).call(this));
        return (this)._predicate((function () {
          return (token).precededByNewline;
        }));
      }), (this).eof);
    }));
  }),
  identifier: (function () {
    return (this).memoize("unnamed_v+jQ4Lm+2QY5u7SN07P/Tg", (function () {
      var name;
      return ((function () {
        (name = (this).stringPatternHandler("identifier"));
        (this)._predicate((function () {
          return !((name).reserved);
        }));
        return (name).text;
      })).call(this);
    }));
  }),
  identifierName: (function () {
    return (this).memoize("unnamed_I1htwUT2mKLImXQB+9p3TQ", (function () {
      var name;
      return ((function () {
        (name = (this).stringPatternHandler("identifier"));
        return (name).text;
      })).call(this);
    }));
  }),
  nextToken: (function (tag) {
    var token = (this).next();
    if ((token).is(tag)) {
      return token;
    } else if ((((token).is("identifier") && !((token).namedTokenType)) && ((token).text === tag))) {
      return token;
    } else if ((([
      "/",
      "/="
    ]).include(tag) && ([
      "unknown",
      "regex"
    ]).include((token).type))) {
      return (this).replaceNext("division");
    } else if (((tag === "regex") && ([
      "unknown",
      "division"
    ]).include((token).type))) {
      return (this).replaceNext("regex");
    } else {
      (this).fail();
    }
  })
}));