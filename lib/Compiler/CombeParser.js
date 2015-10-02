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



function CombeParser(sourcename) {
  TokenGrammar.call(this, sourcename);
  
  this.init("start", false);
  this.init("enclosedBy", null);
  this.init("fragments", null);
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
  return this.memoize("scan_9aaKWxarUYDJYGg6eFmZkg",
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
                    function () {
                      return this.choice(
                        function () {
                          return this.choice(
                            this.suppressors,
                            this.triggers
                          );
                        },
                        this.next
                      );
                    },
                    function () {
                      return this.set.call(this, "start", false);
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
              function () { return (["Composite", fs]); }
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



CombeParser.prototype.triggers = /* rule */ function () {
  return this.memoize("triggers_s+Ed3sWS+OFZjD+9mnVVhw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.trigger.call(this, "rule");
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.trigger = /* rule */ function (name) {
  var f;
  return this.memoize("trigger_WaWH3LGTjSKFz5jUTfoH9A",
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
                    return this.action(
                      function () { return (f); }
                    );
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
  return this.memoize("ruleSyntax_P3LI2L0XX+r5CPdPu7pqJA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return inf = function () {
              return this.optional(
                function () {
                  return this.fragments.call(this,
                    function () {
                      return iname = this.inferredName.call(this)
                    }
                  );
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
              function () { return (["Composite", [inf, ["Rule", this.get("indent"), name, iname, pf, b]]]); }
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
  return this.memoize("choicePattern_LbpzabM8L+XuYDAfnTctRw",
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
              function () { return (["Choice", [i].concat(r)]); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.sequencePattern = /* rule */ function () {
  var ps;
  return this.memoize("sequencePattern_re3+dVdyZBpmw9VCMo3FDQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return ps = function () {
              return this.delimited1.call(this,
                function () {
                  return this.sequence(
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
                }
              );
            }.call(this)
          },
          function () {
            return this.action(
              function () { return ( ps.length > 1 ? ["SequencePattern", ps] : ps[0] ); }
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
  return this.memoize("bindPattern_oargovT/fDIsi9dtBppMRg",
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
                          function () { return (["BindPattern", p, name]); }
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
                          function () { return (["BindPattern", ["NextPattern"], name]); }
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
                      function () { return (["NextPattern"]); }
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
  return this.memoize("operatorPattern_VCf/bQhTJRE+wLLE/OmjjQ",
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
                                      function () { return (["LookaheadPattern",    p]); }
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
                                      function () { return (["DoubleNegatePattern", p]); }
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
                                  function () { return (["NegatePattern",       p]); }
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
                              function () { return (["OptionalPattern",     p]); }
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
                          function () { return (["RepeatPattern",       p]); }
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
                      function () { return (["Repeat1Pattern",      p]); }
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
  return this.memoize("hashPattern_0UMGZwcnA6zw/OZaveo4hw",
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
                  function () { return (["HashPattern", p]); }
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
  var p, f, ps;
  return this.memoize("callPattern_ijKYKW4ZKTNEIPw4yNzrFw",
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
                                function () { return (["CallPattern", p, []]); }
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
                                function () { return (["JSCallPattern", p, f]); }
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
                            function () {
                              return this.sequence(
                                this.bindPattern,
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
                            function () { return (["CallPattern", p, ps]); }
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

CombeParser.prototype.primaryPattern = /* rule */ function () {
  return this.memoize("primaryPattern_uezda19yiFF7UsfxG5Yslw",
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
              this.nestedInputPattern
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
  return this.memoize("predicatePattern_rGhSxUgSwXdFCzIJf+oJJw",
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
              function () { return (["PredicatePattern", b]); }
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
  return this.memoize("actionPattern_APH/Uj/04ZjJKXn9S8gtYA",
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
              function () { return (["ActionPattern", b]); }
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
  return this.memoize("immediatePattern_Puyya+RErmC5SRI332Ew0A",
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
              function () { return (["ImmediatePattern", b]); }
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
  return this.memoize("propertyPattern_mj0xCs7dYQG1tRvGmW7D1w",
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
              function () { return (["PropertyPattern", name]); }
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
  return this.memoize("objectPattern_cNHOM+wHdb5oZRoMVzb+VQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.pn.call(this, "@");
          },
          function () {
            return b = this.semantic.call(this)
          },
          function () {
            return this.action(
              function () { return (["ObjectPattern", b]); }
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
  var text;
  return this.memoize("stringPattern_oS95Uw6FQr15UBPFHyJBvg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return text = this.string.call(this)
          },
          function () {
            return this.action(
              function () { return (["StringPattern", text]); }
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
  var text;
  return this.memoize("numberPattern_kSNc9nckMQ4Q88DcaALcNA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return text = this.number.call(this)
          },
          function () {
            return this.action(
              function () { return (["NumberPattern", text]); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.nestedInputPattern = /* rule */ function () {
  var p;
  return this.memoize("nestedInputPattern_qOmzd+igaAZYWRevHrgqfA",
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
            return p = this.pattern.call(this)
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
            return this.action(
              function () { return (["NestedPattern", p]); }
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
  return this.memoize("subpattern_vxkfMr/72z0RaP8XPc5oHg",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
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
            return p = this.pattern.call(this)
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
  return this.memoize("emptyPattern_2gvAg7oZns5/+73XrLjfFA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.action(
          function () { return (["EmptyPattern"]); }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.semanticBody = /* rule */ function () {
  var f;
  return this.memoize("semanticBody_13sx0u7aZk0LDlDkP2IrTw",
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
                      function () { return (["ExpressionSemanticBody", f]); }
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
                      function () { return (["FunctionSemanticBody", f]); }
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
                  function () { return (["ExpressionSemanticBody", f]); }
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
  return this.memoize("semanticBodyFilter_mRg90s2MawYCTZQ7fpAkeg",
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
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



CombeParser.prototype.suppressors = /* rule */ function () {
  return this.memoize("suppressors_vUb5cUn2GrBZv+u9+uYjog",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = this.suppressDotIdentifierName.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.suppressDotIdentifierName = /* rule */ function () {
  return this.memoize("suppressDotIdentifierName_4kwCNjc5qM24ENjlu9RJ0Q",
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
          this.id,
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
                    return this.pn.call(this, "=");
                  }
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
  return this.memoize("dotAssign_nsTYfJ6PAc9aV72/DyhQ+A",
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
  return this.memoize("propdeclAssign_XgnIPOO7ff8dLoZUkuIIuA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return name = function () {
              return this.choice(
                this.id,
                this.string
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
  return this.memoize("subscriptAssign_AD1FNhmRArJgmQanClQB5g",
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
            return name = this.string.call(this)
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
  return this.memoize("variableAssign_QB3G393BTdQp2PVRJmDoYg",
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



CombeParser.prototype.next = /* rule */ function () {
  var t;
  return this.memoize("next_0z1Rb/GxlsS6f3Kfnt4sPg",
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
            return this.apush.call(this, "fragments", ["Fragment", t.text]);
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

CombeParser.prototype.string = /* rule */ function () {
  var t;
  return this.memoize("string_BaR1HQTl7Vx6P6hcFDtPmA",
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
  return this.memoize("ws_oKFKxiWj77OE/syFMeb6/Q",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.repeat(
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
