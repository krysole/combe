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
var ArrayParsingStream = require('./array_parsing_stream');
var StringParsingStream = require('./string_parsing_stream');
var LexerParsingStream = require('./lexer_parsing_stream');

if (Array.prototype.last == null) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}

var ParserInput = module.exports = function () {
  this.$stack = [];
};

extend(ParserInput.prototype, {
  
  get position() {
    var pos = this.current.position;
    if (this.$next != null) {
      return pos - 1;
    } else {
      return pos;
    }
  },
  set position(value) {
    this.$next = null;
    this.current.position = value;
  },
  
  get current() {
    return this.$stack.last();
  },
  
  peek: function () {
    if (this.$next == null) {
      this.$next = this.current.read();
    }
    return this.$next;
  },
  
  read: function () {
    if (this.$next != null) {
      var _next = this.$next;
      this.$next = null;
      return _next;
    } else {
      return this.current.read();
    }
  },
  
  pushInput: function (obj) {
    var input;
    if (Array.isArray(obj)) {
      input = new ArrayParsingStream(obj);
    } else if (typeof obj === 'string') {
      input = new StringParsingStream(obj);
    } else if (obj instanceof ArrayParsingStream ||
               obj instanceof StringParsingStream ||
               obj instanceof LexerParsingStream) {
      input = obj;
    } else {
      throw new Error("Combe currently only supports Array and String inputs");
    }
    this.$stack.push(input);
  },
  
  popInput: function () {
    this.$stack.pop();
  },
  
  eof: function () {
    return this.current.eof();
  },
  
  slice: function (from, to) {
    return this.current.slice(from, to);
  }
  
});
