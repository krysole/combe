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

var crypto = require('crypto');

var Util = require("../Util.js");
var Show = require("../Show.js");
var Ast = require("../Ast.js");
var ObjectGrammar = require("../ObjectGrammar.js");



function Translator() {
  ObjectGrammar.call(this);
};
Translator.prototype = Object.create(ObjectGrammar.prototype);
Translator.prototype.constructor = Translator;
module.exports = Translator;



Translator.prototype.start = function (r) {
  var r;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.sequence.call(this,
        function () {
          return r = this.postorderTransform.call(this, r, this.rewrite);
        },
        function () {
          return r = this.postorderTransform.call(this, r, this.simplify);
        },
        function () {
          return r = this.on.call(this,
            r,
            function () {
              return this.translate.call(this, 0);
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {
              return r;
            }
          );
        }
      );
    }
  );
  this.popStartPosition.call(this);
  return __result;
};



Translator.prototype.hash = function (r) {
  var text = Show.show(r);
  var hash = crypto.createHash("md5");
  hash.update(text);
  return hash.digest("base64").slice(0, -2); // Without base64 suffix
};

Translator.prototype.memoname = function (name, iname, hash) {
  if (name != null) iname = name;
  if (iname == null) iname = "*unnamed";
  return iname + "_" + hash;
};



Translator.prototype.rewrite = function () {
  return this.memoize.call(this,
    "rewrite_GYZ/cNfwwChzLlzOdwnr6w",
    function () {
      var r, indent, name, iname, pf, bs, p, h, memoname, stmts, ps, af, as, f;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return r = this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "Rule");
                        },
                        function () {
                          return indent = this.next.call(this);
                        },
                        function () {
                          return name = this.next.call(this);
                        },
                        function () {
                          return iname = this.next.call(this);
                        },
                        function () {
                          return pf = this.next.call(this);
                        },
                        function () {
                          return bs = this.next.call(this);
                        },
                        function () {
                          return p = this.next.call(this);
                        }
                      );
                    }
                  );
                }
              );
            },
            function () {
              return h = this.hash.call(this, r);
            },
            function () {
              return memoname = this.memoname.call(this, name, iname, h);
            },
            function () {
              return stmts = this.action.call(this,
                function () {
                  return [
    new Ast("VarDecl*", bs),
    new Ast("ExprStmt", new Ast("ThisCall", new Ast("ThisProperty", "ignore"), [])),
    new Ast("ExprStmt", new Ast("ThisCall", new Ast("ThisProperty", "pushStartPosition"), [])),
    new Ast("VarDecl", "__result", new Ast("ThisCall", p, [])),
    new Ast("ExprStmt", new Ast("ThisCall", new Ast("ThisProperty", "popStartPosition"), [])),
    new Ast("Return", new Ast("Var", "__result"))
  ];
                }
              );
            },
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.chain.call(this,
                        function () {
                          return this.action.call(this,
                            function () {
                              return pf;
                            }
                          );
                        },
                        this.nou
                      );
                    },
                    function () {
                      return this.action.call(this,
                        function () {
                          return new Ast("Indent", indent,
      new Ast("Function", name, null, [
        new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "memoize"), 
                                  [new Ast("Fragment", memoname.quote()),
                                   new Ast("Function", null, null, stmts)
                                  ]
                    )
        )
      ])
    );
                        }
                      );
                    }
                  );
                },
                function () {
                  return this.action.call(this,
                    function () {
                      return new Ast("Indent", indent,
      new Ast("Function", name, pf, stmts)
    );
                    }
                  );
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ChoicePattern");
                        },
                        function () {
                          return ps = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "choice"      ), ps ))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "SequencePattern");
                        },
                        function () {
                          return ps = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "sequence"    ), ps ))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "BindPattern");
                        },
                        function () {
                          return name = this.next.call(this);
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("Assign", new Ast("Var", name), new Ast("ThisCall", p, [])    ))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ChainPattern");
                        },
                        function () {
                          return ps = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "chain"       ), ps ))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "LookaheadPattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "lookahead"   ), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "DoubleNegatePattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "doubleNegate"), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "NegatePattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "negate"      ), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "OptionalPattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "optional"    ), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "RepeatPattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "repeat"      ), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "Repeat1Pattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "repeat1"     ), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "JSCallPattern");
                        },
                        function () {
                          return p = this.next.call(this);
                        },
                        function () {
                          return af = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", p, af))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "CallPattern");
                        },
                        function () {
                          return p = this.next.call(this);
                        },
                        function () {
                          return as = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", p, as))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "PredicatePattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "predicate"   ), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ActionPattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "action"      ), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ImmediatePattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("ThisCall", p, []);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "PropertyPattern");
                        },
                        function () {
                          return name = this.next.call(this);
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
                  return new Ast("ThisProperty", name);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ObjectPattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "object"      ),      [new Ast("ThisCall", p, [])]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "StringPattern");
                        },
                        function () {
                          return f = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "string"      ),      [new Ast("Fragment", f    )]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "NumberPattern");
                        },
                        function () {
                          return f = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "number"      ),      [new Ast("Fragment", f    )]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "RegularExpression");
                        },
                        function () {
                          return f = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "regularExpression"), [new Ast("Fragment", f    )]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "NestedArrayPattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "nestedArray" ), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "NestedAstPattern");
                        },
                        function () {
                          return p = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("ThisCall", new Ast("ThisProperty", "nestedAst"   ), [p]))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.string.call(this, "EmptyPattern");
                    }
                  );
                }
              );
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("ThisProperty", "pass");
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.string.call(this, "NextPattern");
                    }
                  );
                }
              );
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("ThisProperty", "next");
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "AstConstructor");
                        },
                        function () {
                          return f = this.next.call(this);
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
                  return new Ast("New", new Ast("Var", "Ast"), [f]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ExpressionSemanticBody");
                        },
                        function () {
                          return f = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", new Ast("Subexpression", f))]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "FunctionSemanticBody");
                        },
                        function () {
                          return f = this.next.call(this);
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
                  return new Ast("Function", null, null, [f]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ImmediateSemanticBody");
                        },
                        function () {
                          return f = this.next.call(this);
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
                  return new Ast("Function", null, null, [new Ast("Return", f)]);
                }
              );
            }
          );
        },
        this.next
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



Translator.prototype.simplify = function () {
  return this.memoize.call(this,
    "simplify_jZWDYge1GC9dyJZLun2yyw",
    function () {
      var name, aof, fn, as, f, expr;
      this.ignore.call(this);
      this.pushStartPosition.call(this);
      var __result = this.choice.call(this,
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ThisCall");
                        },
                        function () {
                          return this.nestedAst.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return this.sequence.call(this,
                                    function () {
                                      return this.string.call(this, "ThisProperty");
                                    },
                                    function () {
                                      return name = this.next.call(this);
                                    }
                                  );
                                }
                              );
                            }
                          );
                        },
                        function () {
                          return aof = this.next.call(this);
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
                  return new Ast("Call", new Ast("Lookup", new Ast("This"), name), aof);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ThisCall");
                        },
                        function () {
                          return fn = this.next.call(this);
                        },
                        function () {
                          return this.nestedArray.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return as = this.repeat.call(this, this.next);
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
              return this.action.call(this,
                function () {
                  return new Ast("Call", new Ast("Lookup", fn, "call"), [new Ast("This")].concat(as));
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ThisCall");
                        },
                        function () {
                          return fn = this.next.call(this);
                        },
                        function () {
                          return f = this.next.call(this);
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
                  return new Ast("Call", new Ast("Lookup", fn, "call"), [new Ast("This"), f]);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "ThisProperty");
                        },
                        function () {
                          return name = this.next.call(this);
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
                  return new Ast("Lookup", new Ast("This"), name);
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "Call");
                        },
                        function () {
                          return this.nestedAst.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return this.sequence.call(this,
                                    function () {
                                      return this.string.call(this, "Function");
                                    },
                                    this.nou,
                                    function () {
                                      return this.choice.call(this,
                                        function () {
                                          return this.nestedArray.call(this,
                                            function () {
                                              return this.choice.call(this, this.pass);
                                            }
                                          );
                                        },
                                        this.nou
                                      );
                                    },
                                    function () {
                                      return this.nestedArray.call(this,
                                        function () {
                                          return this.choice.call(this,
                                            function () {
                                              return this.nestedAst.call(this,
                                                function () {
                                                  return this.choice.call(this,
                                                    function () {
                                                      return this.sequence.call(this,
                                                        function () {
                                                          return this.string.call(this, "Return");
                                                        },
                                                        function () {
                                                          return expr = this.next.call(this);
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
                                    }
                                  );
                                }
                              );
                            }
                          );
                        },
                        function () {
                          return this.choice.call(this,
                            function () {
                              return this.nestedArray.call(this,
                                function () {
                                  return this.choice.call(this, this.pass);
                                }
                              );
                            },
                            this.nou
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
                  return expr;
                }
              );
            }
          );
        },
        function () {
          return this.sequence.call(this,
            function () {
              return this.nestedAst.call(this,
                function () {
                  return this.choice.call(this,
                    function () {
                      return this.sequence.call(this,
                        function () {
                          return this.string.call(this, "Call");
                        },
                        function () {
                          return this.nestedAst.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return this.sequence.call(this,
                                    function () {
                                      return this.string.call(this, "Lookup");
                                    },
                                    function () {
                                      return this.nestedAst.call(this,
                                        function () {
                                          return this.choice.call(this,
                                            function () {
                                              return this.sequence.call(this,
                                                function () {
                                                  return this.string.call(this, "Function");
                                                },
                                                this.nou,
                                                function () {
                                                  return this.choice.call(this,
                                                    function () {
                                                      return this.nestedArray.call(this,
                                                        function () {
                                                          return this.choice.call(this, this.pass);
                                                        }
                                                      );
                                                    },
                                                    this.nou
                                                  );
                                                },
                                                function () {
                                                  return this.nestedArray.call(this,
                                                    function () {
                                                      return this.choice.call(this,
                                                        function () {
                                                          return this.nestedAst.call(this,
                                                            function () {
                                                              return this.choice.call(this,
                                                                function () {
                                                                  return this.sequence.call(this,
                                                                    function () {
                                                                      return this.string.call(this, "Return");
                                                                    },
                                                                    function () {
                                                                      return expr = this.next.call(this);
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
                                                }
                                              );
                                            }
                                          );
                                        }
                                      );
                                    },
                                    function () {
                                      return this.string.call(this, "call");
                                    }
                                  );
                                }
                              );
                            }
                          );
                        },
                        function () {
                          return this.nestedArray.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return this.nestedAst.call(this,
                                    function () {
                                      return this.choice.call(this,
                                        function () {
                                          return this.string.call(this, "This");
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
                    }
                  );
                }
              );
            },
            function () {
              return this.action.call(this,
                function () {
                  return expr;
                }
              );
            }
          );
        },
        this.next
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};



Translator.prototype.translate = function (i) {
  var k, x, fs, f, name, ps, stmts, pf, names, expr, lvalue, rvalue, fn, as, o;
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Indent");
                    },
                    function () {
                      return k = this.next.call(this);
                    },
                    function () {
                      return x = this.translate.call(this, k);
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
              return x;
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Composite");
                    },
                    function () {
                      return this.nestedArray.call(this,
                        function () {
                          return this.choice.call(this,
                            function () {
                              return fs = this.repeat.call(this,
                                function () {
                                  return this.translate.call(this, i);
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
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {
              return fs.join("");
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Fragment");
                    },
                    function () {
                      return f = this.next.call(this);
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
              return f;
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Function");
                    },
                    function () {
                      return name = this.next.call(this);
                    },
                    function () {
                      return ps = this.next.call(this);
                    },
                    function () {
                      return this.nestedArray.call(this,
                        function () {
                          return this.choice.call(this,
                            function () {
                              return stmts = this.repeat.call(this,
                                function () {
                                  return this.translate.call(this, i + 2);
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
            }
          );
        },
        function () {
          return ps = this.on.call(this,
            ps,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.nestedArray.call(this,
                        function () {
                          return this.choice.call(this,
                            function () {
                              return ps = this.repeat.call(this, this.next);
                            }
                          );
                        }
                      );
                    },
                    function () {
                      return this.action.call(this,
                        function () {
                          return ps.join(", ");
                        }
                      );
                    }
                  );
                },
                function () {
                  return this.sequence.call(this,
                    this.nou,
                    function () {
                      return this.action.call(this,
                        function () {
                          return "";
                        }
                      );
                    }
                  );
                },
                function () {
                  return this.sequence.call(this,
                    function () {
                      return pf = this.translate.call(this, i);
                    },
                    function () {
                      return this.action.call(this,
                        function () {
                          return pf;
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
          return name = this.action.call(this,
            function () {
              return ( name != null ? name : "" );
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {
              return (
    "function " + name + "(" + ps + ") {\n" +
      stmts.join("") +
    " ".repeat(i) + "}"
  );
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "VarDecl*");
                    },
                    function () {
                      return names = this.next.call(this);
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

    if (names.length > 0) {
      return " ".repeat(i) + "var " + names.join(", ") + ";\n";
    }
    else {
      return "";
    }
              }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "VarDecl");
                    },
                    function () {
                      return name = this.next.call(this);
                    },
                    function () {
                      return expr = this.optional.call(this,
                        function () {
                          return this.translate.call(this, i);
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
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "ExprStmt");
                    },
                    function () {
                      return expr = this.translate.call(this, i);
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
              return (
    " ".repeat(i) + expr + ";\n"
  );
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Return");
                    },
                    function () {
                      return expr = this.translate.call(this, i);
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
              return (
    " ".repeat(i) + "return " + expr + ";\n"
  );
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Assign");
                    },
                    function () {
                      return lvalue = this.translate.call(this, i);
                    },
                    function () {
                      return rvalue = this.translate.call(this, i);
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
              return (
    lvalue + " = " + rvalue
  );
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Call");
                    },
                    function () {
                      return fn = this.translate.call(this, i + 2);
                    },
                    function () {
                      return this.nestedArray.call(this,
                        function () {
                          return this.choice.call(this,
                            function () {
                              return this.nestedAst.call(this,
                                function () {
                                  return this.choice.call(this,
                                    function () {
                                      return this.string.call(this, "This");
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
                }
              );
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {
              return (
    fn + "(this)"
  );
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Call");
                    },
                    function () {
                      return fn = this.translate.call(this, i + 2);
                    },
                    function () {
                      return this.nestedArray.call(this,
                        function () {
                          return this.choice.call(this,
                            function () {
                              return this.sequence.call(this,
                                function () {
                                  return this.nestedAst.call(this,
                                    function () {
                                      return this.choice.call(this,
                                        function () {
                                          return this.string.call(this, "This");
                                        }
                                      );
                                    }
                                  );
                                },
                                function () {
                                  return as = this.repeat.call(this,
                                    function () {
                                      return this.translate.call(this, i + 2);
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
                }
              );
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {

    if (Util.isSingleline(as.join(", "))) {
      return fn + "(this, " + as.join(", ") + ")";
    }
    else {
      return (
        fn + "(this,\n" + 
          " ".repeat(i + 2) + as.join(",\n" + " ".repeat(i + 2)) + "\n" +
        " ".repeat(i) + ")"
      );
    }
              }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Call");
                    },
                    function () {
                      return fn = this.translate.call(this, i + 2);
                    },
                    function () {
                      return this.nestedArray.call(this,
                        function () {
                          return this.choice.call(this,
                            function () {
                              return as = this.repeat.call(this,
                                function () {
                                  return this.translate.call(this, i + 2);
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
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {

    if (Util.isSingleline(as.join(", "))) {
      return fn + "(" + as.join(", ") + ")";
    }
    else {
      return (
        fn + "(\n" +
          " ".repeat(i + 2) + as.join(",\n" + " ".repeat(i + 2)) + "\n" +
        " ".repeat(i) + ")"
      );
    }
              }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "New");
                    },
                    function () {
                      return fn = this.translate.call(this, i);
                    },
                    function () {
                      return this.nestedArray.call(this,
                        function () {
                          return this.choice.call(this,
                            function () {
                              return as = this.repeat.call(this,
                                function () {
                                  return this.translate.call(this, i);
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
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {
              return (
    "new " + fn + "(" + as.join(", ") + ")"
  );
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Lookup");
                    },
                    function () {
                      return o = this.translate.call(this, i);
                    },
                    function () {
                      return name = this.next.call(this);
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

    if (Util.isIdentifierName(name)) return o + "." + name;
    else                             return o + "[" + name.quote() + "]";
              }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Var");
                    },
                    function () {
                      return name = this.next.call(this);
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
              return name;
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.string.call(this, "This");
                }
              );
            }
          );
        },
        function () {
          return this.action.call(this,
            function () {
              return "this";
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return this.nestedAst.call(this,
            function () {
              return this.choice.call(this,
                function () {
                  return this.sequence.call(this,
                    function () {
                      return this.string.call(this, "Subexpression");
                    },
                    function () {
                      return expr = this.translate.call(this, i);
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
              return (
    "(" + expr + ")"
  );
            }
          );
        }
      );
    },
    function () {
      return this.sequence.call(this,
        function () {
          return x = this.next.call(this);
        },
        function () {
          return this.error.call(this, "Unexpected translator jsast " + Show.synopsis(x));
        }
      );
    }
  );
  this.popStartPosition.call(this);
  return __result;
};
