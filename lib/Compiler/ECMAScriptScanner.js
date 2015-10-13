/*** Preprocessed by combe-0.8.0 ***/
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

var Grammar = require("../Grammar.js");



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
function ECMAScriptScanner(root, sourcename) {
  Grammar.call(this, root, sourcename);
  
  this.init("enclosedBy", null);
};
ECMAScriptScanner.prototype = Object.create(Grammar.prototype);
ECMAScriptScanner.prototype.constructor = ECMAScriptScanner;
module.exports = ECMAScriptScanner;



ECMAScriptScanner.prototype.start = function () {
  return this.memoize.call(this,
    "start_0tvJyRvzL37DQsoL5FKvzg",
    function () {
      var ts;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.nestedArray.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return ts = this.allTokens.call(this);
                      }
                    );
                  }
                );
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (ts);
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

ECMAScriptScanner.prototype.allFragments = function () {
  return this.memoize.call(this,
    "allFragments_YGTa9eNBh4yAILUlEqz5zQ",
    function () {
      var hf, fs;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return hf = this.hashbang.call(this);
              },
              function () {
                return fs = function () {
                  return this.repeat.call(this, this.fragment);
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return ([hf].concat(fs));
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

ECMAScriptScanner.prototype.hashbang = function () {
  return this.memoize.call(this,
    "hashbang_o29F72Z8PwNubICpQEAUhg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.slice.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.hash.call(this,
                        function () {
                          return ("#!");
                        }.call(this)
                      );
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
                                this.next
                              );
                            }
                          );
                        }
                      );
                    },
                    this.newline
                  );
                }
              );
            }
          )
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.fragment = function () {
  return this.memoize.call(this,
    "fragment_LQWwrn6vPUvrTKSEqvoqlw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.multilineComment);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.singlelineComment);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.spaces);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.newline);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.templateStringComplete);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.templateStringHead);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.templateStringMiddle);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.templateStringTail);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.regularExpressionLiteral);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.stringLiteral);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.numberLiteral);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.nullLiteral);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.booleanLiteral);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.punctuator);
            }
          ),
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.identifierName);
            }
          )
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.templateStringComplete = function () {
  return this.memoize.call(this,
    "templateStringComplete_c7oy02boZcgSVH1lLGhc6Q",
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
                return this.repeat.call(this, this.templateCharacter);
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
    "templateStringHead_wBDk/pYnkmbDQdoiQ5MPBg",
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
                return this.repeat.call(this, this.templateCharacter);
              },
              this.lbrace
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
    "templateStringMiddle_s0q8wBHhZUS0oRw9ZmpQ2A",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.templateStringTail = function () {
  return this.memoize.call(this,
    "templateStringTail_tvLwVqZZtD7bAwszVKTC/A",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.lbrace = function () {
  return this.memoize.call(this,
    "lbrace_RrOcpP+3OJ/7ry9eonDuaQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.hash.call(this,
                  function () {
                    return ("${");
                  }.call(this)
                );
              },
              this.push.call(this, "enclosedBy", "${")
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
    "rbrace_SNenjJ1t1i28rHyE8/A59w",
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
              this.pop.call(this, "enclosedBy")
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
    "templateCharacter_9+0lBOTszjG7IktNCcjxqA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



ECMAScriptScanner.prototype.regularExpressionLiteral = function () {
  return this.memoize.call(this,
    "regularExpressionLiteral_E3n0u01KXDg/9hivn73gHA",
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.regularExpressionStart = function () {
  return this.memoize.call(this,
    "regularExpressionStart_kueUQj61TRvW7b8/GpdDeA",
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
              this.regularExpressionContinue
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
    "regularExpressionContinue_eEZ7IZCcGCHepiqthaubNw",
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
    "regularExpressionClass_ffZB61CzBETUI/vgnWcP3w",
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
                return this.negate.call(this, this.newline);
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
    "regularExpressionFlag_MWFDGq0qRSxnSkxLRVEIWA",
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
              this.idContinue
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
    "stringLiteral_2jUAGgf9v9yaICxia9b4DQ",
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
                  this.stringCharacter.call(this,
                    function () {
                      return this.choice.call(this,
                        function () {
                          return this.string.call(this, "\"");
                        }
                      );
                    }
                  )
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
                  this.stringCharacter.call(this,
                    function () {
                      return this.choice.call(this,
                        function () {
                          return this.string.call(this, "\'");
                        }
                      );
                    }
                  )
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
            return this.negate.call(this, this.newline);
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
  }.call(this);
  this.popStartPosition.call(this);
  return __result;
};

ECMAScriptScanner.prototype.escapeSequence = function () {
  return this.memoize.call(this,
    "escapeSequence_PtOxhpTdi+RHFYcAlyVKiw",
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
                return this.negate.call(this, this.char.call(this, "\'\"\\bfnrtv"));
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
    "numberLiteral_5Vpf6lunbxdQdnjv5HBX2A",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.decimalLiteral = function () {
  return this.memoize.call(this,
    "decimalLiteral_qLlN0K0D4/dOQF8D/1I8kA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.decimalIntegerLiteral = function () {
  return this.memoize.call(this,
    "decimalIntegerLiteral_K4iJ9q+FbjYkZswPlwJYwQ",
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
              this.char.call(this, ["1", "9"]),
              function () {
                return this.repeat.call(this, this.digit);
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
    "exponent_JUjF5jSvgR/OqG89uYrgAw",
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
                    return this.action.call(this,
                      function () {
                        return ("E");
                      }
                    );
                  }
                );
              },
              function () {
                return this.choice.call(this,
                  function () {
                    return this.string.call(this, "+");
                  },
                  function () {
                    return this.action.call(this,
                      function () {
                        return ("-");
                      }
                    );
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.binaryIntegerLiteral = function () {
  return this.memoize.call(this,
    "binaryIntegerLiteral_X2rlkZ+9J3SSl4/UJqYmOg",
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
                    return this.action.call(this,
                      function () {
                        return ("B");
                      }
                    );
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
                        return this.action.call(this,
                          function () {
                            return ("1");
                          }
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

ECMAScriptScanner.prototype.octalIntegerLiteral = function () {
  return this.memoize.call(this,
    "octalIntegerLiteral_pg+J494hezdbIOC4u+jHFg",
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
                    return this.action.call(this,
                      function () {
                        return ("O");
                      }
                    );
                  }
                );
              },
              function () {
                return this.repeat1.call(this, this.octal);
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
    "hexIntegerLiteral_uZKXnibmdoCIeUG7sHZiUg",
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
                    return this.action.call(this,
                      function () {
                        return ("X");
                      }
                    );
                  }
                );
              },
              function () {
                return this.repeat1.call(this, this.hex);
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
    "nullLiteral_oZoepZTTngOPpIqjx7uyGg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.hash.call(this,
                  function () {
                    return ("null");
                  }.call(this)
                );
              },
              function () {
                return this.negate.call(this, this.idContinue);
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
    "booleanLiteral_9dYJ6hUQAdCeIEPjnSqtFA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.hash.call(this,
                  function () {
                    return ("true");
                  }.call(this)
                );
              },
              function () {
                return this.negate.call(this, this.idContinue);
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.hash.call(this,
                  function () {
                    return ("false");
                  }.call(this)
                );
              },
              function () {
                return this.negate.call(this, this.idContinue);
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
    "punctuator_FcMIXyDb+d+mbmOMzrAYPQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this, this.openPunctuator, this.closePunctuator, this.basicPunctuator);
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.openPunctuator = function () {
  return this.memoize.call(this,
    "openPunctuator_VyZD6g4PkmFxUKqE3JWgzA",
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
              this.push.call(this, "enclosedBy", "{")
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "(");
              },
              this.push.call(this, "enclosedBy", "(")
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.string.call(this, "[");
              },
              this.push.call(this, "enclosedBy", "[")
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
    "closePunctuator_ntnHW7c4SBhessvRCSM0ZQ",
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
              this.pop.call(this, "enclosedBy")
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
              this.pop.call(this, "enclosedBy")
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
              this.pop.call(this, "enclosedBy")
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
    "basicPunctuator_JfLj0eNqEThEsVZmTCqYNw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.hash.call(this,
              function () {
                return ("...");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (".");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("?");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (":");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (";");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (",");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("<<=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (">>=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (">>>=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("=>");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("===");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("!==");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("==");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("!=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("!");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("~");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("<<");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (">>");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (">>>");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("<=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (">=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("<");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return (">");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("++");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("--");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("+=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("-=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("*=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("/=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("%=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("+");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("-");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("*");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("/");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("%");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("||");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("&&");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("|=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("^=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("&=");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("|");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("^");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("&");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("#");
              }.call(this)
            );
          },
          function () {
            return this.hash.call(this,
              function () {
                return ("@");
              }.call(this)
            );
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
    "identifierName_ykabpXF7TNP8b58cZp93LQ",
    function () {
      var c;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.idStart = function () {
  return this.memoize.call(this,
    "idStart_enCRBRbrQ7NM6dMKrQGaxg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.char.call(this, ["a", "z"], ["A", "Z"]),
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
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

ECMAScriptScanner.prototype.idContinue = function () {
  return this.memoize.call(this,
    "idContinue_q0QaGpzLZoZTsB1AlTMpzw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.char.call(this, ["a", "z"], ["A", "Z"], ["0", "9"]),
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
    "singlelineComment_WaC5o2nGnmq3nniCk7iyVg",
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
                            return this.negate.call(this, this.newline);
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
    "spaces_KmplCTLYV/WIZYg0cs+BpA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.repeat1.call(this, this.space);
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
    "space_6jZqzdFLyLYwO2Lrx+F8+A",
    function () {
      var Zs;
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
            return Zs = this.next.call(this);
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
    "Zs_JBK0+W6dZeF0jYgJpW6vRQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this, this.fail);
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
