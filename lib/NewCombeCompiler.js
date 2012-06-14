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

var NewCombeParser = require('./NewCombeParser');
var NewCombeAstToJSAst = require('./NewCombeAstToJSAst');
var JSAstToJS = require('./JSAstToJS');

var fs = require('fs');
var inspect = require('util').inspect;

var Compiler = module.exports = {
  
  compile: function (sourceFilename, destFilename) {
    if (options == null) options = {};
    if (typeof sourceFilename !== 'string' ||
        !sourceFilename.match(/\.combe$/i)) {
      throw new Error('Invalid source file name');
    }
    if (destFilename == null) {
      destFilename = sourceFilename.replace(/\.combe$/i, '.js');
    }
    
    var source = fs.readFileSync(sourceFilename, 'utf8');
    
    var ast = NewCombeParser.parseProgram(source);
    fs.writeFileSync(sourceFilename + '.ast~', inspect(ast, false, null));
    
    var jsast = CombeAstToJSAst.translate(ast);
    fs.writeFileSync(sourceFilename + '.jsast~', inspect(jsast, false, null));
    
    var js = JSAstToJS.translate(jsast);
    if (js == null) throw new Error('Translate JSAst to JS failed');
    
    fs.writeFileSync(destFilename, js);
  },
  
};
