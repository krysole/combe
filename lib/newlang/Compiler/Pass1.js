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

var Ast1 = require('./Ast1');

var AnalyseLexicalScope = require('./AnalyseLexicalScope');

var Pass1 = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    AnalyseLexicalScope.analyse(ast);
    
    ast.visit(this.new());
    
    return ast.result;
  },
  
}, {
  
  attrArgument: function (value) {
    var self = this;
    
    if (value == null) {
      return null;
    }
    else if (Array.isArray(value)) {
      return value.map(function (elem) {
        return self.attrArgument(elem);
      });
    else if (typeof value === 'object' && value.result != null) {
      return value.result;
    }
    else {
      return value;
    }
  },
  
  ResultAst: Ast1, 
  
  visitUnspecified: function (ast) {
    ast.visitChildren(this);
    
    var ctor = this.ResultAst[ast.type];
    var attrs = [];
    var attrnames = ast.childrenAttributes;
    for (var i = 0; i < attrnames.length; i++) {
      attrs.push(this.attrArgument(ast[attrnames[i]]));
    }
    ast.result = ctor.apply(Ast1, attrs);
  },
  
  
  visitFile: function (ast) { // [ body ]
    ast.visitChildren(this);
    
    var func = Ast1.Function([], ast.variables, ast.body.result);
    ast.result = Ast1.File(func);
  },
  
  
  visitBlock: function (ast) { // [ statements ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Block(ast.statements.map(function (stmt) {
      return stmt.result;
    }));
  },
  
  
  visitIf: function (ast) { // [ condition, consiquent, alternative ]
    ast.visitChildren(this);
    
    var condition = Ast1.Call(
      Ast1.VariableLookup('__combe_ensureBoolean'),
      null,
      [ ast.condition.result ]
    );
    
    var alternative = (
      ast.alternative != null
      ? ast.alternative.result
      : Ast1.Null()
    );
    
    ast.result = Ast1.If(
      condition,
      ast.consiquent.result,
      alternative
    );
  },
  
  
  visitFunction: function (ast) { // [ name, parameters, body ]
    // Todo: Implement...
  },
  
  visitMethod: function (ast) { // [ object, name, parameters, body ]
    // Todo: Implement...
  },
  
  visitDeclareVariable: function (ast) { // [ name, rvalue ]
    ast.visitChildren(this);
    
    if (ast.rvalue != null) {
      ast.result = Ast1.VariableAssignment(ast.name, ast.rvalue.result);
    }
    else {
      ast.result = Ast1.Null()
    }
  },
  
  
  visitReturn: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    // Todo: Implement NonLocalReturn Analysis
    if (ast.isNonLocalReturn) {
      ast.result = Ast1.NonLocalReturn(ast.argument.result);
    }
    else {
      ast.result = Ast1.Return(ast.argument.result);
    }
  },
  
  
  visitOr: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    var rhs = Ast1.Function([], [], ast.rhs.result);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_or');,
      null,
      [ ast.lhs.result, rhs ]
    );
  },
  
  visitXor: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_xor'),
      null,
      [ ast.lhs.result, ast.rhs.result ]
    );
  },
  
  visitAnd: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    var rhs = Ast1.Function([], [], ast.rhs.result);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_and'),
      null,
      [ ast.lhs.result, rhs ]
    );
  },
  
  visitNot: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.VariableLookup('__combe_not'),
      null,
      [ ast.argument.result ]
    );
  },
  
  
  visitOperator: function (ast) { // [ opname, lhs, rhs ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.PropertyLookup(
        Ast1.VariableLookup('__combe_InfixOperators'),
        ast.opname
      ),
      null,
      [ ast.lhs.result, ast.rhs.result ]
    );
  },
  
  visitPrefixOperator: function (ast) { // [ opname, argument ]
    ast.visitChildren(this);
    
    ast.result = Ast1.Call(
      Ast1.PropertyLookup(
        Ast1.VariableLookup('__combe_PrefixOperators'),
        ast.opname
      ),
      null,
      [ ast.argument.result ]
    );
  },
  
  
  visitMethodCall: function (ast) { // [ object, name, arguments ]
    // Todo: Implement...
  },
  
  visitSubscript: function (ast) { // [ object, arguments ]
    // Todo: Implement...
  },
  
  visitCall: function (ast) { // [ function, arguments ]
    ast.visitChildren(this);
    
    // Todo: Exactly how in fuck am I going to distinguish between a function
    // that takes a block and one that doesn't? Are blocks just only allowed
    // in method calls (which would probably be ok?), or am I supposed to
    // check the function component of the call to make see if it's just a
    // name which could be mangled to name + '$block'?
    //
    // On another note... while assignment arguments are kind of easy since
    // they only apply to methods anyway (actually only apply to methods), 
    // the block arguments really kind of gunk up the approach in some ways...
    //
    // Perhaps I need to either consider them as a prepended normal argument
    // in all cases, without method renaming (in otherwords, remember if 
    // a function takes a initial function argument). This would actually
    // work, where programmers must remember about the block argument.
    //
    // Respectively, the code would be simpler in that I could remove all of
    // the special block argument handling since you could simply provide
    // it as a regular argument in the first argument position (which blocks
    // would be anyway).
    //
    // Lastly, in time I could replace this with the ability to pass maps
    // as the initial argument instead, with several named block or regular
    // arguments as required, and distinguishing is simply in that you just
    // check to see if it's a function or map and if it's a map, just look
    // for the 'defaultBlock' key.
    
    if (!ast.arguments.hasThisArgument &&
        !ast.arguments.hasExpansionArgument
  },
  
  
  visitAssociation: function (ast) { // [ key, value ]
    ast.visitChildren(this);
    
    ast.result = Ast1.MethodCall(
      Ast1.VariableLookup('__combe_Association'),
      'new',
      [
        key.result,
        key.result
      ]
    );
  },
  
  
  visitArguments: function (ast) { // [ this, main, block, rvalue ]
    ast.visitChildren(this);
    
    var args = [];
    var blockArgument = null;
    
    if (ast.block != null) {
      blockArgument = ast.block;
    }
    
    for (var i = 0; i < ast.main.length; i++) {
      if (ast.main[i].is('ExpansionArgument')) {
        ast.hasExpansionArgument = true;
        args.push(ast.main[i].result);
      }
      else if (ast.main[i].is('BlockArgument')) {
        if (blockArgument == null) {
          blockArgument = ast.main[i];
        }
        else {
          throw Error.new('Too many block arguments');
        }
      }
      else { // Normal argument (Expression ast of some kind)
        args.push(ast.main[i]);
      }
    }
    
    if (ast.rvalue) {
      if (blockArgument != null) {
        throw Error.new('Cannot have block block and assignment arguments');
      }
      args.push(ast.rvalue);
    }
    
    if (blockArgument != null) {
      args.unshift(blockArgument.result);
    }
    
    ast.hasAssignmentArgument = (ast.rvalue != null);
    ast.hasBlockArgument = (blockArgument != null);
    ast.hasThisArgument = (ast.this != null);
    ast.blockArgument = blockArgument.result;
    ast.simplifiedArguments = args;
  },
  
  visitExpansionArgument: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.result = Ast1.ExpansionArgument(ast.argument.result);
  },
  
  visitBlockArgument: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.result = ast.argument.result;
  },
  
  
  visitParameters: function (ast) { // [ this, main, rvalue ]
    ast.visitChildren(this);
    
    var params = [];
    var contractionParameterIndex = null;
    var blockParameter = null;
    
    for (var i = 0; i < ast.main.length; i++) {
      if (ast.main[i].is('ContractionParameter')) {
        if (contractionParameterIndex == null) {
          contractionParameterIndex = i;
          params.push(ast.main[i].result);
        }
        else {
          throw Error.new('Too many contraction parameters specified');
        }
      }
      else if (ast.main[i].is('Parameter') ||
               ast.main[i].is('IgnoredParameter')) {
        params.push(ast.main[i].result);
      }
      else if (ast.main[i].is('BlockParameter')) {
        if (blockParameter == null) {
          blockParameter = ast.main[i].result;
        }
        else {
          throw Error.new('Too many block parameters specified');
        }
      }
      else {
        throw Error.new('Unknown parameter AST node type');
      }
    }
    if (ast.rvalue != null) {
      assert(ast.rvalue.is('Parameter') || ast.rvalue.is('IgnoredParameter'));
      params.push(ast.rvalue.result);
    }
    
    
    if (blockParameter != null) {
      ast.hasBlockParameter = true;
      ast.blockParameter = blockParameter.result;
      params.unshift(blockParameter.result);
    }
    if (ast.rvalue != null) {
      ast.hasAssignmentParameter = true;
    }
    
    if (ast.hasAssignmentParameter && ast.hasBlockParameter) {
      throw Error.new('Cannot have both assignment and block parameters');
    }
    
    if (ast.this != null) {
      ast.this = ast.this.result;
    }
    ast.hasThisParameter = (ast.this != null);
    
    ast.simplifiedParameters = params;
  },
  
  visitContractionParameter: function (ast) { // [ name ]
    ast.result = Ast1.ContractionParameter(ast.name);
  },
  
  visitBlockParameter: function (ast) { // [ name ]
    ast.result = ast.name;
  },
  
  visitParameter: function (ast) { // [ name ]
    ast.result = ast.name;
  },
  
  visitIgnoredParameter: function (ast) { // [ ]
    ast.result = '__ignored';
  },
  
});
