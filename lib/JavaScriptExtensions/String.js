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

var util = require('../util');


util.extend(String.prototype, {
  
  quote: function () {
    var c, i, l = this.length, o = '"';
    for (i = 0; i < l; i += 1) {
      c = this.charAt(i);
      if (c >= ' ') {
        if (c === '\\' || c === '"') {
          o += '\\';
        }
        o += c;
      }
      else {
        switch (c) {
        case '\b':
          o += '\\b';
          break;
        case '\f':
          o += '\\f';
          break;
        case '\n':
          o += '\\n';
          break;
        case '\r':
          o += '\\r';
          break;
        case '\t':
          o += '\\t';
          break;
        default:
          c = c.charCodeAt();
          o += '\\u00' + Math.floor(c / 16).toString(16) +
            (c % 16).toString(16);
        }
      }
    }
    return o + '"';
  },
  
  include: function (what) {
    return (this.indexOf(what) !== -1);
  },
  
  isKeyword: function () {
    return String.Keywords.include(this);
  },
  
  isFutureReservedWord: function () {
    return String.FutureReservedWords.include(this);
  },
  
  isReservedWord: function () {
    return String.ReservedWords.include(this);
  },
  
  isCompatabilityReservedWord: function () {
    return String.CompatabilityReservedWords.include(this);
  },
  
  lineColumnAt: function (index) {
    if (index < 0 || index > this.length) {
      throw new Error('Index out of range');
    }
    var line = 1, column = 1;
    for (var i = 0; i < index; i++) {
      if (this[i] === '\r' && this[i + 1] === '\n') {
        column += 1;
      }
      else if (this[i] === '\n' || this[i] === '\r') {
        line += 1;
        column = 1;
      }
      else {
        column += 1;
      }
    }
    return [line, column];
  },
  
  repeat: function (n) {
    var result = '';
    while (n--) {
      result += this;
    }
    return result;
  },
  
  toSourceString: function () {
    return this.quote();
  },
  
});

util.extend(String, {

  Keywords: [
    'break     do        instanceof  typeof',
    'case      else      new         var',
    'catch     finally   return      void',
    'continue  for       switch      while',
    'debugger  function  this        with',
    'default   if        throw',
    'delete    in        try'
  ].join(' ').split(' '),

  FutureReservedWords: [
    'class       enum    extends   super',
    'const       export  import',
    
    'implements  let     private   public  yield', // Strict mode
    'interface   package protected static'
  ].join(' ').split(' '),

  ReservedWords: null, // Defined after

  CompatabilityReservedWords: [
    'abstract boolean break byte case catch char class const continue', 
    'debugger default delete do double else enum export extends false final', 
    'finally float for function goto if implements import in instanceof int',
    'interface long native new null package private protected public return',
    'short static super switch synchronized this throw throws transient true',
    'try typeof var volatile void while with'
  ].join(' ').split(' '),
  
  fromCodepoint: function (codepoint) {
    if (codepoint > 0xFFFF) {
      codepoint -= 0x10000;
      return String.fromCharCode(
        0xD800 + (codepoint >> 10), 
        0xDC00 + (codepoint & 0x3FF));
    }
    else {
      return String.fromCharCode(codepoint);
    }
  },
  
});

String.ReservedWords = String.Keywords.concat(String.FutureReservedWords);
