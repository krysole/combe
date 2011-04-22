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


var BaseTextParser = module.exports = function () {
  BaseParser.apply(this, arguments);
};

extend((BaseTextParser.prototype = Object.create(BaseParser.prototype)), {
  
  _typeParsers: {
    // Todo: Figure out what the unusable matchers should do here? And respectively
    // how to deal with matching over things like arguments lists... Perhaps these
    // are most strongly related to the object currently bound as the input?
    string: function (parser, what, args) {
      return parser._eachChar(what);
    },
    number: function (parser, what, args) {
      return parser._equals(what);
    },
    object: function (parser, what, args) {
      return parser._equals(what);
    },
    array: function (parser, what, args) {
      return parser._each(what);
    },
    range: function (parser, what, args) {
      return parser._include(what);
    }, 
    'boolean': function (parser, what, args) {
      return parser._equals(what);
    },
    'function': function (parser, what, args) {
      return what.apply(parser, args);
    }
  }
  
});
