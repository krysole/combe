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



function Token(type, sourcename, source, start, end, text, value) {
  this.type = type;
  this.sourcename = sourcename;
  this.source = source;
  this.start = start;
  this.end = end;
  this.text = text;
  this.value = value;
};
Token.prototype = Object.create(Object.prototype);
Token.prototype.constructor = Token;
module.exports = Token;



Token.prototype.positionString = function () {
  return this.sourcename + ":" + this.source.linecolumn(this.start).join(":");
};



Token.prototype.toString = function () {
  var result = "[object Token ";
  result += this.type + " ";
  result += this.sourcename + ":";
  result += "(" + this.source.linecolumn(this.start).join(":") + ".." + this.source.linecolumn(this.end).join(":") + ") ";
  result += this.text.quote() + " ";
  result += JSON.stringify(this.value);
  result += "]";
  return result;
};
