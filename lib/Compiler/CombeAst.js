//
// Combe - A Parsing Extension for JavaScript
//
// Copyright 2015 Lorenz Pretterhofer <krysole@alexicalmistake.com>
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
"use strict";

var Ast = require("../Ast.js");



var CombeAst = module.exports = Ast.define("CombeAst", {
  
  Composite: ["fragments"],
  
  Fragment:  ["text"],
  
  
  
  Rule: ["indent", "name", "inferredName", "parametersFragment", "body"],
  
  
  
  ChoicePattern:              ["patterns"],
  
  SequencePattern:            ["patterns"],
  
  ChainPattern:               ["leftPattern", "rightPattern"],
  BindPattern:                ["pattern", "name"],
  
  LookaheadPattern:           ["pattern"],
  DoubleNegatePattern:        ["pattern"],
  NegatePattern:              ["pattern"],
  OptionalPattern:            ["pattern"],
  RepeatPattern:              ["pattern"],
  Repeat1Pattern:             ["pattern"],
  
  // Arguments here may be patterns or fragments, but not null.
  DotMethodCallPattern:       ["pattern", "name", "arguments"],
  DotPattern:                 ["pattern", "name"],
  SubscriptMethodCallPattern: ["pattern", "nameFragment", "arguments"],
  SubscriptPattern:           ["pattern", "nameFragment"],
  CallPattern:                ["pattern", "arguments"],
  
  PredicatePattern:           ["semanticBody"],
  ActionPattern:              ["semanticBody"],
  ImmediatePattern:           ["semanticBody"],
  PropertyPattern:            ["name"],
  ObjectPattern:              ["semanticBody"],
  HashPattern:                ["semanticBody"],
  StringPattern:              ["text"],
  NumberPattern:              ["text"],
  RegularExpressionPattern:   ["text"],
  NestedArrayPattern:         ["pattern"],
  
  NextPattern:                [],
  EmptyPattern:               [],
  
  
  
  ExpressionSemanticBody:     ["fragment"],
  FunctionSemanticBody:       ["fragment"]
  
});
