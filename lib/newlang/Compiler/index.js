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

var Parser = require('./Parser');
var AstToJS = require('./AstToJS');
var fs = require('fs');
var inspect = require('util').inspect;

var Compiler = module.exports = {
  
  compileAndCacheFile: function (filename) {
    var jsSource = this.compileFile(filename);
    var outputFilename = filename + '.js';
    fs.writeFileSync(outputFilename, jsSource);
    return jsSource;
  },
  
  compileFile: function (filename) {
    var ast = this.parseFile(filename);
    fs.writeFileSync(filename + '.ast~', inspect(ast, false, null));
    var jsSource = this.translateAst(ast);
    return jsSource;
  },
  
  parseFile: function (filename) {
    var source = fs.readFileSync(filename, 'utf8');
    return Parser.parseFile(source, filename);
  },
  
  translateAst: function (ast) {
    return AstToJS.translate(ast);
  },
  
};
