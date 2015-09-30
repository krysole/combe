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

var List = require("./List.js")



var Grammar = function (sourcename) {
  this.reset(sourcename);
  
  this.init("_position", null);
  this.init("_input", null);
  this.init("_sp", null);
  this.init("_memos", null);
};
Grammar.prototype = Object.create(Object.prototype);
Grammar.prototype.constructor = Grammar;
Grammar.name = "Grammar";
module.exports = Grammar;



var Backtrack = { toString: function { return "Backtrack"; } };
Grammar.prototype.Backtrack = Backtrack;



Grammar.prototype.match = function (source, sourcename) {
  var startRule = "start", args = [];
  if (arguments.length > 2) {
    startRule = arguments[2];
    args = Array.from(arguments).slice(3);
  }
  
  this.reset(sourcename);
  this.pushInput(source);
  
  var result = this._optional(function () {
    return this[startRule].apply(this, args);
  });
  
  this.popInput();
  
  if (this._finished()) {
    return result;
  }
  else {
    throw new Error("Failed to match input");
  }
};

Grammar.prototype.reset = function (sourcename) {
  this.sourcename = sourcename;
  this._state = this._initial();
};

Grammar.prototype._finished = function () {
  return (
    this.get("_input") == null ||
    this.get("_position") == null
  );
};



Grammar.prototype.pushInput = function (input) {
  this.push("_input", input);
  this.push("_position", 0);
  this.push("_sp", 0);
  this.push("_memos", []);
};

Grammar.prototype.popInput = function () {
  this.pop("_memos");
  this.pop("_sp");
  this.pop("_position");
  this.pop("_input");
};

Grammar.prototype.getInput = function () {
  return this.get("_input");
};

Grammar.prototype.getPosition = function () {
  return this.get("_position");
};

Grammar.prototype.setPosition = function (position) {
  return this.set("_position", position);
};



Grammar.prototype.delimited = function (elementPattern, delimiterPattern) {
  var initialState;
  var result = [];
  
  try {
    while (true) {
      initialState = this._preserve();
      
      if (result.length >= 1) {
        delimiterPattern.call(this);
      }
      result.push(elementPattern.call(this));
    }
  }
  catch (e) {
    if (e === Backtrack) {
      this._restore(initialState);
      return result;
    }
    else {
      throw e;
    }
  }
};

Grammar.prototype.delimited1 = function (elementPattern, delimiterPattern) {
  var result = this.delimited(elementPattern, delimiterPattern);
  if (result.length >= 1) return result;
  else throw Backtrack;
};

Grammar.prototype.ifNotNull = function (pattern) {
  if (pattern != null) return pattern.call(this);
  else                 return null;
};



Grammar.prototype._repeat = function (pattern) {
  var initialState;
  var result = [];
  
  try {
    while (true) {
      initialState = this._preserve();
      
      result.push(pattern.call(this));
    }
  }
  catch (e) {
    if (e === Backtrack) {
      this._restore(initialState);
    }
    else {
      throw e;
    }
  }
};

Grammar.prototype._repeat1 = function (pattern) {
  var result = this._repeat(pattern);
  if (result.length > 0) return result;
  else throw Backtrack;
};



Grammar.prototype._choice = function () {
  var initialState = this._preserve();
  
  for (var i = 0; i < arguments.length; i++) {
    try {
      return arguments[i].call(this);
    }
    catch (e) {
      if (e === Backtrack) {
        this._restore(initialState);
      }
      else {
        throw e;
      }
    }
  }
  
  throw Backtrack;
};

Grammar.prototype._sequence = function () {
  var result;
  for (var i = 0; i < arguments.length; i++) {
    result = arguments[i].call(this);
  }
  return result;
};

Grammar.prototype._lookahead = function (pattern) {
  var initialInput = this.get("_input");
  var initialPosition = this.get("_position");
  
  var result = pattern.call(this);
  
  this.set("_input", initialInput);
  this.set("_position", initialPosition);
  
  return result;
};

Grammar.prototype._doubleNegate = function (pattern) {
  var initialState = this._preserve();
  
  var result = pattern.call(this);
  
  this._restore(initialState);
  
  return result;
};

Grammar.prototype._negate = function (pattern) {
  var initialState = this._preserve();
  
  try {
    pattern.call(this);
  }
  catch (e) {
    if (e === Backtrack) {
      this._restore(initialState);
      return null;
    }
    else {
      throw e;
    }
  }
  
  throw Backtrack;
};

Grammar.prototype._optional = function (pattern) {
  var initialState = this._preserve();
  
  try {
    return pattern.call(this);
  }
  catch (e) {
    if (e === Backtrack) {
      this._restore(initialState);
      return null;
    }
    else {
      throw e;
    }
  }
};

Object.prototype._predicate = function (predicate) {
  if (predicate.call(this)) return null;
  else throw Backtrack;
};

Object.prototype._action = function (action) {
  return action.call(this);
};

Object.prototype._nested = function (pattern) {
  var input = this.next();
  this.pushInput(input);
  
  var result = pattern.call(this);
  if (this.getPosition() !== this.get("_input").length) {
    throw Backtrack;
  }
  
  this.popInput();
  return result;
};



Grammar.prototype.input = function (pattern) {
  var initialPosition = this.getPosition();
  pattern.call(this);
  var finalPosition = this.getPosition();
  return this.getInput().slice(initialPosition, finalPosition);
};



Grammar.prototype.log = function (message) {
  console.log('%s:log() at %s; %s', this.constructor.name, this._positionString(), message);
};

Grammar.prototype._positionString = function (position) {
  if (position == null) position = this.getPosition();
  
  return this._sourcename + ':' + position;
};



Grammar.prototype.sourceinfo = function () {
  return {
    sourcename: this.sourcename,
    start: this.getStartPosition(),
    end: this.getPosition()
  };
};



Grammar.prototype.is = function (object) {
  var next = this.next();
  if (next === object) return next;
  else                 throw Backtrack;
};

Grammar.prototype.instanceof = function (constructor) {
  var next = this.next();
  if (next instanceof constructor) return next;
  else                             throw Backtrack;
};

Grammar.prototype.next = function () {
  var position = this.getPosition();
  this.setPosition(position + 1);
  return this._at(position);
};

Grammar.prototype.peek = function () {
  return this._at(this.getPosition());
};

Grammar.prototype.last = function () {
  return this._at(this.getPosition() - 1);
};

Grammar.prototype.rest = function () {
  var rest = this.getInput().slice(this.getPosition());
  this.setPosition(this.getInput().length);
  return rest;
};

Grammar.prototype.end = function () {
  return (this.getPosition() === this.getInput().length);
};

Grammar.prototype._at = function (position) {
  if (position >= 0 && position < this.getInput().length) {
    return this.getInput()[position];
  }
  else {
    throw new Error("Grammar.prototype._at: Cannot read past end of input (or negative position).");
  }
};

Grammar.prototype.length = function (expected) {
  if (expected != null) {
    if (this.getInput().length === expected) return expected;
    else throw Backtrack;
  }
  else {
    return this.getInput().length;
  }
};



Grammar.prototype._hash = function (pattern) {
  this._ignore();
  return pattern.call(this);
};

Grammar.prototype._object = function (object) {
  throw new Error("Grammar.prototype._object(): Grammar subclass should override this.");
};

Grammar.prototype._string = function (string) {
  throw new Error("Grammar.prototype._string(): Grammar subclass should override this.");
};

Grammar.prototype._number = function (number) {
  throw new Error("Grammar.prototype._number(): Grammar subclass should override this.");
};

Grammar.prototype._ignore = function () {
  // Do nothing
};



Grammar.prototype._empty = function () {
  // Do nothing
};



Grammar.prototype.fail = function () {
  throw Backtrack;
};

Grammar.prototype.error = function (message) {
  throw new Error(message);
};



Grammar.prototype._initial = function () {
  return Object.create(null);
};

Grammar.prototype._preserve = function () {
  var preserved = {};
  for (var name in this._state) {
    preserved[name] = this._state[name];
  }
  return preserved;
};

Grammar.prototype._restore = function (state) {
  this._state = state;
};



Grammar.prototype.pushStartPosition = function () {
  return this.push("_startPosition", this.getPosition());
};

Grammar.prototype.popStartPosition = function () {
  return this.pop("_startPosition");
};

Grammar.prototype.getStartPosition = function () {
  return this.get("_startPosition");
};

Grammar.prototype.withStartPosition = function (pattern) {
  this.pushStartPosition();
  var result = pattern.call(this);
  this.popStartPosition();
  return result;
};



Grammar.prototype._memoize = function (name, pattern) {
  var position = this.getPosition();
  var memos = this.get("_memos");
  
  var memosForPosition = memos[position];
  if (memosForPosition == null) {
    memosForPosition = memos[position] = Object.create(null);
  }
  
  var memo = memosForPosition[name];
  if (memo === Backtrack) {
    throw Backtrack;
  }
  else if (memo != null) {
    this.setPosition(memo.position);
    return memo.result;
  }
  else {
    try {
      var _state = this._state;
      var result = pattern.call(this);
      if (this._state = _state) { // Only memoize if there are no side effects.
        memosForPosition[name] = { result: result, position: this.position };
      }
      return result;
    }
    catch (e) {
      if (e === Backtrack) {
        memosForPosition[name] = Backtrack;
      }
      throw e;
    }
  }
};



Grammar.prototype.apush = function (name, object) {
  var array = this.get(name).slice();
  array.push(object);
  return this.set(name, array);
};

Grammar.prototype.apushIfAbsent = function (name, object) {
  var array = this.get(name).slice();
  array.pushIfAbsent(object);
  return this.set(name, array);
};

Grammar.prototype.apop = function (name) {
  var array = this.get(name).slice(0, -1);
  return this.set(name, array);
};



Grammar.prototype.init = function (name, object) {
  if (this._state[name] != null) {
    throw new Error("Cannot initialize already initialized dynamic variable.");
  }
  
  this._state[name] = new List(object, null);
  return object;
};

Grammar.prototype.push = function (name, object) {
  if (this._state[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Grammar:init())");
  }
  
  this._state[name] = new List(object, this._state[name]);
  return object;
};

Grammar.prototype.pop = function (name) {
  if (this._state[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Grammar:init())");
  }
  
  var list = this._state[name];
  if (list.tail == null) {
    throw new Error("Cannot pop last frame of a dynamic variable stack. (Mismatched push/pop calls?)");
  }
  
  this._state[name] = list.tail;
  return list.head;
};

Grammar.prototype.get = function (name) {
  if (this._state[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Grammar:init())");
  }
  
  return this._state[name].head;
};

Grammar.prototype.set = function (name, object) {
  if (this._state[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Grammar:init())");
  }
  
  return this._state[name].head = object;
};
