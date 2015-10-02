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



function TokenGrammar(sourcename) {
  Grammar.call(this, sourcename);
  
  this._furthestPosition = 0;
};
TokenGrammar.prototype = Object.create(Grammar.prototype);
TokenGrammar.prototype.constructor = TokenGrammar;
module.exports = TokenGrammar;



TokenGrammar.prototype.match = function (source, sourcename) {
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



TokenGrammar.prototype._string = function (string) {
  var next = this.next();
  if (next.type === string) return next;
  else                      return this.fail();
};



TokenGrammar.prototype._positionString = function (position) {
  if (position == null) position = this.getPosition();
  
  if (position >= 0) {
    var token = this.getInput()[position];
    if (token != null) return token.positionString();
    else               return this.sourcename + ":" + "1:1";
  }
  else {
    return this.sourcename + ":" + "-1";
  }
};
