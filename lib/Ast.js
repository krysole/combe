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
require('./JavaScriptExtensions');

var Ast = module.exports = Class.new(Object, {

  // AstConstructor, { typename: [ attributeName, ... ], ... } -> null
  initTypeConstructors: function (constructor, types) {
    types = (types != null 
      ? types
      : (constructor.Types != null
        ? constructor.Types
        : {}));
    Object.getOwnPropertyNames(types).each(function (name) {
      constructor[name] = function () {
        var args = Array.slice(arguments);
        return this.new(name, types[name], args);
      };
    });
  },
  
}, {
  
  initialize: function (type, childrenNames, childrenAttributes) {
    this.type = type;
    this.childrenNames = childrenNames;
    for (var i = 0; i < childrenNames.length; i++) {
      this[childrenNames[i]] = childrenAttributes[i];
    }
  },
  
  copy: function () {
    return MetaphorAst.new(
      this.type, 
      this.childrenNames, 
      this.childrenAttributes
    );
  },
  
  get childrenAttributes() {
    var values = [];
    for (var i = 0; i < this.childrenNames.length; i++) {
      values.push(this[this.childrenNames[i]]);
    }
    return values;
  },
  
  get children() {
    var self = this;
    var values = [];
    this.childrenNames.each(function (name) {
      if (Array.isArray(self[name])) {
        values.pushAll(self[name].filter(function (elem) {
          return elem instanceof Ast;
        }));
      }
      else if (self[name] instanceof Ast) {
        values.push(self[name]);
      }
    });
    return values;
  },
  
  at: function (index) {
    var name = this.attributeNames[i];
    if (name) {
      return this[name];
    }
    else {
      return undefined;
    }
  },
  
  toString: function () {
    return 'MetaphorAst[' + this.type + ']';
  },
  
  toJson: function () {
    var self = this;
    var o = {};
    o.type = self.type;
    this.childrenNames.each(function (name) {
      o[name] = Object.toJson(self[name]);
    });
    return o;
  },
  
  is: function (type) {
    return this.type === type;
  },
  
  visit: function (visitor) {
    var visitorMethod = visitor['visit' + this.type];
    if (visitorMethod) {
      return visitorMethod.call(visitor, this);
    }
    else if (visitor.visitUnspecified) {
      return visitor.visitUnspecified(this);
    }
    else {
      throw new Error('No visitor method specified for Ast type: ' + this.type);
    }
  },
  
  visitChildren: function (visitor) {
    return this.children.visitAll(visitor);
  },
  
});
