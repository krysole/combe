var TextParser = (require)("./text_parser");
var Token = (require)("./token");
var JSLexer = ((module).exports = ((function () {
  var JSLexer = (__combejs__Class).create(TextParser, {
    token: {
      value: (function (type, tags, value) {
        var token = new (Token)(type, tags, value);
        ((token).startPosition = (this).tokenStartPosition);
        ((token).endPosition = (this).position);
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
        ((this).tokenStartPosition = (this).position);
        return token;
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    nextToken: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    resetToAfterToken: {
      value: (function (token) {
        ((this).lastToken = token);
        ((this).tokenStartPosition = ((this).position = (token).endPosition));
        ((token).nextToken = null);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    resetToBeforeToken: {
      value: (function (token) {
        if ((token).previousToken) {
          (this).resetToAfterToken((token).previousToken);
        } else {
          ((this).lastToken = null);
          ((this).tokenStartPosition = ((this).position = 0));
        }
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    sourceChar: {
      value: (function () {
        return ((this).char).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    identifierNameToken: {
      value: (function (type, tags, name, value) {
        var token = (this).token(type, tags, value);
        ((token).identifierName = name);
        return token;
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    identifierName: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    idFirstChar: {
      value: (function () {
        return ((this).char).call(this, (__combejs__Range).inclusive("a", "z"), (__combejs__Range).inclusive("A", "Z"), "_", "$");
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    idChar: {
      value: (function () {
        return ((this).char).call(this, (__combejs__Range).inclusive("a", "z"), (__combejs__Range).inclusive("A", "Z"), "_", "$", (__combejs__Range).inclusive("0", "9"));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    punctuation: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    assignmentOperator: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    division: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    number: {
      value: (function () {
        return (this)._choice((this).decimal, (this).hexInteger);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    decimal: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    integerPart: {
      value: (function () {
        return (this)._choice((function () {
          return (this).stringPatternHandler("0");
        }), (function () {
          ((this).char).call(this, (__combejs__Range).inclusive("1", "9"));
          return (this)._repeat((this).digit);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    exponentPart: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    digit: {
      value: (function () {
        return ((this).char).call(this, (__combejs__Range).inclusive("0", "9"));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    hexInteger: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    hexDigit: {
      value: (function () {
        return ((this).char).call(this, (__combejs__Range).inclusive("0", "9"), (__combejs__Range).inclusive("a", "f"), (__combejs__Range).inclusive("A", "F"));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    string: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    stringHelper: {
      value: (function (quote) {
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
      writable: true,
      enumerable: true,
      configurable: true
    },
    stringChar: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    stringEscapeSequence: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regex: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regexChar: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regexCharacterClass: {
      value: (function () {
        return ((function () {
          (this).stringPatternHandler("[");
          ((this).regexCharacterClassChar).call(this);
          return (this).stringPatternHandler("]");
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regexCharacterClassChar: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    whitespace: {
      value: (function () {
        return (this)._repeat1((function () {
          return (this)._choice((this).spaces, (this).newline, (this).comment);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    spaces: {
      value: (function () {
        return ((function () {
          (this)._repeat1((function () {
            return ((this).char).call(this, " \t\u000b\f\u0000\u0000\u0000\u0000");
          }));
          return ((this).token).call(this, "spaces", [
            "whitespace"
          ]);
        })).call(this);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    newline: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    comment: {
      value: (function () {
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
      }),
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
  return JSLexer;
}))());