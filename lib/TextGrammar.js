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

var Grammar = require("./Grammar.js");



var TextGrammar = function (sourcename) {
  Grammar.call(this, sourcename);
};
TextGrammar.prototype = Object.create(Grammar.prototype);
TextGrammar.prototype.constructor = TextGrammar;
TextGrammar.name = "TextGrammar";
module.exports = TextGrammar;



TextGrammar.prototype.char = function () {
  var c = this.next();
  if (arguments.length === 0) {
    return c;
  }
  else {
    for (var i = 0; i < arguments.length; i++) {
      var p = arguments[i];
      if (p instanceof Function && p.call(this, c) ||
          p instanceof Array    && p.length === 2 && c >= p[0] && c <= p[1] ||
          p instanceof String   && p.indexOf(c) !== -1) {
        return c;
      }
    }
    this.fail();
  }
};

TextGrammar.prototype._hash = function (pattern) {
  this._optional(function () { this.ws(); });
  return pattern.call(this);
};

TextGrammar.prototype._string = function (string) {
  for (var i = 0; i < string.length; i++) {
    var c = this._next();
    if (c !== string[i]) this.fail();
  }
  return string;
};

TextGrammar.prototype.ws = function () {
  throw new Error("TextGrammar.prototype.ws(): TextGrammar subclass should override this.");
};

TextGrammar.prototype._positionString = function (position) {
  if (position == null) position = this.getPosition();
  
  return this._sourcename + ':' + this.getInput().linecolumn(position).join(':');
};
