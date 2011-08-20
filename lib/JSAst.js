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

var JSAst = module.exports = Class.new(Object, {
  
  ConstructorsMixin: {}
  
}, {

  initialize: function (type, attributes) {
    this.type = type;
    if (attributes) {
      var attributeNames = Object.keys(attributes);
      for (var i = 0; i < attributeNames.length; i++) {
        this[attributeNames[i]] = attributes[attributeNames[i]];
      }
    }
  },

  is: function (typeString) {
    return this.type === typeString;
  },
  
  isAny: function (array) {
    return array.include(this.type);
  },

});

[
  ['This'],
  ['Variable', 'name'],
  ['Literal', 'value'],
  ['Array', 'elements'],
  ['Elision'],
  ['Object', 'properties'],
  ['ValueProperty', 'name', 'expression'],
  ['GetProperty', 'name', 'statements'],
  ['SetProperty', 'name', 'argumentName', 'statements'],
  ['Dot', 'receiver', 'name'],
  ['At', 'receiver', 'expression'],
  ['New', 'constructor', 'arguments'],
  ['Call', 'function', 'arguments'],
  ['CallMethod', 'receiver', 'name', 'arguments'],
  ['Postfix', 'operator', 'expression'],
  ['Prefix', 'operator', 'expression'],
  ['Operator', 'operator', 'left', 'right'],
  ['Delete', 'expression'],
  ['Void', 'expression'],
  ['Typeof', 'expression'],
  ['Ternary', 'condition', 'true', 'false'],
  ['Assignment', 'lvalue', 'rvalue'],
  ['OperatorAssignment', 'operator', 'lvalue', 'rvalue'],
  ['Sequence', 'expressions'],
  ['Function', 'name', 'argumentNames', 'statements'],
  
  ['ExpressionStatement', 'expression'],
  ['Block', 'statements'],
  ['Var', 'variables'],
  ['Empty'],
  ['If', 'condition', 'true', 'false'],
  ['DoWhile', 'body', 'condition'],
  ['While', 'condition', 'body'],
  ['For', 'initialize', 'condition', 'increment', 'body'],
  ['ForIn', 'lvalue', 'rvalue', 'body'],
  ['Continue', 'label'],
  ['Break', 'label'],
  ['Return', 'expression'],
  ['With', 'subject', 'body'],
  ['Switch', 'subject', 'clauses'],
  ['Label', 'name', 'body'],
  ['Throw', 'expression'],
  ['Try', 'block', 'catch', 'finally'],
  ['Debugger'],
  
  ['VariableDeclaration', 'name', 'expression'],
  
  ['ForVar', 'variables'],
  
  ['CaseClause', 'subject', 'statements'],
  ['DefaultClause', 'statements'],
  
  ['Catch', 'argumentName', 'block'],
  ['Finally', 'block'],
  
  ['FunctionDeclaration', 'name', 'argumentNames', 'statements'],
  
  ['Program', 'statements']
  
].each(function (elem) {
  var type = elem[0];
  var propertyNames = elem.slice(1);
  
  JSAst.ConstructorsMixin[type] = function () {
    if (arguments.length !== propertyNames.length) {
      throw new Error('Incorrect number of arguments for JSAst Type Constructor');
    }
    
    var ast = new JSAst(type);
    for (var i = 0; i < propertyNames.length; i++) {
      ast[propertyNames[i]] = arguments[i];
    }
    
    return ast;
  };
});

Object.extend(JSAst, JSAst.ConstructorsMixin);