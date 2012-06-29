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

var Ast1 = require('./Ast1');

var Ast1ToJS = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    ast.visit(this.new());
    
    return ast.result;
  },
  
}, {
  
  visitFile: function (ast) { // [ body ]
    // Todo
  },
  
  
  visitBlock: function (ast) { // [ statements ]
    // Todo
  },
  
  
  visitIf: function (ast) { // [ condition, consiquent, alternative ]
    // Todo
  },
  
  visitTryCatch: function (ast) { // [ tryblock, catchbinding, catchblock ]
    // Todo
  },
  
  
  visitFunction: function (ast) { // [ parameters, variables, body ]
    // Todo
  },
  
  
  visitThrow: function (ast) { // [ argument ]
    // Todo
  },
  
  
  visitVariableLookup: function (ast) { // [ name ]
    // Todo
  },
  
  visitVariableAssignment: function (ast) { // [ name, rvalue ]
    // Todo
  },
  
  
  visitPropertyLookup: function (ast) { // [ object, name ]
    // Todo
  },
  
  visitPropertyAssignment: function (ast) { // [ object, name, rvalue ]
    // Todo
  },
  
  
  visitMethodCall: function (ast) { // [ object, name, arguments ]
    // Todo
  },
  
  visitCall: function (ast) { // [ function, arguments ]
    // Todo
  },
  
  
  visitThis: function (ast) { // [ ]
    // Todo
  },
  
  visitNull: function (ast) { // [ ]
    // Todo
  },
  
  visitUndefined: function (ast) { // [ ]
    // Todo
  },
  
  visitTrue: function (ast) { // [ ]
    // Todo
  },
  
  visitFalse: function (ast) { // [ ]
    // Todo
  },
  
  visitString: function (ast) { // [ value ]
    // Todo
  },
  
  visitNumber: function (ast) { // [ value ]
    // Todo
  },
  
  
  visitPostIncrementedVariableLookup: function (ast) { // [ name ]
    // Todo
  },
  
  visitInfixOperator: function (ast) { // [ opname, lhs, rhs ]
    // Todo
  },
  
});
