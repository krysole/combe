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

var BaseParser = require('../Runtime').BaseParser;
var BacktrackingException = require('../Runtime').BacktrackingException;

var TokenParser = module.exports = Class.new(BaseParser, {}, {

  initialize: function (lexer) {
    BaseParser.prototype.initialize.call(this);
    this.lexer = lexer;
    this.tokens = [];
  },
  
  tokenAt: function (position) {
    while (position >= this.tokens.length) {
      
      if (!this.tokens.isEmpty() && this.tokens.last.is('unknown')) {
        throw new Error('Cannot read token past unknown token!');
      }
      
      if (!this.tokens.isEmpty() && this.tokens.last.is('eof')) {
        throw new Error('Cannot read token past end of file');
      }
      
      var token = this.readToken();
      if (!token) {
        throw new Error('Lexer failed after token: ' + this.tokens.last);
      }
      
      this.tokens.push(token);
    }
    
    return this.tokens[position];
  },
  
  peekNext: function () {
    if (this.isEof()) {
      return this.fail();
    }
    return this.tokenAt(this.state.position);
  },
  
  next: function () {
    if (this.isEof()) {
      return this.fail();
    }
    return this.tokenAt(this.state.position++);
  },
  
  replaceNext: function (ruleName) {
    if (this.tokenAt(this.state.position - 1).is('eof')) {
      throw new Error('Cannot read token past end of file');
    }
    
    this.lexer.resetToBeforeToken(this.tokenAt(this.state.position));
    var token = this.readToken();
    if (token) {
      this.tokens = this.tokens.slice(0, this.state.position);
      this.tokens.push(token);
      this.state.position++;
      return token;
    }
    else {
      this.lexer.resetToAfterToken(this.tokens.last);
      this.fail();
    }
  },
  
  readToken: function () {
    try {
      return this.lexer.nextToken();
    }
    catch (error) {
      if (error === BacktrackingException) {
        return null;
      }
      else {
        throw error;
      }
    }
  },
  
  isEof: function () {
    return (
      this.state.position === this.tokens.length &&
      this.tokens.last && 
      this.tokens.last.is('eof')
    );
  },

  matchedInput: function (parser) {
    throw new Error("Cannot use matchedInput in a TokenParser");
  },

  stringPatternHandler: function (string) {
    return this.nextToken(string);
  },

  nextToken: function (tag) {
    var token = this.next();
    if (token.is(tag)) {
      return token;
    }
    else {
      this.fail();
    }
  },

  eof: function () {
    return this.nextToken('eof');
  },

});
