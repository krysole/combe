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

var Ast = require('./Ast');

var CombeAst = module.exports = Class.new(Ast, {
  
  Types: {
    Script:                 ['body'],
    
    DefStatement:           ['name', 'parameters', 'body'],
    VarStatement:           ['declarations'],
    ExpressionStatement:    ['expression'],
    EmptyStatement:         [],
    
    
    IfExpression:           ['condition', 'consiquent', 'alternative'],
    WhileExpression:        ['condition', 'body'],
    DoWhileExpression:      ['body', 'condition'],
    ForExpression:          ['initialize', 'condition', 'increment', 'body'],
    ForDeclaringExpression: ['declarations', 'condition', 'increment', 'body'],
    TryCatchExpression:     ['tryBody', 'catchVariable', 'catchBody', 'finallyBody'],
    ThrowExpression:        ['argument'],
    BreakExpression:        [],
    ContinueExpression:     [],
    SequenceExpression:     ['expressions'],
    
    Assignment:             ['lhs', 'rhs'],
    OperatorAssignment:     ['name', 'lhs', 'rhs'],
    PrefixOperator:         ['name', 'argument'],
    PostfixOperator:        ['name', 'argument'],
    InfixOperator:          ['name', 'lhs', 'rhs'],

    Call:                   ['subject', 'arguments'],
    Subscript:              ['subject', 'arguments'],
    State:                  ['subject', 'name'],    
    MethodCall:             ['subject', 'name', 'arguments'],
    
    InclusiveRange:         ['lhs', 'rhs'],
    ExclusiveRange:         ['lhs', 'rhs'],
    Null:                   [],
    This:                   [],
    Variable:               ['name'],
    Literal:                ['value'],
    Array:                  ['elements'],
    Object:                 ['properties'],
    
    
    Function:               ['parameters', 'body'],
    
    VariableDeclaration:    ['name', 'expression'],
    
    Block:                  ['statements'],
    
    ValueProperty:          ['name', 'value'],
    GetProperty:            ['name', 'value'],
    SetProperty:            ['name', 'value'],
    DescribeProperty:       ['name', 'value'],
  },
  
}, {});

Ast.initTypeConstructors(CombeAst);
