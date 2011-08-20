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
    return this.memoize("/S48Ngf9PihVqD03WRSN8g", (function () {
      var name, e;
      return this._choice(this.valueLiteral, (function () {
        this.stringPatternHandler("this");
        return JSAst.This();
      }), (function () {
        name = this.identifier();
        return JSAst.Variable(name);
      }), this.arrayLiteral, this.objectLiteral, (function () {
        (function () {
          this.stringPatternHandler("(");
          e = this.expression();
          return this.stringPatternHandler(")");
        }).call(this);
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
    return this.memoize("g9cdtEjy+QcldNLfnH6yHg", (function () {
      var exprs;
      return (function () {
        (function () {
          this.stringPatternHandler("[");
          exprs = this.delimited(this.arrayElement, (function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler("]");
        }).call(this);
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
    return this.memoize("cDIR/qP9aCb8kiOTG8hKSg", (function () {
      var pdefs;
      return (function () {
        (function () {
          this.stringPatternHandler("{");
          pdefs = this.delimited(this.propertyAssignment, (function () {
            return this.stringPatternHandler(",");
          }));
          this._optional((function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler("}");
        }).call(this);
        return JSAst.Object(pdefs);
      }).call(this);
    }));
  }),
  propertyAssignment: (function () {
    return this.memoize("n1oc/ysuARNqygdVF9Ma9g", (function () {
      var name, expr, body, argname;
      return this._choice((function () {
        (function () {
          name = this.propertyName();
          this.stringPatternHandler(":");
          return expr = this.assignmentExpression();
        }).call(this);
        return JSAst.ValueProperty(name, expr);
      }), (function () {
        (function () {
          this.stringPatternHandler("get");
          name = this.propertyName();
          this.stringPatternHandler("(");
          this.stringPatternHandler(")");
          this.stringPatternHandler("{");
          body = this.functionBody();
          return this.stringPatternHandler("}");
        }).call(this);
        return JSAst.GetProperty(name, body);
      }), (function () {
        (function () {
          this.stringPatternHandler("set");
          name = this.propertyName();
          this.stringPatternHandler("(");
          argname = this.identifier();
          this.stringPatternHandler(")");
          this.stringPatternHandler("{");
          body = this.functionBody();
          return this.stringPatternHandler("}");
        }).call(this);
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
    return this.memoize("mT2A1rRCboeIjiwB11Vayg", (function () {
      var expr, ctor, args;
      return (function () {
        (function () {
          expr = this._choice(this.primaryExpression, this.functionExpression, (function () {
            (function () {
              this.stringPatternHandler("new");
              ctor = this.memberExpression();
              return args = this.arguments();
            }).call(this);
            return JSAst.New(ctor, args);
          }));
          return this._repeat((function () {
            return expr = this.propertyAccessor(expr);
          }));
        }).call(this);
        return expr;
      }).call(this);
    }));
  }),
  newExpression: (function () {
    return this.memoize("wZFjPHNQ9GOTThjxd9m5nw", (function () {
      var ctor;
      return this._choice(this.memberExpression, (function () {
        (function () {
          this.stringPatternHandler("new");
          return ctor = this.newExpression();
        }).call(this);
        return JSAst.New(ctor, [
          /* elision */
        ]);
      }));
    }));
  }),
  propertyAccessor: (function (subject) {
    var expr, name;
    return this._choice((function () {
      (function () {
        this.stringPatternHandler("[");
        expr = this.expression();
        return this.stringPatternHandler("]");
      }).call(this);
      return JSAst.At(subject, expr);
    }), (function () {
      (function () {
        this.stringPatternHandler(".");
        return name = this.identifierName();
      }).call(this);
      return JSAst.Dot(subject, name);
    }));
  }),
  callExpression: (function () {
    return this.memoize("IcduWpTbsXkSD2LzD/iJsg", (function () {
      var expr, args;
      return (function () {
        (function () {
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
          return this._repeat((function () {
            return this._choice((function () {
              args = this.arguments();
              return expr = JSAst.Call(expr, args);
            }), (function () {
              return expr = this.propertyAccessor(expr);
            }));
          }));
        }).call(this);
        return expr;
      }).call(this);
    }));
  }),
  arguments: (function () {
    return this.memoize("Zg0ukm/kPmw64tjOWp56FA", (function () {
      var exprs;
      return (function () {
        (function () {
          this.stringPatternHandler("(");
          exprs = this.delimited(this.assignmentExpression, (function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler(")");
        }).call(this);
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
    return this.memoize("Iudq0pxzNNIvibOSXGwsTA", (function () {
      var expr;
      return (function () {
        expr = this.leftHandSideExpression();
        return this._choice((function () {
          (function () {
            this._not(this.newline);
            return this.stringPatternHandler("++");
          }).call(this);
          return JSAst.Postfix("++", expr);
        }), (function () {
          (function () {
            this._not(this.newline);
            return this.stringPatternHandler("--");
          }).call(this);
          return JSAst.Postfix("--", expr);
        }), (function () {
          return expr;
        }));
      }).call(this);
    }));
  }),
  unaryExpression: (function () {
    return this.memoize("xeTUNNW+jJziYMfAWVB4Kg", (function () {
      var expr, op;
      return this._choice(this.postfixExpression, (function () {
        (function () {
          this.stringPatternHandler("delete");
          return expr = this.unaryExpression();
        }).call(this);
        return JSAst.Delete(expr);
      }), (function () {
        (function () {
          this.stringPatternHandler("void");
          return expr = this.unaryExpression();
        }).call(this);
        return JSAst.Void(expr);
      }), (function () {
        (function () {
          this.stringPatternHandler("typeof");
          return expr = this.unaryExpression();
        }).call(this);
        return JSAst.Typeof(expr);
      }), (function () {
        (function () {
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
          return expr = this.unaryExpression();
        }).call(this);
        return JSAst.Prefix(op.type, expr);
      }));
    }));
  }),
  multiplicativeExpression: (function () {
    return this.memoize("XaE39OxLBykdg4CzQYxQrw", (function () {
      var expr, op, rhs;
      return (function () {
        (function () {
          expr = this.unaryExpression();
          return this._repeat((function () {
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
        }).call(this);
        return expr;
      }).call(this);
    }));
  }),
  additiveExpression: (function () {
    return this.memoize("0vxAHtxM4lc4jZGmENIY2g", (function () {
      var expr, op, rhs;
      return (function () {
        (function () {
          expr = this.multiplicativeExpression();
          return this._repeat((function () {
            op = this._choice((function () {
              return this.stringPatternHandler("+");
            }), (function () {
              return this.stringPatternHandler("-");
            }));
            rhs = this.multiplicativeExpression();
            return expr = JSAst.Operator(op.type, expr, rhs);
          }));
        }).call(this);
        return expr;
      }).call(this);
    }));
  }),
  shiftExpression: (function () {
    return this.memoize("zLkmTGLTPd1ZOhXYlMrdsg", (function () {
      var expr, op, rhs;
      return (function () {
        (function () {
          expr = this.additiveExpression();
          return this._repeat((function () {
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
        }).call(this);
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
      (function () {
        expr = this.shiftExpression();
        return this._repeat((function () {
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
      }).call(this);
      return expr;
    }).call(this);
  }),
  equalityExpression: (function (noIn) {
    var expr, op, rhs;
    return (function () {
      (function () {
        expr = this.relationalExpression(noIn);
        return this._repeat((function () {
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
      }).call(this);
      return expr;
    }).call(this);
  }),
  bitwiseAndExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      (function () {
        expr = this.equalityExpression(noIn);
        return this._repeat((function () {
          this.stringPatternHandler("&");
          rhs = this.equalityExpression(noIn);
          return expr = JSAst.Operator("&", expr, rhs);
        }));
      }).call(this);
      return expr;
    }).call(this);
  }),
  bitwiseXorExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      (function () {
        expr = this.bitwiseAndExpression(noIn);
        return this._repeat((function () {
          this.stringPatternHandler("^");
          rhs = this.bitwiseAndExpression(noIn);
          return expr = JSAst.Operator("^", expr, rhs);
        }));
      }).call(this);
      return expr;
    }).call(this);
  }),
  bitwiseOrExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      (function () {
        expr = this.bitwiseXorExpression(noIn);
        return this._repeat((function () {
          this.stringPatternHandler("|");
          rhs = this.bitwiseXorExpression(noIn);
          return expr = JSAst.Operator("|", expr, rhs);
        }));
      }).call(this);
      return expr;
    }).call(this);
  }),
  logicalAndExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      (function () {
        expr = this.bitwiseOrExpression(noIn);
        return this._repeat((function () {
          this.stringPatternHandler("&&");
          rhs = this.bitwiseOrExpression(noIn);
          return expr = JSAst.Operator("&&", expr, rhs);
        }));
      }).call(this);
      return expr;
    }).call(this);
  }),
  logicalOrExpression: (function (noIn) {
    var expr, rhs;
    return (function () {
      (function () {
        expr = this.logicalAndExpression(noIn);
        return this._repeat((function () {
          this.stringPatternHandler("||");
          rhs = this.logicalAndExpression(noIn);
          return expr = JSAst.Operator("||", expr, rhs);
        }));
      }).call(this);
      return expr;
    }).call(this);
  }),
  conditionalExpression: (function (noIn) {
    var cond, trueExpr, falseExpr;
    return (function () {
      cond = this.logicalOrExpression(noIn);
      return this._choice((function () {
        (function () {
          this.stringPatternHandler("?");
          trueExpr = this.assignmentExpression(noIn);
          this.stringPatternHandler(":");
          return falseExpr = this.assignmentExpression(noIn);
        }).call(this);
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
        (function () {
          this.stringPatternHandler("=");
          return rhs = this.assignmentExpression(noIn);
        }).call(this);
        return JSAst.Assignment(lhs, rhs);
      }), (function () {
        (function () {
          op = this.operatorAssignmentToken();
          return rhs = this.assignmentExpression(noIn);
        }).call(this);
        return JSAst.OperatorAssignment(op, lhs, rhs);
      }));
    }), this.conditionalExpression);
  }),
  operatorAssignmentToken: (function () {
    return this.memoize("uh9VPfJfF0FJLoplSR8t3Q", (function () {
      var t;
      return (function () {
        (function () {
          t = this.next();
          return this._predicate((function () {
            return t.operatorAssignment;
          }));
        }).call(this);
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
    return this.memoize("PfU8wxa2Z5mNptke7Z21QA", (function () {
      var stmts;
      return (function () {
        (function () {
          this.stringPatternHandler("{");
          stmts = this._repeat(this.statement);
          return this.stringPatternHandler("}");
        }).call(this);
        return JSAst.Block(stmts);
      }).call(this);
    }));
  }),
  variableStatement: (function () {
    return this.memoize("sA8A2nQ6MJN1GH2aw/eafQ", (function () {
      var lst;
      return (function () {
        (function () {
          this.stringPatternHandler("var");
          lst = this.variableDeclarationList();
          return this.stringPatternHandler(";");
        }).call(this);
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
      (function () {
        name = this.identifier();
        return this._optional((function () {
          this.stringPatternHandler("=");
          return expr = this.assignmentExpression(noIn);
        }));
      }).call(this);
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
    return this.memoize("UiJafqqaE94TECg2cZ1hFQ", (function () {
      var expr;
      return (function () {
        (function () {
          this._not((function () {
            return this._choice((function () {
              return this.stringPatternHandler("{");
            }), (function () {
              return this.stringPatternHandler("function");
            }));
          }));
          expr = this.expression();
          return this.stringPatternHandler(";");
        }).call(this);
        return JSAst.ExpressionStatement(expr);
      }).call(this);
    }));
  }),
  ifStatement: (function () {
    return this.memoize("Ti2dYhJVkn0+VxtiMndX4g", (function () {
      var cond, trueBranch, falseBranch;
      return (function () {
        this.stringPatternHandler("if");
        this.stringPatternHandler("(");
        cond = this.expression();
        this.stringPatternHandler(")");
        trueBranch = this.statement();
        return this._choice((function () {
          (function () {
            this.stringPatternHandler("else");
            return falseBranch = this.statement();
          }).call(this);
          return JSAst.If(cond, trueBranch, falseBranch);
        }), (function () {
          return JSAst.If(cond, trueBranch, null);
        }));
      }).call(this);
    }));
  }),
  doWhileStatement: (function () {
    return this.memoize("U/uNigkNnGHurT3X01kiBg", (function () {
      var stmt, cond;
      return (function () {
        (function () {
          this.stringPatternHandler("do");
          stmt = this.statement();
          this.stringPatternHandler("while");
          this.stringPatternHandler("(");
          cond = this.expression();
          this.stringPatternHandler(")");
          return this.stringPatternHandler(";");
        }).call(this);
        return JSAst.DoWhile(stmt, cond);
      }).call(this);
    }));
  }),
  whileStatement: (function () {
    return this.memoize("0V2iq3zzx+DdIihh7uks3Q", (function () {
      var cond, stmt;
      return (function () {
        (function () {
          this.stringPatternHandler("while");
          this.stringPatternHandler("(");
          cond = this.expression();
          this.stringPatternHandler(")");
          return stmt = this.statement();
        }).call(this);
        return JSAst.While(cond, stmt);
      }).call(this);
    }));
  }),
  forStatement: (function () {
    return this.memoize("S4WCJjcZRTxlJyWcpnf2fw", (function () {
      var initExpr, condExpr, incExpr, stmt, declvars;
      return this._choice((function () {
        (function () {
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
          return stmt = this.statement();
        }).call(this);
        return JSAst.For(initExpr, condExpr, incExpr, stmt);
      }), (function () {
        (function () {
          this.stringPatternHandler("for");
          this.stringPatternHandler("(");
          this.stringPatternHandler("var");
          declvars = this.variableDeclarationList(true);
          this.stringPatternHandler(";");
          condExpr = this._optional(this.expression);
          this.stringPatternHandler(";");
          incExpr = this._optional(this.expression);
          this.stringPatternHandler(")");
          return stmt = this.statement();
        }).call(this);
        return JSAst.For(Ast.ForVar(declvars), condExpr, incExpr, stmt);
      }));
    }));
  }),
  forInStatement: (function () {
    return this.memoize("Pk1uUC1GXfd9fBXuQ+u+qw", (function () {
      var lvalue, subject, stmt, vardecl;
      return this._choice((function () {
        (function () {
          this.stringPatternHandler("for");
          this.stringPatternHandler("(");
          lvalue = this.leftHandSideExpression();
          this.stringPatternHandler("in");
          subject = this.expression();
          this.stringPatternHandler(")");
          return stmt = this.statement();
        }).call(this);
        return JSAst.ForIn(lvalue, subject, stmt);
      }), (function () {
        (function () {
          this.stringPatternHandler("for");
          this.stringPatternHandler("(");
          this.stringPatternHandler("var");
          vardecl = this.variableDeclaration(true);
          this.stringPatternHandler("in");
          subject = this.expression();
          this.stringPatternHandler(")");
          return stmt = this.statement();
        }).call(this);
        return JSAst.ForIn(vardecl, subject, stmt);
      }));
    }));
  }),
  continueStatement: (function () {
    return this.memoize("eaKHj6k7+HstmsBfoZCW5A", (function () {
      var name;
      return (function () {
        (function () {
          this.stringPatternHandler("continue");
          this._not(this.newline);
          name = this._optional(this.identifier);
          return this.stringPatternHandler(";");
        }).call(this);
        return JSAst.Continue(name);
      }).call(this);
    }));
  }),
  breakStatement: (function () {
    return this.memoize("KRgjU6k0BEuTSzsO67w03A", (function () {
      var name;
      return (function () {
        (function () {
          this.stringPatternHandler("break");
          this._not(this.newline);
          name = this._optional(this.identifier);
          return this.stringPatternHandler(";");
        }).call(this);
        return JSAst.Break(name);
      }).call(this);
    }));
  }),
  returnStatement: (function () {
    return this.memoize("L6fIGPIG0h6QBmxRX+9kpA", (function () {
      var expr;
      return (function () {
        (function () {
          this.stringPatternHandler("return");
          this._not(this.newline);
          expr = this._optional(this.expression);
          return this.stringPatternHandler(";");
        }).call(this);
        return JSAst.Return(expr);
      }).call(this);
    }));
  }),
  withStatement: (function () {
    return this.memoize("jFI1FpIEFKjDKieTH5uD1A", (function () {
      var subject, stmt;
      return (function () {
        (function () {
          this.stringPatternHandler("with");
          this.stringPatternHandler("(");
          subject = this.expression();
          this.stringPatternHandler(")");
          return stmt = this.statement();
        }).call(this);
        return JSAst.With(subject, stmt);
      }).call(this);
    }));
  }),
  switchStatement: (function () {
    return this.memoize("cB88qd0iB14c3wWUrZlT3w", (function () {
      var subject, cs;
      return (function () {
        (function () {
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
          return this.stringPatternHandler("}");
        }).call(this);
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
    return this.memoize("Wa3PLEdHGNjQ3tAB54WpMg", (function () {
      var name, stmt;
      return (function () {
        (function () {
          name = this.identifier();
          this.stringPatternHandler(":");
          return stmt = this.statement();
        }).call(this);
        return JSAst.Label(name, stmt);
      }).call(this);
    }));
  }),
  throwStatement: (function () {
    return this.memoize("KZjNBwVqb2HfIWnKifJffw", (function () {
      var expr;
      return (function () {
        (function () {
          this.stringPatternHandler("throw");
          this._not(this.newline);
          expr = this.expression();
          return this.stringPatternHandler(";");
        }).call(this);
        return JSAst.Throw(expr);
      }).call(this);
    }));
  }),
  tryStatement: (function () {
    return this.memoize("1SnkyomHxdRY+HfWqt4XAA", (function () {
      var blk, c, f;
      return (function () {
        (function () {
          this.stringPatternHandler("try");
          blk = this.block();
          c = this._optional(this.catchClause);
          return f = this._optional(this.finallyClause);
        }).call(this);
        return JSAst.Try(blk, c, f);
      }).call(this);
    }));
  }),
  catchClause: (function () {
    return this.memoize("OQfRqp+SqXncj2UrYB20Ug", (function () {
      var name, blk;
      return (function () {
        (function () {
          this.stringPatternHandler("catch");
          this.stringPatternHandler("(");
          name = this.identifier();
          this.stringPatternHandler(")");
          return blk = this.block();
        }).call(this);
        return JSAst.Catch(name, blk);
      }).call(this);
    }));
  }),
  finallyClause: (function () {
    return this.memoize("J8wI6ZK5HK5RIsRl9IrPSA", (function () {
      var blk;
      return (function () {
        (function () {
          this.stringPatternHandler("finally");
          return blk = this.block();
        }).call(this);
        return JSAst.Finally(blk);
      }).call(this);
    }));
  }),
  debuggerStatement: (function () {
    return this.memoize("w1nuwtCtvkdfhWybQRce5A", (function () {
      return (function () {
        (function () {
          this.stringPatternHandler("debugger");
          return this.stringPatternHandler(";");
        }).call(this);
        return JSAst.Debugger();
      }).call(this);
    }));
  }),
  functionDeclaration: (function () {
    return this.memoize("MoEI49G8sYXQ0viQIIFXrQ", (function () {
      var name, args, stmts;
      return (function () {
        (function () {
          this.stringPatternHandler("function");
          name = this.identifier();
          args = this.functionArguments();
          this.stringPatternHandler("{");
          stmts = this.functionBody();
          return this.stringPatternHandler("}");
        }).call(this);
        return JSAst.FunctionDeclaration(name, args, stmts);
      }).call(this);
    }));
  }),
  functionExpression: (function () {
    return this.memoize("ayaw1NvW2JsDIUtC10ktYQ", (function () {
      var name, args, stmts;
      return (function () {
        (function () {
          this.stringPatternHandler("function");
          name = this._optional(this.identifier);
          args = this.functionArguments();
          this.stringPatternHandler("{");
          stmts = this.functionBody();
          return this.stringPatternHandler("}");
        }).call(this);
        return JSAst.Function(name, args, stmts);
      }).call(this);
    }));
  }),
  functionArguments: (function () {
    return this.memoize("qrcEBYDzlFN3FVg5rvyLyA", (function () {
      var args;
      return (function () {
        (function () {
          this.stringPatternHandler("(");
          args = this.delimited(this.identifier, (function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler(")");
        }).call(this);
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
    return this.memoize("8B/NEMz2JtDJhTqKxmFIfA", (function () {
      var stmts;
      return (function () {
        (function () {
          stmts = this._repeat(this.sourceElement);
          return this.eof();
        }).call(this);
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
    return this.memoize("Vz/ZL0VD/uKa7iXYJdlsqQ", (function () {
      var name;
      return (function () {
        (function () {
          name = this.stringPatternHandler("identifier");
          return this._predicate((function () {
            return !name.reserved;
          }));
        }).call(this);
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
