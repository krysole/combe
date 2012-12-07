// Generated code
"use strict";
var combe = require("combe");
var BaseParser = combe.BaseParser;
var Ast = require("./CombeAst");
var CombeLexer = require("./CombeLexer");
var CombeParser = module.exports = Class.new(BaseParser, {
  parseScript: (function () {
    var parser = this.new();
    return parser.parseScript.apply(parser, arguments);
  }),
  parse: (function () {
    var parser = this.new();
    return parser.parse.apply(parser, arguments);
  })
}, {
  parseScript: (function (source, filename) {
    return this.parse(source, filename, "script");
  }),
  parse: (function (source, filename, rulename) {
    var rest = Array.slice(arguments, 3);
    if (filename == null) filename = "(unnamed)";
    this.source = source;
    this.filename = filename;
    this.lexer = CombeLexer.new(source, filename);
    this.tokens = [
      /* elision */
    ];
    this.ast = this.match.apply(this, [
      rulename
    ].concat(rest));
    if (this.ast == null) {
      throw Error.new("Combe parser failed; futhest position was " + this.positionString(this.furthestPosition));
    }
    return this.ast;
  }),
  initialize: (function (source, filename) {
    BaseParser.prototype.initialize.call(this, source);
    this.filename = filename;
    this.lexer = CombeLexer.new(source, filename);
    this.tokens = [
      /* elision */
    ];
    this.furthestPosition = -1;
  }),
  script: (function () {
    return this.memoize("OT9yiGFgpmDKjenwxZ9GbA", (function () {
      var stmts;
      return (function () {
        stmts = this._repeat(this.terminatedStatement);
        this.eof();
        return Ast.Script(stmts);
      }).call(this);
    }));
  }),
  terminatedStatement: (function () {
    return this.memoize("Bx41/2rr9zUOaSB8xXvZew", (function () {
      var stmt;
      return (function () {
        stmt = this.statement();
        this.stringPatternHandler(";");
        return stmt;
      }).call(this);
    }));
  }),
  statement: (function () {
    return this.memoize("UrSoUy/ryRMuI72RNQdTeQ", (function () {
      return this._choice(this.varStatement, this.expressionStatement, this.emptyStatement);
    }));
  }),
  varStatement: (function () {
    return this.memoize("E5HuPYR9ug51emLNLp+hhw", (function () {
      var decls;
      return (function () {
        this.id("var");
        decls = this.delimited1(this.variableDeclaration, (function () {
          return this.stringPatternHandler(",");
        }));
        return Ast.VarStatement(decls);
      }).call(this);
    }));
  }),
  variableDeclaration: (function () {
    return this.memoize("N1mHlCU59lzFP8ZKST+7hg", (function () {
      var name, expr;
      return (function () {
        name = this.variableIdentifier();
        this._optional((function () {
          this.stringPatternHandler("=");
          return expr = this.expression();
        }));
        return Ast.VariableDeclaration(name, expr);
      }).call(this);
    }));
  }),
  expressionStatement: (function () {
    return this.memoize("URE02SfduULQ15Ca3742bw", (function () {
      var expr;
      return (function () {
        expr = this.expression();
        return Ast.ExpressionStatement(expr);
      }).call(this);
    }));
  }),
  emptyStatement: (function () {
    return this.memoize("lLGMFxiH+zqMZquajeEzCg", (function () {
      return Ast.EmptyStatement();
    }));
  }),
  expression: (function () {
    return this.memoize("Z5CiEoR2fMibqhavbkeKJg", (function () {
      return this._choice(this.ifExpression, this.whileExpression, this.doWhileExpression, this.forExpression, this.tryCatchExpression, this.throwExpression, this.returnExpression, this.breakExpression, this.continueExpression, this.operatorExpression);
    }));
  }),
  ifExpression: (function () {
    return this.memoize("Uu8KLECe4f9+BWw5WgQjjA", (function () {
      var condition, consiquent, alternative;
      return (function () {
        this.id("if");
        this.stringPatternHandler("(");
        condition = this.expression();
        this.stringPatternHandler(")");
        consiquent = this._optional(this.expressionBody);
        this._optional((function () {
          this._predicate((function () {
            return consiquent != null;
          }));
          this.id("else");
          return alternative = this.expressionBody();
        }));
        return Ast.IfExpression(condition, consiquent, alternative);
      }).call(this);
    }));
  }),
  whileExpression: (function () {
    return this.memoize("EmIkvGXhSYPlH4ULWCAjuw", (function () {
      var condition, b;
      return (function () {
        this.id("while");
        this.stringPatternHandler("(");
        condition = this.expression();
        this.stringPatternHandler(")");
        b = this._optional(this.expressionBody);
        return Ast.WhileExpression(condition, b);
      }).call(this);
    }));
  }),
  doWhileExpression: (function () {
    return this.memoize("f+423DQmGO1joRhyCg5cyQ", (function () {
      var b, condition;
      return (function () {
        this.id("do");
        b = this.expressionBody();
        this.id("while");
        this.stringPatternHandler("(");
        condition = this.expression();
        this.stringPatternHandler(")");
        return Ast.DoWhileExpression(b, condition);
      }).call(this);
    }));
  }),
  forExpression: (function () {
    return this.memoize("e0F/bdOGnP0xPQe464Iy6w", (function () {
      var initExpr, condExpr, incExpr, b, decls;
      return this._choice((function () {
        this.id("for");
        this.stringPatternHandler("(");
        initExpr = this._optional(this.expression);
        this.stringPatternHandler(";");
        condExpr = this._optional(this.expression);
        this.stringPatternHandler(";");
        incExpr = this._optional(this.expression);
        this.stringPatternHandler(")");
        b = this._optional(this.expressionBody);
        return Ast.ForExpression(initExpr, condExpr, incExpr, b);
      }), (function () {
        this.id("for");
        this.stringPatternHandler("(");
        this.id("var");
        decls = this.delimited1(this.variableDeclaration, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(";");
        condExpr = this._optional(this.expression);
        this.stringPatternHandler(";");
        incExpr = this._optional(this.expression);
        this.stringPatternHandler(")");
        b = this._optional(this.expressionBody);
        return Ast.ForDeclaringExpression(decls, condExpr, incExpr, b);
      }));
    }));
  }),
  tryCatchExpression: (function () {
    return this.memoize("q/7YH2y9HJkmY/3/ZqymvA", (function () {
      var tryBody, catchBinding, catchBody, finallyBody;
      return (function () {
        this.id("try");
        tryBody = this.expressionBody();
        return this._choice((function () {
          this.id("catch");
          this.stringPatternHandler("(");
          catchBinding = this.variableIdentifier();
          this.stringPatternHandler(")");
          catchBody = this.expressionBody();
          this._optional((function () {
            this.id("finally");
            return finallyBody = this.expressionBody();
          }));
          return Ast.TryCatchExpression(tryBody, catchBinding, catchBody, finallyBody);
        }), (function () {
          this.id("finally");
          finallyBody = this.expressionBody();
          return Ast.TryCatchExpression(tryBody, null, null, finallyBody);
        }));
      }).call(this);
    }));
  }),
  throwExpression: (function () {
    return this.memoize("nK147radmZfto8nBKLB2sw", (function () {
      var expr;
      return (function () {
        this.id("throw");
        expr = this.expression();
        return Ast.ThrowExpression(expr);
      }).call(this);
    }));
  }),
  returnExpression: (function () {
    return this.memoize("o6G/ZpHxL4WZzDROWn6x0g", (function () {
      var expr;
      return (function () {
        this.id("return");
        expr = this._optional(this.expression);
        return Ast.ReturnExpression(expr);
      }).call(this);
    }));
  }),
  breakExpression: (function () {
    return this.memoize("dIpNMESbSRoOQg8EmfafPA", (function () {
      return (function () {
        this.id("break");
        return Ast.BreakExpression();
      }).call(this);
    }));
  }),
  continueExpression: (function () {
    return this.memoize("LxSoYu/oHAxAd4YsyLYIWg", (function () {
      return (function () {
        this.id("continue");
        return Ast.ContinueExpression();
      }).call(this);
    }));
  }),
  expressionBody: (function () {
    return this.memoize("zlZIeapj9KOVyg2A9RF4TA", (function () {
      return this._choice(this.expression, this.block);
    }));
  }),
  block: (function () {
    return this.memoize("OzT12RMUdJysQf59KFtLDg", (function () {
      var stmts;
      return (function () {
        this.stringPatternHandler("{");
        stmts = this._repeat(this.terminatedStatement);
        this.stringPatternHandler("}");
        return Ast.Block(stmts);
      }).call(this);
    }));
  }),
  blockContents: (function () {
    return this.memoize("YdcnNmjlv/z9RyHxaAtbTg", (function () {
      var stmts;
      return (function () {
        stmts = this._repeat(this.terminatedStatements);
        return Ast.Block(stmts);
      }).call(this);
    }));
  }),
  operatorExpression: (function () {
    return this.memoize("aRXnmywofOAtO7rKEFNqJg", (function () {
      return this.assignmentExpression();
    }));
  }),
  lvalueTypes: [
    "Variable",
    "State",
    "Subscript"
  ],
  assignmentExpression: (function () {
    return this.memoize("/uyeCorGDNBet1xsExcngw", (function () {
      var lhs, rhs, op;
      return this._choice((function () {
        lhs = this.secondaryExpression();
        this._predicate((function () {
          return this.lvalueTypes.include(lhs.type);
        }));
        return this._choice((function () {
          this.stringPatternHandler("=");
          rhs = this.expression();
          return Ast.Assignment(lhs, rhs);
        }), (function () {
          op = this.stringPatternHandler("operatorAssignment");
          rhs = this.expression();
          return Ast.OperatorAssignment(op, lhs, rhs);
        }));
      }), this.conditionalExpression);
    }));
  }),
  conditionalExpression: (function () {
    return this.memoize("awLXMs1MVgtUV3lZY+0UYQ", (function () {
      var condition, consiquent, alternative;
      return (function () {
        condition = this.logicalOrExpression();
        return this._choice((function () {
          this.stringPatternHandler("?");
          consiquent = this.expression();
          this.stringPatternHandler(":");
          alternative = this.expression();
          return Ast.IfExpression(condition, consiquent, alternative);
        }), (function () {
          return condition;
        }));
      }).call(this);
    }));
  }),
  logicalOrExpression: (function () {
    return this.memoize("WsLRE5zsPBebph6a2FSNKg", (function () {
      return this.leftAssociative(this.logicalAndExpression, (function () {
        return this.stringPatternHandler("||");
      }));
    }));
  }),
  logicalXorExpression: (function () {
    return this.memoize("SzL21wxJz/ZIPpA8YpLBxA", (function () {
      return this.leftAssociative(this.bitwiseXorExpression, (function () {
        return this.stringPatternHandler("^^");
      }));
    }));
  }),
  logicalAndExpression: (function () {
    return this.memoize("1iDmHeL1xYMjcJ44CS5v9w", (function () {
      return this.leftAssociative(this.equalityExpression, (function () {
        return this.stringPatternHandler("&&");
      }));
    }));
  }),
  equalityExpression: (function () {
    return this.memoize("A7e3RJ5J4n1rZm3TtiCntA", (function () {
      return this.leftAssociative(this.relationalExpression, (function () {
        return this._choice((function () {
          return this.stringPatternHandler("==");
        }), (function () {
          return this.stringPatternHandler("!=");
        }), (function () {
          return this.stringPatternHandler("===");
        }), (function () {
          return this.stringPatternHandler("!==");
        }));
      }));
    }));
  }),
  relationalExpression: (function () {
    return this.memoize("cr77CUvff8z0pzRYyl718w", (function () {
      return this.leftAssociative(this.bitwiseOrExpression, (function () {
        return this._choice((function () {
          return this.stringPatternHandler("<");
        }), (function () {
          return this.stringPatternHandler("<=");
        }), (function () {
          return this.stringPatternHandler(">=");
        }), (function () {
          return this.stringPatternHandler(">");
        }));
      }));
    }));
  }),
  bitwiseOrExpression: (function () {
    return this.memoize("XPsweQHiHQzHvSIBLOikcg", (function () {
      return this.leftAssociative(this.bitwiseXorExpression, (function () {
        return this.stringPatternHandler("|");
      }));
    }));
  }),
  bitwiseXorExpression: (function () {
    return this.memoize("cWIpNFacQ2N1ObfkWaZ/qA", (function () {
      return this.leftAssociative(this.bitwiseAndExpression, (function () {
        return this.stringPatternHandler("^");
      }));
    }));
  }),
  bitwiseAndExpression: (function () {
    return this.memoize("7913W/pUDMbIog5butjfIw", (function () {
      return this.leftAssociative(this.shiftExpression, (function () {
        return this.stringPatternHandler("&");
      }));
    }));
  }),
  shiftExpression: (function () {
    return this.memoize("lDAfKUbYUWFywtOfWAqRyw", (function () {
      return this.leftAssociative(this.additiveExpression, (function () {
        return this._choice((function () {
          return this.stringPatternHandler("<<");
        }), (function () {
          return this.stringPatternHandler(">>");
        }), (function () {
          return this.stringPatternHandler(">>>");
        }));
      }));
    }));
  }),
  additiveExpression: (function () {
    return this.memoize("dZUcIPvBVFYMFOLVmbgEjg", (function () {
      return this.leftAssociative(this.multiplicitiveExpression, (function () {
        return this._choice((function () {
          return this.stringPatternHandler("+");
        }), (function () {
          return this.stringPatternHandler("-");
        }));
      }));
    }));
  }),
  multiplicitiveExpression: (function () {
    return this.memoize("Pgfl0pkbohNOre8GjYH3rg", (function () {
      return this.leftAssociative(this.rangeExpression, (function () {
        return this._choice((function () {
          return this.stringPatternHandler("*");
        }), (function () {
          return this.stringPatternHandler("/");
        }), (function () {
          return this.stringPatternHandler("%");
        }));
      }));
    }));
  }),
  rangeExpression: (function () {
    return this.memoize("awQ/Rk4T12r4DBj2cFSlxA", (function () {
      var expr, rhs;
      return (function () {
        expr = this.prefixExpression();
        return this._choice((function () {
          this.stringPatternHandler("..");
          rhs = this._choice(this.rangeInfinity, this.prefixExpression);
          return Ast.InclusiveRange(expr, rhs);
        }), (function () {
          this.stringPatternHandler("...");
          rhs = this._choice(this.rangeInfinity, this.prefixExpression);
          return Ast.ExclusiveRange(expr, rhs);
        }), (function () {
          return expr;
        }));
      }).call(this);
    }));
  }),
  rangeInfinity: (function () {
    return this.memoize("9s4Du/g5JiJK5rSvkoKE0w", (function () {
      return (function () {
        this.stringPatternHandler("*");
        return Ast.Literal(null);
      }).call(this);
    }));
  }),
  prefixExpression: (function () {
    return this.memoize("NPVHXaZNYSmEjMXxOpzXmA", (function () {
      var op, expr;
      return this._choice((function () {
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
        expr = this.prefixExpression();
        return Ast.PrefixOperator(op.text, expr);
      }), this.postfixExpression);
    }));
  }),
  postfixExpression: (function () {
    return this.memoize("lj1z6KxM2jm/ZLxoxCis/Q", (function () {
      var expr, op;
      return (function () {
        expr = this.secondaryExpression();
        return this._choice((function () {
          op = this._choice((function () {
            return this.stringPatternHandler("++");
          }), (function () {
            return this.stringPatternHandler("--");
          }));
          return Ast.PostfixOperator(op.text, expr);
        }), (function () {
          return expr;
        }));
      }).call(this);
    }));
  }),
  leftAssociative: (function (operand, operator) {
    var expr, op, rhs;
    return (function () {
      expr = operand.call(this);
      this._repeat((function () {
        op = operator.call(this);
        rhs = operand.call(this);
        return expr = Ast.InfixOperator(op.text, expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  rightAssociative: (function (operand, operator) {
    var expr, op, rhs;
    return (function () {
      expr = operand.call(this);
      return this._choice((function () {
        op = operator.call(this);
        rhs = this.rightAssociative(operand, operator);
        return Ast.InfixOperator(op.text, expr, rhs);
      }), (function () {
        return expr;
      }));
    }).call(this);
  }),
  secondaryExpression: (function () {
    return this.memoize("YLTMojUIEr7mBYIztkc7cg", (function () {
      var expr;
      return (function () {
        expr = this.primaryExpression();
        this._repeat((function () {
          return expr = this.secondaryExpressionFragment(expr);
        }));
        return expr;
      }).call(this);
    }));
  }),
  secondaryExpressionFragment: (function (subject) {
    var args, name;
    return this._choice((function () {
      args = this.arguments();
      return Ast.Call(subject, args);
    }), (function () {
      this.stringPatternHandler("[");
      args = this.delimited(this.expression, (function () {
        return this.stringPatternHandler(",");
      }));
      this.stringPatternHandler("]");
      return Ast.Subscript(subject, args);
    }), (function () {
      this.stringPatternHandler("@");
      name = this.stringPatternHandler("identifier");
      return Ast.State(subject, name);
    }), (function () {
      this.stringPatternHandler(".");
      name = this.stringPatternHandler("identifier");
      args = this._optional(this.arguments);
      return Ast.MethodCall(subject, name.text, args);
    }));
  }),
  arguments: (function () {
    return this.memoize("4hX4jBqKDWVdGIZzNyVOlg", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("(");
        args = this.delimited(this.expression, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(")");
        return args;
      }).call(this);
    }));
  }),
  parameters: (function () {
    return this.memoize("SO34wtVnurw3xXvGDtZ5Mg", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("(");
        args = this.delimited(this.variableIdentifier, (function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(")");
        return args;
      }).call(this);
    }));
  }),
  functionBody: (function () {
    return this.memoize("XN/aatP+aJGmF9ZhAbk9JQ", (function () {
      return this._choice((function () {
        this.stringPatternHandler("->");
        return this.expression();
      }), this.block);
    }));
  }),
  primaryExpression: (function () {
    return this.memoize("wA0bD6uF3e8aIQipSlfGXw", (function () {
      var name;
      return this._choice(this.valueLiteral, (function () {
        this.id("this");
        return Ast.This();
      }), (function () {
        name = this.variableIdentifier();
        return Ast.Variable(name);
      }), this.arrayLiteral, this.objectLiteral, this.functionLiteral, this.ruleLiteral, this.subexpression);
    }));
  }),
  valueLiteral: (function () {
    return this.memoize("2MvWvEARPpoylTZhaNCEiA", (function () {
      var value, n, s, r;
      return (function () {
        value = this._choice((function () {
          this.id("null");
          return null;
        }), (function () {
          this.id("undefined");
          return undefined;
        }), (function () {
          this.id("true");
          return true;
        }), (function () {
          this.id("false");
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
        return Ast.Literal(value);
      }).call(this);
    }));
  }),
  arrayLiteral: (function () {
    return this.memoize("qJmy5hmphQcSLdlCS1KQdQ", (function () {
      var elems;
      return (function () {
        this.stringPatternHandler("[");
        elems = this.delimited(this.arrayElement, (function () {
          return this.stringPatternHandler(",");
        }));
        this._optional((function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("]");
        (function () {
          if (elems.last.is("Elision")) elems.pop();
        }).call(this);
        return Ast.Array(elems);
      }).call(this);
    }));
  }),
  arrayElement: (function () {
    return this.memoize("sWUORPIGOExIvaBXSSoHzA", (function () {
      return this._choice(this.expression, (function () {
        return Ast.Literal(null);
      }));
    }));
  }),
  objectLiteral: (function () {
    return this.memoize("0a3j34LolVTpB/K32rDW+A", (function () {
      var decls;
      return (function () {
        this.stringPatternHandler("{");
        decls = this.delimited(this.property, (function () {
          return this.stringPatternHandler(",");
        }));
        this._optional((function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("}");
        return Ast.Object(decls);
      }).call(this);
    }));
  }),
  property: (function () {
    return this.memoize("Pm0bEG3anQELlI1Z9Fs5IQ", (function () {
      var name, pv, expr;
      return this._choice((function () {
        name = this.propertyName();
        pv = this.propertyValue();
        return Ast.ValueProperty(name, pv);
      }), (function () {
        this.id("get");
        name = this.propertyName();
        pv = this.propertyValue();
        return Ast.GetProperty(name, pv);
      }), (function () {
        this.id("set");
        name = this.propertyName();
        pv = this.propertyValue();
        return Ast.SetProperty(name, pv);
      }), (function () {
        this.id("describe");
        name = this.propertyName();
        this.stringPatternHandler(":");
        expr = this.expression();
        return Ast.DescribeProperty(name, expr);
      }));
    }));
  }),
  propertyValue: (function () {
    return this.memoize("KJPYqSHPdQRTNyZ86nxBAA", (function () {
      var expr, params, body;
      return this._choice((function () {
        this.stringPatternHandler(":");
        return expr = this.expression();
      }), (function () {
        params = this._optional(this.parameters);
        body = this.functionBody();
        return Ast.Function(params, body);
      }));
    }));
  }),
  functionLiteral: (function () {
    return this.memoize("oKyWD/3cnF74ZV+q6BmcqA", (function () {
      var params, e, p, body;
      return this._choice((function () {
        params = this._optional(this.parameters);
        this.stringPatternHandler("->");
        e = this.expression();
        return Ast.Function(params, e);
      }), (function () {
        p = this.variableIdentifier();
        this.stringPatternHandler("->");
        e = this.expression();
        return Ast.Function([
          p
        ], e);
      }), (function () {
        this.id("function");
        params = this._optional(this.parameters);
        body = this.functionBody();
        return Ast.Function(params, body);
      }));
    }));
  }),
  ruleLiteral: (function () {
    return this.memoize("rp3rkzPrNoZ+zV6ysY0qsw", (function () {
      var params, body;
      return (function () {
        this.id("rule");
        params = this._optional(this.parameters);
        body = this.ruleBody();
        return Ast.Rule(params, body);
      }).call(this);
    }));
  }),
  ruleBody: (function () {
    return this.memoize("Xd3Fc3PTICJjhVHtrcNyqg", (function () {
      var p;
      return this._choice((function () {
        this.stringPatternHandler("{");
        p = this.pattern();
        this.stringPatternHandler("}");
        return p;
      }), this.operatorPattern);
    }));
  }),
  subexpression: (function () {
    return this.memoize("i/6xJkxRz+9bRF5sDYNUAg", (function () {
      var expr;
      return (function () {
        this.stringPatternHandler("(");
        expr = this.expressionSequence();
        this.stringPatternHandler(")");
        return expr;
      }).call(this);
    }));
  }),
  expressionSequence: (function () {
    return this.memoize("4B3nyF+fg6DKdz2yABzN9w", (function () {
      var exprs;
      return (function () {
        exprs = this.delimited1(this.expression, (function () {
          return this.stringPatternHandler(",");
        }));
        this._optional((function () {
          return this.stringPatternHandler(",");
        }));
        return this._choice((function () {
          this._predicate((function () {
            return exprs.length === 1;
          }));
          return exprs[0];
        }), (function () {
          return Ast.SequenceExpression(exprs);
        }));
      }).call(this);
    }));
  }),
  pattern: (function () {
    return this.memoize("ZCwT4GIOysyO8lvu5uGAPQ", (function () {
      return this.choicePattern();
    }));
  }),
  choicePattern: (function () {
    return this.memoize("DyXtggM/gzbIXzEhmwCIfw", (function () {
      var p, p2;
      return (function () {
        this._optional((function () {
          return this.stringPatternHandler("|");
        }));
        p = this.returnPattern();
        this._repeat((function () {
          this.stringPatternHandler("|");
          p2 = this.returnPattern();
          return p = Ast.ChoicePattern([
            p,
            p2
          ]);
        }));
        return p;
      }).call(this);
    }));
  }),
  returnPattern: (function () {
    return this.memoize("oVRDcjO5giXEdgSPQ+0jHg", (function () {
      var p, e;
      return this._choice((function () {
        p = this.sequencePattern();
        return this._choice((function () {
          this.stringPatternHandler("->");
          e = this.actionBody();
          return Ast.SequencePattern([
            p,
            Ast.ActionPattern(e)
          ]);
        }), (function () {
          return p;
        }));
      }), (function () {
        this.stringPatternHandler("->");
        e = this.actionBody();
        return Ast.ActionPattern(e);
      }));
    }));
  }),
  sequencePattern: (function () {
    return this.memoize("2Qk1QezQ8dRfxFhNOCdqUQ", (function () {
      var ps;
      return (function () {
        ps = this.delimited1(this.operatorPattern, (function () {
          return this.stringPatternHandler(",");
        }));
        return this._choice((function () {
          this._predicate((function () {
            return ps.length > 1;
          }));
          return ps;
        }), (function () {
          return ps[0];
        }));
      }).call(this);
    }));
  }),
  operatorPattern: (function () {
    return this.memoize("HDU1NXV2ur2CuMsWI7UPrg", (function () {
      return this.prefixOperatorPattern();
    }));
  }),
  prefixOperatorPattern: (function () {
    return this.memoize("mJxXZJ5OY2AZ1I2VPHNFow", (function () {
      var p;
      return this._choice((function () {
        this.stringPatternHandler("~");
        p = this.prefixOperatorPattern();
        return Ast.ComplementPatern(p);
      }), (function () {
        this.stringPatternHandler("&");
        p = this.prefixOperatorPattern();
        return Ast.LookaheadPattern(p);
      }), (function () {
        this.stringPatternHandler("#");
        p = this.prefixOperatorPattern();
        return Ast.HashOperatorPattern(p);
      }), this.postfixOperatorPattern);
    }));
  }),
  postfixOperatorPattern: (function () {
    return this.memoize("dVBuq7nH0hjXXdCTm8E5vg", (function () {
      var p;
      return (function () {
        p = this.callPattern();
        this._repeat((function () {
          return this._choice((function () {
            this.stringPatternHandler("*");
            return p = Ast.RepeatPattern(p);
          }), (function () {
            this.stringPatternHandler("+");
            return p = Ast.NonZeroRepeatPattern(p);
          }), (function () {
            this.stringPatternHandler("?");
            return p = Ast.OptionalPattern(p);
          }), (function () {
            this.stringPatternHandler(":");
            return p = Ast.BindPattern(p);
          }));
        }));
        return e;
      }).call(this);
    }));
  }),
  callPattern: (function () {
    return this.memoize("618RZ3+oYXFv5HTqqX5dHQ", (function () {
      var p, args;
      return (function () {
        p = this.primaryPattern();
        this._repeat((function () {
          return this._choice((function () {
            args = this.arguments();
            return p = Ast.CallPattern(p, args);
          }), (function () {
            args = this.patternArguments();
            return p = Ast.CallPatternWithPatternArguments(p, args);
          }));
        }));
        return p;
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
    return this.memoize("90C3JEoQafvFVkEoEajTHQ", (function () {
      var p;
      return this._choice(this.predicatePattern, this.actionPattern, this.immediateActionPattern, this.stringPattern, this.variablePattern, (function () {
        this.stringPatternHandler("(");
        p = this.pattern();
        this.stringPatternHandler(")");
        return p;
      }));
    }));
  }),
  predicatePattern: (function () {
    return this.memoize("5MGQDkXNAv208JjVW0AtGQ", (function () {
      var e;
      return (function () {
        this.stringPatternHandler("?");
        e = this.actionBody();
        return Ast.PredicatePattern(e);
      }).call(this);
    }));
  }),
  actionPattern: (function () {
    return this.memoize("tOcF3G4pd/Gjn9RiguEA6w", (function () {
      var e;
      return (function () {
        this.stringPatternHandler("!");
        e = this.actionBody();
        return Ast.ActionPattern(e);
      }).call(this);
    }));
  }),
  immediateActionPattern: (function () {
    return this.memoize("GkHyBeTDJ0/05UQSR0Aoug", (function () {
      var e;
      return (function () {
        this.stringPatternHandler("%");
        e = this.actionBody();
        return Ast.ImmediateActionPattern(e);
      }).call(this);
    }));
  }),
  actionBody: (function () {
    return this.memoize("4jw1AwB71c9peRe8nokN5w", (function () {
      var e;
      return this._choice(this.secondaryExpression, (function () {
        this.stringPatternHandler("(");
        e = this.expression();
        this.stringPatternHandler(")");
        return e;
      }), this.block);
    }));
  }),
  stringPattern: (function () {
    return this.memoize("96Bk8YcQ93lrwdt2wP9vsg", (function () {
      var s;
      return (function () {
        s = this.stringPatternHandler("string");
        return Ast.StringPattern(s.value);
      }).call(this);
    }));
  }),
  variablePattern: (function () {
    return this.memoize("Cz4VgqP/XTfT4C8txw81yA", (function () {
      var name;
      return (function () {
        name = this.variableIdentifier();
        return Ast.VariablePattern(name);
      }).call(this);
    }));
  }),
  id: (function (expectedName) {
    var name;
    return (function () {
      name = this.stringPatternHandler("identifier");
      this._predicate((function () {
        return name.text === expectedName;
      }));
      return name;
    }).call(this);
  }),
  variableIdentifier: (function () {
    return this.memoize("QxlNh+fLm4qBg2bNdWraVQ", (function () {
      var name;
      return (function () {
        name = this.stringPatternHandler("identifier");
        this._predicate((function () {
          return !name.reserved;
        }));
        return name.text;
      }).call(this);
    }));
  }),
  propertyName: (function () {
    return this.memoize("xBv1pNM82lnnQuAFtpaH8Q", (function () {
      var t;
      return this._choice((function () {
        t = this.stringPatternHandler("identifier");
        return t.text;
      }), (function () {
        t = this.stringPatternHandler("string");
        return t.value;
      }), (function () {
        t = this.stringPatternHandler("number");
        return t.text;
      }));
    }));
  }),
  t: (function (typename) {
    var token = this.next();
    if (token.type === typename) {
      this.furthestPosition = Math.max(this.furthestPosition, this.position);
      return token;
    }
    else {
      this.fail();
    }
  }),
  peekNext: (function () {
    return this.tokenAt(this.position);
  }),
  next: (function () {
    return this.tokenAt(this.position++);
  }),
  tokenAt: (function (position) {
    var token;
    assert(position < (this.tokens.length + 1));
    if (position >= this.tokens.length) {
      assert(this.tokens.isEmpty() || (this.tokens.last.type !== "eof"));
      this.tokens.push(this.lexer.nextToken());
    }
    return this.tokens[position];
  }),
  eof: (function () {
    return this.memoize("DwZq90yhPcYc6qTdhHpXvA", (function () {
      return this.stringPatternHandler("eof");
    }));
  }),
  stringPatternHandler: (function (string) {
    return this.t(string);
  }),
  lineColumnString: (function (position) {
    if (position == null) position = this.position;
    if (position != -1) {
      var token = this.tokenAt(position);
      return this.source.lineColumnAt(token.position).join(":");
    }
    else {
      return "-:-";
    }
  }),
  positionString: (function (position) {
    var lcs = this.lineColumnString(position);
    return (this.filename + ":") + lcs;
  }),
  log: (function (name) {
    var additionalMessages = Array.slice(arguments, 1);
    var out = (("CombeParser::log() " + this.positionString()) + ":") + name;
    if (additionalMessages.length > 0) {
      out = out + "; ";
      out = out + additionalMessages.join("; ");
    }
    console.error(out);
  })
});
