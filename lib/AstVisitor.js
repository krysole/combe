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

var VisitorGrammar = require("./VisitorGrammar.js");



function AstVisitor(sourcename) {
  VisitorGrammar.call(this, sourcename);
  
  this.init("path", []);
  this.init("_traceIndent", 0);
};
AstVisitor.prototype = Object.create(VisitorGrammar.prototype);
AstVisitor.prototype.constructor = AstVisitor;
module.exports = AstVisitor;



AstVisitor.prototype.traceFlag = false;
AstVisitor.prototype.order = "none"; // One of ["none", "pre", "post"]

AstVisitor.prototype.handleUnspecified = function (ast) {
  throw Error.new("AstVisitor.prototype.handleUnspecified: no behavior for ast node " + this._synopsis(ast));
};



AstVisitor.prototype.visitIfNotNull = function (ast) {
  if (ast != null) return this.visit(ast);
  else             return ast;
};

AstVisitor.prototype.visit = function (ast) {
  if (!ast instanceof Array) {
    throw new Error("AstVisitor.prototype.visit: expected Array for ast (got " + ast + ")");
  }
  if (!ast[0] instanceof String) {
    throw new Error("AstVisitor.prototype.visit: expected String for ast head (for ast " + this._synopsis(ast) + ")");
  }
  
  var result;
  this.pushInput([ast], false);
  
  if (this.traceFlag) {
    console.log("<enter>" + " ".repeat(this.get("_traceIndent")) + this._synopsis(ast));
    this.push("_traceIndent", this.get("_traceIndent") + 2);
  }
  
  if (this.order === "none") {
    result = this.handle(ast);
  }
  else if (this.order === "pre") {
    this.visitChildren(ast);
    result = this.handle(ast);
  }
  else if (this.order === "post") {
    result = this.handle(ast);
    this.visitChildren(ast);
  }
  else {
    throw Error("Unexpected order property " + this.order + " (expected one of [\"none\", \"pre\", \"post\"]).");
  }
  
  if (this.traceFlag) {
    console.log("<leave>" + " ".repeat(this.get("_traceIndent")) + this._synopsis(ast));
    this.pop("_traceIndent");
  }
  
  this.popInput([ast], false);
  return result;
};



AstVisitor.prototype.visitChildren = function (ast) {
  var result = [ast[0]];
  for (var i = 0; i < ast.length; i++) {
    if (ast[i] instanceof Array && ast[i][0] instanceof String) {
      result.push(this.visit(ast[i]));
    }
    else {
      result += ast[i];
    }
  }
  return result;
};

AstVisitor.prototype.visitAll = function (ast) {
  var result = [];
  for (var i = 0; i < ast.length; i++) {
    result.push(this.visit(ast[i]));
  }
  return result;
};



AstVisitor.prototype.getParent = function (ast) {
  return this.get("path")[this.get("path") - 2];
};



AstVisitor.prototype._synopsis = function (ast) {
  var result = "[";
  for (var i = 0; i < ast.length; i++) {
    if (i > 0) result += ", ";
    
    var e = ast[i];
    
    if (e === null) {
      result += "null";
    }
    else if (e === undefined) {
      result += "undefined";
    }
    else if (e instanceof Array) {
      if (e[0] instanceof String) {
        result += "[" + e[0].quote() + ", ...]";
      }
      else {
        result += "[...]";
      }
    }
    else if (e instanceof String) {
      result += e.quote();
    }
    else if (e instanceof Number) {
      result += e;
    }
    else if (e instanceof RegExp) {
      result += e;
    }
    else if (Object.getPrototypeOf(e) === Object.prototype) {
      result += "{...}";
    }
    else if (Object.getPrototypeOf(e) === null) {
      result += "Object.create(null)";
    }
    else {
      result += e.toString();
    }
  }
  result += "]";
  return result;
};



AstVisitor.prototype.handle = function (ast) {
  var handler = this["handle" + ast[0]];
  if (handler != null) {
    return handler.apply(this, [ast].concat(ast.slice(1)));
  }
  else {
    return handleUnspecified.apply(this, [ast].concat(ast.slice(1)));
  }
};



AstVisitor.prototype.pushInput = function (ast, pathFlag) {
  Grammar.prototype.pushInput.call(this, ast);
  if (pathFlag) this.apush("path", ast);
};

AstVisitor.prototype.popInput = function (pathFlag) {
  if (pathFlag) this.apop("path");
  Grammar.prototype.popInput.call(this);
};
