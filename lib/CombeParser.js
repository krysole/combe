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
  parse: (function (string) {
    var args = Array.prototype.slice.call(arguments, 1);
    var parser = this.new(CombeLexer.new(string));
    var result = parser.match.apply(parser, args);
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
    return this.memoize("du2Qa+gxVo0vef/uokl5vw", (function () {
      var body;
      return (function () {
        this.stringPatternHandler("%");
        body = this.interpolationBody();
        return Ast.InterpolateExpression(body);
      }).call(this);
    }));
  }),
  arrayElement: (function () {
    return this.memoize("yeEwUQW1mh1tjtabiRHqHg", (function () {
      var body;
      return this._choice(JSParser.prototype.arrayElement, (function () {
        this.stringPatternHandler("%");
        this.stringPatternHandler("expand");
        body = this.interpolationBody();
        return Ast.ExpandInterpolate(body);
      }));
    }));
  }),
  propertyAssignment: (function () {
    return this.memoize("DsJTMkJjS0Qx39rldMErUw", (function () {
      var name, expr, body;
      return this._choice(JSParser.prototype.propertyAssignment, (function () {
        this.stringPatternHandler("describe");
        name = this.propertyName();
        this.stringPatternHandler(":");
        expr = this.assignmentExpression();
        return Ast.DescribeProperty(name, expr);
      }), (function () {
        this.stringPatternHandler("%");
        this.stringPatternHandler("expand");
        body = this.interpolationBody();
        return Ast.ExpandInterpolate(body);
      }));
    }));
  }),
  memberExpression: (function () {
    return this.memoize("GZI/5qYx+1AvmjfvzrtDYw", (function () {
      var expr, ctor, args;
      return (function () {
        expr = this._choice(this.primaryExpression, this.functionExpression, this.ruleExpression, (function () {
          this.stringPatternHandler("new");
          ctor = this.memberExpression();
          args = this.arguments();
          return Ast.New(ctor, args);
        }));
        this._repeat((function () {
          return expr = this.propertyAccessor(expr);
        }));
        return expr;
      }).call(this);
    }));
  }),
  arguments: (function () {
    return this.memoize("Rf0CedbtrOGwoxM85m4Y+w", (function () {
      var exprs;
      return (function () {
        this.stringPatternHandler("(");
        exprs = this.delimited(this.expandInterpolateArgument, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(")");
        return exprs;
      }).call(this);
    }));
  }),
  expandInterpolateArgument: (function () {
    return this.memoize("nbkwqOdfVzDEUI4BHKnnww", (function () {
      var body;
      return this._choice((function () {
        this.stringPatternHandler("%");
        this.stringPatternHandler("expand");
        body = this.interpolationBody();
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
      this.stringPatternHandler("..");
      rhs = this._choice(this.rangeInfinity, this.prefixExpression);
      return Ast.InclusiveRange(ast, rhs);
    }), (function () {
      this.stringPatternHandler("...");
      rhs = this._choice(this.rangeInfinity, this.prefixExpression);
      return Ast.ExclusiveRange(ast, rhs);
    }));
  }),
  unaryExpression: (function () {
    return this.memoize("ppJc7855y7g6q/9bSPLqpg", (function () {
      var expr;
      return (function () {
        this._choice((function () {
          expr = this.rangeInfinity();
          return expr = this.rangeOperator(expr);
        }), (function () {
          return expr = this.prefixExpression();
        }));
        this._repeat((function () {
          return expr = this.rangeOperator(expr);
        }));
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
      this.stringPatternHandler("%");
      this.stringPatternHandler("expand");
      body = this.interpolationBody();
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
    return this.memoize("8RaJF3IF3fylIF5yCqitfQ", (function () {
      var body;
      return (function () {
        this.stringPatternHandler("%");
        this.stringPatternHandler("statements");
        body = this.interpolationBody();
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
      this.stringPatternHandler("%");
      this.stringPatternHandler("expand");
      body = this.interpolationBody();
      return Ast.ExpandInterpolate(body);
    }), (function () {
      return this.variableDeclaration(noIn);
    }));
  }),
  expressionStatement: (function () {
    return this.memoize("q2IgcqBxbyVPNfISlGDhyw", (function () {
      var expr;
      return (function () {
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
        this.stringPatternHandler(";");
        return Ast.ExpressionStatement(expr);
      }).call(this);
    }));
  }),
  functionArguments: (function () {
    return this.memoize("RTaDkPt5Cb1+/40zXNvM2A", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("(");
        args = this.delimited(this.expandInterpolateFunctionArgument, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(")");
        return args;
      }).call(this);
    }));
  }),
  expandInterpolateFunctionArgument: (function () {
    return this.memoize("GR+1C36ypnzMmBZZXrX+nQ", (function () {
      var body;
      return this._choice((function () {
        this.stringPatternHandler("%");
        this.stringPatternHandler("expand");
        body = this.interpolationBody();
        return Ast.ExpandInterpolate(body);
      }), this.identifier);
    }));
  }),
  identifier: (function () {
    return this.memoize("rkqA56bF+UWaQ/dzLUWQAQ", (function () {
      var body;
      return this._choice(JSParser.prototype.identifier, (function () {
        this.stringPatternHandler("%");
        this.stringPatternHandler("id");
        body = this.interpolationBody();
        return Ast.InterpolateIdentifier(body);
      }));
    }));
  }),
  identifierName: (function () {
    return this.memoize("3vqCAzAKRTtRNUSjbuDyQQ", (function () {
      var body;
      return this._choice(JSParser.prototype.identifierName, (function () {
        this.stringPatternHandler("%");
        this.stringPatternHandler("id");
        body = this.interpolationBody();
        return Ast.InterpolateIdentifier(body);
      }));
    }));
  }),
  ruleExpression: (function () {
    return this.memoize("u9UCXRpVcjPca4yHegeo+w", (function () {
      var name, args, ptn;
      return (function () {
        this.stringPatternHandler("rule");
        name = this._optional(this.identifier);
        args = this._optional(this.functionArguments);
        this.stringPatternHandler("{");
        ptn = this.optionalPattern();
        this.stringPatternHandler("}");
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
    return this.memoize("KwDOdXDa5p/IC56p2OqQsg", (function () {
      var ptn, ptns;
      return (function () {
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
        return ptn;
      }).call(this);
    }));
  }),
  returnPattern: (function () {
    return this.memoize("W0fM7naUiVYjo9sI1QGXLA", (function () {
      var ptn, expr, stmts;
      return this._choice((function () {
        ptn = this.concatPattern();
        return this._choice((function () {
          this.stringPatternHandler("->");
          expr = this.leftHandSideExpression();
          return Ast.ConcatPattern([
            ptn,
            Ast.ActionPattern(Ast.ExpressionBody(expr))
          ]);
        }), (function () {
          this.stringPatternHandler("->");
          this.stringPatternHandler("{");
          stmts = this._repeat(this.statement);
          this.stringPatternHandler("}");
          return Ast.ConcatPattern([
            ptn,
            Ast.ActionPattern(Ast.StatementsBody(stmts))
          ]);
        }), (function () {
          return ptn;
        }));
      }), (function () {
        this.stringPatternHandler("->");
        expr = this.leftHandSideExpression();
        return Ast.ActionPattern(Ast.ExpressionBody(expr));
      }), (function () {
        this.stringPatternHandler("->");
        this.stringPatternHandler("{");
        stmts = this._repeat(this.statement);
        this.stringPatternHandler("}");
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
    return this.memoize("5c1LtMX0L3lwaoDnzSFXtg", (function () {
      var ptn;
      return this._choice(this.postfixOperatorPattern, (function () {
        this.stringPatternHandler("~");
        ptn = this.prefixOperatorPattern();
        return Ast.NotPattern(ptn);
      }), (function () {
        this.stringPatternHandler("&");
        ptn = this.prefixOperatorPattern();
        return Ast.LookaheadPattern(ptn);
      }), (function () {
        this.stringPatternHandler("#");
        ptn = this.prefixOperatorPattern();
        return Ast.TokenOperatorPattern(ptn);
      }));
    }));
  }),
  postfixOperatorPattern: (function () {
    return this.memoize("exXSezclOClZHwqH4rp1YA", (function () {
      var ptn, name;
      return this._choice((function () {
        ptn = this.applyPattern();
        this._repeat((function () {
          return ptn = this.repeatOperatorPattern(ptn);
        }));
        return ptn;
      }), (function () {
        this.stringPatternHandler(":");
        this._not(this.whitespace);
        name = this.identifier();
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
      this.stringPatternHandler("?");
      this._not((function () {
        this._not(this.whitespace);
        return this._choice((function () {
          return this.stringPatternHandler("(");
        }), (function () {
          return this.stringPatternHandler("{");
        }));
      }));
      return Ast.OptionalPattern(ptn);
    }), (function () {
      this._not(this.whitespace);
      this.stringPatternHandler(":");
      this._not(this.whitespace);
      name = this.identifier();
      return Ast.BindPattern(name, ptn);
    }));
  }),
  applyPattern: (function () {
    return this.memoize("ogv3D4bE2WTJMkLIs+Koiw", (function () {
      var ptn, args;
      return (function () {
        ptn = this.primaryPattern();
        this._repeat((function () {
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
        return ptn;
      }).call(this);
    }));
  }),
  patternArguments: (function () {
    return this.memoize("P4Yz212LFQk+mU/O+9fJNw", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("[");
        args = this.delimited(this.pattern, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("]");
        return args;
      }).call(this);
    }));
  }),
  primaryPattern: (function () {
    return this.memoize("NEJhfkl41k2ynrXFJ9YckQ", (function () {
      var ptn;
      return this._choice(this.predicatePattern, this.actionPattern, this.immediatePattern, this.literalPattern, this.variablePattern, (function () {
        this.stringPatternHandler("(");
        ptn = this.pattern();
        this.stringPatternHandler(")");
        return ptn;
      }));
    }));
  }),
  predicatePattern: (function () {
    return this.memoize("IHAHYHIMvx7caUu0LBzXZg", (function () {
      var body;
      return (function () {
        this.stringPatternHandler("?");
        this._not(this.whitespace);
        body = this.interpolationBody();
        return Ast.PredicatePattern(body);
      }).call(this);
    }));
  }),
  actionPattern: (function () {
    return this.memoize("Yx3h1z7H0XM6M73l6SqPYQ", (function () {
      var body;
      return (function () {
        this.stringPatternHandler("!");
        this._not(this.whitespace);
        body = this.interpolationBody();
        return Ast.ActionPattern(body);
      }).call(this);
    }));
  }),
  immediatePattern: (function () {
    return this.memoize("Qdn25jmO5qQXZiUfU0Y8uw", (function () {
      var expr, body;
      return this._choice((function () {
        this.stringPatternHandler("%");
        this._not(this.whitespace);
        expr = this.leftHandSideExpression();
        return Ast.ImmediatePattern(Ast.ExpressionBody(expr));
      }), (function () {
        this.stringPatternHandler("%");
        this._not(this.whitespace);
        body = this.interpolationBody();
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
    return this.memoize("/McdFoSARBks3baJt2anag", (function () {
      var body;
      return (function () {
        this.stringPatternHandler("__ast");
        body = this.interpolationBody();
        return Ast.AstTemplate(body);
      }).call(this);
    }));
  }),
  interpolationBody: (function () {
    return this.memoize("VNWF2yagvR3cmyZGJkUjKA", (function () {
      var expr, stmts;
      return this._choice((function () {
        this.stringPatternHandler("(");
        expr = this.expression();
        this.stringPatternHandler(")");
        return Ast.ExpressionBody(expr);
      }), (function () {
        this.stringPatternHandler("{");
        stmts = this.functionBody();
        this.stringPatternHandler("}");
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
