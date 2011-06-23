//
// Combe/JS - A Parsing Language for JavaScript
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

var Class = require('./class');

var Token = module.exports = Class.new(Object, {
  
  initialize: function (type, tags, value) {
    this.type = type;
    this.tags = tags ? tags : [];
    this.value = value;
  },
  
  toString: function () {
    var s = 'Token[' + this.type;
    if (this.value != null) {
      s += ' ' + this.value;
    }
    s += ' ' + this.lineColumn.join(':');
    s += ']'
    return s;
  },
  
  get lineColumn() {
    if (this.$lineColumn == null && this.input != null) {
      this.$lineColumn = this.input.lineColumnAt(this.startPosition);
    }
    return this.$lineColumn;
  },
  
  get line() {
    return this.lineColumn[0];
  },
  
  get column() {
    return this.lineColumn[1];
  },
  
  isType: function (typeString) {
    return this.type === typeString;
  },
  
  is: function (tagString) {
    return this.isType(tagString) || this.hasTag(tagString);
  },
  
  hasTag: function (tagString) {
    return this.tags.include(tagString);
  },
  
  isAnyOf: function (tags) {
    var self = this;
    return tags.some(function (elem) {
      return self.is(elem);
    });
  }
  
});
