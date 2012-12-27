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

Buffer.extend({
  
  cleared: function (length) {
    return this.filled(0, length);
  },
  
  filled: function (what, length) {
    var buf = Buffer(length);
    buf.fill(what);
    return buf;
  },
  
  fromByte: function (n) { return this.fromUInt8(n); },
  
  fromInt8: function (n) {
    var buf = Buffer(1);
    buf.writeInt8(n, 0);
    return buf;
  },
  
  fromUInt8: function (n) {
    var buf = Buffer(1);
    buf.writeUInt8(n, 0);
    return buf;
  },
  
  fromInt16: function (n) { return this.fromInt16BE(n); },
  
  fromUInt16: function (n) { return this.fromUInt16BE(n); },
  
  fromInt16BE: function (n) {
    var buf = Buffer(2);
    buf.writeInt16BE(n, 0);
    return buf;
  },
  
  fromUInt16BE: function (n) {
    var buf = Buffer(2);
    buf.writeUInt16BE(n, 0);
    return buf;
  },
  
  fromInt16LE: function (n) {
    var buf = Buffer(2);
    buf.writeInt16LE(n, 0);
    return buf;
  },
  
  fromUInt16LE: function (n) {
    var buf = Buffer(2);
    buf.writeUInt16LE(n, 0);
    return buf;
  },
  
  fromInt32: function (n) { return this.fromInt32BE(n); },
  
  fromUInt32: function (n) { return this.fromUInt32BE(n); },
  
  fromInt32BE: function (n) {
    var buf = Buffer(4);
    buf.writeInt32BE(n, 0);
    return buf;
  },
  
  fromUInt32BE: function (n) {
    var buf = Buffer(4);
    buf.writeUInt32BE(n, 0);
    return buf;
  },
  
  fromInt32LE: function (n) {
    var buf = Buffer(4);
    buf.writeInt32LE(n, 0);
    return buf;
  },
  
  fromUInt32LE: function (n) {
    var buf = Buffer(4);
    buf.writeUInt32LE(n, 0);
    return buf;
  },
  
  fromFloat: function (f) { return this.fromFloatBE(f); },
  
  fromFloatBE: function (f) {
    var buf = Buffer(4);
    buf.writeFloatBE(f);
    return buf;
  },
  
  fromFloatLE: function (f) {
    var buf = Buffer(4);
    buf.writeFloatLE(f);
    return buf;
  },
  
  fromDouble: function (f) { return this.fromDouble(f); },
  
  fromDoubleBE: function (f) {
    var buf = Buffer(8);
    buf.writeDoubleBE(f);
    return buf;
  },
  
  fromDoubleLE: function (f) {
    var buf = Buffer(8);
    buf.writeDoubleLE(f);
    return buf;
  },
  
  fromString: function (s, encoding) { // Encoding defaults to 'utf8'
    var len = Buffer.byteLength(s, encoding);
    var buf = Buffer(len);
    buf.write(s, 0, len, encoding);
    return buf;
  },
  
  paddingToAlignment: function (what, alignment) {
    var size = Array.iolistSize(what);
    var pad = (alignment - (size % alignment)) % alignment;
    return Buffer.cleared(pad);
  },
  
});

Buffer.prototype.extend({
  
  // Big-endian/Network-endian by default
  writeInt16: function (n, offset, noAssert) { this.writeInt16BE(n, offset, noAssert); },
  writeUInt16: function (n, offset, noAssert) { this.writeUInt16BE(n, offset, noAssert); },
  writeInt32: function (n, offset, noAssert) { this.writeInt32BE(n, offset, noAssert); },
  writeUInt32: function (n, offset, noAssert) { this.writeUInt32BE(n, offset, noAssert); },
  
  clear: function () { this.fill(0); },
  
});
