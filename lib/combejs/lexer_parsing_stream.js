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
var ParseError = require('./parse_error');
  
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
  
  read: function () {
    if (this.eof()) {
      throw new Error("Cannot read past EOF");
    }
    if (this.position === this.$array.length) {
      this.$array.push(this.$lexer.nextToken());
    }
    this.position += 1;
    return this.$array[this.$array.length - 1];
  },
  
  readReplacing: function (tags, usingRule, intendedTag) {
    var token = this.read();
    if (token.is(intendedTag)) {
      return token;
    }
    
    if (tags.any(function (elem) {return token.is(elem);})) {
      var previousToken = token.previousToken;
      this.$lexer.resetToBeforeToken(token);
      // We know we're not at eof since we already called read
      try {
        var newToken = this.$lexer[usingRule].call(this.$lexer);
        if (intendedTag == null || newToken.is(intendedTag)) {
          this.$array = this.$array.slice(0, this.position - 1);
          this.$array.push(newToken);
          return newToken;
        } else {
          previousToken.nextToken = token;
          this.$lexer.resetToAfterToken(this.$array[this.$array.length - 1]);
          return token;
        }
      } catch (error) {
        if (error instanceof ParseError) {
          previousToken.nextToken = token;
          this.$lexer.resetToAfterToken(this.$array[this.$array.length - 1]);
          return token;
        } else {
          throw error;
        }
      }
    }
    
    // If no substitution matched just return existing token
    return token;
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
