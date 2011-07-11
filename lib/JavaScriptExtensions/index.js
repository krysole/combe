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

// These don't yet have files of their own.

Number.prototype.toSourceString = function () {
  return this.toString();
};

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

Number.prototype.__type = 'Number';
Boolean.prototype.__type = 'Boolean';
RegExp.prototype.__type = 'RegExp';
Function.prototype.__type = 'Function';
