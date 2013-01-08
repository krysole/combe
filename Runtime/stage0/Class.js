//
// Combe - Improved JavaScript with Pattern Matching
//
// Copyright 2012 Lorenz Pretterhofer <krysole@alexicalmistake.com>
//
// Permission to use, copy, modify, and distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
//
'use strict';

global.Class = {
  
  classPrototype: {
    // Each class object inherits from a it's respective classPrototype, which 
    // in turn inherits from it's superclasses classPrototype, and eventually, 
    // reaching Object.classPrototype, which inherits Class.prototype.
    // As usual Class.prototype inherits Object.prototype, being the last link
    // in the inheritance chain.
    
    allocate: function () {
      throw Error.new('Cannot allocate uninitialized classes, use Class.new() instead');
    },
    
    new: function (superclass, classPrototypeExtensions, prototypeExtensions) {
      if (superclass == null) superclass = Object;
      
      if (!Class.prototype.isPrototypeOf(superclass.classPrototype)) {
        console.dir(superclass);
        console.dir(superclass.classPrototype);
        console.dir(superclass.__proto__);
      }
      assert(Class.prototype.isPrototypeOf(superclass.classPrototype));
      assert(superclass.prototype != null);
      
      var classPrototype = Object.create(superclass.classPrototype);
      var _class = Object.create(classPrototype);
      classPrototype.classInstance = _class;
      _class.prototype = Object.create(superclass.prototype);
      _class.classPrototype = classPrototype;
      _class.superclass = superclass;
      
      classPrototype.extend(classPrototypeExtensions);
      _class.prototype.extend(prototypeExtensions);
      
      _class.initialize();
      
      return _class;
    },
    
  },
  
  prototype: {
    
    subclass: function (classPropOrFunc, propOrFunc) {
      return Class.new(this, classPropOrFunc, propOrFunc);
    },
    
    allocate: function () {
      return Object.create(this.prototype);
    },
    
    new: function () {
      var o = this.allocate();
      o.initialize.apply(o, arguments);
      return o;
    },
    
    isClassOf: function (what) {
      return this.prototype.isPrototypeOf(what);
    },
    
  },

};
Object.setPrototypeOf(Class.classPrototype, Class.prototype);
Object.setPrototypeOf(Class, Class.classPrototype);

Class.classPrototype.classInstance = Class;
Class.superclass = Object;
      
Function.prototype.classPrototype = Object.create(Class.prototype);
Function.prototype.classPrototype.classInstance = null;
Function.prototype.superclass = null;
Object.setPrototypeOf(Function.prototype, Function.prototype.classPrototype);
Function.prototype.new = function () {
  var o = Object.create(this.prototype);
  var result = this.apply(o, arguments);
  if (result != null) return result;
  else return o;
};
