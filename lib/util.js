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


var extend = exports.extend = function (target, properties) {
  Object.getOwnPropertyNames(properties).forEach(function (name) {
    Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(properties, name));
  });
};

var toSourceString = exports.toSourceString = function (object) {
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

var typeOf = exports.typeOf = function (what) {
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
Number.prototype.__type = 'Number';
String.prototype.__type = 'String';
Array.prototype.__type = 'Array';
Boolean.prototype.__type = 'Boolean';
RegExp.prototype.__type = 'RegExp';
Function.prototype.__type = 'Function';

var deepJoin = exports.deepJoin = function (what) {
  if (what == null) {
    return '';
  }
  else if (Array.isArray(what)) {
    return what.deepJoin();
  }
  else {
    return what.toString();
  }
};
