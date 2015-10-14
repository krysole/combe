//
// Combe - A Parsing Extension for JavaScript
//
// Copyright 2015 Lorenz Pretterhofer <krysole@alexicalmistake.com>
//
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
"use strict";

var Util = require("./Util.js");
var Show = require("./Show.js");
var Ast = require("./Ast.js");



function Visitor() {
  this._dynamicVariables = Object.create(null);
  
  this._path = [];
  
  this.init("_traceIndent", 0);
};
Visitor.prototype = Object.create(Object.prototype);
Visitor.prototype.constructor = Visitor;
module.exports = Visitor;



Visitor.prototype.traceFlag = false;
Visitor.prototype.order = "manual"; // One of ["manual", "pre", "post"]
Visitor.prototype.unspecified = "default"; // One of ["default", "error", "handle"]



Visitor.prototype.visit = function (object) {
  if      (object == null)           return object;
  else if (object instanceof Array)  return this.visitArray.apply(this, arguments);
  else if (object instanceof Ast)    return this.visitAst.apply(this, arguments);
  else if (Object.getPrototypeOf(object) === Object.prototype ||
           Object.getPrototypeOf(object) === null) {
    return this.visitObjectLiteral.apply(this, arguments);
  }
  else {
    return object;
  }
};

Visitor.prototype.visitAst = function (ast) {
  var result;
  this.pushPath(ast);
  
  if (this.traceFlag) {
    console.log(this.getName() + " <enter> " + " ".repeat(this.get("_traceIndent")) + Show.synopsis(ast));
    this.push("_traceIndent", this.get("_traceIndent") + 2);
  }
  
  if (this.order === "manual") {
    result = this.handle.apply(this, arguments);
  }
  else if (this.order === "pre") {
    this.visitChildren();
    result = this.handle.apply(this, arguments);
  }
  else if (this.order === "post") {
    this.visitChildren();
    result = this.handle.apply(this, arguments);
  }
  else {
    throw new Error("Unexpected order property " + this.order + ", should be one of [\"manual\", \"pre\", \"post\"].");
  }
  
  if (this.traceFlag) {
    this.pop("_traceIndent");
    console.log(this.getName() + " <leave> " + " ".repeat(this.get("_traceIndent")) + Show.synopsis(ast));
  }
  
  this.popPath();
  return result;
};

Visitor.prototype.visitChildren = function (ast) {
  var rest = Array.from(arguments).slice(1);
  var result = ast.copy();
  
  for (var i = 0; i < ast.principleAttributeNames.length; i++) {
    result[ast.principleAttributeNames[i]] = this.visit.apply(this, [ast[ast.principleAttributeNames[i]]].concat(rest));
  }
  
  return result;
};

Visitor.prototype.visitArray = function (array) {
  var rest = Array.from(arguments).slice(1);
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push(this.visit.apply(this, [array[i]].concat(rest)));
  }
  return result;
};

Visitor.prototype.visitObjectLiteral = function (objectLiteral) {
  var rest = Array.from(arguments).slice(1);
  var result = {};
  for (var name in objectLiteral) {
    result[name] = this.visit.apply(this, [objectLiteral[name]].concat(rest));
  }
  return result;
};



Visitor.prototype.handle = function (ast) {
  var handler = this["handle" + ast.type];
  if (handler != null) {
    return handler.apply(this, arguments);
  }
  else if (this.unspecified === "default") {
    return this.visitChildren.apply(this, arguments);
  }
  else if (this.unspecified === "error") {
    throw new Error("Unspecified handler for ast " + Show.synopsis(ast));
  }
  else if (this.unspecified === "handle") {
    return this.handleUnspecified.apply(this, arguments);
  }
  else {
    throw new Error("Unexpected value for unspecified " + Show.synopsis(this.unspecified));
  }
};

Visitor.prototype.handleUnspecified = function () {
  throw new Error("Subclass should override when unspecified is set to \"handle\".");
};



Visitor.prototype.parent = function () {
  return this.path()[this.path().length - 2];
};

Visitor.prototype.current = function () {
  return this.path()[this.path().length - 1];
};



Visitor.prototype.pushPath = function (ast) {
  this.path().push(ast);
};

Visitor.prototype.popPath = function () {
  return this.path().pop();
};

Visitor.prototype.path = function () {
  return this._path;
};



Visitor.prototype.init = function (name, object) {
  if (this._dynamicVariables[name] != null) {
    throw new Error("Cannot initialize already initialized dynamic variable.");
  }
  
  this._dynamicVariables[name] = [object];
  return object;
};

Visitor.prototype.push = function (name, object) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Visitor:init())");
  }
  
  this._dynamicVariables[name].push(object);
  return object;
};

Visitor.prototype.pop = function (name) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Visitor:init())");
  }
  
  return this._dynamicVariables[name].pop();
};

Visitor.prototype.get = function (name) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Visitor:init())");
  }
  
  return this._dynamicVariables[name][this._dynamicVariables[name].length - 1];
};

Visitor.prototype.set = function (name, object) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Visitor:init())");
  }
  
  return this._dynamicVariables[name][this._dynamicVariables[name].length - 1] = object;
};



Visitor.prototype.getName = function () {
  if (this.constructor.name !== '') {
    return this.constructor.name;
  }
  else {
    return null;
  }
};

Visitor.prototype.toString = function () {
  if (this.getName() != null) {
    return "[object combe.Visitor " + this.getName() + "]";
  }
  else {
    return "[object combe.Visitor]";
  }
};
