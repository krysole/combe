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

var fs = require('fs');
var inspect = require('util').inspect;

var Parser = require('./Parser');
var Lexer = require('./Lexer');
var Pass1 = require('./Pass1');
var Ast1ToJS = require('./Ast1ToJS');

var Compiler = module.exports = {
  
  compileAndCacheFile: function (filename) {
    var jsSource = this.compileFile(filename);
    var outputFilename = filename + '.js';
    fs.writeFileSync(outputFilename, jsSource);
    return jsSource;
  },
  
  compileFile: function (filename) {
    var source = fs.readFileSync(filename, 'utf8');
    
    source = this.filterHashbangLine(source);
    
    // var tokens = Lexer.parseAllTokens(source, filename);
    // fs.writeFileSync(filename + '.tokens~', inspect(tokens, false, null));
    
    var ast = Parser.parseFile(source, filename);
    // fs.writeFileSync(filename + '.ast~', inspect(ast, false, null));
    
    var ast1 = Pass1.translate(ast);
    // fs.writeFileSync(filename + '.ast1~', inspect(ast1, false, null));
    
    var jsiolist = Ast1ToJS.translateToIOList(ast1);
    // fs.writeFileSync(filename + '.iolist~', inspect(jsiolist, false, null));
    
    var jstext = Array.deepJoinIOList(jsiolist);
    
    return jstext;
  },
  
  filterHashbangLine: function (source) {
    return source.replace(/^#![^\r\n]*(\r\n|\r|\n)/, '');
  },
  
};
