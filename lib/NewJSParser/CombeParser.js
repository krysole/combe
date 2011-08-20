// Generated code
"use strict";
var JSParser = require("./JSParser");
var Ast = require("./CombeAst");
var CombeLexer = require("./CombeLexer");
var CombeParser = module.exports = Class.new(JSParser, {
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
    var parser = this.new(CombeLexer.new(string));
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
  emptyState: (function () {
    return {
      position: 0,
      astTemplates: false
    };
  }),
  copyState: (function () {
    return {
      position: this.state.position,
      astTemplates: this.state.astTemplates
    };
  }),
  primaryExpression: (function () {
    return this.memoize("Ae8MsyprD8Q8XjREeCmQmg", (function () {
      return this._choice(JSParser.prototype.primaryExpression, this.interpolateExpression);
    }));
  }),
  interpolateExpression: (function () {
    return this.memoize("yDDI1X+YESlsXnO2yQbRnw", (function () {
      var body;
      return (function () {
        (function () {
          this.stringPatternHandler("%");
          return body = this.interpolationBody();
        }).call(this);
        return Ast.InterpolateExpression(body);
      }).call(this);
    }));
  }),
  arrayElement: (function () {
    return this.memoize("kFsW4ylOmDO9pdYVSYdZ2A", (function () {
      var body;
      return this._choice(JSParser.prototype.arrayElement, (function () {
        (function () {
          this.stringPatternHandler("%");
          this.stringPatternHandler("expand");
          return body = this.interpolationBody();
        }).call(this);
        return Ast.ExpandInterpolate(body);
      }));
    }));
  }),
  propertyAssignment: (function () {
    return this.memoize("rySHHRQ4Nf4dVHDS165rIQ", (function () {
      var name, expr, body;
      return this._choice(JSParser.prototype.propertyAssignment, (function () {
        (function () {
          this.stringPatternHandler("describe");
          name = this.propertyName();
          this.stringPatternHandler(":");
          return expr = this.assignmentExpression();
        }).call(this);
        return Ast.DescribeProperty(name, expr);
      }), (function () {
        (function () {
          this.stringPatternHandler("%");
          this.stringPatternHandler("expand");
          return body = this.interpolationBody();
        }).call(this);
        return Ast.ExpandInterpolate(body);
      }));
    }));
  }),
  memberExpression: (function () {
    return this.memoize("4IFH1cP8gPQUb1K6RYQUHg", (function () {
      var expr, ctor, args;
      return (function () {
        (function () {
          expr = this._choice(this.primaryExpression, this.functionExpression, this.ruleExpression, (function () {
            (function () {
              this.stringPatternHandler("new");
              ctor = this.memberExpression();
              return args = this.arguments();
            }).call(this);
            return Ast.New(ctor, args);
          }));
          return this._repeat((function () {
            return expr = this.propertyAccessor(expr);
          }));
        }).call(this);
        return expr;
      }).call(this);
    }));
  }),
  arguments: (function () {
    return this.memoize("LwENiTh/7hC/FN/nbqRwTw", (function () {
      var exprs;
      return (function () {
        (function () {
          this.stringPatternHandler("(");
          exprs = this.delimited(this.expandInterpolateArgument, (function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler(")");
        }).call(this);
        return exprs;
      }).call(this);
    }));
  }),
  expandInterpolateArgument: (function () {
    return this.memoize("4XrUrA0Q70wV+IXfcx5kUg", (function () {
      var body;
      return this._choice((function () {
        (function () {
          this.stringPatternHandler("%");
          this.stringPatternHandler("expand");
          return body = this.interpolationBody();
        }).call(this);
        return Ast.ExpandInterpolate(body);
      }), this.assignmentExpression);
    }));
  }),
  prefixExpression: (function () {
    return this.memoize("LP9SiEbPvmDttb9kplCSKw", (function () {
      return JSParser.prototype.unaryExpression.call(this);
    }));
  }),
  rangeInfinity: (function () {
    return this.memoize("e7EGFnKO7lguD7eCkjL/vg", (function () {
      return (function () {
        this.stringPatternHandler("*");
        return Ast.RangeInfinity();
      }).call(this);
    }));
  }),
  rangeOperator: (function (ast) {
    var rhs;
    return this._choice((function () {
      (function () {
        this.stringPatternHandler("..");
        return rhs = this._choice(this.rangeInfinity, this.prefixExpression);
      }).call(this);
      return Ast.InclusiveRange(ast, rhs);
    }), (function () {
      (function () {
        this.stringPatternHandler("...");
        return rhs = this._choice(this.rangeInfinity, this.prefixExpression);
      }).call(this);
      return Ast.ExclusiveRange(ast, rhs);
    }));
  }),
  unaryExpression: (function () {
    return this.memoize("S2IomhnXCeDMiKRtpwjkCw", (function () {
      var expr;
      return (function () {
        (function () {
          this._choice((function () {
            expr = this.rangeInfinity();
            return expr = this.rangeOperator(expr);
          }), (function () {
            return expr = this.prefixExpression();
          }));
          return this._repeat((function () {
            return expr = this.rangeOperator(expr);
          }));
        }).call(this);
        return expr;
      }).call(this);
    }));
  }),
  expressionNoInFlag: (function (noIn) {
    var exprs;
    return (function () {
      exprs = this.delimited1(this.expandInterpolateExpression, (function () {
        return this.stringPatternHandler(",");
      }));
      return this._choice((function () {
        this._predicate((function () {
          return (exprs.length === 1) && exprs[0].is("ExpandInterpolateExpression");
        }));
        return Ast.Sequence(exprs);
      }), (function () {
        this._predicate((function () {
          return exprs.length === 1;
        }));
        return exprs[0];
      }), (function () {
        return Ast.Sequence(exprs);
      }));
    }).call(this);
  }),
  expandInterpolateExpression: (function (noIn) {
    var body;
    return this._choice((function () {
      (function () {
        this.stringPatternHandler("%");
        this.stringPatternHandler("expand");
        return body = this.interpolationBody();
      }).call(this);
      return Ast.ExpandInterpolate(body);
    }), (function () {
      return this.assignmentExpression(noIn);
    }));
  }),
  statement: (function () {
    return this.memoize("wAdd1SEX7Su+Nghd7t/n9Q", (function () {
      return this._choice(JSParser.prototype.statement, this.interpolateStatements);
    }));
  }),
  interpolateStatements: (function () {
    return this.memoize("JovIWCNbUvBjUIVQwt2zRQ", (function () {
      var body;
      return (function () {
        (function () {
          this.stringPatternHandler("%");
          this.stringPatternHandler("statements");
          return body = this.interpolationBody();
        }).call(this);
        return Ast.InterpolateStatements(body);
      }).call(this);
    }));
  }),
  variableDeclarationList: (function (noIn) {
    var lst;
    return lst = this.delimited1((function () {
      return this.expandInterpolateVariableDeclaration(noIn);
    }), (function () {
      return this.stringPatternHandler(",");
    }));
  }),
  expandInterpolateVariableDeclaration: (function (noIn) {
    var body;
    return this._choice((function () {
      (function () {
        this.stringPatternHandler("%");
        this.stringPatternHandler("expand");
        return body = this.interpolationBody();
      }).call(this);
      return Ast.ExpandInterpolate(body);
    }), (function () {
      return this.variableDeclaration(noIn);
    }));
  }),
  expressionStatement: (function () {
    return this.memoize("jNAiaVNm26Od1mTrTpg+mA", (function () {
      var expr;
      return (function () {
        (function () {
          this._not((function () {
            return this._choice((function () {
              return this.stringPatternHandler("{");
            }), (function () {
              return this.stringPatternHandler("function");
            }), (function () {
              return this.stringPatternHandler("rule");
            }));
          }));
          expr = this.expression();
          return this.stringPatternHandler(";");
        }).call(this);
        return Ast.ExpressionStatement(expr);
      }).call(this);
    }));
  }),
  functionArguments: (function () {
    return this.memoize("QV/lV0/R/yyFFPAlcD5FeA", (function () {
      var args;
      return (function () {
        (function () {
          this.stringPatternHandler("(");
          args = this.delimited(this.expandInterpolateFunctionArgument, (function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler(")");
        }).call(this);
        return args;
      }).call(this);
    }));
  }),
  expandInterpolateFunctionArgument: (function () {
    return this.memoize("VGH4cAPKRPRNb+dJsNi2AQ", (function () {
      var body;
      return this._choice((function () {
        (function () {
          this.stringPatternHandler("%");
          this.stringPatternHandler("expand");
          return body = this.interpolationBody();
        }).call(this);
        return Ast.ExpandInterpolate(body);
      }), this.identifier);
    }));
  }),
  identifier: (function () {
    return this.memoize("sjCJBx2C6Kmk+5cSd8t48A", (function () {
      var body;
      return this._choice(JSParser.prototype.identifier, (function () {
        (function () {
          this.stringPatternHandler("%");
          this.stringPatternHandler("id");
          return body = this.interpolationBody();
        }).call(this);
        return Ast.InterpolateIdentifier(body);
      }));
    }));
  }),
  identifierName: (function () {
    return this.memoize("YtSbFxS5dUw/PvwXzrq0Gg", (function () {
      var body;
      return this._choice(JSParser.prototype.identifierName, (function () {
        (function () {
          this.stringPatternHandler("%");
          this.stringPatternHandler("id");
          return body = this.interpolationBody();
        }).call(this);
        return Ast.InterpolateIdentifier(body);
      }));
    }));
  }),
  ruleExpression: (function () {
    return this.memoize("CZ4pnfhoivdKFT+oJzZQow", (function () {
      var name, args, ptn;
      return (function () {
        (function () {
          this.stringPatternHandler("rule");
          name = this._optional(this.identifier);
          args = this._optional(this.functionArguments);
          this.stringPatternHandler("{");
          ptn = this.optionalPattern();
          return this.stringPatternHandler("}");
        }).call(this);
        return Ast.Rule(name, args ? args : [
          /* elision */
        ], ptn);
      }).call(this);
    }));
  }),
  optionalPattern: (function () {
    return this.memoize("RXM3ZircDjli9X/6YgahKQ", (function () {
      return this._choice(this.choicePattern, (function () {
        this._optional((function () {
          return this.stringPatternHandler("|");
        }));
        return Ast.EmptyPattern();
      }));
    }));
  }),
  pattern: (function () {
    return this.memoize("ZCwT4GIOysyO8lvu5uGAPQ", (function () {
      return this.choicePattern();
    }));
  }),
  choicePattern: (function () {
    return this.memoize("I0+TvWbldYQiF0OrleLd2A", (function () {
      var ptn, ptns;
      return (function () {
        (function () {
          this._optional((function () {
            return this.stringPatternHandler("|");
          }));
          ptn = this.returnPattern();
          this._optional((function () {
            ptns = this._repeat1((function () {
              this.stringPatternHandler("|");
              return this.returnPattern();
            }));
            return ptn = Ast.ChoicePattern([
              ptn
            ].concat(ptns));
          }));
          return this._optional((function () {
            this.stringPatternHandler("|");
            return ptn.push(Ast.EmptyPattern());
          }));
        }).call(this);
        return ptn;
      }).call(this);
    }));
  }),
  returnPattern: (function () {
    return this.memoize("XcvZGAGvGuAEaqrEZIFxLQ", (function () {
      var ptn, expr, stmts;
      return this._choice((function () {
        ptn = this.concatPattern();
        return this._choice((function () {
          (function () {
            this.stringPatternHandler("->");
            return expr = this.leftHandSideExpression();
          }).call(this);
          return Ast.ConcatPattern([
            ptn,
            Ast.ActionPattern(Ast.ExpressionBody(expr))
          ]);
        }), (function () {
          (function () {
            this.stringPatternHandler("->");
            this.stringPatternHandler("{");
            stmts = this._repeat(this.statement);
            return this.stringPatternHandler("}");
          }).call(this);
          return Ast.ConcatPattern([
            ptn,
            Ast.ActionPattern(Ast.StatementsBody(stmts))
          ]);
        }), (function () {
          return ptn;
        }));
      }), (function () {
        (function () {
          this.stringPatternHandler("->");
          return expr = this.leftHandSideExpression();
        }).call(this);
        return Ast.ActionPattern(Ast.ExpressionBody(expr));
      }), (function () {
        (function () {
          this.stringPatternHandler("->");
          this.stringPatternHandler("{");
          stmts = this._repeat(this.statement);
          return this.stringPatternHandler("}");
        }).call(this);
        return Ast.ActionPattern(Ast.StatementsBody(stmts));
      }));
    }));
  }),
  concatPattern: (function () {
    return this.memoize("kcG6JUxORAzFzFQ9WZcaKQ", (function () {
      var ptn, ptns;
      return (function () {
        ptn = this.prefixOperatorPattern();
        return this._choice((function () {
          ptns = this._repeat1(this.prefixOperatorPattern);
          return Ast.ConcatPattern([
            ptn
          ].concat(ptns));
        }), (function () {
          return ptn;
        }));
      }).call(this);
    }));
  }),
  prefixOperatorPattern: (function () {
    return this.memoize("o1NYSVdKEhBKeS9AAO5DsA", (function () {
      var ptn;
      return this._choice(this.postfixOperatorPattern, (function () {
        (function () {
          this.stringPatternHandler("~");
          return ptn = this.prefixOperatorPattern();
        }).call(this);
        return Ast.NotPattern(ptn);
      }), (function () {
        (function () {
          this.stringPatternHandler("&");
          return ptn = this.prefixOperatorPattern();
        }).call(this);
        return Ast.LookaheadPattern(ptn);
      }), (function () {
        (function () {
          this.stringPatternHandler("#");
          return ptn = this.prefixOperatorPattern();
        }).call(this);
        return Ast.TokenOperatorPattern(ptn);
      }));
    }));
  }),
  postfixOperatorPattern: (function () {
    return this.memoize("QdrvC1j5H3+KXxAtbprySw", (function () {
      var ptn, name;
      return this._choice((function () {
        (function () {
          ptn = this.applyPattern();
          return this._repeat((function () {
            return ptn = this.repeatOperatorPattern(ptn);
          }));
        }).call(this);
        return ptn;
      }), (function () {
        (function () {
          this.stringPatternHandler(":");
          this._not(this.whitespace);
          return name = this.identifier();
        }).call(this);
        return Ast.BindPattern(name, Ast.AnythingPattern());
      }));
    }));
  }),
  repeatOperatorPattern: (function (ptn) {
    var name;
    return this._choice((function () {
      this.stringPatternHandler("*");
      return Ast.RepeatPattern(ptn);
    }), (function () {
      this.stringPatternHandler("+");
      return Ast.Repeat1Pattern(ptn);
    }), (function () {
      (function () {
        this.stringPatternHandler("?");
        return this._not((function () {
          this._not(this.whitespace);
          return this._choice((function () {
            return this.stringPatternHandler("(");
          }), (function () {
            return this.stringPatternHandler("{");
          }));
        }));
      }).call(this);
      return Ast.OptionalPattern(ptn);
    }), (function () {
      (function () {
        this._not(this.whitespace);
        this.stringPatternHandler(":");
        this._not(this.whitespace);
        return name = this.identifier();
      }).call(this);
      return Ast.BindPattern(name, ptn);
    }));
  }),
  applyPattern: (function () {
    return this.memoize("uXWGHneIB5KH0PG6KmK1Fw", (function () {
      var ptn, args;
      return (function () {
        (function () {
          ptn = this.primaryPattern();
          return this._repeat((function () {
            return this._choice((function () {
              this._not(this.whitespace);
              args = this.arguments();
              return ptn = Ast.JSApplyPattern(ptn, args);
            }), (function () {
              this._not(this.whitespace);
              args = this.patternArguments();
              return ptn = Ast.ApplyPattern(ptn, args);
            }));
          }));
        }).call(this);
        return ptn;
      }).call(this);
    }));
  }),
  patternArguments: (function () {
    return this.memoize("R6WFhvmxc5BD5k7JXLXZEg", (function () {
      var args;
      return (function () {
        (function () {
          this.stringPatternHandler("[");
          args = this.delimited(this.pattern, (function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler("]");
        }).call(this);
        return args;
      }).call(this);
    }));
  }),
  primaryPattern: (function () {
    return this.memoize("YBS1sj0J757Fl8WdsxNh4g", (function () {
      var ptn;
      return this._choice(this.predicatePattern, this.actionPattern, this.immediatePattern, this.literalPattern, this.variablePattern, (function () {
        (function () {
          this.stringPatternHandler("(");
          ptn = this.pattern();
          return this.stringPatternHandler(")");
        }).call(this);
        return ptn;
      }));
    }));
  }),
  predicatePattern: (function () {
    return this.memoize("5Uobc1HYNJhtW+8PnA7i6Q", (function () {
      var body;
      return (function () {
        (function () {
          this.stringPatternHandler("?");
          this._not(this.whitespace);
          return body = this.interpolationBody();
        }).call(this);
        return Ast.PredicatePattern(body);
      }).call(this);
    }));
  }),
  actionPattern: (function () {
    return this.memoize("KUi0efWZSjgsiNzZCOVHCg", (function () {
      var body;
      return (function () {
        (function () {
          this.stringPatternHandler("!");
          this._not(this.whitespace);
          return body = this.interpolationBody();
        }).call(this);
        return Ast.ActionPattern(body);
      }).call(this);
    }));
  }),
  immediatePattern: (function () {
    return this.memoize("dxzcwlCwCRVtOQkKrvGm7Q", (function () {
      var expr, body;
      return this._choice((function () {
        (function () {
          this.stringPatternHandler("%");
          this._not(this.whitespace);
          return expr = this.leftHandSideExpression();
        }).call(this);
        return Ast.ImmediatePattern(Ast.ExpressionBody(expr));
      }), (function () {
        (function () {
          this.stringPatternHandler("%");
          this._not(this.whitespace);
          return body = this.interpolationBody();
        }).call(this);
        return Ast.ImmediatePattern(body);
      }));
    }));
  }),
  literalPattern: (function () {
    return this.memoize("uP5LxTkNH0K+C8V6+ljU4Q", (function () {
      var n, s;
      return this._choice((function () {
        this._choice((function () {
          return this.stringPatternHandler("null");
        }), (function () {
          return this.stringPatternHandler("boolean");
        }), (function () {
          return this.stringPatternHandler("regex");
        }), (function () {
          return this.stringPatternHandler("undefined");
        }));
        return this.error("Not a valid literal pattern");
      }), (function () {
        n = this.stringPatternHandler("number");
        return Ast.NumberPattern(n.value);
      }), (function () {
        s = this.stringPatternHandler("string");
        return Ast.StringPattern(s.value);
      }));
    }));
  }),
  variablePattern: (function () {
    return this.memoize("ZT0XDeUaidu93Z9q9m5V4Q", (function () {
      var name;
      return (function () {
        name = this.identifierName();
        return Ast.VariablePattern(name);
      }).call(this);
    }));
  }),
  astTemplateExpression: (function () {
    return this.memoize("Zhf9vN0bQDKKai21kiLOsw", (function () {
      var body;
      return (function () {
        (function () {
          this.stringPatternHandler("__ast");
          return body = this.interpolationBody();
        }).call(this);
        return Ast.AstTemplate(body);
      }).call(this);
    }));
  }),
  interpolationBody: (function () {
    return this.memoize("79RrgJLPYVV+FernVcb/Tg", (function () {
      var expr, stmts;
      return this._choice((function () {
        (function () {
          this.stringPatternHandler("(");
          expr = this.expression();
          return this.stringPatternHandler(")");
        }).call(this);
        return Ast.ExpressionBody(expr);
      }), (function () {
        (function () {
          this.stringPatternHandler("{");
          stmts = this.functionBody();
          return this.stringPatternHandler("}");
        }).call(this);
        return Ast.StatementsBody(stmts);
      }));
    }));
  }),
  whitespace: (function () {
    if (this.state.position === 0) {
      return null;
    }
    else if (this.isEof()) {
      return null;
    }
    else {
      var last = this.tokenAt(this.state.position - 1);
      var curr = this.peekNext();
      if ((last.position + last.text.length) < curr.position) {
        return null;
      }
      else {
        return this.fail();
      }
    }
  })
});
