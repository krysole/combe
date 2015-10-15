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

var ECMAScriptScanner = require("./ECMAScriptScanner.js");
var Ast = require("./CombeAst.js");



function CombeScanner(source, sourcename, skipLength) {
  ECMAScriptScanner.call(this, source, sourcename, skipLength);
  
  this.init("start", false);
  this.init("fragments", null);
  this.init("indent", 0);
};
CombeScanner.prototype = Object.create(ECMAScriptScanner.prototype);
CombeScanner.prototype.constructor = CombeScanner;
module.exports = CombeScanner;



CombeScanner.prototype.start = /*rule*/ function () {
  return this.memoize("start_ouKXwTckxAyUfH3htBLhWQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        this.scan,
        function () {
          return this.action(
            function () { return ([]); }
          );
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
}



CombeScanner.prototype.scan = /*rule*/ function (filter) {
  var fs, f;
  this.__ignore();
  this.pushStartPosition();
  var __result = function () {
    (function () {
      return this.push(
        "start", true
      );
    }).call(this);
    (function () {
      return this.push(
        "enclosedBy", null
      );
    }).call(this);
    (function () {
      return fs = function () {
        return this.repeat1(
          function () {
            (function () {
              return this.choice(
                function () {
                  (function () {
                    return this.predicate(
                      function () { return (this.get("enclosedBy") == null); }
                    );
                  }).call(this);
                  return (function () {
                    return this.doubleNegate(
                      function () {
                        return this.ifNotNull(
                          filter
                        );
                      }
                    );
                  }).call(this);
                },
                function () {
                  return this.predicate(
                    function () { return (this.get("enclosedBy") != null); }
                  );
                }
              );
            }).call(this);
            (function () {
              return f = this.fragment.call(this);
            }).call(this);
            (function () {
              return this.set(
                "start", false
              );
            }).call(this);
            return (function () {
              return this.action(
                function () { return (f); }
              );
            }).call(this);
          }
        );
      }.call(this);
    }).call(this);
    (function () {
      return this.pop(
        "enclosedBy"
      );
    }).call(this);
    (function () {
      return this.pop(
        "start"
      );
    }).call(this);
    return (function () {
      return this.action(
        function () { return (Ast("Composite", fs)); }
      );
    }).call(this);
  }.call(this);
  this.popStartPosition();
  return __result;
};



CombeScanner.prototype.fragment = /*rule*/ function () {
  var text;
  return this.memoize("fragment_5PNrL+/nNASwzUOzmbm48A", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        this.suppressNameColon,
        function () {
          return this.trigger(
            "rule"
          );
        },
        this.suppressDotIdentifierName,
        function () {
          (function () {
            return text = function () { return (ECMAScriptScanner.prototype.fragment); }.call(this).call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("Fragment", text)); }
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



CombeScanner.prototype.trigger = /*rule*/ function (name) {
  this.__ignore();
  this.pushStartPosition();
  var __result = function () {
    (function () {
      return this.doubleNegate(
        function () { return (this[name + "Trigger"]); }.call(this)
      );
    }).call(this);
    return (function () {
      return this.choice(
        function () { return (this[name + "Syntax"]); }.call(this),
        function () {
          return this.error(
            "Triggered syntax invalid (" + name + ")."
          );
        }
      );
    }).call(this);
  }.call(this);
  this.popStartPosition();
  return __result;
};



CombeScanner.prototype.ruleTrigger = /*rule*/ function () {
  return this.memoize("ruleTrigger_4rW7QrnGYrf1VAnB0qIl7A", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          return this.id(
            "rule"
          );
        },
        function () {
          (this.inferredName).call(this);
          (function () {
            return this.optional(
              this.ws
            );
          }).call(this);
          return (function () {
            return this.id(
              "rule"
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.ruleSyntax = /*rule*/ function () {
  var inf, name, pf, b;
  return this.memoize("ruleSyntax_dIew8SoeW1/2ghMzzxcgTA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return inf = function () {
          return this.choice(
            this.inferredName,
            function () {
              return this.action(
                function () { return ({ fragments: null, name: null }); }
              );
            }
          );
        }.call(this);
      }).call(this);
      (function () {
        return this.id(
          "rule"
        );
      }).call(this);
      (function () {
        return this.optional(
          this.ws
        );
      }).call(this);
      (function () {
        return name = function () {
          return this.optional(
            this.id
          );
        }.call(this);
      }).call(this);
      (function () {
        return this.optional(
          this.ws
        );
      }).call(this);
      (function () {
        return pf = function () {
          return this.optional(
            this.parameterList
          );
        }.call(this);
      }).call(this);
      (function () {
        return this.optional(
          this.ws
        );
      }).call(this);
      (function () {
        return this.pn(
          '{'
        );
      }).call(this);
      (function () {
        return b = this.pattern.call(this);
      }).call(this);
      (function () {
        return this.pn(
          '}'
        );
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("Composite", [
              inf.fragments,
              Ast("Rule", this.get("indent"), name, inf.name, pf, b)
            ])); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.parameterList = /*rule*/ function () {
  var f;
  return this.memoize("parameterList_DZVXLURsUB6XfxPlwyqbRg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.pn(
              "("
            );
          }).call(this);
          (function () {
            return this.optional(
              this.ws
            );
          }).call(this);
          (function () {
            return this.pn(
              ")"
            );
          }).call(this);
          return (function () {
            return this.action(
              function () { return (null); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return this.pn(
              "("
            );
          }).call(this);
          (function () {
            return f = this.scan.call(this);
          }).call(this);
          (function () {
            return this.pn(
              ")"
            );
          }).call(this);
          return (function () {
            return this.action(
              function () { return (f); }
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



CombeScanner.prototype.pattern = /*rule*/ function () {
  return this.memoize("pattern_9C5x0UDv3onssH6hgPHnlA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = this.choicePattern.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.choicePattern = /*rule*/ function () {
  var i, r;
  return this.memoize("choicePattern_vuER3BJ4pf9LVqny4Kzo7g", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.choice(
          function () {
            (function () {
              return this.optional(
                this.ws
              );
            }).call(this);
            (function () {
              return this.pn(
                "|"
              );
            }).call(this);
            return (function () {
              return this.optional(
                this.ws
              );
            }).call(this);
          },
          function () {
            return this.optional(
              this.ws
            );
          }
        );
      }).call(this);
      (function () {
        return i = this.choiceBranch.call(this);
      }).call(this);
      (function () {
        return r = function () {
          return this.repeat(
            function () {
              (function () {
                return this.optional(
                  this.ws
                );
              }).call(this);
              (function () {
                return this.pn(
                  "|"
                );
              }).call(this);
              (function () {
                return this.optional(
                  this.ws
                );
              }).call(this);
              return (this.choiceBranch).call(this);
            }
          );
        }.call(this);
      }).call(this);
      (function () {
        return this.optional(
          this.ws
        );
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("ChoicePattern", [i].concat(r))); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};
CombeScanner.prototype.choiceBranch = /*rule*/ function () {
  return this.memoize("choiceBranch_UsK0cP2DILadHY3+zOy8hA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        this.sequencePattern,
        this.emptyPattern
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.sequencePattern = /*rule*/ function () {
  var ps;
  return this.memoize("sequencePattern_7hILN0I+u4A5vkINrsWF/w", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return ps = function () {
          return this.delimited1(
            this.chainPattern,
            function () {
              return this.choice(
                this.ws,
                function () {
                  (function () {
                    return this.optional(
                      this.ws
                    );
                  }).call(this);
                  (function () {
                    return this.pn(
                      ','
                    );
                  }).call(this);
                  return (function () {
                    return this.optional(
                      this.ws
                    );
                  }).call(this);
                }
              );
            }
          );
        }.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return ( ps.length > 1 ? Ast("SequencePattern", ps) : ps[0] ); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.chainPattern = /*rule*/ function () {
  var p, name, cp;
  return this.memoize("chainPattern_yIpKiT5WDwQ6SMhhe/eU5g", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return p = this.operatorPattern.call(this);
      }).call(this);
      (function () {
        return this.repeat(
          function () {
            return this.choice(
              function () {
                (function () {
                  return this.pn(
                    ":"
                  );
                }).call(this);
                (function () {
                  return name = this.id.call(this);
                }).call(this);
                return (function () {
                  return p = function () {
                    return this.action(
                      function () { return (Ast("BindPattern", p, name)); }
                    );
                  }.call(this);
                }).call(this);
              },
              function () {
                (function () {
                  return this.pn(
                    ":"
                  );
                }).call(this);
                (function () {
                  return this.pn(
                    ":"
                  );
                }).call(this);
                (function () {
                  return cp = this.operatorPattern.call(this);
                }).call(this);
                return (function () {
                  return p = function () {
                    return this.action(
                      function () { return (Ast("ChainPattern", p, cp)); }
                    );
                  }.call(this);
                }).call(this);
              }
            );
          }
        );
      }).call(this);
      return (function () {
        return this.action(
          function () { return (p); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.operatorPattern = /*rule*/ function () {
  var p, b;
  return this.memoize("operatorPattern_wopCXqtPTlXvS4DNhPEpow", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.pn(
              "&"
            );
          }).call(this);
          (function () {
            return p = this.hashPattern.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("LookaheadPattern",    p)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return this.pn(
              "~"
            );
          }).call(this);
          (function () {
            return this.pn(
              "~"
            );
          }).call(this);
          (function () {
            return p = this.hashPattern.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("DoubleNegatePattern", p)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return this.pn(
              "~"
            );
          }).call(this);
          (function () {
            return p = this.hashPattern.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("NegatePattern",       p)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return p = this.hashPattern.call(this);
          }).call(this);
          (function () {
            return this.pn(
              "?"
            );
          }).call(this);
          (function () {
            return b = this.semanticBody.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("ChoicePattern", [p, Ast("ActionPattern", b)])); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return p = this.hashPattern.call(this);
          }).call(this);
          (function () {
            return this.pn(
              "?"
            );
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("OptionalPattern",     p)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return p = this.hashPattern.call(this);
          }).call(this);
          (function () {
            return this.pn(
              "*"
            );
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("RepeatPattern",       p)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return p = this.hashPattern.call(this);
          }).call(this);
          (function () {
            return this.pn(
              "+"
            );
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("Repeat1Pattern",      p)); }
            );
          }).call(this);
        },
        this.hashPattern
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.hashPattern = /*rule*/ function () {
  var p;
  return this.memoize("hashPattern_igqEY4K54FZ/5DOgi064Vw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.pn(
              "#"
            );
          }).call(this);
          (function () {
            return p = this.primaryPattern.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("HashPattern", p)); }
            );
          }).call(this);
        },
        this.primaryPattern
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.primaryPattern = /*rule*/ function () {
  return this.memoize("primaryPattern_WxaZMia0swmE5ohlt5N32Q", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        this.bindPattern,
        this.predicatePattern,
        this.actionPattern,
        this.callRulePattern,
        this.callImmediatePattern,
        this.objectPattern,
        this.eachPattern,
        this.stringPattern,
        this.numberPattern,
        this.regularExpressionPattern,
        this.nestedArrayPattern,
        this.nestedObjectPattern,
        this.subpattern,
        this.nextPattern
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.bindPattern = /*rule*/ function () {
  var name;
  return this.memoize("bindPattern_hKJ+bzVTzm2p1RTfnYnRkg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          ":"
        );
      }).call(this);
      (function () {
        return name = this.id.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("BindPattern", Ast("NextPattern"), name)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.predicatePattern = /*rule*/ function () {
  var b;
  return this.memoize("predicatePattern_bCEtnj6yj1kg7Scalsv6lQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          "?"
        );
      }).call(this);
      (function () {
        return b = this.semanticBody.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("PredicatePattern", b)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.actionPattern = /*rule*/ function () {
  var b;
  return this.memoize("actionPattern_buJrjXeQZiq9FYqsMfsHsw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          "!"
        );
      }).call(this);
      (function () {
        return b = this.semanticBody.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("ActionPattern", b)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.callRulePattern = /*rule*/ function () {
  var name, f, as;
  return this.memoize("callRulePattern_ydLP4wGSJ9VVeie9XDyQ5A", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return name = this.id.call(this);
      }).call(this);
      return (function () {
        return this.choice(
          function () {
            (function () {
              return this.pn(
                "("
              );
            }).call(this);
            (function () {
              return this.optional(
                this.ws
              );
            }).call(this);
            (function () {
              return this.pn(
                ")"
              );
            }).call(this);
            return (function () {
              return this.action(
                function () { return (Ast("CallRulePattern", name, [])); }
              );
            }).call(this);
          },
          function () {
            (function () {
              return this.pn(
                "("
              );
            }).call(this);
            (function () {
              return this.negate(
                function () {
                  (function () {
                    return this.optional(
                      this.ws
                    );
                  }).call(this);
                  return (function () {
                    return this.pn(
                      ")"
                    );
                  }).call(this);
                }
              );
            }).call(this);
            (function () {
              return f = this.scan.call(this);
            }).call(this);
            (function () {
              return this.pn(
                ")"
              );
            }).call(this);
            return (function () {
              return this.action(
                function () { return (Ast("CallRulePattern", name, [f])); }
              );
            }).call(this);
          },
          function () {
            (function () {
              return this.pn(
                "["
              );
            }).call(this);
            (function () {
              return as = function () {
                return this.delimited(
                  this.pattern,
                  function () {
                    return this.pn(
                      ";"
                    );
                  }
                );
              }.call(this);
            }).call(this);
            (function () {
              return this.pn(
                "]"
              );
            }).call(this);
            return (function () {
              return this.action(
                function () { return (Ast("CallRulePattern", name, as)); }
              );
            }).call(this);
          },
          function () {
            return this.action(
              function () { return (Ast("CallRulePattern", name, [])); }
            );
          }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.callImmediatePattern = /*rule*/ function () {
  var b, f, as;
  return this.memoize("callImmediatePattern_0xnlXj4pGJhhDOZBx422yQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          "%"
        );
      }).call(this);
      (function () {
        return b = this.semanticBody.call(this);
      }).call(this);
      return (function () {
        return this.choice(
          function () {
            (function () {
              return this.pn(
                "("
              );
            }).call(this);
            (function () {
              return this.optional(
                this.ws
              );
            }).call(this);
            (function () {
              return this.pn(
                ")"
              );
            }).call(this);
            return (function () {
              return this.action(
                function () { return (Ast("CallImmediatePattern", b, [])); }
              );
            }).call(this);
          },
          function () {
            (function () {
              return this.pn(
                "("
              );
            }).call(this);
            (function () {
              return this.negate(
                function () {
                  (function () {
                    return this.optional(
                      this.ws
                    );
                  }).call(this);
                  return (function () {
                    return this.pn(
                      ")"
                    );
                  }).call(this);
                }
              );
            }).call(this);
            (function () {
              return f = this.scan.call(this);
            }).call(this);
            (function () {
              return this.pn(
                ")"
              );
            }).call(this);
            return (function () {
              return this.action(
                function () { return (Ast("CallImmediatePattern", b, [f])); }
              );
            }).call(this);
          },
          function () {
            (function () {
              return this.pn(
                "["
              );
            }).call(this);
            (function () {
              return as = function () {
                return this.delimited(
                  this.pattern,
                  function () {
                    return this.pn(
                      ";"
                    );
                  }
                );
              }.call(this);
            }).call(this);
            (function () {
              return this.pn(
                "]"
              );
            }).call(this);
            return (function () {
              return this.action(
                function () { return (Ast("CallImmediatePattern", b, as)); }
              );
            }).call(this);
          },
          function () {
            return this.action(
              function () { return (Ast("CallImmediatePattern", b, [])); }
            );
          }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.objectPattern = /*rule*/ function () {
  var b;
  return this.memoize("objectPattern_gOfSI1kQTuG3c93NKK4opg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          "@"
        );
      }).call(this);
      (function () {
        return b = this.semanticBody.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("ObjectPattern", b)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.eachPattern = /*rule*/ function () {
  var b;
  return this.memoize("eachPattern_b2saHtbCWgHAcmG1t7pw8g", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          "*"
        );
      }).call(this);
      (function () {
        return b = this.semanticBody.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("EachPattern", b)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.stringPattern = /*rule*/ function () {
  var text;
  return this.memoize("stringPattern_YSVN2JLtJGPvT6Yt0VAiUg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return text = this.st.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("StringPattern", text)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.numberPattern = /*rule*/ function () {
  var text;
  return this.memoize("numberPattern_Bp4NGVaTo79ta0quvEcNOA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return text = this.num.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("NumberPattern", text)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.regularExpressionPattern = /*rule*/ function () {
  var text;
  return this.memoize("regularExpressionPattern_POrLYmu918LhxxIN1q/0sg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return text = this.regex.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("RegularExpressionPattern", text)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.nestedArrayPattern = /*rule*/ function () {
  var p;
  return this.memoize("nestedArrayPattern_eBWrE/5XFWm5zcOe6woM9A", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          "["
        );
      }).call(this);
      (function () {
        return p = this.pattern.call(this);
      }).call(this);
      (function () {
        return this.pn(
          "]"
        );
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("NestedArrayPattern", p)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.nestedObjectPattern = /*rule*/ function () {
  var ps;
  return this.memoize("nestedObjectPattern_JSpUmJ49F2ZiCBIixlOnZQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          "{"
        );
      }).call(this);
      (function () {
        return this.optional(
          this.ws
        );
      }).call(this);
      (function () {
        return ps = function () {
          return this.delimited(
            this.propertyPattern,
            function () {
              (function () {
                return this.optional(
                  this.ws
                );
              }).call(this);
              (function () {
                return this.pn(
                  ","
                );
              }).call(this);
              return (function () {
                return this.optional(
                  this.ws
                );
              }).call(this);
            }
          );
        }.call(this);
      }).call(this);
      (function () {
        return this.optional(
          this.ws
        );
      }).call(this);
      (function () {
        return this.pn(
          "}"
        );
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("NestedObjectPattern", ps)); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.subpattern = /*rule*/ function () {
  var p;
  return this.memoize("subpattern_HfvFF7OmyLx9AGsIS5LZnA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          "("
        );
      }).call(this);
      (function () {
        return p = this.pattern.call(this);
      }).call(this);
      (function () {
        return this.pn(
          ")"
        );
      }).call(this);
      return (function () {
        return this.action(
          function () { return (p); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.nextPattern = /*rule*/ function () {
  return this.memoize("nextPattern_Dp9vepoRqTt6nQwRU06d+Q", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return this.pn(
          ":"
        );
      }).call(this);
      (function () {
        return this.negate(
          this.id
        );
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("NextPattern")); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.emptyPattern = /*rule*/ function () {
  return this.memoize("emptyPattern_CvRotf/tf3fTb1INRHIlCg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.action(
        function () { return (Ast("EmptyPattern")); }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.propertyPattern = /*rule*/ function () {
  var name, p, f;
  return this.memoize("propertyPattern_4LRamAcMRew0FfvPsNID9A", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return name = this.id.call(this);
          }).call(this);
          (function () {
            return this.pn(
              ":"
            );
          }).call(this);
          (this.ws).call(this);
          (function () {
            return p = this.chainPattern.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("PropertyPattern", Ast("ExpressionSemanticBody", Ast("Fragment", name.quote())), p)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return name = this.st.call(this);
          }).call(this);
          (function () {
            return this.pn(
              ":"
            );
          }).call(this);
          (this.ws).call(this);
          (function () {
            return p = this.chainPattern.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("PropertyPattern", Ast("ExpressionSemanticBody", Ast("Fragment", name)), p)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return this.pn(
              "("
            );
          }).call(this);
          (function () {
            return this.negate(
              function () {
                (this.ws).call(this);
                return (function () {
                  return this.pn(
                    ")"
                  );
                }).call(this);
              }
            );
          }).call(this);
          (function () {
            return f = this.scan.call(this);
          }).call(this);
          (function () {
            return this.pn(
              ")"
            );
          }).call(this);
          (function () {
            return this.pn(
              ":"
            );
          }).call(this);
          (this.ws).call(this);
          (function () {
            return p = this.chainPattern.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("PropertyPattern", Ast("ExpressionSemanticBody", f), p)); }
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



CombeScanner.prototype.semanticBody = /*rule*/ function () {
  var f;
  return this.memoize("semanticBody_4twZSXK+k5+eUCYmOX2Nvg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.pn(
              "("
            );
          }).call(this);
          (function () {
            return this.negate(
              function () {
                (function () {
                  return this.optional(
                    this.ws
                  );
                }).call(this);
                return (function () {
                  return this.pn(
                    ")"
                  );
                }).call(this);
              }
            );
          }).call(this);
          (function () {
            return f = this.scan.call(this);
          }).call(this);
          (function () {
            return this.pn(
              ")"
            );
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("ExpressionSemanticBody", f)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return this.pn(
              "{"
            );
          }).call(this);
          (function () {
            return f = this.scan.call(this);
          }).call(this);
          (function () {
            return this.pn(
              "}"
            );
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("FunctionSemanticBody", f)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return f = function () {
              return this.scan(
                this.semanticBodyFilter
              );
            }.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("ExpressionSemanticBody", f)); }
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};
CombeScanner.prototype.semanticBodyFilter = /*rule*/ function () {
  return this.memoize("semanticBodyFilter_xjOQO1uD4QVDC4T7JnjFew", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        this.regularExpressionLiteral,
        this.stringLiteral,
        this.numberLiteral,
        this.nullLiteral,
        this.booleanLiteral,
        this.identifierName,
        function () {
          return this.pn(
            "-"
          );
        },
        function () {
          return this.pn(
            "."
          );
        },
        function () {
          return this.pn(
            "("
          );
        },
        function () {
          return this.pn(
            "["
          );
        },
        function () {
          return this.pn(
            "{"
          );
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



CombeScanner.prototype.suppressNameColon = /*rule*/ function () {
  var f1;
  return this.memoize("suppressNameColon_q9p1w+KIPtX2Xj8sG33ikw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return f1 = this.id.call(this);
      }).call(this);
      (function () {
        return this.doubleNegate(
          function () {
            return this.pn(
              ":"
            );
          }
        );
      }).call(this);
      return (function () {
        return this.action(
          function () { return (f1); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



CombeScanner.prototype.suppressDotIdentifierName = /*rule*/ function () {
  var f1, f2, f3;
  return this.memoize("suppressDotIdentifierName_yRpCq10kkxKCXFsqq1bvmg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return f1 = function () {
          return this.pn(
            "."
          );
        }.call(this);
      }).call(this);
      (function () {
        return f2 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      (function () {
        return f3 = this.id.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return (Ast("Composite", [f1, f2, f3])); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



CombeScanner.prototype.inferredName = /*rule*/ function () {
  return this.memoize("inferredName_7m2RxiPVjkFGut+qV8x+dA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        this.dotAssign,
        this.propdeclAssign,
        this.subscriptAssign,
        this.variableAssign
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.dotAssign = /*rule*/ function () {
  var f1, f2, f3, f4, f5, f6;
  return this.memoize("dotAssign_BB+By9t7pP9mQUTA61dAjg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return f1 = function () {
          return this.pn(
            "."
          );
        }.call(this);
      }).call(this);
      (function () {
        return f2 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      (function () {
        return f3 = this.id.call(this);
      }).call(this);
      (function () {
        return f4 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      (function () {
        return f5 = function () {
          return this.pn(
            "="
          );
        }.call(this);
      }).call(this);
      (function () {
        return f6 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return ({ name: f3, fragments: Ast("Composite", [f1, f2, f3, f4, f5, f6]) }); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.propdeclAssign = /*rule*/ function () {
  var name, f1, f2, f3, f4;
  return this.memoize("propdeclAssign_BgH496qE+92kZ3vblV1Btg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return name = function () {
          return this.choice(
            function () {
              return f1 = this.id.call(this);
            },
            function () {
              (function () {
                return f1 = this.st.call(this);
              }).call(this);
              return (function () {
                return this.action(
                  function () { return (eval(f1)); }
                );
              }).call(this);
            }
          );
        }.call(this);
      }).call(this);
      (function () {
        return f2 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      (function () {
        return f3 = function () {
          return this.pn(
            ":"
          );
        }.call(this);
      }).call(this);
      (function () {
        return f4 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return ({ name: name, fragments: Ast("Composite", [f1, f2, f3, f4]) }); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.subscriptAssign = /*rule*/ function () {
  var f1, f2, f3, f4, f5, f6, f7, f8;
  return this.memoize("subscriptAssign_J4p1U6yFW+SgQA9l4ap9Sg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return f1 = function () {
          return this.pn(
            "["
          );
        }.call(this);
      }).call(this);
      (function () {
        return f2 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      (function () {
        return f3 = this.st.call(this);
      }).call(this);
      (function () {
        return f4 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      (function () {
        return f5 = function () {
          return this.pn(
            "]"
          );
        }.call(this);
      }).call(this);
      (function () {
        return f6 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      (function () {
        return f7 = function () {
          return this.pn(
            "="
          );
        }.call(this);
      }).call(this);
      (function () {
        return f8 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return ({ name: eval(f3), fragments: Ast("Composite", [f1, f2, f3, f4, f5, f6, f7, f8]) }); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.variableAssign = /*rule*/ function () {
  var f1, f2, f3, f4;
  return this.memoize("variableAssign_jUIgitp7bVNkMK86tSYZjg", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return f1 = this.id.call(this);
      }).call(this);
      (function () {
        return f2 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      (function () {
        return f3 = function () {
          return this.pn(
            "="
          );
        }.call(this);
      }).call(this);
      (function () {
        return f4 = function () {
          return this.optional(
            this.ws
          );
        }.call(this);
      }).call(this);
      return (function () {
        return this.action(
          function () { return ({ name: f1, fragments: Ast("Composite", [f1, f2, f3, f4]) }); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



CombeScanner.prototype.id = /*rule*/ function (expected) {
  var text;
  this.__ignore();
  this.pushStartPosition();
  var __result = function () {
    (function () {
      return text = function () {
        return this.slice(
          this.identifierName
        );
      }.call(this);
    }).call(this);
    (function () {
      return this.predicate(
        function () { return (expected == null || text == expected); }
      );
    }).call(this);
    return (function () {
      return this.action(
        function () { return (text); }
      );
    }).call(this);
  }.call(this);
  this.popStartPosition();
  return __result;
};

CombeScanner.prototype.pn = /*rule*/ function (expected) {
  var text;
  this.__ignore();
  this.pushStartPosition();
  var __result = function () {
    (function () {
      return text = function () {
        return this.slice(
          this.punctuator
        );
      }.call(this);
    }).call(this);
    (function () {
      return this.predicate(
        function () { return (expected == null || text == expected); }
      );
    }).call(this);
    return (function () {
      return this.action(
        function () { return (text); }
      );
    }).call(this);
  }.call(this);
  this.popStartPosition();
  return __result;
};

CombeScanner.prototype.st = /*rule*/ function () {
  return this.memoize("st_frNxwsw3OuhtJTGZ2ujx/g", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.slice(
        this.stringLiteral
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.num = /*rule*/ function () {
  return this.memoize("num_GPA6SCrKyVOcXlwdUb+dNw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.slice(
        this.numberLiteral
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.regex = /*rule*/ function () {
  return this.memoize("regex_bK05Fgq9bhOdXxRaW0lgkQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.slice(
        this.regularExpressionLiteral
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.ws = /*rule*/ function () {
  return this.memoize("ws_F1DGjzvaeD78a8M1d7JhyQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.slice(
        function () {
          return this.repeat1(
            function () {
              return this.choice(
                this.multilineComment,
                this.singlelineComment,
                this.spaces,
                this.newline
              );
            }
          );
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

CombeScanner.prototype.newline = /*rule*/ function () {
  var text, start, end;
  return this.memoize("newline_/ohMxrKK6fZXNZaFsG17sQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      (function () {
        return text = function () {
          return this.slice(
            function () { return (ECMAScriptScanner.prototype.newline); }.call(this)
          );
        }.call(this);
      }).call(this);
      (function () {
        return start = this.getPosition.call(this);
      }).call(this);
      (function () {
        return this.lookahead(
          function () {
            (function () {
              return this.optional(
                this.spaces
              );
            }).call(this);
            return (function () {
              return end = this.getPosition.call(this);
            }).call(this);
          }
        );
      }).call(this);
      (function () {
        return this.set(
          "indent", end - start
        );
      }).call(this);
      return (function () {
        return this.action(
          function () { return (text); }
        );
      }).call(this);
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};
