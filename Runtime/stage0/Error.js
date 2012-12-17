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

Error.extend({
  
  subclass: function (name, classPropOrFunc, propOrFunc) {
    var _class = Class.new(Error, classPropOrFunc, propOrFunc);
    _class.name = name;
    return _class;
  },

  named: function (name, message) {
    var e = Error.new(message)
    e.name = name;
    return e;
  },
  
});

Error.prototype.extend({
  
  initialize: function () {
    Error.apply(this, arguments);
  },
  
});

global.ShouldOverrideError = Error.subclass('ShouldOverrideError');
global.UnimplementedError = Error.subclass('UnimplementedError');
