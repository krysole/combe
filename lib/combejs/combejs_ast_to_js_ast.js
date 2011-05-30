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

var util = require('./util');
var Ast = require('./ast');

var CombeJSAstToJSAst = module.exports = function CombeJSAstToJSAst() {
  var self = Object.create(CombeJSAstToJSAst.prototype);
  return self;
};

util.extend(CombeJSAstToJSAst.prototype, {
  
  visit: function (ast, inherited) {
    var visitorFunction = this['visit' + ast.type];
    if (!inherited) inherited = {};
    if (visitorFunction) {
      return visitorFunction.call(this, ast, inherited);
    } else {
      return this.visitUnknown(ast, inherited);
    }
  },
  
  visitAll: function (array, inherited) {
    var self = this;
    return array.map(function (elem) {
      return self.visit(elem, inherited);
    });
  },
  
  visitReduce: function (array, inherited, reduceFunc) {
    var synthesized = this.visitAll(array, inherited);
    return synthesized.reduce(reduceFunc, {});
  },
  
  visitAllReplacing: function (array, inherited) {
    var synthesized = this.visitAll(array, inherited);
    var result = []
    for (var i = 0; i < array.length; i++) {
      result.push(synthesized[i].replace ? synthesized[i].replace : array[i]);
    }
    return result;
  },
  
  visitUnknown: function (ast, inherited) {
    ast.children = this.visitAllReplacing(ast.children, {});
    return {};
  },
  
  visitObjectLiteral: function (ast, inherited) {
    if (ast.children.some(function (elem) {
      return elem.is('DescribePropertyDeclaration');
    })) {
      return {replace:
        Ast('Call', {}, 
          Ast('PropertyLookup', {}, 
            Ast('VariableLookup', {name: 'Object'}),
            Ast('ValueLiteral', {value: 'create'})),
          Ast('ValueLiteral', {value: null}), 
          Ast('ObjectLiteral', {}).concat(this.processPropertyDeclarations(ast.children)))};
    } else {
      this.visitAll(ast.children, {});
      return {};
    }
  },
  
  processPropertyDeclarations: function (children) {
    var propDescriptors = {};
    for (var i = 0; i < ast.children.length; i++) {
      this.processPropertyDeclaration(ast.children[i], propDescriptors);
    }
    var propDescriptorsArray = [];
    for (var name in propDescriptors) {
      propDescriptorsArray.push(Ast('ValuePropertyDeclaration', {name: name}, propDescriptors[name]));
    }
    return propDescriptorsArray;
  },
  
  processPropertyDeclaration: function (ast, obj) {
    var children = this.visitAllReplacing(ast.children, {});
    
    if (ast.type === 'DescribePropertyDeclaration') {
      if (obj[ast.name]) {
        throw new Error('Duplicate property name in object literal.');
      }
      obj[ast.name] = children[0];
      
    } else if (ast.type === 'ValuePropertyDeclaration') {
      if (obj[ast.name]) {
        throw new Error('Duplicate property name in object literal.');
      }
      obj[ast.name] = Ast('ObjectLiteral', {}, 
        Ast('ValuePropertyDeclaration', {name: 'value'}, children[0]),
        Ast('ValuePropertyDeclaration', {name: 'writable'}, Ast('ValueLiteral', {value: true})),
        Ast('ValuePropertyDeclaration', {name: 'enumerable'}, Ast('ValueLiteral', {value: true})),
        Ast('ValuePropertyDeclaration', {name: 'configurable'}, Ast('ValueLiteral', {value: true})));
      
    } else if (ast.type === 'GetPropertyDeclaration') {
      if (obj[ast.name] && obj[ast.name].setter && !obj[ast.name].getter) {
        obj[ast.name].push(
          Ast('ValuePropertyDeclaration', {name: 'get'}, Ast('FunctionExpression').concat(children)));
        obj[ast.name].getter = true;
        
      } else if (!obj[ast.name]) {
        obj[ast.name] = Ast('ObjectLiteral', {getter: true}, 
          Ast('ValuePropertyDeclaration', {name: 'get'}, Ast('FunctionExpression').concat(children)),
          Ast('ValuePropertyDeclaration', {name: 'enumerable'}, Ast('ValueLiteral', {value: true})),
          Ast('ValuePropertyDeclaration', {name: 'configurable'}, Ast('ValueLiteral', {value: true})));
          
      } else {
        throw new Error('Duplicate property name in object literal.');
      }
      
    } else if (ast.type === 'SetPropertyDeclaration') {
      if (obj[ast.name] && obj[ast.name].getter && !obj[ast.name].setter) {
        obj[ast.name].push(
          Ast('ValuePropertyDeclaration', {name: 'set'}, 
            Ast('FunctionExpression', {argumentNames: [ast.argumentName]}).concat(children)));
        obj[ast.name].setter = true;
        
      } else if (!obj[ast.name]) {
        obj[ast.name] = Ast('ObjectLiteral', {setter: true},
          Ast('ValuePropertyDeclaration', {name: 'set'}, 
            Ast('FunctionExpression', {argumentNames: [ast.argumentName]}).concat(children)),
          Ast('ValuePropertyDeclaration', {name: 'enumerable'}, Ast('ValueLiteral', {value: true})),
          Ast('ValuePropertyDeclaration', {name: 'configurable'}, Ast('ValueLiteral', {value: true})));
      
      } else {
        throw new Error('Duplicate property name in object literal.');
      }
      
    } else {
      throw new Error('Unexpected Ast node type');
    }
  },
  
  visitClassExpression: function (ast, inherited) {
    var createClass = this.processCreateClass(this.children);
    if (ast.name) {
      return {replace:
        Ast('Call', {}, 
          Ast('FunctionExpression', {}, 
            Ast('VariableDeclarationList', {}, Ast('VariableDeclaration', {name: ast.name}, createClass)),
            Ast('Return', {}, Ast('VariableLookup', {name: ast.name}))))};
    } else {
      return {replace: createClass};
    }
  },
  
  visitClassDeclaration: function (ast, inherited) {
    // Todo: Technically, this should perform hoisting of the definition to the top of the current
    // function/program. I'm not sure how I'm going to implement that yet...
    var createClass = this.processCreateClass(this.children);
    return {replace:
      Ast('VariableDeclarationList', {}, Ast('VariableDeclaration', {name: ast.name}, createClass))};
  },
  
  processCreateClass: function (children) {
    var attrs = this.visit(children[0], {});
    var superclassExpression = children[0];
    if (attrs.replace) superclassExpression = attrs.replace;
    return (
      Ast('Call', {}, 
        Ast('PropertyLookup', {}, 
          Ast('VariableLookup', {name: 'CombeJSClass'}),
          Ast('ValueLiteral', {value: 'create'})),
        superclassExpression, 
        Ast('ObjectLiteral', {}).concat(this.processPropertyDeclarations(children.slice(1)))));
  },
  
  visitRuleExpression: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: 
      Ast('FunctionExpression', {name: ast.name}, 
        Ast('Return', {}, 
          Ast('Call', {}, 
            Ast('PropertyLookup', {}, Ast('This'), Ast('ValueLiteral', {value: '_apply'})),
            children[0])))};
  },
  
  visitRuleDeclaration: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace:
      Ast('FunctionDeclaration', {name: ast.name}, 
        Ast('Return', {}, 
          Ast('Call', {}, 
            Ast('PropertyLookup', {}, Ast('This'), Ast('ValueLiteral', {value: '_apply'})),
            children[0])))};
  },
  
  visitMatchStatement: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    var ruleExpr = Ast('FunctionExpression', {}, 
      Ast('Return', {}, 
        Ast('Call', {},
            Ast('PropertyLookup', {}, Ast('This'), Ast('ValueLiteral', {value: '_apply'})),
            children[1])));
    return {replace: 
      Ast('Call', {},
        Ast('VariableLookup', {name: '__combeMatch'}),
        children[0],
        ruleExpr)};
  },
  
  visitEmptyPattern: function (ast, inherited) {
    return {replace: Ast('FunctionExpression')};
  },
  
  visitAnythingPattern: function (ast, inherited) {
    return {replace:
      Ast('PropertyLookup', {}, Ast('This'), Ast('ValueLiteral', {value: '_anything'}))};
  },
  
  visitChoicePattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_choice', children))};
  },
  
  visitConcatPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_concat', children))};
  },
  
  visitBindPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      Ast('Assignment', {}, Ast('VariableLookup', {name: ast.name}), 
        this.callThisProperty('_apply', children)))};
  },
  
  visitNotPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_not', children))};
  },
  
  visitLookaheadPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_lookahead', children))};
  },
  
  visitTokenOperatorPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_token', children))};
  },
  
  visitRepeatPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_repeat', children))};
  },
  
  visitRepeat1Pattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_repeat1', children))};
  },
  
  visitOptionalPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_optional', children))};
  },
  
  visitJSApplyPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_apply', children))};
  },
  
  visitApplyPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_apply', children))};
  },
  
  visitPredicateExpressionPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_predicate', [this.funcWithExpression(children[0])]))};
  },
  
  visitPredicateBlockPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(
      this.callThisProperty('_predicate', [this.funcWithStatements(children)]))};
  },
  
  visitActionExpressionPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithExpression(children[0])};
  },
  
  visitActionBlockPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: this.funcWithStatements(children)};
  },
  
  visitImmediateExpressionPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: children[0]};
  },
  
  visitImmediateBlockPattern: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: Ast('Call', {}, this.funcWithStatements(children))};
  },
  
  visitVariablePattern: function (ast, inherited) {
    var ps = this.collectParentUntilFunction(ast);
    var variables = ps.reduce(function (vars, elem) {
      return vars.concat(elem.declare ? elem.declare : []);
    }, []);
    
    var replace;
    if (variables.include(ast.name)) {
      replace = Ast('VariableLookup', {name: ast.name});
    } else {
      replace = Ast('PropertyLookup', {}, 
        Ast('This'),
        Ast('ValueLiteral', {value: ast.name}));
    }
    
    return {replace: replace};
  },
  
  collectParentUntil: function (ast, predicate) {
    lst = [ast];
    while (!predicate(ast)) {
      lst.push(ast);
      ast = ast.parent;
    }
    return lst;
  },
  
  collectParentUntilFunction: function (ast) {
    return this.collectParentUntil(ast, function (ast) {
      return ast.isAnyOf([
        'FunctionExpression', 'FunctionDeclaration', 
        'GetPropertyDeclaration', 'SetPropertyDeclaration', 
        'RuleExpression', 'RuleDeclaration', 'Program']);
    });
  },
  
  funcWithStatements: function () {
    var args = Array.prototype.slice.call(arguments);
    return Ast('FunctionExpression', {}).concat(args);
  },
  
  funcWithExpression: function (expr) {
    return Ast('FunctionExpression', {}, 
      Ast('Return', {}, expr));
  },
  
  callThisProperty: function (propname, args) {
    return Ast('Call', {}, 
      Ast('PropertyLookup', {}, 
        Ast('This'), Ast('ValueLiteral', {value: propname})))
      .concat(args);
  },
  
});
