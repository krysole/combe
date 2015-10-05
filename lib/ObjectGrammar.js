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
ObjectGrammar.prototype.postorderTransform = function (object, pattern) {
  var _this = this;
  var i = 0;
  var initial;
  do {
    if (i++ >= this.PostorderTransformCycleLimit) {
      throw new Error("Could not stabalize postorder transform of ast, reached cycle limit.");
    }
    
    initial = object;
    
    if (object instanceof Ast) {
      object = new Ast(object.type()).concat(object.rest().map(function (e) {
        return _this.postorderTransform(e, pattern);
      }));
      
      var result = _this.on(object, pattern);
    
      if (!Util.equal(object, result)) {
        console.log("=== Transform ===");
        console.log(require("./Show.js").synopsis(object));
        console.log(require("./Show.js").synopsis(result));
        console.log();
      }
      
      object = result;
    }
    else if (object instanceof Array) {
      object = object.map(function (e) {
        return _this.postorderTransform(e, pattern);
      });
      
      var result = _this.on(object, pattern);
    
      if (!Util.equal(object, result)) {
        console.log("=== Transform ===");
        console.log(require("./Show.js").synopsis(object));
        console.log(require("./Show.js").synopsis(result));
        console.log();
      }
      
      object = result;
    }
    else {
      var result = _this.on(object, pattern);
    
      if (!Util.equal(object, result)) {
        console.log("=== Transform ===");
        console.log(require("./Show.js").synopsis(object));
        console.log(require("./Show.js").synopsis(result));
        console.log();
      }
      
      object = result;
    }
  } while (!Util.equal(initial, object));
  
  return object;
};



// ObjectGrammar.prototype.visitPostOrder = function (x, pattern) {
//   if (x instanceof Ast)        return this.visitPostOrderAst(x, pattern);
//   else if (x instanceof Array) return this.visitPostOrderArray(x, pattern);
//   else                         return this.on(x, pattern);
// };
// 
// ObjectGrammar.prototype.visitPostOrderAst = function (ast, pattern) {
//   var _this = this;
//   var type = ast.type();
//   var es = ast.rest().map(function (e) { return _this.visitPostOrder(e, pattern); });
//   return this.on(new Ast(type).concat(es), pattern);
// };
// 
// ObjectGrammar.prototype.visitPostOrderArray = function (array, pattern) {
//   var _this = this;
//   var array = array.map(function (e) { return _this.visitPostOrder(e, pattern); });
//   return this.on(array, pattern);
// };



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
  console.log('[%s log()] %s', this.getName(), message);
};

ObjectGrammar.prototype.error = function (message) {
  throw new Error("[" + this.getName() + "] " + message);
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
