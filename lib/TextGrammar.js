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



function TextGrammar(sourcename) {
  Grammar.call(this, sourcename);
  
  this._furthestPosition = 0;
};
TextGrammar.prototype = Object.create(Grammar.prototype);
TextGrammar.prototype.constructor = TextGrammar;
module.exports = TextGrammar;



TextGrammar.prototype.match = function (source, sourcename) {
  var startRule = "start", args = [];
  if (arguments.length > 2) {
    startRule = arguments[2];
    args = Array.from(arguments).slice(3);
  }
  
  this.sourcename = sourcename;
  
  try {
    this.pushInput(source);
    var result = this[startRule].apply(this, args);
    this.end();
    this.popInput(source);
    return result;
  }
  catch (e) {
    if (e === this.Backtrack) {
      throw new Error("Failed to match input; furthest position was " + this._positionString(this.getFurthestPosition()));
    }
    else {
      throw e;
    }
  }
};



TextGrammar.prototype.getFurthestPosition = function () {
  return this._furthestPosition - 1;
};

TextGrammar.prototype.setFurthestPosition = function (position) {
  this._furthestPosition = Math.max(this._furthestPosition, position);
  return position;
};

TextGrammar.prototype.setPosition = function (position) {
  this.setFurthestPosition(position);
  
  return Grammar.prototype.setPosition.call(this, position);
};



TextGrammar.prototype.digit = function () {
  return this.char(['0', '9']);
};

TextGrammar.prototype.hex = function () {
  return this.char(['0', '9'], ['a', 'z'], ['A', 'Z']);
};

TextGrammar.prototype.octal = function () {
  return this.char(['0', '7']);
};



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
    var c = this.next();
    if (c !== string[i]) this.fail();
  }
  return string;
};

TextGrammar.prototype.ws = function () {
  throw new Error("TextGrammar.prototype.ws(): TextGrammar subclass should override this.");
};

TextGrammar.prototype._positionString = function (position) {
  if (position == null) position = this.getPosition();
  
  if (position >= 0) {
    return this.sourcename + ":" + this.getInput().linecolumn(position).join(':');
  }
  else {
    return this.sourcename + ":-1";
  }
};
