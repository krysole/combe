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

require('../JavaScriptExtensions');

var BacktrackingException = require('./BacktrackingException');


var BaseParser = module.exports = Class.new(Object, {}, {

  initialize: function (input) {
    this.$input = input;
    this.state = this.emptyState();
    this.memoTables = [];
  },
  
  emptyState: function () {
    return {
      position: 0
    };
  },
  
  copyState: function () {
    return {
      position: this.state.position
    };
  },
  
  getMemoTable: function (position) {
    var memo = this.memoTables[position];
    if (memo == null) {
      memo = this.memoTables[position] = {};
    }
    return memo;
  },
  
  getCurrentMemoTable: function () {
    return this.getMemoTable(this.state.position);
  },
  
  memoize: function (name, parser) {
    var memo = this.getCurrentMemoTable();
    var entry = memo[name];
    if (entry === BacktrackingException) {
      throw BacktrackingException;
    }
    else if (entry != null) {
      this.state.position = entry.position;
      return entry.result;
    }
    else {
      try {
        var result = parser.call(this);
        memo[name] = {result: result, position: this.state.position};
        return result;
      }
      catch (error) {
        if (error === BacktrackingException) {
          memo[name] = BacktrackingException;
        }
        throw error;
      }
    }
  },
  
  match: function (ruleName /* ...args */) {
    var args = Array.prototype.slice.call(arguments, 1);
    try {
      return this.applyRule.apply(this, [ruleName].concat(args));
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
  
  matchAll: function (ruleName /* ...args */) {
    var args = Array.prototype.slice.call(arguments, 1);
    try {
      return this.apply(function () {
        this.applyRule.apply(this, [ruleName].concat(args));
        this.eof();
      });
    }
    catch (error) {
      if (error === Backtracking) {
        return null;
      }
      else {
        throw error;
      }
    }
  },
  
  applyRule: function (ruleName) {
    var args = Array.prototype.slice.call(arguments, 1);
    var rule = this.getRule(ruleName);
    return rule.apply(this, args);
  },

  getRule: function (ruleName) {
    var rule = this[ruleName];
    if (rule == null) {
      throw new Error('Could not find rule for: ' + ruleName + '!');
    }
    return rule;
  },

  _choice: function (/* parsers... */) {
    var initialState = this.state;
    for (var i = 0; i < arguments.length; i++) {
      try {
        this.state = this.copyState();
        return arguments[i].call(this);
      }
      catch (error) {
        if (error === BacktrackingException) {
          this.state = initialState;
        }
        else {
          throw error;
        }
      }
    }
    return this.fail();
  },

  _concat: function (/* parsers... */) {
    for (var i = 0; i < arguments.length - 1; i++) {
      arguments[i].call(this);
    }
    return arguments[arguments.length - 1].call(this);
  },

  _not: function (parser) {
    var initialState = this.copyState();
    try {
      parser.call(this);
    }
    catch (error) {
      if (error === BacktrackingException) {
        this.state = initialState;
        return null;
      }
      else {
        throw error;
      }
    }
    this.state = initialState;
    return this.fail();
  },

  _lookahead: function (parser) {
    var initialState = this.copyState();
    var result = parser.call(this);
    this.state = initialState;
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
    var initialState = this.copyState();
    while ((!range.end) ||
           (range.exclusive && results.length < range.end) ||
           (results.length <= range.end)) {
      try {
        results.push(parser.call(this));
        initialState = this.copyState();
      }
      catch (error) {
        if (error === BacktrackingException && 
            results.length >= range.start) {
          this.state = initialState;
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
  
  repeat: function (parser, range) {
    return this._repeat(parser, range);
  },

  delimited: function (elementParser, delimiterParser, range) {
    if (typeof range === 'number') {
      range = Range.exclusive(range, null);
    }
    else if (typeof range === 'undefined') {
      range = Range.exclusive(0, null);
    }
  
    var results = [];
    var initialState = this.copyState();
    while ((!range.end) ||
           (range.exclusive && results.length < range.end) ||
           (results.length <= range.end)) {
      try {
        if (results.length !== 0) {
          delimiterParser.call(this);
        }
        results.push(elementParser.call(this));
        initialState = this.copyState();
      }
      catch (error) {
        if (error === BacktrackingException && 
            results.length >= range.start) {
          this.state = initialState;
          return results;
        }
        else {
          throw error;
        }
      }
    }
    return results;
  },

  delimited1: function (elementParser, delimiterParser) {
    return this.delimited(elementParser, delimiterParser, Range.exclusive(1, null));
  },

  _optional: function (parser) {
    var initialState = this.copyState();
    try {
      return parser.call(this);
    }
    catch (error) {
      if (error === BacktrackingException) {
        this.state = initialState;
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

  stringPatternHandler: function (string) {
    throw new Error("String pattern handler not provided");
  },

  numberPatternHandler: function (number) {
    throw new Error("Number pattern handler not provided");
  },

  rangePatternHandler: function (range) {
    throw new Error("Range pattern handler not provided");
  },

  equals: function (number) {
    return this.nextIf(function (obj) {
      return obj === number;
    });
  },

  eachChar: function (string) {
    for (var i = 0; i < string.length; i++) {
      this.char(string[i]);
    }
    return string;
  },

  each: function (what) {
    var iteratorFunction = (what.each != null ? what.each : what.forEach);
    var results = [];
    iteratorFunction.call(what, function (elem) {
      results.push(elem.call(this));
    });
    return results;
  },
  
  includedIn: function (collection) {
    return this.nextIf(function (o) {
      return collection.include(o);
    });
  },

  char: function (/* ...args */) {
    if (arguments.length === 0) {
      return this.next();
    }
    else {
      var c = this.next();
      for (var i = 0; i < arguments.length; i++) {
        if (this._applyCharPredicate(arguments[i], c)) {
          return c;
        }
      }
      return this.fail();
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

  fail: function () {
    throw BacktrackingException;
  },

  isEof: function () {
    return this.state.position >= this.$input.length;
  },

  peekNext: function () {
    if (this.isEof()) {
      return this.fail();
    }
    else {
      return this.$input[this.state.position];
    }
  },

  next: function () {
    if (this.isEof()) {
      return this.fail();
    }
    else {
      return this.$input[this.state.position++];
    }
  },
  
  nextIf: function (predicate) {
    var o = this.next();
    if (predicate.call(this, o)) {
      return o;
    }
    else {
      return this.fail();
    }
  },

  error: function (description) {
    throw new Error(description);
  },

  nothing: function () {
    return null;
  },

  eof: function () {
    if (this.isEof()) {
      return null;
    }
    else {
      return this.fail();
    }
  },

  _predicate: function (predicate) {
    if (predicate.call(this)) {
      return null;
    }
    else {
      return this.fail();
    }
  },

  _action: function (action) {
    action.call(this);
  },

  matchedInput: function (parser) {
    var startPosition = this.state.position;
    parser.call(this);
    var endPosition = this.state.position;
    return this.slice(startPosition, endPosition);
  },
  
  slice: function (start, end) {
    return this.$input.slice(start, end);
  },

});
