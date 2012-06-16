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

var NewCombeAst = module.exports = Class.new(Ast, {
  
  Types: {
    Program:              ['statements'],
    
    
    FunctionDeclaration:  ['name', 'parameters', 'statements'],
    Function:             ['name', 'parameters', 'statements'],
    Rule:                 ['name', 'parameters', 'pattern'],
    
    
    BlockStatement:       ['statements'],
    VariableDeclarationStatement: ['declarations'],
    IfStatement:          ['condition', 'consiquent', 'alternative'],
    WhileStatement:       ['condition', 'body'],
    DoWhileStatement:     ['body', 'condition'],
    ForStatement:         ['initialization', 'condition', 'increment', 'body'],
    ForDeclaringStatement: ['declarations', 'condition', 'increment', 'body'],
    ForInStatement:       ['lvalue', 'subject', 'body'],
    SwitchStatement:      ['subject', 'clauses'],
    TryCatchStatement:    ['tryBlock', 'catchParameter', 'catchBlock', 'finallyBlock'],
    ThrowStatement:       ['expression'],
    ReturnStatement:      ['expression'],
    BreakStatement:       ['label'],
    ContinueStatement:    ['label'],
    DebuggerStatement:    [],
    LabelStatement:       ['label', 'body'],
    ExpressionStatement:  ['expression'],
    EmptyStatement:       [],
    
    CaseClause:           ['subject', 'statements'],
    DefaultClause:        ['statements'],
    
    VariableDeclaration:  ['name', 'expression'],
    
    
    CommaExpression:      ['expressions'],
    Assignment:           ['lvalue', 'rvalue'],
    OperatorAssignment:   ['operator', 'lvalue', 'rvalue'],
    Conditional:          ['condition', 'consiquent', 'alternative'],
    Delete:               ['expression'],
    Void:                 ['expression'],
    Typeof:               ['expression'],
    PrefixOperator:       ['name', 'expression'],
    PostfixOperator:      ['name', 'expression'],
    InfixOperator:        ['name', 'lhs', 'rhs'],
    
    New:                  ['constructor', 'arguments'],
    Call:                 ['function', 'arguments'],
    MethodCall:           ['subject', 'name', 'arguments'],
    Dot:                  ['subject', 'name'],
    Subscript:            ['subject', 'expression'],
    Variable:             ['name'],
    
    InclusiveRange:       ['lhs', 'rhs'],
    ExclusiveRange:       ['lhs', 'rhs'],
    Array:                ['elements'],
    Object:               ['propertyDeclarations'],
    Literal:              ['value'],
    This:                 [],
    
    RangeInfinity:        [],
    Elision:              [],
    
    ValuePropertyDeclaration: ['name', 'expression'],
    GetPropertyDeclaration:   ['name', 'statements'],
    SetPropertyDeclaration:   ['name', 'parameter', 'statements'],
    
    
    ChoicePattern:        ['patterns'],
    ConcatPattern:        ['patterns'],
    NotPattern:           ['pattern'],
    LookaheadPattern:     ['pattern'],
    TokenOperatorPattern: ['pattern'],
    
    AnythingPattern:      [],
    EmptyPattern:         [],
    
    BindPattern:          ['name', 'pattern'],
    
    StarPattern:          ['pattern'],
    PlusPattern:          ['pattern'],
    OptionalPattern:      ['pattern'],
    
    ApplyPattern:         ['pattern', 'arguments'],
    ApplyPatternArgumentsPattern: ['pattern', 'arguments'],
    
    PredicatePattern:     ['body'],
    ActionPattern:        ['body'],
    ImmediatePattern:     ['body'],
    
    NumberPattern:        ['value'],
    StringPattern:        ['value'],
    VariablePattern:      ['name'],
    
    
    ExpressionBody:       ['expression'],
    StatementsBody:       ['statements'],
  },
  
}, {});

Ast.initTypeConstructors(NewCombeAst);
