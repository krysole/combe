//
// Combe - A Parsing Language for JavaScript
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
'use strict';

var combe = require('combe');

var __Association = require('./Association');

var __combe = module.exports = {
  
  __ReturnException: function (value) {
    this.value = value;
  },
  
  return: function (value) {
    throw this.__ReturnException.new(value);
  },
  
  throw: function (object) {
    throw object;
  },
  
  catchReturn: function (bodyFunc) {
    return function () {
      try {
        return bodyFunc.apply(this, arguments);
      }
      catch (e) {
        if (e instanceof __combe.__ReturnException) {
          return e.value;
        }
        else {
          throw e;
        }
      }
    };
  },
  
  applyMethod: function (receiver, name, _this, args) {
    if (_this == null) _this = receiver;
    
    return receiver[name].apply(_this, args);
  },
  
  apply: function (func, _this, args) {
    return func.apply(_this, args);
  },
  
  subscript: function (receiver, args) {
    return receiver.__subscript.apply(receiver, args);
  },
  
  __ArgumentsExpansion: function (value) {
    this.value = value;
  },
  
  makeArray: function () {
    var result = [];
    
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] instanceof __combe.__ArgumentsExpansion) {
        result.pushAll(arguments[i]);
      }
      else {
        result.push(arguments[i]);
      }
    }
    
    return result;
  },
  
  expand: function (array) {
    return __combe.__ArgumentsExpansion.new(array);
  },
  
  ensureBoolean: function (value) {
    if (typeof value === 'boolean') return value
    else throw Error.new('Expected Boolean');
  },
  
  or: function (left, right) {
    if (typeof left === 'function') left = left();
    if (__combe.ensureBoolean(left)) {
      return true;
    }
    else {
      if (typeof right === 'function') right = right();
      return __combe.ensureBoolean(right);
    }
  },
  
  xor: function (left, right) {
    if (typeof left === 'function') left = __combe.ensureBoolean(left());
    if (typeof right === 'function') right = __combe.ensureBoolean(right());
    return ((left && !right) || (!left && right));
  },
  
  and: function (left, right) {
    if (typeof left === 'function') left = left();
    if (__combe.ensureBoolean(left)) {
      if (typeof right === 'function') right = right();
      return __combe.ensureBoolean(right);
    }
    else {
      return false;
    }
  },
  
  not: function (value) {
    return !__combe.ensureBoolean(value);
  },
  
  binaryOperator: function (opname, left, right) {
    var op = __combe.BinaryOperators[opname];
    if (op != null) {
      return op(left, right);
    }
    else {
      throw Error.new('Binary Operator Does Not Exist (' + opname + ')');
    }
  },
  
  BinaryOperators: {
    // Todo
  },
  
  prefixOperator: function (opname, argument) {
    var op = __combe.PrefixOperators[opname];
    if (op != null) {
      return op(argument);
    }
    else {
      throw Error.new('Prefix Operator Does Not Exist (' + opname + ')');
    }
  },
  
  PrefixOperators: {
    // Todo
  },
  
  Association: __Association,
  
  association: function (key, value) {
    return __combe.Association.new(key, value);
  },
  
  makeObject: function () {
    return Object.create(Object.prototype);
  },
  
  defineGetProperty: function (object, name, func) {
    Object.defineProperty(object, name, {
      get: func,
      configurable: true,
      enumerable: false,
    });
  },
  
  defineSetProperty: function (object, name, func) {
    Object.defineProperty(object, name, {
      set: func,
      configurable: true,
      enumerable: false,
    });
  },
  
  defineDescribedProperty: function (object, name, descriptorMap) {
    Object.defineProperty(object, name, descriptorMap);
  },
  
};
