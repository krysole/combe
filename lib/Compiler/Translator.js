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

var Show = require("../Show.js");
var Ast = require("../Ast.js");
var ObjectGrammar = require("../ObjectGrammar.js");



function Translator() {
  ObjectGrammar.call(this);
};
Translator.prototype = Object.create(ObjectGrammar.prototype);
Translator.prototype.constructor = Translator;
module.exports = Translator;



Translator.prototype.start = /* rule */ function (r) {
  var r;
  return this.memoize("start_x1mZn5u+ELegP2Vn1ggnHw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return r = function () {
              return this.postorderTransform.call(this,
                function () { return (r); }.call(this),
                this.rewrite
              );
            }.call(this)
          },
          function () {
            return r = function () {
              return this.postorderTransform.call(this,
                function () { return (r); }.call(this),
                this.simplify
              );
            }.call(this)
          },
          function () {
            return this.action(
              function () { return (r); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



Translator.prototype.rewrite = /* rule */ function () {
  var indent, name, iname, pf, bs, p, as, af, f;
  return this.memoize("rewrite_43Bg9H2sY7GgERZ8KtINKQ",
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
                                                                                                                return this.sequence(
                                                                                                                  function () {
                                                                                                                    return this.nestedAst(
                                                                                                                      function () {
                                                                                                                        return this.sequence(
                                                                                                                          function () { return this.string("Rule"); },
                                                                                                                          function () {
                                                                                                                            return indent = this.next.call(this)
                                                                                                                          },
                                                                                                                          function () {
                                                                                                                            return name = this.next.call(this)
                                                                                                                          },
                                                                                                                          function () {
                                                                                                                            return iname = this.next.call(this)
                                                                                                                          },
                                                                                                                          function () {
                                                                                                                            return pf = this.next.call(this)
                                                                                                                          },
                                                                                                                          function () {
                                                                                                                            return bs = this.next.call(this)
                                                                                                                          },
                                                                                                                          function () {
                                                                                                                            return p = this.next.call(this)
                                                                                                                          }
                                                                                                                        );
                                                                                                                      }
                                                                                                                    );
                                                                                                                  },
                                                                                                                  function () {
                                                                                                                    return this.action(
                                                                                                                      function () { return (new Ast("Indent", indent, 
    new Ast("Function", pf, [
      new Ast("VarDecl*", bs),
      new Ast("ExprStmt", new Ast("ThisCall", new Ast("ThisProperty", "ignore"), [])),
      new Ast("ExprStmt", new Ast("ThisCall", new Ast("ThisProperty", "pushStartPosition"), [])),
      new Ast("VarDecl", "__result", new Ast("ThisCall", p, [])),
      new Ast("ExprStmt", new Ast("ThisCall", new Ast("ThisProperty", "popStartPosition"), [])),
      new Ast("Return", new Ast("Var", "__result"))
    ])
  )); }
                                                                                                                    );
                                                                                                                  }
                                                                                                                );
                                                                                                              },
                                                                                                              function () {
                                                                                                                return this.sequence(
                                                                                                                  function () {
                                                                                                                    return this.nestedAst(
                                                                                                                      function () {
                                                                                                                        return this.sequence(
                                                                                                                          function () { return this.string("ChoicePattern"); },
                                                                                                                          function () {
                                                                                                                            return as = this.next.call(this)
                                                                                                                          }
                                                                                                                        );
                                                                                                                      }
                                                                                                                    );
                                                                                                                  },
                                                                                                                  function () {
                                                                                                                    return this.action(
                                                                                                                      function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "choice"      ), as ))])); }
                                                                                                                    );
                                                                                                                  }
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          },
                                                                                                          function () {
                                                                                                            return this.sequence(
                                                                                                              function () {
                                                                                                                return this.nestedAst(
                                                                                                                  function () {
                                                                                                                    return this.sequence(
                                                                                                                      function () { return this.string("SequencePattern"); },
                                                                                                                      function () {
                                                                                                                        return as = this.next.call(this)
                                                                                                                      }
                                                                                                                    );
                                                                                                                  }
                                                                                                                );
                                                                                                              },
                                                                                                              function () {
                                                                                                                return this.action(
                                                                                                                  function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "sequence"    ), as ))])); }
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      },
                                                                                                      function () {
                                                                                                        return this.sequence(
                                                                                                          function () {
                                                                                                            return this.nestedAst(
                                                                                                              function () {
                                                                                                                return this.sequence(
                                                                                                                  function () { return this.string("BindPattern"); },
                                                                                                                  function () {
                                                                                                                    return name = this.next.call(this)
                                                                                                                  },
                                                                                                                  function () {
                                                                                                                    return p = this.next.call(this)
                                                                                                                  }
                                                                                                                );
                                                                                                              }
                                                                                                            );
                                                                                                          },
                                                                                                          function () {
                                                                                                            return this.action(
                                                                                                              function () { return (new Ast("Function", null, [new Ast("Return", new Ast("Assign", new Ast("Var", name), new Ast("ThisCall", p, [])    ))])); }
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      }
                                                                                                    );
                                                                                                  },
                                                                                                  function () {
                                                                                                    return this.sequence(
                                                                                                      function () {
                                                                                                        return this.nestedAst(
                                                                                                          function () {
                                                                                                            return this.sequence(
                                                                                                              function () { return this.string("LookaheadPattern"); },
                                                                                                              function () {
                                                                                                                return p = this.next.call(this)
                                                                                                              }
                                                                                                            );
                                                                                                          }
                                                                                                        );
                                                                                                      },
                                                                                                      function () {
                                                                                                        return this.action(
                                                                                                          function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "lookahead"   ), [p]))])); }
                                                                                                        );
                                                                                                      }
                                                                                                    );
                                                                                                  }
                                                                                                );
                                                                                              },
                                                                                              function () {
                                                                                                return this.sequence(
                                                                                                  function () {
                                                                                                    return this.nestedAst(
                                                                                                      function () {
                                                                                                        return this.sequence(
                                                                                                          function () { return this.string("DoubleNegatePattern"); },
                                                                                                          function () {
                                                                                                            return p = this.next.call(this)
                                                                                                          }
                                                                                                        );
                                                                                                      }
                                                                                                    );
                                                                                                  },
                                                                                                  function () {
                                                                                                    return this.action(
                                                                                                      function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "doubleNegate"), [p]))])); }
                                                                                                    );
                                                                                                  }
                                                                                                );
                                                                                              }
                                                                                            );
                                                                                          },
                                                                                          function () {
                                                                                            return this.sequence(
                                                                                              function () {
                                                                                                return this.nestedAst(
                                                                                                  function () {
                                                                                                    return this.sequence(
                                                                                                      function () { return this.string("NegatePattern"); },
                                                                                                      function () {
                                                                                                        return p = this.next.call(this)
                                                                                                      }
                                                                                                    );
                                                                                                  }
                                                                                                );
                                                                                              },
                                                                                              function () {
                                                                                                return this.action(
                                                                                                  function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "negate"      ), [p]))])); }
                                                                                                );
                                                                                              }
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      },
                                                                                      function () {
                                                                                        return this.sequence(
                                                                                          function () {
                                                                                            return this.nestedAst(
                                                                                              function () {
                                                                                                return this.sequence(
                                                                                                  function () { return this.string("OptionalPattern"); },
                                                                                                  function () {
                                                                                                    return p = this.next.call(this)
                                                                                                  }
                                                                                                );
                                                                                              }
                                                                                            );
                                                                                          },
                                                                                          function () {
                                                                                            return this.action(
                                                                                              function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "optional"    ), [p]))])); }
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  },
                                                                                  function () {
                                                                                    return this.sequence(
                                                                                      function () {
                                                                                        return this.nestedAst(
                                                                                          function () {
                                                                                            return this.sequence(
                                                                                              function () { return this.string("RepeatPattern"); },
                                                                                              function () {
                                                                                                return p = this.next.call(this)
                                                                                              }
                                                                                            );
                                                                                          }
                                                                                        );
                                                                                      },
                                                                                      function () {
                                                                                        return this.action(
                                                                                          function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "repeat"      ), [p]))])); }
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  }
                                                                                );
                                                                              },
                                                                              function () {
                                                                                return this.sequence(
                                                                                  function () {
                                                                                    return this.nestedAst(
                                                                                      function () {
                                                                                        return this.sequence(
                                                                                          function () { return this.string("Repeat1Pattern"); },
                                                                                          function () {
                                                                                            return p = this.next.call(this)
                                                                                          }
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  },
                                                                                  function () {
                                                                                    return this.action(
                                                                                      function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "repeat1"     ), [p]))])); }
                                                                                    );
                                                                                  }
                                                                                );
                                                                              }
                                                                            );
                                                                          },
                                                                          function () {
                                                                            return this.sequence(
                                                                              function () {
                                                                                return this.nestedAst(
                                                                                  function () {
                                                                                    return this.sequence(
                                                                                      function () { return this.string("JSCallPattern"); },
                                                                                      function () {
                                                                                        return p = this.next.call(this)
                                                                                      },
                                                                                      function () {
                                                                                        return af = this.next.call(this)
                                                                                      }
                                                                                    );
                                                                                  }
                                                                                );
                                                                              },
                                                                              function () {
                                                                                return this.action(
                                                                                  function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", p, af))])); }
                                                                                );
                                                                              }
                                                                            );
                                                                          }
                                                                        );
                                                                      },
                                                                      function () {
                                                                        return this.sequence(
                                                                          function () {
                                                                            return this.nestedAst(
                                                                              function () {
                                                                                return this.sequence(
                                                                                  function () { return this.string("CallPattern"); },
                                                                                  function () {
                                                                                    return p = this.next.call(this)
                                                                                  },
                                                                                  function () {
                                                                                    return as = this.next.call(this)
                                                                                  }
                                                                                );
                                                                              }
                                                                            );
                                                                          },
                                                                          function () {
                                                                            return this.action(
                                                                              function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", p, as))])); }
                                                                            );
                                                                          }
                                                                        );
                                                                      }
                                                                    );
                                                                  },
                                                                  function () {
                                                                    return this.sequence(
                                                                      function () {
                                                                        return this.nestedAst(
                                                                          function () {
                                                                            return this.sequence(
                                                                              function () { return this.string("PredicatePattern"); },
                                                                              function () {
                                                                                return p = this.next.call(this)
                                                                              }
                                                                            );
                                                                          }
                                                                        );
                                                                      },
                                                                      function () {
                                                                        return this.action(
                                                                          function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "predicate"   ), [p]))])); }
                                                                        );
                                                                      }
                                                                    );
                                                                  }
                                                                );
                                                              },
                                                              function () {
                                                                return this.sequence(
                                                                  function () {
                                                                    return this.nestedAst(
                                                                      function () {
                                                                        return this.sequence(
                                                                          function () { return this.string("ActionPattern"); },
                                                                          function () {
                                                                            return p = this.next.call(this)
                                                                          }
                                                                        );
                                                                      }
                                                                    );
                                                                  },
                                                                  function () {
                                                                    return this.action(
                                                                      function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "action"      ), [p]))])); }
                                                                    );
                                                                  }
                                                                );
                                                              }
                                                            );
                                                          },
                                                          function () {
                                                            return this.sequence(
                                                              function () {
                                                                return this.nestedAst(
                                                                  function () {
                                                                    return this.sequence(
                                                                      function () { return this.string("ImmediatePattern"); },
                                                                      function () {
                                                                        return p = this.next.call(this)
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
                                                          }
                                                        );
                                                      },
                                                      function () {
                                                        return this.sequence(
                                                          function () {
                                                            return this.nestedAst(
                                                              function () {
                                                                return this.sequence(
                                                                  function () { return this.string("PropertyPattern"); },
                                                                  function () {
                                                                    return name = this.next.call(this)
                                                                  }
                                                                );
                                                              }
                                                            );
                                                          },
                                                          function () {
                                                            return this.action(
                                                              function () { return (new Ast("ThisProperty", name)); }
                                                            );
                                                          }
                                                        );
                                                      }
                                                    );
                                                  },
                                                  function () {
                                                    return this.sequence(
                                                      function () {
                                                        return this.nestedAst(
                                                          function () {
                                                            return this.sequence(
                                                              function () { return this.string("ObjectPattern"); },
                                                              function () {
                                                                return p = this.next.call(this)
                                                              }
                                                            );
                                                          }
                                                        );
                                                      },
                                                      function () {
                                                        return this.action(
                                                          function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "object"      ), [new Ast("ThisCall", p, [])]))])); }
                                                        );
                                                      }
                                                    );
                                                  }
                                                );
                                              },
                                              function () {
                                                return this.sequence(
                                                  function () {
                                                    return this.nestedAst(
                                                      function () {
                                                        return this.sequence(
                                                          function () { return this.string("StringPattern"); },
                                                          function () {
                                                            return p = this.next.call(this)
                                                          }
                                                        );
                                                      }
                                                    );
                                                  },
                                                  function () {
                                                    return this.action(
                                                      function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "string"      ), [p]))])); }
                                                    );
                                                  }
                                                );
                                              }
                                            );
                                          },
                                          function () {
                                            return this.sequence(
                                              function () {
                                                return this.nestedAst(
                                                  function () {
                                                    return this.sequence(
                                                      function () { return this.string("NumberPattern"); },
                                                      function () {
                                                        return p = this.next.call(this)
                                                      }
                                                    );
                                                  }
                                                );
                                              },
                                              function () {
                                                return this.action(
                                                  function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "number"      ), [p]))])); }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      },
                                      function () {
                                        return this.sequence(
                                          function () {
                                            return this.nestedAst(
                                              function () {
                                                return this.sequence(
                                                  function () { return this.string("RegularExpression"); },
                                                  function () {
                                                    return p = this.next.call(this)
                                                  }
                                                );
                                              }
                                            );
                                          },
                                          function () {
                                            return this.action(
                                              function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "regularExpression"), [p]))])); }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  },
                                  function () {
                                    return this.sequence(
                                      function () {
                                        return this.nestedAst(
                                          function () {
                                            return this.sequence(
                                              function () { return this.string("NestedArrayPattern"); },
                                              function () {
                                                return p = this.next.call(this)
                                              }
                                            );
                                          }
                                        );
                                      },
                                      function () {
                                        return this.action(
                                          function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "nestedArray" ), [p]))])); }
                                        );
                                      }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this.sequence(
                                  function () {
                                    return this.nestedAst(
                                      function () {
                                        return this.sequence(
                                          function () { return this.string("NestedAstPattern"); },
                                          function () {
                                            return p = this.next.call(this)
                                          }
                                        );
                                      }
                                    );
                                  },
                                  function () {
                                    return this.action(
                                      function () { return (new Ast("Function", null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "nestedAst"   ), [p]))])); }
                                    );
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return this.sequence(
                              function () {
                                return this.nestedAst(
                                  function () { return this.string("EmptyPattern"); }
                                );
                              },
                              function () {
                                return this.action(
                                  function () { return (new Ast("ThisProperty", "pass")); }
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this.sequence(
                          function () {
                            return this.nestedAst(
                              function () { return this.string("NextPattern"); }
                            );
                          },
                          function () {
                            return this.action(
                              function () { return (new Ast("ThisProperty", "next")); }
                            );
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () {
                        return this.nestedAst(
                          function () {
                            return this.sequence(
                              function () { return this.string("ExpressionSemanticBody"); },
                              function () {
                                return f = this.next.call(this)
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this.action(
                          function () { return (new Ast("Function", null, [new Ast("Return", new Ast("Subexpression", f))])); }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  function () {
                    return this.nestedAst(
                      function () {
                        return this.sequence(
                          function () { return this.string("FunctionSemanticBody"); },
                          function () {
                            return f = this.next.call(this)
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.action(
                      function () { return (new Ast("Function", null, [f])); }
                    );
                  }
                );
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



Translator.prototype.simplify = /* rule */ function () {
  var name, as_or_f, fn, as, f, expr, x, object;
  return this.memoize("simplify_lvcsjCGnbfu4e5lM9pj3zQ",
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
                                    return this.nestedAst(
                                      function () {
                                        return this.sequence(
                                          function () { return this.string("ThisCall"); },
                                          function () {
                                            return this.nestedAst(
                                              function () {
                                                return this.sequence(
                                                  function () { return this.string("ThisProperty"); },
                                                  function () {
                                                    return name = this.next.call(this)
                                                  }
                                                );
                                              }
                                            );
                                          },
                                          function () {
                                            return as_or_f = this.next.call(this)
                                          }
                                        );
                                      }
                                    );
                                  },
                                  function () {
                                    return this.action(
                                      function () { return (new Ast("Call", new Ast("Lookup", new Ast("This"), name), as_or_f)); }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this.sequence(
                                  function () {
                                    return this.nestedAst(
                                      function () {
                                        return this.sequence(
                                          function () { return this.string("ThisCall"); },
                                          function () {
                                            return fn = this.next.call(this)
                                          },
                                          function () {
                                            return this.nestedArray(
                                              function () {
                                                return as = function () {
                                                  return this.repeat(
                                                    this.next
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
                                      function () { return (new Ast("Call", new Ast("Lookup", fn, "call"), [new Ast("This")].concat(as))); }
                                    );
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return this.sequence(
                              function () {
                                return this.nestedAst(
                                  function () {
                                    return this.sequence(
                                      function () { return this.string("ThisCall"); },
                                      function () {
                                        return fn = this.next.call(this)
                                      },
                                      function () {
                                        return f = this.next.call(this)
                                      }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this.action(
                                  function () { return (new Ast("Call", new Ast("Lookup", fn, "call"), [new Ast("This"), f])); }
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this.sequence(
                          function () {
                            return this.nestedAst(
                              function () {
                                return this.sequence(
                                  function () { return this.string("Call"); },
                                  function () {
                                    return this.nestedAst(
                                      function () {
                                        return this.sequence(
                                          function () { return this.string("Function"); },
                                          function () {
                                            return this.choice(
                                              function () {
                                                return this.nestedArray(
                                                  this.empty
                                                );
                                              },
                                              this.nou
                                            );
                                          },
                                          function () {
                                            return this.nestedArray(
                                              function () {
                                                return this.nestedAst(
                                                  function () {
                                                    return this.sequence(
                                                      function () { return this.string("Return"); },
                                                      function () {
                                                        return expr = this.next.call(this)
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
                                  },
                                  function () {
                                    return this.choice(
                                      function () {
                                        return this.nestedArray(
                                          this.empty
                                        );
                                      },
                                      this.nou
                                    );
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return this.action(
                              function () { return (expr); }
                            );
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () {
                        return this.nestedAst(
                          function () {
                            return this.sequence(
                              function () { return this.string("Call"); },
                              function () {
                                return this.nestedAst(
                                  function () {
                                    return this.sequence(
                                      function () { return this.string("Lookup"); },
                                      function () {
                                        return this.nestedAst(
                                          function () {
                                            return this.sequence(
                                              function () { return this.string("Function"); },
                                              function () {
                                                return this.choice(
                                                  function () {
                                                    return this.nestedArray(
                                                      this.empty
                                                    );
                                                  },
                                                  this.nou
                                                );
                                              },
                                              function () {
                                                return this.nestedArray(
                                                  function () {
                                                    return this.nestedAst(
                                                      function () {
                                                        return this.sequence(
                                                          function () { return this.string("Return"); },
                                                          function () {
                                                            return expr = this.next.call(this)
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
                                      },
                                      function () { return this.string("call"); }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this.nestedArray(
                                  function () {
                                    return this.nestedAst(
                                      function () { return this.string("This"); }
                                    );
                                  }
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this.action(
                          function () { return (expr); }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  function () {
                    return x = function () {
                      return this.nestedAst(
                        function () {
                          return this.sequence(
                            function () { return this.string("Call"); },
                            function () {
                              return this.nestedAst(
                                function () {
                                  return this.sequence(
                                    function () { return this.string("Lookup"); },
                                    function () {
                                      return object = this.next.call(this)
                                    },
                                    function () {
                                      return name = this.next.call(this)
                                    }
                                  );
                                }
                              );
                            },
                            function () {
                              return as = this.next.call(this)
                            }
                          );
                        }
                      );
                    }.call(this)
                  },
                  function () {
                    return this.log.call(this, "Call object = " + Show.synopsis(object) + "; name = " + Show.synopsis(name) + "; as = " + Show.synopsis(as));
                  },
                  function () {
                    return this.action(
                      function () { return (x); }
                    );
                  }
                );
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



Translator.prototype.fnparams = /* rule */ function (i) {
  var ps, pf;
  return this.memoize("fnparams_t9b+pPrOrSP5dUvT2xx2kQ",
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
                    return this.nestedArray(
                      function () {
                        return ps = function () {
                          return this.repeat(
                            this.next
                          );
                        }.call(this)
                      }
                    );
                  },
                  function () {
                    return this.action(
                      function () { return (ps.join(", ")); }
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  function () {
                    return pf = function () {
                      return this.translate.call(this, i);
                    }.call(this)
                  },
                  function () {
                    return this.action(
                      function () { return (pf); }
                    );
                  }
                );
              }
            );
          },
          function () {
            return this.sequence(
              this.nou,
              function () {
                return this.action(
                  function () { return (""); }
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

Translator.prototype.translate = /* rule */ function (i) {
  var k, x, fs, f, ps, stmts, pf, names, name, expr, lvalue, rvalue, fn, as, o;
  return this.memoize("translate_QmO7FMShKuywZjkFQbnpew",
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
                                                                    return this.sequence(
                                                                      function () {
                                                                        return this.nestedAst(
                                                                          function () {
                                                                            return this.sequence(
                                                                              function () { return this.string("Indent"); },
                                                                              function () {
                                                                                return k = this.next.call(this)
                                                                              },
                                                                              function () {
                                                                                return x = function () {
                                                                                  return this.translate.call(this, k);
                                                                                }.call(this)
                                                                              }
                                                                            );
                                                                          }
                                                                        );
                                                                      },
                                                                      function () {
                                                                        return this.action(
                                                                          function () { return (x); }
                                                                        );
                                                                      }
                                                                    );
                                                                  },
                                                                  function () {
                                                                    return this.sequence(
                                                                      function () {
                                                                        return this.nestedAst(
                                                                          function () {
                                                                            return this.sequence(
                                                                              function () { return this.string("Composite"); },
                                                                              function () {
                                                                                return this.nestedArray(
                                                                                  function () {
                                                                                    return fs = function () {
                                                                                      return this.repeat(
                                                                                        function () {
                                                                                          return this.translate.call(this, i);
                                                                                        }
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
                                                                          function () { return (fs.join("")); }
                                                                        );
                                                                      }
                                                                    );
                                                                  }
                                                                );
                                                              },
                                                              function () {
                                                                return this.sequence(
                                                                  function () {
                                                                    return this.nestedAst(
                                                                      function () {
                                                                        return this.sequence(
                                                                          function () { return this.string("Fragment"); },
                                                                          function () {
                                                                            return f = this.next.call(this)
                                                                          }
                                                                        );
                                                                      }
                                                                    );
                                                                  },
                                                                  function () {
                                                                    return this.action(
                                                                      function () { return (f); }
                                                                    );
                                                                  }
                                                                );
                                                              }
                                                            );
                                                          },
                                                          function () {
                                                            return this.sequence(
                                                              function () {
                                                                return this.nestedAst(
                                                                  function () {
                                                                    return this.sequence(
                                                                      function () { return this.string("Function"); },
                                                                      function () {
                                                                        return ps = this.fnparams.call(this)
                                                                      },
                                                                      function () {
                                                                        return this.nestedArray(
                                                                          function () {
                                                                            return stmts = function () {
                                                                              return this.repeat(
                                                                                function () {
                                                                                  return this.translate.call(this, i + 2);
                                                                                }
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
                                                                  function () { return (
    "function (" + ps.join(", ") + ") {\n" +
      stmts.join("") +
    "}"
  ); }
                                                                );
                                                              }
                                                            );
                                                          }
                                                        );
                                                      },
                                                      function () {
                                                        return this.sequence(
                                                          function () {
                                                            return this.nestedAst(
                                                              function () {
                                                                return this.sequence(
                                                                  function () { return this.string("Function"); },
                                                                  function () {
                                                                    return pf = function () {
                                                                      return this.translate.call(this, i + 2);
                                                                    }.call(this)
                                                                  },
                                                                  function () {
                                                                    return this.nestedArray(
                                                                      function () {
                                                                        return stmts = function () {
                                                                          return this.repeat(
                                                                            function () {
                                                                              return this.translate.call(this, i + 2);
                                                                            }
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
                                                              function () { return (
    "function (" + pf + ") {\n" +
      stmts.join("") +
    "}"
  ); }
                                                            );
                                                          }
                                                        );
                                                      }
                                                    );
                                                  },
                                                  function () {
                                                    return this.sequence(
                                                      function () {
                                                        return this.nestedAst(
                                                          function () {
                                                            return this.sequence(
                                                              function () { return this.string("VarDecl*"); },
                                                              function () {
                                                                return names = this.next.call(this)
                                                              }
                                                            );
                                                          }
                                                        );
                                                      },
                                                      function () {
                                                        return this.action(
                                                          function () { return (
    " ".repeat(i) + "var " + names.join(", ") + ";\n"
  ); }
                                                        );
                                                      }
                                                    );
                                                  }
                                                );
                                              },
                                              function () {
                                                return this.sequence(
                                                  function () {
                                                    return this.nestedAst(
                                                      function () {
                                                        return this.sequence(
                                                          function () { return this.string("VarDecl"); },
                                                          function () {
                                                            return name = this.next.call(this)
                                                          },
                                                          function () {
                                                            return expr = function () {
                                                              return this.optional(
                                                                function () {
                                                                  return this.translate.call(this, i);
                                                                }
                                                              );
                                                            }.call(this)
                                                          }
                                                        );
                                                      }
                                                    );
                                                  },
                                                  function () {
                                                    return this.action(
                                                      function () {
    if (expr != null) {
      return " ".repeat(i) + "var " + name + " = " + expr + ";\n";
    }
    else {
      return " ".repeat(i) + "var " + name + ";\n";
    }
  }
                                                    );
                                                  }
                                                );
                                              }
                                            );
                                          },
                                          function () {
                                            return this.sequence(
                                              function () {
                                                return this.nestedAst(
                                                  function () {
                                                    return this.sequence(
                                                      function () { return this.string("ExprStmt"); },
                                                      function () {
                                                        return expr = function () {
                                                          return this.translate.call(this, i);
                                                        }.call(this)
                                                      }
                                                    );
                                                  }
                                                );
                                              },
                                              function () {
                                                return this.action(
                                                  function () { return (
    " ".repeat(i) + expr + ";\n"
  ); }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      },
                                      function () {
                                        return this.sequence(
                                          function () {
                                            return this.nestedAst(
                                              function () {
                                                return this.sequence(
                                                  function () { return this.string("Return"); },
                                                  function () {
                                                    return expr = function () {
                                                      return this.translate.call(this, i);
                                                    }.call(this)
                                                  }
                                                );
                                              }
                                            );
                                          },
                                          function () {
                                            return this.action(
                                              function () { return (
    " ".repeat(i) + "return " + expr + ";\n"
  ); }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  },
                                  function () {
                                    return this.sequence(
                                      function () {
                                        return this.nestedAst(
                                          function () {
                                            return this.sequence(
                                              function () { return this.string("Assign"); },
                                              function () {
                                                return lvalue = function () {
                                                  return this.translate.call(this, i);
                                                }.call(this)
                                              },
                                              function () {
                                                return rvalue = this.i.call(this)
                                              }
                                            );
                                          }
                                        );
                                      },
                                      function () {
                                        return this.action(
                                          function () { return (
    lvalue + " = " + rvalue
  ); }
                                        );
                                      }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this.sequence(
                                  function () {
                                    return this.nestedAst(
                                      function () {
                                        return this.sequence(
                                          function () { return this.string("Call"); },
                                          function () {
                                            return fn = function () {
                                              return this.translate.call(this, i);
                                            }.call(this)
                                          },
                                          function () {
                                            return this.nestedArray(
                                              function () {
                                                return as = function () {
                                                  return this.repeat(
                                                    function () {
                                                      return this.translate.call(this, i);
                                                    }
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
                                      function () { return (
    fn + "(" + as.join(", ") + ")"
  ); }
                                    );
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return this.sequence(
                              function () {
                                return this.nestedAst(
                                  function () {
                                    return this.sequence(
                                      function () { return this.string("Lookup"); },
                                      function () {
                                        return o = function () {
                                          return this.translate.call(this, i);
                                        }.call(this)
                                      },
                                      function () {
                                        return name = this.next.call(this)
                                      }
                                    );
                                  }
                                );
                              },
                              function () {
                                return this.action(
                                  function () {
    if (name.isIdentifierName()) {
      return o + "." + name;
    }
    else {
      return o + "[" + name.quote() + "]";
    }
  }
                                );
                              }
                            );
                          }
                        );
                      },
                      function () {
                        return this.sequence(
                          function () {
                            return this.nestedAst(
                              function () {
                                return this.sequence(
                                  function () { return this.string("Var"); },
                                  function () {
                                    return name = this.next.call(this)
                                  }
                                );
                              }
                            );
                          },
                          function () {
                            return this.action(
                              function () { return (name); }
                            );
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.sequence(
                      function () {
                        return this.nestedAst(
                          function () { return this.string("This"); }
                        );
                      },
                      function () {
                        return this.action(
                          function () { return ("this"); }
                        );
                      }
                    );
                  }
                );
              },
              function () {
                return this.sequence(
                  function () {
                    return this.nestedAst(
                      function () {
                        return this.sequence(
                          function () { return this.string("Subexpression"); },
                          function () {
                            return expr = function () {
                              return this.translate.call(this, i);
                            }.call(this)
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.action(
                      function () { return (
    "(" + expr + ")"
  ); }
                    );
                  }
                );
              }
            );
          },
          function () {
            return this.sequence(
              function () {
                return x = this.next.call(this)
              },
              function () {
                return this.error.call(this, "Unexpected translator jsast " + Show.synopsis(x));
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
