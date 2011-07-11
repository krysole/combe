//
// Combe/JS - A Parsing Language for JavaScript
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


var Ast = module.exports = Class.new(Object, {

  initialize: function (type, attributes /*, ...children*/) {
    this.type = type;
    this.children = [];
    if (arguments.length > 2) {
      this.concat(Array.prototype.slice.call(arguments, 2));
    }
    if (attributes) {
      var attrNames = Object.keys(attributes);
      for (var i = 0; i < attrNames.length; i++) {
        this[attrNames[i]] = attributes[attrNames[i]];
      }
    }
  },

  toString: function () {
    var s = 'Ast[' + this.type;
    if (this.value != null) s += ' value: ' + this.value;
    if (this.name != null) s += ' name: ' + this.name;
    s += ']';
    return s;
  },

  toJSON: function () {
    var json = {type: this.type};
    if (this.name) json.name = this.name;
    if (this.value) json.value = this.value;
    if (this.children.length > 0) {
      json.children = this.children.map(function (elem) {
        if (!elem.type || !elem.toJSON) {
          // Not an AST node, which means the AST is malformed in some way
          console.dir(elem);
          throw new Error('Child node is not an AST Node!');
        }
        return elem.toJSON();
      });
    }
    return json;
  },

  isType: function (typeString) {
    return this.type === typeString;
  },

  is: function (tagString) {
    return this.isType(tagString);
  },

  concat: function (/* arguments */) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 0);
    args.forEach(function (elem) {
      if (Array.isArray(elem)) {
        elem.forEach(function (elem) {
          self.children.push(elem);
          elem.parent = self;
        });
      }
      else {
        self.children.push(elem);
        elem.parent = self;
      }
    });
    return this;
  },

  push: function (what) {
    this.children.push(what);
    what.parent = this;
    return this;
  },

  isAnyOf: function (tags) {
    var self = this;
    return tags.some(function (elem) {
      return self.is(elem);
    });
  },

});
