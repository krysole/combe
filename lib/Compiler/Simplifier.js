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
var Ast = require("./CombeAst.js");



function Simplifier(source, sourcename, skipLength) {
  ObjectGrammar.call(this, source, sourcename, skipLength);
  
  this.init("start", false);
  this.init("fragments", null);
  this.init("indent", 0);
};
Simplifier.prototype = Object.create(ObjectGrammar.prototype);
Simplifier.prototype.constructor = Simplifier;
module.exports = Simplifier;



Simplifier.prototype.start = /*rule*/ function () {
  return this.memoize("start_hC2RMiwvAnqpb/FaaQEuCA", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          return this.postorderTransform(
            function () {
              return this.choice(
                this.simplify
              );
            }
          );
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



Simplifier.prototype.simplify = /*rule*/ function () {
  var p, ps;
  return this.memoize("simplify_a/VZ11PLpPlXoT2Q1kAlSQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.chain(
              function () {
                return this.Ast(
                  "ChoicePattern"
                );
              },
              function () {
                return this.nestedObject(
                  function () {
                    return this.property(
                      function () { return ("patterns"); }.call(this),
                      function () {
                        return this.nestedArray(
                          function () {
                            return this.choice(
                              function () {
                                return p = this.next.call(this);
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
          }).call(this);
          return (function () {
            return this.action(
              function () { return (p); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return this.chain(
              function () {
                return this.Ast(
                  "SequencePattern"
                );
              },
              function () {
                return this.nestedObject(
                  function () {
                    return this.property(
                      function () { return ("patterns"); }.call(this),
                      function () {
                        return this.nestedArray(
                          function () {
                            return this.choice(
                              function () {
                                return p = this.next.call(this);
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
          }).call(this);
          return (function () {
            return this.action(
              function () { return (p); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return ps = function () {
              return this.chain(
                function () {
                  return this.Ast(
                    "ChoicePattern"
                  );
                },
                this.choicePatterns
              );
            }.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("ChoicePattern", ps)); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return ps = function () {
              return this.chain(
                function () {
                  return this.Ast(
                    "SequencePattern"
                  );
                },
                this.sequencePatterns
              );
            }.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return (Ast("SequencePattern", ps)); }
            );
          }).call(this);
        },
        this.next
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};



Simplifier.prototype.choicePatterns = /*rule*/ function () {
  var ps, p;
  return this.memoize("choicePatterns_ljJmfjaVd01KCkugdtvsbQ", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.chain(
              function () {
                return this.Ast(
                  "ChoicePattern"
                );
              },
              function () {
                return this.nestedObject(
                  function () {
                    return this.property(
                      function () { return ("patterns"); }.call(this),
                      function () {
                        return this.nestedArray(
                          function () {
                            return this.choice(
                              function () {
                                return ps = function () {
                                  return this.repeat(
                                    this.choicePatterns
                                  );
                                }.call(this);
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
          }).call(this);
          return (function () {
            return this.action(
              function () { return (ps.flatten1()); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return p = this.next.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return ([p]); }
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};

Simplifier.prototype.sequencePatterns = /*rule*/ function () {
  var ps, p;
  return this.memoize("sequencePatterns_9cC1uIOiILSx30IudYBYOw", function () {
    this.__ignore();
    this.pushStartPosition();
    var __result = function () {
      return this.choice(
        function () {
          (function () {
            return this.chain(
              function () {
                return this.Ast(
                  "SequencePattern"
                );
              },
              function () {
                return this.nestedObject(
                  function () {
                    return this.property(
                      function () { return ("patterns"); }.call(this),
                      function () {
                        return this.nestedArray(
                          function () {
                            return this.choice(
                              function () {
                                return ps = function () {
                                  return this.repeat(
                                    this.sequencePatterns
                                  );
                                }.call(this);
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
          }).call(this);
          return (function () {
            return this.action(
              function () { return (ps.flatten1()); }
            );
          }).call(this);
        },
        function () {
          (function () {
            return p = this.next.call(this);
          }).call(this);
          return (function () {
            return this.action(
              function () { return ([p]); }
            );
          }).call(this);
        }
      );
    }.call(this);
    this.popStartPosition();
    return __result;
  });
};
