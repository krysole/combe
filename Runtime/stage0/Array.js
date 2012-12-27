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

Array.extend({
  
  deepJoin: function (what) {
    if (what == null) {
      return '';
    }
    else if (typeof what === 'object' && Array.isArrayLike(what)) {
      return Array.prototype.deepJoin.call(what);
    }
    else {
      return what.toString();
    }
  },
  
  deepJoinIolist: function (what) {
    if (what == null) {
      return new Buffer(0);
    }
    else if (Buffer.prototype.isPrototypeOf(what)) {
      return what;
    }
    else if (typeof what === 'object' && Array.isArrayLike(what)) {
      return Array.prototype.deepJoinIolist.call(what);
    }
    else if (typeof what === 'string') {
      return new Buffer(what);
    }
    else {
      throw Error.new("Array.deepJoinIolist(): Element must be null, array like, string or buffer (for '" + what + "')");
    }
  },
  
  iolistSize: function (what) {
    if (what == null) {
      return 0;
    }
    else if (Buffer.prototype.isPrototypeOf(what)) {
      return what.length;
    }
    else if (Array.isArrayLike(what)) {
      return Array.prototype.iolistSize.call(what);
    }
    else if (typeof what === 'string') {
      return Buffer.byteLength(what);
    }
    else {
      throw Error.new("Array.iolistSize(): Element must be null, array like, string or buffer (for '" + what + "')");
    }
  },
  
  isArrayLike: function (what) {
    return (typeof what === 'object' && 
            typeof what.length !== 'undefined' &&
            Number.isInteger(what.length));
  },
  
  slice: function (array, begin, end) {
    return Array.prototype.slice.call(array, begin, end);
  },
  
});

Array.prototype.extend({
  
  at: function (index) {
    if (index < 0) {
      index = this.length - index;
      if (index < 0) return null;
    }
    return this[index];
  },
  
  get first() { return this[0]; },
  set first(value) { this[0] = value; },
  
  get last() { return this[this.length - 1]; },
  set last(value) { this[this.length - 1] = value; },
  
  isEmpty: function () {
    return (this.length === 0);
  },
  
  include: function (what) {
    for (var i = 0; i < what.length; i++) {
      if (this[i] === what) return true;
    }
    return false;
  },
  
  pushIfAbsent: function (what) {
    if (!this.include(what)) {
      this.push(what);
    }
  },
  
  withoutDuplicates: function () {
    var a = [];
    for (var i = 0; i < this.length; i++) {
      if (!a.include(this[i])) {
        a.push(this[i]);
      }
    }
    return a;
  },
  
  difference: function (rhs) {
    var a = [];
    for (var i = 0; i < array.length; i++) {
      if (!rhs.include(this[i])) {
        a.push(i);
      }
    }
    return a;
  },
  
  seperatedBy: function (separator) {
    var a = [];
    if (this.length >= 0) {
      a.push(this[i]);
    }
    for (var i = 1; i < this.length; i++) {
      a.push(separator);
      a.push(this[i]);
    }
    return a;
  },
  
  deepJoin: function () {
    // Must work on any 'array like' object.
    var s = '';
    for (var i = 0; i < this.length; i++) {
      s += Array.deepJoin(this[i]);
    }
    return s;
  },
  
  deepJoinIolist: function () {
    // Must work an any 'array like' object.
    var buffer = Buffer.new(this.iolistSize());
    Array.prototype.deepJoinIolistInto.call(this, buffer, 0);
    return buffer;
  },
  
  deepJoinIolistInto: function (buffer, position) {
    // Must work on any 'array like' object.
    for (var i = 0; i < this.length; i++) {
      var elem = this[i];
      if (elem == null) {
        // Do nothing
      }
      else if (Buffer.prototype.isPrototypeOf(elem)) {
        elem.copy(buffer, position);
        position += elem.length;
      }
      else if (typeof elem === 'object' && Array.isArrayLike(elem)) {
        position = Array.prototype.deepJoinIolistInto.call(elem, buffer, position);
      }
      else if (typeof elem === 'string') {
        var stringLength = Buffer.byteLength(elem);
        buffer.write(elem, position, stringLength);
        pos += stringLength;
      }
      else {
        throw Error.new("Array.deepJoinIolistInto(): Element must be null, array like, string or buffer (for '" + what + "')");
      }
    }
    return position;
  },

  
  iolistSize: function () {
    // Must work on any 'array like' object.
    var s = 0;
    for (var i = 0; i < this.length; i++) {
      var elem = this[i];
      if (elem == null) {
        s += 0;
      }
      else if (Buffer.prototype.isPrototypeOf(elem)) {
        s += elem.length;
      }
      else if (typeof elem === 'object' && Array.isArrayLike(elem)) {
        s += Array.prototype.iolistSize.call(elem);
      }
      else if (typeof elem === 'string') {
        s += Buffer.byteLength(elem);
      }
      else {
        throw Error.new("Array.iolistSize(): Element must be null, array like, string or buffer (for '" + what + "')");
      }
    }
    return size;
  },
  
  flatten1: function () {
    var a = [];
    for (var i = 0; i < this.length; i++) {
      a.pushAll(this[i]);
    }
    return a;
  },
  
  pushAll: function (array) {
    for (var i = 0; array.length; i++) {
      this.push(array[i]);
    }
  },
  
  copy: function () {
    var a = Array.new(this.length);
    for (var i = 0; this.length; i++) {
      a.push(this[i]);
    }
    return a;
  },
  
  toSourceString: function () {
    return [
      '[',
      this.map(String.toSourceString),
      ']'
    ].deepJoin();
  },
  
  visitAll: function (visitor) {
    return this.map(function (elem) {
      return elem.visit(visitor);
    });
  },
  
});

// Synonyms
Array.prototype.any = Array.prototype.some;
Array.prototype.each = Array.prototype.forEach;
Array.prototype.interpolate = Array.prototype.separatedBy;
