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

Object.extend(Number, {
  
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

});

Object.extend(Number.prototype, {

  __type: 'Number',
  
  toSourceString: function () {
    return this.toString();
  },

});
