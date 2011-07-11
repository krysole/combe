#!/usr/bin/env node
//
// Combe - A Parsing Language for JavaScript
//
// Copyright 2011 Lorenz Pretterhofer
// 
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

var path = require('path');
var fs = require('fs');

require.paths.unshift(path.normalize(path.dirname(__filename) + '/..'));

var combeJSDir = path.normalize(path.dirname(__filename) + '/../lib');

var combejs = require('combejs');

setTimeout(function () {
  console.log('- Compiling grammars to *.staging.js (in dir ' + combeJSDir + ')');
  combejs.compile(combeJSDir + '/JSParser/JSLexer.combejs', 
                  combeJSDir + '/JSParser/JSLexer.staging.js');
  combejs.compile(combeJSDir + '/JSParser/JSParser.combejs', 
                  combeJSDir + '/JSParser/JSParser.staging.js');
  combejs.compile(combeJSDir + '/Compiler/CombeJSLexer.combejs', 
                  combeJSDir + '/Compiler/CombeJSLexer.staging.js');
  combejs.compile(combeJSDir + '/Compiler/CombeJSParser.combejs', 
                  combeJSDir + '/Compiler/CombeJSParser.staging.js');
  
  console.log('- Moving new .js files into place');
  fs.renameSync(combeJSDir + '/JSParser/JSLexer.staging.js', 
                combeJSDir + '/JSParser/JSLexer.js');
  fs.renameSync(combeJSDir + '/JSParser/JSParser.staging.js', 
                combeJSDir + '/JSParser/JSParser.js');
  fs.renameSync(combeJSDir + '/Compiler/CombeJSLexer.staging.js', 
                combeJSDir + '/Compiler/CombeJSLexer.js');
  fs.renameSync(combeJSDir + '/Compiler/CombeJSParser.staging.js', 
                combeJSDir + '/Compiler/CombeJSParser.js');
  console.log('- Finished');
}, 0);
