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
var List = require("./List.js");
var Show = require("./Show.js");
var Ast = require("./Ast.js");
var Ignore = require("./Ignore.js");



function Visitor(sourcename) {
  this.sourcename = sourcename;
  this._dynamicVariables = Object.create(null);
  
  this.init("path", []);
  this.init("_traceIndent", 0);
};
Visitor.prototype = Object.create(Object.prototype);
Visitor.prototype.constructor = Visitor;
module.exports = Visitor;



Visitor.prototype.Ignore = Ignore;



Visitor.prototype.traceFlag = false;
Visitor.prototype.order = "manual"; // One of ["manual", "pre", "post"]
Visitor.prototype.unspecified = "default"; // One of ["default", "error", "handle"]



Visitor.prototype.visitIfNotNull = function (ast) {
  if (ast != null) return this.visit(ast);
  else             return ast;
};

Visitor.prototype.visit = function (ast) {
  if (!ast instanceof Ast) {
    throw new Error("Expected ast, recieved: " + Show.synopsis(ast));
  }
  
  var result;
  this.pushPath(ast);
  
  if (this.traceFlag) {
    console.log(this.getName() + " <enter> " + " ".repeat(this.get("_traceIndent")) + Show.synopsis(ast));
    this.push("_traceIndent", this.get("_traceIndent") + 2);
  }
  
  if (this.order === "manual") {
    result = this.handle(ast);
  }
  else if (this.order === "pre") {
    this.visitChildren();
    result = this.handle(ast);
  }
  else if (this.order === "post") {
    this.visitChildren();
    result = this.handle(ast);
  }
  else {
    throw new Error("Unexpected order property " + this.order + ", should be one of [\"manual\", \"pre\", \"post\"].");
  }
  
  if (this.traceFlag) {
    console.log(this.getName() + " <leave> " + " ".repeat(this.get("_traceIndent")) + Show.synopsis(ast));
    this.push("_traceIndent", this.get("_traceIndent") + 2);
  }
  
  this.popPath();
  return result;
};



Visitor.prototype.visitChildren = function () {
  return Util.new(Ast, [
    this.getCurrent().type(), 
    this.visitChildrenInArray(this.getCurrent().rest())
  ]);
};

Visitor.prototype.visitChildrenInArray = function (array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] instanceof Ast) {
      result.push(this.visit(array[i]));
    }
    else if (array[i] instanceof Array) {
      result.push(this.visitChildrenInArray(array[i]));
    }
    else if (Util.isObjectLiteral(array[i])) {
      result.push(this.visitChildrenInObjectLiteral(array[i]));
    }
    else {
      result.push(array[i]);
    }
  }
  return result;
};

Visitor.prototype.visitChildrenInObjectLiteral = function (object) {
  var result = Object.create(Object.getPropertyOf(object));
  for (var name in object) {
    if (object[name] instanceof Ast) {
      result[name] = this.visit(object[name]);
    }
    else if (object[name] instanceof Array) {
      result[name] = this.visitChildrenInArray(object[name]);
    }
    else if (Util.isObjectLiteral(object[name])) {
      result[name] = this.visitChildrenInObjectLiteral(object[name]);
    }
    else {
      result[name] = object[name];
    }
  }
  return result;
};

Visitor.prototype.visitAll = function (array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push(this.visit(array[i]));
  }
  return result;
};

Visitor.prototype.visitAllIfNotNull = function (array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push(this.visitIfNotNull(array[i]));
  }
  return result;
};



Visitor.prototype.handle = function (ast) {
  var handler = this["handle" + ast.type()];
  if (handler != null) {
    return handler.apply(this, ast.rest());
  }
  else if (this.unspecified === "default") {
    return this._defaultHandleUnspecified.apply(this, ast.rest());
  }
  else if (this.unspecified === "error") {
    throw new Error("No handler defined for ast " + Show.synopsis(ast));
  }
  else if (this.unspecified === "handle") {
    return this.handleUnspecified.apply(this, ast.rest());
  }
  else {
    throw new Error("Unexpected value of unspecified " + Show.synopsis(this.unspecified));
  }
};

Visitor.prototype.handleUnspecified = function () {
  throw new Error("Subclass should override when unspecified is set to handle.");
};

Visitor.prototype._defaultHandleUnspecified = function () {
  return this.visitChildren();
};



Visitor.prototype.getParent = function () {
  return this.getPath()[this.getPath().length - 2];
};

Visitor.prototype.getCurrent = function () {
  return this.getPath()[this.getPath().length - 1];
};



Visitor.prototype.pushPath = function (object) {
  return this.apush("path", object);
};

Visitor.prototype.popPath = function () {
  return this.apop("path");
};

Visitor.prototype.getPath = function () {
  return this.get("path");
};



Visitor.prototype.apush = function (name, object) {
  var array = this.get(name).slice();
  array.push(object);
  return this.set(name, array);
};

Visitor.prototype.apushIfAbsent = function (name, object) {
  var array = this.get(name).slice();
  array.pushIfAbsent(object);
  return this.set(name, array);
};

Visitor.prototype.apop = function (name) {
  var array = this.get(name).slice(0, -1);
  return this.set(name, array);
};



Visitor.prototype.init = function (name, object) {
  if (this._dynamicVariables[name] != null) {
    throw new Error("Cannot initialize already initialized dynamic variable.");
  }
  
  this._dynamicVariables[name] = new List(object, null);
  return object;
};

Visitor.prototype.push = function (name, object) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Visitor:init())");
  }
  
  this._dynamicVariables[name] = new List(object, this._dynamicVariables[name]);
  return object;
};

Visitor.prototype.pop = function (name) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Visitor:init())");
  }
  
  var list = this._dynamicVariables[name];
  if (list.tail == null) {
    throw new Error("Cannot pop last frame of a dynamic variable stack. (Mismatched push/pop calls?)");
  }
  
  this._dynamicVariables[name] = list.tail;
  return list.head;
};

Visitor.prototype.get = function (name) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Visitor:init())");
  }
  
  return this._dynamicVariables[name].head;
};

Visitor.prototype.set = function (name, object) {
  if (this._dynamicVariables[name] == null) {
    throw new Error("Cannot use uninitialized dynamic variable (remember to call Visitor:init())");
  }
  
  this._dynamicVariables[name] = new List(object, this._dynamicVariables[name].tail);
  return object;
};
