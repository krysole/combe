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
var CombeASTChoiceConcatOptimization = require('./lib/combejs/combe_ast_choice_concat_optimization');
var fs = require('fs');

setTimeout(function () {
  var astString = fs.readFileSync('./ast_from_combejs', 'utf8');
  
  var ast = JSON.parse(astString);
  
  var transformedAst = (new CombeASTChoiceConcatOptimization).match('transform', ast);
  
  fs.writeFileSync('./choice_concat_optimized_ast_from_combejs', JSON.stringify(transformedAst), 'utf8');
}, 0);
