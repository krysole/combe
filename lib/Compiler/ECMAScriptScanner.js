/*** Preprocessed by combe-0.9.0-bootstrap ***/
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

var TextGrammar = require("../TextGrammar.js");



//
// Scanner rules are based on ECMAScript 6.0 (section 11)
//
// Deviations from the spec are as follows:
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
function ECMAScriptScanner(source, sourcename, skipLength) {
  TextGrammar.call(this, source, sourcename, skipLength);
  
  this.init("enclosedBy", null);
};
ECMAScriptScanner.prototype = Object.create(TextGrammar.prototype);
ECMAScriptScanner.prototype.constructor = ECMAScriptScanner;
module.exports = ECMAScriptScanner;



ECMAScriptScanner.prototype.start = function () {
  return this.memoize.call(this,
    "start_2RZ3ho+mIs8QvMWwEiillg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.repeat.call(this,
              function () {
                return this.fragment.call(this);
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.fragment = function () {
  return this.memoize.call(this,
    "fragment_AxcEVPWTP5M1//+xsnnhgQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.multilineComment.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.singlelineComment.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.spaces.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.newline.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.templateStringComplete.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.templateStringHead.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.templateStringMiddle.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.templateStringTail.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.regularExpressionLiteral.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.stringLiteral.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.numberLiteral.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.nullLiteral.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.booleanLiteral.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.punctuator.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.slice.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.identifierName.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.templateStringComplete = function () {
  return this.memoize.call(this,
    "templateStringComplete_h1q2H7ZS8NHTL+twC0Ve1g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "`");
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.templateCharacter.call(this);
                  }
                );
              },
              function () {
                return this.string.call(this, "`");
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.templateStringHead = function () {
  return this.memoize.call(this,
    "templateStringHead_f0t0mN8+34Fxbv/d9tVI/A",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "`");
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.templateCharacter.call(this);
                  }
                );
              },
              function () {
                return this.lbrace.call(this);
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.templateStringMiddle = function () {
  return this.memoize.call(this,
    "templateStringMiddle_Fng9QbYKIwnk5UGBcGEUyg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.rbrace.call(this);
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.templateCharacter.call(this);
                  }
                );
              },
              function () {
                return this.lbrace.call(this);
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.templateStringTail = function () {
  return this.memoize.call(this,
    "templateStringTail_r1bf2vlviFSDYCByduRvLg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.rbrace.call(this);
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.templateCharacter.call(this);
                  }
                );
              },
              function () {
                return this.string.call(this, "`");
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.lbrace = function () {
  return this.memoize.call(this,
    "lbrace_lZE6LZJhOVCHIhaxks5L9A",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.rbrace = function () {
  return this.memoize.call(this,
    "rbrace_+Iqnn5p/P9eVz6Od0AFjFA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.templateCharacter = function () {
  return this.memoize.call(this,
    "templateCharacter_5kuYZ+MfF49IORb7AZD+Kg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.negate.call(this,
                  function () {
                    return this.newline.call(this);
                  }
                );
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
              this.next
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
              function () {
                return this.escapeSequence.call(this);
              }
            );
          },
          function () {
            return this.newline.call(this);
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "\\");
              },
              function () {
                return this.newline.call(this);
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.regularExpressionLiteral = function () {
  return this.memoize.call(this,
    "regularExpressionLiteral_+7A0rejsTiPndhASeRKC5Q",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "/");
              },
              function () {
                return this.regularExpressionStart.call(this);
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.regularExpressionContinue.call(this);
                  }
                );
              },
              function () {
                return this.string.call(this, "/");
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.regularExpressionFlag.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.regularExpressionStart = function () {
  return this.memoize.call(this,
    "regularExpressionStart_q/J0HwkdJO0EOIozvS0ukw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.negate.call(this,
                  function () {
                    return this.string.call(this, "*");
                  }
                );
              },
              function () {
                return this.regularExpressionContinue.call(this);
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.regularExpressionContinue = function () {
  return this.memoize.call(this,
    "regularExpressionContinue_1fF6/8T4s2msTIRaExvjAQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "\\");
              },
              this.next
            );
          },
          function () {
            return this.regularExpressionClass.call(this);
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
                return this.negate.call(this,
                  function () {
                    return this.newline.call(this);
                  }
                );
              },
              function () {
                return this.negate.call(this,
                  function () {
                    return this.space.call(this);
                  }
                );
              },
              this.next
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.regularExpressionClass = function () {
  return this.memoize.call(this,
    "regularExpressionClass_7x2MwWeCoKWeMwcQgflqlg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
                return this.negate.call(this,
                  function () {
                    return this.newline.call(this);
                  }
                );
              },
              this.next
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "\\");
              },
              this.next
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.regularExpressionFlag = function () {
  return this.memoize.call(this,
    "regularExpressionFlag_uWBoxyJQvYKgyQJXurDxuw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
                return this.idContinue.call(this);
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.stringLiteral = function () {
  return this.memoize.call(this,
    "stringLiteral_5lvQmaxX/5eu0GzqAYAFkg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
                        return this.choice.call(this,
                          function () {
                            return this.string.call(this, "\"");
                          }
                        );
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
                        return this.choice.call(this,
                          function () {
                            return this.string.call(this, "\'");
                          }
                        );
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.stringCharacter = function (terminator) {
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = function () {
    return this.choice.call(this,
      function () {
        return this.sequence.call(this,
          function () {
            return this.negate.call(this,
              function () {
                return (terminator);
              }.call(this)
            );
          },
          function () {
            return this.negate.call(this,
              function () {
                return this.newline.call(this);
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
          this.next
        );
      },
      function () {
        return this.sequence.call(this,
          function () {
            return this.string.call(this, "\\");
          },
          function () {
            return this.escapeSequence.call(this);
          }
        );
      },
      function () {
        return this.sequence.call(this,
          function () {
            return this.string.call(this, "\\");
          },
          function () {
            return this.newline.call(this);
          }
        );
      }
    );
  }.call(this);
  this.popStartPosition.call(this);
  return __result;
};

ECMAScriptScanner.prototype.escapeSequence = function () {
  return this.memoize.call(this,
    "escapeSequence_dZjMC0em4/yjliKfsQ5N3A",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
                return this.negate.call(this,
                  function () {
                    return this.digit.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "x");
              },
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "u");
              },
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              }
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
                return this.repeat1.call(this,
                  function () {
                    return this.hex.call(this);
                  }
                );
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
                return this.negate.call(this,
                  function () {
                    return this.newline.call(this);
                  }
                );
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
              this.next
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.numberLiteral = function () {
  return this.memoize.call(this,
    "numberLiteral_gAtlnLzqITIlWaNlK5J5Ow",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.decimalLiteral.call(this);
              },
              function () {
                return this.negate.call(this,
                  function () {
                    return this.idContinue.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.binaryIntegerLiteral.call(this);
              },
              function () {
                return this.negate.call(this,
                  function () {
                    return this.idContinue.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.octalIntegerLiteral.call(this);
              },
              function () {
                return this.negate.call(this,
                  function () {
                    return this.idContinue.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.hexIntegerLiteral.call(this);
              },
              function () {
                return this.negate.call(this,
                  function () {
                    return this.idContinue.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.decimalLiteral = function () {
  return this.memoize.call(this,
    "decimalLiteral_13Pqe23Kw4DZRd7M1FCHCA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.decimalIntegerLiteral.call(this);
              },
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
                            return this.repeat1.call(this,
                              function () {
                                return this.digit.call(this);
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.optional.call(this,
                  function () {
                    return this.exponent.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, ".");
              },
              function () {
                return this.repeat1.call(this,
                  function () {
                    return this.digit.call(this);
                  }
                );
              },
              function () {
                return this.optional.call(this,
                  function () {
                    return this.exponent.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.decimalIntegerLiteral = function () {
  return this.memoize.call(this,
    "decimalIntegerLiteral_5cF+bZDpQMpbr83TzgcLPA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.string.call(this, "0");
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.char.call(this, ["1", "9"]);
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.digit.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.exponent = function () {
  return this.memoize.call(this,
    "exponent_tdHGSPO4EGB1yOPRRIJPVA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
                return this.repeat1.call(this,
                  function () {
                    return this.digit.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.binaryIntegerLiteral = function () {
  return this.memoize.call(this,
    "binaryIntegerLiteral_4aByRhk1b9RsbNSfXELjgw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "0");
              },
              function () {
                return this.choice.call(this,
                  function () {
                    return this.string.call(this, "b");
                  },
                  function () {
                    return this.string.call(this, "B");
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.octalIntegerLiteral = function () {
  return this.memoize.call(this,
    "octalIntegerLiteral_/gBknqLAc3vUTk6vOdAUHQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "0");
              },
              function () {
                return this.choice.call(this,
                  function () {
                    return this.string.call(this, "o");
                  },
                  function () {
                    return this.string.call(this, "O");
                  }
                );
              },
              function () {
                return this.repeat1.call(this,
                  function () {
                    return this.octal.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.hexIntegerLiteral = function () {
  return this.memoize.call(this,
    "hexIntegerLiteral_GH3hIf6awwtmL7E8O/Cfcw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "0");
              },
              function () {
                return this.choice.call(this,
                  function () {
                    return this.string.call(this, "x");
                  },
                  function () {
                    return this.string.call(this, "X");
                  }
                );
              },
              function () {
                return this.repeat1.call(this,
                  function () {
                    return this.hex.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.nullLiteral = function () {
  return this.memoize.call(this,
    "nullLiteral_3CiRlw+0MeXX+9fMaX488g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "null");
              },
              function () {
                return this.negate.call(this,
                  function () {
                    return this.idContinue.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.booleanLiteral = function () {
  return this.memoize.call(this,
    "booleanLiteral_luAW2UnHJvtu0YpeY2SHtA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "true");
              },
              function () {
                return this.negate.call(this,
                  function () {
                    return this.idContinue.call(this);
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "false");
              },
              function () {
                return this.negate.call(this,
                  function () {
                    return this.idContinue.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.punctuator = function () {
  return this.memoize.call(this,
    "punctuator_H2T6z5ueDJ4SUgyhETilOA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.openPunctuator.call(this);
          },
          function () {
            return this.closePunctuator.call(this);
          },
          function () {
            return this.basicPunctuator.call(this);
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.openPunctuator = function () {
  return this.memoize.call(this,
    "openPunctuator_Hpr57qG6XqhKmi2fEC7RRg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.closePunctuator = function () {
  return this.memoize.call(this,
    "closePunctuator_PnepHEeM+ZgZ6QzUdl4H3A",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.basicPunctuator = function () {
  return this.memoize.call(this,
    "basicPunctuator_FIa7NDbX6Y9A0h+y6X6jHg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
            return this.string.call(this, "@");
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.identifierName = function () {
  return this.memoize.call(this,
    "identifierName_z1ODcD7AhECFeTCLUos15Q",
    function () {
      var c;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return c = function () {
                  return this.idStart.call(this);
                }.call(this);
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.idContinue.call(this);
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.idStart = function () {
  return this.memoize.call(this,
    "idStart_MxSXq1735X8XCYM6mPrA5g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              }
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
                return this.repeat1.call(this,
                  function () {
                    return this.hex.call(this);
                  }
                );
              },
              function () {
                return this.string.call(this, "}");
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.idContinue = function () {
  return this.memoize.call(this,
    "idContinue_sVJSNOZOiyts3fj9scnlRA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              },
              function () {
                return this.hex.call(this);
              }
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
                return this.repeat1.call(this,
                  function () {
                    return this.hex.call(this);
                  }
                );
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.multilineComment = function () {
  return this.memoize.call(this,
    "multilineComment_WZYSe3CvnE8io1tw73pfKg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
                          this.next
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.singlelineComment = function () {
  return this.memoize.call(this,
    "singlelineComment_JUcUScihwGAO4/xX0BFOcA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
                            return this.negate.call(this,
                              function () {
                                return this.newline.call(this);
                              }
                            );
                          },
                          this.next
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.spaces = function () {
  return this.memoize.call(this,
    "spaces_LB9xJdCe6WCSxomWAVIItA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.repeat1.call(this,
              function () {
                return this.space.call(this);
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
}
ECMAScriptScanner.prototype.space = function () {
  return this.memoize.call(this,
    "space_mId6TXyzec43OlK5FiUN4w",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
          function () {
            return this.Zs.call(this);
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};
ECMAScriptScanner.prototype.Zs = function () {
  return this.memoize.call(this,
    "Zs_pS1Eic9yJ0nbl8rhffLNfA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.fail.call(this);
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
}



ECMAScriptScanner.prototype.newline = function () {
  return this.memoize.call(this,
    "newline_8wI5dCmPX994uCmFMBz12g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "\u000d");
              },
              function () {
                return this.string.call(this, "\u000a");
              }
            );
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};
