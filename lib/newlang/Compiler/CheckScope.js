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

var EmitJS = module.exports = Class.new(Object, {
  
  analyse: function (ast) {
    return ast.visit(this.new());
  },
  
}, {
  
  initialize: function () {
    this.scopeStack = [];
  },
  
  pushScope: function (scope) {
    this.scopeStack.push(scope);
  },
  
  popScope: function () {
    return this.scopeStack.pop();
  },
  
  get scope() {
    return this.scopeStack.top();
  },
  
  variableExists: function (name) {
    var checkScope = function (scope) {
      if (scope.variableNames.include(name)) return true;
      if (scope.parent != null) return checkScope(scope.parent);
      return false;
    };
    return checkScope(this.scope);
  },
  
  visitUnspecified: function (ast) {
    ast.visitChildren(this);
  },
  
  visitFile: function (ast) {
    this.pushScope(ast.scope);
    
    ast.body.visit(this);
    
    this.popScope();
  },
  
  visitAssignment: function (ast) {
    if (!this.variableExists(ast.name)) {
      throw new Error('Variable not declared');
    }
  },
  
  visitLookup: function (ast) {
    if (!this.variableExists(ast.name)) {
      throw new Error('Variable not declared');
    }
  },
  
  visitFunction: function (ast) {
    this.pushScope(ast.scope);
    
    ast.visitChildren(this);
    
    this.popScope();
  },
  
});
