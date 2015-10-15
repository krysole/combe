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



ECMAScriptScanner.prototype.start = /*rule*/ function () {
  return this.memoize("start_hLfOLm6CnV5P6LVtvmZVQQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.repeat(
        this.fragment
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.fragment = /*rule*/ function () {
  return this.memoize("fragment_UrgkGOLLCkX/uhXKgUCEbw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          return this.slice(
            this.multilineComment
          );
        },
        function () {
          return this.slice(
            this.singlelineComment
          );
        },
        function () {
          return this.slice(
            this.spaces
          );
        },
        function () {
          return this.slice(
            this.newline
          );
        },
        function () {
          return this.slice(
            this.templateStringComplete
          );
        },
        function () {
          return this.slice(
            this.templateStringHead
          );
        },
        function () {
          return this.slice(
            this.templateStringMiddle
          );
        },
        function () {
          return this.slice(
            this.templateStringTail
          );
        },
        function () {
          return this.slice(
            this.regularExpressionLiteral
          );
        },
        function () {
          return this.slice(
            this.stringLiteral
          );
        },
        function () {
          return this.slice(
            this.numberLiteral
          );
        },
        function () {
          return this.slice(
            this.nullLiteral
          );
        },
        function () {
          return this.slice(
            this.booleanLiteral
          );
        },
        function () {
          return this.slice(
            this.punctuator
          );
        },
        function () {
          return this.slice(
            this.identifierName
          );
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.templateStringComplete = /*rule*/ function () {
  return this.memoize("templateStringComplete_YtHRNpXlM2FHpUYK6Xy+YA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("`"); }).call(this);
      (function () {
        return this.repeat(
          this.templateCharacter
        );
      }).call(this);
      return (function () { return this.string("`"); }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.templateStringHead = /*rule*/ function () {
  return this.memoize("templateStringHead_xGwswP1Q7qy5Z8p6dHEwsw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("`"); }).call(this);
      (function () {
        return this.repeat(
          this.templateCharacter
        );
      }).call(this);
      return (this.lbrace).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.templateStringMiddle = /*rule*/ function () {
  return this.memoize("templateStringMiddle_+es7bZ+ZBOv2uTsEE4AQLg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (this.rbrace).call(this);
      (function () {
        return this.repeat(
          this.templateCharacter
        );
      }).call(this);
      return (this.lbrace).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.templateStringTail = /*rule*/ function () {
  return this.memoize("templateStringTail_TAIu1Xu4IuzIZdlF1Tl/ow", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (this.rbrace).call(this);
      (function () {
        return this.repeat(
          this.templateCharacter
        );
      }).call(this);
      return (function () { return this.string("`"); }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.lbrace = /*rule*/ function () {
  return this.memoize("lbrace_g7LBDmfO2tvl/ALXuiGxmg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("${"); }).call(this);
      return (function () {
        return this.push(
          "enclosedBy", "${"
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.rbrace = /*rule*/ function () {
  return this.memoize("rbrace_3B/dUFKe0FFQaBCdmnzw8w", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.predicate(
          function () { return (this.get("enclosedBy") === "${"); }
        );
      }).call(this);
      (function () { return this.string("}"); }).call(this);
      return (function () {
        return this.pop(
          "enclosedBy"
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.templateCharacter = /*rule*/ function () {
  return this.memoize("templateCharacter_V9MNVsrdQzCttGOA47Ffug", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.negate(
              this.newline
            );
          }).call(this);
          (function () {
            return this.negate(
              function () { return this.string("$"); }
            );
          }).call(this);
          (function () {
            return this.negate(
              function () { return this.string("\\"); }
            );
          }).call(this);
          return (this.char).call(this);
        },
        function () {
          (function () { return this.string("$"); }).call(this);
          return (function () {
            return this.negate(
              function () { return this.string("{"); }
            );
          }).call(this);
        },
        function () {
          (function () { return this.string("\\"); }).call(this);
          return (this.escapeSequence).call(this);
        },
        this.newline,
        function () {
          (function () { return this.string("\\"); }).call(this);
          return (this.newline).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.regularExpressionLiteral = /*rule*/ function () {
  return this.memoize("regularExpressionLiteral_v2+nRm6LhqqOHsogdJhLAQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("/"); }).call(this);
      (this.regularExpressionStart).call(this);
      (function () {
        return this.repeat(
          this.regularExpressionContinue
        );
      }).call(this);
      (function () { return this.string("/"); }).call(this);
      return (function () {
        return this.repeat(
          this.regularExpressionFlag
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.regularExpressionStart = /*rule*/ function () {
  return this.memoize("regularExpressionStart_jcZX6SMrLBUe03NVMRiyJA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.negate(
          function () { return this.string("*"); }
        );
      }).call(this);
      return (this.regularExpressionContinue).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.regularExpressionContinue = /*rule*/ function () {
  return this.memoize("regularExpressionContinue_cWRLds3LhFP2kQFufRhvEw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () { return this.string("\\"); }).call(this);
          return (this.char).call(this);
        },
        this.regularExpressionClass,
        function () {
          (function () {
            return this.negate(
              function () { return this.string("\\"); }
            );
          }).call(this);
          (function () {
            return this.negate(
              function () { return this.string("/"); }
            );
          }).call(this);
          (function () {
            return this.negate(
              function () { return this.string("["); }
            );
          }).call(this);
          (function () {
            return this.negate(
              this.newline
            );
          }).call(this);
          (function () {
            return this.negate(
              this.space
            );
          }).call(this);
          return (this.char).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.regularExpressionClass = /*rule*/ function () {
  return this.memoize("regularExpressionClass_VI5llM+jEvdLsE5isNzIQA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.negate(
              function () { return this.string("]"); }
            );
          }).call(this);
          (function () {
            return this.negate(
              function () { return this.string("\\"); }
            );
          }).call(this);
          (function () {
            return this.negate(
              this.newline
            );
          }).call(this);
          return (this.char).call(this);
        },
        function () {
          (function () { return this.string("\\"); }).call(this);
          return (this.char).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.regularExpressionFlag = /*rule*/ function () {
  return this.memoize("regularExpressionFlag_iaRHpRzlzMsZ6QLCRIbhwQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.negate(
          function () { return this.string("\\"); }
        );
      }).call(this);
      return (this.idContinue).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.stringLiteral = /*rule*/ function () {
  return this.memoize("stringLiteral_48ZdtuM9oCNdAv0TcmOA8g", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () { return this.string("\""); }).call(this);
          (function () {
            return this.repeat(
              function () {
                return this.stringCharacter(
                  function () { return this.string("\""); }
                );
              }
            );
          }).call(this);
          return (function () { return this.string("\""); }).call(this);
        },
        function () {
          (function () { return this.string("\'"); }).call(this);
          (function () {
            return this.repeat(
              function () {
                return this.stringCharacter(
                  function () { return this.string("\'"); }
                );
              }
            );
          }).call(this);
          return (function () { return this.string("\'"); }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.stringCharacter = /*rule*/ function (terminator) {
  this.__ignore();
  this.pushStartPosition();
  var __result = function () {
    return this.choice(
      function () {
        (function () {
          return this.negate(
            function () { return (terminator); }.call(this)
          );
        }).call(this);
        (function () {
          return this.negate(
            this.newline
          );
        }).call(this);
        (function () {
          return this.negate(
            function () { return this.string("\\"); }
          );
        }).call(this);
        return (this.char).call(this);
      },
      function () {
        (function () { return this.string("\\"); }).call(this);
        return (this.escapeSequence).call(this);
      },
      function () {
        (function () { return this.string("\\"); }).call(this);
        return (this.newline).call(this);
      }
    );
  }.call(this);
  this.popStartPosition();
  return __result;
};

ECMAScriptScanner.prototype.escapeSequence = /*rule*/ function () {
  return this.memoize("escapeSequence_9zkTwNJNA+66b9W0Vh743A", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () { return this.string("\'"); },
        function () { return this.string("\""); },
        function () { return this.string("\\"); },
        function () { return this.string("b"); },
        function () { return this.string("f"); },
        function () { return this.string("n"); },
        function () { return this.string("r"); },
        function () { return this.string("t"); },
        function () { return this.string("v"); },
        function () {
          (function () { return this.string("0"); }).call(this);
          return (function () {
            return this.negate(
              this.digit
            );
          }).call(this);
        },
        function () {
          (function () { return this.string("x"); }).call(this);
          (this.hex).call(this);
          return (this.hex).call(this);
        },
        function () {
          (function () { return this.string("u"); }).call(this);
          (this.hex).call(this);
          (this.hex).call(this);
          (this.hex).call(this);
          return (this.hex).call(this);
        },
        function () {
          (function () { return this.string("u"); }).call(this);
          (function () { return this.string("{"); }).call(this);
          (function () {
            return this.repeat1(
              this.hex
            );
          }).call(this);
          return (function () { return this.string("}"); }).call(this);
        },
        function () {
          (function () {
            return this.negate(
              function () { return this.string("\\"); }
            );
          }).call(this);
          (function () {
            return this.negate(
              this.newline
            );
          }).call(this);
          (function () {
            return this.negate(
              function () {
                return this.char(
                  "\'\"\\bfnrtv"
                );
              }
            );
          }).call(this);
          (function () {
            return this.negate(
              function () { return this.string("x"); }
            );
          }).call(this);
          (function () {
            return this.negate(
              function () { return this.string("u"); }
            );
          }).call(this);
          return (this.char).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.numberLiteral = /*rule*/ function () {
  return this.memoize("numberLiteral_3kboVyJTtsY+98L9eEHuAw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (this.decimalLiteral).call(this);
          return (function () {
            return this.negate(
              this.idContinue
            );
          }).call(this);
        },
        function () {
          (this.binaryIntegerLiteral).call(this);
          return (function () {
            return this.negate(
              this.idContinue
            );
          }).call(this);
        },
        function () {
          (this.octalIntegerLiteral).call(this);
          return (function () {
            return this.negate(
              this.idContinue
            );
          }).call(this);
        },
        function () {
          (this.hexIntegerLiteral).call(this);
          return (function () {
            return this.negate(
              this.idContinue
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.decimalLiteral = /*rule*/ function () {
  return this.memoize("decimalLiteral_0pjH9TnEfKjnKhKlrt3sDQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (this.decimalIntegerLiteral).call(this);
          (function () {
            return this.optional(
              function () {
                (function () { return this.string("."); }).call(this);
                return (function () {
                  return this.repeat1(
                    this.digit
                  );
                }).call(this);
              }
            );
          }).call(this);
          return (function () {
            return this.optional(
              this.exponent
            );
          }).call(this);
        },
        function () {
          (function () { return this.string("."); }).call(this);
          (function () {
            return this.repeat1(
              this.digit
            );
          }).call(this);
          return (function () {
            return this.optional(
              this.exponent
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.decimalIntegerLiteral = /*rule*/ function () {
  return this.memoize("decimalIntegerLiteral_DxF4nloX02sWFA7V/lLdDQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () { return this.string("0"); },
        function () {
          (function () {
            return this.char(
              ["1", "9"]
            );
          }).call(this);
          return (function () {
            return this.repeat(
              this.digit
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.exponent = /*rule*/ function () {
  return this.memoize("exponent_4krr5i0Yuz/C8ChV9lcSLg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.choice(
          function () { return this.string("e"); },
          function () { return this.string("E"); }
        );
      }).call(this);
      (function () {
        return this.choice(
          function () { return this.string("+"); },
          function () { return this.string("-"); },
          this.pass
        );
      }).call(this);
      return (function () {
        return this.repeat1(
          this.digit
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.binaryIntegerLiteral = /*rule*/ function () {
  return this.memoize("binaryIntegerLiteral_gPMzfVrNa8cbmFy0/59i7g", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("0"); }).call(this);
      (function () {
        return this.choice(
          function () { return this.string("b"); },
          function () { return this.string("B"); }
        );
      }).call(this);
      return (function () {
        return this.repeat1(
          function () {
            return this.choice(
              function () { return this.string("0"); },
              function () { return this.string("1"); }
            );
          }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.octalIntegerLiteral = /*rule*/ function () {
  return this.memoize("octalIntegerLiteral_kgJfJIIrAxqUql6XhiOzZw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("0"); }).call(this);
      (function () {
        return this.choice(
          function () { return this.string("o"); },
          function () { return this.string("O"); }
        );
      }).call(this);
      return (function () {
        return this.repeat1(
          this.octal
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.hexIntegerLiteral = /*rule*/ function () {
  return this.memoize("hexIntegerLiteral_T6JapUlM8eBqzXdlTOZJ4Q", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("0"); }).call(this);
      (function () {
        return this.choice(
          function () { return this.string("x"); },
          function () { return this.string("X"); }
        );
      }).call(this);
      return (function () {
        return this.repeat1(
          this.hex
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.nullLiteral = /*rule*/ function () {
  return this.memoize("nullLiteral_XnK8Jc92wwLlEL8lbqQV8A", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("null"); }).call(this);
      return (function () {
        return this.negate(
          this.idContinue
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.booleanLiteral = /*rule*/ function () {
  return this.memoize("booleanLiteral_MeSd5WuymQz0sjPvIE4+1Q", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () { return this.string("true"); }).call(this);
          return (function () {
            return this.negate(
              this.idContinue
            );
          }).call(this);
        },
        function () {
          (function () { return this.string("false"); }).call(this);
          return (function () {
            return this.negate(
              this.idContinue
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.punctuator = /*rule*/ function () {
  return this.memoize("punctuator_7rnQ6dwiwctWR2Odv+y08w", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        this.openPunctuator,
        this.closePunctuator,
        this.basicPunctuator
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.openPunctuator = /*rule*/ function () {
  return this.memoize("openPunctuator_ZOl0x/7oRWsedCHK4mOyXg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () { return this.string("{"); }).call(this);
          return (function () {
            return this.push(
              "enclosedBy", "{"
            );
          }).call(this);
        },
        function () {
          (function () { return this.string("("); }).call(this);
          return (function () {
            return this.push(
              "enclosedBy", "("
            );
          }).call(this);
        },
        function () {
          (function () { return this.string("["); }).call(this);
          return (function () {
            return this.push(
              "enclosedBy", "["
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.closePunctuator = /*rule*/ function () {
  return this.memoize("closePunctuator_4hpF584MDhUdRI43mOm+tA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.predicate(
              function () { return (this.get("enclosedBy") === "{"); }
            );
          }).call(this);
          (function () { return this.string("}"); }).call(this);
          return (function () {
            return this.pop(
              "enclosedBy"
            );
          }).call(this);
        },
        function () {
          (function () {
            return this.predicate(
              function () { return (this.get("enclosedBy") === "("); }
            );
          }).call(this);
          (function () { return this.string(")"); }).call(this);
          return (function () {
            return this.pop(
              "enclosedBy"
            );
          }).call(this);
        },
        function () {
          (function () {
            return this.predicate(
              function () { return (this.get("enclosedBy") === "["); }
            );
          }).call(this);
          (function () { return this.string("]"); }).call(this);
          return (function () {
            return this.pop(
              "enclosedBy"
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.basicPunctuator = /*rule*/ function () {
  return this.memoize("basicPunctuator_Sn9In8nwYg54mCScv+BXTQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () { return this.string("..."); },
        function () { return this.string("."); },
        function () { return this.string("?"); },
        function () { return this.string(":"); },
        function () { return this.string(";"); },
        function () { return this.string(","); },
        function () { return this.string("<<="); },
        function () { return this.string(">>="); },
        function () { return this.string(">>>="); },
        function () { return this.string("=>"); },
        function () { return this.string("==="); },
        function () { return this.string("!=="); },
        function () { return this.string("=="); },
        function () { return this.string("!="); },
        function () { return this.string("!"); },
        function () { return this.string("="); },
        function () { return this.string("~"); },
        function () { return this.string("<<"); },
        function () { return this.string(">>"); },
        function () { return this.string(">>>"); },
        function () { return this.string("<="); },
        function () { return this.string(">="); },
        function () { return this.string("<"); },
        function () { return this.string(">"); },
        function () { return this.string("++"); },
        function () { return this.string("--"); },
        function () { return this.string("+="); },
        function () { return this.string("-="); },
        function () { return this.string("*="); },
        function () { return this.string("/="); },
        function () { return this.string("%="); },
        function () { return this.string("+"); },
        function () { return this.string("-"); },
        function () { return this.string("*"); },
        function () { return this.string("/"); },
        function () { return this.string("%"); },
        function () { return this.string("||"); },
        function () { return this.string("&&"); },
        function () { return this.string("|="); },
        function () { return this.string("^="); },
        function () { return this.string("&="); },
        function () { return this.string("|"); },
        function () { return this.string("^"); },
        function () { return this.string("&"); },
        function () { return this.string("#"); },
        function () { return this.string("@"); }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.identifierName = /*rule*/ function () {
  var c;
  return this.memoize("identifierName_Sd/h0vynF/vVCEzLLEN79Q", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return c = this.idStart.call(this);
      }).call(this);
      return (function () {
        return this.repeat(
          this.idContinue
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.idStart = /*rule*/ function () {
  return this.memoize("idStart_51kuIgSKlf7eeiiC797fgg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          return this.char(
            ["a", "z"], ["A", "Z"]
          );
        },
        function () { return this.string("$"); },
        function () { return this.string("_"); },
        function () {
          (function () { return this.string("\\"); }).call(this);
          (function () { return this.string("u"); }).call(this);
          (this.hex).call(this);
          (this.hex).call(this);
          (this.hex).call(this);
          return (this.hex).call(this);
        },
        function () {
          (function () { return this.string("\\"); }).call(this);
          (function () { return this.string("u"); }).call(this);
          (function () { return this.string("{"); }).call(this);
          (function () {
            return this.repeat1(
              this.hex
            );
          }).call(this);
          return (function () { return this.string("}"); }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.idContinue = /*rule*/ function () {
  return this.memoize("idContinue_Z0b17R1bX0oIj9cv/6RZ6A", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          return this.char(
            ["a", "z"], ["A", "Z"], ["0", "9"]
          );
        },
        function () { return this.string("$"); },
        function () { return this.string("_"); },
        function () {
          (function () { return this.string("\\"); }).call(this);
          (function () { return this.string("u"); }).call(this);
          (this.hex).call(this);
          (this.hex).call(this);
          (this.hex).call(this);
          return (this.hex).call(this);
        },
        function () {
          (function () { return this.string("\\"); }).call(this);
          (function () { return this.string("u"); }).call(this);
          (function () { return this.string("{"); }).call(this);
          (function () {
            return this.repeat1(
              this.hex
            );
          }).call(this);
          return (function () { return this.string("}"); }).call(this);
        },
        function () { return this.string("\u200c"); },
        function () { return this.string("\u200d"); }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.multilineComment = /*rule*/ function () {
  return this.memoize("multilineComment_+phzn77ANzmGa9GQ4iw2yg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("/*"); }).call(this);
      (function () {
        return this.repeat(
          function () {
            (function () {
              return this.negate(
                function () { return this.string("*/"); }
              );
            }).call(this);
            return (this.char).call(this);
          }
        );
      }).call(this);
      return (function () { return this.string("*/"); }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

ECMAScriptScanner.prototype.singlelineComment = /*rule*/ function () {
  return this.memoize("singlelineComment_AQEA7urw4JWd33+2VfcnXg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () { return this.string("//"); }).call(this);
      return (function () {
        return this.repeat(
          function () {
            (function () {
              return this.negate(
                this.newline
              );
            }).call(this);
            return (this.char).call(this);
          }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



ECMAScriptScanner.prototype.spaces = /*rule*/ function () {
  return this.memoize("spaces_hFH4/cQ9xAFde+Sfvrcxwg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.repeat1(
        this.space
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
}
ECMAScriptScanner.prototype.space = /*rule*/ function () {
  return this.memoize("space_aLvIUPGow1bQp5tEqNW0vg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () { return this.string("\u0009"); },
        function () { return this.string("\u000b"); },
        function () { return this.string("\u000c"); },
        function () { return this.string("\u0020"); },
        function () { return this.string("\u00a0"); },
        function () { return this.string("\ufeff"); },
        this.Zs
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};
ECMAScriptScanner.prototype.Zs = /*rule*/ function () {
  return this.memoize("Zs_DGxS2hutYm4aYdzfUcN2OA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = this.fail.call(this);
    this.popStartPosition();
    return __result;
  });
}



ECMAScriptScanner.prototype.newline = /*rule*/ function () {
  return this.memoize("newline_xtvQWzZr99YAWBQZ4gDmCg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () { return this.string("\u000d"); }).call(this);
          return (function () { return this.string("\u000a"); }).call(this);
        },
        function () { return this.string("\u000a"); },
        function () { return this.string("\u000d"); },
        function () { return this.string("\u2028"); },
        function () { return this.string("\u2029"); }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};
