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

var ObjectGrammar = require("../ObjectGrammar.js");
var Ast = require("../Ast.js");



function BindingsAnalysis() {
  ObjectGrammar.call(this);
  
  this.init("bindings", null);
};
BindingsAnalysis.prototype = Object.create(ObjectGrammar.prototype);
BindingsAnalysis.prototype.constructor = BindingsAnalysis;
module.exports = BindingsAnalysis;



BindingsAnalysis.prototype.start = function (root) {
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.on.call(this, root, this.analyse);
    }
  );
  this.popStartPosition.call(this);
  return __result;
};



BindingsAnalysis.prototype.analyse = function () {
  return this.memoize.call(this,
    "analyse_6VC4ZRKnz7dH3YmAL+NqvQ",
    function () {
      var indent, name, iname, pf, p, bs, x;
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
                          return p = this.next.call(this);
                        }
                      );
                    }
                  );
                }
              );
            },
            function () {
              return this.push.call(this, "bindings", []);
            },
            function () {
              return p = this.on.call(this, p, this.analyse);
            },
            function () {
              return bs = this.pop.call(this, "bindings");
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("Rule", indent, name, iname, pf, bs, p);
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
              return this.apushIfAbsent.call(this, "bindings", name);
            },
            function () {
              return p = this.on.call(this, p, this.analyse);
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
              return x = this.next.call(this);
            },
            function () {
              return this.recurse.call(this, x, this.analyse);
            }
          );
        }
      );
      this.popStartPosition.call(this);
      return __result;
    }
  );
};
