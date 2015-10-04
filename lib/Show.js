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

var Ast = require("./Ast.js");



var Show = { toString: function () { return "[object Object Show]"; } };
module.exports = Show;



Show.synopsis = function (object, maxLength) {
  if (maxLength == null) maxLength = 40;
  
  if (object === null) {
    return "" + object;
  }
  else if (typeof object === "string") {
    var result = object.quote();
    if (result.length > maxLength) {
      return result.slice(0, maxLength - 6) + "  ...\"";
    }
    else {
      return result;
    }
  }
  else if (typeof object !== "object") {
    return "" + object;
  }
  else if (object instanceof Ast) {
    var result = Show.showSingleline(object, 0);
    if (result.length > maxLength) {
      return result.slice(0, maxLength - 6) + "  ...]";
    }
    else {
      return result;
    }
  }
  else if (object instanceof Array) {
    var result = Show.showSingleline(object, 0);
    if (result.length > maxLength) {
      return result.slice(0, maxLength - 6) + "  ...]";
    }
    else {
      return result;
    }
  }
  else if (Object.getPrototypeOf(object) === Object.prototype ||
           Object.getPrototypeOf(object) == null) {
    var result = Show.showSingleline(object, 0);
    if (result > maxLength) {
      return result.slice(0, maxLength - 6) + "  ...}";
    }
    else {
      return result;
    }
  }
  else {
    var result = object.toString();
    if (result > maxLength) {
      return result.slice(0, maxLength - 5) + "  ...";
    }
    else {
      return result;
    }
  }
};



Show.show = function (object, column) {
  if (column == null) column = 0;
  
  var result = Show.showSingleline(object, column);
  if (result.isSingleline() && result.length <= Show.ColumnWidth) {
    return result;
  }
  else {
    return Show.showMultiline(object, column);
  }
};

Show.showPrimitive = function (object, column) {
  if (typeof object === "string") {
    return " ".repeat(column) + object.quote();
  }
  else if (typeof object !== "object") {
    return " ".repeat(column) + object;
  }
  else {
    throw new Error("Cannot show primitive with a non primitive object.");
  }
};

Show.showSingleline = function (object, column) {
  if (object === null) return " ".repeat(column) + object;
  else if (typeof object !== "object") return Show.showPrimitive(object, column);
  else if (object instanceof Ast) return Show.showSinglelineAst(object, column);
  else if (object instanceof Array) return Show.showSinglelineArray(object, column);
  else if (Object.getPrototypeOf(object) === Object.prototype ||
           Object.getPrototypeOf(object) == null) {
    return Show.showSinglelineObjectLiteral(object, column);
  }
  else return " ".repeat(column) + object.toString();
};

Show.showSinglelineAst = function (ast, column) {
  var result = " ".repeat(column) + "[^";
  result += Array.from(ast).map(function (e) {
    return Show.showSingleline(e, 0);
  }).join(", ");
  result += "]";
  return result;
};

Show.showSinglelineArray = function (array, column) {
  var result = " ".repeat(column) + "[";
  result += array.map(function (e) {
    return Show.showSingleline(e, 0);
  }).join(", ");
  result += "]";
  return result;
};

Show.showSinglelineObjectLiteral = function (object, column) {
  var result = " ".repeat(column) + "{";
  var properties = [];
  for (var name in object) {
    properties.push(name + ": " + Show.showSingleline(object[name], 0));
  }
  result += properties.join(", ");
  result += "}";
  return result;
};

Show.showMultiline = function (object, column) {
  if (object === null) return " ".repeat(column) + object;
  else if (typeof object !== "object") return Show.showPrimitive(object, column);
  else if (object instanceof Ast) return Show.showMultilineAst(object, column);
  else if (object instanceof Array) return Show.showMultilineArray(object, column);
  else if (Object.getPrototypeOf(object) === Object.prototype ||
           Object.getPrototypeOf(object) == null) {
    return Show.showMultilineObjectLiteral(object, column);
  }
  else return " ".repeat(column) + object.toString();
};

Show.showMultilineAst = function (ast, column) {
  var es = ast.rest();
  if (es.length === 0) {
    return " ".repeat(column) + "[^" + ast.type().quote() + "]";
  }
  else if (es.length === 1 && (es[0] === null || typeof es[0] !== "object")) {
    return " ".repeat(column) + "[^" + ast.type().quote() + ", " + Show.show(es[0], 0) + "]";
  }
  else if (es.length === 1 && es[0] instanceof Array) {
    var head = " ".repeat(column) + "[^" + ast.type().quote() + ", [...]]\n"
    var tail = es[0].map(function (e) { return Show.show(e, column + 2); }).join("\n");
    return head + tail;
  }
  else {
    var head = " ".repeat(column) + "[^" + ast.type().quote() + ", ...]\n";
    var tail = es.map(function (e) { return Show.show(e, column + 2); }).join("\n");
    return head + tail;
  }
};

Show.showMultilineArray = function (array, column) {
  if (array.length !== 0) {
    var head = " ".repeat(column) + "[...]\n";
    var tail = array.map(function (e) { return Show.show(e, column + 2); }).join("\n");
    return head + tail;
  }
  else {
    return "[]";
  }
};

Show.showMultilineObjectLiteral = function (object, column) {
  var head = " ".repeat(column) + "{...}\n";
  
  var lines = [];
  for (var name in object) {
    var result = " ".repeat(column) + name + ": " + Show.astToSingleline(object[name], 0);
    if (result.isSingleline() && result.length <= Show.MaxColumn) {
      lines.push(result);
    }
    else {
      lines.push(" ".repeat(column) + name + ":");
      lines.push(Show.show(object[name], column + 2));
    }
  }
  
  if (lines.length !== 0) {
    return head + lines.join("\n");
  }
  else {
    return "{}";
  }
};
