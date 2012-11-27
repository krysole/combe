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
var combe = require('combe');

var BootstrapCompiler = module.exports = {
  
  compileFile: function (sourceFilename, destinationFilename) {
    // Todo...
  },
  
  compileScript: function (source, filename) {
    if (this.hasHashbangLine(source)) {
      source = this.removeHashbangLine(source);
      var hashbangLine = this.getHashbangLine(source);
    }
    
    var parser = CombeParser.new();
    parser.parseScript(source, filename);
    
    // Todo...
  },
  
  hashbangRegex: /^#![^\r\n]*(\r\n|\r|\n)/,
  
  hasHashbangLine: function (source) {
    return source.match(this.hashbangRegex) != null;
  },
  
  removeHashbangLine: function (source) {
    return source.replace(this.hashbangRegex, '');
  },
  
  getHashbangLine: function (source) {
    var hashbangLine = source.match(this.hashbangRegex);
    if (hashbangLine == null) {
      throw Error.new('No hashbang line found in string');
    }
    return hashbangLine;
  },
  
};
