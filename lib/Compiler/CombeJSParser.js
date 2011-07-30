"use strict";
var JSParser = ((require)("../JSParser")).JSParser;
var Ast = ((require)("../Runtime")).Ast;
var CombeJSLexer = (require)("./CombeJSLexer");
var CombeJSParser = ((module).exports = (Class).new(JSParser, {}, {
  DefaultLexer: CombeJSLexer,
  propertyAssignment: (function () {
    return (this)._memoize("unnamed_Zdc+/YnHsrSMOp02SkNHDg", (function () {
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
    }));
  }),
  memberExpression: (function () {
    return (this)._memoize("unnamed_qqgw5GfUYxm1BElB0FO9Gg", (function () {
      var expr, ctor, args;
      return ((function () {
        (expr = (this)._choice((this).primaryExpression, (this).functionExpression, (this).ruleExpression, (function () {
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
  prefixExpression: (function () {
    return (this)._memoize("unnamed_TJnxfFII7IsA/EB8VdrMEg", (function () {
      return (((JSParser).prototype).unaryExpression).call(this);
    }));
  }),
  rangeInfinity: (function () {
    return (this)._memoize("unnamed_zLGmKamB4i1RahSGlDFj8Q", (function () {
      return ((function () {
        (this).stringPatternHandler("*");
        return (Ast)("RangeInfinity");
      })).call(this);
    }));
  }),
  rangeOperator: (function (ast) {
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
  unaryExpression: (function () {
    return (this)._memoize("unnamed_AfQ5sImmYQVgghh087wmng", (function () {
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
    }));
  }),
  expressionStatement: (function () {
    return (this)._memoize("unnamed_LWrxH1S4PZflBIbz0+ysPw", (function () {
      var expr;
      return ((function () {
        (this)._not((function () {
          return (this)._choice((function () {
            return (this).stringPatternHandler("{");
          }), (function () {
            return (this).stringPatternHandler("function");
          }), (function () {
            return (this).stringPatternHandler("rule");
          }));
        }));
        (expr = ((this).expression).call(this));
        (this).stringPatternHandler(";");
        return (Ast)("ExpressionStatement", {}, expr);
      })).call(this);
    }));
  }),
  sourceElement: (function () {
    return (this)._memoize("unnamed_ORYPxkpM7PrwfzDl/0hHlQ", (function () {
      return (this)._choice(((JSParser).prototype).sourceElement, (this).ruleDeclaration);
    }));
  }),
  ruleDeclaration: (function () {
    return (this)._memoize("unnamed_0NSUIXsX0HFCNsNUQd73nQ", (function () {
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
    }));
  }),
  ruleExpression: (function () {
    return (this)._memoize("unnamed_s39XL+L2OD3qJtRktPxC/g", (function () {
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
    }));
  }),
  optionalPattern: (function () {
    return (this)._memoize("unnamed_x4yed9xmvhCgDknzZ3SG0g", (function () {
      return (this)._choice((this).choicePattern, (function () {
        (this)._optional((function () {
          return (this).stringPatternHandler("|");
        }));
        return (Ast)("EmptyPattern");
      }));
    }));
  }),
  pattern: (function () {
    return (this)._memoize("unnamed_gWModhHClaznyhG58sKjnw", (function () {
      return ((this).choicePattern).call(this);
    }));
  }),
  choicePattern: (function () {
    return (this)._memoize("unnamed_w2FWWkemjbh8hFzP8CXIVg", (function () {
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
    }));
  }),
  returnPattern: (function () {
    return (this)._memoize("unnamed_0apo3rggmndLxJKgPaCCkw", (function () {
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
    }));
  }),
  concatPattern: (function () {
    return (this)._memoize("unnamed_PHgJ2MAN8bVTeGmO5FuJmw", (function () {
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
    }));
  }),
  prefixOperatorPattern: (function () {
    return (this)._memoize("unnamed_/TqKtD/Sd1QyglqwDPOhpw", (function () {
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
    }));
  }),
  postfixOperatorPattern: (function () {
    return (this)._memoize("unnamed_xxZ7QVrx6vjCfeyKVtaXXw", (function () {
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
    }));
  }),
  repeatOperatorPattern: (function (ptn) {
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
  applyPattern: (function () {
    return (this)._memoize("unnamed_gu1ZuugONwvUh9tAlSG0MA", (function () {
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
    }));
  }),
  patternArguments: (function () {
    return (this)._memoize("unnamed_+HVA8XwhuHMA9noKMrHQ3g", (function () {
      var args;
      return ((function () {
        (this).stringPatternHandler("[");
        (args = ((this).delimited).call(this, (this).pattern, (function () {
          return (this).stringPatternHandler(",");
        })));
        (this).stringPatternHandler("]");
        return args;
      })).call(this);
    }));
  }),
  primaryPattern: (function () {
    return (this)._memoize("unnamed_N/IDHZBE8sLbjlCirgZqQA", (function () {
      var ptn;
      return (this)._choice((this).predicatePattern, (this).actionPattern, (this).immediatePattern, (this).literalPattern, (this).variablePattern, (function () {
        (this).stringPatternHandler("(");
        (ptn = ((this).pattern).call(this));
        (this).stringPatternHandler(")");
        return ptn;
      }));
    }));
  }),
  predicatePattern: (function () {
    return (this)._memoize("unnamed_wmMAH8TYabs5Bh7Hge3HuA", (function () {
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
    }));
  }),
  actionPattern: (function () {
    return (this)._memoize("unnamed_wXG1xLU8Rmu50T3+pMW2nw", (function () {
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
    }));
  }),
  immediatePattern: (function () {
    return (this)._memoize("unnamed_wuDpTxc/pTf2TXAdwKuMEA", (function () {
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
    }));
  }),
  literalPattern: (function () {
    return (this)._memoize("unnamed_HqYwmOR0WZVNrcdtl+u12Q", (function () {
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
    }));
  }),
  variablePattern: (function () {
    return (this)._memoize("unnamed_LbW9flb6qX9QWHNg87NJFw", (function () {
      var name;
      return ((function () {
        (name = (this).stringPatternHandler("identifier"));
        return (Ast)("VariablePattern", {
          name: (name).value
        });
      })).call(this);
    }));
  }),
  whitespace: (function () {
    return (this)._memoize("unnamed_GNqOOyOjA6jl/6ZE4bSMCA", (function () {
      var token;
      return (this)._choice((function () {
        (this)._lookahead((function () {
          return (token = ((this).anything).call(this));
        }));
        return (this)._predicate((function () {
          return (!((token).previousToken) || ((token).previousToken).is("whitespace"));
        }));
      }), (this).eof);
    }));
  })
}));