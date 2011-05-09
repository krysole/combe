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

var extend = exports.extend = function (obj, from) {
  Object.getOwnPropertyNames(from).forEach(function (name) {
    Object.defineProperty(obj, name, Object.getOwnPropertyDescriptor(from, name));
  });
};


var CustomException = function () {
  Error.captureStackTrace(this, this.constructor);
  if (this.init != null) {
    this.init.apply(this, arguments);
  }
};

CustomException.prototype.constructor = CustomException;
CustomException.name = "CustomException";


var defineException = exports.defineException = function (name, initMethod) {
  var Constructor = function () {
    CustomException.apply(this, arguments);
  };
  Constructor.prototype.constructor = Constructor;
  Constructor.name = name;
  Constructor.prototype.init = initMethod;
  return Constructor;
};


var flattenIOList = exports.flattenIOList = function (obj) {
  if (obj == null) {
    return '';
  } else if (Array.isArray(obj)) {
    return obj.reduce(function (s, elem) {
      return s += flattenIOList(elem);
    }, '');
  } else {
    return obj.toString();
  }
}

Array.prototype.interpolate = function (delim) {
  var result = [];
  this.forEach(function (elem) {
    if (result.length !== 0) {
      result.push(delim);
    }
    result.push(elem);
  });
  return result;
};

if (!Array.prototype.difference) {
  Array.prototype.difference = function (other) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
      if (!other.include(this[i])) {
        result.push(this[i]);
      }
    }
    return result;
  };
}

Array.prototype.withoutDuplicates = function () {
  var result = [];
  this.forEach(function (elem) {
    if (!result.include(elem)) {
      result.push(elem);
    }
  });
  return result;
};

if (!Array.prototype.include) {
  Array.prototype.include = function (what) {
    return (this.indexOf(what) !== -1);
  };
}

if (!Array.prototype.isEmpty) {
  Array.prototype.isEmpty = function (what) {
    return (this.length === 0);
  };
}

Array.prototype.flatten1 = function () {
  var result = []
  this.forEach(function (elem) {
    result = result.concat(elem);
  });
  return result;
};

Array.prototype.any = function (iterator) {
  for (var i = 0; i < this.length; i++) {
    if (iterator(this[i])) {
      return true;
    }
  }
  return false;
};

if (!String.prototype.quote) {
  String.prototype.quote = function () {
    var c, i, l = this.length, o = '"';
    for (i = 0; i < l; i += 1) {
      c = this.charAt(i);
      if (c >= ' ') {
        if (c === '\\' || c === '"') {
          o += '\\';
        }
        o += c;
      } else {
        switch (c) {
        case '\b':
          o += '\\b';
          break;
        case '\f':
          o += '\\f';
          break;
        case '\n':
          o += '\\n';
          break;
        case '\r':
          o += '\\r';
          break;
        case '\t':
          o += '\\t';
          break;
        default:
          c = c.charCodeAt();
          o += '\\u00' + Math.floor(c / 16).toString(16) +
            (c % 16).toString(16);
        }
      }
    }
    return o + '"';
  };
}

// The reserved words properties include the ES5 additions, both for compatability
// and strict mode (to help with porting/upwards compatability).

String.Keywords = 
  ['break     do        instanceof  typeof',
   'case      else      new         var',
   'catch     finally   return      void',
   'continue  for       switch      while',
   'debugger  function  this        with',
   'default   if        throw',
   'delete    in        try'
   ].join(' ').split(' ');

String.FutureReservedWords = 
  ['class       enum    extends   super',
   'const       export  import',
   
   'implements  let     private   public  yield', // Strict mode
   'interface   package protected static'
   ].join(' ').split(' ');

String.ReservedWords = String.Keywords.concat(String.FutureReservedWords);

String.CompatabilityReservedWords = 
  ["abstract boolean break byte case catch char class const continue", 
   "debugger default delete do double else enum export extends false final", 
   "finally float for function goto if implements import in instanceof int",
   "interface long native new null package private protected public return",
   "short static super switch synchronized this throw throws transient true",
   "try typeof var volatile void while with"].join(' ').split(' ');

String.prototype.isKeyword = function () {
  return String.Keywords.include(this.valueOf());
};

String.prototype.isFutureReservedWord = function () {
  return String.FutureReservedWords.include(this.valueOf());
};

String.prototype.isReservedWord = function () {
  return String.ReservedWords.include(this.valueOf());
};

String.prototype.isCompatabilityReservedWord = function () {
  return String.CompatabilityReservedWords.include(this.valueOf());
};

String.prototype.lineColumnAt = function (index) {
  if (index < 0 || index > this.length) {
    throw new Error("Index out of range");
  }
  var line = 1, column = 1;
  for (var i = 0; i < index; i++) {
    if (this[i] === '\r' && this[i + 1] === '\n') {
      column += 1;
    } else if (this[i] === '\n' || this[i] === '\r') {
      line += 1;
      column = 1;
    } else {
      column += 1;
    }
  }
  return [line, column];
};
