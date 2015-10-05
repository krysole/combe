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
var LexerGrammar = require("./LexerGrammar.js");
var TokenStream = require("./TokenStream.js");



function TokenGrammar(input) {
  Grammar.call(this);
  
  this._memoTables = [];
  this._input = (input instanceof LexerGrammar ? new TokenStream(input) : input);
  this._position = 0;
  this._furthestPosition = 0;
};
TokenGrammar.prototype = Object.create(Grammar.prototype);
TokenGrammar.prototype.constructor = TokenGrammar;
module.exports = TokenGrammar;



TokenGrammar.prototype.match = function (startRule) {
  if (startRule == null) startRule = "start";
  var args = Array.from(arguments).slice(1);
  
  try {
    var result = this[startRule].apply(this, args);
    this.end();
    return result;
  }
  catch (e) {
    if (e === this.Backtrack) {
      throw new Error("Failed to match input; furthest position was " + this.positionString(this.getFurthestPosition()));
    }
    else {
      throw e;
    }
  }
};



TokenGrammar.prototype.preserve = function () {
  return {
    position: this._position,
    dynamicVariables: this._dynamicVariables
  };
};

TokenGrammar.prototype.restore = function (initialState) {
  this._position = initialState.position;
  this._dynamicVariables = initialState.dynamicVariables;
};



TokenGrammar.prototype.string = function (string) {
  var next = this.next();
  if (next.type === string) return next;
  else                      return this.fail();
};



TokenGrammar.prototype.next = function () {
  var token = this.at(this.getPosition());
  if (token.type !== "End") {
    this.setPosition(this.getPosition() + 1);
    return token;
  }
  else {
    throw this.Backtrack;
  }
};

TokenGrammar.prototype.peek = function () {
  var token = this.at(this.getPosition());
  if (token.type !== "End") return token;
  else                      throw this.Backtrack;
};

TokenGrammar.prototype.rest = function () {
  var startPosition = this.getPosition();
  var endPosition = this.count();
  this.setPosition(endPosition);
  return this.slice(startPosition, endPosition);
};

TokenGrammar.prototype.end = function () {
  var token = this.at(this.getPosition());
  if (token.type === "End") return token;
  else                      throw this.Backtrack;
};



Grammar.prototype.error = function (message) {
  throw new Error("[" + this.getName() + " at " + this.positionString() + "; furthest position " + this.positionString(this.getFurthestPosition()) + "] " + message);
};



TokenGrammar.prototype.getSourcename = function () {
  return this.at(0).sourcename;
};

TokenGrammar.prototype.positionString = function (position) {
  if (position == null) position = this.getPosition();
  
  var token = this.at(position);
  return token.sourcename + ":" + token.source.linecolumn(token.start).join(":");
};



TokenGrammar.prototype.getMemoTableForPosition = function (position) {
  for (var i = this._memoTables.length; i <= position; i++) {
    this._memoTables[i] = Object.create(null);
  }
  return this._memoTables[position];
};



TokenGrammar.prototype.pushInput = function (input) {
  throw new Error("TokenGrammar grammars do not support nested inputs.");
};

TokenGrammar.prototype.popInput = function () {
  throw new Error("TokenGrammar grammars do not support nested inputs.");
};

TokenGrammar.prototype.getInput = function () {
  return this._input;
};

TokenGrammar.prototype.getPosition = function () {
  return this._position;
};

TokenGrammar.prototype.setPosition = function (position) {
  this.updateFurthestPosition(position);
  
  return this._position = position;
};

TokenGrammar.prototype.getFurthestPosition = function () {
  return this._furthestPosition;
};

TokenGrammar.prototype.updateFurthestPosition = function (position) {
  this._furthestPosition = Math.max(this._furthestPosition, position);
};
