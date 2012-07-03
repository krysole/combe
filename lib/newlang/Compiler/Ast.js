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
    
    Sequence: ['statements'],
    
    If: ['condition', 'consiquent', 'alternative'],
    TryCatch: ['tryblock', 'catchbinding', 'catchblock'],
    While: ['condition', 'body'],
    DoWhile: ['body', 'condition'],
    
    Function: ['name', 'this', 'parameters', 'body'],
    Method: ['object', 'name', 'this', 'parameters', 'rvalue', 'body'],
    Block: ['this', 'parameters', 'body'],
    DeclareVariable: ['name', 'rvalue'],
    
    Return: ['argument'],
    Break: ['argument'],
    Continue: ['argument'],
    Throw: ['argument'],
    
    Or: ['lhs', 'rhs'],
    Xor: ['lhs', 'rhs'],
    And: ['lhs', 'rhs'],
    Not: ['argument'],
    
    InfixOperator: ['opname', 'lhs', 'rhs'],
    PrefixOperator: ['opname', 'argument'],
    
    VariableLookup: ['name'],
    VariableAssignment: ['name', 'rvalue'],
    
    PropertyLookup: ['object', 'name'],
    PropertyAssignment: ['object', 'name', 'rvalue'],
    
    MethodCall: ['object', 'name', 'this', 'arguments', 'block'], // 'rvalue'
    Subscript: ['object', 'arguments'], // 'rvalue'
    Call: ['function', 'this', 'arguments', 'block'], // !'rvalue'
    
    Association: ['key', 'value'],
    This: [],
    Null: [],
    Undefined: [],
    True: [],
    False: [],
    String: ['value'],
    Number: ['value'],
    
    ExpansionArgument: ['argument'],
    
    ContractionParameter: ['name'],
    IgnoredParameter: [],
    Parameter: ['name'],
  },
  
}, {
});

combe.Ast.initTypeConstructors(Ast);
