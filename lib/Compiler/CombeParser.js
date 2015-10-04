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



CombeParser.prototype.start = /* rule */ function () {
  return this.memoize("start_bkdybN98xmCdJFHfHuIObQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = this.scanFile.call(this);
      this.popStartPosition();
      return result;
    }
  );
}



CombeParser.prototype.scanFile = /* rule */ function () {
  return this.memoize("scanFile_uo4EETLUyH7WUa1wKZOcNQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = this.scan.call(this);
      this.popStartPosition();
      return result;
    }
  );
}



CombeParser.prototype.scan = /* rule */ function (filter) {
  var fs;
  return this.memoize("scan_ip0KltuqxGvhndVhTcPhJg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.push.call(this, "start", true);
          },
          function () {
            return this.push.call(this, "enclosedBy", null);
          },
          function () {
            return fs = function () {
              return this.fragments.call(this,
                function () {
                  return this.repeat(
                    function () {
                      return this.sequence(
                        function () {
                          return this.choice(
                            function () {
                              return this.sequence(
                                function () {
                                  return this.predicate(
                                    function () { return (this.get("enclosedBy") == null); }
                                  );
                                },
                                function () {
                                  return this.doubleNegate(
                                    function () {
                                      return this.ifNotNull.call(this, filter);
                                    }
                                  );
                                }
                              );
                            },
                            function () {
                              return this.predicate(
                                function () { return (this.get("enclosedBy") != null); }
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
            }.call(this)
          },
          function () {
            return this.pop.call(this, "enclosedBy");
          },
          function () {
            return this.pop.call(this, "start");
          },
          function () {
            return this.action(
              function () { return (new Ast("Composite", fs)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
}

CombeParser.prototype.fragments = /* rule */ function (pattern) {
  var fs;
  return this.memoize("fragments_oD3LeTKdt+pzP2Oa2XxYfA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.push.call(this, "fragments", []);
          },
          function () { return (pattern); }.call(this),
          function () {
            return fs = function () {
              return this.pop.call(this, "fragments");
            }.call(this)
          },
          function () {
            return this.action(
              function () { return (fs); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.nextFragment = /* rule */ function () {
  return this.memoize("nextFragment_0IOR5sAtbfSXklSya1grYw",
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
                      this.suppressNameColon,
                      function () {
                        return this.trigger.call(this, "rule");
                      }
                    );
                  },
                  this.suppressDotIdentifierName
                );
              },
              function () {
                return this.trigger.call(this, "astConstructor");
              }
            );
          },
          this.next
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.trigger = /* rule */ function (name) {
  var f;
  return this.memoize("trigger_q3zCHGzyyRQUYijINut2Tg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.doubleNegate(
              function () { return (this[name + "Trigger"]); }.call(this)
            );
          },
          function () {
            return this.choice(
              function () {
                return this.sequence(
                  function () {
                    return this.fragments.call(this,
                      function () {
                        return f = function () { return (this[name + "Syntax"]); }.call(this).call(this)
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
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
}



CombeParser.prototype.ruleTrigger = /* rule */ function () {
  return this.memoize("ruleTrigger_upFkFzOh7TKU/LlVwxVMuw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.id.call(this, "rule");
          },
          function () {
            return this.sequence(
              this.inferredName,
              function () {
                return this.optional(
                  this.ws
                );
              },
              function () {
                return this.id.call(this, "rule");
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

CombeParser.prototype.ruleSyntax = /* rule */ function () {
  var inf, iname, name, pf, b;
  return this.memoize("ruleSyntax_DP4facM8QdbAgsqVegw+JQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return inf = function () {
              return this.fragments.call(this,
                function () {
                  return iname = function () {
                    return this.optional(
                      this.inferredName
                    );
                  }.call(this)
                }
              );
            }.call(this)
          },
          function () {
            return this.id.call(this, "rule");
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return name = function () {
              return this.optional(
                this.id
              );
            }.call(this)
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return pf = function () {
              return this.optional(
                this.parameterList
              );
            }.call(this)
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, '{');
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return b = this.pattern.call(this)
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, '}');
          },
          function () {
            return this.action(
              function () { return (new Ast("Composite", inf.concat([new Ast("Rule", this.get("indent"), name, iname, pf, b)]))); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.parameterList = /* rule */ function () {
  var f;
  return this.memoize("parameterList_UPdbATsGmqYusAq/X1t9pA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "(");
          },
          function () {
            return f = this.scan.call(this)
          },
          function () {
            return this.pn.call(this, ")");
          },
          function () {
            return this.action(
              function () { return (f); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.pattern = /* rule */ function () {
  return this.memoize("pattern_9C5x0UDv3onssH6hgPHnlA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = this.choicePattern.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.choicePattern = /* rule */ function () {
  var i, r, b;
  return this.memoize("choicePattern_aBSEooB1BoCduFCi42wScQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.optional(
              function () {
                return this.pn.call(this, "|");
              }
            );
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return i = this.choiceBranch.call(this)
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return r = function () {
              return this.repeat(
                function () {
                  return this.sequence(
                    function () {
                      return this.pn.call(this, '|');
                    },
                    function () {
                      return this.optional(
                        this.ws
                      );
                    },
                    function () {
                      return b = this.choiceBranch.call(this)
                    },
                    function () {
                      return this.optional(
                        this.ws
                      );
                    },
                    function () {
                      return this.action(
                        function () { return (b); }
                      );
                    }
                  );
                }
              );
            }.call(this)
          },
          function () {
            return this.action(
              function () { return (new Ast("Choice", [i].concat(r))); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};
CombeParser.prototype.choiceBranch = /* rule */ function () {
  return this.memoize("choiceBranch_NZg4zwiR/hX6aN7SHppygw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          this.sequencePattern,
          this.emptyPattern
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.sequencePattern = /* rule */ function () {
  var ps;
  return this.memoize("sequencePattern_Erfqa0aA0euY6kBl/N5bOw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return ps = function () {
              return this.delimited1.call(this,
                this.bindPattern,
                function () {
                  return this.choice(
                    this.ws,
                    function () {
                      return this.sequence(
                        function () {
                          return this.optional(
                            this.ws
                          );
                        },
                        function () {
                          return this.pn.call(this, ',');
                        },
                        function () {
                          return this.optional(
                            this.ws
                          );
                        }
                      );
                    }
                  );
                }
              );
            }.call(this)
          },
          function () {
            return this.action(
              function () { return ( ps.length > 1 ? new Ast("SequencePattern", ps) : ps[0] ); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.bindPattern = /* rule */ function () {
  var p, name;
  return this.memoize("bindPattern_wPWSLHuRz4a0pQVflb84Mg",
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
                      function () {
                        return p = this.operatorPattern.call(this)
                      },
                      function () {
                        return this.pn.call(this, ":");
                      },
                      function () {
                        return name = this.id.call(this)
                      },
                      function () {
                        return this.action(
                          function () { return (new Ast("BindPattern", name, p)); }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () {
                        return this.pn.call(this, ":");
                      },
                      function () {
                        return name = this.id.call(this)
                      },
                      function () {
                        return this.action(
                          function () { return (new Ast("BindPattern", name, new Ast("NextPattern"))); }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  function () {
                    return this.pn.call(this, ":");
                  },
                  function () {
                    return this.action(
                      function () { return (new Ast("NextPattern")); }
                    );
                  }
                );
              }
            );
          },
          this.operatorPattern
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.operatorPattern = /* rule */ function () {
  var p;
  return this.memoize("operatorPattern_1mW8KlkI+K5dK4TwaFdFmA",
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
                                return this.sequence(
                                  function () {
                                    return this.pn.call(this, "&");
                                  },
                                  function () {
                                    return p = this.hashPattern.call(this)
                                  },
                                  function () {
                                    return this.action(
                                      function () { return (new Ast("LookaheadPattern",    p)); }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this.sequence(
                                  function () {
                                    return this.pn.call(this, "~");
                                  },
                                  function () {
                                    return this.pn.call(this, "~");
                                  },
                                  function () {
                                    return p = this.hashPattern.call(this)
                                  },
                                  function () {
                                    return this.action(
                                      function () { return (new Ast("DoubleNegatePattern", p)); }
                                    );
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return this.sequence(
                              function () {
                                return this.pn.call(this, "~");
                              },
                              function () {
                                return p = this.hashPattern.call(this)
                              },
                              function () {
                                return this.action(
                                  function () { return (new Ast("NegatePattern",       p)); }
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this.sequence(
                          function () {
                            return p = this.hashPattern.call(this)
                          },
                          function () {
                            return this.pn.call(this, "?");
                          },
                          function () {
                            return this.action(
                              function () { return (new Ast("OptionalPattern",     p)); }
                            );
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () {
                        return p = this.hashPattern.call(this)
                      },
                      function () {
                        return this.pn.call(this, "*");
                      },
                      function () {
                        return this.action(
                          function () { return (new Ast("RepeatPattern",       p)); }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  function () {
                    return p = this.hashPattern.call(this)
                  },
                  function () {
                    return this.pn.call(this, "+");
                  },
                  function () {
                    return this.action(
                      function () { return (new Ast("Repeat1Pattern",      p)); }
                    );
                  }
                );
              }
            );
          },
          this.hashPattern
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.hashPattern = /* rule */ function () {
  var p;
  return this.memoize("hashPattern_K4gTem8EyiPZh8BayiNLyQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.sequence(
              function () {
                return this.pn.call(this, "#");
              },
              function () {
                return p = this.callPattern.call(this)
              },
              function () {
                return this.action(
                  function () { return (new Ast("HashPattern", p)); }
                );
              }
            );
          },
          this.callPattern
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.callPattern = /* rule */ function () {
  var p, f, ps, pp;
  return this.memoize("callPattern_LwrreAFbTRJyPKz8DdpE6w",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return p = this.primaryPattern.call(this)
          },
          function () {
            return this.repeat(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () {
                        return this.choice(
                          function () {
                            return this.sequence(
                              function () {
                                return this.pn.call(this, "(");
                              },
                              function () {
                                return this.optional(
                                  this.ws
                                );
                              },
                              function () {
                                return this.pn.call(this, ")");
                              },
                              function () {
                                return p = function () {
                                  return this.action(
                                    function () { return (new Ast("CallPattern", p, [])); }
                                  );
                                }.call(this)
                              }
                            );
                          },
                          function () {
                            return this.sequence(
                              function () {
                                return this.pn.call(this, "(");
                              },
                              function () {
                                return this.negate(
                                  function () {
                                    return this.sequence(
                                      function () {
                                        return this.optional(
                                          this.ws
                                        );
                                      },
                                      function () {
                                        return this.pn.call(this, ")");
                                      }
                                    );
                                  }
                                );
                              },
                              function () {
                                return f = this.scan.call(this)
                              },
                              function () {
                                return this.pn.call(this, ")");
                              },
                              function () {
                                return p = function () {
                                  return this.action(
                                    function () { return (new Ast("JSCallPattern", p, f)); }
                                  );
                                }.call(this)
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this.sequence(
                          function () {
                            return this.pn.call(this, "[");
                          },
                          function () {
                            return this.optional(
                              this.ws
                            );
                          },
                          function () {
                            return ps = function () {
                              return this.delimited.call(this,
                                this.argumentSequencePattern,
                                function () {
                                  return this.sequence(
                                    function () {
                                      return this.optional(
                                        this.ws
                                      );
                                    },
                                    function () {
                                      return this.pn.call(this, ',');
                                    },
                                    function () {
                                      return this.optional(
                                        this.ws
                                      );
                                    }
                                  );
                                }
                              );
                            }.call(this)
                          },
                          function () {
                            return this.optional(
                              this.ws
                            );
                          },
                          function () {
                            return this.pn.call(this, ']');
                          },
                          function () {
                            return p = function () {
                              return this.action(
                                function () { return (new Ast("CallPattern", p, ps)); }
                              );
                            }.call(this)
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () {
                        return this.pn.call(this, "[");
                      },
                      function () {
                        return pp = this.pattern.call(this)
                      },
                      function () {
                        return this.pn.call(this, "]");
                      },
                      function () {
                        return p = function () {
                          return this.action(
                            function () { return (new Ast("CallPattern", p, [pp])); }
                          );
                        }.call(this)
                      }
                    );
                  }
                );
              }
            );
          },
          function () {
            return this.action(
              function () { return (p); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};
CombeParser.prototype.argumentSequencePattern = /* rule */ function () {
  var ps;
  return this.memoize("argumentSequencePattern_e92ekwL3R2qVe9nRBz2UNw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return ps = function () {
              return this.delimited.call(this,
                this.bindPattern,
                this.ws
              );
            }.call(this)
          },
          function () {
            return this.action(
              function () { return (ps.length > 1 ? new Ast("SequencePattern", ps) : ps[0]); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.primaryPattern = /* rule */ function () {
  return this.memoize("primaryPattern_hMLjL8lVmOeCLfRa5kqK3A",
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
                                              this.predicatePattern,
                                              this.actionPattern
                                            );
                                          },
                                          this.immediatePattern
                                        );
                                      },
                                      this.propertyPattern
                                    );
                                  },
                                  this.objectPattern
                                );
                              },
                              this.stringPattern
                            );
                          },
                          this.numberPattern
                        );
                      },
                      this.regularExpressionPattern
                    );
                  },
                  this.nestedArrayPattern
                );
              },
              this.nestedAstPattern
            );
          },
          this.subpattern
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.predicatePattern = /* rule */ function () {
  var b;
  return this.memoize("predicatePattern_dwLAeqUF25G0SijF9vXT5Q",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "?");
          },
          function () {
            return b = this.semanticBody.call(this)
          },
          function () {
            return this.action(
              function () { return (new Ast("PredicatePattern", b)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.actionPattern = /* rule */ function () {
  var b;
  return this.memoize("actionPattern_AYRopAt9o/vLjozcrh1yXw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "!");
          },
          function () {
            return b = this.semanticBody.call(this)
          },
          function () {
            return this.action(
              function () { return (new Ast("ActionPattern", b)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.immediatePattern = /* rule */ function () {
  var b;
  return this.memoize("immediatePattern_/5T2bv9f/deIIRlpOOJEfg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "%");
          },
          function () {
            return b = this.semanticBody.call(this)
          },
          function () {
            return this.action(
              function () { return (new Ast("ImmediatePattern", b)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.propertyPattern = /* rule */ function () {
  var name;
  return this.memoize("propertyPattern_tZTlH1AIhpOwbZvDeG8n/w",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return name = this.id.call(this)
          },
          function () {
            return this.action(
              function () { return (new Ast("PropertyPattern", name)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.objectPattern = /* rule */ function () {
  var b;
  return this.memoize("objectPattern_tPWV3h/meGPe0QcR3UER/w",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "@");
          },
          function () {
            return b = this.semanticBody.call(this)
          },
          function () {
            return this.action(
              function () { return (new Ast("ObjectPattern", b)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.stringPattern = /* rule */ function () {
  var t;
  return this.memoize("stringPattern_2jMvTy1Op9CaPUAncr5SrQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return t = function () { return this.string("String"); }.call(this)
          },
          function () {
            return this.action(
              function () { return (new Ast("StringPattern", t.text)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.numberPattern = /* rule */ function () {
  var t;
  return this.memoize("numberPattern_t/Ddoa9EFPlaa/lYTcV3Fg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return t = function () { return this.string("Number"); }.call(this)
          },
          function () {
            return this.action(
              function () { return (new Ast("NumberPattern", t.text)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.regularExpressionPattern = /* rule */ function () {
  var t;
  return this.memoize("regularExpressionPattern_QvAu/SzMv93hpOJqYqhXgA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return t = function () { return this.string("RegularExpression"); }.call(this)
          },
          function () {
            return this.action(
              function () { return (new Ast("RegularExpressionPattern", t.text)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.nestedArrayPattern = /* rule */ function () {
  var p;
  return this.memoize("nestedArrayPattern_YkPVP+y0CppD0m6L/Rf/5g",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "[");
          },
          function () {
            return this.negate(
              function () {
                return this.pn.call(this, "^");
              }
            );
          },
          function () {
            return p = this.pattern.call(this)
          },
          function () {
            return this.pn.call(this, "]");
          },
          function () {
            return this.action(
              function () { return (new Ast("NestedArrayPattern", p)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.nestedAstPattern = /* rule */ function () {
  var p;
  return this.memoize("nestedAstPattern_8+h7kBrc1CdYIQOUXAuHoQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "[");
          },
          function () {
            return this.pn.call(this, "^");
          },
          function () {
            return p = this.pattern.call(this)
          },
          function () {
            return this.pn.call(this, "]");
          },
          function () {
            return this.action(
              function () { return (new Ast("NestedAstPattern", p)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.subpattern = /* rule */ function () {
  var p;
  return this.memoize("subpattern_AddjAKD8gtQ42Ykcj6xEGw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "(");
          },
          function () {
            return p = this.pattern.call(this)
          },
          function () {
            return this.pn.call(this, ")");
          },
          function () {
            return this.action(
              function () { return (p); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.emptyPattern = /* rule */ function () {
  return this.memoize("emptyPattern_ei8RtZ9rkhAWuh4OLGFEWQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.action(
          function () { return (new Ast("EmptyPattern")); }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.astConstructorTrigger = /* rule */ function () {
  return this.memoize("astConstructorTrigger_qcsdfSR/UBVqNi3UM7K8PQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "[");
          },
          function () {
            return this.pn.call(this, "^");
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.astConstructorSyntax = /* rule */ function () {
  var f;
  return this.memoize("astConstructorSyntax_SK2Mn6TsSv3tXFfTMNIUPA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "[");
          },
          function () {
            return this.pn.call(this, "^");
          },
          function () {
            return f = function () {
              return this.scan.call(this,
                function () {
                  return this.negate(
                    function () {
                      return this.pn.call(this, "]");
                    }
                  );
                }
              );
            }.call(this)
          },
          function () {
            return this.pn.call(this, "]");
          },
          function () {
            return this.action(
              function () { return (new Ast("AstConstructor", f)); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.semanticBody = /* rule */ function () {
  var f;
  return this.memoize("semanticBody_Cp1AVfWJ/5N/o9Kt5AqGwA",
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
                    return this.pn.call(this, "(");
                  },
                  function () {
                    return this.negate(
                      function () {
                        return this.sequence(
                          function () {
                            return this.optional(
                              this.ws
                            );
                          },
                          function () {
                            return this.pn.call(this, ")");
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return f = this.scan.call(this)
                  },
                  function () {
                    return this.pn.call(this, ")");
                  },
                  function () {
                    return this.action(
                      function () { return (new Ast("ExpressionSemanticBody", f)); }
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  function () {
                    return this.pn.call(this, "{");
                  },
                  function () {
                    return f = this.scan.call(this)
                  },
                  function () {
                    return this.pn.call(this, "}");
                  },
                  function () {
                    return this.action(
                      function () { return (new Ast("FunctionSemanticBody", f)); }
                    );
                  }
                );
              }
            );
          },
          function () {
            return this.sequence(
              function () {
                return f = function () {
                  return this.scan.call(this,
                    this.semanticBodyFilter
                  );
                }.call(this)
              },
              function () {
                return this.action(
                  function () { return (new Ast("ExpressionSemanticBody", f)); }
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
CombeParser.prototype.semanticBodyFilter = /* rule */ function () {
  return this.memoize("semanticBodyFilter_jg+ECk8AUPMShe8Uoee7OQ",
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
                                              function () { return this.string("RegularExpression"); },
                                              function () { return this.string("String"); }
                                            );
                                          },
                                          function () { return this.string("Number"); }
                                        );
                                      },
                                      function () { return this.string("Null"); }
                                    );
                                  },
                                  function () { return this.string("Boolean"); }
                                );
                              },
                              function () { return this.string("IdentifierName"); }
                            );
                          },
                          function () {
                            return this.pn.call(this, "@");
                          }
                        );
                      },
                      function () {
                        return this.pn.call(this, ".");
                      }
                    );
                  },
                  function () {
                    return this.pn.call(this, "(");
                  }
                );
              },
              function () {
                return this.pn.call(this, "[");
              }
            );
          },
          function () {
            return this.pn.call(this, "{");
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.suppressNameColon = /* rule */ function () {
  return this.memoize("suppressNameColon_fpsiL/UuFJTeFvzlBQ5c5Q",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          this.id,
          function () {
            return this.pn.call(this, ":");
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.suppressDotIdentifierName = /* rule */ function () {
  return this.memoize("suppressDotIdentifierName_aFX1esWTTIZ+Y3aQnVg9lQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, ".");
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          this.id
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.inferredName = /* rule */ function () {
  return this.memoize("inferredName_8+m3wQHWm23poVnl9+aRRw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.choice(
          function () {
            return this.choice(
              function () {
                return this.choice(
                  this.dotAssign,
                  this.propdeclAssign
                );
              },
              this.subscriptAssign
            );
          },
          this.variableAssign
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.dotAssign = /* rule */ function () {
  var name;
  return this.memoize("dotAssign_m9FldMfNcH5J7c53kK/NMQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, ".");
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return name = this.id.call(this)
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, "=");
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.action(
              function () { return (name); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.propdeclAssign = /* rule */ function () {
  var name;
  return this.memoize("propdeclAssign_cIKhJISWJ4kWsjfgH/1pJg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return name = function () {
              return this.choice(
                this.id,
                this.st
              );
            }.call(this)
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, ":");
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.action(
              function () { return (name); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.subscriptAssign = /* rule */ function () {
  var name;
  return this.memoize("subscriptAssign_hWJWckUdjPkgSiuCIyOM9w",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "[");
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return name = this.st.call(this)
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, "]");
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, "=");
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.action(
              function () { return (name); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.variableAssign = /* rule */ function () {
  var name;
  return this.memoize("variableAssign_xQfNj32hyhp1obeBznUtKg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return name = this.id.call(this)
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, "=");
          },
          function () {
            return this.optional(
              this.ws
            );
          },
          function () {
            return this.action(
              function () { return (name); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.emit = /* rule */ function (fragment) {
  return this.memoize("emit_iEqphZUf0KQv03RVFMg/MQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.apush.call(this, "fragments", fragment);
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
}



CombeParser.prototype.next = /* rule */ function () {
  var t;
  return this.memoize("next_xUWlZ5uUKVyMqOYGxj1ZMQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return t = function () { return (TokenGrammar.prototype.next); }.call(this).call(this)
          },
          function () {
            return this.action(
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
            return this.action(
              function () { return (t); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.id = /* rule */ function (expected) {
  var t;
  return this.memoize("id_ACrvmRtJiS4BGy1IBr7GkA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return t = function () { return this.string("IdentifierName"); }.call(this)
          },
          function () {
            return this.predicate(
              function () { return (expected == null || t.text == expected); }
            );
          },
          function () {
            return this.action(
              function () { return (t.text); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.pn = /* rule */ function (expected) {
  var t;
  return this.memoize("pn_+Q5sarhj8BuRhGqygVyKpQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return t = function () { return this.string("Punctuator"); }.call(this)
          },
          function () {
            return this.predicate(
              function () { return (expected == null || t.text == expected); }
            );
          },
          function () {
            return this.action(
              function () { return (t.text); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.st = /* rule */ function () {
  var t;
  return this.memoize("st_BaR1HQTl7Vx6P6hcFDtPmA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return t = function () { return this.string("String"); }.call(this)
          },
          function () {
            return this.action(
              function () { return (t.value); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.ws = /* rule */ function () {
  return this.memoize("ws_ohjgxlvXjfNXd//rkWtvtA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.repeat1(
              function () {
                return this.choice(
                  function () {
                    return this.choice(
                      function () {
                        return this.choice(
                          function () { return this.string("MultilineComment"); },
                          function () { return this.string("SinglelineComment"); }
                        );
                      },
                      function () { return this.string("Spaces"); }
                    );
                  },
                  this.newline
                );
              }
            );
          },
          function () {
            return this.action(
              function () { return (null); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.newline = /* rule */ function () {
  var t, ts;
  return this.memoize("newline_NNxKSHVFz/Ny0QhalCK/VA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return t = function () { return this.string("Newline"); }.call(this)
          },
          function () {
            return this.doubleNegate(
              function () {
                return ts = function () {
                  return this.repeat(
                    function () {
                      return this.choice(
                        function () {
                          return this.choice(
                            function () { return this.string("MutlilineComment"); },
                            function () { return this.string("SinglelineComment"); }
                          );
                        },
                        function () { return this.string("Spaces"); }
                      );
                    }
                  );
                }.call(this)
              }
            );
          },
          function () {
            return this.action(
              function () {
    if (ts.length > 0) this.set("indent", ts[ts.length - 1].end - t.start);
    else               this.set("indent", 0);
  }
            );
          },
          function () {
            return this.action(
              function () { return (t); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};
