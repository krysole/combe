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
var path = require('path');
var inspect = require('util').inspect;

var CombeLexer = require('./CombeLexer');
var CombeParser = require('./CombeParser');
var CombeAstToJS = require('./CombeAstToJS');

var BootstrapCompiler = module.exports = {
  
  shouldOutputIntermediates: false,
  
  verbose: true,
  
  compile: function (p) {
    p = path.resolve(p);
    if (fs.existsSync(p)) {
      if (path.extname(p) === '.combe') {
        this.compileFile(p);
      }
      else if (fs.statSync(p).isDirectory()) {
        this.compileDirectory(p);
      }
      else {
        throw Error.new('Expected source file to be directory or .combe file');
      }
    }
    else if (fs.existsSync(p + '.combe')) {
      if (fs.statSync(p + '.combe').isFile()) {
        this.compileFile(p + '.combe');
      }
      else {
        throw Error.new('Expected .combe path to be a file');
      }
    }
    else {
      throw Error.new('Expected source file to be directory or .combe file');
    }
  },
  
  compileDirectory: function (p) {
    var _this = this;
    assert(fs.statSync(p).isDirectory());
    
    this.log(p + ' (directory)');
    
    fs.readdirSync(p).sort().each(function (childname) {
      var fullChildname = path.join(p, childname);
      var s = fs.statSync(fullChildname);
      if (s.isDirectory() && !childname.match(/^\./)) {
        _this.compileDirectory(fullChildname);
      }
      else if (s.isFile() && path.extname(childname) === '.combe') {
        _this.compileFile(fullChildname);
      }
      else {
        // Do nothing
      }
    });
  },
  
  compileFile: function (filename) {
    var compiledName = filename.replace(/\.combe$/, '.combejs');
    if (fs.existsSync(compiledName) && 
        fs.statSync(compiledName).mtime > fs.statSync(filename).mtime) {
      // Compiled file does not need to be refreshed
      this.log(filename + ' (up to date)');
      return;
    }
    
    this.log(filename + ' (compiling)');
    
    var source = fs.readFileSync(filename, 'utf8');
    
    var hashbang = this.getHashbangLine(source);
    source = this.removeHashbangLine(source);
    
    var parser = CombeParser.new();
    parser.parseScript(source, filename);
    this.writeIntermediate(filename, 'tokens', parser.tokens);
    this.writeIntermediate(filename, 'ast', parser.ast);
    
    var jsiolist = CombeAstToJS.translateToIOList(parser.ast);
    this.writeIntermediate(filename, 'iolist', jsiolist);
    
    var jstext = Array.deepJoinIOList(jsiolist);
    
    var targetFilename = filename.replace(/\.combe$/, '.combejs');
    fs.writeFileSync(targetFilename, jstext);
  },
  
  log: function (message) {
    console.log(process.cmdname + ': ' + message);
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
