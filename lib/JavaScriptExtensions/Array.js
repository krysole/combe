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

var util = require('../util');


util.extend(Array.prototype, {
  
  at: function (index) {
    if (index < 0) {
      index = this.length - index;
    }
    return this[index];
  },
  
  get first() {
    return this[0];
  },
  set first(value) {
    this[0] = value;
  },
  
  get last() {
    return this[this.length - 1];
  },
  set last(value) {
    this[this.length - 1] = value;
  },
  
  isEmpty: function () {
    return (this.length === 0);
  },
  
  include: function (what) {
    return this.some(function (elem) {
      return (elem === what);
    });
  },
  
  excludeDuplicates: function () {
    var result = [];
    this.forEach(function (elem) {
      if (!result.include(elem)) {
        result.push(elem);
      }
    });
    return result;
  },
  
  difference: function (right) {
    var result = [];
    this.forEach(function (elem) {
      if (!right.include(elem)) {
        result.push(elem);
      }
    });
    return result;
  },
  
  interpolate: function (delimiter) {
    var result = [];
    this.forEach(function (elem) {
      if (result.length !== 0) {
        result.push(delimiter);
      }
      result.push(elem);
    });
    return result;
  },
  
  deepJoin: function () {
    return this.reduce(function (s, elem) {
      if (elem == null) {
        return s;
      }
      else if (Array.isArray(elem)) {
        return s + elem.deepJoin();
      }
      else {
        return s + elem.toString();
      }
    }, '');
  },
  
  flatten1: function () {
    return this.reduce(function (array, elem) {
      return array.concat(elem);
    });
  },

  toSourceString: function () {
    var sourceStrings = [];
    for (var i = 0; i < this.length; i++) {
      sourceStrings.push(toSourceString(this[i]));
      if (!sourceStrings.last) return null;
    }
    return ['[', sourceStrings.interpolate(', '), ']'].deepJoin();
  },
  
});