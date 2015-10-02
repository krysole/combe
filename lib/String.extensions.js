//
// The Mention Programming Language
//
// Copyright 2015 Lorenz Pretterhofer <krysole@alexicalmistake.com>
//
// Permission to use, copy, modify, sublicense, and/or distribute this 
// work for any purpose with or without fee is hereby granted.
//
// THE WORK IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS WORK INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS WORK.
//
"use strict";


// Todo: Consider adding unicode support to the RegExps uses in here.



if (!String.ReservedWords) {
  String.ReservedWords = [ // (ES6)
    // Regular list
    "break",      "do",         "in",         "typeof",
    "case",       "else",       "instanceof", "var",
    "catch",      "export",     "new",        "void",
    "class",      "extends",    "return",     "while",
    "const",      "finally",    "super",      "with",
    "continue",   "for",        "switch",     "yield",
    "debugger",   "function",   "this",
    "default",    "if",         "throw",
    "delete",     "import",     "try",
  
    // Strict Mode
    "let", "static",
  
    "implements", "package", "protected",
    "interface",  "private", "public",
  
    // Future
    "enum", "await"
  ];
}

if (!String.ReservedWordsRegExp) {
  String.ReservedWordsRegExp = new RegExp(String.ReservedWords.join("|"));
}



if (!String.LineSeparatorRegExp) {
  String.LineSeparatorRegExp = /\u000d\u000a|\u000a|\u000d|\u2028|\u2029/;
}



if (!String.prototype.isIdentifierName) {
  String.prototype.isIdentifierName = function () {
    return (this.match(/^[a-zA-Z_\$][a-zA-Z_\$0-9]*$/) != null);
  };
}

if (!String.prototype.isVariableIdentifierName) {
  String.prototype.isVariableIdentifierName = function () {
    return (isIdentifierName() && !isReservedWord());
  };
}

if (!String.prototype.isReservedWord) {
  String.prototype.isReservedWord = function () {
    return (this.match(String.ReservedWordsRegExp) != null);
  };
}



// Sourced: 2015-09-30; https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    if (this == null) {
      throw new TypeError("can't convert " + this + " to object");
    }
    var str = "" + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError("repeat count must be non-negative");
    }
    if (count == Infinity) {
      throw new RangeError("repeat count must be less than infinity");
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return "";
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError("repeat count must not overflow maximum string size");
    }
    var rpt = "";
    for (;;) {
      if ((count & 1) == 1) {
        rpt += str;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      str += str;
    }
    return rpt;
  };
}



if (!String.prototype.quote) {
  String.prototype.quote = function () {
    return JSON.stringify(this);
  };
}



if (!String.prototype.isSingleline) {
  String.prototype.isSingleline = function () {
    return (this.lines().length === 1);
  };
}

if (!String.prototype.isMultiline) {
  String.prototype.isMultiline = function () {
    return (this.lines().length > 1);
  };
}



if (!String.prototype.lines) {
  String.prototype.lines = function () {
    return this.split(String.LineSeparatorRegExp);
  };
}

if (!String.prototype.linecolumn) {
  String.prototype.linecolumn = function (index) {
    var re = new RegExp(String.LineSeparatorRegExp.source, "g");
    var line = 1;
    var lineStart = 0;
    var column;
    
    while (re.exec(this) != null) {
      if (re.lastIndex >= index) {
        break;
      }
      else {
        lineStart = re.lastIndex;
        line++;
      }
    }
    
    column = index - lineStart + 1;
    
    return [line, column];
  };
}



if (!String.prototype.at) {
  String.prototype.at = function (key) {
    return this[key];
  };
}

if (!String.prototype.put) {
  String.prototype.put = function (key, value) {
    return this[key] = value;
  };
}

if (!String.prototype.count) {
  String.prototype.count = function () {
    return this.length;
  };
}
