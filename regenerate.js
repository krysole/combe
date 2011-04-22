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
  var combeParserText = compileGrammarFile('./lib/combejs/combe_parser.combejs');
  combeParserText = combeParserText.replace(/BaseParser/g, 'BaseTextParser');
  combeParserText = combeParserText.replace(/base_parser/g, 'base_text_parser');
  fs.writeFileSync('./lib/combejs/combe_parser.js', combeParserText, 'utf8');
//  compileGrammarFile('./lib/combejs/combe_ast_idempotent.combejs', './combe_ast_idempotent.js');
//  compileGrammarFile('./lib/combejs/combe_ast_choice_concat_optimizer.combejs', './combe_ast_choice_concat_optimizer.js');
//  compileGrammarFile('./lib/combejs/combe_ast_translator.combejs', './combe_ast_translator.js');
}, 0);
