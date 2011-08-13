"use strict";
var TextParser = ((require)("../Runtime")).TextParser;
var Token = (require)("./Token");
var JSLexer = ((module).exports = (Class).new(TextParser, {}, {
  initialize: (function (source) {
    ((this).source = source);
    (((TextParser).prototype).initialize).call(this, source);
  }),
  nextToken: (function () {
    return (this).memoize("unnamed_GyvJC1mpZ+GwWcUcAnMoWQ", (function () {
      return ((function () {
        (this)._optional((this).whitespace);
        (((this).state).tokenPosition = ((this).state).position);
        return (this)._choice((this).identifier, (this).number, (this).operatorAssignment, (this).punctuation, (this).string, (function () {
          (this)._lookahead((function () {
            return (this).stringPatternHandler("/");
          }));
          return ((this).createToken).call(this, "unknown");
        }), (function () {
          ((this).eof).call(this);
          return ((this).createToken).call(this, "eof");
        }), (function () {
          (console).log(("Lexer failed at position: " + ((((this).source).lineColumnAt(((this).state).tokenPosition)).join)(":")));
          throw new (Error)("Not a valid token!");
        }));
      })).call(this);
    }));
  }),
  resetToBeforeToken: (function (token) {
    ((this).state = {
      position: (token).position,
      tokenPosition: (token).position,
      precededByNewline: (token).precededByNewline
    });
  }),
  resetToAfterToken: (function (token) {
    ((this).state = {
      position: ((token).position + ((token).text).length),
      tokenPosition: ((token).position + ((token).text).length),
      precededByNewline: true
    });
  }),
  emptyState: (function () {
    return {
      position: 0,
      tokenPosition: 0,
      precededByNewline: true
    };
  }),
  copyState: (function () {
    return {
      position: ((this).state).position,
      tokenPosition: ((this).state).tokenPosition,
      precededByNewline: ((this).state).precededByNewline
    };
  }),
  identifier: (function () {
    return (this).memoize("unnamed_Z1G0IeTQHYNSlzDDLoXeLg", (function () {
      var text;
      return ((function () {
        ((this).firstIdChar).call(this);
        (text = (this)._repeat((this).idChar));
        return ((this).createToken).call(this, "identifier");
      })).call(this);
    }));
  }),
  firstIdChar: (function () {
    return (this).memoize("unnamed_uIUSWhrfKuw6isBAcaKeCQ", (function () {
      return ((this).char).call(this, (Range).inclusive("a", "z"), (Range).inclusive("A", "Z"), "_", "$");
    }));
  }),
  idChar: (function () {
    return (this).memoize("unnamed_IlywJas0BbMPqSEPvEcp9A", (function () {
      return ((this).char).call(this, (Range).inclusive("a", "z"), (Range).inclusive("A", "Z"), "_", "$", (Range).inclusive("0", "9"));
    }));
  }),
  punctuation: (function () {
    return (this).memoize("unnamed_XhyXlsgDmB3wISM5C7lirQ", (function () {
      var text;
      return ((function () {
        (text = (this)._choice((function () {
          return (this).stringPatternHandler("{");
        }), (function () {
          return (this).stringPatternHandler("}");
        }), (function () {
          return (this).stringPatternHandler("(");
        }), (function () {
          return (this).stringPatternHandler(")");
        }), (function () {
          return (this).stringPatternHandler("[");
        }), (function () {
          return (this).stringPatternHandler("]");
        }), (function () {
          return (this).stringPatternHandler(";");
        }), (function () {
          return (this).stringPatternHandler(",");
        }), (function () {
          (this).stringPatternHandler(".");
          (this)._not((this).digit);
          return ".";
        }), (function () {
          return (this).stringPatternHandler("<<");
        }), (function () {
          return (this).stringPatternHandler(">>>");
        }), (function () {
          return (this).stringPatternHandler(">>");
        }), (function () {
          return (this).stringPatternHandler("<=");
        }), (function () {
          return (this).stringPatternHandler(">=");
        }), (function () {
          return (this).stringPatternHandler("<");
        }), (function () {
          return (this).stringPatternHandler(">");
        }), (function () {
          return (this).stringPatternHandler("===");
        }), (function () {
          return (this).stringPatternHandler("!==");
        }), (function () {
          return (this).stringPatternHandler("==");
        }), (function () {
          return (this).stringPatternHandler("!=");
        }), (function () {
          return (this).stringPatternHandler("!");
        }), (function () {
          return (this).stringPatternHandler("=");
        }), (function () {
          return (this).stringPatternHandler("&&");
        }), (function () {
          return (this).stringPatternHandler("||");
        }), (function () {
          return (this).stringPatternHandler("&");
        }), (function () {
          return (this).stringPatternHandler("|");
        }), (function () {
          return (this).stringPatternHandler("++");
        }), (function () {
          return (this).stringPatternHandler("--");
        }), (function () {
          return (this).stringPatternHandler("+");
        }), (function () {
          return (this).stringPatternHandler("-");
        }), (function () {
          return (this).stringPatternHandler("*");
        }), (function () {
          return (this).stringPatternHandler("%");
        }), (function () {
          return (this).stringPatternHandler("~");
        }), (function () {
          return (this).stringPatternHandler("?");
        }), (function () {
          return (this).stringPatternHandler(":");
        })));
        return ((this).createToken).call(this, text);
      })).call(this);
    }));
  }),
  operatorAssignment: (function () {
    return (this).memoize("unnamed_Mtr1ftzw6o39exslimmeog", (function () {
      var text, t;
      return ((function () {
        (text = (this)._choice((function () {
          return (this).stringPatternHandler("+=");
        }), (function () {
          return (this).stringPatternHandler("-=");
        }), (function () {
          return (this).stringPatternHandler("*=");
        }), (function () {
          return (this).stringPatternHandler("%=");
        }), (function () {
          return (this).stringPatternHandler("&=");
        }), (function () {
          return (this).stringPatternHandler("|=");
        }), (function () {
          return (this).stringPatternHandler("^=");
        }), (function () {
          return (this).stringPatternHandler("<<=");
        }), (function () {
          return (this).stringPatternHandler(">>>=");
        }), (function () {
          return (this).stringPatternHandler(">>=");
        })));
        (t = ((this).createToken).call(this, text));
        (((t).operatorAssignment = true), ((t).opname = (text).slice(0, -(1))));
        return t;
      })).call(this);
    }));
  }),
  division: (function () {
    return (this).memoize("unnamed_w/LGmCFZw5TWvGSWkzlfug", (function () {
      var t;
      return (this)._choice((function () {
        (this).stringPatternHandler("/=");
        (t = ((this).createToken).call(this, text));
        (((t).operatorAssignment = true), ((t).opname = (text).slice(0, -(1))));
        return t;
      }), (function () {
        (this).stringPatternHandler("/");
        return ((this).createToken).call(this, text);
      }));
    }));
  }),
  number: (function () {
    return (this).memoize("unnamed_/krg4yx84VCYY9T6aBKRsw", (function () {
      return (this)._choice((this).decimal, (this).hexInteger);
    }));
  }),
  decimal: (function () {
    return (this).memoize("unnamed_4zZ+HJPFlK0+YSOHHDqDCA", (function () {
      var text;
      return ((function () {
        (text = ((this).matchedInput).call(this, (function () {
          return (this)._choice((function () {
            ((this).integerPart).call(this);
            (this)._optional((function () {
              (this).stringPatternHandler(".");
              return (this)._repeat((this).digit);
            }));
            return (this)._optional((this).exponentPart);
          }), (function () {
            (this).stringPatternHandler(".");
            (this)._repeat1((this).digit);
            return (this)._optional((this).exponentPart);
          }));
        })));
        (this)._not((this).idChar);
        return ((this).createToken).call(this, "number", (parseFloat)(text));
      })).call(this);
    }));
  }),
  integerPart: (function () {
    return (this).memoize("unnamed_IRyWGmuf/H/CByRrCjUYTQ", (function () {
      return (this)._choice((function () {
        return (this).stringPatternHandler("0");
      }), (function () {
        ((this).char).call(this, (Range).inclusive("1", "9"));
        return (this)._repeat((this).digit);
      }));
    }));
  }),
  exponentPart: (function () {
    return (this).memoize("unnamed_iLFvxXwTLe7cqUqIaJlC2w", (function () {
      return ((function () {
        (this)._choice((function () {
          return (this).stringPatternHandler("e");
        }), (function () {
          return (this).stringPatternHandler("E");
        }));
        (this)._choice((function () {
          return (this).stringPatternHandler("+");
        }), (function () {
          return (this).stringPatternHandler("-");
        }), (this).nothing);
        return (this)._repeat1((this).digit);
      })).call(this);
    }));
  }),
  digit: (function () {
    return (this).memoize("unnamed_FqP2ZIr1iDjAQdiMK4yvUw", (function () {
      return ((this).char).call(this, (Range).inclusive("0", "9"));
    }));
  }),
  hexInteger: (function () {
    return (this).memoize("unnamed_4jgqwCDXH9bf4nQkt9azTQ", (function () {
      var text;
      return ((function () {
        (this)._choice((function () {
          return (this).stringPatternHandler("0x");
        }), (function () {
          return (this).stringPatternHandler("0X");
        }));
        (text = ((this).matchedInput).call(this, (function () {
          return (this)._repeat1((this).hexDigit);
        })));
        (this)._not((this).idChar);
        return ((this).createToken).call(this, "number", (parseInt)(text, 16));
      })).call(this);
    }));
  }),
  hexDigit: (function () {
    return (this).memoize("unnamed_SD0xRgidBk6WOE66rOx4Kw", (function () {
      return ((this).char).call(this, (Range).inclusive("0", "9"), (Range).inclusive("a", "f"), (Range).inclusive("A", "F"));
    }));
  }),
  string: (function () {
    return (this).memoize("unnamed_IoQA06NMVLgqtRUZJHv/Hw", (function () {
      var text;
      return ((function () {
        (text = (this)._choice((function () {
          return ((this).stringHelper).call(this, (function () {
            return (this).stringPatternHandler("'");
          }));
        }), (function () {
          return ((this).stringHelper).call(this, (function () {
            return (this).stringPatternHandler("\"");
          }));
        })));
        return ((this).createToken).call(this, "string", text);
      })).call(this);
    }));
  }),
  stringHelper: (function (quote) {
    var characters;
    return ((function () {
      (quote).call(this);
      (characters = (this)._repeat((function () {
        (this)._not(quote);
        return ((this).stringChar).call(this);
      })));
      (quote).call(this);
      return (characters).join("");
    })).call(this);
  }),
  stringChar: (function () {
    return (this).memoize("unnamed_pokdfsdPyUzbO00VAzL1dA", (function () {
      return (this)._choice((function () {
        (this).stringPatternHandler("\\");
        return ((this).stringEscapeSequence).call(this);
      }), (function () {
        (this).stringPatternHandler("\\");
        ((this).newline).call(this);
        return "";
      }), (function () {
        (this)._not((this).newline);
        return ((this).sourceChar).call(this);
      }));
    }));
  }),
  stringEscapeSequence: (function () {
    return (this).memoize("unnamed_u+WrLqLzcxpnTe6tfgmJ7A", (function () {
      var hs;
      return (this)._choice((function () {
        (this).stringPatternHandler("'");
        return "'";
      }), (function () {
        (this).stringPatternHandler("\"");
        return "\"";
      }), (function () {
        (this).stringPatternHandler("\\");
        return "\\";
      }), (function () {
        (this).stringPatternHandler("b");
        return "\b";
      }), (function () {
        (this).stringPatternHandler("f");
        return "\f";
      }), (function () {
        (this).stringPatternHandler("n");
        return "\n";
      }), (function () {
        (this).stringPatternHandler("r");
        return "\r";
      }), (function () {
        (this).stringPatternHandler("t");
        return "\t";
      }), (function () {
        (this).stringPatternHandler("v");
        return "\u000b";
      }), (function () {
        (this).stringPatternHandler("0");
        (this)._not((this).digit);
        return "\u0000";
      }), (function () {
        (this).stringPatternHandler("x");
        (hs = ((this).repeat).call(this, (this).hexDigit, 2));
        return (String).fromCodepoint((hs).join(""));
      }), (function () {
        (this).stringPatternHandler("u");
        (hs = ((this).repeat).call(this, (this).hexDigit, 4));
        return (String).fromCodepoint((hs).join(""));
      }), (function () {
        (this)._not((function () {
          return (this)._choice((this).newline, (this).digit);
        }));
        return ((this).sourceChar).call(this);
      }));
    }));
  }),
  regex: (function () {
    return (this).memoize("unnamed_qAyTSSRnr31rTyFG00kDeA", (function () {
      var pattern, options;
      return ((function () {
        (this).stringPatternHandler("/");
        (pattern = ((this).matchedInput).call(this, (function () {
          (this)._not((function () {
            return (this).stringPatternHandler("*");
          }));
          ((this).regexChar).call(this);
          return (this)._repeat((this).regexChar);
        })));
        (this).stringPatternHandler("/");
        (options = ((this).matchedInput).call(this, (function () {
          return (this)._repeat((this).idChar);
        })));
        return ((this).createToken).call(this, "regex", new (RegExp)(pattern, options));
      })).call(this);
    }));
  }),
  regexChar: (function () {
    return (this).memoize("unnamed_wZzL5MgPWcGYdgirmeJPYA", (function () {
      return (this)._choice((function () {
        (this).stringPatternHandler("\\");
        (this)._not((this).newline);
        return ((this).sourceChar).call(this);
      }), (this).regexCharacterClass, (function () {
        (this)._not((function () {
          return (this)._choice((function () {
            return (this).stringPatternHandler("/");
          }), (this).newline);
        }));
        return ((this).sourceChar).call(this);
      }));
    }));
  }),
  regexCharacterClass: (function () {
    return (this).memoize("unnamed_gf4QL+GoCBNvDM11Ba4+3g", (function () {
      return ((function () {
        (this).stringPatternHandler("[");
        ((this).regexCharacterClassChar).call(this);
        return (this).stringPatternHandler("]");
      })).call(this);
    }));
  }),
  regexCharacterClassChar: (function () {
    return (this).memoize("unnamed_PUiIeJaNyHApTDmgXY9org", (function () {
      return (this)._choice((function () {
        (this).stringPatternHandler("\\");
        (this)._not((this).newline);
        return ((this).sourceChar).call(this);
      }), (function () {
        (this)._not((function () {
          return (this)._choice((function () {
            return (this).stringPatternHandler("]");
          }), (this).newline);
        }));
        return ((this).sourceChar).call(this);
      }));
    }));
  }),
  whitespace: (function () {
    return (this).memoize("unnamed_iNsgQQGThk9SHre4xLFf1A", (function () {
      return (this)._repeat1((function () {
        return (this)._choice((this).spaces, (this).newline, (this).comment);
      }));
    }));
  }),
  spaces: (function () {
    return (this).memoize("unnamed_gq4v2pKl71aQG7dMJvk4sg", (function () {
      return (this)._repeat1((function () {
        return ((this).char).call(this, " \t\u000b\f\u0000\u0000\u0000\u0000");
      }));
    }));
  }),
  newline: (function () {
    return (this).memoize("unnamed_BWxlpe0LcpApc7mHxjy5zQ", (function () {
      return ((function () {
        (this)._choice((function () {
          return (this).stringPatternHandler("\r\n");
        }), (function () {
          return ((this).char).call(this, "\n\r߬߭");
        }));
        return (((this).state).precededByNewline = true);
      })).call(this);
    }));
  }),
  comment: (function () {
    return (this).memoize("unnamed_vw75+TpCKO7tZymhMDV3sQ", (function () {
      return (this)._choice((function () {
        (this).stringPatternHandler("//");
        (this)._repeat((function () {
          (this)._not((this).newline);
          return ((this).sourceChar).call(this);
        }));
        return (this)._choice((this).newline, (this).eof);
      }), (function () {
        (this).stringPatternHandler("/*");
        (this)._repeat((function () {
          (this)._not((function () {
            return (this).stringPatternHandler("*/");
          }));
          return ((this).sourceChar).call(this);
        }));
        return (this).stringPatternHandler("*/");
      }));
    }));
  }),
  sourceChar: (function () {
    return (this).memoize("unnamed_dARe+PJ8uzAyt60PzpLKKQ", (function () {
      return ((this).char).call(this);
    }));
  }),
  createToken: (function (type, value) {
    var text = (this).slice(((this).state).tokenPosition, ((this).state).position);
    var token = (Token).new(type, value, text, ((this).state).tokenPosition, ((this).state).precededByNewline, (this).source);
    (((this).state).precededByNewline = true);
    (((this).state).tokenPosition = ((this).state).position);
    return token;
  })
}));