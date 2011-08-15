"use strict";
var JSParser = ((require)("../JSParser")).JSParser;
var Ast = ((require)("../Runtime")).Ast;
var CombeJSLexer = (require)("./CombeJSLexer");
var CombeJSParser = ((module).exports = (Class).new(JSParser, {}, {
  DefaultLexer: CombeJSLexer,
  emptyState: (function () {
    return {
      position: 0,
      astTemplates: false
    };
  }),
  copyState: (function () {
    return {
      position: ((this).state).position,
      astTemplates: ((this).state).astTemplates
    };
  }),
  primaryExpression: (function () {
    return (this).memoize("unnamed_ZBs/qX8ns8KoGjsx1SRC7A", (function () {
      return (this)._choice(((JSParser).prototype).primaryExpression, (this).interpolateExpression, (this).interpolateIdentifier);
    }));
  }),
  interpolateExpression: (function () {
    return (this).memoize("unnamed_dIl3vRuPAicuqwnni8zYig", (function () {
      var body;
      return ((function () {
        (this).stringPatternHandler("%");
        (body = ((this).interpolationBody).call(this));
        return (Ast)("InterpolateExpression", {}, body);
      })).call(this);
    }));
  }),
  interpolateIdentifier: (function () {
    return (this).memoize("unnamed_XQcYImGDPSdXvZQyx1RQuw", (function () {
      var body;
      return ((function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("id");
        (body = ((this).interpolationBody).call(this));
        return (Ast)("InterpolateIdentifier", {}, body);
      })).call(this);
    }));
  }),
  arrayElement: (function () {
    return (this).memoize("unnamed_9Vj+/TCrHVZBLf/onyJgAg", (function () {
      var body;
      return (this)._choice(((JSParser).prototype).arrayElement, (function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("expand");
        (body = ((this).interpolationBody).call(this));
        return (Ast)("ExpandInterpolateArrayElement", {}, body);
      }));
    }));
  }),
  propertyAssignment: (function () {
    return (this).memoize("unnamed_gkwzKiQCtm7L9zbQdfVd9w", (function () {
      var name, expr, body;
      return (this)._choice(((JSParser).prototype).propertyAssignment, (function () {
        (this).stringPatternHandler("describe");
        (name = ((this).propertyName).call(this));
        (this).stringPatternHandler(":");
        (expr = ((this).assignmentExpression).call(this));
        return (Ast)("DescribePropertyDeclaration", {
          name: name
        }, expr);
      }), (function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("expand");
        (body = ((this).interpolationBody).call(this));
        return (Ast)("ExpandInterpolatePropertyAssignment", {}, body);
      }));
    }));
  }),
  memberExpression: (function () {
    return (this).memoize("unnamed_qqgw5GfUYxm1BElB0FO9Gg", (function () {
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
  arguments: (function () {
    return (this).memoize("unnamed_QjSrvYAuKCCZxZVCfzO8Mw", (function () {
      var exprs;
      return ((function () {
        (this).stringPatternHandler("(");
        (exprs = ((this).delimited).call(this, (this).expandInterpolateArgument, (function () {
          return (this).stringPatternHandler(",");
        })));
        (this).stringPatternHandler(")");
        return exprs;
      })).call(this);
    }));
  }),
  expandInterpolateArgument: (function () {
    return (this).memoize("unnamed_Gl/Hdoc/cN2YwqQg1BGcLQ", (function () {
      var body;
      return (this)._choice((function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("expand");
        (body = ((this).interpolationBody).call(this));
        return (Ast)("ExpandInterpolateArgument", {}, body);
      }), (this).assignmentExpression);
    }));
  }),
  prefixExpression: (function () {
    return (this).memoize("unnamed_TJnxfFII7IsA/EB8VdrMEg", (function () {
      return (((JSParser).prototype).unaryExpression).call(this);
    }));
  }),
  rangeInfinity: (function () {
    return (this).memoize("unnamed_zLGmKamB4i1RahSGlDFj8Q", (function () {
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
    return (this).memoize("unnamed_AfQ5sImmYQVgghh087wmng", (function () {
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
  expression: (function (noIn) {
    var exprs;
    return ((function () {
      (exprs = ((this).delimited1).call(this, (this).expandInterpolateExpression, (function () {
        return (this).stringPatternHandler(",");
      })));
      return (this)._choice((function () {
        (this)._predicate((function () {
          return (((exprs).length === 1) && ((exprs)[0]).is("ExpandInterpolateExpression"));
        }));
        return (((Ast)("ExpressionSequence")).concat)(exprs);
      }), (function () {
        (this)._predicate((function () {
          return ((exprs).length === 1);
        }));
        return (exprs)[0];
      }), (function () {
        return (((Ast)("ExpressionSequence")).concat)(exprs);
      }));
    })).call(this);
  }),
  expandInterpolateExpression: (function (noIn) {
    var body;
    return (this)._choice((function () {
      (this).stringPatternHandler("%");
      (this).stringPatternHandler("expand");
      (body = ((this).interpolationBody).call(this));
      return (Ast)("ExpandInterpolateExpression", {}, body);
    }), (function () {
      return ((this).assignmentExpression).call(this, noIn);
    }));
  }),
  statement: (function (noIn) {
    return (this)._choice((function () {
      return (((JSParser).prototype).statement).call(this, noIn);
    }), (this).interpolateStatements);
  }),
  interpolateStatements: (function () {
    return (this).memoize("unnamed_z4R97r9btvquVDYPtXQD7g", (function () {
      var body;
      return ((function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("statements");
        (body = ((this).interpolationBody).call(this));
        return (Ast)("InterpolateStatements", {}, body);
      })).call(this);
    }));
  }),
  expressionStatement: (function () {
    return (this).memoize("unnamed_LWrxH1S4PZflBIbz0+ysPw", (function () {
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
    return (this).memoize("unnamed_ORYPxkpM7PrwfzDl/0hHlQ", (function () {
      return (this)._choice(((JSParser).prototype).sourceElement, (this).ruleDeclaration);
    }));
  }),
  ruleDeclaration: (function () {
    return (this).memoize("unnamed_0NSUIXsX0HFCNsNUQd73nQ", (function () {
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
    return (this).memoize("unnamed_s39XL+L2OD3qJtRktPxC/g", (function () {
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
    return (this).memoize("unnamed_x4yed9xmvhCgDknzZ3SG0g", (function () {
      return (this)._choice((this).choicePattern, (function () {
        (this)._optional((function () {
          return (this).stringPatternHandler("|");
        }));
        return (Ast)("EmptyPattern");
      }));
    }));
  }),
  pattern: (function () {
    return (this).memoize("unnamed_gWModhHClaznyhG58sKjnw", (function () {
      return ((this).choicePattern).call(this);
    }));
  }),
  choicePattern: (function () {
    return (this).memoize("unnamed_w2FWWkemjbh8hFzP8CXIVg", (function () {
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
    return (this).memoize("unnamed_0apo3rggmndLxJKgPaCCkw", (function () {
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
    return (this).memoize("unnamed_PHgJ2MAN8bVTeGmO5FuJmw", (function () {
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
    return (this).memoize("unnamed_/TqKtD/Sd1QyglqwDPOhpw", (function () {
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
    return (this).memoize("unnamed_xxZ7QVrx6vjCfeyKVtaXXw", (function () {
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
    return (this).memoize("unnamed_gu1ZuugONwvUh9tAlSG0MA", (function () {
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
    return (this).memoize("unnamed_+HVA8XwhuHMA9noKMrHQ3g", (function () {
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
    return (this).memoize("unnamed_N/IDHZBE8sLbjlCirgZqQA", (function () {
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
    return (this).memoize("unnamed_wmMAH8TYabs5Bh7Hge3HuA", (function () {
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
    return (this).memoize("unnamed_wXG1xLU8Rmu50T3+pMW2nw", (function () {
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
    return (this).memoize("unnamed_wuDpTxc/pTf2TXAdwKuMEA", (function () {
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
    return (this).memoize("unnamed_HqYwmOR0WZVNrcdtl+u12Q", (function () {
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
    return (this).memoize("unnamed_LbW9flb6qX9QWHNg87NJFw", (function () {
      var name;
      return ((function () {
        (name = (this).stringPatternHandler("identifier"));
        return (Ast)("VariablePattern", {
          name: (name).value
        });
      })).call(this);
    }));
  }),
  astTemplateExpression: (function () {
    return (this).memoize("unnamed_O3newRtUVdZ8tBZfS3mFXA", (function () {
      var expr, stmts;
      return (this)._choice((function () {
        (this).stringPatternHandler("__ast");
        (this).stringPatternHandler("(");
        (expr = ((this).withAstTemplates).call(this, (this).expression));
        (this).stringPatternHandler(")");
        return (Ast)("ExpressionAstTemplate", {}, expr);
      }), (function () {
        (this).stringPatternHandler("__ast");
        (this).stringPatternHandler("{");
        (stmts = ((this).wihtAstTemplates).call(this, (this).functionBody));
        (this).stringPatternHandler("}");
        return (((Ast)("StatementAstTemplate")).concat)(stmts);
      }));
    }));
  }),
  withAstTemplates: (function (pattern) {
    var oldval, r;
    return ((function () {
      (oldval = ((this).state).astTemplates);
      (((this).state).astTemplates = true);
      (r = (pattern).call(this));
      (((this).state).astTemplates = oldval);
      return r;
    })).call(this);
  }),
  interpolationBody: (function () {
    return (this).memoize("unnamed_Fi77z8IKKK1PAZSAA3cddg", (function () {
      var expr, stmts;
      return (this)._choice((function () {
        (this).stringPatternHandler("(");
        (expr = ((this).withoutAstTemplates).call(this, (this).expression));
        (this).stringPatternHandler(")");
        return (Ast)("ExpressionInterpolationBody", {}, expr);
      }), (function () {
        (this).stringPatternHandler("{");
        (stmts = ((this).withoutAstTemplates).call(this, (this).functionBody));
        (this).stringPatternHandler("}");
        return (((Ast)("StatementsInterpolationBody")).concat)(stmts);
      }));
    }));
  }),
  withoutAstTemplates: (function (pattern) {
    var oldval, r;
    return ((function () {
      (oldval = ((this).state).astTemplates);
      (((this).state).astTemplates = false);
      (r = (pattern).call(this));
      (((this).statement).astTemplates = oldval);
      return r;
    })).call(this);
  }),
  whitespace: (function () {
    return (this).memoize("unnamed_JWkGksbvRWdO7FDYyXBW4Q", (function () {
      var token;
      return (this)._choice((function () {
        (token = ((this).peekNext).call(this));
        return (this)._predicate((function () {
          return (!((token).previousToken) || ((token).previousToken).is("whitespace"));
        }));
      }), (this).eof);
    }));
  })
}));