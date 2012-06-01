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
    Break: [],
    Continue: [],
    
    Or: ['left', 'right'],
    Xor: ['left', 'right'],
    And: ['left', 'right'],
    Not: ['argument'],
    
    Operator: ['name', 'left', 'right'],
    PrefixOperator: ['name', 'argument'],
    Association: ['key', 'value'],
    
    VariableAssignment: ['name', 'rvalue'],
    MethodCallAssignment: ['receiver', 'name', 'arguments', 'rvalue'],
    
    MethodCall: ['receiver', 'name', 'arguments'],
    Call: ['function', '_this', 'arguments'],
    
    VariableLookup: ['name'],
    LookupPrototype: ['receiver'],
    
    Splat: ['argument'],
    
    // Todo: Add BindOperator to parser
    // BindOperator: ['receiver', 'name', 'arguments'],
    // BindOperatorParameter: ['index'],
    
    Null: [],
    True: [],
    False: [],
    This: [],
    Underscore: [], // Just Null by a different name.
    
    OrderedMap: ['elements'],
    Array: ['elements'],
    Map: ['elements'],
    Set: ['elements'],
    
    Function: ['parameters', 'body'],
    
    SplatParameter: ['parameter'],
    Parameter: ['name'],
    IgnoreParameter: [],
    
    // Todo: I think New should be replaced by a version that, while providing
    // object literal capabilities, does so without merely extending an object,
    // but rather expects the prototype object, with constructor already invoked.
    // The idea here being that you 'could' call the constructor still if needed,
    // but Combe/Newlang would keep Combe's existing Constructor.new convention, 
    // adding an Function.prototype.new and __combe.new counterparts.
    New: ['prototype', 'propertyDeclarations'],
    Extend: ['subject', 'propertyDeclarations'],
    Class: ['superclass', 'propertyDeclarations'],
    
    ConstantSlotPropertyDeclaration: ['name', 'value'],
    SlotPropertyDeclaration: ['name', 'value'],
    PrimitivePropertyDeclaration: ['name', 'value'],
    MethodPropertyDeclaration: ['name', 'parameters', 'body'],
    DoExpressionPropertyDeclaration: ['body'],
    
    Number: ['value'],
    String: ['value'],
  },
  
}, {
}),

combe.Ast.initTypeConstructors(Ast);
