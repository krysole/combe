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
var Grammar = require("./Grammar.js");



function TextGrammar(source, sourcename, skipLength) {
  Grammar.call(this);
  
  this._sourcename = sourcename;
  this._memoTables = this.createMemoTables(source.length);
  this._input = source;
  this._position = 0;
  this._furthestPosition = 0;
  
  if (skipLength != null) {
    if (skipLength < this._input.length + 1) {
      this._position = skipLength;
    }
    else {
      throw new Error("Skip length must be within or at end of input.");
    }
  }
};
TextGrammar.prototype = Object.create(Grammar.prototype);
TextGrammar.prototype.constructor = TextGrammar;
module.exports = TextGrammar;



TextGrammar.prototype.match = function (startRule) {
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



TextGrammar.prototype.preserve = function () {
  return {
    position: this._position,
    dynamicVariables: this._dynamicVariables
  };
};

TextGrammar.prototype.restore = function (initialState) {
  this._position = initialState.position;
  this._dynamicVariables = initialState.dynamicVariables;
};



TextGrammar.prototype.sourceinfo = function () {
  return {
    sourcename: this.sourcename,
    start: this.getStartPosition(),
    end: this.getPosition()
  };
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

TextGrammar.prototype.string = function (string) {
  for (var i = 0; i < string.length; i++) {
    var c = this.next();
    if (c !== string[i]) this.fail();
  }
  return string;
};



TextGrammar.prototype.error = function (message) {
  throw new Error("[" + this.getName() + " at " + this.positionString() + "; furthest position " + this.positionString(this.getFurthestPosition()) + "] " + message);
};



TextGrammar.prototype.getSourcename = function () {
  return this._sourcename;
};

TextGrammar.prototype.positionString = function (position) {
  if (position == null) position = this.getPosition();
  
  return this.getSourcename() + ":" + Util.linecolumn(this.getInput(), position).join(':');
};



TextGrammar.prototype.createMemoTables = function (length) {
  var memoTables = [];
  for (var i = 0; i < length + 1; i++) { // We can still have rules at the end position
    memoTables.push(Object.create(null));
  }
  return memoTables;
};

TextGrammar.prototype.getMemoTableForPosition = function (position) {
  return this._memoTables[position];
};



TextGrammar.prototype.pushInput = function (input) {
  throw new Error("TextGrammar grammars do not support nested inputs.");
};

TextGrammar.prototype.popInput = function () {
  throw new Error("TextGrammar grammars do not support nested inputs.");
};

TextGrammar.prototype.getInput = function () {
  return this._input;
};

TextGrammar.prototype.getPosition = function () {
  return this._position;
};

TextGrammar.prototype.setPosition = function (position) {
  this.updateFurthestPosition(position);
  
  return this._position = position;
};

TextGrammar.prototype.getFurthestPosition = function () {
  return this._furthestPosition;
};

TextGrammar.prototype.updateFurthestPosition = function (position) {
  this._furthestPosition = Math.max(this._furthestPosition, position);
};
