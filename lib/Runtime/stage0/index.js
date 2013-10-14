//
// Combe - Improved JavaScript with Pattern Matching
//
// Copyright 2012 Lorenz Pretterhofer <krysole@alexicalmistake.com>
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
'use strict';

// Stage 0 initializes the core runtime facilities, allowing Combe modules to be
// loaded (but only those depending on nominal runtime support).

// Todo: Replace assert with our own version supporting better log output and
// Combe file-position insertion.
global.assert = require('assert');

var path = require('path');
process.command = path.basename(process.argv[1]) + path.extname(process.argv[1]);
process.absoluteCommand = path.resolve(process.command);
process.arguments = process.argv.slice(2);

require('./Object');
require('./Class');

require('./Error');

require('./__combe');

require('./Array');
require('./String');
require('./Range');
require('./Regex');
require('./Buffer');
require('./Number');
require('./miscelaneous');

global.__combe_runtimeStage0Loaded = true;