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
  combejs.compile(combeJSDir + '/JSLexer.combejs', 
                  combeJSDir + '/JSLexer.staging.js');
  combejs.compile(combeJSDir + '/JSParser.combejs', 
                  combeJSDir + '/JSParser.staging.js');
  combejs.compile(combeJSDir + '/CombeJSLexer.combejs', 
                  combeJSDir + '/CombeJSLexer.staging.js');
  combejs.compile(combeJSDir + '/CombeJSParser.combejs', 
                  combeJSDir + '/CombeJSParser.staging.js');
  
  console.log('- Moving new .js files into place');
  fs.renameSync(combeJSDir + '/JSLexer.staging.js', 
                combeJSDir + '/JSLexer.js');
  fs.renameSync(combeJSDir + '/JSParser.staging.js', 
                combeJSDir + '/JSParser.js');
  fs.renameSync(combeJSDir + '/CombeJSLexer.staging.js', 
                combeJSDir + '/CombeJSLexer.js');
  fs.renameSync(combeJSDir + '/CombeJSParser.staging.js', 
                combeJSDir + '/CombeJSParser.js');
  console.log('- Finished');
}, 0);
