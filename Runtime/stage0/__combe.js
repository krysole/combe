//
// Combe - Improved JavaScript with Pattern Matching
//
// Copyright 2012 Lorenz Pretterhofer <krysole@alexicalmistake.com>
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
'use strict';

global.__combe_break = Object.unique('__combe_break');
global.__combe_continue = Object.unique('__combe_continue');

global.__combe_infixOperators = {
  
  '==': function (lhs, rhs) {
    return (
      (lhs == null && rhs == null) ||
      (lhs === rhs)
    );
  },
  
  '!=': function (lhs, rhs) {
    return (
      (lhs != null && rhs != null && lhs !== rhs) ||
      (lhs == null && rhs != null) ||
      (lhs != null && rhs != null)
    );
  },
  
};

global.__combe_defineValueProperty = function (subject, name, value) {
  var descriptor = { value: value, writable: true, enumerable: true, configurable: true };
  Object.defineProperty(subject, name, descriptor);
  return value;
};

global.__combe_defineGetProperty = function (subject, name, value) {
  var descriptor = { get: value, enumerable: true, configurable: true };
  if (Object.hasOwnProperty(subject, name)) {
    var existingDescriptor = Object.getOwnPropertyDescriptor(subject, name);
    descriptor.set = existingDescriptor.set;
  }
  Object.defineProperty(subject, name, descriptor);
  return value;
};

global.__combe_defineSetProperty = function (subject, name, value) {
  var descriptor = { set: value, enumerable: true, configurable: true };
  if (Object.hasOwnProperty(subject, name)) {
    existingDescriptor = Object.getOwnPropertyDescriptor(subject, name);
    descriptor.get = existingDescriptor.get;
  }
  Object.defineProperty(subject, name, descriptor);
  return value;
};

global.__combe_defineDescribedProperty = function (subject, name, descriptor) {
  Object.defineProperty(subject, name, descriptor);
  return descriptor;
};


global.Backtrack = Object.unique('Backtrack');


Object.prototype.__combe_getMemoTableArray = function () {
  var memoTableArray = this.__combe_memoTableArray_storage;
  if (memoTableArray == null) {
    memoTableArray = this.__combe_memoTableArray_storage = [];
  }
  return memoTableArray;
};

Object.prototype.__combe_getMemoTable = function (position) {
  assert(Number.isClassOf(position));
  var memoTableArray = this.__combe_getMemoTableArray();
  var memoTable = memoTableArray[position];
  if (memoTable == null) {
    memoTable = memoTableArray[position] = [];
  }
  return memoTable;
};

Object.prototype.__combe_memoize = function (name, parser) {
  var position = this.position;
  var state = this.state;
  var memoTable = this.__combe_getMemoTable(position);
  var entry = memoTable[name];
  if (entry === Backtrack) {
    throw Backtrack;
  }
  else if (entry != null) {
    this.position = entry.position;
    this.state = entry.state;
    return entry.result;
  }
  else {
    try {
      var result = parser.call(this);
      memoTable[name] = { result: result, position: this.position, state: this.state };
      return result;
    }
    catch (e) {
      if (e === Backtrack) {
        memoTable = Backtrack;
      }
      throw e;
    }
  }
};

Object.prototype.__combe_choice = function (/* ...arguments */) {
  var initialPosition = this.position;
  var initialState = this.state;
  for (var i = 0; i < arguments.length; i++) {
    try {
      return arguments[i].call(this);
    }
    catch (e) {
      if (e === Backtrack) {
        this.position = initialPosition;
        this.state = initialState;
      }
      else {
        throw e;
      }
    }
  }
  throw Backtrack;
};

Object.prototype.__combe_not = function (parser) {
  var initialPosition = this.position;
  var initialState = this.state;
  try {
    parser.call(this);
  }
  catch (e) {
    if (e === Backtrack) {
      this.position = initialPosition;
      this.state = initialState;
      return null;
    }
    else {
      throw e;
    }
  }
  this.position = initialPosition;
  this.state = initialState;
  return this.fail();
};

Object.prototype.__combe_lookahead = function (parser) {
  var initialPosition = this.position;
  var initialState = this.state;
  var result = parser.call(this);
  this.position = initialPosition;
  this.state = initialState;
  return result;
};

Object.prototype.__combe_repeat = function (parser) {
  var initialPosition, initialState;
  var result = [];
  while (true) {
    try {
      initialPosition = this.position;
      initialState = this.state;
      result.push(parser.call(this));
    }
    catch (e) {
      if (e === Backtrack) {
        this.position = initialPosition;
        this.state = initialState;
        return result;
      }
      else {
        throw e;
      }
    }
  }
};

Object.prototype.__combe_nonZeroRepeat = function (parser) {
  var array = this.__combe_repeat(parser);
  if (array.length >= 1) {
    return array;
  }
  else {
    throw Backtrack;
  }
};

Object.prototype.__combe_optional = function (parser) {
  var initialPosition = this.position;
  var initialState = this.state;
  try {
    return parser.call(this);
  }
  catch (e) {
    if (e === Backtrack) {
      this.position = initialPosition;
      this.state = initialState;
      return null;
    }
    else {
      throw e;
    }
  }
};

Object.prototype.__combe_predicate = function (predicate) {
  if (predicate.call(this)) {
    return null;
  }
  else {
    throw Backtrack;
  }
};

require.extensions['.combejs'] = require.extensions['.js'];
