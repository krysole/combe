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

var extend = require('../util').extend;
var ensureDefined = require('../util').ensureDefined;

var Token = module.exports = function (obj) {
  // Most tokens follow the structure
  // {
  //   type: string,
  //   tags: array,
  //   value: object | undefined,
  //   input: string,
  //   startPosition: integer,
  //   endPosition: integer,
  //   previousToken: Token | null,
  //   nextToken: Token | null,
  //   precededByNewline: boolean,
  // }
  extend(this, obj);
  ensureDefined(this, 'type');
  ensureDefined(this, 'tags', []);
  ensureDefined(this, 'input');
  ensureDefined(this, 'startPosition');
  ensureDefined(this, 'endPosition');
  ensureDefined(this, 'previousToken', null);
  ensureDefined(this, 'nextToken', null);
  ensureDefined(this, 'precededByNewline', false);
};

extend(Token.prototype, {
  
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
    if (this.$lineColumn == null) {
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
    return isType(typeString) || hasTag(tagString);
  },
  
  hasTag: function (tagString) {
    return this.tags.include(tagString);
  }
  
});