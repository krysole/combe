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

var TextGrammar = require("../TextGrammar.js");



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
var ECMAScriptLexer = function (sourcename) {
  TextGrammar.call(this, sourcename);
  
  this.init("enclosedBy", null);
  this.init("indent", 0);
  this.init("lineStart", 0);
  
  this.init("fragments", []);
};
ECMAScriptLexer.prototype = Object.create(TextGrammar.prototype);
ECMAScriptLexer.prototype.constructor = ECMAScriptLexer;
ECMAScriptLexer.name = "ECMAScriptLexer";
module.exports = ECMAScriptLexer;



ECMAScriptLexer.prototype.start = /* rule */ function () {
  return this._memoize("start_F6DfdEojioeKG2nNz12HmA",
    function () {
      this._ignore();
      this._pushsp();
      var result = this.allTokens.call(this);
      this._popsp();
      return result;
    }
  );
}

ECMAScriptLexer.prototype.allTokens = /* rule */ function () {
  return this._memoize("allTokens_2kBrecZBDzBGgwBg259wng",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this.repeat(
          this.token
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
}


ECMAScriptLexer.prototype.token = /* rule */ function () {
  var text;
  return this._memoize("token_eTtW9EGpbCzckA4RcZ7hFA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () {
                        return this._choice(
                          function () {
                            return this._choice(
                              function () {
                                return this._choice(
                                  function () {
                                    return this._choice(
                                      function () {
                                        return this._choice(
                                          function () {
                                            return this._choice(
                                              function () {
                                                return this._choice(
                                                  function () {
                                                    return this._choice(
                                                      function () {
                                                        return this._choice(
                                                          function () {
                                                            return this._choice(
                                                              function () {
                                                                return this._sequence(
                                                                  function () {
                                                                    return text = function () {
                                                                      return this.input.call(this,
                                                                        this.multilineComment
                                                                      );
                                                                    }.call(this)
                                                                  },
                                                                  function () {
                                                                    return this._action(
                                                                      function () { return (["Whitespace",     "MultilineComment",  text, null]); }
                                                                    );
                                                                  }
                                                                );
                                                              },
                                                              function () {
                                                                return this._sequence(
                                                                  function () {
                                                                    return text = function () {
                                                                      return this.input.call(this,
                                                                        this.singlelineComment
                                                                      );
                                                                    }.call(this)
                                                                  },
                                                                  function () {
                                                                    return this._action(
                                                                      function () { return (["Whitespace",     "SinglelineComment", text, null]); }
                                                                    );
                                                                  }
                                                                );
                                                              }
                                                            );
                                                          },
                                                          function () {
                                                            return this._sequence(
                                                              function () {
                                                                return text = function () {
                                                                  return this.input.call(this,
                                                                    this.spaces
                                                                  );
                                                                }.call(this)
                                                              },
                                                              function () {
                                                                return this._action(
                                                                  function () { return (["Whitespace",     "Spaces",            text, null]); }
                                                                );
                                                              }
                                                            );
                                                          }
                                                        );
                                                      },
                                                      function () {
                                                        return this._sequence(
                                                          function () {
                                                            return text = function () {
                                                              return this.input.call(this,
                                                                this.newline
                                                              );
                                                            }.call(this)
                                                          },
                                                          function () {
                                                            return this._action(
                                                              function () { return (["Whitespace",     "Newline",           text, null]); }
                                                            );
                                                          }
                                                        );
                                                      }
                                                    );
                                                  },
                                                  function () {
                                                    return this._sequence(
                                                      function () {
                                                        return text = function () {
                                                          return this.input.call(this,
                                                            this.templateStringComplete
                                                          );
                                                        }.call(this)
                                                      },
                                                      function () {
                                                        return this._action(
                                                          function () { return (["TemplateString", "Complete",          text, null]); }
                                                        );
                                                      }
                                                    );
                                                  }
                                                );
                                              },
                                              function () {
                                                return this._sequence(
                                                  function () {
                                                    return text = function () {
                                                      return this.input.call(this,
                                                        this.templateStringHead
                                                      );
                                                    }.call(this)
                                                  },
                                                  function () {
                                                    return this._action(
                                                      function () { return (["TemplateString", "Head",              text, null]); }
                                                    );
                                                  }
                                                );
                                              }
                                            );
                                          },
                                          function () {
                                            return this._sequence(
                                              function () {
                                                return text = function () {
                                                  return this.input.call(this,
                                                    this.templateStringMiddle
                                                  );
                                                }.call(this)
                                              },
                                              function () {
                                                return this._action(
                                                  function () { return (["TemplateString", "Middle",            text, null]); }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      },
                                      function () {
                                        return this._sequence(
                                          function () {
                                            return text = function () {
                                              return this.input.call(this,
                                                this.templateStringTail
                                              );
                                            }.call(this)
                                          },
                                          function () {
                                            return this._action(
                                              function () { return (["TemplateString", "Tail",              text, null]); }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  },
                                  function () {
                                    return this._sequence(
                                      function () {
                                        return text = function () {
                                          return this.input.call(this,
                                            this.regularExpressionLiteral
                                          );
                                        }.call(this)
                                      },
                                      function () {
                                        return this._action(
                                          function () { return (["Literal",        "RegularExpression", text, eval(text)]); }
                                        );
                                      }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this._sequence(
                                  function () {
                                    return text = function () {
                                      return this.input.call(this,
                                        this.stringLiteral
                                      );
                                    }.call(this)
                                  },
                                  function () {
                                    return this._action(
                                      function () { return (["Literal",        "String",            text, eval(text)]); }
                                    );
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return this._sequence(
                              function () {
                                return text = function () {
                                  return this.input.call(this,
                                    this.numberLiteral
                                  );
                                }.call(this)
                              },
                              function () {
                                return this._action(
                                  function () { return (["Literal",        "Number",            text, eval(text)]); }
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this._sequence(
                          function () {
                            return text = function () {
                              return this.input.call(this,
                                this.nullLiteral
                              );
                            }.call(this)
                          },
                          function () {
                            return this._action(
                              function () { return (["Literal",        "Null",              text, eval(text)]); }
                            );
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this._sequence(
                      function () {
                        return text = function () {
                          return this.input.call(this,
                            this.booleanLiteral
                          );
                        }.call(this)
                      },
                      function () {
                        return this._action(
                          function () { return (["Literal",        "Boolean",           text, eval(text)]); }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this._sequence(
                  function () {
                    return text = function () {
                      return this.input.call(this,
                        this.punctuator
                      );
                    }.call(this)
                  },
                  function () {
                    return this._action(
                      function () { return (["Punctuator",     text,                text, null]); }
                    );
                  }
                );
              }
            );
          },
          function () {
            return this._sequence(
              function () {
                return text = function () {
                  return this.input.call(this,
                    this.identifierName
                  );
                }.call(this)
              },
              function () {
                return this._action(
                  function () { return (["IdentifierName", "IdentifierName",    text, null]); }
                );
              }
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.templateStringComplete = /* rule */ function () {
  return this._memoize("templateStringComplete_hsZX+4vzaK9zh4IQDgEtTA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () { return this._string("`"); },
          function () {
            return this.repeat(
              this.templateCharacter
            );
          },
          function () { return this._string("`"); }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.templateStringHead = /* rule */ function () {
  return this._memoize("templateStringHead_EDvYgPlhX4gw9HJZNAWi3Q",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () { return this._string("`"); },
          function () {
            return this.repeat(
              this.templateCharacter
            );
          },
          this.lbrace
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.templateStringMiddle = /* rule */ function () {
  return this._memoize("templateStringMiddle_G6ntmNoJbc4y/6FSZMhryA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          this.rbrace,
          function () {
            return this.repeat(
              this.templateCharacter
            );
          },
          this.lbrace
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.templateStringTail = /* rule */ function () {
  return this._memoize("templateStringTail_l2/xJDLyz8UDdAmdQSq6Xw",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          this.rbrace,
          function () {
            return this.repeat(
              this.templateCharacter
            );
          },
          function () { return this._string("`"); }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.lbrace = /* rule */ function () {
  return this._memoize("lbrace_fvn0Y2B/wwJYbrJ7p2iKhQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () { return this._string("${"); },
          function () {
            return this.push.call(this, "enclosedBy", "${");
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.rbrace = /* rule */ function () {
  return this._memoize("rbrace_p2kdI1fIHr3ZhGRoKOVrbA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () {
            return this._predicate(
              function () { return (this.get("enclosedBy") === "${"); }
            );
          },
          function () { return this._string("}"); },
          function () {
            return this.pop.call(this, "enclosedBy");
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.templateCharacter = /* rule */ function () {
  return this._memoize("templateCharacter_3BA9mLlTpEe4QfljqC/NbQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () {
                        return this._sequence(
                          function () {
                            return this._negate(
                              this.newline
                            );
                          },
                          function () {
                            return this._negate(
                              function () { return this._string("$"); }
                            );
                          },
                          function () {
                            return this._negate(
                              function () { return this._string("\\"); }
                            );
                          },
                          this.char
                        );
                      },
                      function () {
                        return this._sequence(
                          function () { return this._string("$"); },
                          function () {
                            return this._negate(
                              function () { return this._string("{"); }
                            );
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this._sequence(
                      function () { return this._string("\\"); },
                      this.escapeSequence
                    );
                  }
                );
              },
              this.newline
            );
          },
          function () {
            return this._sequence(
              function () { return this._string("\\"); },
              this.newline
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.regularExpressionLiteral = /* rule */ function () {
  return this._memoize("regularExpressionLiteral_bdWJNA4MOxsY2wso7sIQAg",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () { return this._string("/"); },
          this.regularExpressionStart,
          function () {
            return this.repeat(
              this.regularExpressionContinue
            );
          },
          function () { return this._string("/"); },
          function () {
            return this.repeat(
              this.regularExpressionFlag
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionStart = /* rule */ function () {
  return this._memoize("regularExpressionStart_vnIGNicBsmcuxzxUnlkrlg",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () {
            return this._negate(
              function () { return this._string("*"); }
            );
          },
          this.regularExpressionContinue
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionContinue = /* rule */ function () {
  return this._memoize("regularExpressionContinue_eCMiKXVqHeyKilSgrhJKAg",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._sequence(
                  function () { return this._string("\\"); },
                  this.char
                );
              },
              this.regularExpressionClass
            );
          },
          function () {
            return this._sequence(
              function () {
                return this._negate(
                  function () { return this._string("\\"); }
                );
              },
              function () {
                return this._negate(
                  function () { return this._string("/"); }
                );
              },
              function () {
                return this._negate(
                  function () { return this._string("["); }
                );
              },
              function () {
                return this._negate(
                  this.newline
                );
              },
              function () {
                return this._negate(
                  this.space
                );
              },
              this.char
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionClass = /* rule */ function () {
  return this._memoize("regularExpressionClass_4bDGfqlDyNfLGrjdpNTy5Q",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._sequence(
              function () {
                return this._negate(
                  function () { return this._string("]"); }
                );
              },
              function () {
                return this._negate(
                  function () { return this._string("\\"); }
                );
              },
              function () {
                return this._negate(
                  this.newline
                );
              },
              this.char
            );
          },
          function () {
            return this._sequence(
              function () { return this._string("\\"); },
              this.char
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.regularExpressionFlag = /* rule */ function () {
  return this._memoize("regularExpressionFlag_Gc2a3G0Fo7obyqAm98gQDA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () {
            return this._negate(
              function () { return this._string("\\"); }
            );
          },
          this.idContinue
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.stringLiteral = /* rule */ function () {
  return this._memoize("stringLiteral_ZY/cJkv6HSHevcq5YcU+zQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._sequence(
              function () { return this._string("\""); },
              function () {
                return this.repeat(
                  function () {
                    return this.stringCharacter.call(this,
                      function () { return this._string("\""); }
                    );
                  }
                );
              },
              function () { return this._string("\""); }
            );
          },
          function () {
            return this._sequence(
              function () { return this._string("\'"); },
              function () {
                return this.repeat(
                  function () {
                    return this.stringCharacter.call(this,
                      function () { return this._string("\'"); }
                    );
                  }
                );
              },
              function () { return this._string("\'"); }
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.stringCharacter = /* rule */ function (terminator) {
  return this._memoize("stringCharacter_zvAJDEDdNjVpstpMYhUfpQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._sequence(
                  function () {
                    return this._negate(
                      this.terminator
                    );
                  },
                  function () {
                    return this._negate(
                      this.newline
                    );
                  },
                  function () {
                    return this._negate(
                      function () { return this._string("\\"); }
                    );
                  },
                  this.char
                );
              },
              function () {
                return this._sequence(
                  function () { return this._string("\\"); },
                  this.escapeSequence
                );
              }
            );
          },
          function () {
            return this._sequence(
              function () { return this._string("\\"); },
              this.newline
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.escapeSequence = /* rule */ function () {
  return this._memoize("escapeSequence_ZhE7l/6xxc5ZkDYsY5n6UA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () {
                        return this._choice(
                          function () {
                            return this._choice(
                              function () {
                                return this._choice(
                                  function () {
                                    return this._choice(
                                      function () {
                                        return this._choice(
                                          function () {
                                            return this._choice(
                                              function () {
                                                return this._choice(
                                                  function () {
                                                    return this._choice(
                                                      function () {
                                                        return this._choice(
                                                          function () { return this._string("\'"); },
                                                          function () { return this._string("\""); }
                                                        );
                                                      },
                                                      function () { return this._string("\\"); }
                                                    );
                                                  },
                                                  function () { return this._string("b"); }
                                                );
                                              },
                                              function () { return this._string("f"); }
                                            );
                                          },
                                          function () { return this._string("n"); }
                                        );
                                      },
                                      function () { return this._string("r"); }
                                    );
                                  },
                                  function () { return this._string("t"); }
                                );
                              },
                              function () { return this._string("v"); }
                            );
                          },
                          function () {
                            return this._sequence(
                              function () { return this._string("0"); },
                              function () {
                                return this._negate(
                                  this.digit
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this._sequence(
                          function () { return this._string("x"); },
                          this.hex,
                          this.hex
                        );
                      }
                    );
                  },
                  function () {
                    return this._sequence(
                      function () { return this._string("u"); },
                      this.hex,
                      this.hex,
                      this.hex,
                      this.hex
                    );
                  }
                );
              },
              function () {
                return this._sequence(
                  function () { return this._string("u"); },
                  function () { return this._string("{"); },
                  function () {
                    return this._repeat1(
                      this.hex
                    );
                  },
                  function () { return this._string("}"); }
                );
              }
            );
          },
          function () {
            return this._sequence(
              function () {
                return this._negate(
                  function () { return this._string("\\"); }
                );
              },
              function () {
                return this._negate(
                  this.newline
                );
              },
              function () {
                return this._negate(
                  function () {
                    return this.char.call(this, "\'\"\\bfnrtv");
                  }
                );
              },
              function () {
                return this._negate(
                  function () { return this._string("x"); }
                );
              },
              function () {
                return this._negate(
                  function () { return this._string("u"); }
                );
              },
              this.char
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.numberLiteral = /* rule */ function () {
  return this._memoize("numberLiteral_kGFROjt43+FnbRvG6YeAHA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._sequence(
                      this.decimalLiteral,
                      function () {
                        return this._negate(
                          this.idContinue
                        );
                      }
                    );
                  },
                  function () {
                    return this._sequence(
                      this.binaryIntegerLiteral,
                      function () {
                        return this._negate(
                          this.idContinue
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this._sequence(
                  this.octalIntegerLiteral,
                  function () {
                    return this._negate(
                      this.idContinue
                    );
                  }
                );
              }
            );
          },
          function () {
            return this._sequence(
              this.hexIntegerLiteral,
              function () {
                return this._negate(
                  this.idContinue
                );
              }
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.decimalLiteral = /* rule */ function () {
  return this._memoize("decimalLiteral_1C7UcVMip+Do8Cmhv2Z9rQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._sequence(
              this.decimalIntegerLiteral,
              function () {
                return this._optional(
                  function () {
                    return this._sequence(
                      function () { return this._string("."); },
                      function () {
                        return this._repeat1(
                          this.digit
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this._optional(
                  this.exponent
                );
              }
            );
          },
          function () {
            return this._sequence(
              function () { return this._string("."); },
              function () {
                return this._repeat1(
                  this.digit
                );
              },
              function () {
                return this._optional(
                  this.exponent
                );
              }
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.decimalIntegerLiteral = /* rule */ function () {
  return this._memoize("decimalIntegerLiteral_hZh8NvggAL8MZy60+ZyG4Q",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () { return this._string("0"); },
          function () {
            return this._sequence(
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
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.exponent = /* rule */ function () {
  return this._memoize("exponent_/ybtLHdgYiIkZVmcLEBlog",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () {
            return this._choice(
              function () { return this._string("e"); },
              function () { return this._string("E"); }
            );
          },
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () { return this._string("+"); },
                  function () { return this._string("-"); }
                );
              },
              this._empty
            );
          },
          function () {
            return this._repeat1(
              this.digit
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.binaryIntegerLiteral = /* rule */ function () {
  return this._memoize("binaryIntegerLiteral_fPteiLpa61sWRBIsAYQj9Q",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () {
            return this._choice(
              function () { return this._string("0b"); },
              function () { return this._string("0B"); }
            );
          },
          function () {
            return this._repeat1(
              function () {
                return this._choice(
                  function () { return this._string("0"); },
                  function () { return this._string("1"); }
                );
              }
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.octalIntegerLiteral = /* rule */ function () {
  return this._memoize("octalIntegerLiteral_U61zgSjn9pElRvXeIfjdng",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () {
            return this._choice(
              function () { return this._string("0o"); },
              function () { return this._string("0O"); }
            );
          },
          function () {
            return this._repeat1(
              this.octal
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.hexIntegerLiteral = /* rule */ function () {
  return this._memoize("hexIntegerLiteral_stGG172KI6nsAOWD3I53mA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () {
            return this._choice(
              function () { return this._string("0x"); },
              function () { return this._string("0X"); }
            );
          },
          function () {
            return this._repeat1(
              this.hex
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.nullLiteral = /* rule */ function () {
  return this._memoize("nullLiteral_UkIIxURe8JCy3mZYwAYEGQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () { return this._string("null"); }.call(this);
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.booleanLiteral = /* rule */ function () {
  return this._memoize("booleanLiteral_Rzabt85tF+JtVYMabV4UVQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () { return this._string("true"); },
          function () { return this._string("false"); }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.punctuator = /* rule */ function () {
  return this._memoize("punctuator_z3ViDpb2Okss2jkQdu4odA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              this.openPunctuator,
              this.closePunctuator
            );
          },
          this.basicPunctuator
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.openPunctuator = /* rule */ function () {
  return this._memoize("openPunctuator_8m3VzBlGffvM+RmY9m76mQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._sequence(
                  function () { return this._string("{"); },
                  function () {
                    return this.push.call(this, "enclosedBy", "{");
                  }
                );
              },
              function () {
                return this._sequence(
                  function () { return this._string("("); },
                  function () {
                    return this.push.call(this, "enclosedBy", "(");
                  }
                );
              }
            );
          },
          function () {
            return this._sequence(
              function () { return this._string("["); },
              function () {
                return this.push.call(this, "enclosedBy", "[");
              }
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.closePunctuator = /* rule */ function () {
  return this._memoize("closePunctuator_/btubNEmVON5Fga8uCaJVQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._sequence(
                  function () {
                    return this._predicate(
                      function () { return (this.get("enclosedBy") === "{"); }
                    );
                  },
                  function () { return this._string("}"); },
                  function () {
                    return this.pop.call(this, "enclosedBy");
                  }
                );
              },
              function () {
                return this._sequence(
                  function () {
                    return this._predicate(
                      function () { return (this.get("enclosedBy") === "("); }
                    );
                  },
                  function () { return this._string(")"); },
                  function () {
                    return this.pop.call(this, "enclosedBy");
                  }
                );
              }
            );
          },
          function () {
            return this._sequence(
              function () {
                return this._predicate(
                  function () { return (this.get("enclosedBy") === "["); }
                );
              },
              function () { return this._string("]"); },
              function () {
                return this.pop.call(this, "enclosedBy");
              }
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.basicPunctuator = /* rule */ function () {
  return this._memoize("basicPunctuator_xC9x3roHzwhqxQT7fNeClw",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () {
                        return this._choice(
                          function () {
                            return this._choice(
                              function () {
                                return this._choice(
                                  function () {
                                    return this._choice(
                                      function () {
                                        return this._choice(
                                          function () {
                                            return this._choice(
                                              function () {
                                                return this._choice(
                                                  function () {
                                                    return this._choice(
                                                      function () {
                                                        return this._choice(
                                                          function () {
                                                            return this._choice(
                                                              function () {
                                                                return this._choice(
                                                                  function () {
                                                                    return this._choice(
                                                                      function () {
                                                                        return this._choice(
                                                                          function () {
                                                                            return this._choice(
                                                                              function () {
                                                                                return this._choice(
                                                                                  function () {
                                                                                    return this._choice(
                                                                                      function () {
                                                                                        return this._choice(
                                                                                          function () {
                                                                                            return this._choice(
                                                                                              function () {
                                                                                                return this._choice(
                                                                                                  function () {
                                                                                                    return this._choice(
                                                                                                      function () {
                                                                                                        return this._choice(
                                                                                                          function () {
                                                                                                            return this._choice(
                                                                                                              function () {
                                                                                                                return this._choice(
                                                                                                                  function () {
                                                                                                                    return this._choice(
                                                                                                                      function () {
                                                                                                                        return this._choice(
                                                                                                                          function () {
                                                                                                                            return this._choice(
                                                                                                                              function () {
                                                                                                                                return this._choice(
                                                                                                                                  function () {
                                                                                                                                    return this._choice(
                                                                                                                                      function () {
                                                                                                                                        return this._choice(
                                                                                                                                          function () {
                                                                                                                                            return this._choice(
                                                                                                                                              function () {
                                                                                                                                                return this._choice(
                                                                                                                                                  function () {
                                                                                                                                                    return this._choice(
                                                                                                                                                      function () {
                                                                                                                                                        return this._choice(
                                                                                                                                                          function () {
                                                                                                                                                            return this._choice(
                                                                                                                                                              function () {
                                                                                                                                                                return this._choice(
                                                                                                                                                                  function () {
                                                                                                                                                                    return this._choice(
                                                                                                                                                                      function () {
                                                                                                                                                                        return this._choice(
                                                                                                                                                                          function () {
                                                                                                                                                                            return this._choice(
                                                                                                                                                                              function () {
                                                                                                                                                                                return this._choice(
                                                                                                                                                                                  function () {
                                                                                                                                                                                    return this._choice(
                                                                                                                                                                                      function () {
                                                                                                                                                                                        return this._choice(
                                                                                                                                                                                          function () {
                                                                                                                                                                                            return this._choice(
                                                                                                                                                                                              function () { return this._string("..."); },
                                                                                                                                                                                              function () { return this._string("."); }
                                                                                                                                                                                            );
                                                                                                                                                                                          },
                                                                                                                                                                                          function () { return this._string("?"); }
                                                                                                                                                                                        );
                                                                                                                                                                                      },
                                                                                                                                                                                      function () { return this._string(":"); }
                                                                                                                                                                                    );
                                                                                                                                                                                  },
                                                                                                                                                                                  function () { return this._string(";"); }
                                                                                                                                                                                );
                                                                                                                                                                              },
                                                                                                                                                                              function () { return this._string(","); }
                                                                                                                                                                            );
                                                                                                                                                                          },
                                                                                                                                                                          function () { return this._string("<<="); }
                                                                                                                                                                        );
                                                                                                                                                                      },
                                                                                                                                                                      function () { return this._string(">>="); }
                                                                                                                                                                    );
                                                                                                                                                                  },
                                                                                                                                                                  function () { return this._string(">>>="); }
                                                                                                                                                                );
                                                                                                                                                              },
                                                                                                                                                              function () { return this._string("=>"); }
                                                                                                                                                            );
                                                                                                                                                          },
                                                                                                                                                          function () { return this._string("==="); }
                                                                                                                                                        );
                                                                                                                                                      },
                                                                                                                                                      function () { return this._string("!=="); }
                                                                                                                                                    );
                                                                                                                                                  },
                                                                                                                                                  function () { return this._string("=="); }
                                                                                                                                                );
                                                                                                                                              },
                                                                                                                                              function () { return this._string("!="); }
                                                                                                                                            );
                                                                                                                                          },
                                                                                                                                          function () { return this._string("!"); }
                                                                                                                                        );
                                                                                                                                      },
                                                                                                                                      function () { return this._string("="); }
                                                                                                                                    );
                                                                                                                                  },
                                                                                                                                  function () { return this._string("~"); }
                                                                                                                                );
                                                                                                                              },
                                                                                                                              function () { return this._string("<<"); }
                                                                                                                            );
                                                                                                                          },
                                                                                                                          function () { return this._string(">>"); }
                                                                                                                        );
                                                                                                                      },
                                                                                                                      function () { return this._string(">>>"); }
                                                                                                                    );
                                                                                                                  },
                                                                                                                  function () { return this._string("<="); }
                                                                                                                );
                                                                                                              },
                                                                                                              function () { return this._string(">="); }
                                                                                                            );
                                                                                                          },
                                                                                                          function () { return this._string("<"); }
                                                                                                        );
                                                                                                      },
                                                                                                      function () { return this._string(">"); }
                                                                                                    );
                                                                                                  },
                                                                                                  function () { return this._string("++"); }
                                                                                                );
                                                                                              },
                                                                                              function () { return this._string("--"); }
                                                                                            );
                                                                                          },
                                                                                          function () { return this._string("+="); }
                                                                                        );
                                                                                      },
                                                                                      function () { return this._string("-="); }
                                                                                    );
                                                                                  },
                                                                                  function () { return this._string("*="); }
                                                                                );
                                                                              },
                                                                              function () { return this._string("/="); }
                                                                            );
                                                                          },
                                                                          function () { return this._string("%="); }
                                                                        );
                                                                      },
                                                                      function () { return this._string("+"); }
                                                                    );
                                                                  },
                                                                  function () { return this._string("-"); }
                                                                );
                                                              },
                                                              function () { return this._string("*"); }
                                                            );
                                                          },
                                                          function () { return this._string("/"); }
                                                        );
                                                      },
                                                      function () { return this._string("%"); }
                                                    );
                                                  },
                                                  function () { return this._string("||"); }
                                                );
                                              },
                                              function () { return this._string("&&"); }
                                            );
                                          },
                                          function () { return this._string("|="); }
                                        );
                                      },
                                      function () { return this._string("^="); }
                                    );
                                  },
                                  function () { return this._string("&="); }
                                );
                              },
                              function () { return this._string("|"); }
                            );
                          },
                          function () { return this._string("^"); }
                        );
                      },
                      function () { return this._string("&"); }
                    );
                  },
                  function () { return this._string("#"); }
                );
              },
              function () { return this._string("@@"); }
            );
          },
          function () { return this._string("@"); }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.identifierName = /* rule */ function () {
  return this._memoize("identifierName_A2pBHm1ra1pNz8ABDfBJDA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          this.idStart,
          function () {
            return this.repeat(
              this.idContinue
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.idStart = /* rule */ function () {
  return this._memoize("idStart_KyTVI8qCjX7mECFzawsheA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () {
                        return this.char.call(this, ["a", "z"], ["A", "Z"]);
                      },
                      function () { return this._string("$"); }
                    );
                  },
                  function () { return this._string("_"); }
                );
              },
              function () {
                return this._sequence(
                  function () { return this._string("\\"); },
                  function () { return this._string("u"); },
                  this.hex,
                  this.hex,
                  this.hex,
                  this.hex
                );
              }
            );
          },
          function () {
            return this._sequence(
              function () { return this._string("\\"); },
              function () { return this._string("u"); },
              function () { return this._string("{"); },
              function () {
                return this._repeat1(
                  this.hex
                );
              },
              function () { return this._string("}"); }
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.idContinue = /* rule */ function () {
  return this._memoize("idContinue_In6B1qYRH6PPs0sagbXgFQ",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () {
                        return this._choice(
                          function () {
                            return this._choice(
                              function () {
                                return this.char.call(this, ["a", "z"], ["A", "Z"], ["0", "9"]);
                              },
                              function () { return this._string("$"); }
                            );
                          },
                          function () { return this._string("_"); }
                        );
                      },
                      function () {
                        return this._sequence(
                          function () { return this._string("\\"); },
                          function () { return this._string("u"); },
                          this.hex,
                          this.hex,
                          this.hex,
                          this.hex
                        );
                      }
                    );
                  },
                  function () {
                    return this._sequence(
                      function () { return this._string("\\"); },
                      function () { return this._string("u"); },
                      function () { return this._string("{"); },
                      function () {
                        return this._repeat1(
                          this.hex
                        );
                      },
                      function () { return this._string("}"); }
                    );
                  }
                );
              },
              function () { return this._string("\u200c"); }
            );
          },
          function () { return this._string("\u200d"); }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.multilineComment = /* rule */ function () {
  return this._memoize("multilineComment_hLrPmWMW/tdekmhoZYAYPw",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () { return this._string("/*"); },
          function () {
            return this.repeat(
              function () {
                return this._sequence(
                  function () {
                    return this._negate(
                      function () { return this._string("*/"); }
                    );
                  },
                  this.char
                );
              }
            );
          },
          function () { return this._string("*/"); }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};

ECMAScriptLexer.prototype.singlelineComment = /* rule */ function () {
  return this._memoize("singlelineComment_oV6iYRHxvtbPXhKQLPK4ow",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          function () { return this._string("//"); },
          function () {
            return this.repeat(
              function () {
                return this._sequence(
                  function () {
                    return this._negate(
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
      this._popsp();
      return result;
    }
  );
};



ECMAScriptLexer.prototype.spaces = /* rule */ function () {
  return this._memoize("spaces_w1fHyrHh4mdV832a6NL5jA",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._repeat1(
          this.space
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
}
ECMAScriptLexer.prototype.space = /* rule */ function () {
  return this._memoize("space_3I5zYCRcU5s0JGyAVm9Ipw",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () {
                        return this._choice(
                          function () {
                            return this._choice(
                              function () { return this._string("\u0009"); },
                              function () { return this._string("\u000b"); }
                            );
                          },
                          function () { return this._string("\u000c"); }
                        );
                      },
                      function () { return this._string("\u0020"); }
                    );
                  },
                  function () { return this._string("\u00a0"); }
                );
              },
              function () { return this._string("\ufeff"); }
            );
          },
          this.Zs
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};
ECMAScriptLexer.prototype.Zs = /* rule */ function () {
  return this._memoize("Zs_DGxS2hutYm4aYdzfUcN2OA",
    function () {
      this._ignore();
      this._pushsp();
      var result = this.fail.call(this);
      this._popsp();
      return result;
    }
  );
}



ECMAScriptLexer.prototype.newline = /* rule */ function () {
  return this._memoize("newline_jRrBPI+7JmdXnL1BYOkIgg",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._sequence(
          this._newline,
          function () {
            return this.set.call(this, "lineStart", this.position);
          },
          function () {
            return this._lookahead(
              function () {
                return this._sequence(
                  this.whitespace,
                  function () {
                    return this.set.call(this, "indent", this.position - this.get("lineStart"));
                  }
                );
              }
            );
          }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};
ECMAScriptLexer.prototype._newline = /* rule */ function () {
  return this._memoize("_newline_pj/cDWErBFSp16s73BpbUw",
    function () {
      this._ignore();
      this._pushsp();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () { return this._string("\u000d\u000a"); },
                      function () { return this._string("\u000a"); }
                    );
                  },
                  function () { return this._string("\u000d"); }
                );
              },
              function () { return this._string("\u2028"); }
            );
          },
          function () { return this._string("\u2029"); }
        );
      }.call(this);
      this._popsp();
      return result;
    }
  );
};
