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

Object.setPrototypeOf = function (object, newPrototype) {
  object.__proto__ = newPrototype;
};

Object.prototype.origIsPrototypeOf = Object.prototype.isPrototypeOf;
Object.prototype.isPrototypeOf = function (what) {
  if (what == null || this == null) return false;
  for (var proto = what.__proto__; proto != null; proto = proto.__proto__) {
    if (this == proto) return true;
  }
  return false;
};

Object.clone = function (original, propOrFunc) {
  var o = Object.create(Object.getPrototypeOf(original));
  Object.copyProperties(o, original);
  Object.extend(o, propOrFunc);
  return o;
};

Object.extend = function (object, propOrFunc) {
  if (propOrFunc == null) {
    // Do nothing
  }
  else if (typeof propOrFunc === 'function') {
    propOrFunc(object);
  }
  else {
    Object.copyProperties(object, propOrFunc);
  }
  return object;
};

Object.copyProperties = function (dest, source) {
  var names = Object.getOwnPropertyNames(source);
  for (var i = 0; i < names.length; i++) {
    Object.defineProperty(dest, names[i], Object.getOwnPropertyDescriptor(source, names[i]));
  }
};

Object.derive = function (parent, propOrFunc) {
  var o = Object.create(parent);
  Object.extend(o, propOrFunc);
  return o;
};

Object.prototype.clone = function (propOrFunc) {
  return Object.clone(this, propOrFunc);
};

Object.prototype.extend = function (propOrFunc) {
  return Object.extend(this, propOrFunc);
};

Object.prototype.derive = function (propOrFunc) {
  return Object.derive(this, propOrFunc);
};

Object.prototype.tap = function (f) {
  f(this);
  return this;
};

Object.unique = function (name) {
  return {
    name: name,
    toString: function () {
      return name;
    }
  };
};

Object.prototype.initialize = function () {
  // Do nothing
};
