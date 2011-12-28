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
require('./String');
require('./Array');
require('./Class');
require('./Range');
require('./Buffer');
require('./Number');
require('./Function');

// These don't yet have files of their own.

Boolean.prototype.toSourceString = function () {
  if (this) {
    return 'true';
  }
  else {
    return 'false';
  }
};

RegExp.prototype.toSourceString = function () {
  return this.toString();
};

Boolean.prototype.__type = 'Boolean';
RegExp.prototype.__type = 'RegExp';

Math.randomInteger = function (start, end) {
  var range = end - start;
  var n = Math.floor(Math.random() * (range + 1));
  n %= range; // Prevent the unlikely floating point round to range-end possibility.
  return n + start;
}

Math.generateSalt = function (length) {
  if (length == null) length = 8;
  var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var result = '';
  for (var i = 0; i < length; i++) {
    result += alphabet.charAt(Math.randomInteger(0, alphabet.length))
  }
  return result;
};
