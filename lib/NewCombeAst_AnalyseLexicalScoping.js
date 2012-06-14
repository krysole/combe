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

var Ast = require('./NewCombeAst');

var NewCombeAst_AnalyseLexicalScoping = module.exports = Class.new(Object, {
  
  analyse: function (ast) {
    ast.visit(this.new());
  },
  
}, {
  
  initialize: function () {
    this.scope = null;
  },
  
  pushScope: function (ast) {
    this.scope = {
      parent: this.scope,
      variables: [],
      ast: ast
    };
    return this.scope;
  },
  
  popScope: function () {
    this.scope = this.scope.parent;
  },
  
  
  visitUnspecified: function (ast) {
    ast.visitChildren(this);
  },
  
  visitProgram: function (ast) {
    ast.lexicalScope = this.pushScope(ast);
    
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  visitFunctionDeclaration: function (ast) {
    if (ast.name) ast.lexicalScope.variables.push(ast.name);
    
    
    ast.lexicalScope = this.pushScope(ast);
    
    ast.lexicalScope.variables.pushAll(ast.parameters);
    
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  visitFunction: function (ast) {
    ast.lexicalScope = this.pushScope(ast);
    
    if (ast.name) ast.lexicalScope.variables.push(ast.name);
    
    ast.lexicalScope.variables.pushAll(ast.parameters);
    
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  visitRule: function (ast) {
    ast.lexicalScope = this.pushScope(ast);
    
    if (ast.name) ast.lexicalScope.variables.push(ast.name);
    
    ast.lexicalScope.variables.pushAll(ast.parameters);
    
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  
  visitGetPropertyDeclaration: function (ast) {
    ast.lexicalScope = this.pushScope(ast);
    
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  visitSetPropertyDeclaration: function (ast) {
    ast.lexicalScope = this.pushScope(ast);
    
    ast.lexicalScope.variables.push(ast.parameter);
    
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  
  visitVariableDeclaration: function (ast) {
    ast.lexicalScope.variables.pushIfAbsent(ast.name);
    
    ast.visitChildren(this);
  },
  
  
  visitBindPattern: function (ast) {
    ast.lexicalScope.variables.push(ast.name);
    
    ast.visitChildren(this);
  },
  
});
