/*** Preprocessed by combe-0.8.0dev-bootstrap ***/
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



ECMAScriptLexer.prototype.token = /* rule */ function () {
  var text;
  return this.memoize("token_ALDU3tI+b/FJ/h7dcsfdNg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () {
                        return this.choice(
                          function () {
                            return this.choice(
                              function () {
                                return this.choice(
                                  function () {
                                    return this.choice(
                                      function () {
                                        return this.choice(
                                          function () {
                                            return this.choice(
                                              function () {
                                                return this.choice(
                                                  function () {
                                                    return this.choice(
                                                      function () {
                                                        return this.choice(
                                                          function () {
                                                            return this.choice(
                                                              function () {
                                                                return this.sequence(
                                                                  function () {
                                                                    return text = function () {
                                                                      return this.slice.call(this,
                                                                        this.multilineComment
                                                                      );
                                                                    }.call(this)
                                                                  },
                                                                  function () {
                                                                    return this.emit.call(this, "MultilineComment",       null);
                                                                  }
                                                                );
                                                              },
                                                              function () {
                                                                return this.sequence(
                                                                  function () {
                                                                    return text = function () {
                                                                      return this.slice.call(this,
                                                                        this.singlelineComment
                                                                      );
                                                                    }.call(this)
                                                                  },
                                                                  function () {
                                                                    return this.emit.call(this, "SinglelineComment",      null);
                                                                  }
                                                                );
                                                              }
                                                            );
                                                          },
                                                          function () {
                                                            return this.sequence(
                                                              function () {
                                                                return text = function () {
                                                                  return this.slice.call(this,
                                                                    this.spaces
                                                                  );
                                                                }.call(this)
                                                              },
                                                              function () {
                                                                return this.emit.call(this, "Spaces",                 null);
                                                              }
                                                            );
                                                          }
                                                        );
                                                      },
                                                      function () {
                                                        return this.sequence(
                                                          function () {
                                                            return text = function () {
                                                              return this.slice.call(this,
                                                                this.newline
                                                              );
                                                            }.call(this)
                                                          },
                                                          function () {
                                                            return this.emit.call(this, "Newline",                null);
                                                          }
                                                        );
                                                      }
                                                    );
                                                  },
                                                  function () {
                                                    return this.sequence(
                                                      function () {
                                                        return text = function () {
                                                          return this.slice.call(this,
                                                            this.templateStringComplete
                                                          );
                                                        }.call(this)
                                                      },
                                                      function () {
                                                        return this.emit.call(this, "TemplateStringComplete", null);
                                                      }
                                                    );
                                                  }
                                                );
                                              },
                                              function () {
                                                return this.sequence(
                                                  function () {
                                                    return text = function () {
                                                      return this.slice.call(this,
                                                        this.templateStringHead
                                                      );
                                                    }.call(this)
                                                  },
                                                  function () {
                                                    return this.emit.call(this, "TemplateStringHead",     null);
                                                  }
                                                );
                                              }
                                            );
                                          },
                                          function () {
                                            return this.sequence(
                                              function () {
                                                return text = function () {
                                                  return this.slice.call(this,
                                                    this.templateStringMiddle
                                                  );
                                                }.call(this)
                                              },
                                              function () {
                                                return this.emit.call(this, "TemplateStringMiddle",   null);
                                              }
                                            );
                                          }
                                        );
                                      },
                                      function () {
                                        return this.sequence(
                                          function () {
                                            return text = function () {
                                              return this.slice.call(this,
                                                this.templateStringTail
                                              );
                                            }.call(this)
                                          },
                                          function () {
                                            return this.emit.call(this, "TemplateStringTail",     null);
                                          }
                                        );
                                      }
                                    );
                                  },
                                  function () {
                                    return this.sequence(
                                      function () {
                                        return text = function () {
                                          return this.slice.call(this,
                                            this.regularExpressionLiteral
                                          );
                                        }.call(this)
                                      },
                                      function () {
                                        return this.emit.call(this, "RegularExpression",      eval(text));
                                      }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this.sequence(
                                  function () {
                                    return text = function () {
                                      return this.slice.call(this,
                                        this.stringLiteral
                                      );
                                    }.call(this)
                                  },
                                  function () {
                                    return this.emit.call(this, "String",                 eval(text));
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return this.sequence(
                              function () {
                                return text = function () {
                                  return this.slice.call(this,
                                    this.numberLiteral
                                  );
                                }.call(this)
                              },
                              function () {
                                return this.emit.call(this, "Number",                 eval(text));
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this.sequence(
                          function () {
                            return text = function () {
                              return this.slice.call(this,
                                this.nullLiteral
                              );
                            }.call(this)
                          },
                          function () {
                            return this.emit.call(this, "Null",                   eval(text));
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () {
                        return text = function () {
                          return this.slice.call(this,
                            this.booleanLiteral
                          );
                        }.call(this)
                      },
                      function () {
                        return this.emit.call(this, "Boolean",                eval(text));
                      }
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  function () {
                    return text = function () {
                      return this.slice.call(this,
                        this.punctuator
                      );
                    }.call(this)
                  },
                  function () {
                    return this.emit.call(this, "Punctuator",             null);
                  }
                );
              }
            );
          },
          function () {
            return this.sequence(
              function () {
                return text = function () {
                  return this.slice.call(this,
                    this.identifierName
                  );
                }.call(this)
              },
              function () {
                return this.emit.call(this, "IdentifierName",         null);
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.templateStringComplete = /* rule */ function () {
  return this.memoize("templateStringComplete_n4Fsa92yeo0x82wyvuCEmg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () { return this.string("`"); },
          function () {
            return this.repeat(
              this.templateCharacter
            );
          },
          function () { return this.string("`"); }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.templateStringHead = /* rule */ function () {
  return this.memoize("templateStringHead_PGo8xnXOmGIy4wTgzVnzDg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () { return this.string("`"); },
          function () {
            return this.repeat(
              this.templateCharacter
            );
          },
          this.lbrace
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.templateStringMiddle = /* rule */ function () {
  return this.memoize("templateStringMiddle_YIQqGybPzjtircNSiFiCiQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          this.rbrace,
          function () {
            return this.repeat(
              this.templateCharacter
            );
          },
          this.lbrace
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.templateStringTail = /* rule */ function () {
  return this.memoize("templateStringTail_AMWd/8n2EhBaO7EqYcX6Cg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          this.rbrace,
          function () {
            return this.repeat(
              this.templateCharacter
            );
          },
          function () { return this.string("`"); }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.lbrace = /* rule */ function () {
  return this.memoize("lbrace_uSzC9YxZ+D9KSWhrKdTiCw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () { return this.string("${"); },
          function () {
            return this.push.call(this, "enclosedBy", "${");
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.rbrace = /* rule */ function () {
  return this.memoize("rbrace_eWmIOFX8+fy9BSUa/oS/qw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.predicate(
              function () { return (this.get("enclosedBy") === "${"); }
            );
          },
          function () { return this.string("}"); },
          function () {
            return this.pop.call(this, "enclosedBy");
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.templateCharacter = /* rule */ function () {
  return this.memoize("templateCharacter_G1ncWPy9hEqRD20EzmVLug",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () {
                        return this.sequence(
                          function () {
                            return this.negate(
                              this.newline
                            );
                          },
                          function () {
                            return this.negate(
                              function () { return this.string("$"); }
                            );
                          },
                          function () {
                            return this.negate(
                              function () { return this.string("\\"); }
                            );
                          },
                          this.char
                        );
                      },
                      function () {
                        return this.sequence(
                          function () { return this.string("$"); },
                          function () {
                            return this.negate(
                              function () { return this.string("{"); }
                            );
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () { return this.string("\\"); },
                      this.escapeSequence
                    );
                  }
                );
              },
              this.newline
            );
          },
          function () {
            return this.sequence(
              function () { return this.string("\\"); },
              this.newline
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.regularExpressionLiteral = /* rule */ function () {
  return this.memoize("regularExpressionLiteral_zn35uUd8AbV0jIBBjVYAAQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () { return this.string("/"); },
          this.regularExpressionStart,
          function () {
            return this.repeat(
              this.regularExpressionContinue
            );
          },
          function () { return this.string("/"); },
          function () {
            return this.repeat(
              this.regularExpressionFlag
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionStart = /* rule */ function () {
  return this.memoize("regularExpressionStart_QREfSbO1rn2SVDG+XHktxQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.negate(
              function () { return this.string("*"); }
            );
          },
          this.regularExpressionContinue
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionContinue = /* rule */ function () {
  return this.memoize("regularExpressionContinue_22E6l09X68jrt1rzFIN9SA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.sequence(
                  function () { return this.string("\\"); },
                  this.char
                );
              },
              this.regularExpressionClass
            );
          },
          function () {
            return this.sequence(
              function () {
                return this.negate(
                  function () { return this.string("\\"); }
                );
              },
              function () {
                return this.negate(
                  function () { return this.string("/"); }
                );
              },
              function () {
                return this.negate(
                  function () { return this.string("["); }
                );
              },
              function () {
                return this.negate(
                  this.newline
                );
              },
              function () {
                return this.negate(
                  this.space
                );
              },
              this.char
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionClass = /* rule */ function () {
  return this.memoize("regularExpressionClass_jfU4mc728QqwL+Tolu7euA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.sequence(
              function () {
                return this.negate(
                  function () { return this.string("]"); }
                );
              },
              function () {
                return this.negate(
                  function () { return this.string("\\"); }
                );
              },
              function () {
                return this.negate(
                  this.newline
                );
              },
              this.char
            );
          },
          function () {
            return this.sequence(
              function () { return this.string("\\"); },
              this.char
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionFlag = /* rule */ function () {
  return this.memoize("regularExpressionFlag_IQl1AzHkEPnKvquRs3+u6g",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.negate(
              function () { return this.string("\\"); }
            );
          },
          this.idContinue
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.stringLiteral = /* rule */ function () {
  return this.memoize("stringLiteral_hDuPBWD5Tg/jHZY9DMiMjQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.sequence(
              function () { return this.string("\""); },
              function () {
                return this.repeat(
                  function () {
                    return this.stringCharacter.call(this,
                      function () { return this.string("\""); }
                    );
                  }
                );
              },
              function () { return this.string("\""); }
            );
          },
          function () {
            return this.sequence(
              function () { return this.string("\'"); },
              function () {
                return this.repeat(
                  function () {
                    return this.stringCharacter.call(this,
                      function () { return this.string("\'"); }
                    );
                  }
                );
              },
              function () { return this.string("\'"); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.stringCharacter = /* rule */ function (terminator) {
  return this.memoize("stringCharacter_UBjURMFQ9oqqYfN6omjRfQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.sequence(
                  function () {
                    return this.negate(
                      function () { return (terminator); }.call(this)
                    );
                  },
                  function () {
                    return this.negate(
                      this.newline
                    );
                  },
                  function () {
                    return this.negate(
                      function () { return this.string("\\"); }
                    );
                  },
                  this.char
                );
              },
              function () {
                return this.sequence(
                  function () { return this.string("\\"); },
                  this.escapeSequence
                );
              }
            );
          },
          function () {
            return this.sequence(
              function () { return this.string("\\"); },
              this.newline
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.escapeSequence = /* rule */ function () {
  return this.memoize("escapeSequence_88s6D0tN//OEg35V3WCDFw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () {
                        return this.choice(
                          function () {
                            return this.choice(
                              function () {
                                return this.choice(
                                  function () {
                                    return this.choice(
                                      function () {
                                        return this.choice(
                                          function () {
                                            return this.choice(
                                              function () {
                                                return this.choice(
                                                  function () {
                                                    return this.choice(
                                                      function () {
                                                        return this.choice(
                                                          function () { return this.string("\'"); },
                                                          function () { return this.string("\""); }
                                                        );
                                                      },
                                                      function () { return this.string("\\"); }
                                                    );
                                                  },
                                                  function () { return this.string("b"); }
                                                );
                                              },
                                              function () { return this.string("f"); }
                                            );
                                          },
                                          function () { return this.string("n"); }
                                        );
                                      },
                                      function () { return this.string("r"); }
                                    );
                                  },
                                  function () { return this.string("t"); }
                                );
                              },
                              function () { return this.string("v"); }
                            );
                          },
                          function () {
                            return this.sequence(
                              function () { return this.string("0"); },
                              function () {
                                return this.negate(
                                  this.digit
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this.sequence(
                          function () { return this.string("x"); },
                          this.hex,
                          this.hex
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () { return this.string("u"); },
                      this.hex,
                      this.hex,
                      this.hex,
                      this.hex
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  function () { return this.string("u"); },
                  function () { return this.string("{"); },
                  function () {
                    return this.repeat1(
                      this.hex
                    );
                  },
                  function () { return this.string("}"); }
                );
              }
            );
          },
          function () {
            return this.sequence(
              function () {
                return this.negate(
                  function () { return this.string("\\"); }
                );
              },
              function () {
                return this.negate(
                  this.newline
                );
              },
              function () {
                return this.negate(
                  function () {
                    return this.char.call(this, "\'\"\\bfnrtv");
                  }
                );
              },
              function () {
                return this.negate(
                  function () { return this.string("x"); }
                );
              },
              function () {
                return this.negate(
                  function () { return this.string("u"); }
                );
              },
              this.char
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.numberLiteral = /* rule */ function () {
  return this.memoize("numberLiteral_9mAV/QLoWzZWIj0lT5bdzA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () {
                    return this.sequence(
                      this.decimalLiteral,
                      function () {
                        return this.negate(
                          this.idContinue
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      this.binaryIntegerLiteral,
                      function () {
                        return this.negate(
                          this.idContinue
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  this.octalIntegerLiteral,
                  function () {
                    return this.negate(
                      this.idContinue
                    );
                  }
                );
              }
            );
          },
          function () {
            return this.sequence(
              this.hexIntegerLiteral,
              function () {
                return this.negate(
                  this.idContinue
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.decimalLiteral = /* rule */ function () {
  return this.memoize("decimalLiteral_5IhqTLlSvjFjGb9ARMX/zA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.sequence(
              this.decimalIntegerLiteral,
              function () {
                return this.optional(
                  function () {
                    return this.sequence(
                      function () { return this.string("."); },
                      function () {
                        return this.repeat1(
                          this.digit
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.optional(
                  this.exponent
                );
              }
            );
          },
          function () {
            return this.sequence(
              function () { return this.string("."); },
              function () {
                return this.repeat1(
                  this.digit
                );
              },
              function () {
                return this.optional(
                  this.exponent
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.decimalIntegerLiteral = /* rule */ function () {
  return this.memoize("decimalIntegerLiteral_vEPLh/9L26e1o9qqNENkqg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () { return this.string("0"); },
          function () {
            return this.sequence(
              function () {
                return this.char.call(this, ["1", "9"]);
              },
              function () {
                return this.repeat(
                  this.digit
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.exponent = /* rule */ function () {
  return this.memoize("exponent_tznHIEncahs52vp1fCH3Rg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.choice(
              function () { return this.string("e"); },
              function () { return this.string("E"); }
            );
          },
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () { return this.string("+"); },
                  function () { return this.string("-"); }
                );
              },
              this.empty
            );
          },
          function () {
            return this.repeat1(
              this.digit
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.binaryIntegerLiteral = /* rule */ function () {
  return this.memoize("binaryIntegerLiteral_6UXG/Ffrnz7gC8NeyOxxNA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.choice(
              function () { return this.string("0b"); },
              function () { return this.string("0B"); }
            );
          },
          function () {
            return this.repeat1(
              function () {
                return this.choice(
                  function () { return this.string("0"); },
                  function () { return this.string("1"); }
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.octalIntegerLiteral = /* rule */ function () {
  return this.memoize("octalIntegerLiteral_p59OAmdkHSYITa5JDVyt3w",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.choice(
              function () { return this.string("0o"); },
              function () { return this.string("0O"); }
            );
          },
          function () {
            return this.repeat1(
              this.octal
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.hexIntegerLiteral = /* rule */ function () {
  return this.memoize("hexIntegerLiteral_7WNVAuyLhPEiUo/cTRWE6Q",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.choice(
              function () { return this.string("0x"); },
              function () { return this.string("0X"); }
            );
          },
          function () {
            return this.repeat1(
              this.hex
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.nullLiteral = /* rule */ function () {
  return this.memoize("nullLiteral_BYJlTe+MvSg5xaFmhUza2A",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () { return this.string("null"); }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.booleanLiteral = /* rule */ function () {
  return this.memoize("booleanLiteral_D2ZAAoiRkVk9hnpojv+NIA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () { return this.string("true"); },
          function () { return this.string("false"); }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.punctuator = /* rule */ function () {
  return this.memoize("punctuator_8XK9jOSyb6iWP6rS/Wrmjw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              this.openPunctuator,
              this.closePunctuator
            );
          },
          this.basicPunctuator
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.openPunctuator = /* rule */ function () {
  return this.memoize("openPunctuator_F/6danXMIwkdzAXZdayUvQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.sequence(
                  function () { return this.string("{"); },
                  function () {
                    return this.push.call(this, "enclosedBy", "{");
                  }
                );
              },
              function () {
                return this.sequence(
                  function () { return this.string("("); },
                  function () {
                    return this.push.call(this, "enclosedBy", "(");
                  }
                );
              }
            );
          },
          function () {
            return this.sequence(
              function () { return this.string("["); },
              function () {
                return this.push.call(this, "enclosedBy", "[");
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.closePunctuator = /* rule */ function () {
  return this.memoize("closePunctuator_VzZb6m1HQmRidsk6fAnCDQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.sequence(
                  function () {
                    return this.predicate(
                      function () { return (this.get("enclosedBy") === "{"); }
                    );
                  },
                  function () { return this.string("}"); },
                  function () {
                    return this.pop.call(this, "enclosedBy");
                  }
                );
              },
              function () {
                return this.sequence(
                  function () {
                    return this.predicate(
                      function () { return (this.get("enclosedBy") === "("); }
                    );
                  },
                  function () { return this.string(")"); },
                  function () {
                    return this.pop.call(this, "enclosedBy");
                  }
                );
              }
            );
          },
          function () {
            return this.sequence(
              function () {
                return this.predicate(
                  function () { return (this.get("enclosedBy") === "["); }
                );
              },
              function () { return this.string("]"); },
              function () {
                return this.pop.call(this, "enclosedBy");
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.basicPunctuator = /* rule */ function () {
  return this.memoize("basicPunctuator_nDH1+FrmK/ftSaSR/UZrUg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () {
                        return this.choice(
                          function () {
                            return this.choice(
                              function () {
                                return this.choice(
                                  function () {
                                    return this.choice(
                                      function () {
                                        return this.choice(
                                          function () {
                                            return this.choice(
                                              function () {
                                                return this.choice(
                                                  function () {
                                                    return this.choice(
                                                      function () {
                                                        return this.choice(
                                                          function () {
                                                            return this.choice(
                                                              function () {
                                                                return this.choice(
                                                                  function () {
                                                                    return this.choice(
                                                                      function () {
                                                                        return this.choice(
                                                                          function () {
                                                                            return this.choice(
                                                                              function () {
                                                                                return this.choice(
                                                                                  function () {
                                                                                    return this.choice(
                                                                                      function () {
                                                                                        return this.choice(
                                                                                          function () {
                                                                                            return this.choice(
                                                                                              function () {
                                                                                                return this.choice(
                                                                                                  function () {
                                                                                                    return this.choice(
                                                                                                      function () {
                                                                                                        return this.choice(
                                                                                                          function () {
                                                                                                            return this.choice(
                                                                                                              function () {
                                                                                                                return this.choice(
                                                                                                                  function () {
                                                                                                                    return this.choice(
                                                                                                                      function () {
                                                                                                                        return this.choice(
                                                                                                                          function () {
                                                                                                                            return this.choice(
                                                                                                                              function () {
                                                                                                                                return this.choice(
                                                                                                                                  function () {
                                                                                                                                    return this.choice(
                                                                                                                                      function () {
                                                                                                                                        return this.choice(
                                                                                                                                          function () {
                                                                                                                                            return this.choice(
                                                                                                                                              function () {
                                                                                                                                                return this.choice(
                                                                                                                                                  function () {
                                                                                                                                                    return this.choice(
                                                                                                                                                      function () {
                                                                                                                                                        return this.choice(
                                                                                                                                                          function () {
                                                                                                                                                            return this.choice(
                                                                                                                                                              function () {
                                                                                                                                                                return this.choice(
                                                                                                                                                                  function () {
                                                                                                                                                                    return this.choice(
                                                                                                                                                                      function () {
                                                                                                                                                                        return this.choice(
                                                                                                                                                                          function () {
                                                                                                                                                                            return this.choice(
                                                                                                                                                                              function () {
                                                                                                                                                                                return this.choice(
                                                                                                                                                                                  function () {
                                                                                                                                                                                    return this.choice(
                                                                                                                                                                                      function () {
                                                                                                                                                                                        return this.choice(
                                                                                                                                                                                          function () {
                                                                                                                                                                                            return this.choice(
                                                                                                                                                                                              function () { return this.string("..."); },
                                                                                                                                                                                              function () { return this.string("."); }
                                                                                                                                                                                            );
                                                                                                                                                                                          },
                                                                                                                                                                                          function () { return this.string("?"); }
                                                                                                                                                                                        );
                                                                                                                                                                                      },
                                                                                                                                                                                      function () { return this.string(":"); }
                                                                                                                                                                                    );
                                                                                                                                                                                  },
                                                                                                                                                                                  function () { return this.string(";"); }
                                                                                                                                                                                );
                                                                                                                                                                              },
                                                                                                                                                                              function () { return this.string(","); }
                                                                                                                                                                            );
                                                                                                                                                                          },
                                                                                                                                                                          function () { return this.string("<<="); }
                                                                                                                                                                        );
                                                                                                                                                                      },
                                                                                                                                                                      function () { return this.string(">>="); }
                                                                                                                                                                    );
                                                                                                                                                                  },
                                                                                                                                                                  function () { return this.string(">>>="); }
                                                                                                                                                                );
                                                                                                                                                              },
                                                                                                                                                              function () { return this.string("=>"); }
                                                                                                                                                            );
                                                                                                                                                          },
                                                                                                                                                          function () { return this.string("==="); }
                                                                                                                                                        );
                                                                                                                                                      },
                                                                                                                                                      function () { return this.string("!=="); }
                                                                                                                                                    );
                                                                                                                                                  },
                                                                                                                                                  function () { return this.string("=="); }
                                                                                                                                                );
                                                                                                                                              },
                                                                                                                                              function () { return this.string("!="); }
                                                                                                                                            );
                                                                                                                                          },
                                                                                                                                          function () { return this.string("!"); }
                                                                                                                                        );
                                                                                                                                      },
                                                                                                                                      function () { return this.string("="); }
                                                                                                                                    );
                                                                                                                                  },
                                                                                                                                  function () { return this.string("~"); }
                                                                                                                                );
                                                                                                                              },
                                                                                                                              function () { return this.string("<<"); }
                                                                                                                            );
                                                                                                                          },
                                                                                                                          function () { return this.string(">>"); }
                                                                                                                        );
                                                                                                                      },
                                                                                                                      function () { return this.string(">>>"); }
                                                                                                                    );
                                                                                                                  },
                                                                                                                  function () { return this.string("<="); }
                                                                                                                );
                                                                                                              },
                                                                                                              function () { return this.string(">="); }
                                                                                                            );
                                                                                                          },
                                                                                                          function () { return this.string("<"); }
                                                                                                        );
                                                                                                      },
                                                                                                      function () { return this.string(">"); }
                                                                                                    );
                                                                                                  },
                                                                                                  function () { return this.string("++"); }
                                                                                                );
                                                                                              },
                                                                                              function () { return this.string("--"); }
                                                                                            );
                                                                                          },
                                                                                          function () { return this.string("+="); }
                                                                                        );
                                                                                      },
                                                                                      function () { return this.string("-="); }
                                                                                    );
                                                                                  },
                                                                                  function () { return this.string("*="); }
                                                                                );
                                                                              },
                                                                              function () { return this.string("/="); }
                                                                            );
                                                                          },
                                                                          function () { return this.string("%="); }
                                                                        );
                                                                      },
                                                                      function () { return this.string("+"); }
                                                                    );
                                                                  },
                                                                  function () { return this.string("-"); }
                                                                );
                                                              },
                                                              function () { return this.string("*"); }
                                                            );
                                                          },
                                                          function () { return this.string("/"); }
                                                        );
                                                      },
                                                      function () { return this.string("%"); }
                                                    );
                                                  },
                                                  function () { return this.string("||"); }
                                                );
                                              },
                                              function () { return this.string("&&"); }
                                            );
                                          },
                                          function () { return this.string("|="); }
                                        );
                                      },
                                      function () { return this.string("^="); }
                                    );
                                  },
                                  function () { return this.string("&="); }
                                );
                              },
                              function () { return this.string("|"); }
                            );
                          },
                          function () { return this.string("^"); }
                        );
                      },
                      function () { return this.string("&"); }
                    );
                  },
                  function () { return this.string("#"); }
                );
              },
              function () { return this.string("@@"); }
            );
          },
          function () { return this.string("@"); }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.identifierName = /* rule */ function () {
  var c;
  return this.memoize("identifierName_40shyLSAnOXbMPGpUKRlAw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return c = this.idStart.call(this)
          },
          function () {
            return this.repeat(
              this.idContinue
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.idStart = /* rule */ function () {
  return this.memoize("idStart_PvtK2KTVqcqPuXFrxK4P6A",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () {
                        return this.char.call(this, ["a", "z"], ["A", "Z"]);
                      },
                      function () { return this.string("$"); }
                    );
                  },
                  function () { return this.string("_"); }
                );
              },
              function () {
                return this.sequence(
                  function () { return this.string("\\"); },
                  function () { return this.string("u"); },
                  this.hex,
                  this.hex,
                  this.hex,
                  this.hex
                );
              }
            );
          },
          function () {
            return this.sequence(
              function () { return this.string("\\"); },
              function () { return this.string("u"); },
              function () { return this.string("{"); },
              function () {
                return this.repeat1(
                  this.hex
                );
              },
              function () { return this.string("}"); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.idContinue = /* rule */ function () {
  return this.memoize("idContinue_seKt5o7tLN2+Tkd5DEhxrg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () {
                        return this.choice(
                          function () {
                            return this.choice(
                              function () {
                                return this.char.call(this, ["a", "z"], ["A", "Z"], ["0", "9"]);
                              },
                              function () { return this.string("$"); }
                            );
                          },
                          function () { return this.string("_"); }
                        );
                      },
                      function () {
                        return this.sequence(
                          function () { return this.string("\\"); },
                          function () { return this.string("u"); },
                          this.hex,
                          this.hex,
                          this.hex,
                          this.hex
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () { return this.string("\\"); },
                      function () { return this.string("u"); },
                      function () { return this.string("{"); },
                      function () {
                        return this.repeat1(
                          this.hex
                        );
                      },
                      function () { return this.string("}"); }
                    );
                  }
                );
              },
              function () { return this.string("\u200c"); }
            );
          },
          function () { return this.string("\u200d"); }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.multilineComment = /* rule */ function () {
  return this.memoize("multilineComment_qjm506qhCEENP4tREsH3zQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () { return this.string("/*"); },
          function () {
            return this.repeat(
              function () {
                return this.sequence(
                  function () {
                    return this.negate(
                      function () { return this.string("*/"); }
                    );
                  },
                  this.char
                );
              }
            );
          },
          function () { return this.string("*/"); }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.singlelineComment = /* rule */ function () {
  return this.memoize("singlelineComment_bl2UTrtxuCuXHzN3zVWCvQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () { return this.string("//"); },
          function () {
            return this.repeat(
              function () {
                return this.sequence(
                  function () {
                    return this.negate(
                      this.newline
                    );
                  },
                  this.char
                );
              }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.spaces = /* rule */ function () {
  return this.memoize("spaces_745lgxf8szHjRXitWZPHuA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.repeat1(
          this.space
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
}
ECMAScriptLexer.prototype.space = /* rule */ function () {
  return this.memoize("space_FoHm2zTI0yCDKzyZNl/rpw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () {
                        return this.choice(
                          function () {
                            return this.choice(
                              function () { return this.string("\u0009"); },
                              function () { return this.string("\u000b"); }
                            );
                          },
                          function () { return this.string("\u000c"); }
                        );
                      },
                      function () { return this.string("\u0020"); }
                    );
                  },
                  function () { return this.string("\u00a0"); }
                );
              },
              function () { return this.string("\ufeff"); }
            );
          },
          this.Zs
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};
ECMAScriptLexer.prototype.Zs = /* rule */ function () {
  return this.memoize("Zs_DGxS2hutYm4aYdzfUcN2OA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = this.fail.call(this);
      this.popStartPosition();
      return result;
    }
  );
}



ECMAScriptLexer.prototype.newline = /* rule */ function () {
  return this.memoize("newline_SMAuzdmNSsH7x1lV5O6FSA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () { return this.string("\u000d\u000a"); },
                      function () { return this.string("\u000a"); }
                    );
                  },
                  function () { return this.string("\u000d"); }
                );
              },
              function () { return this.string("\u2028"); }
            );
          },
          function () { return this.string("\u2029"); }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};
