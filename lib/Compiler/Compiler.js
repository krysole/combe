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

var Util = require("../Util.js");
var Ast = require("../Ast.js");
var Show = require("../Show.js");

var CombeScanner = require("./CombeScanner.js");
var ScopeAnalyser = require("./ScopeAnalyser.js");
var Translator = require("./Translator.js");



var Compiler = { toString: function () { return "[object Object Compiler]"; } };
module.exports = Compiler;



Compiler.hashbang = function (source) {
  var hashbang = source.match(/^#![^\r\n]*(\r\n|\r|\n)/);
  if (hashbang != null) {
    return hashbang[0];
  }
  else {
    return "";
  }
};

Compiler.notice = function (output) {
  var packagespec = require("../../package.json");
  return "/*** Preprocessed by " + packagespec.name + "-" + packagespec.version + " ***/\n";
};

Compiler.scan = function (source, sourcename, skipLength) {
  return new CombeScanner(source, sourcename, skipLength).match();
};

Compiler.analyse = function (ast) {
  new ScopeAnalyser().visit(ast);
  return ast;
};

Compiler.translate = function (ast) {
  return new Translator().visit(ast);
};

Compiler.compile = function (source, sourcename) {
  var hashbang = this.hashbang(source);
  var ast = this.scan(source, sourcename, hashbang.length);
  var analysedAst = this.analyse(ast);
  var translatorOutput = this.translate(analysedAst);
  var output = hashbang + this.notice() + translatorOutput;
  return output;
};
