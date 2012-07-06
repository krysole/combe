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

var Ast = require('./Ast');

var AnalyseReturnStatements = module.exports = Class.new(Object, {
  
  analyse: function (ast) {
    ast.visit(this.new());
  },
  
}, {
  
  initialize: function () {
    this.scopeStack = [];
  },
  
  pushScope: function (ast) {
    this.scopeStack.push(ast);
  },
  
  popScope: function () {
    return this.scopeStack.pop();
  },
  
  get scope() {
    return this.scopeStack.last;
  },
  
  get gensymIndexCount() {
    return this.fileAst.gensymIndexCount;
  },
  set gensymIndexCount(value) {
    this.fileAst.gensymIndexCount = value;
  },
  
  makeReturnGensymIndex: function () {
    return this.gensymIndexCount++;
  },
  
  
  visitUnspecified: function (ast) {
    ast.visitChildren(this);
  },
  
  
  visitFile: function (ast) {
    if (ast.gensymIndexCount == null) {
      ast.gensymIndexCount = 0;
    }
    this.fileAst = ast;
    
    ast.returnGensymIndex = this.makeReturnGensymIndex();
    
    this.pushScope(ast);
    
    ast.explicitReturns = [];
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  visitFunction: function (ast) {
    ast.returnGensymIndex = this.makeReturnGensymIndex();
    
    this.pushScope(ast);
    
    ast.explicitReturns = [];
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  visitMethod: function (ast) {
    ast.returnGensymIndex = this.makeReturnGensymIndex();
    
    this.pushScope(ast);
    
    ast.explicitReturns = [];
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  visitBlock: function (ast) {
    ast.returnGensymIndex = this.makeReturnGensymIndex();
    
    this.pushScope(ast);
    
    ast.explicitReturns = [];
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  
  visitReturn: function (ast) {
    for (var i = this.scopeStack.length - 1; i >= 0; i--) {
      var scope = this.scopeStack[i];
      if (!scope.is('Block')) {
        scope.explicitReturns.push(ast);
        ast.from = scope;
        break;
      }
    }
    
    ast.visitChildren(this);
  },
  
  visitBreak: function (ast) {
    for (var i = this.scopeStack.length - 1; i >= 0; i--) {
      var scope = this.scopeStack[i];
      if (scope.is('Block')) {
        scope.explicitReturns.push(ast);
        ast.from = scope;
        break;
      }
    }
    
    ast.visitChildren(this);
  },
  
  visitContinue: function (ast) {
    for (var i = this.scopeStack.length - 1; i >= 0; i--) {
      var scope = this.scopeStack[i];
      if (scope.is('Block')) {
        scope.explicitReturns.push(ast);
        ast.from = scope;
        break;
      }
    }
    
    ast.visitChildren(this);
  },
  
});
