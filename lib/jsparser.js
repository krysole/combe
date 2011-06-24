var TokenParser = (require)("./token_parser");
var Ast = (require)("./ast");
var JSLexer = (require)("./jslexer");
var JSParser = ((module).exports = ((function () {
  var JSParser = (__combejs__Class).create(TokenParser, {
    DefaultLexer: {
      value: JSLexer,
      writable: true,
      enumerable: true,
      configurable: true
    },
    primaryExpression: {
      value: (function () {
        var token, e;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("this");
          }), (function () {
            return (Ast)("This");
          }));
        }), (function () {
          return (this)._concat((function () {
            return (token = (this).stringPatternHandler("identifier"));
          }), (function () {
            return (Ast)("VariableLookup", {
              name: (token).value
            });
          }));
        }), (this).valueLiteral, (this).arrayLiteral, (this).objectLiteral, (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (e = ((this).expression).call(this));
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return e;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    valueLiteral: {
      value: (function () {
        var token;
        return (this)._concat((function () {
          return (token = (this)._choice((function () {
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
        }), (function () {
          return (Ast)("ValueLiteral", {
            value: (token).value
          });
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    arrayLiteral: {
      value: (function () {
        var exprs;
        return (this)._concat((function () {
          return (this).stringPatternHandler("[");
        }), (function () {
          return (exprs = ((this).delimited).call(this, (this).arrayElement, (function () {
            return (this).stringPatternHandler(",");
          })));
        }), (function () {
          return (this).stringPatternHandler("]");
        }), (function () {
          return (((Ast)("ArrayLiteral")).concat)(exprs);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    arrayElement: {
      value: (function () {
        return (this)._choice((this).assignmentExpression, (function () {
          return (Ast)("Elision");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    objectLiteral: {
      value: (function () {
        var pdefs;
        return (this)._concat((function () {
          return (this).stringPatternHandler("{");
        }), (function () {
          return (pdefs = ((this).delimited).call(this, (this).propertyAssignment, (function () {
            return (this).stringPatternHandler(",");
          })));
        }), (function () {
          return (this)._optional((function () {
            return (this).stringPatternHandler(",");
          }));
        }), (function () {
          return (this).stringPatternHandler("}");
        }), (function () {
          return (((Ast)("ObjectLiteral")).concat)(pdefs);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    propertyAssignment: {
      value: (function () {
        var name, expr, body, arg;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (name = ((this).propertyName).call(this));
          }), (function () {
            return (this).stringPatternHandler(":");
          }), (function () {
            return (expr = ((this).assignmentExpression).call(this));
          }), (function () {
            return (Ast)("ValuePropertyDeclaration", {
              name: name
            }, expr);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("get");
          }), (function () {
            return (name = ((this).propertyName).call(this));
          }), (function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return (this).stringPatternHandler("{");
          }), (function () {
            return (body = ((this).functionBody).call(this));
          }), (function () {
            return (this).stringPatternHandler("}");
          }), (function () {
            return (((Ast)("GetPropertyDeclaration", {
              name: name
            })).concat)(body);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("set");
          }), (function () {
            return (name = ((this).propertyName).call(this));
          }), (function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (arg = (this).stringPatternHandler("identifier"));
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return (this).stringPatternHandler("{");
          }), (function () {
            return (body = ((this).functionBody).call(this));
          }), (function () {
            return (this).stringPatternHandler("}");
          }), (function () {
            return (((Ast)("SetPropertyDeclaration", {
              name: name,
              argumentName: (arg).value
            })).concat)(body);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    propertyName: {
      value: (function () {
        var token;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (token = (this).stringPatternHandler("identifierName"));
          }), (function () {
            return (token).identifierName;
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("string");
          }), (function () {
            return (token).value;
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("number");
          }), (function () {
            return (token).value;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    memberExpression: {
      value: (function () {
        var expr, ctor, args;
        return (this)._concat((function () {
          return (expr = (this)._choice((this).primaryExpression, (this).functionExpression, (function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("new");
            }), (function () {
              return (ctor = ((this).memberExpression).call(this));
            }), (function () {
              return (args = ((this).arguments).call(this));
            }), (function () {
              return (((Ast)("New", {}, ctor)).concat)(args);
            }));
          })));
        }), (function () {
          return (this)._repeat((function () {
            return (expr = ((this).propertyAccessor).call(this, expr));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    newExpression: {
      value: (function () {
        var ctor;
        return (this)._choice((this).memberExpression, (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("new");
          }), (function () {
            return (ctor = ((this).newExpression).call(this));
          }), (function () {
            return (Ast)("New", {}, ctor);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    propertyAccessor: {
      value: (function (subject) {
        var expr, t;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("[");
          }), (function () {
            return (expr = ((this).expression).call(this));
          }), (function () {
            return (this).stringPatternHandler("]");
          }), (function () {
            return (Ast)("PropertyLookup", {}, subject, expr);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler(".");
          }), (function () {
            return (t = (this).stringPatternHandler("identifierName"));
          }), (function () {
            return (Ast)("DotPropertyLookup", {
              name: (t).value
            }, subject);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    callExpression: {
      value: (function () {
        var expr, args;
        return (this)._concat((function () {
          return (expr = ((this).memberExpression).call(this));
        }), (function () {
          return (args = ((this).arguments).call(this));
        }), (function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._predicate((function () {
                return (expr).is("DotPropertyLookup");
              }));
            }), (function () {
              return (expr = (((Ast)("CallProperty", {
                name: (expr).name
              }, ((expr).children)[0])).concat)(args));
            }));
          }), (function () {
            return (expr = (((Ast)("Call", {}, expr)).concat)(args));
          }));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (args = ((this).arguments).call(this));
              }), (function () {
                return (expr = (((Ast)("Call", {}, expr)).concat)(args));
              }));
            }), (function () {
              return (expr = ((this).propertyAccessor).call(this, expr));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    arguments: {
      value: (function () {
        var exprs;
        return (this)._concat((function () {
          return (this).stringPatternHandler("(");
        }), (function () {
          return (exprs = ((this).delimited).call(this, (this).assignmentExpression, (function () {
            return (this).stringPatternHandler(",");
          })));
        }), (function () {
          return (this).stringPatternHandler(")");
        }), (function () {
          return exprs;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    leftHandSideExpression: {
      value: (function () {
        return (this)._choice((this).callExpression, (this).newExpression);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    postfixExpression: {
      value: (function () {
        var expr;
        return (this)._concat((function () {
          return (expr = ((this).leftHandSideExpression).call(this));
        }), (function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._not((this).newline);
            }), (function () {
              return (this).stringPatternHandler("++");
            }), (function () {
              return (Ast)("PostfixIncrement", {
                sign: +(1)
              }, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._not((this).newline);
            }), (function () {
              return (this).stringPatternHandler("--");
            }), (function () {
              return (Ast)("PostfixIncrement", {
                sign: -(1)
              }, expr);
            }));
          }), (function () {
            return expr;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    unaryExpression: {
      value: (function () {
        var expr, op;
        return (this)._choice((this).postfixExpression, (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("delete");
          }), (function () {
            return (expr = ((this).unaryExpression).call(this));
          }), (function () {
            return (Ast)("Delete", {}, expr);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("void");
          }), (function () {
            return (expr = ((this).unaryExpression).call(this));
          }), (function () {
            return (Ast)("Void", {}, expr);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("typeof");
          }), (function () {
            return (expr = ((this).unaryExpression).call(this));
          }), (function () {
            return (Ast)("TypeOf", {}, expr);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (op = (this)._choice((function () {
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
          }), (function () {
            return (expr = ((this).unaryExpression).call(this));
          }), (function () {
            return (Ast)("UnaryOperator", {
              name: (op).type
            }, expr);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    multiplicativeExpression: {
      value: (function () {
        var expr, op, rhs;
        return (this)._concat((function () {
          return (expr = ((this).unaryExpression).call(this));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (op = (this)._choice((function () {
                return (this).stringPatternHandler("*");
              }), (function () {
                return (this).stringPatternHandler("/");
              }), (function () {
                return (this).stringPatternHandler("%");
              })));
            }), (function () {
              return (rhs = ((this).unaryExpression).call(this));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: (op).type
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    additiveExpression: {
      value: (function () {
        var expr, op, rhs;
        return (this)._concat((function () {
          return (expr = ((this).multiplicativeExpression).call(this));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (op = (this)._choice((function () {
                return (this).stringPatternHandler("+");
              }), (function () {
                return (this).stringPatternHandler("-");
              })));
            }), (function () {
              return (rhs = ((this).multiplicativeExpression).call(this));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: (op).type
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    shiftExpression: {
      value: (function () {
        var expr, op, rhs;
        return (this)._concat((function () {
          return (expr = ((this).additiveExpression).call(this));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (op = (this)._choice((function () {
                return (this).stringPatternHandler("<<");
              }), (function () {
                return (this).stringPatternHandler(">>");
              }), (function () {
                return (this).stringPatternHandler(">>>");
              })));
            }), (function () {
              return (rhs = ((this).additiveExpression).call(this));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: (op).type
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    inToken: {
      value: (function (noIn) {
        return (this)._concat((function () {
          return (this)._predicate((function () {
            return !(noIn);
          }));
        }), (function () {
          return (this).stringPatternHandler("in");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    relationalExpression: {
      value: (function (noIn) {
        var expr, op, rhs;
        return (this)._concat((function () {
          return (expr = ((this).shiftExpression).call(this));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (op = (this)._choice((function () {
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
            }), (function () {
              return (rhs = ((this).shiftExpression).call(this));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: (op).type
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    equalityExpression: {
      value: (function (noIn) {
        var expr, op, rhs;
        return (this)._concat((function () {
          return (expr = ((this).relationalExpression).call(this, noIn));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (op = (this)._choice((function () {
                return (this).stringPatternHandler("==");
              }), (function () {
                return (this).stringPatternHandler("!=");
              }), (function () {
                return (this).stringPatternHandler("===");
              }), (function () {
                return (this).stringPatternHandler("!==");
              })));
            }), (function () {
              return (rhs = ((this).relationalExpression).call(this, noIn));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: (op).type
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    bitwiseAndExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._concat((function () {
          return (expr = ((this).equalityExpression).call(this, noIn));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("&");
            }), (function () {
              return (rhs = ((this).equalityExpression).call(this, noIn));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: "&"
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    bitwiseXorExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._concat((function () {
          return (expr = ((this).bitwiseAndExpression).call(this, noIn));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("^");
            }), (function () {
              return (rhs = ((this).bitwiseAndExpression).call(this, noIn));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: "^"
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    bitwiseOrExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._concat((function () {
          return (expr = ((this).bitwiseXorExpression).call(this, noIn));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("|");
            }), (function () {
              return (rhs = ((this).bitwiseXorExpression).call(this, noIn));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: "|"
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    logicalAndExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._concat((function () {
          return (expr = ((this).bitwiseOrExpression).call(this, noIn));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("&&");
            }), (function () {
              return (rhs = ((this).bitwiseOrExpression).call(this, noIn));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: "&&"
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    logicalOrExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._concat((function () {
          return (expr = ((this).logicalAndExpression).call(this, noIn));
        }), (function () {
          return (this)._repeat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("||");
            }), (function () {
              return (rhs = ((this).logicalAndExpression).call(this, noIn));
            }), (function () {
              return (expr = (Ast)("Operator", {
                name: "||"
              }, expr, rhs));
            }));
          }));
        }), (function () {
          return expr;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    conditionalExpression: {
      value: (function (noIn) {
        var cond, trueExpr, falseExpr;
        return (this)._concat((function () {
          return (cond = ((this).logicalOrExpression).call(this, noIn));
        }), (function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("?");
            }), (function () {
              return (trueExpr = ((this).assignmentExpression).call(this, noIn));
            }), (function () {
              return (this).stringPatternHandler(":");
            }), (function () {
              return (falseExpr = ((this).assignmentExpression).call(this, noIn));
            }), (function () {
              return (Ast)("ConditionalExpression", {}, cond, trueExpr, falseExpr);
            }));
          }), (function () {
            return cond;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    assignmentExpression: {
      value: (function (noIn) {
        var lhs, rhs, op;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (lhs = ((this).leftHandSideExpression).call(this));
          }), (function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (this).stringPatternHandler("=");
              }), (function () {
                return (rhs = ((this).assignmentExpression).call(this, noIn));
              }), (function () {
                return (Ast)("Assignment", {}, lhs, rhs);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (op = (this).stringPatternHandler("assignmentOperator"));
              }), (function () {
                return (rhs = ((this).assignmentExpression).call(this, noIn));
              }), (function () {
                return (Ast)("OperatorAssignment", {
                  operator: (op).opname
                }, lhs, rhs);
              }));
            }));
          }));
        }), (this).conditionalExpression);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    expression: {
      value: (function (noIn) {
        var exprs;
        return (this)._concat((function () {
          return (exprs = ((this).delimited1).call(this, (function () {
            return ((this).assignmentExpression).call(this, noIn);
          }), (function () {
            return (this).stringPatternHandler(",");
          })));
        }), (function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._predicate((function () {
                return ((exprs).length === 1);
              }));
            }), (function () {
              return (exprs)[0];
            }));
          }), (function () {
            return (((Ast)("ExpressionSequence")).concat)(exprs);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    statement: {
      value: (function (noIn) {
        return (this)._choice((this).block, (this).variableStatement, (this).emptyStatement, (this).expressionStatement, (this).ifStatement, (this).iterationStatement, (this).continueStatement, (this).breakStatement, (this).returnStatement, (this).withStatement, (this).labelledStatement, (this).switchStatement, (this).throwStatement, (this).tryStatement, (this).debuggerStatement);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    block: {
      value: (function () {
        var stmts;
        return (this)._concat((function () {
          return (this).stringPatternHandler("{");
        }), (function () {
          return (stmts = (this)._repeat((this).statement));
        }), (function () {
          return (this).stringPatternHandler("}");
        }), (function () {
          return (((Ast)("Block")).concat)(stmts);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    variableStatement: {
      value: (function () {
        var lst;
        return (this)._concat((function () {
          return (this).stringPatternHandler("var");
        }), (function () {
          return (lst = ((this).variableDeclarationList).call(this));
        }), (function () {
          return (this).stringPatternHandler(";");
        }), (function () {
          return lst;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    variableDeclarationList: {
      value: (function (noIn) {
        var lst;
        return (this)._concat((function () {
          return (lst = ((this).delimited1).call(this, (function () {
            return ((this).variableDeclaration).call(this, noIn);
          }), (function () {
            return (this).stringPatternHandler(",");
          })));
        }), (function () {
          return (((Ast)("VariableDeclarationList")).concat)(lst);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    variableDeclaration: {
      value: (function (noIn) {
        var name, expr;
        return (this)._concat((function () {
          return (name = (this).stringPatternHandler("identifier"));
        }), (function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("=");
            }), (function () {
              return (expr = ((this).assignmentExpression).call(this, noIn));
            }), (function () {
              return (Ast)("VariableDeclaration", {
                name: (name).value
              }, expr);
            }));
          }), (function () {
            return (Ast)("VariableDeclaration", {
              name: (name).value
            });
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    emptyStatement: {
      value: (function () {
        return (this)._concat((function () {
          return (this).stringPatternHandler(";");
        }), (function () {
          return (Ast)("EmptyStatement");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    expressionStatement: {
      value: (function () {
        var expr;
        return (this)._concat((function () {
          return (this)._not((function () {
            return (this)._choice((function () {
              return (this).stringPatternHandler("{");
            }), (function () {
              return (this).stringPatternHandler("function");
            }));
          }));
        }), (function () {
          return (expr = ((this).expression).call(this));
        }), (function () {
          return (this).stringPatternHandler(";");
        }), (function () {
          return (Ast)("ExpressionStatement", {}, expr);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    ifStatement: {
      value: (function () {
        var cond, trueBranch, falseBranch;
        return (this)._concat((function () {
          return (this).stringPatternHandler("if");
        }), (function () {
          return (this).stringPatternHandler("(");
        }), (function () {
          return (cond = ((this).expression).call(this));
        }), (function () {
          return (this).stringPatternHandler(")");
        }), (function () {
          return (trueBranch = ((this).statement).call(this));
        }), (function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("else");
            }), (function () {
              return (falseBranch = ((this).statement).call(this));
            }), (function () {
              return (Ast)("If", {}, cond, trueBranch, falseBranch);
            }));
          }), (function () {
            return (Ast)("If", {}, cond, trueBranch);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    iterationStatement: {
      value: (function () {
        var stmt, cond, initExpr, condExpr, incExpr, lvalue, subject, vardecl;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("do");
          }), (function () {
            return (stmt = ((this).statement).call(this));
          }), (function () {
            return (this).stringPatternHandler("while");
          }), (function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (cond = ((this).expression).call(this));
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return (this).stringPatternHandler(";");
          }), (function () {
            return (Ast)("DoWhile", {}, cond, stmt);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("while");
          }), (function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (cond = ((this).expression).call(this));
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return (stmt = ((this).statement).call(this));
          }), (function () {
            return (Ast)("While", {}, cond, stmt);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("for");
          }), (function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (initExpr = (this)._optional((function () {
              return ((this).expression).call(this, true);
            })));
          }), (function () {
            return (this).stringPatternHandler(";");
          }), (function () {
            return (condExpr = (this)._optional((this).expression));
          }), (function () {
            return (this).stringPatternHandler(";");
          }), (function () {
            return (incExpr = (this)._optional((this).expression));
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return (stmt = ((this).statement).call(this));
          }), (function () {
            return (Ast)("For", {}, initExpr, condExpr, incExpr, stmt);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("for");
          }), (function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (this).stringPatternHandler("var");
          }), (function () {
            return (initExpr = ((this).variableDeclarationList).call(this, true));
          }), (function () {
            return (this).stringPatternHandler(";");
          }), (function () {
            return (condExpr = (this)._optional((this).expression));
          }), (function () {
            return (this).stringPatternHandler(";");
          }), (function () {
            return (incExpr = (this)._optional((this).expression));
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return (stmt = ((this).statement).call(this));
          }), (function () {
            return (Ast)("For", {}, initExpr, condExpr, incExpr, stmt);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("for");
          }), (function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (lvalue = ((this).leftHandSideExpression).call(this));
          }), (function () {
            return (this).stringPatternHandler("in");
          }), (function () {
            return (subject = ((this).expression).call(this));
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return (stmt = ((this).statement).call(this));
          }), (function () {
            return (Ast)("ForIn", {}, lvalue, subject, stmt);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("for");
          }), (function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (this).stringPatternHandler("var");
          }), (function () {
            return (vardecl = ((this).variableDeclaration).call(this, true));
          }), (function () {
            return (this).stringPatternHandler("in");
          }), (function () {
            return (subject = ((this).expression).call(this));
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return (stmt = ((this).statement).call(this));
          }), (function () {
            return (Ast)("ForIn", {}, vardecl, subject, stmt);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    continueStatement: {
      value: (function () {
        var name;
        return (this)._concat((function () {
          return (this).stringPatternHandler("continue");
        }), (function () {
          return (this)._not((this).newline);
        }), (function () {
          return (name = (this)._optional((function () {
            return (this).stringPatternHandler("identifier");
          })));
        }), (function () {
          return (this).stringPatternHandler(";");
        }), (function () {
          return (Ast)("Continue", {
            label: (name ? (name).value : null)
          });
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    breakStatement: {
      value: (function () {
        var name;
        return (this)._concat((function () {
          return (this).stringPatternHandler("break");
        }), (function () {
          return (this)._not((this).newline);
        }), (function () {
          return (name = (this)._optional((function () {
            return (this).stringPatternHandler("identifier");
          })));
        }), (function () {
          return (this).stringPatternHandler(";");
        }), (function () {
          return (Ast)("Break", {
            label: (name ? (name).value : null)
          });
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    returnStatement: {
      value: (function () {
        var expr;
        return (this)._concat((function () {
          return (this).stringPatternHandler("return");
        }), (function () {
          return (this)._not((this).newline);
        }), (function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (expr = ((this).expression).call(this));
            }), (function () {
              return (this).stringPatternHandler(";");
            }), (function () {
              return (Ast)("Return", {}, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler(";");
            }), (function () {
              return (Ast)("Return");
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    withStatement: {
      value: (function () {
        var subject, stmt;
        return (this)._concat((function () {
          return (this).stringPatternHandler("with");
        }), (function () {
          return (this).stringPatternHandler("(");
        }), (function () {
          return (subject = ((this).expression).call(this));
        }), (function () {
          return (this).stringPatternHandler(")");
        }), (function () {
          return (stmt = ((this).statement).call(this));
        }), (function () {
          return (Ast)("With", {}, subject, stmt);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    switchStatement: {
      value: (function () {
        var subject, ast;
        return (this)._concat((function () {
          return (this).stringPatternHandler("switch");
        }), (function () {
          return (this).stringPatternHandler("(");
        }), (function () {
          return (subject = ((this).expression).call(this));
        }), (function () {
          return (this).stringPatternHandler(")");
        }), (function () {
          return (this).stringPatternHandler("{");
        }), (function () {
          return (ast = (Ast)("Switch"));
        }), (function () {
          return (this)._repeat((function () {
            return ((this).caseClause).call(this, ast);
          }));
        }), (function () {
          return (this)._optional((function () {
            return (this)._concat((function () {
              return ((this).defaultClause).call(this, ast);
            }), (function () {
              return (this)._repeat((function () {
                return ((this).caseClause).call(this, ast);
              }));
            }));
          }));
        }), (function () {
          return (this).stringPatternHandler("}");
        }), (function () {
          return ast;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    caseClause: {
      value: (function (ast) {
        var cmp, stmts;
        return (this)._concat((function () {
          return (this).stringPatternHandler("case");
        }), (function () {
          return (cmp = ((this).expression).call(this));
        }), (function () {
          return (this).stringPatternHandler(":");
        }), (function () {
          return (stmts = (this)._repeat((this).statement));
        }), (function () {
          return (ast).push((((Ast)("CaseClause", {}, cmp)).concat)(stmts));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    defaultClause: {
      value: (function (ast) {
        var stmts;
        return (this)._concat((function () {
          return (this).stringPatternHandler("default");
        }), (function () {
          return (this).stringPatternHandler(":");
        }), (function () {
          return (stmts = (this)._repeat((this).statement));
        }), (function () {
          return (ast).push((((Ast)("DefaultClause")).concat)(stmts));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    labelledStatement: {
      value: (function () {
        var name, stmt;
        return (this)._concat((function () {
          return (name = (this).stringPatternHandler("identifier"));
        }), (function () {
          return (this).stringPatternHandler(":");
        }), (function () {
          return (stmt = ((this).statement).call(this));
        }), (function () {
          return (Ast)("Label", {
            name: (name).value
          }, stmt);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    throwStatement: {
      value: (function () {
        var expr;
        return (this)._concat((function () {
          return (this).stringPatternHandler("throw");
        }), (function () {
          return (this)._not((this).newline);
        }), (function () {
          return (expr = ((this).expression).call(this));
        }), (function () {
          return (this).stringPatternHandler(";");
        }), (function () {
          return (Ast)("Throw", {}, expr);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    tryStatement: {
      value: (function () {
        var blk, c, f;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("try");
          }), (function () {
            return (blk = ((this).block).call(this));
          }), (function () {
            return (c = ((this).catchClause).call(this));
          }), (function () {
            return (Ast)("Try", {}, blk, c);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("try");
          }), (function () {
            return (blk = ((this).block).call(this));
          }), (function () {
            return (f = ((this).finallyClause).call(this));
          }), (function () {
            return (Ast)("Try", {}, blk, null, f);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("try");
          }), (function () {
            return (blk = ((this).block).call(this));
          }), (function () {
            return (c = ((this).catchClause).call(this));
          }), (function () {
            return (f = ((this).finallyClause).call(this));
          }), (function () {
            return (Ast)("Try", {}, blk, c, f);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    catchClause: {
      value: (function () {
        var name, blk;
        return (this)._concat((function () {
          return (this).stringPatternHandler("catch");
        }), (function () {
          return (this).stringPatternHandler("(");
        }), (function () {
          return (name = (this).stringPatternHandler("identifier"));
        }), (function () {
          return (this).stringPatternHandler(")");
        }), (function () {
          return (blk = ((this).block).call(this));
        }), (function () {
          return (Ast)("Catch", {
            name: (name).value
          }, blk);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    finallyClause: {
      value: (function () {
        var blk;
        return (this)._concat((function () {
          return (this).stringPatternHandler("finally");
        }), (function () {
          return (blk = ((this).block).call(this));
        }), (function () {
          return blk;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    debuggerStatement: {
      value: (function () {
        return (this)._concat((function () {
          return (this).stringPatternHandler("debugger");
        }), (function () {
          return (this).stringPatternHandler(";");
        }), (function () {
          return (Ast)("Debugger");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    functionDeclaration: {
      value: (function () {
        var name, args, stmts;
        return (this)._concat((function () {
          return (this).stringPatternHandler("function");
        }), (function () {
          return (name = (this).stringPatternHandler("identifier"));
        }), (function () {
          return (this).stringPatternHandler("(");
        }), (function () {
          return (args = ((this).delimited).call(this, (function () {
            return (this).stringPatternHandler("identifier");
          }), (function () {
            return (this).stringPatternHandler(",");
          })));
        }), (function () {
          return (this).stringPatternHandler(")");
        }), (function () {
          return (this).stringPatternHandler("{");
        }), (function () {
          return (stmts = ((this).functionBody).call(this));
        }), (function () {
          return (this).stringPatternHandler("}");
        }), (function () {
          return (args = (args).map((function (elem) {
            return (elem).value;
          })));
        }), (function () {
          return (((Ast)("FunctionDeclaration", {
            name: (name).value,
            argumentNames: args
          })).concat)(stmts);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    functionExpression: {
      value: (function () {
        var name, args, stmts;
        return (this)._concat((function () {
          return (this).stringPatternHandler("function");
        }), (function () {
          return (name = (this)._optional((function () {
            return (this).stringPatternHandler("identifier");
          })));
        }), (function () {
          return (this).stringPatternHandler("(");
        }), (function () {
          return (args = ((this).delimited).call(this, (function () {
            return (this).stringPatternHandler("identifier");
          }), (function () {
            return (this).stringPatternHandler(",");
          })));
        }), (function () {
          return (this).stringPatternHandler(")");
        }), (function () {
          return (this).stringPatternHandler("{");
        }), (function () {
          return (stmts = ((this).functionBody).call(this));
        }), (function () {
          return (this).stringPatternHandler("}");
        }), (function () {
          return (name = (name ? (name).value : null));
        }), (function () {
          return (args = (args).map((function (elem) {
            return (elem).value;
          })));
        }), (function () {
          return (((Ast)("FunctionExpression", {
            name: name,
            argumentNames: args
          })).concat)(stmts);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    functionBody: {
      value: (function () {
        return (this)._repeat((this).sourceElement);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    program: {
      value: (function () {
        var stmts;
        return (this)._concat((function () {
          return (stmts = (this)._repeat((this).sourceElement));
        }), (this).eof, (function () {
          return (((Ast)("Program")).concat)(stmts);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    sourceElement: {
      value: (function () {
        return (this)._choice((this).statement, (this).functionDeclaration);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    newline: {
      value: (function () {
        var token;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this)._lookahead((function () {
              return (token = ((this).anything).call(this));
            }));
          }), (function () {
            return (this)._predicate((function () {
              return (token).precededByNewline;
            }));
          }));
        }), (this).eof);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    getNextToken: {
      value: (function (tag) {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
  return JSParser;
}))());