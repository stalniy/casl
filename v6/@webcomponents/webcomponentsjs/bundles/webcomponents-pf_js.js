/**
@license @nocompile
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
(function(){/*

 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at
 http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 Google as part of the polymer project is also subject to an additional IP
 rights grant found at http://polymer.github.io/PATENTS.txt
*/
'use strict';function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}var t="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},v="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function y(){y=function(){};v.Symbol||(v.Symbol=ba)}function A(a,b){this.a=a;t(this,"description",{configurable:!0,writable:!0,value:b})}
A.prototype.toString=function(){return this.a};var ba=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new A("jscomp_symbol_"+(c||"")+"_"+b++,c)}var b=0;return a}();function C(){y();var a=v.Symbol.iterator;a||(a=v.Symbol.iterator=v.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&t(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ca(aa(this))}});C=function(){}}
function ca(a){C();a={next:a};a[v.Symbol.iterator]=function(){return this};return a}var D;if("function"==typeof Object.setPrototypeOf)D=Object.setPrototypeOf;else{var H;a:{var da={u:!0},ea={};try{ea.__proto__=da;H=ea.u;break a}catch(a){}H=!1}D=H?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ka=D;function K(){this.i=!1;this.b=null;this.s=void 0;this.a=1;this.o=0;this.h=null}
function L(a){if(a.i)throw new TypeError("Generator is already running");a.i=!0}K.prototype.j=function(a){this.s=a};function M(a,b){a.h={v:b,w:!0};a.a=a.o}K.prototype.return=function(a){this.h={return:a};this.a=this.o};function N(a,b){a.a=3;return{value:b}}function la(a){this.a=new K;this.b=a}function ma(a,b){L(a.a);var c=a.a.b;if(c)return O(a,"return"in c?c["return"]:function(g){return{value:g,done:!0}},b,a.a.return);a.a.return(b);return P(a)}
function O(a,b,c,g){try{var e=b.call(a.a.b,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.a.i=!1,e;var f=e.value}catch(h){return a.a.b=null,M(a.a,h),P(a)}a.a.b=null;g.call(a.a,f);return P(a)}function P(a){for(;a.a.a;)try{var b=a.b(a.a);if(b)return a.a.i=!1,{value:b.value,done:!1}}catch(c){a.a.s=void 0,M(a.a,c)}a.a.i=!1;if(a.a.h){b=a.a.h;a.a.h=null;if(b.w)throw b.v;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function na(a){this.next=function(b){L(a.a);a.a.b?b=O(a,a.a.b.next,b,a.a.j):(a.a.j(b),b=P(a));return b};this.throw=function(b){L(a.a);a.a.b?b=O(a,a.a.b["throw"],b,a.a.j):(M(a.a,b),b=P(a));return b};this.return=function(b){return ma(a,b)};C();this[Symbol.iterator]=function(){return this}}function Q(a,b){b=new na(new la(b));ka&&ka(b,a.prototype);return b}Array.from||(Array.from=function(a){return[].slice.call(a)});
Object.assign||(Object.assign=function(a){for(var b=[].slice.call(arguments,1),c=0,g;c<b.length;c++)if(g=b[c])for(var e=a,f=Object.keys(g),h=0;h<f.length;h++){var q=f[h];e[q]=g[q]}return a});var oa=setTimeout;function pa(){}function qa(a,b){return function(){a.apply(b,arguments)}}function R(a){if(!(this instanceof R))throw new TypeError("Promises must be constructed via new");if("function"!==typeof a)throw new TypeError("not a function");this.c=0;this.m=!1;this.f=void 0;this.g=[];ra(a,this)}function sa(a,b){for(;3===a.c;)a=a.f;0===a.c?a.g.push(b):(a.m=!0,S(function(){var c=1===a.c?b.A:b.B;if(null===c)(1===a.c?T:U)(b.l,a.f);else{try{var g=c(a.f)}catch(e){U(b.l,e);return}T(b.l,g)}}))}
function T(a,b){try{if(b===a)throw new TypeError("A promise cannot be resolved with itself.");if(b&&("object"===typeof b||"function"===typeof b)){var c=b.then;if(b instanceof R){a.c=3;a.f=b;V(a);return}if("function"===typeof c){ra(qa(c,b),a);return}}a.c=1;a.f=b;V(a)}catch(g){U(a,g)}}function U(a,b){a.c=2;a.f=b;V(a)}
function V(a){2===a.c&&0===a.g.length&&S(function(){a.m||"undefined"!==typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",a.f)});for(var b=0,c=a.g.length;b<c;b++)sa(a,a.g[b]);a.g=null}function ta(a,b,c){this.A="function"===typeof a?a:null;this.B="function"===typeof b?b:null;this.l=c}function ra(a,b){var c=!1;try{a(function(g){c||(c=!0,T(b,g))},function(g){c||(c=!0,U(b,g))})}catch(g){c||(c=!0,U(b,g))}}R.prototype["catch"]=function(a){return this.then(null,a)};
R.prototype.then=function(a,b){var c=new this.constructor(pa);sa(this,new ta(a,b,c));return c};R.prototype["finally"]=function(a){var b=this.constructor;return this.then(function(c){return b.resolve(a()).then(function(){return c})},function(c){return b.resolve(a()).then(function(){return b.reject(c)})})};
function ua(a){return new R(function(b,c){function g(q,r){try{if(r&&("object"===typeof r||"function"===typeof r)){var w=r.then;if("function"===typeof w){w.call(r,function(z){g(q,z)},c);return}}e[q]=r;0===--f&&b(e)}catch(z){c(z)}}if(!a||"undefined"===typeof a.length)return c(new TypeError("Promise.all accepts an array"));var e=Array.prototype.slice.call(a);if(0===e.length)return b([]);for(var f=e.length,h=0;h<e.length;h++)g(h,e[h])})}
function va(a){return a&&"object"===typeof a&&a.constructor===R?a:new R(function(b){b(a)})}function wa(a){return new R(function(b,c){c(a)})}function xa(a){return new R(function(b,c){if(!a||"undefined"===typeof a.length)return c(new TypeError("Promise.race accepts an array"));for(var g=0,e=a.length;g<e;g++)va(a[g]).then(b,c)})}var S="function"===typeof setImmediate&&function(a){setImmediate(a)}||function(a){oa(a,0)};/*

Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
if(!window.Promise){window.Promise=R;R.prototype.then=R.prototype.then;R.all=ua;R.race=xa;R.resolve=va;R.reject=wa;var Y=document.createTextNode(""),Z=[];(new MutationObserver(function(){for(var a=Z.length,b=0;b<a;b++)Z[b]();Z.splice(0,a)})).observe(Y,{characterData:!0});S=function(a){Z.push(a);Y.textContent=0<Y.textContent.length?"":"a"}};/*
 Copyright (C) 2015 by WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function(a,b){if(!(b in a)){var c=typeof global===typeof c?window:global,g=0,e=""+Math.random(),f="__\u0001symbol@@"+e,h=a.getOwnPropertyNames,q=a.getOwnPropertyDescriptor,r=a.create,w=a.keys,z=a.freeze||a,n=a.defineProperty,ya=a.defineProperties,l=q(a,"getOwnPropertyNames"),u=a.prototype,E=u.hasOwnProperty,za=u.propertyIsEnumerable,Aa=u.toString,fa=function(p,d,k){E.call(p,f)||n(p,f,{enumerable:!1,configurable:!1,writable:!1,value:{}});p[f]["@@"+d]=k},Ba=function(p,d){var k=r(p);h(d).forEach(function(m){I.call(d,
m)&&W(k,m,d[m])});return k},Ca=function(){},ha=function(p){return p!=f&&!E.call(B,p)},F=function(p){return p!=f&&E.call(B,p)},I=function(p){var d=""+p;return F(d)?E.call(this,d)&&this[f]["@@"+d]:za.call(this,p)},ia=function(p){n(u,p,{enumerable:!1,configurable:!0,get:Ca,set:function(d){X(this,p,{enumerable:!1,configurable:!0,writable:!0,value:d});fa(this,p,!0)}});return z(B[p]=n(a(p),"constructor",Da))},J=function k(d){if(this instanceof k)throw new TypeError("Symbol is not a constructor");return ia("__\u0001symbol:".concat(d||
"",e,++g))},B=r(null),Da={value:J},Ea=function(d){return B[d]},W=function(d,k,m){var x=""+k;if(F(x)){k=X;if(m.enumerable){var G=r(m);G.enumerable=!1}else G=m;k(d,x,G);fa(d,x,!!m.enumerable)}else n(d,k,m);return d},ja=function(d){return h(d).filter(F).map(Ea)};l.value=W;n(a,"defineProperty",l);l.value=ja;n(a,b,l);l.value=function(d){return h(d).filter(ha)};n(a,"getOwnPropertyNames",l);l.value=function(d,k){var m=ja(k);m.length?w(k).concat(m).forEach(function(x){I.call(k,x)&&W(d,x,k[x])}):ya(d,k);return d};
n(a,"defineProperties",l);l.value=I;n(u,"propertyIsEnumerable",l);l.value=J;n(c,"Symbol",l);l.value=function(d){d="__\u0001symbol:".concat("__\u0001symbol:",d,e);return d in u?B[d]:ia(d)};n(J,"for",l);l.value=function(d){if(ha(d))throw new TypeError(d+" is not a symbol");if(E.call(B,d)&&(d=d.slice(10),"__\u0001symbol:"===d.slice(0,10)&&(d=d.slice(10),d!==e)))return d=d.slice(0,d.length-e.length),0<d.length?d:void 0};n(J,"keyFor",l);l.value=function(d,k){var m=q(d,k);m&&F(k)&&(m.enumerable=I.call(d,
k));return m};n(a,"getOwnPropertyDescriptor",l);l.value=function(d,k){return 1===arguments.length||"undefined"===typeof k?r(d):Ba(d,k)};n(a,"create",l);l.value=function(){var d=Aa.call(this);return"[object String]"===d&&F(this)?"[object Symbol]":d};n(u,"toString",l);try{if(!0===r(n({},"__\u0001symbol:",{get:function(){return n(this,"__\u0001symbol:",{value:!0})["__\u0001symbol:"]}}))["__\u0001symbol:"])var X=n;else throw"IE11";}catch(d){X=function(k,m,x){var G=q(u,m);delete u[m];n(k,m,x);n(u,m,G)}}}})(Object,
"getOwnPropertySymbols");(function(a,b){var c=a.defineProperty,g=a.prototype,e=g.toString,f;"iterator match replace search split hasInstance isConcatSpreadable unscopables species toPrimitive toStringTag".split(" ").forEach(function(h){if(!(h in b))switch(c(b,h,{value:b(h)}),h){case "toStringTag":f=a.getOwnPropertyDescriptor(g,"toString"),f.value=function(){var q=e.call(this),r=null!=this?this[b.toStringTag]:this;return null==r?q:"[object "+r+"]"},c(g,"toString",f)}})})(Object,Symbol);
(function(a,b,c){function g(){return this}b[a]||(b[a]=function(){var e=0,f=this,h={next:function(){var q=f.length<=e;return q?{done:q}:{done:q,value:f[e++]}}};h[a]=g;return h});c[a]||(c[a]=function(){var e=String.fromCodePoint,f=this,h=0,q=f.length,r={next:function(){var w=q<=h,z=w?"":e(f.codePointAt(h));h+=z.length;return w?{done:w}:{done:w,value:z}}};r[a]=g;return r})})(Symbol.iterator,Array.prototype,String.prototype);/*

Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var Fa=Object.prototype.toString;Object.prototype.toString=function(){return void 0===this?"[object Undefined]":null===this?"[object Null]":Fa.call(this)};Object.keys=function(a){return Object.getOwnPropertyNames(a).filter(function(b){return(b=Object.getOwnPropertyDescriptor(a,b))&&b.enumerable})};y();C();
String.prototype[Symbol.iterator]&&String.prototype.codePointAt||(y(),C(),String.prototype[Symbol.iterator]=function b(){var c,g=this;return Q(b,function(e){1==e.a&&(c=0);if(3!=e.a)return c<g.length?e=N(e,g[c]):(e.a=0,e=void 0),e;c++;e.a=2})});y();C();Set.prototype[Symbol.iterator]||(y(),C(),Set.prototype[Symbol.iterator]=function b(){var c,g=this,e;return Q(b,function(f){1==f.a&&(c=[],g.forEach(function(h){c.push(h)}),e=0);if(3!=f.a)return e<c.length?f=N(f,c[e]):(f.a=0,f=void 0),f;e++;f.a=2})});
y();C();Map.prototype[Symbol.iterator]||(y(),C(),Map.prototype[Symbol.iterator]=function b(){var c,g=this,e;return Q(b,function(f){1==f.a&&(c=[],g.forEach(function(h,q){c.push([q,h])}),e=0);if(3!=f.a)return e<c.length?f=N(f,c[e]):(f.a=0,f=void 0),f;e++;f.a=2})});/*

Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
}).call(this);

//# sourceMappingURL=webcomponents-pf_js.js.map
