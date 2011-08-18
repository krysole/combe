#!/usr/bin/env node
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

var path = require('path');
require.paths.unshift(path.normalize(path.dirname(__filename) + '/..'));

var combejs = require('combejs');

var CombeParser = require('lib/NewJSParser/CombeParser');
var CombeAstToJSAst = require('lib/NewJSParser/CombeAstToJSAst');
var JSAstToJS = require('lib/NewJSParser/JSAstToJS');

var fs = require('fs');
var inspect = require('util').inspect;

setTimeout(function () {
  if (process.argv.length < 4) {
    console.error('Usage: combec sourceFile destFile');
    return;
  }
  
  var sourceFilename = process.argv[2];
  var destFilename = process.argv[3];
  
  var source = fs.readFileSync(sourceFilename, 'utf8');
  
  var combeAst = CombeParser.parseProgram(source);
  if (combeAst == null) throw new Error('Parse failed');
  
  fs.writeFileSync('ast~', inspect(combeAst, false, null), 'utf8');
  
  var jsast = CombeAstToJSAst.translate(combeAst);
  
  fs.writeFileSync('ast~', inspect(jsast, false, null), 'utf8');
  
  // var jscode = JSAstToJS.translate(jsast);
  // if (jscode == null) throw new Error('Translate JSAst to JS failed');
  
  // fs.writeFileSync(destFilename, jscode, 'utf8');
}, 0);
