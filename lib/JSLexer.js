// Generated code
"use strict";
var TextParser = require("./TextParser");
var Token = require("./Token");
var JSLexer = module.exports = Class.new(TextParser, {
}, {
  initialize: (function (source) {
    this.source = source;
    TextParser.prototype.initialize.call(this, source);
  }),
  nextToken: (function () {
    return this.memoize("v47+CZeDV4JVeph/b0Yf/g", (function () {
      return (function () {
        this._optional(this.whitespace);
        this.state.tokenPosition = this.state.position;
        return this._choice(this.identifier, this.number, this.operatorAssignment, this.punctuation, this.string, (function () {
          this._lookahead((function () {
            return this.stringPatternHandler("/");
          }));
          return this.createToken("unknown");
        }), (function () {
          this.eof();
          return this.createToken("eof");
        }), (function () {
          console.log("Lexer failed at position: " + this.source.lineColumnAt(this.state.tokenPosition).join(":"));
          throw new Error("Not a valid token!");
        }));
      }).call(this);
    }));
  }),
  resetToBeforeToken: (function (token) {
    this.state = {
      position: token.position,
      tokenPosition: token.position,
      precededByNewline: token.precededByNewline
    };
  }),
  resetToAfterToken: (function (token) {
    this.state = {
      position: token.position + token.text.length,
      tokenPosition: token.position + token.text.length,
      precededByNewline: false
    };
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
      tokenPosition: 0,
      precededByNewline: false
    };
  }),
  copyState: (function () {
    return {
      position: this.state.position,
      tokenPosition: this.state.tokenPosition,
      precededByNewline: this.state.precededByNewline
    };
  }),
  get ReservedWords() {
    return String.ReservedWords;
  },
  NamedTokenTypes: [
    "identifier",
    "number",
    "string",
    "regex",
    "unknown",
    "eof"
  ],
  identifier: (function () {
    return this.memoize("2L3Qvq0cPaBC6VhqBqbn9w", (function () {
      var text, token;
      return (function () {
        this.firstIdChar();
        text = this._repeat(this.idChar);
        token = this.createToken("identifier");
        (function () {
          if (this.ReservedWords.include(token.text)) {
            token.reserved = true;
          }
          if (this.NamedTokenTypes.include(token.text)) {
            token.namedTokenType = true;
          }
        }).call(this);
        return token;
      }).call(this);
    }));
  }),
  firstIdChar: (function () {
    return this.memoize("iZ9FFjLrhbfH3ZTCIovFaQ", (function () {
      return this.char(Range.inclusive("a", "z"), Range.inclusive("A", "Z"), "_", "$");
    }));
  }),
  idChar: (function () {
    return this.memoize("NfuHjvoUJLK3hHlcPFYGmw", (function () {
      return this.char(Range.inclusive("a", "z"), Range.inclusive("A", "Z"), "_", "$", Range.inclusive("0", "9"));
    }));
  }),
  punctuation: (function () {
    return this.memoize("gkDcQZwdokdH/PnhdLiHYA", (function () {
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
          this.stringPatternHandler(".");
          this._not(this.digit);
          return ".";
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
        return this.createToken(text);
      }).call(this);
    }));
  }),
  operatorAssignment: (function () {
    return this.memoize("gCMMCleFpbPhNpHOYRonmQ", (function () {
      var text, t;
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
        t = this.createToken(text);
        (t.operatorAssignment = true, t.opname = text.slice(0, -1));
        return t;
      }).call(this);
    }));
  }),
  division: (function () {
    return this.memoize("9jK7c9WH8cLnas4OYPlPKw", (function () {
      var t;
      return this._choice((function () {
        this.stringPatternHandler("/=");
        t = this.createToken(text);
        (t.operatorAssignment = true, t.opname = text.slice(0, -1));
        return t;
      }), (function () {
        this.stringPatternHandler("/");
        return this.createToken(text);
      }));
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
  digit: (function () {
    return this.memoize("RSSnccc83KMng3fIWUieQQ", (function () {
      return this.char(Range.inclusive("0", "9"));
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
  hexDigit: (function () {
    return this.memoize("IpbhFgKQbC9Z7aTLZhaecg", (function () {
      return this.char(Range.inclusive("0", "9"), Range.inclusive("a", "f"), Range.inclusive("A", "F"));
    }));
  }),
  string: (function () {
    return this.memoize("S5AF9DvzVcze9FUIX3IzTA", (function () {
      var text;
      return (function () {
        text = this._choice((function () {
          return this.stringHelper((function () {
            return this.stringPatternHandler("'");
          }));
        }), (function () {
          return this.stringHelper((function () {
            return this.stringPatternHandler("\"");
          }));
        }));
        return this.createToken("string", text);
      }).call(this);
    }));
  }),
  stringHelper: (function (quote) {
    var characters;
    return (function () {
      quote.call(this);
      characters = this._repeat((function () {
        this._not(quote);
        return this.stringChar();
      }));
      quote.call(this);
      return characters.join("");
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
  regex: (function () {
    return this.memoize("Uq2giR/E6ms9LDqdvzDxLg", (function () {
      var pattern, options;
      return (function () {
        this.stringPatternHandler("/");
        pattern = this.matchedInput((function () {
          this._not((function () {
            return this.stringPatternHandler("*");
          }));
          this.regexChar();
          return this._repeat(this.regexChar);
        }));
        this.stringPatternHandler("/");
        options = this.matchedInput((function () {
          return this._repeat(this.idChar);
        }));
        return this.createToken("regex", new RegExp(pattern, options));
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
  whitespace: (function () {
    return this.memoize("VgfE6p0yylxBFxesffnIVg", (function () {
      return this._repeat1((function () {
        return this._choice(this.spaces, this.newline, this.comment);
      }));
    }));
  }),
  spaces: (function () {
    return this.memoize("Naf/oE3OjPOmwmQVSAOgQA", (function () {
      return this._repeat1((function () {
        return this.char(" \t\u000b\f\u0000\u0000\u0000\u0000");
      }));
    }));
  }),
  newline: (function () {
    return this.memoize("F+lC3hHouQW6I7yC3WsC2g", (function () {
      return (function () {
        this._choice((function () {
          return this.stringPatternHandler("\r\n");
        }), (function () {
          return this.char("\n\r߬߭");
        }));
        return this.state.precededByNewline = true;
      }).call(this);
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
  sourceChar: (function () {
    return this.memoize("3Q2/tmuofD+/pP+EOM8hKQ", (function () {
      return this.char();
    }));
  }),
  createToken: (function (type, value) {
    var text = this.slice(this.state.tokenPosition, this.state.position);
    var token = Token.new(type, value, text, this.state.tokenPosition, this.state.precededByNewline, this.source);
    this.state.precededByNewline = false;
    this.state.tokenPosition = this.state.position;
    return token;
  })
});
