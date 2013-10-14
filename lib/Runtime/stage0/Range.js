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

global.Range = Object.subclass('Range', {
  
  inclusive: function (lhs, rhs) {
    return this.new(lhs, rhs, true);
  },
  
  exclusive: function (lhs, rhs) {
    return this.new(lhs, rhs, false);
  },
  
}, {
  
  initialize: function (start, end, inclusive) {
    this.start = start;
    this.end = end;
    this.inclusive = inclusive;
  },
  
  get exclusive() { return !this.inclusive; },
  set exclusive(exclusive) { this.inclusive = !exclusive; },
  
  get lhs() { return this.start; },
  set lhs(value) { this.start = value; },
  
  get rhs() { return this.end; },
  set rhs(value) { this.end = value; },
  
  toString: function () {
    if (this.inclusive) {
      return '(' + this.start + '..' + this.end + ')';
    }
    else {
      return '(' + this.start + '...' + this.end + ')';
    }
  },
  
  toSourceString: function () {
    if (this.inclusive) {
      return 'Range.inclusive(', this.start.toSourceString(), ', ', this.end.toSourceString(), ')';
    }
    else {
      return 'Range.exclusive(', this.start.toSourceString(), ', ', this.end.toSourceString(), ')';
    }
  },
  
  toCombeSourceString: function () {
    if (this.inclusive) {
      return '(' + this.start.toCombeSourceString() + '..' + this.end.toCombeSourceString + ')';
    }
    else {
      return '(' + this.start.toCombeSourceString() + '...' + this.end.toCombeSOurceString + ')';
    }
  },
  
  include: function (what) {
    return (
      (this.start == null || __combe_infixOperators['>='](what, this.start)) &&
      (this.end == null ||
       this.inclusive
         ? __combe_infixOperators['<='](what, this.end)
         : __combe_infixOperators['<'](what, this.end))
    );
  },
  
  equalityOperatorClass: newEqualityOperatorClass({
    '==': function (lhs, rhs) {
      return (
        __combe_infixOperators['=='](lhs.inclusive, rhs.inclusive) &&
        __combe_infixOperators['=='](lhs.start, rhs.start) &&
        __combe_infixOperators['=='](lhs.end, rhs.end)
      );
    }
  }),
  
});
