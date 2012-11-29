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

var fs = require('fs');
var inspect = require('util').inspect;

var CombeLexer = require('./CombeLexer');
var CombeParser = require('./CombeParser');
var CombeAstToJS = require('./CombeAstToJS');

var BootstrapCompiler = module.exports = {
  
  shouldOutputIntermediates: false,
  
  compileFile: function (filename) {
    var source = fs.readFileSync(sourceFilename, 'utf8');
    
    var hashbang = this.getHashbangLine(source);
    source = this.removeHashbangLine(source);
    
    var parser = CombeParser.new();
    parser.parseScript(source, filename);
    this.writeIntermediate(filename, 'tokens', parser.tokens);
    this.writeIntermediate(filename, 'ast', parser.ast);
    
    var jsiolist = CombeAstToJS.TranslateToIOList(parser.ast);
    this.writeIntermediate(filename, 'iolist', jsiolist);
    
    var jstext = Array.deepJoinIOList(jsiolist);
    
    fs.writeFileSync(filename + '.js', jstext);
  },
  
  writeIntermediate: function (baseFilename, name, object) {
    if (this.shouldOutputIntermediates) {
      var filename = baseFilename + '.' + name + '~';
      var output = inspect(object, false, null);
      fs.writeFileSync(filename, output);
    }
  },
  
  hashbangRegex: /^#![^\r\n]*(\r\n|\r|\n)/,
  
  hasHashbangLine: function (source) {
    return source.match(this.hashbangRegex) != null;
  },
  
  removeHashbangLine: function (source) {
    return source.replace(this.hashbangRegex, '');
  },
  
  getHashbangLine: function (source) {
    return source.match(this.hashbangRegex);
  },
  
};
