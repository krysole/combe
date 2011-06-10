var JSLexer = (require)("./jslexer");
var Token = (require)("./token");
var CombeJSLexer = ((module).exports = ((function () {
  var CombeJSLexer = (__combejs__Class).create(JSLexer, {
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
                return (this)._apply((this).identifierNameToken, "null", [
                  "identifierName"
                ], text, null);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this)._predicate((function () {
                  return (text === "true");
                }));
              }), (function () {
                return (this)._apply((this).identifierNameToken, "true", [
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
                return (this)._apply((this).identifierNameToken, "false", [
                  "boolean",
                  "identifierName"
                ], text, true);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this)._predicate((function () {
                  return ([
                    "class",
                    "match",
                    "rule"
                  ]).include(text);
                }));
              }), (function () {
                return (this)._apply((this).identifierNameToken, text, [
                  "keyword",
                  "reservedWord",
                  "identifierName"
                ], text);
              }));
            }), (function () {
              return (this)._concat((function () {
                return (this)._predicate((function () {
                  return ([
                    "get",
                    "set",
                    "describe"
                  ]).include(text);
                }));
              }), (function () {
                return (this)._apply((this).identifierNameToken, text, [
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
                return (this)._apply((this).identifierNameToken, text, [
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
                return (this)._apply((this).identifierNameToken, "futureReservedWord", [
                  "reservedWord",
                  "identifierName"
                ], text);
              }));
            }), (function () {
              return (this)._apply((this).identifierNameToken, "identifier", [
                "identifierName"
              ], text, text);
            }));
          }));
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
              return (this)._choice("...", "..", "->", "#", "{", "}", "(", ")", "[", "]", ";", ",", (function () {
                return (this)._concat((function () {
                  return (this)._concat(".", (function () {
                    return (this)._not((this).digit);
                  }));
                }), (function () {
                  return ".";
                }));
              }), "<<", ">>>", ">>", "<=", ">=", "<", ">", "===", "!==", "==", "!=", "!", "&&", "||", "&", "|", "++", "--", "+", "-", "*", "%", "~", "?", ":");
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
    }
  });
  return CombeJSLexer;
}))());