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
require('./JavaScriptExtensions');

var CombeParser = require('./CombeParser');
var CombeAstToJSAst = require('./CombeAstToJSAst');
var JSAstToJS = require('./JSAstToJS');

var fs = require('fs');
var inspect = require('util').inspect;

var Compiler = module.exports = {
  
  compile: function (sourceFilename, destFilename, options) {
    if (options == null) options = {};
    if (typeof sourceFilename !== 'string' ||
        !sourceFilename.match(/\.combe$/i)) {
      throw new Error('Invalid source file name');
    }
    if (destFilename == null) {
      destFilename = sourceFilename.replace(/\.combe$/i, '.js');
    }
    
    var source = fs.readFileSync(sourceFilename, 'utf8');
    
    var combeAst = CombeParser.parseProgram(source);
    if (combeAst == null) throw new Error('Parse failed');
    
    if (options.dumpCombeAst) {
      var astFilename = typeof options.dumpCombeAst === 'string' ? options.dumpCodeAst : './_combeAst~';
      fs.writeFileSync(astFilename, inspect(combeAst, false, null), 'utf8');
    }
    
    var jsAst = CombeAstToJSAst.translate(combeAst);
    
    if (options.dumpJSAst) {
      var astFilename = typeof options.dumpJSAst === 'string' ? options.dumpJSAst : './_jsAst~';
      fs.writeFileSync(astFilename, inspect(jsAst, false, null), 'utf8');
    }
    
    var jsCode = JSAstToJS.translate(jsAst);
    if (jsCode == null) throw new Error('Translate JSAst to JS failed');
    
    fs.writeFileSync(destFilename, jsCode, 'utf8');
  },
  
};
