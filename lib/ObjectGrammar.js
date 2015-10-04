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

var List = require("./List.js");
var Ast = require("./Ast.js");
var Grammar = require("./Grammar.js");



function ObjectGrammar() {
  Grammar.call(this);
  
  this.init("path", []);
  this.init("_traceIndent", 0);
};
ObjectGrammar.prototype = Object.create(Grammar.prototype);
ObjectGrammar.prototype.constructor = ObjectGrammar;
module.exports = ObjectGrammar;



ObjectGrammar.prototype.match = function (root, startRule) {
  if (startRule == null) startRule = "start";
  var args = Array.from(arguments).slice(1);
  
  try {
    return this[startRule].apply(this, [root].concat(args));
  }
  catch (e) {
    if (e === this.Backtrack) {
      throw new Error("Failed to match input.");
    }
    else {
      throw e;
    }
  }
};



ObjectGrammar.prototype.identity = function () {
  return this.next();
};



ObjectGrammar.prototype.into = function (pattern) {
  return pattern.call(this, this.next());
};

ObjectGrammar.prototype.chain = function () {
  var r = this.next();
  for (var i = 0; i < arguments.length; i++) {
    r = this.on(r, arguments[i]);
  }
  return r;
};

ObjectGrammar.prototype.on = function (x, pattern) {
  this.pushInput([x]);
  var result = pattern.call(this);
  this.end();
  this.popInput();
  return result;
};



ObjectGrammar.prototype.visitPostOrder = function (x, pattern) {
  if (x instanceof Ast)        return this.visitPostOrderAst(x, pattern);
  else if (x instanceof Array) return this.visitPostOrderArray(x, pattern);
  else                         return x;
};

ObjectGrammar.prototype.visitPostOrderAst = function (ast, pattern) {
  var type = ast.type();
  var es = ast.rest();
  var rs = [];
  for (var i = 0; i < es.length; i++) {
    rs.push(this.on(this.visitPostOrder(es[i], pattern), pattern));
  }
  return new Ast(type).concat(rs);
};

ObjectGrammar.prototype.visitPostOrderArray = function (array, pattern) {
  var rs = [];
  for (var i = 0; i < array.length; i++) {
    rs.push(this.on(this.visitPostOrder(array[i], pattern), pattern));
  }
  return rs;
};



ObjectGrammar.prototype.object = function (object) {
  return this.is(object);
};

ObjectGrammar.prototype.string = function (string) {
  return this.is(object);
};

ObjectGrammar.prototype.number = function (number) {
  return this.is(object);
};

ObjectGrammar.prototype.regularExpression = function (regularExpression) {
  return this.is(regularExpression);
};



ObjectGrammar.prototype.log = function (message) {
  console.log('[%s log()] %s', this.getName(), message);
};

ObjectGrammar.prototype.error = function (message) {
  throw new Error("[" + this.getName() + "] " + message);
};



ObjectGrammar.prototype.pushInput = function (input) {
  this._inputList = new List(input, this._inputList);
  this._positionList = new List(0, this._positionList);
  this.pushStartPosition();
  return input;
};

ObjectGrammar.prototype.popInput = function () {
  if (this._inputList == null) {
    throw new Error("Cannot pop input, input stack is empty.");
  }
  
  var oldInput = this._inputList.head;
  this.popStartPosition();
  this._positionList = this._positionList.tail;
  this._inputList = this._inputList.tail;
  return oldInput;
};

ObjectGrammar.prototype.getInput = function () {
  if (this._inputList == null) {
    throw new Error("Cannot get input, input stack is empty.");
  }
  
  return this._inputList.head;
};

ObjectGrammar.prototype.getPosition = function () {
  if (this._positionList == null) {
    throw new Error("Cannot get position, input stack is empty.");
  }
  
  return this._positionList.head;
};

ObjectGrammar.prototype.setPosition = function (position) {
  if (this._positionList == null) {
    throw new Error("Cannot set position, input stack is empty.");
  }
  
  this._positionList = new List(position, this._positionList.tail);
  return position;
};
