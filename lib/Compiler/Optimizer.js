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

var Ast = require("../Ast.js");
var ObjectGrammar = require("../ObjectGrammar.js");



function Optimizer() {
  ObjectGrammar.call(this);
};
Optimizer.prototype = Object.create(ObjectGrammar.prototype);
Optimizer.prototype.constructor = Optimizer;
module.exports = Optimizer;



Optimizer.prototype.start = function (root) {
  return this.visitPostOrder(root, this.process);
};



Optimizer.prototype.process = /* rule */ function () {
  return this.memoize("process_iGsnLOdmZ2T0aIkVk8amKw",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.chain.call(this,
          function () {
            return this.choice(
              this.elideSingleChoice,
              this.identity
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};



Optimizer.prototype.flattenSequence = /* rule */ function () {
  var xss, xs, x;
  return this.memoize("flattenSequence_FKyLvbpiuS65uYaBwO9MNA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.nestedAst(
              function () {
                return this.sequence(
                  function () { return this.string("Sequence"); },
                  function () {
                    return this.nestedArray(
                      function () {
                        return xss = function () {
                          return this.repeat(
                            function () {
                              return this.choice(
                                function () {
                                  return this.sequence(
                                    function () {
                                      return this.nestedAst(
                                        function () {
                                          return this.sequence(
                                            function () { return this.string("Sequence"); },
                                            function () {
                                              return xs = function () {
                                                return this.repeat(
                                                  this.next
                                                );
                                              }.call(this)
                                            }
                                          );
                                        }
                                      );
                                    },
                                    function () {
                                      return this.action(
                                        function () { return (xs); }
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
                                      return this.action(
                                        function () { return (x); }
                                      );
                                    }
                                  );
                                }
                              );
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
              function () { return (new Ast("Sequence").concat(xss.flatten1())); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

Optimizer.prototype.elideSingleSequence = /* rule */ function () {
  var x;
  return this.memoize("elideSingleSequence_8EVa5FJ0+hO648Seyo4EIA",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.nestedAst(
              function () {
                return this.sequence(
                  function () { return this.string("Sequence"); },
                  function () {
                    return this.nestedArray(
                      function () {
                        return x = this.next.call(this)
                      }
                    );
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
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

Optimizer.prototype.flattenChoice = /* rule */ function () {
  var xss, xs, x;
  return this.memoize("flattenChoice_a2KPFTy697PbO8xIzKTUwQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.nestedAst(
              function () {
                return this.sequence(
                  function () { return this.string("Choice"); },
                  function () {
                    return this.nestedArray(
                      function () {
                        return xss = function () {
                          return this.repeat(
                            function () {
                              return this.choice(
                                function () {
                                  return this.sequence(
                                    function () {
                                      return this.nestedAst(
                                        function () {
                                          return this.sequence(
                                            function () { return this.string("Choice"); },
                                            function () {
                                              return xs = function () {
                                                return this.repeat(
                                                  this.next
                                                );
                                              }.call(this)
                                            }
                                          );
                                        }
                                      );
                                    },
                                    function () {
                                      return this.action(
                                        function () { return (xs); }
                                      );
                                    }
                                  );
                                },
                                function () {
                                  return x = this.next.call(this)
                                }
                              );
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
              function () { return (new Ast("Choice").concat(xss.flatten1())); }
            );
          }
        );
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};

Optimizer.prototype.elideSingleChoice = /* rule */ function () {
  var x;
  return this.memoize("elideSingleChoice_7xsy8aojNJlFuP+qLTVOHQ",
    function () {
      this.ignore();
      this.pushStartPosition();
      var result = function () {
        return this.sequence(
          function () {
            return this.nestedAst(
              function () {
                return this.sequence(
                  function () { return this.string("Choice"); },
                  function () {
                    return this.nestedArray(
                      function () {
                        return x = this.next.call(this)
                      }
                    );
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
      }.call(this);
      this.popStartPosition();
      return result;
    }
  );
};
