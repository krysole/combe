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

// Bootstrap definition (authoritative definition provided in Array.js)
Array.prototype.include = function (what) {
  for (var i = 0; i < what.length; i++) {
    if (this[i] === what) return true;
  }
  return false;
};

global.Class = {
  
  classPrototype: {
    
    allocate: function () {
      throw Error.new('Cannot allocate uninitialized classes, use Class.new() instead');
    },
    
    new: function (name, superclass, classPrototypeExtensions, prototypeExtensions) {
      if (superclass == null) superclass = Object;
      
      // Extending most builtins is currently prohibited.
      if ([Function, Array, Buffer, Number, RegExp, String].include(superclass)) {
        throw Error.new('Cannot subclass ' + superclass);
      }
      
      assert(Class.prototype.isPrototypeOf(superclass.classPrototype));
      assert(superclass.prototype != null);
      
      var _class = Object.create(Object.create(superclass.classPrototype));
      _class.classPrototype = _class.__proto__;
      _class.classPrototype.classInstance = _class;
      _class.classPrototype.superclass = superclass;
      _class.classPrototype.name = (name != null ? name : 'Unnamed');
      _class.constructorClassPrototype = undefined;
      _class.prototype = Object.create(superclass.prototype);
      _class.prototype.class = _class;
      
      _class.classPrototype._constructor = function () {};
      _class.classPrototype._constructor.prototype = _class.prototype;
      
      Object.extend(_class.classPrototype, classPrototypeExtensions);
      Object.extend(_class.prototype, prototypeExtensions);
      
      _class.initialize();
      
      return _class;
    },
    
    makeConstructorClass: function (constructor) {
      // Converts a constructor (function) into a ConstructorClass
      assert(typeof constructor === 'function' &&
             constructor.prototype != null &&
             constructor.prototype.__proto__ != null &&
             typeof constructor.prototype.__proto__.constructor === 'function');
      constructor.classPrototype = Object.create(Class.prototype);
      constructor.classPrototype.classInstance = constructor;
      if (constructor.prototype.__proto__.constructor.classPrototype != null) {
        constructor.classPrototype.superclass = constructor.prototype.__proto__.constructor;
      }
      else {
        constructor.classPrototype.superclass = Object;
      }
      constructor.constructorClassPrototype = Object.create(constructor.classPrototype);
      Object.synchronizeOwnProperties(constructor.constructorClassPrototype, Function.prototype);
      Object.setPrototypeOf(constructor, constructor.constructorClassPrototype);
      constructor.prototype.class = constructor;
      constructor.prototype.initialize = function () {
        Object.prototype.initialize.call(this);
        var result = this.constructor.apply(this, arguments);
        assert(result === this || result == null);
      };
      
      return constructor;
    },
    
  },
  
  prototype: {
    
    subclass: function (name, classPrototypeExtensions, prototypeExtensions) {
      return Class.new(name, this, classPrototypeExtensions, prototypeExtensions);
    },
    
    resetConstructor: function (constructor) {
      if (constructor != null) {
        constructor.prototype = this.prototype;
        this._constructor = constructor;
      }
      else {
        this._constructor = function () {};
        this._constructor.prototype = this.prototype;
      }
    },
    
    allocate: function () {
      return new this._constructor();
    },
    
    new: function () {
      var o = this.allocate();
      o.initialize.apply(o, arguments);
      return o;
    },
    
    isClassOf: function (what) {
      return (
        what != null &&
        (
          this.prototype === what.__proto__ ||
          this.isClassOf(what.__proto__)
        )
      );
    },
    
    isExactClassOf: function (what) {
      return (
        what != null &&
        this.prototype === what.__proto__
      );
    },
    
    extendClassPrototype: function (classPrototypeExtensions) {
      Object.extend(this.classPrototype, classPrototypeExtensions);
    },
    
    extendPrototype: function (prototypeExtensions) {
      Object.extend(this.prototype, prototypeExtensions);
    },
    
    extend: function (classPrototypeExtensions, prototypeExtensions) {
      Object.extend(this.classPrototype, classPrototypeExtensions);
      Object.extend(this.prototype, prototypeExtensions);
    },
    
    toString: function () {
      return '<' + this.class.name + ' ' + this.name + '>';
    },
    
  },

};
Object.setPrototypeOf(Class.classPrototype, Class.prototype);
Object.setPrototypeOf(Class, Class.classPrototype);
Class.classPrototype.classInstance = Class;
Class.superclass = Object;

Function.prototype.new = function () {
  var o = Object.create(this.prototype);
  var result = this.apply(o, arguments);
  if (result != null) return result;
  else return o;
};

Object.classPrototype = Object.create(Class.prototype);
Object.classPrototype.classInstance = Object;
Object.classPrototype.superclass = null;
Object.constructorClassPrototype = Object.create(Object.classPrototype);
Object.synchronizeOwnProperties(Object.constructorClassPrototype, Function.prototype);
Object.setPrototypeOf(Object, Object.constructorClassPrototype);
Object.prototype.class = Object;

// Specialize Standard JS Constructors
Class.makeConstructorClass(Function);
Class.makeConstructorClass(Array);
// Class.makeConstructorClass(Buffer);
Class.makeConstructorClass(Error);
Class.makeConstructorClass(Number);
Class.makeConstructorClass(RegExp);
Class.makeConstructorClass(String);
Class.makeConstructorClass(Boolean);

// Provide specialized new methods for builtins (where appropriate).
Function.new = function () {
  if (arguments.length >= 1) {
    var code = arguments[arguments.length - 1];
    if (!code.match(/^["']use strict["'];/)) {
      arguments[arguments.length - 1] = '"use strict";\n' + code;
    }
    return Function.apply(null, arguments);
  }
  else {
    return Function();
  }
};
Object.new = Object;
Array.classPrototype.new = Array;
// Buffer.classPrototype.new = Buffer; // Cannot class convert Buffer safely
Error.classPrototype.new = undefined; // Defined in Error.js
Number.classPrototype.new = undefined;
RegExp.classPrototype.new = RegExp;
String.classPrototype.new = undefined;

Object.getCreatorOf = function (what) {
  if (Class.isClassOf(what.class)) {
    return what.class;
  }
  else if (Function.isClassOf(what.constructor)) {
    return what.constructor;
  }
  else {
    // Object.create or a function whose '.prototype.constructor' 
    // property has been removed.
    return null;
  }
};
