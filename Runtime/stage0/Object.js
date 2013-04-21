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

Object.allocate = function (prototype) {
  return { __proto__: prototype };
};

Object.getPrototypeOf = function (object) {
  return object.__proto__;
};

Object.setPrototypeOf = function (object, newPrototype) {
  object.__proto__ = newPrototype;
};

Object.prototype.isPrototypeOf = function (what) {
  return Object.isPrototypeOf(this, what);
};

Object.isPrototypeOf = function (prototype, what) {
  if (prototype == null || what == null) return false;
  for (var p = what.__proto__; p != null; p = p.__proto__) {
    if (prototype === p) return true;
  }
  return false;
};

Object.isOwnProperty = function (object, name) {
  return Object.prototype.isOwnProperty.call(object, name);
};

Object.removeOwnProperty = function (object, name) {
  if (!delete object[name]) {
    throw Error.new('Could not remove own property ' + name + ' on object ' + object);
  }
};

Object.getEnumerablePropertyNames = function (object) {
  var names = [];
  for (var name in object) {
    names.push(name);
  }
  return names;
};

Object.getPropertyNames = function (object) {
  var names = [];
  for (; object != null; object = object.__proto__) {
    var ownPropertyNames = Object.getOwnPropertyNames(object);
    for (var i = 0; i < ownPropertyNames.length; i++) {
      names.pushIfAbsent(ownPropertyNames[i]);
    }
  }
  return names;
};

Object.clone = function (original, extensions) {
  var o = Object.allocate(Object.getPrototypeOf(original));
  Object.copyOwnProperties(o, original);
  Object.extend(o, extensions);
  return o;
};

Object.copy = function (original) {
  // Creates a copy assuming that only enumerable own properties should be copied
  var o = Object.allocate(Object.getPrototypeOf(original));
  for (var name in original) {
    if (Object.isOwnProperty(original, name)) {
      o[name] = original[name];
    }
  }
  return o;
};

Object.extend = function (object, extensions) {
  if (extensions == null) {
    // Do nothing
  }
  else if (Function.isClassOf(object)) {
    extensions(object);
  }
  else {
    Object.copyOwnProperties(object, extensions);
  }
  return object;
};

Object.derive = function (parent, extensions) {
  var o = Object.create(parent);
  Object.extend(o, extensions);
  return o;
};

Object.copyOwnProperties = function (dest, source) {
  var names = Object.getOwnPropertyNames(source);
  for (var i = 0; i < names.length; i++) {
    Object.defineProperty(dest, names[i], Object.getOwnPropertyDescriptor(source, names[i]));
  }
};

Object.synchronizeOwnProperties = function (dest, source) {
  var destNames = Object.getOwnPropertyNames(dest);
  for (var i = 0; i < destNames.length; i++) {
    var destDesc = Object.getOwnPropertyDescriptor(dest, destNames[i]);
    if (!destDesc.configurable) {
      if (!Object.hasOwnProperty(destNames[i])) {
        throw Error.new('Cannot synchronize non-configurable own property (' + destNames[i] + ')');
      }
      var sourceDesc = Object.getOwnPropertyDescriptor(source, destNames[i]);
      if (destDesc.value !== sourceDesc.value ||
          destDesc.writable !== sourceDesc.writable ||
          destDesc.get !== sourceDesc.get ||
          destDesc.set !== sourceDesc.set ||
          destDesc.enumerable !== sourceDesc.enumerable ||
          destDesc.configurable !== sourceDesc.configurable) {
        throw Error.new('Cannot synchronize non-configurable own property (' + destNames[i] + ')');
      }
    }
    if (!Object.hasOwnProperty(source, destNames[i])) {
      Object.removeOwnProperty(dest, destNames[i]);
    }
  }
  var sourceNames = Object.getOwnPropertyNames(source);
  for (var i = 0; i < sourceNames.length; i++) {
    var sourceDesc = Object.getOwnPropertyDescriptor(source, sourceNames[i]);
    Object.defineProperty(dest, sourceNames[i], sourceDesc);
  }
  if (Object.isFrozen(source)) Object.freeze(dest);
  else if (Object.isSealed(source)) Object.seal(dest);
  else if (!Object.isExtensible(source)) Object.preventExtensions(dest);
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

Object.prototype.subscript = function (i) {
  return this[i];
};

Object.prototype.tap = function (f) {
  f(this);
  return this;
};

Object.prototype.at = function (key) {
  return this[key];
};
