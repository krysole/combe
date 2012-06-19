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
    Noop: [],
    
    If: ['condition', 'consiquent', 'alternative'],
    TryCatch: ['tryblock', 'catchbinding', 'catchblock'],
    
    Var: ['name', 'rvalue'],
    
    Return: ['argument'],
    Throw: ['argument'],
    
    Or: ['lhs', 'rhs'],
    Xor: ['lhs', 'rhs'],
    And: ['lhs', 'rhs'],
    Not: ['argument'],
    
    Operator: ['opname', 'lhs', 'rhs'],
    PrefixOperator: ['opname', 'argument'],
    
    VariableAssignment: ['name', 'rvalue'],
    PropertyAssignment: ['object', 'name', 'rvalue'],
    
    VariableLookup: ['name'],
    PropertyLookup: ['object', 'name'],
    
    MethodCall: ['object', 'name', 'thisArgument', 'arguments'],
    Call: ['function', 'thisArgument', 'arguments'],
    Subscript: ['object', 'arguments'],
    
    ExpandArguments: ['argument'], // Arguments expansion
    
    Association: ['key', 'value'],
    Object: ['prototype', 'propertyDeclarations'],
    This: [],
    Null: [],
    Undefined: [],
    True: [],
    False: [],
    String: ['value'],
    Number: ['value'],
    
    Function: ['thisParameter', 'parameters', 'body'],
    
    ContractionParameter: ['name'],
    Parameter: ['name'],
    IgnoredParameter: [],
    
    ValuePropertyDeclaration: ['name', 'argument'],
    GetPropertyDeclaration: ['name', 'thisParameter', 'parameters', 'body'],
    SetPropertyDeclaration: ['name', 'thisParameter', 'parameters', 'body'],
    MethodPropertyDeclaration: ['name', 'thisParameter', 'parameters', 'body'],
    DescribePropertyDeclaration: ['name', 'argument'], // Takes Property Descriptor Map
  },
  
}, {
});

combe.Ast.initTypeConstructors(Ast);
