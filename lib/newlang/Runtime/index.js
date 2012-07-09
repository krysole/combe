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

var __combe = require('./__combe');
var Combe = require('./Combe');
var JavaScript = require('./JavaScript');
var Association = require('./Association');
var ContinueException = require('./ContinueException');

var Runtime = module.exports = {
  
  cacheCompilerOutput: true,
  
  execute: function (source) {
    // Todo
    throw Error.new('Runtime.execute unimplemented');
  },
  
  // Todo...
  
  CommonGlobals: Object.freeze({
    // Objects have their own global object, but the shared globals are place here.
    
    __combe: __combe,
    Combe: Combe,
    JavaScript: JavaScript,
    JS: JavaScript,
    Association:        Association,
    ContinueException:  ContinueException,
  }),
  
};
