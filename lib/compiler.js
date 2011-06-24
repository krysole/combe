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

var util = require('./util');
var fs = require('fs');
var CombeJSLexer = require('./combejs_lexer');
var CombeJSParser = require('./combejs_parser');
var CombeJSAstRemoveUnecessaryNodes = require('./combejs_ast_remove_unecessary_nodes');
var CombeJSAstAnalyseDeclare = require('./combejs_ast_analyse_declare');
var CombeJSAstToJSAst = require('./combejs_ast_to_js_ast');
var JSAstToJSSource = require('./js_ast_to_js_source');


var compile = exports.compile = function (sourceFile, destFile) {
  if (!destFile) {
    destFile = sourceFile.replace(/\.combejs$/i, '.js');
  }
  
  console.log("- Compiling '" + sourceFile + "' to '" + destFile + "'");
  var ast;
  var json;
  var source = fs.readFileSync(sourceFile, 'utf8');
  var parser = CombeJSParser.new();
  
  try {
    console.log('  - Parsing CombeJS source...');
    ast = parser.match('program', source);
    if (ast == null) throw new Error("Parser failed");
    
    console.log('  - Analyse and translate to JS AST...');
    CombeJSAstRemoveUnecessaryNodes.new().visit(ast);
    CombeJSAstAnalyseDeclare.new().visit(ast);
    CombeJSAstToJSAst.new().visit(ast);
  } catch (error) {
    var token = parser.$tokens.last();
    if (token) {
      console.log('Furthest token matched: ' + token.toString());
    } else {
      console.log('No tokens matched');
    }
    throw error;
  }
  
  // console.log('  - Writing ./ast~ ast dump...');
  // json = ast;
  // json = ast.toJSON();
  // var astOutput = util.inspect(json, false, null);
  // fs.writeFileSync('./ast~', astOutput, 'utf8');
  
  console.log('  - Translating JS AST to JS source...');
  var iolist = JSAstToJSSource.new().translate(ast);
  var jsOutput = util.flattenIOList(iolist);
  
  console.log('  - Writing to ' + destFile);
  fs.writeFileSync(destFile, jsOutput, 'utf8');
  
  console.log('- Done');
};