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

require('./Object');

Object.extend(Array, {

  deepJoin: function (what) {
    if (what == null) {
      return '';
    }
    else if (Array.isArray(what)) {
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
    else if (Array.isArray(what)) {
      return what.deepJoinIOList();
    }
    else if (what instanceof Buffer) {
      return what;
    }
    else if (typeof what === 'string') {
      return new Buffer(what);
    }
    else if (typeof what === 'number') {
      return new Buffer(what.toString());
    }
    else {
      throw new Error("IOList cannot contain '" + what + "'");
    }
  },
  
  iolistSize: function (what) {
    if (what == null) {
      return 0;
    }
    else if (Array.isArray(what)) {
      return what.iolistSize();
    }
    else if (what instanceof Buffer) {
      return what.length;
    }
    else if (typeof what === 'string') {
      return Buffer.byteLength(what);
    }
    else if (typeof what === 'number') {
      return Buffer.byteLength(what.toString());
    }
    else {
      throw new Error("IOList cannot contain '" + what + "'");
    }
  },
  
  writeIOList: function (stream) {
    if (what == null) {
      // Do nothing
    }
    else if (Array.isArray(what)) {
      what.writeIOList(stream);
    }
    else if (what instanceof Buffer) {
      stream.write(what);
    }
    else if (typeof what === 'string') {
      stream.write(what);
    }
    else if (typeof what === 'number') {
      stream.write(what);
    }
    else {
      throw new Error("IOList cannot contain '" + what + "'");
    }
  },
  
  slice: function (arrayLike, from, to) {
    return Array.prototype.slice.call(arrayLike, from, to);
  },

});

Object.extend(Array.prototype, {

  __type: 'Array',

  at: function (index) {
    if (index < 0) {
      index = this.length - index;
    }
    return this[index];
  },

  get first() {
    return this[0];
  },
  set first(value) {
    this[0] = value;
  },

  get last() {
    return this[this.length - 1];
  },
  set last(value) {
    this[this.length - 1] = value;
  },

  isEmpty: function () {
    return (this.length === 0);
  },

  include: function (what) {
    return this.some(function (elem) {
      return (elem === what);
    });
  },
  
  pushIfAbsent: function (what) {
    if (!this.include(what)) {
      this.push(what);
    }
  },
  
  each: Array.prototype.forEach,

  excludeDuplicates: function () {
    var result = [];
    this.each(function (elem) {
      if (!result.include(elem)) {
        result.push(elem);
      }
    });
    return result;
  },

  difference: function (right) {
    var result = [];
    this.each(function (elem) {
      if (!right.include(elem)) {
        result.push(elem);
      }
    });
    return result;
  },

  interpolate: function (delimiter) {
    var result = [];
    this.each(function (elem) {
      if (result.length !== 0) {
        result.push(delimiter);
      }
      result.push(elem);
    });
    return result;
  },

  deepJoin: function () {
    return this.reduce(function (s, elem) {
      if (elem == null) {
        return s;
      }
      else if (Array.isArray(elem)) {
        return s + elem.deepJoin();
      }
      else {
        return s + elem.toString();
      }
    }, '');
  },
  
  iolistSize: function () {
    var size = 0;
    this.each(function (elem) {
      if (elem == null) {
        size += 0;
      }
      else if (Array.isArray(elem)) {
        size += elem.iolistSize();
      }
      else if (elem instanceof Buffer) {
        size += elem.length;
      }
      else if (typeof elem === 'string') {
        size += Buffer.byteLength(elem);
      }
      else if (typeof elem === 'number') {
        size += Buffer.byteLength(elem.toString());
      }
      else {
        throw new Error("IOList cannot contain '" + elem + "'");
      }
    });
    return size;
  },
  
  deepJoinIOList: function (buf, pos) {
    var buf = new Buffer(this.iolistSize());
    var pos = 0;
    this.deepJoinIOListInto(buf, pos);
    return buf;
  },
  
  deepJoinIOListInto: function (buf, pos) {
    this.each(function (elem) {
      if (elem == null) {
        // Do nothing
      }
      else if (Array.isArray(elem)) {
        pos = elem.deepJoinIOListInto(buf, pos); // Provides new starting position
      }
      else if (elem instanceof Buffer) {
        elem.copy(buf, pos);
        pos += elem.length;
      }
      else if (typeof elem === 'string') {
        var stringLength = Buffer.byteLength(elem);
        buf.write(elem, pos, stringLength);
        pos += stringLength;
      }
      else if (typeof elem === 'number') {
        var string = elem.toString();
        var stringLength = Buffer.byteLength(string);
        buf.write(string, pos, stringLength);
        pos += stringLength;
      }
      else {
        throw new Error("IOList cannot contain '" + elem + "'");
      }
    });
    return pos;
  },
  
  writeIOList: function (stream) {
    for (var i = 0; i < this.length; i++) {
      var elem = this[i];
      if (elem == null) {
        // Do nothing
      }
      else if (Array.isArray(elem)) {
        elem.writeIOList(stream);
      }
      else if (elem instanceof Buffer) {
        stream.write(elem);
      }
      else if (typeof elem === 'string') {
        stream.write(elem);
      }
      else if (typeof elem === 'number') {
        stream.write(elem);
      }
      else {
        throw new Error("IOList cannot contain '" + what + "'");
      }
    }
  },

  flatten1: function () {
    return this.reduce(function (array, elem) {
      return array.concat(elem);
    });
  },
  
  pushAll: function (array) {
    var self = this;
    array.each(function (elem) {
      self.push(elem);
    });
    return this;
  },
  
  copy: function () {
    return new Array(this.length).pushAll(this);
  },

  toSourceString: function () {
    var sourceStrings = [];
    for (var i = 0; i < this.length; i++) {
      sourceStrings.push(toSourceString(this[i]));
      if (!sourceStrings.last) return null;
    }
    return ['[', sourceStrings.interpolate(', '), ']'].deepJoin();
  },
  
  visitAll: function (visitor) {
    return this.map(function (elem) {
      return elem.visit(visitor);
    });
  },
  
  toJson: function () {
    return this.map(function (elem) {
      return Object.toJson(elem);
    });
  },
  
  pushByte: function (b) {
    if (Number.isByte(b))
      this.push(b);
    else
      throw new Error('Out of range');
  },
  
  pushInt8: function (n) {
    this.push(Buffer.fromInt8(n));
  },
  
  pushUInt: function (b) {
    this.pushByte(b);
  },
  
  pushInt16: function (n) { this.pushInt16BE(n); },
  pushUInt16: function (n) { this.pushUInt16BE(n); },
  
  pushInt16BE: function (n) { this.push(Buffer.fromInt16BE(n)); },
  pushUInt16BE: function (n) { this.push(Buffer.fromUInt16BE(n)); },
  
  pushInt16LE: function (n) { this.push(Buffer.fromInt16LE(n)); },
  pushUInt16LE: function (n) { this.push(Buffer.fromUInt16LE(n)); },
  
  pushInt32: function (n) { this.pushInt32BE(n); },
  pushUInt32: function (n) { this.pushUInt32BE(n); },
  
  pushInt32BE: function (n) { this.push(Buffer.fromInt32BE(n)); },
  pushUInt32BE: function (n) { this.push(Buffer.fromUInt32BE(n)); },
  
  pushInt32LE: function (n) { this.push(Buffer.fromInt32LE(n)); },
  pushUInt32LE: function (n) { this.push(Buffer.fromUInt32LE(n)); },
  
  pushFloat: function (n) { this.pushFloatBE(n); },
  
  pushFloatBE: function (n) { this.push(Buffer.fromFloatBE(n)); },
  pushFloatLE: function (n) { this.push(Buffer.fromFloatLE(n)); },
  
  pushDouble: function (n) { this.pushDoubleBE(n); },
  
  pushDoubleBE: function (n) { this.push(Buffer.fromDoubleBE(n)); },
  pushDoubleLE: function (n) { this.push(Buffer.fromDoubleLE(n)); },
  
  pushPaddingTo: function (what, boundary) {
    var size = Array.iolistSize(what);
    var pad = (boundary - size % boundary);
    if (pad === boundary) {
      this.push(what);
    }
    else {
      this.push(what);
      this.push(Buffer.cleared(pad));
    }
  },

});
