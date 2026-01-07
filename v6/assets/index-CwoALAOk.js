var pr=Object.defineProperty;var fr=(t,e,n)=>e in t?pr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var x=(t,e,n)=>fr(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();/**
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
 */const Yt=typeof window<"u"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0,gr=(t,e,n=null,r=null)=>{for(;e!==n;){const i=e.nextSibling;t.insertBefore(e,r),e=i}},Nt=(t,e,n=null)=>{for(;e!==n;){const r=e.nextSibling;t.removeChild(e),e=r}};/**
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
 */const V=`{{lit-${String(Math.random()).slice(2)}}}`,Sn=`<!--${V}-->`,en=new RegExp(`${V}|${Sn}`),ae="$lit$";class En{constructor(e,n){this.parts=[],this.element=n;const r=[],i=[],s=document.createTreeWalker(n.content,133,null,!1);let a=0,c=-1,o=0;const{strings:u,values:{length:l}}=e;for(;o<l;){const d=s.nextNode();if(d===null){s.currentNode=i.pop();continue}if(c++,d.nodeType===1){if(d.hasAttributes()){const h=d.attributes,{length:f}=h;let g=0;for(let p=0;p<f;p++)tn(h[p].name,ae)&&g++;for(;g-- >0;){const p=u[o],_=gt.exec(p)[2],b=_.toLowerCase()+ae,m=d.getAttribute(b);d.removeAttribute(b);const v=m.split(en);this.parts.push({type:"attribute",index:c,name:_,strings:v}),o+=v.length-1}}d.tagName==="TEMPLATE"&&(i.push(d),s.currentNode=d.content)}else if(d.nodeType===3){const h=d.data;if(h.indexOf(V)>=0){const f=d.parentNode,g=h.split(en),p=g.length-1;for(let _=0;_<p;_++){let b,m=g[_];if(m==="")b=q();else{const v=gt.exec(m);v!==null&&tn(v[2],ae)&&(m=m.slice(0,v.index)+v[1]+v[2].slice(0,-ae.length)+v[3]),b=document.createTextNode(m)}f.insertBefore(b,d),this.parts.push({type:"node",index:++c})}g[p]===""?(f.insertBefore(q(),d),r.push(d)):d.data=g[p],o+=p}}else if(d.nodeType===8)if(d.data===V){const h=d.parentNode;(d.previousSibling===null||c===a)&&(c++,h.insertBefore(q(),d)),a=c,this.parts.push({type:"node",index:c}),d.nextSibling===null?d.data="":(r.push(d),c--),o++}else{let h=-1;for(;(h=d.data.indexOf(V,h+1))!==-1;)this.parts.push({type:"node",index:-1}),o++}}for(const d of r)d.parentNode.removeChild(d)}}const tn=(t,e)=>{const n=t.length-e.length;return n>=0&&t.slice(n)===e},Cn=t=>t.index!==-1,q=()=>document.createComment(""),gt=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;/**
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
 */const $t=133;function Fn(t,e){const{element:{content:n},parts:r}=t,i=document.createTreeWalker(n,$t,null,!1);let s=ce(r),a=r[s],c=-1,o=0;const u=[];let l=null;for(;i.nextNode();){c++;const d=i.currentNode;for(d.previousSibling===l&&(l=null),e.has(d)&&(u.push(d),l===null&&(l=d)),l!==null&&o++;a!==void 0&&a.index===c;)a.index=l!==null?-1:a.index-o,s=ce(r,s),a=r[s]}u.forEach(d=>d.parentNode.removeChild(d))}const mr=t=>{let e=t.nodeType===11?0:1;const n=document.createTreeWalker(t,$t,null,!1);for(;n.nextNode();)e++;return e},ce=(t,e=-1)=>{for(let n=e+1;n<t.length;n++){const r=t[n];if(Cn(r))return n}return-1};function vr(t,e,n=null){const{element:{content:r},parts:i}=t;if(n==null){r.appendChild(e);return}const s=document.createTreeWalker(r,$t,null,!1);let a=ce(i),c=0,o=-1;for(;s.nextNode();)for(o++,s.currentNode===n&&(c=mr(e),n.parentNode.insertBefore(e,n));a!==-1&&i[a].index===o;){if(c>0){for(;a!==-1;)i[a].index+=c,a=ce(i,a);return}a=ce(i,a)}}/**
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
 */const Tn=new WeakMap,ye=t=>(...e)=>{const n=t(...e);return Tn.set(n,!0),n},fe=t=>typeof t=="function"&&Tn.has(t);/**
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
 */const j={},nn={};/**
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
 */class Ee{constructor(e,n,r){this.__parts=[],this.template=e,this.processor=n,this.options=r}update(e){let n=0;for(const r of this.__parts)r!==void 0&&r.setValue(e[n]),n++;for(const r of this.__parts)r!==void 0&&r.commit()}_clone(){const e=Yt?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),n=[],r=this.template.parts,i=document.createTreeWalker(e,133,null,!1);let s=0,a=0,c,o=i.nextNode();for(;s<r.length;){if(c=r[s],!Cn(c)){this.__parts.push(void 0),s++;continue}for(;a<c.index;)a++,o.nodeName==="TEMPLATE"&&(n.push(o),i.currentNode=o.content),(o=i.nextNode())===null&&(i.currentNode=n.pop(),o=i.nextNode());if(c.type==="node"){const u=this.processor.handleTextExpression(this.options);u.insertAfterNode(o.previousSibling),this.__parts.push(u)}else this.__parts.push(...this.processor.handleAttributeExpressions(o,c.name,c.strings,this.options));s++}return Yt&&(document.adoptNode(e),customElements.upgrade(e)),e}}/**
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
 */const rn=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),yr=` ${V} `;class Ce{constructor(e,n,r,i){this.strings=e,this.values=n,this.type=r,this.processor=i}getHTML(){const e=this.strings.length-1;let n="",r=!1;for(let i=0;i<e;i++){const s=this.strings[i],a=s.lastIndexOf("<!--");r=(a>-1||r)&&s.indexOf("-->",a+1)===-1;const c=gt.exec(s);c===null?n+=s+(r?yr:Sn):n+=s.substr(0,c.index)+c[1]+c[2]+ae+c[3]+V}return n+=this.strings[e],n}getTemplateElement(){const e=document.createElement("template");let n=this.getHTML();return rn!==void 0&&(n=rn.createHTML(n)),e.innerHTML=n,e}}/**
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
 */const Ge=t=>t===null||!(typeof t=="object"||typeof t=="function"),mt=t=>Array.isArray(t)||!!(t&&t[Symbol.iterator]);class On{constructor(e,n,r){this.dirty=!0,this.element=e,this.name=n,this.strings=r,this.parts=[];for(let i=0;i<r.length-1;i++)this.parts[i]=this._createPart()}_createPart(){return new Pt(this)}_getValue(){const e=this.strings,n=e.length-1,r=this.parts;if(n===1&&e[0]===""&&e[1]===""){const s=r[0].value;if(typeof s=="symbol")return String(s);if(typeof s=="string"||!mt(s))return s}let i="";for(let s=0;s<n;s++){i+=e[s];const a=r[s];if(a!==void 0){const c=a.value;if(Ge(c)||!mt(c))i+=typeof c=="string"?c:String(c);else for(const o of c)i+=typeof o=="string"?o:String(o)}}return i+=e[n],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class Pt{constructor(e){this.value=void 0,this.committer=e}setValue(e){e!==j&&(!Ge(e)||e!==this.value)&&(this.value=e,fe(e)||(this.committer.dirty=!0))}commit(){for(;fe(this.value);){const e=this.value;this.value=j,e(this)}this.value!==j&&this.committer.commit()}}class Q{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(q()),this.endNode=e.appendChild(q())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=q()),e.__insert(this.endNode=q())}insertAfterPart(e){e.__insert(this.startNode=q()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(this.startNode.parentNode===null)return;for(;fe(this.__pendingValue);){const n=this.__pendingValue;this.__pendingValue=j,n(this)}const e=this.__pendingValue;e!==j&&(Ge(e)?e!==this.value&&this.__commitText(e):e instanceof Ce?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):mt(e)?this.__commitIterable(e):e===nn?(this.value=nn,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const n=this.startNode.nextSibling;e=e??"";const r=typeof e=="string"?e:String(e);n===this.endNode.previousSibling&&n.nodeType===3?n.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const n=this.options.templateFactory(e);if(this.value instanceof Ee&&this.value.template===n)this.value.update(e.values);else{const r=new Ee(n,e.processor,this.options),i=r._clone();r.update(e.values),this.__commitNode(i),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const n=this.value;let r=0,i;for(const s of e)i=n[r],i===void 0&&(i=new Q(this.options),n.push(i),r===0?i.appendIntoPart(this):i.insertAfterPart(n[r-1])),i.setValue(s),i.commit(),r++;r<n.length&&(n.length=r,this.clear(i&&i.endNode))}clear(e=this.startNode){Nt(this.startNode.parentNode,e.nextSibling,this.endNode)}}class br{constructor(e,n,r){if(this.value=void 0,this.__pendingValue=void 0,r.length!==2||r[0]!==""||r[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=n,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;fe(this.__pendingValue);){const n=this.__pendingValue;this.__pendingValue=j,n(this)}if(this.__pendingValue===j)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=j}}class wr extends On{constructor(e,n,r){super(e,n,r),this.single=r.length===2&&r[0]===""&&r[1]===""}_createPart(){return new _r(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _r extends Pt{}let Nn=!1;(()=>{try{const t={get capture(){return Nn=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch{}})();class xr{constructor(e,n,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=n,this.eventContext=r,this.__boundHandleEvent=i=>this.handleEvent(i)}setValue(e){this.__pendingValue=e}commit(){for(;fe(this.__pendingValue);){const s=this.__pendingValue;this.__pendingValue=j,s(this)}if(this.__pendingValue===j)return;const e=this.__pendingValue,n=this.value,r=e==null||n!=null&&(e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive),i=e!=null&&(n==null||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=kr(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=j}handleEvent(e){typeof this.value=="function"?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const kr=t=>t&&(Nn?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);/**
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
 */function Ar(t){let e=ge.get(t.type);e===void 0&&(e={stringsArray:new WeakMap,keyString:new Map},ge.set(t.type,e));let n=e.stringsArray.get(t.strings);if(n!==void 0)return n;const r=t.strings.join(V);return n=e.keyString.get(r),n===void 0&&(n=new En(t,t.getTemplateElement()),e.keyString.set(r,n)),e.stringsArray.set(t.strings,n),n}const ge=new Map;/**
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
 */const te=new WeakMap,Sr=(t,e,n)=>{let r=te.get(e);r===void 0&&(Nt(e,e.firstChild),te.set(e,r=new Q(Object.assign({templateFactory:Ar},n))),r.appendInto(e)),r.setValue(t),r.commit()};/**
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
 */class Er{handleAttributeExpressions(e,n,r,i){const s=n[0];return s==="."?new wr(e,n.slice(1),r).parts:s==="@"?[new xr(e,n.slice(1),i.eventContext)]:s==="?"?[new br(e,n.slice(1),r)]:new On(e,n,r).parts}handleTextExpression(e){return new Q(e)}}const Cr=new Er;/**
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
 */typeof window<"u"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const y=(t,...e)=>new Ce(t,e,"html",Cr);/**
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
 */const $n=(t,e)=>`${t}--${e}`;let Fe=!0;typeof window.ShadyCSS>"u"?Fe=!1:typeof window.ShadyCSS.prepareTemplateDom>"u"&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Fe=!1);const Fr=t=>e=>{const n=$n(e.type,t);let r=ge.get(n);r===void 0&&(r={stringsArray:new WeakMap,keyString:new Map},ge.set(n,r));let i=r.stringsArray.get(e.strings);if(i!==void 0)return i;const s=e.strings.join(V);if(i=r.keyString.get(s),i===void 0){const a=e.getTemplateElement();Fe&&window.ShadyCSS.prepareTemplateDom(a,t),i=new En(e,a),r.keyString.set(s,i)}return r.stringsArray.set(e.strings,i),i},Tr=["html","svg"],Or=t=>{Tr.forEach(e=>{const n=ge.get($n(e,t));n!==void 0&&n.keyString.forEach(r=>{const{element:{content:i}}=r,s=new Set;Array.from(i.querySelectorAll("style")).forEach(a=>{s.add(a)}),Fn(r,s)})})},Pn=new Set,Nr=(t,e,n)=>{Pn.add(t);const r=n?n.element:document.createElement("template"),i=e.querySelectorAll("style"),{length:s}=i;if(s===0){window.ShadyCSS.prepareTemplateStyles(r,t);return}const a=document.createElement("style");for(let u=0;u<s;u++){const l=i[u];l.parentNode.removeChild(l),a.textContent+=l.textContent}Or(t);const c=r.content;n?vr(n,a,c.firstChild):c.insertBefore(a,c.firstChild),window.ShadyCSS.prepareTemplateStyles(r,t);const o=c.querySelector("style");if(window.ShadyCSS.nativeShadow&&o!==null)e.insertBefore(o.cloneNode(!0),e.firstChild);else if(n){c.insertBefore(a,c.firstChild);const u=new Set;u.add(a),Fn(n,u)}},$r=(t,e,n)=>{if(!n||typeof n!="object"||!n.scopeName)throw new Error("The `scopeName` option is required.");const r=n.scopeName,i=te.has(e),s=Fe&&e.nodeType===11&&!!e.host,a=s&&!Pn.has(r),c=a?document.createDocumentFragment():e;if(Sr(t,c,Object.assign({templateFactory:Fr(r)},n)),a){const o=te.get(c);te.delete(c);const u=o.value instanceof Ee?o.value.template:void 0;Nr(r,c,u),Nt(e,e.firstChild),e.appendChild(c),te.set(e,o)}!i&&s&&window.ShadyCSS.styleElement(e.host)};/**
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
 */var Ln;window.JSCompiler_renameProperty=(t,e)=>t;const vt={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return t!==null;case Number:return t===null?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},zn=(t,e)=>e!==t&&(e===e||t===t),Ze={attribute:!0,type:String,converter:vt,reflect:!1,hasChanged:zn},Je=1,Ye=4,et=8,tt=16,yt="finalized";class In extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((n,r)=>{const i=this._attributeNameForProperty(r,n);i!==void 0&&(this._attributeToPropertyMap.set(i,r),e.push(i))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;e!==void 0&&e.forEach((n,r)=>this._classProperties.set(r,n))}}static createProperty(e,n=Ze){if(this._ensureClassProperties(),this._classProperties.set(e,n),n.noAccessor||this.prototype.hasOwnProperty(e))return;const r=typeof e=="symbol"?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,r,n);i!==void 0&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,n,r){return{get(){return this[n]},set(i){const s=this[e];this[n]=i,this.requestUpdateInternal(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Ze}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(yt)||e.finalize(),this[yt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const n=this.properties,r=[...Object.getOwnPropertyNames(n),...typeof Object.getOwnPropertySymbols=="function"?Object.getOwnPropertySymbols(n):[]];for(const i of r)this.createProperty(i,n[i])}}static _attributeNameForProperty(e,n){const r=n.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}static _valueHasChanged(e,n,r=zn){return r(e,n)}static _propertyValueFromAttribute(e,n){const r=n.type,i=n.converter||vt,s=typeof i=="function"?i:i.fromAttribute;return s?s(e,r):e}static _propertyValueToAttribute(e,n){if(n.reflect===void 0)return;const r=n.type,i=n.converter;return(i&&i.toAttribute||vt.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,n)=>{if(this.hasOwnProperty(n)){const r=this[n];delete this[n],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(n,r)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,n)=>this[n]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){this._enableUpdatingResolver!==void 0&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,n,r){n!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,n,r=Ze){const i=this.constructor,s=i._attributeNameForProperty(e,r);if(s!==void 0){const a=i._propertyValueToAttribute(n,r);if(a===void 0)return;this._updateState=this._updateState|et,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._updateState=this._updateState&~et}}_attributeToProperty(e,n){if(this._updateState&et)return;const r=this.constructor,i=r._attributeToPropertyMap.get(e);if(i!==void 0){const s=r.getPropertyOptions(i);this._updateState=this._updateState|tt,this[i]=r._propertyValueFromAttribute(n,s),this._updateState=this._updateState&~tt}}requestUpdateInternal(e,n,r){let i=!0;if(e!==void 0){const s=this.constructor;r=r||s.getPropertyOptions(e),s._valueHasChanged(this[e],n,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,n),r.reflect===!0&&!(this._updateState&tt)&&(this._reflectingProperties===void 0&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,n){return this.requestUpdateInternal(e,n),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|Ye;try{await this._updatePromise}catch{}const e=this.performUpdate();return e!=null&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&Ye}get hasUpdated(){return this._updateState&Je}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const n=this._changedProperties;try{e=this.shouldUpdate(n),e?this.update(n):this._markUpdated()}catch(r){throw e=!1,this._markUpdated(),r}e&&(this._updateState&Je||(this._updateState=this._updateState|Je,this.firstUpdated(n)),this.updated(n))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Ye}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){this._reflectingProperties!==void 0&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((n,r)=>this._propertyToAttribute(r,this[r],n)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Ln=yt;In[Ln]=!0;/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const bt=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Lt=Symbol();class zt{constructor(e,n){if(n!==Lt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return this._styleSheet===void 0&&(bt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const jn=t=>new zt(String(t),Lt),Pr=t=>{if(t instanceof zt)return t.cssText;if(typeof t=="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)},E=(t,...e)=>{const n=e.reduce((r,i,s)=>r+Pr(i)+t[s+1],t[0]);return new zt(n,Lt)};/**
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
 */(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const sn={};class F extends In{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const n=(s,a)=>s.reduceRight((c,o)=>Array.isArray(o)?n(o,c):(c.add(o),c),a),r=n(e,new Set),i=[];r.forEach(s=>i.unshift(s)),this._styles=i}else this._styles=e===void 0?[]:[e];this._styles=this._styles.map(n=>{if(n instanceof CSSStyleSheet&&!bt){const r=Array.prototype.slice.call(n.cssRules).reduce((i,s)=>i+s.cssText,"");return jn(r)}return n})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;e.length!==0&&(window.ShadyCSS!==void 0&&!window.ShadyCSS.nativeShadow?window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(n=>n.cssText),this.localName):bt?this.renderRoot.adoptedStyleSheets=e.map(n=>n instanceof CSSStyleSheet?n:n.styleSheet):this._needsShimAdoptedStyleSheets=!0)}connectedCallback(){super.connectedCallback(),this.hasUpdated&&window.ShadyCSS!==void 0&&window.ShadyCSS.styleElement(this)}update(e){const n=this.render();super.update(e),n!==sn&&this.constructor.render(n,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(r=>{const i=document.createElement("style");i.textContent=r.cssText,this.renderRoot.appendChild(i)}))}render(){return sn}}F.finalized=!0;F.render=$r;/**
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
 */const on=new WeakMap,an=ye(t=>e=>{if(!(e instanceof Q))throw new Error("cache can only be used in text bindings");let n=on.get(e);n===void 0&&(n=new WeakMap,on.set(e,n));const r=e.value;if(r instanceof Ee)if(t instanceof Ce&&r.template===e.options.templateFactory(t)){e.setValue(t);return}else{let i=n.get(r.template);i===void 0&&(i={instance:r,nodes:document.createDocumentFragment()},n.set(r.template,i)),gr(i.nodes,e.startNode.nextSibling,e.endNode)}if(t instanceof Ce){const i=e.options.templateFactory(t),s=n.get(i);s!==void 0&&(e.setValue(s.nodes),e.commit(),e.value=s.instance)}e.setValue(t)});var Lr=[{name:"learn",route:!1,children:[{heading:"docs"},{name:"guide",page:"guide/intro"},{name:"api"},{name:"examples",url:"https://github.com/stalniy/casl-examples"},{name:"cookbook",page:"cookbook/intro"}]},{name:"ecosystem",route:!1,children:[{heading:"packages"},{name:"pkg-prisma",page:"package/casl-prisma"},{name:"pkg-mongoose",page:"package/casl-mongoose"},{name:"pkg-angular",page:"package/casl-angular"},{name:"pkg-react",page:"package/casl-react"},{name:"pkg-vue",page:"package/casl-vue"},{name:"pkg-aurelia",page:"package/casl-aurelia"},{heading:"help"},{name:"questions",url:"https://stackoverflow.com/questions/tagged/casl"},{name:"chat",url:"https://github.com/stalniy/casl/discussions"},{heading:"news"},{name:"blog",url:"https://sergiy-stotskiy.medium.com"}]},{name:"support"}],zr=[{icon:"github",url:"https://github.com/stalniy/casl"},{icon:"twitter",url:"https://twitter.com/sergiy_stotskiy"},{icon:"medium",url:"https://sergiy-stotskiy.medium.com"}];const wt={items:Lr,footer:zr};var Ir=function(t,e){return t.methods.pathname(e)};function jr(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var re={exports:{}};re.exports=Un;re.exports.parse=It;re.exports.compile=Rr;re.exports.tokensToFunction=Vn;re.exports.tokensToRegExp=Bn;var Mn="/",Rn="./",Mr=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function It(t,e){for(var n=[],r=0,i=0,s="",a=e&&e.delimiter||Mn,c=e&&e.delimiters||Rn,o=!1,u;(u=Mr.exec(t))!==null;){var l=u[0],d=u[1],h=u.index;if(s+=t.slice(i,h),i=h+l.length,d){s+=d[1],o=!0;continue}var f="",g=t[i],p=u[2],_=u[3],b=u[4],m=u[5];if(!o&&s.length){var v=s.length-1;c.indexOf(s[v])>-1&&(f=s[v],s=s.slice(0,v))}s&&(n.push(s),s="",o=!1);var k=f!==""&&g!==void 0&&g!==f,A=m==="+"||m==="*",z=m==="?"||m==="*",I=f||a,W=_||b;n.push({name:p||r++,prefix:f,delimiter:I,optional:z,repeat:A,partial:k,pattern:W?Vr(W):"[^"+B(I)+"]+?"})}return(s||i<t.length)&&n.push(s+t.substr(i)),n}function Rr(t,e){return Vn(It(t,e))}function Vn(t){for(var e=new Array(t.length),n=0;n<t.length;n++)typeof t[n]=="object"&&(e[n]=new RegExp("^(?:"+t[n].pattern+")$"));return function(r,i){for(var s="",a=i&&i.encode||encodeURIComponent,c=0;c<t.length;c++){var o=t[c];if(typeof o=="string"){s+=o;continue}var u=r?r[o.name]:void 0,l;if(Array.isArray(u)){if(!o.repeat)throw new TypeError('Expected "'+o.name+'" to not repeat, but got array');if(u.length===0){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to not be empty')}for(var d=0;d<u.length;d++){if(l=a(u[d],o),!e[c].test(l))throw new TypeError('Expected all "'+o.name+'" to match "'+o.pattern+'"');s+=(d===0?o.prefix:o.delimiter)+l}continue}if(typeof u=="string"||typeof u=="number"||typeof u=="boolean"){if(l=a(String(u),o),!e[c].test(l))throw new TypeError('Expected "'+o.name+'" to match "'+o.pattern+'", but got "'+l+'"');s+=o.prefix+l;continue}if(o.optional){o.partial&&(s+=o.prefix);continue}throw new TypeError('Expected "'+o.name+'" to be '+(o.repeat?"an array":"a string"))}return s}}function B(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Vr(t){return t.replace(/([=!:$/()])/g,"\\$1")}function Dn(t){return t&&t.sensitive?"":"i"}function Dr(t,e){if(!e)return t;var n=t.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)e.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return t}function Br(t,e,n){for(var r=[],i=0;i<t.length;i++)r.push(Un(t[i],e,n).source);return new RegExp("(?:"+r.join("|")+")",Dn(n))}function Ur(t,e,n){return Bn(It(t,n),e,n)}function Bn(t,e,n){n=n||{};for(var r=n.strict,i=n.start!==!1,s=n.end!==!1,a=B(n.delimiter||Mn),c=n.delimiters||Rn,o=[].concat(n.endsWith||[]).map(B).concat("$").join("|"),u=i?"^":"",l=t.length===0,d=0;d<t.length;d++){var h=t[d];if(typeof h=="string")u+=B(h),l=d===t.length-1&&c.indexOf(h[h.length-1])>-1;else{var f=h.repeat?"(?:"+h.pattern+")(?:"+B(h.delimiter)+"(?:"+h.pattern+"))*":h.pattern;e&&e.push(h),h.optional?h.partial?u+=B(h.prefix)+"("+f+")?":u+="(?:"+B(h.prefix)+"("+f+"))?":u+=B(h.prefix)+"("+f+")"}}return s?(r||(u+="(?:"+a+")?"),u+=o==="$"?"$":"(?="+o+")"):(r||(u+="(?:"+a+"(?="+o+"))?"),l||(u+="(?="+a+"|"+o+")")),new RegExp(u,Dn(n))}function Un(t,e,n){return t instanceof RegExp?Dr(t,e):Array.isArray(t)?Br(t,e,n):Ur(t,e,n)}var qr=re.exports;const cn=jr(qr);var Hr=function(t){return typeof t.methods.resolve<"u"},_t=function(t){return"externalURL"in t},Wr=function(t,e){if(_t(t))return t;var n=t.name,r=t.params,i=t.query,s=t.hash,a=t.state,c="url"in t?t.url:e.url({name:n,params:r,query:i,hash:s});return{name:n,params:r,query:i,hash:s,state:a,url:c}},Gr=function(t,e,n,r,i){var s=n||{},a=s.resolved,c=a===void 0?null:a,o=s.error,u=o===void 0?null:o,l={data:void 0,body:void 0,meta:void 0};for(var d in e)l[d]=e[d];if(!t.methods.respond)return l;var h=t.methods.respond({resolved:c,error:u,match:e,external:i});return h&&(l.meta=h.meta,l.body=h.body,l.data=h.data,h.redirect&&(l.redirect=Wr(h.redirect,r))),l},Xr=function(t,e,n){var r,i;n===void 0&&(n={});var s=(r=n.history,r===void 0?{}:r),a=n.sideEffects,c=n.external,o=(i=n.invisibleRedirects,i===void 0?!1:i),u,l,d,h,f,g=[],p=[],_=[],b,m,v=function(){b=void 0,m=void 0},k=function(){b&&b(),v()},A=function(){m&&m(),v()},z=function(w,S){return b=w,m=S,v},I=function(){f&&(f=void 0,g.forEach(function(w){w()}))},W=function(w){p.forEach(function(S){S(w)})},Z=function(w){_.splice(0).forEach(function(S){S(w)}),a&&a.forEach(function(S){S(w)})},_e=function(w,S){if(!w.redirect||!o||_t(w.redirect)){d=w,h=S;var T={response:w,navigation:S,router:l};W(T),Z(T)}w.redirect!==void 0&&!_t(w.redirect)&&u.navigate(w.redirect,"replace")},xe=function(w,S,T,L,R){I(),T.finish();var M=Gr(w,S,R,l,c);A(),_e(M,L)},hr=function(){g.length&&f===void 0&&(f=function(){u.cancel(),I(),k()},g.forEach(function(w){w(f)}))};return u=t(function(w){var S={action:w.action,previous:d},T=e.match(w.location);if(!T){w.finish(),A();return}var L=T.route,R=T.match;Hr(L)?(hr(),L.methods.resolve(R,c).then(function(M){return{resolved:M,error:null}},function(M){return{error:M,resolved:null}}).then(function(M){w.cancelled||xe(L,R,w,S,M)})):xe(L,R,w,S,null)},s),l={route:e.route,history:u,external:c,observe:function(w,S){var T,L=(T=(S||{}).initial,T===void 0?!0:T);return p.push(w),d&&L&&w({response:d,navigation:h,router:l}),function(){p=p.filter(function(R){return R!==w})}},once:function(w,S){var T,L=(T=(S||{}).initial,T===void 0?!0:T);d&&L?w({response:d,navigation:h,router:l}):_.push(w)},cancel:function(w){return g.push(w),function(){g=g.filter(function(S){return S!==w})}},url:function(w){var S=w.name,T=w.params,L=w.hash,R=w.query,M;if(S){var Jt=l.route(S);Jt&&(M=Ir(Jt,T))}return u.url({pathname:M,hash:L,query:R})},navigate:function(w){k();var S=w.url,T=w.state,L=w.method;if(u.navigate({url:S,state:T},L),w.cancelled||w.finished)return z(w.cancelled,w.finished)},current:function(){return{response:d,navigation:h}},destroy:function(){u.destroy()}},u.current(),l},xt=function(t){return t.charAt(0)==="/"?t:"/"+t},Kr=function(t){return t.charAt(t.length-1)==="/"?t:t+"/"},Qr=function(t,e){return Kr(t)+e},qn=function(t,e,n){n===void 0&&(n={path:"",keys:[]});var r=xt(Qr(n.path,t.path)),i=t.pathOptions||{},s=i.match,a=s===void 0?{}:s,c=i.compile,o=c===void 0?{}:c,u=a.end==null||a.end;t.children&&t.children.length&&(a.end=!1);var l=[],d=cn(xt(t.path),l,a),h=l.map(function(A){return A.name});n.keys.length&&(h=n.keys.concat(h));var f=[],g=[];if(t.children)for(var p=0,_=t.children;p<_.length;p++){var b=_[p],m=qn(b,e,{path:r,keys:h});f.push(m),g.push(m.public)}var v=cn.compile(r),k={public:{name:t.name,keys:h,parent:void 0,children:g,methods:{resolve:t.resolve,respond:t.respond,pathname:function(A){return v(A,o)}},extra:t.extra},matching:{re:d,keys:l,exact:u,parsers:t.params||{},children:f}};return e[t.name]=k.public,f.length&&f.forEach(function(A){A.public.parent=k.public}),k},Hn=function(t,e){var n=t.matching,r=n.re,i=n.children,s=n.exact,a=r.exec(e);if(!a)return[];var c=a[0],o=a.slice(1),u=[{route:t,parsed:o}],l=e.slice(c.length);if(!i.length||l==="")return u;for(var d=xt(l),h=0,f=i;h<f.length;h++){var g=f[h],p=Hn(g,d);if(p.length)return u.concat(p)}return s?[]:u},Zr=function(t,e){for(var n=t[t.length-1].route.public,r={},i=0,s=t;i<s.length;i++)for(var a=s[i],c=a.route,o=a.parsed,u=c.matching,l=u.keys,d=u.parsers,h=0,f=o.length;h<f;h++){var g=l[h].name,p=d[g]||decodeURIComponent;o[h]!==void 0&&(r[g]=p(o[h]))}return{route:n,match:{location:e,name:n.name,params:r}}},Jr=function(t){var e={},n=t.map(function(r){return qn(r,e)});return{match:function(r){for(var i=0,s=n;i<s.length;i++){var a=s[i],c=Hn(a,r.pathname);if(c.length)return Zr(c,r)}},route:function(r){return e[r]}}};function ln(t,e){return t?t.indexOf(e)===0?t:e+t:""}function Yr(t){return t||""}function ei(t){return t||""}function ti(t){t===void 0&&(t={});var e=t.query,n=e===void 0?{}:e,r=n.parse,i=r===void 0?Yr:r,s=n.stringify,a=s===void 0?ei:s,c=t.base;return{location:function(o,u){var l=o.url,d=o.state;if(l===""||l.charAt(0)==="#"){u||(u={pathname:"/",hash:"",query:i()});var h={pathname:u.pathname,hash:l.charAt(0)==="#"?l.substring(1):u.hash,query:u.query};return d&&(h.state=d),h}var f=l.indexOf("#"),g;f!==-1?(g=l.substring(f+1),l=l.substring(0,f)):g="";var p=l.indexOf("?"),_;p!==-1&&(_=l.substring(p+1),l=l.substring(0,p));var b=i(_),m=c?c.remove(l):l;m===""&&(m="/");var v={hash:g,query:b,pathname:m};return d&&(v.state=d),v},keyed:function(o,u){return o.key=u,o},stringify:function(o){if(typeof o=="string"){var u=o.charAt(0);return u==="#"||u==="?"?o:c?c.add(o):o}var l=o.pathname!==void 0?c?c.add(o.pathname):o.pathname:"";return l+ln(a(o.query),"?")+ln(o.hash,"#")}}}function ni(){var t=0;return{major:function(e){return e&&(t=e[0]+1),[t++,0]},minor:function(e){return[e[0],e[1]+1]}}}function ri(t){var e=t.responseHandler,n=t.utils,r=t.keygen,i=t.current,s=t.push,a=t.replace,c;function o(g,p,_,b){var m={location:g,action:p,finish:function(){c===m&&(_(),c=void 0)},cancel:function(v){c===m&&(b(v),m.cancelled=!0,c=void 0)},cancelled:!1};return m}function u(g){c=g,e(g)}function l(g){c&&(c.cancel(g),c=void 0)}function d(g,p){var _=i(),b=n.location(g,_);switch(p){case"anchor":return n.stringify(b)===n.stringify(_)?h(b):f(b);case"push":return f(b);case"replace":return h(b);default:throw new Error("Invalid navigation type: "+p)}}function h(g){var p=n.keyed(g,r.minor(i().key));return o(p,"replace",a.finish(p),a.cancel)}function f(g){var p=n.keyed(g,r.major(i().key));return o(p,"push",s.finish(p),s.cancel)}return{prepare:d,emitNavigation:u,createNavigation:o,cancelPending:l}}function ii(){}function si(){var t;return{confirmNavigation:function(e,n,r){t?t(e,n,r||ii):n()},confirm:function(e){t=e||null}}}function oi(t,e){return new RegExp("^"+e+"(\\/|\\?|#|$)","i").test(t)}function ai(t,e){if(t.charAt(0)!=="/"||t.charAt(t.length-1)==="/")throw new Error('The base segment "'+t+'" is not valid. The "base" option must begin with a forward slash and end with a non-forward slash character.');var n={},r=n.emptyRoot,i=r===void 0?!1:r,s=n.strict,a=s===void 0?!1:s;return{add:function(c){if(i){if(c==="/")return t;if(c.startsWith("/?")||c.startsWith("/#"))return""+t+c.substr(1)}else if(c.charAt(0)==="?"||c.charAt(0)==="#")return c;return""+t+c},remove:function(c){if(c==="")return"";var o=oi(c,t);if(!o){if(a)throw new Error('Expected a string that begins with "'+t+'", but received "'+c+'".');return c}if(c===t){if(a&&!i)throw new Error('Received string "'+t+'", which is the same as the base, but "emptyRoot" is not true.');return"/"}return c.substr(t.length)}}}function ci(){return!!(window&&window.location)}function li(t){return t.state===void 0&&navigator.userAgent.indexOf("CriOS")===-1}function un(){try{return window.history.state||{}}catch{return{}}}function ie(){}function ui(t,e){if(e===void 0&&(e={}),!ci())throw new Error("Cannot use @hickory/browser without a DOM");var n=ti(e),r=ni(),i=si(),s=i.confirm,a=i.confirmNavigation;function c(m){var v=window.location,k=v.pathname,A=v.search,z=v.hash,I=k+A+z,W=m||un(),Z=W.key,_e=W.state;Z||(Z=r.major(),window.history.replaceState({key:Z,state:_e},"",I));var xe=n.location({url:I,state:_e});return n.keyed(xe,Z)}function o(m){return n.stringify(m)}var u=un().key!==void 0?"pop":"push",l=ri({responseHandler:t,utils:n,keygen:r,current:function(){return b.location},push:{finish:function(m){return function(){var v=o(m),k=m.key,A=m.state;try{window.history.pushState({key:k,state:A},"",v)}catch{window.location.assign(v)}b.location=m,u="push"}},cancel:ie},replace:{finish:function(m){return function(){var v=o(m),k=m.key,A=m.state;try{window.history.replaceState({key:k,state:A},"",v)}catch{window.location.replace(v)}b.location=m,u="replace"}},cancel:ie}}),d=l.emitNavigation,h=l.cancelPending,f=l.createNavigation,g=l.prepare,p=!1;function _(m){if(p){p=!1;return}if(!li(m)){h("pop");var v=c(m.state),k=b.location.key[0]-v.key[0],A=function(){p=!0,window.history.go(k)};a({to:v,from:b.location,action:"pop"},function(){d(f(v,"pop",function(){b.location=v,u="pop"},function(z){z!=="pop"&&A()}))},A)}}window.addEventListener("popstate",_,!1);var b={location:c(),current:function(){d(f(b.location,u,ie,ie))},url:o,navigate:function(m,v){v===void 0&&(v="anchor");var k=g(m,v);h(k.action),a({to:k.location,from:b.location,action:k.action},function(){d(k)})},go:function(m){window.history.go(m)},confirm:s,cancel:function(){h()},destroy:function(){window.removeEventListener("popstate",_),d=ie}};return b}var di=[{name:"home",path:":lang",restrictions:{lang:"en"},controller:"Home",sitemap:{priority:1,changefreq:"yearly",provider:"langs"},children:[{name:"api",path:"api/:id?",restrictions:{id:"[\\w/-]+"},controller:"Page",meta:{categories:["api"],ignoreIdPrefix:!0},sitemap:{priority:.7,changefreq:"monthly",provider:"pages"}},{name:"support",path:"support-casljs",controller:"Page",sitemap:{priority:1,changefreq:"yearly",provider:"route"}},{name:"page",path:":id",restrictions:{id:"[\\w/-]+"},controller:"Page",meta:{encode:!1,categories:["guide","advanced","package","cookbook"]},sitemap:{priority:1,changefreq:"monthly",provider:"pages"}}]}];const hi={routes:di},Xe={repoURL:"https://github.com/stalniy/casl",baseUrl:"/v6"},pi=1e3*60,kt="langChanged";function fi(t,e,n){return Object.entries(At(e||{})).reduce((r,[i,s])=>r.replace(new RegExp(`{{[  ]*${i}[  ]*}}`,"gm"),String(At(s))),t)}function gi(t,e){const n=t.split(".");let r=e.strings;for(;r!=null&&n.length>0;)r=r[n.shift()];return r!=null?r.toString():null}function At(t){return typeof t=="function"?t():t}const mi=()=>({loader:()=>Promise.resolve({}),empty:t=>`[${t}]`,lookup:gi,interpolate:fi,translationCache:{}});let me=mi();function vi(t){return me=Object.assign(Object.assign({},me),t)}function yi(t){window.dispatchEvent(new CustomEvent(kt,{detail:t}))}function bi(t,e,n=me){yi({previousStrings:n.strings,previousLang:n.lang,lang:n.lang=t,strings:n.strings=e})}function Wn(t,e){const n=r=>t(r.detail);return window.addEventListener(kt,n,e),()=>window.removeEventListener(kt,n)}async function wi(t,e=me){const n=await e.loader(t,e);e.translationCache={},bi(t,n,e)}function Ke(t,e,n=me){let r=n.translationCache[t]||(n.translationCache[t]=n.lookup(t,n)||n.empty(t,n));return e=e!=null?At(e):null,e!=null?n.interpolate(r,e,n):r}function Gn(t){return t instanceof Q?t.startNode.isConnected:t instanceof Pt?t.committer.element.isConnected:t.element.isConnected}function _i(t){for(const[e]of t)Gn(e)||t.delete(e)}function xi(t){"requestIdleCallback"in window?window.requestIdleCallback(t):setTimeout(t)}function ki(t,e){setInterval(()=>xi(()=>_i(t)),e)}const jt=new Map;function Ai(){Wn(t=>{for(const[e,n]of jt)Gn(e)&&Xn(e,n,t)})}Ai();ki(jt,pi);function Xn(t,e,n){const r=e(n);t.value!==r&&(t.setValue(r),t.commit())}const Kn=ye(t=>e=>{jt.set(e,t),Xn(e,t)}),Si=(t,e,n)=>Kn(()=>Ke(t,e,n));/**
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
 */const dn=new WeakMap,le=ye(t=>e=>{if(!(e instanceof Q))throw new Error("unsafeHTML can only be used in text bindings");const n=dn.get(e);if(n!==void 0&&Ge(t)&&t===n.value&&e.value===n.fragment)return;const r=document.createElement("template");r.innerHTML=t;const i=document.importNode(r.content,!0);e.setValue(i),dn.set(e,{value:t,fragment:i})}),Ei=(...t)=>JSON.stringify(t);function ee(t,e=Ei){const n=new Map,r=function(...i){const s=e(...i);return n.has(s)||n.set(s,t.apply(this,i)),n.get(s)};return r.cache=n,r}function Ci(t,e){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>t.apply(this,r),e)}}const hn=t=>t,Fi={json:JSON,raw:{parse:hn,stringify:hn},txtArrayJSON:{parse(t){const e=t.trim().replace(/[\r\n]+/g,",");return JSON.parse(`[${e}]`)},stringify(){throw new Error('"txtArrayJSON" format is not serializable')}}};function pn(t,e={}){const n=Fi[e.format||"json"];return new Promise((r,i)=>{const s=new XMLHttpRequest;s.open(e.method||"GET",t),e.headers&&Object.keys(e.headers).forEach(a=>{s.setRequestHeader(a,e.headers[a])}),s.onload=()=>r({status:s.status,headers:{"content-type":s.getResponseHeader("Content-Type")},body:n.parse(s.responseText)}),s.ontimeout=s.onerror=i,s.send(e.data?n.stringify(e.data):null)})}const J=Object.create(null);function ue(t,e={}){const n=e.absoluteUrl?t:Xe.baseUrl+t;return(e.method||"GET")!=="GET"?pn(n,e):(J[n]=J[n]||pn(n,e),e.cache===!0?J[n]:J[n].then(i=>(delete J[n],i)).catch(i=>(delete J[n],Promise.reject(i))))}var Ti={en:{default:"/assets/default.en-B_p6j7mY.json"}},Oi=["en"];function Qn(t,e){const n=t.split(".");let r=e.strings;for(let i=0;i<n.length;i++){const s=n[i];if(!r||!r[s])return;r=r[s]}return r}function Ni(t){return console.warn(`missing i18n key: ${t}`),t}const $i=/%\{(\w+)\}/g;function Mt(t,e){return t.replace($i,(n,r)=>e[r])}const Rt=vi({async loader(t){return(await ue(Ti[t].default)).body},lookup:Qn,interpolate:Mt,empty:Ni}),Pi=ee((t,e)=>new Intl.DateTimeFormat(t,Ke(`dateTimeFormats.${e}`))),Te=Oi,Zn=Te[0],be=()=>Rt.lang,de=Ke,Li=t=>!!Qn(t,Rt);function zi(t){if(!Te.includes(t))throw new Error(`Locale ${t} is not supported. Supported: ${Te.join(", ")}`);return wi(t)}function Ii(t,e="default"){const n=typeof t=="string"?new Date(t):t;return Pi(Rt.lang,e).format(n)}/*! *****************************************************************************
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
***************************************************************************** */var C=function(){return C=Object.assign||function(e){for(var n,r=1,i=arguments.length;r<i;r++){n=arguments[r];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},C.apply(this,arguments)};function fn(t){var e=typeof Symbol=="function"&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&typeof t.length=="number")return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function O(t,e){var n=typeof Symbol=="function"&&t[Symbol.iterator];if(!n)return t;var r=n.call(t),i,s=[],a;try{for(;(e===void 0||e-- >0)&&!(i=r.next()).done;)s.push(i.value)}catch(c){a={error:c}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(a)throw a.error}}return s}function gn(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(O(arguments[e]));return t}var ji="ENTRIES",Jn="KEYS",Yn="VALUES",$="",nt=function(){function t(e,n){var r=e._tree,i=Object.keys(r);this.set=e,this._type=n,this._path=i.length>0?[{node:r,keys:i}]:[]}return t.prototype.next=function(){var e=this.dive();return this.backtrack(),e},t.prototype.dive=function(){if(this._path.length===0)return{done:!0,value:void 0};var e=D(this._path),n=e.node,r=e.keys;return D(r)===$?{done:!1,value:this.result()}:(this._path.push({node:n[D(r)],keys:Object.keys(n[D(r)])}),this.dive())},t.prototype.backtrack=function(){this._path.length!==0&&(D(this._path).keys.pop(),!(D(this._path).keys.length>0)&&(this._path.pop(),this.backtrack()))},t.prototype.key=function(){return this.set._prefix+this._path.map(function(e){var n=e.keys;return D(n)}).filter(function(e){return e!==$}).join("")},t.prototype.value=function(){return D(this._path).node[$]},t.prototype.result=function(){return this._type===Yn?this.value():this._type===Jn?this.key():[this.key(),this.value()]},t.prototype[Symbol.iterator]=function(){return this},t}(),D=function(t){return t[t.length-1]},Mi=0,Ri=1,rt=2,it=3,Vi=function(t,e,n){for(var r=[{distance:0,i:0,key:"",node:t}],i={},s=[],a=function(){var c=r.pop(),o=c.node,u=c.distance,l=c.key,d=c.i,h=c.edit;Object.keys(o).forEach(function(f){if(f===$){var g=u+(e.length-d),p=O(i[l]||[null,1/0],2),_=p[1];g<=n&&g<_&&(i[l]=[o[f],g])}else Di(e,f,n-u,d,h,s).forEach(function(b){var m=b.distance,v=b.i,k=b.edit;r.push({node:o[f],distance:u+m,key:l+f,i:v,edit:k})})})};r.length>0;)a();return i},Di=function(t,e,n,r,i,s){s.push({distance:0,ia:r,ib:0,edit:i});for(var a=[];s.length>0;){var c=s.pop(),o=c.distance,u=c.ia,l=c.ib,d=c.edit;if(l===e.length){a.push({distance:o,i:u,edit:d});continue}if(t[u]===e[l])s.push({distance:o,ia:u+1,ib:l+1,edit:Mi});else{if(o>=n)continue;d!==rt&&s.push({distance:o+1,ia:u,ib:l+1,edit:it}),u<t.length&&(d!==it&&s.push({distance:o+1,ia:u+1,ib:l,edit:rt}),d!==it&&d!==rt&&s.push({distance:o+1,ia:u+1,ib:l+1,edit:Ri}))}}return a},st=function(){function t(e,n){e===void 0&&(e={}),n===void 0&&(n=""),this._tree=e,this._prefix=n}return t.prototype.atPrefix=function(e){var n;if(!e.startsWith(this._prefix))throw new Error("Mismatched prefix");var r=O(Oe(this._tree,e.slice(this._prefix.length)),2),i=r[0],s=r[1];if(i===void 0){var a=O(Vt(s),2),c=a[0],o=a[1],u=Object.keys(c).find(function(l){return l!==$&&l.startsWith(o)});if(u!==void 0)return new t((n={},n[u.slice(o.length)]=c[u],n),e)}return new t(i||{},e)},t.prototype.clear=function(){delete this._size,this._tree={}},t.prototype.delete=function(e){return delete this._size,Bi(this._tree,e)},t.prototype.entries=function(){return new nt(this,ji)},t.prototype.forEach=function(e){var n,r;try{for(var i=fn(this),s=i.next();!s.done;s=i.next()){var a=O(s.value,2),c=a[0],o=a[1];e(c,o,this)}}catch(u){n={error:u}}finally{try{s&&!s.done&&(r=i.return)&&r.call(i)}finally{if(n)throw n.error}}},t.prototype.fuzzyGet=function(e,n){return Vi(this._tree,e,n)},t.prototype.get=function(e){var n=St(this._tree,e);return n!==void 0?n[$]:void 0},t.prototype.has=function(e){var n=St(this._tree,e);return n!==void 0&&n.hasOwnProperty($)},t.prototype.keys=function(){return new nt(this,Jn)},t.prototype.set=function(e,n){if(typeof e!="string")throw new Error("key must be a string");delete this._size;var r=Ne(this._tree,e);return r[$]=n,this},Object.defineProperty(t.prototype,"size",{get:function(){var e=this;return this._size?this._size:(this._size=0,this.forEach(function(){e._size+=1}),this._size)},enumerable:!1,configurable:!0}),t.prototype.update=function(e,n){if(typeof e!="string")throw new Error("key must be a string");delete this._size;var r=Ne(this._tree,e);return r[$]=n(r[$]),this},t.prototype.values=function(){return new nt(this,Yn)},t.prototype[Symbol.iterator]=function(){return this.entries()},t.from=function(e){var n,r,i=new t;try{for(var s=fn(e),a=s.next();!a.done;a=s.next()){var c=O(a.value,2),o=c[0],u=c[1];i.set(o,u)}}catch(l){n={error:l}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}return i},t.fromObject=function(e){return t.from(Object.entries(e))},t}(),Oe=function(t,e,n){if(n===void 0&&(n=[]),e.length===0||t==null)return[t,n];var r=Object.keys(t).find(function(i){return i!==$&&e.startsWith(i)});return r===void 0?(n.push([t,e]),Oe(void 0,"",n)):(n.push([t,r]),Oe(t[r],e.slice(r.length),n))},St=function(t,e){if(e.length===0||t==null)return t;var n=Object.keys(t).find(function(r){return r!==$&&e.startsWith(r)});if(n!==void 0)return St(t[n],e.slice(n.length))},Ne=function(t,e){var n;if(e.length===0||t==null)return t;var r=Object.keys(t).find(function(a){return a!==$&&e.startsWith(a)});if(r===void 0){var i=Object.keys(t).find(function(a){return a!==$&&a.startsWith(e[0])});if(i===void 0)t[e]={};else{var s=er(e,i);return t[s]=(n={},n[i.slice(s.length)]=t[i],n),delete t[i],Ne(t[s],e.slice(s.length))}return t[e]}return Ne(t[r],e.slice(r.length))},er=function(t,e,n,r,i){return n===void 0&&(n=0),r===void 0&&(r=Math.min(t.length,e.length)),i===void 0&&(i=""),n>=r||t[n]!==e[n]?i:er(t,e,n+1,r,i+t[n])},Bi=function(t,e){var n=O(Oe(t,e),2),r=n[0],i=n[1];if(r!==void 0){delete r[$];var s=Object.keys(r);s.length===0&&tr(i),s.length===1&&Ui(i,s[0],r[s[0]])}},tr=function(t){if(t.length!==0){var e=O(Vt(t),2),n=e[0],r=e[1];delete n[r],Object.keys(n).length===0&&tr(t.slice(0,-1))}},Ui=function(t,e,n){if(t.length!==0){var r=O(Vt(t),2),i=r[0],s=r[1];i[s+e]=n,delete i[s]}},Vt=function(t){return t[t.length-1]},ke,$e="or",qi="and",Hi=function(){function t(e){if(e?.fields==null)throw new Error('MiniSearch: option "fields" must be provided');this._options=C(C(C({},at),e),{searchOptions:C(C({},vn),e.searchOptions||{})}),this._index=new st,this._documentCount=0,this._documentIds={},this._fieldIds={},this._fieldLength={},this._averageFieldLength={},this._nextId=0,this._storedFields={},this.addFields(this._options.fields)}return t.prototype.add=function(e){var n=this,r=this._options,i=r.extractField,s=r.tokenize,a=r.processTerm,c=r.fields,o=r.idField,u=i(e,o);if(u==null)throw new Error('MiniSearch: document does not have ID field "'+o+'"');var l=this.addDocumentId(u);this.saveStoredFields(l,e),c.forEach(function(d){var h=i(e,d);if(h!=null){var f=s(h.toString(),d);n.addFieldLength(l,n._fieldIds[d],n.documentCount-1,f.length),f.forEach(function(g){var p=a(g,d);p&&n.addTerm(n._fieldIds[d],l,p)})}})},t.prototype.addAll=function(e){var n=this;e.forEach(function(r){return n.add(r)})},t.prototype.addAllAsync=function(e,n){var r=this;n===void 0&&(n={});var i=n.chunkSize,s=i===void 0?10:i,a={chunk:[],promise:Promise.resolve()},c=e.reduce(function(l,d,h){var f=l.chunk,g=l.promise;return f.push(d),(h+1)%s===0?{chunk:[],promise:g.then(function(){return new Promise(function(p){return setTimeout(p,0)})}).then(function(){return r.addAll(f)})}:{chunk:f,promise:g}},a),o=c.chunk,u=c.promise;return u.then(function(){return r.addAll(o)})},t.prototype.remove=function(e){var n=this,r=this._options,i=r.tokenize,s=r.processTerm,a=r.extractField,c=r.fields,o=r.idField,u=a(e,o);if(u==null)throw new Error('MiniSearch: document does not have ID field "'+o+'"');var l=O(Object.entries(this._documentIds).find(function(h){var f=O(h,2);f[0];var g=f[1];return u===g})||[],1),d=l[0];if(d==null)throw new Error("MiniSearch: cannot remove document with ID "+u+": it is not in the index");c.forEach(function(h){var f=a(e,h);if(f!=null){var g=i(f.toString(),h);g.forEach(function(p){var _=s(p,h);_&&n.removeTerm(n._fieldIds[h],d,_)})}}),delete this._storedFields[d],delete this._documentIds[d],this._documentCount-=1},t.prototype.removeAll=function(e){var n=this;if(e)e.forEach(function(r){return n.remove(r)});else{if(arguments.length>0)throw new Error("Expected documents to be present. Omit the argument to remove all documents.");this._index=new st,this._documentCount=0,this._documentIds={},this._fieldLength={},this._averageFieldLength={},this._storedFields={},this._nextId=0}},t.prototype.search=function(e,n){var r=this;n===void 0&&(n={});var i=this._options,s=i.tokenize,a=i.processTerm,c=i.searchOptions,o=C(C({tokenize:s,processTerm:a},c),n),u=o.tokenize,l=o.processTerm,d=u(e).map(function(p){return l(p)}).filter(function(p){return!!p}),h=d.map(Xi(o)),f=h.map(function(p){return r.executeQuery(p,o)}),g=this.combineResults(f,o.combineWith);return Object.entries(g).reduce(function(p,_){var b=O(_,2),m=b[0],v=b[1],k=v.score,A=v.match,z=v.terms,I={id:r._documentIds[m],terms:Ki(z),score:k,match:A};return Object.assign(I,r._storedFields[m]),(o.filter==null||o.filter(I))&&p.push(I),p},[]).sort(function(p,_){var b=p.score,m=_.score;return b<m?1:-1})},t.prototype.autoSuggest=function(e,n){n===void 0&&(n={}),n=C(C({},Qi),n);var r=this.search(e,n).reduce(function(i,s){var a=s.score,c=s.terms,o=c.join(" ");return i[o]==null?i[o]={score:a,terms:c,count:1}:(i[o].score+=a,i[o].count+=1),i},{});return Object.entries(r).map(function(i){var s=O(i,2),a=s[0],c=s[1],o=c.score,u=c.terms,l=c.count;return{suggestion:a,terms:u,score:o/l}}).sort(function(i,s){var a=i.score,c=s.score;return a<c?1:-1})},Object.defineProperty(t.prototype,"documentCount",{get:function(){return this._documentCount},enumerable:!1,configurable:!0}),t.loadJSON=function(e,n){if(n==null)throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return t.loadJS(JSON.parse(e),n)},t.getDefault=function(e){if(at.hasOwnProperty(e))return ot(at,e);throw new Error('MiniSearch: unknown option "'+e+'"')},t.loadJS=function(e,n){var r=e.index,i=e.documentCount,s=e.nextId,a=e.documentIds,c=e.fieldIds,o=e.fieldLength,u=e.averageFieldLength,l=e.storedFields,d=new t(n);return d._index=new st(r._tree,r._prefix),d._documentCount=i,d._nextId=s,d._documentIds=a,d._fieldIds=c,d._fieldLength=o,d._averageFieldLength=u,d._fieldIds=c,d._storedFields=l||{},d},t.prototype.executeQuery=function(e,n){var r=this,i=C(C({},this._options.searchOptions),n),s=(i.fields||this._options.fields).reduce(function(p,_){var b;return C(C({},p),(b={},b[_]=ot(p,_)||1,b))},i.boost||{}),a=i.boostDocument,c=i.weights,o=C(C({},vn.weights),c),u=o.fuzzy,l=o.prefix,d=this.termResults(e.term,s,a,this._index.get(e.term));if(!e.fuzzy&&!e.prefix)return d;var h=[d];if(e.prefix&&this._index.atPrefix(e.term).forEach(function(p,_){var b=.3*(p.length-e.term.length)/p.length;h.push(r.termResults(p,s,a,_,l,b))}),e.fuzzy){var f=e.fuzzy===!0?.2:e.fuzzy,g=f<1?Math.round(e.term.length*f):f;Object.entries(this._index.fuzzyGet(e.term,g)).forEach(function(p){var _=O(p,2),b=_[0],m=O(_[1],2),v=m[0],k=m[1],A=k/b.length;h.push(r.termResults(b,s,a,v,u,A))})}return h.reduce(mn[$e],{})},t.prototype.combineResults=function(e,n){if(n===void 0&&(n=$e),e.length===0)return{};var r=n.toLowerCase();return e.reduce(mn[r],null)||{}},t.prototype.toJSON=function(){return{index:this._index,documentCount:this._documentCount,nextId:this._nextId,documentIds:this._documentIds,fieldIds:this._fieldIds,fieldLength:this._fieldLength,averageFieldLength:this._averageFieldLength,storedFields:this._storedFields}},t.prototype.termResults=function(e,n,r,i,s,a){var c=this;return a===void 0&&(a=0),i==null?{}:Object.entries(n).reduce(function(o,u){var l=O(u,2),d=l[0],h=l[1],f=c._fieldIds[d],g=i[f]||{ds:{}},p=g.df,_=g.ds;return Object.entries(_).forEach(function(b){var m=O(b,2),v=m[0],k=m[1],A=r?r(c._documentIds[v],e):1;if(A){var z=c._fieldLength[v][f]/c._averageFieldLength[f];o[v]=o[v]||{score:0,match:{},terms:[]},o[v].terms.push(e),o[v].match[e]=ot(o[v].match,e)||[],o[v].score+=A*Gi(k,p,c._documentCount,z,h,a),o[v].match[e].push(d)}}),o},{})},t.prototype.addTerm=function(e,n,r){this._index.update(r,function(i){var s;i=i||{};var a=i[e]||{df:0,ds:{}};return a.ds[n]==null&&(a.df+=1),a.ds[n]=(a.ds[n]||0)+1,C(C({},i),(s={},s[e]=a,s))})},t.prototype.removeTerm=function(e,n,r){var i=this;if(!this._index.has(r)){this.warnDocumentChanged(n,e,r);return}this._index.update(r,function(s){var a,c=s[e];if(c==null||c.ds[n]==null)return i.warnDocumentChanged(n,e,r),s;if(c.ds[n]<=1){if(c.df<=1)return delete s[e],s;c.df-=1}return c.ds[n]<=1?(delete c.ds[n],s):(c.ds[n]-=1,C(C({},s),(a={},a[e]=c,a)))}),Object.keys(this._index.get(r)).length===0&&this._index.delete(r)},t.prototype.warnDocumentChanged=function(e,n,r){if(!(console==null||console.warn==null)){var i=Object.entries(this._fieldIds).find(function(s){var a=O(s,2);a[0];var c=a[1];return c===n})[0];console.warn("MiniSearch: document with ID "+this._documentIds[e]+' has changed before removal: term "'+r+'" was not present in field "'+i+'". Removing a document after it has changed can corrupt the index!')}},t.prototype.addDocumentId=function(e){var n=this._nextId.toString(36);return this._documentIds[n]=e,this._documentCount+=1,this._nextId+=1,n},t.prototype.addFields=function(e){var n=this;e.forEach(function(r,i){n._fieldIds[r]=i})},t.prototype.addFieldLength=function(e,n,r,i){this._averageFieldLength[n]=this._averageFieldLength[n]||0;var s=this._averageFieldLength[n]*r+i;this._fieldLength[e]=this._fieldLength[e]||{},this._fieldLength[e][n]=i,this._averageFieldLength[n]=s/(r+1)},t.prototype.saveStoredFields=function(e,n){var r=this,i=this._options,s=i.storeFields,a=i.extractField;s==null||s.length===0||(this._storedFields[e]=this._storedFields[e]||{},s.forEach(function(c){var o=a(n,c);o!==void 0&&(r._storedFields[e][c]=o)}))},t}(),ot=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)?t[e]:void 0},mn=(ke={},ke[$e]=function(t,e){return Object.entries(e).reduce(function(n,r){var i,s=O(r,2),a=s[0],c=s[1],o=c.score,u=c.match,l=c.terms;return n[a]==null?n[a]={score:o,match:u,terms:l}:(n[a].score+=o,n[a].score*=1.5,(i=n[a].terms).push.apply(i,gn(l)),Object.assign(n[a].match,u)),n},t||{})},ke[qi]=function(t,e){return t==null?e:Object.entries(e).reduce(function(n,r){var i=O(r,2),s=i[0],a=i[1],c=a.score,o=a.match,u=a.terms;return t[s]===void 0||(n[s]=n[s]||{},n[s].score=t[s].score+c,n[s].match=C(C({},t[s].match),o),n[s].terms=gn(t[s].terms,u)),n},{})},ke),Wi=function(t,e,n){return t*Math.log(n/e)},Gi=function(t,e,n,r,i,s){var a=i/(1+.333*i*s);return a*Wi(t,e,n)/r},Xi=function(t){return function(e,n,r){var i=typeof t.fuzzy=="function"?t.fuzzy(e,n,r):t.fuzzy||!1,s=typeof t.prefix=="function"?t.prefix(e,n,r):t.prefix===!0;return{term:e,fuzzy:i,prefix:s}}},Ki=function(t){return t.filter(function(e,n,r){return r.indexOf(e)===n})},at={idField:"id",extractField:function(t,e){return t[e]},tokenize:function(t,e){return t.split(Zi)},processTerm:function(t,e){return t.toLowerCase()},fields:void 0,searchOptions:void 0,storeFields:[]},vn={combineWith:$e,prefix:!1,fuzzy:!1,boost:{},weights:{fuzzy:.9,prefix:.75}},Qi={prefix:function(t,e,n){return e===n.length-1}},Zi=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;function Ji(t){return Object.assign(new Error(t),{code:"NOT_FOUND"})}function Yi(t,e){switch(e){case"summary":return t.meta?t.meta.description:null;case"headings":return t[e].map(n=>n.title).join(" ");default:return t[e]}}const es={extractField:Yi,fields:["title","headings","summary"],searchOptions:{boost:{title:2}}};function ts(t){const e={};return t.terms.forEach(n=>{const r=new RegExp(`(${n})`,"gi");t.match[n].forEach(i=>{const s=t.doc[i];if(typeof s=="string")e[i]=s.replace(r,"<mark>$1</mark>");else if(i==="headings"){const a=s.reduce((c,o)=>(o.title.toLowerCase().includes(n)&&c.push({id:o.id,title:o.title.replace(r,"<mark>$1</mark>")}),c),[]);e[i]=a.length?a:null}})}),e}class ns{constructor({pages:e,summaries:n,searchIndexes:r}){this._pages=e,this._summaries=n,this._searchIndexes=r,this._loadSearchIndex=ee(this._loadSearchIndex),this._getSummary=ee(this._getSummary),this._getItems=ee(this._getItems),this.byCategories=ee(this.byCategories),this.load=ee(this.load)}async load(e,n){const r=this._pages[e][n];if(!r)throw Ji(`Page with ${n} is not found`);return(await ue(r)).body}async _getSummary(e){return(await ue(this._summaries[e])).body}async _getItems(e,n=null){const r=await this.byCategories(e,n);return Object.keys(r).reduce((i,s)=>i.concat(r[s]),[])}async getNearestFor(e,n,r=null){const i=await this._getItems(e,r),s=i.findIndex(o=>o.id===n);if(s===-1)return[];const a=s-1,c=s+1;return[a<0?void 0:i[a],c>=i.length?void 0:i[c]]}async byCategories(e,n=null){const{items:r}=await this._getSummary(e),i={};return r.forEach(s=>{s.categories.forEach(a=>{i[a]=i[a]||[],i[a].push(s)})}),Array.isArray(n)?n.reduce((s,a)=>(s[a]=i[a],s),{}):i}async at(e,n){const{items:r}=await this._getSummary(e);return r[n]}async _loadSearchIndex(e){const n=this._searchIndexes[e],r=await ue(n);return Hi.loadJS(r.body,es)}async search(e,n,r){const[i,s]=await Promise.all([this._loadSearchIndex(e),this._getSummary(e)]);return i.search(n,r).slice(0,15).map(a=>{const[c]=s.byId[a.id];return a.doc=s.items[c],a.hints=ts(a),a})}}var rs={en:{notfound:"/assets/notfound.en-B-sf_y2O.json","support-casljs":"/assets/support-casljs.en-DxnP1AU5.json","advanced/ability-inheritance":"/assets/advanced/ability-inheritance.en-BLt0Kun0.json","advanced/ability-to-database-query":"/assets/advanced/ability-to-database-query.en-LVkoF_H3.json","advanced/debugging-testing":"/assets/advanced/debugging-testing.en-Ya5hsKS0.json","advanced/customize-ability":"/assets/advanced/customize-ability.en-BvLJbTpk.json","advanced/typescript":"/assets/advanced/typescript.en-BJfzKP9V.json","api/casl-ability":"/assets/api/casl-ability.en-DxEkDE-A.json","api/casl-ability-extra":"/assets/api/casl-ability-extra.en-12V3ZOkp.json","cookbook/cache-rules":"/assets/cookbook/cache-rules.en-BwLWB6Or.json","cookbook/claim-authorization":"/assets/cookbook/claim-authorization.en-DzDAgszP.json","cookbook/intro":"/assets/cookbook/intro.en-QmHsFKBl.json","cookbook/less-confusing-can-api":"/assets/cookbook/less-confusing-can-api.en-CtP9qZHI.json","cookbook/roles-with-persisted-permissions":"/assets/cookbook/roles-with-persisted-permissions.en-CWSewcVr.json","cookbook/roles-with-static-permissions":"/assets/cookbook/roles-with-static-permissions.en-BZjH09OJ.json","guide/conditions-in-depth":"/assets/guide/conditions-in-depth.en-CrfknA1g.json","guide/define-aliases":"/assets/guide/define-aliases.en-DPWhG1ma.json","guide/define-rules":"/assets/guide/define-rules.en-B4qc_X5R.json","guide/install":"/assets/guide/install.en-Dxn3vS3R.json","guide/intro":"/assets/guide/intro.en-D8hBGx__.json","guide/restricting-fields":"/assets/guide/restricting-fields.en-B_MnhGOM.json","guide/subject-type-detection":"/assets/guide/subject-type-detection.en-D01GZf3l.json","package/casl-angular":"/assets/package/casl-angular.en-BSDGYayt.json","package/casl-aurelia":"/assets/package/casl-aurelia.en-BcUPWfhE.json","package/casl-mongoose":"/assets/package/casl-mongoose.en-8IvsFeXY.json","package/casl-prisma":"/assets/package/casl-prisma.en-I78bSUeh.json","package/casl-react":"/assets/package/casl-react.en-tNcsd34H.json","package/casl-vue":"/assets/package/casl-vue.en-Cf4nx2mB.json"}},is={en:"/assets/content_pages_summaries.en-B-opFM0S.json"},ss={en:"/assets/content_pages_searchIndexes.en-WG9AWJa5.json"};const os=Object.freeze(Object.defineProperty({__proto__:null,pages:rs,searchIndexes:ss,summaries:is},Symbol.toStringTag,{value:"Module"})),as={page:new ns(os)},Dt=t=>{const e=as[t];if(!e)throw new TypeError(`Unknown content loader "${t}".`);return e};function cs(t){if(t.code==="NOT_FOUND")return{body:y`<app-page name="notfound"></app-page>`};throw t}async function ls(t,e){if(!e.categories)return t.at(e.lang,0);const n=await t.byCategories(e.lang,e.categories),r=e.categories.find(i=>n[i].length);return n[r][0]}const us=t=>t,ds=(t=us)=>async e=>{const n=t(e),r=Dt("page");if(n.id)n.id.endsWith("/")?n.redirectTo=n.id.slice(0,-1):[n.page,n.byCategories,n.nav]=await Promise.all([r.load(n.lang,n.id),n.categories.length?r.byCategories(n.lang,n.categories):null,r.getNearestFor(n.lang,n.id,n.categories)]);else{const i=await ls(r,n);n.redirectTo=i.id}return n},hs=t=>({match:e,error:n,resolved:r})=>n?cs(n):r.redirectTo?{redirect:{name:"page",params:{id:r.redirectTo,lang:e.params.lang}}}:{body:t(r,e.params)},ps=hs(t=>({main:y`
    <app-page name="${t.id}" .nav="${t.nav}"></app-page>
  `,sidebar:t.byCategories?y`<pages-by-categories .items="${t.byCategories}"></pages-by-categories>`:null}));function fs(t){return t?JSON.parse(`{"${t.replace(/&/g,'","').replace(/=/g,'":"')}"}`):{}}function gs(t){return t?Object.keys(t).reduce((e,n)=>(e.push(`${n}=${t[n]}`),e),[]).join("&"):""}const ms=Object.freeze(Object.defineProperty({__proto__:null,parse:fs,stringify:gs},Symbol.toStringTag,{value:"Module"}));function vs(t){return t.restrictions?t.path.replace(/:([\w_-]+)(\?)?/g,(e,n,r="")=>{const i=t.restrictions[n];return i?`:${n}(${i})${r}`:n+r}):t.path}function nr(t,e){return t.map(n=>{const r=e[n.controller];if(!r)throw new Error(`Did you forget to specify controller for route "${n.name}"?`);const i={name:n.name,path:vs(n),...r(n)};return n.meta&&n.meta.encode===!1&&(i.pathOptions={compile:{encode:s=>s}}),n.children&&(i.children=nr(n.children,e)),i})}function ys(t,e){let n=!1;const r=t.replace(/:([\w_-]+)\??/g,(i,s)=>((!e[s]||e[s]==="undefined")&&(n=!0),e[s]));return n?null:r}const bs=nr(hi.routes,{Home:()=>({respond:()=>({body:{main:y`<home-page></home-page>`}})}),Page(t){const e=t.meta?t.meta.categories:[];return{resolve:ds(({params:n})=>({...n,categories:e,id:ys(t.path,n)})),respond:ps}}}).concat({name:"notFound",path:"(.*)",respond({match:t}){const{pathname:e}=t.location,n=e.indexOf("/",1),r=n===-1?e.slice(1):e.slice(1,n),{search:i,hash:s}=window.location;return Te.includes(r)?{body:y`<app-page name="notfound"></app-page>`}:{redirect:{url:`/${Zn}${e}${i}${s}`}}}}),P=Xr(ui,Jr(bs),{history:{base:ai(Xe.baseUrl),query:ms}}),ws=P.url;P.url=t=>{const e={lang:be(),...t.params};return ws({...t,params:e})};"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const yn=window.visualViewport||window;function _s(t,e){const n=window.matchMedia(t),r=()=>e(n.matches);return yn.addEventListener("resize",r),r(),()=>yn.removeEventListener("resize",r)}const xs=ye((t,e)=>n=>{const r=Ii(t,e);n.value!==r&&n.setValue(r)}),N=Si,we=ye((t,e)=>Kn(()=>le(Ke(t,e))));function ks(){const t=document.createElement("div");return Object.assign(t.style,{position:"fixed",right:"10px",bottom:"10px",zIndex:50,width:"320px"}),document.body.appendChild(t),t}class Pe extends F{constructor(){super(),this._route=null,this._notificationsRoot=null,this._menu=null,this._isMobile=!1,this.ready=!1,this._unwatch=[]}connectedCallback(){super.connectedCallback(),this._unwatch.push(P.observe(e=>{this._route=e.response,this._closeMenu()},{initial:!0})),this._unwatch.push(_s("(min-width: 768px)",e=>this._isMobile=!e)),document.addEventListener("keypress",e=>{e.ctrlKey&&e.shiftKey&&e.keyCode===22&&console.log("c3bc67f")},!1)}disconnectedCallback(){super.disconnectedCallback(),this._unwatch.forEach(e=>e())}updated(){this._menu=this._menu||this.shadowRoot.querySelector("menu-drawer")}_toggleMenu(){this._menu&&this._menu.toggle()}_closeMenu(){this._menu&&this._menu.close()}notify(e,n={}){const r=document.createElement("app-notification");r.message=e,typeof n.onClick=="function"&&r.addEventListener("click",n.onClick,!1),this._notificationsRoot=this._notificationsRoot||ks(),this._notificationsRoot.appendChild(r)}_renderDrawerMenu(e){return this._isMobile?y`
      ${e}
      <h3>${N("menu.root")}</h3>
      <app-menu .items="${wt.items}" expanded></app-menu>
    `:null}_getLayout(e){return this._route.name==="home"?"":this._isMobile?"col-1":e?"col-2":"col-1"}render(){if(!this._route||!this.ready)return null;const{body:e}=this._route,n=e.sidebar?an(e.sidebar):"";return y`
      <menu-drawer ?disabled="${!this._isMobile}">
        <div slot="menu">${this._renderDrawerMenu(n)}</div>
        <app-root
          theme="${this._isMobile?"mobile":"default"}"
          layout="${this._getLayout(!!n)}"
          .menu="${wt}"
          @toggle-menu="${this._toggleMenu}"
        >
          <div slot="aside">${n}</div>
          ${an(e.main||e)}
        </app-root>
      </menu-drawer>
    `}}x(Pe,"cName","casl-docs"),x(Pe,"properties",{ready:{type:Boolean},_isMobile:{type:Boolean},_route:{type:Object}});Pe.styles=[E`
    :host {
      display: block;
    }

    .stop-war {
      position: fixed;
      z-index: 1000;
      top: 5px;
      right: 5px;
    }
  `];const Qe=E`
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
`;class Le extends F{constructor(){super(),this.theme="default",this.menu=null,this.layout=""}render(){return y`
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
    `}}x(Le,"cName","app-root"),x(Le,"properties",{theme:{type:String},layout:{type:String},menu:{type:Object}});Le.styles=[Qe,E`
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
  `];const Bt=E`
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
`,As=E`
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
`,Ss=E`
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
`,rr=E`
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
`,Es=E`
  /* other alert styles is in md.js */

  .alert-warning {
    border-left-color: #856404;
    background-color: #fff3cd;
  }

  .alert-warning:before {
    background: #856404;
    content: 'w';
  }
`,Cs={github:y`
    <svg aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub icon</title><path fill="#FFFFFF" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
  `,twitter:y`
    <svg aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon" lang="en">Twitter icon</title><path fill="#FFFFFF" d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>
  `,medium:y`
    <svg aria-labelledby="simpleicons-medium-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-medium-icon" lang="en">Medium icon</title><path fill="#FFFFFF" d="M2.846 6.36c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403H7.26l5.378 11.795 4.728-11.795H24v.403l-1.917 1.837c-.165.126-.247.333-.213.538v13.5c-.034.204.048.41.213.537l1.87 1.837v.403h-9.41v-.403l1.937-1.882c.19-.19.19-.246.19-.538V7.794l-5.39 13.688h-.727L4.278 7.794v9.174c-.052.386.076.774.347 1.053l2.52 3.06v.402H0v-.403l2.52-3.06c.27-.278.39-.67.326-1.052V6.36z"></path></svg>
  `};class Ut extends F{constructor(){super(...arguments);x(this,"year",new Date().getFullYear())}render(){return y`
      <p class="links">
        ${wt.footer.map(n=>y`
          <a href="${n.url}" target="_blank" rel="noopener">
            ${Cs[n.icon]}
          </a>
        `)}
      </p>
      <p class="copyright md">${we("copyright",{year:this.year})}</p>
    `}}x(Ut,"cName","app-footer");Ut.styles=[Bt,E`
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

    .links svg {
      width: 18px;
      height: 18px;
    }

    .links a {
      margin: 0 5px;
      text-decoration: none;
    }
  `];const Fs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEVMaXF1dXW6QQOmAAAAAXRSTlMAQObYZgAAABZJREFUeNpjoAVg/g8EB7BSg9sUygEATXU49WmTHjIAAAAASUVORK5CYII=";class ze extends F{constructor(){super(),this.theme="default",this.menu={items:[]},this._isCompactSearch=!1}_emitToggleMenu(){this.dispatchEvent(new CustomEvent("toggle-menu",{bubbles:!0,composed:!0}))}_renderControls(){return this.theme==="default"?y`
        <div class="row align-center">
          <app-quick-search></app-quick-search>
          <app-menu .items="${this.menu.items}"></app-menu>
        </div>
      `:y`
      <app-quick-search
        class="full-width-search"
        suggestionsType="page"
        toggler
        ?compact="${this._isCompactSearch}"
        @reset="${this._toggleSearch}"
        @click-icon="${this._toggleSearch}"
      ></app-quick-search>
    `}_toggleSearch(){this._isCompactSearch=!this._isCompactSearch}_renderMenuToggler(){return this.theme!=="mobile"?null:y`
      <button type="button" class="menu-toggle" @click="${this._emitToggleMenu}">
        <img src="${Fs}" width="24">
      </button>
    `}update(e){return e.has("theme")&&(this._isCompactSearch=this.theme==="mobile"),super.update(e)}render(){return y`
      <header>
        <div class="header-notification">
          <p>Do you like this package?</p>
          <a href="https://prytulafoundation.org/en/home/support_page" target="_blank">Support Ukraine 🇺🇦</a>
        </div>
        <div class="header container">
          ${this._renderMenuToggler()}
          <div>
            <app-link to="home" class="logo">${N("name")}</app-link>
            <versions-select></versions-select>
          </div>
          ${this._renderControls()}
        </div>
      </header>
      <!-- <app-lang-picker></app-lang-picker> -->
    `}}x(ze,"cName","app-header"),x(ze,"properties",{menu:{type:Object},theme:{type:String},_isCompactSearch:{type:Boolean}});ze.styles=[Qe,E`
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
      align-items: center;
      justify-content: center;
      padding: 0 10px 0 1rem;
    }

    .header-notification {
      background: rgba(84, 172, 237, 0.18);
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      gap: 0;
    }

    .header-notification p {
      margin: 0;
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

    .full-width-search {
      position: absolute;
      right: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      transition: width .3s ease-in-out;
    }

    .full-width-search[compact] {
      width: 35px;
      padding: 0;
      height: auto;
    }

    versions-select {
      vertical-align: middle;
      margin-left: -5px;
    }

    @media (min-width: 768px) {
      .header {
        justify-content: space-between;
      }

      .header-notification {
        flex-direction: row;
        justify-content: center;
        gap: 5px;
      }

      .logo {
        font-size: 3rem;
      }

      app-quick-search {
        border-radius: 15px;
        border: 1px solid #e3e3e3;
      }

      versions-select {
        vertical-align: top;
        margin-left: -10px;
      }
    }
  `];class Ie extends F{constructor(){super(),this.to="",this.active=!1,this.query=null,this.params=null,this.hash="",this.nav=!1,this._url=null,this._unwatchRouter=null}_isActive(){const e=this._getUrl(),{pathname:n}=window.location;return e.length>n.length?!1:e===n||n.startsWith(e)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._navigate.bind(this),!1),this.nav&&(this._unwatchRouter=P.observe(()=>{this.active=this._isActive()},{initial:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}update(e){const n=["to","query","params","hash"].some(r=>e.has(r));if((this._url===null||n)&&(this._url=this._generateUrl()),this.nav&&e.has("active")){const r=this.active?"add":"remove";this.classList[r]("active")}return super.update(e)}_getUrl(){return this._url=this._url||this._generateUrl(),this._url}_generateUrl(){return P.url({name:this.to,hash:this.hash,params:this.params,query:this.query})}render(){return y`
      <a itemprop="url" href="${this._url}">
        <slot></slot>
      </a>
    `}_navigate(e){e.ctrlKey||(e.preventDefault(),P.navigate({url:this._url}))}}x(Ie,"cName","app-link"),x(Ie,"properties",{to:{type:String},params:{type:Object},query:{type:Object},hash:{type:String},active:{type:Boolean},nav:{type:Boolean}});Ie.styles=E`
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
`;function Ts(t){if(t.heading)return y`<h4>${N(`menu.${t.heading}`)}</h4>`;const e=N(`menu.${t.name}`);return t.route===!1?y`<a class="link">${e}</a>`:t.url?y`<a href="${t.url}" target="_blank" rel="nofollow">${e}</a>`:t.page?y`<app-link nav to="page" .params="${{id:t.page}}">${e}</app-link>`:y`<app-link nav to="${t.name}">${e}</app-link>`}class je extends F{constructor(){super(),this.items=[]}render(){return y`
      <nav
        role="navigation"
        itemscope
        itemtype="http://schema.org/SiteNavigationElement"
      >
        ${this._renderNav(this.items,"nav")}
      </nav>
    `}_renderNav(e,n){const r=e.map(i=>y`
      <li class="dropdown-container">
        ${Ts(i)}
        ${this._renderItemNav(i)}
      </li>
    `);return y`<ul class="${n}">${r}</ul>`}_renderItemNav({children:e}){return e?this._renderNav(e,`dropdown ${this.expanded?"":"expandable"}`):""}}x(je,"cName","app-menu"),x(je,"properties",{items:{type:Array},expanded:{type:Boolean}});je.styles=E`
  :host {
    display: block;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  .dropdown-container {
    display: inline-block;
    position: relative;
    margin: 0 1rem;
  }

  .dropdown-container:hover .dropdown {
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

  .dropdown-container a,
  .dropdown-container app-link {
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
    margin-right: -14px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #4f5959;
  }
`;class Me extends F{constructor(){super(),this.article=null,this.category=""}render(){const{article:e}=this,n=this.category||e.categories[0];return y`
      <time datetime="${e.createdAt}" itemprop="datePublished">
        ${xs(e.createdAt)}
      </time>
      <span>
        ${N("article.author")}
        <span itemprop="author">${N(`article.authors.${e.author}`)}</span>
      </span>
      <slot name="more">
        <app-link to="${n}" hash="comments" .params="${e}">
          <i class="icon-comment"></i>${e.commentsCount||0}
        </app-link>
        <app-link to="${n}" .params="${e}" class="more">${N("article.readMore")}</app-link>
      </slot>
    `}}x(Me,"cName","app-article-details"),x(Me,"properties",{article:{type:Object,attribute:!1},category:{type:String}});Me.styles=[E`
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
  `];class Os extends F{constructor(){super(),this._unwatchLang=null,this._locale=be()}connectedCallback(){super.connectedCallback(),this._unwatchLang=Wn(e=>{this._locale=e,this.reload().then(()=>this.requestUpdate())})}disconnectedCallback(){this._unwatchLang(),super.disconnectedCallback()}reload(){return Promise.reject(new Error(`${this.constructor.cName} should implement "reload" method`))}}function Et(t){const e=t?`${t} - `:"";document.title=e+de("name")}function Ns(t){let e=document.head.querySelector(`meta[name="${t}"]`);return e||(e=document.createElement("meta"),e.setAttribute("name",t),document.head.appendChild(e)),e}function K(t,e){if(typeof t=="object"){Object.keys(t).forEach(i=>K(i,t[i]));return}const n=de(`meta.${t}`),r=Array.isArray(e)?e.concat(n).join(", "):e||n;Ns(t).setAttribute("content",r.replace(/[\n\r]+/g," "))}function $s({response:t}){const e=document.documentElement;e.lang!==t.params.lang&&(e.lang=t.params.lang);const n=`meta.${t.name}`;Li(n)?(Et(de(`${n}.title`)),K("keywords",de(`${n}.keywords`)),K("description",de(`${n}.description`))):(Et(),K("keywords"),K("description"))}function Ps(t){const e=t.meta||{};Et(t.title),K("keywords",e.keywords||""),K("description",e.description||"")}function Ct(t,e){const n=t.getElementById(e);if(!n)return;const r=85;n.scrollIntoView(!0),document.documentElement.scrollTop-=r}function Ls(t,e){let n=t;const r=3;let i=0;for(;n&&i<r;){if(n.tagName===e)return n;n=n.parentNode,i++}return null}function zs(t,e){let n;if(e.tagName[0]==="H"&&e.id)n=e.id;else{const r=Ls(e,"A"),i=r?r.href.indexOf("#"):-1;i!==-1&&Ct(t,r.href.slice(i+1))}if(n){const{location:r}=P.current().response,i=`${r.pathname}${window.location.search}#${n}`;P.navigate({url:i}),Ct(t,n)}}function Is(t){const{hash:e}=P.current().response.location;e?Ct(t,e):window.scroll(0,0)}function js(t,e){return le(Mt(t.content,e))}class Re extends Os{constructor(){super(),this._page=null,this.nav=[],this.name=null,this.vars={},this.type="page",this.content=js}connectedCallback(){super.connectedCallback(),this.shadowRoot.addEventListener("click",e=>{zs(this.shadowRoot,e.target)},!1)}async updated(e){(this._page===null||e.has("name")||e.has("type"))&&await this.reload()}async reload(){this._page=await Dt(this.type).load(be(),this.name),Ps(this._page),await this.updateComplete,Is(this.shadowRoot)}_renderNav(){const[e,n]=this.nav;return y`
      <app-page-nav pageType="${this.type}" .prev="${e}" .next="${n}"></app-page-nav>
    `}render(){return this._page?y`
      <article itemscope itemtype="http://schema.org/Article">
        <h1>${Mt(this._page.title)}</h1>
        <old-version-alert></old-version-alert>
        <div class="description md">${this.content(this._page,this.vars)}</div>
      </article>
      ${this.nav&&this.nav.length?this._renderNav():""}
    `:y``}}x(Re,"cName","app-page"),x(Re,"properties",{type:{type:String},name:{type:String},vars:{type:Object,attribute:!1},content:{type:Function,attribute:!1},nav:{type:Array},_page:{type:Object}});Re.styles=[As,Bt,rr,E`
    :host {
      display: block;
    }

    app-page-nav {
      margin-top: 20px;
    }
  `];class Ve extends F{constructor(){super(),this.next=null,this.prev=null,this.pageType="page"}_linkTo(e){const n=this[e];return n?y`
      <app-link to="${this.pageType}" .params="${n}" class="${e}">
        ${n.title}
      </app-link>
    `:""}render(){return y`
      ${this._linkTo("prev")}
      ${this._linkTo("next")}
    `}}x(Ve,"cName","app-page-nav"),x(Ve,"properties",{next:{type:Object},prev:{type:Object},pageType:{type:String}});Ve.styles=E`
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
`;const Ms="/v6/assets/casl-shield-Czvcyms2.png",ir=["isomorphic","versatile","declarative","typesafe","treeshakable"];function Rs(t){return y`
    <section class="feature">
      <h3>${N(`features.${t}.title`)}</h3>
      <p>${we(`features.${t}.description`)}</p>
    </section>
  `}const qt=()=>y`
  <section class="features container">${ir.map(Rs)}</section>
`;qt.styles=[E`
    .features {
      padding: 1rem 0;
      display: -ms-grid;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      -ms-grid-columns: ${jn(ir.map(()=>"minmax(200px, 1fr)").join(" "))};
    }

    .feature {
      padding: 1rem;
    }

    .feature h3 {
      font-size: 1.4rem;
    }

    .feature p:last-child {
      margin-bottom: 0;
    }
  `];class Ht extends F{render(){return y`
      <div class="bg">
        <header class="row wrap container">
          <div class="col row wrap align-start main">
            <img src="${Ms}" width="250" height="302" class="col col-fixed">
            <div class="col details">
              <h1>${N("slogan")}</h1>
              <div class="buttons">
                <app-link to="page" .params="${{id:"guide/intro"}}" class="btn btn-lg">
                  ${N("buttons.start")}
                </app-link>
                <a href="${Xe.repoURL}" target="_blank" rel="noopener" class="btn btn-lg">
                  ${N("buttons.source")}
                </a>
                <github-button
                  size="large"
                  text="Star"
                  theme="no-preference: dark; light: dark;"
                ></github-button>
              </div>
            </div>
          </div>
          <div class="col col-fixed col-example">
            <div class="example">${we("exampleCode")}</div>
          </div>
        </header>
      </div>
      ${qt()}
    `}}x(Ht,"cName","home-page");Ht.styles=[Qe,Ss,qt.styles,rr,E`
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

    h1 {
      white-space: pre-line;
      font-size: 2.2rem;
      font-family: "Stardos Stencil", "Helvetica Neue", Arial, sans-serif;
    }

    .buttons {
      display: inline-block;
      text-align: center;
    }

    .buttons app-link {
      margin-right: 5px;
    }

    github-button {
      display: block;
      margin-top: 10px;
    }

    .details {
      min-width: 300px;
    }

    .col-example {
      display: none;
    }

    @media (min-width: 768px) {
      .main > img {
        margin-right: 30px;
      }
    }

    @media (min-width: 1024px) {
      .main {
        text-align: left;
      }

      .col-example {
        display: block;
        overflow-x: auto;
        flex-basis: 40%;
      }

      .example code {
        font-size: .7rem;
      }
    }

    @media (min-width: 1200px) {
      .example code {
        font-size: .8rem;
      }

      .col-example {
        flex-basis: auto;
      }
    }
  `];/*!
 * github-buttons v2.17.0
 * (c) 2021 なつき
 * @license BSD-2-Clause
 */var Ft=window.document,he=window.Math,ct=window.HTMLElement,Se=window.XMLHttpRequest,Wt=function(t){return function(e,n,r){var i=t.createElement(e);if(n!=null)for(var s in n){var a=n[s];a!=null&&(i[s]!=null?i[s]=a:i.setAttribute(s,a))}if(r!=null)for(var c=0,o=r.length;c<o;c++){var u=r[c];i.appendChild(typeof u=="string"?t.createTextNode(u):u)}return i}},bn=Wt(Ft),Vs=function(t){var e;return function(){e||(e=1,t.apply(this,arguments))}},De=function(t,e){return{}.hasOwnProperty.call(t,e)},Tt=function(t){return(""+t).toLowerCase()},Ds="github-buttons",Bs="2.17.0",Us="https://"+("unpkg.com/"+Ds+"@"+Bs+"/dist")+"/buttons.html",U="github.com",qs="https://api."+U,sr=Se&&"prototype"in Se&&"withCredentials"in Se.prototype,Hs=sr&&ct&&"attachShadow"in ct.prototype&&!("prototype"in ct.prototype.attachShadow),H=function(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent("on"+e,n)},Gt=function(t,e,n){t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent("on"+e,n)},Ws=function(t,e,n){var r=function(){return Gt(t,e,r),n.apply(this,arguments)};H(t,e,r)},Gs=function(t,e,n){var r="readystatechange",i=function(){if(e.test(t.readyState))return Gt(t,r,i),n.apply(this,arguments)};H(t,r,i)},Xs=function(t){for(var e={href:t.href,title:t.title,"aria-label":t.getAttribute("aria-label")},n=["icon","color-scheme","text","size","show-count"],r=0,i=n.length;r<i;r++){var s="data-"+n[r];e[s]=t.getAttribute(s)}return e["data-text"]==null&&(e["data-text"]=t.textContent||t.innerText),e},Ks="body{margin:0}a{text-decoration:none;outline:0}.widget{display:inline-block;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size:0;line-height:0;white-space:nowrap}.btn,.social-count{position:relative;display:inline-block;height:14px;padding:2px 5px;font-size:11px;font-weight:600;line-height:14px;vertical-align:bottom;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-repeat:repeat-x;background-position:-1px -1px;background-size:110% 110%;border:1px solid}.btn{border-radius:.25em}.btn:not(:last-child){border-radius:.25em 0 0 .25em}.social-count{border-left:0;border-radius:0 .25em .25em 0}.widget-lg .btn,.widget-lg .social-count{height:20px;padding:3px 10px;font-size:12px;line-height:20px}.octicon{display:inline-block;vertical-align:text-top;fill:currentColor}",Qs=`.btn{color:#24292e;background-color:#eff3f6;border-color:#cfd3d6;border-color:rgba(27,31,35,.15);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23fafbfc'/%3e%3cstop offset='90%25' stop-color='%23eff3f6'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #fafbfc, #eff3f6 90%);background-image:linear-gradient(180deg, #fafbfc, #eff3f6 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFFAFBFC', endColorstr='#FFEEF2F5')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#e9ebef;background-position:0 -0.5em;border-color:#caccd0;border-color:rgba(27,31,35,.15);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f3f4f6'/%3e%3cstop offset='90%25' stop-color='%23e9ebef'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #f3f4f6, #e9ebef 90%);background-image:linear-gradient(180deg, #f3f4f6, #e9ebef 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFF3F4F6', endColorstr='#FFE8EAEE')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#e9ecef;border-color:#cacdd0;border-color:rgba(27,31,35,.15);box-shadow:inset 0 .15em .3em rgba(27,31,35,.15);background-image:none;filter:none}.social-count{color:#24292e;background-color:#fff;border-color:#ddddde;border-color:rgba(27,31,35,.15)}.social-count:focus,.social-count:hover{color:#0366d6}.octicon-heart{color:#ea4aaa}`,Zs=`.btn{color:#c9d1d9;background-color:#1a1e23;border-color:#30363d;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2321262d'/%3e%3cstop offset='90%25' stop-color='%231a1e23'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #21262d, #1a1e23 90%);background-image:linear-gradient(180deg, #21262d, #1a1e23 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF21262D', endColorstr='#FF191D22')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#292e33;background-position:0 -0.5em;border-color:#8b949e;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2330363d'/%3e%3cstop offset='90%25' stop-color='%23292e33'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #30363d, #292e33 90%);background-image:linear-gradient(180deg, #30363d, #292e33 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF30363D', endColorstr='#FF282D32')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#161719;border-color:#8b949e;box-shadow:inset 0 .15em .3em rgba(1,4,9,.15);background-image:none;filter:none}.social-count{color:#c9d1d9;background-color:#21262d;border-color:#30363d}.social-count:focus,.social-count:hover{color:#58a6ff}.octicon-heart{color:#bf4b8a}`,Js=`.btn{color:#adbac7;background-color:#30363d;border-color:#444c56;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23373e47'/%3e%3cstop offset='90%25' stop-color='%2330363d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #373e47, #30363d 90%);background-image:linear-gradient(180deg, #373e47, #30363d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF373E47', endColorstr='#FF2F353C')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#3c444d;background-position:0 -0.5em;border-color:#768390;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23444c56'/%3e%3cstop offset='90%25' stop-color='%233c444d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #444c56, #3c444d 90%);background-image:linear-gradient(180deg, #444c56, #3c444d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF444C56', endColorstr='#FF3B434C')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#2e3031;border-color:#768390;box-shadow:inset 0 .15em .3em rgba(28,33,40,.15);background-image:none;filter:none}.social-count{color:#adbac7;background-color:#373e47;border-color:#444c56}.social-count:focus,.social-count:hover{color:#539bf5}.octicon-heart{color:#ae4c82}`,Ys=function(t,e,n,r){e==null&&(e="&"),n==null&&(n="="),r==null&&(r=window.encodeURIComponent);var i=[];for(var s in t){var a=t[s];a!=null&&i.push(r(s)+n+r(a))}return i.join(e)},eo=function(t,e,n,r){r==null&&(r=window.decodeURIComponent);for(var i={},s=t.split(e),a=0,c=s.length;a<c;a++){var o=s[a];if(o!==""){var u=o.split(n);i[r(u[0])]=u[1]!=null?r(u.slice(1).join(n)):void 0}}return i},X={light:Qs,dark:Zs,dark_dimmed:Js},wn=function(t,e){return"@media(prefers-color-scheme:"+t+"){"+X[De(X,e)?e:t]+"}"},to=function(t){if(t==null)return X.light;if(De(X,t))return X[t];var e=eo(t,";",":",function(n){return n.replace(/^[ \t\n\f\r]+|[ \t\n\f\r]+$/g,"")});return X[De(X,e["no-preference"])?e["no-preference"]:"light"]+wn("light",e.light)+wn("dark",e.dark)},lt={"comment-discussion":{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M1.5 2.75a.25.25 0 01.25-.25h8.5a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-3.5a.75.75 0 00-.53.22L3.5 11.44V9.25a.75.75 0 00-.75-.75h-1a.25.25 0 01-.25-.25v-5.5zM1.75 1A1.75 1.75 0 000 2.75v5.5C0 9.216.784 10 1.75 10H2v1.543a1.457 1.457 0 002.487 1.03L7.061 10h3.189A1.75 1.75 0 0012 8.25v-5.5A1.75 1.75 0 0010.25 1h-8.5zM14.5 4.75a.25.25 0 00-.25-.25h-.5a.75.75 0 110-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0114.25 12H14v1.543a1.457 1.457 0 01-2.487 1.03L9.22 12.28a.75.75 0 111.06-1.06l2.22 2.22v-2.19a.75.75 0 01.75-.75h1a.25.25 0 00.25-.25v-5.5z"></path>'}}},download:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"></path>'}}},eye:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>'}}},heart:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path>'}}},"issue-opened":{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>'}}},"mark-github":{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>'}}},package:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"></path>'}}},play:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227z"></path>'}}},"repo-forked":{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>'}}},"repo-template":{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M6 .75A.75.75 0 016.75 0h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 .75zm5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V1.5h-.75A.75.75 0 0111 .75zM4.992.662a.75.75 0 01-.636.848c-.436.063-.783.41-.846.846a.75.75 0 01-1.485-.212A2.501 2.501 0 014.144.025a.75.75 0 01.848.637zM2.75 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 012.75 4zm10.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM2.75 8a.75.75 0 01.75.75v.268A1.72 1.72 0 013.75 9h.5a.75.75 0 010 1.5h-.5a.25.25 0 00-.25.25v.75c0 .28.114.532.3.714a.75.75 0 01-1.05 1.072A2.495 2.495 0 012 11.5V8.75A.75.75 0 012.75 8zm10.5 0a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-.75a.75.75 0 010-1.5h.75v-.25a.75.75 0 01.75-.75zM6 9.75A.75.75 0 016.75 9h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 9.75zm-1 2.5v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>'}}},star:{heights:{16:{width:16,path:'<path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>'}}}},no=function(t,e){t=Tt(t).replace(/^octicon-/,""),De(lt,t)||(t="mark-github");var n=e>=24&&24 in lt[t].heights?24:16,r=lt[t].heights[n];return'<svg viewBox="0 0 '+r.width+" "+n+'" width="'+e*r.width/n+'" height="'+e+'" class="octicon octicon-'+t+'" aria-hidden="true">'+r.path+"</svg>"},ut={},ro=function(t,e){var n=ut[t]||(ut[t]=[]);if(!(n.push(e)>1)){var r=Vs(function(){for(delete ut[t];e=n.shift();)e.apply(null,arguments)});if(sr){var i=new Se;H(i,"abort",r),H(i,"error",r),H(i,"load",function(){var o;try{o=JSON.parse(this.responseText)}catch(u){r(u);return}r(this.status!==200,o)}),i.open("GET",t),i.send()}else{var s=this||window;s._=function(o){s._=null,r(o.meta.status!==200,o.data)};var a=Wt(s.document)("script",{async:!0,src:t+(t.indexOf("?")!==-1?"&":"?")+"callback=_"}),c=function(){s._&&s._({meta:{}})};H(a,"load",c),H(a,"error",c),a.readyState&&Gs(a,/de|m/,c),s.document.getElementsByTagName("head")[0].appendChild(a)}}},_n=function(t,e,n){var r=Wt(t.ownerDocument),i=t.appendChild(r("style",{type:"text/css"})),s=Ks+to(e["data-color-scheme"]);i.styleSheet?i.styleSheet.cssText=s:i.appendChild(t.ownerDocument.createTextNode(s));var a=Tt(e["data-size"])==="large",c=r("a",{className:"btn",href:e.href,rel:"noopener",target:"_blank",title:e.title||void 0,"aria-label":e["aria-label"]||void 0,innerHTML:no(e["data-icon"],a?16:14)},[" ",r("span",{},[e["data-text"]||""])]),o=t.appendChild(r("div",{className:"widget"+(a?" widget-lg":"")},[c])),u=c.hostname.replace(/\.$/,"");if(("."+u).substring(u.length-U.length)!=="."+U){c.removeAttribute("href"),n(o);return}var l=(" /"+c.pathname).split(/\/+/);if(((u===U||u==="gist."+U)&&l[3]==="archive"||u===U&&l[3]==="releases"&&(l[4]==="download"||l[4]==="latest"&&l[5]==="download")||u==="codeload."+U)&&(c.target="_top"),Tt(e["data-show-count"])!=="true"||u!==U||l[1]==="marketplace"||l[1]==="sponsors"||l[1]==="orgs"||l[1]==="users"||l[1]==="-"){n(o);return}var d,h;if(!l[2]&&l[1])h="followers",d="?tab=followers";else if(!l[3]&&l[2])h="stargazers_count",d="/stargazers";else if(!l[4]&&l[3]==="subscription")h="subscribers_count",d="/watchers";else if(!l[4]&&l[3]==="fork")h="forks_count",d="/network/members";else if(l[3]==="issues")h="open_issues_count",d="/issues";else{n(o);return}var f=l[2]?"/repos/"+l[1]+"/"+l[2]:"/users/"+l[1];ro.call(this,qs+f,function(g,p){if(!g){var _=p[h];o.appendChild(r("a",{className:"social-count",href:p.html_url+d,rel:"noopener",target:"_blank","aria-label":_+" "+h.replace(/_count$/,"").replace("_"," ").slice(0,_<2?-1:void 0)+" on GitHub"},[(""+_).replace(/\B(?=(\d{3})+(?!\d))/g,",")]))}n(o)})},dt=window.devicePixelRatio||1,xn=function(t){return(dt>1?he.ceil(he.round(t*dt)/dt*2)/2:he.ceil(t))||0},io=function(t){var e=t.offsetWidth,n=t.offsetHeight;if(t.getBoundingClientRect){var r=t.getBoundingClientRect();e=he.max(e,xn(r.width)),n=he.max(n,xn(r.height))}return[e,n]},kn=function(t,e){t.style.width=e[0]+"px",t.style.height=e[1]+"px"},so=function(t,e){if(!(t==null||e==null))if(t.getAttribute&&(t=Xs(t)),Hs){var n=bn("span");_n(n.attachShadow({mode:"closed"}),t,function(){e(n)})}else{var r=bn("iframe",{src:"javascript:0",title:t.title||void 0,allowtransparency:!0,scrolling:"no",frameBorder:0});kn(r,[0,0]),r.style.border="none";var i=function(){var s=r.contentWindow,a;try{a=s.document.body}catch{Ft.body.appendChild(r.parentNode.removeChild(r));return}Gt(r,"load",i),_n.call(s,a,t,function(c){var o=io(c);r.parentNode.removeChild(r),Ws(r,"load",function(){kn(r,o)}),r.src=Us+"#"+(r.name=Ys(t)),e(r)})};H(r,"load",i),Ft.body.appendChild(r)}};class Ot extends F{constructor(){super(),this.href=Xe.repoURL,this.size=void 0,this.theme="light",this.showCount=!0,this.text=void 0}_collectOptions(){return{href:this.href,"data-size":this.size,"data-color-scheme":this.theme,"data-show-count":this.showCount,"data-text":this.text}}update(){so(this._collectOptions(),e=>{this.shadowRoot.firstChild?this.shadowRoot.replaceChild(e,this.shadowRoot.firstChild):this.shadowRoot.appendChild(e)})}}x(Ot,"cName","github-button"),x(Ot,"properties",{href:{type:String},size:{type:String},theme:{type:String},showCount:{type:Boolean},text:{type:String}});const oo={dropdown(t){const e=t.hints.title||t.doc.title,n=t.hints.headings||t.doc.headings||[];return y`
      <div class="row item">
        <div class="col title">
          <app-link to="page" .params="${t.doc}">${le(e)}</app-link>
        </div>
        <div class="col">
          ${n.map(r=>y`
            <app-link to="page" .params="${t.doc}" hash="${r.id}">
              ${le(r.title)}
            </app-link>
          `)}
        </div>
      </div>
    `},page(t){const e=t.hints.title||t.doc.title,n=t.hints.headings||t.doc.headings||[];return y`
      ${n.map(r=>y`
        <app-link class="item" to="page" .params="${t.doc}" hash="${r.id}">
          ${le(`${e} › ${r.title}`)}
        </app-link>
      `)}
    `}};function ao(t,e){if(!t)return"";if(!t.length)return y`
      <div class="suggestions ${e}">
        ${N("search.noMatch")}
      </div>
    `;const n=oo[e||"dropdown"];return y`
    <div class="suggestions ${e}">
      ${t.map(([r,i])=>y`
        <h5>${N(`categories.${r}`)}</h5>
        ${i.map(n)}
      `)}
    </div>
  `}const co=y`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px">
    <path d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z" />
  </svg>
`,lo=y`
  <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
    <polyline points='268 112 412 256 268 400' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
    <line x1='392' y1='256' x2='100' y2='256' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
  </svg>
`;class Be extends F{constructor(){super(),this.value="",this.suggestionsType="dropdown",this.compact=!1,this.toggler=!1,this._suggestions=null,this._clickOutside=this._clickOutside.bind(this),this._search=Ci(this._search,500),this._unwatchRouter=null}_setValue(e){this.value=e.trim(),this.dispatchEvent(new CustomEvent("update",{detail:this.value}))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._clickOutside,!1),this._unwatchRouter=P.observe(()=>this._reset())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._clickOutside,!1),this._unwatchRouter()}_reset(){this.value&&(this._setValue(""),this._suggestions=null,this.dispatchEvent(new CustomEvent("reset")))}_clickOutside(e){this.shadowRoot.contains(e.target)||(this._suggestions=null)}async _search(){if(!this.value){this._suggestions=null;return}const n=(await Dt("page").search(be(),this.value,{prefix:!0})).reduce((r,i)=>{const s=i.doc.categories[0];return r.has(s)||r.set(s,[]),r.get(s).push(i),r},new Map);this._suggestions=Array.from(n)}_updateValue(e){this._setValue(e.target.value),this._search()}_emitIconClick(){this.dispatchEvent(new CustomEvent("click-icon"))}render(){return y`
      <div class="search-form ${this.compact?"compact":""}">
        <label class="input">
          <div class="icon" @click="${this._emitIconClick}">
            ${this.compact||!this.toggler?co:lo}
          </div>

          <input
            autocomplete="off"
            autocorrect="off"
            placeholder="${N("search.placeholder")}"
            .value="${this.value}"
            @input="${this._updateValue}"
          >
        </label>
        ${ao(this._suggestions,this.suggestionsType)}
      </div>
    `}}x(Be,"cName","app-quick-search"),x(Be,"properties",{value:{type:String},suggestionsType:{type:String},compact:{type:Boolean},toggler:{type:Boolean},_suggestions:{type:Array}});Be.styles=[Qe,E`
    :host {
      display: block;
    }

    .search-form {
      position: relative;
      border-radius: inherit;
      height: 100%;
    }

    .input {
      display: block;
      padding: 1px 6px;
      color: #273849;
      transition: border-color 1s;
      white-space: nowrap;
      background: #fff;
      height: 100%;
      border-radius: inherit;
    }

    svg {
      width: 16px;
      height: 16px;
    }

    .icon {
      line-height: 0.7;
      cursor: pointer;
    }

    .icon,
    input {
      display: inline-block;
      vertical-align: middle;
    }

    .input path {
      fill: #e3e3e3;
    }

    input {
      height: 100%;
      font-size: 0.9rem;
      box-sizing: border-box;
      outline: none;
      width: calc(100% - 20px);
      margin-left: 5px;
      border: 0;
      background-color: transparent;
    }

    .suggestions {
      position: absolute;
      left: 8px;
      z-index: 1000;
      top: 120%;
      background: #fff;
      padding: 5px;
      overflow-y: auto;
    }

    .suggestions.dropdown {
      border-radius: 4px;
      border: 1px solid #e3e3e3;
      width: 500px;
      max-height: 500px;
    }

    .suggestions.page {
      left: -10px;
      width: 101%;
      height: calc(100vh - 50px);
      border: 0;
      border-radius: 0;
    }

    input:focus {
      outline: transparent;
    }

    h5 {
      margin: 0;
      padding: 5px 10px;
      background-color: #1b1f23;
      color: #fff;
    }

    app-link {
      display: block;
      padding: 5px;
      font-size: 0.9rem;
      border-bottom: 0;
    }

    app-link:hover {
      background: #eee;
    }

    .title {
      flex-basis: 40%;
      max-width: 40%;
      border-right: 1px solid #e3e3e3;
    }

    .item {
      border-bottom: 1px solid #e3e3e3;
    }

    mark {
      font-weight: bold;
      background: transparent;
    }

    .compact .input {
      border-color: transparent;
      background: transparent;
    }

    .compact input {
      display: none;
    }

    .compact .input path {
      fill: #1b1f23;
    }
  `];class or extends F{render(){return y`
      <select @change="${this._changeLang}">
        <option value="ru">ru</option>
        <option value="uk">uk</option>
      </select>
    `}_changeLang(e){const n=e.target.value,r=P.current().response;P.navigate({url:P.url({name:r.name,params:{...r.params,lang:n},query:r.location.query,hash:r.location.hash})})}}x(or,"cName","app-lang-picker");const uo="/v6/assets/liqpay-BEspGQjK.svg",ho="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAADkAQMAAAC2bMrzAAAABlBMVEX///8AAABVwtN+AAACK0lEQVRYw9XYMY7mIAyG4TeioOQIPgo3I8nNOApHoKSw8m1B5t+Z7VfrRSkiPWkibLANf21lSXqyAKemWTVxuyVJV1QdQAOoFFGU1N3uBVhcPTVaHkny0pO6UzWOZVrRVWmSZqV0qG73f6GaVVKSKJ3wCjSM0h300R9xFU13hg4v/ffzZ/4G03dZmtWLNPHS3a6fB2IwzdKi5QHV2cHTsYc3ckIqtDyOZQCgWZ2KPXBq8M806/OdU730JEHD7sA69pu+zuc0q8axOPY9GFGxBxposg86L3IOacdGSM26NYA0a5o1qXuRdMfWcWicC0rfYeNFTmPnZUzFrjzIoojS9/WddC8adgXVrAt78tAE8NKdCg2Onb8RdZ+EEkVpsmvRNI5Fy7qiql15NEzqSX3/VNKD3YqrO0TMS6cIkHoap/TkvQsBNete9rwVnfYZ7jQssGIPHMso8tL19oNPHsTVrFujQZIAQOpuV5YWgXXZvcy3ld0PttAKx6LB3gJKp8g511eGRlW7spL6Lp69vBmKhVV7siSlWSlKklOxK+srQwNqHqfGoZHmuxEOaYfNV1f+DxQab2w4+x4Upk+XGlMBsnw3VrtPsevT8UXUPQ0AqFL30gHsfnMwqA6gQZpVu+aHpAu7vs8Yo+mp0QCql3e65Sbp+uRgUM3DYdf8aVbplt5dCKwCnOr77uaU7gVhFWhZSdLEQZLGuXvEqPpOET8T5jTx3Vt9mzHG0pDrFxd5veytOF4pAAAAAElFTkSuQmCC",po="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAWCAMAAAAvk+g+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADPUExURQAAAPv7+/T09Lm5uf////z8/OLi4v7+/v39/QICAnt7e7S0tPDw8Pb29uvr63V1dRgYGKSkpNvb2+np6cDAwAgICOXl5VZWVsrKytXV1W5ubjMzM6enp/r6+sfHx+fn5/Ly8t/f38/Pz+7u7g4ODs3NzYWFhZmZmUFBQR4eHpGRkQUFBcTExLy8vJ2dndHR0To6Oq2trZKSktjY2BQUFKCgoICAgEhISI6OjrGwsSIiIltbW/79/i4uLiYmJk1NTaqqqpaWlmZmZmFhYYmJiVdCR2MAAAM3SURBVEjHvdbZkqJKEAbgH6EqM1EEUXBFcBC13fe1215m3v+ZzkWrrSfOuZmI7rygCCqivoDgryzQrXI5pu8vXG/U5KU5VkRkqJ8BwyfgXKao9doIfwQ0AUiF3wWw+QdAXgAQ0w8ANJ1vBjlr9AtjAFI7AEDV+IuF6psaWdZ/TvG4tCLrDoyPgF14Baq5NwDY/M0nNVH6X3CIinUP1gSQTrjfhyoToJpGyRfJD8PdKs+XZ8x8Adki67OILhciIouW/wIzAFIj9t/y4eH3sjzeHfuXbMymtaxnT6L21m4zcbqw3VaZKZ7mO+/uMiRSeuNu8zkmE5vx1p5ERMnkT2OfMTnTabnk/lkRLVHhaDGd8AVMXwDpqMUacs5ItbsAOp9gHoPAw8jtrmUdUriTblfmPvmYH59Efkf864h1gN8pmWiOPMi7Uo3RfC6jCicIBl4gzZSHqBglnNLbTzN+kr1TAgAMCtEJAFZXsOoXP9DQ8Ssy3sq2XN6jYfh4aRdqI6TODptUf2BDJk6r1AyCjqrNIuOABieQfOo3seIhJpVgEN/FothJ+gIAwCQXABg4V7DF9A6T2EaWdBESFb2g7MNlFT0hXcnAIZ5hp0yUFLOLCetp722MKiXwjGd2UaelbL3ziu9zqBsXDyfnQ3DM+AYS9WEy2ciKIgmR8yLah0usjkgzOTFRB0fDRImJ9pKPmyO3N5cqF+AZxDbqtBTIuq7uQL959YBJvCnp6376AEYD1Cyq45z4cInUGWkYPIXEeWmwib4i51XaFbEjnqHKCTyDyEadhti1Rrvi8w10ql8eXkL+ysADaB2k2XqbS4luIPeketh4ozab6A7zDcwLNTnpdIGqKsBTlmWjzkNMop7Yzg2s4756d5nLo0Xch8lso0bRxoN0351P0DiiyIUegPOByIT7Cmn+YqeHrtf4fENl0SdY4XSAt2ssqP0ABsUvMNUpU1EXiGKdEBvlLIuJyNExkdLaYVK6NkvZslKd5mZZgUgZflvndMiG1mRRrHNc1glzrLW6gnr9IK6+vT3xonvnyQ/0Qw7b7bqfTZsCoKd+oAEzET0zp/mPaut7jzZ4bAFEz0TWd4L/AJltcxCN1O75AAAAAElFTkSuQmCC",fo="/v6/assets/monobank-qrcode-D2EIVs4s.svg",Xt={liqpay:{icon:uo,image:ho},mono:{icon:po,image:fo}},ht=Object.keys(Xt);function go(t){const e=Xt[t];if(!e)return console.warn(`Cannot find configuration for ${t} payment option`),null;let n;return e.image&&(n=y`<img src="${e.image}">`),y`<div class="selected">${n}</div>`}class Ue extends F{constructor(){super(),this.selected=""}connectedCallback(){super.connectedCallback(),ht.length===1&&(this.selected=ht[0])}_setSelected({target:e}){if(e.tagName!=="IMG"){this.selected="";return}this.selected=e.getAttribute("data-name")}render(){return y`
      <div class="options" @click=${this._setSelected}>
        ${ht.map(e=>y`
          <img src="${Xt[e].icon}" alt="${N(`payment.${e}`)}" data-name="${e}">
        `)}
      </div>
      ${this.selected?go(this.selected):""}
    `}}x(Ue,"cName","one-time-donations"),x(Ue,"properties",{selected:{type:String}});Ue.styles=E`
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
`;class qe extends F{constructor(){super(),this.items=null,this.type="page",this.categories=null}render(){const e=this.categories||Object.keys(this.items);return y`
      <nav>
        ${e.map(n=>y`
          <h3>${N(`categories.${n}`)}</h3>
          <ul>
            ${this.items[n].map(r=>y`
              <li><app-link nav to="${this.type}" .params="${r}">${r.title}</app-link></li>
            `)}
          </ul>
        `)}
      </nav>
    `}}x(qe,"cName","pages-by-categories"),x(qe,"properties",{items:{type:Object},type:{type:String},categories:{type:Array}});qe.styles=E`
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
`;class He extends F{constructor(){super(),this.type="info",this.message=""}render(){return y`${we(this.message)}`}}x(He,"cName","app-notification"),x(He,"properties",{type:{type:String},message:{type:String}});He.styles=E`
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
`;var ar=function(t,e,n){return t.addEventListener(e,n,!1),function(){return t.removeEventListener(e,n,!1)}};try{var mo=Object.defineProperty({},"passive",{get:function(){return ar=function(t,e,n){return t.addEventListener(e,n,{passive:!0}),function(){return t.removeEventListener(e,n,{passive:!0})}},!0}});window.addEventListener("test",null,mo)}catch{}var se=function(t,e,n){return ar(t,e,n)},vo=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return setTimeout(t,1e3/60)},yo=window.document.documentElement,cr=function(){for(var t=["Webkit","Khtml","Moz","ms","O"],e=0;e<t.length;e++)if(t[e]+"Opacity"in yo.style)return"-"+t[e].toLowerCase()+"-";return""}();function G(t,e,n){t.style[cr+e]=n}var pt=window.navigator.msPointerEnabled,bo=window.document.documentElement,Ae={start:pt?"MSPointerDown":"touchstart",move:pt?"MSPointerMove":"touchmove",end:pt?"MSPointerUp":"touchend",cancel:"touchcancel"},Y={end:"webkitTransitionEnd"in bo.style?"webkitTransitionEnd":"transitionend"},lr=window.document,oe=lr.documentElement,ft=!1,wo=function(){function t(n){n===void 0&&(n={}),this.panel=n.panel,this.menu=n.menu,this.t=n.eventsEmitter||this.panel,this.i=0,this.s=0,this.o=!1,this.h=!1,this.u=!1,this.l=!1,this.v=n.touch===void 0||!!n.touch,this.p=n.side||"left",this.m=n.easing||"ease",this.M=parseInt(n.duration,10)||300,this.T=parseInt(n.tolerance,10)||70,this.g=parseInt(n.padding,10)||.8*window.innerWidth,this.k=this.g,this.I=this.p==="right"?-1:1,this.k*=this.I,this.O(),this.v&&(this.P(),this.v=this.v!=="manual")}var e=t.prototype;return e.O=function(){var n=this.panel.classList,r=this.menu.classList;n.contains("slideout-panel")||n.add("slideout-panel"),n.contains("slideout-panel-"+this.p)||n.add("slideout-panel-"+this.p),r.contains("slideout-menu")||r.add("slideout-menu"),r.contains("slideout-menu-"+this.p)||r.add("slideout-menu-"+this.p)},e.S=function(n){return this.t.dispatchEvent(new window.CustomEvent(n)),this},e.on=function(n,r,i){var s=this;return this.t.addEventListener(n,r,i),function(){return s.t.removeEventListener(n,r,i)}},e.open=function(){this.S("beforeopen"),oe.classList.contains("slideout-open")||oe.classList.add("slideout-open"),this.X(),this.j(this.k),this.u=!0;var n=this;return this.panel.addEventListener(Y.end,function r(){n.panel.removeEventListener(Y.end,r),G(n.panel,"transition",""),n.S("open")}),this},e.close=function(){if(!this.isOpen()&&!this.o)return this;this.S("beforeclose"),this.X(),this.j(0),this.u=!1;var n=this;return this.panel.addEventListener(Y.end,function r(){n.panel.removeEventListener(Y.end,r),oe.classList.remove("slideout-open"),G(n.panel,"transition",""),G(n.panel,"transform",""),n.S("close")}),this},e.toggle=function(){return this.isOpen()?this.close():this.open()},e.isOpen=function(){return this.u},e.j=function(n){this.s=n,G(this.panel,"transform","translateX("+n+"px)")},e.X=function(){G(this.panel,"transition",cr+"transform "+this.M+"ms "+this.m)},e.P=function(){var n,r,i,s,a,c,o=this,u=function(){ft=!1};this.D=(i=function(){o.h||(clearTimeout(n),ft=!0,n=setTimeout(u,250))},a=!1,c=function(){i.call(r,s),a=!1},se(r=lr,"scroll",function(l){s=l,a||(vo(c),a=!0)})),this.K=se(this.panel,Ae.start,function(l){l.touches!==void 0&&(o.h=!1,o.o=!1,o.i=l.touches[0].pageX,o.l=!o.v||!o.isOpen()&&o.menu.clientWidth!==0)}),this.U=se(this.panel,Ae.cancel,function(){o.h=!1,o.o=!1}),this.W=se(this.panel,Ae.end,function(){if(o.h)if(o.S("translateend"),o.o&&Math.abs(o.s)>o.T)o.open();else if(o.k-Math.abs(o.s)<=o.T/2){o.X(),o.j(o.k);var l=o;o.panel.addEventListener(Y.end,function d(){this.panel.removeEventListener(Y.end,d),G(l.panel,"transition","")})}else o.close();o.h=!1}),this.q=se(this.panel,Ae.move,function(l){if(!(ft||o.l||l.touches===void 0||function(g){for(var p=g;p.parentNode;){if(p.getAttribute("data-slideout-ignore")!==null)return p;p=p.parentNode}return null}(l.target))){var d=l.touches[0].clientX-o.i,h=d;if(o.s=d,!(Math.abs(h)>o.g||Math.abs(d)<=20)){o.o=!0;var f=d*o.I;o.u&&f>0||!o.u&&f<0||(o.h||o.S("translatestart"),f<=0&&(h=d+o.g*o.I,o.o=!1),o.h&&oe.classList.contains("slideout-open")||oe.classList.add("slideout-open"),G(o.panel,"transform","translateX("+h+"px)"),o.S("translate",h),o.h=!0)}}})},e.enableTouch=function(){return this.v=!0,this},e.disableTouch=function(){return this.v=!1,this},e.destroy=function(){this.close(),this.K(),this.U(),this.W(),this.q(),this.D()},t}();class We extends F{constructor(){super(),this._drawer=null,this.isOpen=!1,this.disabled=!1,this._scrollTop=0}open(){this.isOpen=!0}close(){this.isOpen=!1}toggle(){this.isOpen=!this.isOpen}_createDrawer(){const[e,n]=this.shadowRoot.children;this._drawer=new wo({menu:e,panel:n,eventsEmitter:this,padding:270,touch:!1});const r=()=>this._drawer.close();this._drawer.on("beforeopen",()=>{this.isOpen=!0,this._scrollTop=window.pageYOffset,e.classList.add("open"),n.style.top=`${-this._scrollTop}px`,n.addEventListener("mousedown",r,!1),n.addEventListener("touchstart",r,!1),window.scroll(0,0)}),this._drawer.on("close",()=>{this.isOpen=!1,e.classList.remove("open"),n.style.top="",window.scroll(0,this._scrollTop),n.removeEventListener("mousedown",r,!1),n.removeEventListener("touchstart",r,!1)})}updated(e){if(this._drawer||this._createDrawer(),this.isOpen!==this._drawer.isOpen()){const n=this.isOpen?"open":"close";this._drawer[n]()}if(e.has("disabled")){const n=this.disabled?"disableTouch":"enableTouch";this._drawer[n]()}}disconnectedCallback(){super.disconnectedCallback(),this._drawer.destroy(),this._drawer=null}render(){return y`
      <div class="menu">
        <slot name="menu"></slot>
      </div>
      <div class="panel">
        <slot></slot>
      </div>
    `}}x(We,"cName","menu-drawer"),x(We,"properties",{isOpen:{type:Boolean},disabled:{type:Boolean}});We.styles=E`
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
`;function Kt(){return"v6"}async function ur(){return(await ue("/versions.txt",{format:"txtArrayJSON",cache:!0})).body}function dr(t){return window.location.href.replace(`/${Kt()}/`,`/${t}/`)}function _o(t){window.location.href=dr(t.target.value)}class Qt extends F{constructor(){super(),this._versions=[],this._currentVersion=Kt(),this._currentVersion&&this._versions.push({number:this._currentVersion})}async connectedCallback(){super.connectedCallback();const e=await ur();this._versions=e.slice(0).reverse(),this.requestUpdate()}render(){return y`
      <select @change=${_o}>
        ${this._versions.map(e=>y`
          <option .selected=${e.number===this._currentVersion}>${e.number}</option>
        `)}
      </select>
    `}}x(Qt,"cName","versions-select");Qt.styles=E`
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
`;class Zt extends F{constructor(){super(),this._versions=[],this._currentVersion=Kt()}async connectedCallback(){super.connectedCallback(),this._unwatchRouter=P.observe(()=>this.requestUpdate()),this._versions=await ur(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}render(){const e=this._versions[this._versions.length-1];return!e||e.number===this._currentVersion?y``:y`
      <div class="alert alert-warning">
        ${we("oldVersionAlert",{latestVersion:e.number,currentVersion:this._currentVersion,latestVersionUrl:dr(e.number)})}
      </div>
    `}}x(Zt,"cName","old-version-alert");Zt.styles=[Bt,Es,E`
    a {
      color: inherit;
    }
  `];const xo=[Pe,Le,Ut,ze,Ie,je,Me,Re,Ht,Ve,Be,or,Ot,qe,Ue,He,We,Qt,Zt];function ko(t){const e=document.querySelector(t);return xo.forEach(n=>customElements.define(n.cName,n)),P.observe(async n=>{const r=n.response.params.lang||Zn;be()!==r&&(await zi(r),e.ready=!0),$s(n)}),e}const{navigator:ve,location:pe}=window,Ao=pe.hostname==="localhost"||pe.hostname==="[::1]"||pe.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),So="serviceWorker"in ve,ne=(...t)=>console.log(...t);function Eo(t,e){t&&(t.onstatechange=()=>{ne("new worker state",t.state),t.state==="installed"&&(ve.serviceWorker.controller?(ne("New content is available and will be used when all tabs for this page are closed."),e&&e.onUpdate&&e.onUpdate(t)):(ne("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(t)))})}function An(t,e){let n=!1;return ve.serviceWorker.addEventListener("controllerchange",()=>{n||(n=!0,pe.reload())}),ve.serviceWorker.register(t).then(r=>{ne("service worker is registered"),r.onupdatefound=()=>Eo(r.installing,e)}).catch(r=>{console.error("Error during service worker registration:",r)})}function Co(t){So&&window.addEventListener("load",()=>{const e="/v6/sw.js";Ao?fetch(e,{headers:{"Service-Worker":"script"}}).then(n=>{const r=n.headers.get("content-type")||"";n.status===404||r.indexOf("javascript")===-1?(ne("Service worker not found"),ve.serviceWorker.ready.then(i=>i.unregister()).then(()=>pe.reload())):An(e,t)}).catch(()=>{ne("No internet connection found. App is running in offline mode.")}):An(e,t)})}window.__isAppExecuted__=!0;const Fo=ko("casl-docs");Co({onUpdate(t){Fo.notify("updateAvailable",{onClick(){t.postMessage({type:"SKIP_WAITING"})}})}});
//# sourceMappingURL=index-CwoALAOk.js.map
