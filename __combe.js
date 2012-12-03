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

var unique = function (name) {
  return {
    name: name,
    toString: function () {
      return name;
    }
  };
};

global.__combe$break = unique('__combe$break');
global.__combe$continue = unique('__combe$continue');

global.Range = function (lhs, rhs, isInclusive) {
  this.__combe$lhs = lhs;
  this.__combe$rhs = rhs;
  this.__combe$isInclusive = isInclusive;
  return this;
};
Range.prototype = {
  
  __combe$type: 'Range',
  
  inclusive: function (lhs, rhs) {
    return new Range.__constructor(lhs, rhs, true);
  },
  
  exclusive: function (lhs, rhs) {
    return new Range.__constructor(lhs, rhs, false);
  },
  
  isInclusive: function () {
    return this.__combe$isInclusive;
  },
  
  isExclusive: function () {
    return !this.isInclusive();
  },
  
  toString: function (lhs, rhs) {
    if (this.isInclusive()) {
      return '(' + this.lhs() + '..' + this.rhs() + ')';
    }
    else {
      return '(' + this.lhs() + '...' + this.rhs() + ')';
    }
  },
  
};

global.__combe$infixOperators = {
  
  '==': function (lhs, rhs) {
    return (
      (lhs == null && rhs == null) ||
      (lhs === rhs)
    );
  },
  
  '!=': function (lhs, rhs) {
    return (
      (lhs == null && rhs != null) ||
      (lhs != null && rhs == null) ||
      (lhs !== rhs)
    );
  },
  
};

global.__combe$defineValueProperty = function (subject, name, value) {
  var descriptor = { value: value, writable: true, enumerable: true, configurable: true };
  Object.defineProperty(subject, name, descriptor);
  return value;
};

global.__combe$defineGetProperty = function (subject, name, value) {
  var descriptor = { get: value, enumerable: true, configurable: true };
  if (Object.hasOwnProperty(subject, name)) {
    var existingDescriptor = Object.getOwnPropertyDescriptor(subject, name);
    descriptor.set = existingDescriptor.set;
  }
  Object.defineProperty(subject, name, descriptor);
  return value;
};

global.__combe$defineSetProperty = function (subject, name, value) {
  var descriptor = { set: value, enumerable: true, configurable: true };
  if (Object.hasOwnProperty(subject, name)) {
    existingDescriptor = Object.getOwnPropertyDescriptor(subject, name);
    descriptor.get = existingDescriptor.get;
  }
  Object.defineProperty(subject, name, descriptor);
  return value;
};

global.__combe$defineDescribedProperty = function (subject, name, descriptor) {
  Object.defineProperty(subject, name, descriptor);
  return descriptor;
};
