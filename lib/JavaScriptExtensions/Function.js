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

globals.InvalidArguments = function (message) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  
  this.name = 'InvalidArguments';
  this.message = message;
};
InvalidArguments.prototype.__proto__ = Error.prototype;

Object.extend(Function.prototype, {

  __type: 'Function',
  
  minimumArguments = null;
  maximumArguments = null;
  
  checkArity: function (minimumArguments, maximumArguments) {
    if (typeof maximumArguments === 'undefined') {
      // null must be passed explicitely for unlimited arguments
      maximumArguments = minimumArguments;
    }
    var self = this;
    return function () {
      if (minimumArguments != null && arguments.length < minimumArguments) {
        throw new InvalidArguments('Too few arguments provided');
      }
      else if (maximumArguments != null && arguments.length > maximumArguments) {
        throw new InvalidArguments('Too many arguments provided');
      }
      else {
        return self.apply(this, arguments);
      }
    };
  },

});
