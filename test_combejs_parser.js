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

var CombeJSLexer = require('./lib/combejs/combejs_lexer');
var CombeJSParser = require('./lib/combejs/combejs_parser');
var LexerParsingStream = require('./lib/combejs/lexer_parsing_stream');
var ParseError = require('./lib/combejs/base_parser').ParseError;
var fs = require('fs');
var inspect = require('util').inspect;

setTimeout(function () {
  var ast;
  var source = fs.readFileSync('./example.js', 'utf8');
  
  var lexerParsingStream = new LexerParsingStream(new CombeJSLexer, source);
  
  try {
    ast = (new CombeJSParser).matchAll('program', lexerParsingStream);
  } catch (error) {
    console.log(lexerParsingStream.$array.last().toString());
    throw error;
  }
  
  var output = inspect(ast, false, null);
  
  console.log(output);
  fs.writeFileSync('./example.ast', output, 'utf8');
}, 0);
