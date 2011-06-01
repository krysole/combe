//
// Combe/JS - A Parsing Language for JavaScript
//
// Copyright 2011 Lorenz Pretterhofer
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

var BaseTextParser = require('../combejs/base_text_parser');
var Token = require('../combejs/token');

var JSLexer = module.exports = class JSLexer (BaseTextParser) {
  
  emitToken: function (type, tags, value) {
    // var endPosition = this.input.position;
    // var token = new Token({
    //   type: type,
    //   tags: tags,
    //   value: value,
    //   startPosition: this.tokenStartPosition,
    //   endPosition: endPosition,
    //   previousToken: this.lastToken
    // });
    // 
    // if (!token.is('whitespace')) {
    //   for (var t = this.lastToken; t.is('whitespace'); t = t.previousToken) {
    //     if (t.is('newline')) {
    //       token.precededByNewline = true;
    //       break;
    //     }
    //   }
    // }
    // 
    // if (this.lastToken != null) {
    //   this.lastToken.nextToken = token;
    // }
    // this.lastToken = token;
    // 
    // this.tokenStartPosition = endPosition;
    // 
    return token;
  },
  
  nextToken: rule {
    whitespace?
  //   
  //   ( identifierName
  //   | number
  //   | assignmentOperator
  //   | punctuation
  //   | string
  //   | &'/' token('unknown') // Regex and division are ambiguous
  //   )
  },
  
  // resetToAfterToken: function (token) {
  //   this.lastToken = token;
  //   this.tokenStartPosition = this.input.position = token.endPosition;
  //   token.nextToken = null;
  // },
  // 
  // resetToBeforeToken: function (token) {
  //   if (token.previousToken) {
  //     this.resetToAfterToken(token.previousToken);
  //   } else {
  //     this.lastToken = null;
  //     this.tokenStartPosition = this.input.position = 0;
  //   }
  // },
  // 
  // sourceChar: rule {
  //   // Todo: This should exclude the invalid codepoints, like control character,
  //   // i.e., any valid unicode codepoint.
  //   char
  // },
  // 
  // identifierName: rule {
  //   matchedInput[idFirstChar idChar*]:text
  //   
  //   ( ?(text === 'null')
  //     token('null', ['identifierName'], null)
  //     
  //   | ?(text === 'true')
  //     token('true', ['boolean', 'identifierName'], true)
  //     
  //   | ?(text === 'false')
  //     token('false', ['boolean', 'identifierName'], false)
  //     
  //   | ?(text.isKeyword(text))
  //     token(text, ['keyword', 'reservedWord', 'identifierName'])
  //     
  //   | ?(text.isFutureReservedWord(text))
  //     token('futureReservedWord', ['reservedWord', 'identifierName'])
  //     
  //   | extendedIdentifier(text)
  //   
  //   | token('identifier', ['identifierName'], text)
  //   )
  // },
  // 
  // extendedIdentifier: rule (text) {},
  // 
  // idFirstChar: rule {
  //   // Todo: handle unicode (es5 compliance)
  //   char('a'..'z', 'A'..'Z', '_', '$')
  // },
  // 
  // idChar: rule {
  //   // Todo: handle unicode (es5 compliance)
  //   char('a'..'z', 'A'..'Z', '_', '$', '0'..'9')
  // },
  // 
  // punctuation: rule {
  //   ( '{' | '}' | '(' | ')' | '[' | ']' | ';' | ',' | '.' ~digit
  //   | '<' | '>' | '<=' | '>=' | '===' | '!==' | '==' | '!='
  //   | '+' | '-' | '*' | '%' | '&' | '|' | '^' | '!' | '~'
  //   | '&&' | '||' | '?' | ':' | '++' | '--' | '<<' | '>>>' | '>>'
  //   ):text
  //   token(text, ['punctuation'])
  // },
  // 
  // assignmentOperator: rule {
  //   ( '=' ~'=' -> '=' | '+=' | '-=' | '*=' | '%=' | '&=' | '|=' | '^='
  //   | '<<=' | '>>>=' | '>>='
  //   ):text
  //   token(text, ['punctuation', 'assignmentOperator'])
  // },
  // 
  // division: rule {
  //   ( '/' | '/=' ):text token(text, ['punctuation', 'division'])
  // },
  // 
  // number: rule {
  //   | decimal
  //   | hexInteger
  // },
  // 
  // decimal: rule {
  //   matchedInput[
  //     | integerPart ('.' digit*)? exponentPart?
  //     | '.' digit+ exponentPart?
  //   ]:text ~idChar
  //   token('number', ['decimal'], parseFloat(text));
  // },
  // 
  // integerPart: rule {
  //   char('1'..'9') digit*
  // },
  // 
  // digit: rule {
  //   char('0'..'9')
  // },
  // 
  // hexInteger: rule {
  //   ('0x'|'0X') matchedInput[hexDigit+]:text ~idChar
  //   token('number', ['hex'], parseInt(text, 16))
  // },
  // 
  // hexDigit: rule {
  //   char('0'..'9', 'a'..'f', 'A'..'F')
  // },
  // 
  // string: rule {
  //   ( stringHelper('\'') | stringHelper('\"') ):text
  //   token('string', null, text)
  // },
  // 
  // stringHelper: rule (quote) {
  //   quote (~quote stringChar)*:characters quote
  //   -> characters.join('')
  // },
  // 
  // stringChar: rule {
  //   | '\\' stringEscapeSequence
  //   | '\\' newline -> ''
  //   | ~newline sourceChar
  // },
  // 
  // stringEscapeSequence: rule {
  //   | '\'' -> '\''
  //   | '\"' -> '\"'
  //   | '\\' -> '\\'
  //   | 'b'  -> '\b'
  //   | 'f'  -> '\f'
  //   | 'n'  -> '\n'
  //   | 'r'  -> '\r'
  //   | 't'  -> '\t'
  //   | 'v'  -> '\v'
  //   | '0' ~digit -> '\0'
  //   | 'x' repeat[hexDigit, 2]:hs -> String.fromCodepoint(hs.join(''))
  //   | 'u' repeat[hexDigit, 4]:hs -> String.fromCodepoint(hs.join(''))
  //   | ~(newline | digit) sourceChar
  // },
  // 
  // regex: rule {
  //   '/' matchedInput[(~'*' regexChar) regexChar*]:pattern '/' matchedInput[idChar*]:options
  //   token('regex', null, new RegExp(pattern, options))
  // },
  // 
  // regexChar: rule {
  //   | '\\' ~newline sourceChar
  //   | regexCharacterClass
  //   | ~('/' | newline) sourceChar
  // },
  // 
  // regexCharacterClass: rule {
  //   '[' regexCharacterClassChar ']'
  // },
  // 
  // regexCharacterClassChar: rule {
  //   | '\\' ~newline sourceChar
  //   | ~(']' | newline) sourceChar
  // },
  // 
  // whitespace: rule {
  //   (spaces | newline | comment)+
  // },
  // 
  // spaces: rule {
  //   char(' \t\v\f\u00a0\u200c\u200d\ufeff')*
  //   token('spaces', ['whitespace'])
  // },
  // 
  // newline: rule {
  //   ('\r\n' | char('\n\r\u2028\u2029'))
  //   token('newline', ['whitespace'])
  // },
  // 
  // comment: rule {
  //   ( '//' (~newline sourceChar)* (newline | eof)
  //   | '/*' (~'*/' sourceChar)* '*/'
  //   )
  //   token('comment', ['whitespace'])
  // },
  
};
