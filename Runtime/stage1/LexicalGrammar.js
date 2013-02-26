//
// Combe - Improved JavaScript with Pattern Matching
//
// Copyright 2012 Lorenz Pretterhofer <krysole@alexicalmistake.com>
//
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
'use strict';

// Todo: This can and probably should be rewritten in Combe notation.

global.LexicalGrammar = TextGrammar.subclass({
  
  allTokens: function (source, filename) {
    return this.new(source, filename).allTokens();
  },
  
}, {
  
  name: '(UnnamedLexicalGrammar)',
  
  initialize: function (source, sourcename, position, limitPosition) {
    LexicalGrammar.prototype.__proto__.initialize.call(this, source, sourcename, position, limitPosition);
    this.tokenPosition = 0;
    this.tokens = [];
  },
  
  allTokens: function () {
    while (!this.isEof()) {
      this.readTokens();
    }
    return this.tokens;
  },
  
  tokenAt: function (tokenIndex) {
    while (tokenIndex >= this.tokens.length) {
      if (this.isEof()) {
        this.error('Cannot read tokens beyond eof');
      }
      this.readTokens();
    }
    return this.tokens[tokenIndex];
  },
  
  readTokens: function () {
    this.resetEmitted();
    this.nextToken();
    if (this.tokens.length <= this.emittedTokensIndex) {
      this.error('nextToken did not emit token');
    }
  },
  
  nextToken: function () {
    throw ShouldOverrideError.new();
  },
  
  newToken: function (type, value) {
    var text = this.slice(this.tokenPosition, this.position)
    return Token.new(
      type, 
      value, 
      this.tokenPosition,
      text.length,
      text
    );
  },
  
  resetToken: function () {
    this.tokenPosition = this.position;
  },
  
  resetEmitted: function () {
    this.emittedTokensIndex = this.tokens.length;
    this.resetToken();
  },
  
  emitToken: function (token) {
    this.tokens.push(token);
    this.resetToken();
    return token;
  },
  
  emit: function (type, value) {
    return this.emitToken(this.newToken(type, value));
  },
  
});
