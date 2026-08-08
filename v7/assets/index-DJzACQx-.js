var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,o)=>(o=n==null?{}:e(i(n)),c(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=typeof window<`u`&&window.customElements!=null&&window.customElements.polyfillWrapFlushCallback!==void 0,d=(e,t,n=null,r=null)=>{for(;t!==n;){let n=t.nextSibling;e.insertBefore(t,r),t=n}},f=(e,t,n=null)=>{for(;t!==n;){let n=t.nextSibling;e.removeChild(t),t=n}},p=`{{lit-${String(Math.random()).slice(2)}}}`,m=`<!--${p}-->`,h=RegExp(`${p}|${m}`),g=`$lit$`,_=class{constructor(e,t){this.parts=[],this.element=t;let n=[],r=[],i=document.createTreeWalker(t.content,133,null,!1),a=0,o=-1,s=0,{strings:c,values:{length:l}}=e;for(;s<l;){let e=i.nextNode();if(e===null){i.currentNode=r.pop();continue}if(o++,e.nodeType===1){if(e.hasAttributes()){let t=e.attributes,{length:n}=t,r=0;for(let e=0;e<n;e++)v(t[e].name,`$lit$`)&&r++;for(;r-->0;){let t=c[s],n=x.exec(t)[2],r=n.toLowerCase()+g,i=e.getAttribute(r);e.removeAttribute(r);let a=i.split(h);this.parts.push({type:`attribute`,index:o,name:n,strings:a}),s+=a.length-1}}e.tagName===`TEMPLATE`&&(r.push(e),i.currentNode=e.content)}else if(e.nodeType===3){let t=e.data;if(t.indexOf(p)>=0){let r=e.parentNode,i=t.split(h),a=i.length-1;for(let t=0;t<a;t++){let n,a=i[t];if(a===``)n=b();else{let e=x.exec(a);e!==null&&v(e[2],`$lit$`)&&(a=a.slice(0,e.index)+e[1]+e[2].slice(0,-5)+e[3]),n=document.createTextNode(a)}r.insertBefore(n,e),this.parts.push({type:`node`,index:++o})}i[a]===``?(r.insertBefore(b(),e),n.push(e)):e.data=i[a],s+=a}}else if(e.nodeType===8){if(e.data===p){let t=e.parentNode;(e.previousSibling===null||o===a)&&(o++,t.insertBefore(b(),e)),a=o,this.parts.push({type:`node`,index:o}),e.nextSibling===null?e.data=``:(n.push(e),o--),s++}else{let t=-1;for(;(t=e.data.indexOf(p,t+1))!==-1;)this.parts.push({type:`node`,index:-1}),s++}}}for(let e of n)e.parentNode.removeChild(e)}},v=(e,t)=>{let n=e.length-t.length;return n>=0&&e.slice(n)===t},y=e=>e.index!==-1,b=()=>document.createComment(``),x=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,S=133;function C(e,t){let{element:{content:n},parts:r}=e,i=document.createTreeWalker(n,S,null,!1),a=w(r),o=r[a],s=-1,c=0,l=[],u=null;for(;i.nextNode();){s++;let e=i.currentNode;for(e.previousSibling===u&&(u=null),t.has(e)&&(l.push(e),u===null&&(u=e)),u!==null&&c++;o!==void 0&&o.index===s;)o.index=u===null?o.index-c:-1,a=w(r,a),o=r[a]}l.forEach(e=>e.parentNode.removeChild(e))}var ee=e=>{let t=e.nodeType===11?0:1,n=document.createTreeWalker(e,S,null,!1);for(;n.nextNode();)t++;return t},w=(e,t=-1)=>{for(let n=t+1;n<e.length;n++){let t=e[n];if(y(t))return n}return-1};function te(e,t,n=null){let{element:{content:r},parts:i}=e;if(n==null){r.appendChild(t);return}let a=document.createTreeWalker(r,S,null,!1),o=w(i),s=0,c=-1;for(;a.nextNode();)for(c++,a.currentNode===n&&(s=ee(t),n.parentNode.insertBefore(t,n));o!==-1&&i[o].index===c;){if(s>0){for(;o!==-1;)i[o].index+=s,o=w(i,o);return}o=w(i,o)}}var T=new WeakMap,E=e=>((...t)=>{let n=e(...t);return T.set(n,!0),n}),D=e=>typeof e==`function`&&T.has(e),O={},ne={},re=class{constructor(e,t,n){this.__parts=[],this.template=e,this.processor=t,this.options=n}update(e){let t=0;for(let n of this.__parts)n!==void 0&&n.setValue(e[t]),t++;for(let e of this.__parts)e!==void 0&&e.commit()}_clone(){let e=u?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,r=document.createTreeWalker(e,133,null,!1),i=0,a=0,o,s=r.nextNode();for(;i<n.length;){if(o=n[i],!y(o)){this.__parts.push(void 0),i++;continue}for(;a<o.index;)a++,s.nodeName===`TEMPLATE`&&(t.push(s),r.currentNode=s.content),(s=r.nextNode())===null&&(r.currentNode=t.pop(),s=r.nextNode());if(o.type===`node`){let e=this.processor.handleTextExpression(this.options);e.insertAfterNode(s.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(s,o.name,o.strings,this.options));i++}return u&&(document.adoptNode(e),customElements.upgrade(e)),e}},ie=window.trustedTypes&&trustedTypes.createPolicy(`lit-html`,{createHTML:e=>e}),ae=` ${p} `,oe=class{constructor(e,t,n,r){this.strings=e,this.values=t,this.type=n,this.processor=r}getHTML(){let e=this.strings.length-1,t=``,n=!1;for(let r=0;r<e;r++){let e=this.strings[r],i=e.lastIndexOf(`<!--`);n=(i>-1||n)&&e.indexOf(`-->`,i+1)===-1;let a=x.exec(e);t+=a===null?e+(n?ae:m):e.substr(0,a.index)+a[1]+a[2]+g+a[3]+p}return t+=this.strings[e],t}getTemplateElement(){let e=document.createElement(`template`),t=this.getHTML();return ie!==void 0&&(t=ie.createHTML(t)),e.innerHTML=t,e}},se=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ce=e=>Array.isArray(e)||!!(e&&e[Symbol.iterator]),le=class{constructor(e,t,n){this.dirty=!0,this.element=e,this.name=t,this.strings=n,this.parts=[];for(let e=0;e<n.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new ue(this)}_getValue(){let e=this.strings,t=e.length-1,n=this.parts;if(t===1&&e[0]===``&&e[1]===``){let e=n[0].value;if(typeof e==`symbol`)return String(e);if(typeof e==`string`||!ce(e))return e}let r=``;for(let i=0;i<t;i++){r+=e[i];let t=n[i];if(t!==void 0){let e=t.value;if(se(e)||!ce(e))r+=typeof e==`string`?e:String(e);else for(let t of e)r+=typeof t==`string`?t:String(t)}}return r+=e[t],r}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}},ue=class{constructor(e){this.value=void 0,this.committer=e}setValue(e){e!==O&&(!se(e)||e!==this.value)&&(this.value=e,D(e)||(this.committer.dirty=!0))}commit(){for(;D(this.value);){let e=this.value;this.value=O,e(this)}this.value!==O&&this.committer.commit()}},de=class e{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(b()),this.endNode=e.appendChild(b())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=b()),e.__insert(this.endNode=b())}insertAfterPart(e){e.__insert(this.startNode=b()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(this.startNode.parentNode===null)return;for(;D(this.__pendingValue);){let e=this.__pendingValue;this.__pendingValue=O,e(this)}let e=this.__pendingValue;e!==O&&(se(e)?e!==this.value&&this.__commitText(e):e instanceof oe?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):ce(e)?this.__commitIterable(e):e===ne?(this.value=ne,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){let t=this.startNode.nextSibling;e=e??``;let n=typeof e==`string`?e:String(e);t===this.endNode.previousSibling&&t.nodeType===3?t.data=n:this.__commitNode(document.createTextNode(n)),this.value=e}__commitTemplateResult(e){let t=this.options.templateFactory(e);if(this.value instanceof re&&this.value.template===t)this.value.update(e.values);else{let n=new re(t,e.processor,this.options),r=n._clone();n.update(e.values),this.__commitNode(r),this.value=n}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());let n=this.value,r=0,i;for(let a of t)i=n[r],i===void 0&&(i=new e(this.options),n.push(i),r===0?i.appendIntoPart(this):i.insertAfterPart(n[r-1])),i.setValue(a),i.commit(),r++;r<n.length&&(n.length=r,this.clear(i&&i.endNode))}clear(e=this.startNode){f(this.startNode.parentNode,e.nextSibling,this.endNode)}},fe=class{constructor(e,t,n){if(this.value=void 0,this.__pendingValue=void 0,n.length!==2||n[0]!==``||n[1]!==``)throw Error(`Boolean attributes can only contain a single expression`);this.element=e,this.name=t,this.strings=n}setValue(e){this.__pendingValue=e}commit(){for(;D(this.__pendingValue);){let e=this.__pendingValue;this.__pendingValue=O,e(this)}if(this.__pendingValue===O)return;let e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,``):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=O}},pe=class extends le{constructor(e,t,n){super(e,t,n),this.single=n.length===2&&n[0]===``&&n[1]===``}_createPart(){return new me(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}},me=class extends ue{},he=!1;(()=>{try{let e={get capture(){return he=!0,!1}};window.addEventListener(`test`,e,e),window.removeEventListener(`test`,e,e)}catch{}})();var ge=class{constructor(e,t,n){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=n,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;D(this.__pendingValue);){let e=this.__pendingValue;this.__pendingValue=O,e(this)}if(this.__pendingValue===O)return;let e=this.__pendingValue,t=this.value,n=e==null||t!=null&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),r=e!=null&&(t==null||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=_e(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=O}handleEvent(e){typeof this.value==`function`?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}},_e=e=>e&&(he?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function ve(e){let t=ye.get(e.type);t===void 0&&(t={stringsArray:new WeakMap,keyString:new Map},ye.set(e.type,t));let n=t.stringsArray.get(e.strings);if(n!==void 0)return n;let r=e.strings.join(p);return n=t.keyString.get(r),n===void 0&&(n=new _(e,e.getTemplateElement()),t.keyString.set(r,n)),t.stringsArray.set(e.strings,n),n}var ye=new Map,k=new WeakMap,be=(e,t,n)=>{let r=k.get(t);r===void 0&&(f(t,t.firstChild),k.set(t,r=new de(Object.assign({templateFactory:ve},n))),r.appendInto(t)),r.setValue(e),r.commit()},xe=new class{handleAttributeExpressions(e,t,n,r){let i=t[0];return i===`.`?new pe(e,t.slice(1),n).parts:i===`@`?[new ge(e,t.slice(1),r.eventContext)]:i===`?`?[new fe(e,t.slice(1),n)]:new le(e,t,n).parts}handleTextExpression(e){return new de(e)}};typeof window<`u`&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push(`1.3.0`);var A=(e,...t)=>new oe(e,t,`html`,xe),Se=(e,t)=>`${e}--${t}`,Ce=!0;window.ShadyCSS===void 0?Ce=!1:window.ShadyCSS.prepareTemplateDom===void 0&&(console.warn(`Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1.`),Ce=!1);var we=e=>t=>{let n=Se(t.type,e),r=ye.get(n);r===void 0&&(r={stringsArray:new WeakMap,keyString:new Map},ye.set(n,r));let i=r.stringsArray.get(t.strings);if(i!==void 0)return i;let a=t.strings.join(p);if(i=r.keyString.get(a),i===void 0){let n=t.getTemplateElement();Ce&&window.ShadyCSS.prepareTemplateDom(n,e),i=new _(t,n),r.keyString.set(a,i)}return r.stringsArray.set(t.strings,i),i},Te=[`html`,`svg`],Ee=e=>{Te.forEach(t=>{let n=ye.get(Se(t,e));n!==void 0&&n.keyString.forEach(e=>{let{element:{content:t}}=e,n=new Set;Array.from(t.querySelectorAll(`style`)).forEach(e=>{n.add(e)}),C(e,n)})})},De=new Set,Oe=(e,t,n)=>{De.add(e);let r=n?n.element:document.createElement(`template`),i=t.querySelectorAll(`style`),{length:a}=i;if(a===0){window.ShadyCSS.prepareTemplateStyles(r,e);return}let o=document.createElement(`style`);for(let e=0;e<a;e++){let t=i[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}Ee(e);let s=r.content;n?te(n,o,s.firstChild):s.insertBefore(o,s.firstChild),window.ShadyCSS.prepareTemplateStyles(r,e);let c=s.querySelector(`style`);if(window.ShadyCSS.nativeShadow&&c!==null)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(n){s.insertBefore(o,s.firstChild);let e=new Set;e.add(o),C(n,e)}},ke=(e,t,n)=>{if(!n||typeof n!=`object`||!n.scopeName)throw Error("The `scopeName` option is required.");let r=n.scopeName,i=k.has(t),a=Ce&&t.nodeType===11&&!!t.host,o=a&&!De.has(r),s=o?document.createDocumentFragment():t;if(be(e,s,Object.assign({templateFactory:we(r)},n)),o){let e=k.get(s);k.delete(s),Oe(r,s,e.value instanceof re?e.value.template:void 0),f(t,t.firstChild),t.appendChild(s),k.set(t,e)}!i&&a&&window.ShadyCSS.styleElement(t.host)},Ae;window.JSCompiler_renameProperty=(e,t)=>e;var je={toAttribute(e,t){switch(t){case Boolean:return e?``:null;case Object:case Array:return e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return e!==null;case Number:return e===null?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},Me=(e,t)=>t!==e&&(t===t||e===e),Ne={attribute:!0,type:String,converter:je,reflect:!1,hasChanged:Me},Pe=1,Fe=4,Ie=8,Le=16,Re=`finalized`,ze=class extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();let e=[];return this._classProperties.forEach((t,n)=>{let r=this._attributeNameForProperty(n,t);r!==void 0&&(this._attributeToPropertyMap.set(r,n),e.push(r))}),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty(`_classProperties`,this))){this._classProperties=new Map;let e=Object.getPrototypeOf(this)._classProperties;e!==void 0&&e.forEach((e,t)=>this._classProperties.set(t,e))}}static createProperty(e,t=Ne){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;let n=typeof e==`symbol`?Symbol():`__${e}`,r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(r){let i=this[e];this[t]=r,this.requestUpdateInternal(e,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Ne}static finalize(){let e=Object.getPrototypeOf(this);if(e.hasOwnProperty(Re)||e.finalize(),this[Re]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty(`properties`,this))){let e=this.properties,t=[...Object.getOwnPropertyNames(e),...typeof Object.getOwnPropertySymbols==`function`?Object.getOwnPropertySymbols(e):[]];for(let n of t)this.createProperty(n,e[n])}}static _attributeNameForProperty(e,t){let n=t.attribute;return n===!1?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}static _valueHasChanged(e,t,n=Me){return n(e,t)}static _propertyValueFromAttribute(e,t){let n=t.type,r=t.converter||je,i=typeof r==`function`?r:r.fromAttribute;return i?i(e,n):e}static _propertyValueToAttribute(e,t){if(t.reflect===void 0)return;let n=t.type,r=t.converter;return(r&&r.toAttribute||je.toAttribute)(e,n)}initialize(){this._updateState=0,this._updatePromise=new Promise(e=>this._enableUpdatingResolver=e),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((e,t)=>{if(this.hasOwnProperty(t)){let e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}})}_applyInstanceProperties(){this._instanceProperties.forEach((e,t)=>this[t]=e),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){this._enableUpdatingResolver!==void 0&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,n){t!==n&&this._attributeToProperty(e,n)}_propertyToAttribute(e,t,n=Ne){let r=this.constructor,i=r._attributeNameForProperty(e,n);if(i!==void 0){let e=r._propertyValueToAttribute(t,n);if(e===void 0)return;this._updateState|=Ie,e==null?this.removeAttribute(i):this.setAttribute(i,e),this._updateState&=-9}}_attributeToProperty(e,t){if(this._updateState&Ie)return;let n=this.constructor,r=n._attributeToPropertyMap.get(e);if(r!==void 0){let e=n.getPropertyOptions(r);this._updateState|=Le,this[r]=n._propertyValueFromAttribute(t,e),this._updateState&=-17}}requestUpdateInternal(e,t,n){let r=!0;if(e!==void 0){let i=this.constructor;n=n||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,n.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),n.reflect===!0&&!(this._updateState&Le)&&(this._reflectingProperties===void 0&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,n))):r=!1}!this._hasRequestedUpdate&&r&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState|=Fe;try{await this._updatePromise}catch{}let e=this.performUpdate();return e!=null&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&Fe}get hasUpdated(){return this._updateState&Pe}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1,t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(this._updateState&Pe||(this._updateState|=Pe,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState&=-5}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){this._reflectingProperties!==void 0&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((e,t)=>this._propertyToAttribute(t,this[t],e)),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}};Ae=Re,ze[Ae]=!0;var Be=Element.prototype;Be.msMatchesSelector||Be.webkitMatchesSelector;var Ve=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,He=Symbol(),Ue=class{constructor(e,t){if(t!==He)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return this._styleSheet===void 0&&(Ve?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}},We=e=>new Ue(String(e),He),Ge=e=>{if(e instanceof Ue)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but
            take care to ensure page security.`)},j=(e,...t)=>new Ue(t.reduce((t,n,r)=>t+Ge(n)+e[r+1],e[0]),He);(window.litElementVersions||(window.litElementVersions=[])).push(`2.4.0`);var Ke={},M=class extends ze{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty(`_styles`,this)))return;let e=this.getStyles();if(Array.isArray(e)){let t=(e,n)=>e.reduceRight((e,n)=>Array.isArray(n)?t(n,e):(e.add(n),e),n),n=t(e,new Set),r=[];n.forEach(e=>r.unshift(e)),this._styles=r}else this._styles=e===void 0?[]:[e];this._styles=this._styles.map(e=>e instanceof CSSStyleSheet&&!Ve?We(Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,``)):e)}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:`open`})}adoptStyles(){let e=this.constructor._styles;e.length!==0&&(window.ShadyCSS!==void 0&&!window.ShadyCSS.nativeShadow?window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName):Ve?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0)}connectedCallback(){super.connectedCallback(),this.hasUpdated&&window.ShadyCSS!==void 0&&window.ShadyCSS.styleElement(this)}update(e){let t=this.render();super.update(e),t!==Ke&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{let t=document.createElement(`style`);t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return Ke}};M.finalized=!0,M.render=ke;var qe=new WeakMap,Je=E(e=>t=>{if(!(t instanceof de))throw Error(`cache can only be used in text bindings`);let n=qe.get(t);n===void 0&&(n=new WeakMap,qe.set(t,n));let r=t.value;if(r instanceof re){if(e instanceof oe&&r.template===t.options.templateFactory(e)){t.setValue(e);return}{let e=n.get(r.template);e===void 0&&(e={instance:r,nodes:document.createDocumentFragment()},n.set(r.template,e)),d(e.nodes,t.startNode.nextSibling,t.endNode)}}if(e instanceof oe){let r=t.options.templateFactory(e),i=n.get(r);i!==void 0&&(t.setValue(i.nodes),t.commit(),t.value=i.instance)}t.setValue(e)}),Ye={items:[{name:`learn`,route:!1,children:[{heading:`docs`},{name:`guide`,page:`guide/intro`},{name:`api`},{name:`examples`,url:`https://github.com/stalniy/casl-examples`},{name:`cookbook`,page:`cookbook/intro`}]},{name:`ecosystem`,route:!1,children:[{heading:`packages`},{name:`pkg-prisma`,page:`package/casl-prisma`},{name:`pkg-mongoose`,page:`package/casl-mongoose`},{name:`pkg-angular`,page:`package/casl-angular`},{name:`pkg-react`,page:`package/casl-react`},{name:`pkg-vue`,page:`package/casl-vue`},{heading:`help`},{name:`questions`,url:`https://stackoverflow.com/questions/tagged/casl`},{name:`chat`,url:`https://github.com/stalniy/casl/discussions`},{heading:`news`},{name:`blog`,url:`https://sergiy-stotskiy.medium.com`}]},{name:`support`}],footer:[{icon:`github`,url:`https://github.com/stalniy/casl`},{icon:`twitter`,url:`https://twitter.com/sergiy_stotskiy`},{icon:`medium`,url:`https://sergiy-stotskiy.medium.com`}]},Xe=function(e,t){return e.methods.pathname(t)},Ze=l(o(((e,t)=>{t.exports=_,t.exports.match=s,t.exports.regexpToFunction=c,t.exports.parse=i,t.exports.compile=o,t.exports.tokensToFunction=l,t.exports.tokensToRegExp=g;var n=`/`,r=new RegExp([`(\\\\.)`,`(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?`].join(`|`),`g`);function i(e,t){for(var i=[],o=0,s=0,c=``,l=t&&t.delimiter||n,u=t&&t.whitelist||void 0,f=!1,p;(p=r.exec(e))!==null;){var m=p[0],h=p[1],g=p.index;if(c+=e.slice(s,g),s=g+m.length,h){c+=h[1],f=!0;continue}var _=``,v=p[2],y=p[3],b=p[4],x=p[5];if(!f&&c.length){var S=c.length-1,C=c[S];(!u||u.indexOf(C)>-1)&&(_=C,c=c.slice(0,S))}c&&(i.push(c),c=``,f=!1);var ee=x===`+`||x===`*`,w=x===`?`||x===`*`,te=y||b,T=_||l,E=_||(typeof i[i.length-1]==`string`?i[i.length-1]:``);i.push({name:v||o++,prefix:_,delimiter:T,optional:w,repeat:ee,pattern:te?d(te):a(T,l,E)})}return(c||s<e.length)&&i.push(c+e.substr(s)),i}function a(e,t,n){var r=`[^`+u(e===t?e:e+t)+`]`;return!n||n.indexOf(e)>-1||n.indexOf(t)>-1?r+`+?`:u(n)+`|(?:(?!`+u(n)+`)`+r+`)+?`}function o(e,t){return l(i(e,t),t)}function s(e,t){var n=[];return c(_(e,n,t),n)}function c(e,t){return function(n,r){var i=e.exec(n);if(!i)return!1;for(var a=i[0],o=i.index,s={},c=r&&r.decode||decodeURIComponent,l=1;l<i.length;l++)if(i[l]!==void 0){var u=t[l-1];u.repeat?s[u.name]=i[l].split(u.delimiter).map(function(e){return c(e,u)}):s[u.name]=c(i[l],u)}return{path:a,index:o,params:s}}}function l(e,t){for(var n=Array(e.length),r=0;r<e.length;r++)typeof e[r]==`object`&&(n[r]=RegExp(`^(?:`+e[r].pattern+`)$`,f(t)));return function(t,r){for(var i=``,a=r&&r.encode||encodeURIComponent,o=!r||r.validate!==!1,s=0;s<e.length;s++){var c=e[s];if(typeof c==`string`){i+=c;continue}var l=t?t[c.name]:void 0,u;if(Array.isArray(l)){if(!c.repeat)throw TypeError(`Expected "`+c.name+`" to not repeat, but got array`);if(l.length===0){if(c.optional)continue;throw TypeError(`Expected "`+c.name+`" to not be empty`)}for(var d=0;d<l.length;d++){if(u=a(l[d],c),o&&!n[s].test(u))throw TypeError(`Expected all "`+c.name+`" to match "`+c.pattern+`"`);i+=(d===0?c.prefix:c.delimiter)+u}continue}if(typeof l==`string`||typeof l==`number`||typeof l==`boolean`){if(u=a(String(l),c),o&&!n[s].test(u))throw TypeError(`Expected "`+c.name+`" to match "`+c.pattern+`", but got "`+u+`"`);i+=c.prefix+u;continue}if(!c.optional)throw TypeError(`Expected "`+c.name+`" to be `+(c.repeat?`an array`:`a string`))}return i}}function u(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,`\\$1`)}function d(e){return e.replace(/([=!:$/()])/g,`\\$1`)}function f(e){return e&&e.sensitive?``:`i`}function p(e,t){if(!t)return e;var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return e}function m(e,t,n){for(var r=[],i=0;i<e.length;i++)r.push(_(e[i],t,n).source);return RegExp(`(?:`+r.join(`|`)+`)`,f(n))}function h(e,t,n){return g(i(e,n),t,n)}function g(e,t,r){r=r||{};for(var i=r.strict,a=r.start!==!1,o=r.end!==!1,s=r.delimiter||n,c=[].concat(r.endsWith||[]).map(u).concat(`$`).join(`|`),l=a?`^`:``,d=0;d<e.length;d++){var p=e[d];if(typeof p==`string`)l+=u(p);else{var m=p.repeat?`(?:`+p.pattern+`)(?:`+u(p.delimiter)+`(?:`+p.pattern+`))*`:p.pattern;t&&t.push(p),p.optional?p.prefix?l+=`(?:`+u(p.prefix)+`(`+m+`))?`:l+=`(`+m+`)?`:l+=u(p.prefix)+`(`+m+`)`}}if(o)i||(l+=`(?:`+u(s)+`)?`),l+=c===`$`?`$`:`(?=`+c+`)`;else{var h=e[e.length-1],g=typeof h==`string`?h[h.length-1]===s:h===void 0;i||(l+=`(?:`+u(s)+`(?=`+c+`))?`),g||(l+=`(?=`+u(s)+`|`+c+`)`)}return new RegExp(l,f(r))}function _(e,t,n){return e instanceof RegExp?p(e,t):Array.isArray(e)?m(e,t,n):h(e,t,n)}}))()),Qe=function(e){return e.methods.resolve!==void 0},$e=function(e){return`externalURL`in e},et=function(e,t){if($e(e))return e;var n=e.name,r=e.params,i=e.query,a=e.hash;return{name:n,params:r,query:i,hash:a,state:e.state,url:`url`in e?e.url:t.url({name:n,params:r,query:i,hash:a})}},tt=function(e,t,n,r,i){var a=n||{},o=a.resolved,s=o===void 0?null:o,c=a.error,l=c===void 0?null:c,u={data:void 0,body:void 0,meta:void 0};for(var d in t)u[d]=t[d];if(!e.methods.respond)return u;var f=e.methods.respond({resolved:s,error:l,match:t,external:i});return f?(u.meta=f.meta,u.body=f.body,u.data=f.data,f.redirect&&(u.redirect=et(f.redirect,r)),u):u},nt=function(e,t,n){var r,i;n===void 0&&(n={});var a=(r=n.history,r===void 0?{}:r),o=n.sideEffects,s=n.external,c=(i=n.invisibleRedirects,i!==void 0&&i),l,u,d,f,p,m=[],h=[],g=[],_,v,y=function(){_=void 0,v=void 0},b=function(){_&&_(),y()},x=function(){v&&v(),y()},S=function(e,t){return _=e,v=t,y},C=function(){p&&(p=void 0,m.forEach(function(e){e()}))},ee=function(e){h.forEach(function(t){t(e)})},w=function(e){g.splice(0).forEach(function(t){t(e)}),o&&o.forEach(function(t){t(e)})},te=function(e,t){if(!e.redirect||!c||$e(e.redirect)){d=e,f=t;var n={response:e,navigation:t,router:u};ee(n),w(n)}e.redirect!==void 0&&!$e(e.redirect)&&l.navigate(e.redirect,`replace`)},T=function(e,t,n,r,i){C(),n.finish();var a=tt(e,t,i,u,s);x(),te(a,r)},E=function(){m.length&&p===void 0&&(p=function(){l.cancel(),C(),b()},m.forEach(function(e){e(p)}))};return l=e(function(e){var n={action:e.action,previous:d},r=t.match(e.location);if(!r){e.finish(),x();return}var i=r.route,a=r.match;Qe(i)?(E(),i.methods.resolve(a,s).then(function(e){return{resolved:e,error:null}},function(e){return{error:e,resolved:null}}).then(function(t){e.cancelled||T(i,a,e,n,t)})):T(i,a,e,n,null)},a),u={route:t.route,history:l,external:s,observe:function(e,t){var n,r=(n=(t||{}).initial,n===void 0||n);return h.push(e),d&&r&&e({response:d,navigation:f,router:u}),function(){h=h.filter(function(t){return t!==e})}},once:function(e,t){var n,r=(n=(t||{}).initial,n===void 0||n);d&&r?e({response:d,navigation:f,router:u}):g.push(e)},cancel:function(e){return m.push(e),function(){m=m.filter(function(t){return t!==e})}},url:function(e){var t=e.name,n=e.params,r=e.hash,i=e.query,a;if(t){var o=u.route(t);o&&(a=Xe(o,n))}return l.url({pathname:a,hash:r,query:i})},navigate:function(e){b();var t=e.url,n=e.state,r=e.method;if(l.navigate({url:t,state:n},r),e.cancelled||e.finished)return S(e.cancelled,e.finished)},current:function(){return{response:d,navigation:f}},destroy:function(){l.destroy()}},l.current(),u},rt=function(e){return e.charAt(0)===`/`?e:`/`+e},it=function(e){return e.charAt(e.length-1)===`/`?e:e+`/`},at=function(e,t){return it(e)+t},ot=function(e,t,n){n===void 0&&(n={path:``,keys:[]});var r=rt(at(n.path,e.path)),i=e.pathOptions||{},a=i.match,o=a===void 0?{}:a,s=i.compile,c=s===void 0?{}:s,l=o.end==null||o.end;e.children&&e.children.length&&(o.end=!1);var u=[],d=(0,Ze.default)(rt(e.path),u,o),f=u.map(function(e){return e.name});n.keys.length&&(f=n.keys.concat(f));var p=[],m=[];if(e.children)for(var h=0,g=e.children;h<g.length;h++){var _=g[h],v=ot(_,t,{path:r,keys:f});p.push(v),m.push(v.public)}var y=Ze.default.compile(r),b={public:{name:e.name,keys:f,parent:void 0,children:m,methods:{resolve:e.resolve,respond:e.respond,pathname:function(e){return y(e,c)}},extra:e.extra},matching:{re:d,keys:u,exact:l,parsers:e.params||{},children:p}};return t[e.name]=b.public,p.length&&p.forEach(function(e){e.public.parent=b.public}),b},st=function(e,t){var n=e.matching,r=n.re,i=n.children,a=n.exact,o=r.exec(t);if(!o)return[];var s=o[0],c=[{route:e,parsed:o.slice(1)}],l=t.slice(s.length);if(!i.length||l===``)return c;for(var u=rt(l),d=0,f=i;d<f.length;d++){var p=f[d],m=st(p,u);if(m.length)return c.concat(m)}return a?[]:c},ct=function(e,t){for(var n=e[e.length-1].route.public,r={},i=0,a=e;i<a.length;i++)for(var o=a[i],s=o.route,c=o.parsed,l=s.matching,u=l.keys,d=l.parsers,f=0,p=c.length;f<p;f++){var m=u[f].name,h=d[m]||decodeURIComponent;c[f]!==void 0&&(r[m]=h(c[f]))}return{route:n,match:{location:t,name:n.name,params:r}}},lt=function(e){var t={},n=e.map(function(e){return ot(e,t)});return{match:function(e){for(var t=0,r=n;t<r.length;t++){var i=r[t],a=st(i,e.pathname);if(a.length)return ct(a,e)}},route:function(e){return t[e]}}};function ut(e,t){return e?e.indexOf(t)===0?e:t+e:``}function dt(e){return e||``}function ft(e){return e||``}function pt(e){e===void 0&&(e={});var t=e.query,n=t===void 0?{}:t,r=n.parse,i=r===void 0?dt:r,a=n.stringify,o=a===void 0?ft:a,s=e.base;return{location:function(e,t){var n=e.url,r=e.state;if(n===``||n.charAt(0)===`#`){t||(t={pathname:`/`,hash:``,query:i()});var a={pathname:t.pathname,hash:n.charAt(0)===`#`?n.substring(1):t.hash,query:t.query};return r&&(a.state=r),a}var o=n.indexOf(`#`),c;o===-1?c=``:(c=n.substring(o+1),n=n.substring(0,o));var l=n.indexOf(`?`),u;l!==-1&&(u=n.substring(l+1),n=n.substring(0,l));var d=i(u),f=s?s.remove(n):n;f===``&&(f=`/`);var p={hash:c,query:d,pathname:f};return r&&(p.state=r),p},keyed:function(e,t){return e.key=t,e},stringify:function(e){if(typeof e==`string`){var t=e.charAt(0);return t===`#`||t===`?`?e:s?s.add(e):e}return(e.pathname===void 0?``:s?s.add(e.pathname):e.pathname)+ut(o(e.query),`?`)+ut(e.hash,`#`)}}}function mt(){var e=0;return{major:function(t){return t&&(e=t[0]+1),[e++,0]},minor:function(e){return[e[0],e[1]+1]}}}function ht(e){var t=e.responseHandler,n=e.utils,r=e.keygen,i=e.current,a=e.push,o=e.replace,s;function c(e,t,n,r){var i={location:e,action:t,finish:function(){s===i&&(n(),s=void 0)},cancel:function(e){s===i&&(r(e),i.cancelled=!0,s=void 0)},cancelled:!1};return i}function l(e){s=e,t(e)}function u(e){s&&(s.cancel(e),s=void 0)}function d(e,t){var r=i(),a=n.location(e,r);switch(t){case`anchor`:return n.stringify(a)===n.stringify(r)?f(a):p(a);case`push`:return p(a);case`replace`:return f(a);default:throw Error(`Invalid navigation type: `+t)}}function f(e){var t=n.keyed(e,r.minor(i().key));return c(t,`replace`,o.finish(t),o.cancel)}function p(e){var t=n.keyed(e,r.major(i().key));return c(t,`push`,a.finish(t),a.cancel)}return{prepare:d,emitNavigation:l,createNavigation:c,cancelPending:u}}function gt(){}function _t(){var e;return{confirmNavigation:function(t,n,r){e?e(t,n,r||gt):n()},confirm:function(t){e=t||null}}}function vt(e,t){return RegExp(`^`+t+`(\\/|\\?|#|$)`,`i`).test(e)}function yt(e,t){if(typeof e!=`string`||e.charAt(0)!==`/`||e.charAt(e.length-1)===`/`)throw Error(`The base segment "`+e+`" is not valid. The "base" option must begin with a forward slash and end with a non-forward slash character.`);var n=t||{},r=n.emptyRoot,i=r!==void 0&&r,a=n.strict,o=a!==void 0&&a;return{add:function(t){if(i){if(t===`/`)return e;if(t.startsWith(`/?`)||t.startsWith(`/#`))return``+e+t.substr(1)}else if(t.charAt(0)===`?`||t.charAt(0)===`#`)return t;return``+e+t},remove:function(t){if(t===``)return``;if(!vt(t,e)){if(o)throw Error(`Expected a string that begins with "`+e+`", but received "`+t+`".`);return t}if(t===e){if(o&&!i)throw Error(`Received string "`+e+`", which is the same as the base, but "emptyRoot" is not true.`);return`/`}return t.substr(e.length)}}}function bt(){return!!(window&&window.location)}function xt(e){return e.state===void 0&&navigator.userAgent.indexOf(`CriOS`)===-1}function St(){try{return window.history.state||{}}catch{return{}}}function N(){}function Ct(e,t){if(t===void 0&&(t={}),!bt())throw Error(`Cannot use @hickory/browser without a DOM`);var n=pt(t),r=mt(),i=_t(),a=i.confirm,o=i.confirmNavigation;function s(e){var t=window.location,i=t.pathname,a=t.search,o=t.hash,s=i+a+o,c=e||St(),l=c.key,u=c.state;l||(l=r.major(),window.history.replaceState({key:l,state:u},``,s));var d=n.location({url:s,state:u});return n.keyed(d,l)}function c(e){return n.stringify(e)}var l=St().key===void 0?`push`:`pop`,u=ht({responseHandler:e,utils:n,keygen:r,current:function(){return _.location},push:{finish:function(e){return function(){var t=c(e),n=e.key,r=e.state;try{window.history.pushState({key:n,state:r},``,t)}catch{window.location.assign(t)}_.location=e,l=`push`}},cancel:N},replace:{finish:function(e){return function(){var t=c(e),n=e.key,r=e.state;try{window.history.replaceState({key:n,state:r},``,t)}catch{window.location.replace(t)}_.location=e,l=`replace`}},cancel:N}}),d=u.emitNavigation,f=u.cancelPending,p=u.createNavigation,m=u.prepare,h=!1;function g(e){if(h){h=!1;return}if(!xt(e)){f(`pop`);var t=s(e.state),n=_.location.key[0]-t.key[0],r=function(){h=!0,window.history.go(n)};o({to:t,from:_.location,action:`pop`},function(){d(p(t,`pop`,function(){_.location=t,l=`pop`},function(e){e!==`pop`&&r()}))},r)}}window.addEventListener(`popstate`,g,!1);var _={location:s(),current:function(){d(p(_.location,l,N,N))},url:c,navigate:function(e,t){t===void 0&&(t=`anchor`);var n=m(e,t);f(n.action),o({to:n.location,from:_.location,action:n.action},function(){d(n)})},go:function(e){window.history.go(e)},confirm:a,cancel:function(){f()},destroy:function(){window.removeEventListener(`popstate`,g),d=N}};return _}var wt={routes:[{name:`home`,path:`:lang`,restrictions:{lang:`en`},controller:`Home`,sitemap:{priority:1,changefreq:`yearly`,provider:`langs`},children:[{name:`api`,path:`api/:id?`,restrictions:{id:`[\\w/-]+`},controller:`Page`,meta:{categories:[`api`],ignoreIdPrefix:!0},sitemap:{priority:.7,changefreq:`monthly`,provider:`pages`}},{name:`support`,path:`support-casljs`,controller:`Page`,sitemap:{priority:1,changefreq:`yearly`,provider:`route`}},{name:`page`,path:`:id`,restrictions:{id:`[\\w/-]+`},controller:`Page`,meta:{encode:!1,categories:[`guide`,`advanced`,`package`,`cookbook`]},sitemap:{priority:1,changefreq:`monthly`,provider:`pages`}}]}]},P={repoURL:`https://github.com/stalniy/casl`,baseUrl:`/v7`},Tt=6e4,Et=`langChanged`;function Dt(e,t,n){return Object.entries(kt(t||{})).reduce((e,[t,n])=>e.replace(RegExp(`{{[  ]*${t}[  ]*}}`,`gm`),String(kt(n))),e)}function Ot(e,t){let n=e.split(`.`),r=t.strings;for(;r!=null&&n.length>0;)r=r[n.shift()];return r==null?null:r.toString()}function kt(e){return typeof e==`function`?e():e}var F={loader:()=>Promise.resolve({}),empty:e=>`[${e}]`,lookup:Ot,interpolate:Dt,translationCache:{}};function At(e){return F=Object.assign(Object.assign({},F),e)}function jt(e){window.dispatchEvent(new CustomEvent(Et,{detail:e}))}function Mt(e,t,n=F){jt({previousStrings:n.strings,previousLang:n.lang,lang:n.lang=e,strings:n.strings=t})}function Nt(e,t){let n=t=>e(t.detail);return window.addEventListener(Et,n,t),()=>window.removeEventListener(Et,n)}async function Pt(e,t=F){let n=await t.loader(e,t);t.translationCache={},Mt(e,n,t)}function Ft(e,t,n=F){let r=n.translationCache[e]||(n.translationCache[e]=n.lookup(e,n)||n.empty(e,n));return t=t==null?null:kt(t),t==null?r:n.interpolate(r,t,n)}function It(e){return e instanceof de?e.startNode.isConnected:e instanceof ue?e.committer.element.isConnected:e.element.isConnected}function Lt(e){for(let[t]of e)It(t)||e.delete(t)}function Rt(e){`requestIdleCallback`in window?window.requestIdleCallback(e):setTimeout(e)}function zt(e,t){setInterval(()=>Rt(()=>Lt(e)),t)}var Bt=new Map;function Vt(){Nt(e=>{for(let[t,n]of Bt)It(t)&&Ht(t,n,e)})}Vt(),zt(Bt,Tt);function Ht(e,t,n){let r=t(n);e.value!==r&&(e.setValue(r),e.commit())}var Ut=E(e=>t=>{Bt.set(t,e),Ht(t,e)}),Wt=(e,t,n)=>Ut(()=>Ft(e,t,n)),Gt=new WeakMap,Kt=E(e=>t=>{if(!(t instanceof de))throw Error(`unsafeHTML can only be used in text bindings`);let n=Gt.get(t);if(n!==void 0&&se(e)&&e===n.value&&t.value===n.fragment)return;let r=document.createElement(`template`);r.innerHTML=e;let i=document.importNode(r.content,!0);t.setValue(i),Gt.set(t,{value:e,fragment:i})}),qt=(...e)=>JSON.stringify(e);function I(e,t=qt){let n=new Map,r=function(...r){let i=t(...r);return n.has(i)||n.set(i,e.apply(this,r)),n.get(i)};return r.cache=n,r}function Jt(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}var Yt=e=>e,Xt={json:JSON,raw:{parse:Yt,stringify:Yt},txtArrayJSON:{parse(e){let t=e.trim().replace(/[\r\n]+/g,`,`);return JSON.parse(`[${t}]`)},stringify(){throw Error(`"txtArrayJSON" format is not serializable`)}}};function Zt(e,t={}){let n=Xt[t.format||`json`];return new Promise((r,i)=>{let a=new XMLHttpRequest;a.open(t.method||`GET`,e),t.headers&&Object.keys(t.headers).forEach(e=>{a.setRequestHeader(e,t.headers[e])}),a.onload=()=>r({status:a.status,headers:{"content-type":a.getResponseHeader(`Content-Type`)},body:n.parse(a.responseText)}),a.ontimeout=a.onerror=i,a.send(t.data?n.stringify(t.data):null)})}var L=Object.create(null);function Qt(e,t={}){let n=t.absoluteUrl?e:P.baseUrl+e;return(t.method||`GET`)===`GET`?(L[n]=L[n]||Zt(n,t),t.cache===!0?L[n]:L[n].then(e=>(delete L[n],e)).catch(e=>(delete L[n],Promise.reject(e)))):Zt(n,t)}var $t={en:{default:`/assets/default.en-CgmBkEw7.json`}};function en(e,t){let n=e.split(`.`),r=t.strings;for(let e=0;e<n.length;e++){let t=n[e];if(!r||!r[t])return;r=r[t]}return r}function tn(e){return console.warn(`missing i18n key: ${e}`),e}var nn=/%\{(\w+)\}/g;function rn(e,t){return e.replace(nn,(e,n)=>t[n])}var an=At({async loader(e){return(await Qt($t[e].default)).body},lookup:en,interpolate:rn,empty:tn}),on=I((e,t)=>new Intl.DateTimeFormat(e,Ft(`dateTimeFormats.${t}`))),sn=[`en`],cn=sn[0],R=()=>an.lang,z=Ft,ln=e=>!!en(e,an);function un(e){if(!sn.includes(e))throw Error(`Locale ${e} is not supported. Supported: ${sn.join(`, `)}`);return Pt(e)}function dn(e,t=`default`){let n=typeof e==`string`?new Date(e):e;return on(an.lang,t).format(n)}var B=function(){return B=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},B.apply(this,arguments)};function fn(e){var t=typeof Symbol==`function`&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&typeof e.length==`number`)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?`Object is not iterable.`:`Symbol.iterator is not defined.`)}function V(e,t){var n=typeof Symbol==`function`&&e[Symbol.iterator];if(!n)return e;var r=n.call(e),i,a=[],o;try{for(;(t===void 0||t-->0)&&!(i=r.next()).done;)a.push(i.value)}catch(e){o={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(o)throw o.error}}return a}function pn(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(V(arguments[t]));return e}var mn=`ENTRIES`,hn=`KEYS`,gn=`VALUES`,H=``,_n=function(){function e(e,t){var n=e._tree,r=Object.keys(n);this.set=e,this._type=t,this._path=r.length>0?[{node:n,keys:r}]:[]}return e.prototype.next=function(){var e=this.dive();return this.backtrack(),e},e.prototype.dive=function(){if(this._path.length===0)return{done:!0,value:void 0};var e=U(this._path),t=e.node,n=e.keys;return U(n)===H?{done:!1,value:this.result()}:(this._path.push({node:t[U(n)],keys:Object.keys(t[U(n)])}),this.dive())},e.prototype.backtrack=function(){this._path.length!==0&&(U(this._path).keys.pop(),!(U(this._path).keys.length>0)&&(this._path.pop(),this.backtrack()))},e.prototype.key=function(){return this.set._prefix+this._path.map(function(e){var t=e.keys;return U(t)}).filter(function(e){return e!==H}).join(``)},e.prototype.value=function(){return U(this._path).node[H]},e.prototype.result=function(){return this._type===gn?this.value():this._type===hn?this.key():[this.key(),this.value()]},e.prototype[Symbol.iterator]=function(){return this},e}(),U=function(e){return e[e.length-1]},vn=0,yn=1,bn=2,xn=3,Sn=function(e,t,n){for(var r=[{distance:0,i:0,key:``,node:e}],i={},a=[],o=function(){var e=r.pop(),o=e.node,s=e.distance,c=e.key,l=e.i,u=e.edit;Object.keys(o).forEach(function(e){if(e===H){var d=s+(t.length-l),f=V(i[c]||[null,1/0],2)[1];d<=n&&d<f&&(i[c]=[o[e],d])}else Cn(t,e,n-s,l,u,a).forEach(function(t){var n=t.distance,i=t.i,a=t.edit;r.push({node:o[e],distance:s+n,key:c+e,i,edit:a})})})};r.length>0;)o();return i},Cn=function(e,t,n,r,i,a){a.push({distance:0,ia:r,ib:0,edit:i});for(var o=[];a.length>0;){var s=a.pop(),c=s.distance,l=s.ia,u=s.ib,d=s.edit;if(u===t.length){o.push({distance:c,i:l,edit:d});continue}if(e[l]===t[u])a.push({distance:c,ia:l+1,ib:u+1,edit:vn});else{if(c>=n)continue;d!==bn&&a.push({distance:c+1,ia:l,ib:u+1,edit:xn}),l<e.length&&(d!==xn&&a.push({distance:c+1,ia:l+1,ib:u,edit:bn}),d!==xn&&d!==bn&&a.push({distance:c+1,ia:l+1,ib:u+1,edit:yn}))}}return o},wn=function(){function e(e,t){e===void 0&&(e={}),t===void 0&&(t=``),this._tree=e,this._prefix=t}return e.prototype.atPrefix=function(t){var n;if(!t.startsWith(this._prefix))throw Error(`Mismatched prefix`);var r=V(Tn(this._tree,t.slice(this._prefix.length)),2),i=r[0],a=r[1];if(i===void 0){var o=V(Mn(a),2),s=o[0],c=o[1],l=Object.keys(s).find(function(e){return e!==H&&e.startsWith(c)});if(l!==void 0)return new e((n={},n[l.slice(c.length)]=s[l],n),t)}return new e(i||{},t)},e.prototype.clear=function(){delete this._size,this._tree={}},e.prototype.delete=function(e){return delete this._size,kn(this._tree,e)},e.prototype.entries=function(){return new _n(this,mn)},e.prototype.forEach=function(e){var t,n;try{for(var r=fn(this),i=r.next();!i.done;i=r.next()){var a=V(i.value,2),o=a[0],s=a[1];e(o,s,this)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}},e.prototype.fuzzyGet=function(e,t){return Sn(this._tree,e,t)},e.prototype.get=function(e){var t=En(this._tree,e);return t===void 0?void 0:t[H]},e.prototype.has=function(e){var t=En(this._tree,e);return t!==void 0&&t.hasOwnProperty(H)},e.prototype.keys=function(){return new _n(this,hn)},e.prototype.set=function(e,t){if(typeof e!=`string`)throw Error(`key must be a string`);delete this._size;var n=Dn(this._tree,e);return n[H]=t,this},Object.defineProperty(e.prototype,"size",{get:function(){var e=this;return this._size?this._size:(this._size=0,this.forEach(function(){e._size+=1}),this._size)},enumerable:!1,configurable:!0}),e.prototype.update=function(e,t){if(typeof e!=`string`)throw Error(`key must be a string`);delete this._size;var n=Dn(this._tree,e);return n[H]=t(n[H]),this},e.prototype.values=function(){return new _n(this,gn)},e.prototype[Symbol.iterator]=function(){return this.entries()},e.from=function(t){var n,r,i=new e;try{for(var a=fn(t),o=a.next();!o.done;o=a.next()){var s=V(o.value,2),c=s[0],l=s[1];i.set(c,l)}}catch(e){n={error:e}}finally{try{o&&!o.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}return i},e.fromObject=function(t){return e.from(Object.entries(t))},e}(),Tn=function(e,t,n){if(n===void 0&&(n=[]),t.length===0||e==null)return[e,n];var r=Object.keys(e).find(function(e){return e!==H&&t.startsWith(e)});return r===void 0?(n.push([e,t]),Tn(void 0,``,n)):(n.push([e,r]),Tn(e[r],t.slice(r.length),n))},En=function(e,t){if(t.length===0||e==null)return e;var n=Object.keys(e).find(function(e){return e!==H&&t.startsWith(e)});if(n!==void 0)return En(e[n],t.slice(n.length))},Dn=function(e,t){var n;if(t.length===0||e==null)return e;var r=Object.keys(e).find(function(e){return e!==H&&t.startsWith(e)});if(r===void 0){var i=Object.keys(e).find(function(e){return e!==H&&e.startsWith(t[0])});if(i===void 0)e[t]={};else{var a=On(t,i);return e[a]=(n={},n[i.slice(a.length)]=e[i],n),delete e[i],Dn(e[a],t.slice(a.length))}return e[t]}return Dn(e[r],t.slice(r.length))},On=function(e,t,n,r,i){return n===void 0&&(n=0),r===void 0&&(r=Math.min(e.length,t.length)),i===void 0&&(i=``),n>=r||e[n]!==t[n]?i:On(e,t,n+1,r,i+e[n])},kn=function(e,t){var n=V(Tn(e,t),2),r=n[0],i=n[1];if(r!==void 0){delete r[H];var a=Object.keys(r);a.length===0&&An(i),a.length===1&&jn(i,a[0],r[a[0]])}},An=function(e){if(e.length!==0){var t=V(Mn(e),2),n=t[0],r=t[1];delete n[r],Object.keys(n).length===0&&An(e.slice(0,-1))}},jn=function(e,t,n){if(e.length!==0){var r=V(Mn(e),2),i=r[0],a=r[1];i[a+t]=n,delete i[a]}},Mn=function(e){return e[e.length-1]},Nn,Pn=`or`,Fn=`and`,In=function(){function e(e){if(e?.fields==null)throw Error(`MiniSearch: option "fields" must be provided`);this._options=B(B(B({},Un),e),{searchOptions:B(B({},Wn),e.searchOptions||{})}),this._index=new wn,this._documentCount=0,this._documentIds={},this._fieldIds={},this._fieldLength={},this._averageFieldLength={},this._nextId=0,this._storedFields={},this.addFields(this._options.fields)}return e.prototype.add=function(e){var t=this,n=this._options,r=n.extractField,i=n.tokenize,a=n.processTerm,o=n.fields,s=n.idField,c=r(e,s);if(c==null)throw Error(`MiniSearch: document does not have ID field "`+s+`"`);var l=this.addDocumentId(c);this.saveStoredFields(l,e),o.forEach(function(n){var o=r(e,n);if(o!=null){var s=i(o.toString(),n);t.addFieldLength(l,t._fieldIds[n],t.documentCount-1,s.length),s.forEach(function(e){var r=a(e,n);r&&t.addTerm(t._fieldIds[n],l,r)})}})},e.prototype.addAll=function(e){var t=this;e.forEach(function(e){return t.add(e)})},e.prototype.addAllAsync=function(e,t){var n=this;t===void 0&&(t={});var r=t.chunkSize,i=r===void 0?10:r,a={chunk:[],promise:Promise.resolve()},o=e.reduce(function(e,t,r){var a=e.chunk,o=e.promise;return a.push(t),(r+1)%i===0?{chunk:[],promise:o.then(function(){return new Promise(function(e){return setTimeout(e,0)})}).then(function(){return n.addAll(a)})}:{chunk:a,promise:o}},a),s=o.chunk;return o.promise.then(function(){return n.addAll(s)})},e.prototype.remove=function(e){var t=this,n=this._options,r=n.tokenize,i=n.processTerm,a=n.extractField,o=n.fields,s=n.idField,c=a(e,s);if(c==null)throw Error(`MiniSearch: document does not have ID field "`+s+`"`);var l=V(Object.entries(this._documentIds).find(function(e){var t=V(e,2);return t[0],c===t[1]})||[],1)[0];if(l==null)throw Error(`MiniSearch: cannot remove document with ID `+c+`: it is not in the index`);o.forEach(function(n){var o=a(e,n);o!=null&&r(o.toString(),n).forEach(function(e){var r=i(e,n);r&&t.removeTerm(t._fieldIds[n],l,r)})}),delete this._storedFields[l],delete this._documentIds[l],--this._documentCount},e.prototype.removeAll=function(e){var t=this;if(e)e.forEach(function(e){return t.remove(e)});else if(arguments.length>0)throw Error(`Expected documents to be present. Omit the argument to remove all documents.`);else this._index=new wn,this._documentCount=0,this._documentIds={},this._fieldLength={},this._averageFieldLength={},this._storedFields={},this._nextId=0},e.prototype.search=function(e,t){var n=this;t===void 0&&(t={});var r=this._options,i=r.tokenize,a=r.processTerm,o=r.searchOptions,s=B(B({tokenize:i,processTerm:a},o),t),c=s.tokenize,l=s.processTerm,u=c(e).map(function(e){return l(e)}).filter(function(e){return!!e}).map(Vn(s)).map(function(e){return n.executeQuery(e,s)}),d=this.combineResults(u,s.combineWith);return Object.entries(d).reduce(function(e,t){var r=V(t,2),i=r[0],a=r[1],o=a.score,c=a.match,l=a.terms,u={id:n._documentIds[i],terms:Hn(l),score:o,match:c};return Object.assign(u,n._storedFields[i]),(s.filter==null||s.filter(u))&&e.push(u),e},[]).sort(function(e,t){return e.score<t.score?1:-1})},e.prototype.autoSuggest=function(e,t){t===void 0&&(t={}),t=B(B({},Gn),t);var n=this.search(e,t).reduce(function(e,t){var n=t.score,r=t.terms,i=r.join(` `);return e[i]==null?e[i]={score:n,terms:r,count:1}:(e[i].score+=n,e[i].count+=1),e},{});return Object.entries(n).map(function(e){var t=V(e,2),n=t[0],r=t[1],i=r.score;return{suggestion:n,terms:r.terms,score:i/r.count}}).sort(function(e,t){return e.score<t.score?1:-1})},Object.defineProperty(e.prototype,"documentCount",{get:function(){return this._documentCount},enumerable:!1,configurable:!0}),e.loadJSON=function(t,n){if(n==null)throw Error(`MiniSearch: loadJSON should be given the same options used when serializing the index`);return e.loadJS(JSON.parse(t),n)},e.getDefault=function(e){if(Un.hasOwnProperty(e))return Ln(Un,e);throw Error(`MiniSearch: unknown option "`+e+`"`)},e.loadJS=function(t,n){var r=t.index,i=t.documentCount,a=t.nextId,o=t.documentIds,s=t.fieldIds,c=t.fieldLength,l=t.averageFieldLength,u=t.storedFields,d=new e(n);return d._index=new wn(r._tree,r._prefix),d._documentCount=i,d._nextId=a,d._documentIds=o,d._fieldIds=s,d._fieldLength=c,d._averageFieldLength=l,d._fieldIds=s,d._storedFields=u||{},d},e.prototype.executeQuery=function(e,t){var n=this,r=B(B({},this._options.searchOptions),t),i=(r.fields||this._options.fields).reduce(function(e,t){var n;return B(B({},e),(n={},n[t]=Ln(e,t)||1,n))},r.boost||{}),a=r.boostDocument,o=r.weights,s=B(B({},Wn.weights),o),c=s.fuzzy,l=s.prefix,u=this.termResults(e.term,i,a,this._index.get(e.term));if(!e.fuzzy&&!e.prefix)return u;var d=[u];if(e.prefix&&this._index.atPrefix(e.term).forEach(function(t,r){var o=.3*(t.length-e.term.length)/t.length;d.push(n.termResults(t,i,a,r,l,o))}),e.fuzzy){var f=e.fuzzy===!0?.2:e.fuzzy,p=f<1?Math.round(e.term.length*f):f;Object.entries(this._index.fuzzyGet(e.term,p)).forEach(function(e){var t=V(e,2),r=t[0],o=V(t[1],2),s=o[0],l=o[1]/r.length;d.push(n.termResults(r,i,a,s,c,l))})}return d.reduce(Rn[Pn],{})},e.prototype.combineResults=function(e,t){if(t===void 0&&(t=Pn),e.length===0)return{};var n=t.toLowerCase();return e.reduce(Rn[n],null)||{}},e.prototype.toJSON=function(){return{index:this._index,documentCount:this._documentCount,nextId:this._nextId,documentIds:this._documentIds,fieldIds:this._fieldIds,fieldLength:this._fieldLength,averageFieldLength:this._averageFieldLength,storedFields:this._storedFields}},e.prototype.termResults=function(e,t,n,r,i,a){var o=this;return a===void 0&&(a=0),r==null?{}:Object.entries(t).reduce(function(t,i){var s=V(i,2),c=s[0],l=s[1],u=o._fieldIds[c],d=r[u]||{ds:{}},f=d.df,p=d.ds;return Object.entries(p).forEach(function(r){var i=V(r,2),s=i[0],d=i[1],p=n?n(o._documentIds[s],e):1;if(p){var m=o._fieldLength[s][u]/o._averageFieldLength[u];t[s]=t[s]||{score:0,match:{},terms:[]},t[s].terms.push(e),t[s].match[e]=Ln(t[s].match,e)||[],t[s].score+=p*Bn(d,f,o._documentCount,m,l,a),t[s].match[e].push(c)}}),t},{})},e.prototype.addTerm=function(e,t,n){this._index.update(n,function(n){var r;n=n||{};var i=n[e]||{df:0,ds:{}};return i.ds[t]??(i.df+=1),i.ds[t]=(i.ds[t]||0)+1,B(B({},n),(r={},r[e]=i,r))})},e.prototype.removeTerm=function(e,t,n){var r=this;if(!this._index.has(n)){this.warnDocumentChanged(t,e,n);return}this._index.update(n,function(i){var a,o=i[e];if(o==null||o.ds[t]==null)return r.warnDocumentChanged(t,e,n),i;if(o.ds[t]<=1){if(o.df<=1)return delete i[e],i;--o.df}return o.ds[t]<=1?(delete o.ds[t],i):(--o.ds[t],B(B({},i),(a={},a[e]=o,a)))}),Object.keys(this._index.get(n)).length===0&&this._index.delete(n)},e.prototype.warnDocumentChanged=function(e,t,n){if(console!=null&&console.warn!=null){var r=Object.entries(this._fieldIds).find(function(e){var n=V(e,2);return n[0],n[1]===t})[0];console.warn(`MiniSearch: document with ID `+this._documentIds[e]+` has changed before removal: term "`+n+`" was not present in field "`+r+`". Removing a document after it has changed can corrupt the index!`)}},e.prototype.addDocumentId=function(e){var t=this._nextId.toString(36);return this._documentIds[t]=e,this._documentCount+=1,this._nextId+=1,t},e.prototype.addFields=function(e){var t=this;e.forEach(function(e,n){t._fieldIds[e]=n})},e.prototype.addFieldLength=function(e,t,n,r){this._averageFieldLength[t]=this._averageFieldLength[t]||0;var i=this._averageFieldLength[t]*n+r;this._fieldLength[e]=this._fieldLength[e]||{},this._fieldLength[e][t]=r,this._averageFieldLength[t]=i/(n+1)},e.prototype.saveStoredFields=function(e,t){var n=this,r=this._options,i=r.storeFields,a=r.extractField;i!=null&&i.length!==0&&(this._storedFields[e]=this._storedFields[e]||{},i.forEach(function(r){var i=a(t,r);i!==void 0&&(n._storedFields[e][r]=i)}))},e}(),Ln=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0},Rn=(Nn={},Nn[Pn]=function(e,t){return Object.entries(t).reduce(function(e,t){var n,r=V(t,2),i=r[0],a=r[1],o=a.score,s=a.match,c=a.terms;return e[i]==null?e[i]={score:o,match:s,terms:c}:(e[i].score+=o,e[i].score*=1.5,(n=e[i].terms).push.apply(n,pn(c)),Object.assign(e[i].match,s)),e},e||{})},Nn[Fn]=function(e,t){return e==null?t:Object.entries(t).reduce(function(t,n){var r=V(n,2),i=r[0],a=r[1],o=a.score,s=a.match,c=a.terms;return e[i]===void 0?t:(t[i]=t[i]||{},t[i].score=e[i].score+o,t[i].match=B(B({},e[i].match),s),t[i].terms=pn(e[i].terms,c),t)},{})},Nn),zn=function(e,t,n){return e*Math.log(n/t)},Bn=function(e,t,n,r,i,a){return i/(1+.333*i*a)*zn(e,t,n)/r},Vn=function(e){return function(t,n,r){return{term:t,fuzzy:typeof e.fuzzy==`function`?e.fuzzy(t,n,r):e.fuzzy||!1,prefix:typeof e.prefix==`function`?e.prefix(t,n,r):e.prefix===!0}}},Hn=function(e){return e.filter(function(e,t,n){return n.indexOf(e)===t})},Un={idField:`id`,extractField:function(e,t){return e[t]},tokenize:function(e,t){return e.split(Kn)},processTerm:function(e,t){return e.toLowerCase()},fields:void 0,searchOptions:void 0,storeFields:[]},Wn={combineWith:Pn,prefix:!1,fuzzy:!1,boost:{},weights:{fuzzy:.9,prefix:.75}},Gn={prefix:function(e,t,n){return t===n.length-1}},Kn=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;function qn(e){return Object.assign(Error(e),{code:`NOT_FOUND`})}function Jn(e,t){switch(t){case`summary`:return e.meta?e.meta.description:null;case`headings`:return e[t].map(e=>e.title).join(` `);default:return e[t]}}var Yn={extractField:Jn,fields:[`title`,`headings`,`summary`],searchOptions:{boost:{title:2}}};function Xn(e){let t={};return e.terms.forEach(n=>{let r=RegExp(`(${n})`,`gi`);e.match[n].forEach(i=>{let a=e.doc[i];if(typeof a==`string`)t[i]=a.replace(r,`<mark>$1</mark>`);else if(i===`headings`){let e=a.reduce((e,t)=>(t.title.toLowerCase().includes(n)&&e.push({id:t.id,title:t.title.replace(r,`<mark>$1</mark>`)}),e),[]);t[i]=e.length?e:null}})}),t}var Zn=class{constructor({pages:e,summaries:t,searchIndexes:n}){this._pages=e,this._summaries=t,this._searchIndexes=n,this._loadSearchIndex=I(this._loadSearchIndex),this._getSummary=I(this._getSummary),this._getItems=I(this._getItems),this.byCategories=I(this.byCategories),this.load=I(this.load)}async load(e,t){let n=this._pages[e][t];if(!n)throw qn(`Page with ${t} is not found`);return(await Qt(n)).body}async _getSummary(e){return(await Qt(this._summaries[e])).body}async _getItems(e,t=null){let n=await this.byCategories(e,t);return Object.keys(n).reduce((e,t)=>e.concat(n[t]),[])}async getNearestFor(e,t,n=null){let r=await this._getItems(e,n),i=r.findIndex(e=>e.id===t);if(i===-1)return[];let a=i-1,o=i+1;return[a<0?void 0:r[a],o>=r.length?void 0:r[o]]}async byCategories(e,t=null){let{items:n}=await this._getSummary(e),r={};return n.forEach(e=>{e.categories.forEach(t=>{r[t]=r[t]||[],r[t].push(e)})}),Array.isArray(t)?t.reduce((e,t)=>(e[t]=r[t],e),{}):r}async at(e,t){let{items:n}=await this._getSummary(e);return n[t]}async _loadSearchIndex(e){let t=this._searchIndexes[e],n=await Qt(t);return In.loadJS(n.body,Yn)}async search(e,t,n){let[r,i]=await Promise.all([this._loadSearchIndex(e),this._getSummary(e)]);return r.search(t,n).slice(0,15).map(e=>{let[t]=i.byId[e.id];return e.doc=i.items[t],e.hints=Xn(e),e})}},Qn=s({pages:()=>$n,searchIndexes:()=>tr,summaries:()=>er}),$n={en:{notfound:`/assets/notfound.en-D3L7oOYD.json`,"support-casljs":`/assets/support-casljs.en-hTjAtRgz.json`,"api/casl-ability":`/assets/api/casl-ability.en-yVuA8tnt.json`,"api/casl-ability-extra":`/assets/api/casl-ability-extra.en-CN0O07rI.json`,"advanced/ability-inheritance":`/assets/advanced/ability-inheritance.en-rv3lmhuz.json`,"advanced/ability-to-database-query":`/assets/advanced/ability-to-database-query.en-DGa3u34z.json`,"advanced/debugging-testing":`/assets/advanced/debugging-testing.en-CYcTxVBF.json`,"advanced/customize-ability":`/assets/advanced/customize-ability.en-ct5GEQ4x.json`,"advanced/typescript":`/assets/advanced/typescript.en-Bv1G6Soe.json`,"cookbook/claim-authorization":`/assets/cookbook/claim-authorization.en-DEz1CXvm.json`,"cookbook/cache-rules":`/assets/cookbook/cache-rules.en-dOS6RSVS.json`,"cookbook/intro":`/assets/cookbook/intro.en-CdYKdEd7.json`,"cookbook/less-confusing-can-api":`/assets/cookbook/less-confusing-can-api.en-CpifXud1.json`,"cookbook/roles-with-static-permissions":`/assets/cookbook/roles-with-static-permissions.en-CnIwsXmA.json`,"cookbook/roles-with-persisted-permissions":`/assets/cookbook/roles-with-persisted-permissions.en-CTm5qfmh.json`,"guide/conditions-in-depth":`/assets/guide/conditions-in-depth.en-F4Cw4YNk.json`,"guide/define-rules":`/assets/guide/define-rules.en-B9Ws2PmO.json`,"guide/define-aliases":`/assets/guide/define-aliases.en-Dg9zkv67.json`,"guide/install":`/assets/guide/install.en-DfJ8r5cc.json`,"guide/intro":`/assets/guide/intro.en-DIpkDkdP.json`,"guide/subject-type-detection":`/assets/guide/subject-type-detection.en-CRNWRboA.json`,"guide/restricting-fields":`/assets/guide/restricting-fields.en-Dc6z_Sq9.json`,"package/casl-angular":`/assets/package/casl-angular.en-9y4hpXXN.json`,"package/casl-mongoose":`/assets/package/casl-mongoose.en-BFMMeg6t.json`,"package/casl-prisma":`/assets/package/casl-prisma.en-WodW0AZ3.json`,"package/casl-react":`/assets/package/casl-react.en-Bz8qk8xn.json`,"package/casl-vue":`/assets/package/casl-vue.en-CNKWCyZc.json`}},er={en:`/assets/content_pages_summaries.en-vZ9RUzi6.json`},tr={en:`/assets/content_pages_searchIndexes.en-BU5NrqVr.json`},nr={page:new Zn(Qn)},rr=e=>{let t=nr[e];if(!t)throw TypeError(`Unknown content loader "${e}".`);return t};function ir(e){if(e.code===`NOT_FOUND`)return{body:A`<app-page name="notfound"></app-page>`};throw e}async function ar(e,t){if(!t.categories)return e.at(t.lang,0);let n=await e.byCategories(t.lang,t.categories);return n[t.categories.find(e=>n[e].length)][0]}var or=e=>e,sr=(e=or)=>async t=>{let n=e(t),r=rr(`page`);return n.id?n.id.endsWith(`/`)?n.redirectTo=n.id.slice(0,-1):[n.page,n.byCategories,n.nav]=await Promise.all([r.load(n.lang,n.id),n.categories.length?r.byCategories(n.lang,n.categories):null,r.getNearestFor(n.lang,n.id,n.categories)]):n.redirectTo=(await ar(r,n)).id,n},cr=(e=>({match:t,error:n,resolved:r})=>n?ir(n):r.redirectTo?{redirect:{name:`page`,params:{id:r.redirectTo,lang:t.params.lang}}}:{body:e(r,t.params)})(e=>({main:A`
    <app-page name="${e.id}" .nav="${e.nav}"></app-page>
  `,sidebar:e.byCategories?A`<pages-by-categories .items="${e.byCategories}"></pages-by-categories>`:null})),lr=s({parse:()=>ur,stringify:()=>dr});function ur(e){return e?JSON.parse(`{"${e.replace(/&/g,`","`).replace(/=/g,`":"`)}"}`):{}}function dr(e){return e?Object.keys(e).reduce((t,n)=>(t.push(`${n}=${e[n]}`),t),[]).join(`&`):``}function fr(e){return e.restrictions?e.path.replace(/:([\w_-]+)(\?)?/g,(t,n,r=``)=>{let i=e.restrictions[n];return i?`:${n}(${i})${r}`:n+r}):e.path}function pr(e,t){return e.map(e=>{let n=t[e.controller];if(!n)throw Error(`Did you forget to specify controller for route "${e.name}"?`);let r={name:e.name,path:fr(e),...n(e)};return e.meta&&e.meta.encode===!1&&(r.pathOptions={compile:{encode:e=>e}}),e.children&&(r.children=pr(e.children,t)),r})}function mr(e,t){let n=!1,r=e.replace(/:([\w_-]+)\??/g,(e,r)=>((!t[r]||t[r]===`undefined`)&&(n=!0),t[r]));return n?null:r}var W=nt(Ct,lt(pr(wt.routes,{Home:()=>({respond:()=>({body:{main:A`<home-page></home-page>`}})}),Page(e){let t=e.meta?e.meta.categories:[];return{resolve:sr(({params:n})=>({...n,categories:t,id:mr(e.path,n)})),respond:cr}}}).concat({name:`notFound`,path:`(.*)`,respond({match:e}){let{pathname:t}=e.location,n=t.indexOf(`/`,1),r=n===-1?t.slice(1):t.slice(1,n),{search:i,hash:a}=window.location;return sn.includes(r)?{body:A`<app-page name="notfound"></app-page>`}:{redirect:{url:`/${cn}${t}${i}${a}`}}}})),{history:{base:P.baseUrl?yt(P.baseUrl):void 0,query:lr}}),hr=W.url;W.url=e=>{let t={lang:R(),...e.params};return hr({...e,params:t})},`scrollRestoration`in window.history&&(window.history.scrollRestoration=`manual`);var gr=window.visualViewport||window;function _r(e,t){let n=window.matchMedia(e),r=()=>t(n.matches);return gr.addEventListener(`resize`,r),r(),()=>gr.removeEventListener(`resize`,r)}var vr=E((e,t)=>n=>{let r=dn(e,t);n.value!==r&&n.setValue(r)}),G=Wt,yr=E((e,t)=>Ut(()=>Kt(Ft(e,t))));function br(e){"@babel/helpers - typeof";return br=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},br(e)}function xr(e,t){if(br(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(br(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Sr(e){var t=xr(e,`string`);return br(t)==`symbol`?t:t+``}function K(e,t,n){return(t=Sr(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Cr(){let e=document.createElement(`div`);return Object.assign(e.style,{position:`fixed`,right:`10px`,bottom:`10px`,zIndex:50,width:`320px`}),document.body.appendChild(e),e}var wr=class extends M{constructor(){super(),this._route=null,this._notificationsRoot=null,this._menu=null,this._isMobile=!1,this.ready=!1,this._unwatch=[]}connectedCallback(){super.connectedCallback(),this._unwatch.push(W.observe(e=>{this._route=e.response,this._closeMenu()},{initial:!0})),this._unwatch.push(_r(`(min-width: 768px)`,e=>this._isMobile=!e)),document.addEventListener(`keypress`,e=>{e.ctrlKey&&e.shiftKey&&e.keyCode===22&&console.log(`5e173f4`)},!1)}disconnectedCallback(){super.disconnectedCallback(),this._unwatch.forEach(e=>e())}updated(){this._menu=this._menu||this.shadowRoot.querySelector(`menu-drawer`)}_toggleMenu(){this._menu&&this._menu.toggle()}_closeMenu(){this._menu&&this._menu.close()}notify(e,t={}){let n=document.createElement(`app-notification`);n.message=e,typeof t.onClick==`function`&&n.addEventListener(`click`,t.onClick,!1),this._notificationsRoot=this._notificationsRoot||Cr(),this._notificationsRoot.appendChild(n)}_renderDrawerMenu(e){return this._isMobile?A`
      ${e}
      <h3>${G(`menu.root`)}</h3>
      <app-menu .items="${Ye.items}" expanded></app-menu>
    `:null}_getLayout(e){return this._route.name===`home`?``:this._isMobile?`col-1`:e?`col-2`:`col-1`}render(){if(!this._route||!this.ready)return null;let{body:e}=this._route,t=e.sidebar?Je(e.sidebar):``;return A`
      <menu-drawer ?disabled="${!this._isMobile}">
        <div slot="menu">${this._renderDrawerMenu(t)}</div>
        <app-root
          theme="${this._isMobile?`mobile`:`default`}"
          layout="${this._getLayout(!!t)}"
          .menu="${Ye}"
          @toggle-menu="${this._toggleMenu}"
        >
          <div slot="aside">${t}</div>
          ${Je(e.main||e)}
        </app-root>
      </menu-drawer>
    `}};K(wr,`cName`,`casl-docs`),K(wr,`properties`,{ready:{type:Boolean},_isMobile:{type:Boolean},_route:{type:Object}}),wr.styles=[j`
    :host {
      display: block;
    }

    .stop-war {
      position: fixed;
      z-index: 1000;
      top: 5px;
      right: 5px;
    }
  `];var Tr=j`
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
`,Er=class extends M{constructor(){super(),this.theme=`default`,this.menu=null,this.layout=``}render(){return A`
      <app-header theme="${this.theme}" .menu="${this.menu}"></app-header>
      <section class="content ${this.layout===`col-2`?`row`:this.layout}">
        <aside>
          <div class="aside">
            <slot name="aside"></slot>
          </div>
        </aside>
        <main><slot></slot></main>
      </section>
      <app-footer></app-footer>
    `}};K(Er,`cName`,`app-root`),K(Er,`properties`,{theme:{type:String},layout:{type:String},menu:{type:Object}}),Er.styles=[Tr,j`
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
  `];var Dr=j`
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
`,Or=j`
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
`,kr=j`
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
`,Ar=j`
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
`,jr=j`
  /* other alert styles is in md.js */

  .alert-warning {
    border-left-color: #856404;
    background-color: #fff3cd;
  }

  .alert-warning:before {
    background: #856404;
    content: 'w';
  }
`,Mr={github:A`
    <svg aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub icon</title><path fill="#FFFFFF" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
  `,twitter:A`
    <svg aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon" lang="en">Twitter icon</title><path fill="#FFFFFF" d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>
  `,medium:A`
    <svg aria-labelledby="simpleicons-medium-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-medium-icon" lang="en">Medium icon</title><path fill="#FFFFFF" d="M2.846 6.36c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403H7.26l5.378 11.795 4.728-11.795H24v.403l-1.917 1.837c-.165.126-.247.333-.213.538v13.5c-.034.204.048.41.213.537l1.87 1.837v.403h-9.41v-.403l1.937-1.882c.19-.19.19-.246.19-.538V7.794l-5.39 13.688h-.727L4.278 7.794v9.174c-.052.386.076.774.347 1.053l2.52 3.06v.402H0v-.403l2.52-3.06c.27-.278.39-.67.326-1.052V6.36z"></path></svg>
  `},Nr=class extends M{constructor(...e){super(...e),K(this,`year`,new Date().getFullYear())}render(){return A`
      <p class="links">
        ${Ye.footer.map(e=>A`
          <a href="${e.url}" target="_blank" rel="noopener">
            ${Mr[e.icon]}
          </a>
        `)}
      </p>
      <p class="copyright md">${yr(`copyright`,{year:this.year})}</p>
    `}};K(Nr,`cName`,`app-footer`),Nr.styles=[Dr,j`
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
  `];var Pr=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEVMaXF1dXW6QQOmAAAAAXRSTlMAQObYZgAAABZJREFUeNpjoAVg/g8EB7BSg9sUygEATXU49WmTHjIAAAAASUVORK5CYII=`,Fr=class extends M{constructor(){super(),this.theme=`default`,this.menu={items:[]},this._isCompactSearch=!1}_emitToggleMenu(){this.dispatchEvent(new CustomEvent(`toggle-menu`,{bubbles:!0,composed:!0}))}_renderControls(){return this.theme==="default"?A`
        <div class="row align-center">
          <app-quick-search></app-quick-search>
          <app-menu .items="${this.menu.items}"></app-menu>
        </div>
      `:A`
      <app-quick-search
        class="full-width-search"
        suggestionsType="page"
        toggler
        ?compact="${this._isCompactSearch}"
        @reset="${this._toggleSearch}"
        @click-icon="${this._toggleSearch}"
      ></app-quick-search>
    `}_toggleSearch(){this._isCompactSearch=!this._isCompactSearch}_renderMenuToggler(){return this.theme===`mobile`?A`
      <button type="button" class="menu-toggle" @click="${this._emitToggleMenu}">
        <img src="${Pr}" width="24">
      </button>
    `:null}update(e){return e.has(`theme`)&&(this._isCompactSearch=this.theme===`mobile`),super.update(e)}render(){return A`
      <header>
        <div class="header-notification">
          <p>Do you like this package?</p>
          <a href="https://prytulafoundation.org/en/home/support_page" target="_blank">Support Ukraine 🇺🇦</a>
        </div>
        <div class="header container">
          ${this._renderMenuToggler()}
          <div>
            <app-link to="home" class="logo">${G(`name`)}</app-link>
            <versions-select></versions-select>
          </div>
          ${this._renderControls()}
        </div>
      </header>
      <!-- <app-lang-picker></app-lang-picker> -->
    `}};K(Fr,`cName`,`app-header`),K(Fr,`properties`,{menu:{type:Object},theme:{type:String},_isCompactSearch:{type:Boolean}}),Fr.styles=[Tr,j`
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
  `];var Ir=class extends M{constructor(){super(),this.to=``,this.active=!1,this.query=null,this.params=null,this.hash=``,this.nav=!1,this._url=null,this._unwatchRouter=null}_isActive(){let e=this._getUrl(),{pathname:t}=window.location;return e.length>t.length?!1:e===t||t.startsWith(e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this._navigate.bind(this),!1),this.nav&&(this._unwatchRouter=W.observe(()=>{this.active=this._isActive()},{initial:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}update(e){let t=[`to`,`query`,`params`,`hash`].some(t=>e.has(t));if((this._url===null||t)&&(this._url=this._generateUrl()),this.nav&&e.has(`active`)){let e=this.active?`add`:`remove`;this.classList[e](`active`)}return super.update(e)}_getUrl(){return this._url=this._url||this._generateUrl(),this._url}_generateUrl(){return W.url({name:this.to,hash:this.hash,params:this.params,query:this.query})}render(){return A`
      <a itemprop="url" href="${this._url}">
        <slot></slot>
      </a>
    `}_navigate(e){e.ctrlKey||(e.preventDefault(),W.navigate({url:this._url}))}};K(Ir,`cName`,`app-link`),K(Ir,`properties`,{to:{type:String},params:{type:Object},query:{type:Object},hash:{type:String},active:{type:Boolean},nav:{type:Boolean}}),Ir.styles=j`
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
`;function Lr(e){if(e.heading)return A`<h4>${G(`menu.${e.heading}`)}</h4>`;let t=G(`menu.${e.name}`);return e.route===!1?A`<a class="link">${t}</a>`:e.url?A`<a href="${e.url}" target="_blank" rel="nofollow">${t}</a>`:e.page?A`<app-link nav to="page" .params="${{id:e.page}}">${t}</app-link>`:A`<app-link nav to="${e.name}">${t}</app-link>`}var Rr=class extends M{constructor(){super(),this.items=[]}render(){return A`
      <nav
        role="navigation"
        itemscope
        itemtype="http://schema.org/SiteNavigationElement"
      >
        ${this._renderNav(this.items,`nav`)}
      </nav>
    `}_renderNav(e,t){return A`<ul class="${t}">${e.map(e=>A`
      <li class="dropdown-container">
        ${Lr(e)}
        ${this._renderItemNav(e)}
      </li>
    `)}</ul>`}_renderItemNav({children:e}){return e?this._renderNav(e,`dropdown ${this.expanded?``:`expandable`}`):``}};K(Rr,`cName`,`app-menu`),K(Rr,`properties`,{items:{type:Array},expanded:{type:Boolean}}),Rr.styles=j`
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
`;var zr=class extends M{constructor(){super(),this.article=null,this.category=``}render(){let{article:e}=this,t=this.category||e.categories[0];return A`
      <time datetime="${e.createdAt}" itemprop="datePublished">
        ${vr(e.createdAt)}
      </time>
      <span>
        ${G(`article.author`)}
        <span itemprop="author">${G(`article.authors.${e.author}`)}</span>
      </span>
      <slot name="more">
        <app-link to="${t}" hash="comments" .params="${e}">
          <i class="icon-comment"></i>${e.commentsCount||0}
        </app-link>
        <app-link to="${t}" .params="${e}" class="more">${G(`article.readMore`)}</app-link>
      </slot>
    `}};K(zr,`cName`,`app-article-details`),K(zr,`properties`,{article:{type:Object,attribute:!1},category:{type:String}}),zr.styles=[j`
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
  `];var Br=class extends M{constructor(){super(),this._unwatchLang=null,this._locale=R()}connectedCallback(){super.connectedCallback(),this._unwatchLang=Nt(e=>{this._locale=e,this.reload().then(()=>this.requestUpdate())})}disconnectedCallback(){this._unwatchLang(),super.disconnectedCallback()}reload(){return Promise.reject(Error(`${this.constructor.cName} should implement "reload" method`))}};function Vr(e){let t=e?`${e} - `:``;document.title=t+z(`name`)}function Hr(e){let t=document.head.querySelector(`meta[name="${e}"]`);return t||(t=document.createElement(`meta`),t.setAttribute(`name`,e),document.head.appendChild(t)),t}function q(e,t){if(typeof e==`object`){Object.keys(e).forEach(t=>q(t,e[t]));return}let n=z(`meta.${e}`),r=Array.isArray(t)?t.concat(n).join(`, `):t||n;Hr(e).setAttribute(`content`,r.replace(/[\n\r]+/g,` `))}function Ur({response:e}){let t=document.documentElement;t.lang!==e.params.lang&&(t.lang=e.params.lang);let n=`meta.${e.name}`;ln(n)?(Vr(z(`${n}.title`)),q(`keywords`,z(`${n}.keywords`)),q(`description`,z(`${n}.description`))):(Vr(),q(`keywords`),q(`description`)),Kr()}function Wr(e){let t=e.meta||{};Vr(e.title),q(`keywords`,t.keywords||``),q(`description`,t.description||``),Kr()}var Gr;function Kr(){window.__sharethis__&&(Gr??(Gr=document.getElementById(`share-buttons`)),Gr.setAttribute(`data-url`,window.location.href),Gr.setAttribute(`data-title`,document.title),Gr.setAttribute(`data-description`,Hr(`description`).getAttribute(`content`)))}function qr(e,t){let n=e.getElementById(t);n&&(n.scrollIntoView(!0),document.documentElement.scrollTop-=85)}function Jr(e,t){let n=e,r=0;for(;n&&r<3;){if(n.tagName===t)return n;n=n.parentNode,r++}return null}function Yr(e,t){let n;if(t.tagName[0]===`H`&&t.id)n=t.id;else{let n=Jr(t,`A`),r=n?n.href.indexOf(`#`):-1;r!==-1&&qr(e,n.href.slice(r+1))}if(n){let{location:t}=W.current().response,r=`${t.pathname}${window.location.search}#${n}`;W.navigate({url:r}),qr(e,n)}}function Xr(e){let{hash:t}=W.current().response.location;t?qr(e,t):window.scroll(0,0)}function Zr(e,t){return Kt(rn(e.content,t))}var Qr=class extends Br{constructor(){super(),this._page=null,this.nav=[],this.name=null,this.vars={},this.type=`page`,this.content=Zr}connectedCallback(){super.connectedCallback(),this.shadowRoot.addEventListener(`click`,e=>{Yr(this.shadowRoot,e.target)},!1)}async updated(e){(this._page===null||e.has(`name`)||e.has(`type`))&&await this.reload()}async reload(){this._page=await rr(this.type).load(R(),this.name),Wr(this._page),await this.updateComplete,Xr(this.shadowRoot)}_renderNav(){let[e,t]=this.nav;return A`
      <app-page-nav pageType="${this.type}" .prev="${e}" .next="${t}"></app-page-nav>
    `}render(){return this._page?A`
      <article itemscope itemtype="http://schema.org/Article">
        <h1>${rn(this._page.title)}</h1>
        <old-version-alert></old-version-alert>
        <div class="description md">${this.content(this._page,this.vars)}</div>
      </article>
      ${this.nav&&this.nav.length?this._renderNav():``}
    `:A``}};K(Qr,`cName`,`app-page`),K(Qr,`properties`,{type:{type:String},name:{type:String},vars:{type:Object,attribute:!1},content:{type:Function,attribute:!1},nav:{type:Array},_page:{type:Object}}),Qr.styles=[Or,Dr,Ar,j`
    :host {
      display: block;
    }

    app-page-nav {
      margin-top: 20px;
    }
  `];var $r=class extends M{constructor(){super(),this.next=null,this.prev=null,this.pageType=`page`}_linkTo(e){let t=this[e];return t?A`
      <app-link to="${this.pageType}" .params="${t}" class="${e}">
        ${t.title}
      </app-link>
    `:``}render(){return A`
      ${this._linkTo(`prev`)}
      ${this._linkTo(`next`)}
    `}};K($r,`cName`,`app-page-nav`),K($r,`properties`,{next:{type:Object},prev:{type:Object},pageType:{type:String}}),$r.styles=j`
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
`;var ei=`/v7/assets/casl-shield-Czvcyms2.png`,ti=[`isomorphic`,`versatile`,`declarative`,`typesafe`,`treeshakable`];function ni(e){return A`
    <section class="feature">
      <h3>${G(`features.${e}.title`)}</h3>
      <p>${yr(`features.${e}.description`)}</p>
    </section>
  `}var ri=()=>A`
  <section class="features container">${ti.map(ni)}</section>
`;ri.styles=[j`
    .features {
      padding: 1rem 0;
      display: -ms-grid;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      -ms-grid-columns: ${We(ti.map(()=>`minmax(200px, 1fr)`).join(` `))};
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
  `];var ii=class extends M{render(){return A`
      <div class="bg">
        <header class="row wrap container">
          <div class="col row wrap align-start main">
            <img src="${ei}" width="250" height="302" class="col col-fixed">
            <div class="col details">
              <h1>${G(`slogan`)}</h1>
              <div class="buttons">
                <app-link to="page" .params="${{id:`guide/intro`}}" class="btn btn-lg">
                  ${G(`buttons.start`)}
                </app-link>
                <a href="${P.repoURL}" target="_blank" rel="noopener" class="btn btn-lg">
                  ${G(`buttons.source`)}
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
            <div class="example">${yr(`exampleCode`)}</div>
          </div>
        </header>
      </div>
      ${ri()}
    `}};K(ii,`cName`,`home-page`),ii.styles=[Tr,kr,ri.styles,Ar,j`
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
  `];var ai=window.document,oi=window.Math,si=window.HTMLElement,ci=window.XMLHttpRequest,li=function(e){return function(t,n,r){var i=e.createElement(t);if(n!=null)for(var a in n){var o=n[a];o!=null&&(i[a]==null?i.setAttribute(a,o):i[a]=o)}if(r!=null)for(var s=0,c=r.length;s<c;s++){var l=r[s];i.appendChild(typeof l==`string`?e.createTextNode(l):l)}return i}},ui=li(ai),di=function(e){var t;return function(){t||(t=1,e.apply(this,arguments))}},fi=function(e,t){return{}.hasOwnProperty.call(e,t)},pi=function(e){return(``+e).toLowerCase()},mi=`https://unpkg.com/github-buttons@2.17.0/dist/buttons.html`,J=`github.com`,hi=`https://api.`+J,gi=ci&&`prototype`in ci&&`withCredentials`in ci.prototype,_i=gi&&si&&`attachShadow`in si.prototype&&!(`prototype`in si.prototype.attachShadow),Y=function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent(`on`+t,n)},vi=function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent(`on`+t,n)},yi=function(e,t,n){var r=function(){return vi(e,t,r),n.apply(this,arguments)};Y(e,t,r)},bi=function(e,t,n){var r=`readystatechange`,i=function(){if(t.test(e.readyState))return vi(e,r,i),n.apply(this,arguments)};Y(e,r,i)},xi=function(e){for(var t={href:e.href,title:e.title,"aria-label":e.getAttribute(`aria-label`)},n=[`icon`,`color-scheme`,`text`,`size`,`show-count`],r=0,i=n.length;r<i;r++){var a=`data-`+n[r];t[a]=e.getAttribute(a)}return t[`data-text`]??(t[`data-text`]=e.textContent||e.innerText),t},Si=`body{margin:0}a{text-decoration:none;outline:0}.widget{display:inline-block;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;font-size:0;line-height:0;white-space:nowrap}.btn,.social-count{position:relative;display:inline-block;height:14px;padding:2px 5px;font-size:11px;font-weight:600;line-height:14px;vertical-align:bottom;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-repeat:repeat-x;background-position:-1px -1px;background-size:110% 110%;border:1px solid}.btn{border-radius:.25em}.btn:not(:last-child){border-radius:.25em 0 0 .25em}.social-count{border-left:0;border-radius:0 .25em .25em 0}.widget-lg .btn,.widget-lg .social-count{height:20px;padding:3px 10px;font-size:12px;line-height:20px}.octicon{display:inline-block;vertical-align:text-top;fill:currentColor}`,Ci=`.btn{color:#24292e;background-color:#eff3f6;border-color:#cfd3d6;border-color:rgba(27,31,35,.15);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23fafbfc'/%3e%3cstop offset='90%25' stop-color='%23eff3f6'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #fafbfc, #eff3f6 90%);background-image:linear-gradient(180deg, #fafbfc, #eff3f6 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFFAFBFC', endColorstr='#FFEEF2F5')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#e9ebef;background-position:0 -0.5em;border-color:#caccd0;border-color:rgba(27,31,35,.15);background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23f3f4f6'/%3e%3cstop offset='90%25' stop-color='%23e9ebef'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #f3f4f6, #e9ebef 90%);background-image:linear-gradient(180deg, #f3f4f6, #e9ebef 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FFF3F4F6', endColorstr='#FFE8EAEE')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#e9ecef;border-color:#cacdd0;border-color:rgba(27,31,35,.15);box-shadow:inset 0 .15em .3em rgba(27,31,35,.15);background-image:none;filter:none}.social-count{color:#24292e;background-color:#fff;border-color:#ddddde;border-color:rgba(27,31,35,.15)}.social-count:focus,.social-count:hover{color:#0366d6}.octicon-heart{color:#ea4aaa}`,wi=`.btn{color:#c9d1d9;background-color:#1a1e23;border-color:#30363d;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2321262d'/%3e%3cstop offset='90%25' stop-color='%231a1e23'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #21262d, #1a1e23 90%);background-image:linear-gradient(180deg, #21262d, #1a1e23 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF21262D', endColorstr='#FF191D22')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#292e33;background-position:0 -0.5em;border-color:#8b949e;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%2330363d'/%3e%3cstop offset='90%25' stop-color='%23292e33'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #30363d, #292e33 90%);background-image:linear-gradient(180deg, #30363d, #292e33 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF30363D', endColorstr='#FF282D32')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#161719;border-color:#8b949e;box-shadow:inset 0 .15em .3em rgba(1,4,9,.15);background-image:none;filter:none}.social-count{color:#c9d1d9;background-color:#21262d;border-color:#30363d}.social-count:focus,.social-count:hover{color:#58a6ff}.octicon-heart{color:#bf4b8a}`,Ti=`.btn{color:#adbac7;background-color:#30363d;border-color:#444c56;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23373e47'/%3e%3cstop offset='90%25' stop-color='%2330363d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #373e47, #30363d 90%);background-image:linear-gradient(180deg, #373e47, #30363d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF373E47', endColorstr='#FF2F353C')}:root .btn{filter:none}.btn:focus,.btn:hover{background-color:#3c444d;background-position:0 -0.5em;border-color:#768390;background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3clinearGradient id='o' x2='0' y2='1'%3e%3cstop stop-color='%23444c56'/%3e%3cstop offset='90%25' stop-color='%233c444d'/%3e%3c/linearGradient%3e%3crect width='100%25' height='100%25' fill='url(%23o)'/%3e%3c/svg%3e");background-image:-moz-linear-gradient(top, #444c56, #3c444d 90%);background-image:linear-gradient(180deg, #444c56, #3c444d 90%);filter:progid:DXImageTransform.Microsoft.Gradient(startColorstr='#FF444C56', endColorstr='#FF3B434C')}:root .btn:focus,:root .btn:hover{filter:none}.btn:active{background-color:#2e3031;border-color:#768390;box-shadow:inset 0 .15em .3em rgba(28,33,40,.15);background-image:none;filter:none}.social-count{color:#adbac7;background-color:#373e47;border-color:#444c56}.social-count:focus,.social-count:hover{color:#539bf5}.octicon-heart{color:#ae4c82}`,Ei=function(e,t,n,r){t??(t=`&`),n??(n=`=`),r??(r=window.encodeURIComponent);var i=[];for(var a in e){var o=e[a];o!=null&&i.push(r(a)+n+r(o))}return i.join(t)},Di=function(e,t,n,r){t??(t=`&`),n??(n=`=`),r??(r=window.decodeURIComponent);for(var i={},a=e.split(t),o=0,s=a.length;o<s;o++){var c=a[o];if(c!==``){var l=c.split(n);i[r(l[0])]=l[1]==null?void 0:r(l.slice(1).join(n))}}return i},X={light:Ci,dark:wi,dark_dimmed:Ti},Oi=function(e,t){return`@media(prefers-color-scheme:`+e+`){`+X[fi(X,t)?t:e]+`}`},ki=function(e){if(e==null)return X.light;if(fi(X,e))return X[e];var t=Di(e,`;`,`:`,function(e){return e.replace(/^[ \t\n\f\r]+|[ \t\n\f\r]+$/g,``)});return X[fi(X,t[`no-preference`])?t[`no-preference`]:`light`]+Oi(`light`,t.light)+Oi(`dark`,t.dark)},Ai={"comment-discussion":{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M1.5 2.75a.25.25 0 01.25-.25h8.5a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-3.5a.75.75 0 00-.53.22L3.5 11.44V9.25a.75.75 0 00-.75-.75h-1a.25.25 0 01-.25-.25v-5.5zM1.75 1A1.75 1.75 0 000 2.75v5.5C0 9.216.784 10 1.75 10H2v1.543a1.457 1.457 0 002.487 1.03L7.061 10h3.189A1.75 1.75 0 0012 8.25v-5.5A1.75 1.75 0 0010.25 1h-8.5zM14.5 4.75a.25.25 0 00-.25-.25h-.5a.75.75 0 110-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0114.25 12H14v1.543a1.457 1.457 0 01-2.487 1.03L9.22 12.28a.75.75 0 111.06-1.06l2.22 2.22v-2.19a.75.75 0 01.75-.75h1a.25.25 0 00.25-.25v-5.5z"></path>`}}},download:{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"></path>`}}},eye:{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>`}}},heart:{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path>`}}},"issue-opened":{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"></path>`}}},"mark-github":{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>`}}},package:{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"></path>`}}},play:{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM6.379 5.227A.25.25 0 006 5.442v5.117a.25.25 0 00.379.214l4.264-2.559a.25.25 0 000-.428L6.379 5.227z"></path>`}}},"repo-forked":{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>`}}},"repo-template":{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M6 .75A.75.75 0 016.75 0h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 .75zm5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V1.5h-.75A.75.75 0 0111 .75zM4.992.662a.75.75 0 01-.636.848c-.436.063-.783.41-.846.846a.75.75 0 01-1.485-.212A2.501 2.501 0 014.144.025a.75.75 0 01.848.637zM2.75 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 012.75 4zm10.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM2.75 8a.75.75 0 01.75.75v.268A1.72 1.72 0 013.75 9h.5a.75.75 0 010 1.5h-.5a.25.25 0 00-.25.25v.75c0 .28.114.532.3.714a.75.75 0 01-1.05 1.072A2.495 2.495 0 012 11.5V8.75A.75.75 0 012.75 8zm10.5 0a.75.75 0 01.75.75v4.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-.75a.75.75 0 010-1.5h.75v-.25a.75.75 0 01.75-.75zM6 9.75A.75.75 0 016.75 9h2.5a.75.75 0 010 1.5h-2.5A.75.75 0 016 9.75zm-1 2.5v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>`}}},star:{heights:{16:{width:16,path:`<path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>`}}}},ji=function(e,t){e=pi(e).replace(/^octicon-/,``),fi(Ai,e)||(e=`mark-github`);var n=t>=24&&24 in Ai[e].heights?24:16,r=Ai[e].heights[n];return`<svg viewBox="0 0 `+r.width+` `+n+`" width="`+t*r.width/n+`" height="`+t+`" class="octicon octicon-`+e+`" aria-hidden="true">`+r.path+`</svg>`},Mi={},Ni=function(e,t){var n=Mi[e]||(Mi[e]=[]);if(!(n.push(t)>1)){var r=di(function(){for(delete Mi[e];t=n.shift();)t.apply(null,arguments)});if(gi){var i=new ci;Y(i,`abort`,r),Y(i,`error`,r),Y(i,`load`,function(){var e;try{e=JSON.parse(this.responseText)}catch(e){r(e);return}r(this.status!==200,e)}),i.open(`GET`,e),i.send()}else{var a=this||window;a._=function(e){a._=null,r(e.meta.status!==200,e.data)};var o=li(a.document)(`script`,{async:!0,src:e+(e.indexOf(`?`)===-1?`?`:`&`)+`callback=_`}),s=function(){a._&&a._({meta:{}})};Y(o,`load`,s),Y(o,`error`,s),o.readyState&&bi(o,/de|m/,s),a.document.getElementsByTagName(`head`)[0].appendChild(o)}}},Pi=function(e,t,n){var r=li(e.ownerDocument),i=e.appendChild(r(`style`,{type:`text/css`})),a=Si+ki(t[`data-color-scheme`]);i.styleSheet?i.styleSheet.cssText=a:i.appendChild(e.ownerDocument.createTextNode(a));var o=pi(t[`data-size`])===`large`,s=r(`a`,{className:`btn`,href:t.href,rel:`noopener`,target:`_blank`,title:t.title||void 0,"aria-label":t[`aria-label`]||void 0,innerHTML:ji(t[`data-icon`],o?16:14)},[` `,r(`span`,{},[t[`data-text`]||``])]),c=e.appendChild(r(`div`,{className:`widget`+(o?` widget-lg`:``)},[s])),l=s.hostname.replace(/\.$/,``);if((`.`+l).substring(l.length-J.length)!==`.`+J){s.removeAttribute(`href`),n(c);return}var u=(` /`+s.pathname).split(/\/+/);if(((l===J||l===`gist.`+J)&&u[3]===`archive`||l===J&&u[3]===`releases`&&(u[4]===`download`||u[4]===`latest`&&u[5]===`download`)||l===`codeload.`+J)&&(s.target=`_top`),pi(t[`data-show-count`])!==`true`||l!==J||u[1]===`marketplace`||u[1]===`sponsors`||u[1]===`orgs`||u[1]===`users`||u[1]===`-`){n(c);return}var d,f;if(!u[2]&&u[1])f=`followers`,d=`?tab=followers`;else if(!u[3]&&u[2])f=`stargazers_count`,d=`/stargazers`;else if(!u[4]&&u[3]===`subscription`)f=`subscribers_count`,d=`/watchers`;else if(!u[4]&&u[3]===`fork`)f=`forks_count`,d=`/network/members`;else if(u[3]===`issues`)f=`open_issues_count`,d=`/issues`;else{n(c);return}var p=u[2]?`/repos/`+u[1]+`/`+u[2]:`/users/`+u[1];Ni.call(this,hi+p,function(e,t){if(!e){var i=t[f];c.appendChild(r(`a`,{className:`social-count`,href:t.html_url+d,rel:`noopener`,target:`_blank`,"aria-label":i+` `+f.replace(/_count$/,``).replace(`_`,` `).slice(0,i<2?-1:void 0)+` on GitHub`},[(``+i).replace(/\B(?=(\d{3})+(?!\d))/g,`,`)]))}n(c)})},Fi=window.devicePixelRatio||1,Ii=function(e){return(Fi>1?oi.ceil(oi.round(e*Fi)/Fi*2)/2:oi.ceil(e))||0},Li=function(e){var t=e.offsetWidth,n=e.offsetHeight;if(e.getBoundingClientRect){var r=e.getBoundingClientRect();t=oi.max(t,Ii(r.width)),n=oi.max(n,Ii(r.height))}return[t,n]},Ri=function(e,t){e.style.width=t[0]+`px`,e.style.height=t[1]+`px`},zi=function(e,t){if(e!=null&&t!=null){if(e.getAttribute&&(e=xi(e)),_i){var n=ui(`span`);Pi(n.attachShadow({mode:`closed`}),e,function(){t(n)})}else{var r=ui(`iframe`,{src:`javascript:0`,title:e.title||void 0,allowtransparency:!0,scrolling:`no`,frameBorder:0});Ri(r,[0,0]),r.style.border=`none`;var i=function(){var n=r.contentWindow,a;try{a=n.document.body}catch{ai.body.appendChild(r.parentNode.removeChild(r));return}vi(r,`load`,i),Pi.call(n,a,e,function(n){var i=Li(n);r.parentNode.removeChild(r),yi(r,`load`,function(){Ri(r,i)}),r.src=mi+`#`+(r.name=Ei(e)),t(r)})};Y(r,`load`,i),ai.body.appendChild(r)}}},Bi=class extends M{constructor(){super(),this.href=P.repoURL,this.size=void 0,this.theme=`light`,this.showCount=!0,this.text=void 0}_collectOptions(){return{href:this.href,"data-size":this.size,"data-color-scheme":this.theme,"data-show-count":this.showCount,"data-text":this.text}}update(){zi(this._collectOptions(),e=>{this.shadowRoot.firstChild?this.shadowRoot.replaceChild(e,this.shadowRoot.firstChild):this.shadowRoot.appendChild(e)})}};K(Bi,`cName`,`github-button`),K(Bi,`properties`,{href:{type:String},size:{type:String},theme:{type:String},showCount:{type:Boolean},text:{type:String}});var Vi={dropdown(e){let t=e.hints.title||e.doc.title,n=e.hints.headings||e.doc.headings||[];return A`
      <div class="row item">
        <div class="col title">
          <app-link to="page" .params="${e.doc}">${Kt(t)}</app-link>
        </div>
        <div class="col">
          ${n.map(t=>A`
            <app-link to="page" .params="${e.doc}" hash="${t.id}">
              ${Kt(t.title)}
            </app-link>
          `)}
        </div>
      </div>
    `},page(e){let t=e.hints.title||e.doc.title;return A`
      ${(e.hints.headings||e.doc.headings||[]).map(n=>A`
        <app-link class="item" to="page" .params="${e.doc}" hash="${n.id}">
          ${Kt(`${t} › ${n.title}`)}
        </app-link>
      `)}
    `}};function Hi(e,t){if(!e)return``;if(!e.length)return A`
      <div class="suggestions ${t}">
        ${G(`search.noMatch`)}
      </div>
    `;let n=Vi[t||`dropdown`];return A`
    <div class="suggestions ${t}">
      ${e.map(([e,t])=>A`
        <h5>${G(`categories.${e}`)}</h5>
        ${t.map(n)}
      `)}
    </div>
  `}var Ui=A`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px">
    <path d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z" />
  </svg>
`,Wi=A`
  <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
    <polyline points='268 112 412 256 268 400' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
    <line x1='392' y1='256' x2='100' y2='256' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
  </svg>
`,Gi=class extends M{constructor(){super(),this.value=``,this.suggestionsType=`dropdown`,this.compact=!1,this.toggler=!1,this._suggestions=null,this._clickOutside=this._clickOutside.bind(this),this._search=Jt(this._search,500),this._unwatchRouter=null}_setValue(e){this.value=e.trim(),this.dispatchEvent(new CustomEvent(`update`,{detail:this.value}))}connectedCallback(){super.connectedCallback(),document.addEventListener(`click`,this._clickOutside,!1),this._unwatchRouter=W.observe(()=>this._reset())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`click`,this._clickOutside,!1),this._unwatchRouter()}_reset(){this.value&&(this._setValue(``),this._suggestions=null,this.dispatchEvent(new CustomEvent(`reset`)))}_clickOutside(e){this.shadowRoot.contains(e.target)||(this._suggestions=null)}async _search(){if(!this.value){this._suggestions=null;return}let e=(await rr(`page`).search(R(),this.value,{prefix:!0})).reduce((e,t)=>{let n=t.doc.categories[0];return e.has(n)||e.set(n,[]),e.get(n).push(t),e},new Map);this._suggestions=Array.from(e)}_updateValue(e){this._setValue(e.target.value),this._search()}_emitIconClick(){this.dispatchEvent(new CustomEvent(`click-icon`))}render(){return A`
      <div class="search-form ${this.compact?`compact`:``}">
        <label class="input">
          <div class="icon" @click="${this._emitIconClick}">
            ${this.compact||!this.toggler?Ui:Wi}
          </div>

          <input
            autocomplete="off"
            autocorrect="off"
            placeholder="${G(`search.placeholder`)}"
            .value="${this.value}"
            @input="${this._updateValue}"
          >
        </label>
        ${Hi(this._suggestions,this.suggestionsType)}
      </div>
    `}};K(Gi,`cName`,`app-quick-search`),K(Gi,`properties`,{value:{type:String},suggestionsType:{type:String},compact:{type:Boolean},toggler:{type:Boolean},_suggestions:{type:Array}}),Gi.styles=[Tr,j`
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
  `];var Ki=class extends M{render(){return A`
      <select @change="${this._changeLang}">
        <option value="ru">ru</option>
        <option value="uk">uk</option>
      </select>
    `}_changeLang(e){let t=e.target.value,n=W.current().response;W.navigate({url:W.url({name:n.name,params:{...n.params,lang:t},query:n.location.query,hash:n.location.hash})})}};K(Ki,`cName`,`app-lang-picker`);var qi={liqpay:{icon:`/v7/assets/liqpay-BEspGQjK.svg`,image:`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAADkAQMAAAC2bMrzAAAABlBMVEX///8AAABVwtN+AAACK0lEQVRYw9XYMY7mIAyG4TeioOQIPgo3I8nNOApHoKSw8m1B5t+Z7VfrRSkiPWkibLANf21lSXqyAKemWTVxuyVJV1QdQAOoFFGU1N3uBVhcPTVaHkny0pO6UzWOZVrRVWmSZqV0qG73f6GaVVKSKJ3wCjSM0h300R9xFU13hg4v/ffzZ/4G03dZmtWLNPHS3a6fB2IwzdKi5QHV2cHTsYc3ckIqtDyOZQCgWZ2KPXBq8M806/OdU730JEHD7sA69pu+zuc0q8axOPY9GFGxBxposg86L3IOacdGSM26NYA0a5o1qXuRdMfWcWicC0rfYeNFTmPnZUzFrjzIoojS9/WddC8adgXVrAt78tAE8NKdCg2Onb8RdZ+EEkVpsmvRNI5Fy7qiql15NEzqSX3/VNKD3YqrO0TMS6cIkHoap/TkvQsBNete9rwVnfYZ7jQssGIPHMso8tL19oNPHsTVrFujQZIAQOpuV5YWgXXZvcy3ld0PttAKx6LB3gJKp8g511eGRlW7spL6Lp69vBmKhVV7siSlWSlKklOxK+srQwNqHqfGoZHmuxEOaYfNV1f+DxQab2w4+x4Upk+XGlMBsnw3VrtPsevT8UXUPQ0AqFL30gHsfnMwqA6gQZpVu+aHpAu7vs8Yo+mp0QCql3e65Sbp+uRgUM3DYdf8aVbplt5dCKwCnOr77uaU7gVhFWhZSdLEQZLGuXvEqPpOET8T5jTx3Vt9mzHG0pDrFxd5veytOF4pAAAAAElFTkSuQmCC`},mono:{icon:`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAAAWCAMAAAAvk+g+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADPUExURQAAAPv7+/T09Lm5uf////z8/OLi4v7+/v39/QICAnt7e7S0tPDw8Pb29uvr63V1dRgYGKSkpNvb2+np6cDAwAgICOXl5VZWVsrKytXV1W5ubjMzM6enp/r6+sfHx+fn5/Ly8t/f38/Pz+7u7g4ODs3NzYWFhZmZmUFBQR4eHpGRkQUFBcTExLy8vJ2dndHR0To6Oq2trZKSktjY2BQUFKCgoICAgEhISI6OjrGwsSIiIltbW/79/i4uLiYmJk1NTaqqqpaWlmZmZmFhYYmJiVdCR2MAAAM3SURBVEjHvdbZkqJKEAbgH6EqM1EEUXBFcBC13fe1215m3v+ZzkWrrSfOuZmI7rygCCqivoDgryzQrXI5pu8vXG/U5KU5VkRkqJ8BwyfgXKao9doIfwQ0AUiF3wWw+QdAXgAQ0w8ANJ1vBjlr9AtjAFI7AEDV+IuF6psaWdZ/TvG4tCLrDoyPgF14Baq5NwDY/M0nNVH6X3CIinUP1gSQTrjfhyoToJpGyRfJD8PdKs+XZ8x8Adki67OILhciIouW/wIzAFIj9t/y4eH3sjzeHfuXbMymtaxnT6L21m4zcbqw3VaZKZ7mO+/uMiRSeuNu8zkmE5vx1p5ERMnkT2OfMTnTabnk/lkRLVHhaDGd8AVMXwDpqMUacs5ItbsAOp9gHoPAw8jtrmUdUriTblfmPvmYH59Efkf864h1gN8pmWiOPMi7Uo3RfC6jCicIBl4gzZSHqBglnNLbTzN+kr1TAgAMCtEJAFZXsOoXP9DQ8Ssy3sq2XN6jYfh4aRdqI6TODptUf2BDJk6r1AyCjqrNIuOABieQfOo3seIhJpVgEN/FothJ+gIAwCQXABg4V7DF9A6T2EaWdBESFb2g7MNlFT0hXcnAIZ5hp0yUFLOLCetp722MKiXwjGd2UaelbL3ziu9zqBsXDyfnQ3DM+AYS9WEy2ciKIgmR8yLah0usjkgzOTFRB0fDRImJ9pKPmyO3N5cqF+AZxDbqtBTIuq7uQL959YBJvCnp6376AEYD1Cyq45z4cInUGWkYPIXEeWmwib4i51XaFbEjnqHKCTyDyEadhti1Rrvi8w10ql8eXkL+ysADaB2k2XqbS4luIPeketh4ozab6A7zDcwLNTnpdIGqKsBTlmWjzkNMop7Yzg2s4756d5nLo0Xch8lso0bRxoN0351P0DiiyIUegPOByIT7Cmn+YqeHrtf4fENl0SdY4XSAt2ssqP0ABsUvMNUpU1EXiGKdEBvlLIuJyNExkdLaYVK6NkvZslKd5mZZgUgZflvndMiG1mRRrHNc1glzrLW6gnr9IK6+vT3xonvnyQ/0Qw7b7bqfTZsCoKd+oAEzET0zp/mPaut7jzZ4bAFEz0TWd4L/AJltcxCN1O75AAAAAElFTkSuQmCC`,image:`/v7/assets/monobank-qrcode-D2EIVs4s.svg`}},Ji=Object.keys(qi);function Yi(e){let t=qi[e];if(!t)return console.warn(`Cannot find configuration for ${e} payment option`),null;let n;return t.image&&(n=A`<img src="${t.image}">`),A`<div class="selected">${n}</div>`}var Xi=class extends M{constructor(){super(),this.selected=``}connectedCallback(){super.connectedCallback(),Ji.length===1&&(this.selected=Ji[0])}_setSelected({target:e}){if(e.tagName!==`IMG`){this.selected=``;return}this.selected=e.getAttribute(`data-name`)}render(){return A`
      <div class="options" @click=${this._setSelected}>
        ${Ji.map(e=>A`
          <img src="${qi[e].icon}" alt="${G(`payment.${e}`)}" data-name="${e}">
        `)}
      </div>
      ${this.selected?Yi(this.selected):``}
    `}};K(Xi,`cName`,`one-time-donations`),K(Xi,`properties`,{selected:{type:String}}),Xi.styles=j`
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
`;var Zi=class extends M{constructor(){super(),this.items=null,this.type=`page`,this.categories=null}render(){return A`
      <nav>
        ${(this.categories||Object.keys(this.items)).map(e=>A`
          <h3>${G(`categories.${e}`)}</h3>
          <ul>
            ${this.items[e].map(e=>A`
              <li><app-link nav to="${this.type}" .params="${e}">${e.title}</app-link></li>
            `)}
          </ul>
        `)}
      </nav>
    `}};K(Zi,`cName`,`pages-by-categories`),K(Zi,`properties`,{items:{type:Object},type:{type:String},categories:{type:Array}}),Zi.styles=j`
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
`;var Qi=class extends M{constructor(){super(),this.type=`info`,this.message=``}render(){return A`${yr(this.message)}`}};K(Qi,`cName`,`app-notification`),K(Qi,`properties`,{type:{type:String},message:{type:String}}),Qi.styles=j`
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
`;var $i=function(e,t,n){return e.addEventListener(t,n,!1),function(){return e.removeEventListener(t,n,!1)}};try{var ea=Object.defineProperty({},"passive",{get:function(){return $i=function(e,t,n){return e.addEventListener(t,n,{passive:!0}),function(){return e.removeEventListener(t,n,{passive:!0})}},!0}});window.addEventListener(`test`,null,ea)}catch{}var ta=function(e,t,n){return $i(e,t,n)},na=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},ra=window.document.documentElement,ia=function(){for(var e=[`Webkit`,`Khtml`,`Moz`,`ms`,`O`],t=0;t<e.length;t++)if(e[t]+`Opacity`in ra.style)return`-`+e[t].toLowerCase()+`-`;return``}();function Z(e,t,n){e.style[ia+t]=n}var aa=window.navigator.msPointerEnabled,oa=window.document.documentElement,sa={start:aa?`MSPointerDown`:`touchstart`,move:aa?`MSPointerMove`:`touchmove`,end:aa?`MSPointerUp`:`touchend`,cancel:`touchcancel`},Q={end:`webkitTransitionEnd`in oa.style?`webkitTransitionEnd`:`transitionend`},ca=window.document,la=ca.documentElement,ua=!1,da=function(){function e(e){e===void 0&&(e={}),this.panel=e.panel,this.menu=e.menu,this.t=e.eventsEmitter||this.panel,this.i=0,this.s=0,this.o=!1,this.h=!1,this.u=!1,this.l=!1,this.v=e.touch===void 0||!!e.touch,this.p=e.side||`left`,this.m=e.easing||`ease`,this.M=parseInt(e.duration,10)||300,this.T=parseInt(e.tolerance,10)||70,this.g=parseInt(e.padding,10)||.8*window.innerWidth,this.k=this.g,this.I=this.p===`right`?-1:1,this.k*=this.I,this.O(),this.v&&(this.P(),this.v=this.v!==`manual`)}var t=e.prototype;return t.O=function(){var e=this.panel.classList,t=this.menu.classList;e.contains(`slideout-panel`)||e.add(`slideout-panel`),e.contains(`slideout-panel-`+this.p)||e.add(`slideout-panel-`+this.p),t.contains(`slideout-menu`)||t.add(`slideout-menu`),t.contains(`slideout-menu-`+this.p)||t.add(`slideout-menu-`+this.p)},t.S=function(e){return this.t.dispatchEvent(new window.CustomEvent(e)),this},t.on=function(e,t,n){var r=this;return this.t.addEventListener(e,t,n),function(){return r.t.removeEventListener(e,t,n)}},t.open=function(){this.S(`beforeopen`),la.classList.contains(`slideout-open`)||la.classList.add(`slideout-open`),this.X(),this.j(this.k),this.u=!0;var e=this;return this.panel.addEventListener(Q.end,(function t(){e.panel.removeEventListener(Q.end,t),Z(e.panel,`transition`,``),e.S(`open`)})),this},t.close=function(){if(!this.isOpen()&&!this.o)return this;this.S(`beforeclose`),this.X(),this.j(0),this.u=!1;var e=this;return this.panel.addEventListener(Q.end,(function t(){e.panel.removeEventListener(Q.end,t),la.classList.remove(`slideout-open`),Z(e.panel,`transition`,``),Z(e.panel,`transform`,``),e.S(`close`)})),this},t.toggle=function(){return this.isOpen()?this.close():this.open()},t.isOpen=function(){return this.u},t.j=function(e){this.s=e,Z(this.panel,`transform`,`translateX(`+e+`px)`)},t.X=function(){Z(this.panel,`transition`,ia+`transform `+this.M+`ms `+this.m)},t.P=function(){var e,t,n,r,i,a,o=this,s=function(){ua=!1};this.D=(n=function(){o.h||(clearTimeout(e),ua=!0,e=setTimeout(s,250))},i=!1,a=function(){n.call(t,r),i=!1},ta(t=ca,`scroll`,(function(e){r=e,i||(na(a),i=!0)}))),this.K=ta(this.panel,sa.start,(function(e){e.touches!==void 0&&(o.h=!1,o.o=!1,o.i=e.touches[0].pageX,o.l=!o.v||!o.isOpen()&&o.menu.clientWidth!==0)})),this.U=ta(this.panel,sa.cancel,(function(){o.h=!1,o.o=!1})),this.W=ta(this.panel,sa.end,(function(){if(o.h){if(o.S(`translateend`),o.o&&Math.abs(o.s)>o.T)o.open();else if(o.k-Math.abs(o.s)<=o.T/2){o.X(),o.j(o.k);var e=o;o.panel.addEventListener(Q.end,(function t(){this.panel.removeEventListener(Q.end,t),Z(e.panel,`transition`,``)}))}else o.close()}o.h=!1})),this.q=ta(this.panel,sa.move,(function(e){if(!(ua||o.l||e.touches===void 0||function(e){for(var t=e;t.parentNode;){if(t.getAttribute(`data-slideout-ignore`)!==null)return t;t=t.parentNode}return null}(e.target))){var t=e.touches[0].clientX-o.i,n=t;if(o.s=t,!(Math.abs(n)>o.g||Math.abs(t)<=20)){o.o=!0;var r=t*o.I;o.u&&r>0||!o.u&&r<0||(o.h||o.S(`translatestart`),r<=0&&(n=t+o.g*o.I,o.o=!1),o.h&&la.classList.contains(`slideout-open`)||la.classList.add(`slideout-open`),Z(o.panel,`transform`,`translateX(`+n+`px)`),o.S(`translate`,n),o.h=!0)}}}))},t.enableTouch=function(){return this.v=!0,this},t.disableTouch=function(){return this.v=!1,this},t.destroy=function(){this.close(),this.K(),this.U(),this.W(),this.q(),this.D()},e}(),fa=class extends M{constructor(){super(),this._drawer=null,this.isOpen=!1,this.disabled=!1,this._scrollTop=0}open(){this.isOpen=!0}close(){this.isOpen=!1}toggle(){this.isOpen=!this.isOpen}_createDrawer(){let[e,t]=this.shadowRoot.children;this._drawer=new da({menu:e,panel:t,eventsEmitter:this,padding:270,touch:!1});let n=()=>this._drawer.close();this._drawer.on(`beforeopen`,()=>{this.isOpen=!0,this._scrollTop=window.pageYOffset,e.classList.add(`open`),t.style.top=`${-this._scrollTop}px`,t.addEventListener(`mousedown`,n,!1),t.addEventListener(`touchstart`,n,!1),window.scroll(0,0)}),this._drawer.on(`close`,()=>{this.isOpen=!1,e.classList.remove(`open`),t.style.top=``,window.scroll(0,this._scrollTop),t.removeEventListener(`mousedown`,n,!1),t.removeEventListener(`touchstart`,n,!1)})}updated(e){if(this._drawer||this._createDrawer(),this.isOpen!==this._drawer.isOpen()){let e=this.isOpen?`open`:`close`;this._drawer[e]()}if(e.has(`disabled`)){let e=this.disabled?`disableTouch`:`enableTouch`;this._drawer[e]()}}disconnectedCallback(){super.disconnectedCallback(),this._drawer.destroy(),this._drawer=null}render(){return A`
      <div class="menu">
        <slot name="menu"></slot>
      </div>
      <div class="panel">
        <slot></slot>
      </div>
    `}};K(fa,`cName`,`menu-drawer`),K(fa,`properties`,{isOpen:{type:Boolean},disabled:{type:Boolean}}),fa.styles=j`
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
`;function pa(){return`v7`}async function ma(){return(await Qt(`/versions.txt`,{format:`txtArrayJSON`,cache:!0})).body}function ha(e){return window.location.href.replace(`/${pa()}/`,`/${e}/`)}function ga(e){window.location.href=ha(e.target.value)}var _a=class extends M{constructor(){super(),this._versions=[],this._currentVersion=pa(),this._currentVersion&&this._versions.push({number:this._currentVersion})}async connectedCallback(){super.connectedCallback();let e=await ma();this._versions=e.slice(0).reverse(),this.requestUpdate()}render(){return A`
      <select @change=${ga}>
        ${this._versions.map(e=>A`
          <option .selected=${e.number===this._currentVersion}>${e.number}</option>
        `)}
      </select>
    `}};K(_a,`cName`,`versions-select`),_a.styles=j`
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
`;var va=class extends M{constructor(){super(),this._versions=[],this._currentVersion=pa()||`unknown`}async connectedCallback(){super.connectedCallback(),this._unwatchRouter=W.observe(()=>this.requestUpdate()),this._versions=await ma(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}render(){let e=this._versions[this._versions.length-1];return!e||e.number===this._currentVersion?A``:A`
      <div class="alert alert-warning">
        ${yr(`oldVersionAlert`,{latestVersion:e.number,currentVersion:this._currentVersion,latestVersionUrl:ha(e.number)})}
      </div>
    `}};K(va,`cName`,`old-version-alert`),va.styles=[Dr,jr,j`
    a {
      color: inherit;
    }
  `];var ya=[wr,Er,Nr,Fr,Ir,Rr,zr,Qr,ii,$r,Gi,Ki,Bi,Zi,Xi,Qi,fa,_a,va];function ba(e){let t=document.querySelector(e);return ya.forEach(e=>customElements.define(e.cName,e)),W.observe(async e=>{let n=e.response.params.lang||cn;R()!==n&&(await un(n),t.ready=!0),Ur(e)}),t}var{navigator:xa,location:Sa}=window,Ca=Sa.hostname===`localhost`||Sa.hostname===`[::1]`||Sa.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),wa=`serviceWorker`in xa,$=(...e)=>console.log(...e);function Ta(e,t){e&&(e.onstatechange=()=>{$(`new worker state`,e.state),e.state===`installed`&&(xa.serviceWorker.controller?($(`New content is available and will be used when all tabs for this page are closed.`),t&&t.onUpdate&&t.onUpdate(e)):($(`Content is cached for offline use.`),t&&t.onSuccess&&t.onSuccess(e)))})}function Ea(e,t){let n=!1;return xa.serviceWorker.addEventListener(`controllerchange`,()=>{n||(n=!0,Sa.reload())}),xa.serviceWorker.register(e).then(e=>{$(`service worker is registered`),e.onupdatefound=()=>Ta(e.installing,t)}).catch(e=>{console.error(`Error during service worker registration:`,e)})}function Da(e){wa&&window.addEventListener(`load`,()=>{let t=`/v7/sw.js`;Ca?fetch(t,{headers:{"Service-Worker":`script`}}).then(n=>{let r=n.headers.get(`content-type`)||``;n.status===404||r.indexOf(`javascript`)===-1?($(`Service worker not found`),xa.serviceWorker.ready.then(e=>e.unregister()).then(()=>Sa.reload())):Ea(t,e)}).catch(()=>{$(`No internet connection found. App is running in offline mode.`)}):Ea(t,e)})}window.__isAppExecuted__=!0;var Oa=ba(`casl-docs`);Da({onUpdate(e){Oa.notify(`updateAvailable`,{onClick(){e.postMessage({type:`SKIP_WAITING`})}})}}),window.onShareThisLoaded=()=>{window.__sharethis__.config[`sticky-share-buttons`].id=`share-buttons`};
//# sourceMappingURL=index-DJzACQx-.js.map