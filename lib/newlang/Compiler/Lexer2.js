// Generated code
"use strict";
var combe = require("combe");
var TextParser = combe.TextParser;
var Token = Class.new(Object, {
}, {
  initialize: (function (typename, value, position, length, text) {
    this.typename = typename;
    this.value = value;
    this.position = position;
    this.length = length;
    this.text = text;
  }),
  toString: (function () {
    return ((((("[[Token " + this.typename) + " ") + this.value) + " ") + this.text.quote()) + "]]";
  })
});
var Lexer2 = module.exports = Class.new(TextParser, {
}, {
  initialize: (function (source, filename) {
    if (filename == null) filename = "(unnamed)";
    this.source = source;
    this.filename = filename;
    this.furthestPosition = 0;
    TextParser.prototype.initialize.call(this, source);
  }),
  nextToken: (function () {
    return this.memoize("pypBzN6izND4Ymyfhnq0dg", (function () {
      return (function () {
        (this.furthestPosition = this.position, this.isNewline = false);
        this._optional(this.ws);
        this.tokenPosition = this.position;
        return this._choice(this.eofToken, this.newlineToken, this.identifier, this.operator, this.number, this.string);
      }).call(this);
    }));
  }),
  reset: (function (position) {
    this.position = position;
  }),
  createToken: (function (typename, value) {
    var text = this.source.slice(this.tokenPosition, this.position);
    return Token.new(typename, value, this.tokenPosition, text.length, text);
  }),
  eofToken: (function () {
    return this.memoize("Zh+hhoYdtBoRPDjJaSYT+A", (function () {
      return (function () {
        this.eof();
        return this.createToken("eof");
      }).call(this);
    }));
  }),
  newlineToken: (function () {
    if (this.isNewline) {
      var column = this.position - this.lineStart;
      return Token.new("newline", column, this.lineStart, column, "<ws>");
    }
    else {
      this.fail();
    }
  }),
  identifier: (function () {
    return this.memoize("Q7qOzx31MaeJ5oDYRm8s3w", (function () {
      var t;
      return (function () {
        this.initialIdChar();
        this._repeat(this.idChar);
        t = this.createToken("identifier");
        (function () {
          if (this.InvalidVariableIdentifiers.include(t.text)) {
            t.invalidVariableIdentifier = true;
          }
        }).call(this);
        return t;
      }).call(this);
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
    "xor",
    "and",
    "not",
    "if",
    "then",
    "else",
    "try",
    "catch",
    "var",
    "return",
    "throw",
    "do",
    "end"
  ],
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
  operator: (function () {
    return this.memoize("TL3PemkUTtqxhJ8j/nz0Lg", (function () {
      return (function () {
        this._choice((function () {
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
          return this.stringPatternHandler("->");
        }), (function () {
          return this.stringPatternHandler("=>");
        }), (function () {
          return this.stringPatternHandler("<-");
        }), (function () {
          return this.stringPatternHandler("..");
        }), (function () {
          return this.stringPatternHandler(".");
        }), (function () {
          return this.stringPatternHandler(":");
        }), (function () {
          return this.stringPatternHandler("++");
        }), (function () {
          return this.stringPatternHandler("--");
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
        }));
        return this.createToken("operator");
      }).call(this);
    }));
  }),
  number: (function () {
    return this.memoize("48U2XQwSb+nmfQxWqIN9TQ", (function () {
      return this._choice(this.decimalNumber, this.hexNumber);
    }));
  }),
  decimalNumber: (function () {
    return this.memoize("GT1vDu6U2mAevKE2Mcy/MQ", (function () {
      var t;
      return (function () {
        this._repeat1(this.digit);
        this._optional((function () {
          this.stringPatternHandler(".");
          return this._repeat(this.digit);
        }));
        this._optional((function () {
          this._choice((function () {
            return this.stringPatternHandler("e");
          }), (function () {
            return this.stringPatternHandler("E");
          }));
          return this._repeat1(this.digit);
        }));
        this._not(this.idChar);
        t = this.createToken("number");
        t.value = parseFloat(t.text);
        return t;
      }).call(this);
    }));
  }),
  hexNumber: (function () {
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
  string: (function () {
    return this.memoize("7dNcwaa2vX5V4lXDrjlHyA", (function () {
      var cs;
      return (function () {
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
        return this.createToken("string", cs.join(""));
      }).call(this);
    }));
  }),
  stringChar: (function () {
    return this.memoize("4uaTehSF5R7tIANfTdPfIA", (function () {
      return this._choice((function () {
        this.stringPatternHandler("\\");
        return this.stringEscapeSequence();
      }), (function () {
        this._not(this.newline);
        return this.char();
      }));
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
  ws: (function () {
    return this.memoize("FPsaCryUJGy8XdtVUbl3yQ", (function () {
      return this._repeat((function () {
        return this._choice(this.spaces, this.comment, this.newline);
      }));
    }));
  }),
  comment: (function () {
    return this.memoize("xmo6vDr+2RsggalNO0O7ow", (function () {
      return this._choice(this.delimitedComment, this.lineComment);
    }));
  }),
  delimitedComment: (function () {
    return this.memoize("eN+iy7aTKX/cfFQf5meCZw", (function () {
      return (function () {
        this.stringPatternHandler("{-");
        this._lookahead((function () {
          return this._choice(this.space, this.newline, this.eof, (function () {
            return this.stringPatternHandler("-}");
          }), this.delimitedComment);
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
    return this.memoize("NzEw59Ox15AaEYflFeMi0w", (function () {
      return (function () {
        this._choice((function () {
          return this.stringPatternHandler("\r\n");
        }), (function () {
          return this.char("\r\n");
        }));
        return (this.lineStart = this.position, this.isNewline = true);
      }).call(this);
    }));
  }),
  spaces: (function () {
    return this.memoize("m4Ayc+149rWdQ0HDpN0g0g", (function () {
      return this._repeat1((function () {
        return this.stringPatternHandler(" ");
      }));
    }));
  }),
  next: (function () {
    var c = TextParser.prototype.next.call(this);
    this.furthestPosition = Math.max(this.futhestPosition, this.position);
    return c;
  }),
  nextIf: (function (predicate) {
    var c = TextParser.prototype.nextIf.call(this, predicate);
    this.furthestPosition = Math.max(this.furthestPosition, this.position);
    return c;
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
  lineColumnString: (function (position) {
    if (position == null) position = this.position;
    return this.source.lineColumnAt(position).join(":");
  }),
  positionString: (function (position) {
    if (position == null) position = this.position;
    return (this.filename + ":") + this.source.lineColumnAt(position).join(":");
  }),
  log: (function (name) {
    var messages = Array.slice(arguments, 1);
    var lc = this.source.lineColumnAt(this.position);
    console.log((("Lexer2::log() " + this.positionString()) + " - ") + messages.join("; "));
  })
});
