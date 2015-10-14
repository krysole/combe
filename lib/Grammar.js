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
var List = require("./List.js");
var Ast = require("./Ast.js");



function Grammar() {
  this._dynamicVariables = Object.create(null);
  
  this.init("_startPosition", null);
};
Grammar.prototype = Object.create(Object.prototype);
Grammar.prototype.constructor = Grammar;
module.exports = Grammar;



var Backtrack = { toString: function () { return "Backtrack"; } };
Grammar.prototype.Backtrack = Backtrack;



Grammar.prototype._shardDynamicVariables = function () {
  var dynamicVariables = Object.create(null);
  for (var name in this._dynamicVariables) {
    dynamicVariables[name] = this._dynamicVariables[name];
  }
  this._dynamicVariables = dynamicVariables;
};



Grammar.prototype.preserve = function () {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.restore = function (initialState) {
  throw new Error("Should be implemented in subclass.");
};



Grammar.prototype.choice = function () {
  var initialState = this.preserve();

  for (var i = 0; i < arguments.length; i++) {
    try {
      return arguments[i].call(this);
    }
    catch (e) {
      if (e === Backtrack) {
        this.restore(initialState);
      }
      else {
        throw e;
      }
    }
  }

  throw Backtrack;
};

Grammar.prototype.sequence = function () {
  var result;
  for (var i = 0; i < arguments.length; i++) {
    result = arguments[i].call(this);
  }
  return result;
};

Grammar.prototype.lookahead = function (pattern) {
  var initialPosition = this.getPosition();
  var result = pattern.call(this);
  this.setPosition(initialPosition);
  return result;
};

Grammar.prototype.doubleNegate = function (pattern) {
  var initialState = this.preserve();
  var result = pattern.call(this);
  this.restore(initialState);
  return result;
};

Grammar.prototype.negate = function (pattern) {
  var initialState = this.preserve();
  
  try {
    pattern.call(this);
  }
  catch (e) {
    if (e === Backtrack) {
      this.restore(initialState);;
      return null;
    }
    else {
      throw e;
    }
  }
  
  throw Backtrack;
};

Grammar.prototype.optional = function (pattern) {
  var initialState = this.preserve();
  
  try {
    return pattern.call(this);
  }
  catch (e) {
    if (e === Backtrack) {
      this.restore(initialState);
      return null;
    }
    else {
      throw e;
    }
  }
};

Grammar.prototype.predicate = function (predicate) {
  if (predicate.call(this)) return null;
  else throw Backtrack;
};

Grammar.prototype.action = function (action) {
  return action.call(this);
};

Grammar.prototype.nestedArray = function (pattern) {
  var input = this.next();
  if (input instanceof Array) {
    this.pushInput(input);
  
    pattern.call(this);
    this.end();
  
    this.popInput();
    return input;
  }
  else {
    throw Backtrack;
  }
};

Grammar.prototype.nestedAst = function (pattern) {
  var input = this.next();
  if (input instanceof Ast) {
    this.pushInput(input);
    
    pattern.call(this);
    this.end();
    
    this.popInput();
    return input;
  }
  else {
    throw Backtrack;
  }
};



Grammar.prototype.tap = function (pattern) {
  return pattern.call(this);
};

Grammar.prototype.if = function (conditionPattern, consiquentPattern, alternativePattern) {
  var result = conditionPattern.call(this);
  if (result) return consiquentPattern.call(this, result);
  else        return alternativePattern.call(this, result);
};

Grammar.prototype.pif = function (conditionPattern, consiquentPattern, alternativePattern) {
  var initialState = this.perserve();
  var result;
  try {
    result = conditionPattern.call(this);
  }
  catch (e) {
    if (e === Backtrack) {
      this.restore(initialState);
      return (alternativePattern != null ? alternativePattern.call(this) : null);
    }
    else {
      throw e;
    }
  }
  return (consiquentPattern != null ? consiquentPattern.call(this, result) : result);
};

Grammar.prototype.ifNotNull = function (pattern) {
  if (pattern != null) return pattern.call(this);
  else                 return null;
};

Grammar.prototype.repeat = function (pattern) {
  var initialState;
  var result = [];
  
  try {
    while (true) {
      initialState = this.preserve();
      
      result.push(pattern.call(this));
    }
  }
  catch (e) {
    if (e === Backtrack) {
      this.restore(initialState);
      return result;
    }
    else {
      throw e;
    }
  }
};

Grammar.prototype.repeat1 = function (pattern) {
  var result = this.repeat(pattern);
  if (result.length > 0) return result;
  else throw Backtrack;
};

Grammar.prototype.delimited = function (elementPattern, delimiterPattern) {
  var initialState;
  var result = [];
  
  try {
    while (true) {
      initialState = this.preserve();
      
      if (result.length >= 1) {
        delimiterPattern.call(this);
      }
      result.push(elementPattern.call(this));
    }
  }
  catch (e) {
    if (e === Backtrack) {
      this.restore(initialState);
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

Grammar.prototype.nou = function () {
  var next = this.next();
  if (next === null || next === undefined) return next;
  else                                     throw Backtrack;
};

Grammar.prototype.equal = function (object) {
  var next = this.next();
  if (Util.equal(next, object)) return next;
  else                          throw Backtrack;
};

Grammar.prototype.instanceof = function (constructor) {
  var next = this.next();
  if (next instanceof constructor) return next;
  else                             throw Backtrack;
};

Grammar.prototype.typeof = function (string) {
  var next = this.next();
  if (typeof next === string) return next;
  else                        throw Backtrack;
};

Grammar.prototype.satisfy = function (predicate) {
  var next = this.next();
  if (predicate(next)) return next;
  else                 throw Backtrack;
};

Grammar.prototype.empty = function () {
  // Do nothing
};



Grammar.prototype.next = function () {
  var p = this.getPosition();
  if (p < this.count()) {
    this.setPosition(p + 1);
    return this.at(p);
  }
  else {
    throw Backtrack;
  }
};

Grammar.prototype.peek = function () {
  var p = this.getPosition();
  if (p < this.count()) return this.at(p);
  else                  throw Backtrack;
};

Grammar.prototype.last = function () {
  var p = this.getPosition();
  if (p > 0) return this.at(p - 1);
  else       throw Backtrack;
};

Grammar.prototype.rest = function () {
  var start = this.getPosition();
  var end = this.count();
  this.setPosition(end);
  return this.slice(start, end);
};

Grammar.prototype.end = function () {
  var p = this.getPosition();
  if (p === this.count()) return null;
  else                    throw Backtrack
};



Grammar.prototype.at = function (index) {
  return Util.at(this.getInput(), index);
};

Grammar.prototype.count = function () {
  return Util.count(this.getInput());
};

Grammar.prototype.slice = function (pattern) {
  if (pattern instanceof Function) {
    var initialPosition = this.getPosition();
    pattern.call(this);
    var finalPosition = this.getPosition();
    return this.getInput().slice(initialPosition, finalPosition);
  }
  else {
    return this.getInput().slice(arguments[0], arguments[1]);
  }
};



Grammar.prototype.hash = function (pattern) {
  this.ignore();
  return pattern.call(this);
};

Grammar.prototype.object = function (object) {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.string = function (string) {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.number = function (number) {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.regularExpression = function (regularExpression) {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.ignore = function () {
  // Do nothing
};

Grammar.prototype.__ignore = function () {
  // Do nothing
};



Grammar.prototype.pass = function () {
  // Do nothing
};

Grammar.prototype.fail = function () {
  throw Backtrack;
};



Grammar.prototype.error = function (message) {
  throw new Error("[object " + this.getName() + " at " + this.positionString() + "] " + message);
};



Grammar.prototype.getMemoTableForPosition = function (position) {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.memoize = function (name, pattern) {
  var memoTable = this.getMemoTableForPosition(this.getPosition());
  var memoInitialPosition = this.getPosition();
  
  //
  // This replaces the cache whenever it sees a new dynamic variables state, 
  // since we can't tell if the rule in question does or does not read from
  // the state. If it does, then it may have incoming side-effects and would
  // require flushing the cache anyway.
  //
  // This should work for most cases that would left factor at least.
  //
  
  var memo = memoTable[name];
  if (memo != null && memo.initialDynamicVariables === this._dynamicVariables) {
    if (memo.result === Backtrack) {
      throw Backtrack;
    }
    else {
      this.setPosition(memo.finalPosition);
      this._dynamicVariables = memo.finalDynamicVariables;
      return memo.result;
    }
  }
  else {
    var initialDynamicVariables = this._dynamicVariables;
    try {
      var result = pattern.call(this);
      memoTable[name] = {
        result: result,
        finalPosition: this.getPosition(),
        initialDynamicVariables: initialDynamicVariables,
        finalDynamicVariables: this._dynamicVariables
      };
      return result;
    }
    catch (e) {
      if (e === Backtrack) {
        memoTable[name] = {
          result: Backtrack,
          finalPosition: null,
          initialDynamicVariables: initialDynamicVariables,
          finalDynamicVariables: null
        };
      }
      throw e;
    }
  }
};



Grammar.prototype.log = function (message) {
  console.log('[object %s at %s] %s', this.getName(), this.positionString(), message);
};

Grammar.prototype.positionString = function (position) {
  throw new Error("Should be implemented in subclass.");
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



Grammar.prototype.pushInput = function (input) {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.popInput = function () {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.getInput = function () {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.getPosition = function () {
  throw new Error("Should be implemented in subclass.");
};

Grammar.prototype.setPosition = function (position) {
  throw new Error("Should be implemented in subclass.");
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
  if (this._dynamicVariables[name] != null) {
    throw new Error("Cannot initialize already initialized dynamic variable.");
  }
  
  this._shardDynamicVariables();
  this._dynamicVariables[name] = new List(object, null);
  return object;
};

Grammar.prototype.push = function (name, object) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Grammar:init())");
  }
  
  this._shardDynamicVariables();
  this._dynamicVariables[name] = new List(object, this._dynamicVariables[name]);
  return object;
};

Grammar.prototype.pop = function (name) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Grammar:init())");
  }
  
  var list = this._dynamicVariables[name];
  if (list.tail == null) {
    throw new Error("Cannot pop last frame of a dynamic variable stack. (Mismatched push/pop calls?)");
  }
  
  this._shardDynamicVariables();
  this._dynamicVariables[name] = list.tail;
  return list.head;
};

Grammar.prototype.get = function (name) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Grammar:init())");
  }
  
  return this._dynamicVariables[name].head;
};

Grammar.prototype.set = function (name, object) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Grammar:init())");
  }
  
  this._shardDynamicVariables();
  this._dynamicVariables[name] = new List(object, this._dynamicVariables[name].tail);
  return object;
};

Grammar.prototype.update = function (name, updater) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Grammar:init())");
  }
  
  this._shardDynamicVariables();
  this._dynamicVariables[name] = new List(updater(this._dynamicVariables[name].head), this._dynamicVariables[name].tail);
  return object;
};



Grammar.prototype.getName = function () {
  if (this.constructor.name !== '') {
    return this.constructor.name;
  }
  else {
    return null;
  }
};

Grammar.prototype.toString = function () {
  if (this.getName() != null) {
    return "[object combe.Grammar " + this.getName() + "]";
  }
  else {
    return "[object combe.Grammar]";
  }
};
