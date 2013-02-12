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

global.TokenGrammar = Grammar.subclass({
  
  embeddedMatch: function (source, sourcename, position, limitPosition) {
    var matchargs = Array.slice(arguments, 4);
    
    var parser = this.new(source, sourcename, position, limitPosition);
    var value = parser.match.apply(parser, matchargs);
    var finalToken = parser.last();
    return {
      position: finalToken.position + finalToken.length,
      value: value
    };
  },
  
  embeddedMatchAll: function (source, sourcename, position, limitPosition) {
    var matchargs = Array.slice(arguments, 4);
    
    var parser = this.new(source, sourcename, position, limitPosition);
    var value = parser.matchAll.apply(parser, matchargs);
    var finalToken = parser.last();
    return {
      position: finalToken.position + finalToken.length,
      value: value
    };
  },
  
}, {
  
  name: '(UnnamedTokenGrammar)',
  
  initialize: function (source, sourcename, position, limitPosition) {
    TokenGrammar.prototype.__proto__.initialize.call(this, source, sourcename);
    if (this.lexer == null && this.LexerClass != null) {
      this.lexer = this.LexerClass.new(source, sourcename, position, limitPosition);
    }
  },
  
  handleStringPattern: function (string) {
    return this.t(string);
  },
  
  at: function (position) {
    return this.lexer.tokenAt(position);
  },
  
  isEof: function () {
    return this.lexer.tokenAt(this.position).is('eof');
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
      var lineColumn = this.source.lineColumnString(token.position);
    }
    else {
      var lineColumn = '-1:0';
    }
    
    return this.sourcename + ':' + lineColumn;
  },
  
  slice: function (start, end) {
    return this.lexer.sliceTokens(start, end);
  },
  
});
