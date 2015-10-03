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

var ECMAScriptLexer = require("./ECMAScriptLexer.js");
var CombeParser = require("./CombeParser.js");
var AnalyseBindings = require("./AnalyseBindings.js");
var TranslateAstToJS = require("./TranslateAstToJS.js");



var Compiler = {};
module.exports = Compiler;



if (process.stdout.isTTY) {
  Compiler.ColumnWidth = process.stdout.columns - 2;
  process.stdout.on("resize", function () {
    Compiler.ColumnWidth = process.stdout.columns - 2;
  });
}
else {
  Compiler.ColumnWidth = 80 - 2;
}



Compiler.hashbang = function (source) {
  var hashbang = source.match(/^#![^\r\n]*(\r\n|\r|\n)/);
  if (hashbang != null) {
    return hashbang[0];
  }
  else {
    return "";
  }
};

Compiler.notice = function () {
  var packagespec = require("../../package.json");
  return "/*** Preprocessed by " + packagespec.name + "-" + packagespec.version + " ***/\n";
};

Compiler.lex = function (source, sourcename, skipLength) {
  return new ECMAScriptLexer(source, sourcename, skipLength).match();
};

Compiler.parse = function (source, sourcename, skipLength) {
  return new CombeParser(
    new ECMAScriptLexer(source, sourcename, skipLength),
    sourcename
  ).match();
};

Compiler.analyse = function (ast0, sourcename) {
  var ast1 = new AnalyseBindings(sourcename).visit(ast0);
  return ast1;
};

Compiler.translate = function (ast, sourcename) {
  return new TranslateAstToJS(sourcename).visit(ast);
};

Compiler.compile = function (source, sourcename) {
  var hashbang = this.hashbang(source);
  var ast = this.parse(source, sourcename, hashbang.length);
  var analysedAst = this.analyse(ast, sourcename + " (ast)");
  var output = this.translate(analysedAst, sourcename + " (analysed ast)");
  return hashbang + this.notice() + output;
};



Compiler.show = function (object, column) {
  if (column == null) column = 0;
  
  var result = Compiler.showSingleline(object, column);
  if (result.isSingleline() && result.length <= Compiler.ColumnWidth) {
    return result;
  }
  else {
    return Compiler.showMultiline(object, column);
  }
};

Compiler.showPrimitive = function (object, column) {
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

Compiler.showSingleline = function (object, column) {
  if (object === null) return " ".repeat(column) + object;
  else if (typeof object !== "object") return Compiler.showPrimitive(object, column);
  else if (object instanceof Ast) return Compiler.showSinglelineAst(object, column);
  else if (object instanceof Array) return Compiler.showSinglelineArray(object, column);
  else if (Object.getPrototypeOf(object) === Object.prototype ||
           Object.getPrototypeOf(object) == null) {
    return Compiler.showSinglelineObjectLiteral(object, column);
  }
  else return " ".repeat(column) + object.toString();
};

Compiler.showSinglelineAst = function (ast, column) {
  var result = " ".repeat(column) + "[^";
  result += ast.elements.map(function (e) {
    return Compiler.showSingleline(e, 0);
  }).join(", ");
  result += "]";
  return result;
};

Compiler.showSinglelineArray = function (array, column) {
  var result = " ".repeat(column) + "[";
  result += array.map(function (e) {
    return Compiler.showSingleline(e, 0);
  }).join(", ");
  result += "]";
  return result;
};

Compiler.showSinglelineObjectLiteral = function (object, column) {
  var result = " ".repeat(column) + "{";
  var properties = [];
  for (var name in object) {
    properties.push(name + ": " + Compiler.showSingleline(object[name], 0));
  }
  result += properties.join(", ");
  result += "}";
  return result;
};

Compiler.showMultiline = function (object, column) {
  if (object === null) return " ".repeat(column) + object;
  else if (typeof object !== "object") return Compiler.showPrimitive(object, column);
  else if (object instanceof Ast) return Compiler.showMultilineAst(object, column);
  else if (object instanceof Array) return Compiler.showMultilineArray(object, column);
  else if (Object.getPrototypeOf(object) === Object.prototype ||
           Object.getPrototypeOf(object) == null) {
    return Compiler.showMultilineObjectLiteral(object, column);
  }
  else return " ".repeat(column) + object.toString();
};

Compiler.showMultilineAst = function (ast, column) {
  var es = ast.elements;
  if (es.length === 0) {
    return " ".repeat(column) + "[^]"
  }
  else if (es.length === 1 && (es[0] === null || typeof es[0] !== "object")) {
    return " ".repeat(column) + "[^" + Compiler.show(es[0], 0) + "]";
  }
  else if (es.length === 2 && (es[0] === null || typeof es[0] !== "object") && typeof es[1] !== "object") {
    return " ".repeat(column) + "[^" + Compiler.show(es[0], 0) + "]";
  }
  else if (es.length === 2 && (es[0] === null || typeof es[0] !== "object") && es[1] instanceof Array) {
    var head = " ".repeat(column) + "[^" + Compiler.show(es[0], 0) + ", [...]]\n";
    var tail = es[1].map(function (e) { return Compiler.show(e, column + 2); }).join("\n");
    return head + tail;
  }
  else if (es.length >= 2 && (es[0] === null || typeof es[0] !== "object")) {
    var head = " ".repeat(column) + "[^" + Compiler.show(es[0], 0) + " ...]\n";
    var tail = es.slice(1).map(function (e) { return Compiler.show(e, column + 2); }).join("\n");
    return head + tail;
  }
  else {
    var head = " ".repeat(column) + "[^...]\n";
    var tail = es.map(function (e) { return Compiler.show(e, column + 2); }).join("\n");
    return head + tail;
  }
};

Compiler.showMultilineArray = function (array, column) {
  var head = " ".repeat(column) + "[...]\n";
  var tail = array.map(function (e) { return Compiler.show(e, column + 2); }).join("\n");
  return head + tail;
};

Compiler.showMultilineObjectLiteral = function (object, column) {
  var head = " ".repeat(column) + "{...}\n";
  
  var lines = [];
  for (var name in object) {
    var result = " ".repeat(column) + name + ": " + Compiler.astToSingleline(object[name], 0);
    if (result.isSingleline() && result.length <= Compiler.MaxColumn) {
      lines.push(result);
    }
    else {
      lines.push(" ".repeat(column) + name + ":");
      lines.push(Compiler.show(object[name], column + 2));
    }
  }
  
  return head + lines.join("\n");
};
