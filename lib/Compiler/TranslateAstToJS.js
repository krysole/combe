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

var AstVisitor = require("../AstVisitor.js");



function TranslateAstToJS(sourcename) {
  AstVisitor.call(this, sourcename);
  
  this.init("gensymOrdinal", 0);
};
TranslateAstToJS.prototype = Object.create(AstVisitor.prototype);
TranslateAstToJS.prototype.constructor = TranslateAstToJS;
module.exports = TranslateAstToJS;



TranslateAstToJS.prototype.gensym = function (prefix) {
  var ordinal = this.get("gensymOrdinal");
  this.set("gensymOrdinal", ordinal + 1);
  return prefix + "_" + ordinal;
};

TranslateAstToJS.prototype.proplookup = function (name) {
  if (name.isIdentifierName()) return "." + name;
  else                         return "[" + name.quote() + "]";
};



TranslateAstToJS.prototype.visitComposite = function (ast, fragments) {
  var _this = this;
  
  this.push("column", 0);
  var text = fragments.map(function (fragment) {
    if (fragment) return _this.visit(fragment);
    else          return "";
  }).join("");
  this.pop("column");
  
  return text;
};



TranslateAstToJS.prototype.visitFragment = function (ast, text) {
  return text;
};



TranslateAstToJS.prototype.visitRule = function (ast, column, name, iname, parametersFragment, bindings, body) {
  var namePart = (name != null) ? name + " " : "";
  
  if      (name != null)  iname = name;
  else if (iname != null) iname = iname;
  else                    iname = this.gensym("unnamed");
  
  if (parametersFragment != null) {
    parametersFragment = "(" + this.visit(parametersFragment) + ") ";
  }
  else {
    parametersFragment = "";
  }
  
  var ruleAnnotation = "/* rule */ ";
  
  this.push("column", column + 6);
  body = this.visit(body);
  this.pop("column");
  
  if (bindings.length > 0) {
    bindings = " ".repeat(column + 2) + "var " + bindings.join(", ") + ";\n";
  }
  else {
    bindings = "";
  }
  
  var hash = crypto.createHash("md5");
  hash.update(body);
  var digest = hash.digest("base64").slice(0, -2); // without base64 suffix
  
  var memoname = (inferredName + "_" + digest).quote();
  
  return (
                              ruleAnnotation + "function " + name + parametersFragment + "{\n" +
                                bindings +
    " ".repeat(column + 2) +    "return this.memoize(" + memoname + ",\n" + 
    " ".repeat(column + 4) +      "function () {\n" +
    " ".repeat(column + 6) +        "this.ignore();\n" +
    " ".repeat(column + 6) +        "this.pushStartPosition();\n" +
    " ".repeat(column + 6) +        "var result = " + body + ".call(this);\n" +
    " ".repeat(column + 6) +        "this.popStartPosition();\n" +
    " ".repeat(column + 6) +        "return result;\n" +
    " ".repeat(column + 4) +      "}\n" +
    " ".repeat(column + 2) +    ");\n" +
    " ".repeat(column) +      "}"
  );
};



TranslateAstToJS.prototype.visitChoicePattern = function (ast, patterns) {
  var _this = this;
  var column = this.get("column");
  
  this.push("column", column + 4);
  patterns = patterns.map(function (pattern) {
    return " ".repeat(column + 4) + _this.visit(pattern);
  });
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.choice(\n" +
                                    patterns.join(",\n") + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitSequencePattern = function (ast, patterns) {
  var _this = this;
  var column = this.get("column");
  
  this.push("column", column + 4);
  patterns = patterns.map(function (pattern) {
    return " ".repeat(column + 4) + _this.visit(pattern);
  });
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.sequence(\n" +
                                    patterns.join(",\n") + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitBindPattern = function (ast, name, pattern) {
  var column = this.get("column");
  
  this.push("column", column + 2);
  pattern = this.visit(pattern);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return " + name + " = " + pattern + ".call(this)\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitLookaheadPattern = function (ast, pattern) {
  var column = this.get("column");
  
  this.push("column", column + 4);
  pattern = this.visit(pattern);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.lookahead(\n" +
    " ".repeat(column + 4) +        pattern + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitDoubleNegatePattern = function (ast, pattern) {
  var column = this.get("column");
  
  this.push("column", column + 4);
  pattern = this.visit(pattern);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.doubleNegate(\n" +
    " ".repeat(column + 4) +        pattern + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitNegatePattern = function (ast, pattern) {
  var column = this.get("column");
  
  this.push("column", column + 4);
  pattern = this.visit(pattern);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.negate(\n" +
    " ".repeat(column + 4) +        pattern + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitOptionalPattern = function (ast, pattern) {
  var column = this.get("column");
  
  this.push("column", column + 4);
  pattern = this.visit(pattern);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.optional(\n" +
    " ".repeat(column + 4) +        pattern + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitRepeatPattern = function (ast, pattern) {
  var column = this.get("column");
  
  this.push("column", column + 4);
  pattern = this.visit(pattern);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.repeat(\n" +
    " ".repeat(column + 4) +        pattern + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitRepeat1Pattern = function (ast, pattern) {
  var column = this.get("column");
  
  this.push("column", column + 4);
  pattern = this.visit(pattern);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.repeat1(\n" +
    " ".repeat(column + 4) +        pattern + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitHashPattern = function (ast, pattern) {
  var column = this.get("column");
  
  this.push("column", column + 4);
  pattern = this.visit(pattern);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.hash(\n" +
    " ".repeat(column + 4) +        pattern + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitJSCallPattern = function (ast, pattern, argumentsFragment) {
  var column = this.get("column");
  
  this.push("column", column + 2);
  pattern = this.visit(pattern);
  argumentsFragment = this.visit(argumentsFragment);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return " + pattern + ".call(this, " + argumentsFragment + ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitCallPattern = function (ast, pattern, args) {
  var _this = this;
  var column = this.get("column");
  
  this.push("column", column + 4);
  pattern = this.visit(pattern);
  args = args.map(function (argument) {
    return " ".repeat(column + 4) + _this.visit(argument);
  });
  this.pop("column");
  
  if (args.length > 0) {
    return (
                                  "function () {\n" +
      " ".repeat(column + 2) +      "return " + pattern + ".call(this,\n" +
                                      args.join(",\n") + "\n" +
      " ".repeat(column + 2) +      ");\n" +
      " ".repeat(column) +        "}"
    );
  }
  else {
    return (
                                  "function () {\n" +
      " ".repeat(column + 2) +      "return " + pattern + ".call(this);\n" +
      " ".repeat(column) +        "}"
    );
  }
};

TranslateAstToJS.prototype.visitPredicatePattern = function (ast, semanticBody) {
  var column = this.get("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.predicate(\n" +
    " ".repeat(column + 4) +        this.visit(semanticBody) + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitActionPattern = function (ast, semanticBody) {
  var column = this.get("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.action(\n" +
    " ".repeat(column + 4) +        this.visit(semanticBody) + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitImmediatePattern = function (ast, semanticBody) {
  var column = this.get("column");
  
  return this.visit(semanticBody) + "()";
};

TranslateAstToJS.prototype.visitPropertyPattern = function (ast, name) {
  return "this" + this.proplookup(name);
};

TranslateAstToJS.prototype.visitObjectPattern = function (ast, semanticBody) {
  var column = this.get("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.object(\n" +
    " ".repeat(column + 4) +        this.visit(semanticBody) + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitStringPattern = function (ast, text) {
  return "function () { return this.string(" + text + "); }";
};

TranslateAstToJS.prototype.visitNumberPattern = function (ast, text) {
  return "function () { return this.number(" + text + "); }";
};

TranslateAstToJS.prototype.visitNestedInputPattern = function (ast, pattern) {
  var column = this.get("column");
  
  this.push("column", column + 4);
  pattern = this.visit(pattern);
  this.pop("column");
  
  return (
                                "function () {\n" +
    " ".repeat(column + 2) +      "return this.nested(\n" +
    " ".repeat(column + 4) +        pattern + "\n" +
    " ".repeat(column + 2) +      ");\n" +
    " ".repeat(column) +        "}"
  );
};

TranslateAstToJS.prototype.visitNextPattern = function (ast) {
  return "this.next";
};

TranslateAstToJS.prototype.visitEmptyPattern = function (ast) {
  return "this.empty";
};



TranslateAstToJS.prototype.visitExpressionSemanticBody = function (ast, fragment) {
  return "function () { return (" + this.visit(fragment) + "); }";
};

TranslateAstToJS.prototype.visitFunctionSemanticBody = function (ast, fragment) {
  return "function () {" + this.visit(fragment) + "}";
};
