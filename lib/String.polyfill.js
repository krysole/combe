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



// Sourced: 2015-09-30; https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    if (this == null) {
      throw new TypeError("can't convert " + this + " to object");
    }
    var str = "" + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError("repeat count must be non-negative");
    }
    if (count == Infinity) {
      throw new RangeError("repeat count must be less than infinity");
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return "";
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError("repeat count must not overflow maximum string size");
    }
    var rpt = "";
    for (;;) {
      if ((count & 1) == 1) {
        rpt += str;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      str += str;
    }
    return rpt;
  };
}



if (!String.prototype.quote) {
  String.prototype.quote = function () {
    return JSON.stringify(this);
  };
}
