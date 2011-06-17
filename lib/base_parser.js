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

var extend = require('./util').extend;
var defineException = require('./util').defineException;
var typeOf = require('./util').typeOf;
var ParserInput = require('./parser_input');
var BacktrackingException = require('./backtracking_exception');

var Class = require('./class');
var Range = require('./range');

var BaseParser = module.exports = Class.new(Object, {
  
  initialize: function () {
    this.input = new ParserInput();
  },
  
  match: function (ruleName, input /* , ...args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var rule = this.getRule(ruleName);
    return this._withInput(input, function () {
      return rule.apply(this, args);
    });
  },
  
  matchAll: function (ruleName, input /* , ...args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var rule = this.getRule(ruleName);
    return this._withInput(input, function () {
      var result = rule.apply(this, args);
      if (!this.input.eof()) {
        throw new Error("CombeJS:BaseParser:matchAll() didn't match entire input");
      }
      return result;
    });
  },
  
  matchObject: function (ruleName, object /* , ...args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var rule = this.getRule(ruleName);
    return this._withObject(object, function () {
      return rule.apply(this, args);
    });
  },
    
  getRule: function (ruleName) {
    var rule = this[ruleName];
    if (rule == null) {
      throw new Error('Could not find rule for: ' + ruleName + '!');
    }
    return rule;
  },
  
  _withInput: function (obj, parser) {
    var result;
    this.input.pushInput(obj);
    try {
      result = parser.call(this);
    } finally {
      this.input.popInput();
    }
    return result;
  },
  
  _withObject: function (obj, parser) {
    return this._withInput([obj], parser);
  },
  
  _choice: function (/* parsers... */) {
    var startPosition = this.input.position;
    for (var i = 0; i < arguments.length; i++) {
      try {
        return arguments[i].call(this);
      } catch (error) {
        if (error === BacktrackingException) {
          this.input.position = startPosition;
        } else {
          throw error;
        }
      }
    }
    return this._fail();
  },
  
  _concat: function (/* parsers... */) {
    var result;
    for (var i = 0; i < arguments.length; i++) {
      result = arguments[i].call(this);
    }
    return result;
  },
  
  _not: function (parser) {
    var startPosition = this.input.position;
    try {
      parser.call(this);
    } catch (error) {
      if (error === BacktrackingException) {
        this.input.position = startPosition;
        return null;
      } else {
        throw error;
      }
    }
    this.input.position = startPosition;
    return this._fail();
  },
  
  _lookahead: function (parser) {
    var startPosition = this.input.position;
    var result = parser.call(this);
    this.input.position = startPosition;
    return result;
  },
  
  _repeat: function (parser, range) {
    if (typeof range === 'number') {
      range = Range.inclusive(range, range);
    } else if (typeof range === 'undefined') {
      range = Range.exclusive(0, null);
    }
    
    var results = [];
    var lastPosition = this.input.position;
    while ((!range.end) ||
           (range.exclusive && results.length < range.end) ||
           (results.length <= range.end)) {
      try {
        results.push(parser.call(this));
        lastPosition = this.input.position;
      } catch (error) {
        if (error === BacktrackingException && 
            results.length >= range.start) {
          this.input.position = lastPosition;
          return results;
        } else {
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
    } else if (typeof range === 'undefined') {
      range = Range.exclusive(0, null);
    }
    
    var results = [];
    var lastPosition = this.input.position;
    while ((!range.end) ||
           (range.exclusive && results.length < range.end) ||
           (results.length <= range.end)) {
      try {
        if (results.length !== 0) {
          delimiterParser.call(this);
        }
        results.push(elementParser.call(this));
        lastPosition = this.input.position;
      } catch (error) {
        if (error === BacktrackingException && 
            results.length >= range.start) {
          this.input.position = lastPosition;
          return results;
        } else {
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
    var startPosition = this.input.position;
    try {
      return parser.call(this);
    } catch (error) {
      if (error === BacktrackingException) {
        this.input.position = startPosition;
        return null;
      } else {
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
    } else {
      return this._anything(function (c) {
        for (var i = 0; i < arguments.length; i++) {
          var predValue = arguments[i];
          if (this._applyCharPredicate(arguments[i], c)) {
            return true;
          }
        }
        return false;
      });
    }
  },
  
  _applyCharPredicate: function (pred, c) {
    t = typeof pred;
    if (typeof pred === 'function') {
      return pred.call(this, c);
    } else {
      return pred.include(c);
    }
  },
  
  _anything: function (predicate) {
    if (!this.input.eof() &&
        (predicate == null || predicate.call(this, this.input.peek()))) {
      return this.input.read();
    } else {
      return this._fail();
    }
  },
  
  _fail: function () {
    throw BacktrackingException;
  },
  
  _error: function (description) {
    throw new Error(description);
  },
  
  _nothing: function () {
    return null;
  },
  
  _eof: function () {
    if (this.input.eof()) {
      return null;
    } else {
      return this._fail();
    }
  },
  
  _predicate: function (predicate) {
    if (predicate.call(this)) {
      return null;
    } else {
      return this._fail();
    }
  },
  
  _action: function (action) {
    action.call(this);
  },
  
  _matchedInput: function (parser) {
    var startPosition = this.input.position;
    parser.call(this);
    var endPosition = this.input.position;
    return this.input.slice(startPosition, endPosition);
  },
  
  _destructure: function (/* what = null, parser */) {
    var what = (arguments.length >= 2 ? arguments[0] : this._anything());
    var parser = (arguments.length >= 2 ? arguments[1] : arguments[0]);
    return this._withInput(what, function () {
      parser.call(this);
      this._eof();
      return what;
    });
  }
  
});

['repeat', 'delimited', 'equals', 'eachChar', 'each', 'include', 'char', 
'anything', 'fail', 'nothing', 'eof', 'matchedInput', 'destructure', 'apply',
'withObject', 'withInput', 'error', 'delimited1'
].forEach(function (name) {
  BaseParser.prototype[name] = BaseParser.prototype['_' + name];
});
