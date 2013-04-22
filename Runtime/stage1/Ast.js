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

global.Ast = Object.subclass('Ast', {
  
  initialize: function () {
    Object.classPrototype.initialize.call(this);
    
    this.initTypeConstructors();
  },
  
  initTypeConstructors: function (types) {
    var _this = this;
    
    if (types == null) types = this.types;
    
    if (types == null) return;
    
    Object.getOwnPropertyNames(types).each(function (name) {
      _this[name] = function () {
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
    return Ast.new(this.type, this.childrenNames, this.childrenAttributes);
  },
  
  deepCopy: function () {
    return Ast.new(
      this.type,
      this.childrenNames.deepCopy(),
      this.childrenAttributes.deepCopy()
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
    var _this = this;
    var values = [];
    this.childrenNames.each(function (name) {
      if (Array.isArray(_this[name])) {
        values.pushAll(_this[name].filter(function (elem) {
          return Ast.isClassOf(elem);
        }));
      }
      else if (Ast.isClassOf(_this[name])) {
        values.push(_this[name]);
      }
    });
    return values;
  },
  
  at: function (index) {
    var name = this.attributeNames[i];
    if (name) {
      return _this[name];
    }
    else {
      return undefined;
    }
  },
  
  toString: function () {
    return '[[Ast ' + this.type + ']]';
  },
  
  is: function (type) {
    return (this.type === type);
  },
  
  isAny: function (array) {
    var _this = this;
    return array.any(function (type) {
      return _this.is(type);
    });
  },
  
  visit: function (visitor) {
    var visitorMethod = visitor['visit' + this.type];
    if (visitorMethod != null) {
      return visitorMethod.call(visitor, this);
    }
    else if (visitor.visitUnspecified != null) {
      return visitor.visitUnspecified(this);
    }
    else {
      throw Error.new('No visitor method specified for ' + this);
    }
  },
  
  visitChildren: function (visitor) {
    return this.children.visitAll(visitor);
  },
  
});
