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


var TokenParser = module.exports = function () {
  BaseParser.apply(this, arguments);
};

extend((TokenParser.prototype = Object.create(BaseParser.prototype)), {
  
  _typeParsers: {
    String: function (what) {
      return parser.getNextToken(what);
    },
    default: function (what) {
      throw new Error('No apply type pattern for type of: ' + what);
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
  
  eof: function () {
    return this.getNextToken('eof');
  },
  
});
