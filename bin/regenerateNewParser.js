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

var compile = require('lib/NewJSParser/Compiler').compile;

setTimeout(function () {
  console.log('* Compiling grammars to *.regen.js (in dir ' + combeJSDir + ')');
  console.log('  * JSLexer');
  compile(combeJSDir + '/NewJSParser/JSLexer.combejs', 
          combeJSDir + '/NewJSParser/JSLexer.regen.js');
  console.log('  * JSParser');
  compile(combeJSDir + '/NewJSParser/JSParser.combejs', 
          combeJSDir + '/NewJSParser/JSParser.regen.js');
  console.log('  * CombeLexer');
  compile(combeJSDir + '/NewJSParser/CombeLexer.combejs', 
          combeJSDir + '/NewJSParser/CombeLexer.regen.js');
  console.log('  * CombeParser');
  compile(combeJSDir + '/NewJSParser/CombeParser.combejs', 
          combeJSDir + '/NewJSParser/CombeParser.regen.js');
  
  console.log('* Moving new .js files into place');
  fs.renameSync(combeJSDir + '/NewJSParser/JSLexer.regen.js', 
                combeJSDir + '/NewJSParser/JSLexer.js');
  fs.renameSync(combeJSDir + '/NewJSParser/JSParser.regen.js', 
                combeJSDir + '/NewJSParser/JSParser.js');
  fs.renameSync(combeJSDir + '/NewJSParser/CombeLexer.regen.js', 
                combeJSDir + '/NewJSParser/CombeLexer.js');
  fs.renameSync(combeJSDir + '/NewJSParser/CombeParser.regen.js', 
                combeJSDir + '/NewJSParser/CombeParser.js');
  console.log('* Finished');
}, 0);
