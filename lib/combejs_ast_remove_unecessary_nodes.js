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

var Ast = require('./ast');


var CombeJSAstRemoveUnecessaryNodes = module.exports = Class.new(Object, {
  
  visit: function (ast) {
    var visitorFunction = this['visit' + ast.type];
    if (visitorFunction) {
      visitorFunction.call(this, ast);
    } else {
      this.visitUnknown(ast);
    }
  },
  
  visitUnknown: function (ast) {
    var synthesized = this.visitAll(ast.children);
  },
  
  visitAll: function (array) {
    var self = this;
    array.forEach(function (elem) {
      self.visit(elem);
    });
  },
  
  visitChoicePattern: function (ast) {
    ast.children = this.processChoiceChildren(ast);
  },
  
  processChoiceChildren: function (ast) {
    var children = [];
    for (var i = 0; i < ast.children.length; i++) {
      if (ast.children[i].type === "ChoicePattern") {
        children = children.concat(this.processChoiceChildren(ast.children[i]));
      } else {
        children.push(ast.children[i]);
        this.visit(ast.children[i]);
      }
    }
    return children;
  },
  
  visitConcatPattern: function (ast) {
    ast.children = this.processConcatChildren(ast);
  },
  
  processConcatChildren: function (ast) {
    var children = [];
    for (var i = 0; i < ast.children.length; i++) {
      if (ast.children[i].type === "ConcatPattern") {
        children = children.concat(this.processConcatChildren(ast.children[i]));
      } else {
        children.push(ast.children[i]);
        this.visit(ast.children[i]);
      }
    }
    return children;
  },
  
});
