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



Compiler.astToString = function (object, column) {
  if (column == null) column = 0;
  
  var result = Compiler.astToSingleline(object, column);
  if (result.isSingleline() && result.length <= Compiler.ColumnWidth) {
    return result;
  }
  else {
    return Compiler.astToMultiline(object, column);
  }
};

Compiler.astToSingleline = function (ast, column) {
  var result;
  if (ast === null) result = " ".repeat(column) + "null";
  else if (ast === undefined) result = " ".repeat(column) + "undefined";
  else if (ast instanceof Array) result = Compiler.astArrayToSingleline(ast, column);
  else if (typeof ast === "string") result = " ".repeat(column) + ast.quote();
  else if (typeof ast === "number") result = " ".repeat(column) + ast;
  else if (ast instanceof RegExp) result = " ".repeat(column) + ast;
  else if (Object.getPrototypeOf(ast) === Object.prototype &&
           Object.getPrototypeOf(ast) === null) {
    result = Compiler.astObjectLiteralToSingleline(ast, column);
  }
  else {
    result = " ".repeat(column) + ast.toString();
  }
  
  return result;
};

Compiler.astArrayToSingleline = function (ast, column) {
  var result = " ".repeat(column) + "[";
  result += ast.map(function (e) {
    return Compiler.astToSingleline(e, 0);
  }).join(", ");
  result += "]";
  return result;
};

Compiler.astObjectLiteralToSingleline = function (ast, column) {
  var result = " ".repeat(column) + "{";
  var properties = [];
  for (var name in ast) {
    properties.push(name + ": " + Compiler.astToSingleline(ast[name], 0));
  }
  result += properties.join(", ");
  result += "}";
};

Compiler.astToMultiline = function (ast, column) {
  if (ast === null) return " ".repeat(column) + "null";
  else if (ast === undefined) return " ".repeat(column) + "undefined";
  else if (ast instanceof Array) return Compiler.astArrayToMultiline(ast, column);
  else if (typeof ast === "string") return " ".repeat(column) + ast.quote();
  else if (typeof ast === "number") return " ".repeat(column) + ast;
  else if (ast instanceof RegExp) return " ".repeat(column) + ast;
  else if (Object.getPrototypeOf(ast) === Object.prototype &&
           Object.getPrototypeOf(ast) === null) {
    return Compiler.astObjectLiteralToMultiline(ast, column);
  }
  else {
    return " ".repeat(column) + ast.toString();
  }
};

Compiler.astArrayToMultiline = function (ast, column) {
  if (ast.length === 0) {
    return " ".repeat(column) + "[]";
  }
  else if (ast.length === 1 && typeof ast[0] === "string") {
    return " ".repeat(column) + "[" + ast[0].quote() + "]";
  }
  else if (ast.length === 2 && typeof ast[0] === "string" && typeof ast[1] === "string") {
    return " ".repeat(column) + "[" + ast[0].quote() + ", " + ast[1].quote() + "]";
  }
  else if (ast.length === 2 && (typeof ast[0] === "string" &&
                                ast[1] instanceof Array &&
                                !Compiler.isIrreducibleAstArray(ast[1]))) {
    var head = " ".repeat(column) + "[" + ast[0].quote() + ", [...]]"
    var lines = [];
    for (var i = 0; i < ast[1].length; i++) {
      lines.push(Compiler.astToString(ast[1][i], column + 2));
    }
    return head + "\n" + lines.join("\n");
  }
  else if (ast.length >= 2 && typeof ast[0] === "string" &&
           !ast.every(function (e) { return typeof e === "string"; })) {
    var head = " ".repeat(column) + "[" + ast[0].quote() + ", ...]";
    var lines = [];
    for (var i = 1; i < ast.length; i++) {
      lines.push(Compiler.astToString(ast[i], column + 2));
    }
    return head + "\n" + lines.join("\n");
  }
  else {
    var head = " ".repeat(column) + "[...]";
    var lines = [];
    for (var i = 0; i < ast.length; i++) {
      lines.push(Compiler.astToString(ast[i], column + 2));
    }
    return head + "\n" + lines.join("\n");
  }
};

Compiler.isIrreducibleAstArray = function (ast) {
  return (
    (ast.length === 1 && typeof ast[0] === "string") ||
    (ast.length === 2 && typeof ast[0] === "string" && typeof ast[1] === "string") ||
    (ast.length === 2 && typeof ast[0] === "string" && ast[1] instanceof Array && !Compiler.isIrreducibleAstArray(ast[1])) ||
    (ast.length >= 2 && typeof ast[0] === "string" && !ast.every(function (e) { return typeof e === "string"; }))
  );
};

Compiler.astObjectLiteralToMultiline = function (ast, column) {
  var head = " ".repeat(column) + "{...}";
  var lines = [];
  
  for (var name in ast) {
    var result = " ".repeat(column) + name + ": " + Compiler.astToSingleline(ast[name], 0);
    if (result.isSingleline() && result.length <= Compiler.MaxColumn) {
      lines.push(result);
    }
    else {
      lines.push(" ".repeat(column) + name + ":");
      lines.push(Compiler.astToMultiline(ast[name], column + 2));
    }
  }
  
  return head + "\n" + lines.join("\n");
};
