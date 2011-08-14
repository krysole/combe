//
// Combe/JS - A Parsing Language for JavaScript
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

var JSAst = require('./JSAst');

var CombeAst = module.exports = Class.new(JSAst, {
  
  ExtraConstructorsMixin: {}
  
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

  ['ExpressionBody', 'expression'],
  ['StatementsBody', 'statements'],

  ['AstTemplate', 'body'],
  ['InterpolateExpression', 'body'],
  ['ExpandInterpolate', 'body'],
  ['InterpolateStatements', 'body'],
  ['InterpolateIdentifier', 'body'],
  
  ['DescribeProperty', 'name', 'expression'],
  
  ['RangeInfinity'],
  ['InclusiveRange', 'start', 'end'],
  ['ExclusiveRange', 'start', 'end'],
  
  ['Rule', 'name', 'argumentNames', 'pattern'],
  ['EmptyPattern'],
  ['ChoicePattern', 'patterns'],
  ['ConcatPattern', 'patterns'],
  ['ActionPattern', 'body'],
  ['PredicatePattern', 'body'],
  ['ImmediatePattern', 'body'],
  ['NotPattern', 'pattern'],
  ['LookaheadPattern', 'pattern'],
  ['TokenOperatorPattern', 'pattern'],
  ['AnythingPattern'],
  ['BindPattern', 'name', 'pattern'],
  ['RepeatPattern', 'pattern'],
  ['Repeat1Pattern', 'pattern'],
  ['OptionalPattern', 'pattern'],
  ['JSApplyPattern', 'pattern', 'arguments'],
  ['ApplyPattern', 'pattern', 'arguments'],
  ['NumberPattern', 'value'],
  ['StringPattern', 'value'],
  ['VariablePattern', 'name']
  
].each(function (elem) {
  var type = elem[0];
  var propertyNames = elem.slice(1);
  
  CombeAst.ExtraConstructorsMixin[type] = function () {
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

Object.extend(CombeAst, JSAst.ConstructorsMixin);
Object.extend(CombeAst, CombeAst.ExtraConstructorsMixin);
