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
  
var Ecmascript5GlobalNames = [
  'NaN', 'Infinity', 'undefined', 'eval', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
  
  'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 
  
  'Object', 'Function', 'Array', 'String', 'Boolean', 'Number', 'Date', 'RegExp', 
  'Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError',
  'URIError',
  
  'Math', 'JSON'
];
  
var CombeGlobalNames = [
  'global'
];

var GlobalNames = CombeGlobalNames.concat(Ecmascript5GlobalNames);

var EmitJS = module.exports = Class.new(Object, {
  
  analyse: function (ast) {
    return ast.visit(this.new());
  },
  
}, {
  
  initialize: function () {
    this.scopeStack = [];
  },
  
  globalScope: {
    parent: null,
    variableNames: GlobalNames,
  },
  
  pushNewScope: function (ast) {
    var scope = {
      parent: this.scopeStack.last,
      variableNames: [],
    };
    if (ast != null) ast.scope = scope;
    this.pushScope(scope);
    return scope;
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
    this.pushNewScope(ast);
    ast.parent = this.globalScope;
    ast.globalScope = this.globalScope;
    
    ast.body.visit(this);
    
    this.popScope();
  },
  
  visitDeclareVariable: function (ast) {
    this.scope.variableNames.pushIfAbsent(ast.name);
  },
  
  visitFunction: function (ast) {
    this.pushNewScope(ast);
    
    ast.visitChildren(this);
    
    this.popScope();
  },
  
  visitParameter: function (ast) { // SplatParamter wraps a parameter also.
    this.scope.variableNames.pushIfAbsent(ast.name);
  },
  
});
