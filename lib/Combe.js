//
// The Mention Programming Language
//
// Copyright 2015 Lorenz Pretterhofer <krysole@alexicalmistake.com>
//
// Permission to use, copy, modify, sublicense, and/or distribute this 
// work for any purpose with or without fee is hereby granted.
//
// THE WORK IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS WORK INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS WORK.
//
"use strict";

var Combe = {};
module.exports = Combe;



require("./String.polyfill.js");
require("./Array.polyfill.js");



Combe.Grammar = require("./Grammar.js");
Combe.TextGrammar = require("./TextGrammar.js");
Combe.ArrayGrammar = require("./ArrayGrammar.js");
Combe.AstVisitor = require("./AstVisitor.js");
Combe.Compiler = require("./Compiler/Compiler.js");
