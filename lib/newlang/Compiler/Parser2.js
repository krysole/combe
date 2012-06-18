// Generated code
"use strict";
var combe = require("combe");
var BaseParser = combe.BaseParser;
var Lexer = require("./Lexer2");
var Ast = require("./Ast");
var Parser = module.exports = Class.new(BaseParser, {
  parseFile: (function (source, filename, tokens) {
    return this.parse(source, filename, tokens, "file");
  }),
  parse: (function (source, filename, tokens, rulename) {
    var rest = Array.slice(arguments, 4);
    if (filename == null) filename = "(unnamed)";
    var parser = this.new(source, filename, tokens);
    var result = parser.match.apply(parser, [
      rulename
    ].concat(rest));
    if (!result) {
      var t = parser.tokens.last;
      var lc = t != null ? source.lineColumnAt(t.position).join(":") : "-1";
      var text = t != null ? ("[" + t.text) + "] " : "";
      throw Error.new(((("Combe/Newlang Parser Failed: Furthest position was " + text) + filename) + ":") + lc);
    }
    return result;
  })
}, {
  initialize: (function (source, filename, tokens) {
    if (filename == null) filename = "(unnamed)";
    this.source = source;
    this.filename = filename;
    BaseParser.prototype.initialize.call(this, source);
    this.lexer = Lexer.new(source, filename);
    this.tokens = tokens != null ? tokens : [
      /* elision */
    ];
  }),
  file: (function () {
    return this.memoize("lgrYWGDtWx4CYkKXeydkKg", (function () {
      var stmts;
      return (function () {
        this.leadingNewlines();
        stmts = this.delimited(this.statement, this.statementTerminator);
        this._optional((function () {
          return this.stringPatternHandler(";");
        }));
        this.eof();
        return Ast.File(Ast.Block(stmts));
      }).call(this);
    }));
  }),
  statement: (function () {
    return this.memoize("siC4U0Zy6MB/xFxs/2VVyg", (function () {
      return this._choice(this.emptyStatement, this.ifStatement, this.tryCatchStatement, this.expression);
    }));
  }),
  expression: (function () {
    return this.memoize("Usya5JrbWqfz4swiNsc1uA", (function () {
      return this._choice(this.ifExpression, this.varExpression, this.returnExpression, this.throwExpression, this.operatorExpression);
    }));
  }),
  emptyStatement: (function () {
    return this.memoize("vNlh0xKuoyFOiMapUvs14g", (function () {
      return (function () {
        this._lookahead((function () {
          return this.stringPatternHandler(";");
        }));
        return Ast.Null();
      }).call(this);
    }));
  }),
  ifStatement: (function () {
    return this.memoize("K6XXYFXS3Uq4Yxa1UUGV0Q", (function () {
      var consiquent, condition, tail, ast, alternative;
      return (function () {
        consiquent = this.block((function () {
          this.id("if");
          return condition = this.expression();
        }));
        tail = ast = Ast.If(condition, consiquent, null);
        this._repeat((function () {
          consiquent = this.block((function () {
            this.id("else");
            this.id("if");
            return condition = this.expression();
          }));
          tail.alternative = Ast.If(condition, consiquent, null);
          return tail = tail.alternative;
        }));
        this._optional((function () {
          alternative = this.block((function () {
            return this.id("else");
          }));
          return tail.alternative = alternative;
        }));
        this.id("end");
        return ast;
      }).call(this);
    }));
  }),
  ifExpression: (function () {
    return this.memoize("N86Av6znl/xlntpfyXWOww", (function () {
      var condition, consiquent, alternative;
      return (function () {
        this.id("if");
        condition = this.expression();
        this.id("then");
        consiquent = this.expression();
        this._optional((function () {
          this.id("else");
          return alternative = this.expression();
        }));
        return Ast.If(condition, consiquent, alternative);
      }).call(this);
    }));
  }),
  tryCatchStatement: (function () {
    return this.memoize("2KlPyMFDbbxco5iS3zdRLA", (function () {
      var tryBlock, catchBlock, name;
      return (function () {
        tryBlock = this.block((function () {
          return this.id("try");
        }));
        catchBlock = this.block((function () {
          this.id("catch");
          return name = this.variableIdentifier();
        }));
        this.id("end");
        return Ast.TryCatch(tryBlock, name, catchBlock);
      }).call(this);
    }));
  }),
  varExpression: (function () {
    return this.memoize("Fej6rJcs1U2OZcVOGbKHRw", (function () {
      var name, rvalue;
      return (function () {
        this.id("var");
        name = this.variableIdentifier();
        this._optional((function () {
          this.op("=");
          return rvalue = this.expression();
        }));
        return Ast.Var(name, rvalue);
      }).call(this);
    }));
  }),
  returnExpression: (function () {
    return this.memoize("1upGpkgw8OSBw2K7Dacj6A", (function () {
      var arg;
      return (function () {
        this.id("return");
        arg = this._optional(this.expression);
        return Ast.Return(arg);
      }).call(this);
    }));
  }),
  throwExpression: (function () {
    return this.memoize("5fhCvzcq4jskIM67fkR5jQ", (function () {
      var arg;
      return (function () {
        this.id("throw");
        arg = this._optional(this.expression);
        return Ast.Throw(arg);
      }).call(this);
    }));
  }),
  block: (function (header) {
    var stmts;
    return (function () {
      this.layoutBlock(header, (function () {
        stmts = this.delimited(this.statement, this.statementTerminator);
        return this._optional((function () {
          return this.stringPatternHandler(";");
        }));
      }));
      return Ast.Block(stmts != null ? stmts : [
        /* elision */
      ]);
    }).call(this);
  }),
  operatorExpression: (function () {
    return this.memoize("aRXnmywofOAtO7rKEFNqJg", (function () {
      return this.assignmentExpression();
    }));
  }),
  assignmentExpression: (function () {
    return this.memoize("xDyuAk0RN4kalFiak+38uQ", (function () {
      var lvalue, rvalue;
      return this._choice((function () {
        lvalue = this.lvalueExpression();
        this.op("=");
        rvalue = this.assignmentExpression();
        return (function () {
          if (lvalue.is("VariableLookup")) {
            return Ast.VariableAssignment(lvalue.name, rvalue);
          }
          else if (lvalue.is("PropertyLookup")) {
            return Ast.PropertyAssignment(lvalue.object, lvalue.name, rvalue);
          }
          else if (lvalue.is("PrototypePropertyAssignment")) {
            return Ast.PropertyPrototypeAssignment(lvalue.object, lvalue.name, rvalue);
          }
          else assert(false);
        }).call(this);
      }), this.logicalOperator);
    }));
  }),
  lvalueExpression: (function () {
    return this.memoize("5HD/uBGM4+9JjQcfVgYdsQ", (function () {
      return this._choice(this.lvalueSecondaryExpression, this.lvaluePrimaryExpression);
    }));
  }),
  lvalueSecondaryExpression: (function () {
    return this.memoize("MN0iK7b5RnfehOBq0iqwoA", (function () {
      var expr;
      return (function () {
        expr = this.primaryExpression();
        this._repeat1((function () {
          return expr = this.lvalueSecondaryExpressionFragment(expr);
        }));
        return expr;
      }).call(this);
    }));
  }),
  lvalueSecondaryExpressionFragment: (function (expr) {
    var name;
    return this._choice((function () {
      this.op(".");
      name = this.propertyName();
      return Ast.PropertyLookup(expr, name);
    }), (function () {
      this.op(":");
      name = this.propertyName();
      return Ast.PrototypePropertyLookup(expr, name);
    }), (function () {
      this.stringPatternHandler("[");
      this.ignoringNewlines((function () {
        return name = this.expression();
      }));
      this.stringPatternHandler("]");
      return Ast.PropertyLookup(expr, name);
    }));
  }),
  lvaluePrimaryExpression: (function () {
    return this.memoize("VBhtZ4KZnB2D7Fmi+tRjhA", (function () {
      return this.variableLookup();
    }));
  }),
  logicalOperator: (function () {
    return this.memoize("VA/ANwhwfkiwG5YvSCMErQ", (function () {
      return this.wordedLogicalOr();
    }));
  }),
  wordedLogicalOr: (function () {
    return this.memoize("koAntupf9Mb2GJdg9UczcQ", (function () {
      var expr, rhs;
      return (function () {
        expr = this.wordedLogicalXor();
        this._repeat((function () {
          this.id("or");
          rhs = this.wordedLogicalXor();
          return expr = Ast.Or(expr, rhs);
        }));
        return expr;
      }).call(this);
    }));
  }),
  wordedLogicalXor: (function () {
    return this.memoize("1OlpXo0ivczZonzf8wDSZw", (function () {
      var expr, rhs;
      return (function () {
        expr = this.wordedLogicalAnd();
        this._repeat((function () {
          this.id("xor");
          rhs = this.wordedLogicalAnd();
          return expr = Ast.Xor(expr, rhs);
        }));
        return expr;
      }).call(this);
    }));
  }),
  wordedLogicalAnd: (function () {
    return this.memoize("moi3q+1UditbltFDDrec2w", (function () {
      var expr, rhs;
      return (function () {
        expr = this.wordedLogicalNot();
        this._repeat((function () {
          this.id("and");
          rhs = this.wordedLogicalNot();
          return expr = Ast.And(expr, rhs);
        }));
        return expr;
      }).call(this);
    }));
  }),
  wordedLogicalNot: (function () {
    return this.memoize("eFhK7cqRYHvR590QV0DPDw", (function () {
      var expr;
      return this._choice((function () {
        this.id("not");
        expr = this.wordedLogicalNot();
        return Ast.Not(expr);
      }), this.symbolicLogicalOr);
    }));
  }),
  symbolicLogicalOr: (function () {
    return this.memoize("l3r4UthFWneAKjXU3JABCw", (function () {
      var expr, rhs;
      return (function () {
        expr = this.symbolicLogicalXor();
        this._repeat((function () {
          this.op("||");
          rhs = this.symbolicLogicalXor();
          return expr = Ast.Or(expr, rhs);
        }));
        return expr;
      }).call(this);
    }));
  }),
  symbolicLogicalXor: (function () {
    return this.memoize("sZ2a6zH8FnT9SSsP/5lrlA", (function () {
      var expr, rhs;
      return (function () {
        expr = this.symbolicLogicalAnd();
        this._repeat((function () {
          this.op("^^");
          rhs = this.symbolicLogicalAnd();
          return expr = Ast.Xor(expr, rhs);
        }));
        return expr;
      }).call(this);
    }));
  }),
  symbolicLogicalAnd: (function () {
    return this.memoize("w0c/28zNkQ6iusJh1wV80w", (function () {
      var expr, rhs;
      return (function () {
        expr = this.symbolicLogicalNot();
        this._repeat((function () {
          this.op("&&");
          rhs = this.symbolicLogicalNot();
          return expr = Ast.And(expr, rhs);
        }));
        return expr;
      }).call(this);
    }));
  }),
  symbolicLogicalNot: (function () {
    return this.memoize("81UpoZflIHLnSar0uzmxLg", (function () {
      var expr;
      return this._choice((function () {
        this.op("!");
        expr = this.symbolicLogicalNot();
        return Ast.Not(expr);
      }), this.equalityOperator);
    }));
  }),
  equalityOperator: (function () {
    return this.memoize("0whs3TRmyk6kSS2ejNKYRQ", (function () {
      var expr, opname, rhs;
      return (function () {
        expr = this.comparisonOperator();
        return this._choice((function () {
          opname = this._choice((function () {
            return this.op("==");
          }), (function () {
            return this.op("!=");
          }), (function () {
            return this.op("<=");
          }), (function () {
            return this.op("<");
          }), (function () {
            return this.op(">=");
          }), (function () {
            return this.op(">");
          }));
          rhs = this.comparisonOperator();
          return Ast.Operator(opname, expr, rhs);
        }), (function () {
          return expr;
        }));
      }).call(this);
    }));
  }),
  comparisonOperator: (function () {
    return this.memoize("uW7iBziHat+CjfOFPoB9/w", (function () {
      var expr, opname, rhs;
      return (function () {
        expr = this.associationOperator();
        return this._choice((function () {
          opname = this.op("<>");
          rhs = this.association();
          return Ast.Operator(opname, expr, rhs);
        }), (function () {
          return expr;
        }));
      }).call(this);
    }));
  }),
  associationOperator: (function () {
    return this.memoize("nB+3g/yJMqwA/sHsy/RElw", (function () {
      return this._choice(this.association, this.bitwiseOr);
    }));
  }),
  association: (function () {
    return this.memoize("olkNhcA9smGEj1gMGd1g7Q", (function () {
      var lhs, rhs;
      return this._choice((function () {
        lhs = this.propertyName();
        this.op(":");
        rhs = this.bitwiseOr();
        return Ast.Association(lhs, rhs);
      }), (function () {
        lhs = this.bitwiseOr();
        this.op("=>");
        rhs = this.bitwiseOr();
        return Ast.Association(lhs, rhs);
      }));
    }));
  }),
  bitwiseOr: (function () {
    return this.memoize("zu30opFb5h28DT1YoIp9Ag", (function () {
      return this.leftAssocOperator(this.bitwiseXor, (function () {
        return this.op("|");
      }));
    }));
  }),
  bitwiseXor: (function () {
    return this.memoize("pYakQ8mHy26V9Kije4zVXw", (function () {
      return this.leftAssocOperator(this.bitwiseAnd, (function () {
        return this.op("^");
      }));
    }));
  }),
  bitwiseAnd: (function () {
    return this.memoize("LVtGjqDtAnb4KPYZcLfqYQ", (function () {
      return this.leftAssocOperator(this.shiftOperator, (function () {
        return this.op("&");
      }));
    }));
  }),
  shiftOperator: (function () {
    return this.memoize("Ub7pvtNaiM1oHj6eV0iCgg", (function () {
      return this.leftAssocOperator(this.additionOperator, (function () {
        return this._choice((function () {
          return this.op("<<");
        }), (function () {
          return this.op(">>");
        }), (function () {
          return this.op(">>>");
        }));
      }));
    }));
  }),
  additionOperator: (function () {
    return this.memoize("WjUqy0nCK4alaBIrIiPcEA", (function () {
      return this.leftAssocOperator(this.multiplicationOperator, (function () {
        return this._choice((function () {
          return this.op("+");
        }), (function () {
          return this.op("-");
        }));
      }));
    }));
  }),
  multiplicationOperator: (function () {
    return this.memoize("MklCzDwZGtQk6C9V15T87Q", (function () {
      return this.leftAssocOperator(this.exponentiationOperator, (function () {
        return this._choice((function () {
          return this.op("*");
        }), (function () {
          return this.op("/");
        }), (function () {
          return this.op("//");
        }), (function () {
          return this.op("%");
        }));
      }));
    }));
  }),
  exponentiationOperator: (function () {
    return this.memoize("xFCxvHU6InJ7G8/382GEng", (function () {
      return this.rightAssocOperator(this.prefixOperatorExpression, (function () {
        return this.op("**");
      }));
    }));
  }),
  leftAssocOperator: (function (term, operator) {
    var expr, opname, rhs;
    return (function () {
      expr = term.call(this);
      this._repeat((function () {
        opname = operator.call(this);
        rhs = term.call(this);
        return expr = Ast.Operator(opname, expr, rhs);
      }));
      return expr;
    }).call(this);
  }),
  rightAssocOperator: (function (term, operator) {
    var expr, opname, rhs;
    return (function () {
      expr = term.call(this);
      return this._choice((function () {
        opname = operator.call(this);
        rhs = this.rightAssocOperator(term, operator);
        return Ast.Operator(opname, expr, rhs);
      }), (function () {
        return expr;
      }));
    }).call(this);
  }),
  prefixOperatorExpression: (function () {
    return this.memoize("+reu9c4bHIHXgkdpvANmMw", (function () {
      var opname, expr;
      return this._choice((function () {
        opname = this._choice((function () {
          return this.op("+");
        }), (function () {
          return this.op("-");
        }), (function () {
          return this.op("~");
        }));
        expr = this.prefixOperatorExpression();
        return Ast.PrefixOperator(opname, expr);
      }), this.secondaryExpression);
    }));
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
  secondaryExpressionFragment: (function (expr) {
    var name, ad;
    return this._choice((function () {
      this.op(".");
      name = this.propertyName();
      ad = this.argumentsList();
      return Ast.MethodCall(expr, name, ad.this, ad.arguments);
    }), (function () {
      this.op(".");
      name = this.propertyName();
      return Ast.PropertyLookup(expr, name);
    }), (function () {
      this.op(":");
      name = this.propertyName();
      ad = this.argumentsList();
      return Ast.PrototypeMethodCall(expr, name, ad.this, ad.arguments);
    }), (function () {
      this.op(":");
      name = this.propertyName();
      return Ast.PrototypePropertyLookup(expr, name);
    }), (function () {
      ad = this.argumentsList();
      return Ast.Call(expr, ad.this, ad.arguments);
    }), (function () {
      this.stringPatternHandler("[");
      this.ignoringNewlines((function () {
        return name = this.expression();
      }));
      this.stringPatternHandler("]");
      return Ast.PropertyLookup(expr, name);
    }));
  }),
  argumentsList: (function () {
    return this.memoize("X3E0ppmDDljG/ktROnVBuQ", (function () {
      var _this, expr, args;
      return (function () {
        this.stringPatternHandler("(");
        this.ignoringNewlines((function () {
          _this = this._optional((function () {
            expr = this.expression();
            this.stringPatternHandler(";");
            return expr;
          }));
          args = this.delimited((function () {
            return this.expansion(this.expression);
          }), (function () {
            return this.stringPatternHandler(",");
          }));
          this._optional((function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler(")");
        }));
        return {
          this: _this,
          arguments: args
        };
      }).call(this);
    }));
  }),
  subscript: (function () {
    return this.memoize("TCuXMGb6VzdWLzqmxGl3fg", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("[");
        this.ignoringNewlines((function () {
          args = this.delimited((function () {
            return this.expansion(this.expression);
          }), (function () {
            return this.stringPatternHandler(",");
          }));
          this._optional((function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler("]");
        }));
        return args;
      }).call(this);
    }));
  }),
  expansion: (function (alternative) {
    var expr;
    return this._choice((function () {
      this.op("..");
      expr = this.expression();
      return Ast.ExpandArguments(expr);
    }), alternative);
  }),
  primaryExpression: (function () {
    return this.memoize("zjgHN6NLa22UAqDi7ZOtqg", (function () {
      return this._choice(this.psuedoVariable, this.variableLookup, this.stringLiteral, this.numberLiteral, this.objectLiteral, this.functionLiteral, this.subexpression);
    }));
  }),
  psuedoVariable: (function () {
    return this.memoize("qec/eDGnsMxGBEaOsibViQ", (function () {
      return this._choice((function () {
        this.id("this");
        return Ast.This();
      }), (function () {
        this.id("null");
        return Ast.Null();
      }), (function () {
        this.id("undefined");
        return Ast.Undefined();
      }), (function () {
        this.id("true");
        return Ast.True();
      }), (function () {
        this.id("false");
        return Ast.False();
      }));
    }));
  }),
  variableLookup: (function () {
    return this.memoize("P1FDgyIRfdHpy9Iv6ghjzg", (function () {
      var name;
      return (function () {
        name = this.variableIdentifier();
        return Ast.VariableLookup(name);
      }).call(this);
    }));
  }),
  stringLiteral: (function () {
    return this.memoize("5NlQZZG2cNjMFTzFbrjoLA", (function () {
      var s;
      return (function () {
        s = this.stringPatternHandler("string");
        return Ast.String(s.value);
      }).call(this);
    }));
  }),
  numberLiteral: (function () {
    return this.memoize("sTOnbkWsHLnfYA1QtBGS7w", (function () {
      var n;
      return (function () {
        n = this.stringPatternHandler("number");
        return Ast.Number(n.value);
      }).call(this);
    }));
  }),
  objectLiteral: (function () {
    return this.memoize("k/z0xtn7D3c53Ak7gAzqlw", (function () {
      var proto, expr, decls;
      return (function () {
        this.stringPatternHandler("{");
        this.ignoringNewlines((function () {
          proto = this._optional((function () {
            expr = this.expression();
            this.stringPatternHandler(";");
            return expr;
          }));
          decls = this.delimited(this.propertyDeclaration, (function () {
            return this.stringPatternHandler(",");
          }));
          this._optional((function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler("}");
        }));
        return Ast.Object(proto, decls);
      }).call(this);
    }));
  }),
  functionLiteral: (function () {
    return this.memoize("OipYvVPyquL7yJXadK19zQ", (function () {
      var pd, body, fb;
      return this._choice((function () {
        pd = this.optParameterList();
        this.op("->");
        body = this.expression();
        return Ast.Function(pd.this, pd.parameters, body);
      }), (function () {
        fb = this.functionBlock((function () {
          return this.id("function");
        }));
        return Ast.Function(fb.this, fb.parameters, fb.body);
      }));
    }));
  }),
  functionBlock: (function (header) {
    var pd, body;
    return this._choice((function () {
      header.call(this);
      pd = this.optParameterList();
      this.op("->");
      body = this.expression();
      return {
        this: pd.this,
        parameters: pd.parameters,
        body: body
      };
    }), (function () {
      body = this.block((function () {
        header.call(this);
        return pd = this.optParameterList();
      }));
      this.id("end");
      return {
        this: pd.this,
        parameters: pd.parameters,
        body: body
      };
    }));
  }),
  subexpression: (function () {
    return this.memoize("KWUvL6btsULp0/pQDoHRkQ", (function () {
      var expr;
      return (function () {
        this.stringPatternHandler("(");
        this.ignoringNewlines((function () {
          expr = this.expression();
          return this.stringPatternHandler(")");
        }));
        return expr;
      }).call(this);
    }));
  }),
  optParameterList: (function () {
    return this.memoize("K4OwNg6bR7/ov2oIiVz4uw", (function () {
      var pd;
      return (function () {
        pd = this._optional(this.parameterList);
        return pd != null ? pd : {
          this: null,
          parameters: [
            /* elision */
          ]
        };
      }).call(this);
    }));
  }),
  parameterList: (function () {
    return this.memoize("siNhseLd1hl4PSsTsCQPPQ", (function () {
      var _this, p, params;
      return (function () {
        this.stringPatternHandler("(");
        this.ignoringNewlines((function () {
          _this = this._optional((function () {
            p = this.parameter();
            this.stringPatternHandler(";");
            return p;
          }));
          params = this.delimited(this.contractionParameter, (function () {
            return this.stringPatternHandler(",");
          }));
          this._optional((function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler(")");
        }));
        return {
          this: _this,
          parameters: params
        };
      }).call(this);
    }));
  }),
  contractionParameter: (function () {
    return this.memoize("8Li5HKzubJbpwJVfIx6Eaw", (function () {
      var name;
      return this._choice((function () {
        this.op("..");
        name = this.variableIdentifier();
        return Ast.ContractionParameter(name);
      }), this.parameter);
    }));
  }),
  parameter: (function () {
    return this.memoize("gacGq+ZUU64r+ECSv4zvqQ", (function () {
      var name;
      return this._choice((function () {
        name = this.variableIdentifier();
        return Ast.Parameter(name);
      }), (function () {
        this.id("_");
        return Ast.IgnoredParameter();
      }));
    }));
  }),
  propertyDeclaration: (function () {
    return this.memoize("1rh8JejjnNCV0FsrWnnZyQ", (function () {
      return this._choice(this.valuePropertyDeclaration, this.getPropertyDeclaration, this.setPropertyDeclaration, this.methodPropertyDeclaration, this.describePropertyDeclaration);
    }));
  }),
  valuePropertyDeclaration: (function () {
    return this.memoize("2aBhBWwunzzU6XzAcb6J7g", (function () {
      var name, value;
      return (function () {
        name = this.propertyName();
        this.op(":");
        value = this.expression();
        return Ast.ValuePropertyDeclaration(name, value);
      }).call(this);
    }));
  }),
  getPropertyDeclaration: (function () {
    return this.memoize("vjCMr1iKzfiV/j9cNm9SdA", (function () {
      var fb, name;
      return (function () {
        fb = this.functionBlock((function () {
          this.id("get");
          return name = this.propertyName();
        }));
        return Ast.GetPropertyDeclaration(name, fb.this, fb.parameters, fb.body);
      }).call(this);
    }));
  }),
  setPropertyDeclaration: (function () {
    return this.memoize("6I5wfX0P2zaDVplyo+wq/g", (function () {
      var fb, name;
      return (function () {
        fb = this.functionBlock((function () {
          this.id("set");
          return name = this.propertyName();
        }));
        return Ast.SetPropertyDeclaration(name, fb.this, fb.parameters, fb.body);
      }).call(this);
    }));
  }),
  methodPropertyDeclaration: (function () {
    return this.memoize("IRbhQAm2z1I0at52AYjTjw", (function () {
      var fb, name;
      return (function () {
        fb = this.functionBlock((function () {
          this.id("method");
          return name = this.propertyName();
        }));
        return Ast.MethodPropertyDeclaration(name, fb.this, fb.parameters, fb.body);
      }).call(this);
    }));
  }),
  describePropertyDeclaration: (function () {
    return this.memoize("8FNZttL+qwHFgTgLcJF5mA", (function () {
      var name, dict;
      return (function () {
        this.id("describe");
        name = this.propertyName();
        this.op(":");
        dict = this.expression();
        return Ast.DescribePropertyDeclaration(name, dict);
      }).call(this);
    }));
  }),
  propertyName: (function () {
    return this.memoize("8nXD2ZAh/6SL7ht7O5/kLQ", (function () {
      var name;
      return this._choice((function () {
        name = this.stringPatternHandler("identifier");
        return Ast.String(name.text);
      }), this.stringLiteral);
    }));
  }),
  leadingNewlines: (function () {
    var column = this.t("newline").value;
    if (column !== 0) {
      this.fail();
    }
  }),
  statementTerminator: (function () {
    if (this.state.ignoreNewlines) {
      this.t(";");
      return;
    }
    else {
      this._choice((function () {
        this.t(";");
        this._optional((function () {
          var column = this.t("newline").value;
          if (column === this.state.column) {
            return;
          }
          else {
            this.fail();
          }
        }));
      }), (function () {
        var column = this.t("newline").value;
        if (column === this.state.column) {
          return;
        }
        else {
          this.fail();
        }
      }));
    }
  }),
  layoutBlock: (function (header, body) {
    var oldState = this.copyState();
    var headerColumn = oldState.column;
    this.state.allowContinuationLines = false;
    this.state.ignoreNewlines = false;
    if (oldState.ignoreNewlines) {
      var headerColumn = this._optional((function () {
        return this.t("newline").value;
      }));
    }
    header.call(this);
    var bodyColumn = this.t("newline").value;
    if ((headerColumn != null) && (bodyColumn < headerColumn)) {
      this.fail();
    }
    else if ((headerColumn != null) && (bodyColumn == headerColumn)) {
      this.state.allowContinuationLines = oldState.allowContinuationLines;
      this.state.ignoreNewlines = oldState.ignoreNewlines;
      this.state.column = oldState.column;
    }
    else {
      this.state.column = bodyColumn;
      this.state.allowContinuationLines = true;
      this._choice((function () {
        body.call(this);
        var dedentColumn = this.t("newline").value;
        if (((headerColumn != null) && (dedentColumn !== headerColumn)) || (oldState.ignoreNewlines && (dedentColumn >= bodyColumn))) {
          this.fail();
        }
        this.state.allowContinuationLines = oldState.allowContinuationLines;
        this.state.ignoreNewlines = oldState.ignoreNewlines;
        this.state.column = oldState.column;
      }), (function () {
        if (headerColumn == null) {
          this.state.allowContinuationLines = oldState.allowContinuationLines;
          this.state.ignoreNewlines = oldState.ignoreNewlines;
          this.state.column = oldState.column;
        }
        else {
          this.fail();
        }
      }));
    }
  }),
  ignoringNewlines: (function (parser) {
    var oldIgnoreNewlines = this.state.ignoreNewlines;
    this.state.ignoreNewlines = true;
    var result = parser.call(this);
    this.state.ignoreNewlines = oldIgnoreNewlines;
    return result;
  }),
  t: (function (typename) {
    var token = this.next();
    while (token.type === "newline") {
      if (this.state.ignoreNewlines) {
        token = this.next();
        break;
      }
      else if (this.state.allowContinuationLines && (token.value > this.state.column)) {
        token = this.next();
        break;
      }
      else {
        break;
      }
    }
    if (token.type === typename) {
      return token;
    }
    else {
      this.fail();
    }
  }),
  id: (function (expectedName) {
    var name;
    return (function () {
      name = this.stringPatternHandler("identifier");
      this._predicate((function () {
        return name.text === expectedName;
      }));
      return name.text;
    }).call(this);
  }),
  variableIdentifier: (function () {
    return this.memoize("ycnMgnYhx/OsvK63jjKC5g", (function () {
      var name;
      return (function () {
        name = this.stringPatternHandler("identifier");
        this._predicate((function () {
          return !name.invalidVariableIdentifier;
        }));
        return name.text;
      }).call(this);
    }));
  }),
  op: (function (expectedOpname) {
    var opname;
    return (function () {
      opname = this.stringPatternHandler("operator");
      this._predicate((function () {
        return opname.text === expectedOpname;
      }));
      return opname.text;
    }).call(this);
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
  peekNext: (function () {
    return this.tokenAt(this.position);
  }),
  next: (function () {
    return this.tokenAt(this.position++);
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
    var token = this.tokenAt(position);
    return this.source.lineColumnAt(token.position).join(":");
  }),
  positionString: (function (position) {
    if (position == null) position = this.position;
    var token = this.tokenAt(position);
    return (this.filename + ":") + this.source.lineColumnAt(token.position).join(":");
  }),
  get position() {
    return this.state.position;
  },
  set position(value) {
    this.state.position = value;
  },
  get state() {
    return this._state;
  },
  set state(value) {
    this._state = value;
  },
  emptyState: (function () {
    return {
      position: 0,
      ignoreNewlines: false,
      allowContinuationLines: true,
      column: 0
    };
  }),
  copyState: (function () {
    return {
      position: this.state.position,
      ignoreNewlines: this.state.ignoreNewlines,
      allowContinuationLines: this.state.allowContinuationLines,
      column: this.state.column
    };
  }),
  log: (function (name) {
    var messages = Array.slice(arguments, 1);
    console.log((((("Parser2::log() " + this.positionString()) + ":") + name) + " - ") + messages.join("; "));
  })
});
