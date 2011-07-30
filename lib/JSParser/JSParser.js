"use strict";
var TokenParser = ((require)("../Runtime")).TokenParser;
var Ast = ((require)("../Runtime")).Ast;
var JSLexer = (require)("./JSLexer");
var JSParser = ((module).exports = (Class).new(TokenParser, {}, {
  DefaultLexer: JSLexer,
  primaryExpression: (function () {
    return (this)._memoize("unnamed_Gm37EOM/VduP0InmDjAhpQ", (function () {
      var token, e;
      return (this)._choice((function () {
        (this).stringPatternHandler("this");
        return (Ast)("This");
      }), (function () {
        (token = (this).stringPatternHandler("identifier"));
        return (Ast)("VariableLookup", {
          name: (token).value
        });
      }), (this).valueLiteral, (this).arrayLiteral, (this).objectLiteral, (function () {
        (this).stringPatternHandler("(");
        (e = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        return e;
      }));
    }));
  }),
  valueLiteral: (function () {
    return (this)._memoize("unnamed_YBuyY//GXKiD919WA0nFMw", (function () {
      var token;
      return ((function () {
        (token = (this)._choice((function () {
          return (this).stringPatternHandler("null");
        }), (function () {
          return (this).stringPatternHandler("boolean");
        }), (function () {
          return (this).stringPatternHandler("number");
        }), (function () {
          return (this).stringPatternHandler("string");
        }), (function () {
          return (this).stringPatternHandler("regex");
        })));
        return (Ast)("ValueLiteral", {
          value: (token).value
        });
      })).call(this);
    }));
  }),
  arrayLiteral: (function () {
    return (this)._memoize("unnamed_A2hydKF/umaKimziP4gjNQ", (function () {
      var exprs;
      return ((function () {
        (this).stringPatternHandler("[");
        (exprs = ((this).delimited).call(this, (this).arrayElement, (function () {
          return (this).stringPatternHandler(",");
        })));
        (this).stringPatternHandler("]");
        return (((Ast)("ArrayLiteral")).concat)(exprs);
      })).call(this);
    }));
  }),
  arrayElement: (function () {
    return (this)._memoize("unnamed_eu2bm0+a19kdjt/chkKACw", (function () {
      return (this)._choice((this).assignmentExpression, (function () {
        return (Ast)("Elision");
      }));
    }));
  }),
  objectLiteral: (function () {
    return (this)._memoize("unnamed_0X8ial2joGT6Voazl1Nmhw", (function () {
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
        return (((Ast)("ObjectLiteral")).concat)(pdefs);
      })).call(this);
    }));
  }),
  propertyAssignment: (function () {
    return (this)._memoize("unnamed_VtD/bDNnSiPxBEY76ahfVQ", (function () {
      var name, expr, body, arg;
      return (this)._choice((function () {
        (name = ((this).propertyName).call(this));
        (this).stringPatternHandler(":");
        (expr = ((this).assignmentExpression).call(this));
        return (Ast)("ValuePropertyDeclaration", {
          name: name
        }, expr);
      }), (function () {
        (this).stringPatternHandler("get");
        (name = ((this).propertyName).call(this));
        (this).stringPatternHandler("(");
        (this).stringPatternHandler(")");
        (this).stringPatternHandler("{");
        (body = ((this).functionBody).call(this));
        (this).stringPatternHandler("}");
        return (((Ast)("GetPropertyDeclaration", {
          name: name
        })).concat)(body);
      }), (function () {
        (this).stringPatternHandler("set");
        (name = ((this).propertyName).call(this));
        (this).stringPatternHandler("(");
        (arg = (this).stringPatternHandler("identifier"));
        (this).stringPatternHandler(")");
        (this).stringPatternHandler("{");
        (body = ((this).functionBody).call(this));
        (this).stringPatternHandler("}");
        return (((Ast)("SetPropertyDeclaration", {
          name: name,
          argumentName: (arg).value
        })).concat)(body);
      }));
    }));
  }),
  propertyName: (function () {
    return (this)._memoize("unnamed_sjSDvqimdk+a7ws2J7XLMQ", (function () {
      var token;
      return (this)._choice((function () {
        (token = (this).stringPatternHandler("identifierName"));
        return (token).identifierName;
      }), (function () {
        (this).stringPatternHandler("string");
        return (token).value;
      }), (function () {
        (this).stringPatternHandler("number");
        return (token).value;
      }));
    }));
  }),
  memberExpression: (function () {
    return (this)._memoize("unnamed_gDF74qCGuBx3osqyr64/gQ", (function () {
      var expr, ctor, args;
      return ((function () {
        (expr = (this)._choice((this).primaryExpression, (this).functionExpression, (function () {
          (this).stringPatternHandler("new");
          (ctor = ((this).memberExpression).call(this));
          (args = ((this).arguments).call(this));
          return (((Ast)("New", {}, ctor)).concat)(args);
        })));
        (this)._repeat((function () {
          return (expr = ((this).propertyAccessor).call(this, expr));
        }));
        return expr;
      })).call(this);
    }));
  }),
  newExpression: (function () {
    return (this)._memoize("unnamed_Zo7H+9YugH91041Qa8ftuQ", (function () {
      var ctor;
      return (this)._choice((this).memberExpression, (function () {
        (this).stringPatternHandler("new");
        (ctor = ((this).newExpression).call(this));
        return (Ast)("New", {}, ctor);
      }));
    }));
  }),
  propertyAccessor: (function (subject) {
    var expr, t;
    return (this)._choice((function () {
      (this).stringPatternHandler("[");
      (expr = ((this).expression).call(this));
      (this).stringPatternHandler("]");
      return (Ast)("PropertyLookup", {}, subject, expr);
    }), (function () {
      (this).stringPatternHandler(".");
      (t = (this).stringPatternHandler("identifierName"));
      return (Ast)("DotPropertyLookup", {
        name: (t).identifierName
      }, subject);
    }));
  }),
  callExpression: (function () {
    return (this)._memoize("unnamed_zWg/niXOEXhL2hJhcPu1wQ", (function () {
      var expr, args;
      return ((function () {
        (expr = ((this).memberExpression).call(this));
        (args = ((this).arguments).call(this));
        (this)._choice((function () {
          (this)._predicate((function () {
            return (expr).is("DotPropertyLookup");
          }));
          return (expr = (((Ast)("CallProperty", {
            name: (expr).name
          }, ((expr).children)[0])).concat)(args));
        }), (function () {
          return (expr = (((Ast)("Call", {}, expr)).concat)(args));
        }));
        (this)._repeat((function () {
          return (this)._choice((function () {
            (args = ((this).arguments).call(this));
            return (expr = (((Ast)("Call", {}, expr)).concat)(args));
          }), (function () {
            return (expr = ((this).propertyAccessor).call(this, expr));
          }));
        }));
        return expr;
      })).call(this);
    }));
  }),
  arguments: (function () {
    return (this)._memoize("unnamed_XGAM1ayrc7TO7KO2pU5XlA", (function () {
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
    return (this)._memoize("unnamed_zmBRLfHzoeQsW8H/aBgvHw", (function () {
      return (this)._choice((this).callExpression, (this).newExpression);
    }));
  }),
  postfixExpression: (function () {
    return (this)._memoize("unnamed_zKXryyheepulS6yTdhGJgw", (function () {
      var expr;
      return ((function () {
        (expr = ((this).leftHandSideExpression).call(this));
        return (this)._choice((function () {
          (this)._not((this).newline);
          (this).stringPatternHandler("++");
          return (Ast)("PostfixIncrement", {
            sign: +(1)
          }, expr);
        }), (function () {
          (this)._not((this).newline);
          (this).stringPatternHandler("--");
          return (Ast)("PostfixIncrement", {
            sign: -(1)
          }, expr);
        }), (function () {
          return expr;
        }));
      })).call(this);
    }));
  }),
  unaryExpression: (function () {
    return (this)._memoize("unnamed_3PwEAD1zX5VYs8zDgkKVpA", (function () {
      var expr, op;
      return (this)._choice((this).postfixExpression, (function () {
        (this).stringPatternHandler("delete");
        (expr = ((this).unaryExpression).call(this));
        return (Ast)("Delete", {}, expr);
      }), (function () {
        (this).stringPatternHandler("void");
        (expr = ((this).unaryExpression).call(this));
        return (Ast)("Void", {}, expr);
      }), (function () {
        (this).stringPatternHandler("typeof");
        (expr = ((this).unaryExpression).call(this));
        return (Ast)("TypeOf", {}, expr);
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
        return (Ast)("UnaryOperator", {
          name: (op).type
        }, expr);
      }));
    }));
  }),
  multiplicativeExpression: (function () {
    return (this)._memoize("unnamed_qL2ntieAhyThB9Z1WugMRA", (function () {
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
          return (expr = (Ast)("Operator", {
            name: (op).type
          }, expr, rhs));
        }));
        return expr;
      })).call(this);
    }));
  }),
  additiveExpression: (function () {
    return (this)._memoize("unnamed_/YuMnmUB+YsgDdK3XuKMdg", (function () {
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
          return (expr = (Ast)("Operator", {
            name: (op).type
          }, expr, rhs));
        }));
        return expr;
      })).call(this);
    }));
  }),
  shiftExpression: (function () {
    return (this)._memoize("unnamed_+w8XDbv7QML6pKjgjUyRvg", (function () {
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
          return (expr = (Ast)("Operator", {
            name: (op).type
          }, expr, rhs));
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
        return (expr = (Ast)("Operator", {
          name: (op).type
        }, expr, rhs));
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
        return (expr = (Ast)("Operator", {
          name: (op).type
        }, expr, rhs));
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
        return (expr = (Ast)("Operator", {
          name: "&"
        }, expr, rhs));
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
        return (expr = (Ast)("Operator", {
          name: "^"
        }, expr, rhs));
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
        return (expr = (Ast)("Operator", {
          name: "|"
        }, expr, rhs));
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
        return (expr = (Ast)("Operator", {
          name: "&&"
        }, expr, rhs));
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
        return (expr = (Ast)("Operator", {
          name: "||"
        }, expr, rhs));
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
        return (Ast)("ConditionalExpression", {}, cond, trueExpr, falseExpr);
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
        return (Ast)("Assignment", {}, lhs, rhs);
      }), (function () {
        (op = (this).stringPatternHandler("assignmentOperator"));
        (rhs = ((this).assignmentExpression).call(this, noIn));
        return (Ast)("OperatorAssignment", {
          operator: (op).opname
        }, lhs, rhs);
      }));
    }), (this).conditionalExpression);
  }),
  expression: (function (noIn) {
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
        return (((Ast)("ExpressionSequence")).concat)(exprs);
      }));
    })).call(this);
  }),
  statement: (function (noIn) {
    return (this)._choice((this).block, (this).variableStatement, (this).emptyStatement, (this).expressionStatement, (this).ifStatement, (this).iterationStatement, (this).continueStatement, (this).breakStatement, (this).returnStatement, (this).withStatement, (this).labelledStatement, (this).switchStatement, (this).throwStatement, (this).tryStatement, (this).debuggerStatement);
  }),
  block: (function () {
    return (this)._memoize("unnamed_62bKtV/JHo5CQx6OFRz6Xw", (function () {
      var stmts;
      return ((function () {
        (this).stringPatternHandler("{");
        (stmts = (this)._repeat((this).statement));
        (this).stringPatternHandler("}");
        return (((Ast)("Block")).concat)(stmts);
      })).call(this);
    }));
  }),
  variableStatement: (function () {
    return (this)._memoize("unnamed_qit1kDwudxqRVyvw93cw6w", (function () {
      var lst;
      return ((function () {
        (this).stringPatternHandler("var");
        (lst = ((this).variableDeclarationList).call(this));
        (this).stringPatternHandler(";");
        return lst;
      })).call(this);
    }));
  }),
  variableDeclarationList: (function (noIn) {
    var lst;
    return ((function () {
      (lst = ((this).delimited1).call(this, (function () {
        return ((this).variableDeclaration).call(this, noIn);
      }), (function () {
        return (this).stringPatternHandler(",");
      })));
      return (((Ast)("VariableDeclarationList")).concat)(lst);
    })).call(this);
  }),
  variableDeclaration: (function (noIn) {
    var name, expr;
    return ((function () {
      (name = (this).stringPatternHandler("identifier"));
      return (this)._choice((function () {
        (this).stringPatternHandler("=");
        (expr = ((this).assignmentExpression).call(this, noIn));
        return (Ast)("VariableDeclaration", {
          name: (name).value
        }, expr);
      }), (function () {
        return (Ast)("VariableDeclaration", {
          name: (name).value
        });
      }));
    })).call(this);
  }),
  emptyStatement: (function () {
    return (this)._memoize("unnamed_la8/rI2JHwxXC0/YmOfXRA", (function () {
      return ((function () {
        (this).stringPatternHandler(";");
        return (Ast)("EmptyStatement");
      })).call(this);
    }));
  }),
  expressionStatement: (function () {
    return (this)._memoize("unnamed_8V+jOf7bLDymPqqtAGIPUw", (function () {
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
        return (Ast)("ExpressionStatement", {}, expr);
      })).call(this);
    }));
  }),
  ifStatement: (function () {
    return (this)._memoize("unnamed_c9Q4FcAfry6xnucFnEMFbw", (function () {
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
          return (Ast)("If", {}, cond, trueBranch, falseBranch);
        }), (function () {
          return (Ast)("If", {}, cond, trueBranch);
        }));
      })).call(this);
    }));
  }),
  iterationStatement: (function () {
    return (this)._memoize("unnamed_qcXA4VEv9AFpBZEiaLAw6w", (function () {
      var stmt, cond, initExpr, condExpr, incExpr, lvalue, subject, vardecl;
      return (this)._choice((function () {
        (this).stringPatternHandler("do");
        (stmt = ((this).statement).call(this));
        (this).stringPatternHandler("while");
        (this).stringPatternHandler("(");
        (cond = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (this).stringPatternHandler(";");
        return (Ast)("DoWhile", {}, cond, stmt);
      }), (function () {
        (this).stringPatternHandler("while");
        (this).stringPatternHandler("(");
        (cond = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (Ast)("While", {}, cond, stmt);
      }), (function () {
        (this).stringPatternHandler("for");
        (this).stringPatternHandler("(");
        (initExpr = (this)._optional((function () {
          return ((this).expression).call(this, true);
        })));
        (this).stringPatternHandler(";");
        (condExpr = (this)._optional((this).expression));
        (this).stringPatternHandler(";");
        (incExpr = (this)._optional((this).expression));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (Ast)("For", {}, initExpr, condExpr, incExpr, stmt);
      }), (function () {
        (this).stringPatternHandler("for");
        (this).stringPatternHandler("(");
        (this).stringPatternHandler("var");
        (initExpr = ((this).variableDeclarationList).call(this, true));
        (this).stringPatternHandler(";");
        (condExpr = (this)._optional((this).expression));
        (this).stringPatternHandler(";");
        (incExpr = (this)._optional((this).expression));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (Ast)("For", {}, initExpr, condExpr, incExpr, stmt);
      }), (function () {
        (this).stringPatternHandler("for");
        (this).stringPatternHandler("(");
        (lvalue = ((this).leftHandSideExpression).call(this));
        (this).stringPatternHandler("in");
        (subject = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (Ast)("ForIn", {}, lvalue, subject, stmt);
      }), (function () {
        (this).stringPatternHandler("for");
        (this).stringPatternHandler("(");
        (this).stringPatternHandler("var");
        (vardecl = ((this).variableDeclaration).call(this, true));
        (this).stringPatternHandler("in");
        (subject = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (Ast)("ForIn", {}, vardecl, subject, stmt);
      }));
    }));
  }),
  continueStatement: (function () {
    return (this)._memoize("unnamed_qcsHNCoRdLpFnhuKIml5gQ", (function () {
      var name;
      return ((function () {
        (this).stringPatternHandler("continue");
        (this)._not((this).newline);
        (name = (this)._optional((function () {
          return (this).stringPatternHandler("identifier");
        })));
        (this).stringPatternHandler(";");
        return (Ast)("Continue", {
          label: (name ? (name).value : null)
        });
      })).call(this);
    }));
  }),
  breakStatement: (function () {
    return (this)._memoize("unnamed_qvy/EWbhEWvdWTgndnKYPQ", (function () {
      var name;
      return ((function () {
        (this).stringPatternHandler("break");
        (this)._not((this).newline);
        (name = (this)._optional((function () {
          return (this).stringPatternHandler("identifier");
        })));
        (this).stringPatternHandler(";");
        return (Ast)("Break", {
          label: (name ? (name).value : null)
        });
      })).call(this);
    }));
  }),
  returnStatement: (function () {
    return (this)._memoize("unnamed_JqYq8m8BqARHDrxTKUxFUA", (function () {
      var expr;
      return ((function () {
        (this).stringPatternHandler("return");
        (this)._not((this).newline);
        return (this)._choice((function () {
          (expr = ((this).expression).call(this));
          (this).stringPatternHandler(";");
          return (Ast)("Return", {}, expr);
        }), (function () {
          (this).stringPatternHandler(";");
          return (Ast)("Return");
        }));
      })).call(this);
    }));
  }),
  withStatement: (function () {
    return (this)._memoize("unnamed_8W4nFu/nP55WmFsFKSyLxg", (function () {
      var subject, stmt;
      return ((function () {
        (this).stringPatternHandler("with");
        (this).stringPatternHandler("(");
        (subject = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (stmt = ((this).statement).call(this));
        return (Ast)("With", {}, subject, stmt);
      })).call(this);
    }));
  }),
  switchStatement: (function () {
    return (this)._memoize("unnamed_U0rUTeRpVN4zzcv5Z/3+Fg", (function () {
      var subject, ast;
      return ((function () {
        (this).stringPatternHandler("switch");
        (this).stringPatternHandler("(");
        (subject = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        (this).stringPatternHandler("{");
        (ast = (Ast)("Switch"));
        (this)._repeat((function () {
          return ((this).caseClause).call(this, ast);
        }));
        (this)._optional((function () {
          ((this).defaultClause).call(this, ast);
          return (this)._repeat((function () {
            return ((this).caseClause).call(this, ast);
          }));
        }));
        (this).stringPatternHandler("}");
        return ast;
      })).call(this);
    }));
  }),
  caseClause: (function (ast) {
    var cmp, stmts;
    return ((function () {
      (this).stringPatternHandler("case");
      (cmp = ((this).expression).call(this));
      (this).stringPatternHandler(":");
      (stmts = (this)._repeat((this).statement));
      return (ast).push((((Ast)("CaseClause", {}, cmp)).concat)(stmts));
    })).call(this);
  }),
  defaultClause: (function (ast) {
    var stmts;
    return ((function () {
      (this).stringPatternHandler("default");
      (this).stringPatternHandler(":");
      (stmts = (this)._repeat((this).statement));
      return (ast).push((((Ast)("DefaultClause")).concat)(stmts));
    })).call(this);
  }),
  labelledStatement: (function () {
    return (this)._memoize("unnamed_2gIRedSnAz5GbSQ38DoSbw", (function () {
      var name, stmt;
      return ((function () {
        (name = (this).stringPatternHandler("identifier"));
        (this).stringPatternHandler(":");
        (stmt = ((this).statement).call(this));
        return (Ast)("Label", {
          name: (name).value
        }, stmt);
      })).call(this);
    }));
  }),
  throwStatement: (function () {
    return (this)._memoize("unnamed_pBv4TZlo2LHVLXggAPqhZQ", (function () {
      var expr;
      return ((function () {
        (this).stringPatternHandler("throw");
        (this)._not((this).newline);
        (expr = ((this).expression).call(this));
        (this).stringPatternHandler(";");
        return (Ast)("Throw", {}, expr);
      })).call(this);
    }));
  }),
  tryStatement: (function () {
    return (this)._memoize("unnamed_bZEgiwRpR+4yck+/7n0nNw", (function () {
      var blk, c, f;
      return (this)._choice((function () {
        (this).stringPatternHandler("try");
        (blk = ((this).block).call(this));
        (c = ((this).catchClause).call(this));
        return (Ast)("Try", {}, blk, c);
      }), (function () {
        (this).stringPatternHandler("try");
        (blk = ((this).block).call(this));
        (f = ((this).finallyClause).call(this));
        return (Ast)("Try", {}, blk, null, f);
      }), (function () {
        (this).stringPatternHandler("try");
        (blk = ((this).block).call(this));
        (c = ((this).catchClause).call(this));
        (f = ((this).finallyClause).call(this));
        return (Ast)("Try", {}, blk, c, f);
      }));
    }));
  }),
  catchClause: (function () {
    return (this)._memoize("unnamed_U8XLS1Qeby+LxEx8WRo+VQ", (function () {
      var name, blk;
      return ((function () {
        (this).stringPatternHandler("catch");
        (this).stringPatternHandler("(");
        (name = (this).stringPatternHandler("identifier"));
        (this).stringPatternHandler(")");
        (blk = ((this).block).call(this));
        return (Ast)("Catch", {
          name: (name).value
        }, blk);
      })).call(this);
    }));
  }),
  finallyClause: (function () {
    return (this)._memoize("unnamed_YJBLrzArwapbuVaZsgV7Xw", (function () {
      var blk;
      return ((function () {
        (this).stringPatternHandler("finally");
        (blk = ((this).block).call(this));
        return blk;
      })).call(this);
    }));
  }),
  debuggerStatement: (function () {
    return (this)._memoize("unnamed_l0fesizDiODd1DtQ68XmDA", (function () {
      return ((function () {
        (this).stringPatternHandler("debugger");
        (this).stringPatternHandler(";");
        return (Ast)("Debugger");
      })).call(this);
    }));
  }),
  functionDeclaration: (function () {
    return (this)._memoize("unnamed_Gig9ywX67lbDddLOUGmdyg", (function () {
      var name, args, stmts;
      return ((function () {
        (this).stringPatternHandler("function");
        (name = (this).stringPatternHandler("identifier"));
        (this).stringPatternHandler("(");
        (args = ((this).delimited).call(this, (function () {
          return (this).stringPatternHandler("identifier");
        }), (function () {
          return (this).stringPatternHandler(",");
        })));
        (this).stringPatternHandler(")");
        (this).stringPatternHandler("{");
        (stmts = ((this).functionBody).call(this));
        (this).stringPatternHandler("}");
        (args = (args).map((function (elem) {
          return (elem).value;
        })));
        return (((Ast)("FunctionDeclaration", {
          name: (name).value,
          argumentNames: args
        })).concat)(stmts);
      })).call(this);
    }));
  }),
  functionExpression: (function () {
    return (this)._memoize("unnamed_q4Lo5EJPLv784fnl8379ag", (function () {
      var name, args, stmts;
      return ((function () {
        (this).stringPatternHandler("function");
        (name = (this)._optional((function () {
          return (this).stringPatternHandler("identifier");
        })));
        (this).stringPatternHandler("(");
        (args = ((this).delimited).call(this, (function () {
          return (this).stringPatternHandler("identifier");
        }), (function () {
          return (this).stringPatternHandler(",");
        })));
        (this).stringPatternHandler(")");
        (this).stringPatternHandler("{");
        (stmts = ((this).functionBody).call(this));
        (this).stringPatternHandler("}");
        (name = (name ? (name).value : null));
        (args = (args).map((function (elem) {
          return (elem).value;
        })));
        return (((Ast)("FunctionExpression", {
          name: name,
          argumentNames: args
        })).concat)(stmts);
      })).call(this);
    }));
  }),
  functionBody: (function () {
    return (this)._memoize("unnamed_xxWOErNkgW+IlUvY0BXCRw", (function () {
      return (this)._repeat((this).sourceElement);
    }));
  }),
  program: (function () {
    return (this)._memoize("unnamed_z8e9y853rzEVdWXItxcHMg", (function () {
      var stmts;
      return ((function () {
        (stmts = (this)._repeat((this).sourceElement));
        ((this).eof).call(this);
        return (((Ast)("Program")).concat)(stmts);
      })).call(this);
    }));
  }),
  sourceElement: (function () {
    return (this)._memoize("unnamed_jcPvJOqCexHNh24Vs5SkUA", (function () {
      return (this)._choice((this).statement, (this).functionDeclaration);
    }));
  }),
  newline: (function () {
    return (this)._memoize("unnamed_ZfbyYQozU7zmC1f2zenXHw", (function () {
      var token;
      return (this)._choice((function () {
        (this)._lookahead((function () {
          return (token = ((this).anything).call(this));
        }));
        return (this)._predicate((function () {
          return (token).precededByNewline;
        }));
      }), (this).eof);
    }));
  }),
  getNextToken: (function (tag) {
    var token;
    if (((tag === "/") || (tag === "/="))) {
      (token = (this)._readReplacing([
        "unknown",
        "regex"
      ], "division"));
    } else if ((tag === "regex")) {
      (token = (this)._readReplacing([
        "unknown",
        "division"
      ], "regex"));
    } else {
      (token = (this)._read());
    }
    if ((token).is(tag)) {
      return token;
    } else {
      (this).fail();
    }
  })
}));