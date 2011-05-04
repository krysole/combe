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
var JSLexer = require('./lib/combejs/jslexer');
var fs = require('fs');

setTimeout(function () {
  var CombeParser = combe.CombeParser;

  var source = fs.readFileSync('./example.js', 'utf8');

  // Todo: I've changed how the lexer operates, so it is no longer possible
  // to lex a .js file without also parsing it (this is because EcmaScripts's 
  // lexical structure is ambiguous). It should be possible if anytime the lexer
  // generates an unknown token, the programmer can disambiguate by hand perhaps,
  // where the disambiguation could be cached possibly...
  
  var tokens = (new JSLexer).match('allTokens', source);

  if (tokens.length === 0) {
    console.log('no tokens');
    return;
  }
  
  var output = '';
  var line = tokens[0].line;
  for (var i = 0; i < tokens.length; i++) {
    if (i !== 0) {
      output += ' ';
    }
    if (tokens[i].line !== line) {
      output += '\n';
      line = tokens[i].line;
    }
    output += tokens[i];
  }
  console.log(output);
  fs.writeFileSync('./example.tokens', output, 'utf8');
}, 0);
