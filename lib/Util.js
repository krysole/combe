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



var Util = { toString: function () { return "[object Object Util]"; } };
module.exports = Util;



Util.new = function (constructor, args) {
  var object = Object.create(constructor.prototype);
  constructor.apply(object, args);
  return object;
};



Util.isObjectLiteral = function (object) {
  return (
    Object.getPrototypeOf(object) === Object.prototype ||
    Object.getPrototypeOf(object) === null
  );
};



Util.at = function (object, index) {
  if (object.length != null) {
    return object[index];
  }
  else if (object.at != null) {
    return object.at(index);
  }
  else {
    throw new Error("Expected object with either .length or .at(index)");
  }
};

Util.put = function (object, index, value) {
  if (object.length != null) {
    return object[index] = value;
  }
  else if (object.put != null) {
    return object.put(index, value);
  }
  else {
    throw new Error("Expected object with either .length or .put(index, value)");
  }
};

Util.count = function (object) {
  if (object.length != null) {
    return object.length;
  }
  else if (object.count != null) {
    return object.count();
  }
  else {
    throw new Error("Expected object with either .length or .count()");
  }
};



Util.hasOwnProperty = function (object, name) {
  return Object.prototype.hasOwnProperty.call(object, name);
};



Util.equals = function (left, right) {
  if (left === null || right === null) {
    return left === right;
  }
  else if (left === undefined || right === undefined) {
    return left === right;
  }
  else if (typeof left !== "object" && typeof right !== "object") {
    return left === right;
  }
  else if (Util.isObjectLiteral(left) && Util.isObjectLiteral(right)) {
    for (var name in left) {
      if (!Util.hasOwnProperty(right[name], name)) return false;
    }
    for (var name in right) {
      if (!Util.hasOwnProperty(left[name], name)) return false;
    }
    for (var name in left) {
      if (!Util.equals(left[name], right[name])) return false;
    }
    return true;
  }
  else if (left.__combe_equals != null && left.__combe_equals === right.__combe_equals) {
    return left.__combe_equals(right);
  }
  else {
    return false;
  }
};

Array.prototype.__combe_equals = function (other) {
  if (this.length !== other.length) return false;
  for (var i = 0; i < this.length; i++) {
    if (!Util.equals(this[i], other[i])) return false;
  }
  return true;
};



Util.ReservedWords = [ // (ES6)
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

Util.ReservedWordsRegExp = new RegExp(Util.ReservedWords.join("|"));
Util.LineSeparatorRegExp = /\u000d\u000a|\u000a|\u000d|\u2028|\u2029/;
Util.IdentifierNameRegExp = /^[a-zA-Z_\$][a-zA-Z_\$0-9]*$/;


Util.isIdentifierName = function (string) {
  return (string.match(Util.IdentifierNameRegExp) != null);
};

Util.isVariableIdentifierName = function (string) {
  return (Util.isIdentifierName(string) && !Util.isReservedWord(string));
};

Util.isReservedWord = function (string) {
  return (string.match(Util.ReservedWordsRegExp) != null);
};



Util.isSingleline = function (string) {
  return (string.match(Util.LineSeparatorRegExp) == null);
};

Util.isMultiline = function (string) {
  return (string.match(Util.LineSeparatorRegExp) != null);
};



Util.lines = function (string) {
  return string.split(Util.LineSeparatorRegExp);
};

Util.linecolumn = function (string, index) {
  var re = new RegExp(Util.LineSeparatorRegExp.source, "g");
  var line = 1;
  var lineStart = 0;
  var column;
  
  while (re.exec(string) != null) {
    if (re.lastIndex > index) {
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
