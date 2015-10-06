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

var TokenGrammar = require("../TokenGrammar.js");
var Ast = require("../Ast.js");



function CombeParser(input, sourcename) {
  TokenGrammar.call(this, input, sourcename);
  
  this.init("start", false);
  this.init("enclosedBy", null);
  this.init("fragments", null);
  this.init("indent", 0);
};
CombeParser.prototype = Object.create(TokenGrammar.prototype);
CombeParser.prototype.constructor = CombeParser;
module.exports = CombeParser;



CombeParser.prototype.start = function () {
  return this.memoize.call(this,
    "start_YiAEruZ+jYmicqb89c25TA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this, this.scanFile);
      this.popStartPosition.call(this);
      return __result;
    }
  );
}



CombeParser.prototype.scanFile = function () {
  return this.memoize.call(this,
    "scanFile_PklTe+HMJH4U7lVpf7/NQw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this, this.scan);
      this.popStartPosition.call(this);
      return __result;
    }
  );
}



CombeParser.prototype.scan = function (filter) {
  var fs;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.sequence.call(this,
        function () {
          return this.push.call(this, "start", true);
        },
        function () {
          return this.push.call(this, "enclosedBy", null);
        },
        function () {
          return fs = this.fragments.call(this,
            function () {
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
                        this.nextFragment,
                        function () {
                          return this.set.call(this, "start", false);
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
          return this.pop.call(this, "enclosedBy");
        },
        function () {
          return this.pop.call(this, "start");
        },
        function () {
          return this.action.call(this,
            function () {
              return new Ast("Composite", fs);
            }
          );
        }
      );
    }
  );
  this.popStartPosition.call(this);
  return __result;
}

CombeParser.prototype.fragments = function (pattern) {
  var fs;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.sequence.call(this,
        function () {
          return this.push.call(this, "fragments", []);
        },
        pattern,
        function () {
          return fs = this.pop.call(this, "fragments");
        },
        function () {
          return this.action.call(this,
            function () {
              return fs;
            }
          );
        }
      );
    }
  );
  this.popStartPosition.call(this);
  return __result;
};



CombeParser.prototype.nextFragment = function () {
  return this.memoize.call(this,
    "nextFragment_UU3NXYUmiF1CTkM2cA5XGw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        this.suppressNameColon,
        function () {
          return this.trigger.call(this, "rule");
        },
        this.suppressDotIdentifierName,
        function () {
          return this.trigger.call(this, "astConstructor");
        },
        this.next
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



CombeParser.prototype.trigger = function (name) {
  var f;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.sequence.call(this,
        function () {
          return this.doubleNegate.call(this, this[name + "Trigger"]);
        },
        function () {
          return this.choice.call(this,
            function () {
              return this.sequence.call(this,
                function () {
                  return this.fragments.call(this,
                    function () {
                      return f = this[name + "Syntax"].call(this);
                    }
                  );
                },
                function () {
                  return this.emit.call(this, f);
                }
              );
            },
            function () {
              return this.error.call(this, "Triggered syntax invalid (" + name + ").");
            }
          );
        }
      );
    }
  );
  this.popStartPosition.call(this);
  return __result;
}



CombeParser.prototype.ruleTrigger = function () {
  return this.memoize.call(this,
    "ruleTrigger_OlItIq3O1VzwoOzwCpALcQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.id.call(this, "rule");
        },
        function () {
          return this.sequence.call(this,
            this.inferredName,
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.id.call(this, "rule");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeParser.prototype.ruleSyntax = function () {
  return this.memoize.call(this,
    "ruleSyntax_Ujzcsx9V1m7rGDt4t3Dh4w",
    function () {
      var inf, iname, name, pf, b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return inf = this.fragments.call(this,
                function () {
                  return iname = this.optional.call(this, this.inferredName);
                }
              );
            },
            function () {
              return this.id.call(this, "rule");
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return name = this.optional.call(this, this.id);
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return pf = this.optional.call(this, this.parameterList);
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.pn.call(this, '{');
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return b = this.pattern.call(this);
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.pn.call(this, '}');
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("Composite", inf.concat([new Ast("Rule", this.get("indent"), name, iname, pf, b)]));
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

CombeParser.prototype.parameterList = function () {
  return this.memoize.call(this,
    "parameterList_x6HQr3IsJBM5u0heiFaBzg",
    function () {
      var f;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "(");
            },
            function () {
              return f = this.scan.call(this);
            },
            function () {
              return this.pn.call(this, ")");
            },
            function () {
              return this.action.call(this,
                function () {
                  return f;
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



CombeParser.prototype.pattern = function () {
  return this.memoize.call(this,
    "pattern_YMX3tGAcRCrEO4nPiar66g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this, this.choicePattern);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeParser.prototype.choicePattern = function () {
  return this.memoize.call(this,
    "choicePattern_vEJ03/a/jifLEQxXI7MfYA",
    function () {
      var i, r, b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.optional.call(this,
                function () {
                  return this.pn.call(this, "|");
                }
              );
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
              return r = this.repeat.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.pn.call(this, '|');
                        },
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
                              return b;
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
              return this.action.call(this,
                function () {
                  return new Ast("ChoicePattern", [i].concat(r));
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
CombeParser.prototype.choiceBranch = function () {
  return this.memoize.call(this,
    "choiceBranch_YYJezsRvfmjHTEtDrA9spQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this, this.sequencePattern, this.emptyPattern);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeParser.prototype.sequencePattern = function () {
  return this.memoize.call(this,
    "sequencePattern_REUMoiHHq8BXAoycd/DXbA",
    function () {
      var ps;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return ps = this.delimited1.call(this,
                this.bindPattern,
                function () {
                  return this.choice.call(this,
                    this.ws,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.optional.call(this, this.ws);
                        },
                        function () {
                          return this.pn.call(this, ',');
                        },
                        function () {
                          return this.optional.call(this, this.ws);
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
                  return ( ps.length > 1 ? new Ast("SequencePattern", ps) : ps[0] );
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

CombeParser.prototype.bindPattern = function () {
  return this.memoize.call(this,
    "bindPattern_7Qf/adaSLBNGb25b1nd3Fg",
    function () {
      var p, name;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return p = this.operatorPattern.call(this);
            },
            function () {
              return this.pn.call(this, ":");
            },
            function () {
              return name = this.id.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("BindPattern", name, p);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, ":");
            },
            function () {
              return name = this.id.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("BindPattern", name, new Ast("NextPattern"));
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, ":");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("NextPattern");
                }
              );
            }
          );
        },
        this.operatorPattern
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeParser.prototype.operatorPattern = function () {
  return this.memoize.call(this,
    "operatorPattern_rNFzCgQlWw2tshZ25B7TXA",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "&");
            },
            function () {
              return p = this.hashPattern.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("LookaheadPattern",    p);
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
              return p = this.hashPattern.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("DoubleNegatePattern", p);
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
              return p = this.hashPattern.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("NegatePattern",       p);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return p = this.hashPattern.call(this);
            },
            function () {
              return this.pn.call(this, "?");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("OptionalPattern",     p);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return p = this.hashPattern.call(this);
            },
            function () {
              return this.pn.call(this, "*");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("RepeatPattern",       p);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return p = this.hashPattern.call(this);
            },
            function () {
              return this.pn.call(this, "+");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("Repeat1Pattern",      p);
                }
              );
            }
          );
        },
        this.hashPattern
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeParser.prototype.hashPattern = function () {
  return this.memoize.call(this,
    "hashPattern_8KmDzzoNOy9lGmvRlJ+gww",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "#");
            },
            function () {
              return p = this.callPattern.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("HashPattern", p);
                }
              );
            }
          );
        },
        this.callPattern
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeParser.prototype.callPattern = function () {
  return this.memoize.call(this,
    "callPattern_EEQgX4pWhtfxd80aMT/VcA",
    function () {
      var p, f, ps, pp;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
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
                        function () {
                          return this.pn.call(this, "(");
                        },
                        function () {
                          return this.optional.call(this, this.ws);
                        },
                        function () {
                          return this.pn.call(this, ")");
                        },
                        function () {
                          return p = this.action.call(this,
                            function () {
                              return new Ast("CallPattern", p, []);
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
                                      return this.optional.call(this, this.ws);
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
                          return f = this.scan.call(this);
                        },
                        function () {
                          return this.pn.call(this, ")");
                        },
                        function () {
                          return p = this.action.call(this,
                            function () {
                              return new Ast("JSCallPattern", p, f);
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
                          return this.optional.call(this, this.ws);
                        },
                        function () {
                          return ps = this.delimited.call(this,
                            this.argumentSequencePattern,
                            function () {
                              return this.sequence.call(this,
                                function () {
                                  return this.optional.call(this, this.ws);
                                },
                                function () {
                                  return this.pn.call(this, ',');
                                },
                                function () {
                                  return this.optional.call(this, this.ws);
                                }
                              );
                            }
                          );
                        },
                        function () {
                          return this.optional.call(this, this.ws);
                        },
                        function () {
                          return this.pn.call(this, ']');
                        },
                        function () {
                          return p = this.action.call(this,
                            function () {
                              return new Ast("CallPattern", p, ps);
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
                          return pp = this.pattern.call(this);
                        },
                        function () {
                          return this.pn.call(this, "]");
                        },
                        function () {
                          return p = this.action.call(this,
                            function () {
                              return new Ast("CallPattern", p, [pp]);
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
              return this.action.call(this,
                function () {
                  return p;
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
CombeParser.prototype.argumentSequencePattern = function () {
  return this.memoize.call(this,
    "argumentSequencePattern_v8naFLq8ExRb/AENS/mRCg",
    function () {
      var ps;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return ps = this.delimited.call(this, this.bindPattern, this.ws);
            },
            function () {
              return this.action.call(this,
                function () {
                  return (ps.length > 1 ? new Ast("SequencePattern", ps) : ps[0]);
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

CombeParser.prototype.primaryPattern = function () {
  return this.memoize.call(this,
    "primaryPattern_kMIYFdp/LIwuUvVxY7FI4g",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this, this.predicatePattern, this.actionPattern, this.immediatePattern, this.propertyPattern, this.objectPattern, this.stringPattern, this.numberPattern, this.regularExpressionPattern, this.nestedArrayPattern, this.nestedAstPattern, this.subpattern);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeParser.prototype.predicatePattern = function () {
  return this.memoize.call(this,
    "predicatePattern_uZp41VMxu/6zIvcFSp1Fmw",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "?");
            },
            function () {
              return b = this.semanticBody.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("PredicatePattern", b);
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

CombeParser.prototype.actionPattern = function () {
  return this.memoize.call(this,
    "actionPattern_sfTN1b179gXwolIyag2eLg",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "!");
            },
            function () {
              return b = this.semanticBody.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("ActionPattern", b);
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

CombeParser.prototype.immediatePattern = function () {
  return this.memoize.call(this,
    "immediatePattern_zuIm4+K1NFqUgFC0DHLC6w",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "%");
            },
            function () {
              return b = this.semanticBody.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("ImmediatePattern", b);
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

CombeParser.prototype.propertyPattern = function () {
  return this.memoize.call(this,
    "propertyPattern_aS/ThYtSR0A9ZbarE9oL6w",
    function () {
      var name;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return name = this.id.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("PropertyPattern", name);
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

CombeParser.prototype.objectPattern = function () {
  return this.memoize.call(this,
    "objectPattern_n4LTgKD5rWhWe70DppuiHg",
    function () {
      var b;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "@");
            },
            function () {
              return b = this.semanticBody.call(this);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("ObjectPattern", b);
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

CombeParser.prototype.stringPattern = function () {
  return this.memoize.call(this,
    "stringPattern_lnME5kaOG3uP4UcmCePHMA",
    function () {
      var t;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return t = this.string.call(this, "String");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("StringPattern", t.text);
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

CombeParser.prototype.numberPattern = function () {
  return this.memoize.call(this,
    "numberPattern_C1U7EU3Zmeb42nkm10cVhQ",
    function () {
      var t;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return t = this.string.call(this, "Number");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("NumberPattern", t.text);
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

CombeParser.prototype.regularExpressionPattern = function () {
  return this.memoize.call(this,
    "regularExpressionPattern_nti4mqtZ9hLIbdP2+AOOMQ",
    function () {
      var t;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return t = this.string.call(this, "RegularExpression");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("RegularExpressionPattern", t.text);
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

CombeParser.prototype.nestedArrayPattern = function () {
  return this.memoize.call(this,
    "nestedArrayPattern_WE9OBSnIyzwEwyH95mGe8w",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "[");
            },
            function () {
              return this.negate.call(this,
                function () {
                  return this.pn.call(this, "^");
                }
              );
            },
            function () {
              return p = this.pattern.call(this);
            },
            function () {
              return this.pn.call(this, "]");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("NestedArrayPattern", p);
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

CombeParser.prototype.nestedAstPattern = function () {
  return this.memoize.call(this,
    "nestedAstPattern_PHy527z6+T5PEx/R7vj2pg",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "[");
            },
            function () {
              return this.pn.call(this, "^");
            },
            function () {
              return p = this.pattern.call(this);
            },
            function () {
              return this.pn.call(this, "]");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("NestedAstPattern", p);
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

CombeParser.prototype.subpattern = function () {
  return this.memoize.call(this,
    "subpattern_p7PuMmGdZ+Q92chOxP/KUA",
    function () {
      var p;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "(");
            },
            function () {
              return p = this.pattern.call(this);
            },
            function () {
              return this.pn.call(this, ")");
            },
            function () {
              return this.action.call(this,
                function () {
                  return p;
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

CombeParser.prototype.emptyPattern = function () {
  return this.memoize.call(this,
    "emptyPattern_z6L0WcIvAOCeDRsPNkDlmA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.action.call(this,
            function () {
              return new Ast("EmptyPattern");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



CombeParser.prototype.astConstructorTrigger = function () {
  return this.memoize.call(this,
    "astConstructorTrigger_3wBZS8LDnJLjlZmTRhtorQ",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "[");
            },
            function () {
              return this.pn.call(this, "^");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeParser.prototype.astConstructorSyntax = function () {
  return this.memoize.call(this,
    "astConstructorSyntax_WZ7+uqbLd/M0Be47ko+afQ",
    function () {
      var f;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "[");
            },
            function () {
              return this.pn.call(this, "^");
            },
            function () {
              return f = this.scan.call(this,
                function () {
                  return this.negate.call(this,
                    function () {
                      return this.pn.call(this, "]");
                    }
                  );
                }
              );
            },
            function () {
              return this.pn.call(this, "]");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("AstConstructor", f);
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



CombeParser.prototype.semanticBody = function () {
  return this.memoize.call(this,
    "semanticBody_TlRWtdNOVlEjRdyLTo41LQ",
    function () {
      var f;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
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
                          return this.optional.call(this, this.ws);
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
              return f = this.scan.call(this);
            },
            function () {
              return this.pn.call(this, ")");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("ExpressionSemanticBody", f);
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
              return f = this.scan.call(this);
            },
            function () {
              return this.pn.call(this, "}");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("FunctionSemanticBody", f);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return f = this.scan.call(this, this.semanticBodyFilter);
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("ImmediateSemanticBody", f);
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
CombeParser.prototype.semanticBodyFilter = function () {
  return this.memoize.call(this,
    "semanticBodyFilter_6yQH6Gbb3E3+RsEgfrEbsg",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.string.call(this, "RegularExpression");
        },
        function () {
          return this.string.call(this, "String");
        },
        function () {
          return this.string.call(this, "Number");
        },
        function () {
          return this.string.call(this, "Null");
        },
        function () {
          return this.string.call(this, "Boolean");
        },
        function () {
          return this.string.call(this, "IdentifierName");
        },
        function () {
          return this.pn.call(this, "@");
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
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



CombeParser.prototype.suppressNameColon = function () {
  return this.memoize.call(this,
    "suppressNameColon_XwLoGe7ac1RhV+Zq6AKDZw",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            this.id,
            function () {
              return this.pn.call(this, ":");
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



CombeParser.prototype.suppressDotIdentifierName = function () {
  return this.memoize.call(this,
    "suppressDotIdentifierName_Ih44DLfvfYyyWPd6LHqp+A",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, ".");
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            this.id
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



CombeParser.prototype.inferredName = function () {
  return this.memoize.call(this,
    "inferredName_fulR9TvKgyThTNubAf9V3A",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this, this.dotAssign, this.propdeclAssign, this.subscriptAssign, this.variableAssign);
      this.popStartPosition.call(this);
      return __result;
    }
  );
};

CombeParser.prototype.dotAssign = function () {
  return this.memoize.call(this,
    "dotAssign_kkSjM4Sl5SDa8nVIkhc8XA",
    function () {
      var name;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, ".");
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return name = this.id.call(this);
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.pn.call(this, "=");
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.action.call(this,
                function () {
                  return name;
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

CombeParser.prototype.propdeclAssign = function () {
  return this.memoize.call(this,
    "propdeclAssign_fSI9S3t5F/on7bZkezFmsQ",
    function () {
      var name;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return name = this.choice.call(this, this.id, this.st);
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.pn.call(this, ":");
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.action.call(this,
                function () {
                  return name;
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

CombeParser.prototype.subscriptAssign = function () {
  return this.memoize.call(this,
    "subscriptAssign_ZgjiQwp7WSFRNvyh7jJofQ",
    function () {
      var name;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.pn.call(this, "[");
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return name = this.st.call(this);
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.pn.call(this, "]");
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.pn.call(this, "=");
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.action.call(this,
                function () {
                  return name;
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

CombeParser.prototype.variableAssign = function () {
  return this.memoize.call(this,
    "variableAssign_A9n/lV1bwborSQSiXV6yCA",
    function () {
      var name;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return name = this.id.call(this);
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.pn.call(this, "=");
            },
            function () {
              return this.optional.call(this, this.ws);
            },
            function () {
              return this.action.call(this,
                function () {
                  return name;
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



CombeParser.prototype.emit = function (fragment) {
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.apush.call(this, "fragments", fragment);
    }
  );
  this.popStartPosition.call(this);
  return __result;
}



CombeParser.prototype.next = function () {
  return this.memoize.call(this,
    "next_jXFuRzDlyq5uM0hu/OoHcw",
    function () {
      var t;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return t = TokenGrammar.prototype.next.call(this);
            },
            function () {
              return this.action.call(this,
                function () {

    if (t.type === "Punctuator") {
      if      (t.text === "(") this.push("enclosedBy", "(");
      else if (t.text === "{") this.push("enclosedBy", "{");
      else if (t.text === "[") this.push("enclosedBy", "[");
      else if (t.text === ")") {
        if (this.get("enclosedBy") === "(") this.pop("enclosedBy");
        else                                this.fail();
      }
      else if (t.text === "}") {
        if (this.get("enclosedBy") === "{") this.pop("enclosedBy");
        else                                this.fail();
      }
      else if (t.text === "]") {
        if (this.get("enclosedBy") === "[") this.pop("enclosedBy");
        else                                this.fail();
      }
    }
                  }
              );
            },
            function () {
              return this.emit.call(this, new Ast("Fragment", t.text));
            },
            function () {
              return this.action.call(this,
                function () {
                  return t;
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

CombeParser.prototype.id = function (expected) {
  var t;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.sequence.call(this,
        function () {
          return t = this.string.call(this, "IdentifierName");
        },
        function () {
          return this.predicate.call(this,
            function () {
              return (expected == null || t.text == expected);
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {
              return t.text;
            }
          );
        }
      );
    }
  );
  this.popStartPosition.call(this);
  return __result;
};

CombeParser.prototype.pn = function (expected) {
  var t;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.sequence.call(this,
        function () {
          return t = this.string.call(this, "Punctuator");
        },
        function () {
          return this.predicate.call(this,
            function () {
              return (expected == null || t.text == expected);
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {
              return t.text;
            }
          );
        }
      );
    }
  );
  this.popStartPosition.call(this);
  return __result;
};

CombeParser.prototype.st = function () {
  return this.memoize.call(this,
    "st_HzbK53SSD1tSuYviwtRyDA",
    function () {
      var t;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return t = this.string.call(this, "String");
            },
            function () {
              return this.action.call(this,
                function () {
                  return t.value;
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

CombeParser.prototype.ws = function () {
  return this.memoize.call(this,
    "ws_/T26m0zTko8E3xt5kHjfgA",
    function () {
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.repeat1.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.string.call(this, "MultilineComment");
                    },
                    function () {
                      return this.string.call(this, "SinglelineComment");
                    },
                    function () {
                      return this.string.call(this, "Spaces");
                    },
                    this.newline
                  );
                }
              );
            },
            function () {
              return this.action.call(this,
                function () {
                  return null;
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

CombeParser.prototype.newline = function () {
  return this.memoize.call(this,
    "newline_A1snk4YeaKkUflUcX7KxVg",
    function () {
      var t, ts;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return t = this.string.call(this, "Newline");
            },
            function () {
              return this.doubleNegate.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return ts = this.repeat.call(this,
                        function () {
                          return this.choice.call(this,
                            function () {
                              return this.string.call(this, "MutlilineComment");
                            },
                            function () {
                              return this.string.call(this, "SinglelineComment");
                            },
                            function () {
                              return this.string.call(this, "Spaces");
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
              return this.action.call(this,
                function () {

    if (ts.length > 0) this.set("indent", ts[ts.length - 1].end - t.start);
    else               this.set("indent", 0);
                  }
              );
            },
            function () {
              return this.action.call(this,
                function () {
                  return t;
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
