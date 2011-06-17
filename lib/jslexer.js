var TextParser = (require)("./text_parser");
var Token = (require)("./token");
var JSLexer = ((module).exports = ((function () {
  var JSLexer = (__combejs__Class).create(TextParser, {
    token: {
      value: (function (type, tags, value) {
        var endPosition = ((this).input).position;
        var token = new (Token)({
          type: type,
          tags: tags,
          value: value,
          startPosition: (this).tokenStartPosition,
          endPosition: endPosition,
          input: (((this).input).current).$string,
          previousToken: (this).lastToken
        });
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
        ((this).tokenStartPosition = endPosition);
        return token;
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    nextToken: {
      value: (function () {
        return (this)._concat((function () {
          return (this)._optional((this).whitespace);
        }), (function () {
          return (this)._choice((this).identifierName, (this).number, (this).assignmentOperator, (this).punctuation, (this).string, (function () {
            return (this)._concat((function () {
              return (this)._lookahead((function () {
                return (this).stringPatternHandler("/");
              }));
            }), (function () {
              return ((this).token).call(this, "unknown");
            }));
          }), (function () {
            return (this)._concat((this).eof, (function () {
              return ((this).token).call(this, "eof");
            }));
          }), (function () {
            throw new (Error)("Not a valid token!");
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    resetToAfterToken: {
      value: (function (token) {
        ((this).lastToken = token);
        ((this).tokenStartPosition = (((this).input).position = (token).endPosition));
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
          ((this).tokenStartPosition = (((this).input).position = 0));
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
        return (this)._concat((function () {
          return (text = ((this).matchedInput).call(this, (function () {
            return (this)._concat((this).idFirstChar, (function () {
              return (this)._repeat((this).idChar);
            }));
          })));
        }), (function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._predicate((function () {
                return (text === "null");
              }));
            }), (function () {
              return ((this).identifierNameToken).call(this, "null", [
                "identifierName"
              ], text, null);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._predicate((function () {
                return (text === "true");
              }));
            }), (function () {
              return ((this).identifierNameToken).call(this, "true", [
                "boolean",
                "identifierName"
              ], text, true);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._predicate((function () {
                return (text === "false");
              }));
            }), (function () {
              return ((this).identifierNameToken).call(this, "false", [
                "boolean",
                "identifierName"
              ], text, true);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._predicate((function () {
                return ([
                  "get",
                  "set",
                  "undefined"
                ]).include(text);
              }));
            }), (function () {
              return ((this).identifierNameToken).call(this, text, [
                "identifier",
                "identifierName"
              ], text);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._predicate((function () {
                return (text).isKeyword(text);
              }));
            }), (function () {
              return ((this).identifierNameToken).call(this, text, [
                "keyword",
                "reservedWord",
                "identifierName"
              ], text);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._predicate((function () {
                return (text).isFutureReservedWord(text);
              }));
            }), (function () {
              return ((this).identifierNameToken).call(this, "futureReservedWord", [
                "reservedWord",
                "identifierName"
              ], text);
            }));
          }), (function () {
            return ((this).identifierNameToken).call(this, "identifier", [
              "identifierName"
            ], text, text);
          }));
        }));
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
        return (this)._concat((function () {
          return (text = (this)._choice((function () {
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
            return (this)._concat((function () {
              return (this)._concat((function () {
                return (this).stringPatternHandler(".");
              }), (function () {
                return (this)._not((this).digit);
              }));
            }), (function () {
              return ".";
            }));
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
        }), (function () {
          return ((this).token).call(this, text, [
            "punctuation"
          ]);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    assignmentOperator: {
      value: (function () {
        var text, t;
        return (this)._concat((function () {
          return (this)._concat((function () {
            return (text = (this)._choice((function () {
              return (this)._concat((function () {
                return (this)._concat((function () {
                  return (this).stringPatternHandler("=");
                }), (function () {
                  return (this)._not((function () {
                    return (this).stringPatternHandler("=");
                  }));
                }));
              }), (function () {
                return "=";
              }));
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
          }), (function () {
            return (t = ((this).token).call(this, text, [
              "punctuation",
              "assignmentOperator"
            ]));
          }), (function () {
            return ((t).opname = (text).slice(0, -(1)));
          }));
        }), (function () {
          return t;
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    division: {
      value: (function () {
        var text;
        return (this)._concat((function () {
          return (text = (this)._choice((function () {
            return (this).stringPatternHandler("/=");
          }), (function () {
            return (this).stringPatternHandler("/");
          })));
        }), (function () {
          return ((this).token).call(this, text, [
            "punctuation",
            "division"
          ]);
        }));
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
        return (this)._concat((function () {
          return (text = ((this).matchedInput).call(this, (function () {
            return (this)._choice((function () {
              return (this)._concat((this).integerPart, (function () {
                return (this)._optional((function () {
                  return (this)._concat((function () {
                    return (this).stringPatternHandler(".");
                  }), (function () {
                    return (this)._repeat((this).digit);
                  }));
                }));
              }), (function () {
                return (this)._optional((this).exponentPart);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this).stringPatternHandler(".");
              }), (function () {
                return (this)._repeat1((this).digit);
              }), (function () {
                return (this)._optional((this).exponentPart);
              }));
            }));
          })));
        }), (function () {
          return (this)._not((this).idChar);
        }), (function () {
          return ((this).token).call(this, "number", [
            "decimal"
          ], (parseFloat)(text));
        }));
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
          return (this)._concat((function () {
            return ((this).char).call(this, (__combejs__Range).inclusive("1", "9"));
          }), (function () {
            return (this)._repeat((this).digit);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    exponentPart: {
      value: (function () {
        return (this)._concat((function () {
          return (this)._choice((function () {
            return (this).stringPatternHandler("e");
          }), (function () {
            return (this).stringPatternHandler("E");
          }));
        }), (function () {
          return (this)._choice((function () {
            return (this).stringPatternHandler("+");
          }), (function () {
            return (this).stringPatternHandler("-");
          }), (this).nothing);
        }), (function () {
          return (this)._repeat1((this).digit);
        }));
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
        return (this)._concat((function () {
          return (this)._choice((function () {
            return (this).stringPatternHandler("0x");
          }), (function () {
            return (this).stringPatternHandler("0X");
          }));
        }), (function () {
          return (text = ((this).matchedInput).call(this, (function () {
            return (this)._repeat1((this).hexDigit);
          })));
        }), (function () {
          return (this)._not((this).idChar);
        }), (function () {
          return ((this).token).call(this, "number", [
            "hex"
          ], (parseInt)(text, 16));
        }));
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
        return (this)._concat((function () {
          return (text = (this)._choice((function () {
            return ((this).stringHelper).call(this, (function () {
              return (this).stringPatternHandler("'");
            }));
          }), (function () {
            return ((this).stringHelper).call(this, (function () {
              return (this).stringPatternHandler("\"");
            }));
          })));
        }), (function () {
          return ((this).token).call(this, "string", null, text);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    stringHelper: {
      value: (function (quote) {
        var characters;
        return (this)._concat((function () {
          return (this)._concat(quote, (function () {
            return (characters = (this)._repeat((function () {
              return (this)._concat((function () {
                return (this)._not(quote);
              }), (this).stringChar);
            })));
          }), quote);
        }), (function () {
          return (characters).join("");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    stringChar: {
      value: (function () {
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("\\");
          }), (this).stringEscapeSequence);
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("\\");
            }), (this).newline);
          }), (function () {
            return "";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._not((this).newline);
          }), (this).sourceChar);
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
          return (this)._concat((function () {
            return (this).stringPatternHandler("'");
          }), (function () {
            return "'";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("\"");
          }), (function () {
            return "\"";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("\\");
          }), (function () {
            return "\\";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("b");
          }), (function () {
            return "\b";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("f");
          }), (function () {
            return "\f";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("n");
          }), (function () {
            return "\n";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("r");
          }), (function () {
            return "\r";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("t");
          }), (function () {
            return "\t";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("v");
          }), (function () {
            return "\u000b";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("0");
            }), (function () {
              return (this)._not((this).digit);
            }));
          }), (function () {
            return "\u0000";
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("x");
            }), (function () {
              return (hs = ((this).repeat).call(this, (this).hexDigit, 2));
            }));
          }), (function () {
            return (String).fromCodepoint((hs).join(""));
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("u");
            }), (function () {
              return (hs = ((this).repeat).call(this, (this).hexDigit, 4));
            }));
          }), (function () {
            return (String).fromCodepoint((hs).join(""));
          }));
        }), (function () {
          return (this)._concat((function () {
            return (this)._not((function () {
              return (this)._choice((this).newline, (this).digit);
            }));
          }), (this).sourceChar);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regex: {
      value: (function () {
        var pattern, options;
        return (this)._concat((function () {
          return (this).stringPatternHandler("/");
        }), (function () {
          return (pattern = ((this).matchedInput).call(this, (function () {
            return (this)._concat((function () {
              return (this)._concat((function () {
                return (this)._not((function () {
                  return (this).stringPatternHandler("*");
                }));
              }), (this).regexChar);
            }), (function () {
              return (this)._repeat((this).regexChar);
            }));
          })));
        }), (function () {
          return (this).stringPatternHandler("/");
        }), (function () {
          return (options = ((this).matchedInput).call(this, (function () {
            return (this)._repeat((this).idChar);
          })));
        }), (function () {
          return ((this).token).call(this, "regex", null, new (RegExp)(pattern, options));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regexChar: {
      value: (function () {
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("\\");
          }), (function () {
            return (this)._not((this).newline);
          }), (this).sourceChar);
        }), (this).regexCharacterClass, (function () {
          return (this)._concat((function () {
            return (this)._not((function () {
              return (this)._choice((function () {
                return (this).stringPatternHandler("/");
              }), (this).newline);
            }));
          }), (this).sourceChar);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regexCharacterClass: {
      value: (function () {
        return (this)._concat((function () {
          return (this).stringPatternHandler("[");
        }), (this).regexCharacterClassChar, (function () {
          return (this).stringPatternHandler("]");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regexCharacterClassChar: {
      value: (function () {
        return (this)._choice((function () {
          return (this)._concat((function () {
            return (this).stringPatternHandler("\\");
          }), (function () {
            return (this)._not((this).newline);
          }), (this).sourceChar);
        }), (function () {
          return (this)._concat((function () {
            return (this)._not((function () {
              return (this)._choice((function () {
                return (this).stringPatternHandler("]");
              }), (this).newline);
            }));
          }), (this).sourceChar);
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
        return (this)._concat((function () {
          return (this)._repeat1((function () {
            return ((this).char).call(this, " \t\u000b\f\u0000\u0000\u0000\u0000");
          }));
        }), (function () {
          return ((this).token).call(this, "spaces", [
            "whitespace"
          ]);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    newline: {
      value: (function () {
        return (this)._concat((function () {
          return (this)._choice((function () {
            return (this).stringPatternHandler("\r\n");
          }), (function () {
            return ((this).char).call(this, "\n\r߬߭");
          }));
        }), (function () {
          return ((this).token).call(this, "newline", [
            "whitespace"
          ]);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    comment: {
      value: (function () {
        return (this)._concat((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("//");
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat((function () {
                  return (this)._not((this).newline);
                }), (this).sourceChar);
              }));
            }), (function () {
              return (this)._choice((this).newline, (this).eof);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this).stringPatternHandler("/*");
            }), (function () {
              return (this)._repeat((function () {
                return (this)._concat((function () {
                  return (this)._not((function () {
                    return (this).stringPatternHandler("*/");
                  }));
                }), (this).sourceChar);
              }));
            }), (function () {
              return (this).stringPatternHandler("*/");
            }));
          }));
        }), (function () {
          return ((this).token).call(this, "comment", [
            "whitespace"
          ]);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
  return JSLexer;
}))());