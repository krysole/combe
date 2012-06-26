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

var combe = require('combe');

var Ast = module.exports = Class.new(combe.Ast, {
  
  Types: {
    File: ['body'],
    
    Block: ['statements'],
    
    If: ['condition', 'consiquent', 'alternative'],
    TryCatch: ['tryblock', 'catchbinding', 'catchblock'],
    
    Function: ['parameters', 'variables', 'body'],
    Method: ['object', 'name', 'function'],
    
    NonLocalReturn: ['index', 'argument'],
    Return: ['argument'],
    Throw: ['argument'],
    
    VariableLookup: ['name'],
    VariableAssignment: ['name', 'rvalue'],
    
    MethodCall: ['object', 'name', 'this', 'arguments'],
    Call: ['function', 'this', 'arguments'],
    
    This: [],
    Null: [],
    Undefined: [],
    True: [],
    False: [],
    String: ['value'],
    Number: ['value'],
    
    ExpansionArgument: ['argument'],
    // Normal arguments are unwrapped Ast nodes.
    
    ContractionParameter: ['name'],
    // IgnoredParameters are null and normal parameters are unwrapped strings.
  },
  
}, {
});

combe.Ast.initTypeConstructors(Ast);
