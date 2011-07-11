"use strict";
var JSLexer = ((require)("../JSParser")).JSLexer;
var Token = ((require)("../Runtime")).Token;
var CombeJSLexer = ((module).exports = (Class).new(JSLexer, {
  identifierName: (function () {
    var text;
    return ((function () {
      (text = ((this).matchedInput).call(this, (function () {
        ((this).idFirstChar).call(this);
        return (this)._repeat((this).idChar);
      })));
      return (this)._choice((function () {
        (this)._predicate((function () {
          return (text === "null");
        }));
        return ((this).identifierNameToken).call(this, "null", [
          "identifierName"
        ], text, null);
      }), (function () {
        (this)._predicate((function () {
          return (text === "true");
        }));
        return ((this).identifierNameToken).call(this, "true", [
          "boolean",
          "identifierName"
        ], text, true);
      }), (function () {
        (this)._predicate((function () {
          return (text === "false");
        }));
        return ((this).identifierNameToken).call(this, "false", [
          "boolean",
          "identifierName"
        ], text, true);
      }), (function () {
        (this)._predicate((function () {
          return ([
            "class",
            "match",
            "rule"
          ]).include(text);
        }));
        return ((this).identifierNameToken).call(this, text, [
          "keyword",
          "reservedWord",
          "identifierName"
        ], text);
      }), (function () {
        (this)._predicate((function () {
          return ([
            "get",
            "set",
            "describe"
          ]).include(text);
        }));
        return ((this).identifierNameToken).call(this, text, [
          "identifier",
          "identifierName"
        ], text);
      }), (function () {
        (this)._predicate((function () {
          return (text).isKeyword(text);
        }));
        return ((this).identifierNameToken).call(this, text, [
          "keyword",
          "reservedWord",
          "identifierName"
        ], text);
      }), (function () {
        (this)._predicate((function () {
          return (text).isFutureReservedWord(text);
        }));
        return ((this).identifierNameToken).call(this, "futureReservedWord", [
          "reservedWord",
          "identifierName"
        ], text);
      }), (function () {
        return ((this).identifierNameToken).call(this, "identifier", [
          "identifierName"
        ], text, text);
      }));
    })).call(this);
  }),
  punctuation: (function () {
    var text;
    return ((function () {
      (text = (this)._choice((function () {
        return (this).stringPatternHandler("...");
      }), (function () {
        return (this).stringPatternHandler("..");
      }), (function () {
        return (this).stringPatternHandler("->");
      }), (function () {
        return (this).stringPatternHandler("#");
      }), (function () {
        return (this).stringPatternHandler("{");
      }), (function () {
        return (this).stringPatternHandler("}");
      }), (function () {
        return (this).stringPatternHandler("(");
      }), (function () {
        return (this).stringPatternHandler(")");
      }), (function () {
        return (this).stringPatternHandler("[");
      }), (function () {
        return (this).stringPatternHandler("]");
      }), (function () {
        return (this).stringPatternHandler(";");
      }), (function () {
        return (this).stringPatternHandler(",");
      }), (function () {
        (this).stringPatternHandler(".");
        (this)._not((this).digit);
        return ".";
      }), (function () {
        return (this).stringPatternHandler("<<");
      }), (function () {
        return (this).stringPatternHandler(">>>");
      }), (function () {
        return (this).stringPatternHandler(">>");
      }), (function () {
        return (this).stringPatternHandler("<=");
      }), (function () {
        return (this).stringPatternHandler(">=");
      }), (function () {
        return (this).stringPatternHandler("<");
      }), (function () {
        return (this).stringPatternHandler(">");
      }), (function () {
        return (this).stringPatternHandler("===");
      }), (function () {
        return (this).stringPatternHandler("!==");
      }), (function () {
        return (this).stringPatternHandler("==");
      }), (function () {
        return (this).stringPatternHandler("!=");
      }), (function () {
        return (this).stringPatternHandler("!");
      }), (function () {
        return (this).stringPatternHandler("&&");
      }), (function () {
        return (this).stringPatternHandler("||");
      }), (function () {
        return (this).stringPatternHandler("&");
      }), (function () {
        return (this).stringPatternHandler("|");
      }), (function () {
        return (this).stringPatternHandler("++");
      }), (function () {
        return (this).stringPatternHandler("--");
      }), (function () {
        return (this).stringPatternHandler("+");
      }), (function () {
        return (this).stringPatternHandler("-");
      }), (function () {
        return (this).stringPatternHandler("*");
      }), (function () {
        return (this).stringPatternHandler("%");
      }), (function () {
        return (this).stringPatternHandler("~");
      }), (function () {
        return (this).stringPatternHandler("?");
      }), (function () {
        return (this).stringPatternHandler(":");
      })));
      return ((this).token).call(this, text, [
        "punctuation"
      ]);
    })).call(this);
  })
}));