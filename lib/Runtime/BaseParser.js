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

var BacktrackingException = require('./BacktrackingException');


var BaseParser = module.exports = Class.new(Object, {

  initialize: function (input) {
    this.$input = input;
    this.position = 0;
  },

  match: function (ruleName, input /*, ...args*/) {
    var args = Array.prototype.slice.call(arguments, 2);
    this.$input = input;
    this.position = 0;
    return this.applyRule.apply(this, [ruleName].concat(args));
  },

  matchAll: function (ruleName, input /*, ...args*/) {
    var args = Array.prototype.slice.call(arguments, 2);
    this.$input = input;
    this.position = 0;
    var result = this.applyRule.apply(this, [ruleName].concat(args));
    if (result && !this._isEof()) {
      return null;
    }
    return result;
  },

  applyRule: function (ruleName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var rule = this.getRule(ruleName);
    try {
      return rule.apply(this, args);
    }
    catch (error) {
      if (error === BacktrackingException) {
        return null;
      }
      else {
        throw error;
      }
    }
  },

  getRule: function (ruleName) {
    var rule = this[ruleName];
    if (rule == null) {
      throw new Error('Could not find rule for: ' + ruleName + '!');
    }
    return rule;
  },

  _choice: function (/* parsers... */) {
    var startPosition = this.position;
    for (var i = 0; i < arguments.length; i++) {
      try {
        return arguments[i].call(this);
      }
      catch (error) {
        if (error === BacktrackingException) {
          this.position = startPosition;
        }
        else {
          throw error;
        }
      }
    }
    return this._fail();
  },

  _concat: function (/* parsers... */) {
    for (var i = 0; i < arguments.length - 1; i++) {
      arguments[i].call(this);
    }
    return arguments[arguments.length - 1].call(this);
  },

  _not: function (parser) {
    var startPosition = this.position;
    try {
      parser.call(this);
    }
    catch (error) {
      if (error === BacktrackingException) {
        this.position = startPosition;
        return null;
      }
      else {
        throw error;
      }
    }
    this.position = startPosition;
    return this._fail();
  },

  _lookahead: function (parser) {
    var startPosition = this.position;
    var result = parser.call(this);
    this.position = startPosition;
    return result;
  },

  _repeat: function (parser, range) {
    if (typeof range === 'number') {
      range = Range.inclusive(range, range);
    }
    else if (typeof range === 'undefined') {
      range = Range.exclusive(0, null);
    }
  
    var results = [];
    var lastPosition = this.position;
    while ((!range.end) ||
           (range.exclusive && results.length < range.end) ||
           (results.length <= range.end)) {
      try {
        results.push(parser.call(this));
        lastPosition = this.position;
      }
      catch (error) {
        if (error === BacktrackingException && 
            results.length >= range.start) {
          this.position = lastPosition;
          return results;
        }
        else {
          throw error;
        }
      }
    }
    return results;
  },

  _repeat1: function (parser) {
    return this._repeat(parser, Range.exclusive(1, null));
  },

  _delimited: function (elementParser, delimiterParser, range) {
    if (typeof range === 'number') {
      range = Range.exclusive(range, null);
    }
    else if (typeof range === 'undefined') {
      range = Range.exclusive(0, null);
    }
  
    var results = [];
    var lastPosition = this.position;
    while ((!range.end) ||
           (range.exclusive && results.length < range.end) ||
           (results.length <= range.end)) {
      try {
        if (results.length !== 0) {
          delimiterParser.call(this);
        }
        results.push(elementParser.call(this));
        lastPosition = this.position;
      }
      catch (error) {
        if (error === BacktrackingException && 
            results.length >= range.start) {
          this.position = lastPosition;
          return results;
        }
        else {
          throw error;
        }
      }
    }
    return results;
  },

  _delimited1: function (elementParser, delimiterParser) {
    return this._delimited(elementParser, delimiterParser, Range.exclusive(1, null));
  },

  _optional: function (parser) {
    var startPosition = this.position;
    try {
      return parser.call(this);
    }
    catch (error) {
      if (error === BacktrackingException) {
        this.position = startPosition;
        return null;
      }
      else {
        throw error;
      }
    }
  },

  tokenOperatorHandler: function (pattern) {
    return pattern.call(this);
  },

  _apply: function (pattern /*, ...args*/) {
    return pattern.apply(this, Array.prototype.slice.call(arguments, 1));
  },

  stringPatternHandler: function (string) {
    throw new Error("String pattern handler not provided");
  },

  numberPatternHandler: function (number) {
    throw new Error("Number pattern handler not provided");
  },

  rangePatternHandler: function (range) {
    throw new Error("Range pattern handler not provided");
  },

  _equals: function (number) {
    return this._anything(function (obj) {
      return obj === number;
    });
  },

  _eachChar: function (string) {
    for (var i = 0; i < string.length; i++) {
      this._char(string[i]);
    }
    return string;
  },

  _each: function (what) {
    var iteratorFunction = (what.each != null ? what.each : what.forEach);
    var results = [];
    iteratorFunction.call(what, function (elem) {
      results.push(elem.call(this));
    });
    return results;
  },

  _include: function (what) {
    return this._anything(function (obj) {
      return what.include(obj);
    });
  },

  _char: function (/* ...args */) {
    if (arguments.length === 0) {
      return this._anything();
    }
    else {
      var c = this._anything();
      for (var i = 0; i < arguments.length; i++) {
        if (this._applyCharPredicate(arguments[i], c)) {
          return c;
        }
      }
      return this._fail();
    }
  },

  _applyCharPredicate: function (pred, c) {
    if (typeof pred === 'function') {
      return pred.call(this, c);
    }
    else {
      return pred.include(c);
    }
  },

  _anything: function (predicate) {
    var current = this._read();
    if (predicate) {
      if (predicate.call(this, current)) {
        return current;
      }
      else {
        return this._fail();
      }
    }
    else {
      return current;
    }
  },

  _fail: function () {
    throw BacktrackingException;
  },

  _isEof: function () {
    return this.position >= this.$input.length;
  },

  _peek: function () {
    if (this._isEof()) {
      return this._fail();
    }
    else {
      return this.$input[this.position];
    }
  },

  _read: function () {
    if (this._isEof()) {
      return this._fail();
    }
    else {
      return this.$input[this.position++];
    }
  },

  _error: function (description) {
    throw new Error(description);
  },

  _nothing: function () {
    return null;
  },

  _eof: function () {
    if (this._isEof()) {
      return null;
    }
    else {
      return this._fail();
    }
  },

  _predicate: function (predicate) {
    if (predicate.call(this)) {
      return null;
    }
    else {
      return this._fail();
    }
  },

  _action: function (action) {
    action.call(this);
  },

  _matchedInput: function (parser) {
    var startPosition = this.position;
    parser.call(this);
    var endPosition = this.position;
    return this.$input.slice(startPosition, endPosition);
  },

  _destructure: function (/* what = null, parser */) {
    throw new Error("Destructure unimplemented due to changes to the input mechanism");
  }

});

['repeat', 'delimited', 'equals', 'eachChar', 'each', 'include', 'char', 
'anything', 'fail', 'nothing', 'eof', 'matchedInput', 'destructure', 'apply',
'withObject', 'withInput', 'error', 'delimited1'
].forEach(function (name) {
  BaseParser.prototype[name] = BaseParser.prototype['_' + name];
});
