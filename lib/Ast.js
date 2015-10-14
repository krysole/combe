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



function Ast(properties, principleAttributeNames) {
  var _this = (this != null ? this : Object.create(Ast.prototype));
  
  for (var name in properties) {
    _this[name] = properties[name];
  }
  _this.principleAttributeNames = principleAttributeNames || [];
  
  if (typeof _this.type !== "string") {
    throw new Error("Ast must be created with string type property.");
  }
  
  return _this;
};
Ast.prototype = Object.create(Object.prototype);
Ast.prototype.constructor = Ast;
module.exports = Ast;



Ast.define = function (name, table) {
  if (!Util.isIdentifierName(name)) {
    throw new Error("name must be a valid identifier name.");
  }
  
  var Constructor = eval(
    "(function " + name + "(type) {\n" +
    "  var _this = (this != null ? this : Object.create(" + name + ".prototype));\n" +
    "  \n" +
    "  var rest = Array.from(arguments).slice(1);\n" +
    "  \n" +
    "  if (" + name + ".table[type] != null) {\n" +
    "    var attributeNames = " + name + ".table[type];\n" +
    "    if (rest.length > attributeNames.length) {\n" +
    "      throw new Error(\"Incorrect count of attributes passed to Ast constructor for type \" + type);\n" +
    "    }\n" +
    "    \n" +
    "    var attributes = { type: type };\n" +
    "    for (var i = 0; i < attributeNames.length; i++) {\n" +
    "      attributes[attributeNames[i]] = rest[i];\n" +
    "    }\n" +
    "    \n" +
    "    Ast.call(_this, attributes, attributeNames);\n" +
    "  }\n" +
    "  else {\n" +
    "    throw new Error(\"Type \" + type + \" is not a valid type for this Ast constructor.\");\n" +
    "  }\n" +
    "  \n" +
    "  return _this;\n" +
    "})"
  );
  Constructor.prototype = Object.create(Ast.prototype);
  Constructor.prototype.constructor = Constructor;
  Constructor.table = table;
  
  return Constructor;
};



Ast.prototype.__combe_equal = function (other) {
  if (this.type !== other.type) return false;
  for (var i = 0; i < this.principleAttributeNames.length; i++) {
    if (this[this.principleAttributeNames[i]] !== other[this.principleAttributeNames[i]]) {
      return false;
    }
  }
  return true;
};



Ast.prototype.is = function (name) {
  return (this.type === name);
};



Ast.prototype.copy = function () {
  var result = Object.create(Object.getPrototypeOf(this));
  for (var name in this) {
    if (this.hasOwnProperty(name)) {
      result[name] = this[name];
    }
  }
  return result;
};



Ast.prototype.__combe_showSingleline = function (column) {
  var result = " ".repeat(column) + this.constructor.name + " " + this.type + " { ";
  for (var i = 0; i < this.principleAttributeNames.length; i++) {
    if (i > 0) result += ", ";
    result += this.principleAttributeNames[i] + ": ";
    result += Show.showSingleline(this[this.principleAttributeNames[i]], 0);
  }
  for (var name in this) {
    if (this.hasOwnProperty(name) && !this.principleAttributeNames.includes(name) &&
        name !== "type" &&
        name !== "principleAttributeNames") {
      if (this.principleAttributeNames.length > 0) {
        result += ", ";
      }
      result += name + ": ";
      result += Show.showSingleline(this[name], 0);
    }
  }
  result += " }";
  return result;
};

Ast.prototype.__combe_showMultiline = function (column) {
  var head = " ".repeat(column) + this.constructor.name + " " + this.type + " {...}";
  var lines = [];
  for (var i = 0; i < this.principleAttributeNames.length; i++) {
    var singleline = " ".repeat(column + 2) + this.principleAttributeNames[i] + ": " + Show.showSingleline(this[this.principleAttributeNames[i]], 0);
    if (!Show.shouldBreak(singleline)) {
      lines.push(singleline);
    }
    else {
      lines.push(" ".repeat(column + 2) + this.principleAttributeNames[i] + ":");
      lines.push(Show.show(this[this.principleAttributeNames[i]], column + 4));
    }
  }
  for (var name in this) {
    if (this.hasOwnProperty(name) && !this.principleAttributeNames.includes(name) &&
        name !== "type" &&
        name !== "principleAttributeNames") {
      var singleline = " ".repeat(column + 2) + name + ": " + Show.showSingleline(this[name], 0);
      if (!Show.shouldBreak(singleline)) {
        lines.push(singleline);
      }
      else {
        lines.push(" ".repeat(column + 2) + name + ":");
        lines.push(Show.show(this[name], column + 4));
      }
    }
  }
  return head + "\n" + lines.join("\n");
};



Ast.prototype.toString = function () {
  return "[object " + this.constructor.name + " " + this.type + " ...]";
};
