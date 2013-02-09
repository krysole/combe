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

global.TokenGrammar = Grammar.subclass({}, {
  
  initialize: function (tokenSource, fileSource, sourcename) {
    TokenGrammar.prototype.__proto__.initialize.call(this, tokenSource, sourcename);
    this.fileSource = fileSource;
  },
  
  get lexer() {
    if (this._lexer_storage != null) return this._lexer_storage;
    else throw ShouldOverrideError('TokenGrammar.lexer');
  },
  set lexer(value) { this._lexer_storage = value; },
  
  handleStringPattern: function (string) {
    return this.t(string);
  },
  
  at: function (position) {
    return this.source.at(position);
  },
  
  isEof: function () {
    return this.source.isEof(this.position);
  },
  
  t: function (typename) {
    return this.nextIf(function (token) {
      return (token.is(typename));
    });
  },
  
  positionString: function (position) {
    if (position == null) position = this.position;
    
    if (position >= 0) {
      var token = this.at(position);
      var lineColumn = this.fileSource.lineColumnString(token.position);
    }
    else {
      var lineColumn = '-1:0';
    }
    
    return this.sourcename + ':' + lineColumn;
  },
  
  slice: function () {
    throw UnimplementedError.new('TokenGrammar.slice()');
  },
  
});
