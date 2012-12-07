// Generated by Combe compiler
"use strict";
(function () {
require("combe-newcombe/__combe");
var __combe$this = null;
var __combe$return = null;
try {
var assert = require("assert");
console.log("Check 1 - console.log");
console.log("Check 2 - basic if statements");
assert((/* if */ true
? /* then */ true
: /* else */ false));
assert((!(/* if */ true
? /* then */ false
: /* else */ true)));
console.log("Check 3 - basic logic combinators");
assert((true && true));
assert((false || true));
assert((true && (false || true)));
console.log("Check 4 - basic equality");
assert(__combe$infixOperators["=="](1, 1));
assert(__combe$infixOperators["!="](1, 47));
assert(__combe$infixOperators["=="]("Hello world", "Hello world"));
assert(__combe$infixOperators["!="]("2", 2));
assert(__combe$infixOperators["!="]("", null));
assert(__combe$infixOperators["!="](0, null));
assert(__combe$infixOperators["=="](true, true));
assert(__combe$infixOperators["=="](false, false));
assert(__combe$infixOperators["!="](true, false));
assert(__combe$infixOperators["!="](true, null));
assert(__combe$infixOperators["!="](false, null));
assert(__combe$infixOperators["=="](null, undefined));
assert((4 < 8));
assert((1 === 1));
assert((1 !== 47));
assert(("Hello world" === "Hello world"));
assert(("2" !== 2));
assert(("" !== null));
assert((0 !== null));
assert((true === true));
assert((false === false));
assert((true !== false));
assert((true !== null));
assert((false !== null));
assert((null !== undefined));
console.log("Check 5 - basic function definition/call");
var fn = function fn() {
(function () {
(function () { throw (__combe$return = { value: "Hello world" }); })();
})()};
assert(__combe$infixOperators["=="](fn(), "Hello world"));
console.log("Check 6 - basic try/catch");
var fn = function fn() {
(function () {
(function () { throw 42; })();
})()};
(function () {
try {
(function () {
fn();
})();
}
catch (e) {
(function () {
assert(__combe$infixOperators["=="](e, 42));
})();
}
})();
console.log("Done");
}
catch (__combe$e) {
if (__combe$e === __combe$return) return __combe$return;
throw __combe$e;
}
})()