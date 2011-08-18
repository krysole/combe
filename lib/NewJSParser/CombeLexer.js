"use strict";
var JSLexer = (require)("./JSLexer");
var CombeLexer = ((module).exports = (Class).new(JSLexer, {}, {
  punctuation: (function () {
    return (this).memoize("unnamed_xhWfzG5BdVtOx69T8c/0jg", (function () {
      var text;
      return (this)._choice((function () {
        (text = (this)._choice((function () {
          return (this).stringPatternHandler("...");
        }), (function () {
          return (this).stringPatternHandler("..");
        }), (function () {
          return (this).stringPatternHandler("->");
        }), (function () {
          return (this).stringPatternHandler("#");
        })));
        return ((this).createToken).call(this, text);
      }), ((JSLexer).prototype).punctuation);
    }));
  }),
  get ReservedWords() {
    if (((this)._ReservedWords == null)) {
      ((this)._ReservedWords = ((String).ReservedWords).concat([
        "rule",
        "__ast"
      ]));
    }
    return (this)._ReservedWords;
  }
}));