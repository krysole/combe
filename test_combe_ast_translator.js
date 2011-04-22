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

var combe = require('./lib/combejs');
var CombeASTTranslator = require('./lib/combejs/combe_ast_translator.js');
var fs = require('fs');
var flattenIOList = require('./lib/combejs/util').flattenIOList;

setTimeout(function () {
  var astString = fs.readFileSync('./choice_concat_optimized_ast_from_combejs', 'utf8');
  
  var ast = JSON.parse(astString);
  
  var translatedCodeIOList = (new CombeASTTranslator).match('transform', ast);
  
  var translatedCode = flattenIOList(translatedCodeIOList);
  
  fs.writeFileSync('./translated_code_from_combejs', translatedCode, 'utf8');
}, 0);
