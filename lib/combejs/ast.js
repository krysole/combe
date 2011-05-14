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
  if (attributes != null) extend(ast, attributes);
  ast.children = Array.prototype.slice.call(arguments, 2);
  return ast;
};

extend(Ast.prototype, {
  
  toString: function () {
    var s = 'Ast[' + this.type;
    if (this.value != null) s += ' ' + this.value;
    s += ']'
    return s;
  },
  
  isType: function (typeString) {
    return this.type === typeString;
  },
  
  is: function (tagString) {
    return this.isType(tagString);
  },
  
  concat: function (/* arguments */) {
    var args = Array.prototype.slice.call(arguments);
    this.children = this.children.concat.apply(this.children, args);
    return this;
  },
  
  push: function (what) {
    this.children.push(what);
    return this;
  },
  
});

// Ast:: ... (See all types below.)
// Ast(type: String, attributes: Object, *childNodes: Ast) -> Ast (Constructor)


// PostfixIncrement:: -- | ++ (sign: +1 or -1)
// UnaryOperator:: ++ | -- | + | - | ~ | !
// Operators:: * | / | % | + | - | << | >> | >>> 
//           | < | > | <= | >= | instanceof | in
//           | == | != | === | !==
//           | & | ^ | '|' | && | '||'


// Expression:: This | VariableLookup | ValueLiteral | ArrayLiteral | ObjectLiteral
//            | New | PropertyLookup | Call | PostfixIncrement | Delete
//            | Void | TypeOf | UnaryOperator | Operator | ConditionalExpression
//            | Assignment | OperatorAssignment | FunctionExpression
//            | ExpressionSequence

// This
// VariableLookup: {name: String}
// ValueLiteral: {value: Object}
// ArrayLiteral: [*Expression]
// ObjectLiteral: [*PropertyDeclaration]
// New: [constructor: Expression, *arguments: Expression]
// PropertyLookup: [name: Expression]
// Call: [function: Expression, *arguments: Expression]
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


// PropertyDeclaration:: ValuePropertyDeclaration | GetPropertyDeclaration | SetPropertyDeclaration

// ValuePropertyDeclaration: {name: String}, [value: Object]
// GetPropertyDeclaration: {name: String}, [*statements: SourceElement]
// SetPropertyDeclaration: {name: String, argumentName: String}, [*statements: SourceElement]


// Statement:: VariableStatement | Block | If | While | DoWhile | For | ForIn
//           | Continue | Break | Return | With | Switch | Label | Throw | Try
//           | EmptyStatement | Debugger | Expression

// Block: [*statements: Statement]
// VariableStatement: [+variables: VariableDeclaration]
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


// SwitchClause:: CaseClause | DefaultClause

// CaseClause: [compareWith: Expression, *statements: Statement]
// DefaultClause: [*statements: Statement]


// Catch: {name: String}, [Block]


// FunctionDeclaration: {name: String, argumentNames: [*String]}, [*statements: SourceElement]

// SourceElement:: Statement | FunctionDeclaration

// Program: [*statements: SourceElement]
