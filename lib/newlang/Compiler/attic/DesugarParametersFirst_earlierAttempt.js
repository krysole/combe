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
  
  visitUnspecified: function (ast) {
    ast.visitChildren(this);
    
    var ctor = Ast1[ast.type];
    var attrs = [];
    var attrnames = ast.childrenAttributes;
    for (var i = 0; i < attrnames.length; i++) {
      attrs.push(this.attrArgument(ast[attrnames[i]]));
    }
    ast.result = ctor.apply(Ast1, attrs);
  },
  
  
  visitIf: function (ast) { // [ condition, consiquent, alternative ]
    ast.visitChildren(this);
    
    var alternative = (
      ast.alternative != null
      ? ast.alternative.result
      : Ast1.Null()
    );
    
    ast.result = Ast1.If(
      ast.condition.result,
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
  
  
  visitMethodCall: function (ast) { // [ object, name, arguments ]
    // Todo: Implement...
  },
  
  visitSubscript: function (ast) { // [ object, arguments ]
    // Todo: Implement...
  },
  
  visitCall: function (ast) { // [ function, arguments ]
    // Todo: Implement...
  },
  
  
  visitArguments: function (ast) { // [ this, main, block, rvalue ]
    // Todo: Implement...
  },
  
  visitExpresionArgument: function (ast) { // [ argument ]
    // Todo: Implement...
  },
  
  visitBlockArgument: function (ast) { // [ argument ]
    // Todo: Implement...
  },
  
  
  
  visitParameters: function (ast) { // [ this, main, block, rvalue ]
    var parameters = [];
    var blockParameters = [];
    var simpleParameterCount = 0;
    var contractionParameterCount = 0;
    
    for (var i = 0; i < ast.main.length; i++) {
      if (ast.main[i].is('Parameter')) {
        simpleParameterCount++;
        parameters.push(ast.main[i]);
      }
      else if (ast.main[i].is('ContractionParameter')) {
        contractionParameters++;
        parameters.push(ast.main[i]);
      }
      else if (ast.main[i].is('IgnoredParameter')) {
        simpleParameterCount++;
        parameters.push(ast.main[i]);
      }
      else if (ast.main[i].is('BlockParameter')) {
        blockParameters.push(ast.main[i]);
      }
      else assert(false);
    }
    
    if (ast.rvalue != null) {
      if (blockParameters.length > 0) Error.new('Cannot combine block and assingnment parameters');
      
      simpleParameterCount++;
      parameters.push(ast.rvalue);
    }
    if (blockParameters.length === 1) {
      simpleParameterCount++;
      parameters.push(blockParameters[0]);
    }
    else if (blockParameters.length > 1) {
      throw Error.new('There can only be one block parameter');
    }
    
    if (contractionParameterCount > 1) {
      throw Error.new('There can only be one contraction parameter');
    }
    
    
    var prologue = [];
    var jsparams = [];
    
    if (ast.this != null) {
      if (ast.this.is('Parameter')) {
        prologue.push(
          Ast1.VariableDeclaration(ast.this.name, Ast1.This());
        );
      }
      else { // Ignored Parameter
        assert(ast.this.is('IgnoredParameter'));
      }
    }
    
    
    if (contractionParameterCount === 0) {
      // Simple parameters only
      
      var ignoredParameterGensymIndex = 0;
      
      for (var i = 0; i < parameters.length; i++) {
        if (parameters[i].is('Parameter') ||
            parameters[i].is('BlockParameter')) {
          jsparams.push(parameters[i].name);
        }
        else { // IgnoredParameter
          jsparams.push('__ignored' + ignoredParameterGensymIndex++);
        }
      }
    }
    else if (contractionParameterCount === 1 &&
             parameters.length > 0 && parameters.last.is('ContractionParameter')) {
      // Simple parameters + 'rest' contraction parameter
      
      var ignoredParameterGensymIndex = 0;
      
      for (var i = 0; i < parameters.length; i++) {
        if (parameters[i].is('Parameter') ||
            parameters[i].is('BlockParameter')) {
          jsparams.push(parameters[i].name);
        }
        else { // IgnoredParameter
          jsparams.push('__ignored' + ignoredParameterGensymIndex++);
        }
      }
      
      prologue.push(
        Ast1.VariableDeclaration(
          parameters.last.name,
          Ast1.MethodCall(
            Ast1.VariableLookup('Array'),
            'slice',
            [ Ast1.Number(simpleParameterCount) ]
          )
        )
      );
    }
    else {
      // Contraction parameter possibly between simple parameters
      
      var i = 0;
      var ignoredParameterGensymIndex = 0;
      
      for (; i < parameters.length; i++) {
        if (parameters[i].is('Parameter') ||
            parameters[i].is('BlockParameter')) {
          jsparams.push(parameters[i].name);
        }
        else if (parameters[i].is('IgnoredParameter')) {
          jsparams.push('__ignored' + ignoredParameterGensymIndex++);
        }
        else { // ContractionParameter
          break;
        }
      }
      
      var precedingSimpleParameterCount = i++;
      prologue.push(
        Ast1.VariableDeclaration(
          '__contractedParameterCount',
          Ast1.InfixOperator(
            '-', 
            Ast1.Call(
              Ast1.VariableLookup('__combe_length'),
              [ Ast1.VariableLookup('arguments') ]
            ),
            Ast1.Number(simpleParameterCount)
          )
        )
      );
      prologue.push(
        Ast1.VariableDeclaration(
          '__paramIndex',
          Ast1.Number(precedingSimpleParameterCount)
        )
      );
      
      for (; i < parameters.length; i++) {
        if (parameters[i].is('Parameter') ||
            parameters[i].is('BlockParameter')) {
          prologue.push(
            Ast1.VariableDeclaration(
              parameters[i].name,
              Ast1.Call(
                Ast1.VariableLookup('__combe_at'),
                [
                  Ast1.VariableLookup('arguments'),
                  Ast1.VariableLookup('__paramIndex')
                ]
              )
            )
          );
          prologue.push(
            Ast1.VariableAssignment(
              '__paramIndex',
              Ast1.InfixOperator(
                '+',
                Ast1.VariableLookup('__paramIndex'),
                Ast1.Number(1)
              )
            )
          );
        }
        else { // IgnoredParameter
          prologue.push(
            Ast1.VariableAssignment(
              '__paramIndex',
              Ast1.InfixOperator(
                '+',
                Ast1.VariableLookup('__paramIndex'),
                Ast1.Number(1)
              )
            )
          );
        }
      }
    }
    
    ast.jsparams = jsparams;
    ast.prologue = prologue;
  },
  
  visitContractionParameter: function (ast) { // [ name ]
    // Todo: Implement...
  },
  
  visitBlockParameter: function (ast) { // [ name ]
    // Todo: Implement...
  },
  
  visitParameter: function (ast) { // [ name ]
    // Todo: Implement...
  },
  
  visitIgnoredParameter: function (ast) { // [ ]
    // Todo: Implement...
  },
  
});
