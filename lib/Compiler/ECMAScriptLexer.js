/*** Preprocessed by combe-0.9.0 ***/
//
// Combe - A Parsing Extension for JavaScript
//
// Copyright 2015 Lorenz Pretterhofer <krysole@alexicalmistake.com>
//
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
"use strict";

var LexerGrammar = require("../LexerGrammar.js");



//
// Token rules are based on ECMAScript 6.0 (section 11)
//
// Deviations to the spec are as follows:
//
//  - Regexes 'steal' all valid parses from punctuator, so some valid 
//    uses of '/' (divide) will instead parse as regexes if they form 
//    a valid regex token. Whitespace should be used to disambiguate uses 
//    of '/' (divide) where necessary.
//
//  - We don't support spaces in regular expression literals. They must 
//    be escaped instead.
//
//  - No support for semicolon insertion is provided, since it's too 
//    pointless and complicated to implement anyway, and it requires full
//    syntactic level contextualization.
//
//  - Only token text is recognized, no value processing or further static
//    checking is performed.
//
//  - We don't define the reserved words here.
//
function ECMAScriptLexer(source, sourcename, skipLength) {
  LexerGrammar.call(this, source, sourcename, skipLength);
  
  this.init("enclosedBy", null);
};
ECMAScriptLexer.prototype = Object.create(LexerGrammar.prototype);
ECMAScriptLexer.prototype.constructor = ECMAScriptLexer;
module.exports = ECMAScriptLexer;



ECMAScriptLexer.prototype.token = function () {
  return this.memoize.call(this,
    "token_SdvF4hzm/m32ZF0qMZSwmw",
    function () {
      var text;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.multilineComment);
            },
            function () {
              return this.emit.call(this, "MultilineComment",       null);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.singlelineComment);
            },
            function () {
              return this.emit.call(this, "SinglelineComment",      null);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.spaces);
            },
            function () {
              return this.emit.call(this, "Spaces",                 null);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.newline);
            },
            function () {
              return this.emit.call(this, "Newline",                null);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.templateStringComplete);
            },
            function () {
              return this.emit.call(this, "TemplateStringComplete", null);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.templateStringHead);
            },
            function () {
              return this.emit.call(this, "TemplateStringHead",     null);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.templateStringMiddle);
            },
            function () {
              return this.emit.call(this, "TemplateStringMiddle",   null);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.templateStringTail);
            },
            function () {
              return this.emit.call(this, "TemplateStringTail",     null);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.regularExpressionLiteral);
            },
            function () {
              return this.emit.call(this, "RegularExpression",      eval(text));
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.stringLiteral);
            },
            function () {
              return this.emit.call(this, "String",                 eval(text));
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.numberLiteral);
            },
            function () {
              return this.emit.call(this, "Number",                 eval(text));
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.nullLiteral);
            },
            function () {
              return this.emit.call(this, "Null",                   eval(text));
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.booleanLiteral);
            },
            function () {
              return this.emit.call(this, "Boolean",                eval(text));
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.punctuator);
            },
            function () {
              return this.emit.call(this, "Punctuator",             null);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return text = this.slice.call(this, this.identifierName);
            },
            function () {
              return this.emit.call(this, "IdentifierName",         null);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.templateStringComplete = function () {
  return this.memoize.call(this,
    "templateStringComplete_81EmNBem8GfefBVKwx0KCw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "`");
            },
            function () {
              return this.repeat.call(this, this.templateCharacter);
            },
            function () {
              return this.string.call(this, "`");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.templateStringHead = function () {
  return this.memoize.call(this,
    "templateStringHead_0biFFK9mqVQCCKAMsjbjsA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "`");
            },
            function () {
              return this.repeat.call(this, this.templateCharacter);
            },
            this.lbrace
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.templateStringMiddle = function () {
  return this.memoize.call(this,
    "templateStringMiddle_TS2Gdzh1uXy9Am930QvYGA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            this.rbrace,
            function () {
              return this.repeat.call(this, this.templateCharacter);
            },
            this.lbrace
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.templateStringTail = function () {
  return this.memoize.call(this,
    "templateStringTail_0kgsiZijoxW6uhlEnJUcGw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            this.rbrace,
            function () {
              return this.repeat.call(this, this.templateCharacter);
            },
            function () {
              return this.string.call(this, "`");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.lbrace = function () {
  return this.memoize.call(this,
    "lbrace_gslOA+//cyQGowM3mXlVIQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "${");
            },
            function () {
              return this.push.call(this, "enclosedBy", "${");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.rbrace = function () {
  return this.memoize.call(this,
    "rbrace_GD6tHhLITxRwYLtrWdKqKw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.predicate.call(this,
                function () {
                  return (this.get("enclosedBy") === "${");
                }
              );
            },
            function () {
              return this.string.call(this, "}");
            },
            function () {
              return this.pop.call(this, "enclosedBy");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.templateCharacter = function () {
  return this.memoize.call(this,
    "templateCharacter_lefYlxVIuSwhUa0ZTZ7gNg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.negate.call(this, this.newline);
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "$");
                }
              );
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "\\");
                }
              );
            },
            this.char
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "$");
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "{");
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\\");
            },
            this.escapeSequence
          );
        },
        this.newline,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\\");
            },
            this.newline
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.regularExpressionLiteral = function () {
  return this.memoize.call(this,
    "regularExpressionLiteral_nfiniiJZ9c5IftrWYJCApw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "/");
            },
            this.regularExpressionStart,
            function () {
              return this.repeat.call(this, this.regularExpressionContinue);
            },
            function () {
              return this.string.call(this, "/");
            },
            function () {
              return this.repeat.call(this, this.regularExpressionFlag);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionStart = function () {
  return this.memoize.call(this,
    "regularExpressionStart_+np5334aVekUwT6Uv/7cTQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "*");
                }
              );
            },
            this.regularExpressionContinue
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionContinue = function () {
  return this.memoize.call(this,
    "regularExpressionContinue_pILL0vk2T5QBBLLQInvBlA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\\");
            },
            this.char
          );
        },
        this.regularExpressionClass,
        function () {
          return this.sequence.call(this,
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "\\");
                }
              );
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "/");
                }
              );
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "[");
                }
              );
            },
            function () {
              return this.negate.call(this, this.newline);
            },
            function () {
              return this.negate.call(this, this.space);
            },
            this.char
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionClass = function () {
  return this.memoize.call(this,
    "regularExpressionClass_Ye60XW7RXu+J36/efOun/Q",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "]");
                }
              );
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "\\");
                }
              );
            },
            function () {
              return this.negate.call(this, this.newline);
            },
            this.char
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\\");
            },
            this.char
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionFlag = function () {
  return this.memoize.call(this,
    "regularExpressionFlag_n42D/vCz54tvm4BTT1Kqcw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "\\");
                }
              );
            },
            this.idContinue
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.stringLiteral = function () {
  return this.memoize.call(this,
    "stringLiteral_Fy1HgUeHZFjgJxw4Nrn60w",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\"");
            },
            function () {
              return this.repeat.call(this,
                function () {
                  return this.stringCharacter.call(this,
                    function () {
                      return this.string.call(this, "\"");
                    }
                  );
                }
              );
            },
            function () {
              return this.string.call(this, "\"");
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\'");
            },
            function () {
              return this.repeat.call(this,
                function () {
                  return this.stringCharacter.call(this,
                    function () {
                      return this.string.call(this, "\'");
                    }
                  );
                }
              );
            },
            function () {
              return this.string.call(this, "\'");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.stringCharacter = function (terminator) {
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.sequence.call(this,
        function () {
          return this.negate.call(this, terminator);
        },
        function () {
          return this.negate.call(this, this.newline);
        },
        function () {
          return this.negate.call(this,
            function () {
              return this.string.call(this, "\\");
            }
          );
        },
        this.char
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.string.call(this, "\\");
        },
        this.escapeSequence
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.string.call(this, "\\");
        },
        this.newline
      );
    }
  );
  this.popStartPosition.call(this);
  return __result;
};

ECMAScriptLexer.prototype.escapeSequence = function () {
  return this.memoize.call(this,
    "escapeSequence_GhH/TZ8sMUdjzCHmEK2Lzg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.string.call(this, "\'");
        },
        function () {
          return this.string.call(this, "\"");
        },
        function () {
          return this.string.call(this, "\\");
        },
        function () {
          return this.string.call(this, "b");
        },
        function () {
          return this.string.call(this, "f");
        },
        function () {
          return this.string.call(this, "n");
        },
        function () {
          return this.string.call(this, "r");
        },
        function () {
          return this.string.call(this, "t");
        },
        function () {
          return this.string.call(this, "v");
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "0");
            },
            function () {
              return this.negate.call(this, this.digit);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "x");
            },
            this.hex,
            this.hex
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "u");
            },
            this.hex,
            this.hex,
            this.hex,
            this.hex
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "u");
            },
            function () {
              return this.string.call(this, "{");
            },
            function () {
              return this.repeat1.call(this, this.hex);
            },
            function () {
              return this.string.call(this, "}");
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "\\");
                }
              );
            },
            function () {
              return this.negate.call(this, this.newline);
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.char.call(this, "\'\"\\bfnrtv");
                }
              );
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "x");
                }
              );
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.string.call(this, "u");
                }
              );
            },
            this.char
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.numberLiteral = function () {
  return this.memoize.call(this,
    "numberLiteral_F66wPAaPhn+Kk/B3eXnvTQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            this.decimalLiteral,
            function () {
              return this.negate.call(this, this.idContinue);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            this.binaryIntegerLiteral,
            function () {
              return this.negate.call(this, this.idContinue);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            this.octalIntegerLiteral,
            function () {
              return this.negate.call(this, this.idContinue);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            this.hexIntegerLiteral,
            function () {
              return this.negate.call(this, this.idContinue);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.decimalLiteral = function () {
  return this.memoize.call(this,
    "decimalLiteral_CvM7v2uo7BUJz/OI55d2mg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            this.decimalIntegerLiteral,
            function () {
              return this.optional.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, ".");
                        },
                        function () {
                          return this.repeat1.call(this, this.digit);
                        }
                      );
                    }
                  );
                }
              );
            },
            function () {
              return this.optional.call(this, this.exponent);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, ".");
            },
            function () {
              return this.repeat1.call(this, this.digit);
            },
            function () {
              return this.optional.call(this, this.exponent);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.decimalIntegerLiteral = function () {
  return this.memoize.call(this,
    "decimalIntegerLiteral_UE2VkqDN9AobpKsdkr11+g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.string.call(this, "0");
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.char.call(this, ["1", "9"]);
            },
            function () {
              return this.repeat.call(this, this.digit);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.exponent = function () {
  return this.memoize.call(this,
    "exponent_QrHNXR1YWLHSaZPjdqx2TQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.string.call(this, "e");
                },
                function () {
                  return this.string.call(this, "E");
                }
              );
            },
            function () {
              return this.choice.call(this,
                function () {
                  return this.string.call(this, "+");
                },
                function () {
                  return this.string.call(this, "-");
                },
                this.pass
              );
            },
            function () {
              return this.repeat1.call(this, this.digit);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.binaryIntegerLiteral = function () {
  return this.memoize.call(this,
    "binaryIntegerLiteral_WZvagT91yJlZfHfdwsz1nw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.string.call(this, "0b");
                },
                function () {
                  return this.string.call(this, "0B");
                }
              );
            },
            function () {
              return this.repeat1.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.string.call(this, "0");
                    },
                    function () {
                      return this.string.call(this, "1");
                    }
                  );
                }
              );
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.octalIntegerLiteral = function () {
  return this.memoize.call(this,
    "octalIntegerLiteral_+gjt317/tEtXQm2+SQlIHA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.string.call(this, "0o");
                },
                function () {
                  return this.string.call(this, "0O");
                }
              );
            },
            function () {
              return this.repeat1.call(this, this.octal);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.hexIntegerLiteral = function () {
  return this.memoize.call(this,
    "hexIntegerLiteral_1JEjb3rEOp+RprJ6GMzrFQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.string.call(this, "0x");
                },
                function () {
                  return this.string.call(this, "0X");
                }
              );
            },
            function () {
              return this.repeat1.call(this, this.hex);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.nullLiteral = function () {
  return this.memoize.call(this,
    "nullLiteral_KQme418O4u/t/i0bZbkUGw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "null");
            },
            function () {
              return this.negate.call(this, this.idContinue);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.booleanLiteral = function () {
  return this.memoize.call(this,
    "booleanLiteral_Q7PjLLhCoN+wg0cEXLYV7g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "true");
            },
            function () {
              return this.negate.call(this, this.idContinue);
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "false");
            },
            function () {
              return this.negate.call(this, this.idContinue);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.punctuator = function () {
  return this.memoize.call(this,
    "punctuator_cspiPs2RIsgf6DNAooYsGA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this, this.openPunctuator, this.closePunctuator, this.basicPunctuator);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.openPunctuator = function () {
  return this.memoize.call(this,
    "openPunctuator_uJg7u+iISp6QUxIrM4Qu9g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "{");
            },
            function () {
              return this.push.call(this, "enclosedBy", "{");
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "(");
            },
            function () {
              return this.push.call(this, "enclosedBy", "(");
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "[");
            },
            function () {
              return this.push.call(this, "enclosedBy", "[");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.closePunctuator = function () {
  return this.memoize.call(this,
    "closePunctuator_46fmpQM8g5cdv9m7Cu6WAQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.predicate.call(this,
                function () {
                  return (this.get("enclosedBy") === "{");
                }
              );
            },
            function () {
              return this.string.call(this, "}");
            },
            function () {
              return this.pop.call(this, "enclosedBy");
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.predicate.call(this,
                function () {
                  return (this.get("enclosedBy") === "(");
                }
              );
            },
            function () {
              return this.string.call(this, ")");
            },
            function () {
              return this.pop.call(this, "enclosedBy");
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.predicate.call(this,
                function () {
                  return (this.get("enclosedBy") === "[");
                }
              );
            },
            function () {
              return this.string.call(this, "]");
            },
            function () {
              return this.pop.call(this, "enclosedBy");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.basicPunctuator = function () {
  return this.memoize.call(this,
    "basicPunctuator_rtWyHKjcckvJOKeg55Rezw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.string.call(this, "...");
        },
        function () {
          return this.string.call(this, ".");
        },
        function () {
          return this.string.call(this, "?");
        },
        function () {
          return this.string.call(this, ":");
        },
        function () {
          return this.string.call(this, ";");
        },
        function () {
          return this.string.call(this, ",");
        },
        function () {
          return this.string.call(this, "<<=");
        },
        function () {
          return this.string.call(this, ">>=");
        },
        function () {
          return this.string.call(this, ">>>=");
        },
        function () {
          return this.string.call(this, "=>");
        },
        function () {
          return this.string.call(this, "===");
        },
        function () {
          return this.string.call(this, "!==");
        },
        function () {
          return this.string.call(this, "==");
        },
        function () {
          return this.string.call(this, "!=");
        },
        function () {
          return this.string.call(this, "!");
        },
        function () {
          return this.string.call(this, "=");
        },
        function () {
          return this.string.call(this, "~");
        },
        function () {
          return this.string.call(this, "<<");
        },
        function () {
          return this.string.call(this, ">>");
        },
        function () {
          return this.string.call(this, ">>>");
        },
        function () {
          return this.string.call(this, "<=");
        },
        function () {
          return this.string.call(this, ">=");
        },
        function () {
          return this.string.call(this, "<");
        },
        function () {
          return this.string.call(this, ">");
        },
        function () {
          return this.string.call(this, "++");
        },
        function () {
          return this.string.call(this, "--");
        },
        function () {
          return this.string.call(this, "+=");
        },
        function () {
          return this.string.call(this, "-=");
        },
        function () {
          return this.string.call(this, "*=");
        },
        function () {
          return this.string.call(this, "/=");
        },
        function () {
          return this.string.call(this, "%=");
        },
        function () {
          return this.string.call(this, "+");
        },
        function () {
          return this.string.call(this, "-");
        },
        function () {
          return this.string.call(this, "*");
        },
        function () {
          return this.string.call(this, "/");
        },
        function () {
          return this.string.call(this, "%");
        },
        function () {
          return this.string.call(this, "||");
        },
        function () {
          return this.string.call(this, "&&");
        },
        function () {
          return this.string.call(this, "|=");
        },
        function () {
          return this.string.call(this, "^=");
        },
        function () {
          return this.string.call(this, "&=");
        },
        function () {
          return this.string.call(this, "|");
        },
        function () {
          return this.string.call(this, "^");
        },
        function () {
          return this.string.call(this, "&");
        },
        function () {
          return this.string.call(this, "#");
        },
        function () {
          return this.string.call(this, "@@");
        },
        function () {
          return this.string.call(this, "@");
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.identifierName = function () {
  return this.memoize.call(this,
    "identifierName_NQmT3uMInR1strgCjoNaUA",
    function () {
      var c;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return c = this.idStart.call(this);
            },
            function () {
              return this.repeat.call(this, this.idContinue);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.idStart = function () {
  return this.memoize.call(this,
    "idStart_MRVZVK5oNc2NfC7mE2wBFg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.char.call(this, ["a", "z"], ["A", "Z"]);
        },
        function () {
          return this.string.call(this, "$");
        },
        function () {
          return this.string.call(this, "_");
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\\");
            },
            function () {
              return this.string.call(this, "u");
            },
            this.hex,
            this.hex,
            this.hex,
            this.hex
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\\");
            },
            function () {
              return this.string.call(this, "u");
            },
            function () {
              return this.string.call(this, "{");
            },
            function () {
              return this.repeat1.call(this, this.hex);
            },
            function () {
              return this.string.call(this, "}");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.idContinue = function () {
  return this.memoize.call(this,
    "idContinue_kaIRxWJzLk6maSum+Tj1qg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.char.call(this, ["a", "z"], ["A", "Z"], ["0", "9"]);
        },
        function () {
          return this.string.call(this, "$");
        },
        function () {
          return this.string.call(this, "_");
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\\");
            },
            function () {
              return this.string.call(this, "u");
            },
            this.hex,
            this.hex,
            this.hex,
            this.hex
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "\\");
            },
            function () {
              return this.string.call(this, "u");
            },
            function () {
              return this.string.call(this, "{");
            },
            function () {
              return this.repeat1.call(this, this.hex);
            },
            function () {
              return this.string.call(this, "}");
            }
          );
        },
        function () {
          return this.string.call(this, "\u200c");
        },
        function () {
          return this.string.call(this, "\u200d");
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.multilineComment = function () {
  return this.memoize.call(this,
    "multilineComment_eTpHYDs0LcW0+iErbD7aig",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "/*");
            },
            function () {
              return this.repeat.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.negate.call(this,
                            function () {
                              return this.string.call(this, "*/");
                            }
                          );
                        },
                        this.char
                      );
                    }
                  );
                }
              );
            },
            function () {
              return this.string.call(this, "*/");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptLexer.prototype.singlelineComment = function () {
  return this.memoize.call(this,
    "singlelineComment_DQVZuXU89ish4bt6lo3ToA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.string.call(this, "//");
            },
            function () {
              return this.repeat.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.negate.call(this, this.newline);
                        },
                        this.char
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptLexer.prototype.spaces = function () {
  return this.memoize.call(this,
    "spaces_+ViNvOT8Ti91Y06oTUyh9g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.repeat1.call(this, this.space);
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
}
ECMAScriptLexer.prototype.space = function () {
  return this.memoize.call(this,
    "space_T0NDvEmHbj7mVcNdbzLFOQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.string.call(this, "\u0009");
        },
        function () {
          return this.string.call(this, "\u000b");
        },
        function () {
          return this.string.call(this, "\u000c");
        },
        function () {
          return this.string.call(this, "\u0020");
        },
        function () {
          return this.string.call(this, "\u00a0");
        },
        function () {
          return this.string.call(this, "\ufeff");
        },
        this.Zs
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};
ECMAScriptLexer.prototype.Zs = function () {
  return this.memoize.call(this,
    "Zs_WrZMWI49MmMcJTlssfi+bw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this, this.fail);
      this.popStartPosition.call(this);
      return __result;
    }
  );
}



ECMAScriptLexer.prototype.newline = function () {
  return this.memoize.call(this,
    "newline_FgwoUd4DOOmGpchPjG8FdA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.string.call(this, "\u000d\u000a");
        },
        function () {
          return this.string.call(this, "\u000a");
        },
        function () {
          return this.string.call(this, "\u000d");
        },
        function () {
          return this.string.call(this, "\u2028");
        },
        function () {
          return this.string.call(this, "\u2029");
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};
