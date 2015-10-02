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
  return this._memoize("start_bkdybN98xmCdJFHfHuIObQ",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = this.scanFile.call(this);
      this.popStartPosition();
      return result;
    }
  );
}



CombeParser.prototype.scanFile = /* rule */ function () {
  return this._memoize("scanFile_uo4EETLUyH7WUa1wKZOcNQ",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = this.scan.call(this);
      this.popStartPosition();
      return result;
    }
  );
}


CombeParser.prototype.scan = /* rule */ function (filter) {
  var fs;
  return this._memoize("scan_l1UkkY8H88SXg9q+1Sijjw",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
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
                  return this._sequence(
                    function () {
                      return this._choice(
                        function () {
                          return this._sequence(
                            function () {
                              return this._predicate(
                                function () { return (this.get("enclosedBy") == null); }
                              );
                            },
                            function () {
                              return this._doubleNegate(
                                function () {
                                  return this.ifNotNull.call(this, filter);
                                }
                              );
                            }
                          );
                        },
                        function () {
                          return this._predicate(
                            function () { return (this.get("enclosedBy") != null); }
                          );
                        }
                      );
                    },
                    function () {
                      return this._choice(
                        function () {
                          return this._choice(
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
            return this._action(
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
  return this._memoize("fragments_2nEY+VbnhPa8hWpWaj7YRA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
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
            return this._action(
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
  return this._memoize("triggers_s+Ed3sWS+OFZjD+9mnVVhw",
    function () {
      this._ignore();
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
  return this._memoize("trigger_LNMhyosf3kwt20RzfJY0hA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this._doubleNegate(
              function () { return (this[name + "Trigger"]); }.call(this)
            );
          },
          function () {
            return this._choice(
              function () {
                return this._sequence(
                  function () {
                    return this.fragments.call(this,
                      function () {
                        return f = function () { return (this[name + "Syntax"]); }.call(this).call(this)
                      }
                    );
                  },
                  function () {
                    return this._action(
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
  return this._memoize("ruleTrigger_mpIrfYFoyChiY5SHs0J43g",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._choice(
          function () {
            return this.id.call(this, "rule");
          },
          function () {
            return this._sequence(
              this.inferredName,
              function () {
                return this._optional(
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
  return this._memoize("ruleSyntax_HqBz/lCgBdQHT5vHhBrg/w",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return inf = function () {
              return this._optional(
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
            return this._optional(
              this.ws
            );
          },
          function () {
            return name = function () {
              return this._optional(
                this.id
              );
            }.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return pf = function () {
              return this._optional(
                this.parameterList
              );
            }.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, '{');
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return b = this.pattern.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, '}');
          },
          function () {
            return this._action(
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
  return this._memoize("parameterList_QE7QtdKhD7p+YW1Igjv5VQ",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
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
            return this._action(
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
  return this._memoize("pattern_9C5x0UDv3onssH6hgPHnlA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = this.choicePattern.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.choicePattern = /* rule */ function () {
  var i, r, b;
  return this._memoize("choicePattern_T3A6xtakoE+Aoe8HOvglbA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this._optional(
              function () {
                return this.pn.call(this, "|");
              }
            );
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return i = this.choiceBranch.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return r = function () {
              return this._repeat(
                function () {
                  return this._sequence(
                    function () {
                      return this.pn.call(this, '|');
                    },
                    function () {
                      return this._optional(
                        this.ws
                      );
                    },
                    function () {
                      return b = this.choiceBranch.call(this)
                    },
                    function () {
                      return this._optional(
                        this.ws
                      );
                    },
                    function () {
                      return this._action(
                        function () { return (b); }
                      );
                    }
                  );
                }
              );
            }.call(this)
          },
          function () {
            return this._action(
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
  return this._memoize("sequencePattern_PrpPaAlQuSCcbVEgOV6/fA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return ps = function () {
              return this.delimited1.call(this,
                function () {
                  return this._sequence(
                    this.bindPattern,
                    function () {
                      return this._choice(
                        this.ws,
                        function () {
                          return this._sequence(
                            function () {
                              return this._optional(
                                this.ws
                              );
                            },
                            function () {
                              return this.pn.call(this, ',');
                            },
                            function () {
                              return this._optional(
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
            return this._action(
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
  return this._memoize("bindPattern_tp0D9XoEs/toRoXT7GaUqg",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
                  function () {
                    return this._sequence(
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
                        return this._action(
                          function () { return (["BindPattern", p, name]); }
                        );
                      }
                    );
                  },
                  function () {
                    return this._sequence(
                      function () {
                        return this.pn.call(this, ":");
                      },
                      function () {
                        return name = this.id.call(this)
                      },
                      function () {
                        return this._action(
                          function () { return (["BindPattern", ["NextPattern"], name]); }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this._sequence(
                  function () {
                    return this.pn.call(this, ":");
                  },
                  function () {
                    return this._action(
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
  return this._memoize("operatorPattern_GOn7xPUaVCiQvnWIVJa4ZA",
    function () {
      this._ignore();
      this.pushStartPosition();
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
                                return this._sequence(
                                  function () {
                                    return this.pn.call(this, "&");
                                  },
                                  function () {
                                    return p = this.hashPattern.call(this)
                                  },
                                  function () {
                                    return this._action(
                                      function () { return (["LookaheadPattern",    p]); }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this._sequence(
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
                                    return this._action(
                                      function () { return (["DoubleNegatePattern", p]); }
                                    );
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return this._sequence(
                              function () {
                                return this.pn.call(this, "~");
                              },
                              function () {
                                return p = this.hashPattern.call(this)
                              },
                              function () {
                                return this._action(
                                  function () { return (["NegatePattern",       p]); }
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this._sequence(
                          function () {
                            return p = this.hashPattern.call(this)
                          },
                          function () {
                            return this.pn.call(this, "?");
                          },
                          function () {
                            return this._action(
                              function () { return (["OptionalPattern",     p]); }
                            );
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this._sequence(
                      function () {
                        return p = this.hashPattern.call(this)
                      },
                      function () {
                        return this.pn.call(this, "*");
                      },
                      function () {
                        return this._action(
                          function () { return (["RepeatPattern",       p]); }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this._sequence(
                  function () {
                    return p = this.hashPattern.call(this)
                  },
                  function () {
                    return this.pn.call(this, "+");
                  },
                  function () {
                    return this._action(
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
  return this._memoize("hashPattern_wxB/79sQjLU+W/ZBra/R/Q",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._choice(
          function () {
            return this._sequence(
              function () {
                return this.pn.call(this, "#");
              },
              function () {
                return p = this.callPattern.call(this)
              },
              function () {
                return this._action(
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
  return this._memoize("callPattern_G8cD6TlfaFvmgHlXtpOahA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return p = this.primaryPattern.call(this)
          },
          function () {
            return this._repeat(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () {
                        return this._sequence(
                          function () {
                            return this.pn.call(this, "(");
                          },
                          function () {
                            return this._optional(
                              this.ws
                            );
                          },
                          function () {
                            return this.pn.call(this, ")");
                          },
                          function () {
                            return p = function () {
                              return this._action(
                                function () { return (["CallPattern", p, []]); }
                              );
                            }.call(this)
                          }
                        );
                      },
                      function () {
                        return this._sequence(
                          function () {
                            return this.pn.call(this, "(");
                          },
                          function () {
                            return this._negate(
                              function () {
                                return this._sequence(
                                  function () {
                                    return this._optional(
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
                              return this._action(
                                function () { return (["JSCallPattern", p, f]); }
                              );
                            }.call(this)
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this._sequence(
                      function () {
                        return this.pn.call(this, "[");
                      },
                      function () {
                        return this._optional(
                          this.ws
                        );
                      },
                      function () {
                        return ps = function () {
                          return this.delimited.call(this,
                            function () {
                              return this._sequence(
                                this.bindPattern,
                                function () {
                                  return this._optional(
                                    this.ws
                                  );
                                },
                                function () {
                                  return this.pn.call(this, ',');
                                },
                                function () {
                                  return this._optional(
                                    this.ws
                                  );
                                }
                              );
                            }
                          );
                        }.call(this)
                      },
                      function () {
                        return this._optional(
                          this.ws
                        );
                      },
                      function () {
                        return this.pn.call(this, ']');
                      },
                      function () {
                        return p = function () {
                          return this._action(
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
            return this._action(
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
  return this._memoize("primaryPattern_tUPnUyzW6UrGK616dlodiw",
    function () {
      this._ignore();
      this.pushStartPosition();
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
  return this._memoize("predicatePattern_lZXLNW5D+yGHrLx0+CbslA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this.pn.call(this, "?");
          },
          function () {
            return b = this.semanticBody.call(this)
          },
          function () {
            return this._action(
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
  return this._memoize("actionPattern_vwbFUQVR4sByk2sQcfYL1Q",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this.pn.call(this, "!");
          },
          function () {
            return b = this.semanticBody.call(this)
          },
          function () {
            return this._action(
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
  return this._memoize("immediatePattern_lSGidIeVyRWGorSt2H06TQ",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this.pn.call(this, "%");
          },
          function () {
            return b = this.semanticBody.call(this)
          },
          function () {
            return this._action(
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
  return this._memoize("propertyPattern_6zfBFnZjmNio/sgvHRowEg",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return name = this.id.call(this)
          },
          function () {
            return this._action(
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
  return this._memoize("objectPattern_7NBCXhOO7IFksChroVOuPA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this.pn.call(this, "@");
          },
          function () {
            return b = this.semantic.call(this)
          },
          function () {
            return this._action(
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
  return this._memoize("stringPattern_5R+QuhMc935GQnDX9g+F2g",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return text = this.string.call(this)
          },
          function () {
            return this._action(
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
  return this._memoize("numberPattern_btCHVo54Jqr/QPPcs91V5Q",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return text = this.number.call(this)
          },
          function () {
            return this._action(
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
  return this._memoize("nestedInputPattern_hM4PAPyu+8AFIHH/SJe7aA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this.pn.call(this, "[");
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return p = this.pattern.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, "]");
          },
          function () {
            return this._action(
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
  return this._memoize("subpattern_tkvmZFyLyyJ5CzWlniGE0g",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this.pn.call(this, "(");
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return p = this.pattern.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, ")");
          },
          function () {
            return this._action(
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
  return this._memoize("emptyPattern_/xkQVQq23HTdhu7ekNF0hw",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._action(
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
  return this._memoize("semanticBody_5tEwai+cNwv4mNg1FQQILQ",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._sequence(
                  function () {
                    return this.pn.call(this, "(");
                  },
                  function () {
                    return this._negate(
                      function () {
                        return this._sequence(
                          function () {
                            return this._optional(
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
                    return this._action(
                      function () { return (["ExpressionSemanticBody", f]); }
                    );
                  }
                );
              },
              function () {
                return this._sequence(
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
                    return this._action(
                      function () { return (["FunctionSemanticBody", f]); }
                    );
                  }
                );
              }
            );
          },
          function () {
            return this._sequence(
              function () {
                return f = function () {
                  return this.scan.call(this,
                    this.semanticBodyFilter
                  );
                }.call(this)
              },
              function () {
                return this._action(
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
  return this._memoize("semanticBodyFilter_jaCXtlS/dAnzdSrBvn/6MQ",
    function () {
      this._ignore();
      this.pushStartPosition();
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
                                          function () { return this._string("RegularExpression"); },
                                          function () { return this._string("String"); }
                                        );
                                      },
                                      function () { return this._string("Number"); }
                                    );
                                  },
                                  function () { return this._string("Null"); }
                                );
                              },
                              function () { return this._string("Boolean"); }
                            );
                          },
                          function () { return this._string("IdentifierName"); }
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
  return this._memoize("suppressors_vUb5cUn2GrBZv+u9+uYjog",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = this.suppressDotIdentifierName.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

CombeParser.prototype.suppressDotIdentifierName = /* rule */ function () {
  return this._memoize("suppressDotIdentifierName_BaF3Gn/2Du0PLUV9I8L+Xg",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this.pn.call(this, ".");
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          this.id,
          function () {
            return this._negate(
              function () {
                return this._sequence(
                  function () {
                    return this._optional(
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
  return this._memoize("inferredName_w0YqBlPcvbrobECZ18AqFg",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._choice(
          function () {
            return this._choice(
              function () {
                return this._choice(
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
  return this._memoize("dotAssign_ewFQYr74y021iUGm15J1JQ",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this.pn.call(this, ".");
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return name = this.id.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, "=");
          },
          function () {
            return this._action(
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
  return this._memoize("propdeclAssign_//Eg0hT1CPKs8jJFXYBlHA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return name = function () {
              return this._choice(
                this.id,
                this.string
              );
            }.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, ":");
          },
          function () {
            return this._action(
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
  return this._memoize("subscriptAssign_aB+BfSNsa+9nimyBT07pXA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this.pn.call(this, "[");
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return name = this.string.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, "]");
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, "=");
          },
          function () {
            return this._action(
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
  return this._memoize("variableAssign_Oj1eArfh/RjFQSSmraBF1A",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return name = this.id.call(this)
          },
          function () {
            return this._optional(
              this.ws
            );
          },
          function () {
            return this.pn.call(this, "=");
          },
          function () {
            return this._action(
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
  return this._memoize("next_OU5b+z+h+Wz+vYe9ST4mUg",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return t = function () { return (TokenGrammar.prototype.next); }.call(this).call(this)
          },
          function () {
            return this._action(
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
            return this._action(
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
  return this._memoize("id_vXntQieO+dwWBtsKf84ZlA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return t = function () { return this._string("IdentifierName"); }.call(this)
          },
          function () {
            return this._predicate(
              function () { return (expected == null || t.text == expected); }
            );
          },
          function () {
            return this._action(
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
  return this._memoize("pn_2mBhlkAbm29C4E9qyPPoww",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return t = function () { return this._string("Punctuator"); }.call(this)
          },
          function () {
            return this._predicate(
              function () { return (expected == null || t.text == expected); }
            );
          },
          function () {
            return this._action(
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
  return this._memoize("string_zoSQ6N06zzPQ1cOoaRcpZA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return t = function () { return this._string("String"); }.call(this)
          },
          function () {
            return this._action(
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
  return this._memoize("ws_FHqalQ1T2dR45c9ab818WA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return this._repeat(
              function () {
                return this._choice(
                  function () {
                    return this._choice(
                      function () {
                        return this._choice(
                          function () { return this._string("MultilineComment"); },
                          function () { return this._string("SinglelineComment"); }
                        );
                      },
                      function () { return this._string("Spaces"); }
                    );
                  },
                  this.newline
                );
              }
            );
          },
          function () {
            return this._action(
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
  return this._memoize("newline_5Csy++nIKJRc32pGX/RGCA",
    function () {
      this._ignore();
      this.pushStartPosition();
      var result = function () {
        return this._sequence(
          function () {
            return t = function () { return this._string("Newline"); }.call(this)
          },
          function () {
            return this._doubleNegate(
              function () {
                return ts = function () {
                  return this._repeat(
                    function () {
                      return this._choice(
                        function () {
                          return this._choice(
                            function () { return this._string("MutlilineComment"); },
                            function () { return this._string("SinglelineComment"); }
                          );
                        },
                        function () { return this._string("Spaces"); }
                      );
                    }
                  );
                }.call(this)
              }
            );
          },
          function () {
            return this._action(
              function () {
    if (ts.length > 0) this.set("indent", ts[ts.length - 1].end - t.start);
    else               this.set("indent", 0);
  }
            );
          },
          function () {
            return this._action(
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
