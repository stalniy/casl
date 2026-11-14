var xi=Object.defineProperty;var _i=(n,e,t)=>e in n?xi(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var _=(n,e,t)=>_i(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Jt=typeof window<"u"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0,ki=(n,e,t=null,i=null)=>{for(;e!==t;){const r=e.nextSibling;n.insertBefore(e,i),e=r}},Ct=(n,e,t=null)=>{for(;e!==t;){const i=e.nextSibling;n.removeChild(e),e=i}};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const D=`{{lit-${String(Math.random()).slice(2)}}}`,Sn=`<!--${D}-->`,en=new RegExp(`${D}|${Sn}`),ae="$lit$";class An{constructor(e,t){this.parts=[],this.element=t;const i=[],r=[],s=document.createTreeWalker(t.content,133,null,!1);let a=0,l=-1,o=0;const{strings:c,values:{length:u}}=e;for(;o<u;){const d=s.nextNode();if(d===null){s.currentNode=r.pop();continue}if(l++,d.nodeType===1){if(d.hasAttributes()){const p=d.attributes,{length:f}=p;let g=0;for(let h=0;h<f;h++)tn(p[h].name,ae)&&g++;for(;g-- >0;){const h=c[o],k=ht.exec(h)[2],w=k.toLowerCase()+ae,b=d.getAttribute(w);d.removeAttribute(w);const y=b.split(en);this.parts.push({type:"attribute",index:l,name:k,strings:y}),o+=y.length-1}}d.tagName==="TEMPLATE"&&(r.push(d),s.currentNode=d.content)}else if(d.nodeType===3){const p=d.data;if(p.indexOf(D)>=0){const f=d.parentNode,g=p.split(en),h=g.length-1;for(let k=0;k<h;k++){let w,b=g[k];if(b==="")w=B();else{const y=ht.exec(b);y!==null&&tn(y[2],ae)&&(b=b.slice(0,y.index)+y[1]+y[2].slice(0,-ae.length)+y[3]),w=document.createTextNode(b)}f.insertBefore(w,d),this.parts.push({type:"node",index:++l})}g[h]===""?(f.insertBefore(B(),d),i.push(d)):d.data=g[h],o+=h}}else if(d.nodeType===8)if(d.data===D){const p=d.parentNode;(d.previousSibling===null||l===a)&&(l++,p.insertBefore(B(),d)),a=l,this.parts.push({type:"node",index:l}),d.nextSibling===null?d.data="":(i.push(d),l--),o++}else{let p=-1;for(;(p=d.data.indexOf(D,p+1))!==-1;)this.parts.push({type:"node",index:-1}),o++}}for(const d of i)d.parentNode.removeChild(d)}}const tn=(n,e)=>{const t=n.length-e.length;return t>=0&&n.slice(t)===e},En=n=>n.index!==-1,B=()=>document.createComment(""),ht=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const $t=133;function Cn(n,e){const{element:{content:t},parts:i}=n,r=document.createTreeWalker(t,$t,null,!1);let s=le(i),a=i[s],l=-1,o=0;const c=[];let u=null;for(;r.nextNode();){l++;const d=r.currentNode;for(d.previousSibling===u&&(u=null),e.has(d)&&(c.push(d),u===null&&(u=d)),u!==null&&o++;a!==void 0&&a.index===l;)a.index=u!==null?-1:a.index-o,s=le(i,s),a=i[s]}c.forEach(d=>d.parentNode.removeChild(d))}const Si=n=>{let e=n.nodeType===11?0:1;const t=document.createTreeWalker(n,$t,null,!1);for(;t.nextNode();)e++;return e},le=(n,e=-1)=>{for(let t=e+1;t<n.length;t++){const i=n[t];if(En(i))return t}return-1};function Ai(n,e,t=null){const{element:{content:i},parts:r}=n;if(t==null){i.appendChild(e);return}const s=document.createTreeWalker(i,$t,null,!1);let a=le(r),l=0,o=-1;for(;s.nextNode();)for(o++,s.currentNode===t&&(l=Si(e),t.parentNode.insertBefore(e,t));a!==-1&&r[a].index===o;){if(l>0){for(;a!==-1;)r[a].index+=l,a=le(r,a);return}a=le(r,a)}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const $n=new WeakMap,ge=n=>(...e)=>{const t=n(...e);return $n.set(t,!0),t},pe=n=>typeof n=="function"&&$n.has(n);/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const z={},nn={};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class Se{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)i!==void 0&&i.setValue(e[t]),t++;for(const i of this.__parts)i!==void 0&&i.commit()}_clone(){const e=Jt?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let s=0,a=0,l,o=r.nextNode();for(;s<i.length;){if(l=i[s],!En(l)){this.__parts.push(void 0),s++;continue}for(;a<l.index;)a++,o.nodeName==="TEMPLATE"&&(t.push(o),r.currentNode=o.content),(o=r.nextNode())===null&&(r.currentNode=t.pop(),o=r.nextNode());if(l.type==="node"){const c=this.processor.handleTextExpression(this.options);c.insertAfterNode(o.previousSibling),this.__parts.push(c)}else this.__parts.push(...this.processor.handleAttributeExpressions(o,l.name,l.strings,this.options));s++}return Jt&&(document.adoptNode(e),customElements.upgrade(e)),e}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const rn=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:n=>n}),Ei=` ${D} `;class Ae{constructor(e,t,i,r){this.strings=e,this.values=t,this.type=i,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let r=0;r<e;r++){const s=this.strings[r],a=s.lastIndexOf("<!--");i=(a>-1||i)&&s.indexOf("-->",a+1)===-1;const l=ht.exec(s);l===null?t+=s+(i?Ei:Sn):t+=s.substr(0,l.index)+l[1]+l[2]+ae+l[3]+D}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return rn!==void 0&&(t=rn.createHTML(t)),e.innerHTML=t,e}}/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Ge=n=>n===null||!(typeof n=="object"||typeof n=="function"),ft=n=>Array.isArray(n)||!!(n&&n[Symbol.iterator]);class Tn{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let r=0;r<i.length-1;r++)this.parts[r]=this._createPart()}_createPart(){return new Tt(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(t===1&&e[0]===""&&e[1]===""){const s=i[0].value;if(typeof s=="symbol")return String(s);if(typeof s=="string"||!ft(s))return s}let r="";for(let s=0;s<t;s++){r+=e[s];const a=i[s];if(a!==void 0){const l=a.value;if(Ge(l)||!ft(l))r+=typeof l=="string"?l:String(l);else for(const o of l)r+=typeof o=="string"?o:String(o)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class Tt{constructor(e){this.value=void 0,this.committer=e}setValue(e){e!==z&&(!Ge(e)||e!==this.value)&&(this.value=e,pe(e)||(this.committer.dirty=!0))}commit(){for(;pe(this.value);){const e=this.value;this.value=z,e(this)}this.value!==z&&this.committer.commit()}}class Q{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(B()),this.endNode=e.appendChild(B())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=B()),e.__insert(this.endNode=B())}insertAfterPart(e){e.__insert(this.startNode=B()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(this.startNode.parentNode===null)return;for(;pe(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=z,t(this)}const e=this.__pendingValue;e!==z&&(Ge(e)?e!==this.value&&this.__commitText(e):e instanceof Ae?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):ft(e)?this.__commitIterable(e):e===nn?(this.value=nn,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling;e=e??"";const i=typeof e=="string"?e:String(e);t===this.endNode.previousSibling&&t.nodeType===3?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof Se&&this.value.template===t)this.value.update(e.values);else{const i=new Se(t,e.processor,this.options),r=i._clone();i.update(e.values),this.__commitNode(r),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i=0,r;for(const s of e)r=t[i],r===void 0&&(r=new Q(this.options),t.push(r),i===0?r.appendIntoPart(this):r.insertAfterPart(t[i-1])),r.setValue(s),r.commit(),i++;i<t.length&&(t.length=i,this.clear(r&&r.endNode))}clear(e=this.startNode){Ct(this.startNode.parentNode,e.nextSibling,this.endNode)}}class Ci{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,i.length!==2||i[0]!==""||i[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;pe(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=z,t(this)}if(this.__pendingValue===z)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=z}}class $i extends Tn{constructor(e,t,i){super(e,t,i),this.single=i.length===2&&i[0]===""&&i[1]===""}_createPart(){return new Ti(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class Ti extends Tt{}let Fn=!1;(()=>{try{const n={get capture(){return Fn=!0,!1}};window.addEventListener("test",n,n),window.removeEventListener("test",n,n)}catch{}})();class Fi{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=r=>this.handleEvent(r)}setValue(e){this.__pendingValue=e}commit(){for(;pe(this.__pendingValue);){const s=this.__pendingValue;this.__pendingValue=z,s(this)}if(this.__pendingValue===z)return;const e=this.__pendingValue,t=this.value,i=e==null||t!=null&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=e!=null&&(t==null||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=Ni(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=z}handleEvent(e){typeof this.value=="function"?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const Ni=n=>n&&(Fn?{capture:n.capture,passive:n.passive,once:n.once}:n.capture);/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */function Oi(n){let e=he.get(n.type);e===void 0&&(e={stringsArray:new WeakMap,keyString:new Map},he.set(n.type,e));let t=e.stringsArray.get(n.strings);if(t!==void 0)return t;const i=n.strings.join(D);return t=e.keyString.get(i),t===void 0&&(t=new An(n,n.getTemplateElement()),e.keyString.set(i,t)),e.stringsArray.set(n.strings,t),t}const he=new Map;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const te=new WeakMap,Ii=(n,e,t)=>{let i=te.get(e);i===void 0&&(Ct(e,e.firstChild),te.set(e,i=new Q(Object.assign({templateFactory:Oi},t))),i.appendInto(e)),i.setValue(n),i.commit()};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */class ji{handleAttributeExpressions(e,t,i,r){const s=t[0];return s==="."?new $i(e,t.slice(1),i).parts:s==="@"?[new Fi(e,t.slice(1),r.eventContext)]:s==="?"?[new Ci(e,t.slice(1),i)]:new Tn(e,t,i).parts}handleTextExpression(e){return new Q(e)}}const Pi=new ji;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */typeof window<"u"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const m=(n,...e)=>new Ae(n,e,"html",Pi);/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const Nn=(n,e)=>`${n}--${e}`;let Ee=!0;typeof window.ShadyCSS>"u"?Ee=!1:typeof window.ShadyCSS.prepareTemplateDom>"u"&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Ee=!1);const Li=n=>e=>{const t=Nn(e.type,n);let i=he.get(t);i===void 0&&(i={stringsArray:new WeakMap,keyString:new Map},he.set(t,i));let r=i.stringsArray.get(e.strings);if(r!==void 0)return r;const s=e.strings.join(D);if(r=i.keyString.get(s),r===void 0){const a=e.getTemplateElement();Ee&&window.ShadyCSS.prepareTemplateDom(a,n),r=new An(e,a),i.keyString.set(s,r)}return i.stringsArray.set(e.strings,r),r},Ri=["html","svg"],zi=n=>{Ri.forEach(e=>{const t=he.get(Nn(e,n));t!==void 0&&t.keyString.forEach(i=>{const{element:{content:r}}=i,s=new Set;Array.from(r.querySelectorAll("style")).forEach(a=>{s.add(a)}),Cn(i,s)})})},On=new Set,Mi=(n,e,t)=>{On.add(n);const i=t?t.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:s}=r;if(s===0){window.ShadyCSS.prepareTemplateStyles(i,n);return}const a=document.createElement("style");for(let c=0;c<s;c++){const u=r[c];u.parentNode.removeChild(u),a.textContent+=u.textContent}zi(n);const l=i.content;t?Ai(t,a,l.firstChild):l.insertBefore(a,l.firstChild),window.ShadyCSS.prepareTemplateStyles(i,n);const o=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&o!==null)e.insertBefore(o.cloneNode(!0),e.firstChild);else if(t){l.insertBefore(a,l.firstChild);const c=new Set;c.add(a),Cn(t,c)}},Vi=(n,e,t)=>{if(!t||typeof t!="object"||!t.scopeName)throw new Error("The `scopeName` option is required.");const i=t.scopeName,r=te.has(e),s=Ee&&e.nodeType===11&&!!e.host,a=s&&!On.has(i),l=a?document.createDocumentFragment():e;if(Ii(n,l,Object.assign({templateFactory:Li(i)},t)),a){const o=te.get(l);te.delete(l);const c=o.value instanceof Se?o.value.template:void 0;Mi(i,l,c),Ct(e,e.firstChild),e.appendChild(l),te.set(e,o)}!r&&s&&window.ShadyCSS.styleElement(e.host)};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */var In;window.JSCompiler_renameProperty=(n,e)=>n;const mt={toAttribute(n,e){switch(e){case Boolean:return n?"":null;case Object:case Array:return n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){switch(e){case Boolean:return n!==null;case Number:return n===null?null:Number(n);case Object:case Array:return JSON.parse(n)}return n}},jn=(n,e)=>e!==n&&(e===e||n===n),Ze={attribute:!0,type:String,converter:mt,reflect:!1,hasChanged:jn},Je=1,et=4,tt=8,nt=16,gt="finalized";class Pn extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const r=this._attributeNameForProperty(i,t);r!==void 0&&(this._attributeToPropertyMap.set(r,i),e.push(r))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;e!==void 0&&e.forEach((t,i)=>this._classProperties.set(i,t))}}static createProperty(e,t=Ze){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i=typeof e=="symbol"?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdateInternal(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Ze}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(gt)||e.finalize(),this[gt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...typeof Object.getOwnPropertySymbols=="function"?Object.getOwnPropertySymbols(t):[]];for(const r of i)this.createProperty(r,t[r])}}static _attributeNameForProperty(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=jn){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,r=t.converter||mt,s=typeof r=="function"?r:r.fromAttribute;return s?s(e,i):e}static _propertyValueToAttribute(e,t){if(t.reflect===void 0)return;const i=t.type,r=t.converter;return(r&&r.toAttribute||mt.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const i=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,i)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){this._enableUpdatingResolver!==void 0&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=Ze){const r=this.constructor,s=r._attributeNameForProperty(e,i);if(s!==void 0){const a=r._propertyValueToAttribute(t,i);if(a===void 0)return;this._updateState=this._updateState|tt,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._updateState=this._updateState&~tt}}_attributeToProperty(e,t){if(this._updateState&tt)return;const i=this.constructor,r=i._attributeToPropertyMap.get(e);if(r!==void 0){const s=i.getPropertyOptions(r);this._updateState=this._updateState|nt,this[r]=i._propertyValueFromAttribute(t,s),this._updateState=this._updateState&~nt}}requestUpdateInternal(e,t,i){let r=!0;if(e!==void 0){const s=this.constructor;i=i||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),i.reflect===!0&&!(this._updateState&nt)&&(this._reflectingProperties===void 0&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|et;try{await this._updatePromise}catch{}const e=this.performUpdate();return e!=null&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&et}get hasUpdated(){return this._updateState&Je}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(i){throw e=!1,this._markUpdated(),i}e&&(this._updateState&Je||(this._updateState=this._updateState|Je,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~et}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){this._reflectingProperties!==void 0&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,i)=>this._propertyToAttribute(i,this[i],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}In=gt;Pn[In]=!0;/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const vt=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ft=Symbol();class Nt{constructor(e,t){if(t!==Ft)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return this._styleSheet===void 0&&(vt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Ln=n=>new Nt(String(n),Ft),Di=n=>{if(n instanceof Nt)return n.cssText;if(typeof n=="number")return n;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${n}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)},S=(n,...e)=>{const t=e.reduce((i,r,s)=>i+Di(r)+n[s+1],n[0]);return new Nt(t,Ft)};/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const sn={};class $ extends Pn{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(s,a)=>s.reduceRight((l,o)=>Array.isArray(o)?t(o,l):(l.add(o),l),a),i=t(e,new Set),r=[];i.forEach(s=>r.unshift(s)),this._styles=r}else this._styles=e===void 0?[]:[e];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!vt){const i=Array.prototype.slice.call(t.cssRules).reduce((r,s)=>r+s.cssText,"");return Ln(i)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;e.length!==0&&(window.ShadyCSS!==void 0&&!window.ShadyCSS.nativeShadow?window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(t=>t.cssText),this.localName):vt?this.renderRoot.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0)}connectedCallback(){super.connectedCallback(),this.hasUpdated&&window.ShadyCSS!==void 0&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==sn&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(i=>{const r=document.createElement("style");r.textContent=i.cssText,this.renderRoot.appendChild(r)}))}render(){return sn}}$.finalized=!0;$.render=Vi;const Rn="casl:ability:monthly-downloads",qi=24*60*60*1e3,Ui="https://api.npmjs.org/downloads/point/last-month/@casl/ability";function Bi(){try{const n=JSON.parse(localStorage.getItem(Rn));return n&&Number.isSafeInteger(n.downloads)&&n.downloads>=0&&Number.isFinite(n.timestamp)?n:null}catch{return null}}async function Hi(){const n=Bi(),e=n?Date.now()-n.timestamp:1/0;if(e>=0&&e<qi)return n.downloads;try{const t=await fetch(Ui,{signal:typeof AbortSignal.timeout=="function"?AbortSignal.timeout(5e3):void 0});if(!t.ok)throw new Error("Failed to retrieve npm downloads");const{downloads:i}=await t.json();if(!Number.isSafeInteger(i)||i<0)throw new Error("Invalid npm download count");try{localStorage.setItem(Rn,JSON.stringify({downloads:i,timestamp:Date.now()}))}catch{}return i}catch{return n?n.downloads:null}}let on=null;function Wi(){return on??(on=Hi()),on}const Ki="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2018%207'%20width='36'%20height='14'%3e%3cpath%20fill='%23fff'%20d='M0%200h18v6H9v1H5V6H0V0zm1%201v4h2V2h1v3h1V1H1zm5%200v5h2V5h2V1H6zm2%201h1v2H8V2zm3-1v4h2V2h1v3h1V2h1v3h1V1h-6z'/%3e%3c/svg%3e",Xi=new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1});class Ce extends ${connectedCallback(){super.connectedCallback(),Wi().then(e=>{this.downloads=e})}render(){return m`
      <a
        href="https://www.npmjs.com/package/@casl/ability"
        target="_blank"
        rel="noopener"
        title="@casl/ability downloads over the last 30 available days"
      >
        <span class="label"><img src="${Ki}" alt="npm" width="24" height="9"></span>
        <span class="download-count">${this.downloads==null?"—":`${Xi.format(this.downloads)}/month`}</span>
      </a>
    `}}_(Ce,"cName","npm-downloads-button"),_(Ce,"properties",{downloads:{type:Number}});Ce.styles=S`
  :host {
    display: inline-flex;
  }

  a {
    display: inline-flex;
    align-items: center;
    height: 28px;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #444c56;
    border-radius: 4px;
    background: #202428;
    color: #fff;
    font: 600 12px/1 "Helvetica Neue", Arial, sans-serif;
    text-decoration: none;
  }

  a:hover,
  a:focus-visible {
    color: #58a6ff;
  }

  span {
    padding: 0 8px;
  }

  .label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .download-count {
    display: inline-flex;
    align-items: center;
    align-self: stretch;
    border-left: 1px solid #444c56;
    background: #30363d;
  }
`;/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const an=new WeakMap,Ot=ge(n=>e=>{if(!(e instanceof Q))throw new Error("unsafeHTML can only be used in text bindings");const t=an.get(e);if(t!==void 0&&Ge(n)&&n===t.value&&e.value===t.fragment)return;const i=document.createElement("template");i.innerHTML=n;const r=document.importNode(i.content,!0);e.setValue(r),an.set(e,{value:n,fragment:r})}),Gi=1e3*60,bt="langChanged";function Qi(n,e,t){return Object.entries(yt(e||{})).reduce((i,[r,s])=>i.replace(new RegExp(`{{[  ]*${r}[  ]*}}`,"gm"),String(yt(s))),n)}function Yi(n,e){const t=n.split(".");let i=e.strings;for(;i!=null&&t.length>0;)i=i[t.shift()];return i!=null?i.toString():null}function yt(n){return typeof n=="function"?n():n}const Zi=()=>({loader:()=>Promise.resolve({}),empty:n=>`[${n}]`,lookup:Yi,interpolate:Qi,translationCache:{}});let fe=Zi();function Ji(n){return fe=Object.assign(Object.assign({},fe),n)}function er(n){window.dispatchEvent(new CustomEvent(bt,{detail:n}))}function tr(n,e,t=fe){er({previousStrings:t.strings,previousLang:t.lang,lang:t.lang=n,strings:t.strings=e})}function zn(n,e){const t=i=>n(i.detail);return window.addEventListener(bt,t,e),()=>window.removeEventListener(bt,t)}async function nr(n,e=fe){const t=await e.loader(n,e);e.translationCache={},tr(n,t,e)}function Qe(n,e,t=fe){let i=t.translationCache[n]||(t.translationCache[n]=t.lookup(n,t)||t.empty(n,t));return e=e!=null?yt(e):null,e!=null?t.interpolate(i,e,t):i}function Mn(n){return n instanceof Q?n.startNode.isConnected:n instanceof Tt?n.committer.element.isConnected:n.element.isConnected}function ir(n){for(const[e]of n)Mn(e)||n.delete(e)}function rr(n){"requestIdleCallback"in window?window.requestIdleCallback(n):setTimeout(n)}function sr(n,e){setInterval(()=>rr(()=>ir(n)),e)}const It=new Map;function or(){zn(n=>{for(const[e,t]of It)Mn(e)&&Vn(e,t,n)})}or();sr(It,Gi);function Vn(n,e,t){const i=e(t);n.value!==i&&(n.setValue(i),n.commit())}const Dn=ge(n=>e=>{It.set(e,n),Vn(e,n)}),ar=(n,e,t)=>Dn(()=>Qe(n,e,t)),lr=(...n)=>JSON.stringify(n);function ee(n,e=lr){const t=new Map,i=function(...r){const s=e(...r);return t.has(s)||t.set(s,n.apply(this,r)),t.get(s)};return i.cache=t,i}function cr(n,e){let t;return function(...i){clearTimeout(t),t=setTimeout(()=>n.apply(this,i),e)}}const ve={repoURL:"https://github.com/stalniy/casl",baseUrl:"/v6"},ln=n=>n,dr={json:JSON,raw:{parse:ln,stringify:ln},txtArrayJSON:{parse(n){const e=n.trim().replace(/[\r\n]+/g,",");return JSON.parse(`[${e}]`)},stringify(){throw new Error('"txtArrayJSON" format is not serializable')}}};function cn(n,e={}){const t=dr[e.format||"json"];return new Promise((i,r)=>{const s=new XMLHttpRequest;s.open(e.method||"GET",n),e.headers&&Object.keys(e.headers).forEach(a=>{s.setRequestHeader(a,e.headers[a])}),s.onload=()=>i({status:s.status,headers:{"content-type":s.getResponseHeader("Content-Type")},body:t.parse(s.responseText)}),s.ontimeout=s.onerror=r,s.send(e.data?t.stringify(e.data):null)})}const Z=Object.create(null);function ce(n,e={}){const t=e.absoluteUrl?n:ve.baseUrl+n;return(e.method||"GET")!=="GET"?cn(t,e):(Z[t]=Z[t]||cn(t,e),e.cache===!0?Z[t]:Z[t].then(r=>(delete Z[t],r)).catch(r=>(delete Z[t],Promise.reject(r))))}var ur={en:{default:"/assets/default.en-Ba4lSvvg.json"}},pr=["en"];function qn(n,e){const t=n.split(".");let i=e.strings;for(let r=0;r<t.length;r++){const s=t[r];if(!i||!i[s])return;i=i[s]}return i}function hr(n){return console.warn(`missing i18n key: ${n}`),n}const fr=/%\{(\w+)\}/g;function jt(n,e){return n.replace(fr,(t,i)=>e[i])}const Pt=Ji({async loader(n){return(await ce(ur[n].default)).body},lookup:qn,interpolate:jt,empty:hr}),mr=ee((n,e)=>new Intl.DateTimeFormat(n,Qe(`dateTimeFormats.${e}`))),$e=pr,Un=$e[0],be=()=>Pt.lang,de=Qe,gr=n=>!!qn(n,Pt);function vr(n){if(!$e.includes(n))throw new Error(`Locale ${n} is not supported. Supported: ${$e.join(", ")}`);return nr(n)}function br(n,e="default"){const t=typeof n=="string"?new Date(n):n;return mr(Pt.lang,e).format(t)}const yr=ge((n,e)=>t=>{const i=br(n,e);t.value!==i&&t.setValue(i)}),v=ar,G=ge((n,e)=>Dn(()=>Ot(Qe(n,e)))),Lt=S`
  .row {
    display: flex;
  }

  .row.wrap {
    flex-wrap: wrap;
  }

  .row.align-center {
    align-items: center;
  }

  .row.align-start {
    align-items: start;
  }

  .col {
    flex-grow: 1;
    flex-basis: 0;
    max-width: 100%;
  }

  .col-fixed {
    flex-grow: 0;
    flex-basis: auto;
  }

  @media (min-width: 768px) {
    .container {
      margin: auto;
      max-width: 1200px;
    }
  }
`,Ye=S`
  .md pre {
    overflow: auto;
  }

  .md a,
  .md app-link {
    color: #81a2be;
    text-decoration: underline;
    border-bottom: 0;
  }

  .md a:hover,
  .md app-link:hover {
    text-decoration: none;
    border-bottom: 0;
  }

  .md code:not([class]) {
    color: rgb(222, 147, 95);;
    background: #f8f8f8;
    padding: 2px 5px;
    margin: 0 2px;
    border-radius: 2px;
    white-space: nowrap;
    font-family: "Roboto Mono", Monaco, courier, monospace;
  }

  .md blockquote,
  .alert {
    padding: 0.8rem 1rem;
    margin: 0;
    border-left: 4px solid #81a2be;
    background-color: #f8f8f8;
    position: relative;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
  }

  .md blockquote:before,
  .alert:before {
    position: absolute;
    top: 0.8rem;
    left: -12px;
    color: #fff;
    background: #81a2be;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    text-align: center;
    line-height: 20px;
    font-weight: bold;
    font-size: 14px;
    content: 'i';
  }

  .md blockquote > p:first-child,
  .alert > p:first-child {
    margin-top: 0;
  }

  .md blockquote > p:last-child,
  .alert > p:last-child {
    margin-bottom: 0;
  }

  .md blockquote + blockquote,
  .alert + .alert {
    margin-top: 20px;
  }

  .md table {
    border-collapse: collapse;
    width: 100%;
  }

  .md .responsive {
    width: 100%;
    overflow-x: auto;
  }

  .md th,
  .md td {
    border: 1px solid #c6cbd1;
    padding: 6px 13px;
  }

  .md tr {
    border-top: 1px solid #c6cbd1;
  }

  .md .editor {
    width: 100%;
    height: 500px;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
  }

  .md h3::before {
    margin-left: -15px;
    margin-right: 5px;
    content: '#';
    color: #81a2be;
  }
`,wr=S`
  h1 {
    margin: 2rem 0 1rem;
    font-size: 2rem;
  }

  h2 {
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #ddd;
  }

  h1, h2, h3, h4, h5 {
    font-weight: normal;
    cursor: pointer;
  }

  .description {
    margin-top: 10px;
    color: #333;
    padding-left: 5px;
  }

  .description img {
    max-width: 100%;
    height: auto;
  }

  .description > h1 {
    display: none;
  }
`,Bn=S`
  .btn {
    display: inline-block;
    outline: 0;
    text-decoration: none;
    background-color: transparent;
    border: 1px solid #877e87;
    border-radius: 1rem;
    padding: .375rem 1.5rem;
    font-weight: 700;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    transition:
      color .2s cubic-bezier(.08,.52,.52,1),
      background .2s cubic-bezier(.08,.52,.52,1),
      border-color .2s cubic-bezier(.08,.52,.52,1);
    cursor: pointer;
    color: #444;
  }

  .btn:hover {
    background-color: #202428;
    border-color: #202428;
    color: #fff;
  }
`,Rt=S`
  .hljs,
  code[data-filename] {
    display: block;
    overflow-x: auto;
    padding: 1rem;
    background: #1d1f21;
    border-radius: 7px;
    box-shadow: rgba(0, 0, 0, 0.55) 0px 11px 11px 0px;
    font-size: 0.8rem;
    color: #c5c8c6;
  }

  .hljs::selection,
  .hljs span::selection,
  code[data-filename]::selection,
  code[data-filename] span::selection {
    background: #373b41;
  }

  code[data-filename] {
    position: relative;
    padding-top: 22px;
  }

  code[data-filename]:before {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.7rem;
    content: attr(data-filename);
    padding: 2px 6px;
    border-radius: 0 0 0 7px;
    border-left: 1px solid #c5c8c6;
    border-bottom: 1px solid #c5c8c6;
    color: #fff;
  }

  .hljs-title,
  .hljs-name {
    color: #f0c674;
  }

  .hljs-comment {
    color: #707880;
  }

  .hljs-meta,
  .hljs-meta .hljs-keyword {
    color: #f0c674;
  }

  .hljs-number,
  .hljs-symbol,
  .hljs-literal,
  .hljs-deletion,
  .hljs-link {
    color: #cc6666
  }

  .hljs-string,
  .hljs-doctag,
  .hljs-addition,
  .hljs-regexp,
  .hljs-selector-attr,
  .hljs-selector-pseudo {
    color: #b5bd68;
  }

  .hljs-attribute,
  .hljs-code,
  .hljs-selector-id {
    color: #b294bb;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-bullet,
  .hljs-tag {
    color: #81a2be;
  }

  .hljs-subst,
  .hljs-variable,
  .hljs-template-tag,
  .hljs-template-variable {
    color: #8abeb7;
  }

  .hljs-type,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-quote,
  .hljs-section,
  .hljs-selector-class {
    color: #de935f;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  @media (min-width: 768px) {
    code[data-filename] {
      padding-top: 1rem;
    }

    code[data-filename]:before {
      font-size: inherit;
      opacity: 0.5;
      transition: opacity .5s;
    }

    code[data-filename]:hover:before {
      opacity: 1;
    }
  }
`,xr=S`
  /* other alert styles is in md.js */

  .alert-warning {
    border-left-color: #856404;
    background-color: #fff3cd;
  }

  .alert-warning:before {
    background: #856404;
    content: 'w';
  }
`,it="/v6/media/why-casl-v1";class zt extends ${disconnectedCallback(){this._close(),super.disconnectedCallback()}_show(){if(this._isOpen)return;const e=this.shadowRoot.querySelector("dialog"),t=this.shadowRoot.querySelector("video");this._previousOverflow=document.body.style.overflow,this._previousPadding=document.body.style.paddingRight;const i=window.innerWidth-document.documentElement.clientWidth;i&&(document.body.style.paddingRight=`${parseFloat(getComputedStyle(document.body).paddingRight)+i}px`),document.body.style.overflow="hidden",this._isOpen=!0,this.shadowRoot.querySelector('[role="status"]').hidden=!0,t.poster=`${it}.webp`,t.src=`${it}.mp4`,e.showModal(),this.shadowRoot.querySelector(".close").focus(),t.play().catch(()=>{})}_close(){if(!this._isOpen)return;const e=this.shadowRoot.querySelector("video");e.pause(),this._isOpen=!1,e.currentTime=0,e.removeAttribute("src"),e.removeAttribute("poster"),e.load(),this.shadowRoot.querySelector("dialog").close(),document.body.style.overflow=this._previousOverflow,document.body.style.paddingRight=this._previousPadding,this.isConnected&&this.shadowRoot.querySelector(".trigger").focus()}_cancel(e){e.preventDefault(),this._close()}_backdrop(e){if(e.target!==e.currentTarget)return;const t=e.currentTarget.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&this._close()}render(){return m`
      <button class="btn trigger" type="button" aria-haspopup="dialog" @click="${this._show}">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
          fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
          <rect x="3" y="6" width="12" height="12" rx="2" />
          <path d="m15 10 6-4v12l-6-4z" />
        </svg>
        ${v("video.title")}
      </button>
      <dialog aria-labelledby="video-title" @cancel="${this._cancel}" @click="${this._backdrop}">
        <header>
          <h2 id="video-title">${v("video.title")}</h2>
          <button class="close" type="button" @click="${this._close}">${v("video.close")} ×</button>
        </header>
        <video controls playsinline preload="none" aria-label="${v("video.title")}"
          @error="${()=>{this.shadowRoot.querySelector('[role="status"]').hidden=!1}}">
          ${v("video.unsupported")}
        </video>
        <footer>
          <span role="status" hidden>${v("video.error")}</span>
          <a href="${it}.mp4" target="_blank" rel="noopener">${v("video.fallback")}</a>
        </footer>
      </dialog>
    `}}_(zt,"cName","why-casl-video");zt.styles=[Bn,S`
  :host { display: inline-block; }
  button { font: inherit; cursor: pointer; }
  .trigger { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; }
  svg { flex-shrink: 0; }
  button:focus-visible, a:focus-visible { outline: 3px solid #81a2be; outline-offset: 3px; }
  dialog {
    box-sizing: border-box;
    width: min(1100px, calc(100vw - 24px), calc((100dvh - 140px) * 16 / 9));
    max-width: calc(100vw - 24px);
    max-height: calc(100dvh - 24px);
    padding: 0;
    border: 1px solid #546474;
    border-radius: 12px;
    background: #131c26;
    color: #fff;
    box-shadow: 0 16px 64px #0008;
  }
  dialog::backdrop { background: #080e16d9; }
  header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; gap: 16px; }
  h2 { margin: 0; font-size: 1.1rem; }
  .close { border: 1px solid #81a2be; border-radius: 6px; padding: 6px 10px; background: transparent; color: inherit; }
  video { display: block; width: 100%; aspect-ratio: 16 / 9; background: #000; }
  footer { padding: 12px 16px; font-size: .85rem; }
  a { color: #badbf6; }
  [role="status"] { margin-right: 8px; }
`];class Hn extends ${constructor(){super(),this._unwatchLang=null,this._locale=be()}connectedCallback(){super.connectedCallback(),this._unwatchLang=zn(e=>{this._locale=e,this.reload().then(()=>this.requestUpdate())})}disconnectedCallback(){this._unwatchLang(),super.disconnectedCallback()}reload(){return Promise.reject(new Error(`${this.constructor.cName} should implement "reload" method`))}}class Te extends Hn{constructor(){super(),this._rebacApproach="denormalized"}reload(){return Promise.resolve()}async _getUpdateComplete(){const e=await super._getUpdateComplete();return await this.shadowRoot.querySelector("authorization-timeline").updateComplete,e}render(){return m`
      <div class="md">
        <authorization-timeline .label="${v("consulting.evolution.modelsLabel")}">
          ${["claims","actions","rbac","abac","rebac"].map(e=>{const t=e==="rebac"?`consulting.evolution.rebac.${this._rebacApproach}`:`consulting.evolution.${e}`;return m`
            <section data-stage="${e}" data-title="${v(`consulting.evolution.${e}.title`)}">
              <div class="stage-layout">
                <div class="stage-copy">
                  <div class="stage-heading">
                    <span class="eyebrow">${v(`consulting.evolution.${e}.eyebrow`)}</span>
                    <h3>${v(`consulting.evolution.${e}.title`)}</h3>
                  </div>
                  <p>${v(`consulting.evolution.${e}.description`)}</p>
                  ${e==="rebac"?m`
                    <div class="rebac-approaches" role="radiogroup"
                      aria-label="${v("consulting.evolution.rebac.approachesLabel")}">
                      ${["denormalized","sql"].map(i=>m`
                        <label>
                          <input type="radio" name="rebac-approach" value="${i}"
                            .checked="${this._rebacApproach===i}"
                            aria-controls="rebac-example"
                            @change="${()=>{this._rebacApproach=i}}">
                          <span>${v(`consulting.evolution.rebac.${i}.label`)}</span>
                        </label>
                      `)}
                    </div>
                  `:""}
                  <div class="stage-detail">${G(`${t}.detail`)}</div>
                </div>
                <div class="stage-code" role="region" tabindex="0"
                  id="${e}-example"
                  aria-label="${v(`consulting.evolution.${e}.title`)} — ${v("consulting.evolution.codeLabel")}">
                  ${G(`${t}.example`)}
                </div>
              </div>
            </section>
          `})}
        </authorization-timeline>
      </div>
    `}}_(Te,"cName","authorization-examples"),_(Te,"properties",{_rebacApproach:{type:String}});Te.styles=[Ye,Rt,S`
  :host { display: block; min-width: 0; }
  * { box-sizing: border-box; }
  p { line-height: 1.6; }
  .md h3::before { content: none; }
  .eyebrow { display: block; font-size: .7rem; font-weight: 700; letter-spacing: .1em; color: #526575; }
  .stage-heading h3 { font-size: 1.5rem; font-weight: 600; margin: 0; cursor: auto; }
  .stage-heading .eyebrow { margin: 0 0 6px; }
  .stage-layout { display: grid; gap: 20px; align-items: start; }
  .stage-copy, .stage-code { min-width: 0; }
  .stage-copy > p { margin: 12px 0 0; }
  .stage-copy .stage-detail { color: #435764; font-size: .9rem; margin-top: 18px; }
  .stage-detail p { margin: 0; }
  .md .stage-detail app-link { color: #175d82; }
  .rebac-approaches { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 16px; padding: 4px; border: 1px solid #cbd8e1; border-radius: 8px; }
  .rebac-approaches label { position: relative; flex: 1; cursor: pointer; }
  .rebac-approaches input { position: absolute; opacity: 0; width: 1px; height: 1px; }
  .rebac-approaches span { display: block; padding: 8px 6px; border-radius: 5px; color: #435764; font-size: .85rem; font-weight: 600; text-align: center; }
  .rebac-approaches input:checked + span { background: #175d82; color: #fff; }
  .rebac-approaches input:focus-visible + span { outline: 3px solid #175d82; outline-offset: 2px; }
  .rebac-approaches label:hover span { box-shadow: inset 0 0 0 1px #175d82; }
  .stage-code {
    overflow-x: auto;
    background: #1d1f21;
    border-radius: 7px;
    padding: 18px;
  }
  .stage-code:focus-visible { outline: 3px solid #175d82; outline-offset: 3px; }
  .stage-code pre { overflow: visible; margin: 0; }
  .stage-code .hljs {
    overflow: visible;
    box-shadow: none;
    padding: 0;
    font-size: .8rem;
    line-height: 1.65;
    white-space: pre;
    overflow-wrap: normal;
    min-height: 18.15em;
  }
  .hljs-comment { color: #9aa6b2; }
  @media (min-width: 768px) {
    .stage-layout { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); gap: 28px; }
    .stage-code { padding: 20px; }
    .stage-heading .eyebrow { margin-bottom: 8px; }
  }
`];class Fe extends ${constructor(){super(),this.label="",this._selected=0,this._stages=[]}firstUpdated(){this._readStages()}_readStages(){this._stages=Array.from(this.querySelectorAll(":scope > section")),this._select(Math.min(this._selected,Math.max(0,this._stages.length-1)))}_select(e,t=!1){this._selected=e,this._stages.forEach((i,r)=>{i.toggleAttribute("data-active",r===e),i.hidden=r!==e,i.inert=r!==e,i.setAttribute("aria-hidden",String(r!==e))}),t&&this.updateComplete.then(()=>this.shadowRoot.getElementById(`stage-${e}`)?.focus())}_activateStage(e,t=!1){this._select(e,t)}_onKeydown(e){if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;e.preventDefault();let i=this._selected;e.key==="ArrowRight"&&(i=(i+1)%this._stages.length),e.key==="ArrowLeft"&&(i=(i-1+this._stages.length)%this._stages.length),e.key==="Home"&&(i=0),e.key==="End"&&(i=this._stages.length-1),this._activateStage(i,!0)}render(){return m`
      <div role="tablist" aria-label="${this.label}" @keydown="${this._onKeydown}">
        ${this._stages.map((e,t)=>m`
          <button type="button" role="tab" id="stage-${t}"
            aria-selected="${this._selected===t}" aria-controls="stage-panel"
            tabindex="${this._selected===t?0:-1}"
            @click="${()=>this._activateStage(t)}">
            <span class="number" aria-hidden="true">0${t+1}</span>
            <span>${e.dataset.title}</span>
          </button>
        `)}
      </div>
      <div id="stage-panel" role="tabpanel" tabindex="0" aria-labelledby="stage-${this._selected}">
        <slot @slotchange="${this._readStages}"></slot>
      </div>
    `}}_(Fe,"cName","authorization-timeline"),_(Fe,"properties",{label:{type:String},_selected:{type:Number},_stages:{type:Array}});Fe.styles=S`
  :host { display: block; min-width: 0; margin: 12px 0; }
  [role="tablist"] { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0; }
  button { position: relative; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 8px; background: transparent; border: 0; padding: 10px 1px 12px; color: #526575; font: inherit; font-size: clamp(.75rem, 2.7vw, .85rem); font-weight: 600; line-height: 1.3; cursor: pointer; }
  button > span:last-child { max-width: 100%; text-wrap: balance; }
  button::before { content: ''; position: absolute; top: 25px; left: 0; width: 100%; height: 2px; background: #becfd9; }
  button:first-child::before { left: 50%; width: 50%; }
  button:last-child::before { width: 50%; }
  .number { position: relative; z-index: 1; display: grid; place-items: center; width: 30px; height: 30px; border: 2px solid #becfd9; border-radius: 50%; background: #fff; color: #526575; font: 600 .75rem/1 monospace; }
  [aria-selected="true"] { color: #175d82; }
  [aria-selected="true"] .number { background: #175d82; border-color: #175d82; color: #fff; }
  button:hover .number { border-color: #175d82; }
  button:focus-visible, [role="tabpanel"]:focus-visible { outline: 3px solid #175d82; outline-offset: -3px; border-radius: 6px; }
  [role="tabpanel"] { background: #eff4f7; border: 1px solid #cbd8e1; border-radius: 10px; padding: 14px; }
  slot { display: grid; }
  ::slotted(section) {
    grid-area: 1 / 1;
    display: none;
    pointer-events: none;
    min-width: 0;
  }
  ::slotted(section[data-active]) {
    display: block;
    pointer-events: auto;
  }
  @media (min-width: 768px) {
    :host { min-width: auto; margin: 28px 0 16px; }
    button { min-width: auto; font-size: .95rem; gap: 10px; padding: 16px 4px 20px; }
    button > span:last-child { max-width: none; text-wrap: wrap; }
    .number { width: 36px; height: 36px; }
    button::before { top: 34px; }
    [role="tabpanel"] { padding: clamp(18px, 3vw, 32px); }
  }
`;const Mt="casl:analytics-consent",Wn=1,_r=180*24*60*60*1e3,wt=new Set;let dn=!1,R=null;function Kn(){try{const n=JSON.parse(localStorage.getItem(Mt)),e=Date.now()-n?.timestamp;return n?.version===Wn&&["accepted","rejected"].includes(n.choice)&&e>=0&&e<_r?n.choice:null}catch{return null}}let H=Kn();function kr(){return H}function Xn(){R||(window.caslAnalyticsBeforeSend=(n,e)=>H==="accepted"?e:!1,R=document.createElement("script"),R.src="https://cloud.umami.is/script.js",R.defer=!0,R.dataset.websiteId="a67936cd-6691-41c2-ac9d-ebcd54f50acc",R.dataset.beforeSend="caslAnalyticsBeforeSend",R.addEventListener("error",()=>{R.remove(),R=null},{once:!0}),document.head.appendChild(R))}function Gn(n){const e=H==="accepted"&&R;H=n,wt.forEach(t=>t(H)),H==="accepted"?Xn():e&&window.location.reload()}function Sr(){dn||(dn=!0,H==="accepted"&&Xn(),window.addEventListener("storage",n=>{(n.key===Mt||n.key===null)&&Gn(Kn())}))}function Ar(n){if(["accepted","rejected"].includes(n)){try{localStorage.setItem(Mt,JSON.stringify({version:Wn,choice:n,timestamp:Date.now()}))}catch{}Gn(n)}}function Er(n){return wt.add(n),()=>wt.delete(n)}function Cr(){window.dispatchEvent(new Event("analytics-preferences"))}function $r(n,e){H==="accepted"&&window.umami?.track(n,e)}class Ne extends ${constructor(){super(),this._open=kr()===null,this._show=()=>{for(this._returnFocus=document.activeElement;this._returnFocus?.shadowRoot?.activeElement;)this._returnFocus=this._returnFocus.shadowRoot.activeElement;this._open=!0,this.updateComplete.then(()=>this.shadowRoot.querySelector("button")?.focus())}}connectedCallback(){super.connectedCallback(),this._unobserve=Er(e=>{this._open=e===null}),window.addEventListener("analytics-preferences",this._show)}disconnectedCallback(){this._unobserve(),window.removeEventListener("analytics-preferences",this._show),super.disconnectedCallback()}_choose(e){Ar(e),this._returnFocus?.focus()}render(){return this._open?m`
      <section role="region" aria-labelledby="consent-title">
        <div>
          <h2 id="consent-title">${v("analyticsConsent.title")}</h2>
          <p>${v("analyticsConsent.description")} <app-link to="privacy">${v("menu.privacy")}</app-link></p>
        </div>
        <div class="actions">
          <button type="button" class="reject-btn" @click="${()=>this._choose("rejected")}">${v("analyticsConsent.reject")}</button>
          <button type="button" class="accept-btn" @click="${()=>this._choose("accepted")}">${v("analyticsConsent.accept")}</button>
        </div>
      </section>
    `:m``}}_(Ne,"cName","analytics-consent"),_(Ne,"properties",{_open:{state:!0}});Ne.styles=S`
  :host { position: fixed; bottom: 16px; left: 16px; right: 16px; z-index: 100; }
  section { display: flex; align-items: center; gap: 24px; max-width: 1000px; margin: auto; padding: 20px; border: 1px solid #bdccd6; border-radius: 12px; background: #fff; color: #202428; box-shadow: 0 4px 24px #0003; }
  h2 { font-size: 1.1rem; margin: 0 0 8px; }
  p { margin: 0; line-height: 1.5; }
  app-link { color: #175d82; text-decoration: underline; }
  .actions { display: flex; gap: 12px; flex-shrink: 0; }
  button {
    padding: 12px 16px;
    border: 1px solid #202428;
    border-radius: 6px;
    background-color: #202428;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
  .accept-btn:hover {
    background-color: #34383C;
  }
  .reject-btn {
    background-color: #fff;
    color: #202428;
  }
  .reject-btn:hover { background: #eff4f7; }
  button:focus-visible { outline: 3px solid #175d82; outline-offset: 3px; }

  @media (max-width: 767px) {
    section { flex-direction: column; align-items: stretch; gap: 16px; padding: 16px; max-height: calc(100dvh - 64px); overflow: auto; }
    .actions { flex-wrap: wrap; }
    button { flex: 1; }
  }
`;/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const un=new WeakMap,pn=ge(n=>e=>{if(!(e instanceof Q))throw new Error("cache can only be used in text bindings");let t=un.get(e);t===void 0&&(t=new WeakMap,un.set(e,t));const i=e.value;if(i instanceof Se)if(n instanceof Ae&&i.template===e.options.templateFactory(n)){e.setValue(n);return}else{let r=t.get(i.template);r===void 0&&(r={instance:i,nodes:document.createDocumentFragment()},t.set(i.template,r)),ki(r.nodes,e.startNode.nextSibling,e.endNode)}if(n instanceof Ae){const r=e.options.templateFactory(n),s=t.get(r);s!==void 0&&(e.setValue(s.nodes),e.commit(),e.value=s.instance)}e.setValue(n)});var Tr=[{name:"learn",route:!1,children:[{heading:"docs"},{name:"guide",page:"guide/intro"},{name:"api"},{name:"examples",url:"https://github.com/stalniy/casl-examples"},{name:"cookbook",page:"cookbook/intro"}]},{name:"ecosystem",route:!1,children:[{heading:"packages"},{name:"pkg-prisma",page:"package/casl-prisma"},{name:"pkg-mongoose",page:"package/casl-mongoose"},{name:"pkg-angular",page:"package/casl-angular"},{name:"pkg-react",page:"package/casl-react"},{name:"pkg-vue",page:"package/casl-vue"},{name:"pkg-aurelia",page:"package/casl-aurelia"},{heading:"help"},{name:"questions",url:"https://stackoverflow.com/questions/tagged/casl"},{name:"chat",url:"https://github.com/stalniy/casl/discussions"},{heading:"news"},{name:"tweeter",url:"https://x.com/sergiy_stotskiy"},{name:"blog",url:"https://sstotskiy.medium.com"}]},{name:"consulting",url:"https://casl.js.org/en/consulting",rel:"noopener noreferrer"},{name:"about",route:!1,children:[{name:"privacy",url:"https://casl.js.org/en/privacy",rel:"noopener noreferrer"}]},{name:"support",route:!1,children:[{name:"support-casl"},{name:"support-ukraine",url:"https://prytulafoundation.org/en/home/support_page",rel:"noopener noreferrer"}]}],Fr=[{icon:"github",label:"GitHub",url:"https://github.com/stalniy/casl"},{icon:"x",label:"X",url:"https://x.com/sergiy_stotskiy"},{icon:"medium",label:"Medium",url:"https://sstotskiy.medium.com"}];const xt={items:Tr,social:Fr};var Nr=function(n,e){return n.methods.pathname(e)};function Or(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var ie={exports:{}};ie.exports=ti;ie.exports.parse=Vt;ie.exports.compile=jr;ie.exports.tokensToFunction=Zn;ie.exports.tokensToRegExp=ei;var Qn="/",Yn="./",Ir=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function Vt(n,e){for(var t=[],i=0,r=0,s="",a=e&&e.delimiter||Qn,l=e&&e.delimiters||Yn,o=!1,c;(c=Ir.exec(n))!==null;){var u=c[0],d=c[1],p=c.index;if(s+=n.slice(r,p),r=p+u.length,d){s+=d[1],o=!0;continue}var f="",g=n[r],h=c[2],k=c[3],w=c[4],b=c[5];if(!o&&s.length){var y=s.length-1;l.indexOf(s[y])>-1&&(f=s[y],s=s.slice(0,y))}s&&(t.push(s),s="",o=!1);var A=f!==""&&g!==void 0&&g!==f,E=b==="+"||b==="*",P=b==="?"||b==="*",L=f||a,W=k||w;t.push({name:h||i++,prefix:f,delimiter:L,optional:P,repeat:E,partial:A,pattern:W?Pr(W):"[^"+U(L)+"]+?"})}return(s||r<n.length)&&t.push(s+n.substr(r)),t}function jr(n,e){return Zn(Vt(n,e))}function Zn(n){for(var e=new Array(n.length),t=0;t<n.length;t++)typeof n[t]=="object"&&(e[t]=new RegExp("^(?:"+n[t].pattern+")$"));return function(i,r){for(var s="",a=r&&r.encode||encodeURIComponent,l=0;l<n.length;l++){var o=n[l];if(typeof o=="string"){s+=o;continue}var c=i?i[o.name]:void 0,u;if(Array.isArray(c)){if(!o.repeat)throw new TypeError('Expected "'+o.name+'" to not repeat, but got array');if(c.length===0){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to not be empty')}for(var d=0;d<c.length;d++){if(u=a(c[d],o),!e[l].test(u))throw new TypeError('Expected all "'+o.name+'" to match "'+o.pattern+'"');s+=(d===0?o.prefix:o.delimiter)+u}continue}if(typeof c=="string"||typeof c=="number"||typeof c=="boolean"){if(u=a(String(c),o),!e[l].test(u))throw new TypeError('Expected "'+o.name+'" to match "'+o.pattern+'", but got "'+u+'"');s+=o.prefix+u;continue}if(o.optional){o.partial&&(s+=o.prefix);continue}throw new TypeError('Expected "'+o.name+'" to be '+(o.repeat?"an array":"a string"))}return s}}function U(n){return n.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Pr(n){return n.replace(/([=!:$/()])/g,"\\$1")}function Jn(n){return n&&n.sensitive?"":"i"}function Lr(n,e){if(!e)return n;var t=n.source.match(/\((?!\?)/g);if(t)for(var i=0;i<t.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return n}function Rr(n,e,t){for(var i=[],r=0;r<n.length;r++)i.push(ti(n[r],e,t).source);return new RegExp("(?:"+i.join("|")+")",Jn(t))}function zr(n,e,t){return ei(Vt(n,t),e,t)}function ei(n,e,t){t=t||{};for(var i=t.strict,r=t.start!==!1,s=t.end!==!1,a=U(t.delimiter||Qn),l=t.delimiters||Yn,o=[].concat(t.endsWith||[]).map(U).concat("$").join("|"),c=r?"^":"",u=n.length===0,d=0;d<n.length;d++){var p=n[d];if(typeof p=="string")c+=U(p),u=d===n.length-1&&l.indexOf(p[p.length-1])>-1;else{var f=p.repeat?"(?:"+p.pattern+")(?:"+U(p.delimiter)+"(?:"+p.pattern+"))*":p.pattern;e&&e.push(p),p.optional?p.partial?c+=U(p.prefix)+"("+f+")?":c+="(?:"+U(p.prefix)+"("+f+"))?":c+=U(p.prefix)+"("+f+")"}}return s?(i||(c+="(?:"+a+")?"),c+=o==="$"?"$":"(?="+o+")"):(i||(c+="(?:"+a+"(?="+o+"))?"),u||(c+="(?="+a+"|"+o+")")),new RegExp(c,Jn(t))}function ti(n,e,t){return n instanceof RegExp?Lr(n,e):Array.isArray(n)?Rr(n,e,t):zr(n,e,t)}var Mr=ie.exports;const hn=Or(Mr);var Vr=function(n){return typeof n.methods.resolve<"u"},_t=function(n){return"externalURL"in n},Dr=function(n,e){if(_t(n))return n;var t=n.name,i=n.params,r=n.query,s=n.hash,a=n.state,l="url"in n?n.url:e.url({name:t,params:i,query:r,hash:s});return{name:t,params:i,query:r,hash:s,state:a,url:l}},qr=function(n,e,t,i,r){var s=t||{},a=s.resolved,l=a===void 0?null:a,o=s.error,c=o===void 0?null:o,u={data:void 0,body:void 0,meta:void 0};for(var d in e)u[d]=e[d];if(!n.methods.respond)return u;var p=n.methods.respond({resolved:l,error:c,match:e,external:r});return p&&(u.meta=p.meta,u.body=p.body,u.data=p.data,p.redirect&&(u.redirect=Dr(p.redirect,i))),u},Ur=function(n,e,t){var i,r;t===void 0&&(t={});var s=(i=t.history,i===void 0?{}:i),a=t.sideEffects,l=t.external,o=(r=t.invisibleRedirects,r===void 0?!1:r),c,u,d,p,f,g=[],h=[],k=[],w,b,y=function(){w=void 0,b=void 0},A=function(){w&&w(),y()},E=function(){b&&b(),y()},P=function(x,C){return w=x,b=C,y},L=function(){f&&(f=void 0,g.forEach(function(x){x()}))},W=function(x){h.forEach(function(C){C(x)})},Y=function(x){k.splice(0).forEach(function(C){C(x)}),a&&a.forEach(function(C){C(x)})},ye=function(x,C){if(!x.redirect||!o||_t(x.redirect)){d=x,p=C;var F={response:x,navigation:C,router:u};W(F),Y(F)}x.redirect!==void 0&&!_t(x.redirect)&&c.navigate(x.redirect,"replace")},we=function(x,C,F,j,V){L(),F.finish();var M=qr(x,C,V,u,l);E(),ye(M,j)},wi=function(){g.length&&f===void 0&&(f=function(){c.cancel(),L(),A()},g.forEach(function(x){x(f)}))};return c=n(function(x){var C={action:x.action,previous:d},F=e.match(x.location);if(!F){x.finish(),E();return}var j=F.route,V=F.match;Vr(j)?(wi(),j.methods.resolve(V,l).then(function(M){return{resolved:M,error:null}},function(M){return{error:M,resolved:null}}).then(function(M){x.cancelled||we(j,V,x,C,M)})):we(j,V,x,C,null)},s),u={route:e.route,history:c,external:l,observe:function(x,C){var F,j=(F=(C||{}).initial,F===void 0?!0:F);return h.push(x),d&&j&&x({response:d,navigation:p,router:u}),function(){h=h.filter(function(V){return V!==x})}},once:function(x,C){var F,j=(F=(C||{}).initial,F===void 0?!0:F);d&&j?x({response:d,navigation:p,router:u}):k.push(x)},cancel:function(x){return g.push(x),function(){g=g.filter(function(C){return C!==x})}},url:function(x){var C=x.name,F=x.params,j=x.hash,V=x.query,M;if(C){var Zt=u.route(C);Zt&&(M=Nr(Zt,F))}return c.url({pathname:M,hash:j,query:V})},navigate:function(x){A();var C=x.url,F=x.state,j=x.method;if(c.navigate({url:C,state:F},j),x.cancelled||x.finished)return P(x.cancelled,x.finished)},current:function(){return{response:d,navigation:p}},destroy:function(){c.destroy()}},c.current(),u},kt=function(n){return n.charAt(0)==="/"?n:"/"+n},Br=function(n){return n.charAt(n.length-1)==="/"?n:n+"/"},Hr=function(n,e){return Br(n)+e},ni=function(n,e,t){t===void 0&&(t={path:"",keys:[]});var i=kt(Hr(t.path,n.path)),r=n.pathOptions||{},s=r.match,a=s===void 0?{}:s,l=r.compile,o=l===void 0?{}:l,c=a.end==null||a.end;n.children&&n.children.length&&(a.end=!1);var u=[],d=hn(kt(n.path),u,a),p=u.map(function(E){return E.name});t.keys.length&&(p=t.keys.concat(p));var f=[],g=[];if(n.children)for(var h=0,k=n.children;h<k.length;h++){var w=k[h],b=ni(w,e,{path:i,keys:p});f.push(b),g.push(b.public)}var y=hn.compile(i),A={public:{name:n.name,keys:p,parent:void 0,children:g,methods:{resolve:n.resolve,respond:n.respond,pathname:function(E){return y(E,o)}},extra:n.extra},matching:{re:d,keys:u,exact:c,parsers:n.params||{},children:f}};return e[n.name]=A.public,f.length&&f.forEach(function(E){E.public.parent=A.public}),A},ii=function(n,e){var t=n.matching,i=t.re,r=t.children,s=t.exact,a=i.exec(e);if(!a)return[];var l=a[0],o=a.slice(1),c=[{route:n,parsed:o}],u=e.slice(l.length);if(!r.length||u==="")return c;for(var d=kt(u),p=0,f=r;p<f.length;p++){var g=f[p],h=ii(g,d);if(h.length)return c.concat(h)}return s?[]:c},Wr=function(n,e){for(var t=n[n.length-1].route.public,i={},r=0,s=n;r<s.length;r++)for(var a=s[r],l=a.route,o=a.parsed,c=l.matching,u=c.keys,d=c.parsers,p=0,f=o.length;p<f;p++){var g=u[p].name,h=d[g]||decodeURIComponent;o[p]!==void 0&&(i[g]=h(o[p]))}return{route:t,match:{location:e,name:t.name,params:i}}},Kr=function(n){var e={},t=n.map(function(i){return ni(i,e)});return{match:function(i){for(var r=0,s=t;r<s.length;r++){var a=s[r],l=ii(a,i.pathname);if(l.length)return Wr(l,i)}},route:function(i){return e[i]}}};function fn(n,e){return n?n.indexOf(e)===0?n:e+n:""}function Xr(n){return n||""}function Gr(n){return n||""}function Qr(n){n===void 0&&(n={});var e=n.query,t=e===void 0?{}:e,i=t.parse,r=i===void 0?Xr:i,s=t.stringify,a=s===void 0?Gr:s,l=n.base;return{location:function(o,c){var u=o.url,d=o.state;if(u===""||u.charAt(0)==="#"){c||(c={pathname:"/",hash:"",query:r()});var p={pathname:c.pathname,hash:u.charAt(0)==="#"?u.substring(1):c.hash,query:c.query};return d&&(p.state=d),p}var f=u.indexOf("#"),g;f!==-1?(g=u.substring(f+1),u=u.substring(0,f)):g="";var h=u.indexOf("?"),k;h!==-1&&(k=u.substring(h+1),u=u.substring(0,h));var w=r(k),b=l?l.remove(u):u;b===""&&(b="/");var y={hash:g,query:w,pathname:b};return d&&(y.state=d),y},keyed:function(o,c){return o.key=c,o},stringify:function(o){if(typeof o=="string"){var c=o.charAt(0);return c==="#"||c==="?"?o:l?l.add(o):o}var u=o.pathname!==void 0?l?l.add(o.pathname):o.pathname:"";return u+fn(a(o.query),"?")+fn(o.hash,"#")}}}function Yr(){var n=0;return{major:function(e){return e&&(n=e[0]+1),[n++,0]},minor:function(e){return[e[0],e[1]+1]}}}function Zr(n){var e=n.responseHandler,t=n.utils,i=n.keygen,r=n.current,s=n.push,a=n.replace,l;function o(g,h,k,w){var b={location:g,action:h,finish:function(){l===b&&(k(),l=void 0)},cancel:function(y){l===b&&(w(y),b.cancelled=!0,l=void 0)},cancelled:!1};return b}function c(g){l=g,e(g)}function u(g){l&&(l.cancel(g),l=void 0)}function d(g,h){var k=r(),w=t.location(g,k);switch(h){case"anchor":return t.stringify(w)===t.stringify(k)?p(w):f(w);case"push":return f(w);case"replace":return p(w);default:throw new Error("Invalid navigation type: "+h)}}function p(g){var h=t.keyed(g,i.minor(r().key));return o(h,"replace",a.finish(h),a.cancel)}function f(g){var h=t.keyed(g,i.major(r().key));return o(h,"push",s.finish(h),s.cancel)}return{prepare:d,emitNavigation:c,createNavigation:o,cancelPending:u}}function Jr(){}function es(){var n;return{confirmNavigation:function(e,t,i){n?n(e,t,i||Jr):t()},confirm:function(e){n=e||null}}}function ts(n,e){return new RegExp("^"+e+"(\\/|\\?|#|$)","i").test(n)}function ns(n,e){if(n.charAt(0)!=="/"||n.charAt(n.length-1)==="/")throw new Error('The base segment "'+n+'" is not valid. The "base" option must begin with a forward slash and end with a non-forward slash character.');var t={},i=t.emptyRoot,r=i===void 0?!1:i,s=t.strict,a=s===void 0?!1:s;return{add:function(l){if(r){if(l==="/")return n;if(l.startsWith("/?")||l.startsWith("/#"))return""+n+l.substr(1)}else if(l.charAt(0)==="?"||l.charAt(0)==="#")return l;return""+n+l},remove:function(l){if(l==="")return"";var o=ts(l,n);if(!o){if(a)throw new Error('Expected a string that begins with "'+n+'", but received "'+l+'".');return l}if(l===n){if(a&&!r)throw new Error('Received string "'+n+'", which is the same as the base, but "emptyRoot" is not true.');return"/"}return l.substr(n.length)}}}function is(){return!!(window&&window.location)}function rs(n){return n.state===void 0&&navigator.userAgent.indexOf("CriOS")===-1}function mn(){try{return window.history.state||{}}catch{return{}}}function re(){}function ss(n,e){if(e===void 0&&(e={}),!is())throw new Error("Cannot use @hickory/browser without a DOM");var t=Qr(e),i=Yr(),r=es(),s=r.confirm,a=r.confirmNavigation;function l(b){var y=window.location,A=y.pathname,E=y.search,P=y.hash,L=A+E+P,W=b||mn(),Y=W.key,ye=W.state;Y||(Y=i.major(),window.history.replaceState({key:Y,state:ye},"",L));var we=t.location({url:L,state:ye});return t.keyed(we,Y)}function o(b){return t.stringify(b)}var c=mn().key!==void 0?"pop":"push",u=Zr({responseHandler:n,utils:t,keygen:i,current:function(){return w.location},push:{finish:function(b){return function(){var y=o(b),A=b.key,E=b.state;try{window.history.pushState({key:A,state:E},"",y)}catch{window.location.assign(y)}w.location=b,c="push"}},cancel:re},replace:{finish:function(b){return function(){var y=o(b),A=b.key,E=b.state;try{window.history.replaceState({key:A,state:E},"",y)}catch{window.location.replace(y)}w.location=b,c="replace"}},cancel:re}}),d=u.emitNavigation,p=u.cancelPending,f=u.createNavigation,g=u.prepare,h=!1;function k(b){if(h){h=!1;return}if(!rs(b)){p("pop");var y=l(b.state),A=w.location.key[0]-y.key[0],E=function(){h=!0,window.history.go(A)};a({to:y,from:w.location,action:"pop"},function(){d(f(y,"pop",function(){w.location=y,c="pop"},function(P){P!=="pop"&&E()}))},E)}}window.addEventListener("popstate",k,!1);var w={location:l(),current:function(){d(f(w.location,c,re,re))},url:o,navigate:function(b,y){y===void 0&&(y="anchor");var A=g(b,y);p(A.action),a({to:A.location,from:w.location,action:A.action},function(){d(A)})},go:function(b){window.history.go(b)},confirm:s,cancel:function(){p()},destroy:function(){window.removeEventListener("popstate",k),d=re}};return w}var os=[{name:"home",path:":lang",restrictions:{lang:"en"},controller:"Home",sitemap:{priority:1,changefreq:"yearly",provider:"langs"},children:[{name:"api",path:"api/:id?",restrictions:{id:"[\\w/-]+"},controller:"Page",meta:{categories:["api"],ignoreIdPrefix:!0},sitemap:{priority:.7,changefreq:"monthly",provider:"pages"}},{name:"support-casl",path:"support-casljs",controller:"Page",sitemap:{priority:1,changefreq:"yearly",provider:"route"}},{name:"privacy",path:"privacy",controller:"Page",sitemap:{priority:.3,changefreq:"yearly",provider:"route"}},{name:"page",path:":id",restrictions:{id:"[\\w/-]+"},controller:"Page",meta:{encode:!1,categories:["guide","advanced","package","cookbook"]},sitemap:{priority:1,changefreq:"monthly",provider:"pages"}}]}];const as={routes:os};/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var T=function(){return T=Object.assign||function(e){for(var t,i=1,r=arguments.length;i<r;i++){t=arguments[i];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},T.apply(this,arguments)};function gn(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function N(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(l){a={error:l}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s}function vn(){for(var n=[],e=0;e<arguments.length;e++)n=n.concat(N(arguments[e]));return n}var ls="ENTRIES",ri="KEYS",si="VALUES",I="",rt=function(){function n(e,t){var i=e._tree,r=Object.keys(i);this.set=e,this._type=t,this._path=r.length>0?[{node:i,keys:r}]:[]}return n.prototype.next=function(){var e=this.dive();return this.backtrack(),e},n.prototype.dive=function(){if(this._path.length===0)return{done:!0,value:void 0};var e=q(this._path),t=e.node,i=e.keys;return q(i)===I?{done:!1,value:this.result()}:(this._path.push({node:t[q(i)],keys:Object.keys(t[q(i)])}),this.dive())},n.prototype.backtrack=function(){this._path.length!==0&&(q(this._path).keys.pop(),!(q(this._path).keys.length>0)&&(this._path.pop(),this.backtrack()))},n.prototype.key=function(){return this.set._prefix+this._path.map(function(e){var t=e.keys;return q(t)}).filter(function(e){return e!==I}).join("")},n.prototype.value=function(){return q(this._path).node[I]},n.prototype.result=function(){return this._type===si?this.value():this._type===ri?this.key():[this.key(),this.value()]},n.prototype[Symbol.iterator]=function(){return this},n}(),q=function(n){return n[n.length-1]},cs=0,ds=1,st=2,ot=3,us=function(n,e,t){for(var i=[{distance:0,i:0,key:"",node:n}],r={},s=[],a=function(){var l=i.pop(),o=l.node,c=l.distance,u=l.key,d=l.i,p=l.edit;Object.keys(o).forEach(function(f){if(f===I){var g=c+(e.length-d),h=N(r[u]||[null,1/0],2),k=h[1];g<=t&&g<k&&(r[u]=[o[f],g])}else ps(e,f,t-c,d,p,s).forEach(function(w){var b=w.distance,y=w.i,A=w.edit;i.push({node:o[f],distance:c+b,key:u+f,i:y,edit:A})})})};i.length>0;)a();return r},ps=function(n,e,t,i,r,s){s.push({distance:0,ia:i,ib:0,edit:r});for(var a=[];s.length>0;){var l=s.pop(),o=l.distance,c=l.ia,u=l.ib,d=l.edit;if(u===e.length){a.push({distance:o,i:c,edit:d});continue}if(n[c]===e[u])s.push({distance:o,ia:c+1,ib:u+1,edit:cs});else{if(o>=t)continue;d!==st&&s.push({distance:o+1,ia:c,ib:u+1,edit:ot}),c<n.length&&(d!==ot&&s.push({distance:o+1,ia:c+1,ib:u,edit:st}),d!==ot&&d!==st&&s.push({distance:o+1,ia:c+1,ib:u+1,edit:ds}))}}return a},at=function(){function n(e,t){e===void 0&&(e={}),t===void 0&&(t=""),this._tree=e,this._prefix=t}return n.prototype.atPrefix=function(e){var t;if(!e.startsWith(this._prefix))throw new Error("Mismatched prefix");var i=N(Oe(this._tree,e.slice(this._prefix.length)),2),r=i[0],s=i[1];if(r===void 0){var a=N(Dt(s),2),l=a[0],o=a[1],c=Object.keys(l).find(function(u){return u!==I&&u.startsWith(o)});if(c!==void 0)return new n((t={},t[c.slice(o.length)]=l[c],t),e)}return new n(r||{},e)},n.prototype.clear=function(){delete this._size,this._tree={}},n.prototype.delete=function(e){return delete this._size,hs(this._tree,e)},n.prototype.entries=function(){return new rt(this,ls)},n.prototype.forEach=function(e){var t,i;try{for(var r=gn(this),s=r.next();!s.done;s=r.next()){var a=N(s.value,2),l=a[0],o=a[1];e(l,o,this)}}catch(c){t={error:c}}finally{try{s&&!s.done&&(i=r.return)&&i.call(r)}finally{if(t)throw t.error}}},n.prototype.fuzzyGet=function(e,t){return us(this._tree,e,t)},n.prototype.get=function(e){var t=St(this._tree,e);return t!==void 0?t[I]:void 0},n.prototype.has=function(e){var t=St(this._tree,e);return t!==void 0&&t.hasOwnProperty(I)},n.prototype.keys=function(){return new rt(this,ri)},n.prototype.set=function(e,t){if(typeof e!="string")throw new Error("key must be a string");delete this._size;var i=Ie(this._tree,e);return i[I]=t,this},Object.defineProperty(n.prototype,"size",{get:function(){var e=this;return this._size?this._size:(this._size=0,this.forEach(function(){e._size+=1}),this._size)},enumerable:!1,configurable:!0}),n.prototype.update=function(e,t){if(typeof e!="string")throw new Error("key must be a string");delete this._size;var i=Ie(this._tree,e);return i[I]=t(i[I]),this},n.prototype.values=function(){return new rt(this,si)},n.prototype[Symbol.iterator]=function(){return this.entries()},n.from=function(e){var t,i,r=new n;try{for(var s=gn(e),a=s.next();!a.done;a=s.next()){var l=N(a.value,2),o=l[0],c=l[1];r.set(o,c)}}catch(u){t={error:u}}finally{try{a&&!a.done&&(i=s.return)&&i.call(s)}finally{if(t)throw t.error}}return r},n.fromObject=function(e){return n.from(Object.entries(e))},n}(),Oe=function(n,e,t){if(t===void 0&&(t=[]),e.length===0||n==null)return[n,t];var i=Object.keys(n).find(function(r){return r!==I&&e.startsWith(r)});return i===void 0?(t.push([n,e]),Oe(void 0,"",t)):(t.push([n,i]),Oe(n[i],e.slice(i.length),t))},St=function(n,e){if(e.length===0||n==null)return n;var t=Object.keys(n).find(function(i){return i!==I&&e.startsWith(i)});if(t!==void 0)return St(n[t],e.slice(t.length))},Ie=function(n,e){var t;if(e.length===0||n==null)return n;var i=Object.keys(n).find(function(a){return a!==I&&e.startsWith(a)});if(i===void 0){var r=Object.keys(n).find(function(a){return a!==I&&a.startsWith(e[0])});if(r===void 0)n[e]={};else{var s=oi(e,r);return n[s]=(t={},t[r.slice(s.length)]=n[r],t),delete n[r],Ie(n[s],e.slice(s.length))}return n[e]}return Ie(n[i],e.slice(i.length))},oi=function(n,e,t,i,r){return t===void 0&&(t=0),i===void 0&&(i=Math.min(n.length,e.length)),r===void 0&&(r=""),t>=i||n[t]!==e[t]?r:oi(n,e,t+1,i,r+n[t])},hs=function(n,e){var t=N(Oe(n,e),2),i=t[0],r=t[1];if(i!==void 0){delete i[I];var s=Object.keys(i);s.length===0&&ai(r),s.length===1&&fs(r,s[0],i[s[0]])}},ai=function(n){if(n.length!==0){var e=N(Dt(n),2),t=e[0],i=e[1];delete t[i],Object.keys(t).length===0&&ai(n.slice(0,-1))}},fs=function(n,e,t){if(n.length!==0){var i=N(Dt(n),2),r=i[0],s=i[1];r[s+e]=t,delete r[s]}},Dt=function(n){return n[n.length-1]},xe,je="or",ms="and",gs=function(){function n(e){if(e?.fields==null)throw new Error('MiniSearch: option "fields" must be provided');this._options=T(T(T({},ct),e),{searchOptions:T(T({},yn),e.searchOptions||{})}),this._index=new at,this._documentCount=0,this._documentIds={},this._fieldIds={},this._fieldLength={},this._averageFieldLength={},this._nextId=0,this._storedFields={},this.addFields(this._options.fields)}return n.prototype.add=function(e){var t=this,i=this._options,r=i.extractField,s=i.tokenize,a=i.processTerm,l=i.fields,o=i.idField,c=r(e,o);if(c==null)throw new Error('MiniSearch: document does not have ID field "'+o+'"');var u=this.addDocumentId(c);this.saveStoredFields(u,e),l.forEach(function(d){var p=r(e,d);if(p!=null){var f=s(p.toString(),d);t.addFieldLength(u,t._fieldIds[d],t.documentCount-1,f.length),f.forEach(function(g){var h=a(g,d);h&&t.addTerm(t._fieldIds[d],u,h)})}})},n.prototype.addAll=function(e){var t=this;e.forEach(function(i){return t.add(i)})},n.prototype.addAllAsync=function(e,t){var i=this;t===void 0&&(t={});var r=t.chunkSize,s=r===void 0?10:r,a={chunk:[],promise:Promise.resolve()},l=e.reduce(function(u,d,p){var f=u.chunk,g=u.promise;return f.push(d),(p+1)%s===0?{chunk:[],promise:g.then(function(){return new Promise(function(h){return setTimeout(h,0)})}).then(function(){return i.addAll(f)})}:{chunk:f,promise:g}},a),o=l.chunk,c=l.promise;return c.then(function(){return i.addAll(o)})},n.prototype.remove=function(e){var t=this,i=this._options,r=i.tokenize,s=i.processTerm,a=i.extractField,l=i.fields,o=i.idField,c=a(e,o);if(c==null)throw new Error('MiniSearch: document does not have ID field "'+o+'"');var u=N(Object.entries(this._documentIds).find(function(p){var f=N(p,2);f[0];var g=f[1];return c===g})||[],1),d=u[0];if(d==null)throw new Error("MiniSearch: cannot remove document with ID "+c+": it is not in the index");l.forEach(function(p){var f=a(e,p);if(f!=null){var g=r(f.toString(),p);g.forEach(function(h){var k=s(h,p);k&&t.removeTerm(t._fieldIds[p],d,k)})}}),delete this._storedFields[d],delete this._documentIds[d],this._documentCount-=1},n.prototype.removeAll=function(e){var t=this;if(e)e.forEach(function(i){return t.remove(i)});else{if(arguments.length>0)throw new Error("Expected documents to be present. Omit the argument to remove all documents.");this._index=new at,this._documentCount=0,this._documentIds={},this._fieldLength={},this._averageFieldLength={},this._storedFields={},this._nextId=0}},n.prototype.search=function(e,t){var i=this;t===void 0&&(t={});var r=this._options,s=r.tokenize,a=r.processTerm,l=r.searchOptions,o=T(T({tokenize:s,processTerm:a},l),t),c=o.tokenize,u=o.processTerm,d=c(e).map(function(h){return u(h)}).filter(function(h){return!!h}),p=d.map(ys(o)),f=p.map(function(h){return i.executeQuery(h,o)}),g=this.combineResults(f,o.combineWith);return Object.entries(g).reduce(function(h,k){var w=N(k,2),b=w[0],y=w[1],A=y.score,E=y.match,P=y.terms,L={id:i._documentIds[b],terms:ws(P),score:A,match:E};return Object.assign(L,i._storedFields[b]),(o.filter==null||o.filter(L))&&h.push(L),h},[]).sort(function(h,k){var w=h.score,b=k.score;return w<b?1:-1})},n.prototype.autoSuggest=function(e,t){t===void 0&&(t={}),t=T(T({},xs),t);var i=this.search(e,t).reduce(function(r,s){var a=s.score,l=s.terms,o=l.join(" ");return r[o]==null?r[o]={score:a,terms:l,count:1}:(r[o].score+=a,r[o].count+=1),r},{});return Object.entries(i).map(function(r){var s=N(r,2),a=s[0],l=s[1],o=l.score,c=l.terms,u=l.count;return{suggestion:a,terms:c,score:o/u}}).sort(function(r,s){var a=r.score,l=s.score;return a<l?1:-1})},Object.defineProperty(n.prototype,"documentCount",{get:function(){return this._documentCount},enumerable:!1,configurable:!0}),n.loadJSON=function(e,t){if(t==null)throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return n.loadJS(JSON.parse(e),t)},n.getDefault=function(e){if(ct.hasOwnProperty(e))return lt(ct,e);throw new Error('MiniSearch: unknown option "'+e+'"')},n.loadJS=function(e,t){var i=e.index,r=e.documentCount,s=e.nextId,a=e.documentIds,l=e.fieldIds,o=e.fieldLength,c=e.averageFieldLength,u=e.storedFields,d=new n(t);return d._index=new at(i._tree,i._prefix),d._documentCount=r,d._nextId=s,d._documentIds=a,d._fieldIds=l,d._fieldLength=o,d._averageFieldLength=c,d._fieldIds=l,d._storedFields=u||{},d},n.prototype.executeQuery=function(e,t){var i=this,r=T(T({},this._options.searchOptions),t),s=(r.fields||this._options.fields).reduce(function(h,k){var w;return T(T({},h),(w={},w[k]=lt(h,k)||1,w))},r.boost||{}),a=r.boostDocument,l=r.weights,o=T(T({},yn.weights),l),c=o.fuzzy,u=o.prefix,d=this.termResults(e.term,s,a,this._index.get(e.term));if(!e.fuzzy&&!e.prefix)return d;var p=[d];if(e.prefix&&this._index.atPrefix(e.term).forEach(function(h,k){var w=.3*(h.length-e.term.length)/h.length;p.push(i.termResults(h,s,a,k,u,w))}),e.fuzzy){var f=e.fuzzy===!0?.2:e.fuzzy,g=f<1?Math.round(e.term.length*f):f;Object.entries(this._index.fuzzyGet(e.term,g)).forEach(function(h){var k=N(h,2),w=k[0],b=N(k[1],2),y=b[0],A=b[1],E=A/w.length;p.push(i.termResults(w,s,a,y,c,E))})}return p.reduce(bn[je],{})},n.prototype.combineResults=function(e,t){if(t===void 0&&(t=je),e.length===0)return{};var i=t.toLowerCase();return e.reduce(bn[i],null)||{}},n.prototype.toJSON=function(){return{index:this._index,documentCount:this._documentCount,nextId:this._nextId,documentIds:this._documentIds,fieldIds:this._fieldIds,fieldLength:this._fieldLength,averageFieldLength:this._averageFieldLength,storedFields:this._storedFields}},n.prototype.termResults=function(e,t,i,r,s,a){var l=this;return a===void 0&&(a=0),r==null?{}:Object.entries(t).reduce(function(o,c){var u=N(c,2),d=u[0],p=u[1],f=l._fieldIds[d],g=r[f]||{ds:{}},h=g.df,k=g.ds;return Object.entries(k).forEach(function(w){var b=N(w,2),y=b[0],A=b[1],E=i?i(l._documentIds[y],e):1;if(E){var P=l._fieldLength[y][f]/l._averageFieldLength[f];o[y]=o[y]||{score:0,match:{},terms:[]},o[y].terms.push(e),o[y].match[e]=lt(o[y].match,e)||[],o[y].score+=E*bs(A,h,l._documentCount,P,p,a),o[y].match[e].push(d)}}),o},{})},n.prototype.addTerm=function(e,t,i){this._index.update(i,function(r){var s;r=r||{};var a=r[e]||{df:0,ds:{}};return a.ds[t]==null&&(a.df+=1),a.ds[t]=(a.ds[t]||0)+1,T(T({},r),(s={},s[e]=a,s))})},n.prototype.removeTerm=function(e,t,i){var r=this;if(!this._index.has(i)){this.warnDocumentChanged(t,e,i);return}this._index.update(i,function(s){var a,l=s[e];if(l==null||l.ds[t]==null)return r.warnDocumentChanged(t,e,i),s;if(l.ds[t]<=1){if(l.df<=1)return delete s[e],s;l.df-=1}return l.ds[t]<=1?(delete l.ds[t],s):(l.ds[t]-=1,T(T({},s),(a={},a[e]=l,a)))}),Object.keys(this._index.get(i)).length===0&&this._index.delete(i)},n.prototype.warnDocumentChanged=function(e,t,i){if(!(console==null||console.warn==null)){var r=Object.entries(this._fieldIds).find(function(s){var a=N(s,2);a[0];var l=a[1];return l===t})[0];console.warn("MiniSearch: document with ID "+this._documentIds[e]+' has changed before removal: term "'+i+'" was not present in field "'+r+'". Removing a document after it has changed can corrupt the index!')}},n.prototype.addDocumentId=function(e){var t=this._nextId.toString(36);return this._documentIds[t]=e,this._documentCount+=1,this._nextId+=1,t},n.prototype.addFields=function(e){var t=this;e.forEach(function(i,r){t._fieldIds[i]=r})},n.prototype.addFieldLength=function(e,t,i,r){this._averageFieldLength[t]=this._averageFieldLength[t]||0;var s=this._averageFieldLength[t]*i+r;this._fieldLength[e]=this._fieldLength[e]||{},this._fieldLength[e][t]=r,this._averageFieldLength[t]=s/(i+1)},n.prototype.saveStoredFields=function(e,t){var i=this,r=this._options,s=r.storeFields,a=r.extractField;s==null||s.length===0||(this._storedFields[e]=this._storedFields[e]||{},s.forEach(function(l){var o=a(t,l);o!==void 0&&(i._storedFields[e][l]=o)}))},n}(),lt=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)?n[e]:void 0},bn=(xe={},xe[je]=function(n,e){return Object.entries(e).reduce(function(t,i){var r,s=N(i,2),a=s[0],l=s[1],o=l.score,c=l.match,u=l.terms;return t[a]==null?t[a]={score:o,match:c,terms:u}:(t[a].score+=o,t[a].score*=1.5,(r=t[a].terms).push.apply(r,vn(u)),Object.assign(t[a].match,c)),t},n||{})},xe[ms]=function(n,e){return n==null?e:Object.entries(e).reduce(function(t,i){var r=N(i,2),s=r[0],a=r[1],l=a.score,o=a.match,c=a.terms;return n[s]===void 0||(t[s]=t[s]||{},t[s].score=n[s].score+l,t[s].match=T(T({},n[s].match),o),t[s].terms=vn(n[s].terms,c)),t},{})},xe),vs=function(n,e,t){return n*Math.log(t/e)},bs=function(n,e,t,i,r,s){var a=r/(1+.333*r*s);return a*vs(n,e,t)/i},ys=function(n){return function(e,t,i){var r=typeof n.fuzzy=="function"?n.fuzzy(e,t,i):n.fuzzy||!1,s=typeof n.prefix=="function"?n.prefix(e,t,i):n.prefix===!0;return{term:e,fuzzy:r,prefix:s}}},ws=function(n){return n.filter(function(e,t,i){return i.indexOf(e)===t})},ct={idField:"id",extractField:function(n,e){return n[e]},tokenize:function(n,e){return n.split(_s)},processTerm:function(n,e){return n.toLowerCase()},fields:void 0,searchOptions:void 0,storeFields:[]},yn={combineWith:je,prefix:!1,fuzzy:!1,boost:{},weights:{fuzzy:.9,prefix:.75}},xs={prefix:function(n,e,t){return e===t.length-1}},_s=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;function ks(n){return Object.assign(new Error(n),{code:"NOT_FOUND"})}function Ss(n,e){switch(e){case"summary":return n.meta?n.meta.description:null;case"headings":return n[e].map(t=>t.title).join(" ");default:return n[e]}}const As={extractField:Ss,fields:["title","headings","summary"],searchOptions:{boost:{title:2}}};function Es(n){const e={};return n.terms.forEach(t=>{const i=new RegExp(`(${t})`,"gi");n.match[t].forEach(r=>{const s=n.doc[r];if(typeof s=="string")e[r]=s.replace(i,"<mark>$1</mark>");else if(r==="headings"){const a=s.reduce((l,o)=>(o.title.toLowerCase().includes(t)&&l.push({id:o.id,title:o.title.replace(i,"<mark>$1</mark>")}),l),[]);e[r]=a.length?a:null}})}),e}class Cs{constructor({pages:e,summaries:t,searchIndexes:i}){this._pages=e,this._summaries=t,this._searchIndexes=i,this._loadSearchIndex=ee(this._loadSearchIndex),this._getSummary=ee(this._getSummary),this._getItems=ee(this._getItems),this.byCategories=ee(this.byCategories),this.load=ee(this.load)}async load(e,t){const i=this._pages[e][t];if(!i)throw ks(`Page with ${t} is not found`);return(await ce(i)).body}async _getSummary(e){return(await ce(this._summaries[e])).body}async _getItems(e,t=null){const i=await this.byCategories(e,t);return Object.keys(i).reduce((r,s)=>r.concat(i[s]),[])}async getNearestFor(e,t,i=null){const r=await this._getItems(e,i),s=r.findIndex(o=>o.id===t);if(s===-1)return[];const a=s-1,l=s+1;return[a<0?void 0:r[a],l>=r.length?void 0:r[l]]}async byCategories(e,t=null){const{items:i}=await this._getSummary(e),r={};return i.forEach(s=>{s.categories.forEach(a=>{r[a]=r[a]||[],r[a].push(s)})}),Array.isArray(t)?t.reduce((s,a)=>(s[a]=r[a],s),{}):r}async at(e,t){const{items:i}=await this._getSummary(e);return i[t]}async _loadSearchIndex(e){const t=this._searchIndexes[e],i=await ce(t);return gs.loadJS(i.body,As)}async search(e,t,i){const[r,s]=await Promise.all([this._loadSearchIndex(e),this._getSummary(e)]);return r.search(t,i).slice(0,15).map(a=>{const[l]=s.byId[a.id];return a.doc=s.items[l],a.hints=Es(a),a})}}var $s={en:{notfound:"/assets/notfound.en-D3L7oOYD.json",privacy:"/assets/privacy.en-DY4N7lkn.json","support-casljs":"/assets/support-casljs.en-hTjAtRgz.json","advanced/ability-inheritance":"/assets/advanced/ability-inheritance.en-rv3lmhuz.json","advanced/debugging-testing":"/assets/advanced/debugging-testing.en-CZvNK5Bw.json","advanced/customize-ability":"/assets/advanced/customize-ability.en-DzVvr_I8.json","advanced/typescript":"/assets/advanced/typescript.en-Dk5wzNzV.json","api/casl-ability":"/assets/api/casl-ability.en-2Um5gWlh.json","api/casl-ability-extra":"/assets/api/casl-ability-extra.en-BPj9dZDC.json","cookbook/cache-rules":"/assets/cookbook/cache-rules.en-D8Wdy4EA.json","cookbook/claim-authorization":"/assets/cookbook/claim-authorization.en-2YYKAWwH.json","cookbook/less-confusing-can-api":"/assets/cookbook/less-confusing-can-api.en-CpifXud1.json","cookbook/intro":"/assets/cookbook/intro.en-CdYKdEd7.json","cookbook/roles-with-persisted-permissions":"/assets/cookbook/roles-with-persisted-permissions.en-DBMmb0dK.json","cookbook/roles-with-static-permissions":"/assets/cookbook/roles-with-static-permissions.en-CYOla32w.json","guide/conditions-in-depth":"/assets/guide/conditions-in-depth.en-F4Cw4YNk.json","guide/define-aliases":"/assets/guide/define-aliases.en-Dp-cKZqi.json","guide/define-rules":"/assets/guide/define-rules.en-Cyp9qD7M.json","guide/install":"/assets/guide/install.en-BaFAdsFy.json","guide/intro":"/assets/guide/intro.en-Ck7gMM7H.json","guide/restricting-fields":"/assets/guide/restricting-fields.en-n56o7cSB.json","advanced/ability-to-database-query":"/assets/advanced/ability-to-database-query.en-Q4f97-6z.json","guide/subject-type-detection":"/assets/guide/subject-type-detection.en-CRNWRboA.json","package/casl-angular":"/assets/package/casl-angular.en-CHWPMVi8.json","package/casl-aurelia":"/assets/package/casl-aurelia.en-CfinlayL.json","package/casl-prisma":"/assets/package/casl-prisma.en-I78bSUeh.json","package/casl-mongoose":"/assets/package/casl-mongoose.en-BNoCycJb.json","package/casl-react":"/assets/package/casl-react.en-CBa9oajx.json","package/casl-vue":"/assets/package/casl-vue.en-CWrM9oQw.json"}},Ts={en:"/assets/content_pages_summaries.en-B-opFM0S.json"},Fs={en:"/assets/content_pages_searchIndexes.en-CLwTWuuD.json"};const Ns=Object.freeze(Object.defineProperty({__proto__:null,pages:$s,searchIndexes:Fs,summaries:Ts},Symbol.toStringTag,{value:"Module"})),Os={page:new Cs(Ns)},qt=n=>{const e=Os[n];if(!e)throw new TypeError(`Unknown content loader "${n}".`);return e};function Is(n){if(n.code==="NOT_FOUND")return{body:m`<app-page name="notfound"></app-page>`};throw n}async function js(n,e){if(!e.categories)return n.at(e.lang,0);const t=await n.byCategories(e.lang,e.categories),i=e.categories.find(r=>t[r].length);return t[i][0]}const Ps=n=>n,Ls=(n=Ps)=>async e=>{const t=n(e),i=qt("page");if(t.id)t.id.endsWith("/")?t.redirectTo=t.id.slice(0,-1):[t.page,t.byCategories,t.nav]=await Promise.all([i.load(t.lang,t.id),t.categories.length?i.byCategories(t.lang,t.categories):null,i.getNearestFor(t.lang,t.id,t.categories)]);else{const r=await js(i,t);t.redirectTo=r.id}return t},Rs=n=>({match:e,error:t,resolved:i})=>t?Is(t):i.redirectTo?{redirect:{name:"page",params:{id:i.redirectTo,lang:e.params.lang}}}:{body:n(i,e.params)},zs=Rs(n=>({main:m`
    <app-page name="${n.id}" .nav="${n.nav}"></app-page>
  `,sidebar:n.byCategories?m`<pages-by-categories .items="${n.byCategories}"></pages-by-categories>`:null}));function Ms(n){return n?JSON.parse(`{"${n.replace(/&/g,'","').replace(/=/g,'":"')}"}`):{}}function Vs(n){return n?Object.keys(n).reduce((e,t)=>(e.push(`${t}=${n[t]}`),e),[]).join("&"):""}const Ds=Object.freeze(Object.defineProperty({__proto__:null,parse:Ms,stringify:Vs},Symbol.toStringTag,{value:"Module"}));function qs(n){return n.restrictions?n.path.replace(/:([\w_-]+)(\?)?/g,(e,t,i="")=>{const r=n.restrictions[t];return r?`:${t}(${r})${i}`:t+i}):n.path}function li(n,e){return n.map(t=>{const i=e[t.controller];if(!i)throw new Error(`Did you forget to specify controller for route "${t.name}"?`);const r={name:t.name,path:qs(t),...i(t)};return t.meta&&t.meta.encode===!1&&(r.pathOptions={compile:{encode:s=>s}}),t.children&&(r.children=li(t.children,e)),r})}function Us(n,e){let t=!1;const i=n.replace(/:([\w_-]+)\??/g,(r,s)=>((!e[s]||e[s]==="undefined")&&(t=!0),e[s]));return t?null:i}const Bs=li(as.routes,{Home:()=>({respond:()=>({body:{main:m`<home-page></home-page>`}})}),Page(n){const e=n.meta?n.meta.categories:[];return{resolve:Ls(({params:t})=>({...t,categories:e,id:Us(n.path,t)})),respond:zs}}}).concat({name:"notFound",path:"(.*)",respond({match:n}){const{pathname:e}=n.location,t=e.indexOf("/",1),i=t===-1?e.slice(1):e.slice(1,t),{search:r,hash:s}=window.location;return $e.includes(i)?{body:m`<app-page name="notfound"></app-page>`}:{redirect:{url:`/${Un}${e}${r}${s}`}}}}),O=Ur(ss,Kr(Bs),{history:{base:ns(ve.baseUrl),query:Ds}}),Hs=O.url;O.url=n=>{const e={lang:be(),...n.params};return Hs({...n,params:e})};"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const wn=window.visualViewport||window;function Ws(n,e){const t=window.matchMedia(n),i=()=>e(t.matches);return wn.addEventListener("resize",i),i(),()=>wn.removeEventListener("resize",i)}function Ks(){const n=document.createElement("div");return Object.assign(n.style,{position:"fixed",right:"10px",bottom:"10px",zIndex:50,width:"320px"}),document.body.appendChild(n),n}class Pe extends ${constructor(){super(),this._route=null,this._notificationsRoot=null,this._menu=null,this._isMobile=!1,this.ready=!1,this._unwatch=[]}connectedCallback(){super.connectedCallback(),this._unwatch.push(O.observe(e=>{this._route=e.response,this._closeMenu()},{initial:!0})),this._unwatch.push(Ws("(min-width: 768px)",e=>this._isMobile=!e)),document.addEventListener("keypress",e=>{e.ctrlKey&&e.shiftKey&&e.keyCode===22&&console.log("6d390b5")},!1)}disconnectedCallback(){super.disconnectedCallback(),this._unwatch.forEach(e=>e())}updated(){this._menu=this._menu||this.shadowRoot.querySelector("menu-drawer")}_toggleMenu(){this._menu&&this._menu.toggle()}_closeMenu(){this._menu&&this._menu.close()}notify(e,t={}){const i=document.createElement("app-notification");i.message=e,typeof t.onClick=="function"&&i.addEventListener("click",t.onClick,!1),this._notificationsRoot=this._notificationsRoot||Ks(),this._notificationsRoot.appendChild(i)}_renderDrawerMenu(e){return this._isMobile?m`
      ${e}
      <h3>${v("menu.root")}</h3>
      <app-menu .items="${xt.items}" expanded></app-menu>
      <app-social-links></app-social-links>
    `:null}_getLayout(e){return this._route.name==="home"?"":this._isMobile?"col-1":e?"col-2":"col-1"}render(){if(!this._route||!this.ready)return null;const{body:e}=this._route,t=e.sidebar?pn(e.sidebar):"";return m`
      <menu-drawer ?disabled="${!this._isMobile}">
        <div slot="menu">${this._renderDrawerMenu(t)}</div>
        <app-root
          theme="${this._isMobile?"mobile":"default"}"
          layout="${this._getLayout(!!t)}"
          .menu="${xt}"
          @toggle-menu="${this._toggleMenu}"
        >
          <div slot="aside">${t}</div>
          ${pn(e.main||e)}
        </app-root>
      </menu-drawer>
      <analytics-consent></analytics-consent>
    `}}_(Pe,"cName","casl-docs"),_(Pe,"properties",{ready:{type:Boolean},_isMobile:{type:Boolean},_route:{type:Object}});Pe.styles=[S`
    :host {
      display: block;
    }

    app-social-links {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid #e3e3e3;
    }

    .stop-war {
      position: fixed;
      z-index: 1000;
      top: 5px;
      right: 5px;
    }
  `];class Le extends ${constructor(){super(),this.theme="default",this.menu=null,this.layout=""}render(){return m`
      <app-header theme="${this.theme}" .menu="${this.menu}"></app-header>
      <section class="content ${this.layout==="col-2"?"row":this.layout}">
        <aside>
          <div class="aside">
            <slot name="aside"></slot>
          </div>
        </aside>
        <main><slot></slot></main>
      </section>
      <app-footer></app-footer>
    `}}_(Le,"cName","app-root"),_(Le,"properties",{theme:{type:String},layout:{type:String},menu:{type:Object}});Le.styles=[Lt,S`
    :host {
      display: block;
    }

    app-header {
      position: relative;
      position: sticky;
      top: 0;
      z-index: 10;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    }

    .row > main,
    .col-1 > main {
      min-width: 0;
      padding-left: 10px;
      padding-right: 10px;
    }

    .aside,
    main {
      padding-bottom: 30px;
    }

    aside {
      display: none;
    }

    @media (min-width: 768px) {
      .aside {
        position: sticky;
        top: 54px;
        height: calc(100vh - 132px);
        overflow-y: auto;
        padding-top: 2rem;
      }

      .row > aside {
        display: block;
        flex-basis: 260px;
        max-width: 260px;
        min-width: 200px;
        padding-left: 20px;
        box-shadow: rgba(0, 0, 0, 0.1) 1px -1px 2px 0px;
      }

      .row > main {
        flex-basis: 80%;
        margin: 0 auto;
        max-width: 800px;
      }
    }
  `];class Ut extends ${constructor(){super(...arguments);_(this,"year",new Date().getFullYear())}render(){return m`
      <p class="copyright md">${G("copyright",{year:this.year})}</p>
      <p><app-link to="privacy">${v("menu.privacy")}</app-link> · <button type="button" @click="${Cr}">${v("analyticsConsent.settings")}</button></p>
    `}}_(Ut,"cName","app-footer");Ut.styles=[Ye,S`
    :host {
      --app-footer-background: #838385;
      --app-footer-text-color: #fff;
      --app-footer-text-size: 13px;

      display: block;
      padding: 40px 0;
      background-color: #303846;
      font-size: var(--app-footer-text-size);
      text-align: center;
      color: var(--app-footer-text-color);
    }

    .copyright {
      white-space: pre-line;
    }

    button {
      background: transparent;
      border: 0;
      padding: 8px;
      color: inherit;
      font: inherit;
      text-decoration: underline;
      cursor: pointer;
    }

    button:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
  `];const Xs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEVMaXF1dXW6QQOmAAAAAXRSTlMAQObYZgAAABZJREFUeNpjoAVg/g8EB7BSg9sUygEATXU49WmTHjIAAAAASUVORK5CYII=";class Re extends ${constructor(){super(),this.theme="default",this.menu={items:[]}}_emitToggleMenu(){this.dispatchEvent(new CustomEvent("toggle-menu",{bubbles:!0,composed:!0}))}_renderControls(){return this.theme==="default"?m`
        <div class="controls row align-center">
          <app-quick-search></app-quick-search>
          <app-menu .items="${this.menu.items}"></app-menu>
          <app-social-links></app-social-links>
        </div>
      `:m`
      <app-quick-search ?compact="${this.theme==="mobile"}"></app-quick-search>
    `}_renderMenuToggler(){return this.theme!=="mobile"?null:m`
      <button type="button" class="menu-toggle" @click="${this._emitToggleMenu}">
        <img src="${Xs}" width="24">
      </button>
    `}render(){return m`
      <header>
        <div class="header container">
          ${this._renderMenuToggler()}
          <div>
            <app-link to="home" class="logo">${v("name")}</app-link>
            <versions-select></versions-select>
          </div>
          ${this._renderControls()}
        </div>
      </header>
      <!-- <app-lang-picker></app-lang-picker> -->
    `}}_(Re,"cName","app-header"),_(Re,"properties",{menu:{type:Object},theme:{type:String}});Re.styles=[Lt,S`
    :host {
      display: block;
    }

    app-link {
      color: #000;
      text-decoration: none;
    }

    .header {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 0 10px 0 1rem;
    }

    .controls {
      flex-wrap: wrap;
      justify-content: flex-end;
      max-width: 100%;
    }

    .logo {
      padding-top: 4px;
      line-height: 1;
      font-weight: bold;
      font-size: 2rem;
      font-family: "Stardos Stencil", "Helvetica Neue", Arial, sans-serif;
      vertical-align: middle;
    }

    .logo:hover {
      border-bottom-color: transparent;
    }

    app-social-links {
      margin-left: 16px;
      padding-left: 12px;
      border-left: 1px solid #e3e3e3;
    }

    .menu-toggle {
      position: absolute;
      left: 0;
      background: transparent;
      border: 0;
      cursor: pointer;
    }

    .menu-toggle:focus {
      outline: none;
    }

    app-menu {
      margin-left: 10px;
    }

    app-quick-search {
      position: absolute;
      right: 10px;
    }

    versions-select {
      vertical-align: middle;
      margin-left: -5px;
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      app-menu {
        --app-menu-item-margin: 5px;
      }

      app-social-links {
        margin-left: 8px;
        padding-left: 8px;
      }
    }

    @media (min-width: 768px) {
      .header {
        justify-content: space-between;
      }

      .logo {
        font-size: 3rem;
      }

      app-quick-search {
        position: static;
      }

      versions-select {
        vertical-align: top;
        margin-left: -10px;
      }
    }
  `];class ze extends ${constructor(){super(),this.to="",this.active=!1,this.query=null,this.params=null,this.hash="",this.nav=!1,this._url=null,this._unwatchRouter=null}_isActive(){const e=this._getUrl(),{pathname:t}=window.location;return e.length>t.length?!1:e===t||t.startsWith(e)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._navigate.bind(this),!1),this.nav&&(this._unwatchRouter=O.observe(()=>{this.active=this._isActive()},{initial:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}update(e){const t=["to","query","params","hash"].some(i=>e.has(i));if((this._url===null||t)&&(this._url=this._generateUrl()),this.nav&&e.has("active")){const i=this.active?"add":"remove";this.classList[i]("active")}return super.update(e)}_getUrl(){return this._url=this._url||this._generateUrl(),this._url}_generateUrl(){return O.url({name:this.to,hash:this.hash,params:this.params,query:this.query})}render(){return m`
      <a itemprop="url" href="${this._url}">
        <slot></slot>
      </a>
    `}_navigate(e){e.ctrlKey||(e.preventDefault(),O.navigate({url:this._url}))}}_(ze,"cName","app-link"),_(ze,"properties",{to:{type:String},params:{type:Object},query:{type:Object},hash:{type:String},active:{type:Boolean},nav:{type:Boolean}});ze.styles=S`
  :host {
    display: inline-block;
    vertical-align: baseline;
    text-decoration: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  :host(:hover),
  :host(.active) {
    border-bottom-color: #81a2be;
  }

  a {
    font-size: inherit;
    color: inherit;
    text-decoration: inherit;
  }

  a:hover {
    text-decoration: inherit;
  }

  a.active {
    color: var(--app-link-active-color);
  }
`;function Gs(n){if(n.heading)return m`<h4>${v(`menu.${n.heading}`)}</h4>`;const e=v(`menu.${n.name}`);return n.route===!1?m`<a class="link">${e}</a>`:n.url?m`<a href="${n.url}" target="_blank" rel="${n.rel||"nofollow"}">${e}</a>`:n.page?m`<app-link nav to="page" .params="${{id:n.page}}">${e}</app-link>`:m`<app-link nav to="${n.name}">${e}</app-link>`}class Me extends ${constructor(){super(),this.items=[]}render(){return m`
      <nav
        role="navigation"
        itemscope
        itemtype="http://schema.org/SiteNavigationElement"
      >
        ${this._renderNav(this.items,"nav")}
      </nav>
    `}_renderNav(e,t){const i=e.map(r=>m`
      <li class="${r.children?"menu-item-dropdown":"menu-item"}">
        ${Gs(r)}
        ${this._renderItemNav(r)}
      </li>
    `);return m`<ul class="${t}">${i}</ul>`}_renderItemNav({children:e}){return e?this._renderNav(e,`dropdown ${this.expanded?"":"expandable"}`):""}}_(Me,"cName","app-menu"),_(Me,"properties",{items:{type:Array},expanded:{type:Boolean}});Me.styles=S`
  :host {
    display: block;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  .menu-item-dropdown, .menu-item {
    display: inline-block;
  }

  .menu-item-dropdown {
    position: relative;
    margin: 0 var(--app-menu-item-margin, 1rem);
  }

  .menu-item {
    margin: 0 var(--app-menu-item-margin, 1rem);
  }

  .menu-item-dropdown:hover .dropdown {
    display: block;
  }

  .dropdown.expandable {
    display: none;
    max-height: calc(100vh - 61px);
    overflow-y: auto;
    position: absolute;
    top: 100%;
    right: -15px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-color: #ccc;
    border-radius: 4px;
  }

  .dropdown {
    box-sizing: border-box;
    padding: 10px 0;
    text-align: left;
    white-space: nowrap;
  }

  .dropdown li {
    display: block;
    margin: 0;
    line-height: 1.6rem;
  }

  .dropdown li > ul {
    padding-left: 0;
  }

  .dropdown li:first-child h4 {
    margin-top: 0;
    padding-top: 0;
    border-top: 0;
  }

  .dropdown a,
  .dropdown app-link,
  .dropdown h4 {
    padding: 0 24px 0 20px;
  }

  .dropdown h4 {
    margin: 0.45em 0 0;
    padding-top: 0.45rem;
    border-top: 1px solid #eee;
  }

  .menu-item-dropdown a,
  .menu-item-dropdown app-link {
    text-decoration: none;
  }

  .nav a,
  .nav app-link,
  .dropdown a,
  .dropdown app-link {
    display: block;
    color: #202428;
    text-decoration: none;
  }
  .nav a:hover,
  .nav app-link:hover,
  .nav app-link.active,
  .dropdown a:hover,
  .dropdown app-link:hover {
    color: #81a2be;
    border-bottom-color: transparent;
  }

  .link {
    display: block;
    cursor: pointer;
    line-height: 40px;
  }

  .link:after {
    display: inline-block;
    content: '';
    vertical-align: middle;
    margin-top: -1px;
    margin-left: 6px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #4f5959;
  }

  @media(min-width: 768px) {
    ul {
      white-space: nowrap;
    }

    .menu-item-dropdown + .menu-item {
      margin-right: 0;
    }
  }
`;const Qs={github:m`
    <svg aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub icon</title><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
  `,x:m`
    <svg aria-labelledby="simpleicons-x-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-x-icon" lang="en">X icon</title><path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.64 7.584H.47l8.6-9.835L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
  `,medium:m`
    <svg aria-labelledby="simpleicons-medium-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-medium-icon" lang="en">Medium icon</title><path fill="currentColor" d="M2.846 6.36c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403H7.26l5.378 11.795 4.728-11.795H24v.403l-1.917 1.837c-.165.126-.247.333-.213.538v13.5c-.034.204.048.41.213.537l1.87 1.837v.403h-9.41v-.403l1.937-1.882c.19-.19.19-.246.19-.538V7.794l-5.39 13.688h-.727L4.278 7.794v9.174c-.052.386.076.774.347 1.053l2.52 3.06v.402H0v-.403l2.52-3.06c.27-.278.39-.67.326-1.052V6.36z"></path></svg>
  `};class Bt extends ${render(){return m`
      <nav aria-label="Social links">
        ${xt.social.map(e=>m`
          <a href="${e.url}" target="_blank" rel="noopener noreferrer"
            aria-label="${e.label}" title="${e.label}">
            ${Qs[e.icon]}
          </a>
        `)}
      </nav>
    `}}_(Bt,"cName","app-social-links");Bt.styles=S`
  :host {
    display: block;
    flex-shrink: 0;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 40px;
    color: #67676c;
    text-decoration: none;
  }

  a:hover {
    color: #81a2be;
  }

  a:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -2px;
    border-radius: 4px;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;class Ve extends ${constructor(){super(),this.article=null,this.category=""}render(){const{article:e}=this,t=this.category||e.categories[0];return m`
      <time datetime="${e.createdAt}" itemprop="datePublished">
        ${yr(e.createdAt)}
      </time>
      <span>
        ${v("article.author")}
        <span itemprop="author">${v(`article.authors.${e.author}`)}</span>
      </span>
      <slot name="more">
        <app-link to="${t}" hash="comments" .params="${e}">
          <i class="icon-comment"></i>${e.commentsCount||0}
        </app-link>
        <app-link to="${t}" .params="${e}" class="more">${v("article.readMore")}</app-link>
      </slot>
    `}}_(Ve,"cName","app-article-details"),_(Ve,"properties",{article:{type:Object,attribute:!1},category:{type:String}});Ve.styles=[S`
    :host {
      margin-top: 10px;
      color: var(--app-article-details-color, #999);
      font-size: 11px;
    }

    :host > * {
      margin-right: 10px;
    }

    app-link {
      margin-right: 10px;
      color: var(--app-link-active-color);
    }

    app-link > [class^="icon-"] {
      margin-right: 5px;
    }
  `];function At(n){const e=n?`${n} - `:"";document.title=e+de("name")}function ci(n){let e=document.head.querySelector(`meta[name="${n}"]`);return e||(e=document.createElement("meta"),e.setAttribute("name",n),document.head.appendChild(e)),e}function X(n,e){if(typeof n=="object"){Object.keys(n).forEach(r=>X(r,n[r]));return}const t=de(`meta.${n}`),i=Array.isArray(e)?e.concat(t).join(", "):e||t;ci(n).setAttribute("content",i.replace(/[\n\r]+/g," "))}function Ys({response:n}){const e=document.documentElement;e.lang!==n.params.lang&&(e.lang=n.params.lang);const t=`meta.${n.name}`;gr(t)?(At(de(`${t}.title`)),X("keywords",de(`${t}.keywords`)),X("description",de(`${t}.description`))):(At(),X("keywords"),X("description")),di()}function Zs(n){const e=n.meta||{};At(n.title),X("keywords",e.keywords||""),X("description",e.description||""),di()}const Js="share-buttons";let _e;function di(){window.__sharethis__&&(_e??(_e=document.getElementById(Js)),_e.setAttribute("data-url",window.location.href),_e.setAttribute("data-title",document.title),_e.setAttribute("data-description",ci("description").getAttribute("content")))}function Et(n,e){const t=n.getElementById(e);if(!t)return;const i=85;t.scrollIntoView(!0),document.documentElement.scrollTop-=i}function eo(n,e){let t=n;const i=3;let r=0;for(;t&&r<i;){if(t.tagName===e)return t;t=t.parentNode,r++}return null}function to(n,e){let t;if(e.tagName[0]==="H"&&e.id)t=e.id;else{const i=eo(e,"A"),r=i?i.href.indexOf("#"):-1;r!==-1&&Et(n,i.href.slice(r+1))}if(t){const{location:i}=O.current().response,r=`${i.pathname}${window.location.search}#${t}`;O.navigate({url:r}),Et(n,t)}}function no(n){const{hash:e}=O.current().response.location;e?Et(n,e):window.scroll(0,0)}function io(n,e){return Ot(jt(n.content,e))}class De extends Hn{constructor(){super(),this._page=null,this.nav=[],this.name=null,this.vars={},this.type="page",this.content=io}connectedCallback(){super.connectedCallback(),this.shadowRoot.addEventListener("click",e=>{to(this.shadowRoot,e.target)},!1)}async updated(e){(this._page===null||e.has("name")||e.has("type"))&&await this.reload()}async reload(){this._page=await qt(this.type).load(be(),this.name),Zs(this._page),await this.updateComplete,no(this.shadowRoot)}_renderNav(){const[e,t]=this.nav;return m`
      <app-page-nav pageType="${this.type}" .prev="${e}" .next="${t}"></app-page-nav>
    `}render(){return this._page?m`
      <article itemscope itemtype="http://schema.org/Article">
        <h1>${jt(this._page.title)}</h1>
        <old-version-alert></old-version-alert>
        <div class="description md">${this.content(this._page,this.vars)}</div>
      </article>
      ${this.nav&&this.nav.length?this._renderNav():""}
    `:m``}}_(De,"cName","app-page"),_(De,"properties",{type:{type:String},name:{type:String},vars:{type:Object,attribute:!1},content:{type:Function,attribute:!1},nav:{type:Array},_page:{type:Object}});De.styles=[wr,Ye,Rt,S`
    :host {
      display: block;
    }

    app-page-nav {
      margin-top: 20px;
    }
  `];class qe extends ${constructor(){super(),this.next=null,this.prev=null,this.pageType="page"}_linkTo(e){const t=this[e];return t?m`
      <app-link to="${this.pageType}" .params="${t}" class="${e}">
        ${t.title}
      </app-link>
    `:""}render(){return m`
      ${this._linkTo("prev")}
      ${this._linkTo("next")}
    `}}_(qe,"cName","app-page-nav"),_(qe,"properties",{next:{type:Object},prev:{type:Object},pageType:{type:String}});qe.styles=S`
  :host {
    display: block;
  }

  :host:after {
    display: table;
    clear: both;
    content: '';
  }

  app-link {
    color: #81a2be;
    text-decoration: none;
  }

  app-link:hover {
    border-bottom-color: transparent;
  }

  .next {
    float: right;
    margin-left: 30px;
  }

  .next:after,
  .prev:before {
    display: inline-block;
    vertical-align: middle;
    content: '⇢';
  }

  .prev:before {
    content: '⇠';
  }
`;const ro="/v6/assets/casl-shield-Czvcyms2.png",ui=["isomorphic","versatile","declarative","typesafe","treeshakable"];function so(n){return m`
    <section class="feature">
      <h3>${v(`features.${n}.title`)}</h3>
      <p>${G(`features.${n}.description`)}</p>
    </section>
  `}const Ht=()=>m`
  <section class="features">${ui.map(so)}</section>
`;Ht.styles=[S`
    .features {
      display: -ms-grid;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      -ms-grid-columns: ${Ln(ui.map(()=>"minmax(200px, 1fr)").join(" "))};
      column-gap: 1rem;
    }

    .feature {
      padding: 1rem 0;
    }

    .feature h3 {
      margin: 0 0 1rem;
      font-size: 1.4rem;
    }

    .feature p:last-child {
      margin-bottom: 0;
    }
  `];const oo=[{name:"Strapi",url:"https://strapi.io/"},{name:"Meshery",url:"https://meshery.io/"},{name:"Infisical",url:"https://infisical.com/"},{name:"Lightdash",url:"https://www.lightdash.com/"}],Wt=()=>m`
  <div class="adoption">
    <section aria-labelledby="adoption-title">
      <h2 id="adoption-title">${v("adoption.title")}</h2>
      <ul class="adoption-metrics">
        <li>
          <a href="https://github.com/stalniy/casl/network/dependents" target="_blank" rel="noopener noreferrer">
            <strong>100K+</strong>
            <span>${v("adoption.githubDependents")}</span>
          </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/@casl/ability?activeTab=dependents" target="_blank" rel="noopener noreferrer">
            <strong>600+</strong>
            <span>${v("adoption.npmDependents")}</span>
          </a>
        </li>
      </ul>
    </section>
    <section aria-labelledby="adoption-projects-title">
      <h2 id="adoption-projects-title">${v("adoption.projectsTitle")}</h2>
      <ul class="adoption-projects" aria-labelledby="adoption-projects-label">
        ${oo.map((n,e)=>m`
          <li>
            ${e?m`<span aria-hidden="true">·</span>`:""}
            <a href="${n.url}" target="_blank" rel="noopener noreferrer">
              ${n.name}
            </a>
          </li>
        `)}
      </ul>
      <p class="adoption-contribute">
        <a href="https://github.com/stalniy/casl/discussions/1307" target="_blank" rel="noopener noreferrer">
          ${v("adoption.contribute")}
          <span aria-hidden="true">→</span>
        </a>
      </p>
    </section>
  </div>
`;Wt.styles=S`
  .adoption {
    box-sizing: border-box;
    display: grid;
    align-items: start;
    gap: 1.5rem;
    max-width: 900px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    justify-content: center;
    text-align: center;
  }

  .adoption h2 {
    margin: 0 0 .5rem;
    color: #202428;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
  }

  .adoption .adoption-metrics {
    display: flex;
    gap: 30px;
    margin: .75rem 0 0;
    justify-content: center;
  }

  .adoption-metrics a {
    display: flex;
    flex-direction: column;
    gap: .25rem;
    color: #506575;
    text-decoration: none;
  }

  .adoption-metrics span {
    color: #506575;
    font-size: .9375rem;
  }

  .adoption-metrics strong {
    color: #214e70;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .adoption-projects-label {
    margin: 0 0 .125rem;
    color: #506575;
    font-size: .875rem;
  }

  .adoption ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .adoption .adoption-projects {
    display: flex;
    flex-wrap: wrap;
    gap: 0 .875rem;
    color: #506575;
  }

  .adoption-projects li {
    display: flex;
    align-items: center;
    gap: .875rem;
  }

  .adoption-projects a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: #214e70;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
  }

  .adoption-contribute {
    font-size: .8125rem;
    margin: .375rem 0 0;
    color: #506575;
  }

  .adoption-contribute a {
    color: inherit;
  }

  .adoption-metrics a:hover span,
  .adoption-projects a:hover,
  .adoption-projects a:focus-visible,
  .adoption-contribute a:hover,
  .adoption-contribute a:focus-visible {
    color: #333;
    text-decoration: underline;
  }

  .adoption-metrics a:focus-visible,
  .adoption-projects a:focus-visible,
  .adoption-contribute a:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }

  @media (min-width: 768px) {
    .adoption {
      grid-template-columns: repeat(2, min-content);
      column-gap: clamp(2rem, 5vw, 4rem);
      text-align: left;
      white-space: nowrap;
    }

    .adoption .adoption-metrics {
      justify-content: flex-start;
    }

    .adoption .adoption-projects {
      flex-wrap: nowrap;
    }
  }
`;class Kt extends ${connectedCallback(){super.connectedCallback(),this._publishVersion=(this._publishVersion||0)+1,this._publishContentReady(this._publishVersion)}async _publishContentReady(e){await this.updateComplete,await Promise.all(Array.from(this.shadowRoot.querySelectorAll("app-link"),t=>t.updateComplete)),!(!this.isConnected||e!==this._publishVersion)&&this.dispatchEvent(new CustomEvent("content-ready",{bubbles:!0,composed:!0}))}render(){return m`
      <div class="bg">
        <header class="row wrap container">
          <div class="col row wrap align-start main">
            <div class="col details">
              <div class="row hero-row">
                <img src="${ro}" width="126" height="152" class="col col-fixed logo">
                <div class="hero">
                  <p class="eyebrow">${v("hero.heading")}</p>
                  <h1 class="hero-title">${v("hero.title")}</h1>
                  <p class="description">${v("hero.description")}</p>
                  <div class="buttons">
                    <app-link to="page" .params="${{id:"guide/intro"}}" class="btn btn-lg">
                      ${v("buttons.start")}
                    </app-link>
                    <why-casl-video></why-casl-video>
                    <div class="package-stats">
                      <github-button></github-button>
                      <npm-downloads-button></npm-downloads-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col col-fixed col-example">
            <div class="example">${G("exampleCode")}</div>
          </div>
        </header>
      </div>
      ${Wt()}
      <section class="features-brand">
        <div class="container">
          <p class="eyebrow">POWERFUL PERMISSIONS. MINIMAL OVERHEAD</p>
          ${Ht()}
        </div>
      </section>
      <section class="capabilities container">
        <p class="eyebrow">${v("home.evolution.heading")}</p>
        <h2>${v("home.evolution.title")}</h2>
        <p class="capabilities-intro">${v("home.evolution.subtitle")}</p>
        <authorization-examples></authorization-examples>
        <p class="capabilities-note">${v("home.evolution.note")}</p>
      </section>
    `}}_(Kt,"cName","home-page");Kt.styles=[Lt,Bn,Ht.styles,Wt.styles,Rt,S`
    :host {
      display: block;
    }

    .bg {
      background: #fff;
      background: linear-gradient(90deg, #fff 0%, rgba(222,228,234,1) 41%, rgba(235,245,253,1) 60%, rgba(82,84,87,1) 100%);
    }

    header {
      justify-content: center;
      padding: 2rem 1rem;
    }

    .main {
      padding-top: 22px;
      text-align: center;
      justify-content: center;
    }

    .hero {
      margin-bottom: 1rem;
    }

    .hero-row {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
    }

    .hero-title {
      font-size: clamp(30px, 3vw, 43px);
      line-height: 1.07;
      letter-spacing: -.055em;
      margin-bottom: 24px;
      font-weight: 650;
      color: #214e70;
      white-space: pre-line;
    }

    .hero-title::first-line {
      color: #202428;
    }

    .hero .description {
      max-width: 480px;
      color: #506575;
      font-size: 18px;
      line-height: 1.65;
      margin-bottom: 28px;
    }

    .eyebrow {
      font: 11px / 1.5 ui-monospace, SFMono-Regular, Consolas, monospace;
      letter-spacing: .09em;
      margin: 0;
    }

    .buttons {
      display: inline-block;
      text-align: center;
    }

    .buttons app-link {
      margin-right: 5px;
      background: #273849;
      border-color: #273849;
      color: #fff;
    }

    .buttons > * { margin-bottom: 8px; vertical-align: middle; }
    .buttons app-link:focus-visible { outline: 3px solid #81a2be; outline-offset: 3px; }

    .package-stats {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 10px;
      margin-left: auto;
      margin-right: auto;
    }

    .details {
      min-width: 300px;
    }

    .col-example {
      display: none;
    }

    .example code {
      font-size: clamp(.7rem, 0.7vw, 0.9rem);
    }

    .capabilities {
      padding-block: 20px;
      border-top: 1px solid #ced9e0;
      padding: 1.5rem 1rem;
    }

    .capabilities h2,
    .features-brand h2 {
      margin-bottom: 12px;
    }
    .capabilities-intro { max-width: 760px; color: #506575; line-height: 1.6; margin: 0; }
    .capabilities-note { color: #526575; font-size: .9rem; line-height: 1.6; margin: 16px 0 0; }

    .features-brand {
      background: #f7f7f7;
      padding: 2rem 1rem;
    }

    .features-brand h2 {
      margin-top: 0;
    }

    @media (min-width: 768px) {
      .main > img {
        margin-right: 30px;
      }

      .logo {
        margin-top: 40px;
      }

      .eyebrow {
        margin-bottom: 22px;
      }

      .hero-row {
        max-width: 777px;
        margin: 0 auto;
        flex-direction: row;
        text-align: left;
        align-items: flex-start;
        justify-content: center;
      }

      .hero-title {
        margin-top: 0;
      }
    }

    @media (min-width: 1030px) {
      .main {
        text-align: left;
      }

      .col-example {
        display: block;
        overflow-x: auto;
        flex-basis: 40%;
      }

      .hero-title {
        max-width: initial;
      }

      .hero .description {
        margin-left: 0;
      }
    }

    @media (min-width: 1200px) {
      .col-example {
        flex-basis: auto;
      }
    }
  `];const pi=`casl:github:stars:${ve.repoURL}`,ao=24*60*60*1e3,lo=`https://api.github.com/repos/${new URL(ve.repoURL).pathname.replace(/^\/|\/$/g,"").replace(/\.git$/,"")}`;function co(){try{const n=JSON.parse(localStorage.getItem(pi));return n&&Number.isSafeInteger(n.stars)&&n.stars>=0&&Number.isFinite(n.timestamp)?n:null}catch{return null}}async function uo(){const n=co(),e=n?Date.now()-n.timestamp:1/0;if(e>=0&&e<ao)return n.stars;try{const t=await fetch(lo,{signal:typeof AbortSignal.timeout=="function"?AbortSignal.timeout(5e3):void 0});if(!t.ok)throw new Error("Failed to retrieve GitHub stars");const{stargazers_count:i}=await t.json();if(!Number.isSafeInteger(i)||i<0)throw new Error("Invalid GitHub star count");try{localStorage.setItem(pi,JSON.stringify({stars:i,timestamp:Date.now()}))}catch{}return i}catch{return n?n.stars:null}}let xn=null;function po(){return xn??(xn=uo()),xn}const ho=new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1});class Ue extends ${connectedCallback(){super.connectedCallback(),po().then(e=>{this.stars=e})}render(){return m`
      <a
        href="${ve.repoURL}"
        target="_blank"
        rel="noopener"
        title="Star CASL on GitHub"
      >
        <span class="label">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.72 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.767 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.565.41l-3.097.45 2.241 2.185a.75.75 0 0 1 .216.664l-.529 3.085 2.77-1.457a.75.75 0 0 1 .698 0l2.77 1.457-.53-3.085a.75.75 0 0 1 .216-.664l2.242-2.185-3.097-.45a.75.75 0 0 1-.565-.41L8 2.695Z" />
          </svg>
          Star
        </span>
        <span class="star-count">${this.stars==null?"—":ho.format(this.stars)}</span>
      </a>
    `}}_(Ue,"cName","github-button"),_(Ue,"properties",{stars:{type:Number}});Ue.styles=S`
  :host {
    display: inline-flex;
  }

  a {
    display: inline-flex;
    align-items: center;
    height: 28px;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #444c56;
    border-radius: 4px;
    background: #202428;
    color: #fff;
    font: 600 12px/1 "Helvetica Neue", Arial, sans-serif;
    text-decoration: none;
  }

  a:hover,
  a:focus-visible {
    color: #58a6ff;
  }

  span {
    padding: 0 8px;
  }

  .label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .star-count {
    display: inline-flex;
    align-items: center;
    align-self: stretch;
    border-left: 1px solid #444c56;
    background: #30363d;
  }
`;const hi={url:"https://github.com/stalniy/casl-examples",label:"menu.examples"},fo=[hi,{id:"guide/intro",label:"menu.guide"},{id:"advanced/ability-to-database-query",label:"search.databaseQuery"},{id:"cookbook/intro",label:"menu.cookbook"}],_n=m`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px">
    <path d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z" />
  </svg>
`;class Be extends ${constructor(){super(),this.value="",this.compact=!1,this._suggestions=null,this._activeIndex=0,this._loading=!1,this._error=!1,this._requestId=0,this._open=!1,this._search=cr(this._search,300),this._unwatchRouter=null,this._isMac=/Mac|iPhone|iPad/i.test(navigator.userAgentData?.platform||navigator.platform),this._shortcut=this._shortcut.bind(this)}connectedCallback(){super.connectedCallback(),this._unwatchRouter=O.observe(()=>this._close()),document.addEventListener("keydown",this._shortcut)}disconnectedCallback(){this._close(),this._unwatchRouter?.(),document.removeEventListener("keydown",this._shortcut),super.disconnectedCallback()}_shortcut(e){!(this._isMac?e.metaKey:e.ctrlKey)||e.altKey||e.shiftKey||e.isComposing||e.defaultPrevented||e.key.toLowerCase()!=="k"||(e.preventDefault(),this._show())}_setValue(e){this.value=e,this.dispatchEvent(new CustomEvent("update",{detail:e.trim()}))}_show(){const e=this.shadowRoot.querySelector("dialog");e.open||(this._open=!0,this._previousOverflow=document.body.style.overflow,document.body.style.overflow="hidden",e.showModal(),this.shadowRoot.querySelector("input").focus())}_close(){this._open&&(this._open=!1,this._requestId+=1,this.shadowRoot.querySelector("dialog").close(),document.body.style.overflow=this._previousOverflow,this._setValue(""),this._suggestions=null,this._activeIndex=0,this._loading=!1,this._error=!1,this.dispatchEvent(new CustomEvent("reset")))}_cancel(e){e.preventDefault(),this._close()}_clickBackdrop(e){if(e.target!==e.currentTarget)return;const t=e.currentTarget.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&this._close()}async _search(){const e=this.value.trim();if(!this._open||!e)return;const t=this._requestId;try{const i=await qt("page").search(be(),e,{prefix:!0});if(!this._open||t!==this._requestId)return;this._suggestions=i.flatMap(s=>{const a=s.hints.title||s.doc.title,l=s.hints.headings||s.doc.headings||[],o={doc:s.doc,title:a,category:s.doc.categories[0]};return[o,...l.map(c=>({...o,title:c.title,parent:s.doc.title,hash:c.id}))]});const r=e.toLowerCase().split(/\s+/).some(s=>"example".startsWith(s));r&&(this._suggestions=[hi,...this._suggestions]),$r("search",{search_term:e,result_count:i.length+Number(r)})}catch{if(!this._open||t!==this._requestId)return;this._error=!0}finally{this._open&&t===this._requestId&&(this._loading=!1)}}_updateValue(e){this._setValue(e.target.value),this._requestId+=1,this._suggestions=null,this._activeIndex=0,this._error=!1,this._loading=!!this.value.trim(),this._search()}_items(){return this._loading?[]:this._suggestions?.length?this._suggestions:fo}_url(e){return e.url||O.url({name:"page",params:e.doc||{id:e.id},hash:e.hash})}_dialogKeydown(e){if(e.isComposing)return;if(e.key==="Escape"){e.preventDefault(),this._close();return}if(e.key!=="Tab")return;e.preventDefault();const t=this.shadowRoot.querySelector("input"),i=this.shadowRoot.querySelector(".close");(this.shadowRoot.activeElement===t?i:t).focus()}async _keydown(e){if(e.isComposing)return;const t=this._items();if((e.key==="ArrowDown"||e.key==="ArrowUp")&&t.length){e.preventDefault();const i=e.key==="ArrowDown"?1:-1;this._activeIndex=(this._activeIndex+i+t.length)%t.length,await this.updateComplete,this.shadowRoot.querySelector(`#search-result-${this._activeIndex}`)?.scrollIntoView({block:"nearest"})}else e.key==="Enter"&&t.length&&(e.preventDefault(),this._navigate(e,t[this._activeIndex]))}_navigate(e,t){if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();const i=this._url(t);if(this._close(),t.url){window.location.assign(i);return}O.navigate({url:i})}_renderItems(){const e=this._items(),t=!this._suggestions?.length;return m`
      <div class="results" id="search-results" role="listbox" aria-label="${v("search.results")}">
        ${e.map((i,r)=>m`
          ${!t&&i.category&&i.category!==e[r-1]?.category?m`
            <h2 role="presentation">${v(`categories.${i.category}`)}</h2>
          `:""}
          <a id="search-result-${r}" role="option" tabindex="-1"
            aria-selected="${r===this._activeIndex}"
            href="${this._url(i)}"
            @mousemove="${()=>{this._activeIndex=r}}"
            @click="${s=>this._navigate(s,i)}">
            <span class="result-icon" aria-hidden="true">${i.hash?"#":"›"}</span>
            <span>
              ${i.parent?m`<small>${i.parent}</small>`:""}
              ${i.label?v(i.label):Ot(i.title)}
              ${i.url?m`
                <span role="img" aria-label="${v("search.externalLink")}"
                  title="${v("search.externalLink")}">
                  <svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5v5M14 2 7 9" />
                  </svg>
                </span>
              `:""}
            </span>
            <span class="enter" aria-hidden="true">↵</span>
          </a>
        `)}
      </div>
    `}render(){const e=this._items(),t=this._isMac?"⌘ K":"Ctrl K";return m`
      <button class="trigger ${this.compact?"compact":""}" type="button"
        aria-label="${v("search.placeholder")}" aria-haspopup="dialog"
        aria-keyshortcuts="${this._isMac?"Meta+K":"Control+K"}"
        title="${v("search.placeholder")} (${t})" @click="${this._show}">
        ${_n}
      </button>
      <dialog aria-label="${v("search.title")}" @cancel="${this._cancel}"
        @click="${this._clickBackdrop}" @keydown="${this._dialogKeydown}">
        <div class="search-bar">
          <label for="search-input">${_n}<span class="sr-only">${v("search.placeholder")}</span></label>
          <input id="search-input" type="search" role="combobox" aria-expanded="true"
            aria-autocomplete="list" aria-controls="search-results"
            aria-activedescendant="${e.length?`search-result-${this._activeIndex}`:""}"
            autocomplete="off" autocorrect="off" spellcheck="false"
            placeholder="${v("search.placeholder")}" .value="${this.value}"
            @input="${this._updateValue}" @keydown="${this._keydown}">
          <button class="close" type="button" @click="${this._close}">${v("search.close")}</button>
        </div>
        <div class="status" role="status">
          ${this._loading?v("search.loading"):this._error?v("search.error"):this._suggestions?.length?v("search.resultCount",{count:this._suggestions.length}):this._suggestions?v("search.noMatch"):v("search.recommendations")}
        </div>
        ${this._renderItems()}
        <footer>
          <span><kbd>↑</kbd><kbd>↓</kbd> ${v("search.navigate")}</span>
          <span><kbd>↵</kbd> ${v("search.select")}</span>
          <span><kbd>esc</kbd> ${v("search.dismiss")}</span>
        </footer>
      </dialog>
    `}}_(Be,"cName","app-quick-search"),_(Be,"properties",{value:{type:String},compact:{type:Boolean},_suggestions:{type:Array},_activeIndex:{type:Number},_loading:{type:Boolean},_error:{type:Boolean}});Be.styles=S`
  :host { display: block; }
  button, input { font: inherit; }
  button { cursor: pointer; }
  .trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: #546474;
    text-align: left;
    font-size: .9rem;
  }
  .trigger:hover { background: #f5f6f8; }
  .compact .shortcut { display: none; }
  svg { flex-shrink: 0; fill: currentColor; }
  .external-link-icon { fill: none; vertical-align: -.1em; }
  dialog {
    box-sizing: border-box;
    width: min(640px, calc(100% - 40px));
    max-height: min(680px, 80dvh);
    margin: 10vh auto 0;
    padding: 0;
    border: 1px solid #dce2e8;
    border-radius: 12px;
    background: #f5f6f8;
    color: #273849;
    box-shadow: 0 16px 64px #0005;
    overflow: hidden;
  }
  dialog[open] { display: flex; flex-direction: column; }
  dialog::backdrop { background: #182330b3; }
  .search-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    background: white;
    border-bottom: 1px solid #dce2e8;
  }
  label { display: flex; color: #81a2be; }
  input {
    min-width: 0;
    width: 100%;
    border: 0;
    background: transparent;
    color: inherit;
    font-size: 1.1rem;
    padding: 8px 0;
    outline: none;
  }
  .search-bar:focus-within { box-shadow: inset 0 -2px #81a2be; }
  .close {
    border: 1px solid #dce2e8;
    border-radius: 4px;
    background: white;
    color: inherit;
    padding: 5px 8px;
    font-size: .8rem;
  }
  .status { padding: 16px 18px 8px; font-size: .9rem; }
  .results { overflow-y: auto; min-height: 0; padding: 8px 12px 16px; }
  h2 { font-size: .8rem; margin: 12px 4px 8px; color: #546474; }
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    margin-bottom: 6px;
    border: 1px solid #e3e7ec;
    border-radius: 6px;
    background: white;
    color: inherit;
    text-decoration: none;
    font-size: .95rem;
  }
  a[aria-selected="true"] { background: #273849; color: white; border-color: #273849; }
  .result-icon { font-size: 1.3rem; color: #81a2be; }
  small { display: block; margin-bottom: 4px; opacity: .75; }
  .enter { margin-left: auto; }
  mark { font-weight: bold; background: transparent; color: inherit; text-decoration: underline; }
  footer {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 12px 16px;
    border-top: 1px solid #dce2e8;
    background: white;
    font-size: .75rem;
    color: #546474;
  }
  kbd { padding: 2px 4px; margin-right: 3px; border: 1px solid #dce2e8; border-radius: 3px; }
  button:focus-visible { outline: 2px solid #81a2be; outline-offset: 2px; }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  @media (max-width: 767px) {
    dialog {
      width: 100%;
      max-width: 100%;
      height: 100dvh;
      max-height: 100dvh;
      margin: 0;
      border: 0;
      border-radius: 0;
    }
    .results { flex: 1; }
    footer { padding-bottom: max(12px, env(safe-area-inset-bottom)); }
  }
`;class fi extends ${render(){return m`
      <select @change="${this._changeLang}">
        <option value="ru">ru</option>
        <option value="uk">uk</option>
      </select>
    `}_changeLang(e){const t=e.target.value,i=O.current().response;O.navigate({url:O.url({name:i.name,params:{...i.params,lang:t},query:i.location.query,hash:i.location.hash})})}}_(fi,"cName","app-lang-picker");const mo="/v6/assets/liqpay-BEspGQjK.svg",go="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAADkAQMAAAC2bMrzAAAABlBMVEX///8AAABVwtN+AAACK0lEQVRYw9XYMY7mIAyG4TeioOQIPgo3I8nNOApHoKSw8m1B5t+Z7VfrRSkiPWkibLANf21lSXqyAKemWTVxuyVJV1QdQAOoFFGU1N3uBVhcPTVaHkny0pO6UzWOZVrRVWmSZqV0qG73f6GaVVKSKJ3wCjSM0h300R9xFU13hg4v/ffzZ/4G03dZmtWLNPHS3a6fB2IwzdKi5QHV2cHTsYc3ckIqtDyOZQCgWZ2KPXBq8M806/OdU730JEHD7sA69pu+zuc0q8axOPY9GFGxBxposg86L3IOacdGSM26NYA0a5o1qXuRdMfWcWicC0rfYeNFTmPnZUzFrjzIoojS9/WddC8adgXVrAt78tAE8NKdCg2Onb8RdZ+EEkVpsmvRNI5Fy7qiql15NEzqSX3/VNKD3YqrO0TMS6cIkHoap/TkvQsBNete9rwVnfYZ7jQssGIPHMso8tL19oNPHsTVrFujQZIAQOpuV5YWgXXZvcy3ld0PttAKx6LB3gJKp8g511eGRlW7spL6Lp69vBmKhVV7siSlWSlKklOxK+srQwNqHqfGoZHmuxEOaYfNV1f+DxQab2w4+x4Upk+XGlMBsnw3VrtPsevT8UXUPQ0AqFL30gHsfnMwqA6gQZpVu+aHpAu7vs8Yo+mp0QCql3e65Sbp+uRgUM3DYdf8aVbplt5dCKwCnOr77uaU7gVhFWhZSdLEQZLGuXvEqPpOET8T5jTx3Vt9mzHG0pDrFxd5veytOF4pAAAAAElFTkSuQmCC",vo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAWCAMAAAAvk+g+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADPUExURQAAAPv7+/T09Lm5uf////z8/OLi4v7+/v39/QICAnt7e7S0tPDw8Pb29uvr63V1dRgYGKSkpNvb2+np6cDAwAgICOXl5VZWVsrKytXV1W5ubjMzM6enp/r6+sfHx+fn5/Ly8t/f38/Pz+7u7g4ODs3NzYWFhZmZmUFBQR4eHpGRkQUFBcTExLy8vJ2dndHR0To6Oq2trZKSktjY2BQUFKCgoICAgEhISI6OjrGwsSIiIltbW/79/i4uLiYmJk1NTaqqqpaWlmZmZmFhYYmJiVdCR2MAAAM3SURBVEjHvdbZkqJKEAbgH6EqM1EEUXBFcBC13fe1215m3v+ZzkWrrSfOuZmI7rygCCqivoDgryzQrXI5pu8vXG/U5KU5VkRkqJ8BwyfgXKao9doIfwQ0AUiF3wWw+QdAXgAQ0w8ANJ1vBjlr9AtjAFI7AEDV+IuF6psaWdZ/TvG4tCLrDoyPgF14Baq5NwDY/M0nNVH6X3CIinUP1gSQTrjfhyoToJpGyRfJD8PdKs+XZ8x8Adki67OILhciIouW/wIzAFIj9t/y4eH3sjzeHfuXbMymtaxnT6L21m4zcbqw3VaZKZ7mO+/uMiRSeuNu8zkmE5vx1p5ERMnkT2OfMTnTabnk/lkRLVHhaDGd8AVMXwDpqMUacs5ItbsAOp9gHoPAw8jtrmUdUriTblfmPvmYH59Efkf864h1gN8pmWiOPMi7Uo3RfC6jCicIBl4gzZSHqBglnNLbTzN+kr1TAgAMCtEJAFZXsOoXP9DQ8Ssy3sq2XN6jYfh4aRdqI6TODptUf2BDJk6r1AyCjqrNIuOABieQfOo3seIhJpVgEN/FothJ+gIAwCQXABg4V7DF9A6T2EaWdBESFb2g7MNlFT0hXcnAIZ5hp0yUFLOLCetp722MKiXwjGd2UaelbL3ziu9zqBsXDyfnQ3DM+AYS9WEy2ciKIgmR8yLah0usjkgzOTFRB0fDRImJ9pKPmyO3N5cqF+AZxDbqtBTIuq7uQL959YBJvCnp6376AEYD1Cyq45z4cInUGWkYPIXEeWmwib4i51XaFbEjnqHKCTyDyEadhti1Rrvi8w10ql8eXkL+ysADaB2k2XqbS4luIPeketh4ozab6A7zDcwLNTnpdIGqKsBTlmWjzkNMop7Yzg2s4756d5nLo0Xch8lso0bRxoN0351P0DiiyIUegPOByIT7Cmn+YqeHrtf4fENl0SdY4XSAt2ssqP0ABsUvMNUpU1EXiGKdEBvlLIuJyNExkdLaYVK6NkvZslKd5mZZgUgZflvndMiG1mRRrHNc1glzrLW6gnr9IK6+vT3xonvnyQ/0Qw7b7bqfTZsCoKd+oAEzET0zp/mPaut7jzZ4bAFEz0TWd4L/AJltcxCN1O75AAAAAElFTkSuQmCC",bo="/v6/assets/monobank-qrcode-D2EIVs4s.svg",Xt={liqpay:{icon:mo,image:go},mono:{icon:vo,image:bo}},dt=Object.keys(Xt);function yo(n){const e=Xt[n];if(!e)return console.warn(`Cannot find configuration for ${n} payment option`),null;let t;return e.image&&(t=m`<img src="${e.image}">`),m`<div class="selected">${t}</div>`}class He extends ${constructor(){super(),this.selected=""}connectedCallback(){super.connectedCallback(),dt.length===1&&(this.selected=dt[0])}_setSelected({target:e}){if(e.tagName!=="IMG"){this.selected="";return}this.selected=e.getAttribute("data-name")}render(){return m`
      <div class="options" @click=${this._setSelected}>
        ${dt.map(e=>m`
          <img src="${Xt[e].icon}" alt="${v(`payment.${e}`)}" data-name="${e}">
        `)}
      </div>
      ${this.selected?yo(this.selected):""}
    `}}_(He,"cName","one-time-donations"),_(He,"properties",{selected:{type:String}});He.styles=S`
  .options {
    margin: 20px 0;
  }

  .options img {
    margin: 10px;
    cursor: pointer
  }

  .selected {
    text-align: center;
  }
`;class We extends ${constructor(){super(),this.items=null,this.type="page",this.categories=null}render(){const e=this.categories||Object.keys(this.items);return m`
      <nav>
        ${e.map(t=>m`
          <h3>${v(`categories.${t}`)}</h3>
          <ul>
            ${this.items[t].map(i=>m`
              <li><app-link nav to="${this.type}" .params="${i}">${i.title}</app-link></li>
            `)}
          </ul>
        `)}
      </nav>
    `}}_(We,"cName","pages-by-categories"),_(We,"properties",{items:{type:Object},type:{type:String},categories:{type:Array}});We.styles=S`
  :host {
    display: block;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  nav > h3:first-child {
    margin-top: 0;
  }

  li {
    margin-top: 8px;
  }
`;class Ke extends ${constructor(){super(),this.type="info",this.message=""}render(){return m`${G(this.message)}`}}_(Ke,"cName","app-notification"),_(Ke,"properties",{type:{type:String},message:{type:String}});Ke.styles=S`
  :host {
    display: block;
    background: rgb(29, 31, 33);
    border-radius: 7px;
    padding: 1rem;
    color: #fff;
    cursor: pointer;
  }

  a {
    color: inherit;
  }
`;var mi=function(n,e,t){return n.addEventListener(e,t,!1),function(){return n.removeEventListener(e,t,!1)}};try{var wo=Object.defineProperty({},"passive",{get:function(){return mi=function(n,e,t){return n.addEventListener(e,t,{passive:!0}),function(){return n.removeEventListener(e,t,{passive:!0})}},!0}});window.addEventListener("test",null,wo)}catch{}var se=function(n,e,t){return mi(n,e,t)},xo=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(n){return setTimeout(n,1e3/60)},_o=window.document.documentElement,gi=function(){for(var n=["Webkit","Khtml","Moz","ms","O"],e=0;e<n.length;e++)if(n[e]+"Opacity"in _o.style)return"-"+n[e].toLowerCase()+"-";return""}();function K(n,e,t){n.style[gi+e]=t}var ut=window.navigator.msPointerEnabled,ko=window.document.documentElement,ke={start:ut?"MSPointerDown":"touchstart",move:ut?"MSPointerMove":"touchmove",end:ut?"MSPointerUp":"touchend",cancel:"touchcancel"},J={end:"webkitTransitionEnd"in ko.style?"webkitTransitionEnd":"transitionend"},vi=window.document,oe=vi.documentElement,pt=!1,So=function(){function n(t){t===void 0&&(t={}),this.panel=t.panel,this.menu=t.menu,this.t=t.eventsEmitter||this.panel,this.i=0,this.s=0,this.o=!1,this.h=!1,this.u=!1,this.l=!1,this.v=t.touch===void 0||!!t.touch,this.p=t.side||"left",this.m=t.easing||"ease",this.M=parseInt(t.duration,10)||300,this.T=parseInt(t.tolerance,10)||70,this.g=parseInt(t.padding,10)||.8*window.innerWidth,this.k=this.g,this.I=this.p==="right"?-1:1,this.k*=this.I,this.O(),this.v&&(this.P(),this.v=this.v!=="manual")}var e=n.prototype;return e.O=function(){var t=this.panel.classList,i=this.menu.classList;t.contains("slideout-panel")||t.add("slideout-panel"),t.contains("slideout-panel-"+this.p)||t.add("slideout-panel-"+this.p),i.contains("slideout-menu")||i.add("slideout-menu"),i.contains("slideout-menu-"+this.p)||i.add("slideout-menu-"+this.p)},e.S=function(t){return this.t.dispatchEvent(new window.CustomEvent(t)),this},e.on=function(t,i,r){var s=this;return this.t.addEventListener(t,i,r),function(){return s.t.removeEventListener(t,i,r)}},e.open=function(){this.S("beforeopen"),oe.classList.contains("slideout-open")||oe.classList.add("slideout-open"),this.X(),this.j(this.k),this.u=!0;var t=this;return this.panel.addEventListener(J.end,function i(){t.panel.removeEventListener(J.end,i),K(t.panel,"transition",""),t.S("open")}),this},e.close=function(){if(!this.isOpen()&&!this.o)return this;this.S("beforeclose"),this.X(),this.j(0),this.u=!1;var t=this;return this.panel.addEventListener(J.end,function i(){t.panel.removeEventListener(J.end,i),oe.classList.remove("slideout-open"),K(t.panel,"transition",""),K(t.panel,"transform",""),t.S("close")}),this},e.toggle=function(){return this.isOpen()?this.close():this.open()},e.isOpen=function(){return this.u},e.j=function(t){this.s=t,K(this.panel,"transform","translateX("+t+"px)")},e.X=function(){K(this.panel,"transition",gi+"transform "+this.M+"ms "+this.m)},e.P=function(){var t,i,r,s,a,l,o=this,c=function(){pt=!1};this.D=(r=function(){o.h||(clearTimeout(t),pt=!0,t=setTimeout(c,250))},a=!1,l=function(){r.call(i,s),a=!1},se(i=vi,"scroll",function(u){s=u,a||(xo(l),a=!0)})),this.K=se(this.panel,ke.start,function(u){u.touches!==void 0&&(o.h=!1,o.o=!1,o.i=u.touches[0].pageX,o.l=!o.v||!o.isOpen()&&o.menu.clientWidth!==0)}),this.U=se(this.panel,ke.cancel,function(){o.h=!1,o.o=!1}),this.W=se(this.panel,ke.end,function(){if(o.h)if(o.S("translateend"),o.o&&Math.abs(o.s)>o.T)o.open();else if(o.k-Math.abs(o.s)<=o.T/2){o.X(),o.j(o.k);var u=o;o.panel.addEventListener(J.end,function d(){this.panel.removeEventListener(J.end,d),K(u.panel,"transition","")})}else o.close();o.h=!1}),this.q=se(this.panel,ke.move,function(u){if(!(pt||o.l||u.touches===void 0||function(g){for(var h=g;h.parentNode;){if(h.getAttribute("data-slideout-ignore")!==null)return h;h=h.parentNode}return null}(u.target))){var d=u.touches[0].clientX-o.i,p=d;if(o.s=d,!(Math.abs(p)>o.g||Math.abs(d)<=20)){o.o=!0;var f=d*o.I;o.u&&f>0||!o.u&&f<0||(o.h||o.S("translatestart"),f<=0&&(p=d+o.g*o.I,o.o=!1),o.h&&oe.classList.contains("slideout-open")||oe.classList.add("slideout-open"),K(o.panel,"transform","translateX("+p+"px)"),o.S("translate",p),o.h=!0)}}})},e.enableTouch=function(){return this.v=!0,this},e.disableTouch=function(){return this.v=!1,this},e.destroy=function(){this.close(),this.K(),this.U(),this.W(),this.q(),this.D()},n}();class Xe extends ${constructor(){super(),this._drawer=null,this.isOpen=!1,this.disabled=!1,this._scrollTop=0}open(){this.isOpen=!0}close(){this.isOpen=!1}toggle(){this.isOpen=!this.isOpen}_createDrawer(){const[e,t]=this.shadowRoot.children;this._drawer=new So({menu:e,panel:t,eventsEmitter:this,padding:270,touch:!1});const i=()=>this._drawer.close();this._drawer.on("beforeopen",()=>{this.isOpen=!0,this._scrollTop=window.pageYOffset,e.classList.add("open"),t.style.top=`${-this._scrollTop}px`,t.addEventListener("mousedown",i,!1),t.addEventListener("touchstart",i,!1),window.scroll(0,0)}),this._drawer.on("close",()=>{this.isOpen=!1,e.classList.remove("open"),t.style.top="",window.scroll(0,this._scrollTop),t.removeEventListener("mousedown",i,!1),t.removeEventListener("touchstart",i,!1)})}updated(e){if(this._drawer||this._createDrawer(),this.isOpen!==this._drawer.isOpen()){const t=this.isOpen?"open":"close";this._drawer[t]()}if(e.has("disabled")){const t=this.disabled?"disableTouch":"enableTouch";this._drawer[t]()}}disconnectedCallback(){super.disconnectedCallback(),this._drawer.destroy(),this._drawer=null}render(){return m`
      <div class="menu">
        <slot name="menu"></slot>
      </div>
      <div class="panel">
        <slot></slot>
      </div>
    `}}_(Xe,"cName","menu-drawer"),_(Xe,"properties",{isOpen:{type:Boolean},disabled:{type:Boolean}});Xe.styles=S`
  :host {
    display: block;
  }

  .menu {
    display: none;
    padding: 10px;
    width: 256px;
    min-height: 100vh;
    -webkit-overflow-scrolling: touch;
  }

  .panel {
    position: relative;
    z-index: 10;
    will-change: transform;
    min-height: 100vh;
    background: #fff;
  }

  .panel::before {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 6000;
    background-color: transparent;
    transition: background-color .2s ease-in-out;
  }

  .menu.open {
    display: block;
  }

  .menu.open + .panel {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
    min-height: 100%;
    z-index: 10;
    box-shadow: 0 0 20px rgba(0,0,0,.5);
  }

  .menu.open + .panel::before {
    content: '';
    background-color: rgba(0, 0, 0, .5);
  }
`;function Gt(){return"v6"}async function bi(){return(await ce("/versions.txt",{format:"txtArrayJSON",cache:!0})).body}function yi(n){return window.location.href.replace(`/${Gt()}/`,`/${n}/`)}function Ao(n){window.location.href=yi(n.target.value)}class Qt extends ${constructor(){super(),this._versions=[],this._currentVersion=Gt(),this._currentVersion&&this._versions.push({number:this._currentVersion})}async connectedCallback(){super.connectedCallback();const e=await bi();this._versions=e.slice(0).reverse(),this.requestUpdate()}render(){return m`
      <select @change=${Ao}>
        ${this._versions.map(e=>m`
          <option .selected=${e.number===this._currentVersion}>${e.number}</option>
        `)}
      </select>
    `}}_(Qt,"cName","versions-select");Qt.styles=S`
  :host {
    display: inline-block;
  }

  select {
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: rgb(68, 68, 68);
    line-height: 1.3;
    padding-left: 0.5em;
    padding-right: 1.1em;
    box-sizing: border-box;
    margin: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23444444%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    background-position: right .5em top 50%;
    background-size: .5em auto;
    border: 0;
    cursor: pointer;
  }

  /* Hide arrow icon in IE browsers */
  select::-ms-expand {
    display: none;
  }

  select:focus {
    outline: none;
  }
`;class Yt extends ${constructor(){super(),this._versions=[],this._currentVersion=Gt()}async connectedCallback(){super.connectedCallback(),this._unwatchRouter=O.observe(()=>this.requestUpdate()),this._versions=await bi(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}render(){const e=this._versions[this._versions.length-1];return!e||e.number===this._currentVersion?m``:m`
      <div class="alert alert-warning">
        ${G("oldVersionAlert",{latestVersion:e.number,currentVersion:this._currentVersion,latestVersionUrl:yi(e.number)})}
      </div>
    `}}_(Yt,"cName","old-version-alert");Yt.styles=[Ye,xr,S`
    a {
      color: inherit;
    }
  `];const Eo=[Ne,Ce,zt,Te,Fe,Pe,Le,Ut,Re,ze,Me,Bt,Ve,De,Kt,qe,Be,fi,Ue,We,He,Ke,Xe,Qt,Yt];function Co(n){const e=document.querySelector(n);return Eo.forEach(t=>customElements.define(t.cName,t)),O.observe(async t=>{const i=t.response.params.lang||Un;be()!==i&&(await vr(i),e.ready=!0),Ys(t)}),e}const{navigator:me,location:ue}=window,$o=ue.hostname==="localhost"||ue.hostname==="[::1]"||ue.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),To="serviceWorker"in me,ne=(...n)=>console.log(...n);function Fo(n,e){n&&(n.onstatechange=()=>{ne("new worker state",n.state),n.state==="installed"&&(me.serviceWorker.controller?(ne("New content is available and will be used when all tabs for this page are closed."),e&&e.onUpdate&&e.onUpdate(n)):(ne("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(n)))})}function kn(n,e){let t=!1;return me.serviceWorker.addEventListener("controllerchange",()=>{t||(t=!0,ue.reload())}),me.serviceWorker.register(n).then(i=>{ne("service worker is registered"),i.onupdatefound=()=>Fo(i.installing,e)}).catch(i=>{console.error("Error during service worker registration:",i)})}function No(n){To&&window.addEventListener("load",()=>{const e="/v6/sw.js";$o?fetch(e,{headers:{"Service-Worker":"script"}}).then(t=>{const i=t.headers.get("content-type")||"";t.status===404||i.indexOf("javascript")===-1?(ne("Service worker not found"),me.serviceWorker.ready.then(r=>r.unregister()).then(()=>ue.reload())):kn(e,n)}).catch(()=>{ne("No internet connection found. App is running in offline mode.")}):kn(e,n)})}window.__isAppExecuted__=!0;Sr();const Oo=Co("casl-docs");No({onUpdate(n){Oo.notify("updateAvailable",{onClick(){n.postMessage({type:"SKIP_WAITING"})}})}});window.onShareThisLoaded=()=>{window.__sharethis__.config["sticky-share-buttons"].id="share-buttons"};
//# sourceMappingURL=index-xFSAV2hv.js.map
