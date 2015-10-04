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
var Grammar = require("./Grammar.js");



function ObjectGrammar() {
  Grammar.call(this);
  
  this.init("path", []);
  this.init("_traceIndent", 0);
};
ObjectGrammar.prototype = Object.create(Grammar.prototype);
ObjectGrammar.prototype.constructor = ObjectGrammar;
module.exports = ObjectGrammar;



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
