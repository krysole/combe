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
    While: ['condition', 'body'],
    DoWhile: ['body', 'condition'],
    Loop: ['body'],
    
    Let: ['name', 'rvalue'],
    Var: ['name', 'rvalue'],
    Def: ['name', 'parameters', 'body'],
    
    Procedure: ['parameters', 'body'],
    
    ContractionParameter: ['name'],
    Parameter: ['name'],
    IgnoredParameter: [],
    
    Return: ['argument'],
    Break: ['argument'],
    Continue: [],
    
    Or: ['lhs', 'rhs'],
    Xor: ['lhs', 'rhs'],
    And: ['lhs', 'rhs'],
    Not: ['argument'],
    
    MessageSend: ['receiver', 'selector', 'arguments'],
    LexicalMessageSend: ['selector', 'arguments'],
    ApplyMessageSend: ['receiver', 'arguments'],
    
    AssignmentMessageSend: ['message', 'rvalue'],
    Operator: ['opname', 'lhs', 'rhs'],
    PrefixOperator: ['opname', 'argument'],
    
    Association: ['key', 'value'],
    String: ['value'],
    Number: ['value'],
    
    OrderedMap: ['elements'],
    Array: ['elements'],
    Map: ['elements'],
    Set: ['elements'],
    
    Self: [],
    This: [], // Current lexical context
    
    Nil: [],
    True: [],
    False: [],
    
    Expansion: ['argument'],
  },
  
}, {
}),

combe.Ast.initTypeConstructors(Ast);
