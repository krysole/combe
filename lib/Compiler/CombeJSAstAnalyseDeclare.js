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

var Ast = require('../Runtime').Ast;


var CombeJSAstAnalyseDeclare = module.exports = Class.new(Object, {

  visit: function (ast, inherited) {
    var visitorFunction = this['visit' + ast.type];
    if (!inherited) inherited = {};
    if (visitorFunction) {
      return visitorFunction.call(this, ast, inherited);
    }
    else {
      return this.visitUnknown(ast, inherited);
    }
  },

  visitUnknown: function (ast, inherited) {
    var synthesized = this.visitAll(ast.children, {});
    return {declare: this.collectDeclare(synthesized)};
  },

  visitAll: function (array, inherited) {
    var self = this;
    return array.map(function (elem) {
      return self.visit(elem, inherited);
    });
  },

  visitSetPropertyDeclaration: function (ast, inherited) {
    var synthesized = this.visitAll(ast.children, {});
    ast.declare = this.collectDeclare(synthesized).push(ast.name).excludeDuplicates();
    return {declare: []};
  },

  visitVariableDeclaration: function (ast, inherited) {
    var synthesized = this.visitAll(ast.children, {});
    return {declare: [ast.name]}
  },

  visitCatch: function (ast, inherited) {
    var synthesized = this.visitAll(ast.children, {});
    ast.declare = [ast.name].concat(this.collectDeclare(synthesized)).excludeDuplicates();
    return {declare: []};
  },

  visitFunctionExpression: function (ast, inherited) {
    var synthesized = this.visitAll(ast.children, {});
    ast.declare = this.collectDeclare(synthesized)
      .concat(ast.argumentNames)
      .concat(ast.name ? [ast.name] : [])
      .excludeDuplicates();
    return {declare: []};
  },

  visitFunctionDeclaration: function (ast, inherited) {
    var synthesized = this.visitAll(ast.children, {});
    ast.declare = this.collectDeclare(synthesized)
      .concat(ast.argumentNames)
      .excludeDuplicates();
    return {declare: [ast.name]};
  },

  visitRuleExpression: function (ast, inherited) {
    var synattrs = this.visit(ast.children[0], {});
    ast.declare = synattrs.declare
      .concat(ast.argumentNames)
      .concat(ast.name ? [ast.name] : [])
      .excludeDuplicates();
    return {declare: []};
  },

  visitRuleDeclaration: function (ast, inherited) {
    var synattrs = this.visit(ast.children[0], {});
    ast.declare = synattrs.declare
      .concat(ast.argumentNames)
      .excludeDuplicates();
    return {declare: [ast.name]};
  },

  visitClassExpression: function (ast, inherited) {
    var synthesized = this.visitAll(ast.children, {});
    ast.declare = this.collectDeclare(synthesized)
      .concat(ast.name ? [ast.name] : [])
      .excludeDuplicates();
    return {declare: []};
  },

  visitClassDeclaration: function (ast, inherited) {
    var synthesized = this.visitAll(ast.children, {});
    ast.declare = this.collectDeclare(synthesized)
      .excludeDuplicates();
    return {declare: [ast.name]};
  },

  visitBindPattern: function (ast, inherited) {
    var synattrs = this.visit(ast.children[0], {});
    return {declare: [ast.name].concat(synattrs.declare).excludeDuplicates()};
  },

  visitProgram: function (ast, inherited) {
    var synthesized = this.visitAll(ast.children, {});
    ast.declare = this.collectDeclare(synthesized);
    return {declare: []};
  },

  collectDeclare: function (array) {
    var declare = [];
    array.forEach(function (elem) {
      declare = declare.concat(elem.declare);
    });
    return declare.excludeDuplicates();
  },

});
