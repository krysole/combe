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

var TextGrammar = require("./TextGrammar.js");
var Token = require("./Token.js");



function LexerGrammar(source, sourcename, skipLength) {
  TextGrammar.call(this, source, sourcename, skipLength);
};
LexerGrammar.prototype = Object.create(TextGrammar.prototype);
LexerGrammar.prototype.constructor = LexerGrammar;
module.exports = LexerGrammar;



LexerGrammar.prototype.match = function () {
  var tokens = [];
  tokens.push(this.matchToken.apply(this, arguments));
  while (tokens[tokens.length - 1].type !== "End") {
    tokens.push(this.matchToken.apply(this, arguments));
  }
  return tokens;
};

LexerGrammar.prototype.matchToken = function (tokenRule) {
  if (tokenRule == null) tokenRule = "token";
  var args = Array.from(arguments).slice(1);
  
  var initialState = this.preserve();
  
  try {
    return this[tokenRule].apply(this, args);
  }
  catch (e) {
    if (e === this.Backtrack) {
      this.restore(initialState);
      
      if (this.getPosition() === this.count()) {
        return this.withStartPosition(function () {
          return this.emit("End", null);
        });
      }
      else {
        throw new Error("Could not match token at position " + this.positionString(this.getPosition()) + "; furthest position was " + this.positionString(this.getFurthestPosition()));
      }
    }
    else {
      throw e;
    }
  }
};



LexerGrammar.prototype.emit = function (pattern) {
  if (pattern instanceof Function) {
    return this.withStartPosition(function () {
      var result = pattern.call(this);
    
      return new Token(
        result.type,
        this.getSourcename(),
        this.getInput(),
        this.getStartPosition(),
        this.getPosition(),
        this.slice(this.getStartPosition(), this.getPosition()),
        result.value
      );
      return token;
    });
  }
  else {
    return new Token(
      arguments[0],
      this.getSourcename(),
      this.getInput(),
      this.getStartPosition(),
      this.getPosition(),
      this.slice(this.getStartPosition(), this.getPosition()),
      arguments[1]
    );
  }
};
