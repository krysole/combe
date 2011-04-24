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
var ParserInput = require('./parser_input');

var typeOf = function (what) {
  if (Array.isArray(what)) {
    return 'array';
  } else if (what != null && what.combeType != null) {
    return what.combeType;
  } else {
    return typeof what;
  }
};


var BaseParser = module.exports = function () {
  this.input = new ParserInput();
};

var ParseError = BaseParser.ParseError = defineException('ParseError');

extend(BaseParser.prototype, {
  
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
      if (!this.input.eof) {
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
      result = this._apply(parser);
    } finally {
      this.input.popInput();
    }
    return result;
  },
  
  _withObject: function (obj, parser) {
    return _withInput([obj], parser);
  },
  
  _choice: function (/* parsers... */) {
    var startPosition = this.input.position;
    for (var i = 0; i < arguments.length; i++) {
      try {
        return this._apply(arguments[i]);
      } catch (error) {
        if (error instanceof ParseError) {
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
      result = this._apply(arguments[i]);
    }
    return result;
  },
  
  _not: function (parser) {
    var startPosition = this.input.position;
    try {
      this._apply(parser);
    } catch (error) {
      if (error instanceof ParseError) {
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
    var result = this._apply(parser);
    this.input.position = startPosition;
    return result;
  },
  
  _repeat: function (parser, min /* = 0 */, max /* = null */) {
    if (min == null) min = 0;
    var results = [];
    var lastPosition = this.input.position;
    while (max == null || results.length < max) {
      try {
        results.push(this._apply(parser));
        lastPosition = this.input.position;
      } catch (error) {
        if (error instanceof ParseError && 
            results.length >= min) {
          this.input.position = lastPosition;
          return results;
        } else {
          throw error;
        }
      }
    }
    return results;
  },
  
  _repeat1: function (parser, max /* = null */) {
    return this._repeat(parser, 1, max);
  },
  
  _delimited: function (elementParser, delimiterParser, min /* = 0 */, max /* = null */) {
    if (min == null) min = 0;
    var results = [];
    var lastPosition = this.input.position;
    while (max == null || results.length < max) {
      try {
        if (results.length !== 0) {
          this._apply(delimiterParser);
        }
        results.push(this._apply(elementParser));
        lastPosition = this.input.position;
      } catch (error) {
        if (error instanceof ParseError &&
            results.length >= min) {
          this.input.position = lastPosition;
          return results;
        } else {
          throw error;
        }
      }
    }
    return results;
  },
  
  _delimited1: function (elementParser, delimiterParser, max /* = null */) {
    return this._delimited(elementParser, delimitierParser, 1, max);
  },
  
  _optional: function (parser) {
    var startPosition = this.input.position;
    try {
      return this._apply(parser);
    } catch (error) {
      if (error instanceof ParseError) {
        this.input.position = startPosition;
        return null;
      } else {
        throw error;
      }
    }
  },
  
  defaultTokenOperatorHandler: function (parser) {
    return this._apply(parser);
  },
  
  identifierTokenOperatorHandler: function (name) {
    return this.defaultTokenOperatorHandler(name);
  },
  
  stringTokenOperatorHandler: function (string) {
    return this.defaultTokenOperatorHandler(string);
  },
  
  parserTokenOperatorHandler: function (pattern) {
    return this.defaultTokenOperatorHandler(pattern);
  },
  
  _apply: function (what /* , args... */) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this._typeParsers[typeOf(what)].call(this._typeParsers, this, what, args);
  },
  
  _typeParsers: { // Default typeParsers (tailored for pattern matching objects).
    string: function (parser, what, args) {
      return parser._equals(what);
    },
    number: function (parser, what, args) {
      return parser._equals(what);
    },
    object: function (parser, what, args) {
      return parser._equals(what);
    },
    array: function (parser, what, args) {
      return parser._equals(what);
    },
    range: function (parser, what, args) {
      return parser._equals(what);
    }, 
    'boolean': function (parser, what, args) {
      return parser._equals(what);
    },
    'function': function (parser, what, args) {
      return what.apply(parser, args);
    }
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
      results.push(this._apply(elem));
    });
    return results;
  },
  
  _include: function (what) {
    return this._anything(function (obj) {
      return what.include(obj);
    });
  },
  
  _char: function (/* ...args */) {
    var args = Array.prototype.slice.call(arguments, 0);
    return this._anything(function (obj) {
      if (args.length === 0) {
        return true;
      }
      for (var i = 0; i < args.length; i++) {
        var what = args[i];
        if (this._charPredicates[typeOf(what)](what, obj)) {
          return true;
        }
      }
      return false;
    });
  },
  
  _charPredicates: {
    string: function (what, obj) {
      return (typeof obj === 'string' && what.indexOf(obj) !== -1);
    },
    number: function (what, obj) {
      return false;
    },
    object: function (what, obj) {
      return false;
    },
    array: function (what, obj) {
      return what.include(obj);
    },
    range: function (what, obj) {
      return what.include(obj);
    }, 
    'boolean': function (what, obj) {
      return false;
    },
    'function': function (what, obj) {
      return what(obj);
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
    throw new ParseError();
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
    this._apply(parser);
    var endPosition = this.input.position;
    return this.input.slice(startPosition, endPosition);
  },
  
  _destructure: function (/* what = null, parser */) {
    var what = (arguments.length >= 2 ? arguments[0] : this._anything());
    var parser = (arguments.length >= 2 ? arguments[1] : arguments[0]);
    return this._withInput(what, function () {
      this._apply(parser);
      this._eof();
      return what;
    });
  }
  
});

['repeat', 'delimited', 'equals', 'eachChar', 'each', 'include', 'char', 
'anything', 'fail', 'nothing', 'eof', 'matchedInput', 'destructure'
].forEach(function (name) {
  BaseParser.prototype[name] = BaseParser.prototype['_' + name];
});
