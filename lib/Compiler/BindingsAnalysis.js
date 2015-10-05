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

var ObjectGrammar = require("../ObjectGrammar.js");
var Ast = require("../Ast.js");



function BindingsAnalysis(sourcename) {
  ObjectGrammar.call(this, sourcename);
  
  this.init("bindings", null);
};
BindingsAnalysis.prototype = Object.create(ObjectGrammar.prototype);
BindingsAnalysis.prototype.constructor = BindingsAnalysis;
module.exports = BindingsAnalysis;



BindingsAnalysis.prototype.start = /* rule */ function (root) {
  this.ignore();
  this.pushStartPosition();
  var result = function () {
    return this.on.call(this,
      function () { return (root); }.call(this),
      this.analyse
    );
  }.call(this);
  this.popStartPosition();
  return result;
};



BindingsAnalysis.prototype.analyse = /* rule */ function () {
  var indent, name, iname, pf, p, bs, x;
  return this.memoize("analyse_wm1/6ethaaj0CM1n8QKsNw",
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
                            return p = this.next.call(this)
                          }
                        );
                      }
                    );
                  },
                  function () {
                    return this.push.call(this, "bindings", []);
                  },
                  function () {
                    return p = function () {
                      return this.on.call(this,
                        function () { return (p); }.call(this),
                        this.analyse
                      );
                    }.call(this)
                  },
                  function () {
                    return bs = function () {
                      return this.pop.call(this, "bindings");
                    }.call(this)
                  },
                  function () {
                    return this.action(
                      function () { return (new Ast("Rule", indent, name, iname, pf, bs, p)); }
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
                    return this.apushIfAbsent.call(this, "bindings", name);
                  },
                  function () {
                    return p = function () {
                      return this.on.call(this,
                        function () { return (p); }.call(this),
                        this.analyse
                      );
                    }.call(this)
                  },
                  function () {
                    return this.action(
                      function () { return (new Ast("BindPattern", name, p)); }
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
                return this.recurse.call(this,
                  function () { return (x); }.call(this),
                  this.analyse
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



BindingsAnalysis.prototype.recurse = function (x, pattern) {
  if (x instanceof Ast)        return this.recurseAst(x, pattern);
  else if (x instanceof Array) return this.recurseArray(x, pattern);
  else                         return x;
};

BindingsAnalysis.prototype.recurseAst = function (ast, pattern) {
  var _this = this;
  var type = ast.type();
  var es = ast.rest().map(function (e) { return _this.on(e, pattern); });
  return new Ast(type).concat(es);
};

BindingsAnalysis.prototype.recurseArray = function (array, pattern) {
  var _this = this;
  return array.map(function (e) { return _this.on(e, pattern); });
};
