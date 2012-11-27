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

var Ast = combe.Ast;

var CombeAst = module.exports = Class.new(Ast, {
  
  Types: {
    Script:                 ['statements'],
    
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
    ReturnExpression:       ['argument'],
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
