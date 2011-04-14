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

define(function(require, exports, module) {
  
  var ParserInput = require('combejs/parser_input.js');
  
  var typeOf = function(what) {
    if (Array.isArray(what)) {
      return 'array';
    } else if (what.combeType != null) {
      return what.combeType;
    } else {
      return typeof what;
    }
  };
  
  // Todo: These are used often when compiling to Erlang iolist style arrays, but
  // they don't really belong here. I should either find a place for them or possibly
  // allow them to be added to Array.prototype directly (caveat emptor).
  // var interpolate = function(array, delim) {
  //   var result = [];
  //   array.forEach(function(elem) {
  //     if (result.length !== 0) {
  //       result.push(delim);
  //     }
  //     result.push(elem);
  //   });
  //   return result;
  // };
  // 
  // var without_duplicates = function(array) {
  //   var result = [];
  //   array.forEach(function(elem) {
  //     if (!result.include(elem)) {
  //       result.push(elem);
  //     }
  //   });
  //   return result;
  // };
  
  var ParseError = function() {};
  
  var BaseParser = function() {
    // What are my instance vars? Do I need to early init them anyway?
    this.input = new ParserInput();
  };
  
  (function() {
    
    this.getInput = function() {
      return this.input;
    };
    
    this.withInput = function(obj, parser) {
      var result;
      this.input.pushInput(obj);
      try {
        result = this.apply(parser);
      } catch (error if error instanceof ParseError) {
        this.input.popInput();
        throw error;
      }
      this.input.popInput();
      return result;
    };
    
    this.choice = function(/* parsers... */) {
      var startPosition = this.input.position;
      for (var i = 0; i < arguments.length; i++) {
        try {
          return this.apply(arguments[i]);
        } catch (error if error instanceof ParseError) {
          this.input.position = startPosition;
        }
      }
      return this.fail();
    };
    
    this.concat = function(/* parsers... */) {
      var result;
      for (var i = 0; i < arguments.length; i++) {
        result = this.apply(arguments[i]);
      }
      return result;
    };
    
    this.not = function(parser) {
      var startPosition = this.input.position;
      try {
        this.apply(parser);
      } catch (error if error instanceof ParseError) {
        this.input.position = startPosition;
        return null;
      }
      this.input.position = startPosition;
      return this.fail();
    };
    
    this.lookahead = function(parser) {
      var startPosition = this.input.position;
      var result = this.apply(parser);
      this.input.position = startPosition;
      return result;
    };
    
    this.repeat = function(parser, min /* = 0 */, max /* = null */) {
      if (min == null) min = 0;
      var results = [];
      var lastPosition = this.input.position;
      while (max == null || results.length < max) {
        try {
          results.push(this.apply(parser));
          lastPosition = this.input.position;
        } catch (error if error instanceof ParseError) {
          if (results.length >= min) {
            this.input.position = lastPosition;
            return results;
          } else {
            throw error;
          }
        }
      }
      return results;
    };
    
    this.repeat1 = function(parser, max /* = null */) {
      return this.repeat(parser, 0, max);
    };
    
    this.delimited = function(elementParser, delimiterParser, min /* = 0 */, max /* = null */) {
      if (min == null) min = 0;
      var results = [];
      var lastPosition = this.input.position;
      while (max == null || results.length < max) {
        try {
          if (results.length !== 0) {
            this.apply(delimiterParser);
          }
          results.push(this.apply(elementParser));
          lastPosition = this.input.position;
        } catch (error if error instanceof ParseError) {
          if (results.length >= min) {
            this.input.position = lastPosition;
            return results;
          } else {
            throw error;
          }
        }
      }
      return results;
    };
    
    this.delimited1 = function(elementParser, delimiterParser, max /* = null */) {
      return this.delimited(elementParser, delimitierParser, 0, max);
    };
    
    this.optional = function(parser) {
      var startPosition = this.input.position;
      try {
        return this.apply(parser);
      } catch (error if error instanceof ParseError) {
        this.input.position = startPosition;
        return null;
      }
    };
    
    this.token = function(parser) {
      return this.apply(parser);
    };
    
    this.apply = function(what /* , args... */) {
      var args = Array.prototype.slice.call(arguments, 1);
      return this.typeParsers[typeOf(what)].call(this.typeParsers, this, what, args);
    };
    
    this.typeParsers = { // Default typeParsers (optimized for character inputs).
      // Todo: Move the definition for these outside and make the other default
      // for dealing with streams of objects rather than characters.
      // In fact, I may make the handling of different kinds of input stricter also?
      
      // Todo: Consider moving the subscript call part into a reusable function?
      string: function(parser, what, args) {
        return parser.eachChar(what);
      },
      number: function(parser, what, args) {
        return parser.equals(what);
      },
      object: function(parser, what, args) {
        return parser.equals(what);
      },
      array: function(parser, what, args) {
        return parser.each(what);
      },
      range: function(parser, what, args) {
        return parser.include(what);
      }, 
      'boolean': function(parser, what, args) {
        return parser.equals(what);
      },
      'function': function(parser, what, args) {
        return what.apply(parser, args);
      }
    };
    
    this.equals = function(number) {
      return this.anything(function(obj) {
        return obj === number;
      });
    };
    
    this.eachChar = function(string) {
      for (var i = 0; i < string.length; i++) {
        this._char(string[i]);
      }
      return string;
    };
    
    this.each = function(what) {
      var iteratorFunction = (what.each != null ? what.each : what.forEach);
      var results = [];
      iteratorFunction.call(what, function(elem) {
        results.push(this.apply(elem));
      });
      return results;
    };
    
    this.include = function(what) {
      return this.anything(function(obj) {
        return what.include(obj);
      });
    };
    
    this._char = function(/* arguments... */) {
      return this.anything(function(obj) {
        for (var i = 0; i < arguments.length; i++) {
          var what = arguments[i];
          if (this.charPredicates[typeOf(what)](what, obj)) {
            return true;
          }
        }
        return false;
      });
    };
    this['char'] = this._char;
    
    this.charPredicates = {
      string: function(what, obj) {
        return (typeof obj === 'string' && what.indexOf(obj) !== -1);
      },
      number: function(what, obj) {
        return false;
      },
      object: function(what, obj) {
        return false;
      },
      array: function(what, obj) {
        return what.include(obj);
      },
      range: function(what, obj) {
        return what.include(obj);
      }, 
      'boolean': function(what, obj) {
        return false;
      },
      'function': function(what, obj) {
        return what(obj);
      }
    };
    
    this.anything = function(predicate) {
      if (!this.input.eof() &&
          (predicate == null || predicate(this.input.peek()))) {
        return this.input.read();
      } else {
        return this.fail();
      }
    };
    
    this.fail = function() {
      throw new ParseError();
    };
    
    this.nothing = function() {
      return null;
    };
    
    this.eof = function() {
      if (this.input.eof()) {
        return null;
      } else {
        return this.fail();
      }
    };
    
    this.predicate = function(predicate) {
      if (predicate.call(this)) {
        return null;
      } else {
        return this.fail();
      }
    };
    
    this.action = function(action) {
      action.call(this);
    };
    
    this.matched_input = function(parser) {
      var startPosition = this.input.position;
      this.apply(parser);
      var endPosition = this.input.position;
      return this.input.slice(startPosition, endPosition);
    };
    
    this.destructure = function(/* what = null, parser */) {
      var what = (arguments.length >= 2 ? arguments[0] : this.anything());
      var parser = (arguments.length >= 2 ? arguments[1] : arguments[0]);
      return this.withInput(what, parser);
    };
    
  }).call(BaseParser.prototype);
  
  exports.ParseError = ParseError;
  exports.BaseParser = BaseParser;
});