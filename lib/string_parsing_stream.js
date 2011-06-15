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
  
var StringParsingStream = module.exports = function (string) {
  this.$string = string;
  this.$position = 0;
};
    
extend(StringParsingStream.prototype, {
  
  get position() {
    return this.$position;
  },
  set position(value) {
    // not '>=' because we need to allowing setting it to eof
    if (value > this.length || value < 0) {
      throw new Error("Position out of range");
    }
    this.$position = value;
  },
    
  get length() {
    return this.$string.length;
  },
  
  peek: function () {
    if (this.eof()) {
      throw new Error("Cannot peek past EOF");
    }
    return this.$string[this.position];
  },
    
  read: function () {
    if (this.eof()) {
      throw new Error("Cannot read past EOF");
    }
    this.position += 1;
    return this.$string[this.position - 1];
  },
  
  eof: function () {
    return this.position >= this.length;
  }, 
  
  slice: function (from, to) {
    if (from < 0 || from > this.length || to < 0 || to > this.length) {
      throw new Error("cannot slice input, out of range");
    }
    return this.$string.slice(from, to);
  }
  
});