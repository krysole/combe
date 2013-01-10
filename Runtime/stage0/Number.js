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

Number.extend({
  
  isNumber: function (value) {
    return (typeof value === 'number');
  },
  
  isInteger: function (value) {
    return (typeof value === 'number' && value % 1 == 0);
  },
  
  isByte: function (value) { return isUInt8(value); },
  
  isIntN: function (value, bitrange) {
    if (bitrange > 32) throw new Error("Bitrange must be <= 32");
    var npot = Math.pow(2, bitrange);
    var min = -npot;
    var max = npot - 1;
    return (this.isInteger(value) &&
      value >= min && value <= max);
  },
  
  isUIntN: function (value, bitrange) {
    if (bitrange > 32) throw new Error("Bitrange must be <= 32");
    var npot = Math.pow(2, bitrange);
    var min = 0;
    var max = npot - 1
    return (this.isInteger(value) &&
      value >= min && value <= max);
  },
  
  MinInt8: -0x80,
  MaxInt8: 0x7f,
  
  MinUInt8: 0x00,
  MaxUInt8: 0xff,
  
  MinInt16: -0x8000,
  MaxInt16: 0x7fff,
  
  MinUInt16: 0x0000,
  MaxUint16: 0xffff,
  
  MinInt32: -0x80000000,
  MaxInt32: 0x7fffffff,
  
  MinUInt32: 0x00000000,
  MaxUInt32: 0xffffffff,
  
  isInt8: function (value) {
    return (this.isInteger(value) &&
      value >= this.MinInt8 && value <= this.MaxInt8);
  },
  
  isUInt8: function (value) {
    return (this.isInteger(value) &&
      value >= this.MinUInt8 && value <= this.MaxUInt8);
  },
  
  isInt16: function (value) {
    return (this.isInteger(value) &&
      value >= this.MinInt16 && value <= this.MaxInt16);
  },
  
  isUInt16: function (value) {
    return (this.isInteger(value) &&
      value >= this.MinUInt16 && value <= this.MaxUInt16);
  },
  
  isInt32: function (value) {
    return (this.isInteger(value) &&
      value >= this.MinInt32 && value <= this.MaxInt32);
  },
  
  isUInt32: function (value) {
    return (this.isInteger(value) &&
      value >= this.MinUInt32 && value <= this.MaxUInt32);
  },
  
}, {
  
  toSourceString: function () {
    return this.toString();
  },
  
});
