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

var EmitJS = module.exports = Class.new(Object, {
  
  translate: function (ast) {
    return ast.visit(this.new());
  },
  
}, {
  
  // Todo: Replace the usage of this.out with a more FP style of returning
  // arrays to be flattened instead.
  
  initialize: function () {
    this.localGensymIndex = 0;
  },
  
  localGensym: function (name) {
    if (name == null) name = 'gensym';
    return name + this.localGensymIndex++;
  },
  
  declareVariables: function (names) {
    if (names.length === 0) {
      return null;
    }
    
    return ['var ', names.interpolate(', '), ';\n'];
  },
  
  catchReturn: function (body) {
    return ['__combe.catchReturn(', body, ')'];
  },
  
  applyMethod: function (_this, name, args) {
    return [
      '__combe.applyMethod(', 
        _this, ', ', 
        name.quote(), ', ',
        args.interpolate(', '),
      ')'
    ];
  },
  
  applyFunction: function (func, _this, args) {
    if (args == null) args = 'null';
    return [
      '__combe.apply(', 
        func, ', ',
        _this, ', ',
        args.interpolate(', '),
      ')'
    ];
  },
  
  splat: function (expr) {
    return ['__combe.splat(', expr, ')'];
  },
  
  visitFile: function (ast) {
    ast.visitChildren(this);
    
    ast.code = [
      '// Combe Newlang (generated code)\n',
      '"use strict";\n',
      '\n'
      '__combe.catchReturn(function () {\n', 
        this.declareVariables(ast.scope.variableNames),
        'return (', ast.body.code, ');',
      '})'
    ];
  },
  
  visitSequence: function (ast) {
    ast.visitChildren(this);
    
    if (ast.expressions.length === 0) {
      ast.code = 'null';
    }
    else if (ast.expressions.length === 1) {
      ast.code = ast.expression.code;
    }
    else {
      ast.code = ['(function () {\n'];
      
      for (var i = 0; i < ast.expressions.length - 1; i++) {
        ast.code.push(ast.expressions[i].code);
        ast.code.push(';\n');
      }
      ast.code.push(['return (', ast.expressions.last, ');\n']);
      
      ast.code.push('})()');
    }
  },
  
  visitReturn: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['__combe.return(', ast.argument.code, ')'];
  },
  
  visitDeclareVariable: function (ast) {
    ast.visitChildren(this);
    
    if (ast.rvalue != null) {
      ast.code = ['(', ast.name, ' = ', ast.rvalue.code, ')'];
    }
    else {
      ast.code = 'null';
    }
  },
  
  visitIf: function (ast) {
    ast.visitChildren(this);
    var alternativeCode = (ast.alternative != null ? ast.alternative.code : 'null');
    
    ast.code = [];
    
    ast.push(['(function () {if (', ast.condition.code, ') {\n']);
      ast.push(['return (', ast.consiquent.code, ');\n']);
    ast.push('}\n');
    ast.push('else {\n');
      ast.push(['return (', alternativeCode, ');\n']);
    ast.push('})()');
  },
  
  visitWhile: function (ast) {
    throw new Error('Todo: EmitJS.visitWhile');
  },
  
  visitLoop: function (ast) {
    throw new Error('Todo: EmitJS.visitLoop');
  },
  
  visitOr: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['(__combe.ensureBoolean(', ast.left.code, ') || __combe.ensureBoolean(', ast.right.code, '))'];
  },
  
  visitXor: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['__combe.xor(__combe.ensureBoolean(', ast.left.code, '), __combe.ensureBoolean(', ast.right.code, '))'];
  },
  
  visitAnd: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['(__combe.ensureBoolean(', ast.left.code, ') && __combe.ensureBoolean(', ast.right.code, '))'];
  },
  
  visitNot: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['(!__combe.ensureBoolean(', ast.argument.code, '))'];
  },
  
  visitOperator: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['(', ast.left.code, ' ', ast.name, ' ', ast.right.code, ')'];
  },
  
  visitPrefixOperator: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['(', ast.name, ast.argument.code, ')'];
  },
  
  visitAssociation: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['__combe.assoc(', ast.key.code, ', ', ast.value.code, ')'];
  },
  
  visitAssignment: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['(', ast.name, ' = ', ast.rvalue.code, ')'];
  },
  
  visitAssignmentMethodCall: function (ast) {
    ast.visitChildren(this);
    
    var name = '.set' + ast.name.charAt(0).toUpperCase() + ast.name.slice(1);
    
    var args = ast.arguments.map(function (arg) {
      return arg.code;
    });
    args.push(ast.rvalue.code);
    
    ast.code = this.applyMethod(ast.receiver.code, name, args);
  },
  
  visitMethodCall: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.arguments.map(function (arg) {
      return arg.code;
    });
    
    ast.code = this.applyMethod(ast.receiver.code, ast.name, args);
  },
  
  visitCall: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.arguments.map(function (arg) {
      return arg.code;
    });
    
    ast.code = this.apply(ast.function.code, ast._this.code, args);
  },
  
  visitSplat: function (ast) {
    ast.visitChildren(this);
    
    ast.code = this.splat(ast.argument.code);
  },
  
  visitNull: function (ast) {
    ast.code = 'null';
  },
  
  visitTrue: function (ast) {
    ast.code = 'true';
  },
  
  visitFalse: function (ast) {
    ast.code = 'false';
  },
  
  visitThis: function (ast) {
    ast.code = 'this';
  },
  
  visitSelf: function (ast) {
    ast.code = 'self';
  },
  
  visitLookup: function (ast) {
    ast.code = name;
  },
  
  visitOrderedMap: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.elements.map(function (elem) {
      return elem.code;
    });
    
    ast.code = this.applyMethod('OrderedMap', 'new', args);
  },
  
  visitArray: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.elements.map(function (elem) {
      return elem.code;
    });
    
    ast.code = this.applyMethod('Array', 'new', args);
  },
  
  visitMap: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.elements.map(function (elem) {
      return elem.code;
    });
    
    ast.code = this.applyMethod('Map', 'new', args);
  },
  
  visitSet: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.elements.map(function (elem) {
      return elem.code;
    });
    
    ast.code = this.applyMethod('Set', 'new', args);
  },
  
  visitFunction: function (ast) {
    ast.visitChildren(this);
    
    if (ast.parameters.some(function (paramNode) {
      return paramNode.is('SplatParameter');
    })) {
      ast.code = [
        var params = ast.parameters.map(function (paramNode) {
          return paramNode.code;
        }).interpolate('\n');
        '(function () {\n',
          'var __combe__argumentsCursor = 0;\n',
          params, ';\n',
          'return (', ast.body.code, ');\n',
        '})'
      ];
    }
    else {
      var params = ast.parameters.map(function (paramNode) {
        return paramNode.name;
      }).interpolate(', ');
      ast.code = [
        '(function (', params, ') {\n',
          'return (', ast.body.code, ');\n',
        '})'
      ];
  },
  
  visitSplatParameter: function (ast) {
    // We provide the case of a patern matching expression in ast.code.
    ast.code = ['var ', ast.name, ' = __combe.remainingArguments(arguments, __combe__argumentsCursor); __combe__argumentsCursor = arguments.length;'];
  },
  
  visitParameter: function (ast) {
    // We provide the case of a patern matching expression in ast.code.
    ast.code = ['var ', ast.name, ' = __combe.nextArgument(arguments, __combe__argumentsCursor++);'];
  },
  
  visitIgnoreParameter: function (ast) {
    ast.code = '/* ignore param */ __combe__argumentCursor++;';
  },
  
  visitObjectLiteral: function (ast) {
    // Todo
  },
  
  visitNumber: function (ast) {
    ast.code = value.toString();
  },
  
});
