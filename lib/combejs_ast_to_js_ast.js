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
  
  visitRangeInfinity: function (ast, inherited) {
    if (!ast.parent.isOneOf(['InclusiveRange', 'ExclusiveRange'])) {
      throw new Error('RangeInfinity AST node must be under a Range AST node!');
    }
    return 'null';
  },
  
  visitInclusiveRange: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace:
      Ast('CallProperty', {rangeLiteral: true, name: 'inclusive'},
        Ast('VariableLookup', {name: '__combejs__Range'})).concat(children)};
  },
  
  visitExclusiveRange: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace:
      Ast('CallProperty', {rangeLiteral: true, name: 'exclusive'},
        Ast('VariableLookup', {name: '__combejs__Range'})).concat(children)};
  },
  
  visitObjectLiteral: function (ast, inherited) {
    if (ast.children.some(function (elem) {
      return elem.is('DescribePropertyDeclaration');
    })) {
      return {replace:
        Ast('CallProperty', {name: 'create'}, 
          Ast('VariableLookup', {name: 'Object'}),
          Ast('ValueLiteral', {value:null}),
          Ast('ObjectLiteral').concat(this.processPropertyDeclarations(ast.children)))};
    } else {
      this.visitAll(ast.children, {});
      return {};
    }
  },
  
  processPropertyDeclarations: function (children) {
    var propDescriptors = {};
    for (var i = 0; i < children.length; i++) {
      this.processPropertyDeclaration(children[i], propDescriptors);
    }
    var propDescriptorsArray = [];
    for (var name in propDescriptors) {
      if (!propDescriptors.hasOwnProperty(name)) continue;
      propDescriptorsArray.push(Ast('ValuePropertyDeclaration', {name: name}, propDescriptors[name]));
    }
    return propDescriptorsArray;
  },
  
  processPropertyDeclaration: function (ast, obj) {
    var children = this.visitAllReplacing(ast.children, {});
    
    if (ast.type === 'DescribePropertyDeclaration') {
      if (obj[ast.name]) {
        throw new Error('Duplicate property name in object literal: ' + ast.name);
      }
      obj[ast.name] = children[0];
      
    } else if (ast.type === 'ValuePropertyDeclaration') {
      if (obj[ast.name]) {
        throw new Error('Duplicate property name in object literal: ' + ast.name);
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
        throw new Error('Duplicate property name in object literal: ' + ast.name);
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
        throw new Error('Duplicate property name in object literal: ' + ast.name);
      }
      
    } else {
      throw new Error('Unexpected Ast node type');
    }
  },
  
  visitClassExpression: function (ast, inherited) {
    var createClass = this.processCreateClass(ast.children);
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
    var createClass = this.processCreateClass(ast.children);
    return {replace:
      Ast('VariableDeclarationList', {}, Ast('VariableDeclaration', {name: ast.name}, createClass))};
  },
  
  processCreateClass: function (children) {
    var attrs = this.visit(children[0], {});
    var superclassExpression = children[0];
    if (attrs.replace) superclassExpression = attrs.replace;
    return (
      Ast('CallProperty', {name: 'create'}, 
        Ast('VariableLookup', {name: '__combejs__Class'}),
        superclassExpression,
        Ast('ObjectLiteral').concat(this.processPropertyDeclarations(children.slice(1)))));
  },
  
  visitRuleExpression: function (ast, inherited) {
    return this.processRule(ast, inherited, false);
  },
  
  visitRuleDeclaration: function (ast, inherited) {
    return this.processRule(ast, inherited, true);
  },
  
  processRule: function (ast, inherited, declaration) {
    var children = this.visitAllReplacing(ast.children, {});
    
    var varnames = ast.declare
      .difference(ast.argumentNames ? ast.argumentNames : [])
      .withoutDuplicates();
    var vardecls = varnames.map(function (varname) {
      return Ast('VariableDeclaration', {name: varname});
    });
    
    var type = declaration ? 'FunctionDeclaration' : 'FunctionExpression';
    var newAst = Ast(type, {name: ast.name, argumentNames: ast.argumentNames});
    if (!vardecls.isEmpty()) {
      newAst.push(Ast('VariableDeclarationList').concat(vardecls));
    }
    
    newAst.push(Ast('Return', {}, this.generateApply(children[0])));
    
    return {replace: newAst};
  },
  
  visitMatchStatement: function (ast, inherited) {
    var children = this.visitAllReplacing(ast.children, {});
    return {replace: 
      Ast('Call', {},
        Ast('VariableLookup', {name: '__combeMatch'}),
        children[0],
        children[1])};
  },
  
  visitEmptyPattern: function (ast, inherited) {
    return {replace: Ast('FunctionExpression')};
  },
  
  visitAnythingPattern: function (ast, inherited) {
    return {replace:
      Ast('DotPropertyLookup', {name: '_anything'}, Ast('This'))};
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
    return {replace: this.callWithThis(this.funcWithStatements(children))};
  },
  
  visitVariablePattern: function (ast, inherited) {
    var ps = this.collectParentToFunction(ast);
    var variables = ps.reduce(function (vars, elem) {
      return vars.concat(elem.declare ? elem.declare : []);
    }, []);
    
    var replace;
    if (variables.include(ast.name)) {
      replace = Ast('VariableLookup', {name: ast.name});
    } else {
      replace = Ast('DotPropertyLookup', {name: ast.name}, Ast('This'));
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
  
  collectParentTo: function (ast, predicate) {
    lst = [ast];
    while (!predicate(ast)) {
      lst.push(ast);
      ast = ast.parent;
    }
    lst.push(ast);
    return lst;
  },
  
  collectParentToFunction: function (ast) {
    return this.collectParentTo(ast, function (ast) {
      return ast.isAnyOf([
        'FunctionExpression', 'FunctionDeclaration', 
        'GetPropertyDeclaration', 'SetPropertyDeclaration', 
        'RuleExpression', 'RuleDeclaration', 'Program']);
    });
  },
  
  funcWithStatements: function (stmts) {
    return Ast('FunctionExpression', {}).concat(stmts);
  },
  
  funcWithExpression: function (expr) {
    return Ast('FunctionExpression', {}, 
      Ast('Return', {}, expr));
  },
  
  callThisProperty: function (propname, args) {
    return Ast('CallProperty', {name: propname}, Ast('This')).concat(args);
  },
  
  callWithThis: function (fn, args) {
    return Ast('CallProperty', {name: 'call'}, fn).concat(args);
  },
  
  unwrapFunction: function (fnAst) {
    if (fnAst.children.length === 1) {
      var stmt = fnAst.children[0];
      if (stmt.type === 'Return') {
        if (stmt.children[0]) {
          return stmt.children[0];
        } else {
          return Ast('ValueLiteral', {value: undefined});
        }
      }
      if (stmt.type === 'EmptyStatement') {
        return Ast('ValueLiteral', {value: undefined});
      }
      if (stmt.type === 'ExpressionStatement') {
        return Ast('ExpressionSequence', {}, 
          stmt.children[0], 
          Ast('ValueLiteral', {value: undefined}));
      }
      // Might be useful to add a case for Block, since they could be
      // as simple as the ExpressionStatement case above.
    }
    return Ast('CallExpression', {}, fnAst);
  },
  
  generateApply: function (applyArgument) {
    if (applyArgument.type === 'FunctionExpression') {
      return this.unwrapFunction(applyArgument);
    } else if (applyArgument.type === 'ValueLiteral') {
      var value = applyArgument.value;
      if (typeof value === 'string') {
        return (
          Ast('CallProperty', {name: '_applyString'},
            Ast('This'),
            applyArgument));
      } else if (typeof value === 'number') {
        return (
          Ast('CallProperty', {name: '_applyNumber'},
            Ast('This'),
            applyArgument));
      } else if (typeof value === 'boolean') {
        return (
          Ast('CallProperty', {name: '_applyBoolean'},
            Ast('This'),
            applyArgument));
      } else if (typeof value === 'undefined') {
        throw new Error("Apply does not support undefined");
      } else if (value === null) {
        throw new Error("Apply does not support undefined");
      } else {
        throw new Error("Badly formed ValueLiteral AST node");
      }
    } else if (applyArgument.rangeLiteral) {
      return (
        Ast('CallProperty', {name: '_applyRange'},
          Ast('This'),
          applyArgument));
    } else {
      return (
        Ast('CallProperty', {name: '_apply'},
          Ast('This'),
          applyArgument));
    }
  },
  
});
