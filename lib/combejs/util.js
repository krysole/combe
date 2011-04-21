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

var extend = exports.extend = function (obj, from) {
  Object.getOwnPropertyNames(from).forEach(function (name) {
    Object.defineProperty(obj, name, Object.getOwnPropertyDescriptor(from, name));
  });
};


var CustomException = function () {
  Error.captureStackTrace(this, this.constructor);
  if (this.init != null) {
    this.init.apply(this, arguments);
  }
};

CustomException.prototype.constructor = CustomException;
CustomException.name = "CustomException";


var defineException = exports.defineException = function (name, initMethod) {
  var Constructor = function () {
    CustomException.apply(this, arguments);
  };
  Constructor.prototype.constructor = Constructor;
  Constructor.name = name;
  Constructor.prototype.init = initMethod;
  return Constructor;
};



// Todo: As useful as these are... what position should I be taking with respect to monkey-patching Array?
Array.prototype.interpolate = function (delim) {
  var result = [];
  this.forEach(function (elem) {
    if (result.length !== 0) {
      result.push(delim);
    }
    result.push(elem);
  });
  return result;
};

Array.prototype.difference = function (other) {
  var result = [];
  for (var i = 0; i < this.length; i++) {
    if (!other.include(this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.withoutDuplicates = function () {
  var result = [];
  this.forEach(function (elem) {
    if (!result.include(elem)) {
      result.push(elem);
    }
  });
  return result;
};

Array.prototype.include = function (what) {
  return (this.indexOf(what) !== -1);
};
