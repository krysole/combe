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

global.MagnitudeMismatchError = Error.subclass('MagnitudeMismatchError');

global.__combe_infixOperators = {
  
  '==': function (lhs, rhs) {
    if (lhs == null) return rhs == null;
    if (rhs == null) return false;
    if (lhs === rhs) return true;
    if (lhs.equalityOperatorClass != null &&
        lhs.equalityOperatorClass === rhs.equalityOperatorClass) {
      return lhs.equalityOperatorClass['=='](lhs, rhs);
    }
    else {
      return false;
    }
  },
  
  '!=': function (lhs, rhs) {
    if (lhs == null) return rhs != null;
    if (rhs == null) return true;
    if (lhs === rhs) return false;
    if (lhs.equalityOperatorClass != null &&
        lhs.equalityOperatorClass === rhs.equalityOperatorClass) {
      return lhs.equalityOperatorClass['!='](lhs, rhs)
    }
    else {
      return true;
    }
  },
  
  '>': function (lhs, rhs) {
    if (lhs != null && rhs != null &&
        lhs.magnitudeOperatorClass != null &&
        lhs.magnitudeOperatorClass === rhs.magnitudeOperatorClass) {
      return lhs.magnitudeOperatorClass['>'](lhs, rhs);
    }
    else {
      throw MagnitudeMismatchError.new(lhs + ' > ' + rhs);
    }
  },
  
  '>=': function (lhs, rhs) {
    if (lhs != null && rhs != null &&
        lhs.magnitudeOperatorClass != null &&
        lhs.magnitudeOperatorClass === rhs.magnitudeOperatorClass) {
      return lhs.magnitudeOperatorClass['>='](lhs, rhs);
    }
    else {
      throw MagnitudeMismatchError.new(lhs + ' >= ' + rhs);
    }
  },
  
  '<': function (lhs, rhs) {
    if (lhs != null && rhs != null &&
        lhs.magnitudeOperatorClass != null &&
        lhs.magnitudeOperatorClass === rhs.magnitudeOperatorClass) {
      return lhs.magnitudeOperatorClass['<'](lhs, rhs);
    }
    else {
      throw MagnitudeMismatchError.new(lhs + ' < ' + rhs);
    }
  },
  
  '<=': function (lhs, rhs) {
    if (lhs != null && rhs != null &&
        lhs.magnitudeOperatorClass != null &&
        lhs.magnitudeOperatorClass === rhs.magnitudeOperatorClass) {
      return lhs.magnitudeOperatorClass['<='](lhs, rhs);
    }
    else {
      throw MagnitudeMismatchError.new(lhs + ' <= ' + rhs);
    }
  },
  
  '<=>': function (lhs, rhs) {
    if (lhs != null && rhs != null &&
        lhs.magnitudeOperatorClass != null &&
        lhs.magnitudeOperatorClass === rhs.magnitudeOperatorClass) {
      return lhs.magnitudeOperatorClass['<=>'](lhs, rhs);
    }
    else {
      throw MagnitudeMismatchError.new(lhs + ' <=> ' + rhs);
    }
  },
  
};

var __combe_MagnitudeBasedEqualityOperatorClass = {
  '==': function (lhs, rhs) {
    assert(lhs.magnitudeOperatorClass === rhs.magnitudeOperatorClass);
    return (lhs.magnitudeOperatorClass['<=>'](lhs, rhs) === 0);
  },
  '!=': function (lhs, rhs) {
    assert(lhs.magnitudeOperatorClass === rhs.magnitudeOperatorClass);
    return (lhs.magnitudeOperatorClass['<=>'](lhs, rhs) !== 0);
  },
};

global.newMagnitudeBasedEqualityOperatorClass = function (objectExtensions) {
  return Object.derive(__combe_MagnitudeBasedEqualityOperatorClass, objectExtensions);
};

var __combe_BaseEqualityOperatorClass = {
  '==': function (lhs, rhs) {
    assert(this['!='] !== __combe_BaseEqualityOperatorClass['!=']);
    return !this['!='](lhs, rhs);
  },
  '!=': function (lhs, rhs) {
    assert(this['=='] !== __combe_BaseEqualityOperatorClass['==']);
    return !this['=='](lhs, rhs);
  },
};

global.newEqualityOperatorClass = function (objectExtensions) {
  return Object.derive(__combe_BaseEqualityOperatorClass, objectExtensions);
};

var __combe_PrimitiveEqualityOperatorClass = {
  '==': function (lhs, rhs) {
    return lhs === rhs;
  },
  '!=': function (lhs, rhs) {
    return lhs !== rhs;
  },
};

global.newPrimitiveEqualityOperatorClass = function () {
  return Object.derive(__combe_PrimitiveEqualityOperatorClass);
};

var __combe_BaseMagnitudeOperatorClass = {
  '>': function (lhs, rhs) {
    return (this['<=>'](lhs, rhs) > 0);
  },
  '>=': function (lhs, rhs) {
    return (this['<=>'](lhs, rhs) >= 0);
  },
  '<': function (lhs, rhs) {
    return (this['<=>'](lhs, rhs) < 0);
  },
  '<=': function (lhs, rhs) {
    return (this['<=>'](lhs, rhs) <= 0);
  },
  '<=>': function (lhs, rhs) {
    throw ShouldOverrideError.new('MagnitudeOperatorClass::<=>');
  },
};

global.newMagnitudeOperatorClass = function (objectExtensions) {
  return Object.derive(__combe_BaseMagnitudeOperatorClass, objectExtensions);
};

var __combe_PrimitiveMagnitudeOperatorClass = {
  '>': function (lhs, rhs) {
    return lhs > rhs;
  },
  '>=': function (lhs, rhs) {
    return lhs >= rhs;
  },
  '<': function (lhs, rhs) {
    return lhs < rhs;
  },
  '<=': function (lhs, rhs) {
    return lhs <= rhs;
  },
  '<=>': function (lhs, rhs) {
    if (lhs > rhs) return 1;
    if (lhs < rhs) return -1;
    return 0;
  },
};

global.newPrimitiveMagnitudeOperatorClass = function () {
  return Object.derive(__combe_PrimitiveMagnitudeOperatorClass);
};

Object.prototype.equalityOperatorClass = newPrimitiveEqualityOperatorClass();
  
Object.prototype.magnitudeOperatorClass = null;

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
