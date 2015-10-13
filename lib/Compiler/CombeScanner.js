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
var Ast = require("./CombeAst.js");



function CombeScanner(input, sourcename) {
  Grammar.call(this, input, sourcename);
  
  this.init("start", false);
  this.init("enclosedBy", null);
  this.init("fragments", null);
  this.init("indent", 0);
};
CombeScanner.prototype = Object.create(Grammar.prototype);
CombeScanner.prototype.constructor = CombeScanner;
module.exports = CombeScanner;



CombeScanner.prototype.start = function () {
  return this.memoize.call(this,
    "start_Pe8FbDRsnAwhZHRIguGTEA",
    function () {
      var f;
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
                        return f = this.scanFile.call(this);
                      }
                    );
                  }
                );
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (f);
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
}



CombeScanner.prototype.scanFile = function () {
  return this.memoize.call(this,
    "scanFile_dxSJa91DFG4zLBX81origg",
    function () {
      var h, f;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return h = this.hashbang.call(this);
              },
              function () {
                return f = this.scan.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("Composite", [Ast("Fragment", h), f]));
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
}



CombeScanner.prototype.scan = function (filter) {
  var fs, f;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = function () {
    return this.choice.call(this,
      function () {
        return this.sequence.call(this,
          this.push.call(this, "start", true),
          this.push.call(this, "enclosedBy", null),
          function () {
            return fs = function () {
              return this.repeat.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.choice.call(this,
                            function () {
                              return this.sequence.call(this,
                                function () {
                                  return this.predicate.call(this,
                                    function () {
                                      return (this.get("enclosedBy") == null);
                                    }
                                  );
                                },
                                function () {
                                  return this.doubleNegate.call(this, this.ifNotNull.call(this, filter));
                                }
                              );
                            },
                            function () {
                              return this.predicate.call(this,
                                function () {
                                  return (this.get("enclosedBy") != null);
                                }
                              );
                            }
                          );
                        },
                        function () {
                          return f = this.fragment.call(this);
                        },
                        this.set.call(this, "start", false),
                        function () {
                          return this.action.call(this,
                            function () {
                              return (f);
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }.call(this);
          },
          this.pop.call(this, "enclosedBy"),
          this.pop.call(this, "start"),
          function () {
            return this.action.call(this,
              function () {
                return (Ast("Composite", fs));
              }
            );
          }
        );
      }
    );
  }.call(this);
  this.popStartPosition.call(this);
  return __result;
};



CombeScanner.prototype.fragment = function () {
  return this.memoize.call(this,
    "fragment_VXQKxBHXBu5TcCgHAj7Uxw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.suppressNameColon,
          this.trigger.call(this, "rule"),
          this.suppressDotIdentifierName,
          function () {
            return (ECMAScriptScanner.prototype.fragment);
          }.call(this)
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



CombeScanner.prototype.trigger = function (name) {
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = function () {
    return this.choice.call(this,
      function () {
        return this.sequence.call(this,
          function () {
            return this.doubleNegate.call(this,
              function () {
                return (this[name + "Trigger"]);
              }.call(this)
            );
          },
          function () {
            return this.choice.call(this,
              function () {
                return (this[name + "Syntax"]);
              }.call(this),
              this.error.call(this, "Triggered syntax invalid (" + name + ").")
            );
          }
        );
      }
    );
  }.call(this);
  this.popStartPosition.call(this);
  return __result;
}



CombeScanner.prototype.ruleTrigger = function () {
  return this.memoize.call(this,
    "ruleTrigger_lfdqOBE+GYfakw7z9aj2UA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.id.call(this, "rule"),
          function () {
            return this.sequence.call(this,
              this.inferredName,
              function () {
                return this.optional.call(this, this.ws);
              },
              this.id.call(this, "rule")
            );
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.ruleSyntax = function () {
  return this.memoize.call(this,
    "ruleSyntax_sl3BU+hsefHePGRJoGrbnQ",
    function () {
      var inf, name, pf, b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return inf = this.inferredName.call(this);
              },
              this.id.call(this, "rule"),
              function () {
                return this.optional.call(this, this.ws);
              },
              function () {
                return name = function () {
                  return this.optional.call(this, this.id);
                }.call(this);
              },
              function () {
                return this.optional.call(this, this.ws);
              },
              function () {
                return pf = function () {
                  return this.optional.call(this, this.parameterList);
                }.call(this);
              },
              function () {
                return this.optional.call(this, this.ws);
              },
              this.pn.call(this, '{'),
              function () {
                return b = this.pattern.call(this);
              },
              this.pn.call(this, '}'),
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("Composite", [
    inf.fragments,
    Ast("Rule", this.get("indent"), name, inf.name, pf, b)
  ]));
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

CombeScanner.prototype.parameterList = function () {
  return this.memoize.call(this,
    "parameterList_wWLG/hBt/xOyelMdwMCeng",
    function () {
      var f;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "("),
              function () {
                return this.optional.call(this, this.ws);
              },
              this.pn.call(this, ")"),
              function () {
                return this.action.call(this,
                  function () {
                    return (null);
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "("),
              function () {
                return f = this.scan.call(this);
              },
              this.pn.call(this, ")"),
              function () {
                return this.action.call(this,
                  function () {
                    return (f);
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



CombeScanner.prototype.pattern = function () {
  return this.memoize.call(this,
    "pattern_dxVAwfLP8fSeR13tx81UtA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this, this.choicePattern);
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.choicePattern = function () {
  return this.memoize.call(this,
    "choicePattern_4cuxdzsztqPx8HvGXdvDbw",
    function () {
      var i, r, b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.optional.call(this, this.ws);
              },
              function () {
                return this.optional.call(this, this.pn.call(this, "|"));
              },
              function () {
                return this.optional.call(this, this.ws);
              },
              function () {
                return i = this.choiceBranch.call(this);
              },
              function () {
                return this.optional.call(this, this.ws);
              },
              function () {
                return r = function () {
                  return this.repeat.call(this,
                    function () {
                      return this.choice.call(this,
                        function () {
                          return this.sequence.call(this,
                            this.pn.call(this, '|'),
                            function () {
                              return this.optional.call(this, this.ws);
                            },
                            function () {
                              return b = this.choiceBranch.call(this);
                            },
                            function () {
                              return this.optional.call(this, this.ws);
                            },
                            function () {
                              return this.action.call(this,
                                function () {
                                  return (b);
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("ChoicePattern", [i].concat(r)));
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
CombeScanner.prototype.choiceBranch = function () {
  return this.memoize.call(this,
    "choiceBranch_Ju8u7wOgxzejSNfkUMpaEA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this, this.sequencePattern, this.emptyPattern);
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.sequencePattern = function () {
  return this.memoize.call(this,
    "sequencePattern_EyhbVV8DCzlh78NL6ign7A",
    function () {
      var ps, bindPattern, ws, pn;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return ps = this.delimited1.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return bindPattern = this.next.call(this);
                      }
                    );
                  }
                ).call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return ws = this.next.call(this);
                      },
                      function () {
                        return this.sequence.call(this,
                          function () {
                            return this.optional.call(this,
                              function () {
                                return ws = this.next.call(this);
                              }
                            );
                          },
                          function () {
                            return pn = this.next.call(this);
                          }.call(this, ','),
                          function () {
                            return this.optional.call(this,
                              function () {
                                return ws = this.next.call(this);
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                ).call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return ( ps.length > 1 ? Ast("SequencePattern", ps) : ps[0] );
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

CombeScanner.prototype.chainPattern = function () {
  return this.memoize.call(this,
    "chainPattern_beZim8MoX7hJ1j5lHFieFQ",
    function () {
      var p, name, cp;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return p = this.operatorPattern.call(this);
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return this.sequence.call(this,
                          this.pn.call(this, ":"),
                          function () {
                            return name = this.id.call(this);
                          },
                          function () {
                            return p = function () {
                              return this.action.call(this,
                                function () {
                                  return (Ast("BindPattern", p, name));
                                }
                              );
                            }.call(this);
                          }
                        );
                      },
                      function () {
                        return this.sequence.call(this,
                          this.pn.call(this, ":"),
                          function () {
                            return cp = this.operatorPattern.call(this);
                          },
                          function () {
                            return p = function () {
                              return this.action.call(this,
                                function () {
                                  return (Ast("ChainPattern", p, cp));
                                }
                              );
                            }.call(this);
                          }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (p);
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

CombeScanner.prototype.operatorPattern = function () {
  return this.memoize.call(this,
    "operatorPattern_itjWcSSwFExldTlTJS0XIA",
    function () {
      var p, b, semanticBody;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "&"),
              function () {
                return p = this.secondaryPattern.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("LookaheadPattern",    p));
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "~"),
              this.pn.call(this, "~"),
              function () {
                return p = this.secondaryPattern.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("DoubleNegatePattern", p));
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "~"),
              function () {
                return p = this.secondaryPattern.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("NegatePattern",       p));
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return p = this.secondaryPattern.call(this);
              },
              this.pn.call(this, "?"),
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("OptionalPattern",     p));
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return p = this.secondaryPattern.call(this);
              },
              this.pn.call(this, "*"),
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("RepeatPattern",       p));
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return p = this.secondaryPattern.call(this);
              },
              this.pn.call(this, "+"),
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("Repeat1Pattern",      p));
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return p = this.secondaryPattern.call(this);
              },
              this.pn.call(this, "|"),
              function () {
                return b = function () {
                  return semanticBody = this.next.call(this);
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("ChoicePattern", [p, Ast("ActionPattern", b)]));
                  }
                );
              }
            );
          },
          this.secondaryPattern
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.secondaryPattern = function () {
  return this.memoize.call(this,
    "secondaryPattern_IzbVUoF8ahesTor7A8Ds9Q",
    function () {
      var p, name, af, f, nf, ap, pattern;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return p = this.primaryPattern.call(this);
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return this.sequence.call(this,
                          this.pn.call(this, "."),
                          function () {
                            return name = this.id.call(this);
                          },
                          this.pn.call(this, "("),
                          function () {
                            return af = this.scan.call(this);
                          },
                          this.pn.call(this, ")"),
                          function () {
                            return p = function () {
                              return this.action.call(this,
                                function () {
                                  return (Ast("DotMethodCallPattern", p, name, [af]));
                                }
                              );
                            }.call(this);
                          }
                        );
                      },
                      function () {
                        return this.sequence.call(this,
                          this.pn.call(this, "."),
                          function () {
                            return name = this.id.call(this);
                          },
                          function () {
                            return p = function () {
                              return this.action.call(this,
                                function () {
                                  return (Ast("DotPattern", p, name));
                                }
                              );
                            }.call(this);
                          }
                        );
                      },
                      function () {
                        return this.sequence.call(this,
                          this.pn.call(this, "("),
                          function () {
                            return this.optional.call(this, this.ws);
                          },
                          this.pn.call(this, ")"),
                          function () {
                            return p = function () {
                              return this.action.call(this,
                                function () {
                                  return (Ast("CallPattern", p, []));
                                }
                              );
                            }.call(this);
                          }
                        );
                      },
                      function () {
                        return this.sequence.call(this,
                          this.pn.call(this, "("),
                          function () {
                            return this.negate.call(this,
                              function () {
                                return this.choice.call(this,
                                  function () {
                                    return this.sequence.call(this,
                                      function () {
                                        return this.optional.call(this, this.ws);
                                      },
                                      this.pn.call(this, ")")
                                    );
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return f = this.scan.call(this);
                          },
                          this.pn.call(this, ")"),
                          function () {
                            return p = function () {
                              return this.action.call(this,
                                function () {
                                  return (Ast("CallPattern", p, [f]));
                                }
                              );
                            }.call(this);
                          }
                        );
                      },
                      function () {
                        return this.sequence.call(this,
                          this.pn.call(this, "["),
                          function () {
                            return nf = this.scan.call(this);
                          },
                          this.pn.call(this, "]"),
                          this.pn.call(this, "("),
                          function () {
                            return af = this.scan.call(this);
                          },
                          this.pn.call(this, ")"),
                          function () {
                            return p = function () {
                              return this.action.call(this,
                                function () {
                                  return (Ast("SubscriptMethodCallPattern", p, nf, [af]));
                                }
                              );
                            }.call(this);
                          }
                        );
                      },
                      function () {
                        return this.sequence.call(this,
                          this.pn.call(this, "["),
                          function () {
                            return nf = this.scan.call(this);
                          },
                          this.pn.call(this, "]"),
                          function () {
                            return p = function () {
                              return this.action.call(this,
                                function () {
                                  return (Ast("SubscriptPattern", p, nf));
                                }
                              );
                            }.call(this);
                          }
                        );
                      },
                      function () {
                        return this.sequence.call(this,
                          this.pn.call(this, "{"),
                          function () {
                            return ap = function () {
                              return pattern = this.next.call(this);
                            }.call(this);
                          },
                          this.pn.call(this, "}"),
                          function () {
                            return p = function () {
                              return this.action.call(this,
                                function () {
                                  return (Ast("CallPattern", p, [ap]));
                                }
                              );
                            }.call(this);
                          }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (p);
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

CombeScanner.prototype.primaryPattern = function () {
  return this.memoize.call(this,
    "primaryPattern_6RrCNOBmG//5t96M1ZSoXA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this, this.bindPattern, this.predicatePattern, this.actionPattern, this.immediatePattern, this.propertyPattern, this.objectPattern, this.hashPattern, this.stringPattern, this.numberPattern, this.regularExpressionPattern, this.nestedArrayPattern, this.dotPattern, this.subpattern);
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.bindPattern = function () {
  return this.memoize.call(this,
    "bindPattern_VWLkVu4BJg4/suwnQOTMNQ",
    function () {
      var name;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return name = this.id.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("BindPattern", Ast("NextPattern"), name));
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

CombeScanner.prototype.predicatePattern = function () {
  return this.memoize.call(this,
    "predicatePattern_Ebuz+e+2KHcA+x61uF+c7w",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "?"),
              function () {
                return b = this.semanticBody.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("PredicatePattern", b));
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

CombeScanner.prototype.actionPattern = function () {
  return this.memoize.call(this,
    "actionPattern_BDXACoIHIMToEclhGt5QzA",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "!"),
              function () {
                return b = this.semanticBody.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("ActionPattern", b));
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

CombeScanner.prototype.immediatePattern = function () {
  return this.memoize.call(this,
    "immediatePattern_gYFOfV6du50yCihsu41jyQ",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "%"),
              function () {
                return b = this.semanticBody.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("ImmediatePattern", b));
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

CombeScanner.prototype.propertyPattern = function () {
  return this.memoize.call(this,
    "propertyPattern_bUllMas4u+0ha88JRH3V1g",
    function () {
      var name;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "."),
              function () {
                return name = this.id.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("PropertyPattern", name));
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

CombeScanner.prototype.objectPattern = function () {
  return this.memoize.call(this,
    "objectPattern_Ywa639ZvGpzMfcYivrvTrw",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "@"),
              function () {
                return b = this.semanticBody.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("ObjectPattern", b));
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

CombeScanner.prototype.hashPattern = function () {
  return this.memoize.call(this,
    "hashPattern_HnOCEyPl/vgB9X67PGEiAQ",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "#"),
              function () {
                return b = this.semanticBody.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("HashPattern", b));
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

CombeScanner.prototype.stringPattern = function () {
  return this.memoize.call(this,
    "stringPattern_5zhyxHq3E/Wvbp15VEIaWA",
    function () {
      var text;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return text = this.st.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("StringPattern", text));
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

CombeScanner.prototype.numberPattern = function () {
  return this.memoize.call(this,
    "numberPattern_UTBk/a5KtIwe1mUZQXXdSQ",
    function () {
      var text;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return text = this.num.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("NumberPattern", text));
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

CombeScanner.prototype.regularExpressionPattern = function () {
  return this.memoize.call(this,
    "regularExpressionPattern_BlS95rnlcjYADvJR6a6LxQ",
    function () {
      var text;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return text = this.regex.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("RegularExpressionPattern", text));
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

CombeScanner.prototype.nestedArrayPattern = function () {
  return this.memoize.call(this,
    "nestedArrayPattern_ksTItLtIN6rNQqFMjY0GLg",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "["),
              function () {
                return p = this.pattern.call(this);
              },
              this.pn.call(this, "]"),
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("NestedArrayPattern", p));
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

CombeScanner.prototype.dotPattern = function () {
  return this.memoize.call(this,
    "dotPattern_6qxX/M3Zof2HWABe8vK7ZQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "."),
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("NextPattern"));
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

CombeScanner.prototype.subpattern = function () {
  return this.memoize.call(this,
    "subpattern_9AGqiD8iokmS2flvSKW4DA",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "("),
              function () {
                return p = this.pattern.call(this);
              },
              this.pn.call(this, ")"),
              function () {
                return this.action.call(this,
                  function () {
                    return (p);
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

CombeScanner.prototype.emptyPattern = function () {
  return this.memoize.call(this,
    "emptyPattern_q0nnb/x0dDTqzFk7YpxE/g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.action.call(this,
              function () {
                return (Ast("EmptyPattern"));
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



CombeScanner.prototype.semanticBody = function () {
  return this.memoize.call(this,
    "semanticBody_6ZQc04lx8q+0z0pIDaU/mA",
    function () {
      var f, semanticBodyFilter;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "("),
              function () {
                return this.negate.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return this.sequence.call(this,
                          function () {
                            return this.optional.call(this, this.ws);
                          },
                          this.pn.call(this, ")")
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return f = this.scan.call(this);
              },
              this.pn.call(this, ")"),
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("ExpressionSemanticBody", f));
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              this.pn.call(this, "{"),
              function () {
                return f = this.scan.call(this);
              },
              this.pn.call(this, "}"),
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("FunctionSemanticBody", f));
                  }
                );
              }
            );
          },
          function () {
            return this.sequence.call(this,
              function () {
                return f = this.scan.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return semanticBodyFilter = this.next.call(this);
                      }
                    );
                  }
                ).call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("ExpressionSemanticBody", f));
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
CombeScanner.prototype.semanticBodyFilter = function () {
  return this.memoize.call(this,
    "semanticBodyFilter_/h2jKSTu02thu8Gr5g01/w",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this, this.regularExpressionLiteral, this.stringLiteral, this.numberLiteral, this.nullLiteral, this.booleanLiteral, this.identifierName, this.pn.call(this, "-"), this.pn.call(this, "."), this.pn.call(this, "("), this.pn.call(this, "["), this.pn.call(this, "{"));
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



CombeScanner.prototype.suppressNameColon = function () {
  return this.memoize.call(this,
    "suppressNameColon_zHY/KIdMrGteSy51ikPUCQ",
    function () {
      var f1;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = this.id.call(this);
              },
              function () {
                return this.doubleNegate.call(this, this.pn.call(this, ":"));
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (f1);
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



CombeScanner.prototype.suppressDotIdentifierName = function () {
  return this.memoize.call(this,
    "suppressDotIdentifierName_vPRWQbU9c/p3ZsLV1lMFKQ",
    function () {
      var f1, f2, f3;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = this.pn.call(this, ".").call(this);
              },
              function () {
                return f2 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return f3 = this.id.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("Composite", [f1, f2, f3]));
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



CombeScanner.prototype.inferredName = function () {
  return this.memoize.call(this,
    "inferredName_9jo28XHyS6dEik971eXEZg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this, this.dotAssign, this.propdeclAssign, this.subscriptAssign, this.variableAssign);
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.dotAssign = function () {
  return this.memoize.call(this,
    "dotAssign_hctRctiCUs7nOOAtlHEK/A",
    function () {
      var f1, f2, f3, f4, f5, f6;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = this.pn.call(this, ".").call(this);
              },
              function () {
                return f2 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return f3 = this.id.call(this);
              },
              function () {
                return f4 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return f5 = this.pn.call(this, "=").call(this);
              },
              function () {
                return f6 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
 name: f3, fragments: Ast("Composite", [f1, f2, f3, f4, f5, f6])                   }
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

CombeScanner.prototype.propdeclAssign = function () {
  return this.memoize.call(this,
    "propdeclAssign_I1Lm5BBbNPq0owNlZtcrRA",
    function () {
      var name, f1, f2, f3, f4;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return name = function () {
                  return this.choice.call(this,
                    function () {
                      return f1 = this.id.call(this);
                    },
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return f1 = this.st.call(this);
                        },
                        function () {
                          return this.action.call(this,
                            function () {
                              return (eval(f1));
                            }
                          );
                        }
                      );
                    }
                  );
                }.call(this);
              },
              function () {
                return f2 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return f3 = this.pn.call(this, ":").call(this);
              },
              function () {
                return f4 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
 name: name, fragments: Ast("Composite", [f1, f2, f3, f4])                   }
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

CombeScanner.prototype.subscriptAssign = function () {
  return this.memoize.call(this,
    "subscriptAssign_xvtZCVC/9YInkdabLwTdvw",
    function () {
      var f1, f2, f3, f4, f5, f6, f7, f8;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = this.pn.call(this, "[").call(this);
              },
              function () {
                return f2 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return f3 = this.st.call(this);
              },
              function () {
                return f4 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return f5 = this.pn.call(this, "]").call(this);
              },
              function () {
                return f6 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return f7 = this.pn.call(this, "=").call(this);
              },
              function () {
                return f8 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
 name: eval(f3), fragments: Ast("Composite", [f1, f2, f3, f4, f5, f6, f7, f8])                   }
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

CombeScanner.prototype.variableAssign = function () {
  return this.memoize.call(this,
    "variableAssign_jpt4dSQIaC6QqbeORRnHlQ",
    function () {
      var f1, f2, f3, f4;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = this.id.call(this);
              },
              function () {
                return f2 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return f3 = this.pn.call(this, "=").call(this);
              },
              function () {
                return f4 = function () {
                  return this.optional.call(this, this.ws);
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
 name: f1, fragments: Ast("Composite", [f1, f2, f3, f4])                   }
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



CombeScanner.prototype.id = function (expected) {
  var text;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = function () {
    return this.choice.call(this,
      function () {
        return this.sequence.call(this,
          function () {
            return text = this.slice.call(this,
              function () {
                return this.choice.call(this, this.identifierName);
              }
            ).call(this);
          },
          function () {
            return this.predicate.call(this,
              function () {
                return (expected == null || text == expected);
              }
            );
          },
          function () {
            return this.action.call(this,
              function () {
                return (text);
              }
            );
          }
        );
      }
    );
  }.call(this);
  this.popStartPosition.call(this);
  return __result;
};

CombeScanner.prototype.pn = function (expected) {
  var text;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = function () {
    return this.choice.call(this,
      function () {
        return this.sequence.call(this,
          function () {
            return text = this.slice.call(this,
              function () {
                return this.choice.call(this, this.punctuator);
              }
            ).call(this);
          },
          function () {
            return this.predicate.call(this,
              function () {
                return (expected == null || text == expected);
              }
            );
          },
          function () {
            return this.action.call(this,
              function () {
                return (text);
              }
            );
          }
        );
      }
    );
  }.call(this);
  this.popStartPosition.call(this);
  return __result;
};

CombeScanner.prototype.st = function () {
  return this.memoize.call(this,
    "st_7rasRwPPM0ZT4V6ShQWkRA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.stringLiteral);
            }
          )
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.num = function () {
  return this.memoize.call(this,
    "num_YMzAi9du7zbz5lOpDWUQZw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.numberLiteral);
            }
          )
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.regex = function () {
  return this.memoize.call(this,
    "regex_BjWjLw+u/8wA/PGK4iaNnA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.slice.call(this,
            function () {
              return this.choice.call(this, this.regularExpressionLiteral);
            }
          )
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.ws = function () {
  return this.memoize.call(this,
    "ws_CbCFXMaPgUO1gJc9dptQoA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          this.slice.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.repeat1.call(this,
                    function () {
                      return this.choice.call(this, this.multilineComment, this.singlelineComment, this.spaces, this.newline);
                    }
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

CombeScanner.prototype.newline = function () {
  return this.memoize.call(this,
    "newline_Wj9Bw89xaBPBn6Y6HeAPGg",
    function () {
      var text, start, end;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return text = this.slice.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return (ECMAScriptScanner.prototype.newline);
                      }.call(this)
                    );
                  }
                ).call(this);
              },
              function () {
                return start = this.getPosition.call(this).call(this);
              },
              function () {
                return this.doubleNegate.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return this.sequence.call(this,
                          this.spaces,
                          function () {
                            return end = this.getPosition.call(this).call(this);
                          }
                        );
                      }
                    );
                  }
                );
              },
              this.set.call(this, "indent", end - start),
              function () {
                return this.action.call(this,
                  function () {
                    return (text);
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
