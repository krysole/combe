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

global.TextGrammar = Grammar.subclass({}, {
  
  // Todo: Implement character parsers, and other text specific parsing
  // facilities.
  
  get source() { return this._source_storage; },
  set source(source) {
    assert(typeof source === 'string');
    this._source_storage = source
  },
  
  positionString: function (position) {
    if (position == null) position = this.position;
    
    if (position >= 0) {
      var lineColumn = this.source.lineColumnString(position);
    }
    else {
      var lineColumn = '-1:0';
    }
    
    return this.sourcename + ':' + lineColumn;
  },
  
});
