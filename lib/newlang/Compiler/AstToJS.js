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

var Ast = require('./Ast');

var AnalyseLexicalScope = require('./AnalyseLexicalScope');

var AstToJS = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    AnalyseLexicalScope.analyse(ast);
    
    ast.visit(this.new());
    // require('fs').writeFileSync('.iolist~', require('util').inspect(ast.code, false, null));
    return Array.deepJoinIOList(ast.code);
  },
  
}, {
  
  processFunction: function (thisParameter, parameters, variables, body) {
    var pp = this.processParameters(thisParameter, parameters)
    parameters = pp.parameters.interpolate(', ');
    var prologue = pp.prologue;
    
    variables = ( variables.length > 0
      ? ['var ', variables.interpolate(', '), ';\n']
      : null
    );
    
    return [
      '__combe.catchReturn(function (', parameters, ') {\n',
        prologue,
        variables,
        'return ', body.code, ';\n',
      '})'
    ];
  },
  
  processParameters: function (thisParameter, parameters) {
    var simpleParameterCount = 0;
    var contractionParameterCount = 0;
    
    for (var i = 0; i < parameters.length; i++) {
      if (parameters[i].is('Parameter')) {
        simpleParameterCount++;
      }
      else if (parameters[i].is('ContractionParameter')) {
        contractionParameterCount++;
      }
      else if (parameters[i].is('IgnoredParamter')) {
        simpleParameterCount++;
      }
      else throw Error.new('Parameter not a valid parameter Ast type');
    }
    
    var prologue = [];
    var jsparams = [];
    
    if (thisParameter != null) {
      prologue.push('var ' + thisParameter + ' = this;\n');
    }
    
    if (contractionParameterCount === 0) {
      // No contraction paramaters, only simple parameters
      
      var ignoredParameterIndex = 0;
      
      for (var i = 0; i < parameters.length; i++) {
        if (parameters[i].is('Parameter')) {
          jsparams.push(parameters[i].name);
        }
        else { // IgnoredParameter
          jsparams.push('__ignored_' + ignoredParameterIndex++);
        }
      }
    }
    else if (contractionParameterCount === 1 &&
             parameters.last.is('ContractionParameter')) {
      // Rest arguments parameter
      
      var ignoredParameterIndex = 0;
      
      for (var i = 0; i < parameters.length - 1; i++) {
        if (parameters[i].is('Parameter')) {
          jsparams.push(parameters[i].name);
        }
        else { // IgnoredParameter
          jsparams.push('__ignored_' + ignoredParameterIndex++);
        }
      }
      
      prologue.push([
        'var ', parameters.last.name, ' = Array.slice(arguments, ', simpleParameterCount, ');\n'
      ]);
    }
    else {
      // Possibly multiple contraction parameters + simple parameters in tail position
      
      var firstContractionParameterIndex = 0;
      for (var i = 0; i < parameters.length; i++) {
        if (parameters[i].is('ContractionParameter')) {
          firstContractionParameterIndex = i;
          break;
        }
      }
      var precedingSimpleParameterCount = firstContractionParameterIndex;
      
      var trailingSimpleParameters = [];
      var trailingContractionParameters = [];
      for (var i = firstContractionParameterIndex + 1; i < parameters; i++) {
        if (parameter[i].is('Parameter')) {
          trailingSimpleParameters.push(parameter[i]);
        }
        else if (parameter[i].is('IgnoredParameter')) {
          trailingSimpleParameters.push(parameter[i]);
        }
        else { // ContractionParameter
          trailingContractionParameters.push(parameter[i]);
        }
      }
      
      var ignoredParameterIndex = 0;
      
      for (var i = 0; i < firstContractionParameter; i++) {
        if (parameters[i].is('Parameter')) {
          jsparams.push(parameters[i].name);
        }
        else { // IgnoredParameter
          jsparams.push('__ignored_' + ignoredParameterIndex++);
        }
      }
      
      prologue.push([
        'var __contractedArgumentCount = arguments.length - ', simpleParameterCount, ';\n',
        'var __trailingSimpleParameterIndex = ', precedingSimpleParameterCount, ' + __contractedArgumentCount;\n'
      ]);
      
      for (var i = 0; i < trailingSimpleParameters.length; i++) {
        if (trailingSimpleParameter[i].is('Parameter')) {
          prologue.push([
            'var ', trailingSimpleParameters[i].name, ' = arguments[__trailingSimpleParameterIndex++];\n'
          ]);
        }
        else { // IgnoredParameter
          prologue.push([
            '/* IgnoredParameter */ __trailingSimpleParameterIndex++;\n'
          ]);
        }
      }
      
      for (var i = 0; i < trailingContractionParameters.length; i++) {
        prologue.push([
          'var ', trailingContractionParameters[i], ' = [];\n'
        ]);
      }
    }
    
    return {
      prologue: prologue,
      parameters: jsparams
    };
  },
  
  
  visitFile: function (ast) { // [ body ]
    ast.visitChildren(this);
    
    ast.code = [
      '// Generated by Combe/Newlang\n',
      '\'use strict;\'\n',
      '\n',
      'module.exports = function (__combe) {\n',
        'return ', ast.body.code, ';\n',
      '};\n'
    ];
  },
  
  visitBlock: function (ast) { // [ statements ]
    ast.visitChildren(this);
    
    if (ast.statements.length === 0) {
      ast.code = 'null';
    }
    else if (ast.statements.length === 1) {
      ast.code = ast.statements[0].code;
    }
    else {
      ast.code = ['(function () {\n'];
      
      for (var i = 0; i < ast.statements.length - 1; i++) {
        ast.code.push([ast.statements[i].code, ';\n']);
      }
      ast.code.push(['return ', ast.statements.last.code, ';\n']);
      
      ast.code.push('})()');
    }
  },
  
  visitIf: function (ast) { // [ condition, consiquent, alternative ]
    ast.visitChildren(this);
    
    var alternative = (ast.alternative != null ? ast.alternative.code : 'null');
    
    ast.code = [
      '(function () {\n', 
        'if (__combe.ensureBoolean(', ast.condition.code, ')) {\n',
          'return ', ast.consiquent.code, ';\n',
        '}\n',
        'else {\n',
          'return ', alternative, ';\n',
        '}\n',
      '})()'
    ];
  },
  
  visitTryCatch: function (ast) { // [ tryblock, catchbinding, catchblock ]
    ast.visitChildren(this);
    
    ast.code = [
      '__combe.trycatch(function () {\n',
        'return ', ast.tryblock.code, ';\n',
      '}, function (', ast.catchbinding, ') {\n',
        'return ', ast.catchblock.code, ';\n',
      '})'
    ];
  },
  
  visitFunction: function (ast) { // [ object, name, thisParameter, parameters, body ]
    ast.visitChildren(this);
    
    ast.code = this.processFunction(
      ast.thisParameter, 
      ast.parameters, 
      ast.variables, 
      ast.body
    );
    
    if (ast.name != null) {
      ast.code = ['(', ast.name, ' = ', ast.code, ')'];
    }
  },
  
  visitMethod: function (ast) { // [ object, name, thisParameter, parameters, body ]
    ast.visitChildren(this);
    
    if (ast.thisParameter == null) {
      ast.thisParameter = 'self';
    }
    
    ast.code = this.processFunction(
      ast.thisParameter,
      ast.parameters,
      ast.variables,
      ast.body
    );
    
    ast.code = [
      '(', ast.object.code, '[', ast.name.value, '] = ', ast.code, ')'
    ];
  },
  
  visitVar: function (ast) { // [ name, rvalue ]
    ast.visitChildren(this);
    
    if (ast.rvalue != null) {
      ast.code = ['(', ast.name, ' = ', ast.rvalue.code, ')'];
    }
    else {
      ast.code = 'null';
    }
  },
  
  visitReturn: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.return(', ast.argument.code, ')'];
  },
  
  visitThrow: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.throw(', ast.argument.code, ')'];
  },
  
  visitOr: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.code = [
      '__combe.or(',
        'function () { return ', ast.lhs.code, '; }, ',
        'function () { return ', ast.rhs.code, '; }',
      ')'
    ];
  },
  
  visitXor: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.xor(', ast.lhs.code, ', ', ast.rhs.code, ')'];
  },
  
  visitAnd: function (ast) { // [ lhs, rhs ]
    ast.visitChildren(this);
    
    ast.code = [
      '__combe.and(',
        'function () { return ', ast.lhs.code, '; }, ',
        'function () { return ', ast.rhs.code, '; }',
      ')'
    ];
  },
  
  visitNot: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.not(', ast.argument.code, ')'];
  },
  
  visitOperator: function (ast) { // [ opname, lhs, rhs ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.binaryOperator(', ast.opname.quote(), ', ', ast.lhs.code, ', ', ast.rhs.code, ')'];
  },
  
  visitPrefixOperator: function (ast) { // [ opname, argument ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.prefixOperator(', ast.opname.quote(), ', ', ast.argument.code, ')'];
  },
  
  visitVariableAssignment: function (ast) { // [ name, rvalue ]
    ast.visitChildren(this);
    
    ast.code = ['(', ast.name, ' = ', ast.rvalue.code, ')'];
  },
  
  visitMethodCallAssignment: function (ast) { // [ object, name, thisArgument, arguments, rvalue ]
    ast.visitChildren(this);
    var name = ast.name.value + '$assignment';
    ast.arguments.push(ast.rvalue);
    
    var argumentExpansionCount = 0;
    for (var i = 0; i < ast.arguments; i++) {
      if (ast.arguments[i].is('ExpandArguments')) {
        argumentExpansionCount++;
      }
    }
    
    var hasSimpleName = name.match(/[a-zA-Z_$][a-zA-Z_$0-9]*/);
    
    if (hasSimpleName && argumentExpansionCount === 0 && ast.thisArgument == null) {
      // Simple method call, no this parameter
      
      var args = ast.arguments.map(function (argAst) { return argAst.code; });
      
      ast.code = [ast.object.code, '.', name, '(', args.interpolate(', '), ')'];
    }
    else if (hasSimpleName && argumentExpansionCount === 0) {
      // Simple method call, with thisParameter
      
      var args = [ast.thisArgument.code];
      args.pushAll(ast.arguments.map(function (argAst) { return argAst.code; }));
      args = args.interpolate(', ');
      
      ast.code = [ast.object.code, '.', name, '.call(', args, ')'];
    }
    else {
      // Build arguments array and use apply
      
      var thisArgument = (ast.thisArgument != null ? ast.thisArgument.code : 'null');
    
      var args = [
        '__combe.makeArray(', 
          ast.arguments.map(function (argAst) { return argAst.code; }).interpolate(', '), 
        ')'
      ];
    
      ast.code = [
        '__combe.applyMethod(', 
          ast.object.code, ', ', 
          name, ', ', 
          thisArgument, ', ', 
          args, 
        ')'
      ];
    }
  },
  
  visitSubscriptAssignment: function (ast) { // [ object, arguments, rvalue ]
    ast.visitChildren(this);
    
    ast.arguments.push(ast.rvalue);
    
    var argumentExpansionCount = 0;
    for (var i = 0; i < ast.arguments; i++) {
      if (ast.arguments[i].is('ExpandArguments')) {
        argumentExpansionCount++;
      }
    }
    
    if (argumentExpansionCount === 0) {
      // Simple method call, no this parameter
      
      var args = ast.arguments.map(function (argAst) { return argAst.code; });
      
      ast.code = [ast.object.code, '.subscript$assignment(', args.interpolate(', '), ')'];
    }
    else {
      // Build arguments array and use apply
    
      var args = [
        '__combe.makeArray(', 
          ast.arguments.map(function (argAst) { return argAst.code; }).interpolate(', '), 
        ')'
      ];
    
      ast.code = [
        '__combe.applyMethod(', 
          ast.object.code, ', ', 
          '"subscript$assignment", ',
          'null, ',
          args, 
        ')'
      ];
    }
  },
  
  visitVariableLookup: function (ast) { // [ name ]
    ast.visitChildren(this);
    
    ast.code = ast.name;
  },
  
  visitMethodCall: function (ast) { // [ object, name, thisArgument, arguments ]
    ast.visitChildren(this);
    
    var argumentExpansionCount = 0;
    for (var i = 0; i < ast.arguments; i++) {
      if (ast.arguments[i].is('ExpandArguments')) {
        argumentExpansionCount++;
      }
    }
    
    var hasSimpleName = ast.name.value.match(/[a-zA-Z_$][a-zA-Z_$0-9]*/);
    
    if (hasSimpleName && argumentExpansionCount === 0 && ast.thisArgument == null) {
      // Simple method call, no this parameter
      
      var args = ast.arguments.map(function (argAst) { return argAst.code; });
      
      ast.code = [ast.object.code, '.', ast.name.value, '(', args.interpolate(', '), ')'];
    }
    else if (hasSimpleName && argumentExpansionCount === 0) {
      // Simple method call, with thisParameter
      
      var args = [ast.thisArgument.code];
      args.pushAll(ast.arguments.map(function (argAst) { return argAst.code; }));
      args = args.interpolate(', ');
      
      ast.code = [ast.object.code, '.', ast.name.value, '.call(', args, ')'];
    }
    else {
      // Build arguments array and use apply
      
      var thisArgument = (ast.thisArgument != null ? ast.thisArgument.code : 'null');
    
      var args = [
        '__combe.makeArray(', 
          ast.arguments.map(function (argAst) { return argAst.code; }).interpolate(', '), 
        ')'
      ];
    
      ast.code = [
        '__combe.applyMethod(', 
          ast.object.code, ', ', 
          ast.name.code, ', ', 
          thisArgument, ', ', 
          args, 
        ')'
      ];
    }
  },
  
  visitSubscript: function (ast) { // [ object, arguments ]
    ast.visitChildren(this);
    
    var argumentExpansionCount = 0;
    for (var i = 0; i < ast.arguments; i++) {
      if (ast.arguments[i].is('ExpandArguments')) {
        argumentExpansionCount++;
      }
    }
    
    if (argumentExpansionCount === 0) {
      // Simple method call, no this parameter
      
      var args = ast.arguments.map(function (argAst) { return argAst.code; });
      
      ast.code = [ast.object.code, '.subscript(', args.interpolate(', '), ')'];
    }
    else {
      // Build arguments array and use apply
    
      var args = [
        '__combe.makeArray(', 
          ast.arguments.map(function (argAst) { return argAst.code; }).interpolate(', '), 
        ')'
      ];
    
      ast.code = [
        '__combe.applyMethod(', 
          ast.object.code, ', ', 
          '"subscript", ',
          'null, ',
          args, 
        ')'
      ];
    }
  },
  
  visitCall: function (ast) { // [ function, thisArgument, arguments ]
    ast.visitChildren(this);
    
    var argumentExpansionCount = 0;
    for (var i = 0; i < ast.arguments; i++) {
      if (ast.arguments[i].is('ExpandArguments')) {
        argumentExpansionCount++;
      }
    }
    
    if (argumentExpansionCount === 0 && ast.thisArgument == null) {
      // Simple function call, no this parameter
      
      var args = ast.arguments.map(function (argAst) { return argAst.code; });
      
      ast.code = [ast.function.code, '(', args.interpolate(', '), ')'];
    }
    else if (argumentExpansionCount === 0) {
      // Simple function call with this parameter
      
      var args = [ast.thisArgument.code];
      args.pushAll(ast.arguments.map(function (argAst) { return argAst.code; }));
      args = args.interpolate(', ');
      
      ast.code = [ast.function.code, '.call(', args, ')'];
    }
    else {
      // Build arguments array and use apply
      
      var thisArgument = (ast.thisArgument != null ? ast.thisArgument.code : 'null');
      
      var args = [
        '__combe.makeArray(', 
          ast.arguments.map(function (argAst) { return argAst.code; }).interpolate(', '),
        ')'
      ];
      
      ast.code = [
        ast.function.code, '.apply(', 
          thisArgument, ', ',
          args,
        ')'
      ];
    }
  },
  
  visitExpandArguments: function (ast) { // [ argument ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.expand(', ast.argument.code, ')'];
  },
  
  visitAssociation: function (ast) { // [ key, value ]
    ast.visitChildren(this);
    
    ast.code = ['__combe.association(', ast.key.code, ', ', ast.value.code, ')'];
  },
  
  visitThis: function (ast) { // [ ]
    ast.code = 'this';
  },
  
  visitNull: function (ast) { // [ ]
    ast.code = 'null';
  },
  
  visitUndefined: function (ast) { // [ ]
    ast.code = 'undefined';
  },
  
  visitTrue: function (ast) { // [ ]
    ast.code = 'true';
  },
  
  visitFalse: function (ast) { // [ ]
    ast.code = 'false';
  },
  
  visitString: function (ast) { // [ value ]
    ast.code = ast.value.quote();
  },
  
  visitNumber: function (ast) { // [ value ]
    ast.code = ast.value.toString();
  },
  
  visitContractionParameter: function (ast) { // [ name ]
    // Do Nothing (see processParameters())
  },
  
  visitParameter: function (ast) { // [ name ]
    // Do Nothing (see processParameters())
  },
  
  visitIgnoredParameter: function (ast) { // [ ]
    // Do Nothing (see processParameters())
  },
  
});
