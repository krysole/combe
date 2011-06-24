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
          (this).stringPatternHandler("describe");
          (name = ((this).propertyName).call(this));
          (this).stringPatternHandler(":");
          (expr = ((this).assignmentExpression).call(this));
          return (Ast)("DescribePropertyDeclaration", {
            name: name
          }, expr);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    memberExpression: {
      value: (function () {
        var expr, ctor, args;
        return ((function () {
          (expr = (this)._choice((this).primaryExpression, (this).functionExpression, (this).classExpression, (this).ruleExpression, (function () {
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
        return ((function () {
          (this).stringPatternHandler("*");
          return (Ast)("RangeInfinity");
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    rangeOperator: {
      value: (function (ast) {
        var rhs;
        return (this)._choice((function () {
          (this).stringPatternHandler("..");
          (rhs = (this)._choice((this).rangeInfinity, (this).prefixExpression));
          return (Ast)("InclusiveRange", {}, ast, rhs);
        }), (function () {
          (this).stringPatternHandler("...");
          (rhs = (this)._choice((this).rangeInfinity, (this).prefixExpression));
          return (Ast)("ExclusiveRange", {}, ast, rhs);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    unaryExpression: {
      value: (function () {
        var expr;
        return ((function () {
          (this)._choice((function () {
            (expr = ((this).rangeInfinity).call(this));
            return (expr = ((this).rangeOperator).call(this, expr));
          }), (function () {
            return (expr = ((this).prefixExpression).call(this));
          }));
          (this)._repeat((function () {
            return (expr = ((this).rangeOperator).call(this, expr));
          }));
          return expr;
        })).call(this);
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
        return ((function () {
          (this)._not((function () {
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
          (expr = ((this).expression).call(this));
          (this).stringPatternHandler(";");
          return (Ast)("ExpressionStatement", {}, expr);
        })).call(this);
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
        return ((function () {
          (this).stringPatternHandler("match");
          (this).stringPatternHandler("(");
          (subject = ((this).expression).call(this));
          (this).stringPatternHandler(")");
          (this).stringPatternHandler("{");
          (ptn = ((this).pattern).call(this));
          (this).stringPatternHandler("}");
          return (Ast)("MatchStatement", {}, subject, ptn);
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    classDeclaration: {
      value: (function () {
        var name, inherits, pdefs;
        return ((function () {
          (this).stringPatternHandler("class");
          (name = (this).stringPatternHandler("identifier"));
          (this)._optional((function () {
            (this).stringPatternHandler("(");
            (inherits = ((this).expression).call(this));
            return (this).stringPatternHandler(")");
          }));
          (this).stringPatternHandler("{");
          (pdefs = ((this).delimited).call(this, (this).propertyAssignment, (function () {
            return (this).stringPatternHandler(",");
          })));
          (this)._optional((function () {
            return (this).stringPatternHandler(",");
          }));
          (this).stringPatternHandler("}");
          return (((Ast)("ClassDeclaration", {
            name: (name).value
          }, inherits)).concat)(pdefs);
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    classExpression: {
      value: (function () {
        var name, inherits, pdefs;
        return ((function () {
          (this).stringPatternHandler("class");
          (name = (this)._optional((function () {
            return (this).stringPatternHandler("identifier");
          })));
          (this)._optional((function () {
            (this).stringPatternHandler("(");
            (inherits = ((this).expression).call(this));
            return (this).stringPatternHandler(")");
          }));
          (this).stringPatternHandler("{");
          (pdefs = ((this).delimited).call(this, (this).propertyAssignment, (function () {
            return (this).stringPatternHandler(",");
          })));
          (this)._optional((function () {
            return (this).stringPatternHandler(",");
          }));
          (this).stringPatternHandler("}");
          return (((Ast)("ClassExpression", {
            name: (name ? (name).value : null)
          }, inherits)).concat)(pdefs);
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    ruleDeclaration: {
      value: (function () {
        var name, args, ptn;
        return ((function () {
          (this).stringPatternHandler("rule");
          (name = (this).stringPatternHandler("identifier"));
          (this)._optional((function () {
            (this).stringPatternHandler("(");
            (args = ((this).delimited).call(this, (function () {
              return (this).stringPatternHandler("identifier");
            }), (function () {
              return (this).stringPatternHandler(",");
            })));
            return (this).stringPatternHandler(")");
          }));
          (this).stringPatternHandler("{");
          (ptn = ((this).optionalPattern).call(this));
          (this).stringPatternHandler("}");
          (args = (args ? (args).map((function (elem) {
            return (elem).value;
          })) : [
            
          ]));
          return (Ast)("RuleDeclaration", {
            name: (name).value,
            argumentNames: args
          }, ptn);
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    ruleExpression: {
      value: (function () {
        var name, args, ptn;
        return ((function () {
          (this).stringPatternHandler("rule");
          (name = (this)._optional((function () {
            return (this).stringPatternHandler("identifier");
          })));
          (this)._optional((function () {
            (this).stringPatternHandler("(");
            (args = ((this).delimited).call(this, (function () {
              return (this).stringPatternHandler("identifier");
            }), (function () {
              return (this).stringPatternHandler(",");
            })));
            return (this).stringPatternHandler(")");
          }));
          (this).stringPatternHandler("{");
          (ptn = ((this).optionalPattern).call(this));
          (this).stringPatternHandler("}");
          (args = (args ? (args).map((function (elem) {
            return (elem).value;
          })) : [
            
          ]));
          return (Ast)("RuleExpression", {
            name: (name ? (name).value : null),
            argumentNames: args
          }, ptn);
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    optionalPattern: {
      value: (function () {
        return (this)._choice((this).choicePattern, (function () {
          (this)._optional((function () {
            return (this).stringPatternHandler("|");
          }));
          return (Ast)("EmptyPattern");
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
        return ((function () {
          (this)._optional((function () {
            return (this).stringPatternHandler("|");
          }));
          (ptn = ((this).returnPattern).call(this));
          (this)._optional((function () {
            (ptns = (this)._repeat1((function () {
              (this).stringPatternHandler("|");
              return ((this).returnPattern).call(this);
            })));
            return (ptn = (((Ast)("ChoicePattern", {}, ptn)).concat)(ptns));
          }));
          (this)._optional((function () {
            (this).stringPatternHandler("|");
            return (ptn).push((Ast)("EmptyPattern"));
          }));
          return ptn;
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    returnPattern: {
      value: (function () {
        var ptn, expr, stmts;
        return (this)._choice((function () {
          (ptn = ((this).concatPattern).call(this));
          return (this)._choice((function () {
            (this).stringPatternHandler("->");
            (expr = ((this).leftHandSideExpression).call(this));
            return (Ast)("ConcatPattern", {}, ptn, (Ast)("ActionExpressionPattern", {}, expr));
          }), (function () {
            (this).stringPatternHandler("->");
            (this).stringPatternHandler("{");
            (stmts = (this)._repeat((this).statement));
            (this).stringPatternHandler("}");
            return (Ast)("ConcatPattern", {}, ptn, (((Ast)("ActionBlockPattern")).concat)(stmts));
          }), (function () {
            return ptn;
          }));
        }), (function () {
          (this).stringPatternHandler("->");
          (expr = ((this).leftHandSideExpression).call(this));
          return (Ast)("ActionExpressionPattern", {}, expr);
        }), (function () {
          (this).stringPatternHandler("->");
          (this).stringPatternHandler("{");
          (stmts = (this)._repeat((this).statement));
          (this).stringPatternHandler("}");
          return (((Ast)("ActionBlockPattern")).concat)(stmts);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    concatPattern: {
      value: (function () {
        var ptn, ptns;
        return ((function () {
          (ptn = ((this).prefixOperatorPattern).call(this));
          return (this)._choice((function () {
            (ptns = (this)._repeat1((this).prefixOperatorPattern));
            return (((Ast)("ConcatPattern", {}, ptn)).concat)(ptns);
          }), (function () {
            return ptn;
          }));
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    prefixOperatorPattern: {
      value: (function () {
        var ptn;
        return (this)._choice((this).postfixOperatorPattern, (function () {
          (this).stringPatternHandler("~");
          (ptn = ((this).prefixOperatorPattern).call(this));
          return (Ast)("NotPattern", {}, ptn);
        }), (function () {
          (this).stringPatternHandler("&");
          (ptn = ((this).prefixOperatorPattern).call(this));
          return (Ast)("LookaheadPattern", {}, ptn);
        }), (function () {
          (this).stringPatternHandler("#");
          (ptn = ((this).prefixOperatorPattern).call(this));
          return (Ast)("TokenOperatorPattern", {}, ptn);
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
          (ptn = ((this).applyPattern).call(this));
          (this)._repeat((function () {
            return (ptn = ((this).repeatOperatorPattern).call(this, ptn));
          }));
          return ptn;
        }), (function () {
          (this).stringPatternHandler(":");
          (this)._not((this).whitespace);
          (name = (this).stringPatternHandler("identifier"));
          return (Ast)("BindPattern", {
            name: (name).value
          }, (Ast)("AnythingPattern"));
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
          (this).stringPatternHandler("*");
          return (Ast)("RepeatPattern", {}, ptn);
        }), (function () {
          (this).stringPatternHandler("+");
          return (Ast)("Repeat1Pattern", {}, ptn);
        }), (function () {
          (this).stringPatternHandler("?");
          (this)._not((function () {
            (this)._not((this).whitespace);
            return (this)._choice((function () {
              return (this).stringPatternHandler("(");
            }), (function () {
              return (this).stringPatternHandler("{");
            }));
          }));
          return (Ast)("OptionalPattern", {}, ptn);
        }), (function () {
          (this)._not((this).whitespace);
          (this).stringPatternHandler(":");
          (this)._not((this).whitespace);
          (name = (this).stringPatternHandler("identifier"));
          return (Ast)("BindPattern", {
            name: (name).value
          }, ptn);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    applyPattern: {
      value: (function () {
        var ptn, args;
        return ((function () {
          (ptn = ((this).primaryPattern).call(this));
          (this)._repeat((function () {
            return (this)._choice((function () {
              (this)._not((this).whitespace);
              (args = ((this).arguments).call(this));
              return (ptn = (((Ast)("JSApplyPattern", {}, ptn)).concat)(args));
            }), (function () {
              (this)._not((this).whitespace);
              (args = ((this).patternArguments).call(this));
              return (ptn = (((Ast)("ApplyPattern", {}, ptn)).concat)(args));
            }));
          }));
          return ptn;
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    patternArguments: {
      value: (function () {
        var args;
        return ((function () {
          (this).stringPatternHandler("[");
          (args = ((this).delimited).call(this, (this).pattern, (function () {
            return (this).stringPatternHandler(",");
          })));
          (this).stringPatternHandler("]");
          return args;
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    primaryPattern: {
      value: (function () {
        var ptn;
        return (this)._choice((this).predicatePattern, (this).actionPattern, (this).immediatePattern, (this).literalPattern, (this).variablePattern, (function () {
          (this).stringPatternHandler("(");
          (ptn = ((this).pattern).call(this));
          (this).stringPatternHandler(")");
          return ptn;
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
          (this).stringPatternHandler("?");
          (this)._not((this).whitespace);
          (this).stringPatternHandler("(");
          (expr = ((this).expression).call(this));
          (this).stringPatternHandler(")");
          return (Ast)("PredicateExpressionPattern", {}, expr);
        }), (function () {
          (this).stringPatternHandler("?");
          (this)._not((this).whitespace);
          (this).stringPatternHandler("{");
          (stmts = (this)._repeat((this).statement));
          (this).stringPatternHandler("}");
          return (((Ast)("PredicateBlockPattern")).concat)(stmts);
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
          (this).stringPatternHandler("!");
          (this)._not((this).whitespace);
          (this).stringPatternHandler("(");
          (expr = ((this).expression).call(this));
          (this).stringPatternHandler(")");
          return (Ast)("ActionExpressionPattern", {}, expr);
        }), (function () {
          (this).stringPatternHandler("!");
          (this)._not((this).whitespace);
          (this).stringPatternHandler("{");
          (stmts = (this)._repeat((this).statement));
          (this).stringPatternHandler("}");
          return (((Ast)("ActionBlockPattern")).concat)(stmts);
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
          (this).stringPatternHandler("%");
          (expr = ((this).leftHandSideExpression).call(this));
          return (Ast)("ImmediateExpressionPattern", {}, expr);
        }), (function () {
          (this).stringPatternHandler("%");
          (this)._not((this).whitespace);
          (this).stringPatternHandler("{");
          (stmts = (this)._repeat((this).statement));
          (this).stringPatternHandler("}");
          return (((Ast)("ImmediateBlockPattern")).concat)(stmts);
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
          (this)._choice((function () {
            return (this).stringPatternHandler("null");
          }), (function () {
            return (this).stringPatternHandler("boolean");
          }), (function () {
            return (this).stringPatternHandler("regex");
          }), (function () {
            return (this).stringPatternHandler("undefined");
          }));
          return ((this).error).call(this, "Not a valid literal pattern");
        }), (function () {
          (n = (this).stringPatternHandler("number"));
          return (Ast)("NumberPattern", {
            value: (n).value
          });
        }), (function () {
          (s = (this).stringPatternHandler("string"));
          return (Ast)("StringPattern", {
            value: (s).value
          });
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    variablePattern: {
      value: (function () {
        var name;
        return ((function () {
          (name = (this).stringPatternHandler("identifier"));
          return (Ast)("VariablePattern", {
            name: (name).value
          });
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    whitespace: {
      value: (function () {
        var token;
        return (this)._choice((function () {
          (this)._lookahead((function () {
            return (token = ((this).anything).call(this));
          }));
          return (this)._predicate((function () {
            return (!((token).previousToken) || ((token).previousToken).is("whitespace"));
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