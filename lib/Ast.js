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

var Util = require("./Util.js");



function Ast() {
  this.length = arguments.length;
  for (var i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
  }
  
  if (typeof this.type() !== "string") {
    throw new Error("Ast must be created with string ast type; for arguments " + require("./Show.js").synopsis(Array.from(arguments)));
  }
};
Ast.prototype = Object.create(Object.prototype);
Ast.prototype.constructor = Ast;
module.exports = Ast;



Ast.prototype.type = function () { return this[0]; };

Ast.prototype.first = function () { return this[0]; };

Ast.prototype.rest = function () { return this.slice(1); };



Ast.prototype.is = function (name) {
  return (this.type() === name);
};



Ast.prototype.slice = function (start, end) {
  if (start == null) start = 0;
  if (end == null) end = this.length;
  
  var result = [];
  for (var i = start; i < end; i++) {
    result.push(this[i]);
  }
  return result;
};

Ast.prototype.concat = function (array) {
  if (!array instanceof Array) throw new Error("Expected array to be instanceof Array.");
  
  return Util.new(Ast, Array.from(this).concat(array));
};



Ast.prototype.map = function (transformer) {
  var rs = [this.type()];
  for (var i = 1; i < this.length; i++) {
    rs.push(transformer(this[i]));
  }
  return Util.new(Ast, rs);
};



Ast.prototype.__combe_equal = function (other) {
  if (this.length !== other.length) return false;
  for (var i = 0; i < this.length; i++) {
    if (!Util.equal(this[i], other[i])) return false;
  }
  return true;
};



Ast.prototype.toString = function () {
  return "[^" + Array.from(this).map(function (e) { return "" + e; }).join(", ") + "]";
};
