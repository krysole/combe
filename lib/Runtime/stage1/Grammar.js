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

// Todo: This can and probably should be rewritten in Combe notation.

global.Grammar = Object.subclass('Grammar', {
  
  match: function (source, sourcename) {
    var matchargs = Array.slice(arguments, 2);
    
    var parser = this.new(source, sourcename);
    return parser.match.apply(parser, matchargs);
  },
  
  matchAll: function (source, sourcename) {
    var matchargs = Array.slice(arguments, 2);
    
    var parser = this.new(source, sourcename);
    return parser.matchAll.apply(parser, matchargs);
  },
  
}, {
  
  start: function () {
    throw ShouldOverideError.new('Grammar.start()');
  },
  
  initialize: function (source, sourcename) {
    this.source = source;
    this.sourcename = sourcename;
    this._position_storage = 0;
    this.furthestPosition = 0;
    this.state = {};
    
    this.__combe_initializeMemoTableArray(source.length);
  },
  
  get filename() { return this.sourcename; },
  set filename(filename) { this.sourcename = filename; },
  
  get position() { return this._position_storage; },
  set position(position) {
    this._position_storage = position;
    this.furthestPosition = Math.max(this.furthestPosition, position);
  },

  match: function (rulename) {
    if (rulename == null) rulename = 'start';
    var args = Array.slice(arguments, 1);
    try {
      var rule = this[rulename];
      if (rule == null) throw Error.new('No rule named "' + rulename + '"');
      return rule.apply(this, args);
    }
    catch (e) {
      if (e === Backtrack) {
        this.error('Failed to match input');
      }
      else {
        throw e;
      }
    }
  },

  matchAll: function (rulename) {
    if (rulename == null) rulename = 'start';
    var args = Array.slice(arguments, 1);
    try {
      var rule = this[rulename];
      if (rule == null) throw Error.new('No rule named "' + rulename + '"');
      var result = rule.apply(this, args);
      this.eof();
      return result;
    }
    catch (e) {
      if (e === Backtrack) {
        this.error('Failed to match input');
      }
      else {
        throw e;
      }
    }
  },

  // Todo: Add support for range/integer limits, i.e., 5 element delimited list.
  // Todo: Respectively, add a repeat function that provides the same facility
  delimited: function (elementParser, delimiterParser) {
    var initialPosition, initialState;
    var result = [];
  
    while (true) {
      try {
        initialPosition = this.position;
        initialState = this.state;
        if (result.length >= 1) {
          delimiterParser.call(this);
        }
        result.push(elementParser.call(this));
      }
      catch (e) {
        if (e === Backtrack) {
          this.position = initialPosition;
          this.state = initialState;
          return result;
        }
        else {
          throw e;
        }
      }
    }
  },

  nonZeroDelimited: function (elementParser, delimiterParser) {
    var result = this.delimited(elementParser, delimiterParser);
    if (result.length >= 1) return result;
    else throw Backtrack;
  },

  handleHashPattern: function (parser) {
    throw ShouldOverrideError.new('Grammar.handleHashPattern()');
  },

  handleStringPattern: function (string) {
    throw ShouldOverrideError.new('Grammar.handleStringPattern()');
  },

  fail: function () {
    throw Backtrack;
  },

  nothing: function () {
    return null;
  },
  
  anything: function () {
    return this.next();
  },
  
  isEof: function () {
    return (this.position >= this.source.length);
  },
  eof: function () {
    if (this.isEof()) return null;
    else throw Backtrack;
  },
  
  at: function (position) {
    if (position >= 0 && position < this.source.length) {
      return this.source[position];
    }
    else {
      throw Backtrack;
    }
  },
  
  peek: function () {
    return this.at(this.position);
  },
  
  next: function () {
    var value = this.at(this.position);
    this.position = this.position + 1;
    return value;
    // return this.at(this.position++);
  },
  
  last: function () {
    return this.at(this.position - 1);
  },
  
  nextIf: function (predicate) {
    var o = this.next();
    if (predicate.call(this, o)) return o;
    else throw Backtrack;
  },
  
  matchedInput: function (parser) {
    var startPosition = this.position;
    parser.call(this);
    var endPosition = this.position;
    return this.slice(startPosition, endPosition);
  },
  
  slice: function (start, end) {
    return this.source.slice(start, end);
  },
  
  error: function (message) {
    throw ParsingError.new(this, message);
  },
  
  positionString: function (position) {
    if (position == null) position = this.position;
    
    return this.sourcename + ':' + position;
  },
  
  name: '(UnnamedGrammar)',
  
  log: function (message) {
    console.error('%s', this.name + '.log() at ' + this.positionString() + ' ' + message);
  },
  
  toString: function () {
    return this.name;
  },
  
  pushState: function (name, value) {
    this.state = Object.clone(this.state);
    if (this.state[name] == null) this.state[name] = [];
    this.state[name] = this.state[name].copy(); // assumes an array or similar
    this.state[name].push(value);
  },
  
  popState: function (name) {
    return this.state[name].pop();
  },
  
  getState: function (name, positionFromTop) {
    if (positionFromTop == null) positionFromTop = 0;
    return this.state[name][this.state[name].length - positionFromTop - 1];
  },
  
});

// Synonyms
Grammar.parse                 = Grammar.match;
Grammar.parseAll              = Grammar.matchAll;
Grammar.prototype.parse       = Grammar.prototype.match;
Grammar.prototype.parseAll    = Grammar.prototype.parseAll;

Grammar.prototype.separatedBy = Grammar.prototype.delimited;
Grammar.prototype.delimited1  = Grammar.prototype.nonZeroDelimited;
Grammar.prototype.nonZeroSeparatedBy = Grammar.prototype.nonZeroDelimited;
Grammar.prototype.separatedBy1 = Grammar.prototype.nonZeroDelimited;
Grammar.prototype.repeat      = Object.prototype.__combe_repeat;
Grammar.prototype.many        = Object.prototype.__combe_repeat;
Grammar.prototype.nonZeroRepeat = Object.prototype.__combe_nonZeroRepeat;
Grammar.prototype.repeat1     = Object.prototype.__combe_nonZeroRepeat;
Grammar.prototype.many1       = Object.prototype.__combe_nonZeroRepeat;
