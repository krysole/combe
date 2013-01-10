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
  
// Todo: Update Array to support negative indices.

global.IOListError = Error.subclass('IOListError');

Array.extend({
  
  deepJoin: function (what) {
    if (what == null) {
      return '';
    }
    else if (Array.isClassOf(what)) {
      return what.deepJoin();
    }
    else {
      return what.toString();
    }
  },
  
  deepJoinIOList: function (what) {
    if (what == null) {
      return new Buffer(0);
    }
    else if (Buffer.isClassOf(what)) {
      return what;
    }
    else if (Array.isClassOf(what)) {
      return what.deepJoinIOList();
    }
    else if (String.isClassOf(what)) {
      return new Buffer(what);
    }
    else {
      throw IOListError.new("Element must be array, string, buffer or null (given '" + what + "')");
    }
  },
  
  iolistSize: function (what) {
    if (what == null) {
      return 0;
    }
    else if (Buffer.isClassOf(what)) {
      return what.length;
    }
    else if (Array.isClassOf(what)) {
      return what.iolistSize();
    }
    else if (String.isClassOf(what)) {
      return Buffer.byteLength(what);
    }
    else {
      throw IOListError.new("Element must be array, string, buffer or null (given '" + what + "')");
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
  
}, {
  
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
  
  get top() { return this.last; },
  set top(value) { this.last = value; },
  
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
  
  separatedBy: function (separator) {
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
    var s = '';
    for (var i = 0; i < this.length; i++) {
      s += Array.deepJoin(this[i]);
    }
    return s;
  },
  
  deepJoinIOList: function () {
    var buffer = Buffer.new(this.iolistSize());
    this.deepJoinIOListInto(buffer, 0);
    return buffer;
  },
  
  deepJoinIOListInto: function (buffer, position) {
    for (var i = 0; i < this.length; i++) {
      var elem = this[i];
      if (elem == null) {
        // Do nothing
      }
      else if (Buffer.isClassOf(elem)) {
        elem.copy(buffer, position);
        position += elem.length;
      }
      else if (Array.isClassOf(elem)) {
        position = elem.deepJoinIOListInto(buffer, position);
      }
      else if (String.isClassOf(elem)) {
        var stringLength = Buffer.byteLength(elem);
        buffer.write(elem, position, stringLength);
        position += stringLength;
      }
      else {
        throw IOListError.new("Element must be array, string, buffer or null (given '" + what + "')");
      }
    }
    return position;
  },

  
  iolistSize: function () {
    var size = 0;
    for (var i = 0; i < this.length; i++) {
      var elem = this[i];
      if (elem == null) {
        size += 0;
      }
      else if (Buffer.isClassOf(elem)) {
        size += elem.length;
      }
      else if (Array.isClassOf(elem)) {
        size += elem.iolistSize();
      }
      else if (String.isClassOf(elem)) {
        size += Buffer.byteLength(elem);
      }
      else {
        throw IOListError.new("Element must be array, string, buffer or null (given '" + what + "')");
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
    for (var i = 0; i < array.length; i++) {
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
Array.prototype.any         = Array.prototype.some;
Array.prototype.each        = Array.prototype.forEach;
Array.prototype.interpolate = Array.prototype.separatedBy;
