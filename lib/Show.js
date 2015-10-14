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
var Util = require("./Util.js");



var Show = { toString: function () { return "[object Object Show]"; } };
module.exports = Show;



if (process.stdout.isTTY) {
  Show.ColumnWidth = process.stdout.columns - 2;
  process.stdout.on("resize", function () {
    Show.ColumnWidth = process.stdout.columns - 2;
  });
}
else {
  Show.ColumnWidth = 80 - 2;
}



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
  else if (object.__combe_showSingleline != null) {
    var result = Show.showSingleline(object, 0);
    if (result.length > maxLength) {
      return result.slice(0, maxLength - 5) + "  ...";
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



Show.shouldBreak = function (string) {
  return (
    Util.isMultiline(string) ||
    string.length > Show.ColumnWidth
  );
};



Show.show = function (object, column) {
  if (column == null) column = 0;
  
  var result = Show.showSingleline(object, column);
  if (!Show.shouldBreak(result)) {
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
  else if (object.__combe_showSingleline) return object.__combe_showSingleline(column);
  else if (object instanceof Array) return Show.showSinglelineArray(object, column);
  else if (Object.getPrototypeOf(object) === Object.prototype ||
           Object.getPrototypeOf(object) == null) {
    return Show.showSinglelineObjectLiteral(object, column);
  }
  else return " ".repeat(column) + object.toString();
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
  else if (object.__combe_showMultiline) return object.__combe_showMultiline(column);
  else if (object instanceof Array) return Show.showMultilineArray(object, column);
  else if (Object.getPrototypeOf(object) === Object.prototype ||
           Object.getPrototypeOf(object) == null) {
    return Show.showMultilineObjectLiteral(object, column);
  }
  else return " ".repeat(column) + object.toString();
};

Show.showMultilineArray = function (array, column) {
  if (array.length !== 0) {
    var head = " ".repeat(column) + "[...]\n";
    var tail = array.map(function (e) { return Show.show(e, column + 2); }).join("\n");
    return head + tail;
  }
  else {
    return " ".repeat(column) + "[]";
  }
};

Show.showMultilineObjectLiteral = function (object, column) {
  var head = " ".repeat(column) + "{...}\n";
  
  var lines = [];
  for (var name in object) {
    var result = " ".repeat(column) + name + ": " + Show.astToSingleline(object[name], 0);
    if (Util.isSingleline(result) && result.length <= Show.MaxColumn) {
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
