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



Optimizer.prototype.start = /* rule */ function (root) {
  this.ignore();
  this.pushStartPosition();
  var result = function () {
    return this.postorderTransform.call(this,
      function () { return (root); }.call(this),
      this.optimize
    );
  }.call(this);
  this.popStartPosition();
  return result;
};



Optimizer.prototype.optimize = /* rule */ function () {
  var xss, xs, x;
  return this.memoize("optimize_s9ai+Wa0e/0XUlymK2uu2w",
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
                        return this.sequence(
                          function () {
                            return this.nestedAst(
                              function () {
                                return this.sequence(
                                  function () { return this.string("SequencePattern"); },
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
                                                            function () { return this.string("SequencePattern"); },
                                                            function () {
                                                              return xs = this.next.call(this)
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
                                                        function () { return ([x]); }
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
                              function () { return (new Ast("SequencePattern", xss.flatten1())); }
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
                                                        function () { return this.string("ChoicePattern"); },
                                                        function () {
                                                          return xs = this.next.call(this)
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
                                                    function () { return ([x]); }
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
                          function () { return (new Ast("ChoicePattern", xss.flatten1())); }
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
                          function () { return this.string("ChoicePattern"); },
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
