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



function ObjectGrammar(root) {
  Grammar.call(this);
  
  this.root = root;
  
  this._inputList = null;
  this._positionList = null;
};
ObjectGrammar.prototype = Object.create(Grammar.prototype);
ObjectGrammar.prototype.constructor = ObjectGrammar;
module.exports = ObjectGrammar;



ObjectGrammar.prototype.match = function (startRule) {
  if (startRule == null) startRule = "start";
  var args = Array.from(arguments).slice(1);
  
  try {
    this.pushInput([this.root]);
    var result = this[startRule].apply(this, args);
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



ObjectGrammar.prototype.preorderTransform = function (pattern, logFlag, fullFlag) {
  return this.on(
    this.transform(pattern, logFlag, fullFlag),
    function () {
      return this.recurse(function () {
        return this.preorderTransform(pattern, logFlag, fullFlag);
      });
    }
  );
};

ObjectGrammar.prototype.postorderTransform = function (pattern, logFlag, fullFlag) {
  return this.on(
    this.recurse(function () {
      return this.postorderTransform(pattern, logFlag, fullFlag);
    }),
    function () { return this.transform(pattern, logFlag, fullFlag); }
  );
};

ObjectGrammar.prototype.complexPostorderTransform = function (pattern, logFlag, fullFlag) {
  var initial, before, after;
  
  after = this.next();
  
  while (true) {
    initial = before = after;
    
    before = after = this.on(after, function () {
      this.recurse(function () {
        return this.complexPostorderTransform(pattern, logFlag, fullFlag);
      });
    });
    
    after = this.on(after, pattern);
    
    if (!Util.equals(before, after)) {
      this.logTransform(before, after, logFlag, fullFlag);
    }
    
    if (!Util.equals(initial, after)) {
      continue;
    }
    else {
      break;
    }
  }
  
  return after;
};

ObjectGrammar.prototype.transform = function (pattern, logFlag, fullFlag) {
  var before, after;
  
  after = this.next();
  
  while (true) {
    before = after;
    after = this.on(after, pattern);
    
    if (!Util.equals(before, after)) {
      this.logTransform(before, after, logFlag, fullFlag);
      continue;
    }
    else {
      break;
    }
  }
  
  return after;
};

ObjectGrammar.prototype.logTransform = function (before, after, logFlag, fullFlag) {
  if (logFlag) {
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
};



ObjectGrammar.prototype.recurse = function (pattern) {
  var object = this.next();
  if      (object == null)          return object;
  else if (object instanceof Ast)   return this._recurseAst(object, pattern);
  else if (object instanceof Array) return this._recurseArray(object, pattern);
  else if (Object.getPrototypeOf(object) === Object.prototype ||
           Object.getPrototypeOf(object) === null) {
    return this._recurseObjectLiteral(object, pattern);
  }
  else return object;
};

ObjectGrammar.prototype._recurseAst = function (ast, pattern) {
  var result = ast.copy();
  
  for (var i = 0; i < ast.principleAttributeNames.length; i++) {
    result[ast.principleAttributeNames[i]] = this.on(ast[ast.principleAttributeNames[i]], pattern);
  }
  
  return result;
};

ObjectGrammar.prototype._recurseArray = function (array, pattern) {
  var _this = this;
  return array.map(function (e) { return _this.on(e, pattern); });
};

ObjectGrammar.prototype._recurseObjectLiteral = function (object, pattern) {
  var result = Object.create(Object.getPrototypeOf(object));
  
  for (var name in object) {
    result[name] = this.on(object[name], pattern);
  }
  
  return result;
};
  



ObjectGrammar.prototype.object = function (object) {
  return this.equals(object);
};

ObjectGrammar.prototype.string = function (string) {
  return this.equals(string);
};

ObjectGrammar.prototype.number = function (number) {
  return this.equals(number);
};

ObjectGrammar.prototype.regularExpression = function (regularExpression) {
  return this.equals(regularExpression);
};

ObjectGrammar.prototype.property = function (name, pattern) {
  if (name in this.getInput()) {
    return this.on(this.getInput()[name], pattern);
  }
  else {
    return this.fail();
  }
};



ObjectGrammar.prototype.Ast = function (type) {
  var object = this.next();
  if (object instanceof Ast && object.type === type) {
    return object;
  }
  else {
    return this.fail();
  }
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
