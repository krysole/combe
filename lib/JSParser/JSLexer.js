"use strict";
var TextParser = ((require)("../Runtime")).TextParser;
var Token = ((require)("../Runtime")).Token;
var JSLexer = ((module).exports = (Class).new(TextParser, {}, {
  token: (function (type, tags, value) {
    var token = new (Token)(type, tags, value);
    ((token).startPosition = (this).tokenStartPosition);
    ((token).endPosition = ((this).state).position);
    ((token).previousToken = (this).lastToken);
    ((token).nextToken = null);
    ((token).input = (this).$input);
    if (!((token).is("whitespace"))) {
      for (var t = (this).lastToken;(t && (t).is("whitespace"));(t = (t).previousToken)) {
        if ((t).is("newline")) {
          ((token).precededByNewline = true);
          break;
        }
      }
    }
    if (((this).lastToken != null)) {
      (((this).lastToken).nextToken = token);
    }
    ((this).lastToken = token);
    ((this).tokenStartPosition = ((this).state).position);
    return token;
  }),
  nextToken: (function () {
    return (this)._memoize("unnamed_FOgrjFyzd05ekCcKoIofRw", (function () {
      return ((function () {
        (this)._optional((this).whitespace);
        return (this)._choice((this).identifierName, (this).number, (this).assignmentOperator, (this).punctuation, (this).string, (function () {
          (this)._lookahead((function () {
            return (this).stringPatternHandler("/");
          }));
          return ((this).token).call(this, "unknown");
        }), (function () {
          ((this).eof).call(this);
          return ((this).token).call(this, "eof");
        }), (function () {
          throw new (Error)("Not a valid token!");
        }));
      })).call(this);
    }));
  }),
  resetToAfterToken: (function (token) {
    ((this).lastToken = token);
    ((this).tokenStartPosition = (((this).state).position = (token).endPosition));
    ((token).nextToken = null);
  }),
  resetToBeforeToken: (function (token) {
    if ((token).previousToken) {
      (this).resetToAfterToken((token).previousToken);
    } else {
      ((this).lastToken = null);
      ((this).tokenStartPosition = (((this).state).position = 0));
    }
  }),
  sourceChar: (function () {
    return (this)._memoize("unnamed_dARe+PJ8uzAyt60PzpLKKQ", (function () {
      return ((this).char).call(this);
    }));
  }),
  identifierNameToken: (function (type, tags, name, value) {
    var token = (this).token(type, tags, value);
    ((token).identifierName = name);
    return token;
  }),
  identifierName: (function () {
    return (this)._memoize("unnamed_FMRK9AIDSMLhUEcS5SResA", (function () {
      var text;
      return ((function () {
        (text = ((this).matchedInput).call(this, (function () {
          ((this).idFirstChar).call(this);
          return (this)._repeat((this).idChar);
        })));
        return (this)._choice((function () {
          (this)._predicate((function () {
            return (text === "null");
          }));
          return ((this).identifierNameToken).call(this, "null", [
            "identifierName"
          ], text, null);
        }), (function () {
          (this)._predicate((function () {
            return (text === "true");
          }));
          return ((this).identifierNameToken).call(this, "true", [
            "boolean",
            "identifierName"
          ], text, true);
        }), (function () {
          (this)._predicate((function () {
            return (text === "false");
          }));
          return ((this).identifierNameToken).call(this, "false", [
            "boolean",
            "identifierName"
          ], text, true);
        }), (function () {
          (this)._predicate((function () {
            return ([
              "get",
              "set",
              "undefined"
            ]).include(text);
          }));
          return ((this).identifierNameToken).call(this, text, [
            "identifier",
            "identifierName"
          ], text);
        }), (function () {
          (this)._predicate((function () {
            return (text).isKeyword(text);
          }));
          return ((this).identifierNameToken).call(this, text, [
            "keyword",
            "reservedWord",
            "identifierName"
          ], text);
        }), (function () {
          (this)._predicate((function () {
            return (text).isFutureReservedWord(text);
          }));
          return ((this).identifierNameToken).call(this, "futureReservedWord", [
            "reservedWord",
            "identifierName"
          ], text);
        }), (function () {
          return ((this).identifierNameToken).call(this, "identifier", [
            "identifierName"
          ], text, text);
        }));
      })).call(this);
    }));
  }),
  idFirstChar: (function () {
    return (this)._memoize("unnamed_uIUSWhrfKuw6isBAcaKeCQ", (function () {
      return ((this).char).call(this, (Range).inclusive("a", "z"), (Range).inclusive("A", "Z"), "_", "$");
    }));
  }),
  idChar: (function () {
    return (this)._memoize("unnamed_IlywJas0BbMPqSEPvEcp9A", (function () {
      return ((this).char).call(this, (Range).inclusive("a", "z"), (Range).inclusive("A", "Z"), "_", "$", (Range).inclusive("0", "9"));
    }));
  }),
  punctuation: (function () {
    return (this)._memoize("unnamed_iIym8ifHjHLv2bt54NjxPw", (function () {
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
        return ((this).token).call(this, text, [
          "punctuation"
        ]);
      })).call(this);
    }));
  }),
  assignmentOperator: (function () {
    return (this)._memoize("unnamed_4mMElHQ8ErN8jB5sgh770A", (function () {
      var text, t;
      return ((function () {
        (text = (this)._choice((function () {
          (this).stringPatternHandler("=");
          (this)._not((function () {
            return (this).stringPatternHandler("=");
          }));
          return "=";
        }), (function () {
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
        (t = ((this).token).call(this, text, [
          "punctuation",
          "assignmentOperator"
        ]));
        ((t).opname = (text).slice(0, -(1)));
        return t;
      })).call(this);
    }));
  }),
  division: (function () {
    return (this)._memoize("unnamed_WkLvd4ukoCK644DqiP9M/w", (function () {
      var text;
      return ((function () {
        (text = (this)._choice((function () {
          return (this).stringPatternHandler("/=");
        }), (function () {
          return (this).stringPatternHandler("/");
        })));
        return ((this).token).call(this, text, [
          "punctuation",
          "division"
        ]);
      })).call(this);
    }));
  }),
  number: (function () {
    return (this)._memoize("unnamed_/krg4yx84VCYY9T6aBKRsw", (function () {
      return (this)._choice((this).decimal, (this).hexInteger);
    }));
  }),
  decimal: (function () {
    return (this)._memoize("unnamed_mVKqpM583Mk9tPKqWTJDcg", (function () {
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
        return ((this).token).call(this, "number", [
          "decimal"
        ], (parseFloat)(text));
      })).call(this);
    }));
  }),
  integerPart: (function () {
    return (this)._memoize("unnamed_IRyWGmuf/H/CByRrCjUYTQ", (function () {
      return (this)._choice((function () {
        return (this).stringPatternHandler("0");
      }), (function () {
        ((this).char).call(this, (Range).inclusive("1", "9"));
        return (this)._repeat((this).digit);
      }));
    }));
  }),
  exponentPart: (function () {
    return (this)._memoize("unnamed_iLFvxXwTLe7cqUqIaJlC2w", (function () {
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
    return (this)._memoize("unnamed_FqP2ZIr1iDjAQdiMK4yvUw", (function () {
      return ((this).char).call(this, (Range).inclusive("0", "9"));
    }));
  }),
  hexInteger: (function () {
    return (this)._memoize("unnamed_NiPIPYsV6f/yIX4dmMt0Gg", (function () {
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
        return ((this).token).call(this, "number", [
          "hex"
        ], (parseInt)(text, 16));
      })).call(this);
    }));
  }),
  hexDigit: (function () {
    return (this)._memoize("unnamed_SD0xRgidBk6WOE66rOx4Kw", (function () {
      return ((this).char).call(this, (Range).inclusive("0", "9"), (Range).inclusive("a", "f"), (Range).inclusive("A", "F"));
    }));
  }),
  string: (function () {
    return (this)._memoize("unnamed_CwendQZSae85nrq9TBworA", (function () {
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
        return ((this).token).call(this, "string", null, text);
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
    return (this)._memoize("unnamed_pokdfsdPyUzbO00VAzL1dA", (function () {
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
    return (this)._memoize("unnamed_u+WrLqLzcxpnTe6tfgmJ7A", (function () {
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
    return (this)._memoize("unnamed_8HrC6z7QRdqcALuaz9ll1w", (function () {
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
        return ((this).token).call(this, "regex", null, new (RegExp)(pattern, options));
      })).call(this);
    }));
  }),
  regexChar: (function () {
    return (this)._memoize("unnamed_wZzL5MgPWcGYdgirmeJPYA", (function () {
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
    return (this)._memoize("unnamed_gf4QL+GoCBNvDM11Ba4+3g", (function () {
      return ((function () {
        (this).stringPatternHandler("[");
        ((this).regexCharacterClassChar).call(this);
        return (this).stringPatternHandler("]");
      })).call(this);
    }));
  }),
  regexCharacterClassChar: (function () {
    return (this)._memoize("unnamed_PUiIeJaNyHApTDmgXY9org", (function () {
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
    return (this)._memoize("unnamed_iNsgQQGThk9SHre4xLFf1A", (function () {
      return (this)._repeat1((function () {
        return (this)._choice((this).spaces, (this).newline, (this).comment);
      }));
    }));
  }),
  spaces: (function () {
    return (this)._memoize("unnamed_7V5v9fRGDGZ5IUsnvZnunQ", (function () {
      return ((function () {
        (this)._repeat1((function () {
          return ((this).char).call(this, " \t\u000b\f\u0000\u0000\u0000\u0000");
        }));
        return ((this).token).call(this, "spaces", [
          "whitespace"
        ]);
      })).call(this);
    }));
  }),
  newline: (function () {
    return (this)._memoize("unnamed_yGEKpyhLT4VvFEmUVfRarA", (function () {
      return ((function () {
        (this)._choice((function () {
          return (this).stringPatternHandler("\r\n");
        }), (function () {
          return ((this).char).call(this, "\n\r߬߭");
        }));
        return ((this).token).call(this, "newline", [
          "whitespace"
        ]);
      })).call(this);
    }));
  }),
  comment: (function () {
    return (this)._memoize("unnamed_Lfpw28mnmFqC54EaZAD09Q", (function () {
      return ((function () {
        (this)._choice((function () {
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
        return ((this).token).call(this, "comment", [
          "whitespace"
        ]);
      })).call(this);
    }));
  })
}));