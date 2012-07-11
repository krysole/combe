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
require('./JavaScriptExtensions');

var Ast = require('./CombeAst');

var CombeAst_SimplifyPatterns = module.exports = Class.new(Object, {
  
  analyse: function (ast) {
    ast.visit(this.new());
  },
  
}, {
  
  visitUnspecified: function (ast) {
    ast.visitChildren(this);
  },
  
  visitChoicePattern: function (ast) {
    ast.visitChildren(this);
    
    var patterns = [];
    ast.patterns.each(function (elem) {
      if (elem.is('ChoicePattern')) {
        patterns.pushAll(elem.patterns);
      }
      else {
        patterns.push(elem);
      }
    });
    ast.patterns = patterns;
  },
  
  visitConcatPattern: function (ast) {
    ast.visitChildren(this);
    
    var patterns = [];
    ast.patterns.each(function (elem) {
      if (elem.is('ConcatPattern')) {
        patterns.pushAll(elem.patterns);
      }
      else {
        patterns.push(elem);
      }
    });
    ast.patterns = patterns;
  },
  
});
