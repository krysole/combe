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

String.extend({

  JavaScriptKeywords: [
    'break     do        instanceof  typeof',
    'case      else      new         var',
    'catch     finally   return      void',
    'continue  for       switch      while',
    'debugger  function  this        with',
    'default   if        throw',
    'delete    in        try'
  ].join(' ').split(' '),

  JavaScriptFutureReservedWords: [
    'class       enum    extends   super',
    'const       export  import',
  
    'implements  let     private   public  yield', // Strict mode
    'interface   package protected static'
  ].join(' ').split(' '),

  JavaScriptReservedWords: null, // Defined after

  JavaScriptCompatabilityReservedWords: [
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
  
  gensym: function (string, length) {
    if (length == 0) length = 12;
    return string + '_' + Math.randomIdentifier(8);
  },
  
  rtGensym: function (string, length) {
    if (String.rtOrdinal == null) String.rtOrdinal = 0;
    if (string == null || string.length <= 0) string = 'gensym';
    if (length == null) {
      return string + '_' + (String.rtOrdinal++);
    }
    else {
      return string + '_' + (String.rtOrdinal++) + '_' + String.randomIdentifier(length);
    }
  },
  
  randomIdentifier: function (length) {
    if (length == 0) length = 0;
    var alphabet = '_0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var initialAlphabet = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var buf = [];
    buf.push(initialAlphabet[Math.randomInteger(0, initialAlphabet.length)]);
    for (var i = 1; i < length; i++) {
      buf.push(alphabet[Math.randomInteger(0, alphabet.length)]);
    }
    return buf.join('');
  },
  
  toSourceString: function (what) {
    if (what === null) {
      return 'null';
    }
    else if (what === undefined) {
      return 'undefined';
    }
    else {
      return what.toSourceString();
    }
  },
  
}, {
  
  toSourceString: function () {
    return this.quote();
  },
  
  isJavaScriptKeyword: function () {
    return String.JavaScriptKeywords.include(this);
  },
  
  isJavaScriptFutureReservedWord: function () {
    return String.JavaScriptFutureReservedWords.include(this);
  },
  
  isJavaScriptReservedWord: function () {
    return String.JavaScriptReservedWords.include(this);
  },
  
  isJavaScriptCompatabilityReservedWord: function () {
    return String.JavaScriptCompatabilityReservedWord.include(this);
  },
  
  isCombeKeyword: function () {
    return String.CombeKeywords.include(this);
  },
  
  isJavaScriptIdentifier: function () {
    return (
      (this.match(/^[a-zA-Z_\$][a-zA-Z_\$0-9]*$/) != null) &&
      !this.isJavaScriptCompatabilityReservedWord()
    );
  },
  
  isJavaScriptPropertyName: function () {
    return (this.match(/^[a-zA-Z_\$][a-zA-Z_\$0-9]*$/) != null);
  },
  
  include: function (c) {
    return (this.indexOf(c) !== -1);
  },
  
  repeat: function (n) {
    var result = '';
    while (n-- > 0) {
      result += this;
    }
    return result;
  },
  
  lineColumn: function (index) {
    if (index < 0 || index > this.length) return [-1, 0];
    var line = 1, column = 1;
    for (var i = 0; i < index; i++) {
      if (this[i] === '\r') {
        if (this[i + 1] === '\n') i++;
        line++;
        column = 1;
      }
      else if ('\n\r\u2028\u2029'.include(this[i])) {
        line++;
        column = 1;
      }
      else {
        column++;
      }
    }
    return [line, column];
  },
  
  lineColumnString: function (index) {
    return this.lineColumn(index).join(':');
  },
  
  quote: function () {
    var result = '"';
    for (var i = 0; i < this.length; i++) {
      var c = this.charAt(i);
      if (c >= ' ') {
        if (c === '\\' || c === '"') {
          result += '\\';
        }
        result += c;
      }
      else {
        switch (c) {
        case '\b':
          result += '\\b';
          break;
        case '\f':
          result += '\\f';
          break;
        case '\n':
          result += '\\n';
          break;
        case '\r':
          result += '\\r';
          break;
        case '\t':
          result += '\\t';
          break;
        default:
          // Escape other ASCII control codes using '\u00__'
          var code = c.charCodeAt();
          result += '\\u00';
          result += ((code >> 4) & 0x0f).toString(16);
          result += (code & 0x0f).toString(16);
        }
      }
    }
    result += '"';
    return result;
  },
  
});

String.JavaScriptReservedWords = String.JavaScriptKeywords.concat(String.JavaScriptFutureReservedWords);
