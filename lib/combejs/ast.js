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

var extend = require('./util').extend;

var Ast = module.exports = function Ast(type, attributes /* , ...children */) {
  var ast = Object.create(Ast.prototype);
  ast.type = type;
  ast.children = [];
  if (attributes != null) extend(ast, attributes);
  ast.concat(Array.prototype.slice.call(arguments, 2));
  return ast;
};

extend(Ast.prototype, {
  
  toString: function () {
    var s = 'Ast[' + this.type;
    if (this.value != null) s += ' value: ' + this.value;
    if (this.name != null) s += ' name: ' + this.name;
    s += ']'
    return s;
  },
  
  toJSON: function () {
    var json = {type: this.type};
    if (this.name) json.name = this.name;
    if (this.value) json.value = this.value;
    if (this.children.length > 0) {
      json.children = this.children.map(function (elem) {
        if (!elem.ast || !elem.toJSON) {
          // Not an AST node, which means the AST is malformed in some way
          console.dir(elem);
        }
        return elem.toJSON();
      });
    }
    return json;
  },
  
  isType: function (typeString) {
    return this.type === typeString;
  },
  
  is: function (tagString) {
    return this.isType(tagString);
  },
  
  concat: function (/* arguments */) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 0);
    args.forEach(function (elem) {
      if (Array.isArray(elem)) {
        elem.forEach(function (elem) {
          self.children.push(elem);
          elem.parent = self;
        });
      } else {
        self.children.push(elem);
        elem.parent = self;
      }
    });
    return this;
  },
  
  push: function (what) {
    this.children.push(what);
    what.parent = this;
    return this;
  },
  
  isAnyOf: function (tags) {
    var self = this;
    return tags.some(function (elem) {
      return self.is(elem);
    });
  },
  
});

// Ast(type: String, attributes: Object, *childNodes: Ast) -> Ast (Constructor)

// PostfixIncrement:: -- | ++ (sign: +1 or -1)
// UnaryOperator:: ++ | -- | + | - | ~ | !
// Operators:: * | / | % | + | - | << | >> | >>> 
//           | < | > | <= | >= | instanceof | in
//           | == | != | === | !==
//           | & | ^ | '|' | && | '||'


// Expression:: ...
// This
// VariableLookup: {name: String}
// ValueLiteral: {value: Object}
// ArrayLiteral: [*Expression]
// ObjectLiteral: [*PropertyDeclaration]
// New: [constructor: Expression, *arguments: Expression]
// PropertyLookup: [subject: Expression, name: Expression]
// DotPropertyLookup: {name: String}, [subject: Expression]
// Call: [function: Expression, *arguments: Expression]
// CallProperty: {name: name}, [function: Expression, *arguments: Expression]
// PostfixIncrement: {sign: Integer}, [expression: Expression]
// Delete: [expression: Expression]
// Void: [expression: Expression]
// TypeOf: [expression: Expression]
// UnaryOperator: {name: String}, [expression: Expression]
// Operator: {name: String}, [left: Expression, right: Expression]
// ConditionalExpression: [condition: Expression, trueBranch: Expression, falseBranch: Expression]
// Assignment: [lvalue: LValue, rvalue: Expression]
// OperatorAssignment: {operator: String}, [lvalue: LValue, rvalue: Expression]
// FunctionExpression: {name: String, argumentNames: [*String]}, [*statements: SourceElement]
// ExpressionSequence: [+exprs: Expression]


// LValue:: VariableLookup | PropertyLookup


// PropertyDeclaration:: ...
// ValuePropertyDeclaration: {name: String}, [value: Object]
// GetPropertyDeclaration: {name: String}, [*statements: SourceElement]
// SetPropertyDeclaration: {name: String, argumentName: String}, [*statements: SourceElement]


// Statement:: ...
// Block: [*statements: Statement]
// VariableDeclarationList: [+variables: VariableDeclaration]
// VariableDeclaration: {name: String}, [expression: Expression]
// If: [condition: Expression, trueBranch: Statement, falseBranch: Statement?]
// While: [condition: Expression, body: Statement]
// DoWhile: [condition: Expression, body: Statement]
// For: [initialization: (VariableDeclaration | Expression)?, 
//       condition: Expression?, increment: Expression?, body: Statement]
// ForIn: {declareVariable: String}, [lvalue: LValue, subject: Expression, body: Statement]
// Continue: {label: String?}
// Break: {label: String?}
// Return: [expr: Expression?]
// With: [subject: Expression, body: Statement]
// Switch: [subject: Expression, *clauses: SwitchClause]
// Label: {name: String}, [body: Statement]
// Throw: [exception: Expression]
// Try: [body: Block, catch: (Catch? | null), finally: Block?]
// EmptyStatement
// Debugger
// ExpressionStatement: [expr: Expression]


// SwitchClause:: ...
// CaseClause: [compareWith: Expression, *statements: Statement]
// DefaultClause: [*statements: Statement]


// Catch: {name: String}, [Block]


// SourceElement:: Statement | ...
// FunctionDeclaration: {name: String, argumentNames: [*String]}, [*statements: SourceElement]

// Program: [*statements: SourceElement]



// --- CombeJS Extensions ---

// PropertyDeclaration:: + ...
// DescribePropertyDeclaration: {name: String}, [descriptorMap: Object]


// Expression:: + ...
// ClassExpression: {name: String?}, [inherits: Expression, *PropertyDeclaration]
// RuleExpression: {name: String?, argumentNames: *String}, [pattern: Pattern]
// InclusiveRange: [Expression, Expression]
// ExclusiveRange: [Expression, Expression]
// RangeInfinity


// Statement:: + ...
// MatchStatement: [subject: Expression, pattern: Pattern]


// SourceElement:: + ...
// ClassDeclaration: {name: String}, [inherits: Expression, *PropertyDeclaration]
// RuleDeclaration: {name: String, argumentNames: *String}, [pattern: Pattern]


// Pattern:: ...
// EmptyPattern
// AnythingPattern
// ChoicePattern: [branches: +Pattern]
// ConcatPattern: [+Pattern]
// BindPattern: {name: String}, [Pattern]
// NotPattern: [Pattern]
// LookaheadPattern: [Pattern]
// TokenOperatorPattern: [Pattern]
// RepeatPattern: [Pattern]
// Repeat1Pattern: [Pattern]
// OptionalPattern: [Pattern]
// JSApplyPattern: [pattern: Pattern, args: +Expression]
// ApplyPattern: [pattern: Pattern, args: +Pattern]
// PredicateExpressionPattern: [Expression]
// PredicateBlockPattern: [+Statement]
// ActionExpressionPattern: [Expression]
// ActionBlockPattern: [+Statement]
// ImmediateExpressionPattern: [Expression]
// ImmediateBlockPattern: [+Statement]
// VariablePattern: {name: String}
