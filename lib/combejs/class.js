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

var extend = require('./util').extend;

var Class = module.exports = function Class(supertype, descriptors) {
  return Class.new(supertype, descriptors);
};
global.__combejs__Class = Class;

Class.new = function (supertype, properties) {
  var ctor = Class.create(supertype);
  extend(ctor.prototype, properties);
  return ctor;
};

Class.create = function (supertype, descriptors) {
  var ctor = function ctor() {
    return ctor.new();
  };
  ctor.new = function () {
    var obj = Object.create(this.prototype);
    obj.initialize.apply(obj, arguments);
    return obj;
  };
  ctor.prototype = Object.create(supertype.prototype, descriptors);
  return ctor;
};

Object.prototype.initialize = function () {
};
