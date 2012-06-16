// Generated code
"use strict";
var TextParser = require("./TextParser");
var NewCombeLexer = module.exports = Class.new(TextParser, {
}, {
  initialize: (function (source, filename) {
    TextParser.prototype.initialize.call(this, source);
    this.filename = filename;
  }),
  AmbiguousTokenFailure: Object.unique("AmbiguousTokenFailure"),
  nextToken: (function () {
    return this.memoize("RNe0vuENzTAbMHBaB9KL8A", (function () {
      var nl;
      return (function () {
        nl = this._optional(this.ws);
        this.initialTokenPosition = this.position;
        return this._choice(this.identifier, this.number, this.operatorAssignment, (function () {
          return this.punctuation(nl);
        }), this.string, (function () {
          this._lookahead((function () {
            return this.stringPatternHandler("/");
          }));
          return (function () {
            throw AmbiguousTokenFailure;
          }).call(this);
        }), (function () {
          this.eof();
          return this.createToken("eof");
        }), (function () {
          throw Error.new("Lexer failed at position " + this.source.lineColumnAt(this.position).join(":"));
        }));
      }).call(this);
    }));
  }),
  identifier: (function () {
    return this.memoize("pbXMZaObjzD0qAjUU9TgoQ", (function () {
      var text, token, nl;
      return (function () {
        this.initialIdChar();
        text = this._repeat(this.idChar);
        token = this.createToken("identifier");
        this._predicate((function () {
          return this.ReservedWords.include(token.text);
        }));
        token.reserved = true;
        this._predicate((function () {
          return [
            "return",
            "break",
            "continue",
            "throw"
          ];
        }));
        this._lookahead((function () {
          return nl = this.ws();
        }));
        this._predicate((function () {
          return nl;
        }));
        token.precedesNewline = true;
        return token;
      }).call(this);
    }));
  }),
  ReservedWords: String.ReservedWords.concat([
    "rule"
  ]),
  operatorAssignment: (function () {
    return this.memoize("EhKhxcCIlnHXqHCC0hyH2A", (function () {
      var text;
      return (function () {
        text = this._choice((function () {
          return this.stringPatternHandler("+=");
        }), (function () {
          return this.stringPatternHandler("-=");
        }), (function () {
          return this.stringPatternHandler("*=");
        }), (function () {
          return this.stringPatternHandler("%=");
        }), (function () {
          return this.stringPatternHandler("&=");
        }), (function () {
          return this.stringPatternHandler("|=");
        }), (function () {
          return this.stringPatternHandler("^=");
        }), (function () {
          return this.stringPatternHandler("<<=");
        }), (function () {
          return this.stringPatternHandler(">>>=");
        }), (function () {
          return this.stringPatternHandler(">>=");
        }));
        return this.createToken("operatorAssignment");
      }).call(this);
    }));
  }),
  punctuation: (function (nl) {
    var text, t;
    return (function () {
      text = this._choice((function () {
        return this.stringPatternHandler("{");
      }), (function () {
        return this.stringPatternHandler("}");
      }), (function () {
        return this.stringPatternHandler("(");
      }), (function () {
        return this.stringPatternHandler(")");
      }), (function () {
        return this.stringPatternHandler("[");
      }), (function () {
        return this.stringPatternHandler("]");
      }), (function () {
        return this.stringPatternHandler(";");
      }), (function () {
        return this.stringPatternHandler(",");
      }), (function () {
        return this.stringPatternHandler("<<");
      }), (function () {
        return this.stringPatternHandler(">>>");
      }), (function () {
        return this.stringPatternHandler(">>");
      }), (function () {
        return this.stringPatternHandler("<=");
      }), (function () {
        return this.stringPatternHandler(">=");
      }), (function () {
        return this.stringPatternHandler("<");
      }), (function () {
        return this.stringPatternHandler(">");
      }), (function () {
        return this.stringPatternHandler("===");
      }), (function () {
        return this.stringPatternHandler("!==");
      }), (function () {
        return this.stringPatternHandler("==");
      }), (function () {
        return this.stringPatternHandler("!=");
      }), (function () {
        return this.stringPatternHandler("!");
      }), (function () {
        return this.stringPatternHandler("=");
      }), (function () {
        return this.stringPatternHandler("...");
      }), (function () {
        return this.stringPatternHandler("..");
      }), (function () {
        this.stringPatternHandler(".");
        this._not(this.digit);
        return ".";
      }), (function () {
        return this.stringPatternHandler("->");
      }), (function () {
        return this.stringPatternHandler("#");
      }), (function () {
        return this.stringPatternHandler("&&");
      }), (function () {
        return this.stringPatternHandler("||");
      }), (function () {
        return this.stringPatternHandler("&");
      }), (function () {
        return this.stringPatternHandler("|");
      }), (function () {
        return this.stringPatternHandler("++");
      }), (function () {
        return this.stringPatternHandler("--");
      }), (function () {
        return this.stringPatternHandler("+");
      }), (function () {
        return this.stringPatternHandler("-");
      }), (function () {
        return this.stringPatternHandler("*");
      }), (function () {
        return this.stringPatternHandler("%");
      }), (function () {
        return this.stringPatternHandler("~");
      }), (function () {
        return this.stringPatternHandler("?");
      }), (function () {
        return this.stringPatternHandler(":");
      }));
      t = this.createToken(text);
      this._predicate((function () {
        return nl;
      }));
      t.newlinePrecedes = true;
      return t;
    }).call(this);
  }),
  number: (function () {
    return this.memoize("idlbIQZsC4S6xWGcn4UYPg", (function () {
      return this._choice(this.decimal, this.hexInteger);
    }));
  }),
  decimal: (function () {
    return this.memoize("G9IsgYtX4A9YrqeNZjJx2g", (function () {
      var text;
      return (function () {
        text = this.matchedInput((function () {
          return this._choice((function () {
            this.integerPart();
            this._optional((function () {
              this.stringPatternHandler(".");
              return this._repeat(this.digit);
            }));
            return this._optional(this.exponentPart);
          }), (function () {
            this.stringPatternHandler(".");
            this._repeat1(this.digit);
            return this._optional(this.exponentPart);
          }));
        }));
        this._not(this.idChar);
        return this.createToken("number", parseFloat(text));
      }).call(this);
    }));
  }),
  integerPart: (function () {
    return this.memoize("ZbCckoiBHHM15CfT9A3GBQ", (function () {
      return this._choice((function () {
        return this.stringPatternHandler("0");
      }), (function () {
        this.char(Range.inclusive("1", "9"));
        return this._repeat(this.digit);
      }));
    }));
  }),
  exponentPart: (function () {
    return this.memoize("47NFX7hYXAZ1sUfbtZKprw", (function () {
      return (function () {
        this._choice((function () {
          return this.stringPatternHandler("e");
        }), (function () {
          return this.stringPatternHandler("E");
        }));
        this._choice((function () {
          return this.stringPatternHandler("+");
        }), (function () {
          return this.stringPatternHandler("-");
        }), this.nothing);
        return this._repeat1(this.digit);
      }).call(this);
    }));
  }),
  hexInteger: (function () {
    return this.memoize("qNL6Yv63wtVPyvP9B2Xs0w", (function () {
      var text;
      return (function () {
        this._choice((function () {
          return this.stringPatternHandler("0x");
        }), (function () {
          return this.stringPatternHandler("0X");
        }));
        text = this.matchedInput((function () {
          return this._repeat1(this.hexDigit);
        }));
        this._not(this.idChar);
        return this.createToken("number", parseInt(text, 16));
      }).call(this);
    }));
  }),
  string: (function () {
    return this.memoize("RC+/hZlzH6DiAnn4ljNifQ", (function () {
      var text;
      return (function () {
        text = this._choice((function () {
          return this.stringFragment((function () {
            return this.stringPatternHandler("'");
          }));
        }), (function () {
          return this.stringFragment((function () {
            return this.stringPatternHandler("\"");
          }));
        }));
        return this.createToken("string", text);
      }).call(this);
    }));
  }),
  stringFragment: (function (quote) {
    var cs;
    return (function () {
      quote.call(this);
      cs = this._repeat((function () {
        this._not(quote);
        return this.stringChar();
      }));
      quote.call(this);
      return cs.join("");
    }).call(this);
  }),
  stringChar: (function () {
    return this.memoize("02NrhV4bLLkO7y5ybin5nQ", (function () {
      return this._choice((function () {
        this.stringPatternHandler("\\");
        return this.stringEscapeSequence();
      }), (function () {
        this.stringPatternHandler("\\");
        this.newline();
        return "";
      }), (function () {
        this._not(this.newline);
        return this.sourceChar();
      }));
    }));
  }),
  stringEscapeSequence: (function () {
    return this.memoize("8FTzoSAvDPdSiOXcvSMYbg", (function () {
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
        this.stringPatternHandler("b");
        return "\b";
      }), (function () {
        this.stringPatternHandler("f");
        return "\f";
      }), (function () {
        this.stringPatternHandler("n");
        return "\n";
      }), (function () {
        this.stringPatternHandler("r");
        return "\r";
      }), (function () {
        this.stringPatternHandler("t");
        return "\t";
      }), (function () {
        this.stringPatternHandler("v");
        return "\u000b";
      }), (function () {
        this.stringPatternHandler("0");
        this._not(this.digit);
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
        this._not((function () {
          return this._choice(this.newline, this.digit);
        }));
        return this.sourceChar();
      }));
    }));
  }),
  divisionAssignment: (function () {
    return this.memoize("K5SuUrLX1NPIAcz7ijaUeg", (function () {
      return (function () {
        this.stringPatternHandler("/=");
        return this.createToken("/=");
      }).call(this);
    }));
  }),
  division: (function () {
    return this.memoize("8iUmA0rPAgMMRqydBvx2Iw", (function () {
      return (function () {
        this.stringPatternHandler("/");
        this._not((function () {
          return this.stringPatternHandler("=");
        }));
        return this.createToken("/");
      }).call(this);
    }));
  }),
  regex: (function () {
    return this.memoize("EWDNzudRq5BQsVhA1W1f8A", (function () {
      var pattern, options;
      return (function () {
        this.stringPatternHandler("/");
        pattern = this.matchedInput((function () {
          this._not((function () {
            return this.stringPatternHandler("*");
          }));
          return this._repeat(this.regexChar);
        }));
        this.stringPatternHandler("/");
        options = this.matchedInput((function () {
          return this._repeat(this.idChar);
        }));
        return this.createToken("regex", RegExp.new(pattern, options));
      }).call(this);
    }));
  }),
  regexChar: (function () {
    return this.memoize("b4nCy0nrjwc9U3TUqwkoPw", (function () {
      return this._choice((function () {
        this.stringPatternHandler("\\");
        this._not(this.newline);
        return this.sourceChar();
      }), this.regexCharacterClass, (function () {
        this._not((function () {
          return this._choice((function () {
            return this.stringPatternHandler("/");
          }), this.newline);
        }));
        return this.sourceChar();
      }));
    }));
  }),
  regexCharacterClass: (function () {
    return this.memoize("m8pGw6fXQi6s1CmU8m6Gdw", (function () {
      return (function () {
        this.stringPatternHandler("[");
        this.regexCharacterClassChar();
        return this.stringPatternHandler("]");
      }).call(this);
    }));
  }),
  regexCharacterClassChar: (function () {
    return this.memoize("SEMg1gBih2AZlbTjwfAaFQ", (function () {
      return this._choice((function () {
        this.stringPatternHandler("\\");
        this._not(this.newline);
        return this.sourceChar();
      }), (function () {
        this._not((function () {
          return this._choice((function () {
            return this.stringPatternHandler("]");
          }), this.newline);
        }));
        return this.sourceChar();
      }));
    }));
  }),
  initialIdChar: (function () {
    return this.memoize("iZ9FFjLrhbfH3ZTCIovFaQ", (function () {
      return this.char(Range.inclusive("a", "z"), Range.inclusive("A", "Z"), "_", "$");
    }));
  }),
  idChar: (function () {
    return this.memoize("NfuHjvoUJLK3hHlcPFYGmw", (function () {
      return this.char(Range.inclusive("a", "z"), Range.inclusive("A", "Z"), "_", "$", Range.inclusive("0", "9"));
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
  ws: (function () {
    return this.memoize("Ch58QQCmTZAKmb1SKvAh1g", (function () {
      var nl;
      return (function () {
        nl = false;
        this._repeat1((function () {
          return this._choice(this.spaces, (function () {
            this.newline();
            return nl = true;
          }), this.comment);
        }));
        return nl;
      }).call(this);
    }));
  }),
  spaces: (function () {
    return this.memoize("5K4s6Y6jSoZRoDN2JZjCxA", (function () {
      return this.char(" \t\u000b\f\u0000\u0000\u0000\u0000");
    }));
  }),
  newline: (function () {
    return this.memoize("IznjkxgmfL/K9/ZiPezcnw", (function () {
      return this._choice((function () {
        return this.stringPatternHandler("\r\n");
      }), (function () {
        return this.char("\n\r߬߭");
      }));
    }));
  }),
  sourceChar: (function () {
    return this.memoize("3Q2/tmuofD+/pP+EOM8hKQ", (function () {
      return this.char();
    }));
  }),
  comment: (function () {
    return this.memoize("lkPW/ylIg6ZkYZmGTNNVlA", (function () {
      return this._choice((function () {
        this.stringPatternHandler("//");
        this._repeat((function () {
          this._not(this.newline);
          return this.sourceChar();
        }));
        return this._choice(this.newline, this.eof);
      }), (function () {
        this.stringPatternHandler("/*");
        this._repeat((function () {
          this._not((function () {
            return this.stringPatternHandler("*/");
          }));
          return this.sourceChar();
        }));
        return this.stringPatternHandler("*/");
      }));
    }));
  }),
  createToken: (function (type, value) {
    var text = this.slice(this.initialTokenPosition, this.position);
    var token = {
      type: type,
      value: value,
      text: text,
      position: this.initialTokenPosition,
      length: this.position - this.initialTokenPosition
    };
    return token;
  })
});
