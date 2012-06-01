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
    throw new Error('Unimplemented'); 
    return ['__combe.catchReturn(', body, ')'];
    // Todo: Remove catchReturn, replacing it with catchEscape.
  },
  
  catchEscape: function (label, body) {
    throw new Error('Unimplemented'); // Todo
  },
  
  applyMethod: function (receiver, name, args) {
    return [
      '__combe.applyMethod(', 
        receiver, ', ', 
        name, ', ',
        args.interpolate(', '),
      ')'
    ];
  },
  
  apply: function (func, _this, args) {
    if (args == null) args = 'null';
    return [
      '__combe.apply(', 
        func, ', ',
        _this, ', ',
        args.interpolate(', '),
      ')'
    ];
  },
  
  emitFunction: function (selfName, parameterNodes, bodyNode) {
    var selfBinding = (selfName != null ? 'var self = this;\n' : null);
    
    if (ast.parameterNodes.some(function (pnode) { return node.is('SplatParameter'); })) {
      var params = ast.parameterNodes.map(function (node) {
        return node.code;
      });
      
      return [
        '(function () {\n',
          selfBinding,
          'var __combe__argumentsCursor = 0;\n',
          params.interpolate('\n'), '\n',
          'return (', ast.body.code, ');\n',
        '})'
      ];
    }
    else {
      var params = ast.parameters.map(function (node) {
        // Todo: Replace unnamedParameter with gensym label
        return (node.name != null ? node.name : '__combe__unnamedParameter');
      });
      
      return [
        '(function (', params, ') {\n',
          selfBinding,
          'return (', ast.body.code, ');\n',
        '})'
      ];
    }
  },
  
  visitFile: function (ast) {
    ast.visitChildren(this);
    
    ast.code = [
      '// Combe/Newlang (generated code)\n',
      '"use strict";\n',
      '\n'
      '__combe.catchEscape(', ast.label, ', function () {\n', 
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
    
    ast.code = ['__combe.return(', ast.label, ', ', ast.argument.code, ')'];
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
    ast.visitChildren(this);
    
    ast.label = null; // Todo: Add analysis for generating escape labels for loops and functions.
    ast.code = [];
    
    ast.code = [
      '__combe.catchEscape(', ast.label, ', function () {\n',
        'while (__combe.ensureBoolean(', ast.condition.code, ')) {\n', 
          ast.body.code, '\n',
        '}\n',
        'return (null);'
      '})'
    ];
  },
  
  visitBreak: function (ast) {
    ast.code = ['__combe.break(', ast.label, ')'];
  },
  
  visitContinue: function (ast) {
    ast.code = ['__combe.continue(', ast.label, ')'];
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
    
    ast.code = ['__combe.Operators[', ast.name, '](', ast.left.code, ', ', ast.right.code, ')'];
  },
  
  visitPrefixOperator: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['__combe.PrefixOperators[', ast.name, '](', ast.argument.code, ')'];
  },
  
  visitAssociation: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['__combe.assoc(', ast.key.code, ', ', ast.value.code, ')'];
  },
  
  visitVariableAssignment: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['(', ast.name, ' = ', ast.rvalue.code, ')'];
  },
  
  visitMethodCallAssignment: function (ast) {
    ast.visitChildren(this);
    
    var name = ['__combe.setAccessorNameFor(', ast.name.code, ')'];
    
    var args = ast.arguments.map(function (arg) {
      return arg.code;
    });
    args.push(ast.rvalue.code);
    
    ast.code = this.applyMethod(ast.receiver.code, name, args);
  },
  
  visitMethodCall: function (ast) {
    ast.visitChildren(this);
    
    var name = ast.name.code;
    
    var args = ast.arguments.map(function (arg) {
      return arg.code;
    });
    
    ast.code = this.applyMethod(ast.receiver.code, name, args);
  },
  
  visitCall: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.arguments.map(function (arg) {
      return arg.code;
    });
    
    ast.code = this.apply(ast.function.code, ast._this.code, args);
  },
  
  visitVariableLookup: function (ast) {
    ast.code = name;
  },
  
  visitLookupPrototype: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['__combe.prototypeOf(', ast.receiver, ')'];
  },
  
  visitSplat: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['__combe.splat(', ast.argument.code, ')'];
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
  
  visitUnderscore: function (ast) {
    ast.code = 'null';
  },
  
  visitOrderedMap: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.elements.map(function (elem) {
      return elem.code;
    });
    
    ast.code = this.applyMethod('OrderedMap', 'new'.quote(), args);
  },
  
  visitArray: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.elements.map(function (elem) {
      return elem.code;
    });
    
    ast.code = this.applyMethod('Array', 'new'.quote(), args);
  },
  
  visitMap: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.elements.map(function (elem) {
      return elem.code;
    });
    
    ast.code = this.applyMethod('Map', 'new'.quote(), args);
  },
  
  visitSet: function (ast) {
    ast.visitChildren(this);
    
    var args = ast.elements.map(function (elem) {
      return elem.code;
    });
    
    ast.code = this.applyMethod('Set', 'new'.quote(), args);
  },
  
  visitFunction: function (ast) {
    ast.visitChildren(this);
    
    ast.code = this.emitFunction(null, ast.parameters, ast.body);
  },
  
  visitSplatParameter: function (ast) {
    // We provide the case of a patern matching expression in ast.code.
    if (ast.name != null) {
      ast.code = ['var ', ast.name, ' = __combe.remainingArguments(arguments, __combe__argumentsCursor); __combe__argumentsCursor = arguments.length;'];
    }
    else {
      ast.code = ['/* unnamed splat param */ __combe__argumentsCursor = arguments.length;'];
    }
  },
  
  visitParameter: function (ast) {
    // We provide the case of a patern matching expression in ast.code.
    if (ast.name != null) {
      ast.code = ['var ', ast.name, ' = __combe.nextArgument(arguments, __combe__argumentsCursor++);'];
    }
    else {
      ast.code = '/* unnamed param */ __combe__argumentCursor++;';
    }
  },
  
  visitNew: function (ast) {
    ast.visitChildren(this);
    
    var pdecls = ast.propertyDeclarations.map(function (pdecl) {
      return pdecl.code;
    }).interpolate(';\n');
    
    // Todo: replace __combe__prototype with gensym
    ast.code = [
      '(function (__combe__prototype) {\n',
        'var self = Object.create(__combe__prototype);\n',
        pdecls, ';\n',
        'return self;\n',
      '})(', ast.prototype.code, ')'
    ];
  },
  
  visitExtend: function (ast) {
    ast.visitChildren(this);
    
    var pdecls = ast.propertyDeclarations.map(function (pdecl) {
      return pdecl.code;
    }).interpolate(';\n');
    
    ast.code = [
      '(function (self) {\n',
        pdecls, ';\n',
        'return self;\n',
      '})(', ast.subject.code, ')'
    ];
  },
  
  visitClass: function (ast) {
    ast.visitChildren(this);
    
    var superclass = (ast.superclass != null ? ast.superclass.code : 'null');
    
    var pdecls = ast.propertyDeclarations.map(function (pdecl) {
      return pdecl.code;
    }).interpolate(';\n');
    
    // Todo: I think I also need to pass the class object in for metaprogramming
    // purposes, or even to better facilitate recursion? Right now only the prototype
    // is provided, but I'm assuming that there isn't an obvious link from the
    // prototype to the class, and there is no constructor. On the other hand, 
    // perhaps there should be a link to the class, and that link will eventually
    // be replaced with a reflection API when name object are implemented (es6).
    
    ast.code = [ // Self here is the prototype for the class.
      '__combe.subclass(', superclass, ', function (self) {\n',
        pdecls, ';\n',
      '})'
    ];
  },
  
  visitConstantSlotPropertyDeclaration: function (ast) {
    ast.visitChildren(this);
    
    // Todo: Move the computation for valuepropname and setname and most importantly 
    // name to label named variables above the accessor definitions. Otherwise
    // should the name be defined with string interpolation the interpolated
    // expression would be executed every-time the accessors are used!
    
    var name = ast.name.code;
    var valuepropname = ['("__combe__slotState__" + ', name, ')'];
    var setname = ['__combe.setAccessorNameFor(', name, ')'];
    
    var privateValue = ['self[', valuepropname, '] = ', ast.value.code, ';'];
    
    var getMethod = ['self[', name, '] = function () { return this[', valuepropname, ']; };'];
    
    // __combe__value doesn't need to be a label because there shouldn't be any user code inside the accessor.
    var setMethod = ['self[', setname, '] = function (__combe__value) { __combe.cannotSetImmutableSlotError(', name, '); };'];
    
    ast.code = [
      privateValue, '\n',
      getMethod, '\n',
      setMethod, '\n',
    ];
  },
  
  visitSlotPropertyDeclaration: function (ast) {
    ast.visitChildren(this);
    
    // Todo: Move the computation for valuepropname and setname and most importantly 
    // name to label named variables above the accessor definitions. Otherwise
    // should the name be defined with string interpolation the interpolated
    // expression would be executed every-time the accessors are used!
    
    var name = ast.name.code;
    var valuepropname = ['("__combe__slotState__" + ', name, ')'];
    var setname = ['__combe.setAccessorNameFor(', name, ')'];
    
    var privateValue = ['self[', valuepropname, '] = ', ast.value.code, ';'];
    
    var getMethod = ['self[', name, '] = function () { return this[', valuepropname, ']; };'];
    
    // __combe__value doesn't need to be a label because there shouldn't be any user code inside the accessor.
    var setMethod = ['self[', setname, '] = function (__combe__value) { return this[', valuepropname, '] = __combe__value; };'];
    
    ast.code = [
      privateValue, '\n',
      getMethod, '\n',
      setMethod, '\n',
    ];
  },
  
  visitPrimitivePropertyDeclaration: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['self[', name, '] = ', ast.name.code, ';'];
  },
  
  visitMethodPropertyDeclaration: function (ast) {
    ast.visitChildren(this);
    
    ast.code = ['self[', name, '] = ', this.emitFunction('self', ast.parameters, ast.body), ';'];
  },
  
  visitDoExpressionPropertyDeclaration: function (ast) {
    ast.visitChildren(this);
    
    ast.code = [
      'self[', name, '] = function () {\n',
        'return (', ast.body.code, ');\n',
      '};',
    ];
  },
  
  visitNumber: function (ast) {
    ast.code = value.toString();
  },
  
  visitString: function (ast) {
    ast.code = value.quote();
  },
  
});
