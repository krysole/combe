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

var Grammar = require("./Grammar.js")



function VisitorGrammar(sourcename) {
  Grammar.call(this, sourcename);
};
VisitorGrammar.prototype = Object.create(Grammar.prototype);
VisitorGrammar.prototype.constructor = VisitorGrammar;
module.exports = VisitorGrammar;



// Move this stuff into VisitorGrammar
// Grammar.prototype.pushInput = function (input) {
//   this.push("_input", input);
//   this.push("_position", 0);
//   this.push("_sp", 0);
//   this.push("_memos", []);
// };
// 
// Grammar.prototype.popInput = function () {
//   this.pop("_memos");
//   this.pop("_sp");
//   this.pop("_position");
//   this.pop("_input");
// };
// 
// Grammar.prototype.getInput = function () {
//   return this.get("_input");
// };
// 
// Grammar.prototype.getPosition = function () {
//   return this.get("_position");
// };
// 
// Grammar.prototype.setPosition = function (position) {
//   return this.set("_position", position);
// };



VisitorGrammar.prototype._object = function (object) {
  return this.is(object);
};

VisitorGrammar.prototype._string = function (string) {
  return this.is(object);
};

VisitorGrammar.prototype._number = function (number) {
  return this.is(object);
};
