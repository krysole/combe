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