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

var fs = require('fs');
var compileGrammarFile = require('./lib/combejs').compileGrammarFile;

setTimeout(function () {
  compileGrammarFile('./lib/combejs/combe_parser.combejs',
                     './lib/combejs/combe_parser.js.regen');
  compileGrammarFile('./lib/combejs/combe_ast_idempotent.combejs', 
                     './lib/combejs/combe_ast_idempotent.js.regen');
  compileGrammarFile('./lib/combejs/combe_ast_choice_concat_optimization.combejs',
                     './lib/combejs/combe_ast_choice_concat_optimization.js.regen');
  compileGrammarFile('./lib/combejs/combe_ast_translator.combejs', 
                     './lib/combejs/combe_ast_translator.js.regen');
  
  // Now that all the files have been generated successfully we can move them into place
  fs.renameSync('./lib/combejs/combe_parser.js.regen', 
                './lib/combejs/combe_parser.js');
  fs.renameSync('./lib/combejs/combe_ast_idempotent.js.regen', 
                './lib/combejs/combe_ast_idempotent.js');
  fs.renameSync('./lib/combejs/combe_ast_choice_concat_optimization.js.regen', 
                './lib/combejs/combe_ast_choice_concat_optimization.js');
  fs.renameSync('./lib/combejs/combe_ast_translator.js.regen', 
                './lib/combejs/combe_ast_translator.js');
}, 0);
