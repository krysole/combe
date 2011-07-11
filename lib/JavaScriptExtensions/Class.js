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

require('./Object');


var Class = global.Class = function Class(supertype, descriptors) {
  return Class.new(supertype, descriptors);
};

Object.extend(Class, {

  new: function (supertype) {
    var properties = (arguments.length > 2) ? arguments[2] : arguments[1];
    var classProperties = (arguments.length > 2) ? arguments[1] : {};
    
    var Constructor = Class.create(supertype);
    
    Object.extend(Constructor, classProperties);
    Object.extend(Constructor.prototype, properties);
    
    return Constructor;
  },

  create: function (supertype) {
    var descriptors = (arguments.length > 2) ? arguments[2] : arguments[1];
    var classDescriptors = (arguments.length > 2) ? arguments[1] : {};
    
    var Constructor = function () {
      return Constructor.new.apply(Constructor, arguments);
    };
    Constructor.new = function () {
      var obj = Object.create(this.prototype);
      obj.initialize.apply(obj, arguments);
      return obj;
    };
    Constructor.__type = 'Class';
    
    Object.defineProperties(Constructor, classDescriptors);
    Constructor.prototype = Object.create(supertype.prototype, descriptors);
    
    return Constructor;
  },

});

Object.prototype.initialize = function () {};
