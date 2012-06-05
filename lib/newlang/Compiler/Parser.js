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
    TextParser.prototype.initialize.call(this, source);
  }),
  file: (function () {
    return this.memoize("GnVj/BDDa1ZMLLSxwYsMTg", (function () {
      var stmts;
      return (function () {
        stmts = this.delimited(this.statement, this.statementTerminator);
        this._optional(this.ws);
        this.eof();
        return Ast.File(Ast.Block(stmts));
      }).call(this);
    }));
  }),
  statement: (function () {
    return this.memoize("Qj32Z+h0MU+qOrb9n+4qxw", (function () {
      return this._choice(this.ifStatement, this.expression);
    }));
  }),
  expression: (function () {
    return this.memoize("Usya5JrbWqfz4swiNsc1uA", (function () {
      return this._choice(this.ifExpression, this.varExpression, this.returnExpression, this.throwExpression, this.operatorExpression);
    }));
  }),
  ifStatement: (function () {
    return this.memoize("r8vVK0QYw3mU4OwB6G+4Iw", (function () {
      var c, b, ast, tail;
      return (function () {
        this.id("if");
        c = this.expression();
        this.statementTerminator();
        b = this.blockBody();
        ast = Ast.If(c, b, null);
        tail = ast;
        this._repeat((function () {
          this.id("else");
          this.id("if");
          c = this.expression();
          this.statementTerminator();
          b = this.blockBody();
          tail.alternative = Ast.If(c, b, null);
          return tail = tail.alternative;
        }));
        this._optional((function () {
          this.id("else");
          this.statementTerminator();
          b = this.blockBody();
          return tail.alternative = b;
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
  blockBody: (function () {
    return this.memoize("pWCjgv4tAmLNECHfhCoJqg", (function () {
      var stmts;
      return this._choice((function () {
        this.indent();
        stmts = this.delimited(this.statement, this.statementTerminator);
        this.dedent();
        return Ast.Block(stmts);
      }), (function () {
        return Ast.Noop();
      }));
    }));
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
    return this.memoize("BHIedx50+SPWKsr12Hs5lw", (function () {
      var expr, opname, rhs;
      return (function () {
        expr = this.association();
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
    return this.memoize("e34FsiL1N26RK7/KK3eAHw", (function () {
      return this.leftAssocOperator((function () {
        this.bitwiseXor();
        return this.op("|");
      }));
    }));
  }),
  bitwiseXor: (function () {
    return this.memoize("AdBSthCDSNvROo8fnySMKw", (function () {
      return this.leftAssocOperator((function () {
        this.bitwiseAnd();
        return this.op("^");
      }));
    }));
  }),
  bitwiseAnd: (function () {
    return this.memoize("bdJVWqFJn4NWjobyosK9ng", (function () {
      return this.leftAssocOperator((function () {
        this.shiftOperator();
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
    return this.memoize("vECk4fsWqKMSC1GGpzyafg", (function () {
      var t, args;
      return (function () {
        this.stringPatternHandler("(");
        this._optional((function () {
          t = this.expression();
          return this.stringPatternHandler(";");
        }));
        args = this.delimited((function () {
          return this.expansion(this.expression);
        }), (function () {
          return this.stringPatternHandler(",");
        }));
        this._optional((function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(")");
        return {
          this: t,
          arguments: args
        };
      }).call(this);
    }));
  }),
  subscript: (function () {
    return this.memoize("AVrJBuEcQmz8i7CdeMCIqQ", (function () {
      var args;
      return (function () {
        this.stringPatternHandler("[");
        args = this.delimited((function () {
          return this.expansion(this.expression);
        }), (function () {
          return this.stringPatternHandler(",");
        }));
        this._optional((function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("]");
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
    return this.memoize("Fj3jr/0lvoDFgF5572sPOQ", (function () {
      var proto, pdecls;
      return (function () {
        this.stringPatternHandler("{");
        this._optional((function () {
          proto = this.expression();
          return this.stringPatternHandler(";");
        }));
        pdecls = this.delimited(this.propertyDeclaration, (function () {
          return this.stringPatternHandler(",");
        }));
        this._optional((function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler("}");
        return Ast.Object(proto, pdecls);
      }).call(this);
    }));
  }),
  functionLiteral: (function () {
    return this.memoize("JAt050LihWj3FbmMtlbYGA", (function () {
      var pd, body;
      return this._choice((function () {
        pd = this.optParameterList();
        this.op("->");
        body = this.expression();
        return Ast.Function(pd.this, pd.parameters, body);
      }), (function () {
        this.id("fn");
        pd = this.optParameterList();
        body = this.functionBody();
        return Ast.Function(pd.this, pd.parameters, body);
      }));
    }));
  }),
  functionBody: (function () {
    return this.memoize("eM3qz0iVmOH4s496nj4AAw", (function () {
      var body;
      return this._choice((function () {
        this.op("->");
        body = this.expression();
        return body;
      }), (function () {
        this.statementTerminator();
        body = this.blockBody();
        this.id("end");
        return body;
      }));
    }));
  }),
  subexpression: (function () {
    return this.memoize("+0/Z2Hr/M8dyTDKhLYH0aQ", (function () {
      var expr;
      return (function () {
        this.stringPatternHandler("(");
        expr = this.expression();
        this.stringPatternHandler(")");
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
    return this.memoize("6hsmq8JQ+PTaTYFyVe/9AQ", (function () {
      var t, params;
      return (function () {
        this.stringPatternHandler("(");
        this._optional((function () {
          t = this.parameter();
          return this.stringPatternHandler(";");
        }));
        params = this.delimited(this.contractionParameter, (function () {
          return this.stringPatternHandler(",");
        }));
        this._optional((function () {
          return this.stringPatternHandler(",");
        }));
        this.stringPatternHandler(")");
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
    return this.memoize("r4kpQKbXyaM//ZYo859jOw", (function () {
      var name, pd, body;
      return (function () {
        this.id("get");
        name = this.propertyName();
        pd = this.optParameterList();
        body = this.functionBody();
        return Ast.GetPropertyDeclaration(name, pd.this, pd.parameters, body);
      }).call(this);
    }));
  }),
  setPropertyDeclaration: (function () {
    return this.memoize("fV8kpHnW9XOWaChrHTZ5Zg", (function () {
      var name, pd, body;
      return (function () {
        this.id("set");
        name = this.propertyName();
        pd = this.optParameterList();
        body = this.functionBody();
        return Ast.SetPropertyDeclaration(name, pd.this, pd.parameters, body);
      }).call(this);
    }));
  }),
  methodPropertyDeclaration: (function () {
    return this.memoize("87qYK4gfAr5KDO5wIA392g", (function () {
      var name, pd, body;
      return (function () {
        this.id("method");
        name = this.propertyName();
        pd = this.optParameterList();
        body = this.functionBody();
        return Ast.MethodPropertyDeclaration(name, pd.this, pd.parameters, body);
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
  ws: (function () {
    return this.memoize("YV7ySiRkkom6mwEc7Bj6dg", (function () {
      return this._repeat1((function () {
        this._repeat1((function () {
          return this._choice(this.spaces, this.comment);
        }));
        return this.continuationLine();
      }));
    }));
  }),
  statementTerminator: (function () {
    return this.memoize("HYO61diM70fMpvDc7cOrdg", (function () {
      return this._choice((function () {
        this._optional(this.ws);
        this._repeat(this.blankline);
        this.newline();
        return this._lookahead((function () {
          this.currentIndentation();
          return this._not(this.ws);
        }));
      }), (function () {
        this._optional(this.ws);
        return this.stringPatternHandler(";");
      }));
    }));
  }),
  blankline: (function () {
    return this.memoize("9SPAPbpVXlQIEL/B6hTelg", (function () {
      return (function () {
        this.newline();
        this._repeat1((function () {
          return this._choice(this.spaces, this.comment);
        }));
        return this._lookahead(this.newline);
      }).call(this);
    }));
  }),
  continuationLine: (function () {
    return this.memoize("W/iIMI5/y40wKA+6uT5L9w", (function () {
      return this._choice((function () {
        this.stringPatternHandler("\\");
        this.newline();
        return this._repeat1((function () {
          return this._choice(this.spaces, this.comment);
        }));
      }), (function () {
        this.newline();
        this.currentIndentation();
        return this._repeat1((function () {
          return this._choice(this.spaces, this.comment);
        }));
      }));
    }));
  }),
  currentIndentation: (function () {
    for (var i = 0 ;i < this.state.indentationLevelStack.last ;i++) {
      this.space();
    }
  }),
  indent: (function () {
    return this.memoize("WCTjCveBXLXZTzkZ8iMa5Q", (function () {
      var ss;
      return (function () {
        this.currentIndentation();
        ss = this.spaces();
        return this.state.indentationLevelStack.push(this.state.indentationLevelStack.last + ss.length);
      }).call(this);
    }));
  }),
  dedent: (function () {
    return this.memoize("dhsOnTyB2RoCRFKw0fluzQ", (function () {
      return (function () {
        this._not(this.currentIndentation);
        this.state.indentationLevelStack.pop();
        return this.currentIndentation();
      }).call(this);
    }));
  }),
  dedentMany: (function () {
    return this.memoize("NdkgBDoVhYF5kRvyUO5x1g", (function () {
      return (function () {
        this._repeat1((function () {
          this._not(this.currentIndentation);
          return this.state.indentationLevelStack.pop();
        }));
        return this.currentIndentation();
      }).call(this);
    }));
  }),
  comment: (function () {
    return this.memoize("xmo6vDr+2RsggalNO0O7ow", (function () {
      return this._choice(this.delimitedComment, this.lineComment);
    }));
  }),
  delimitedComment: (function () {
    return this.memoize("OrPg7CSBuZXCBthOwqLgvQ", (function () {
      return (function () {
        this.stringPatternHandler("{-");
        this._lookahead((function () {
          return this._choice(this.space, this.newline, (function () {
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
    return this.memoize("z0F22wjAn3LJEzQQt+LGuw", (function () {
      return (function () {
        this.stringPatternHandler("--");
        this._repeat((function () {
          this._not(this.newline);
          return this.char();
        }));
        return this.newline();
      }).call(this);
    }));
  }),
  newline: (function () {
    return this.memoize("hJqIz6L+ibh6wQZXS4wqpA", (function () {
      return this._choice((function () {
        return this.stringPatternHandler("\r\n");
      }), (function () {
        return this.stringPatternHandler("\n");
      }), (function () {
        return this.stringPatternHandler("\r");
      }), this.eof);
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
    this.furthestPosition = Math.max(this.futhestPosition, this.state.position);
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
      indentationLevelStack: [
        0
      ]
    };
  }),
  copyState: (function () {
    return {
      position: this.state.position,
      indentationLevelStack: this.state.indentationLevelStack.copy()
    };
  }),
  stringPatternHandler: (function (string) {
    return (function () {
      this._optional(this.ws);
      return this.eachChar(string);
    }).call(this);
  }),
  tokenOperatorHandler: (function (parser) {
    return (function () {
      this._optional(this.ws);
      return parser.call(this);
    }).call(this);
  })
});
