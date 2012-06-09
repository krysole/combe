// Generated code
"use strict";
var combe = require("combe");
var TextParser = combe.TextParser;
var Ast = require("./Ast");
var Parser = module.exports = Class.new(TextParser, {
  parseFile: (function (source, filename) {
    return this.parse(source, filename, "file");
  }),
  parse: (function (source, filename, rulename) {
    var rest = Array.slice(arguments, 3);
    if (filename == null) filename = "(unnamed)";
    var parser = this.new(source, filename);
    var result = parser.match.apply(parser, [
      rulename
    ].concat(rest));
    if (!result) {
      var lc = source.lineColumnAt(parser.furthestPosition);
      throw Error.new((((("Combe/Newlang Parser Failed: Furthest position was " + filename) + ":") + lc[0]) + ":") + lc[1]);
    }
    return result;
  })
}, {
  initialize: (function (source, filename) {
    if (filename == null) filename = "(unnamed)";
    this.source = source;
    this.filename = filename;
    this.furthestPosition = 0;
    TextParser.prototype.initialize.call(this, source);
  }),
  file: (function () {
    return this.memoize("0HrgigAqC9Jp45ecw8YRAg", (function () {
      var stmts;
      return (function () {
        this._repeat(this.blankline);
        stmts = this.delimited(this.statement, this.statementTerminator);
        this._optional(this.statementTerminator);
        this.eof();
        return Ast.File(Ast.Block(stmts));
      }).call(this);
    }));
  }),
  statement: (function () {
    return this.memoize("I8pn+kCm3xNG5jEJRkHoRg", (function () {
      return this._choice(this.emptyStatement, this.ifStatement, this.expression);
    }));
  }),
  expression: (function () {
    return this.memoize("Usya5JrbWqfz4swiNsc1uA", (function () {
      return this._choice(this.ifExpression, this.varExpression, this.returnExpression, this.throwExpression, this.operatorExpression);
    }));
  }),
  emptyStatement: (function () {
    return this.memoize("F5uE9kzf6x5hWF40stvbaQ", (function () {
      return this._lookahead((function () {
        this._repeat((function () {
          return this._choice(this.spaces, this.comment);
        }));
        return this.stringPatternHandler(";");
      }));
    }));
  }),
  ifStatement: (function () {
    return this.memoize("efsVbZ2FZGjKzPIpUhBiEg", (function () {
      var sb, ast, tail;
      return (function () {
        sb = this.specialBlock((function () {
          this.id("if");
          return this.expression();
        }));
        ast = Ast.If(sb.header, sb.body, null);
        tail = ast;
        this._repeat((function () {
          sb = this.specialBlock((function () {
            this.id("else");
            this.id("if");
            return this.expression();
          }));
          tail.alternative = Ast.If(sb.header, sb.body, null);
          return tail = tail.alternative;
        }));
        this._optional((function () {
          return this._choice((function () {
            sb = this.specialBlock((function () {
              return this.id("else");
            }));
            return tail.alternative = sb.body;
          }), (function () {
            return tail.alternative = Ast.Noop();
          }));
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
  varExpression: (function () {
    return this.memoize("SP/Hd+WIShN/zxBw2wbM9w", (function () {
      var name, rvalue;
      return (function () {
        this.id("var");
        name = this.variableIdentifier();
        this._optional((function () {
          this.op("=");
          return rvalue = this.assignmentExpression();
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
  specialBlock: (function (header) {
    var h, stmts;
    return (function () {
      h = this.blockHeader(header);
      return this._choice((function () {
        this._lookahead(this.increasedIndentation);
        this.withIncreasedIndentation((function () {
          stmts = this.delimited(this.statement, this.statementTerminator);
          return this._optional(this.statementTerminator);
        }));
        return {
          header: h,
          body: Ast.Block(stmts)
        };
      }), (function () {
        return {
          header: h,
          body: Ast.Noop()
        };
      }));
    }).call(this);
  }),
  operatorExpression: (function () {
    return this.memoize("aRXnmywofOAtO7rKEFNqJg", (function () {
      return this.assignmentExpression();
    }));
  }),
  assignmentExpression: (function () {
    return this.memoize("z79AJP3BLQswskOMzJv+zg", (function () {
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
            return Ast.PrototypePropertyAssignment(lvalue.object, lvalue.name, rvalue);
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
  lvaluePrimaryExpression: (function () {
    return this.memoize("VBhtZ4KZnB2D7Fmi+tRjhA", (function () {
      return this.variableLookup();
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
    var pname;
    return this._choice((function () {
      this.op(".");
      pname = this.propertyName();
      return Ast.PropertyLookup(expr, pname);
    }), (function () {
      this.op(":");
      pname = this.propertyName();
      return Ast.PrototypePropertyLookup(expr, pname);
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
    var pname, ad, args;
    return this._choice((function () {
      this.op(".");
      pname = this.propertyName();
      ad = this.argumentsList();
      return Ast.MethodCall(expr, pname, ad.this, ad.arguments);
    }), (function () {
      this.op(".");
      pname = this.propertyName();
      return Ast.PropertyLookup(expr, pname);
    }), (function () {
      this.op(":");
      pname = this.propertyName();
      ad = this.argumentsList();
      return Ast.PrototypeMethodCall(expr, pname, ad.this, ad.arguments);
    }), (function () {
      this.op(":");
      pname = this.propertyName();
      return Ast.PrototypePropertyLookup(expr, pname);
    }), (function () {
      ad = this.argumentsList();
      return Ast.Call(expr, ad.this, ad.arguments);
    }), (function () {
      args = this.subscript();
      return Ast.Subscript(expr, args);
    }));
  }),
  argumentsList: (function () {
    return this.memoize("tgdY97jPBlwty2yHCmT0Yw", (function () {
      var t, args;
      return (function () {
        this.tokenOperatorHandler((function () {
          return this.stringPatternHandler("(");
        }));
        this.ignoringIndentation((function () {
          t = this._optional((function () {
            t = this.expression();
            this.tokenOperatorHandler((function () {
              return this.stringPatternHandler(";");
            }));
            return t;
          }));
          args = this.delimited((function () {
            return this.expansion(this.expression);
          }), (function () {
            return this.tokenOperatorHandler((function () {
              return this.stringPatternHandler(",");
            }));
          }));
          this.tokenOperatorHandler((function () {
            return this._optional((function () {
              return this.stringPatternHandler(",");
            }));
          }));
          return this.tokenOperatorHandler((function () {
            return this.stringPatternHandler(")");
          }));
        }));
        return {
          this: t,
          arguments: args
        };
      }).call(this);
    }));
  }),
  subscript: (function () {
    return this.memoize("8C4hMXly0V7WhGLnx6VQEQ", (function () {
      var args;
      return (function () {
        this.tokenOperatorHandler((function () {
          return this.stringPatternHandler("[");
        }));
        this.ignoringIndentation((function () {
          args = this.delimited((function () {
            return this.expansion(this.expression);
          }), (function () {
            return this.tokenOperatorHandler((function () {
              return this.stringPatternHandler(",");
            }));
          }));
          this.tokenOperatorHandler((function () {
            return this._optional((function () {
              return this.stringPatternHandler(",");
            }));
          }));
          return this.tokenOperatorHandler((function () {
            return this.stringPatternHandler("]");
          }));
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
    return this.memoize("CHIminb+niLRJNFVybAGTA", (function () {
      var s;
      return (function () {
        s = this.string();
        return Ast.String(s);
      }).call(this);
    }));
  }),
  numberLiteral: (function () {
    return this.memoize("mRdP4FQFrRgyY09kBYBA/Q", (function () {
      var n;
      return (function () {
        n = this.number();
        return Ast.Number(n);
      }).call(this);
    }));
  }),
  objectLiteral: (function () {
    return this.memoize("5oXslsZ/Fy7+y69vFiJEuQ", (function () {
      var proto, pdecls;
      return (function () {
        this.tokenOperatorHandler((function () {
          return this.stringPatternHandler("{");
        }));
        this.ignoringIndentation((function () {
          proto = this._optional((function () {
            proto = this.expression();
            this.tokenOperatorHandler((function () {
              return this.stringPatternHandler(";");
            }));
            return proto;
          }));
          pdecls = this.delimited(this.propertyDeclaration, (function () {
            return this.tokenOperatorHandler((function () {
              return this.stringPatternHandler(",");
            }));
          }));
          this.tokenOperatorHandler((function () {
            return this._optional((function () {
              return this.stringPatternHandler(",");
            }));
          }));
          return this.tokenOperatorHandler((function () {
            return this.stringPatternHandler("}");
          }));
        }));
        return Ast.Object(proto, pdecls);
      }).call(this);
    }));
  }),
  functionLiteral: (function () {
    return this.memoize("01b95n2dl4oU98B8zRLasg", (function () {
      var pd, body, fb;
      return this._choice((function () {
        pd = this.optParameterList();
        this.op("->");
        body = this.expression();
        return Ast.Function(pd.this, pd.parameters, body);
      }), (function () {
        fb = this.functionBlock((function () {
          return this.id("fn");
        }));
        return Ast.Function(fb.this, fb.parameters, fb.body);
      }));
    }));
  }),
  functionBlock: (function (header) {
    var pd, body, sb;
    return this._choice((function () {
      header.call(this);
      pd = this.optParameterList();
      this.op("->");
      body = this.expression();
      return {
        this: pd.this,
        parameters: pd.parameters,
        body: sb.body
      };
    }), (function () {
      sb = this.specialBlock((function () {
        header.call(this);
        return pd = this.optParameterList();
      }));
      this.id("end");
      return {
        this: pd.this,
        parameters: pd.parameters,
        body: sb.body
      };
    }));
  }),
  subexpression: (function () {
    return this.memoize("ffz1tc7OGopELlBZIWFpjA", (function () {
      var expr;
      return (function () {
        this.tokenOperatorHandler((function () {
          return this.stringPatternHandler("(");
        }));
        this.ignoringIndentation((function () {
          expr = this.expression();
          return this.tokenOperatorHandler((function () {
            return this.stringPatternHandler(")");
          }));
        }));
        return expr;
      }).call(this);
    }));
  }),
  optParameterList: (function () {
    return this.memoize("hbWNGFL0oSe1OOLY54jTqA", (function () {
      var pd;
      return (function () {
        pd = this.parameterList();
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
    return this.memoize("Vud21jnI/44ap8YDIM/QOQ", (function () {
      var t, params;
      return (function () {
        this.tokenOperatorHandler((function () {
          return this.stringPatternHandler("(");
        }));
        this.ignoringIndentation((function () {
          t = this._optional((function () {
            t = this.parameter();
            this.tokenOperatorHandler((function () {
              return this.stringPatternHandler(";");
            }));
            return t;
          }));
          params = this.delimited(this.contractionParameter, (function () {
            return this.tokenOperatorHandler((function () {
              return this.stringPatternHandler(",");
            }));
          }));
          this.tokenOperatorHandler((function () {
            return this._optional((function () {
              return this.stringPatternHandler(",");
            }));
          }));
          return this.tokenOperatorHandler((function () {
            return this.stringPatternHandler(")");
          }));
        }));
        return {
          this: t,
          parameters: params
        };
      }).call(this);
    }));
  }),
  contractionParameter: (function () {
    return this.memoize("eTYvXmidSb86x3o62mJzrQ", (function () {
      var name;
      return this._choice((function () {
        this.op("..");
        name = this.variableIdentifier();
        return Ast.ContractParameters(name);
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
    return this.memoize("EtrDNEM+/+8KwqtjkBkQDA", (function () {
      var name;
      return this._choice((function () {
        name = this.identifier();
        return Ast.String(name);
      }), this.stringLiteral);
    }));
  }),
  InvalidVariableIdentifiers: [
    "this",
    "true",
    "false",
    "null",
    "undefined",
    "_",
    "or",
    "and",
    "xor",
    "not",
    "if",
    "then",
    "else",
    "var",
    "return",
    "throw",
    "do",
    "end"
  ],
  variableIdentifier: (function () {
    return this.memoize("k4ZUC1ZnIdTOPmnz7KNF3A", (function () {
      var name;
      return (function () {
        name = this.identifier();
        this._predicate((function () {
          return !this.InvalidVariableIdentifiers.include(name);
        }));
        return name;
      }).call(this);
    }));
  }),
  number: (function () {
    return this.memoize("48U2XQwSb+nmfQxWqIN9TQ", (function () {
      return this._choice(this.decimalNumber, this.hexNumber);
    }));
  }),
  decimalNumber: (function () {
    return this.memoize("Yt8YiOzzbPOo9HZEg0HXbg", (function () {
      var text;
      return (function () {
        this._optional(this.ws);
        text = this.matchedInput((function () {
          this._repeat1(this.digit);
          this._optional((function () {
            this.stringPatternHandler(".");
            return this._repeat(this.digit);
          }));
          return this._optional((function () {
            this._choice((function () {
              return this.stringPatternHandler("e");
            }), (function () {
              return this.stringPatternHandler("E");
            }));
            return this._repeat1(this.digit);
          }));
        }));
        this._not(this.idChar);
        return parseFloat(text);
      }).call(this);
    }));
  }),
  hexNumber: (function () {
    return this.memoize("+EWGzT3SpjNwTMB7KQIVDQ", (function () {
      var text;
      return (function () {
        this._optional(this.ws);
        this._choice((function () {
          return this.stringPatternHandler("0x");
        }), (function () {
          return this.stringPatternHandler("0X");
        }));
        text = this.matchedInput((function () {
          return this._repeat1(this.hexDigit);
        }));
        this._not(this.idChar);
        return parseFloat(text);
      }).call(this);
    }));
  }),
  string: (function () {
    return this.memoize("kAnCOsUlsMY+xmSEBfVnuQ", (function () {
      var cs;
      return (function () {
        this._optional(this.ws);
        this._choice((function () {
          this.stringPatternHandler("'");
          cs = this._repeat((function () {
            this._not((function () {
              return this.stringPatternHandler("'");
            }));
            return this.stringChar();
          }));
          return this.stringPatternHandler("'");
        }), (function () {
          this.stringPatternHandler("\"");
          cs = this._repeat((function () {
            this._not((function () {
              return this.stringPatternHandler("\"");
            }));
            return this.stringChar();
          }));
          return this.stringPatternHandler("\"");
        }));
        return cs.join("");
      }).call(this);
    }));
  }),
  stringChar: (function (delimiter) {
    return this._choice((function () {
      this.stringPatternHandler("\\");
      return this.stringEscapeSequence();
    }), (function () {
      this._not(this.newline);
      return this.char();
    }));
  }),
  stringEscapeSequence: (function () {
    return this.memoize("TOGzrjX2Fi1G1FuBwpFi3A", (function () {
      var hs;
      return this._choice((function () {
        this.stringPatternHandler("'");
        return "'";
      }), (function () {
        this.stringPatternHandler("\"");
        return "\"";
      }), (function () {
        this.stringPatternHandler("\\");
        return "\\";
      }), (function () {
        this.stringPatternHandler("0");
        return "\u0000";
      }), (function () {
        this.stringPatternHandler("a");
        return "\u0007";
      }), (function () {
        this.stringPatternHandler("b");
        return "\b";
      }), (function () {
        this.stringPatternHandler("t");
        return "\t";
      }), (function () {
        this.stringPatternHandler("n");
        return "\u0000";
      }), (function () {
        this.stringPatternHandler("v");
        return "\u0000";
      }), (function () {
        this.stringPatternHandler("f");
        return "\u0000";
      }), (function () {
        this.stringPatternHandler("r");
        return "\u0000";
      }), (function () {
        this.stringPatternHandler("e");
        return "\u0000";
      }), (function () {
        this.stringPatternHandler("x");
        hs = this.repeat(this.hexDigit, 2);
        return String.fromCodepoint(hs.join(""));
      }), (function () {
        this.stringPatternHandler("u");
        hs = this.repeat(this.hexDigit, 4);
        return String.fromCodepoint(hs.join(""));
      }), (function () {
        this.stringPatternHandler("u");
        this.stringPatternHandler("(");
        hs = this._repeat(this.hexDigit);
        this.stringPatternHandler(")");
        return String.fromCodepoint(hs.join(""));
      }), (function () {
        return this.error("Unsupported escape sequence");
      }));
    }));
  }),
  id: (function (expectedName) {
    var name;
    return (function () {
      name = this.identifier();
      this._predicate((function () {
        return name === expectedName;
      }));
      return name;
    }).call(this);
  }),
  identifier: (function () {
    return this.memoize("p6XjxpS8CKsWOChhs0C0QQ", (function () {
      return (function () {
        this._optional(this.ws);
        return this.matchedInput((function () {
          this.initialIdChar();
          return this._repeat(this.idChar);
        }));
      }).call(this);
    }));
  }),
  op: (function (expectedOpname) {
    var opname;
    return (function () {
      opname = this.operator();
      this._predicate((function () {
        return opname === expectedOpname;
      }));
      return opname;
    }).call(this);
  }),
  operator: (function () {
    return this.memoize("2ZAFgBw24ezau6m6JMjJ2Q", (function () {
      var text;
      return (function () {
        this._optional(this.ws);
        text = this._choice((function () {
          return this.stringPatternHandler("<<");
        }), (function () {
          return this.stringPatternHandler(">>>");
        }), (function () {
          return this.stringPatternHandler(">>");
        }), (function () {
          return this.stringPatternHandler("<>");
        }), (function () {
          return this.stringPatternHandler("<=");
        }), (function () {
          return this.stringPatternHandler(">=");
        }), (function () {
          return this.stringPatternHandler("<");
        }), (function () {
          return this.stringPatternHandler(">");
        }), (function () {
          return this.stringPatternHandler("!=");
        }), (function () {
          return this.stringPatternHandler("==");
        }), (function () {
          return this.stringPatternHandler("!");
        }), (function () {
          return this.stringPatternHandler("=");
        }), (function () {
          return this.stringPatternHandler("||");
        }), (function () {
          return this.stringPatternHandler("|");
        }), (function () {
          return this.stringPatternHandler("^^");
        }), (function () {
          return this.stringPatternHandler("^");
        }), (function () {
          return this.stringPatternHandler("&&");
        }), (function () {
          return this.stringPatternHandler("&");
        }), (function () {
          return this.stringPatternHandler("+");
        }), (function () {
          return this.stringPatternHandler("-");
        }), (function () {
          return this.stringPatternHandler("**");
        }), (function () {
          return this.stringPatternHandler("*");
        }), (function () {
          return this.stringPatternHandler("//");
        }), (function () {
          return this.stringPatternHandler("/");
        }), (function () {
          return this.stringPatternHandler("%");
        }), (function () {
          return this.stringPatternHandler("~");
        }), (function () {
          return this.stringPatternHandler("->");
        }), (function () {
          return this.stringPatternHandler("=>");
        }), (function () {
          return this.stringPatternHandler("<-");
        }), (function () {
          return this.stringPatternHandler("..");
        }), (function () {
          return this.stringPatternHandler(".");
        }));
        return text;
      }).call(this);
    }));
  }),
  comment: (function () {
    return this.memoize("xmo6vDr+2RsggalNO0O7ow", (function () {
      return this._choice(this.delimitedComment, this.lineComment);
    }));
  }),
  delimitedComment: (function () {
    return this.memoize("OboBtK7KgHtgIilW347Thw", (function () {
      return (function () {
        this.stringPatternHandler("{-");
        this._lookahead((function () {
          return this._choice(this.space, this.newline, this.eof, (function () {
            return this.stringPatternHandler("-}");
          }));
        }));
        this._repeat((function () {
          this._not((function () {
            return this.stringPatternHandler("-}");
          }));
          return this._choice(this.delimitedComment, this.char);
        }));
        return this._choice((function () {
          return this.stringPatternHandler("-}");
        }), this.eof);
      }).call(this);
    }));
  }),
  lineComment: (function () {
    return this.memoize("0P9n61e2BN1IReCY+RBJSA", (function () {
      return (function () {
        this.stringPatternHandler("--");
        this._repeat((function () {
          this._not(this.newline);
          return this.char();
        }));
        return this._lookahead((function () {
          return this._choice(this.newline, this.eof);
        }));
      }).call(this);
    }));
  }),
  newline: (function () {
    return this.memoize("j8Ks4U+HTjjVwtAYcD8fBQ", (function () {
      return this._choice((function () {
        return this.stringPatternHandler("\r\n");
      }), (function () {
        return this.stringPatternHandler("\n");
      }), (function () {
        return this.stringPatternHandler("\r");
      }));
    }));
  }),
  digit: (function () {
    return this.memoize("RSSnccc83KMng3fIWUieQQ", (function () {
      return this.char(Range.inclusive("0", "9"));
    }));
  }),
  hexDigit: (function () {
    return this.memoize("IpbhFgKQbC9Z7aTLZhaecg", (function () {
      return this.char(Range.inclusive("0", "9"), Range.inclusive("a", "f"), Range.inclusive("A", "F"));
    }));
  }),
  idChar: (function () {
    return this.memoize("NfuHjvoUJLK3hHlcPFYGmw", (function () {
      return this.char(Range.inclusive("a", "z"), Range.inclusive("A", "Z"), "_", "$", Range.inclusive("0", "9"));
    }));
  }),
  initialIdChar: (function () {
    return this.memoize("iZ9FFjLrhbfH3ZTCIovFaQ", (function () {
      return this.char(Range.inclusive("a", "z"), Range.inclusive("A", "Z"), "_", "$");
    }));
  }),
  space: (function () {
    return this.memoize("JBnyES5LMqM5tTEZHAuQnw", (function () {
      return this.stringPatternHandler(" ");
    }));
  }),
  spaces: (function () {
    return this.memoize("o9zG3JpYp0lf7l6t0lDUqQ", (function () {
      return this._repeat1(this.space);
    }));
  }),
  next: (function () {
    var c = TextParser.prototype.next.call(this);
    this.furthestPosition = Math.max(this.furthestPosition, this.state.position);
    return c;
  }),
  nextIf: (function (predicate) {
    var c = TextParser.prototype.next.call(this);
    if (predicate.call(this, c)) {
      this.furthestPosition = Math.max(this.furthestPosition, this.state.position);
      return c;
    }
    else {
      return this.fail();
    }
  }),
  emptyState: (function () {
    return {
      position: 0,
      blocks: [
        {
          ignoreIndentation: false,
          columnCount: 0
        }
      ]
    };
  }),
  copyState: (function () {
    return {
      position: this.state.position,
      blocks: this.state.blocks.copy()
    };
  }),
  stringPatternHandler: (function (string) {
    return this.eachChar(string);
  }),
  tokenOperatorHandler: (function (parser) {
    return (function () {
      this._optional(this.ws);
      return parser.call(this);
    }).call(this);
  }),
  debuglog: (function (name, index) {
    var lc = this.source.lineColumnAt(this.state.position);
    var output = (((((((("Debug point " + this.filename) + ":") + lc[0]) + ":") + lc[1]) + " ") + name) + ":") + index;
    console.log(output);
  }),
  statementTerminator: (function () {
    return this.memoize("kuE6TAX0IZgQD6tpA0dFJQ", (function () {
      return this._choice(this.newlineStatementTerminator, this.semicolonStatementTerminator);
    }));
  }),
  semicolonStatementTerminator: (function (__forceNoMemoization__) {
    return (function () {
      this._repeat((function () {
        return this._choice(this.spaces, this.comment);
      }));
      this.stringPatternHandler(";");
      return this._not((function () {
        this._repeat((function () {
          return this._choice(this.spaces, this.comment);
        }));
        return this.newline();
      }));
    }).call(this);
  }),
  newlineStatementTerminator: (function (__forceNoMemoization__) {
    return (function () {
      this._repeat((function () {
        return this._choice(this.spaces, this.comment);
      }));
      this._optional((function () {
        return this.stringPatternHandler(";");
      }));
      this._repeat((function () {
        return this._choice(this.spaces, this.comment);
      }));
      this.newline();
      this._repeat(this.blankline);
      return this._lookahead((function () {
        return this._choice(this.currentIndentation, this.decreasedIndentation, this.eof);
      }));
    }).call(this);
  }),
  blockHeaderTerminator: (function (__forceNoMemoization__) {
    return this._choice(this.semicolonStatementTerminator, this.blockHeaderNewlineTerminator);
  }),
  blockHeaderNewlineTerminator: (function (__forceNoMemoization__) {
    return (function () {
      this._repeat((function () {
        return this._choice(this.spaces, this.comment);
      }));
      this._optional((function () {
        return this.stringPatternHandler(";");
      }));
      this._repeat((function () {
        return this._choice(this.spaces, this.comment);
      }));
      this.newline();
      return this._repeat(this.blankline);
    }).call(this);
  }),
  withIncreasedIndentation: (function (parser, __forceNoMemoization__) {
    var count, result;
    return (function () {
      this._lookahead((function () {
        return count = this.increasedIndentation();
      }));
      this.state.blocks.push({
        singleLine: false,
        ignoreLayout: false,
        columnCount: count
      });
      result = parser.call(this);
      this._lookahead(this.decreasedIndentation);
      this.state.blocks.pop();
      this._lookahead(this.currentIndentation);
      return result;
    }).call(this);
  }),
  ignoringIndentation: (function (parser, __forceNoMemoization__) {
    var result;
    return (function () {
      this.state.blocks.push({
        singleLine: this.state.blocks.last.singleLine,
        ignoreLayout: true,
        columnCount: this.state.blocks.last.columnCount
      });
      result = parser.call(this);
      this.state.blocks.pop();
      return result;
    }).call(this);
  }),
  blockHeader: (function (parser, __forceNoMemoization__) {
    var result;
    return (function () {
      this.state.blocks.push({
        singleLine: true,
        ignoreLayout: this.state.blocks.last.ignoreLayout,
        columnCount: this.state.blocks.last.columnCount
      });
      result = parser.call(this);
      this.state.blocks.pop();
      this.blockHeaderTerminator();
      return result;
    }).call(this);
  }),
  ws: (function (__forceNoMemoization__) {
    return this._repeat((function () {
      return this._choice(this.spaces, this.comment, this.continuationLine, this.ignoredNewline);
    }));
  }),
  ignoredNewline: (function (__forceNoMemoization__) {
    return (function () {
      this._predicate((function () {
        return this.state.blocks.last.ignoreLayout;
      }));
      return this.newline();
    }).call(this);
  }),
  continuationLine: (function (__forceNoMemoization__) {
    return (function () {
      this._predicate((function () {
        return !this.state.blocks.last.singleLine;
      }));
      this._repeat((function () {
        return this._choice(this.spaces, this.comment);
      }));
      this.newline();
      this._repeat(this.blankline);
      return this._lookahead(this.increasedIndentation);
    }).call(this);
  }),
  ignoredLayout: (function (__forceNoMemoization__) {
    return (function () {
      this._predicate((function () {
        return this.state.blocks.last.ignoreLayout;
      }));
      return this.newline();
    }).call(this);
  }),
  currentIndentation: (function (__forceNoMemoization__) {
    var b, count;
    return (function () {
      b = this.state.blocks.last;
      count = this.indentation();
      return this._predicate((function () {
        return b.ignoreLayout || (count === b.columnCount);
      }));
    }).call(this);
  }),
  increasedIndentation: (function (__forceNoMemoization__) {
    var b, count;
    return (function () {
      b = this.state.blocks.last;
      count = this.indentation();
      this._predicate((function () {
        return b.ignoreLayout || (count > b.columnCount);
      }));
      return count;
    }).call(this);
  }),
  decreasedIndentation: (function (__forceNoMemoization__) {
    var b, count;
    return (function () {
      b = this.state.blocks.last;
      count = this.indentation();
      this._predicate((function () {
        return count < b.columnCount;
      }));
      return count;
    }).call(this);
  }),
  indentation: (function () {
    return this.memoize("L/e+YXzzwSdCHXTuHFNBtA", (function () {
      var count, s;
      return (function () {
        count = 0;
        this._repeat((function () {
          return this._choice((function () {
            s = this.spaces();
            return count = count + s.length;
          }), this.comment);
        }));
        return count;
      }).call(this);
    }));
  }),
  blankline: (function () {
    return this.memoize("U2m/eLTznzKN9uLwdf6p3Q", (function () {
      return (function () {
        this._repeat((function () {
          return this._choice(this.spaces, this.comment);
        }));
        return this.newline();
      }).call(this);
    }));
  }),
  eof: (function () {
    return this.memoize("eGqFqKZUqN9IESVcY0+zKQ", (function () {
      return (function () {
        this._repeat((function () {
          return this._choice(this.spaces, this.comment, this.newline);
        }));
        return TextParser.prototype.eof.call(this);
      }).call(this);
    }));
  })
});
