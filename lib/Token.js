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

require('../JavaScriptExtensions');

var Token = module.exports = Class.new(Object, {}, {

  initialize: function (type, value, text, position, precededByNewline, source) {
    this.type = type;
    this.value = value;
    this.text = text;
    this.position = position;
    this.precededByNewline = precededByNewline;
    this.source = source;
  },

  toString: function () {
    var result = ['Token[', this.type, ' \'', this.text, '\''];
    if (this.value != null) {
      result.push([' ', this.value]);
    }
    result.push([' ', this.lineColumn.join(':')]);
    result.push(']');
    return result.deepJoin();
  },

  get lineColumn() {
    if (this._lineColumn == null) {
      this._lineColumn = this.source.lineColumnAt(this.position);
    }
    return this._lineColumn;
  },

  get line() {
    return this.lineColumn[0];
  },

  get column() {
    return this.lineColumn[1];
  },

  is: function (type) {
    return this.type === type;
  },
  
  isAny: function (array) {
    return array.include(this.type);
  },

});
