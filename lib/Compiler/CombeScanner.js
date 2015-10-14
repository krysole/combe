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



CombeScanner.prototype.start = function () {
  return this.memoize.call(this,
    "start_oBTUMkCRgW9HRcQCY6/Gzg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.scan.call(this);
          },
          function () {
            return this.action.call(this,
              function () {
                return ([]);
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
          function () {
            return this.push.call(this, "start", true);
          },
          function () {
            return this.push.call(this, "enclosedBy", null);
          },
          function () {
            return fs = function () {
              return this.repeat1.call(this,
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
                                  return this.doubleNegate.call(this,
                                    function () {
                                      return this.ifNotNull.call(this, filter);
                                    }
                                  );
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
                          return f = function () {
                            return this.fragment.call(this);
                          }.call(this);
                        },
                        function () {
                          return this.set.call(this, "start", false);
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
                }
              );
            }.call(this);
          },
          function () {
            return this.pop.call(this, "enclosedBy");
          },
          function () {
            return this.pop.call(this, "start");
          },
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
    "fragment_ooBNdY2eSk5a/udsVhh/BA",
    function () {
      var text;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.suppressNameColon.call(this);
          },
          function () {
            return this.trigger.call(this, "rule");
          },
          function () {
            return this.suppressDotIdentifierName.call(this);
          },
          function () {
            return this.sequence.call(this,
              function () {
                return text = function () {
                  return (ECMAScriptScanner.prototype.fragment);
                }.call(this).call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("Fragment", text));
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
              function () {
                return this.error.call(this, "Triggered syntax invalid (" + name + ").");
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



CombeScanner.prototype.ruleTrigger = function () {
  return this.memoize.call(this,
    "ruleTrigger_GyFxK9zwEQretEEw61UdpQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.id.call(this, "rule");
          },
          function () {
            return this.sequence.call(this,
              function () {
                return this.inferredName.call(this);
              },
              function () {
                return this.optional.call(this,
                  function () {
                    return this.ws.call(this);
                  }
                );
              },
              function () {
                return this.id.call(this, "rule");
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

CombeScanner.prototype.ruleSyntax = function () {
  return this.memoize.call(this,
    "ruleSyntax_zUAhk+uUHblhjTnuZRZ0ng",
    function () {
      var inf, name, pf, b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return inf = function () {
                  return this.choice.call(this,
                    function () {
                      return this.inferredName.call(this);
                    },
                    function () {
                      return this.action.call(this,
                        function () {
                          return ({ fragments: null, name: null });
                        }
                      );
                    }
                  );
                }.call(this);
              },
              function () {
                return this.id.call(this, "rule");
              },
              function () {
                return this.optional.call(this,
                  function () {
                    return this.ws.call(this);
                  }
                );
              },
              function () {
                return name = function () {
                  return this.optional.call(this,
                    function () {
                      return this.id.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return this.optional.call(this,
                  function () {
                    return this.ws.call(this);
                  }
                );
              },
              function () {
                return pf = function () {
                  return this.optional.call(this,
                    function () {
                      return this.parameterList.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return this.optional.call(this,
                  function () {
                    return this.ws.call(this);
                  }
                );
              },
              function () {
                return this.pn.call(this, '{');
              },
              function () {
                return b = function () {
                  return this.pattern.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, '}');
              },
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
    "parameterList_v6J25xPaomSo2tDX594RmQ",
    function () {
      var f;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "(");
              },
              function () {
                return this.optional.call(this,
                  function () {
                    return this.ws.call(this);
                  }
                );
              },
              function () {
                return this.pn.call(this, ")");
              },
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
              function () {
                return this.pn.call(this, "(");
              },
              function () {
                return f = function () {
                  return this.scan.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, ")");
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
};



CombeScanner.prototype.pattern = function () {
  return this.memoize.call(this,
    "pattern_P/O6pzloI0pG8uzjchHXlg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.choicePattern.call(this);
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.choicePattern = function () {
  return this.memoize.call(this,
    "choicePattern_xuJy29JY/TjcDrVXnEzcZA",
    function () {
      var i, r;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.choice.call(this,
                  function () {
                    return this.sequence.call(this,
                      function () {
                        return this.optional.call(this,
                          function () {
                            return this.ws.call(this);
                          }
                        );
                      },
                      function () {
                        return this.pn.call(this, "|");
                      },
                      function () {
                        return this.optional.call(this,
                          function () {
                            return this.ws.call(this);
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.optional.call(this,
                      function () {
                        return this.ws.call(this);
                      }
                    );
                  }
                );
              },
              function () {
                return i = function () {
                  return this.choiceBranch.call(this);
                }.call(this);
              },
              function () {
                return r = function () {
                  return this.repeat.call(this,
                    function () {
                      return this.choice.call(this,
                        function () {
                          return this.sequence.call(this,
                            function () {
                              return this.optional.call(this,
                                function () {
                                  return this.ws.call(this);
                                }
                              );
                            },
                            function () {
                              return this.pn.call(this, "|");
                            },
                            function () {
                              return this.optional.call(this,
                                function () {
                                  return this.ws.call(this);
                                }
                              );
                            },
                            function () {
                              return this.choiceBranch.call(this);
                            }
                          );
                        }
                      );
                    }
                  );
                }.call(this);
              },
              function () {
                return this.optional.call(this,
                  function () {
                    return this.ws.call(this);
                  }
                );
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
    "choiceBranch_HZOO6gm4BgAiRNzmKxE4sA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequencePattern.call(this);
          },
          function () {
            return this.emptyPattern.call(this);
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.sequencePattern = function () {
  return this.memoize.call(this,
    "sequencePattern_yAwlfaSGA4UiFlGV21JMxQ",
    function () {
      var ps;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return ps = function () {
                  return this.delimited1.call(this,
                    function () {
                      return this.choice.call(this,
                        function () {
                          return this.chainPattern.call(this);
                        }
                      );
                    },
                    function () {
                      return this.choice.call(this,
                        function () {
                          return this.ws.call(this);
                        },
                        function () {
                          return this.sequence.call(this,
                            function () {
                              return this.optional.call(this,
                                function () {
                                  return this.ws.call(this);
                                }
                              );
                            },
                            function () {
                              return this.pn.call(this, ',');
                            },
                            function () {
                              return this.optional.call(this,
                                function () {
                                  return this.ws.call(this);
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
    "chainPattern_AEgtKtnUegF8/FFQTx6FUg",
    function () {
      var p, name, cp;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return p = function () {
                  return this.operatorPattern.call(this);
                }.call(this);
              },
              function () {
                return this.repeat.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return this.sequence.call(this,
                          function () {
                            return this.pn.call(this, ":");
                          },
                          function () {
                            return name = function () {
                              return this.id.call(this);
                            }.call(this);
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
                          function () {
                            return this.pn.call(this, ":");
                          },
                          function () {
                            return cp = function () {
                              return this.operatorPattern.call(this);
                            }.call(this);
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
    "operatorPattern_DzHTe0CCBNreySlcaBEz9A",
    function () {
      var p, b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "&");
              },
              function () {
                return p = function () {
                  return this.hashPattern.call(this);
                }.call(this);
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
              function () {
                return this.pn.call(this, "~");
              },
              function () {
                return this.pn.call(this, "~");
              },
              function () {
                return p = function () {
                  return this.hashPattern.call(this);
                }.call(this);
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
              function () {
                return this.pn.call(this, "~");
              },
              function () {
                return p = function () {
                  return this.hashPattern.call(this);
                }.call(this);
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
                return p = function () {
                  return this.hashPattern.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, "?");
              },
              function () {
                return b = function () {
                  return this.semanticBody.call(this);
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
          function () {
            return this.sequence.call(this,
              function () {
                return p = function () {
                  return this.hashPattern.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, "?");
              },
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
                return p = function () {
                  return this.hashPattern.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, "*");
              },
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
                return p = function () {
                  return this.hashPattern.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, "+");
              },
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
            return this.hashPattern.call(this);
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
    "hashPattern_wvJuuJiXxCJRNJvi+iU2XQ",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "#");
              },
              function () {
                return p = function () {
                  return this.primaryPattern.call(this);
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("HashPattern", p));
                  }
                );
              }
            );
          },
          function () {
            return this.primaryPattern.call(this);
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
    "primaryPattern_9SDKrRFdOQ9o5mt2ecymUQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.bindPattern.call(this);
          },
          function () {
            return this.predicatePattern.call(this);
          },
          function () {
            return this.actionPattern.call(this);
          },
          function () {
            return this.callRulePattern.call(this);
          },
          function () {
            return this.callImmediatePattern.call(this);
          },
          function () {
            return this.objectPattern.call(this);
          },
          function () {
            return this.eachPattern.call(this);
          },
          function () {
            return this.stringPattern.call(this);
          },
          function () {
            return this.numberPattern.call(this);
          },
          function () {
            return this.regularExpressionPattern.call(this);
          },
          function () {
            return this.nestedArrayPattern.call(this);
          },
          function () {
            return this.dotPattern.call(this);
          },
          function () {
            return this.subpattern.call(this);
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.bindPattern = function () {
  return this.memoize.call(this,
    "bindPattern_ctAd45z+c4VVzpqgAi3cTw",
    function () {
      var name;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return name = function () {
                  return this.id.call(this);
                }.call(this);
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
    "predicatePattern_qk3EVY0rY6QLAUGE0RCF9w",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "?");
              },
              function () {
                return b = function () {
                  return this.semanticBody.call(this);
                }.call(this);
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
    "actionPattern_zZY+teupJut+GMFK8tiVgw",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "!");
              },
              function () {
                return b = function () {
                  return this.semanticBody.call(this);
                }.call(this);
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

CombeScanner.prototype.callRulePattern = function () {
  return this.memoize.call(this,
    "callRulePattern_h4m29IaydQpeqLP3Qxy3tw",
    function () {
      var name, f, as;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, ".");
              },
              function () {
                return name = function () {
                  return this.id.call(this);
                }.call(this);
              },
              function () {
                return this.choice.call(this,
                  function () {
                    return this.sequence.call(this,
                      function () {
                        return this.pn.call(this, "(");
                      },
                      function () {
                        return this.optional.call(this,
                          function () {
                            return this.ws.call(this);
                          }
                        );
                      },
                      function () {
                        return this.pn.call(this, ")");
                      },
                      function () {
                        return this.action.call(this,
                          function () {
                            return (Ast("CallRulePattern", name, []));
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence.call(this,
                      function () {
                        return this.pn.call(this, "(");
                      },
                      function () {
                        return this.negate.call(this,
                          function () {
                            return this.choice.call(this,
                              function () {
                                return this.sequence.call(this,
                                  function () {
                                    return this.optional.call(this,
                                      function () {
                                        return this.ws.call(this);
                                      }
                                    );
                                  },
                                  function () {
                                    return this.pn.call(this, ")");
                                  }
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return f = function () {
                          return this.scan.call(this);
                        }.call(this);
                      },
                      function () {
                        return this.pn.call(this, ")");
                      },
                      function () {
                        return this.action.call(this,
                          function () {
                            return (Ast("CallRulePattern", name, [f]));
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence.call(this,
                      function () {
                        return this.pn.call(this, "[");
                      },
                      function () {
                        return as = function () {
                          return this.delimited.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return this.pattern.call(this);
                                }
                              );
                            },
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return this.pn.call(this, ";");
                                }
                              );
                            }
                          );
                        }.call(this);
                      },
                      function () {
                        return this.pn.call(this, "]");
                      },
                      function () {
                        return this.action.call(this,
                          function () {
                            return (Ast("CallRulePattern", name, as));
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.action.call(this,
                      function () {
                        return (Ast("CallRulePattern", name, []));
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

CombeScanner.prototype.callImmediatePattern = function () {
  return this.memoize.call(this,
    "callImmediatePattern_fxp5wJ53IAVSc0xqFLq4Cw",
    function () {
      var b, f, as;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "%");
              },
              function () {
                return b = function () {
                  return this.semanticBody.call(this);
                }.call(this);
              },
              function () {
                return this.choice.call(this,
                  function () {
                    return this.sequence.call(this,
                      function () {
                        return this.pn.call(this, "(");
                      },
                      function () {
                        return this.optional.call(this,
                          function () {
                            return this.ws.call(this);
                          }
                        );
                      },
                      function () {
                        return this.pn.call(this, ")");
                      },
                      function () {
                        return this.action.call(this,
                          function () {
                            return (Ast("CallImmediatePattern", b, []));
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence.call(this,
                      function () {
                        return this.pn.call(this, "(");
                      },
                      function () {
                        return this.negate.call(this,
                          function () {
                            return this.choice.call(this,
                              function () {
                                return this.sequence.call(this,
                                  function () {
                                    return this.optional.call(this,
                                      function () {
                                        return this.ws.call(this);
                                      }
                                    );
                                  },
                                  function () {
                                    return this.pn.call(this, ")");
                                  }
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return f = function () {
                          return this.scan.call(this);
                        }.call(this);
                      },
                      function () {
                        return this.pn.call(this, ")");
                      },
                      function () {
                        return this.action.call(this,
                          function () {
                            return (Ast("CallImmediatePattern", b, [f]));
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence.call(this,
                      function () {
                        return this.pn.call(this, "[");
                      },
                      function () {
                        return as = function () {
                          return this.delimited.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return this.pattern.call(this);
                                }
                              );
                            },
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return this.pn.call(this, ";");
                                }
                              );
                            }
                          );
                        }.call(this);
                      },
                      function () {
                        return this.pn.call(this, "]");
                      },
                      function () {
                        return this.action.call(this,
                          function () {
                            return (Ast("CallImmediatePattern", b, as));
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.action.call(this,
                      function () {
                        return (Ast("CallImmediatePattern", b, []));
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

CombeScanner.prototype.objectPattern = function () {
  return this.memoize.call(this,
    "objectPattern_phqJZw0y3vHUMd5Be0Qhrg",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "@");
              },
              function () {
                return b = function () {
                  return this.semanticBody.call(this);
                }.call(this);
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

CombeScanner.prototype.eachPattern = function () {
  return this.memoize.call(this,
    "eachPattern_CBosh6D/PT0m5hY34hZ71w",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "*");
              },
              function () {
                return b = function () {
                  return this.semanticBody.call(this);
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return (Ast("EachPattern", b));
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
    "stringPattern_JCqHcPf/pW+nGAWA5y9PFQ",
    function () {
      var text;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return text = function () {
                  return this.st.call(this);
                }.call(this);
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
    "numberPattern_8lkmDsK8UC0nBfOysbxoRw",
    function () {
      var text;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return text = function () {
                  return this.num.call(this);
                }.call(this);
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
    "regularExpressionPattern_oqykHfwpYTcYXyUfQNHcFQ",
    function () {
      var text;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return text = function () {
                  return this.regex.call(this);
                }.call(this);
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
    "nestedArrayPattern_KpgqnrDwXgydYfsB8yI4Ig",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "[");
              },
              function () {
                return p = function () {
                  return this.pattern.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, "]");
              },
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
    "dotPattern_s0X6bu9MDFEY0hc2tYZu0g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, ".");
              },
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
    "subpattern_5xb+wRp1nZgzvp+dzA7jxQ",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "(");
              },
              function () {
                return p = function () {
                  return this.pattern.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, ")");
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
    "semanticBody_CCSHUT3j29IK/9/2ypeS4w",
    function () {
      var f;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return this.pn.call(this, "(");
              },
              function () {
                return this.negate.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return this.sequence.call(this,
                          function () {
                            return this.optional.call(this,
                              function () {
                                return this.ws.call(this);
                              }
                            );
                          },
                          function () {
                            return this.pn.call(this, ")");
                          }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return f = function () {
                  return this.scan.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, ")");
              },
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
              function () {
                return this.pn.call(this, "{");
              },
              function () {
                return f = function () {
                  return this.scan.call(this);
                }.call(this);
              },
              function () {
                return this.pn.call(this, "}");
              },
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
                return f = function () {
                  return this.scan.call(this,
                    function () {
                      return this.choice.call(this,
                        function () {
                          return this.semanticBodyFilter.call(this);
                        }
                      );
                    }
                  );
                }.call(this);
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
    "semanticBodyFilter_Iw4U6xsheKeRFk2oJit0xA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.regularExpressionLiteral.call(this);
          },
          function () {
            return this.stringLiteral.call(this);
          },
          function () {
            return this.numberLiteral.call(this);
          },
          function () {
            return this.nullLiteral.call(this);
          },
          function () {
            return this.booleanLiteral.call(this);
          },
          function () {
            return this.identifierName.call(this);
          },
          function () {
            return this.pn.call(this, "-");
          },
          function () {
            return this.pn.call(this, ".");
          },
          function () {
            return this.pn.call(this, "(");
          },
          function () {
            return this.pn.call(this, "[");
          },
          function () {
            return this.pn.call(this, "{");
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



CombeScanner.prototype.suppressNameColon = function () {
  return this.memoize.call(this,
    "suppressNameColon_BCSdqxtUC6GOrHB32xKuuA",
    function () {
      var f1;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = function () {
                  return this.id.call(this);
                }.call(this);
              },
              function () {
                return this.doubleNegate.call(this,
                  function () {
                    return this.pn.call(this, ":");
                  }
                );
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
    "suppressDotIdentifierName_7Tft3hAkPeY6X5RpAyflxA",
    function () {
      var f1, f2, f3;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = function () {
                  return this.pn.call(this, ".");
                }.call(this);
              },
              function () {
                return f2 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return f3 = function () {
                  return this.id.call(this);
                }.call(this);
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
    "inferredName_w1QQGUTtq1OeRDFocSa3dw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.dotAssign.call(this);
          },
          function () {
            return this.propdeclAssign.call(this);
          },
          function () {
            return this.subscriptAssign.call(this);
          },
          function () {
            return this.variableAssign.call(this);
          }
        );
      }.call(this);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeScanner.prototype.dotAssign = function () {
  return this.memoize.call(this,
    "dotAssign_c48JLBwqYO6xRAXJWXOaDQ",
    function () {
      var f1, f2, f3, f4, f5, f6;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = function () {
                  return this.pn.call(this, ".");
                }.call(this);
              },
              function () {
                return f2 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return f3 = function () {
                  return this.id.call(this);
                }.call(this);
              },
              function () {
                return f4 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return f5 = function () {
                  return this.pn.call(this, "=");
                }.call(this);
              },
              function () {
                return f6 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return ({ name: f3, fragments: Ast("Composite", [f1, f2, f3, f4, f5, f6]) });
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

CombeScanner.prototype.propdeclAssign = function () {
  return this.memoize.call(this,
    "propdeclAssign_ZmPUkXWQPgp9hiYKkjdD2w",
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
                      return f1 = function () {
                        return this.id.call(this);
                      }.call(this);
                    },
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return f1 = function () {
                            return this.st.call(this);
                          }.call(this);
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
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return f3 = function () {
                  return this.pn.call(this, ":");
                }.call(this);
              },
              function () {
                return f4 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return ({ name: name, fragments: Ast("Composite", [f1, f2, f3, f4]) });
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

CombeScanner.prototype.subscriptAssign = function () {
  return this.memoize.call(this,
    "subscriptAssign_uB4Yzv7jfJ9ivNSfGHZUMg",
    function () {
      var f1, f2, f3, f4, f5, f6, f7, f8;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = function () {
                  return this.pn.call(this, "[");
                }.call(this);
              },
              function () {
                return f2 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return f3 = function () {
                  return this.st.call(this);
                }.call(this);
              },
              function () {
                return f4 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return f5 = function () {
                  return this.pn.call(this, "]");
                }.call(this);
              },
              function () {
                return f6 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return f7 = function () {
                  return this.pn.call(this, "=");
                }.call(this);
              },
              function () {
                return f8 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return ({ name: eval(f3), fragments: Ast("Composite", [f1, f2, f3, f4, f5, f6, f7, f8]) });
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

CombeScanner.prototype.variableAssign = function () {
  return this.memoize.call(this,
    "variableAssign_5pNo+Q1zh9448i285eanpQ",
    function () {
      var f1, f2, f3, f4;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return f1 = function () {
                  return this.id.call(this);
                }.call(this);
              },
              function () {
                return f2 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return f3 = function () {
                  return this.pn.call(this, "=");
                }.call(this);
              },
              function () {
                return f4 = function () {
                  return this.optional.call(this,
                    function () {
                      return this.ws.call(this);
                    }
                  );
                }.call(this);
              },
              function () {
                return this.action.call(this,
                  function () {
                    return ({ name: f1, fragments: Ast("Composite", [f1, f2, f3, f4]) });
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



CombeScanner.prototype.id = function (expected) {
  var text;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = function () {
    return this.choice.call(this,
      function () {
        return this.sequence.call(this,
          function () {
            return text = function () {
              return this.slice.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.identifierName.call(this);
                    }
                  );
                }
              );
            }.call(this);
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
            return text = function () {
              return this.slice.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.punctuator.call(this);
                    }
                  );
                }
              );
            }.call(this);
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
    "st_n7TF52DDCjRCVmWtUcndxA",
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
                    return this.stringLiteral.call(this);
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

CombeScanner.prototype.num = function () {
  return this.memoize.call(this,
    "num_q4zORkTXPhDqEtlwDkKXBA",
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
                    return this.numberLiteral.call(this);
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

CombeScanner.prototype.regex = function () {
  return this.memoize.call(this,
    "regex_j2IaAlu9CjiHyMneeTtxuA",
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
                    return this.regularExpressionLiteral.call(this);
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

CombeScanner.prototype.ws = function () {
  return this.memoize.call(this,
    "ws_s8+/E4oRohz7Z1QITSPGJQ",
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
                    return this.repeat1.call(this,
                      function () {
                        return this.choice.call(this,
                          function () {
                            return this.multilineComment.call(this);
                          },
                          function () {
                            return this.singlelineComment.call(this);
                          },
                          function () {
                            return this.spaces.call(this);
                          },
                          function () {
                            return this.newline.call(this);
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

CombeScanner.prototype.newline = function () {
  return this.memoize.call(this,
    "newline_MPyg3Q6TwpJ/w5n5cse1iw",
    function () {
      var text, start, end;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = function () {
        return this.choice.call(this,
          function () {
            return this.sequence.call(this,
              function () {
                return text = function () {
                  return this.slice.call(this,
                    function () {
                      return this.choice.call(this,
                        function () {
                          return (ECMAScriptScanner.prototype.newline);
                        }.call(this)
                      );
                    }
                  );
                }.call(this);
              },
              function () {
                return start = function () {
                  return this.getPosition.call(this);
                }.call(this);
              },
              function () {
                return this.lookahead.call(this,
                  function () {
                    return this.choice.call(this,
                      function () {
                        return this.sequence.call(this,
                          function () {
                            return this.optional.call(this,
                              function () {
                                return this.spaces.call(this);
                              }
                            );
                          },
                          function () {
                            return end = function () {
                              return this.getPosition.call(this);
                            }.call(this);
                          }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.set.call(this, "indent", end - start);
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
    }
  );
};
