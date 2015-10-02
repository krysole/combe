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
};
TokenGrammar.prototype = Object.create(Grammar.prototype);
TokenGrammar.prototype.constructor = TokenGrammar;
module.exports = TokenGrammar;



TokenGrammar.prototype._string = function (string) {
  var next = this.next();
  if (next.type === string) return next;
  else                      return this.fail();
};



TokenGrammar.prototype._positionString = function (token) {
  var position, source;
  if (token != null) {
    position = token.start;
    source = token.source;
  }
  else {
    if (this.getPosition() === this.getInput().length) {
      if (this.getInput().length === 0) {
        position = 0;
        source = "";
      }
      else {
        position = this.getInput()[0].source.length;
        source = this.getInput()[0].source;
      }
    }
    else {
      position = this.getInput()[this.getPosition()].start;
      source = this.getInput()[this.getPosition()].source;
    }
  }
  
  return this.sourcename + ':' + source.linecolumn(position).join(':');
};
