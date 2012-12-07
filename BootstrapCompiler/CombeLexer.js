// Generated code
"use strict";
var combe = require("combe");
var TextParser = combe.TextParser;
var Token = Class.new(Object, {
}, {
  initialize: (function (type, value, position, length, text) {
    this.type = type;
    this.value = value;
    this.position = position;
    this.length = length;
    this.text = text;
  }),
  toString: (function () {
    return ((((("[[Token " + this.type) + " ") + this.value) + " ") + this.text.quote()) + "]]";
  }),
  is: (function (typename) {
    return this.type === typename;
  })
});
var CombeLexer = module.exports = Class.new(TextParser, {
  allTokens: (function (source, filename) {
    var lexer = this.new(source, filename);
    var tokens = [
      /* elision */
    ];
    try {
      while (tokens.isEmpty() || !tokens.last.is("eof")) {
        tokens.push(lexer.nextToken());
      }
    }
    catch (e) {
      if (e === combe.BacktrackingException) {
        throw Error.new("Lexer failed at " + lexer.positionString());
      }
      else {
        throw e;
      }
    }
    return tokens;
  })
}, {
  initialize: (function (source, filename) {
    if (filename == null) filename = "(unnamed)";
    TextParser.prototype.initialize.call(this, source);
    this.source = source;
    this.filename = filename;
    this.furthestPosition = 0;
  }),
  reset: (function (position) {
    if (position == null) position = 0;
    this.position = position;
  }),
  createToken: (function (type, value) {
    var text = this.source.slice(this.tokenPosition, this.position);
    return Token.new(type, value, this.tokenPosition, text.length, text);
  }),
  nextToken: (function () {
    return this.memoize("V65sYLFwD2A/Bq3jBCQMKg", (function () {
      return (function () {
        this.furthestPosition = this.position;
        this._optional(this.ws);
        this.tokenPosition = this.position;
        return this._choice(this.identifier, this.number, this.operatorAssignment, this.punctuation, this.string, this.regex, (function () {
          this.eof();
          return this.createToken("eof");
        }), (function () {
          throw Error.new("Lexer failed at position " + this.source.lineColumnAt(this.position).join(":"));
        }));
      }).call(this);
    }));
  }),
  identifier: (function () {
    return this.memoize("RAMbOjIAW5N/ZEd93Zt5OA", (function () {
      var token;
      return (function () {
        this.initialIdChar();
        this._repeat(this.idChar);
        token = this.createToken("identifier");
        token.reserved = this.ReservedWords.include(token.text);
        return token;
      }).call(this);
    }));
  }),
  ReservedWords: [
    "var",
    "function",
    "rule",
    "if",
    "else",
    "while",
    "do",
    "for",
    "for",
    "break",
    "continue",
    "try",
    "catch",
    "finally",
    "this",
    "null",
    "undefined",
    "true",
    "false"
  ],
  operatorAssignment: (function () {
    return this.memoize("TIguga+/wY5alAMOF3Kh3Q", (function () {
      return (function () {
        this._choice((function () {
          return this.stringPatternHandler("+=");
        }), (function () {
          return this.stringPatternHandler("-=");
        }), (function () {
          return this.stringPatternHandler("*=");
        }), (function () {
          return this.stringPatternHandler("/=");
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
  punctuation: (function () {
    return this.memoize("7VER9hi4VPWsNjmvRHmvNg", (function () {
      var text;
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
          return this.stringPatternHandler("^^");
        }), (function () {
          return this.stringPatternHandler("&");
        }), (function () {
          return this.stringPatternHandler("|");
        }), (function () {
          return this.stringPatternHandler("^");
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
          return this.stringPatternHandler("/");
        }), (function () {
          return this.stringPatternHandler("%");
        }), (function () {
          return this.stringPatternHandler("~");
        }), (function () {
          return this.stringPatternHandler("?");
        }), (function () {
          return this.stringPatternHandler(":");
        }));
        return this.createToken(text);
      }).call(this);
    }));
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
    return this.memoize("Cih1h0iMMfn9lVpgHSBf9g", (function () {
      return this._choice((function () {
        this.stringPatternHandler("\\");
        return this.stringEscapeSequence();
      }), (function () {
        this.stringPatternHandler("\\");
        this.newline();
        return "";
      }), (function () {
        this._not(this.newline);
        return this.char();
      }));
    }));
  }),
  stringEscapeSequence: (function () {
    return this.memoize("ESEviSbh2pJ3nF+su6/DpQ", (function () {
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
        return this.char();
      }));
    }));
  }),
  regex: (function () {
    return this.memoize("yt2j3UVATUpQlPin0zq6FA", (function () {
      var pattern, options;
      return (function () {
        this.stringPatternHandler("r/");
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
    return this.memoize("mqVteiJGygB8ho6zJ2Up9Q", (function () {
      return this._choice((function () {
        this.stringPatternHandler("\\");
        this._not(this.newline);
        return this.char();
      }), this.regexCharacterClass, (function () {
        this._not((function () {
          return this._choice((function () {
            return this.stringPatternHandler("/");
          }), this.newline);
        }));
        return this.char();
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
    return this.memoize("pQmnjvxEKRs4YT4t3t9mqg", (function () {
      return this._choice((function () {
        this.stringPatternHandler("\\");
        this._not(this.newline);
        return this.char();
      }), (function () {
        this._not((function () {
          return this._choice((function () {
            return this.stringPatternHandler("]");
          }), this.newline);
        }));
        return this.char();
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
    return this.memoize("WqXxIrwwCSexN47GQeul4Q", (function () {
      return this._repeat1((function () {
        return this._choice(this.spaces, this.comment, this.newline);
      }));
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
  comment: (function () {
    return this.memoize("CbEdt63MtNkyv1kQOooOYw", (function () {
      return this._choice((function () {
        this.stringPatternHandler("//");
        this._repeat((function () {
          this._not(this.newline);
          return this.char();
        }));
        return this._choice(this.newline, this.eof);
      }), (function () {
        this.stringPatternHandler("/*");
        this._repeat((function () {
          this._not((function () {
            return this.stringPatternHandler("*/");
          }));
          return this.char();
        }));
        return this.stringPatternHandler("*/");
      }));
    }));
  }),
  next: (function () {
    var c = TextParser.prototype.next.call(this);
    this.furthestPosition = Math.max(this.furthestPosition, this.position);
    return c;
  }),
  nextIf: (function () {
    var c = TextParser.prototype.nextIf.call(this, predicate);
    this.furthestPosition = Math.max(this.furthestPosition, this.position);
    return c;
  }),
  lineColumnString: (function (position) {
    if (position == null) position = this.position;
    return this.source.lineColumnAt(position).join(":");
  }),
  positionString: (function (position) {
    return (this.filename + ":") + this.lineColumnString(position);
  }),
  log: (function (name) {
    var additionalMessages = Array.slice(arguments, 1);
    var out = (("CombeLexer::log() " + this.positionString()) + ":") + name;
    if (additionalMessages.length > 0) {
      out = out + "; ";
      out = out + additionalMessages.join("; ");
    }
    console.error(out);
  })
});
