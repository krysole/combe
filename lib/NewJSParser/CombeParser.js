"use strict";
var JSParser = (require)("./JSParser");
var Ast = (require)("./CombeAst");
var CombeLexer = (require)("./CombeLexer");
var CombeParser = ((module).exports = (Class).new(JSParser, {
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
    var parser = (this).new((CombeLexer).new(string));
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
    return (this).memoize("unnamed_hDVPPdfMYZclDCOneywH0g", (function () {
      return (this)._choice(((JSParser).prototype).primaryExpression, (this).interpolateExpression);
    }));
  }),
  interpolateExpression: (function () {
    return (this).memoize("unnamed_EM1TldOgP8Al6FlWsvvN4w", (function () {
      var body;
      return ((function () {
        (this).stringPatternHandler("%");
        (body = ((this).interpolationBody).call(this));
        return (Ast).InterpolateExpression(body);
      })).call(this);
    }));
  }),
  arrayElement: (function () {
    return (this).memoize("unnamed_oJLB3Y9xrX5gvWqyK8GX/A", (function () {
      var body;
      return (this)._choice(((JSParser).prototype).arrayElement, (function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("expand");
        (body = ((this).interpolationBody).call(this));
        return (Ast).ExpandInterpolate(body);
      }));
    }));
  }),
  propertyAssignment: (function () {
    return (this).memoize("unnamed_fO4UnCKliJwSnthz58hwAg", (function () {
      var name, expr, body;
      return (this)._choice(((JSParser).prototype).propertyAssignment, (function () {
        (this).stringPatternHandler("describe");
        (name = ((this).propertyName).call(this));
        (this).stringPatternHandler(":");
        (expr = ((this).assignmentExpression).call(this));
        return (Ast).DescribeProperty(name, expr);
      }), (function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("expand");
        (body = ((this).interpolationBody).call(this));
        return (Ast).ExpandInterpolate(body);
      }));
    }));
  }),
  memberExpression: (function () {
    return (this).memoize("unnamed_KnoBnrUI3p+we+3Y53LzQQ", (function () {
      var expr, ctor, args;
      return ((function () {
        (expr = (this)._choice((this).primaryExpression, (this).functionExpression, (this).ruleExpression, (function () {
          (this).stringPatternHandler("new");
          (ctor = ((this).memberExpression).call(this));
          (args = ((this).arguments).call(this));
          return (Ast).New(ctor, args);
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
    return (this).memoize("unnamed_dGgidX7W2bOUnlxrQ1qGXQ", (function () {
      var body;
      return (this)._choice((function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("expand");
        (body = ((this).interpolationBody).call(this));
        return (Ast).ExpandInterpolate(body);
      }), (this).assignmentExpression);
    }));
  }),
  prefixExpression: (function () {
    return (this).memoize("unnamed_TJnxfFII7IsA/EB8VdrMEg", (function () {
      return (((JSParser).prototype).unaryExpression).call(this);
    }));
  }),
  rangeInfinity: (function () {
    return (this).memoize("unnamed_v18YogCPvjwVLK26adygYg", (function () {
      return ((function () {
        (this).stringPatternHandler("*");
        return (Ast).RangeInfinity();
      })).call(this);
    }));
  }),
  rangeOperator: (function (ast) {
    var rhs;
    return (this)._choice((function () {
      (this).stringPatternHandler("..");
      (rhs = (this)._choice((this).rangeInfinity, (this).prefixExpression));
      return (Ast).InclusiveRange(ast, rhs);
    }), (function () {
      (this).stringPatternHandler("...");
      (rhs = (this)._choice((this).rangeInfinity, (this).prefixExpression));
      return (Ast).ExclusiveRange(ast, rhs);
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
  expressionNoInFlag: (function (noIn) {
    var exprs;
    return ((function () {
      (exprs = ((this).delimited1).call(this, (this).expandInterpolateExpression, (function () {
        return (this).stringPatternHandler(",");
      })));
      return (this)._choice((function () {
        (this)._predicate((function () {
          return (((exprs).length === 1) && ((exprs)[0]).is("ExpandInterpolateExpression"));
        }));
        return (Ast).Sequence(exprs);
      }), (function () {
        (this)._predicate((function () {
          return ((exprs).length === 1);
        }));
        return (exprs)[0];
      }), (function () {
        return (Ast).Sequence(exprs);
      }));
    })).call(this);
  }),
  expandInterpolateExpression: (function (noIn) {
    var body;
    return (this)._choice((function () {
      (this).stringPatternHandler("%");
      (this).stringPatternHandler("expand");
      (body = ((this).interpolationBody).call(this));
      return (Ast).ExpandInterpolate(body);
    }), (function () {
      return ((this).assignmentExpression).call(this, noIn);
    }));
  }),
  statement: (function () {
    return (this).memoize("unnamed_sERDk477qctwM/gGiDg17A", (function () {
      return (this)._choice(((JSParser).prototype).statement, (this).interpolateStatements);
    }));
  }),
  interpolateStatements: (function () {
    return (this).memoize("unnamed_0k9RcmvqxTz0EqrMP/FbAw", (function () {
      var body;
      return ((function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("statements");
        (body = ((this).interpolationBody).call(this));
        return (Ast).InterpolateStatements(body);
      })).call(this);
    }));
  }),
  variableDeclarationList: (function (noIn) {
    var lst;
    return (lst = ((this).delimited1).call(this, (function () {
      return ((this).expandInterpolateVariableDeclaration).call(this, noIn);
    }), (function () {
      return (this).stringPatternHandler(",");
    })));
  }),
  expandInterpolateVariableDeclaration: (function (noIn) {
    var body;
    return (this)._choice((function () {
      (this).stringPatternHandler("%");
      (this).stringPatternHandler("expand");
      (body = ((this).interpolationBody).call(this));
      return (Ast).ExpandInterpolate(body);
    }), (function () {
      return ((this).variableDeclaration).call(this, noIn);
    }));
  }),
  expressionStatement: (function () {
    return (this).memoize("unnamed_+cFU3asUQpx+E8VMjjFwaQ", (function () {
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
        return (Ast).ExpressionStatement(expr);
      })).call(this);
    }));
  }),
  functionArguments: (function () {
    return (this).memoize("unnamed_hejEKWqHvaTnBNpMBsMDiA", (function () {
      var args;
      return ((function () {
        (this).stringPatternHandler("(");
        (args = ((this).delimited).call(this, (this).expandInterpolateFunctionArgument, (function () {
          return (this).stringPatternHandler(",");
        })));
        (this).stringPatternHandler(")");
        return args;
      })).call(this);
    }));
  }),
  expandInterpolateFunctionArgument: (function () {
    return (this).memoize("unnamed_avL1kF8gjK9Ik8EJH46sWA", (function () {
      var body, name;
      return (this)._choice((function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("expand");
        (body = ((this).interpolationBody).call(this));
        return (Ast).ExpandInterpolate(body);
      }), (function () {
        (name = ((this).identifier).call(this));
        return (name).identifierName;
      }));
    }));
  }),
  identifier: (function () {
    return (this).memoize("unnamed_t5AhGoBcpC4LdKcEbViFew", (function () {
      var name, body;
      return (this)._choice((function () {
        (name = (this).stringPatternHandler("identifier"));
        (this)._predicate((function () {
          return !(((this).ReservedWords).include((name).text));
        }));
        return (name).text;
      }), (function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("id");
        (body = ((this).interpolationBody).call(this));
        return (Ast).InterpolateIdentifier(body);
      }));
    }));
  }),
  get ReservedWords() {
    if (((this)._ReservedWords == null)) {
      ((this)._ReservedWords = ((String).ReservedWords).concat([
        "rule",
        "__ast"
      ]));
    }
    return (this)._ReservedWords;
  },
  identifierName: (function () {
    return (this).memoize("unnamed_Ozd3y5F6jWlRchniuGAMlQ", (function () {
      var name, body;
      return (this)._choice((function () {
        (name = (this).stringPatternHandler("identifier"));
        return (name).text;
      }), (function () {
        (this).stringPatternHandler("%");
        (this).stringPatternHandler("id");
        (body = ((this).interpolationBody).call(this));
        return (Ast).InterpolateIdentifier(body);
      }));
    }));
  }),
  ruleExpression: (function () {
    return (this).memoize("unnamed_j77b33nzOlGUiWIGQTjXhQ", (function () {
      var name, args, ptn;
      return ((function () {
        (this).stringPatternHandler("rule");
        (name = (this)._optional((this).identifier));
        (args = (this)._optional((this).functionArguments));
        (this).stringPatternHandler("{");
        (ptn = ((this).optionalPattern).call(this));
        (this).stringPatternHandler("}");
        return (Ast).Rule(name, args, ptn);
      })).call(this);
    }));
  }),
  optionalPattern: (function () {
    return (this).memoize("unnamed_cmRQQfY5ClbYVJEoVmZv0g", (function () {
      return (this)._choice((this).choicePattern, (function () {
        (this)._optional((function () {
          return (this).stringPatternHandler("|");
        }));
        return (Ast).EmptyPattern();
      }));
    }));
  }),
  pattern: (function () {
    return (this).memoize("unnamed_gWModhHClaznyhG58sKjnw", (function () {
      return ((this).choicePattern).call(this);
    }));
  }),
  choicePattern: (function () {
    return (this).memoize("unnamed_KXYzYI3GY3AthaySIVUY1A", (function () {
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
          return (ptn = (Ast).ChoicePattern(([
            ptn
          ]).concat(ptns)));
        }));
        (this)._optional((function () {
          (this).stringPatternHandler("|");
          return (ptn).push((Ast).EmptyPattern());
        }));
        return ptn;
      })).call(this);
    }));
  }),
  returnPattern: (function () {
    return (this).memoize("unnamed_w1dMOeHlfqieghTh4czT6g", (function () {
      var ptn, expr, stmts;
      return (this)._choice((function () {
        (ptn = ((this).concatPattern).call(this));
        return (this)._choice((function () {
          (this).stringPatternHandler("->");
          (expr = ((this).leftHandSideExpression).call(this));
          return (Ast).ConcatPattern([
            ptn,
            (Ast).ActionPattern((Ast).ExpressionBody(expr))
          ]);
        }), (function () {
          (this).stringPatternHandler("->");
          (this).stringPatternHandler("{");
          (stmts = (this)._repeat((this).statement));
          (this).stringPatternHandler("}");
          return (Ast).ConcatPattern([
            ptn,
            (Ast).ActionPattern((Ast).StatementsBody(stmts))
          ]);
        }), (function () {
          return ptn;
        }));
      }), (function () {
        (this).stringPatternHandler("->");
        (expr = ((this).leftHandSideExpression).call(this));
        return (Ast).ActionPattern((Ast).ExpressionBody(expr));
      }), (function () {
        (this).stringPatternHandler("->");
        (this).stringPatternHandler("{");
        (stmts = (this)._repeat((this).statement));
        (this).stringPatternHandler("}");
        return (Ast).ActionPattern((Ast).StatementsBody(stmts));
      }));
    }));
  }),
  concatPattern: (function () {
    return (this).memoize("unnamed_gHB7qoxNFP3q4cXEgl6HYg", (function () {
      var ptn, ptns;
      return ((function () {
        (ptn = ((this).prefixOperatorPattern).call(this));
        return (this)._choice((function () {
          (ptns = (this)._repeat1((this).prefixOperatorPattern));
          return (Ast).ConcatPattern(([
            ptn
          ]).concat(ptns));
        }), (function () {
          return ptn;
        }));
      })).call(this);
    }));
  }),
  prefixOperatorPattern: (function () {
    return (this).memoize("unnamed_XifgK+AauhG0dy+EENhUww", (function () {
      var ptn;
      return (this)._choice((this).postfixOperatorPattern, (function () {
        (this).stringPatternHandler("~");
        (ptn = ((this).prefixOperatorPattern).call(this));
        return (Ast).NotPattern(ptn);
      }), (function () {
        (this).stringPatternHandler("&");
        (ptn = ((this).prefixOperatorPattern).call(this));
        return (Ast).LookaheadPattern(ptn);
      }), (function () {
        (this).stringPatternHandler("#");
        (ptn = ((this).prefixOperatorPattern).call(this));
        return (Ast).TokenOperatorPattern(ptn);
      }));
    }));
  }),
  postfixOperatorPattern: (function () {
    return (this).memoize("unnamed_4eOnTXBljhFnUkaTARXH7w", (function () {
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
        (name = ((this).identifier).call(this));
        return (Ast).BindPattern(name, (Ast).AnythingPattern());
      }));
    }));
  }),
  repeatOperatorPattern: (function (ptn) {
    var name;
    return (this)._choice((function () {
      (this).stringPatternHandler("*");
      return (Ast).RepeatPattern(ptn);
    }), (function () {
      (this).stringPatternHandler("+");
      return (Ast).Repeat1Pattern(ptn);
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
      return (Ast).OptionalPattern(ptn);
    }), (function () {
      (this)._not((this).whitespace);
      (this).stringPatternHandler(":");
      (this)._not((this).whitespace);
      (name = ((this).identifier).call(this));
      return (Ast).BindPattern(name, ptn);
    }));
  }),
  applyPattern: (function () {
    return (this).memoize("unnamed_21VFpriw3O8bOaI0cA3VOQ", (function () {
      var ptn, args;
      return ((function () {
        (ptn = ((this).primaryPattern).call(this));
        (this)._repeat((function () {
          return (this)._choice((function () {
            (this)._not((this).whitespace);
            (args = ((this).arguments).call(this));
            return (ptn = (Ast).JSApplyPattern(ptn, args));
          }), (function () {
            (this)._not((this).whitespace);
            (args = ((this).patternArguments).call(this));
            return (ptn = (Ast).ApplyPattern(ptn, args));
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
    return (this).memoize("unnamed_KvqB/tlUWGskFv1tGIF6rQ", (function () {
      var body;
      return ((function () {
        (this).stringPatternHandler("?");
        (this)._not((this).whitespace);
        (body = ((this).interpolationBody).call(this));
        return (Ast).PredicatePattern(body);
      })).call(this);
    }));
  }),
  actionPattern: (function () {
    return (this).memoize("unnamed_Y94IznaclmWZP6jJt9ub6g", (function () {
      var body;
      return ((function () {
        (this).stringPatternHandler("!");
        (this)._not((this).whitespace);
        (body = ((this).interpolationBody).call(this));
        return (Ast).ActionPattern(body);
      })).call(this);
    }));
  }),
  immediatePattern: (function () {
    return (this).memoize("unnamed_MYpl5cItZ+h8Z9/Q2IdJ4Q", (function () {
      var expr, body;
      return (this)._choice((function () {
        (this).stringPatternHandler("%");
        (this)._not((this).whitespace);
        (expr = ((this).leftHandSideExpression).call(this));
        return (Ast).ImmediatePattern((Ast).ExpressionBody(expr));
      }), (function () {
        (this).stringPatternHandler("%");
        (this)._not((this).whitespace);
        (body = ((this).interpolationBody).call(this));
        return (Ast).ImmediatePattern(body);
      }));
    }));
  }),
  literalPattern: (function () {
    return (this).memoize("unnamed_ykIeYYYxsXDdwbmx1cpVnw", (function () {
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
        return (Ast).NumberPattern((n).value);
      }), (function () {
        (s = (this).stringPatternHandler("string"));
        return (Ast).StringPattern((s).value);
      }));
    }));
  }),
  variablePattern: (function () {
    return (this).memoize("unnamed_Z+vJSi3ql4PfFiAjct5nGg", (function () {
      var name;
      return ((function () {
        (name = ((this).identifier).call(this));
        return (Ast).VariablePattern(name);
      })).call(this);
    }));
  }),
  astTemplateExpression: (function () {
    return (this).memoize("unnamed_Q/P34afpFx/6LjTS6or/Kw", (function () {
      var body;
      return ((function () {
        (this).stringPatternHandler("__ast");
        (body = ((this).interpolationBody).call(this));
        return (Ast).AstTemplate(body);
      })).call(this);
    }));
  }),
  interpolationBody: (function () {
    return (this).memoize("unnamed_6GBCpKh/gXaR2gpwcfkpfA", (function () {
      var expr, stmts;
      return (this)._choice((function () {
        (this).stringPatternHandler("(");
        (expr = ((this).expression).call(this));
        (this).stringPatternHandler(")");
        return (Ast).ExpressionBody(expr);
      }), (function () {
        (this).stringPatternHandler("{");
        (stmts = ((this).functionBody).call(this));
        (this).stringPatternHandler("}");
        return (Ast).StatementsBody(stmts);
      }));
    }));
  }),
  whitespace: (function () {
    if ((((this).state).position === 0)) {
      return null;
    } else if ((this).isEof()) {
      return null;
    } else {
      var last = (this).tokenAt((((this).state).position - 1));
      var curr = (this).peekNext();
      if ((((last).position + ((last).text).length) < (curr).position)) {
        return null;
      } else {
        return (this).fail();
      }
    }
  })
}));