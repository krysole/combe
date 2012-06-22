// Generated code
"use strict";
var combe = require("combe");
var BaseParser = combe.BaseParser;
var Lexer = require("./Lexer");
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
    return this.memoize("TpAlVP8ICN3bho+axCmytQ", (function () {
      return this._choice(this.ifStatement, this.tryCatchStatement, this.defStatement, this.functionStatement, this.expression);
    }));
  }),
  expression: (function () {
    return this.memoize("OKWMEV22af+YUN3VZhtW/A", (function () {
      return this._choice(this.ifExpression, this.tryCatchExpression, this.varExpression, this.returnExpression, this.throwExpression, this.operatorExpression);
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
  functionStatement: (function () {
    return this.memoize("+lanLh6o6Y2Q77VUovCqsw", (function () {
      var b, name, lval;
      return this._choice((function () {
        b = this.functionBlock((function () {
          this.id("def");
          return name = this.propertyName();
        }));
        return Ast.Function(name, b.parameters, b.body);
      }), (function () {
        b = this.functionBlock((function () {
          this.id("method");
          return name = this.propertyName();
        }));
        return Ast.Method(null, name, b.parameters, b.body);
      }), (function () {
        b = this.functionBlock((function () {
          this.id("method");
          return lval = this.methodDefLvalue();
        }));
        return Ast.Method(lval.object, lval.name, b.parameters, b.body);
      }));
    }));
  }),
  methodDefLvalue: (function (o) {
    var name;
    return this._choice((function () {
      this.op(".");
      name = this.propertyName();
      this._lookahead((function () {
        this.optParameterList();
        return this.op("->");
      }));
      return {
        object: o,
        name: name
      };
    }), (function () {
      this.op(".");
      name = this.propertyName();
      this._lookahead((function () {
        this.optParameterList();
        this._predicate((function () {
          return !this.state.allowContinuationLines && !this.state.ignoreNewlines;
        }));
        return this.newline();
      }));
      return {
        object: o,
        name: name
      };
    }), (function () {
      this._predicate((function () {
        return object != null;
      }));
      o = this.secondaryExpressionFragment(o);
      return this.methodDefLvalue(o);
    }), (function () {
      o = this.primaryExpression();
      return this.methodDefLvalue(o);
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
  functionBlock: (function (header) {
    var p, body;
    return this._choice((function () {
      header.call(this);
      p = this.optParameterList();
      this.op("->");
      body = this.expression();
      return Ast.Function(null, p, body);
    }), (function () {
      body = this.block((function () {
        header.call(this);
        return p = this.optParameterList();
      }));
      this.id("end");
      return Ast.Function(null, p, body);
    }));
  }),
  operatorExpression: (function () {
    return this.memoize("aRXnmywofOAtO7rKEFNqJg", (function () {
      return this.assignmentExpression();
    }));
  }),
  assignmentExpression: (function () {
    return this.memoize("/fU0hVAlVYuWNZPANckDVA", (function () {
      var lvalue, rvalue;
      return this._choice((function () {
        lvalue = this.lvalueExpression();
        this.op("=");
        rvalue = this.assignmentExpression();
        return (function () {
          if (lvalue.is("VariableLookup")) {
            return Ast.VariableAssignment(lvalue.name, rvalue);
          }
          else if (lvalue.is("MethodCall")) {
            lvalue.arguments.rvalue = rvalue;
            return lvalue;
          }
          else if (lvalue.is("Subscript")) {
            lvalue.arguments.rvalue = rvalue;
            return lvalue;
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
    return this.memoize("imywW3wy1jAU312QVNvUvQ", (function () {
      var expr;
      return (function () {
        expr = this.primaryExpression();
        this._repeat1((function () {
          return expr = this.secondaryExpressionFragment(expr);
        }));
        return expr;
      }).call(this);
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
    var name, a;
    return this._choice((function () {
      this.op(".");
      name = this.propertyName();
      a = this.optArgumentsList();
      return Ast.MethodCall(expr, name, a);
    }), (function () {
      a = this.argumentsList();
      return Ast.Call(expr, a);
    }), (function () {
      a = this.subscriptArguments();
      return Ast.Subscript(expr, a);
    }));
  }),
  optArgumentsList: (function () {
    return this.memoize("MgOM9a+ykgN6uFmPyljjJg", (function () {
      return this._choice(this.argumentsList, (function () {
        return Ast.Arguments(null, [
          /* elision */
        ], null, null);
      }));
    }));
  }),
  argumentsList: (function () {
    return this.memoize("LdfC2XlT+S1+Ep1BJJZ/5w", (function () {
      var ta, expr, main, b;
      return (function () {
        this.stringPatternHandler("(");
        this.ignoringNewlines((function () {
          ta = this._optional((function () {
            expr = this.expression();
            this.stringPatternHandler(";");
            return expr;
          }));
          main = this.delimited(this.mainArgument, (function () {
            return this.stringPatternHandler(",");
          }));
          this._optional((function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler(")");
        }));
        b = this._optional((function () {
          return this.functionBlock((function () {
            return this.id("do");
          }));
        }));
        return Ast.Arguments(ta, main, b, null);
      }).call(this);
    }));
  }),
  subscriptArguments: (function () {
    return this.memoize("5+H+Lw8ED61uuIEkM/dToA", (function () {
      var main;
      return (function () {
        this.stringPatternHandler("[");
        this.ignoringNewlines((function () {
          main = this.delimited(this.mainArgument, (function () {
            return this.stringPatternHandler(",");
          }));
          this._optional((function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler("]");
        }));
        return Ast.Arguments(null, main, null, null);
      }).call(this);
    }));
  }),
  mainArgument: (function () {
    return this.memoize("8FplblsrripSAghqxRHmgw", (function () {
      return this._choice(this.expansionArgument, this.blockArgument, this.expression);
    }));
  }),
  blockArgument: (function () {
    return this.memoize("EIYhVUYsQeZs4eAYhd3ieg", (function () {
      var expr;
      return (function () {
        this.op("&");
        expr = this.expression();
        return Ast.BlockArgument(expr);
      }).call(this);
    }));
  }),
  expansionArgument: (function () {
    return this.memoize("e5hFvhwgKCYRxn5i7HJaTQ", (function () {
      var expr;
      return (function () {
        this.op("..");
        expr = this.expression();
        return Ast.ExpansionArgument(expr);
      }).call(this);
    }));
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
  functionLiteral: (function () {
    return this.memoize("bwMs1mazki3PgQsWh4hGpA", (function () {
      var p, body, fb;
      return this._choice((function () {
        p = this.optParameterList();
        this.op("->");
        body = this.expression();
        return Ast.Function(null, p, body);
      }), (function () {
        fb = this.functionBlock((function () {
          return this.id("def");
        }));
        return Ast.Function(null, fb.parameters, fb.body);
      }), (function () {
        fb = this.functionBlock((function () {
          return this.id("method");
        }));
        return Ast.Method(null, null, fb.parameters, fb.body);
      }));
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
    return this.memoize("6hsslqj+7sV6Bf3T2j362w", (function () {
      return this._choice(this.parameterList, (function () {
        return Ast.Parameters(null, [
          /* elision */
        ], null, null);
      }));
    }));
  }),
  parameterList: (function () {
    return this.memoize("nKVEla3RQ/LKZmoVQiIHkA", (function () {
      var tp, p, main, rp;
      return (function () {
        this.stringPatternHandler("(");
        this.ignoringNewlines((function () {
          tp = this._optional((function () {
            p = this.parameter();
            this.stringPatternHandler(";");
            return p;
          }));
          main = this.delimited(this.mainParameter, (function () {
            return this.stringPatternHandler(",");
          }));
          this._optional((function () {
            return this.stringPatternHandler(",");
          }));
          return this.stringPatternHandler(")");
        }));
        rp = this._optional((function () {
          this.op("=");
          return this.parameter();
        }));
        return Ast.Parameters(tp, main, bp, rp);
      }).call(this);
    }));
  }),
  mainParameter: (function () {
    return this.memoize("myd4XLusov9CkAd0kNZt3A", (function () {
      return this._choice(this.contractionParameter, this.blockParameter, this.parameter);
    }));
  }),
  contractionParameter: (function () {
    return this.memoize("PE1uhzML6Q8lfjLTE4t9og", (function () {
      var name;
      return (function () {
        this.op("..");
        name = this.variableIdentifier();
        return Ast.ContractionParameter(name);
      }).call(this);
    }));
  }),
  blockParameter: (function () {
    return this.memoize("ogLeTAVc5pexaPsTbY+b/g", (function () {
      var name;
      return (function () {
        this.op("&");
        name = this.variableIdentifier();
        return Ast.BlockParameter(name);
      }).call(this);
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
    if (!this.state.allowContinuationLines && !this.state.ignoreNewlines) {
      this.fail();
    }
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
    console.log((((("Parser::log() " + this.positionString()) + ":") + name) + " - ") + messages.join("; "));
  })
});
