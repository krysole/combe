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

Compiler.lex = function (source, sourcename) {
  return new ECMAScriptLexer().match(source, sourcename);
};

Compiler.parse = function (tokens, sourcename) {
  return new CombeParser().match(tokens, sourcename);
};

Compiler.analyse = function (ast0, sourcename) {
  var ast1 = new AnalyseBindings().visit(ast0, sourcename);
  return ast1;
};

Compiler.translate = function (ast, sourcename) {
  return new TranslateAstToJS().visit(ast, sourcename);
};

Compiler.compile = function (source, sourcename) {
  var hashbang = this.hashbang(source);
  var tokens = this.lex(source.slice(hashbang.length), sourcename);
  var ast = this.parse(tokens, sourcename);
  var analysedAst = this.analyse(ast, sourcename + " (ast)");
  var output = this.translate(analysedAst, sourcename + " (analysed ast)");
  return hashbang + this.notice() + output;
};



Compiler.astToString = function (object, column) {
  var result = Compiler.astToSingleline(object, column);
  if (result != null) {
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
  else if (ast instanceof Array) result = Compiler.astArrayToSingleline(ast, 0);
  else if (ast instanceof String) result = " ".repeat(column) + ast.quote();
  else if (ast instanceof Number) result = " ".repeat(column) + ast;
  else if (ast instanceof RegExp) result = " ".repeat(column) + ast;
  else if (Object.getPrototypeOf(ast) === Object.prototype &&
           Object.getPrototypeOf(ast) === null) {
    result = Compiler.astObjectLiteralToSingleline(ast, 0);
  }
  else {
    result = " ".repeat(column) + ast.toString();
  }
  
  if (result.isSingleline() && result.length <= Compiler.ColumnWidth) {
    return result;
  }
  else {
    return null;
  }
};

Compiler.astArrayToSingleline = function (ast, column) {
  var result = " ".repeat(column) + "[";
  result += ast.map(function (e) {
    return Compiler.astToSingleline(e);
  }).join(", ");
  result += "]";
  
  if (result.isSingleline() && result.length <= Compiler.ColumnWidth) {
    return result;
  }
  else {
    return null;
  }
};

Compiler.astObjectLiteralToSingleline = function (ast, column) {
  var result = " ".repeat(column) + "{";
  var properties = [];
  for (var name in ast) {
    properties.push(name + ": " + Compiler.astToSingleline(ast[name]));
  }
  result += properties.join(", ");
  result += "}";
  
  if (result.isSingleline() && result.length <= Compiler.ColumnWidth) {
    return result;
  }
  else {
    return null;
  }
};

Compiler.astToMultiline = function (ast, column) {
  if (ast === null) return " ".repeat(column) + "null";
  else if (ast === undefined) return " ".repeat(column) + "undefined";
  else if (ast instanceof Array) return Compiler.astArrayToMultiline(ast, 0);
  else if (ast instanceof String) return " ".repeat(column) + ast.quote();
  else if (ast instanceof Number) return " ".repeat(column) + ast;
  else if (ast instanceof RegExp) return " ".repeat(column) + ast;
  else if (Object.getPrototypeOf(ast) === Object.prototype &&
           Object.getPrototypeOf(ast) === null) {
    return Compiler.astObjectLiteralToMultiline(ast, 0);
  }
  else {
    return " ".repeat(column) + ast.toString();
  }
};

Compiler.astArrayToMultiline = function (ast, column) {
  var head = " ".repeat(column) + "[";
  var lines = [];
  
  if (ast.length > 0) {
    if (ast[0] instanceof String &&
        !ast.all(function (e) { return e instanceof String; })) {
      head += ast[0].quote() + ", ...]";
    }
    else {
      head += "...]";
      lines.push(Compiler.astToString(ast[0], column + 2));
    }
  }
  
  for (var i = 1; i < ast.length; i++) {
    lines.push(Compiler.astToString(ast[i], column + 2));
  }
  
  return head + "\n" + lines.join("\n");
};

Compiler.astObjectLiteralToMultiline = function (ast, column) {
  var head = " ".repeat(column) + "{...}";
  var lines = [];
  
  for (var name in ast) {
    var result = " ".repeat(column) + name + ": " + Compiler.astToSingleline(ast[name], 0);
    if (result != null && result.length <= Compiler.MaxColumn) {
      lines.push(result);
    }
    else {
      lines.push(" ".repeat(column) + name + ":");
      lines.push(Compiler.astToMultiline(ast[name], column + 2));
    }
  }
  
  return head + "\n" + lines.join("\n");
};
