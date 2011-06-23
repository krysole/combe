var JSParser = (require)("./jsparser");
var Ast = (require)("./ast");
var CombeJSLexer = (require)("./combejs_lexer");
var CombeJSParser = ((module).exports = ((function () {
  var CombeJSParser = (__combejs__Class).create(JSParser, {
    DefaultLexer: {
      value: CombeJSLexer,
      writable: true,
      enumerable: true,
      configurable: true
    },
    propertyAssignment: {
      value: (function () {
        var name, expr;
        return (this)._choice(((JSParser).prototype).propertyAssignment, (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("describe");
            }), (function () {
              return (name = ((this).propertyName).call(this));
            }), (function () {
              return (this).stringPatternHandler(":");
            }), (function () {
              return (expr = ((this).assignmentExpression).call(this));
            }));
          }), (function () {
            return (Ast)("DescribePropertyDeclaration", {
              name: name
            }, expr);
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
          return (this)._concat((function () {
            return (expr = (this)._choice((this).primaryExpression, (this).functionExpression, (this).classExpression, (this).ruleExpression, (function () {
              return (this)._concat((function () {
                return (this)._concat((function () {
                  return (this).stringPatternHandler("new");
                }), (function () {
                  return (ctor = ((this).memberExpression).call(this));
                }), (function () {
                  return (args = ((this).arguments).call(this));
                }));
              }), (function () {
                return (((Ast)("New", {}, ctor)).concat)(args);
              }));
            })));
          }), (function () {
            return (this)._repeat((function () {
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
    prefixExpression: {
      value: (function () {
        return (((JSParser).prototype).unaryExpression).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    rangeInfinity: {
      value: (function () {
        return (this)._concat((function () {
          return (this).stringPatternHandler("*");
        }), (function () {
          return (Ast)("RangeInfinity");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    rangeOperator: {
      value: (function (ast) {
        var rhs;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("..");
            }), (function () {
              return (rhs = (this)._choice((this).rangeInfinity, (this).prefixExpression));
            }));
          }), (function () {
            return (Ast)("InclusiveRange", {}, ast, rhs);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("...");
            }), (function () {
              return (rhs = (this)._choice((this).rangeInfinity, (this).prefixExpression));
            }));
          }), (function () {
            return (Ast)("ExclusiveRange", {}, ast, rhs);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    unaryExpression: {
      value: (function () {
        var expr;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (expr = ((this).rangeInfinity).call(this));
              }), (function () {
                return (expr = ((this).rangeOperator).call(this, expr));
              }));
            }), (function () {
              return (expr = ((this).prefixExpression).call(this));
            }));
          }), (function () {
            return (this)._repeat((function () {
              return (expr = ((this).rangeOperator).call(this, expr));
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
    statement: {
      value: (function () {
        return (this)._choice(((JSParser).prototype).statement, (this).matchStatement);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    expressionStatement: {
      value: (function () {
        var expr;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (this)._not((function () {
              return (this)._choice((function () {
                return (this).stringPatternHandler("{");
              }), (function () {
                return (this).stringPatternHandler("function");
              }), (function () {
                return (this).stringPatternHandler("rule");
              }), (function () {
                return (this).stringPatternHandler("class");
              }));
            }));
          }), (function () {
            return (expr = ((this).expression).call(this));
          }), (function () {
            return (this).stringPatternHandler(";");
          }));
        }), (function () {
          return (Ast)("ExpressionStatement", {}, expr);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    sourceElement: {
      value: (function () {
        return (this)._choice(((JSParser).prototype).sourceElement, (this).classDeclaration, (this).ruleDeclaration);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    matchStatement: {
      value: (function () {
        var subject, ptn;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("match");
          }), (function () {
            return (this).stringPatternHandler("(");
          }), (function () {
            return (subject = ((this).expression).call(this));
          }), (function () {
            return (this).stringPatternHandler(")");
          }), (function () {
            return (this).stringPatternHandler("{");
          }), (function () {
            return (ptn = ((this).pattern).call(this));
          }), (function () {
            return (this).stringPatternHandler("}");
          }));
        }), (function () {
          return (Ast)("MatchStatement", {}, subject, ptn);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    classDeclaration: {
      value: (function () {
        var name, inherits, pdefs;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("class");
          }), (function () {
            return (name = (this).stringPatternHandler("identifier"));
          }), (function () {
            return (this)._optional((function () {
              return (this)._concat((function () {
                return (this).stringPatternHandler("(");
              }), (function () {
                return (inherits = ((this).expression).call(this));
              }), (function () {
                return (this).stringPatternHandler(")");
              }));
            }));
          }), (function () {
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
          }));
        }), (function () {
          return (((Ast)("ClassDeclaration", {
            name: (name).value
          }, inherits)).concat)(pdefs);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    classExpression: {
      value: (function () {
        var name, inherits, pdefs;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("class");
          }), (function () {
            return (name = (this)._optional((function () {
              return (this).stringPatternHandler("identifier");
            })));
          }), (function () {
            return (this)._optional((function () {
              return (this)._concat((function () {
                return (this).stringPatternHandler("(");
              }), (function () {
                return (inherits = ((this).expression).call(this));
              }), (function () {
                return (this).stringPatternHandler(")");
              }));
            }));
          }), (function () {
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
          }));
        }), (function () {
          return (((Ast)("ClassExpression", {
            name: (name ? (name).value : null)
          }, inherits)).concat)(pdefs);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    ruleDeclaration: {
      value: (function () {
        var name, args, ptn;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("rule");
          }), (function () {
            return (name = (this).stringPatternHandler("identifier"));
          }), (function () {
            return (this)._optional((function () {
              return (this)._concat((function () {
                return (this).stringPatternHandler("(");
              }), (function () {
                return (args = ((this).delimited).call(this, (function () {
                  return (this).stringPatternHandler("identifier");
                }), (function () {
                  return (this).stringPatternHandler(",");
                })));
              }), (function () {
                return (this).stringPatternHandler(")");
              }));
            }));
          }), (function () {
            return (this).stringPatternHandler("{");
          }), (function () {
            return (ptn = ((this).optionalPattern).call(this));
          }), (function () {
            return (this).stringPatternHandler("}");
          }), (function () {
            return (args = (args ? (args).map((function (elem) {
              return (elem).value;
            })) : [
              
            ]));
          }));
        }), (function () {
          return (Ast)("RuleDeclaration", {
            name: (name).value,
            argumentNames: args
          }, ptn);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    ruleExpression: {
      value: (function () {
        var name, args, ptn;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("rule");
          }), (function () {
            return (name = (this)._optional((function () {
              return (this).stringPatternHandler("identifier");
            })));
          }), (function () {
            return (this)._optional((function () {
              return (this)._concat((function () {
                return (this).stringPatternHandler("(");
              }), (function () {
                return (args = ((this).delimited).call(this, (function () {
                  return (this).stringPatternHandler("identifier");
                }), (function () {
                  return (this).stringPatternHandler(",");
                })));
              }), (function () {
                return (this).stringPatternHandler(")");
              }));
            }));
          }), (function () {
            return (this).stringPatternHandler("{");
          }), (function () {
            return (ptn = ((this).optionalPattern).call(this));
          }), (function () {
            return (this).stringPatternHandler("}");
          }), (function () {
            return (args = (args ? (args).map((function (elem) {
              return (elem).value;
            })) : [
              
            ]));
          }));
        }), (function () {
          return (Ast)("RuleExpression", {
            name: (name ? (name).value : null),
            argumentNames: args
          }, ptn);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    optionalPattern: {
      value: (function () {
        return (this)._choice((this).choicePattern, (function () {
          return (this)._concat((function () {
            return (this)._optional((function () {
              return (this).stringPatternHandler("|");
            }));
          }), (function () {
            return (Ast)("EmptyPattern");
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    pattern: {
      value: (function () {
        return ((this).choicePattern).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    choicePattern: {
      value: (function () {
        var ptn, ptns;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (this)._optional((function () {
              return (this).stringPatternHandler("|");
            }));
          }), (function () {
            return (ptn = ((this).returnPattern).call(this));
          }), (function () {
            return (this)._optional((function () {
              return (this)._concat((function () {
                return (ptns = (this)._repeat1((function () {
                  return (this)._concat((function () {
                    return (this).stringPatternHandler("|");
                  }), (this).returnPattern);
                })));
              }), (function () {
                return (ptn = (((Ast)("ChoicePattern", {}, ptn)).concat)(ptns));
              }));
            }));
          }), (function () {
            return (this)._optional((function () {
              return (this)._concat((function () {
                return (this).stringPatternHandler("|");
              }), (function () {
                return (ptn).push((Ast)("EmptyPattern"));
              }));
            }));
          }));
        }), (function () {
          return ptn;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    returnPattern: {
      value: (function () {
        var ptn, expr, stmts;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (ptn = ((this).concatPattern).call(this));
          }), (function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (this)._concat((function () {
                  return (this).stringPatternHandler("->");
                }), (function () {
                  return (expr = ((this).leftHandSideExpression).call(this));
                }));
              }), (function () {
                return (Ast)("ConcatPattern", {}, ptn, (Ast)("ActionExpressionPattern", {}, expr));
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this)._concat((function () {
                  return (this).stringPatternHandler("->");
                }), (function () {
                  return (this).stringPatternHandler("{");
                }), (function () {
                  return (stmts = (this)._repeat((this).statement));
                }), (function () {
                  return (this).stringPatternHandler("}");
                }));
              }), (function () {
                return (Ast)("ConcatPattern", {}, ptn, (((Ast)("ActionBlockPattern")).concat)(stmts));
              }));
            }), (function () {
              return ptn;
            }));
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("->");
            }), (function () {
              return (expr = ((this).leftHandSideExpression).call(this));
            }));
          }), (function () {
            return (Ast)("ActionExpressionPattern", {}, expr);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("->");
            }), (function () {
              return (this).stringPatternHandler("{");
            }), (function () {
              return (stmts = (this)._repeat((this).statement));
            }), (function () {
              return (this).stringPatternHandler("}");
            }));
          }), (function () {
            return (((Ast)("ActionBlockPattern")).concat)(stmts);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    concatPattern: {
      value: (function () {
        var ptn, ptns;
        return (this)._concat((function () {
          return (ptn = ((this).prefixOperatorPattern).call(this));
        }), (function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (ptns = (this)._repeat1((this).prefixOperatorPattern));
            }), (function () {
              return (((Ast)("ConcatPattern", {}, ptn)).concat)(ptns);
            }));
          }), (function () {
            return ptn;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    prefixOperatorPattern: {
      value: (function () {
        var ptn;
        return (this)._choice((this).postfixOperatorPattern, (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("~");
            }), (function () {
              return (ptn = ((this).prefixOperatorPattern).call(this));
            }));
          }), (function () {
            return (Ast)("NotPattern", {}, ptn);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("&");
            }), (function () {
              return (ptn = ((this).prefixOperatorPattern).call(this));
            }));
          }), (function () {
            return (Ast)("LookaheadPattern", {}, ptn);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("#");
            }), (function () {
              return (ptn = ((this).prefixOperatorPattern).call(this));
            }));
          }), (function () {
            return (Ast)("TokenOperatorPattern", {}, ptn);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    postfixOperatorPattern: {
      value: (function () {
        var ptn, name;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (ptn = ((this).applyPattern).call(this));
            }), (function () {
              return (this)._repeat((function () {
                return (ptn = ((this).repeatOperatorPattern).call(this, ptn));
              }));
            }));
          }), (function () {
            return ptn;
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler(":");
            }), (function () {
              return (this)._not((this).whitespace);
            }), (function () {
              return (name = (this).stringPatternHandler("identifier"));
            }));
          }), (function () {
            return (Ast)("BindPattern", {
              name: (name).value
            }, (Ast)("AnythingPattern"));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    repeatOperatorPattern: {
      value: (function (ptn) {
        var name;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("*");
          }), (function () {
            return (Ast)("RepeatPattern", {}, ptn);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("+");
          }), (function () {
            return (Ast)("Repeat1Pattern", {}, ptn);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("?");
            }), (function () {
              return (this)._not((function () {
                return (this)._concat((function () {
                  return (this)._not((this).whitespace);
                }), (function () {
                  return (this)._choice((function () {
                    return (this).stringPatternHandler("(");
                  }), (function () {
                    return (this).stringPatternHandler("{");
                  }));
                }));
              }));
            }));
          }), (function () {
            return (Ast)("OptionalPattern", {}, ptn);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this)._not((this).whitespace);
            }), (function () {
              return (this).stringPatternHandler(":");
            }), (function () {
              return (this)._not((this).whitespace);
            }), (function () {
              return (name = (this).stringPatternHandler("identifier"));
            }));
          }), (function () {
            return (Ast)("BindPattern", {
              name: (name).value
            }, ptn);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    applyPattern: {
      value: (function () {
        var ptn, args;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (ptn = ((this).primaryPattern).call(this));
          }), (function () {
            return (this)._repeat((function () {
              return (this)._choice((function () {
                return (this)._concat((function () {
                  return (this)._not((this).whitespace);
                }), (function () {
                  return (args = ((this).arguments).call(this));
                }), (function () {
                  return (ptn = (((Ast)("JSApplyPattern", {}, ptn)).concat)(args));
                }));
              }), (function () {
                return (this)._concat((function () {
                  return (this)._not((this).whitespace);
                }), (function () {
                  return (args = ((this).patternArguments).call(this));
                }), (function () {
                  return (ptn = (((Ast)("ApplyPattern", {}, ptn)).concat)(args));
                }));
              }));
            }));
          }));
        }), (function () {
          return ptn;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    patternArguments: {
      value: (function () {
        var args;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("[");
          }), (function () {
            return (args = ((this).delimited).call(this, (this).pattern, (function () {
              return (this).stringPatternHandler(",");
            })));
          }), (function () {
            return (this).stringPatternHandler("]");
          }));
        }), (function () {
          return args;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    primaryPattern: {
      value: (function () {
        var ptn;
        return (this)._choice((this).predicatePattern, (this).actionPattern, (this).immediatePattern, (this).literalPattern, (this).variablePattern, (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("(");
            }), (function () {
              return (ptn = ((this).pattern).call(this));
            }), (function () {
              return (this).stringPatternHandler(")");
            }));
          }), (function () {
            return ptn;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    predicatePattern: {
      value: (function () {
        var expr, stmts;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("?");
            }), (function () {
              return (this)._not((this).whitespace);
            }), (function () {
              return (this).stringPatternHandler("(");
            }), (function () {
              return (expr = ((this).expression).call(this));
            }), (function () {
              return (this).stringPatternHandler(")");
            }));
          }), (function () {
            return (Ast)("PredicateExpressionPattern", {}, expr);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("?");
            }), (function () {
              return (this)._not((this).whitespace);
            }), (function () {
              return (this).stringPatternHandler("{");
            }), (function () {
              return (stmts = (this)._repeat((this).statement));
            }), (function () {
              return (this).stringPatternHandler("}");
            }));
          }), (function () {
            return (((Ast)("PredicateBlockPattern")).concat)(stmts);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    actionPattern: {
      value: (function () {
        var expr, stmts;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("!");
            }), (function () {
              return (this)._not((this).whitespace);
            }), (function () {
              return (this).stringPatternHandler("(");
            }), (function () {
              return (expr = ((this).expression).call(this));
            }), (function () {
              return (this).stringPatternHandler(")");
            }));
          }), (function () {
            return (Ast)("ActionExpressionPattern", {}, expr);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("!");
            }), (function () {
              return (this)._not((this).whitespace);
            }), (function () {
              return (this).stringPatternHandler("{");
            }), (function () {
              return (stmts = (this)._repeat((this).statement));
            }), (function () {
              return (this).stringPatternHandler("}");
            }));
          }), (function () {
            return (((Ast)("ActionBlockPattern")).concat)(stmts);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    immediatePattern: {
      value: (function () {
        var expr, stmts;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("%");
            }), (function () {
              return (expr = ((this).leftHandSideExpression).call(this));
            }));
          }), (function () {
            return (Ast)("ImmediateExpressionPattern", {}, expr);
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("%");
            }), (function () {
              return (this)._not((this).whitespace);
            }), (function () {
              return (this).stringPatternHandler("{");
            }), (function () {
              return (stmts = (this)._repeat((this).statement));
            }), (function () {
              return (this).stringPatternHandler("}");
            }));
          }), (function () {
            return (((Ast)("ImmediateBlockPattern")).concat)(stmts);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    literalPattern: {
      value: (function () {
        var n, s;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this)._choice((function () {
              return (this).stringPatternHandler("null");
            }), (function () {
              return (this).stringPatternHandler("boolean");
            }), (function () {
              return (this).stringPatternHandler("regex");
            }), (function () {
              return (this).stringPatternHandler("undefined");
            }));
          }), (function () {
            return ((this).error).call(this, "Not a valid literal pattern");
          }));
        }), (function () {
          return (this)._concat((function () {
            return (n = (this).stringPatternHandler("number"));
          }), (function () {
            return (Ast)("NumberPattern", {
              value: (n).value
            });
          }));
        }), (function () {
          return (this)._concat((function () {
            return (s = (this).stringPatternHandler("string"));
          }), (function () {
            return (Ast)("StringPattern", {
              value: (s).value
            });
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    variablePattern: {
      value: (function () {
        var name;
        return (this)._concat((function () {
          return (name = (this).stringPatternHandler("identifier"));
        }), (function () {
          return (Ast)("VariablePattern", {
            name: (name).value
          });
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    whitespace: {
      value: (function () {
        var token;
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this)._lookahead((function () {
              return (token = ((this).anything).call(this));
            }));
          }), (function () {
            return (this)._predicate((function () {
              return (!((token).previousToken) || ((token).previousToken).is("whitespace"));
            }));
          }));
        }), (this).eof);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
  return CombeJSParser;
}))());