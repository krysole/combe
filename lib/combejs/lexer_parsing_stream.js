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
var BacktrackingException = require('./backtracking_exception');
  
var LexerParsingStream = module.exports = function (lexer, source) {
  this.$array = [];
  this.$position = 0;
  this.$lexer = lexer
  lexer.input.pushInput(source);
};

extend(LexerParsingStream.prototype, {
  
  get position() {
    return this.$position;
  },
  set position(value) {
    // not '>=' because we need to allowing setting it current lexing position
    if (value > this.$array.length || value < 0) {
      throw new Error("Cannot set position ahead of lexer");
    }
    this.$position = value;
  },
  
  peek: function () {
    if (this.eof()) {
      throw new Error("Cannot peek past EOF");
    }
    if (this.position === this.$array.length) {
      this.$array.push(this.$lexer.nextToken());
    }
    return this.$array[this.position];
  },
  
  read: function () {
    if (this.eof()) {
      throw new Error("Cannot read past EOF");
    }
    if (this.position === this.$array.length) {
      this.$array.push(this.$lexer.nextToken());
    }
    this.position += 1;
    return this.$array[this.position - 1];
  },
  
  readReplacing: function (tagsToReplace, usingRule) {
    var token = this.read(); // Increments position for us
    if (token.isAnyOf(tagsToReplace)) {
      var previousToken = token.previousToken;
      this.$lexer.resetToBeforeToken(token);
      try {
        var newToken = this.$lexer[usingRule].call(this.$lexer);
        this.$array = this.$array.slice(0, this.position - 1);
        this.$array.push(newToken);
        return newToken;
      } catch (error) {
        if (error === BacktrackingException) {
          previousToken.nextToken = token;
          this.$lexer.resetToAfterToken(this.$array.last())
          return token;
        } else {
          throw error;
        }
      }
    } else {
      return token;
    }
  },
  
  eof: function () {
    return (
      this.position === this.$array.length &&
      this.$lexer.input.eof());
  }, 
  
  slice: function (from, to) {
    if (from < 0 || from >= this.$array.length || to < 0 || to > this.$array.length) {
      throw new Error("cannot slice input, out of range");
    }
    return this.$array.slice(from, to);
  }
  
});
