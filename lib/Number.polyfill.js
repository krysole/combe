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



// Sourced: 2015-10-09; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
if (!Number.isInteger) {
  Number.isInteger = function(value) {
      return typeof value === "number" && 
             isFinite(value) && 
             Math.floor(value) === value;
  };
}

// Sourced: 2015-10-09; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
if (!Number.isFinite) {
  Number.isFinite = function(value) {
      return typeof value === "number" && isFinite(value);
  }
}

if (!Number.isInfinite) {
  Number.isInfinite = function(value) {
      return typeof value === "number" && !isFinite(value);
  }
}
