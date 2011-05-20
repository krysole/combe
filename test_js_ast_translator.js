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

var JSLexer = require('./lib/combejs/jslexer');
var JSParser = require('./lib/combejs/jsparser');
var JSAstTranslator = require('./lib/combejs/js_ast_translator');
var LexerParsingStream = require('./lib/combejs/lexer_parsing_stream');
var ParseError = require('./lib/combejs/base_parser').ParseError;
var fs = require('fs');
var inspect = require('util').inspect;
var util = require('./lib/combejs/util');

setTimeout(function () {
  var ast;
  var source = fs.readFileSync('./example.js', 'utf8');
  
  var lexerParsingStream = new LexerParsingStream(new JSLexer, source);
  
  try {
    ast = (new JSParser).matchAll('program', lexerParsingStream);
  } catch (error) {
    console.log(lexerParsingStream.$array.last().toString());
    throw error;
  }
  
  var iolist = (new JSAstTranslator).translate(ast);
  var output = util.flattenIOList(iolist);
  
  console.log(output);
  fs.writeFileSync('./example.out.js', output, 'utf8');
}, 0);
