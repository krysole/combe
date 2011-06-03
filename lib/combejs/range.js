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

// Todo: Finish implementing Range (I'm still not entirely sure how they
// should be actually used, never mind that there is probably a good implementation
// already available?)
  
var Range = module.exports = function (from, to) {
  Object.defineProperty(this, 'from', {value: from, writable: false});
  Object.defineProperty(this, 'to', {value: to, writable: false});
};

Range.inclusive = function (from, to) {
  return new Range(from, to);
};

// Todo fix the rest of this to handle exclusive ranges properly
// Range.exclusive = function (from, upto) {
//   return new Range(from, upto - 1);
// };

Range.prototype.include = function (what) {
  return (this.from <= what && what <= this.to);
};

Range.prototype.combeType = 'range';
