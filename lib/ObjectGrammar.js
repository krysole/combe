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
var List = require("./List.js");
var Ast = require("./Ast.js");
var Grammar = require("./Grammar.js");



function ObjectGrammar() {
  Grammar.call(this);
  
  this._inputList = null;
  this._positionList = null;
};
ObjectGrammar.prototype = Object.create(Grammar.prototype);
ObjectGrammar.prototype.constructor = ObjectGrammar;
module.exports = ObjectGrammar;



ObjectGrammar.prototype.match = function (root, startRule) {
  if (startRule == null) startRule = "start";
  var args = Array.from(arguments).slice(1);
  
  try {
    this.pushInput([]);
    var result = this[startRule].apply(this, [root].concat(args));
    this.popInput();
    return result;
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



ObjectGrammar.prototype.PostorderTransformCycleLimit = 1000;
ObjectGrammar.prototype.postorderTransform = function (object, pattern, logFlag, fullFlag) {
  var _this = this;
  var i = 0;
  var previous, before, after;
  
  after = object;
  
  do {
    if (i++ >= this.PostorderTransformCycleLimit) {
      throw new Error("Could not stabalize postorder transform of ast, reached cycle limit.");
    }
    
    previous = after;
    
    if (previous instanceof Ast) {
      before = new Ast(previous.type()).concat(previous.rest().map(function (e) {
        return _this.postorderTransform(e, pattern, logFlag, fullFlag);
      }));
      after = _this.on(before, pattern);
    }
    else if (previous instanceof Array) {
      before = previous.map(function (e) {
        return _this.postorderTransform(e, pattern, logFlag, fullFlag);
      });
      after = _this.on(before, pattern);
    }
    else {
      before = previous;
      after = _this.on(before, pattern);
    }
    
    this.logTransform(before, after, logFlag, fullFlag);
  }
  while (!Util.equal(before, after));
  
  return after;
};

ObjectGrammar.prototype.logTransform = function (before, after, logFlag, fullFlag) {
  if (logFlag) {
    if (!Util.equal(before, after)) {
      if (fullFlag) {
        this.log("=== Transform ===");
        console.log("  " + Show.show(before));
        console.log("  " + Show.show(after));
        console.log();
      }
      else {
        this.log("=== Transform ===");
        console.log("  " + Show.synopsis(before));
        console.log("  " + Show.synopsis(after));
        console.log();
      }
    }
  }
};



ObjectGrammar.prototype.recurse = function (x, pattern) {
  if (x instanceof Ast)        return this.recurseAst(x, pattern);
  else if (x instanceof Array) return this.recurseArray(x, pattern);
  else                         return x;
};

ObjectGrammar.prototype.recurseAst = function (ast, pattern) {
  var _this = this;
  var type = ast.type();
  var es = ast.rest().map(function (e) { return _this.on(e, pattern); });
  return new Ast(type).concat(es);
};

ObjectGrammar.prototype.recurseArray = function (array, pattern) {
  var _this = this;
  return array.map(function (e) { return _this.on(e, pattern); });
};
  



ObjectGrammar.prototype.object = function (object) {
  return this.equal(object);
};

ObjectGrammar.prototype.string = function (string) {
  return this.equal(string);
};

ObjectGrammar.prototype.number = function (number) {
  return this.equal(number);
};

ObjectGrammar.prototype.regularExpression = function (regularExpression) {
  return this.equal(regularExpression);
};



ObjectGrammar.prototype.log = function (message) {
  console.log('[object %s] %s', this.getName(), message);
};

ObjectGrammar.prototype.error = function (message) {
  throw new Error("[object " + this.getName() + "] " + message);
};



ObjectGrammar.prototype.memoize = function (name, pattern) {
  return pattern.call(this);
};



ObjectGrammar.prototype.preserve = function () {
  return {
    dynamicVariables: this._dynamicVariables,
    inputList: this._inputList,
    positionList: this._positionList,
  };
};

ObjectGrammar.prototype.restore = function (initialState) {
  this._dynamicVariables = initialState.dynamicVariables;
  this._inputList = initialState.inputList;
  this._positionList = initialState.positionList;
};



ObjectGrammar.prototype.pushStartPosition = function () {
  // Do nothing.
};

ObjectGrammar.prototype.popStartPosition = function () {
  // Do nothing.
};

ObjectGrammar.prototype.getStartPosition = function () {
  throw new Error("Cannot get start position on ObjectGrammar.");
};

ObjectGrammar.prototype.pushInput = function (input) {
  this._inputList = new List(input, this._inputList);
  this._positionList = new List(0, this._positionList);
  return input;
};

ObjectGrammar.prototype.popInput = function () {
  if (this._inputList == null) {
    throw new Error("Cannot pop input, input stack is empty.");
  }
  
  var oldInput = this._inputList.head;
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
