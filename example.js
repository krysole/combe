var BaseTextParser = (require)("../combejs/base_text_parser");
var Token = (require)("../combejs/token");
var JSLexer = ((module).exports = ((function () {
  var JSLexer = (__combejs__Class).create(BaseTextParser, {
    emitToken: {
      value: (function (type, tags, value) {
        var endPosition = ((this).input).position;
        var token = new (Token)({
          type: type,
          tags: tags,
          value: value,
          startPosition: (this).tokenStartPosition,
          endPosition: endPosition,
          previousToken: (this).lastToken
        });
        if (!((token).is("whitespace"))) {
          for (var t = (this).lastToken;(t).is("whitespace");(t = (t).previousToken)) {
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
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._optional((this).whitespace);
          }), (function () {
            return (this)._choice((this).identifierName, (this).number, (this).assignmentOperator, (this).punctuation, (this).string, (function () {
              return (this)._concat((function () {
                return (this)._lookahead("/");
              }), (function () {
                return (this)._apply((this).token, "unknown");
              }));
            }));
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
        return (this)._apply((this).char);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    identifierName: {
      value: (function () {
        var text;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (text = (this)._apply((function () {
              return (this)._apply((this).matchedInput, (function () {
                return (this)._concat((this).idFirstChar, (function () {
                  return (this)._repeat((this).idChar);
                }));
              }));
            })));
          }), (function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (this)._predicate((function () {
                  return (text === "null");
                }));
              }), (function () {
                return (this)._apply((this).token, "null", [
                  "identifierName"
                ], null);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this)._predicate((function () {
                  return (text === "true");
                }));
              }), (function () {
                return (this)._apply((this).token, "true", [
                  "boolean",
                  "identifierName"
                ], true);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this)._predicate((function () {
                  return (text === "false");
                }));
              }), (function () {
                return (this)._apply((this).token, "false", [
                  "boolean",
                  "identifierName"
                ], true);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this)._predicate((function () {
                  return (text).isKeyword(text);
                }));
              }), (function () {
                return (this)._apply((this).token, text, [
                  "keyword",
                  "reservedWord",
                  "identifierName"
                ]);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this)._predicate((function () {
                  return (text).isFutureReservedWord(text);
                }));
              }), (function () {
                return (this)._apply((this).token, "futureReservedWord", [
                  "reservedWord",
                  "identifierName"
                ]);
              }));
            }), (function () {
              return (this)._apply((this).extendedIdentifier, text);
            }), (function () {
              return (this)._apply((this).token, "identifier", [
                "identifierName"
              ], text);
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    extendedIdentifier: {
      value: (function (text) {
        return (this)._apply((this).nothing);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    idFirstChar: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._apply((this).char, (__combejs__Range).inclusive("a", "z"), (__combejs__Range).inclusive("A", "Z"), "_", "$");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    idChar: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._apply((this).char, (__combejs__Range).inclusive("a", "z"), (__combejs__Range).inclusive("A", "Z"), "_", "$", (__combejs__Range).inclusive("0", "9"));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    punctuation: {
      value: (function () {
        var text;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (text = (this)._apply((function () {
              return (this)._choice("{", "}", "(", ")", "[", "]", ";", ",", (function () {
                return (this)._concat(".", (function () {
                  return (this)._not((this).digit);
                }));
              }), "<", ">", "<=", ">=", "===", "!==", "==", "!=", "+", "-", "*", "%", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "++", "--", "<<", ">>>", ">>");
            })));
          }), (function () {
            return (this)._apply((this).token, text, [
              "punctuation"
            ]);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    assignmentOperator: {
      value: (function () {
        var text;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (text = (this)._apply((function () {
              return (this)._choice((function () {
                return (this)._concat((function () {
                  return (this)._concat("=", (function () {
                    return (this)._not("=");
                  }));
                }), (function () {
                  return "=";
                }));
              }), "+=", "-=", "*=", "%=", "&=", "|=", "^=", "<<=", ">>>=", ">>=");
            })));
          }), (function () {
            return (this)._apply((this).token, text, [
              "punctuation",
              "assignmentOperator"
            ]);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    division: {
      value: (function () {
        var text;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (text = (this)._apply((function () {
              return (this)._choice("/", "/=");
            })));
          }), (function () {
            return (this)._apply((this).token, text, [
              "punctuation",
              "division"
            ]);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    number: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice((this).decimal, (this).hexInteger);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    decimal: {
      value: (function () {
        var text;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (text = (this)._apply((function () {
              return (this)._apply((this).matchedInput, (function () {
                return (this)._choice((function () {
                  return (this)._concat((this).integerPart, (function () {
                    return (this)._optional((function () {
                      return (this)._concat(".", (function () {
                        return (this)._repeat((this).digit);
                      }));
                    }));
                  }), (function () {
                    return (this)._optional((this).exponentPart);
                  }));
                }), (function () {
                  return (this)._concat(".", (function () {
                    return (this)._repeat1((this).digit);
                  }), (function () {
                    return (this)._optional((this).exponentPart);
                  }));
                }));
              }));
            })));
          }), (function () {
            return (this)._not((this).idChar);
          }), (function () {
            return (this)._apply((this).token, "number", [
              "decimal"
            ], (parseFloat)(text));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    integerPart: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._apply((this).char, (__combejs__Range).inclusive("1", "9"));
          }), (function () {
            return (this)._repeat((this).digit);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    digit: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._apply((this).char, (__combejs__Range).inclusive("0", "9"));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    hexInteger: {
      value: (function () {
        var text;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._choice("0x", "0X");
          }), (function () {
            return (text = (this)._apply((function () {
              return (this)._apply((this).matchedInput, (function () {
                return (this)._repeat1((this).hexDigit);
              }));
            })));
          }), (function () {
            return (this)._not((this).idChar);
          }), (function () {
            return (this)._apply((this).token, "number", [
              "hex"
            ], (parseInt)(text, 16));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    hexDigit: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._apply((this).char, (__combejs__Range).inclusive("0", "9"), (__combejs__Range).inclusive("a", "f"), (__combejs__Range).inclusive("A", "F"));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    string: {
      value: (function () {
        var text;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (text = (this)._apply((function () {
              return (this)._choice((function () {
                return (this)._apply((this).stringHelper, "'");
              }), (function () {
                return (this)._apply((this).stringHelper, "\"");
              }));
            })));
          }), (function () {
            return (this)._apply((this).token, "string", null, text);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    stringHelper: {
      value: (function (quote) {
        var characters;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((this).quote, (function () {
              return (characters = (this)._apply((function () {
                return (this)._repeat((function () {
                  return (this)._concat((function () {
                    return (this)._not((this).quote);
                  }), (this).stringChar);
                }));
              })));
            }), (this).quote);
          }), (function () {
            return (characters).join("");
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    stringChar: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat("\\", (this).stringEscapeSequence);
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("\\", (this).newline);
            }), (function () {
              return "";
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._not((this).newline);
            }), (this).sourceChar);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    stringEscapeSequence: {
      value: (function () {
        var hs;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat("'", (function () {
              return "'";
            }));
          }), (function () {
            return (this)._concat("\"", (function () {
              return "\"";
            }));
          }), (function () {
            return (this)._concat("\\", (function () {
              return "\\";
            }));
          }), (function () {
            return (this)._concat("b", (function () {
              return "\b";
            }));
          }), (function () {
            return (this)._concat("f", (function () {
              return "\f";
            }));
          }), (function () {
            return (this)._concat("n", (function () {
              return "\n";
            }));
          }), (function () {
            return (this)._concat("r", (function () {
              return "\r";
            }));
          }), (function () {
            return (this)._concat("t", (function () {
              return "\t";
            }));
          }), (function () {
            return (this)._concat("v", (function () {
              return "\u000b";
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("0", (function () {
                return (this)._not((this).digit);
              }));
            }), (function () {
              return "\u0000";
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("x", (function () {
                return (hs = (this)._apply((function () {
                  return (this)._apply((this).repeat, (this).hexDigit, 2);
                })));
              }));
            }), (function () {
              return (String).fromCodepoint((hs).join(""));
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("u", (function () {
                return (hs = (this)._apply((function () {
                  return (this)._apply((this).repeat, (this).hexDigit, 4);
                })));
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
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regex: {
      value: (function () {
        var pattern, options;
        return (this)._apply((function () {
          return (this)._concat("/", (function () {
            return (pattern = (this)._apply((function () {
              return (this)._apply((this).matchedInput, (function () {
                return (this)._concat((function () {
                  return (this)._concat((function () {
                    return (this)._not("*");
                  }), (this).regexChar);
                }), (function () {
                  return (this)._repeat((this).regexChar);
                }));
              }));
            })));
          }), "/", (function () {
            return (options = (this)._apply((function () {
              return (this)._apply((this).matchedInput, (function () {
                return (this)._repeat((this).idChar);
              }));
            })));
          }), (function () {
            return (this)._apply((this).token, "regex", null, new (RegExp)(pattern, options));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regexChar: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat("\\", (function () {
              return (this)._not((this).newline);
            }), (this).sourceChar);
          }), (this).regexCharacterClass, (function () {
            return (this)._concat((function () {
              return (this)._not((function () {
                return (this)._choice("/", (this).newline);
              }));
            }), (this).sourceChar);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regexCharacterClass: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._concat("[", (this).regexCharacterClassChar, "]");
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    regexCharacterClassChar: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat("\\", (function () {
              return (this)._not((this).newline);
            }), (this).sourceChar);
          }), (function () {
            return (this)._concat((function () {
              return (this)._not((function () {
                return (this)._choice("]", (this).newline);
              }));
            }), (this).sourceChar);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    whitespace: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._repeat1((function () {
            return (this)._choice((this).spaces, (this).newline, (this).comment);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    spaces: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._repeat((function () {
              return (this)._apply((this).char, " \t\u000b\f\u0000\u0000\u0000\u0000");
            }));
          }), (function () {
            return (this)._apply((this).token, "spaces", [
              "whitespace"
            ]);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    newline: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._choice("\r\n", (function () {
              return (this)._apply((this).char, "\n\r߬߭");
            }));
          }), (function () {
            return (this)._apply((this).token, "newline", [
              "whitespace"
            ]);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    comment: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._choice((function () {
              return (this)._concat("//", (function () {
                return (this)._repeat((function () {
                  return (this)._concat((function () {
                    return (this)._not((this).newline);
                  }), (this).sourceChar);
                }));
              }), (function () {
                return (this)._choice((this).newline, (this).eof);
              }));
            }), (function () {
              return (this)._concat("/*", (function () {
                return (this)._repeat((function () {
                  return (this)._concat((function () {
                    return (this)._not("*/");
                  }), (this).sourceChar);
                }));
              }), "*/");
            }));
          }), (function () {
            return (this)._apply((this).token, "comment", [
              "whitespace"
            ]);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
  return JSLexer;
}))());