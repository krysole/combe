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

var crypto = require("crypto");

var Util = require("../Util.js");
var Visitor = require("../Visitor.js");



function Translator() {
  Visitor.call(this);
  
  this.init("bindings", null);
};
Translator.prototype = Object.create(Visitor.prototype);
Translator.prototype.constructor = Translator;
module.exports = Translator;



Translator.prototype.unspecified = "error";



Translator.prototype.indent = function (column, string) {
  return Util.lines(string).map(function (line) {
    return " ".repeat(column) + line;
  }).join("\n");
};

Translator.prototype.indentRest = function (column, string) {
  var lines = Util.lines(string);
  
  if (lines.length > 1) {
    return lines[0] + "\n" + lines.slice(1).map(function (line) {
      return " ".repeat(column) + line;
    }).join("\n");
  }
  else {
    return string;
  }
};



Translator.prototype.handleComposite = function (ast) {
  return this.visitArray(ast.fragments).join("");
};

Translator.prototype.handleFragment = function (ast) {
  return ast.text;
};



Translator.prototype.handleRule = function (ast) {
  var parameters = (ast.parametersFragment != null ? this.visit(ast.parametersFragment) : "");
  var body = this.visit(ast.body);
  
  var iname = ast.name;
  if (iname == null) iname = ast.inferredName;
  if (iname == null) iname = "~unnamed";
  
  var hash = crypto.createHash("md5");
  hash.update(parameters);
  hash.update(body);
  var digest = hash.digest("base64").slice(0, -2); // without base64 suffix
  
  var memoname = iname + "_" + digest;
  
  var bindings;
  if (ast.bindings.length > 0) {
    bindings = "  var " + ast.bindings.join(", ") + ";\n";
  }
  else {
    bindings = "";
  }
  
  if (ast.parametersFragment != null) {
    return this.indentRest(ast.indent,
      "/*rule*/ function (" + parameters + ") {\n" +
      bindings +
      "  this.__ignore();\n" +
      "  this.pushStartPosition();\n" +
      "  var __result = " + this.indentRest(2, body) + ".call(this);\n" +
      "  this.popStartPosition();\n" +
      "  return __result;\n" +
      "}"
    );
  }
  else {
    return this.indentRest(ast.indent,
      "/*rule*/ function (" + parameters + ") {\n" +
      bindings +
      "  return this.memoize(" + memoname + ", function () {\n" +
      "    this.__ignore();\n" +
      "    this.pushStartPosition();\n" +
      "    var __result = " + this.indentRest(4, body) + ".call(this);\n" +
      "    this.popStartPosition();\n" +
      "    return __result;\n" +
      "  });\n" +
      "}"
    );
  }
};



Translator.prototype.handleChoicePattern = function (ast) {
  var patterns = this.visitArray(ast.patterns).join(",\n");
  
  return (
    "function () {\n" +
    "  return this.choice(\n" +
         this.indent(4, patterns) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleSequencePattern = function (ast) {
  var patterns = this.visitArray(ast.patterns);
  
  var initial = patterns.slice(0, -1).map(function (line) {
    return line + ".call(this);";
  }).join("\n");
  var last = "return " + patterns[patterns.length - 1] + ".call(this);";
  
  return (
    "function () {\n" +
       this.indent(2, initial) + "\n" +
       this.indent(2, last) + "\n" +
    "}"
  );
};

Translator.prototype.handleChainPattern = function (ast) {
  var leftPattern = this.visit(ast.leftPattern);
  var rightPattern = this.visit(ast.rightPattern);
  
  return (
    "function () {\n" +
    "  return this.chain(\n" +
         this.indent(4, leftPattern) + ",\n" +
         this.indent(4, rightPattern) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleBindPattern = function (ast) {
  var pattern = this.visit(ast.pattern);
  
  return (
    "function () {\n" +
    "  return " + ast.name + " = " + this.indentRest(2, pattern) + ".call(this);\n" +
    "}"
  );
};

Translator.prototype.handleLookaheadPattern = function (ast) {
  var pattern = this.visit(ast.pattern);
  
  return (
    "function () {\n" +
    "  return this.lookahead(\n" +
         this.indent(4, pattern) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleDoubleNegatePattern = function (ast) {
  var pattern = this.visit(ast.pattern);
  
  return (
    "function () {\n" +
    "  return this.doubleNegate(\n" +
         this.indent(4, pattern) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleNegatePattern = function (ast) {
  var pattern = this.visit(ast.pattern);
  
  return (
    "function () {\n" +
    "  return this.negate(\n" +
         this.indent(4, pattern) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleOptionalPattern = function (ast) {
  var pattern = this.visit(ast.pattern);
  
  return (
    "function () {\n" +
    "  return this.optional(\n" +
         this.indent(4, pattern) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleRepeatPattern = function (ast) {
  var pattern = this.visit(ast.pattern);
  
  return (
    "function () {\n" +
    "  return this.repeat(\n" +
         this.indent(4, pattern) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleRepeat1Pattern = function (ast) {
  var pattern = this.visit(ast.pattern);
  
  return (
    "function () {\n" +
    "  return this.repeat1(\n" +
         this.indent(4, pattern) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleHashPattern = function (ast) {
  var pattern = this.visit(ast.pattern);
  
  return (
    "function () {\n" +
    "  return this.hash(\n" +
         this.indent(4, pattern) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handlePredicatePattern = function (ast) {
  var body = this.visit(ast.semanticBody);
  
  return (
    "function () {\n" +
    "  return this.predicate(\n" +
         this.indent(4, body) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleActionPattern = function (ast) {
  var body = this.visit(ast.semanticBody);
  
  return (
    "function () {\n" +
    "  return this.action(\n" +
         this.indent(4, body) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleCallRulePattern = function (ast) {
  var args = this.visitArray(ast.arguments).join(",\n");
  
  if (ast.arguments.length === 0) {
    return ("this." + ast.name);
  }
  else {
    return (
      "function () {\n" +
      "  return this." + ast.name + "(\n" +
           this.indent(4, args) + "\n" +
      "  );\n" +
      "}"
    );
  }
};

Translator.prototype.handleCallImmediatePattern = function (ast) {
  var body = this.visit(ast.semanticBody);
  var args = this.visitArray(ast.arguments).join(",\n");
  
  if (ast.arguments.length === 0) {
    return (body + ".call(this)");
  }
  else {
    return (
      "function () {\n" +
      "  return " + body + ".call(this).call(this,\n" +
           this.indent(4, args) + "\n" +
      "  );\n" +
      "}"
    );
  }
};

Translator.prototype.handleObjectPattern = function (ast) {
  var body = this.visit(ast.semanticBody);
  
  return (
    "function () {\n" +
    "  return this.object(\n" +
         this.indent(4, body) + ".call(this)\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleEachPattern = function (ast) {
  var body = this.visit(ast.semanticBody);
  
  return (
    "function () {\n" +
    "  return this.each(\n" +
         this.indent(4, body) + ".call(this)\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleStringPattern = function (ast) {
  return (
    "function () { return this.string(" + ast.text + "); }"
  );
};

Translator.prototype.handleNumberPattern = function (ast) {
  return (
    "function () { return this.number(" + ast.text + "); }"
  );
};

Translator.prototype.handleRegularExpressionPattern = function (ast) {
  return (
    "function () { return this.regularExpression(" + ast.text + "); }"
  );
};

Translator.prototype.handleNestedArrayPattern = function (ast) {
  var pattern = this.visit(ast.pattern);
  
  return (
    "function () {\n" +
    "  return this.nestedArray(\n" +
         this.indent(4, pattern) + "\n" +
    "  );\n" +
    "}"
  );
};

Translator.prototype.handleNextPattern = function (ast) {
  return "this.next";
};

Translator.prototype.handleEmptyPattern = function (ast) {
  return "this.pass";
};



Translator.prototype.handleExpressionSemanticBody = function (ast) {
  var text = this.visit(ast.fragment);
  
  return (
    "function () { return (" + text + "); }"
  );
};

Translator.prototype.handleFunctionSemanticBody = function (ast) {
  var text = this.visit(ast.fragment);
  
  return (
    "function () {" + text + "}"
  );
};
