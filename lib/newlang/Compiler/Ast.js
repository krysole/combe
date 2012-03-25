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
    
    Sequence: ['expressions'],
    
    Return: ['argument'],
    DeclareVariable: ['name', 'rvalue'],
    If: ['condition', 'consiquent', 'alternative'],
    While: ['condition', 'body'],
    Loop: ['body'],
    
    Or: ['left', 'right'],
    Xor: ['left', 'right'],
    And: ['left', 'right'],
    Not: ['argument'],
    
    Operator: ['name', 'left', 'right'],
    PrefixOperator: ['name', 'argument'],
    Association: ['key', 'value'],
    
    Assignment: ['name', 'rvalue'],
    AssignmentMethodCall: ['subject', 'name', 'arguments', 'rvalue'],
    MethodCall: ['subject', 'name', 'arguments'],
    Call: ['function', 'arguments'],
    
    Splat: ['argument'],
    
    Null: [],
    True: [],
    False: [],
    This: [],
    Self: [],
    
    Lookup: ['name'],
    
    OrderedMap: ['elements'],
    Array: ['elements'],
    Map: ['elements'],
    Set: ['elements'],
    ObjectLiteral: ['properties'],
    
    Function: ['parameters', 'body'],
    SplatParameter: ['parameter'],
    Parameter: ['name'],
    IgnoreParameter: [],
    
    Number: ['value'],
  },
  
}, {
}),

combe.Ast.initTypeConstructors(Ast);
