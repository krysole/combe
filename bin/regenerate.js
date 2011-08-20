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

var combeDir = path.normalize(path.dirname(__filename) + '/../lib');

var compile = require('combe').compile;

setTimeout(function () {
  console.log('* Compiling grammars to *.regen.js (in dir ' + combeDir + ')');
  console.log('  * JSLexer');
  compile(combeDir + '/JSLexer.combe', 
          combeDir + '/JSLexer.regen.js');
  console.log('  * JSParser');
  compile(combeDir + '/JSParser.combe', 
          combeDir + '/JSParser.regen.js');
  console.log('  * CombeLexer');
  compile(combeDir + '/CombeLexer.combe', 
          combeDir + '/CombeLexer.regen.js');
  console.log('  * CombeParser');
  compile(combeDir + '/CombeParser.combe', 
          combeDir + '/CombeParser.regen.js');
  
  console.log('* Moving new .js files into place');
  fs.renameSync(combeDir + '/JSLexer.regen.js', 
                combeDir + '/JSLexer.js');
  fs.renameSync(combeDir + '/JSParser.regen.js', 
                combeDir + '/JSParser.js');
  fs.renameSync(combeDir + '/CombeLexer.regen.js', 
                combeDir + '/CombeLexer.js');
  fs.renameSync(combeDir + '/CombeParser.regen.js', 
                combeDir + '/CombeParser.js');
  console.log('* Finished');
}, 0);
