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

var CombeParser = require('./combe_parser');
var CombeASTChoiceConcatOptimization = require('./combe_ast_choice_concat_optimization');
var CombeASTTranslator = require('./combe_ast_translator');
var flattenIOList = require('./util').flattenIOList;

exports.BaseParser = require('./base_parser');
exports.BaseTextParser = require('./base_text_parser');
exports.ParseError = exports.BaseParser.ParseError;

exports.compileGrammar = function (source) {
  // Todo: Make these catch any error that occurs... (what error handling strategy
  // should I be using anyway?)
  var ast = (new CombeParser).match('combeFile', source);
  var ast1 = (new CombeASTChoiceConcatOptimization).translate(ast);
  var resultIOList = (new CombeASTTranslator).match('transform', ast1);
  var result = flattenIOList(resultIOList);
  return result;
};

exports.compileGrammarFile = function (filename, write) {
  if (write === true) {
    write = filename.replace(+, '.js');
  }
  
  var source = fs.readFileSync(filename, 'utf8');
  
  var code = exports.compileGrammar(source);
  if (code == null) {
    return null;
  }
  
  if (write) {
    fs.writeFileSync(write, code, 'utf8');
  }
  
  return code;
};
