//
// Combe - Improved JavaScript with Pattern Matching
//
// Copyright 2012 Lorenz Pretterhofer <krysole@alexicalmistake.com>
//
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
'use strict';
var combe = require('combe');

var Ast = require('./CombeAst');

var AnalyseScoping = module.exports = Class.new(Object, {
  
  analyse: function (ast) {
    ast.visit(this.new());
  },
  
}, {
  
  initialize: function () {
    this.scopes = [];
  },
  
  visitUnspecified: function (ast) {
    ast.visitChildren(this);
  },
  
  visitScript: function (ast) {
    this.scopes.push(ast);
    ast.variables = [];
    ast.declareVariables = [];
    
    if (ast.parameters != null) {
      if (typeof ast.parameters === 'string') ast.variables.push(ast.parameters);
      else ast.variables.pushAll(ast.parameters);
    }
    
    ast.visitChildren(this);
    
    ast.variables.pushAll(ast.declareVariables);
    
    this.scopes.pop();
  },
  
  visitBlock: function (ast) {
    this.scopes.push(ast);
    ast.variables = [];
    ast.declareVariables = [];
    
    if (ast.parameters != null) {
      if (typeof ast.parameters === 'string') ast.variables.push(ast.parameters);
      else ast.variables.pushAll(ast.parameters);
    }
    
    ast.visitChildren(this);
    
    ast.variables.pushAll(ast.declareVariables);
    
    this.scopes.pop();
  },
  
  visitRule: function (ast) {
    this.scopes.push(ast);
    ast.variables = [];
    ast.declareVariables = [];
    
    if (ast.parameters != null) {
      if (typeof ast.parameters === 'string') ast.variables.push(ast.parameters);
      else ast.variables.pushAll(ast.parameters);
    }
    
    ast.visitChildren(this);
    
    ast.variables.pushAll(ast.declareVariables);
    
    this.scopes.pop();
  },
  
  visitVariableDeclaration: function (ast) {
    assert(this.scopes.last.type === 'Block' ||
           this.scopes.last.type === 'Script');
    
    if (!this.scopes.last.variables.include(ast.name)) {
      this.scopes.last.declareVariables.pushIfAbsent(ast.name);
    }
    
    ast.visitChildren(this);
  },
  
  visitVariable: function (ast) {
    // Note: I could add a semantic variable exists check here, but right now
    // I still assume the global object should be used instead.
  },
  
  visitBindPattern: function (ast) {
    assert(this.scopes.last.type === 'Rule');
    
    if (!this.scopes.last.variables.include(ast.name)) {
      this.scopes.last.declareVariables.pushIfAbsent(ast.name);
    }
    
    ast.visitChildren(this);
  },
  
  visitVariablePattern: function (ast) {
    assert(this.scopes.last.type === 'Rule');
    
    ast.containingScope = this.scopes.last;
  },
  
});
