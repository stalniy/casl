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
'use strict';function g(b){var d=0;return function(){return d<b.length?{done:!1,value:b[d++]}:{done:!0}}}function h(b){var d="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];return d?d.call(b):{next:g(b)}}var k=document.createEvent("Event");k.initEvent("foo",!0,!0);k.preventDefault();
if(!k.defaultPrevented){var l=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(l.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0},configurable:!0}))}}var m=/Trident/.test(navigator.userAgent);
if(!window.Event||m&&"function"!==typeof window.Event){var n=window.Event;window.Event=function(b,d){d=d||{};var c=document.createEvent("Event");c.initEvent(b,!!d.bubbles,!!d.cancelable);return c};if(n){for(var p in n)window.Event[p]=n[p];window.Event.prototype=n.prototype}}
if(!window.CustomEvent||m&&"function"!==typeof window.CustomEvent)window.CustomEvent=function(b,d){d=d||{};var c=document.createEvent("CustomEvent");c.initCustomEvent(b,!!d.bubbles,!!d.cancelable,d.detail);return c},window.CustomEvent.prototype=window.Event.prototype;
if(!window.MouseEvent||m&&"function"!==typeof window.MouseEvent){var q=window.MouseEvent;window.MouseEvent=function(b,d){d=d||{};var c=document.createEvent("MouseEvent");c.initMouseEvent(b,!!d.bubbles,!!d.cancelable,d.view||window,d.detail,d.screenX,d.screenY,d.clientX,d.clientY,d.ctrlKey,d.altKey,d.shiftKey,d.metaKey,d.button,d.relatedTarget);return c};if(q)for(var r in q)window.MouseEvent[r]=q[r];window.MouseEvent.prototype=q.prototype};/*

Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
Object.getOwnPropertyDescriptor(Node.prototype,"baseURI")||Object.defineProperty(Node.prototype,"baseURI",{get:function(){var b=(this.ownerDocument||this).querySelector("base[href]");return b&&b.href||window.location.href},configurable:!0,enumerable:!0});/*

Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
var t,u,v=Element.prototype,w=null!==(t=Object.getOwnPropertyDescriptor(v,"attributes"))&&void 0!==t?t:Object.getOwnPropertyDescriptor(Node.prototype,"attributes"),x=null!==(u=null===w||void 0===w?void 0:w.get)&&void 0!==u?u:function(){return this.attributes},y=Array.prototype.map;v.hasOwnProperty("getAttributeNames")||(v.getAttributeNames=function(){return y.call(x.call(this),function(b){return b.name})});var z,A=Element.prototype;A.hasOwnProperty("matches")||(A.matches=null!==(z=A.webkitMatchesSelector)&&void 0!==z?z:A.msMatchesSelector);/*

Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var B=Node.prototype.appendChild;function C(b){b=b.prototype;b.hasOwnProperty("append")||Object.defineProperty(b,"append",{configurable:!0,enumerable:!0,writable:!0,value:function(d){for(var c=[],a=0;a<arguments.length;++a)c[a]=arguments[a];c=h(c);for(a=c.next();!a.done;a=c.next())a=a.value,B.call(this,"string"===typeof a?document.createTextNode(a):a)}})}C(Document);C(DocumentFragment);C(Element);var D,E,F=Node.prototype.insertBefore,aa=null!==(E=null===(D=Object.getOwnPropertyDescriptor(Node.prototype,"firstChild"))||void 0===D?void 0:D.get)&&void 0!==E?E:function(){return this.firstChild};
function G(b){b=b.prototype;b.hasOwnProperty("prepend")||Object.defineProperty(b,"prepend",{configurable:!0,enumerable:!0,writable:!0,value:function(d){for(var c=[],a=0;a<arguments.length;++a)c[a]=arguments[a];a=aa.call(this);c=h(c);for(var e=c.next();!e.done;e=c.next())e=e.value,F.call(this,"string"===typeof e?document.createTextNode(e):e,a)}})}G(Document);G(DocumentFragment);G(Element);var H,I,ba=Node.prototype.appendChild,ca=Node.prototype.removeChild,da=null!==(I=null===(H=Object.getOwnPropertyDescriptor(Node.prototype,"firstChild"))||void 0===H?void 0:H.get)&&void 0!==I?I:function(){return this.firstChild};
function J(b){b=b.prototype;b.hasOwnProperty("replaceChildren")||Object.defineProperty(b,"replaceChildren",{configurable:!0,enumerable:!0,writable:!0,value:function(d){for(var c=[],a=0;a<arguments.length;++a)c[a]=arguments[a];for(;null!==(a=da.call(this));)ca.call(this,a);c=h(c);for(a=c.next();!a.done;a=c.next())a=a.value,ba.call(this,"string"===typeof a?document.createTextNode(a):a)}})}J(Document);J(DocumentFragment);J(Element);var K,L,M,N,ea=Node.prototype.insertBefore,fa=null!==(L=null===(K=Object.getOwnPropertyDescriptor(Node.prototype,"parentNode"))||void 0===K?void 0:K.get)&&void 0!==L?L:function(){return this.parentNode},ha=null!==(N=null===(M=Object.getOwnPropertyDescriptor(Node.prototype,"nextSibling"))||void 0===M?void 0:M.get)&&void 0!==N?N:function(){return this.nextSibling};
function O(b){b=b.prototype;b.hasOwnProperty("after")||Object.defineProperty(b,"after",{configurable:!0,enumerable:!0,writable:!0,value:function(d){for(var c=[],a=0;a<arguments.length;++a)c[a]=arguments[a];a=fa.call(this);if(null!==a){var e=ha.call(this);c=h(c);for(var f=c.next();!f.done;f=c.next())f=f.value,ea.call(a,"string"===typeof f?document.createTextNode(f):f,e)}}})}O(CharacterData);O(Element);var P,Q,ia=Node.prototype.insertBefore,ja=null!==(Q=null===(P=Object.getOwnPropertyDescriptor(Node.prototype,"parentNode"))||void 0===P?void 0:P.get)&&void 0!==Q?Q:function(){return this.parentNode};
function R(b){b=b.prototype;b.hasOwnProperty("before")||Object.defineProperty(b,"before",{configurable:!0,enumerable:!0,writable:!0,value:function(d){for(var c=[],a=0;a<arguments.length;++a)c[a]=arguments[a];a=ja.call(this);if(null!==a){c=h(c);for(var e=c.next();!e.done;e=c.next())e=e.value,ia.call(a,"string"===typeof e?document.createTextNode(e):e,this)}}})}R(CharacterData);R(Element);var S,T,ka=Node.prototype.removeChild,la=null!==(T=null===(S=Object.getOwnPropertyDescriptor(Node.prototype,"parentNode"))||void 0===S?void 0:S.get)&&void 0!==T?T:function(){return this.parentNode};function U(b){b=b.prototype;b.hasOwnProperty("remove")||Object.defineProperty(b,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){var d=la.call(this);d&&ka.call(d,this)}})}U(CharacterData);U(Element);var V,W,ma=Node.prototype.insertBefore,na=Node.prototype.removeChild,oa=null!==(W=null===(V=Object.getOwnPropertyDescriptor(Node.prototype,"parentNode"))||void 0===V?void 0:V.get)&&void 0!==W?W:function(){return this.parentNode};
function X(b){b=b.prototype;b.hasOwnProperty("replaceWith")||Object.defineProperty(b,"replaceWith",{configurable:!0,enumerable:!0,writable:!0,value:function(d){for(var c=[],a=0;a<arguments.length;++a)c[a]=arguments[a];a=oa.call(this);if(null!==a){c=h(c);for(var e=c.next();!e.done;e=c.next())e=e.value,ma.call(a,"string"===typeof e?document.createTextNode(e):e,this);na.call(a,this)}}})}X(CharacterData);X(Element);var Y=window.Element.prototype,Z=window.HTMLElement.prototype,pa=window.SVGElement.prototype;!Z.hasOwnProperty("classList")||Y.hasOwnProperty("classList")||pa.hasOwnProperty("classList")||Object.defineProperty(Y,"classList",Object.getOwnPropertyDescriptor(Z,"classList"));}).call(this);

//# sourceMappingURL=webcomponents-pf_dom.js.map
