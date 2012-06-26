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

var Ast2 = require('./Ast2');

var AstToJS = module.exports = Class.new(Object, {
  
  analyse: function (ast) {
    ast.visit(this.new());
  },
  
}, {
  
  initialize: function () {
    this.scopeStack = [{
      parent: null,
      variables: [],
    }];
  },
  
  declareVariable: function (name) {
    this.scope.variables.pushIfAbsent(name);
  },
  
  pushScope: function () {
    this.scopeStack.push({
      parent: this.scopeStack.last,
      variables: [],
    });
  },
  
  popScope: function () {
    return this.scopeStack.pop();
  },
  
  get scope() {
    return this.scopeStack.last;
  },
  
  
  visitUnspecified: function (ast) {
    ast.visitChildren(this);
  },
  
  visitFile: function (ast) {
    this.pushScope();
    
    ast.visitChildren(this);
    
    ast.variables = this.scope.variables;
    this.popScope();
  },
  
  visitFunction: function (ast) { // [ name, parameters, body ]
    this.pushScope();
    
    ast.visitChildren(this);
    
    ast.variables = this.scope.variables;
    this.popScope();
        
    if (ast.name != null) {
      this.declareVariable(ast.name);
    }
  },
  
  visitMethod: function (ast) { // [ object, name, parameters, body ]
    this.pushScope();
    
    ast.visitChildren(this);
    
    ast.variables = this.scope.variables;
    this.popScope();
  },
  
  visitVar: function (ast) { // [ name, rvalue ]
    this.declareVariable(ast.name);
    
    ast.visitChildren(this);
  },
  
  visitParameters: function (ast) { // [ this, main, rvalue ]
    if (ast.this != null) {
      this.declareVariable(ast.name);
    }
  },
  
});
