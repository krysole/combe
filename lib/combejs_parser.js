var JSParser = (require)("./jsparser");
var Ast = (require)("./ast");
var CombeJSParser = ((module).exports = ((function () {
  var CombeJSParser = (__combejs__Class).create(JSParser, {
    propertyAssignment: {
      value: (function () {
        var name, expr;
        return (this)._apply((function () {
          return (this)._choice(((JSParser).prototype).propertyAssignment, (function () {
            return (this)._concat((function () {
              return (this)._concat("describe", (function () {
                return (name = (this)._apply((this).propertyName));
              }), ":", (function () {
                return (expr = (this)._apply((this).assignmentExpression));
              }));
            }), (function () {
              return (Ast)("DescribePropertyDeclaration", {
                name: name
              }, expr);
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    memberExpression: {
      value: (function () {
        var expr, ctor, args;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (expr = (this)._apply((function () {
                return (this)._choice((this).primaryExpression, (this).functionExpression, (this).classExpression, (this).ruleExpression, (function () {
                  return (this)._concat((function () {
                    return (this)._concat("new", (function () {
                      return (ctor = (this)._apply((this).memberExpression));
                    }), (function () {
                      return (args = (this)._apply((this).arguments));
                    }));
                  }), (function () {
                    return (((Ast)("New", {}, ctor)).concat)(args);
                  }));
                }));
              })));
            }), (function () {
              return (this)._repeat((function () {
                return (expr = (this)._apply((function () {
                  return (this)._apply((this).propertyAccessor, expr);
                })));
              }));
            }));
          }), (function () {
            return expr;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    prefixExpression: {
      value: (function () {
        return (this)._apply(((JSParser).prototype).unaryExpression);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    rangeInfinity: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._concat("*", (function () {
            return (Ast)("RangeInfinity");
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    rangeOperator: {
      value: (function (ast) {
        var rhs;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._concat("..", (function () {
                return (rhs = (this)._apply((function () {
                  return (this)._choice((this).rangeInfinity, (this).prefixExpression);
                })));
              }));
            }), (function () {
              return (Ast)("InclusiveRange", {}, ast, rhs);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("...", (function () {
                return (rhs = (this)._apply((function () {
                  return (this)._choice((this).rangeInfinity, (this).prefixExpression);
                })));
              }));
            }), (function () {
              return (Ast)("ExclusiveRange", {}, ast, rhs);
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    unaryExpression: {
      value: (function () {
        var expr;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this)._choice((function () {
                return (this)._concat((function () {
                  return (expr = (this)._apply((this).rangeInfinity));
                }), (function () {
                  return (expr = (this)._apply((function () {
                    return (this)._apply((this).rangeOperator, expr);
                  })));
                }));
              }), (function () {
                return (expr = (this)._apply((this).prefixExpression));
              }));
            }), (function () {
              return (this)._repeat((function () {
                return (expr = (this)._apply((function () {
                  return (this)._apply((this).rangeOperator, expr);
                })));
              }));
            }));
          }), (function () {
            return expr;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    statement: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice(((JSParser).prototype).statement, (this).matchStatement);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    expressionStatement: {
      value: (function () {
        var expr;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this)._not((function () {
                return (this)._choice("{", "function", "rule", "class");
              }));
            }), (function () {
              return (expr = (this)._apply((this).expression));
            }), ";");
          }), (function () {
            return (Ast)("ExpressionStatement", {}, expr);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    sourceElement: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice(((JSParser).prototype).sourceElement, (this).classDeclaration, (this).ruleDeclaration);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    matchStatement: {
      value: (function () {
        var subject, ptn;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("match", "(", (function () {
              return (subject = (this)._apply((this).expression));
            }), ")", "{", (function () {
              return (ptn = (this)._apply((this).pattern));
            }), "}");
          }), (function () {
            return (Ast)("MatchStatement", {}, subject, ptn);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    classDeclaration: {
      value: (function () {
        var name, inherits, pdefs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("class", (function () {
              return (name = (this)._apply("identifier"));
            }), (function () {
              return (this)._optional((function () {
                return (this)._concat("(", (function () {
                  return (inherits = (this)._apply((this).expression));
                }), ")");
              }));
            }), "{", (function () {
              return (pdefs = (this)._apply((function () {
                return (this)._apply((this).delimited, (this).propertyAssignment, ",");
              })));
            }), (function () {
              return (this)._optional(",");
            }), "}");
          }), (function () {
            return (((Ast)("ClassDeclaration", {
              name: (name).value
            }, inherits)).concat)(pdefs);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    classExpression: {
      value: (function () {
        var name, inherits, pdefs;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("class", (function () {
              return (name = (this)._apply((function () {
                return (this)._optional("identifier");
              })));
            }), (function () {
              return (this)._optional((function () {
                return (this)._concat("(", (function () {
                  return (inherits = (this)._apply((this).expression));
                }), ")");
              }));
            }), "{", (function () {
              return (pdefs = (this)._apply((function () {
                return (this)._apply((this).delimited, (this).propertyAssignment, ",");
              })));
            }), (function () {
              return (this)._optional(",");
            }), "}");
          }), (function () {
            return (((Ast)("ClassExpression", {
              name: (name ? (name).value : null)
            }, inherits)).concat)(pdefs);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    ruleDeclaration: {
      value: (function () {
        var name, args, ptn;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("rule", (function () {
              return (name = (this)._apply("identifier"));
            }), (function () {
              return (this)._optional((function () {
                return (this)._concat("(", (function () {
                  return (args = (this)._apply((function () {
                    return (this)._apply((this).delimited, "identifier", ",");
                  })));
                }), ")");
              }));
            }), "{", (function () {
              return (ptn = (this)._apply((this).optionalPattern));
            }), "}", (function () {
              return (args = (this)._apply((function () {
                return (args ? (args).map((function (elem) {
                  return (elem).value;
                })) : [
                  
                ]);
              })));
            }));
          }), (function () {
            return (Ast)("RuleDeclaration", {
              name: (name).value,
              argumentNames: args
            }, ptn);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    ruleExpression: {
      value: (function () {
        var name, args, ptn;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("rule", (function () {
              return (name = (this)._apply((function () {
                return (this)._optional("identifier");
              })));
            }), (function () {
              return (this)._optional((function () {
                return (this)._concat("(", (function () {
                  return (args = (this)._apply((function () {
                    return (this)._apply((this).delimited, "identifier", ",");
                  })));
                }), ")");
              }));
            }), "{", (function () {
              return (ptn = (this)._apply((this).optionalPattern));
            }), "}", (function () {
              return (args = (this)._apply((function () {
                return (args ? (args).map((function (elem) {
                  return (elem).value;
                })) : [
                  
                ]);
              })));
            }));
          }), (function () {
            return (Ast)("RuleExpression", {
              name: (name ? (name).value : null),
              argumentNames: args
            }, ptn);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    optionalPattern: {
      value: (function () {
        return (this)._apply((function () {
          return (this)._choice((this).choicePattern, (function () {
            return (this)._concat((function () {
              return (this)._optional("|");
            }), (function () {
              return (Ast)("EmptyPattern");
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    pattern: {
      value: (function () {
        return (this)._apply((this).choicePattern);
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    choicePattern: {
      value: (function () {
        var ptn, ptns;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (this)._optional("|");
            }), (function () {
              return (ptn = (this)._apply((this).returnPattern));
            }), (function () {
              return (this)._optional((function () {
                return (this)._concat((function () {
                  return (ptns = (this)._apply((function () {
                    return (this)._repeat1((function () {
                      return (this)._concat("|", (this).returnPattern);
                    }));
                  })));
                }), (function () {
                  return (ptn = (((Ast)("ChoicePattern", {}, ptn)).concat)(ptns));
                }));
              }));
            }), (function () {
              return (this)._optional((function () {
                return (this)._concat("|", (function () {
                  return (ptn).push((Ast)("EmptyPattern"));
                }));
              }));
            }));
          }), (function () {
            return ptn;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    returnPattern: {
      value: (function () {
        var ptn, expr, stmts;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (ptn = (this)._apply((this).concatPattern));
            }), (function () {
              return (this)._choice((function () {
                return (this)._concat((function () {
                  return (this)._concat("->", (function () {
                    return (expr = (this)._apply((this).leftHandSideExpression));
                  }));
                }), (function () {
                  return (Ast)("ConcatPattern", {}, ptn, (Ast)("ActionExpressionPattern", {}, expr));
                }));
              }), (function () {
                return (this)._concat((function () {
                  return (this)._concat("->", "{", (function () {
                    return (stmts = (this)._apply((function () {
                      return (this)._repeat((this).statement);
                    })));
                  }), "}");
                }), (function () {
                  return (Ast)("ConcatPattern", {}, ptn, (((Ast)("ActionBlockPattern")).concat)(stmts));
                }));
              }), (function () {
                return ptn;
              }));
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("->", (function () {
                return (expr = (this)._apply((this).leftHandSideExpression));
              }));
            }), (function () {
              return (Ast)("ActionExpressionPattern", {}, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("->", "{", (function () {
                return (stmts = (this)._apply((function () {
                  return (this)._repeat((this).statement);
                })));
              }), "}");
            }), (function () {
              return (((Ast)("ActionBlockPattern")).concat)(stmts);
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    concatPattern: {
      value: (function () {
        var ptn, ptns;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (ptn = (this)._apply((this).prefixOperatorPattern));
          }), (function () {
            return (this)._choice((function () {
              return (this)._concat((function () {
                return (ptns = (this)._apply((function () {
                  return (this)._repeat1((this).prefixOperatorPattern);
                })));
              }), (function () {
                return (((Ast)("ConcatPattern", {}, ptn)).concat)(ptns);
              }));
            }), (function () {
              return ptn;
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    prefixOperatorPattern: {
      value: (function () {
        var ptn;
        return (this)._apply((function () {
          return (this)._choice((this).postfixOperatorPattern, (function () {
            return (this)._concat((function () {
              return (this)._concat("~", (function () {
                return (ptn = (this)._apply((this).prefixOperatorPattern));
              }));
            }), (function () {
              return (Ast)("NotPattern", {}, ptn);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("&", (function () {
                return (ptn = (this)._apply((this).prefixOperatorPattern));
              }));
            }), (function () {
              return (Ast)("LookaheadPattern", {}, ptn);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("#", (function () {
                return (ptn = (this)._apply((this).prefixOperatorPattern));
              }));
            }), (function () {
              return (Ast)("TokenOperatorPattern", {}, ptn);
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    postfixOperatorPattern: {
      value: (function () {
        var ptn, name;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._concat((function () {
                return (ptn = (this)._apply((this).applyPattern));
              }), (function () {
                return (this)._repeat((function () {
                  return (ptn = (this)._apply((function () {
                    return (this)._apply((this).repeatOperatorPattern, ptn);
                  })));
                }));
              }));
            }), (function () {
              return ptn;
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat(":", (function () {
                return (this)._not((this).whitespace);
              }), (function () {
                return (name = (this)._apply("identifier"));
              }));
            }), (function () {
              return (Ast)("BindPattern", {
                name: (name).value
              }, (Ast)("AnythingPattern"));
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    repeatOperatorPattern: {
      value: (function (ptn) {
        var name;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat("*", (function () {
              return (Ast)("RepeatPattern", {}, ptn);
            }));
          }), (function () {
            return (this)._concat("+", (function () {
              return (Ast)("Repeat1Pattern", {}, ptn);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("?", (function () {
                return (this)._not((function () {
                  return (this)._concat((function () {
                    return (this)._not((this).whitespace);
                  }), (function () {
                    return (this)._choice("(", "{");
                  }));
                }));
              }));
            }), (function () {
              return (Ast)("OptionalPattern", {}, ptn);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat((function () {
                return (this)._not((this).whitespace);
              }), ":", (function () {
                return (this)._not((this).whitespace);
              }), (function () {
                return (name = (this)._apply("identifier"));
              }));
            }), (function () {
              return (Ast)("BindPattern", {
                name: (name).value
              }, ptn);
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    applyPattern: {
      value: (function () {
        var ptn, args;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat((function () {
              return (ptn = (this)._apply((this).primaryPattern));
            }), (function () {
              return (this)._repeat((function () {
                return (this)._choice((function () {
                  return (this)._concat((function () {
                    return (this)._not((this).whitespace);
                  }), (function () {
                    return (args = (this)._apply((this).arguments));
                  }), (function () {
                    return (ptn = (((Ast)("JSApplyPattern", {}, ptn)).concat)(args));
                  }));
                }), (function () {
                  return (this)._concat((function () {
                    return (this)._not((this).whitespace);
                  }), (function () {
                    return (args = (this)._apply((this).patternArguments));
                  }), (function () {
                    return (ptn = (((Ast)("ApplyPattern", {}, ptn)).concat)(args));
                  }));
                }));
              }));
            }));
          }), (function () {
            return ptn;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    patternArguments: {
      value: (function () {
        var args;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (this)._concat("[", (function () {
              return (args = (this)._apply((function () {
                return (this)._apply((this).delimited, (this).pattern, ",");
              })));
            }), "]");
          }), (function () {
            return args;
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    primaryPattern: {
      value: (function () {
        var ptn;
        return (this)._apply((function () {
          return (this)._choice((this).predicatePattern, (this).actionPattern, (this).immediatePattern, (this).literalPattern, (this).variablePattern, (function () {
            return (this)._concat((function () {
              return (this)._concat("(", (function () {
                return (ptn = (this)._apply((this).pattern));
              }), ")");
            }), (function () {
              return ptn;
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    predicatePattern: {
      value: (function () {
        var expr, stmts;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._concat("?", (function () {
                return (this)._not((this).whitespace);
              }), "(", (function () {
                return (expr = (this)._apply((this).expression));
              }), ")");
            }), (function () {
              return (Ast)("PredicateExpressionPattern", {}, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("?", (function () {
                return (this)._not((this).whitespace);
              }), "{", (function () {
                return (stmts = (this)._apply((function () {
                  return (this)._repeat((this).statement);
                })));
              }), "}");
            }), (function () {
              return (((Ast)("PredicateBlockPattern")).concat)(stmts);
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    actionPattern: {
      value: (function () {
        var expr, stmts;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._concat("!", (function () {
                return (this)._not((this).whitespace);
              }), "(", (function () {
                return (expr = (this)._apply((this).expression));
              }), ")");
            }), (function () {
              return (Ast)("ActionExpressionPattern", {}, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("!", (function () {
                return (this)._not((this).whitespace);
              }), "{", (function () {
                return (stmts = (this)._apply((function () {
                  return (this)._repeat((this).statement);
                })));
              }), "}");
            }), (function () {
              return (((Ast)("ActionBlockPattern")).concat)(stmts);
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    immediatePattern: {
      value: (function () {
        var expr, stmts;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._concat("%", (function () {
                return (expr = (this)._apply((this).leftHandSideExpression));
              }));
            }), (function () {
              return (Ast)("ImmediateExpressionPattern", {}, expr);
            }));
          }), (function () {
            return (this)._concat((function () {
              return (this)._concat("%", (function () {
                return (this)._not((this).whitespace);
              }), "{", (function () {
                return (stmts = (this)._apply((function () {
                  return (this)._repeat((this).statement);
                })));
              }), "}");
            }), (function () {
              return (((Ast)("ImmediateBlockPattern")).concat)(stmts);
            }));
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    literalPattern: {
      value: (function () {
        var expr;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (expr = (this)._apply((function () {
              return (this)._choice((this).valueLiteral, (function () {
                return (this)._concat("undefined", (function () {
                  return (Ast)("ValueLiteral", {
                    value: undefined
                  });
                }));
              }));
            })));
          }), (function () {
            return (Ast)("ImmediateExpressionPattern", {}, expr);
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    variablePattern: {
      value: (function () {
        var name;
        return (this)._apply((function () {
          return (this)._concat((function () {
            return (name = (this)._apply("identifier"));
          }), (function () {
            return (Ast)("VariablePattern", {
              name: (name).value
            });
          }));
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    },
    whitespace: {
      value: (function () {
        var token;
        return (this)._apply((function () {
          return (this)._choice((function () {
            return (this)._concat((function () {
              return (this)._lookahead((function () {
                return (token = (this)._apply((this).anything));
              }));
            }), (function () {
              return (this)._predicate((function () {
                return (!((token).previousToken) || ((token).previousToken).is("whitespace"));
              }));
            }));
          }), (this).eof);
        }));
      }),
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
  return CombeJSParser;
}))());