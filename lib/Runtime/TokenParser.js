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

var BaseParser = require('./BaseParser');
var BacktrackingException = require('./BacktrackingException');


var TokenParser = module.exports = Class.new(BaseParser, {

  initialize: function () {
    this.$lexer = null;
    this.$tokens = [];
    this.position = 0;
  },

  match: function (ruleName, lexer /*, ...args*/) {
    var args = Array.prototype.slice.call(arguments, 2);
    if (typeof lexer === 'string') {
      lexer = this.DefaultLexer.new(lexer);
    }
    this.$lexer = lexer;
    this.$tokens = [];
    this.position = 0;
    return this.applyRule.apply(this, [ruleName].concat(args));
  },

  matchAll: function (ruleName, lexer /*, ...args*/) {
    var args = Array.prototype.slice.call(arguments, 2);
    if (typeof lexer === 'string') {
      lexer = this.DefaultLexer.new(lexer);
    }
    this.$lexer = lexer;
    this.$tokens = [];
    this.position = 0;
    var result = this.applyRule.apply(this, [ruleName].concat(args));
    if (result && !this._isEof()) {
      return null;
    }
    return result;
  },

  get position() {
    return this.$position;
  },

  set position(value) {
    if (value >= 0 && value <= this.$tokens.length) {
      this.$position = value;
    }
    else {
      throw new Error("Cannot set position after tokens currently lexed");
    }
  },

  _peek: function () {
    if (this._isEof()) {
      return this._fail();
    }
    else if (this.position === this.$tokens.length) {
      this.$tokens.push(this._readTokenFromLexer());
      return this.$tokens[this.position];
    }
    else {
      return this.$tokens[this.position];
    }
  },

  _read: function () {
    if (this._isEof()) {
      return this._fail();
    }
    else if (this.position === this.$tokens.length) {
      this.$tokens.push(this._readTokenFromLexer());
      return this.$tokens[this.position++];
    }
    else {
      return this.$tokens[this.position++];
    }
  },

  _readReplacing: function (tagsToReplace, usingRule) {
    var token = this._read();
    if (token.isAnyOf(tagsToReplace)) {
    
      var previousToken = token.previousToken;
      this.$lexer.resetToBeforeToken(token);
    
      try {
        var newToken = this.$lexer[usingRule].call(this.$lexer);
        this.$tokens = this.$array.slice(0, this.position - 1);
        this.$tokens.push(newToken);
        return newToken;
      }
      catch (error) {
        if (error === BacktrackingException) {
          previousToken.nextToken = token;
          this.$lexer.resetToAfterToken(this.$tokens.last);
          return token;
        }
        else {
          throw error;
        }
      }
    }
    else {
      return token;
    }
  },

  _isEof: function () {
    return (this.position === this.$tokens.length && this.$lexer._isEof());
  },

  _readTokenFromLexer: function () {
    try {
      return this.$lexer.nextToken();
    }
    catch (error) {
      if (error === BacktrackingException) {
        throw new Error("Cannot read next token");
      }
      else {
        throw error;
      }
    }
  },

  _matchedInput: function (parser) {
    throw new Error("Cannot use matchedInput in a TokenParser");
  },

  stringPatternHandler: function (string) {
    return this.getNextToken(string);
  },

  getNextToken: function (tag) {
    var token = this._read();
    if (token.is(tag)) {
      return token;
    }
    else {
      this._fail();
    }
  },

  eof: function () {
    return this.getNextToken('eof');
  },

});
