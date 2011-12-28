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

var BufferCursor = Class.new(Object, {}, {
  
  initialize: function (buffer) {
    this.buffer = buffer;
    this.position = 0;
  },
  
  isEof: function () {
    return this.position >= this.buffer.length;
  },
  
  readByte: function () {
    return this.buffer.readUInt8(this.position++);
  },
  
  readInt8: function () {
    return this.buffer.readInt8(this.position++);
  },
  
  readUInt8: function () {
    return this.buffer.readUInt8(this.position++);
  },
  
  readInt16: function () { return this.readInt16BE(); },
  
  readUInt16: function () { return this.readUInt16BE(); },
  
  readInt16BE: function () {
    var result = this.buffer.readInt16BE(this.position);
    this.position += 2;
    return result;
  },
  
  readUInt16BE: function () {
    var result = this.buffer.readUInt16BE(this.position);
    this.position += 2;
    return result;
  },
  
  readInt16LE: function () {
    var result = this.buffer.readInt16LE(this.position);
    this.position += 2;
    return result;
  },
  
  readUInt16LE: function () {
    var result = this.buffer.readUInt16LE(this.position);
    this.position += 2;
    return result;
  },
  
  readInt32: function () { return this.readInt32BE(); },
  
  readUInt32: function () { return this.readUInt32BE(); },
  
  readInt32BE: function () {
    var result = this.buffer.readInt32BE(this.position);
    this.position += 4;
    return result;
  },
  
  readUInt32BE: function () {
    var result = this.buffer.readUInt32BE(this.position);
    this.position += 4;
    return result;
  },
  
  readInt32LE: function () {
    var result = this.buffer.readInt32LE(this.position);
    this.position += 4;
    return result;
  },
  
  readUInt32LE: function () {
    var result = this.buffer.readUInt32LE(this.position);
    this.position += 4;
    return result;
  },
  
  skip: function (nbytes) {
    this.position += nbytes;
  },
  
  align: function (alignment) {
    var pad = (alignment - (this.position % alignment)) % alignment;
    this.skip(pad);
  },
  
  readString: function (length, encoding) {
    if (encoding == null) encoding = 'utf8';
    var result = this.buffer.toString(encoding, this.position, this.position + length);
    this.position += length;
    return result;
  },
  
  read: function (length) {
    var result = Buffer(length);
    this.buffer.copy(result, 0, this.position, this.position + length);
    this.position += length;
    return result;
  },
  
  readBytes: function (length) {
    var result = Array(length);
    for (var i = 0; i < length; i++)
      result[i] = this.buffer[this.position + i];
    this.position += length;
    return result;
  },

});

Object.extend(Buffer, {
  
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

Object.extend(Buffer.prototype, {

  __type: 'Buffer',
  
  // Big-endian/Network-endian by default
  writeInt16: function (n, offset, noAssert) { this.writeInt16BE(n, offset, noAssert); },
  writeUInt16: function (n, offset, noAssert) { this.writeUInt16BE(n, offset, noAssert); },
  writeInt32: function (n, offset, noAssert) { this.writeInt32BE(n, offset, noAssert); },
  writeUInt32: function (n, offset, noAssert) { this.writeUInt32BE(n, offset, noAssert); },
  
  clear: function () { this.fill(0); },
  
  newCursor: function () { return BufferCursor(this); },

});
