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

var Association = require('./Association');
var ContinueException = require('./ContinueException');

var Expansion = function (array) {
  this.array = array;
};

var __combe = module.exports = {
  
  Association: Association,
  ContinueException: ContinueException,
  
  
  methodCall: function (receiver, name, _this, args) {
    assert(receiver != null);
    assert(typeof name === 'string');
    if (_this == null) _this = receiver;
    
    var realargs = [];
    if (args != null) {
      for (var i = 0; i < args.length; i++) {
        if (!(args[i] instanceof Expansion)) {
          realargs.pushAll(args[i]);
        }
        else {
          realargs.push(args[i]);
        }
      }
    }
    
    return receiver[name].apply(_this, realargs);
  },
  
  call: function (func, _this, args) {
    assert(typeof func === 'function');
    
    var realargs = [];
    if (args != null) {
      for (var i = 0; i < args.length; i++) {
        if (!(args[i] instanceof Expansion)) {
          realargs.pushAll(args[i]);
        }
        else {
          realargs.push(args[i]);
        }
      }
    }
    
    return func.apply(_this, realargs);
  },
  
  expansion: function (what) {
    return new Expansion(what);
  },
  
  
  ensureBoolean: function (value) {
    if (typeof value === 'boolean') return value
    else throw Error.new('Expected Boolean');
  },
  
  or: function (left, right) {
    if (__combe.ensureBoolean(left)) {
      return true;
    }
    else {
      return __combe.ensureBoolean(right);
    }
  },
  
  xor: function (left, right) {
    __combe.ensureBoolean(left);
    __combe.ensureBoolean(right);
    return ((left && !right) || (!left && right));
  },
  
  and: function (left, right) {
    if (__combe.ensureBoolean(left)) {
      return __combe.ensureBoolean(right);
    }
    else {
      return false;
    }
  },
  
  not: function (value) {
    return !__combe.ensureBoolean(value);
  },
  
  
  InfixOperators: {
    // Todo
  },
  
  PrefixOperators: {
    // Todo
  },
  
  PostfixOperators: {
    // There aren't any at the moment.
  },
  
};
