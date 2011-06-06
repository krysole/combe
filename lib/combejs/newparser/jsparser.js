var TokenParser = (require)("../token_parser");
var Token = (require)("../token");
var JSParser = ((module).exports = ((function () {
  var JSParser = (__combejs__Class).create(TokenParser, {
    primaryExpression: {
      value: (function () {
        var token, e;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat("this", (function () {
              return (Ast)("This");
            }));
          }), (function () {
            return (this)._concat((function () {
              return (token = (this)._apply("identifier"));
            }), (function () {
              return (Ast)("VariableLookup", {
                name: (token).value
              });
            }));
          }), (this).valueLiteral, (this).arrayLiteral, (this).objectLiteral, (function () {
            return (this)._concat((function () {
              return (this)._concat("(", (function () {
                return (e = (this)._apply((this).expression));
              }), ")");
            }), (function () {
              return e;
            }));
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
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (token = (this)._apply((function () {
              return (this)._choice("null", "boolean", "number", "string", "regex");
            })));
          }), (function () {
            return (Ast)("ValueLiteral", {
              value: (token).value
            });
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    arrayLiteral: {
      value: (function () {
        var exprs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("[", (function () {
              return (exprs = (this)._apply((function () {
                return (this)._apply((this).delimited, (this).arrayElement, ",");
              })));
            }), "]");
          }), (function () {
            return (((Ast)("ArrayLiteral")).concat)(exprs);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    arrayElement: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice((this).assignmentExpression, (function () {
            return (Ast)("Elision");
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    objectLiteral: {
      value: (function () {
        var pdefs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("{", (function () {
              return (pdefs = (this)._apply((function () {
                return (this)._apply((this).delimited, (this).propertyAssignment, ",");
              })));
            }), (function () {
              return (this)._optional(",");
            }), "}");
          }), (function () {
            return (((Ast)("ObjectLiteral")).concat)(pdefs);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    propertyAssignment: {
      value: (function () {
        var name, expr, body, arg;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._concat((function () {
                return (name = (this)._apply((this).propertyName));
              }), ":", (function () {
                return (expr = (this)._apply((this).assignmentExpression));
              }));
            }), (function () {
              return (Ast)("ValuePropertyDeclaration", {
                name: name
              }, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("get", (function () {
                return (name = (this)._apply((this).propertyName));
              }), "(", ")", "{", (function () {
                return (body = (this)._apply((this).functionBody));
              }), "}");
            }), (function () {
              return (((Ast)("GetPropertyDeclaration", {
                name: name
              })).concat)(body);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("set", (function () {
                return (name = (this)._apply((this).propertyName));
              }), "(", (function () {
                return (arg = (this)._apply("identifier"));
              }), ")", "{", (function () {
                return (body = (this)._apply((this).functionBody));
              }), "}");
            }), (function () {
              return (((Ast)("SetPropertyDeclaration", {
                name: name,
                argumentName: (arg).value
              })).concat)(body);
            }));
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
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (token = (this)._apply("identifierName"));
            }), (function () {
              return (token).identifierName;
            }));
          }), (function () {
            return (this)._concat("string", (function () {
              return (token).value;
            }));
          }), (function () {
            return (this)._concat("number", (function () {
              return (token).value;
            }));
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
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((function () {
                return (this)._choice((this).primaryExpression, (this).functionExpression, (function () {
                  return (this)._concat((function () {
                    return (this)._concat("new", (function () {
                      return (ctor = (this)._apply((this).memberExpression));
                    }), (function () {
                      return (args = (this)._apply((this).arguments));
                    }));
                  }), (function () {
                    return (((Ast)("New", {}, ctor)).concat)(args);
                  }));
                }));
              })));
            }), (function () {
              return (this)._repeat((function () {
                return (expr = (this)._apply((function () {
                  return (this)._apply((this).propertyAccessor, (this).expr);
                })));
              }));
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
    newExpression: {
      value: (function () {
        var ctor;
        return (this)._apply((function () {
          return (this)._choice((this).memberExpression, (function () {
            return (this)._concat((function () {
              return (this)._concat("new", (function () {
                return (ctor = (this)._apply((this).newExpression));
              }));
            }), (function () {
              return (Ast)("New", {}, ctor);
            }));
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
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._concat("[", (function () {
                return (expr = (this)._apply((this).expression));
              }), "]");
            }), (function () {
              return (Ast)("PropertyLookup", {}, subject, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat(".", (function () {
                return (t = (this)._apply("identifierName"));
              }));
            }), (function () {
              return (Ast)("PropertyLookup", {}, subject, (Ast)("ValueLiteral", {
                value: (t).value
              }));
            }));
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
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((this).memberExpression));
            }), (function () {
              return (args = (this)._apply((this).arguments));
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
                    return (args = (this)._apply((this).arguments));
                  }), (function () {
                    return (expr = (((Ast)("Call", {}, expr)).concat)(args));
                  }));
                }), (function () {
                  return (expr = (this)._apply((function () {
                    return (this)._apply((this).propertyAccessor, (this).expr);
                  })));
                }));
              }));
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
    arguments: {
      value: (function () {
        var exprs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("(", (function () {
              return (exprs = (this)._apply((function () {
                return (this)._apply((this).delimited, (this).assignmentExpression, ",");
              })));
            }), ")");
          }), (function () {
            return exprs;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    leftHandSideExpression: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice((this).callExpression, (this).newExpression);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    postfixExpression: {
      value: (function () {
        var expr;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (expr = (this)._apply((this).leftHandSideExpression));
          }), (function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (this)._concat((function () {
                  return (this)._not((this).newline);
                }), "++");
              }), (function () {
                return (Ast)("PostfixIncrement", {
                  sign: +(1)
                }, expr);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this)._concat((function () {
                  return (this)._not((this).newline);
                }), "--");
              }), (function () {
                return (Ast)("PostfixIncrement", {
                  sign: -(1)
                }, expr);
              }));
            }), (function () {
              return expr;
            }));
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
        return (this)._apply((function () {
          return (this)._choice((this).postfixExpression, (function () {
            return (this)._concat((function () {
              return (this)._concat("delete", (function () {
                return (expr = (this)._apply((this).unaryExpression));
              }));
            }), (function () {
              return (Ast)("Delete", {}, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("void", (function () {
                return (expr = (this)._apply((this).unaryExpression));
              }));
            }), (function () {
              return (Ast)("Void", {}, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("typeof", (function () {
                return (expr = (this)._apply((this).unaryExpression));
              }));
            }), (function () {
              return (Ast)("TypeOf", {}, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat((function () {
                return (op = (this)._apply((function () {
                  return (this)._choice("++", "--", "+", "-", "~", "!");
                })));
              }), (function () {
                return (expr = (this)._apply((this).unaryExpression));
              }));
            }), (function () {
              return (Ast)("UnaryOperator", {
                name: (op).type
              }, expr);
            }));
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
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((this).unaryExpression));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat((function () {
                  return (op = (this)._apply((function () {
                    return (this)._choice("*", "/", "%");
                  })));
                }), (function () {
                  return (rhs = (this)._apply((this).unaryExpression));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: (op).type
                  }, expr, rhs));
                }));
              }));
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
    additiveExpression: {
      value: (function () {
        var expr, op, rhs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((this).multiplicativeExpression));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat((function () {
                  return (op = (this)._apply((function () {
                    return (this)._choice("+", "-");
                  })));
                }), (function () {
                  return (rhs = (this)._apply((this).multiplicativeExpression));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: (op).type
                  }, expr, rhs));
                }));
              }));
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
    shiftExpression: {
      value: (function () {
        var expr, op, rhs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((this).additiveExpression));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat((function () {
                  return (op = (this)._apply((function () {
                    return (this)._choice("<<", ">>", ">>>");
                  })));
                }), (function () {
                  return (rhs = (this)._apply((this).additiveExpression));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: (op).type
                  }, expr, rhs));
                }));
              }));
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
    inToken: {
      value: (function (noIn) {
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._predicate((function () {
              return !(noIn);
            }));
          }), "in");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    relationalExpression: {
      value: (function (noIn) {
        var expr, op, rhs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((this).shiftExpression));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat((function () {
                  return (op = (this)._apply((function () {
                    return (this)._choice("<", ">", "<=", ">=", "instanceof", (function () {
                      return (this)._apply((this).inToken, noIn);
                    }));
                  })));
                }), (function () {
                  return (rhs = (this)._apply((this).shiftExpression));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: (op).type
                  }, expr, rhs));
                }));
              }));
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
    equalityExpression: {
      value: (function (noIn) {
        var expr, op, rhs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((function () {
                return (this)._apply((this).relationalExpression, noIn);
              })));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat((function () {
                  return (op = (this)._apply((function () {
                    return (this)._choice("==", "!=", "===", "!==");
                  })));
                }), (function () {
                  return (rhs = (this)._apply((function () {
                    return (this)._apply((this).relationalExpression, noIn);
                  })));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: (op).type
                  }, expr, rhs));
                }));
              }));
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
    bitwiseAndExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((function () {
                return (this)._apply((this).equalityExpression, noIn);
              })));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat("&", (function () {
                  return (rhs = (this)._apply((function () {
                    return (this)._apply((this).equalityExpression, noIn);
                  })));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: "&"
                  }, expr, rhs));
                }));
              }));
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
    bitwiseXorExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((function () {
                return (this)._apply((this).bitwiseAndExpression, noIn);
              })));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat("^", (function () {
                  return (rhs = (this)._apply((function () {
                    return (this)._apply((this).bitwiseAndExpression, noIn);
                  })));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: "^"
                  }, expr, rhs));
                }));
              }));
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
    bitwiseOrExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((function () {
                return (this)._apply((this).bitwiseXorExpression, noIn);
              })));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat("|", (function () {
                  return (rhs = (this)._apply((function () {
                    return (this)._apply((this).bitwiseXorExpression, noIn);
                  })));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: "|"
                  }, expr, rhs));
                }));
              }));
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
    logicalAndExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((function () {
                return (this)._apply((this).bitwiseOrExpression, noIn);
              })));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat("&&", (function () {
                  return (rhs = (this)._apply((function () {
                    return (this)._apply((this).bitwiseOrExpression, noIn);
                  })));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: "&&"
                  }, expr, rhs));
                }));
              }));
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
    logicalOrExpression: {
      value: (function (noIn) {
        var expr, rhs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((function () {
                return (this)._apply((this).logicalAndExpression, noIn);
              })));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat("||", (function () {
                  return (rhs = (this)._apply((function () {
                    return (this)._apply((this).logicalAndExpression, noIn);
                  })));
                }), (function () {
                  return (expr = (Ast)("Operator", {
                    name: "||"
                  }, expr, rhs));
                }));
              }));
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
    conditionalExpression: {
      value: (function (noIn) {
        var cond, trueExpr, falseExpr;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (cond = (this)._apply((function () {
              return (this)._apply((this).logicalOrExpression, noIn);
            })));
          }), (function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (this)._concat("?", (function () {
                  return (trueExpr = (this)._apply((function () {
                    return (this)._apply((this).assignmentExpression, noIn);
                  })));
                }), ":", (function () {
                  return (falseExpr = (this)._apply((function () {
                    return (this)._apply((this).assignmentExpression, noIn);
                  })));
                }));
              }), (function () {
                return (Ast)("ConditionalExpression", {}, cond, trueExpr, falseExpr);
              }));
            }), (function () {
              return cond;
            }));
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
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (lhs = (this)._apply((this).leftHandSideExpression));
            }), (function () {
              return (this)._choice((function () {
                return (this)._concat((function () {
                  return (this)._concat("=", (function () {
                    return (rhs = (this)._apply((function () {
                      return (this)._apply((this).assignmentExpression, noIn);
                    })));
                  }));
                }), (function () {
                  return (Ast)("Assignment", {}, lhs, rhs);
                }));
              }), (function () {
                return (this)._concat((function () {
                  return (this)._concat((function () {
                    return (op = (this)._apply("assignmentOperator"));
                  }), (function () {
                    return (rhs = (this)._apply((function () {
                      return (this)._apply((this).assignmentExpression, noIn);
                    })));
                  }));
                }), (function () {
                  return (Ast)("OperatorAssignment", {
                    operator: (op).opname
                  }, lhs, rhs);
                }));
              }));
            }));
          }), (this).conditionalExpression);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    expression: {
      value: (function (noIn) {
        var exprs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (exprs = (this)._apply((function () {
              return (this)._apply((this).delimited1, (function () {
                return (this)._apply((this).assignmentExpression, noIn);
              }), ",");
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
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    statement: {
      value: (function (noIn) {
        return (this)._apply((function () {
          return (this)._choice((this).block, (this).variableStatement, (this).emptyStatement, (this).expressionStatement, (this).ifStatement, (this).iterationStatement, (this).continueStatement, (this).breakStatement, (this).returnStatement, (this).withStatement, (this).labelledStatement, (this).switchStatement, (this).throwStatement, (this).tryStatement, (this).debuggerStatement);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    block: {
      value: (function () {
        var stmts;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("{", (function () {
              return (stmts = (this)._apply((function () {
                return (this)._repeat((this).statement);
              })));
            }), "}");
          }), (function () {
            return (((Ast)("Block")).concat)(stmts);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    variableStatement: {
      value: (function () {
        var lst;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("var", (function () {
              return (lst = (this)._apply((this).variableDeclarationList));
            }), ";");
          }), (function () {
            return lst;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    variableDeclarationList: {
      value: (function (noIn) {
        var lst;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (lst = (this)._apply((function () {
              return (this)._apply((this).delimited1, (function () {
                return (this)._apply((this).variableDeclaration, noIn);
              }), ",");
            })));
          }), (function () {
            return (((Ast)("VariableDeclarationList")).concat)(lst);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    variableDeclaration: {
      value: (function (noIn) {
        var name, expr;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (name = (this)._apply("identifier"));
          }), (function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (this)._concat("=", (function () {
                  return (expr = (this)._apply((function () {
                    return (this)._apply((this).assignmentExpression, noIn);
                  })));
                }));
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
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    emptyStatement: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._concat(";", (function () {
            return (Ast)("EmptyStatement");
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    expressionStatement: {
      value: (function () {
        var expr;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this)._not((function () {
                return (this)._choice("{", "function");
              }));
            }), (function () {
              return (expr = (this)._apply((this).expression));
            }), ";");
          }), (function () {
            return (Ast)("ExpressionStatement", {}, expr);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    ifStatement: {
      value: (function () {
        var cond, trueBranch, falseBranch;
        return (this)._apply((function () {
          return (this)._concat("if", "(", (function () {
            return (cond = (this)._apply((this).expression));
          }), ")", (function () {
            return (trueBranch = (this)._apply((this).statement));
          }), (function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (this)._concat("else", (function () {
                  return (falseBranch = (this)._apply((this).statement));
                }));
              }), (function () {
                return (Ast)("If", {}, cond, trueBranch, falseBranch);
              }));
            }), (function () {
              return (Ast)("If", {}, cond, trueBranch);
            }));
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
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._concat("do", (function () {
                return (stmt = (this)._apply((this).statement));
              }), "while", "(", (function () {
                return (cond = (this)._apply((this).expression));
              }), ")", ";");
            }), (function () {
              return (Ast)("DoWhile", {}, cond, stmt);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("while", "(", (function () {
                return (cond = (this)._apply((this).expression));
              }), ")", (function () {
                return (stmt = (this)._apply((this).statement));
              }));
            }), (function () {
              return (Ast)("While", {}, cond, stmt);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("for", "(", (function () {
                return (initExpr = (this)._apply((function () {
                  return (this)._optional((function () {
                    return (this)._apply((this).expression, true);
                  }));
                })));
              }), ";", (function () {
                return (condExpr = (this)._apply((function () {
                  return (this)._optional((this).expression);
                })));
              }), ";", (function () {
                return (incExpr = (this)._apply((function () {
                  return (this)._optional((this).expression);
                })));
              }), ")", (function () {
                return (stmt = (this)._apply((this).statement));
              }));
            }), (function () {
              return (Ast)("For", {}, initExpr, condExpr, incExpr, stmt);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("for", "(", "var", (function () {
                return (initExpr = (this)._apply((function () {
                  return (this)._apply((this).variableDeclarationList, true);
                })));
              }), ";", (function () {
                return (condExpr = (this)._apply((function () {
                  return (this)._optional((this).expression);
                })));
              }), ";", (function () {
                return (incExpr = (this)._apply((function () {
                  return (this)._optional((this).expression);
                })));
              }), ")", (function () {
                return (stmt = (this)._apply((this).statement));
              }));
            }), (function () {
              return (Ast)("For", {}, initExpr, condExpr, incExpr, stmt);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("for", "(", (function () {
                return (lvalue = (this)._apply((this).leftHandSideExpression));
              }), "in", (function () {
                return (subject = (this)._apply((this).expression));
              }), ")", (function () {
                return (stmt = (this)._apply((this).statement));
              }));
            }), (function () {
              return (Ast)("ForIn", {}, lvalue, subject, stmt);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("for", "(", "var", (function () {
                return (vardecl = (this)._apply((function () {
                  return (this)._apply((this).variableDeclaration, true);
                })));
              }), "in", (function () {
                return (subject = (this)._apply((this).expression));
              }), ")", (function () {
                return (stmt = (this)._apply((this).statement));
              }));
            }), (function () {
              return (Ast)("ForIn", {}, vardecl, subject, stmt);
            }));
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
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("continue", (function () {
              return (this)._not((this).newline);
            }), (function () {
              return (name = (this)._apply((function () {
                return (this)._optional("identifier");
              })));
            }), ";");
          }), (function () {
            return (Ast)("Continue", {
              label: (name ? (name).value : null)
            });
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    breakStatement: {
      value: (function () {
        var name;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("break", (function () {
              return (this)._not((this).newline);
            }), (function () {
              return (name = (this)._apply((function () {
                return (this)._optional("identifier");
              })));
            }), ";");
          }), (function () {
            return (Ast)("Break", {
              label: (name ? (name).value : null)
            });
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    returnStatement: {
      value: (function () {
        var expr;
        return (this)._apply((function () {
          return (this)._concat("return", (function () {
            return (this)._not((this).newline);
          }), (function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (this)._concat((function () {
                  return (expr = (this)._apply((this).expression));
                }), ";");
              }), (function () {
                return (Ast)("Return", {}, expr);
              }));
            }), (function () {
              return (this)._concat(";", (function () {
                return (Ast)("Return");
              }));
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
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("with", "(", (function () {
              return (subject = (this)._apply((this).expression));
            }), ")", (function () {
              return (stmt = (this)._apply((this).statement));
            }));
          }), (function () {
            return (Ast)("With", {}, subject, stmt);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    switchStatement: {
      value: (function () {
        var subject, ast;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("switch", "(", (function () {
              return (subject = (this)._apply((this).expression));
            }), ")", "{", (function () {
              return (ast = (this)._apply((function () {
                return (Ast)("Switch");
              })));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._apply((this).caseClause, ast);
              }));
            }), (function () {
              return (this)._optional((function () {
                return (this)._concat((function () {
                  return (this)._apply((this).defaultClause, ast);
                }), (function () {
                  return (this)._repeat((function () {
                    return (this)._apply((this).caseClause, ast);
                  }));
                }));
              }));
            }), "}");
          }), (function () {
            return ast;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    caseClause: {
      value: (function (ast) {
        var cmp, stmts;
        return (this)._apply((function () {
          return (this)._concat("case", (function () {
            return (cmp = (this)._apply((this).expression));
          }), ":", (function () {
            return (stmts = (this)._apply((function () {
              return (this)._repeat((this).statement);
            })));
          }), (function () {
            return (ast).push((((Ast)("CaseClause", {}, cmp)).concat)(stmts));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    defaultClause: {
      value: (function (ast) {
        var stmts;
        return (this)._apply((function () {
          return (this)._concat("default", ":", (function () {
            return (stmts = (this)._apply((function () {
              return (this)._repeat((this).statement);
            })));
          }), (function () {
            return (ast).push((((Ast)("DefaultClause")).concat)(stmts));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    labelledStatement: {
      value: (function () {
        var name, stmt;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (name = (this)._apply("identifier"));
            }), ":", (function () {
              return (stmt = (this)._apply((this).statement));
            }));
          }), (function () {
            return (Ast)("Label", {
              name: (name).value
            }, stmt);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    throwStatement: {
      value: (function () {
        var expr;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("throw", (function () {
              return (this)._not((this).newline);
            }), (function () {
              return (expr = (this)._apply((this).expression));
            }), ";");
          }), (function () {
            return (Ast)("Throw", {}, expr);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    tryStatement: {
      value: (function () {
        var blk, c, f;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._concat("try", (function () {
                return (blk = (this)._apply((this).block));
              }), (function () {
                return (c = (this)._apply((this).catchClause));
              }));
            }), (function () {
              return (Ast)("Try", {}, blk, c);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("try", (function () {
                return (blk = (this)._apply((this).block));
              }), (function () {
                return (f = (this)._apply((this).finallyClause));
              }));
            }), (function () {
              return (Ast)("Try", {}, blk, null, f);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("try", (function () {
                return (blk = (this)._apply((this).block));
              }), (function () {
                return (c = (this)._apply((this).catchClause));
              }), (function () {
                return (f = (this)._apply((this).finallyClause));
              }));
            }), (function () {
              return (Ast)("Try", {}, blk, c, f);
            }));
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
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("catch", "(", (function () {
              return (name = (this)._apply("identifier"));
            }), ")", (function () {
              return (blk = (this)._apply((this).block));
            }));
          }), (function () {
            return (Ast)("Catch", {
              name: (name).value
            }, blk);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    finallyClause: {
      value: (function () {
        var blk;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("finally", (function () {
              return (blk = (this)._apply((this).block));
            }));
          }), (function () {
            return blk;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    debuggerStatement: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("debugger", ";");
          }), (function () {
            return (Ast)("Debugger");
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    functionDeclaration: {
      value: (function () {
        var name, args, stmts;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("function", (function () {
              return (name = (this)._apply("identifier"));
            }), "(", (function () {
              return (args = (this)._apply((function () {
                return (this)._apply((this).delimited, "identifier", ",");
              })));
            }), ")", "{", (function () {
              return (stmts = (this)._apply((this).functionBody));
            }), "}", (function () {
              return (args = (this)._apply((function () {
                return (args).map((function (elem) {
                  return (elem).value;
                }));
              })));
            }));
          }), (function () {
            return (((Ast)("FunctionDeclaration", {
              name: (name).value,
              argumentNames: args
            })).concat)(stmts);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    functionExpression: {
      value: (function () {
        var name, args, stmts;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("function", (function () {
              return (name = (this)._apply((function () {
                return (this)._optional("identifier");
              })));
            }), "(", (function () {
              return (args = (this)._apply((function () {
                return (this)._apply((this).delimited, "identifier", ",");
              })));
            }), ")", "{", (function () {
              return (stmts = (this)._apply((this).functionBody));
            }), "}", (function () {
              return (name = (this)._apply((function () {
                return (name ? (name).value : null);
              })));
            }), (function () {
              return (args = (this)._apply((function () {
                return (args).map((function (elem) {
                  return (elem).value;
                }));
              })));
            }));
          }), (function () {
            return (((Ast)("FunctionExpression", {
              name: name,
              argumentNames: args
            })).concat)(stmts);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    functionBody: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._repeat((this).sourceElement);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    program: {
      value: (function () {
        var stmts;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (stmts = (this)._apply((function () {
                return (this)._repeat((this).sourceElement);
              })));
            }), (this).eof);
          }), (function () {
            return (((Ast)("Program")).concat)(stmts);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    sourceElement: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice((this).statement, (this).functionDeclaration);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    newline: {
      value: (function () {
        var token;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (token = (this)._apply((function () {
                return (this)._lookahead((this).anything);
              })));
            }), (function () {
              return (this)._predicate((function () {
                return (token).precededByNewline;
              }));
            }));
          }), (this).eof);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    getNextToken: {
      value: (function (tag) {
        var token;
        if (((tag === "/") || (tag === "/="))) {
          (token = (((this).input).current).readReplacing([
            "unknown",
            "regex"
          ], "division"));
        } else {
(tag === "regex")
          {
            (token = (((this).input).current).readReplacing([
              "unknown",
              "division"
            ], "regex"));
          }
          {
            (token = (((this).input).current).read());
          }
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