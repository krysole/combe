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

var Ast = require("../Ast.js");
var ObjectGrammar = require("../ObjectGrammar.js");



function Optimizer() {
  ObjectGrammar.call(this);
};
Optimizer.prototype = Object.create(ObjectGrammar.prototype);
Optimizer.prototype.constructor = Optimizer;
module.exports = Optimizer;



Optimizer.prototype.start = function (root) {
  this.ignore.call(this);
  this.pushStartPosition.call(this);
  var __result = this.choice.call(this,
    function () {
      return this.postorderTransform.call(this, root, this.optimize);
    }
  );
  this.popStartPosition.call(this);
  return __result;
};



Optimizer.prototype.optimize = function () {
  return this.memoize.call(this,
    "optimize_HqrqJyEpmEN6jCbkcLXnvg",
    function () {
      var xss, xs, x;
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
                          return this.string.call(this, "SequencePattern");
                        },
                        function () {
                          return this.nestedArray.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return xss = this.repeat.call(this,
                                    function () {
                                      return this.choice.call(this,
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
                                                          return xs = this.next.call(this);
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
                                                  return xs;
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
                                              return this.action.call(this,
                                                function () {
                                                  return [x];
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
                }
              );
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("SequencePattern", xss.flatten1());
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
                          return this.nestedArray.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return x = this.next.call(this);
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
                          return this.string.call(this, "ChoicePattern");
                        },
                        function () {
                          return this.nestedArray.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return xss = this.repeat.call(this,
                                    function () {
                                      return this.choice.call(this,
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
                                                          return xs = this.next.call(this);
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
                                                  return xs;
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
                                              return this.action.call(this,
                                                function () {
                                                  return [x];
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
                }
              );
            },
            function () {
              return this.action.call(this,
                function () {
                  return new Ast("ChoicePattern", xss.flatten1());
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
                          return this.nestedArray.call(this,
                            function () {
                              return this.choice.call(this,
                                function () {
                                  return x = this.next.call(this);
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
                  return x;
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
