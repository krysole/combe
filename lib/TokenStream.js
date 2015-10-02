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



function TokenStream(lexer) {
  this._lexer = lexer;
  this._tokens = [];
};
TokenStream.prototype = Object.create(Object.prototype);
TokenStream.prototype.constructor = TokenStream;
module.exports = TokenStream;



TokenStream.prototype.at = function (index) {
  for (var i = this._tokens.length; i <= index; i++) {
    if (this._tokens.length === 0 ||
        this._tokens[this._tokens.length - 1].type !== "End") {
      this._tokens.push(this._lexer.matchToken());
    }
    else {
      throw new Error("Cannot get token past end of token stream (including End token).");
    }
  }
  return this._tokens[index];
};

TokenStream.prototype.count = function () {
  while (this._tokens.length === 0 ||
         this._tokens[this._tokens.length - 1].type !== "End") {
    this._tokens.push(this._lexer.matchToken());
  }
  return this._tokens.length;
};

TokenStream.prototype.slice = function (start, end) {
  var _last = this.at(end - 1);
  return this._tokens.slice(start, end);
};
