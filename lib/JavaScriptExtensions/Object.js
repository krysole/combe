//
// Combe - A Parsing Language for JavaScript
//
// Copyright 2011 Lorenz Pretterhofer
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';

if (global == null) {
  if (window != null && window.window === window && window.Object === Object) {
    window.global = window;
    assert(global != null);
    assert(global === global.global);
  }
}

Object.extend = function (target, properties) {
  Object.getOwnPropertyNames(properties).forEach(function (name) {
    Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(properties, name));
  });
};

Object.defineProperties = function (target, properties) {
  Object.getOwnPropertyNames(properties).forEach(function (name) {
    Object.defineProperty(target, name, properties[name]);
  });
};

Object.getOwnPropertyDescriptors = function (target) {
  return Object.getOwnPropertyNames(target).map(function (name) {
    return Object.getOwnPropertyDescriptor(target, name);
  });
};

Object.hasOwnProperty = function (target, name) {
  return Object.prototype.hasOwnProperty.call(target, name);
};

Object.prototype.toSourceString = function () {
  return '#<Object>';
};

Object.typeOf = function (what) {
  if (typeof what === 'undefined') {
    return 'undefined';
  }
  else if (what === null) {
    return 'null';
  }
  else {
    return what.__type;
  }
};

Object.prototype.__type = 'Object';

Object.toSourceString = function (object) {
  if (typeof object === 'undefined') {
    return 'undefined';
  }
  else if (object === null) {
    return 'null';
  }
  else {
    return object.toSourceString();
  }
};

Object.prototype.clone = function () {
  var object = Object.create(Object.getPrototypeOf(this));
  Object.extend(object, this);
  return object;
};

Object.prototype.tap = function (fn) {
  fn.call(this, this);
  return this;
};

Object.toJson = function (what) {
  if (typeof what === 'undefined') {
    return undefined;
  }
  else if (what === null) {
    return null;
  }
  else {
    return what.toJson();
  }
};

Object.prototype.toJson = function () {
  return this;
};

Object.new = function (func) {
  var rest = Array.prototype.slice.call(arguments, 1);
  var obj = Object.create(func.prototype);
  return func.apply(obj, rest);
};

Object.prototype.new = function () {
  var obj = Object.create(this.prototype);
  return this.apply(obj, arguments);
};

Object.unique = function (name) {
  return Object.freeze({
    type: name,
    toString: function () {
      return 'unique[' + this.name + ']';
    },
  });
};
