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
    var lexer = this.new(source, filename);
    lexer.readTokens();
    return lexer.tokens;
  },
  
}, {
  
  name: '(UnnamedLexicalGrammar)',
  
  initialize: function (source, filename) {
    LexicalGrammar.prototype.__proto__.initialize.call(this, source, filename);
    this.tokenPosition = 0;
    this.tokens = [];
  },
  
  readTokens: function (tokenIndex) {
    while (tokenIndex != null && tokenIndex >= this.tokens.length &&
           !this.isEof()) {
      this.emittedTokens = [];
      this.resetTokenState();
      var result = this.nextToken();
      if (this.emittedTokens.length > 0) {
        this.tokens.pushAll(this.emittedTokens);
      }
      else if (result != null && Token.isClassOf(result)) {
        this.tokens.push(result);
      }
      else {
        throw Error.new("nextToken did not emit token, (returned '" + result + "')");
      }
    }
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
  
  resetTokenState: function () {
    this.tokenPosition = this.position;
  },
  
  emitToken: function (token) {
    this.emittedTokens.push(token);
    this.resetTokenState();
    return token;
  },
  
  emit: function (type, value) {
    return this.emitToken(this.newToken(type, value));
  },
  
  tokenAt: function (tokenIndex) {
    assert(tokenIndex >= 0);
    this.readTokens(tokenIndex);
    if (tokenIndex > this.tokens.length) {
      this.error("tokenIndex beyond eof");
    }
    return this.tokens[tokenIndex];
  },
  
  sliceTokens: function (startTokenIndex, endTokenIndex) {
    if (startTokenIndex != null) this.readTokens(startTokenIndex);
    if (endTokenIndex != null) this.readTokens(endTokenIndex);
    return this.tokens.slice(startTokenIndex, endTokenIndex);
  },
  
});
