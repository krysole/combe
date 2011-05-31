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
var BaseParser = require('./base_parser');


var BaseTokenParser = module.exports = function () {
  BaseParser.apply(this, arguments);
};

extend((BaseTokenParser.prototype = Object.create(BaseParser.prototype)), {
  
  _typeParsers: {
    string: function (parser, what, args) {
      return parser.getNextToken(what);
    },
    number: function (parser, what, args) {
      parser._fail();
    },
    object: function (parser, what, args) {
      parser._fail();
    },
    array: function (parser, what, args) {
      parser._fail();
    },
    range: function (parser, what, args) {
      parser._fail();
    }, 
    'boolean': function (parser, what, args) {
      parser._fail();
    },
    'function': function (parser, what, args) {
      return what.apply(parser, args);
    }
  },
  
  getNextToken: function (tag) {
    if (this.input.current.eof()) {
      this._fail();
    }
    
    var token = this.input.current.read();
    if (token.is(tag)) {
      return token;
    } else {
      this._fail();
    }
  },
  
});
