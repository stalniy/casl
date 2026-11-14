var li=Object.defineProperty;var ci=(n,e,t)=>e in n?li(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var _=(n,e,t)=>ci(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
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
 */const Kt=typeof window<"u"&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0,di=(n,e,t=null,i=null)=>{for(;e!==t;){const r=e.nextSibling;n.insertBefore(e,i),e=r}},At=(n,e,t=null)=>{for(;e!==t;){const i=e.nextSibling;n.removeChild(e),e=i}};/**
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
 */const V=`{{lit-${String(Math.random()).slice(2)}}}`,gn=`<!--${V}-->`,Gt=new RegExp(`${V}|${gn}`),se="$lit$";class vn{constructor(e,t){this.parts=[],this.element=t;const i=[],r=[],s=document.createTreeWalker(t.content,133,null,!1);let a=0,l=-1,o=0;const{strings:c,values:{length:u}}=e;for(;o<u;){const d=s.nextNode();if(d===null){s.currentNode=r.pop();continue}if(l++,d.nodeType===1){if(d.hasAttributes()){const p=d.attributes,{length:f}=p;let g=0;for(let h=0;h<f;h++)Xt(p[h].name,se)&&g++;for(;g-- >0;){const h=c[o],x=pt.exec(h)[2],y=x.toLowerCase()+se,v=d.getAttribute(y);d.removeAttribute(y);const b=v.split(Gt);this.parts.push({type:"attribute",index:l,name:x,strings:b}),o+=b.length-1}}d.tagName==="TEMPLATE"&&(r.push(d),s.currentNode=d.content)}else if(d.nodeType===3){const p=d.data;if(p.indexOf(V)>=0){const f=d.parentNode,g=p.split(Gt),h=g.length-1;for(let x=0;x<h;x++){let y,v=g[x];if(v==="")y=q();else{const b=pt.exec(v);b!==null&&Xt(b[2],se)&&(v=v.slice(0,b.index)+b[1]+b[2].slice(0,-se.length)+b[3]),y=document.createTextNode(v)}f.insertBefore(y,d),this.parts.push({type:"node",index:++l})}g[h]===""?(f.insertBefore(q(),d),i.push(d)):d.data=g[h],o+=h}}else if(d.nodeType===8)if(d.data===V){const p=d.parentNode;(d.previousSibling===null||l===a)&&(l++,p.insertBefore(q(),d)),a=l,this.parts.push({type:"node",index:l}),d.nextSibling===null?d.data="":(i.push(d),l--),o++}else{let p=-1;for(;(p=d.data.indexOf(V,p+1))!==-1;)this.parts.push({type:"node",index:-1}),o++}}for(const d of i)d.parentNode.removeChild(d)}}const Xt=(n,e)=>{const t=n.length-e.length;return t>=0&&n.slice(t)===e},bn=n=>n.index!==-1,q=()=>document.createComment(""),pt=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;/**
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
 */const Et=133;function yn(n,e){const{element:{content:t},parts:i}=n,r=document.createTreeWalker(t,Et,null,!1);let s=oe(i),a=i[s],l=-1,o=0;const c=[];let u=null;for(;r.nextNode();){l++;const d=r.currentNode;for(d.previousSibling===u&&(u=null),e.has(d)&&(c.push(d),u===null&&(u=d)),u!==null&&o++;a!==void 0&&a.index===l;)a.index=u!==null?-1:a.index-o,s=oe(i,s),a=i[s]}c.forEach(d=>d.parentNode.removeChild(d))}const ui=n=>{let e=n.nodeType===11?0:1;const t=document.createTreeWalker(n,Et,null,!1);for(;t.nextNode();)e++;return e},oe=(n,e=-1)=>{for(let t=e+1;t<n.length;t++){const i=n[t];if(bn(i))return t}return-1};function pi(n,e,t=null){const{element:{content:i},parts:r}=n;if(t==null){i.appendChild(e);return}const s=document.createTreeWalker(i,Et,null,!1);let a=oe(r),l=0,o=-1;for(;s.nextNode();)for(o++,s.currentNode===t&&(l=ui(e),t.parentNode.insertBefore(e,t));a!==-1&&r[a].index===o;){if(l>0){for(;a!==-1;)r[a].index+=l,a=oe(r,a);return}a=oe(r,a)}}/**
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
 */const wn=new WeakMap,me=n=>(...e)=>{const t=n(...e);return wn.set(t,!0),t},ue=n=>typeof n=="function"&&wn.has(n);/**
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
 */const L={},Qt={};/**
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
 */class ke{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)i!==void 0&&i.setValue(e[t]),t++;for(const i of this.__parts)i!==void 0&&i.commit()}_clone(){const e=Kt?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,r=document.createTreeWalker(e,133,null,!1);let s=0,a=0,l,o=r.nextNode();for(;s<i.length;){if(l=i[s],!bn(l)){this.__parts.push(void 0),s++;continue}for(;a<l.index;)a++,o.nodeName==="TEMPLATE"&&(t.push(o),r.currentNode=o.content),(o=r.nextNode())===null&&(r.currentNode=t.pop(),o=r.nextNode());if(l.type==="node"){const c=this.processor.handleTextExpression(this.options);c.insertAfterNode(o.previousSibling),this.__parts.push(c)}else this.__parts.push(...this.processor.handleAttributeExpressions(o,l.name,l.strings,this.options));s++}return Kt&&(document.adoptNode(e),customElements.upgrade(e)),e}}/**
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
 */const Yt=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:n=>n}),hi=` ${V} `;class Se{constructor(e,t,i,r){this.strings=e,this.values=t,this.type=i,this.processor=r}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let r=0;r<e;r++){const s=this.strings[r],a=s.lastIndexOf("<!--");i=(a>-1||i)&&s.indexOf("-->",a+1)===-1;const l=pt.exec(s);l===null?t+=s+(i?hi:gn):t+=s.substr(0,l.index)+l[1]+l[2]+se+l[3]+V}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return Yt!==void 0&&(t=Yt.createHTML(t)),e.innerHTML=t,e}}/**
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
 */const Ke=n=>n===null||!(typeof n=="object"||typeof n=="function"),ht=n=>Array.isArray(n)||!!(n&&n[Symbol.iterator]);class xn{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let r=0;r<i.length-1;r++)this.parts[r]=this._createPart()}_createPart(){return new Ct(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(t===1&&e[0]===""&&e[1]===""){const s=i[0].value;if(typeof s=="symbol")return String(s);if(typeof s=="string"||!ht(s))return s}let r="";for(let s=0;s<t;s++){r+=e[s];const a=i[s];if(a!==void 0){const l=a.value;if(Ke(l)||!ht(l))r+=typeof l=="string"?l:String(l);else for(const o of l)r+=typeof o=="string"?o:String(o)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class Ct{constructor(e){this.value=void 0,this.committer=e}setValue(e){e!==L&&(!Ke(e)||e!==this.value)&&(this.value=e,ue(e)||(this.committer.dirty=!0))}commit(){for(;ue(this.value);){const e=this.value;this.value=L,e(this)}this.value!==L&&this.committer.commit()}}class G{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(q()),this.endNode=e.appendChild(q())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=q()),e.__insert(this.endNode=q())}insertAfterPart(e){e.__insert(this.startNode=q()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(this.startNode.parentNode===null)return;for(;ue(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=L,t(this)}const e=this.__pendingValue;e!==L&&(Ke(e)?e!==this.value&&this.__commitText(e):e instanceof Se?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):ht(e)?this.__commitIterable(e):e===Qt?(this.value=Qt,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling;e=e??"";const i=typeof e=="string"?e:String(e);t===this.endNode.previousSibling&&t.nodeType===3?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof ke&&this.value.template===t)this.value.update(e.values);else{const i=new ke(t,e.processor,this.options),r=i._clone();i.update(e.values),this.__commitNode(r),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i=0,r;for(const s of e)r=t[i],r===void 0&&(r=new G(this.options),t.push(r),i===0?r.appendIntoPart(this):r.insertAfterPart(t[i-1])),r.setValue(s),r.commit(),i++;i<t.length&&(t.length=i,this.clear(r&&r.endNode))}clear(e=this.startNode){At(this.startNode.parentNode,e.nextSibling,this.endNode)}}class fi{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,i.length!==2||i[0]!==""||i[1]!=="")throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;ue(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=L,t(this)}if(this.__pendingValue===L)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=L}}class mi extends xn{constructor(e,t,i){super(e,t,i),this.single=i.length===2&&i[0]===""&&i[1]===""}_createPart(){return new gi(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class gi extends Ct{}let _n=!1;(()=>{try{const n={get capture(){return _n=!0,!1}};window.addEventListener("test",n,n),window.removeEventListener("test",n,n)}catch{}})();class vi{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=r=>this.handleEvent(r)}setValue(e){this.__pendingValue=e}commit(){for(;ue(this.__pendingValue);){const s=this.__pendingValue;this.__pendingValue=L,s(this)}if(this.__pendingValue===L)return;const e=this.__pendingValue,t=this.value,i=e==null||t!=null&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=e!=null&&(t==null||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=bi(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=L}handleEvent(e){typeof this.value=="function"?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const bi=n=>n&&(_n?{capture:n.capture,passive:n.passive,once:n.once}:n.capture);/**
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
 */function yi(n){let e=pe.get(n.type);e===void 0&&(e={stringsArray:new WeakMap,keyString:new Map},pe.set(n.type,e));let t=e.stringsArray.get(n.strings);if(t!==void 0)return t;const i=n.strings.join(V);return t=e.keyString.get(i),t===void 0&&(t=new vn(n,n.getTemplateElement()),e.keyString.set(i,t)),e.stringsArray.set(n.strings,t),t}const pe=new Map;/**
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
 */const J=new WeakMap,wi=(n,e,t)=>{let i=J.get(e);i===void 0&&(At(e,e.firstChild),J.set(e,i=new G(Object.assign({templateFactory:yi},t))),i.appendInto(e)),i.setValue(n),i.commit()};/**
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
 */class xi{handleAttributeExpressions(e,t,i,r){const s=t[0];return s==="."?new mi(e,t.slice(1),i).parts:s==="@"?[new vi(e,t.slice(1),r.eventContext)]:s==="?"?[new fi(e,t.slice(1),i)]:new xn(e,t,i).parts}handleTextExpression(e){return new G(e)}}const _i=new xi;/**
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
 */typeof window<"u"&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const m=(n,...e)=>new Se(n,e,"html",_i);/**
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
 */const kn=(n,e)=>`${n}--${e}`;let Ae=!0;typeof window.ShadyCSS>"u"?Ae=!1:typeof window.ShadyCSS.prepareTemplateDom>"u"&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Ae=!1);const ki=n=>e=>{const t=kn(e.type,n);let i=pe.get(t);i===void 0&&(i={stringsArray:new WeakMap,keyString:new Map},pe.set(t,i));let r=i.stringsArray.get(e.strings);if(r!==void 0)return r;const s=e.strings.join(V);if(r=i.keyString.get(s),r===void 0){const a=e.getTemplateElement();Ae&&window.ShadyCSS.prepareTemplateDom(a,n),r=new vn(e,a),i.keyString.set(s,r)}return i.stringsArray.set(e.strings,r),r},Si=["html","svg"],Ai=n=>{Si.forEach(e=>{const t=pe.get(kn(e,n));t!==void 0&&t.keyString.forEach(i=>{const{element:{content:r}}=i,s=new Set;Array.from(r.querySelectorAll("style")).forEach(a=>{s.add(a)}),yn(i,s)})})},Sn=new Set,Ei=(n,e,t)=>{Sn.add(n);const i=t?t.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:s}=r;if(s===0){window.ShadyCSS.prepareTemplateStyles(i,n);return}const a=document.createElement("style");for(let c=0;c<s;c++){const u=r[c];u.parentNode.removeChild(u),a.textContent+=u.textContent}Ai(n);const l=i.content;t?pi(t,a,l.firstChild):l.insertBefore(a,l.firstChild),window.ShadyCSS.prepareTemplateStyles(i,n);const o=l.querySelector("style");if(window.ShadyCSS.nativeShadow&&o!==null)e.insertBefore(o.cloneNode(!0),e.firstChild);else if(t){l.insertBefore(a,l.firstChild);const c=new Set;c.add(a),yn(t,c)}},Ci=(n,e,t)=>{if(!t||typeof t!="object"||!t.scopeName)throw new Error("The `scopeName` option is required.");const i=t.scopeName,r=J.has(e),s=Ae&&e.nodeType===11&&!!e.host,a=s&&!Sn.has(i),l=a?document.createDocumentFragment():e;if(wi(n,l,Object.assign({templateFactory:ki(i)},t)),a){const o=J.get(l);J.delete(l);const c=o.value instanceof ke?o.value.template:void 0;Ei(i,l,c),At(e,e.firstChild),e.appendChild(l),J.set(e,o)}!r&&s&&window.ShadyCSS.styleElement(e.host)};/**
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
 */var An;window.JSCompiler_renameProperty=(n,e)=>n;const ft={toAttribute(n,e){switch(e){case Boolean:return n?"":null;case Object:case Array:return n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){switch(e){case Boolean:return n!==null;case Number:return n===null?null:Number(n);case Object:case Array:return JSON.parse(n)}return n}},En=(n,e)=>e!==n&&(e===e||n===n),Ye={attribute:!0,type:String,converter:ft,reflect:!1,hasChanged:En},Ze=1,Je=4,et=8,tt=16,mt="finalized";class Cn extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach((t,i)=>{const r=this._attributeNameForProperty(i,t);r!==void 0&&(this._attributeToPropertyMap.set(r,i),e.push(r))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;e!==void 0&&e.forEach((t,i)=>this._classProperties.set(i,t))}}static createProperty(e,t=Ye){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i=typeof e=="symbol"?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdateInternal(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Ye}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(mt)||e.finalize(),this[mt]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...typeof Object.getOwnPropertySymbols=="function"?Object.getOwnPropertySymbols(t):[]];for(const r of i)this.createProperty(r,t[r])}}static _attributeNameForProperty(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=En){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,r=t.converter||ft,s=typeof r=="function"?r:r.fromAttribute;return s?s(e,i):e}static _propertyValueToAttribute(e,t){if(t.reflect===void 0)return;const i=t.type,r=t.converter;return(r&&r.toAttribute||ft.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){const i=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,i)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){this._enableUpdatingResolver!==void 0&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=Ye){const r=this.constructor,s=r._attributeNameForProperty(e,i);if(s!==void 0){const a=r._propertyValueToAttribute(t,i);if(a===void 0)return;this._updateState=this._updateState|et,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._updateState=this._updateState&~et}}_attributeToProperty(e,t){if(this._updateState&et)return;const i=this.constructor,r=i._attributeToPropertyMap.get(e);if(r!==void 0){const s=i.getPropertyOptions(r);this._updateState=this._updateState|tt,this[r]=i._propertyValueFromAttribute(t,s),this._updateState=this._updateState&~tt}}requestUpdateInternal(e,t,i){let r=!0;if(e!==void 0){const s=this.constructor;i=i||s.getPropertyOptions(e),s._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),i.reflect===!0&&!(this._updateState&tt)&&(this._reflectingProperties===void 0&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|Je;try{await this._updatePromise}catch{}const e=this.performUpdate();return e!=null&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&Je}get hasUpdated(){return this._updateState&Ze}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(i){throw e=!1,this._markUpdated(),i}e&&(this._updateState&Ze||(this._updateState=this._updateState|Ze,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~Je}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){this._reflectingProperties!==void 0&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,i)=>this._propertyToAttribute(i,this[i],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}An=mt;Cn[An]=!0;/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const gt=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$t=Symbol();class Ft{constructor(e,t){if(t!==$t)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return this._styleSheet===void 0&&(gt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const $n=n=>new Ft(String(n),$t),$i=n=>{if(n instanceof Ft)return n.cssText;if(typeof n=="number")return n;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${n}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)},S=(n,...e)=>{const t=e.reduce((i,r,s)=>i+$i(r)+n[s+1],n[0]);return new Ft(t,$t)};/**
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
 */(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Zt={};class $ extends Cn{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(s,a)=>s.reduceRight((l,o)=>Array.isArray(o)?t(o,l):(l.add(o),l),a),i=t(e,new Set),r=[];i.forEach(s=>r.unshift(s)),this._styles=r}else this._styles=e===void 0?[]:[e];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!gt){const i=Array.prototype.slice.call(t.cssRules).reduce((r,s)=>r+s.cssText,"");return $n(i)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;e.length!==0&&(window.ShadyCSS!==void 0&&!window.ShadyCSS.nativeShadow?window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(t=>t.cssText),this.localName):gt?this.renderRoot.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0)}connectedCallback(){super.connectedCallback(),this.hasUpdated&&window.ShadyCSS!==void 0&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Zt&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(i=>{const r=document.createElement("style");r.textContent=i.cssText,this.renderRoot.appendChild(r)}))}render(){return Zt}}$.finalized=!0;$.render=Ci;const Fn="casl:ability:monthly-downloads",Fi=24*60*60*1e3,Ti="https://api.npmjs.org/downloads/point/last-month/@casl/ability";function Ni(){try{const n=JSON.parse(localStorage.getItem(Fn));return n&&Number.isSafeInteger(n.downloads)&&n.downloads>=0&&Number.isFinite(n.timestamp)?n:null}catch{return null}}async function Oi(){const n=Ni(),e=n?Date.now()-n.timestamp:1/0;if(e>=0&&e<Fi)return n.downloads;try{const t=await fetch(Ti,{signal:typeof AbortSignal.timeout=="function"?AbortSignal.timeout(5e3):void 0});if(!t.ok)throw new Error("Failed to retrieve npm downloads");const{downloads:i}=await t.json();if(!Number.isSafeInteger(i)||i<0)throw new Error("Invalid npm download count");try{localStorage.setItem(Fn,JSON.stringify({downloads:i,timestamp:Date.now()}))}catch{}return i}catch{return n?n.downloads:null}}let Jt=null;function ji(){return Jt??(Jt=Oi()),Jt}const Pi="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2018%207'%20width='36'%20height='14'%3e%3cpath%20fill='%23fff'%20d='M0%200h18v6H9v1H5V6H0V0zm1%201v4h2V2h1v3h1V1H1zm5%200v5h2V5h2V1H6zm2%201h1v2H8V2zm3-1v4h2V2h1v3h1V2h1v3h1V1h-6z'/%3e%3c/svg%3e",Ii=new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1});class Ee extends ${connectedCallback(){super.connectedCallback(),ji().then(e=>{this.downloads=e})}render(){return m`
      <a
        href="https://www.npmjs.com/package/@casl/ability"
        target="_blank"
        rel="noopener"
        title="@casl/ability downloads over the last 30 available days"
      >
        <span class="label"><img src="${Pi}" alt="npm" width="24" height="9"></span>
        <span class="download-count">${this.downloads==null?"—":`${Ii.format(this.downloads)}/month`}</span>
      </a>
    `}}_(Ee,"cName","npm-downloads-button"),_(Ee,"properties",{downloads:{type:Number}});Ee.styles=S`
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
 */const en=new WeakMap,ae=me(n=>e=>{if(!(e instanceof G))throw new Error("unsafeHTML can only be used in text bindings");const t=en.get(e);if(t!==void 0&&Ke(n)&&n===t.value&&e.value===t.fragment)return;const i=document.createElement("template");i.innerHTML=n;const r=document.importNode(i.content,!0);e.setValue(r),en.set(e,{value:n,fragment:r})}),Ri=1e3*60,vt="langChanged";function Li(n,e,t){return Object.entries(bt(e||{})).reduce((i,[r,s])=>i.replace(new RegExp(`{{[  ]*${r}[  ]*}}`,"gm"),String(bt(s))),n)}function zi(n,e){const t=n.split(".");let i=e.strings;for(;i!=null&&t.length>0;)i=i[t.shift()];return i!=null?i.toString():null}function bt(n){return typeof n=="function"?n():n}const Mi=()=>({loader:()=>Promise.resolve({}),empty:n=>`[${n}]`,lookup:zi,interpolate:Li,translationCache:{}});let he=Mi();function Vi(n){return he=Object.assign(Object.assign({},he),n)}function Ui(n){window.dispatchEvent(new CustomEvent(vt,{detail:n}))}function Di(n,e,t=he){Ui({previousStrings:t.strings,previousLang:t.lang,lang:t.lang=n,strings:t.strings=e})}function Tn(n,e){const t=i=>n(i.detail);return window.addEventListener(vt,t,e),()=>window.removeEventListener(vt,t)}async function qi(n,e=he){const t=await e.loader(n,e);e.translationCache={},Di(n,t,e)}function Ge(n,e,t=he){let i=t.translationCache[n]||(t.translationCache[n]=t.lookup(n,t)||t.empty(n,t));return e=e!=null?bt(e):null,e!=null?t.interpolate(i,e,t):i}function Nn(n){return n instanceof G?n.startNode.isConnected:n instanceof Ct?n.committer.element.isConnected:n.element.isConnected}function Bi(n){for(const[e]of n)Nn(e)||n.delete(e)}function Hi(n){"requestIdleCallback"in window?window.requestIdleCallback(n):setTimeout(n)}function Wi(n,e){setInterval(()=>Hi(()=>Bi(n)),e)}const Tt=new Map;function Ki(){Tn(n=>{for(const[e,t]of Tt)Nn(e)&&On(e,t,n)})}Ki();Wi(Tt,Ri);function On(n,e,t){const i=e(t);n.value!==i&&(n.setValue(i),n.commit())}const jn=me(n=>e=>{Tt.set(e,n),On(e,n)}),Gi=(n,e,t)=>jn(()=>Ge(n,e,t)),Xi=(...n)=>JSON.stringify(n);function Z(n,e=Xi){const t=new Map,i=function(...r){const s=e(...r);return t.has(s)||t.set(s,n.apply(this,r)),t.get(s)};return i.cache=t,i}function Qi(n,e){let t;return function(...i){clearTimeout(t),t=setTimeout(()=>n.apply(this,i),e)}}const ge={repoURL:"https://github.com/stalniy/casl",baseUrl:"/v6"},tn=n=>n,Yi={json:JSON,raw:{parse:tn,stringify:tn},txtArrayJSON:{parse(n){const e=n.trim().replace(/[\r\n]+/g,",");return JSON.parse(`[${e}]`)},stringify(){throw new Error('"txtArrayJSON" format is not serializable')}}};function nn(n,e={}){const t=Yi[e.format||"json"];return new Promise((i,r)=>{const s=new XMLHttpRequest;s.open(e.method||"GET",n),e.headers&&Object.keys(e.headers).forEach(a=>{s.setRequestHeader(a,e.headers[a])}),s.onload=()=>i({status:s.status,headers:{"content-type":s.getResponseHeader("Content-Type")},body:t.parse(s.responseText)}),s.ontimeout=s.onerror=r,s.send(e.data?t.stringify(e.data):null)})}const Q=Object.create(null);function le(n,e={}){const t=e.absoluteUrl?n:ge.baseUrl+n;return(e.method||"GET")!=="GET"?nn(t,e):(Q[t]=Q[t]||nn(t,e),e.cache===!0?Q[t]:Q[t].then(r=>(delete Q[t],r)).catch(r=>(delete Q[t],Promise.reject(r))))}var Zi={en:{default:"/assets/default.en-CtXkaKAQ.json"}},Ji=["en"];function Pn(n,e){const t=n.split(".");let i=e.strings;for(let r=0;r<t.length;r++){const s=t[r];if(!i||!i[s])return;i=i[s]}return i}function er(n){return console.warn(`missing i18n key: ${n}`),n}const tr=/%\{(\w+)\}/g;function Nt(n,e){return n.replace(tr,(t,i)=>e[i])}const Ot=Vi({async loader(n){return(await le(Zi[n].default)).body},lookup:Pn,interpolate:Nt,empty:er}),nr=Z((n,e)=>new Intl.DateTimeFormat(n,Ge(`dateTimeFormats.${e}`))),Ce=Ji,In=Ce[0],ve=()=>Ot.lang,ce=Ge,ir=n=>!!Pn(n,Ot);function rr(n){if(!Ce.includes(n))throw new Error(`Locale ${n} is not supported. Supported: ${Ce.join(", ")}`);return qi(n)}function sr(n,e="default"){const t=typeof n=="string"?new Date(n):n;return nr(Ot.lang,e).format(t)}const or=me((n,e)=>t=>{const i=sr(n,e);t.value!==i&&t.setValue(i)}),k=Gi,K=me((n,e)=>jn(()=>ae(Ge(n,e)))),Xe=S`
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
`,Qe=S`
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
`,ar=S`
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
`,Rn=S`
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
`,jt=S`
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
`,lr=S`
  /* other alert styles is in md.js */

  .alert-warning {
    border-left-color: #856404;
    background-color: #fff3cd;
  }

  .alert-warning:before {
    background: #856404;
    content: 'w';
  }
`,nt="/v6/media/why-casl-v1";class Pt extends ${disconnectedCallback(){this._close(),super.disconnectedCallback()}_show(){if(this._isOpen)return;const e=this.shadowRoot.querySelector("dialog"),t=this.shadowRoot.querySelector("video");this._previousOverflow=document.body.style.overflow,this._previousPadding=document.body.style.paddingRight;const i=window.innerWidth-document.documentElement.clientWidth;i&&(document.body.style.paddingRight=`${parseFloat(getComputedStyle(document.body).paddingRight)+i}px`),document.body.style.overflow="hidden",this._isOpen=!0,this.shadowRoot.querySelector('[role="status"]').hidden=!0,t.poster=`${nt}.webp`,t.src=`${nt}.mp4`,e.showModal(),this.shadowRoot.querySelector(".close").focus(),t.play().catch(()=>{})}_close(){if(!this._isOpen)return;const e=this.shadowRoot.querySelector("video");e.pause(),this._isOpen=!1,e.currentTime=0,e.removeAttribute("src"),e.removeAttribute("poster"),e.load(),this.shadowRoot.querySelector("dialog").close(),document.body.style.overflow=this._previousOverflow,document.body.style.paddingRight=this._previousPadding,this.isConnected&&this.shadowRoot.querySelector(".trigger").focus()}_cancel(e){e.preventDefault(),this._close()}_backdrop(e){if(e.target!==e.currentTarget)return;const t=e.currentTarget.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&this._close()}render(){return m`
      <button class="btn trigger" type="button" aria-haspopup="dialog" @click="${this._show}">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
          fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
          <rect x="3" y="6" width="12" height="12" rx="2" />
          <path d="m15 10 6-4v12l-6-4z" />
        </svg>
        ${k("video.title")}
      </button>
      <dialog aria-labelledby="video-title" @cancel="${this._cancel}" @click="${this._backdrop}">
        <header>
          <h2 id="video-title">${k("video.title")}</h2>
          <button class="close" type="button" @click="${this._close}">${k("video.close")} ×</button>
        </header>
        <video controls playsinline preload="none" aria-label="${k("video.title")}"
          @error="${()=>{this.shadowRoot.querySelector('[role="status"]').hidden=!1}}">
          ${k("video.unsupported")}
        </video>
        <footer>
          <span role="status" hidden>${k("video.error")}</span>
          <a href="${nt}.mp4" target="_blank" rel="noopener">${k("video.fallback")}</a>
        </footer>
      </dialog>
    `}}_(Pt,"cName","why-casl-video");Pt.styles=[Rn,S`
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
`];class Ln extends ${constructor(){super(),this._unwatchLang=null,this._locale=ve()}connectedCallback(){super.connectedCallback(),this._unwatchLang=Tn(e=>{this._locale=e,this.reload().then(()=>this.requestUpdate())})}disconnectedCallback(){this._unwatchLang(),super.disconnectedCallback()}reload(){return Promise.reject(new Error(`${this.constructor.cName} should implement "reload" method`))}}class $e extends Ln{constructor(){super(),this._rebacApproach="denormalized"}reload(){return Promise.resolve()}async _getUpdateComplete(){const e=await super._getUpdateComplete();return await this.shadowRoot.querySelector("authorization-timeline").updateComplete,e}render(){return m`
      <div class="md">
        <authorization-timeline .label="${k("consulting.evolution.modelsLabel")}">
          ${["claims","actions","rbac","abac","rebac"].map(e=>{const t=e==="rebac"?`consulting.evolution.rebac.${this._rebacApproach}`:`consulting.evolution.${e}`;return m`
            <section data-stage="${e}" data-title="${k(`consulting.evolution.${e}.title`)}">
              <div class="stage-layout">
                <div class="stage-copy">
                  <div class="stage-heading">
                    <span class="eyebrow">${k(`consulting.evolution.${e}.eyebrow`)}</span>
                    <h3>${k(`consulting.evolution.${e}.title`)}</h3>
                  </div>
                  <p>${k(`consulting.evolution.${e}.description`)}</p>
                  ${e==="rebac"?m`
                    <div class="rebac-approaches" role="radiogroup"
                      aria-label="${k("consulting.evolution.rebac.approachesLabel")}">
                      ${["denormalized","sql"].map(i=>m`
                        <label>
                          <input type="radio" name="rebac-approach" value="${i}"
                            .checked="${this._rebacApproach===i}"
                            aria-controls="rebac-example"
                            @change="${()=>{this._rebacApproach=i}}">
                          <span>${k(`consulting.evolution.rebac.${i}.label`)}</span>
                        </label>
                      `)}
                    </div>
                  `:""}
                  <div class="stage-detail">${K(`${t}.detail`)}</div>
                </div>
                <div class="stage-code" role="region" tabindex="0"
                  id="${e}-example"
                  aria-label="${k(`consulting.evolution.${e}.title`)} — ${k("consulting.evolution.codeLabel")}">
                  ${K(`${t}.example`)}
                </div>
              </div>
            </section>
          `})}
        </authorization-timeline>
      </div>
    `}}_($e,"cName","authorization-examples"),_($e,"properties",{_rebacApproach:{type:String}});$e.styles=[Qe,jt,S`
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
 */const rn=new WeakMap,sn=me(n=>e=>{if(!(e instanceof G))throw new Error("cache can only be used in text bindings");let t=rn.get(e);t===void 0&&(t=new WeakMap,rn.set(e,t));const i=e.value;if(i instanceof ke)if(n instanceof Se&&i.template===e.options.templateFactory(n)){e.setValue(n);return}else{let r=t.get(i.template);r===void 0&&(r={instance:i,nodes:document.createDocumentFragment()},t.set(i.template,r)),di(r.nodes,e.startNode.nextSibling,e.endNode)}if(n instanceof Se){const r=e.options.templateFactory(n),s=t.get(r);s!==void 0&&(e.setValue(s.nodes),e.commit(),e.value=s.instance)}e.setValue(n)});var cr=[{name:"learn",route:!1,children:[{heading:"docs"},{name:"guide",page:"guide/intro"},{name:"api"},{name:"examples",url:"https://github.com/stalniy/casl-examples"},{name:"cookbook",page:"cookbook/intro"}]},{name:"ecosystem",route:!1,children:[{heading:"packages"},{name:"pkg-prisma",page:"package/casl-prisma"},{name:"pkg-mongoose",page:"package/casl-mongoose"},{name:"pkg-angular",page:"package/casl-angular"},{name:"pkg-react",page:"package/casl-react"},{name:"pkg-vue",page:"package/casl-vue"},{name:"pkg-aurelia",page:"package/casl-aurelia"},{heading:"help"},{name:"questions",url:"https://stackoverflow.com/questions/tagged/casl"},{name:"chat",url:"https://github.com/stalniy/casl/discussions"},{heading:"news"},{name:"tweeter",url:"https://twitter.com/sergiy_stotskiy"},{name:"blog",url:"https://sergiy-stotskiy.medium.com"}]},{name:"about",route:!1,children:[{name:"privacy",url:"https://casl.js.org/v7/en/privacy",rel:"noopener noreferrer"}]},{name:"support",route:!1,children:[{name:"support-casl"},{name:"support-ukraine",url:"https://prytulafoundation.org/en/home/support_page",rel:"noopener noreferrer"}]}],dr=[{icon:"github",url:"https://github.com/stalniy/casl"},{icon:"twitter",url:"https://twitter.com/sergiy_stotskiy"},{icon:"medium",url:"https://sergiy-stotskiy.medium.com"}];const yt={items:cr,footer:dr};var ur=function(n,e){return n.methods.pathname(e)};function pr(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var te={exports:{}};te.exports=qn;te.exports.parse=It;te.exports.compile=fr;te.exports.tokensToFunction=Vn;te.exports.tokensToRegExp=Dn;var zn="/",Mn="./",hr=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function It(n,e){for(var t=[],i=0,r=0,s="",a=e&&e.delimiter||zn,l=e&&e.delimiters||Mn,o=!1,c;(c=hr.exec(n))!==null;){var u=c[0],d=c[1],p=c.index;if(s+=n.slice(r,p),r=p+u.length,d){s+=d[1],o=!0;continue}var f="",g=n[r],h=c[2],x=c[3],y=c[4],v=c[5];if(!o&&s.length){var b=s.length-1;l.indexOf(s[b])>-1&&(f=s[b],s=s.slice(0,b))}s&&(t.push(s),s="",o=!1);var A=f!==""&&g!==void 0&&g!==f,E=v==="+"||v==="*",I=v==="?"||v==="*",R=f||a,B=x||y;t.push({name:h||i++,prefix:f,delimiter:R,optional:I,repeat:E,partial:A,pattern:B?mr(B):"[^"+D(R)+"]+?"})}return(s||r<n.length)&&t.push(s+n.substr(r)),t}function fr(n,e){return Vn(It(n,e))}function Vn(n){for(var e=new Array(n.length),t=0;t<n.length;t++)typeof n[t]=="object"&&(e[t]=new RegExp("^(?:"+n[t].pattern+")$"));return function(i,r){for(var s="",a=r&&r.encode||encodeURIComponent,l=0;l<n.length;l++){var o=n[l];if(typeof o=="string"){s+=o;continue}var c=i?i[o.name]:void 0,u;if(Array.isArray(c)){if(!o.repeat)throw new TypeError('Expected "'+o.name+'" to not repeat, but got array');if(c.length===0){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to not be empty')}for(var d=0;d<c.length;d++){if(u=a(c[d],o),!e[l].test(u))throw new TypeError('Expected all "'+o.name+'" to match "'+o.pattern+'"');s+=(d===0?o.prefix:o.delimiter)+u}continue}if(typeof c=="string"||typeof c=="number"||typeof c=="boolean"){if(u=a(String(c),o),!e[l].test(u))throw new TypeError('Expected "'+o.name+'" to match "'+o.pattern+'", but got "'+u+'"');s+=o.prefix+u;continue}if(o.optional){o.partial&&(s+=o.prefix);continue}throw new TypeError('Expected "'+o.name+'" to be '+(o.repeat?"an array":"a string"))}return s}}function D(n){return n.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function mr(n){return n.replace(/([=!:$/()])/g,"\\$1")}function Un(n){return n&&n.sensitive?"":"i"}function gr(n,e){if(!e)return n;var t=n.source.match(/\((?!\?)/g);if(t)for(var i=0;i<t.length;i++)e.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return n}function vr(n,e,t){for(var i=[],r=0;r<n.length;r++)i.push(qn(n[r],e,t).source);return new RegExp("(?:"+i.join("|")+")",Un(t))}function br(n,e,t){return Dn(It(n,t),e,t)}function Dn(n,e,t){t=t||{};for(var i=t.strict,r=t.start!==!1,s=t.end!==!1,a=D(t.delimiter||zn),l=t.delimiters||Mn,o=[].concat(t.endsWith||[]).map(D).concat("$").join("|"),c=r?"^":"",u=n.length===0,d=0;d<n.length;d++){var p=n[d];if(typeof p=="string")c+=D(p),u=d===n.length-1&&l.indexOf(p[p.length-1])>-1;else{var f=p.repeat?"(?:"+p.pattern+")(?:"+D(p.delimiter)+"(?:"+p.pattern+"))*":p.pattern;e&&e.push(p),p.optional?p.partial?c+=D(p.prefix)+"("+f+")?":c+="(?:"+D(p.prefix)+"("+f+"))?":c+=D(p.prefix)+"("+f+")"}}return s?(i||(c+="(?:"+a+")?"),c+=o==="$"?"$":"(?="+o+")"):(i||(c+="(?:"+a+"(?="+o+"))?"),u||(c+="(?="+a+"|"+o+")")),new RegExp(c,Un(t))}function qn(n,e,t){return n instanceof RegExp?gr(n,e):Array.isArray(n)?vr(n,e,t):br(n,e,t)}var yr=te.exports;const on=pr(yr);var wr=function(n){return typeof n.methods.resolve<"u"},wt=function(n){return"externalURL"in n},xr=function(n,e){if(wt(n))return n;var t=n.name,i=n.params,r=n.query,s=n.hash,a=n.state,l="url"in n?n.url:e.url({name:t,params:i,query:r,hash:s});return{name:t,params:i,query:r,hash:s,state:a,url:l}},_r=function(n,e,t,i,r){var s=t||{},a=s.resolved,l=a===void 0?null:a,o=s.error,c=o===void 0?null:o,u={data:void 0,body:void 0,meta:void 0};for(var d in e)u[d]=e[d];if(!n.methods.respond)return u;var p=n.methods.respond({resolved:l,error:c,match:e,external:r});return p&&(u.meta=p.meta,u.body=p.body,u.data=p.data,p.redirect&&(u.redirect=xr(p.redirect,i))),u},kr=function(n,e,t){var i,r;t===void 0&&(t={});var s=(i=t.history,i===void 0?{}:i),a=t.sideEffects,l=t.external,o=(r=t.invisibleRedirects,r===void 0?!1:r),c,u,d,p,f,g=[],h=[],x=[],y,v,b=function(){y=void 0,v=void 0},A=function(){y&&y(),b()},E=function(){v&&v(),b()},I=function(w,C){return y=w,v=C,b},R=function(){f&&(f=void 0,g.forEach(function(w){w()}))},B=function(w){h.forEach(function(C){C(w)})},X=function(w){x.splice(0).forEach(function(C){C(w)}),a&&a.forEach(function(C){C(w)})},be=function(w,C){if(!w.redirect||!o||wt(w.redirect)){d=w,p=C;var T={response:w,navigation:C,router:u};B(T),X(T)}w.redirect!==void 0&&!wt(w.redirect)&&c.navigate(w.redirect,"replace")},ye=function(w,C,T,P,M){R(),T.finish();var z=_r(w,C,M,u,l);E(),be(z,P)},ai=function(){g.length&&f===void 0&&(f=function(){c.cancel(),R(),A()},g.forEach(function(w){w(f)}))};return c=n(function(w){var C={action:w.action,previous:d},T=e.match(w.location);if(!T){w.finish(),E();return}var P=T.route,M=T.match;wr(P)?(ai(),P.methods.resolve(M,l).then(function(z){return{resolved:z,error:null}},function(z){return{error:z,resolved:null}}).then(function(z){w.cancelled||ye(P,M,w,C,z)})):ye(P,M,w,C,null)},s),u={route:e.route,history:c,external:l,observe:function(w,C){var T,P=(T=(C||{}).initial,T===void 0?!0:T);return h.push(w),d&&P&&w({response:d,navigation:p,router:u}),function(){h=h.filter(function(M){return M!==w})}},once:function(w,C){var T,P=(T=(C||{}).initial,T===void 0?!0:T);d&&P?w({response:d,navigation:p,router:u}):x.push(w)},cancel:function(w){return g.push(w),function(){g=g.filter(function(C){return C!==w})}},url:function(w){var C=w.name,T=w.params,P=w.hash,M=w.query,z;if(C){var Wt=u.route(C);Wt&&(z=ur(Wt,T))}return c.url({pathname:z,hash:P,query:M})},navigate:function(w){A();var C=w.url,T=w.state,P=w.method;if(c.navigate({url:C,state:T},P),w.cancelled||w.finished)return I(w.cancelled,w.finished)},current:function(){return{response:d,navigation:p}},destroy:function(){c.destroy()}},c.current(),u},xt=function(n){return n.charAt(0)==="/"?n:"/"+n},Sr=function(n){return n.charAt(n.length-1)==="/"?n:n+"/"},Ar=function(n,e){return Sr(n)+e},Bn=function(n,e,t){t===void 0&&(t={path:"",keys:[]});var i=xt(Ar(t.path,n.path)),r=n.pathOptions||{},s=r.match,a=s===void 0?{}:s,l=r.compile,o=l===void 0?{}:l,c=a.end==null||a.end;n.children&&n.children.length&&(a.end=!1);var u=[],d=on(xt(n.path),u,a),p=u.map(function(E){return E.name});t.keys.length&&(p=t.keys.concat(p));var f=[],g=[];if(n.children)for(var h=0,x=n.children;h<x.length;h++){var y=x[h],v=Bn(y,e,{path:i,keys:p});f.push(v),g.push(v.public)}var b=on.compile(i),A={public:{name:n.name,keys:p,parent:void 0,children:g,methods:{resolve:n.resolve,respond:n.respond,pathname:function(E){return b(E,o)}},extra:n.extra},matching:{re:d,keys:u,exact:c,parsers:n.params||{},children:f}};return e[n.name]=A.public,f.length&&f.forEach(function(E){E.public.parent=A.public}),A},Hn=function(n,e){var t=n.matching,i=t.re,r=t.children,s=t.exact,a=i.exec(e);if(!a)return[];var l=a[0],o=a.slice(1),c=[{route:n,parsed:o}],u=e.slice(l.length);if(!r.length||u==="")return c;for(var d=xt(u),p=0,f=r;p<f.length;p++){var g=f[p],h=Hn(g,d);if(h.length)return c.concat(h)}return s?[]:c},Er=function(n,e){for(var t=n[n.length-1].route.public,i={},r=0,s=n;r<s.length;r++)for(var a=s[r],l=a.route,o=a.parsed,c=l.matching,u=c.keys,d=c.parsers,p=0,f=o.length;p<f;p++){var g=u[p].name,h=d[g]||decodeURIComponent;o[p]!==void 0&&(i[g]=h(o[p]))}return{route:t,match:{location:e,name:t.name,params:i}}},Cr=function(n){var e={},t=n.map(function(i){return Bn(i,e)});return{match:function(i){for(var r=0,s=t;r<s.length;r++){var a=s[r],l=Hn(a,i.pathname);if(l.length)return Er(l,i)}},route:function(i){return e[i]}}};function an(n,e){return n?n.indexOf(e)===0?n:e+n:""}function $r(n){return n||""}function Fr(n){return n||""}function Tr(n){n===void 0&&(n={});var e=n.query,t=e===void 0?{}:e,i=t.parse,r=i===void 0?$r:i,s=t.stringify,a=s===void 0?Fr:s,l=n.base;return{location:function(o,c){var u=o.url,d=o.state;if(u===""||u.charAt(0)==="#"){c||(c={pathname:"/",hash:"",query:r()});var p={pathname:c.pathname,hash:u.charAt(0)==="#"?u.substring(1):c.hash,query:c.query};return d&&(p.state=d),p}var f=u.indexOf("#"),g;f!==-1?(g=u.substring(f+1),u=u.substring(0,f)):g="";var h=u.indexOf("?"),x;h!==-1&&(x=u.substring(h+1),u=u.substring(0,h));var y=r(x),v=l?l.remove(u):u;v===""&&(v="/");var b={hash:g,query:y,pathname:v};return d&&(b.state=d),b},keyed:function(o,c){return o.key=c,o},stringify:function(o){if(typeof o=="string"){var c=o.charAt(0);return c==="#"||c==="?"?o:l?l.add(o):o}var u=o.pathname!==void 0?l?l.add(o.pathname):o.pathname:"";return u+an(a(o.query),"?")+an(o.hash,"#")}}}function Nr(){var n=0;return{major:function(e){return e&&(n=e[0]+1),[n++,0]},minor:function(e){return[e[0],e[1]+1]}}}function Or(n){var e=n.responseHandler,t=n.utils,i=n.keygen,r=n.current,s=n.push,a=n.replace,l;function o(g,h,x,y){var v={location:g,action:h,finish:function(){l===v&&(x(),l=void 0)},cancel:function(b){l===v&&(y(b),v.cancelled=!0,l=void 0)},cancelled:!1};return v}function c(g){l=g,e(g)}function u(g){l&&(l.cancel(g),l=void 0)}function d(g,h){var x=r(),y=t.location(g,x);switch(h){case"anchor":return t.stringify(y)===t.stringify(x)?p(y):f(y);case"push":return f(y);case"replace":return p(y);default:throw new Error("Invalid navigation type: "+h)}}function p(g){var h=t.keyed(g,i.minor(r().key));return o(h,"replace",a.finish(h),a.cancel)}function f(g){var h=t.keyed(g,i.major(r().key));return o(h,"push",s.finish(h),s.cancel)}return{prepare:d,emitNavigation:c,createNavigation:o,cancelPending:u}}function jr(){}function Pr(){var n;return{confirmNavigation:function(e,t,i){n?n(e,t,i||jr):t()},confirm:function(e){n=e||null}}}function Ir(n,e){return new RegExp("^"+e+"(\\/|\\?|#|$)","i").test(n)}function Rr(n,e){if(n.charAt(0)!=="/"||n.charAt(n.length-1)==="/")throw new Error('The base segment "'+n+'" is not valid. The "base" option must begin with a forward slash and end with a non-forward slash character.');var t={},i=t.emptyRoot,r=i===void 0?!1:i,s=t.strict,a=s===void 0?!1:s;return{add:function(l){if(r){if(l==="/")return n;if(l.startsWith("/?")||l.startsWith("/#"))return""+n+l.substr(1)}else if(l.charAt(0)==="?"||l.charAt(0)==="#")return l;return""+n+l},remove:function(l){if(l==="")return"";var o=Ir(l,n);if(!o){if(a)throw new Error('Expected a string that begins with "'+n+'", but received "'+l+'".');return l}if(l===n){if(a&&!r)throw new Error('Received string "'+n+'", which is the same as the base, but "emptyRoot" is not true.');return"/"}return l.substr(n.length)}}}function Lr(){return!!(window&&window.location)}function zr(n){return n.state===void 0&&navigator.userAgent.indexOf("CriOS")===-1}function ln(){try{return window.history.state||{}}catch{return{}}}function ne(){}function Mr(n,e){if(e===void 0&&(e={}),!Lr())throw new Error("Cannot use @hickory/browser without a DOM");var t=Tr(e),i=Nr(),r=Pr(),s=r.confirm,a=r.confirmNavigation;function l(v){var b=window.location,A=b.pathname,E=b.search,I=b.hash,R=A+E+I,B=v||ln(),X=B.key,be=B.state;X||(X=i.major(),window.history.replaceState({key:X,state:be},"",R));var ye=t.location({url:R,state:be});return t.keyed(ye,X)}function o(v){return t.stringify(v)}var c=ln().key!==void 0?"pop":"push",u=Or({responseHandler:n,utils:t,keygen:i,current:function(){return y.location},push:{finish:function(v){return function(){var b=o(v),A=v.key,E=v.state;try{window.history.pushState({key:A,state:E},"",b)}catch{window.location.assign(b)}y.location=v,c="push"}},cancel:ne},replace:{finish:function(v){return function(){var b=o(v),A=v.key,E=v.state;try{window.history.replaceState({key:A,state:E},"",b)}catch{window.location.replace(b)}y.location=v,c="replace"}},cancel:ne}}),d=u.emitNavigation,p=u.cancelPending,f=u.createNavigation,g=u.prepare,h=!1;function x(v){if(h){h=!1;return}if(!zr(v)){p("pop");var b=l(v.state),A=y.location.key[0]-b.key[0],E=function(){h=!0,window.history.go(A)};a({to:b,from:y.location,action:"pop"},function(){d(f(b,"pop",function(){y.location=b,c="pop"},function(I){I!=="pop"&&E()}))},E)}}window.addEventListener("popstate",x,!1);var y={location:l(),current:function(){d(f(y.location,c,ne,ne))},url:o,navigate:function(v,b){b===void 0&&(b="anchor");var A=g(v,b);p(A.action),a({to:A.location,from:y.location,action:A.action},function(){d(A)})},go:function(v){window.history.go(v)},confirm:s,cancel:function(){p()},destroy:function(){window.removeEventListener("popstate",x),d=ne}};return y}var Vr=[{name:"home",path:":lang",restrictions:{lang:"en"},controller:"Home",sitemap:{priority:1,changefreq:"yearly",provider:"langs"},children:[{name:"api",path:"api/:id?",restrictions:{id:"[\\w/-]+"},controller:"Page",meta:{categories:["api"],ignoreIdPrefix:!0},sitemap:{priority:.7,changefreq:"monthly",provider:"pages"}},{name:"support-casl",path:"support-casljs",controller:"Page",sitemap:{priority:1,changefreq:"yearly",provider:"route"}},{name:"page",path:":id",restrictions:{id:"[\\w/-]+"},controller:"Page",meta:{encode:!1,categories:["guide","advanced","package","cookbook"]},sitemap:{priority:1,changefreq:"monthly",provider:"pages"}}]}];const Ur={routes:Vr};/*! *****************************************************************************
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
***************************************************************************** */var F=function(){return F=Object.assign||function(e){for(var t,i=1,r=arguments.length;i<r;i++){t=arguments[i];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},F.apply(this,arguments)};function cn(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function N(n,e){var t=typeof Symbol=="function"&&n[Symbol.iterator];if(!t)return n;var i=t.call(n),r,s=[],a;try{for(;(e===void 0||e-- >0)&&!(r=i.next()).done;)s.push(r.value)}catch(l){a={error:l}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return s}function dn(){for(var n=[],e=0;e<arguments.length;e++)n=n.concat(N(arguments[e]));return n}var Dr="ENTRIES",Wn="KEYS",Kn="VALUES",O="",it=function(){function n(e,t){var i=e._tree,r=Object.keys(i);this.set=e,this._type=t,this._path=r.length>0?[{node:i,keys:r}]:[]}return n.prototype.next=function(){var e=this.dive();return this.backtrack(),e},n.prototype.dive=function(){if(this._path.length===0)return{done:!0,value:void 0};var e=U(this._path),t=e.node,i=e.keys;return U(i)===O?{done:!1,value:this.result()}:(this._path.push({node:t[U(i)],keys:Object.keys(t[U(i)])}),this.dive())},n.prototype.backtrack=function(){this._path.length!==0&&(U(this._path).keys.pop(),!(U(this._path).keys.length>0)&&(this._path.pop(),this.backtrack()))},n.prototype.key=function(){return this.set._prefix+this._path.map(function(e){var t=e.keys;return U(t)}).filter(function(e){return e!==O}).join("")},n.prototype.value=function(){return U(this._path).node[O]},n.prototype.result=function(){return this._type===Kn?this.value():this._type===Wn?this.key():[this.key(),this.value()]},n.prototype[Symbol.iterator]=function(){return this},n}(),U=function(n){return n[n.length-1]},qr=0,Br=1,rt=2,st=3,Hr=function(n,e,t){for(var i=[{distance:0,i:0,key:"",node:n}],r={},s=[],a=function(){var l=i.pop(),o=l.node,c=l.distance,u=l.key,d=l.i,p=l.edit;Object.keys(o).forEach(function(f){if(f===O){var g=c+(e.length-d),h=N(r[u]||[null,1/0],2),x=h[1];g<=t&&g<x&&(r[u]=[o[f],g])}else Wr(e,f,t-c,d,p,s).forEach(function(y){var v=y.distance,b=y.i,A=y.edit;i.push({node:o[f],distance:c+v,key:u+f,i:b,edit:A})})})};i.length>0;)a();return r},Wr=function(n,e,t,i,r,s){s.push({distance:0,ia:i,ib:0,edit:r});for(var a=[];s.length>0;){var l=s.pop(),o=l.distance,c=l.ia,u=l.ib,d=l.edit;if(u===e.length){a.push({distance:o,i:c,edit:d});continue}if(n[c]===e[u])s.push({distance:o,ia:c+1,ib:u+1,edit:qr});else{if(o>=t)continue;d!==rt&&s.push({distance:o+1,ia:c,ib:u+1,edit:st}),c<n.length&&(d!==st&&s.push({distance:o+1,ia:c+1,ib:u,edit:rt}),d!==st&&d!==rt&&s.push({distance:o+1,ia:c+1,ib:u+1,edit:Br}))}}return a},ot=function(){function n(e,t){e===void 0&&(e={}),t===void 0&&(t=""),this._tree=e,this._prefix=t}return n.prototype.atPrefix=function(e){var t;if(!e.startsWith(this._prefix))throw new Error("Mismatched prefix");var i=N(Te(this._tree,e.slice(this._prefix.length)),2),r=i[0],s=i[1];if(r===void 0){var a=N(Rt(s),2),l=a[0],o=a[1],c=Object.keys(l).find(function(u){return u!==O&&u.startsWith(o)});if(c!==void 0)return new n((t={},t[c.slice(o.length)]=l[c],t),e)}return new n(r||{},e)},n.prototype.clear=function(){delete this._size,this._tree={}},n.prototype.delete=function(e){return delete this._size,Kr(this._tree,e)},n.prototype.entries=function(){return new it(this,Dr)},n.prototype.forEach=function(e){var t,i;try{for(var r=cn(this),s=r.next();!s.done;s=r.next()){var a=N(s.value,2),l=a[0],o=a[1];e(l,o,this)}}catch(c){t={error:c}}finally{try{s&&!s.done&&(i=r.return)&&i.call(r)}finally{if(t)throw t.error}}},n.prototype.fuzzyGet=function(e,t){return Hr(this._tree,e,t)},n.prototype.get=function(e){var t=_t(this._tree,e);return t!==void 0?t[O]:void 0},n.prototype.has=function(e){var t=_t(this._tree,e);return t!==void 0&&t.hasOwnProperty(O)},n.prototype.keys=function(){return new it(this,Wn)},n.prototype.set=function(e,t){if(typeof e!="string")throw new Error("key must be a string");delete this._size;var i=Ne(this._tree,e);return i[O]=t,this},Object.defineProperty(n.prototype,"size",{get:function(){var e=this;return this._size?this._size:(this._size=0,this.forEach(function(){e._size+=1}),this._size)},enumerable:!1,configurable:!0}),n.prototype.update=function(e,t){if(typeof e!="string")throw new Error("key must be a string");delete this._size;var i=Ne(this._tree,e);return i[O]=t(i[O]),this},n.prototype.values=function(){return new it(this,Kn)},n.prototype[Symbol.iterator]=function(){return this.entries()},n.from=function(e){var t,i,r=new n;try{for(var s=cn(e),a=s.next();!a.done;a=s.next()){var l=N(a.value,2),o=l[0],c=l[1];r.set(o,c)}}catch(u){t={error:u}}finally{try{a&&!a.done&&(i=s.return)&&i.call(s)}finally{if(t)throw t.error}}return r},n.fromObject=function(e){return n.from(Object.entries(e))},n}(),Te=function(n,e,t){if(t===void 0&&(t=[]),e.length===0||n==null)return[n,t];var i=Object.keys(n).find(function(r){return r!==O&&e.startsWith(r)});return i===void 0?(t.push([n,e]),Te(void 0,"",t)):(t.push([n,i]),Te(n[i],e.slice(i.length),t))},_t=function(n,e){if(e.length===0||n==null)return n;var t=Object.keys(n).find(function(i){return i!==O&&e.startsWith(i)});if(t!==void 0)return _t(n[t],e.slice(t.length))},Ne=function(n,e){var t;if(e.length===0||n==null)return n;var i=Object.keys(n).find(function(a){return a!==O&&e.startsWith(a)});if(i===void 0){var r=Object.keys(n).find(function(a){return a!==O&&a.startsWith(e[0])});if(r===void 0)n[e]={};else{var s=Gn(e,r);return n[s]=(t={},t[r.slice(s.length)]=n[r],t),delete n[r],Ne(n[s],e.slice(s.length))}return n[e]}return Ne(n[i],e.slice(i.length))},Gn=function(n,e,t,i,r){return t===void 0&&(t=0),i===void 0&&(i=Math.min(n.length,e.length)),r===void 0&&(r=""),t>=i||n[t]!==e[t]?r:Gn(n,e,t+1,i,r+n[t])},Kr=function(n,e){var t=N(Te(n,e),2),i=t[0],r=t[1];if(i!==void 0){delete i[O];var s=Object.keys(i);s.length===0&&Xn(r),s.length===1&&Gr(r,s[0],i[s[0]])}},Xn=function(n){if(n.length!==0){var e=N(Rt(n),2),t=e[0],i=e[1];delete t[i],Object.keys(t).length===0&&Xn(n.slice(0,-1))}},Gr=function(n,e,t){if(n.length!==0){var i=N(Rt(n),2),r=i[0],s=i[1];r[s+e]=t,delete r[s]}},Rt=function(n){return n[n.length-1]},we,Oe="or",Xr="and",Qr=function(){function n(e){if(e?.fields==null)throw new Error('MiniSearch: option "fields" must be provided');this._options=F(F(F({},lt),e),{searchOptions:F(F({},pn),e.searchOptions||{})}),this._index=new ot,this._documentCount=0,this._documentIds={},this._fieldIds={},this._fieldLength={},this._averageFieldLength={},this._nextId=0,this._storedFields={},this.addFields(this._options.fields)}return n.prototype.add=function(e){var t=this,i=this._options,r=i.extractField,s=i.tokenize,a=i.processTerm,l=i.fields,o=i.idField,c=r(e,o);if(c==null)throw new Error('MiniSearch: document does not have ID field "'+o+'"');var u=this.addDocumentId(c);this.saveStoredFields(u,e),l.forEach(function(d){var p=r(e,d);if(p!=null){var f=s(p.toString(),d);t.addFieldLength(u,t._fieldIds[d],t.documentCount-1,f.length),f.forEach(function(g){var h=a(g,d);h&&t.addTerm(t._fieldIds[d],u,h)})}})},n.prototype.addAll=function(e){var t=this;e.forEach(function(i){return t.add(i)})},n.prototype.addAllAsync=function(e,t){var i=this;t===void 0&&(t={});var r=t.chunkSize,s=r===void 0?10:r,a={chunk:[],promise:Promise.resolve()},l=e.reduce(function(u,d,p){var f=u.chunk,g=u.promise;return f.push(d),(p+1)%s===0?{chunk:[],promise:g.then(function(){return new Promise(function(h){return setTimeout(h,0)})}).then(function(){return i.addAll(f)})}:{chunk:f,promise:g}},a),o=l.chunk,c=l.promise;return c.then(function(){return i.addAll(o)})},n.prototype.remove=function(e){var t=this,i=this._options,r=i.tokenize,s=i.processTerm,a=i.extractField,l=i.fields,o=i.idField,c=a(e,o);if(c==null)throw new Error('MiniSearch: document does not have ID field "'+o+'"');var u=N(Object.entries(this._documentIds).find(function(p){var f=N(p,2);f[0];var g=f[1];return c===g})||[],1),d=u[0];if(d==null)throw new Error("MiniSearch: cannot remove document with ID "+c+": it is not in the index");l.forEach(function(p){var f=a(e,p);if(f!=null){var g=r(f.toString(),p);g.forEach(function(h){var x=s(h,p);x&&t.removeTerm(t._fieldIds[p],d,x)})}}),delete this._storedFields[d],delete this._documentIds[d],this._documentCount-=1},n.prototype.removeAll=function(e){var t=this;if(e)e.forEach(function(i){return t.remove(i)});else{if(arguments.length>0)throw new Error("Expected documents to be present. Omit the argument to remove all documents.");this._index=new ot,this._documentCount=0,this._documentIds={},this._fieldLength={},this._averageFieldLength={},this._storedFields={},this._nextId=0}},n.prototype.search=function(e,t){var i=this;t===void 0&&(t={});var r=this._options,s=r.tokenize,a=r.processTerm,l=r.searchOptions,o=F(F({tokenize:s,processTerm:a},l),t),c=o.tokenize,u=o.processTerm,d=c(e).map(function(h){return u(h)}).filter(function(h){return!!h}),p=d.map(Jr(o)),f=p.map(function(h){return i.executeQuery(h,o)}),g=this.combineResults(f,o.combineWith);return Object.entries(g).reduce(function(h,x){var y=N(x,2),v=y[0],b=y[1],A=b.score,E=b.match,I=b.terms,R={id:i._documentIds[v],terms:es(I),score:A,match:E};return Object.assign(R,i._storedFields[v]),(o.filter==null||o.filter(R))&&h.push(R),h},[]).sort(function(h,x){var y=h.score,v=x.score;return y<v?1:-1})},n.prototype.autoSuggest=function(e,t){t===void 0&&(t={}),t=F(F({},ts),t);var i=this.search(e,t).reduce(function(r,s){var a=s.score,l=s.terms,o=l.join(" ");return r[o]==null?r[o]={score:a,terms:l,count:1}:(r[o].score+=a,r[o].count+=1),r},{});return Object.entries(i).map(function(r){var s=N(r,2),a=s[0],l=s[1],o=l.score,c=l.terms,u=l.count;return{suggestion:a,terms:c,score:o/u}}).sort(function(r,s){var a=r.score,l=s.score;return a<l?1:-1})},Object.defineProperty(n.prototype,"documentCount",{get:function(){return this._documentCount},enumerable:!1,configurable:!0}),n.loadJSON=function(e,t){if(t==null)throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");return n.loadJS(JSON.parse(e),t)},n.getDefault=function(e){if(lt.hasOwnProperty(e))return at(lt,e);throw new Error('MiniSearch: unknown option "'+e+'"')},n.loadJS=function(e,t){var i=e.index,r=e.documentCount,s=e.nextId,a=e.documentIds,l=e.fieldIds,o=e.fieldLength,c=e.averageFieldLength,u=e.storedFields,d=new n(t);return d._index=new ot(i._tree,i._prefix),d._documentCount=r,d._nextId=s,d._documentIds=a,d._fieldIds=l,d._fieldLength=o,d._averageFieldLength=c,d._fieldIds=l,d._storedFields=u||{},d},n.prototype.executeQuery=function(e,t){var i=this,r=F(F({},this._options.searchOptions),t),s=(r.fields||this._options.fields).reduce(function(h,x){var y;return F(F({},h),(y={},y[x]=at(h,x)||1,y))},r.boost||{}),a=r.boostDocument,l=r.weights,o=F(F({},pn.weights),l),c=o.fuzzy,u=o.prefix,d=this.termResults(e.term,s,a,this._index.get(e.term));if(!e.fuzzy&&!e.prefix)return d;var p=[d];if(e.prefix&&this._index.atPrefix(e.term).forEach(function(h,x){var y=.3*(h.length-e.term.length)/h.length;p.push(i.termResults(h,s,a,x,u,y))}),e.fuzzy){var f=e.fuzzy===!0?.2:e.fuzzy,g=f<1?Math.round(e.term.length*f):f;Object.entries(this._index.fuzzyGet(e.term,g)).forEach(function(h){var x=N(h,2),y=x[0],v=N(x[1],2),b=v[0],A=v[1],E=A/y.length;p.push(i.termResults(y,s,a,b,c,E))})}return p.reduce(un[Oe],{})},n.prototype.combineResults=function(e,t){if(t===void 0&&(t=Oe),e.length===0)return{};var i=t.toLowerCase();return e.reduce(un[i],null)||{}},n.prototype.toJSON=function(){return{index:this._index,documentCount:this._documentCount,nextId:this._nextId,documentIds:this._documentIds,fieldIds:this._fieldIds,fieldLength:this._fieldLength,averageFieldLength:this._averageFieldLength,storedFields:this._storedFields}},n.prototype.termResults=function(e,t,i,r,s,a){var l=this;return a===void 0&&(a=0),r==null?{}:Object.entries(t).reduce(function(o,c){var u=N(c,2),d=u[0],p=u[1],f=l._fieldIds[d],g=r[f]||{ds:{}},h=g.df,x=g.ds;return Object.entries(x).forEach(function(y){var v=N(y,2),b=v[0],A=v[1],E=i?i(l._documentIds[b],e):1;if(E){var I=l._fieldLength[b][f]/l._averageFieldLength[f];o[b]=o[b]||{score:0,match:{},terms:[]},o[b].terms.push(e),o[b].match[e]=at(o[b].match,e)||[],o[b].score+=E*Zr(A,h,l._documentCount,I,p,a),o[b].match[e].push(d)}}),o},{})},n.prototype.addTerm=function(e,t,i){this._index.update(i,function(r){var s;r=r||{};var a=r[e]||{df:0,ds:{}};return a.ds[t]==null&&(a.df+=1),a.ds[t]=(a.ds[t]||0)+1,F(F({},r),(s={},s[e]=a,s))})},n.prototype.removeTerm=function(e,t,i){var r=this;if(!this._index.has(i)){this.warnDocumentChanged(t,e,i);return}this._index.update(i,function(s){var a,l=s[e];if(l==null||l.ds[t]==null)return r.warnDocumentChanged(t,e,i),s;if(l.ds[t]<=1){if(l.df<=1)return delete s[e],s;l.df-=1}return l.ds[t]<=1?(delete l.ds[t],s):(l.ds[t]-=1,F(F({},s),(a={},a[e]=l,a)))}),Object.keys(this._index.get(i)).length===0&&this._index.delete(i)},n.prototype.warnDocumentChanged=function(e,t,i){if(!(console==null||console.warn==null)){var r=Object.entries(this._fieldIds).find(function(s){var a=N(s,2);a[0];var l=a[1];return l===t})[0];console.warn("MiniSearch: document with ID "+this._documentIds[e]+' has changed before removal: term "'+i+'" was not present in field "'+r+'". Removing a document after it has changed can corrupt the index!')}},n.prototype.addDocumentId=function(e){var t=this._nextId.toString(36);return this._documentIds[t]=e,this._documentCount+=1,this._nextId+=1,t},n.prototype.addFields=function(e){var t=this;e.forEach(function(i,r){t._fieldIds[i]=r})},n.prototype.addFieldLength=function(e,t,i,r){this._averageFieldLength[t]=this._averageFieldLength[t]||0;var s=this._averageFieldLength[t]*i+r;this._fieldLength[e]=this._fieldLength[e]||{},this._fieldLength[e][t]=r,this._averageFieldLength[t]=s/(i+1)},n.prototype.saveStoredFields=function(e,t){var i=this,r=this._options,s=r.storeFields,a=r.extractField;s==null||s.length===0||(this._storedFields[e]=this._storedFields[e]||{},s.forEach(function(l){var o=a(t,l);o!==void 0&&(i._storedFields[e][l]=o)}))},n}(),at=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)?n[e]:void 0},un=(we={},we[Oe]=function(n,e){return Object.entries(e).reduce(function(t,i){var r,s=N(i,2),a=s[0],l=s[1],o=l.score,c=l.match,u=l.terms;return t[a]==null?t[a]={score:o,match:c,terms:u}:(t[a].score+=o,t[a].score*=1.5,(r=t[a].terms).push.apply(r,dn(u)),Object.assign(t[a].match,c)),t},n||{})},we[Xr]=function(n,e){return n==null?e:Object.entries(e).reduce(function(t,i){var r=N(i,2),s=r[0],a=r[1],l=a.score,o=a.match,c=a.terms;return n[s]===void 0||(t[s]=t[s]||{},t[s].score=n[s].score+l,t[s].match=F(F({},n[s].match),o),t[s].terms=dn(n[s].terms,c)),t},{})},we),Yr=function(n,e,t){return n*Math.log(t/e)},Zr=function(n,e,t,i,r,s){var a=r/(1+.333*r*s);return a*Yr(n,e,t)/i},Jr=function(n){return function(e,t,i){var r=typeof n.fuzzy=="function"?n.fuzzy(e,t,i):n.fuzzy||!1,s=typeof n.prefix=="function"?n.prefix(e,t,i):n.prefix===!0;return{term:e,fuzzy:r,prefix:s}}},es=function(n){return n.filter(function(e,t,i){return i.indexOf(e)===t})},lt={idField:"id",extractField:function(n,e){return n[e]},tokenize:function(n,e){return n.split(ns)},processTerm:function(n,e){return n.toLowerCase()},fields:void 0,searchOptions:void 0,storeFields:[]},pn={combineWith:Oe,prefix:!1,fuzzy:!1,boost:{},weights:{fuzzy:.9,prefix:.75}},ts={prefix:function(n,e,t){return e===t.length-1}},ns=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;function is(n){return Object.assign(new Error(n),{code:"NOT_FOUND"})}function rs(n,e){switch(e){case"summary":return n.meta?n.meta.description:null;case"headings":return n[e].map(t=>t.title).join(" ");default:return n[e]}}const ss={extractField:rs,fields:["title","headings","summary"],searchOptions:{boost:{title:2}}};function os(n){const e={};return n.terms.forEach(t=>{const i=new RegExp(`(${t})`,"gi");n.match[t].forEach(r=>{const s=n.doc[r];if(typeof s=="string")e[r]=s.replace(i,"<mark>$1</mark>");else if(r==="headings"){const a=s.reduce((l,o)=>(o.title.toLowerCase().includes(t)&&l.push({id:o.id,title:o.title.replace(i,"<mark>$1</mark>")}),l),[]);e[r]=a.length?a:null}})}),e}class as{constructor({pages:e,summaries:t,searchIndexes:i}){this._pages=e,this._summaries=t,this._searchIndexes=i,this._loadSearchIndex=Z(this._loadSearchIndex),this._getSummary=Z(this._getSummary),this._getItems=Z(this._getItems),this.byCategories=Z(this.byCategories),this.load=Z(this.load)}async load(e,t){const i=this._pages[e][t];if(!i)throw is(`Page with ${t} is not found`);return(await le(i)).body}async _getSummary(e){return(await le(this._summaries[e])).body}async _getItems(e,t=null){const i=await this.byCategories(e,t);return Object.keys(i).reduce((r,s)=>r.concat(i[s]),[])}async getNearestFor(e,t,i=null){const r=await this._getItems(e,i),s=r.findIndex(o=>o.id===t);if(s===-1)return[];const a=s-1,l=s+1;return[a<0?void 0:r[a],l>=r.length?void 0:r[l]]}async byCategories(e,t=null){const{items:i}=await this._getSummary(e),r={};return i.forEach(s=>{s.categories.forEach(a=>{r[a]=r[a]||[],r[a].push(s)})}),Array.isArray(t)?t.reduce((s,a)=>(s[a]=r[a],s),{}):r}async at(e,t){const{items:i}=await this._getSummary(e);return i[t]}async _loadSearchIndex(e){const t=this._searchIndexes[e],i=await le(t);return Qr.loadJS(i.body,ss)}async search(e,t,i){const[r,s]=await Promise.all([this._loadSearchIndex(e),this._getSummary(e)]);return r.search(t,i).slice(0,15).map(a=>{const[l]=s.byId[a.id];return a.doc=s.items[l],a.hints=os(a),a})}}var ls={en:{notfound:"/assets/notfound.en-D3L7oOYD.json","support-casljs":"/assets/support-casljs.en-hTjAtRgz.json","advanced/ability-inheritance":"/assets/advanced/ability-inheritance.en-rv3lmhuz.json","advanced/customize-ability":"/assets/advanced/customize-ability.en-DzVvr_I8.json","advanced/ability-to-database-query":"/assets/advanced/ability-to-database-query.en-Q4f97-6z.json","advanced/debugging-testing":"/assets/advanced/debugging-testing.en-CZvNK5Bw.json","advanced/typescript":"/assets/advanced/typescript.en-Dk5wzNzV.json","api/casl-ability-extra":"/assets/api/casl-ability-extra.en-BPj9dZDC.json","api/casl-ability":"/assets/api/casl-ability.en-2Um5gWlh.json","cookbook/claim-authorization":"/assets/cookbook/claim-authorization.en-2YYKAWwH.json","cookbook/intro":"/assets/cookbook/intro.en-CdYKdEd7.json","cookbook/cache-rules":"/assets/cookbook/cache-rules.en-D8Wdy4EA.json","cookbook/less-confusing-can-api":"/assets/cookbook/less-confusing-can-api.en-CpifXud1.json","cookbook/roles-with-persisted-permissions":"/assets/cookbook/roles-with-persisted-permissions.en-DBMmb0dK.json","cookbook/roles-with-static-permissions":"/assets/cookbook/roles-with-static-permissions.en-CYOla32w.json","guide/conditions-in-depth":"/assets/guide/conditions-in-depth.en-F4Cw4YNk.json","guide/define-aliases":"/assets/guide/define-aliases.en-Dp-cKZqi.json","guide/define-rules":"/assets/guide/define-rules.en-Cyp9qD7M.json","guide/install":"/assets/guide/install.en-BaFAdsFy.json","guide/intro":"/assets/guide/intro.en-Ck7gMM7H.json","guide/restricting-fields":"/assets/guide/restricting-fields.en-n56o7cSB.json","guide/subject-type-detection":"/assets/guide/subject-type-detection.en-CRNWRboA.json","package/casl-aurelia":"/assets/package/casl-aurelia.en-CfinlayL.json","package/casl-angular":"/assets/package/casl-angular.en-CHWPMVi8.json","package/casl-mongoose":"/assets/package/casl-mongoose.en-BNoCycJb.json","package/casl-react":"/assets/package/casl-react.en-CBa9oajx.json","package/casl-vue":"/assets/package/casl-vue.en-CWrM9oQw.json","package/casl-prisma":"/assets/package/casl-prisma.en-I78bSUeh.json"}},cs={en:"/assets/content_pages_summaries.en-B-opFM0S.json"},ds={en:"/assets/content_pages_searchIndexes.en-Dq7xhL1w.json"};const us=Object.freeze(Object.defineProperty({__proto__:null,pages:ls,searchIndexes:ds,summaries:cs},Symbol.toStringTag,{value:"Module"})),ps={page:new as(us)},Lt=n=>{const e=ps[n];if(!e)throw new TypeError(`Unknown content loader "${n}".`);return e};function hs(n){if(n.code==="NOT_FOUND")return{body:m`<app-page name="notfound"></app-page>`};throw n}async function fs(n,e){if(!e.categories)return n.at(e.lang,0);const t=await n.byCategories(e.lang,e.categories),i=e.categories.find(r=>t[r].length);return t[i][0]}const ms=n=>n,gs=(n=ms)=>async e=>{const t=n(e),i=Lt("page");if(t.id)t.id.endsWith("/")?t.redirectTo=t.id.slice(0,-1):[t.page,t.byCategories,t.nav]=await Promise.all([i.load(t.lang,t.id),t.categories.length?i.byCategories(t.lang,t.categories):null,i.getNearestFor(t.lang,t.id,t.categories)]);else{const r=await fs(i,t);t.redirectTo=r.id}return t},vs=n=>({match:e,error:t,resolved:i})=>t?hs(t):i.redirectTo?{redirect:{name:"page",params:{id:i.redirectTo,lang:e.params.lang}}}:{body:n(i,e.params)},bs=vs(n=>({main:m`
    <app-page name="${n.id}" .nav="${n.nav}"></app-page>
  `,sidebar:n.byCategories?m`<pages-by-categories .items="${n.byCategories}"></pages-by-categories>`:null}));function ys(n){return n?JSON.parse(`{"${n.replace(/&/g,'","').replace(/=/g,'":"')}"}`):{}}function ws(n){return n?Object.keys(n).reduce((e,t)=>(e.push(`${t}=${n[t]}`),e),[]).join("&"):""}const xs=Object.freeze(Object.defineProperty({__proto__:null,parse:ys,stringify:ws},Symbol.toStringTag,{value:"Module"}));function _s(n){return n.restrictions?n.path.replace(/:([\w_-]+)(\?)?/g,(e,t,i="")=>{const r=n.restrictions[t];return r?`:${t}(${r})${i}`:t+i}):n.path}function Qn(n,e){return n.map(t=>{const i=e[t.controller];if(!i)throw new Error(`Did you forget to specify controller for route "${t.name}"?`);const r={name:t.name,path:_s(t),...i(t)};return t.meta&&t.meta.encode===!1&&(r.pathOptions={compile:{encode:s=>s}}),t.children&&(r.children=Qn(t.children,e)),r})}function ks(n,e){let t=!1;const i=n.replace(/:([\w_-]+)\??/g,(r,s)=>((!e[s]||e[s]==="undefined")&&(t=!0),e[s]));return t?null:i}const Ss=Qn(Ur.routes,{Home:()=>({respond:()=>({body:{main:m`<home-page></home-page>`}})}),Page(n){const e=n.meta?n.meta.categories:[];return{resolve:gs(({params:t})=>({...t,categories:e,id:ks(n.path,t)})),respond:bs}}}).concat({name:"notFound",path:"(.*)",respond({match:n}){const{pathname:e}=n.location,t=e.indexOf("/",1),i=t===-1?e.slice(1):e.slice(1,t),{search:r,hash:s}=window.location;return Ce.includes(i)?{body:m`<app-page name="notfound"></app-page>`}:{redirect:{url:`/${In}${e}${r}${s}`}}}}),j=kr(Mr,Cr(Ss),{history:{base:Rr(ge.baseUrl),query:xs}}),As=j.url;j.url=n=>{const e={lang:ve(),...n.params};return As({...n,params:e})};"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");const hn=window.visualViewport||window;function Es(n,e){const t=window.matchMedia(n),i=()=>e(t.matches);return hn.addEventListener("resize",i),i(),()=>hn.removeEventListener("resize",i)}function Cs(){const n=document.createElement("div");return Object.assign(n.style,{position:"fixed",right:"10px",bottom:"10px",zIndex:50,width:"320px"}),document.body.appendChild(n),n}class je extends ${constructor(){super(),this._route=null,this._notificationsRoot=null,this._menu=null,this._isMobile=!1,this.ready=!1,this._unwatch=[]}connectedCallback(){super.connectedCallback(),this._unwatch.push(j.observe(e=>{this._route=e.response,this._closeMenu()},{initial:!0})),this._unwatch.push(Es("(min-width: 768px)",e=>this._isMobile=!e)),document.addEventListener("keypress",e=>{e.ctrlKey&&e.shiftKey&&e.keyCode===22&&console.log("5db9ef7")},!1)}disconnectedCallback(){super.disconnectedCallback(),this._unwatch.forEach(e=>e())}updated(){this._menu=this._menu||this.shadowRoot.querySelector("menu-drawer")}_toggleMenu(){this._menu&&this._menu.toggle()}_closeMenu(){this._menu&&this._menu.close()}notify(e,t={}){const i=document.createElement("app-notification");i.message=e,typeof t.onClick=="function"&&i.addEventListener("click",t.onClick,!1),this._notificationsRoot=this._notificationsRoot||Cs(),this._notificationsRoot.appendChild(i)}_renderDrawerMenu(e){return this._isMobile?m`
      ${e}
      <h3>${k("menu.root")}</h3>
      <app-menu .items="${yt.items}" expanded></app-menu>
    `:null}_getLayout(e){return this._route.name==="home"?"":this._isMobile?"col-1":e?"col-2":"col-1"}render(){if(!this._route||!this.ready)return null;const{body:e}=this._route,t=e.sidebar?sn(e.sidebar):"";return m`
      <menu-drawer ?disabled="${!this._isMobile}">
        <div slot="menu">${this._renderDrawerMenu(t)}</div>
        <app-root
          theme="${this._isMobile?"mobile":"default"}"
          layout="${this._getLayout(!!t)}"
          .menu="${yt}"
          @toggle-menu="${this._toggleMenu}"
        >
          <div slot="aside">${t}</div>
          ${sn(e.main||e)}
        </app-root>
      </menu-drawer>
    `}}_(je,"cName","casl-docs"),_(je,"properties",{ready:{type:Boolean},_isMobile:{type:Boolean},_route:{type:Object}});je.styles=[S`
    :host {
      display: block;
    }

    .stop-war {
      position: fixed;
      z-index: 1000;
      top: 5px;
      right: 5px;
    }
  `];class Pe extends ${constructor(){super(),this.theme="default",this.menu=null,this.layout=""}render(){return m`
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
    `}}_(Pe,"cName","app-root"),_(Pe,"properties",{theme:{type:String},layout:{type:String},menu:{type:Object}});Pe.styles=[Xe,S`
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
  `];const $s={github:m`
    <svg aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub icon</title><path fill="#FFFFFF" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
  `,twitter:m`
    <svg aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon" lang="en">Twitter icon</title><path fill="#FFFFFF" d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>
  `,medium:m`
    <svg aria-labelledby="simpleicons-medium-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-medium-icon" lang="en">Medium icon</title><path fill="#FFFFFF" d="M2.846 6.36c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403H7.26l5.378 11.795 4.728-11.795H24v.403l-1.917 1.837c-.165.126-.247.333-.213.538v13.5c-.034.204.048.41.213.537l1.87 1.837v.403h-9.41v-.403l1.937-1.882c.19-.19.19-.246.19-.538V7.794l-5.39 13.688h-.727L4.278 7.794v9.174c-.052.386.076.774.347 1.053l2.52 3.06v.402H0v-.403l2.52-3.06c.27-.278.39-.67.326-1.052V6.36z"></path></svg>
  `};class zt extends ${constructor(){super(...arguments);_(this,"year",new Date().getFullYear())}render(){return m`
      <p class="links">
        ${yt.footer.map(t=>m`
          <a href="${t.url}" target="_blank" rel="noopener">
            ${$s[t.icon]}
          </a>
        `)}
      </p>
      <p class="copyright md">${K("copyright",{year:this.year})}</p>
    `}}_(zt,"cName","app-footer");zt.styles=[Qe,S`
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
  `];const Fs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEVMaXF1dXW6QQOmAAAAAXRSTlMAQObYZgAAABZJREFUeNpjoAVg/g8EB7BSg9sUygEATXU49WmTHjIAAAAASUVORK5CYII=";class Ie extends ${constructor(){super(),this.theme="default",this.menu={items:[]},this._isCompactSearch=!1}_emitToggleMenu(){this.dispatchEvent(new CustomEvent("toggle-menu",{bubbles:!0,composed:!0}))}_renderControls(){return this.theme==="default"?m`
        <div class="row align-center">
          <app-quick-search></app-quick-search>
          <app-menu .items="${this.menu.items}"></app-menu>
        </div>
      `:m`
      <app-quick-search
        class="full-width-search"
        suggestionsType="page"
        toggler
        ?compact="${this._isCompactSearch}"
        @reset="${this._toggleSearch}"
        @click-icon="${this._toggleSearch}"
      ></app-quick-search>
    `}_toggleSearch(){this._isCompactSearch=!this._isCompactSearch}_renderMenuToggler(){return this.theme!=="mobile"?null:m`
      <button type="button" class="menu-toggle" @click="${this._emitToggleMenu}">
        <img src="${Fs}" width="24">
      </button>
    `}update(e){return e.has("theme")&&(this._isCompactSearch=this.theme==="mobile"),super.update(e)}render(){return m`
      <header>
        <div class="header container">
          ${this._renderMenuToggler()}
          <div>
            <app-link to="home" class="logo">${k("name")}</app-link>
            <versions-select></versions-select>
          </div>
          ${this._renderControls()}
        </div>
      </header>
      <!-- <app-lang-picker></app-lang-picker> -->
    `}}_(Ie,"cName","app-header"),_(Ie,"properties",{menu:{type:Object},theme:{type:String},_isCompactSearch:{type:Boolean}});Ie.styles=[Xe,S`
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
  `];class Re extends ${constructor(){super(),this.to="",this.active=!1,this.query=null,this.params=null,this.hash="",this.nav=!1,this._url=null,this._unwatchRouter=null}_isActive(){const e=this._getUrl(),{pathname:t}=window.location;return e.length>t.length?!1:e===t||t.startsWith(e)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._navigate.bind(this),!1),this.nav&&(this._unwatchRouter=j.observe(()=>{this.active=this._isActive()},{initial:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}update(e){const t=["to","query","params","hash"].some(i=>e.has(i));if((this._url===null||t)&&(this._url=this._generateUrl()),this.nav&&e.has("active")){const i=this.active?"add":"remove";this.classList[i]("active")}return super.update(e)}_getUrl(){return this._url=this._url||this._generateUrl(),this._url}_generateUrl(){return j.url({name:this.to,hash:this.hash,params:this.params,query:this.query})}render(){return m`
      <a itemprop="url" href="${this._url}">
        <slot></slot>
      </a>
    `}_navigate(e){e.ctrlKey||(e.preventDefault(),j.navigate({url:this._url}))}}_(Re,"cName","app-link"),_(Re,"properties",{to:{type:String},params:{type:Object},query:{type:Object},hash:{type:String},active:{type:Boolean},nav:{type:Boolean}});Re.styles=S`
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
`;function Ts(n){if(n.heading)return m`<h4>${k(`menu.${n.heading}`)}</h4>`;const e=k(`menu.${n.name}`);return n.route===!1?m`<a class="link">${e}</a>`:n.url?m`<a href="${n.url}" target="_blank" rel="${n.rel||"nofollow"}">${e}</a>`:n.page?m`<app-link nav to="page" .params="${{id:n.page}}">${e}</app-link>`:m`<app-link nav to="${n.name}">${e}</app-link>`}class Le extends ${constructor(){super(),this.items=[]}render(){return m`
      <nav
        role="navigation"
        itemscope
        itemtype="http://schema.org/SiteNavigationElement"
      >
        ${this._renderNav(this.items,"nav")}
      </nav>
    `}_renderNav(e,t){const i=e.map(r=>m`
      <li class="${r.children?"menu-item-dropdown":"menu-item"}">
        ${Ts(r)}
        ${this._renderItemNav(r)}
      </li>
    `);return m`<ul class="${t}">${i}</ul>`}_renderItemNav({children:e}){return e?this._renderNav(e,`dropdown ${this.expanded?"":"expandable"}`):""}}_(Le,"cName","app-menu"),_(Le,"properties",{items:{type:Array},expanded:{type:Boolean}});Le.styles=S`
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
    margin: 0 1rem;
  }

  .menu-item {
    margin: 0 1rem;
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
    margin-right: -14px;
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
`;class ze extends ${constructor(){super(),this.article=null,this.category=""}render(){const{article:e}=this,t=this.category||e.categories[0];return m`
      <time datetime="${e.createdAt}" itemprop="datePublished">
        ${or(e.createdAt)}
      </time>
      <span>
        ${k("article.author")}
        <span itemprop="author">${k(`article.authors.${e.author}`)}</span>
      </span>
      <slot name="more">
        <app-link to="${t}" hash="comments" .params="${e}">
          <i class="icon-comment"></i>${e.commentsCount||0}
        </app-link>
        <app-link to="${t}" .params="${e}" class="more">${k("article.readMore")}</app-link>
      </slot>
    `}}_(ze,"cName","app-article-details"),_(ze,"properties",{article:{type:Object,attribute:!1},category:{type:String}});ze.styles=[S`
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
  `];function kt(n){const e=n?`${n} - `:"";document.title=e+ce("name")}function Yn(n){let e=document.head.querySelector(`meta[name="${n}"]`);return e||(e=document.createElement("meta"),e.setAttribute("name",n),document.head.appendChild(e)),e}function W(n,e){if(typeof n=="object"){Object.keys(n).forEach(r=>W(r,n[r]));return}const t=ce(`meta.${n}`),i=Array.isArray(e)?e.concat(t).join(", "):e||t;Yn(n).setAttribute("content",i.replace(/[\n\r]+/g," "))}function Ns({response:n}){const e=document.documentElement;e.lang!==n.params.lang&&(e.lang=n.params.lang);const t=`meta.${n.name}`;ir(t)?(kt(ce(`${t}.title`)),W("keywords",ce(`${t}.keywords`)),W("description",ce(`${t}.description`))):(kt(),W("keywords"),W("description")),Zn()}function Os(n){const e=n.meta||{};kt(n.title),W("keywords",e.keywords||""),W("description",e.description||""),Zn()}const js="share-buttons";let xe;function Zn(){window.__sharethis__&&(xe??(xe=document.getElementById(js)),xe.setAttribute("data-url",window.location.href),xe.setAttribute("data-title",document.title),xe.setAttribute("data-description",Yn("description").getAttribute("content")))}function St(n,e){const t=n.getElementById(e);if(!t)return;const i=85;t.scrollIntoView(!0),document.documentElement.scrollTop-=i}function Ps(n,e){let t=n;const i=3;let r=0;for(;t&&r<i;){if(t.tagName===e)return t;t=t.parentNode,r++}return null}function Is(n,e){let t;if(e.tagName[0]==="H"&&e.id)t=e.id;else{const i=Ps(e,"A"),r=i?i.href.indexOf("#"):-1;r!==-1&&St(n,i.href.slice(r+1))}if(t){const{location:i}=j.current().response,r=`${i.pathname}${window.location.search}#${t}`;j.navigate({url:r}),St(n,t)}}function Rs(n){const{hash:e}=j.current().response.location;e?St(n,e):window.scroll(0,0)}function Ls(n,e){return ae(Nt(n.content,e))}class Me extends Ln{constructor(){super(),this._page=null,this.nav=[],this.name=null,this.vars={},this.type="page",this.content=Ls}connectedCallback(){super.connectedCallback(),this.shadowRoot.addEventListener("click",e=>{Is(this.shadowRoot,e.target)},!1)}async updated(e){(this._page===null||e.has("name")||e.has("type"))&&await this.reload()}async reload(){this._page=await Lt(this.type).load(ve(),this.name),Os(this._page),await this.updateComplete,Rs(this.shadowRoot)}_renderNav(){const[e,t]=this.nav;return m`
      <app-page-nav pageType="${this.type}" .prev="${e}" .next="${t}"></app-page-nav>
    `}render(){return this._page?m`
      <article itemscope itemtype="http://schema.org/Article">
        <h1>${Nt(this._page.title)}</h1>
        <old-version-alert></old-version-alert>
        <div class="description md">${this.content(this._page,this.vars)}</div>
      </article>
      ${this.nav&&this.nav.length?this._renderNav():""}
    `:m``}}_(Me,"cName","app-page"),_(Me,"properties",{type:{type:String},name:{type:String},vars:{type:Object,attribute:!1},content:{type:Function,attribute:!1},nav:{type:Array},_page:{type:Object}});Me.styles=[ar,Qe,jt,S`
    :host {
      display: block;
    }

    app-page-nav {
      margin-top: 20px;
    }
  `];class Ve extends ${constructor(){super(),this.next=null,this.prev=null,this.pageType="page"}_linkTo(e){const t=this[e];return t?m`
      <app-link to="${this.pageType}" .params="${t}" class="${e}">
        ${t.title}
      </app-link>
    `:""}render(){return m`
      ${this._linkTo("prev")}
      ${this._linkTo("next")}
    `}}_(Ve,"cName","app-page-nav"),_(Ve,"properties",{next:{type:Object},prev:{type:Object},pageType:{type:String}});Ve.styles=S`
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
`;const zs="/v6/assets/casl-shield-Czvcyms2.png",Jn=["isomorphic","versatile","declarative","typesafe","treeshakable"];function Ms(n){return m`
    <section class="feature">
      <h3>${k(`features.${n}.title`)}</h3>
      <p>${K(`features.${n}.description`)}</p>
    </section>
  `}const Mt=()=>m`
  <section class="features">${Jn.map(Ms)}</section>
`;Mt.styles=[S`
    .features {
      display: -ms-grid;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      -ms-grid-columns: ${$n(Jn.map(()=>"minmax(200px, 1fr)").join(" "))};
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
  `];const Vs=[{name:"Strapi",url:"https://strapi.io/"},{name:"Meshery",url:"https://meshery.io/"},{name:"Infisical",url:"https://infisical.com/"},{name:"Lightdash",url:"https://www.lightdash.com/"}],Vt=()=>m`
  <div class="adoption">
    <section aria-labelledby="adoption-title">
      <h2 id="adoption-title">${k("adoption.title")}</h2>
      <ul class="adoption-metrics">
        <li>
          <a href="https://github.com/stalniy/casl/network/dependents" target="_blank" rel="noopener noreferrer">
            <strong>100K+</strong>
            <span>${k("adoption.githubDependents")}</span>
          </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/@casl/ability?activeTab=dependents" target="_blank" rel="noopener noreferrer">
            <strong>600+</strong>
            <span>${k("adoption.npmDependents")}</span>
          </a>
        </li>
      </ul>
    </section>
    <section aria-labelledby="adoption-projects-title">
      <h2 id="adoption-projects-title">${k("adoption.projectsTitle")}</h2>
      <ul class="adoption-projects" aria-labelledby="adoption-projects-label">
        ${Vs.map((n,e)=>m`
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
          ${k("adoption.contribute")}
          <span aria-hidden="true">→</span>
        </a>
      </p>
    </section>
  </div>
`;Vt.styles=S`
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
`;class Ut extends ${connectedCallback(){super.connectedCallback(),this._publishVersion=(this._publishVersion||0)+1,this._publishContentReady(this._publishVersion)}async _publishContentReady(e){await this.updateComplete,await Promise.all(Array.from(this.shadowRoot.querySelectorAll("app-link"),t=>t.updateComplete)),!(!this.isConnected||e!==this._publishVersion)&&this.dispatchEvent(new CustomEvent("content-ready",{bubbles:!0,composed:!0}))}render(){return m`
      <div class="bg">
        <header class="row wrap container">
          <div class="col row wrap align-start main">
            <div class="col details">
              <div class="row hero-row">
                <img src="${zs}" width="126" height="152" class="col col-fixed logo">
                <div class="hero">
                  <p class="eyebrow">${k("hero.heading")}</p>
                  <h1 class="hero-title">${k("hero.title")}</h1>
                  <p class="description">${k("hero.description")}</p>
                  <div class="buttons">
                    <app-link to="page" .params="${{id:"guide/intro"}}" class="btn btn-lg">
                      ${k("buttons.start")}
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
            <div class="example">${K("exampleCode")}</div>
          </div>
        </header>
      </div>
      ${Vt()}
      <section class="features-brand">
        <div class="container">
          <p class="eyebrow">POWERFUL PERMISSIONS. MINIMAL OVERHEAD</p>
          ${Mt()}
        </div>
      </section>
      <section class="capabilities container">
        <p class="eyebrow">${k("home.evolution.heading")}</p>
        <h2>${k("home.evolution.title")}</h2>
        <p class="capabilities-intro">${k("home.evolution.subtitle")}</p>
        <authorization-examples></authorization-examples>
        <p class="capabilities-note">${k("home.evolution.note")}</p>
      </section>
    `}}_(Ut,"cName","home-page");Ut.styles=[Xe,Rn,Mt.styles,Vt.styles,jt,S`
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
  `];const ei=`casl:github:stars:${ge.repoURL}`,Us=24*60*60*1e3,Ds=`https://api.github.com/repos/${new URL(ge.repoURL).pathname.replace(/^\/|\/$/g,"").replace(/\.git$/,"")}`;function qs(){try{const n=JSON.parse(localStorage.getItem(ei));return n&&Number.isSafeInteger(n.stars)&&n.stars>=0&&Number.isFinite(n.timestamp)?n:null}catch{return null}}async function Bs(){const n=qs(),e=n?Date.now()-n.timestamp:1/0;if(e>=0&&e<Us)return n.stars;try{const t=await fetch(Ds,{signal:typeof AbortSignal.timeout=="function"?AbortSignal.timeout(5e3):void 0});if(!t.ok)throw new Error("Failed to retrieve GitHub stars");const{stargazers_count:i}=await t.json();if(!Number.isSafeInteger(i)||i<0)throw new Error("Invalid GitHub star count");try{localStorage.setItem(ei,JSON.stringify({stars:i,timestamp:Date.now()}))}catch{}return i}catch{return n?n.stars:null}}let fn=null;function Hs(){return fn??(fn=Bs()),fn}const Ws=new Intl.NumberFormat("en-US",{notation:"compact",maximumFractionDigits:1});class Ue extends ${connectedCallback(){super.connectedCallback(),Hs().then(e=>{this.stars=e})}render(){return m`
      <a
        href="${ge.repoURL}"
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
        <span class="star-count">${this.stars==null?"—":Ws.format(this.stars)}</span>
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
`;const Ks={dropdown(n){const e=n.hints.title||n.doc.title,t=n.hints.headings||n.doc.headings||[];return m`
      <div class="row item">
        <div class="col title">
          <app-link to="page" .params="${n.doc}">${ae(e)}</app-link>
        </div>
        <div class="col">
          ${t.map(i=>m`
            <app-link to="page" .params="${n.doc}" hash="${i.id}">
              ${ae(i.title)}
            </app-link>
          `)}
        </div>
      </div>
    `},page(n){const e=n.hints.title||n.doc.title,t=n.hints.headings||n.doc.headings||[];return m`
      ${t.map(i=>m`
        <app-link class="item" to="page" .params="${n.doc}" hash="${i.id}">
          ${ae(`${e} › ${i.title}`)}
        </app-link>
      `)}
    `}};function Gs(n,e){if(!n)return"";if(!n.length)return m`
      <div class="suggestions ${e}">
        ${k("search.noMatch")}
      </div>
    `;const t=Ks[e||"dropdown"];return m`
    <div class="suggestions ${e}">
      ${n.map(([i,r])=>m`
        <h5>${k(`categories.${i}`)}</h5>
        ${r.map(t)}
      `)}
    </div>
  `}const Xs=m`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px">
    <path d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z" />
  </svg>
`,Qs=m`
  <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
    <polyline points='268 112 412 256 268 400' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
    <line x1='392' y1='256' x2='100' y2='256' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
  </svg>
`;class De extends ${constructor(){super(),this.value="",this.suggestionsType="dropdown",this.compact=!1,this.toggler=!1,this._suggestions=null,this._clickOutside=this._clickOutside.bind(this),this._search=Qi(this._search,500),this._unwatchRouter=null}_setValue(e){this.value=e.trim(),this.dispatchEvent(new CustomEvent("update",{detail:this.value}))}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this._clickOutside,!1),this._unwatchRouter=j.observe(()=>this._reset())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this._clickOutside,!1),this._unwatchRouter()}_reset(){this.value&&(this._setValue(""),this._suggestions=null,this.dispatchEvent(new CustomEvent("reset")))}_clickOutside(e){this.shadowRoot.contains(e.target)||(this._suggestions=null)}async _search(){if(!this.value){this._suggestions=null;return}const t=(await Lt("page").search(ve(),this.value,{prefix:!0})).reduce((i,r)=>{const s=r.doc.categories[0];return i.has(s)||i.set(s,[]),i.get(s).push(r),i},new Map);this._suggestions=Array.from(t)}_updateValue(e){this._setValue(e.target.value),this._search()}_emitIconClick(){this.dispatchEvent(new CustomEvent("click-icon"))}render(){return m`
      <div class="search-form ${this.compact?"compact":""}">
        <label class="input">
          <div class="icon" @click="${this._emitIconClick}">
            ${this.compact||!this.toggler?Xs:Qs}
          </div>

          <input
            autocomplete="off"
            autocorrect="off"
            placeholder="${k("search.placeholder")}"
            .value="${this.value}"
            @input="${this._updateValue}"
          >
        </label>
        ${Gs(this._suggestions,this.suggestionsType)}
      </div>
    `}}_(De,"cName","app-quick-search"),_(De,"properties",{value:{type:String},suggestionsType:{type:String},compact:{type:Boolean},toggler:{type:Boolean},_suggestions:{type:Array}});De.styles=[Xe,S`
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
  `];class ti extends ${render(){return m`
      <select @change="${this._changeLang}">
        <option value="ru">ru</option>
        <option value="uk">uk</option>
      </select>
    `}_changeLang(e){const t=e.target.value,i=j.current().response;j.navigate({url:j.url({name:i.name,params:{...i.params,lang:t},query:i.location.query,hash:i.location.hash})})}}_(ti,"cName","app-lang-picker");const Ys="/v6/assets/liqpay-BEspGQjK.svg",Zs="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAADkAQMAAAC2bMrzAAAABlBMVEX///8AAABVwtN+AAACK0lEQVRYw9XYMY7mIAyG4TeioOQIPgo3I8nNOApHoKSw8m1B5t+Z7VfrRSkiPWkibLANf21lSXqyAKemWTVxuyVJV1QdQAOoFFGU1N3uBVhcPTVaHkny0pO6UzWOZVrRVWmSZqV0qG73f6GaVVKSKJ3wCjSM0h300R9xFU13hg4v/ffzZ/4G03dZmtWLNPHS3a6fB2IwzdKi5QHV2cHTsYc3ckIqtDyOZQCgWZ2KPXBq8M806/OdU730JEHD7sA69pu+zuc0q8axOPY9GFGxBxposg86L3IOacdGSM26NYA0a5o1qXuRdMfWcWicC0rfYeNFTmPnZUzFrjzIoojS9/WddC8adgXVrAt78tAE8NKdCg2Onb8RdZ+EEkVpsmvRNI5Fy7qiql15NEzqSX3/VNKD3YqrO0TMS6cIkHoap/TkvQsBNete9rwVnfYZ7jQssGIPHMso8tL19oNPHsTVrFujQZIAQOpuV5YWgXXZvcy3ld0PttAKx6LB3gJKp8g511eGRlW7spL6Lp69vBmKhVV7siSlWSlKklOxK+srQwNqHqfGoZHmuxEOaYfNV1f+DxQab2w4+x4Upk+XGlMBsnw3VrtPsevT8UXUPQ0AqFL30gHsfnMwqA6gQZpVu+aHpAu7vs8Yo+mp0QCql3e65Sbp+uRgUM3DYdf8aVbplt5dCKwCnOr77uaU7gVhFWhZSdLEQZLGuXvEqPpOET8T5jTx3Vt9mzHG0pDrFxd5veytOF4pAAAAAElFTkSuQmCC",Js="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAWCAMAAAAvk+g+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADPUExURQAAAPv7+/T09Lm5uf////z8/OLi4v7+/v39/QICAnt7e7S0tPDw8Pb29uvr63V1dRgYGKSkpNvb2+np6cDAwAgICOXl5VZWVsrKytXV1W5ubjMzM6enp/r6+sfHx+fn5/Ly8t/f38/Pz+7u7g4ODs3NzYWFhZmZmUFBQR4eHpGRkQUFBcTExLy8vJ2dndHR0To6Oq2trZKSktjY2BQUFKCgoICAgEhISI6OjrGwsSIiIltbW/79/i4uLiYmJk1NTaqqqpaWlmZmZmFhYYmJiVdCR2MAAAM3SURBVEjHvdbZkqJKEAbgH6EqM1EEUXBFcBC13fe1215m3v+ZzkWrrSfOuZmI7rygCCqivoDgryzQrXI5pu8vXG/U5KU5VkRkqJ8BwyfgXKao9doIfwQ0AUiF3wWw+QdAXgAQ0w8ANJ1vBjlr9AtjAFI7AEDV+IuF6psaWdZ/TvG4tCLrDoyPgF14Baq5NwDY/M0nNVH6X3CIinUP1gSQTrjfhyoToJpGyRfJD8PdKs+XZ8x8Adki67OILhciIouW/wIzAFIj9t/y4eH3sjzeHfuXbMymtaxnT6L21m4zcbqw3VaZKZ7mO+/uMiRSeuNu8zkmE5vx1p5ERMnkT2OfMTnTabnk/lkRLVHhaDGd8AVMXwDpqMUacs5ItbsAOp9gHoPAw8jtrmUdUriTblfmPvmYH59Efkf864h1gN8pmWiOPMi7Uo3RfC6jCicIBl4gzZSHqBglnNLbTzN+kr1TAgAMCtEJAFZXsOoXP9DQ8Ssy3sq2XN6jYfh4aRdqI6TODptUf2BDJk6r1AyCjqrNIuOABieQfOo3seIhJpVgEN/FothJ+gIAwCQXABg4V7DF9A6T2EaWdBESFb2g7MNlFT0hXcnAIZ5hp0yUFLOLCetp722MKiXwjGd2UaelbL3ziu9zqBsXDyfnQ3DM+AYS9WEy2ciKIgmR8yLah0usjkgzOTFRB0fDRImJ9pKPmyO3N5cqF+AZxDbqtBTIuq7uQL959YBJvCnp6376AEYD1Cyq45z4cInUGWkYPIXEeWmwib4i51XaFbEjnqHKCTyDyEadhti1Rrvi8w10ql8eXkL+ysADaB2k2XqbS4luIPeketh4ozab6A7zDcwLNTnpdIGqKsBTlmWjzkNMop7Yzg2s4756d5nLo0Xch8lso0bRxoN0351P0DiiyIUegPOByIT7Cmn+YqeHrtf4fENl0SdY4XSAt2ssqP0ABsUvMNUpU1EXiGKdEBvlLIuJyNExkdLaYVK6NkvZslKd5mZZgUgZflvndMiG1mRRrHNc1glzrLW6gnr9IK6+vT3xonvnyQ/0Qw7b7bqfTZsCoKd+oAEzET0zp/mPaut7jzZ4bAFEz0TWd4L/AJltcxCN1O75AAAAAElFTkSuQmCC",eo="/v6/assets/monobank-qrcode-D2EIVs4s.svg",Dt={liqpay:{icon:Ys,image:Zs},mono:{icon:Js,image:eo}},ct=Object.keys(Dt);function to(n){const e=Dt[n];if(!e)return console.warn(`Cannot find configuration for ${n} payment option`),null;let t;return e.image&&(t=m`<img src="${e.image}">`),m`<div class="selected">${t}</div>`}class qe extends ${constructor(){super(),this.selected=""}connectedCallback(){super.connectedCallback(),ct.length===1&&(this.selected=ct[0])}_setSelected({target:e}){if(e.tagName!=="IMG"){this.selected="";return}this.selected=e.getAttribute("data-name")}render(){return m`
      <div class="options" @click=${this._setSelected}>
        ${ct.map(e=>m`
          <img src="${Dt[e].icon}" alt="${k(`payment.${e}`)}" data-name="${e}">
        `)}
      </div>
      ${this.selected?to(this.selected):""}
    `}}_(qe,"cName","one-time-donations"),_(qe,"properties",{selected:{type:String}});qe.styles=S`
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
`;class Be extends ${constructor(){super(),this.items=null,this.type="page",this.categories=null}render(){const e=this.categories||Object.keys(this.items);return m`
      <nav>
        ${e.map(t=>m`
          <h3>${k(`categories.${t}`)}</h3>
          <ul>
            ${this.items[t].map(i=>m`
              <li><app-link nav to="${this.type}" .params="${i}">${i.title}</app-link></li>
            `)}
          </ul>
        `)}
      </nav>
    `}}_(Be,"cName","pages-by-categories"),_(Be,"properties",{items:{type:Object},type:{type:String},categories:{type:Array}});Be.styles=S`
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
`;class He extends ${constructor(){super(),this.type="info",this.message=""}render(){return m`${K(this.message)}`}}_(He,"cName","app-notification"),_(He,"properties",{type:{type:String},message:{type:String}});He.styles=S`
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
`;var ni=function(n,e,t){return n.addEventListener(e,t,!1),function(){return n.removeEventListener(e,t,!1)}};try{var no=Object.defineProperty({},"passive",{get:function(){return ni=function(n,e,t){return n.addEventListener(e,t,{passive:!0}),function(){return n.removeEventListener(e,t,{passive:!0})}},!0}});window.addEventListener("test",null,no)}catch{}var ie=function(n,e,t){return ni(n,e,t)},io=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(n){return setTimeout(n,1e3/60)},ro=window.document.documentElement,ii=function(){for(var n=["Webkit","Khtml","Moz","ms","O"],e=0;e<n.length;e++)if(n[e]+"Opacity"in ro.style)return"-"+n[e].toLowerCase()+"-";return""}();function H(n,e,t){n.style[ii+e]=t}var dt=window.navigator.msPointerEnabled,so=window.document.documentElement,_e={start:dt?"MSPointerDown":"touchstart",move:dt?"MSPointerMove":"touchmove",end:dt?"MSPointerUp":"touchend",cancel:"touchcancel"},Y={end:"webkitTransitionEnd"in so.style?"webkitTransitionEnd":"transitionend"},ri=window.document,re=ri.documentElement,ut=!1,oo=function(){function n(t){t===void 0&&(t={}),this.panel=t.panel,this.menu=t.menu,this.t=t.eventsEmitter||this.panel,this.i=0,this.s=0,this.o=!1,this.h=!1,this.u=!1,this.l=!1,this.v=t.touch===void 0||!!t.touch,this.p=t.side||"left",this.m=t.easing||"ease",this.M=parseInt(t.duration,10)||300,this.T=parseInt(t.tolerance,10)||70,this.g=parseInt(t.padding,10)||.8*window.innerWidth,this.k=this.g,this.I=this.p==="right"?-1:1,this.k*=this.I,this.O(),this.v&&(this.P(),this.v=this.v!=="manual")}var e=n.prototype;return e.O=function(){var t=this.panel.classList,i=this.menu.classList;t.contains("slideout-panel")||t.add("slideout-panel"),t.contains("slideout-panel-"+this.p)||t.add("slideout-panel-"+this.p),i.contains("slideout-menu")||i.add("slideout-menu"),i.contains("slideout-menu-"+this.p)||i.add("slideout-menu-"+this.p)},e.S=function(t){return this.t.dispatchEvent(new window.CustomEvent(t)),this},e.on=function(t,i,r){var s=this;return this.t.addEventListener(t,i,r),function(){return s.t.removeEventListener(t,i,r)}},e.open=function(){this.S("beforeopen"),re.classList.contains("slideout-open")||re.classList.add("slideout-open"),this.X(),this.j(this.k),this.u=!0;var t=this;return this.panel.addEventListener(Y.end,function i(){t.panel.removeEventListener(Y.end,i),H(t.panel,"transition",""),t.S("open")}),this},e.close=function(){if(!this.isOpen()&&!this.o)return this;this.S("beforeclose"),this.X(),this.j(0),this.u=!1;var t=this;return this.panel.addEventListener(Y.end,function i(){t.panel.removeEventListener(Y.end,i),re.classList.remove("slideout-open"),H(t.panel,"transition",""),H(t.panel,"transform",""),t.S("close")}),this},e.toggle=function(){return this.isOpen()?this.close():this.open()},e.isOpen=function(){return this.u},e.j=function(t){this.s=t,H(this.panel,"transform","translateX("+t+"px)")},e.X=function(){H(this.panel,"transition",ii+"transform "+this.M+"ms "+this.m)},e.P=function(){var t,i,r,s,a,l,o=this,c=function(){ut=!1};this.D=(r=function(){o.h||(clearTimeout(t),ut=!0,t=setTimeout(c,250))},a=!1,l=function(){r.call(i,s),a=!1},ie(i=ri,"scroll",function(u){s=u,a||(io(l),a=!0)})),this.K=ie(this.panel,_e.start,function(u){u.touches!==void 0&&(o.h=!1,o.o=!1,o.i=u.touches[0].pageX,o.l=!o.v||!o.isOpen()&&o.menu.clientWidth!==0)}),this.U=ie(this.panel,_e.cancel,function(){o.h=!1,o.o=!1}),this.W=ie(this.panel,_e.end,function(){if(o.h)if(o.S("translateend"),o.o&&Math.abs(o.s)>o.T)o.open();else if(o.k-Math.abs(o.s)<=o.T/2){o.X(),o.j(o.k);var u=o;o.panel.addEventListener(Y.end,function d(){this.panel.removeEventListener(Y.end,d),H(u.panel,"transition","")})}else o.close();o.h=!1}),this.q=ie(this.panel,_e.move,function(u){if(!(ut||o.l||u.touches===void 0||function(g){for(var h=g;h.parentNode;){if(h.getAttribute("data-slideout-ignore")!==null)return h;h=h.parentNode}return null}(u.target))){var d=u.touches[0].clientX-o.i,p=d;if(o.s=d,!(Math.abs(p)>o.g||Math.abs(d)<=20)){o.o=!0;var f=d*o.I;o.u&&f>0||!o.u&&f<0||(o.h||o.S("translatestart"),f<=0&&(p=d+o.g*o.I,o.o=!1),o.h&&re.classList.contains("slideout-open")||re.classList.add("slideout-open"),H(o.panel,"transform","translateX("+p+"px)"),o.S("translate",p),o.h=!0)}}})},e.enableTouch=function(){return this.v=!0,this},e.disableTouch=function(){return this.v=!1,this},e.destroy=function(){this.close(),this.K(),this.U(),this.W(),this.q(),this.D()},n}();class We extends ${constructor(){super(),this._drawer=null,this.isOpen=!1,this.disabled=!1,this._scrollTop=0}open(){this.isOpen=!0}close(){this.isOpen=!1}toggle(){this.isOpen=!this.isOpen}_createDrawer(){const[e,t]=this.shadowRoot.children;this._drawer=new oo({menu:e,panel:t,eventsEmitter:this,padding:270,touch:!1});const i=()=>this._drawer.close();this._drawer.on("beforeopen",()=>{this.isOpen=!0,this._scrollTop=window.pageYOffset,e.classList.add("open"),t.style.top=`${-this._scrollTop}px`,t.addEventListener("mousedown",i,!1),t.addEventListener("touchstart",i,!1),window.scroll(0,0)}),this._drawer.on("close",()=>{this.isOpen=!1,e.classList.remove("open"),t.style.top="",window.scroll(0,this._scrollTop),t.removeEventListener("mousedown",i,!1),t.removeEventListener("touchstart",i,!1)})}updated(e){if(this._drawer||this._createDrawer(),this.isOpen!==this._drawer.isOpen()){const t=this.isOpen?"open":"close";this._drawer[t]()}if(e.has("disabled")){const t=this.disabled?"disableTouch":"enableTouch";this._drawer[t]()}}disconnectedCallback(){super.disconnectedCallback(),this._drawer.destroy(),this._drawer=null}render(){return m`
      <div class="menu">
        <slot name="menu"></slot>
      </div>
      <div class="panel">
        <slot></slot>
      </div>
    `}}_(We,"cName","menu-drawer"),_(We,"properties",{isOpen:{type:Boolean},disabled:{type:Boolean}});We.styles=S`
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
`;function qt(){return"v6"}async function si(){return(await le("/versions.txt",{format:"txtArrayJSON",cache:!0})).body}function oi(n){return window.location.href.replace(`/${qt()}/`,`/${n}/`)}function ao(n){window.location.href=oi(n.target.value)}class Bt extends ${constructor(){super(),this._versions=[],this._currentVersion=qt(),this._currentVersion&&this._versions.push({number:this._currentVersion})}async connectedCallback(){super.connectedCallback();const e=await si();this._versions=e.slice(0).reverse(),this.requestUpdate()}render(){return m`
      <select @change=${ao}>
        ${this._versions.map(e=>m`
          <option .selected=${e.number===this._currentVersion}>${e.number}</option>
        `)}
      </select>
    `}}_(Bt,"cName","versions-select");Bt.styles=S`
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
`;class Ht extends ${constructor(){super(),this._versions=[],this._currentVersion=qt()}async connectedCallback(){super.connectedCallback(),this._unwatchRouter=j.observe(()=>this.requestUpdate()),this._versions=await si(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}render(){const e=this._versions[this._versions.length-1];return!e||e.number===this._currentVersion?m``:m`
      <div class="alert alert-warning">
        ${K("oldVersionAlert",{latestVersion:e.number,currentVersion:this._currentVersion,latestVersionUrl:oi(e.number)})}
      </div>
    `}}_(Ht,"cName","old-version-alert");Ht.styles=[Qe,lr,S`
    a {
      color: inherit;
    }
  `];const lo=[Ee,Pt,$e,Fe,je,Pe,zt,Ie,Re,Le,ze,Me,Ut,Ve,De,ti,Ue,Be,qe,He,We,Bt,Ht];function co(n){const e=document.querySelector(n);return lo.forEach(t=>customElements.define(t.cName,t)),j.observe(async t=>{const i=t.response.params.lang||In;ve()!==i&&(await rr(i),e.ready=!0),Ns(t)}),e}const{navigator:fe,location:de}=window,uo=de.hostname==="localhost"||de.hostname==="[::1]"||de.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),po="serviceWorker"in fe,ee=(...n)=>console.log(...n);function ho(n,e){n&&(n.onstatechange=()=>{ee("new worker state",n.state),n.state==="installed"&&(fe.serviceWorker.controller?(ee("New content is available and will be used when all tabs for this page are closed."),e&&e.onUpdate&&e.onUpdate(n)):(ee("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(n)))})}function mn(n,e){let t=!1;return fe.serviceWorker.addEventListener("controllerchange",()=>{t||(t=!0,de.reload())}),fe.serviceWorker.register(n).then(i=>{ee("service worker is registered"),i.onupdatefound=()=>ho(i.installing,e)}).catch(i=>{console.error("Error during service worker registration:",i)})}function fo(n){po&&window.addEventListener("load",()=>{const e="/v6/sw.js";uo?fetch(e,{headers:{"Service-Worker":"script"}}).then(t=>{const i=t.headers.get("content-type")||"";t.status===404||i.indexOf("javascript")===-1?(ee("Service worker not found"),fe.serviceWorker.ready.then(r=>r.unregister()).then(()=>de.reload())):mn(e,n)}).catch(()=>{ee("No internet connection found. App is running in offline mode.")}):mn(e,n)})}window.__isAppExecuted__=!0;const mo=co("casl-docs");fo({onUpdate(n){mo.notify("updateAvailable",{onClick(){n.postMessage({type:"SKIP_WAITING"})}})}});window.onShareThisLoaded=()=>{window.__sharethis__.config["sticky-share-buttons"].id="share-buttons"};
//# sourceMappingURL=index-uUoThJxD.js.map
