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
'use strict';

var fs = require('fs');
var inspect = require('util').inspect;

var Parser = require('./Parser');
var Lexer = require('./Lexer');
var Pass1 = require('./Pass1');
var Ast1ToJS = require('./Ast1ToJS');

var Compiler = module.exports = {
  
  outputIntermediate: function (sourceFilename, productName, product, options) {
    if (options != null) {
      if (options.all || options[productName]) {
        var outputFilename = sourceFilename + '.' + productName + '~';
        if (options[productName + 'Filename']) {
          outputFilename = options[productName + 'Filename'];
        }
        if (options[productName + 'Affix']) {
          ouputFilename = sourceFilename + options[productName + 'Affix'];
        }
        fs.writeFileSync(outputFilename, inspect(product, false, null));
      }
    }
  },
  
  compileFile: function (sourceFilename, outputFilename, intermediates) {
    var source = fs.readFileSync(sourceFilename, 'utf8');
    
    source = this.filterHashbangLine(source);
    
    var parser = Parser.new();
    parser.parseFile(source, sourceFilename);
    this.outputIntermediate(sourceFilename, 'tokens', parser.tokens, intermediates);
    this.outputIntermediate(sourceFilename, 'ast', parser.ast, intermediates);
    
    var ast1 = Pass1.translate(parser.ast);
    this.outputIntermediate(sourceFilename, 'ast1', ast1, intermediates);
    
    var jsiolist = Ast1ToJS.translateToIOList(ast1);
    this.outputIntermediate(sourceFilename, 'iolist', jsiolist, intermediates);
    
    var jstext = Array.deepJoinIOList(jsiolist);
    if (outputFilename != null) {
      fs.writeFileSync(outputFilename, jstext);
    }
    
    return jstext;
  },
  
  filterHashbangLine: function (source) {
    return source.replace(/^#![^\r\n]*(\r\n|\r|\n)/, '');
  },
  
};
