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

var path = require('path');
require.paths.unshift(path.dirname(__filename) + '/lib');

var CombeJSLexer = require('combejs/newparser/combejs_lexer');
var CombeJSParser = require('combejs/newparser/combejs_parser');
var CombeJSAstAnalyseDeclare = require('combejs/combejs_ast_analyse_declare');
var CombeJSAstToJSAst = require('combejs/combejs_ast_to_js_ast');
var JSAstTranslator = require('combejs/js_ast_translator');
var LexerParsingStream = require('combejs/lexer_parsing_stream');
var BacktrackingException = require('combejs/backtracking_exception');
var util = require('combejs/util');
var fs = require('fs');
var inspect = require('util').inspect;

setTimeout(function () {
  var ast;
  var json;
  
  console.log('- Reading example.combejs');
  var source = fs.readFileSync('./example.combejs', 'utf8');
  
  console.log('- Creating lexerParsingStream');
  var lexerParsingStream = new LexerParsingStream(new CombeJSLexer, source);
  
  try {
    console.log('- Parsing...');
    parser = CombeJSParser.new();
    ast = parser.match('program', lexerParsingStream);
    
    console.log('- Translating CombeJSAst to JSAst');
    (new CombeJSAstAnalyseDeclare).visit(ast);
    (new CombeJSAstToJSAst).visit(ast);
    json = ast;
    json = ast.toJSON();
  } catch (error) {
    var token = lexerParsingStream.$array.last();
    if (token) {
      console.log(token.toString());
    } else {
      console.log("no token");
    }
    throw error;
  }
  
  console.log('- Writing AST to ./ast~');
  // var output = inspect(json, false, 30);
  var output = inspect(json, false, null);
  fs.writeFileSync('./ast~', output, 'utf8');
  
  console.log('- Translating JSAst to JS source code');
  var iolist = (new JSAstTranslator).translate(ast);
  var outjs = util.flattenIOList(iolist);
  
  console.log('- Writing JS source code');
  fs.writeFileSync('./example.js', outjs, 'utf8');
  
  console.log('- Done');
}, 0);