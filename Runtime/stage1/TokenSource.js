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

global.TokenSource = Object.subclass({}, {
  
  initialize: function (lexer) {
    this.lexer = lexer;
    this.tokens = [];
  },
  
  lexAll: function () {
    while (!this.lexer.isEof()) {
      this.tokens.pushAll(this.lexer.nextTokens());
    }
  },
  
  lexUpTo: function (index) {
    if (index == null) return;
    if (index < 0) {
      this.lexAll();
    }
    else {
      while (index >= this.tokens.length &&
            !this.lexer.isEof()) {
        this.tokens.pushAll(this.lexer.nextTokens());
      }
    }
  },
  
  isEof: function (index) {
    assert(index >= 0);
    this.lexUpTo(index);
    return (
      (this.lexer.isEof() && index >= this.tokens.length) ||
      (index === this.tokens.length - 1 && this.tokens[index].is('eof'))
    );
  },
  
  at: function (index) {
    this.lexUpTo(index);
    return this.tokens.at(index);
  },
  
  slice: function (begin, end) {
    if (begin == null || end == null) {
      this.lexAll();
    }
    else {
      this.lexUpTo(begin);
      this.lexUpTo(end);
    }
    return this.tokens.slice(begin, end);
  },
  
});
