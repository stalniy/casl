var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,o)=>(o=n==null?{}:e(i(n)),c(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=globalThis,d=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,f=Symbol(),p=new WeakMap,m=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==f)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(d&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=p.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&p.set(t,e))}return e}toString(){return this.cssText}},h=e=>new m(typeof e==`string`?e:e+``,void 0,f),g=(e,...t)=>new m(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,f),v=(e,t)=>{if(d)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=u.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},y=d?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return h(t)})(e):e,b,{is:x,defineProperty:S,getOwnPropertyDescriptor:ee,getOwnPropertyNames:C,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,w=globalThis,T=w.trustedTypes,re=T?T.emptyScript:``,ie=w.reactiveElementPolyfillSupport,ae=(e,t)=>e,oe={toAttribute(e,t){switch(t){case Boolean:e=e?re:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},se=(e,t)=>!x(e,t),ce={attribute:!0,type:String,converter:oe,reflect:!1,useDefault:!1,hasChanged:se};(b=Symbol).metadata??(b.metadata=Symbol(`metadata`)),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);var E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ce){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&S(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=ee(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ce}static _$Ei(){if(this.hasOwnProperty(ae(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ae(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ae(`properties`))){let e=this.properties,t=[...C(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(y(e))}else e!==void 0&&t.push(y(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return v(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?oe:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?oe:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??(n=a.getPropertyOptions(e)),!((n.hasChanged??se)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:`open`},E[ae(`elementProperties`)]=new Map,E[ae(`finalized`)]=new Map,ie?.({ReactiveElement:E}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push(`2.1.2`);var le=globalThis,ue=e=>e,de=le.trustedTypes,fe=de?de.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,pe=`$lit$`,D=`lit$${Math.random().toFixed(9).slice(2)}$`,me=`?`+D,he=`<${me}>`,O=document,ge=()=>O.createComment(``),_e=e=>e===null||typeof e!=`object`&&typeof e!=`function`,ve=Array.isArray,ye=e=>ve(e)||typeof e?.[Symbol.iterator]==`function`,be=`[ 	
\f\r]`,xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,Ce=/>/g,k=RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),we=/'/g,Te=/"/g,Ee=/^(?:script|style|textarea|title)$/i,A=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),j=Symbol.for(`lit-noChange`),M=Symbol.for(`lit-nothing`),De=new WeakMap,N=O.createTreeWalker(O,129);function Oe(e,t){if(!ve(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return fe===void 0?t:fe.createHTML(t)}var ke=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=xe;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===xe?c[1]===`!--`?o=Se:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=k):(Ee.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=k):o=Ce:o===k?c[0]===`>`?(o=i??xe,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?k:c[3]===`"`?Te:we):o===Te||o===we?o=k:o===Se||o===Ce?o=xe:(o=k,i=void 0);let d=o===k&&e[t+1].startsWith(`/>`)?` `:``;a+=o===xe?n+he:l>=0?(r.push(s),n.slice(0,l)+pe+n.slice(l)+D+d):n+D+(l===-2?t:d)}return[Oe(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Ae=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=ke(t,n);if(this.el=e.createElement(l,r),N.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=N.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(pe)){let t=u[o++],n=i.getAttribute(e).split(D),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ne:r[1]===`?`?Pe:r[1]===`@`?Fe:F}),i.removeAttribute(e)}else e.startsWith(D)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Ee.test(i.tagName)){let e=i.textContent.split(D),t=e.length-1;if(t>0){i.textContent=de?de.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],ge()),N.nextNode(),c.push({type:2,index:++a});i.append(e[t],ge())}}}else if(i.nodeType===8){if(i.data===me)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(D,e+1))!==-1;)c.push({type:7,index:a}),e+=D.length-1}}a++}}static createElement(e,t){let n=O.createElement(`template`);return n.innerHTML=e,n}};function P(e,t,n=e,r){if(t===j)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=_e(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??(n._$Co=[]))[r]=i),i!==void 0&&(t=P(e,i._$AS(e,t.values),i,r)),t}var je=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??O).importNode(t,!0);N.currentNode=r;let i=N.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Me(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ie(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=N.nextNode(),a++)}return N.currentNode=O,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Me=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),_e(e)?e===M||e==null||e===``?(this._$AH!==M&&this._$AR(),this._$AH=M):e!==this._$AH&&e!==j&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ye(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==M&&_e(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Ae.createElement(Oe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new je(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=De.get(e.strings);return t===void 0&&De.set(e.strings,t=new Ae(e)),t}k(t){ve(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(ge()),this.O(ge()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ue(e).nextSibling;ue(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=M,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=M}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=P(this,e,t,0),a=!_e(e)||e!==this._$AH&&e!==j,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=P(this,r[n+o],t,o),s===j&&(s=this._$AH[o]),a||(a=!_e(s)||s!==this._$AH[o]),s===M?e=M:e!==M&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ne=class extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===M?void 0:e}},Pe=class extends F{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==M)}},Fe=class extends F{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??M)===j)return;let n=this._$AH,r=e===M&&n!==M||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==M&&(n===M||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ie=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}},Le={M:pe,P:D,A:me,C:1,L:ke,R:je,D:ye,V:P,I:Me,H:F,N:Pe,U:Fe,B:Ne,F:Ie},Re=le.litHtmlPolyfillSupport;Re?.(Ae,Me),(le.litHtmlVersions??(le.litHtmlVersions=[])).push(`3.3.3`);var ze=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Me(t.insertBefore(ge(),e),e,void 0,n??{})}return i._$AI(e),i},Be=globalThis,I=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};I._$litElement$=!0,I.finalized=!0,Be.litElementHydrateSupport?.({LitElement:I});var Ve=Be.litElementPolyfillSupport;Ve?.({LitElement:I}),(Be.litElementVersions??(Be.litElementVersions=[])).push(`4.2.2`);var He={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ue=e=>(...t)=>({_$litDirective$:e,values:t}),We=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:Ge}=Le,Ke=e=>e,qe=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t,Je=e=>e?._$litType$?.h!=null,Ye=e=>e.strings===void 0,Xe=()=>document.createComment(``),Ze=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Ge(r.insertBefore(Xe(),i),r.insertBefore(Xe(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Ke(e).nextSibling;Ke(r).insertBefore(e,i),e=t}}}return n},Qe={},$e=(e,t=Qe)=>e._$AH=t,et=e=>e._$AH,tt=e=>{e._$AR()},nt=e=>Je(e)?e._$litType$.h:e.strings,rt=Ue(class extends We{constructor(e){super(e),this.et=new WeakMap}render(e){return[e]}update(e,[t]){let n=qe(this.it)?nt(this.it):null,r=qe(t)?nt(t):null;if(n!==null&&(r===null||n!==r)){let t=et(e).pop(),r=this.et.get(n);r===void 0&&(r=ze(M,document.createDocumentFragment()),r.setConnected(!1),this.et.set(n,r)),$e(r,[t]),Ze(r,void 0,t)}if(r!==null){if(n===null||n!==r){let t=this.et.get(r);if(t!==void 0){let n=et(t).pop();tt(e),Ze(e,void 0,n),$e(e,[n])}}this.it=t}else this.it=void 0;return this.render(t)}}),it={items:[{name:`learn`,route:!1,children:[{heading:`docs`},{name:`guide`,page:`guide/intro`},{name:`api`},{name:`examples`,url:`https://github.com/stalniy/casl-examples`},{name:`cookbook`,page:`cookbook/intro`}]},{name:`ecosystem`,route:!1,children:[{heading:`packages`},{name:`pkg-prisma`,page:`package/casl-prisma`},{name:`pkg-mongoose`,page:`package/casl-mongoose`},{name:`pkg-angular`,page:`package/casl-angular`},{name:`pkg-react`,page:`package/casl-react`},{name:`pkg-vue`,page:`package/casl-vue`},{heading:`help`},{name:`questions`,url:`https://stackoverflow.com/questions/tagged/casl`},{name:`chat`,url:`https://github.com/stalniy/casl/discussions`},{heading:`news`},{name:`blog`,url:`https://sergiy-stotskiy.medium.com`}]},{name:`support`},{name:`support-ukraine`,url:`https://prytulafoundation.org/en/home/support_page`,rel:`noopener noreferrer`}],footer:[{icon:`github`,url:`https://github.com/stalniy/casl`},{icon:`twitter`,url:`https://twitter.com/sergiy_stotskiy`},{icon:`medium`,url:`https://sergiy-stotskiy.medium.com`}]},at=function(e,t){return e.methods.pathname(t)},ot=l(o(((e,t)=>{t.exports=v,t.exports.match=s,t.exports.regexpToFunction=c,t.exports.parse=i,t.exports.compile=o,t.exports.tokensToFunction=l,t.exports.tokensToRegExp=g;var n=`/`,r=new RegExp([`(\\\\.)`,`(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?`].join(`|`),`g`);function i(e,t){for(var i=[],o=0,s=0,c=``,l=t&&t.delimiter||n,u=t&&t.whitelist||void 0,f=!1,p;(p=r.exec(e))!==null;){var m=p[0],h=p[1],g=p.index;if(c+=e.slice(s,g),s=g+m.length,h)c+=h[1],f=!0;else{var v=``,y=p[2],b=p[3],x=p[4],S=p[5];if(!f&&c.length){var ee=c.length-1,C=c[ee];(!u||u.indexOf(C)>-1)&&(v=C,c=c.slice(0,ee))}c&&(i.push(c),c=``,f=!1);var te=S===`+`||S===`*`,ne=S===`?`||S===`*`,w=b||x,T=v||l,re=v||(typeof i[i.length-1]==`string`?i[i.length-1]:``);i.push({name:y||o++,prefix:v,delimiter:T,optional:ne,repeat:te,pattern:w?d(w):a(T,l,re)})}}return(c||s<e.length)&&i.push(c+e.substr(s)),i}function a(e,t,n){var r=`[^`+u(e===t?e:e+t)+`]`;return!n||n.indexOf(e)>-1||n.indexOf(t)>-1?r+`+?`:u(n)+`|(?:(?!`+u(n)+`)`+r+`)+?`}function o(e,t){return l(i(e,t),t)}function s(e,t){var n=[];return c(v(e,n,t),n)}function c(e,t){return function(n,r){var i=e.exec(n);if(!i)return!1;for(var a=i[0],o=i.index,s={},c=r&&r.decode||decodeURIComponent,l=1;l<i.length;l++)if(i[l]!==void 0){var u=t[l-1];u.repeat?s[u.name]=i[l].split(u.delimiter).map(function(e){return c(e,u)}):s[u.name]=c(i[l],u)}return{path:a,index:o,params:s}}}function l(e,t){for(var n=Array(e.length),r=0;r<e.length;r++)typeof e[r]==`object`&&(n[r]=RegExp(`^(?:`+e[r].pattern+`)$`,f(t)));return function(t,r){for(var i=``,a=r&&r.encode||encodeURIComponent,o=!r||r.validate!==!1,s=0;s<e.length;s++){var c=e[s];if(typeof c==`string`)i+=c;else{var l=t?t[c.name]:void 0,u;if(Array.isArray(l)){if(!c.repeat)throw TypeError(`Expected "`+c.name+`" to not repeat, but got array`);if(l.length===0){if(c.optional)continue;throw TypeError(`Expected "`+c.name+`" to not be empty`)}for(var d=0;d<l.length;d++){if(u=a(l[d],c),o&&!n[s].test(u))throw TypeError(`Expected all "`+c.name+`" to match "`+c.pattern+`"`);i+=(d===0?c.prefix:c.delimiter)+u}}else if(typeof l==`string`||typeof l==`number`||typeof l==`boolean`){if(u=a(String(l),c),o&&!n[s].test(u))throw TypeError(`Expected "`+c.name+`" to match "`+c.pattern+`", but got "`+u+`"`);i+=c.prefix+u}else if(!c.optional)throw TypeError(`Expected "`+c.name+`" to be `+(c.repeat?`an array`:`a string`))}}return i}}function u(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,`\\$1`)}function d(e){return e.replace(/([=!:$/()])/g,`\\$1`)}function f(e){return e&&e.sensitive?``:`i`}function p(e,t){if(!t)return e;var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return e}function m(e,t,n){for(var r=[],i=0;i<e.length;i++)r.push(v(e[i],t,n).source);return RegExp(`(?:`+r.join(`|`)+`)`,f(n))}function h(e,t,n){return g(i(e,n),t,n)}function g(e,t,r){r=r||{};for(var i=r.strict,a=r.start!==!1,o=r.end!==!1,s=r.delimiter||n,c=[].concat(r.endsWith||[]).map(u).concat(`$`).join(`|`),l=a?`^`:``,d=0;d<e.length;d++){var p=e[d];if(typeof p==`string`)l+=u(p);else{var m=p.repeat?`(?:`+p.pattern+`)(?:`+u(p.delimiter)+`(?:`+p.pattern+`))*`:p.pattern;t&&t.push(p),p.optional?p.prefix?l+=`(?:`+u(p.prefix)+`(`+m+`))?`:l+=`(`+m+`)?`:l+=u(p.prefix)+`(`+m+`)`}}if(o)i||(l+=`(?:`+u(s)+`)?`),l+=c===`$`?`$`:`(?=`+c+`)`;else{var h=e[e.length-1],g=typeof h==`string`?h[h.length-1]===s:h===void 0;i||(l+=`(?:`+u(s)+`(?=`+c+`))?`),g||(l+=`(?=`+u(s)+`|`+c+`)`)}return new RegExp(l,f(r))}function v(e,t,n){return e instanceof RegExp?p(e,t):Array.isArray(e)?m(e,t,n):h(e,t,n)}}))()),st=function(e){return e.methods.resolve!==void 0},ct=function(e){return`externalURL`in e},lt=function(e,t){if(ct(e))return e;var n=e.name,r=e.params,i=e.query,a=e.hash;return{name:n,params:r,query:i,hash:a,state:e.state,url:`url`in e?e.url:t.url({name:n,params:r,query:i,hash:a})}},ut=function(e,t,n,r,i){var a=n||{},o=a.resolved,s=o===void 0?null:o,c=a.error,l=c===void 0?null:c,u={data:void 0,body:void 0,meta:void 0};for(var d in t)u[d]=t[d];if(!e.methods.respond)return u;var f=e.methods.respond({resolved:s,error:l,match:t,external:i});return f&&(u.meta=f.meta,u.body=f.body,u.data=f.data,f.redirect&&(u.redirect=lt(f.redirect,r))),u},dt=function(e,t,n){var r,i;n===void 0&&(n={});var a=(r=n.history,r===void 0?{}:r),o=n.sideEffects,s=n.external,c=(i=n.invisibleRedirects,i!==void 0&&i),l,u,d,f,p,m=[],h=[],g=[],v,y,b=function(){v=void 0,y=void 0},x=function(){v&&v(),b()},S=function(){y&&y(),b()},ee=function(e,t){return v=e,y=t,b},C=function(){p&&(p=void 0,m.forEach(function(e){e()}))},te=function(e){h.forEach(function(t){t(e)})},ne=function(e){g.splice(0).forEach(function(t){t(e)}),o&&o.forEach(function(t){t(e)})},w=function(e,t){if(!e.redirect||!c||ct(e.redirect)){d=e,f=t;var n={response:e,navigation:t,router:u};te(n),ne(n)}e.redirect!==void 0&&!ct(e.redirect)&&l.navigate(e.redirect,`replace`)},T=function(e,t,n,r,i){C(),n.finish();var a=ut(e,t,i,u,s);S(),w(a,r)},re=function(){m.length&&p===void 0&&(p=function(){l.cancel(),C(),x()},m.forEach(function(e){e(p)}))};return l=e(function(e){var n={action:e.action,previous:d},r=t.match(e.location);if(!r)e.finish(),S();else{var i=r.route,a=r.match;st(i)?(re(),i.methods.resolve(a,s).then(function(e){return{resolved:e,error:null}},function(e){return{error:e,resolved:null}}).then(function(t){e.cancelled||T(i,a,e,n,t)})):T(i,a,e,n,null)}},a),u={route:t.route,history:l,external:s,observe:function(e,t){var n=(t||{}).initial,r=n===void 0||n;return h.push(e),d&&r&&e({response:d,navigation:f,router:u}),function(){h=h.filter(function(t){return t!==e})}},once:function(e,t){var n=(t||{}).initial;d&&(n===void 0||n)?e({response:d,navigation:f,router:u}):g.push(e)},cancel:function(e){return m.push(e),function(){m=m.filter(function(t){return t!==e})}},url:function(e){var t=e.name,n=e.params,r=e.hash,i=e.query,a;if(t){var o=u.route(t);o&&(a=at(o,n))}return l.url({pathname:a,hash:r,query:i})},navigate:function(e){x();var t=e.url,n=e.state,r=e.method;if(l.navigate({url:t,state:n},r),e.cancelled||e.finished)return ee(e.cancelled,e.finished)},current:function(){return{response:d,navigation:f}},destroy:function(){l.destroy()}},l.current(),u},ft=function(e){return e.charAt(0)===`/`?e:`/`+e},pt=function(e){return e.charAt(e.length-1)===`/`?e:e+`/`},mt=function(e,t){return pt(e)+t},ht=function(e,t,n){n===void 0&&(n={path:``,keys:[]});var r=ft(mt(n.path,e.path)),i=e.pathOptions||{},a=i.match,o=a===void 0?{}:a,s=i.compile,c=s===void 0?{}:s,l=o.end==null||o.end;e.children&&e.children.length&&(o.end=!1);var u=[],d=(0,ot.default)(ft(e.path),u,o),f=u.map(function(e){return e.name});n.keys.length&&(f=n.keys.concat(f));var p=[],m=[];if(e.children)for(var h=0,g=e.children;h<g.length;h++){var v=g[h],y=ht(v,t,{path:r,keys:f});p.push(y),m.push(y.public)}var b=ot.default.compile(r),x={public:{name:e.name,keys:f,parent:void 0,children:m,methods:{resolve:e.resolve,respond:e.respond,pathname:function(e){return b(e,c)}},extra:e.extra},matching:{re:d,keys:u,exact:l,parsers:e.params||{},children:p}};return t[e.name]=x.public,p.length&&p.forEach(function(e){e.public.parent=x.public}),x},gt=function(e,t){var n=e.matching,r=n.re,i=n.children,a=n.exact,o=r.exec(t);if(!o)return[];var s=o[0],c=[{route:e,parsed:o.slice(1)}],l=t.slice(s.length);if(!i.length||l===``)return c;for(var u=ft(l),d=0,f=i;d<f.length;d++){var p=f[d],m=gt(p,u);if(m.length)return c.concat(m)}return a?[]:c},_t=function(e,t){for(var n=e[e.length-1].route.public,r={},i=0,a=e;i<a.length;i++)for(var o=a[i],s=o.route,c=o.parsed,l=s.matching,u=l.keys,d=l.parsers,f=0,p=c.length;f<p;f++){var m=u[f].name,h=d[m]||decodeURIComponent;c[f]!==void 0&&(r[m]=h(c[f]))}return{route:n,match:{location:t,name:n.name,params:r}}},vt=function(e){var t={},n=e.map(function(e){return ht(e,t)});return{match:function(e){for(var t=0,r=n;t<r.length;t++){var i=r[t],a=gt(i,e.pathname);if(a.length)return _t(a,e)}},route:function(e){return t[e]}}};function yt(e,t){return e?e.indexOf(t)===0?e:t+e:``}function bt(e){return e||``}function xt(e){return e||``}function St(e){e===void 0&&(e={});var t=e.query,n=t===void 0?{}:t,r=n.parse,i=r===void 0?bt:r,a=n.stringify,o=a===void 0?xt:a,s=e.base;return{location:function(e,t){var n=e.url,r=e.state;if(n===``||n.charAt(0)===`#`){t||(t={pathname:`/`,hash:``,query:i()});var a={pathname:t.pathname,hash:n.charAt(0)===`#`?n.substring(1):t.hash,query:t.query};return r&&(a.state=r),a}var o=n.indexOf(`#`),c;o===-1?c=``:(c=n.substring(o+1),n=n.substring(0,o));var l=n.indexOf(`?`),u;l!==-1&&(u=n.substring(l+1),n=n.substring(0,l));var d=i(u),f=s?s.remove(n):n;f===``&&(f=`/`);var p={hash:c,query:d,pathname:f};return r&&(p.state=r),p},keyed:function(e,t){return e.key=t,e},stringify:function(e){if(typeof e==`string`){var t=e.charAt(0);return t===`#`||t===`?`?e:s?s.add(e):e}return(e.pathname===void 0?``:s?s.add(e.pathname):e.pathname)+yt(o(e.query),`?`)+yt(e.hash,`#`)}}}function Ct(){var e=0;return{major:function(t){return t&&(e=t[0]+1),[e++,0]},minor:function(e){return[e[0],e[1]+1]}}}function wt(e){var t=e.responseHandler,n=e.utils,r=e.keygen,i=e.current,a=e.push,o=e.replace,s;function c(e,t,n,r){var i={location:e,action:t,finish:function(){s===i&&(n(),s=void 0)},cancel:function(e){s===i&&(r(e),i.cancelled=!0,s=void 0)},cancelled:!1};return i}function l(e){s=e,t(e)}function u(e){s&&(s.cancel(e),s=void 0)}function d(e,t){var r=i(),a=n.location(e,r);switch(t){case`anchor`:return n.stringify(a)===n.stringify(r)?f(a):p(a);case`push`:return p(a);case`replace`:return f(a);default:throw Error(`Invalid navigation type: `+t)}}function f(e){var t=n.keyed(e,r.minor(i().key));return c(t,`replace`,o.finish(t),o.cancel)}function p(e){var t=n.keyed(e,r.major(i().key));return c(t,`push`,a.finish(t),a.cancel)}return{prepare:d,emitNavigation:l,createNavigation:c,cancelPending:u}}function Tt(){}function Et(){var e;return{confirmNavigation:function(t,n,r){e?e(t,n,r||Tt):n()},confirm:function(t){e=t||null}}}function Dt(e,t){return RegExp(`^`+t+`(\\/|\\?|#|$)`,`i`).test(e)}function Ot(e,t){if(typeof e!=`string`||e.charAt(0)!==`/`||e.charAt(e.length-1)===`/`)throw Error(`The base segment "`+e+`" is not valid. The "base" option must begin with a forward slash and end with a non-forward slash character.`);var n=t||{},r=n.emptyRoot,i=r!==void 0&&r,a=n.strict,o=a!==void 0&&a;return{add:function(t){if(i){if(t===`/`)return e;if(t.startsWith(`/?`)||t.startsWith(`/#`))return``+e+t.substr(1)}else if(t.charAt(0)===`?`||t.charAt(0)===`#`)return t;return``+e+t},remove:function(t){if(t===``)return``;if(!Dt(t,e)){if(o)throw Error(`Expected a string that begins with "`+e+`", but received "`+t+`".`);return t}if(t===e){if(o&&!i)throw Error(`Received string "`+e+`", which is the same as the base, but "emptyRoot" is not true.`);return`/`}return t.substr(e.length)}}}function kt(){return!!(window&&window.location)}function At(e){return e.state===void 0&&navigator.userAgent.indexOf(`CriOS`)===-1}function jt(){try{return window.history.state||{}}catch{return{}}}function Mt(){}function Nt(e,t){if(t===void 0&&(t={}),!kt())throw Error(`Cannot use @hickory/browser without a DOM`);var n=St(t),r=Ct(),i=Et(),a=i.confirm,o=i.confirmNavigation;function s(e){var t=window.location,i=t.pathname,a=t.search,o=t.hash,s=i+a+o,c=e||jt(),l=c.key,u=c.state;l||(l=r.major(),window.history.replaceState({key:l,state:u},``,s));var d=n.location({url:s,state:u});return n.keyed(d,l)}function c(e){return n.stringify(e)}var l=jt().key===void 0?`push`:`pop`,u=wt({responseHandler:e,utils:n,keygen:r,current:function(){return v.location},push:{finish:function(e){return function(){var t=c(e),n=e.key,r=e.state;try{window.history.pushState({key:n,state:r},``,t)}catch{window.location.assign(t)}v.location=e,l=`push`}},cancel:Mt},replace:{finish:function(e){return function(){var t=c(e),n=e.key,r=e.state;try{window.history.replaceState({key:n,state:r},``,t)}catch{window.location.replace(t)}v.location=e,l=`replace`}},cancel:Mt}}),d=u.emitNavigation,f=u.cancelPending,p=u.createNavigation,m=u.prepare,h=!1;function g(e){if(h)h=!1;else if(!At(e)){f(`pop`);var t=s(e.state),n=v.location.key[0]-t.key[0],r=function(){h=!0,window.history.go(n)};o({to:t,from:v.location,action:`pop`},function(){d(p(t,`pop`,function(){v.location=t,l=`pop`},function(e){e!==`pop`&&r()}))},r)}}window.addEventListener(`popstate`,g,!1);var v={location:s(),current:function(){d(p(v.location,l,Mt,Mt))},url:c,navigate:function(e,t){t===void 0&&(t=`anchor`);var n=m(e,t);f(n.action),o({to:n.location,from:v.location,action:n.action},function(){d(n)})},go:function(e){window.history.go(e)},confirm:a,cancel:function(){f()},destroy:function(){window.removeEventListener(`popstate`,g),d=Mt}};return v}var Pt={routes:[{name:`home`,path:`:lang`,restrictions:{lang:`en`},controller:`Home`,sitemap:{priority:1,changefreq:`yearly`,provider:`langs`},children:[{name:`api`,path:`api/:id?`,restrictions:{id:`[\\w/-]+`},controller:`Page`,meta:{categories:[`api`],ignoreIdPrefix:!0},sitemap:{priority:.7,changefreq:`monthly`,provider:`pages`}},{name:`support`,path:`support-casljs`,controller:`Page`,sitemap:{priority:1,changefreq:`yearly`,provider:`route`}},{name:`page`,path:`:id`,restrictions:{id:`[\\w/-]+`},controller:`Page`,meta:{encode:!1,categories:[`guide`,`advanced`,`package`,`cookbook`]},sitemap:{priority:1,changefreq:`monthly`,provider:`pages`}}]}]},L={repoURL:`https://github.com/stalniy/casl`,baseUrl:`/v7`},Ft=`langChanged`;function It(e,t,n){return Object.entries(Rt(t||{})).reduce((e,[t,n])=>e.replace(RegExp(`{{[  ]*${t}[  ]*}}`,`gm`),String(Rt(n))),e)}function Lt(e,t){let n=e.split(`.`),r=t.strings;for(;r!=null&&n.length>0;)r=r[n.shift()];return r==null?null:r.toString()}function Rt(e){return typeof e==`function`?e():e}var R={loader:()=>Promise.resolve({}),empty:e=>`[${e}]`,lookup:Lt,interpolate:It,translationCache:{}};function zt(e){return R=Object.assign(Object.assign({},R),e)}function Bt(e){window.dispatchEvent(new CustomEvent(Ft,{detail:e}))}function Vt(e,t,n=R){Bt({previousStrings:n.strings,previousLang:n.lang,lang:n.lang=e,strings:n.strings=t})}function Ht(e,t){let n=t=>e(t.detail);return window.addEventListener(Ft,n,t),()=>window.removeEventListener(Ft,n)}async function Ut(e,t=R){let n=await t.loader(e,t);t.translationCache={},Vt(e,n,t)}function Wt(e,t,n=R){let r=n.translationCache[e]||(n.translationCache[e]=n.lookup(e,n)||n.empty(e,n));return t=t==null?null:Rt(t),t==null?r:n.interpolate(r,t,n)}var z=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),z(e,t);return!0},Gt=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Kt=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Yt(t)}};function qt(e){this._$AN===void 0?this._$AM=e:(Gt(this),this._$AM=e,Kt(this))}function Jt(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)z(r[e],!1),Gt(r[e]);else r!=null&&(z(r,!1),Gt(r))}else z(this,e)}}var Yt=e=>{e.type==He.CHILD&&(e._$AP??(e._$AP=Jt),e._$AQ??(e._$AQ=qt))},Xt=class extends We{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Kt(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(z(this,e),Gt(this))}setValue(e){if(Ye(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},Zt=class extends Xt{constructor(){super(...arguments),this.langChangedSubscription=null,this.getValue=(()=>``)}renderValue(e){return this.getValue=e,this.subscribe(),this.getValue()}langChanged(e){this.setValue(this.getValue(e))}subscribe(){this.langChangedSubscription??(this.langChangedSubscription=Ht(this.langChanged.bind(this)))}unsubscribe(){this.langChangedSubscription!=null&&this.langChangedSubscription()}disconnected(){this.unsubscribe()}reconnected(){this.subscribe()}},Qt=class extends Zt{render(e,t,n){return this.renderValue(()=>Wt(e,t,n))}},$t=Ue(Qt),en=class extends We{constructor(e){if(super(e),this.it=M,e.type!==He.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===M||e==null)return this._t=void 0,this.it=e;if(e===j)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};en.directiveName=`unsafeHTML`,en.resultType=1;var B=Ue(en),tn=Ue(class extends Qt{render(e,t,n){return this.renderValue(()=>B(Wt(e,t,n)))}}),nn=(...e)=>JSON.stringify(e);function V(e,t=nn){let n=new Map,r=function(...r){let i=t(...r);return n.has(i)||n.set(i,e.apply(this,r)),n.get(i)};return r.cache=n,r}function rn(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}var an=e=>e,on={json:JSON,raw:{parse:an,stringify:an},txtArrayJSON:{parse(e){let t=e.trim().replace(/[\r\n]+/g,`,`);return JSON.parse(`[${t}]`)},stringify(){throw Error(`"txtArrayJSON" format is not serializable`)}}};function sn(e,t={}){let n=on[t.format||`json`];return new Promise((r,i)=>{let a=new XMLHttpRequest;a.open(t.method||`GET`,e),t.headers&&Object.keys(t.headers).forEach(e=>{a.setRequestHeader(e,t.headers[e])}),a.onload=()=>r({status:a.status,headers:{"content-type":a.getResponseHeader(`Content-Type`)},body:n.parse(a.responseText)}),a.ontimeout=a.onerror=i,a.send(t.data?n.stringify(t.data):null)})}var H=Object.create(null);function cn(e,t={}){let n=t.absoluteUrl?e:L.baseUrl+e;return(t.method||`GET`)===`GET`?(H[n]??(H[n]=sn(n,t)),t.cache===!0?H[n]:H[n].then(e=>(delete H[n],e)).catch(e=>(delete H[n],Promise.reject(e)))):sn(n,t)}var ln={en:{default:`/v7/assets/default.en-V0tIgNYC.json`}};function un(e,t){let n=e.split(`.`),r=t.strings;for(let e=0;e<n.length;e++){let t=n[e];if(!r||!r[t])return;r=r[t]}return r}function dn(e){return console.warn(`missing i18n key: ${e}`),e}var fn=/%\{(\w+)\}/g;function pn(e,t){return e.replace(fn,(e,n)=>t[n])}var mn=zt({async loader(e){return(await cn(ln[e].default,{absoluteUrl:!0})).body},lookup:un,interpolate:pn,empty:dn}),hn=V((e,t)=>new Intl.DateTimeFormat(e,Wt(`dateTimeFormats.${t}`))),gn=[`en`],_n=gn[0],vn=()=>mn.lang,U=Wt,yn=e=>!!un(e,mn);function bn(e){if(!gn.includes(e))throw Error(`Locale ${e} is not supported. Supported: ${gn.join(`, `)}`);return Ut(e)}function xn(e,t=`default`){let n=typeof e==`string`?new Date(e):e;return hn(mn.lang,t).format(n)}var Sn=`ENTRIES`,Cn=`KEYS`,wn=`VALUES`,W=``,Tn=class{constructor(e,t){let n=e._tree,r=Array.from(n.keys());this.set=e,this._type=t,this._path=r.length>0?[{node:n,keys:r}]:[]}next(){let e=this.dive();return this.backtrack(),e}dive(){if(this._path.length===0)return{done:!0,value:void 0};let{node:e,keys:t}=G(this._path);if(G(t)===W)return{done:!1,value:this.result()};let n=e.get(G(t));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;let e=G(this._path).keys;e.pop(),!(e.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:e})=>G(e)).filter(e=>e!==W).join(``)}value(){return G(this._path).node.get(W)}result(){switch(this._type){case wn:return this.value();case Cn:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}},G=e=>e[e.length-1],En=(e,t,n)=>{let r=new Map;if(t===void 0)return r;let i=t.length+1,a=i+n,o=new Uint8Array(a*i).fill(n+1);for(let e=0;e<i;++e)o[e]=e;for(let e=1;e<a;++e)o[e*i]=e;return Dn(e,t,n,r,o,1,i,``),r},Dn=(e,t,n,r,i,a,o,s)=>{let c=a*o;key:for(let l of e.keys())if(l===W){let t=i[c-1];t<=n&&r.set(s,[e.get(l),t])}else{let c=a;for(let e=0;e<l.length;++e,++c){let r=l[e],a=o*c,s=a-o,u=i[a],d=Math.max(0,c-n-1),f=Math.min(o-1,c+n);for(let e=d;e<f;++e){let n=r!==t[e],o=i[s+e]+ +n,c=i[s+e+1]+1,l=i[a+e]+1,d=i[a+e+1]=Math.min(o,c,l);d<u&&(u=d)}if(u>n)continue key}Dn(e.get(l),t,n,r,i,c,o,s+l)}},On=class e{constructor(e=new Map,t=``){this._size=void 0,this._tree=e,this._prefix=t}atPrefix(t){if(!t.startsWith(this._prefix))throw Error(`Mismatched prefix`);let[n,r]=kn(this._tree,t.slice(this._prefix.length));if(n===void 0){let[n,i]=Fn(r);for(let r of n.keys())if(r!==W&&r.startsWith(i)){let a=new Map;return a.set(r.slice(i.length),n.get(r)),new e(a,t)}}return new e(n,t)}clear(){this._size=void 0,this._tree.clear()}delete(e){return this._size=void 0,Mn(this._tree,e)}entries(){return new Tn(this,Sn)}forEach(e){for(let[t,n]of this)e(t,n,this)}fuzzyGet(e,t){return En(this._tree,e,t)}get(e){let t=An(this._tree,e);return t===void 0?void 0:t.get(W)}has(e){let t=An(this._tree,e);return t!==void 0&&t.has(W)}keys(){return new Tn(this,Cn)}set(e,t){if(typeof e!=`string`)throw Error(`key must be a string`);return this._size=void 0,jn(this._tree,e).set(W,t),this}get size(){if(this._size)return this._size;this._size=0;let e=this.entries();for(;!e.next().done;)this._size+=1;return this._size}update(e,t){if(typeof e!=`string`)throw Error(`key must be a string`);this._size=void 0;let n=jn(this._tree,e);return n.set(W,t(n.get(W))),this}fetch(e,t){if(typeof e!=`string`)throw Error(`key must be a string`);this._size=void 0;let n=jn(this._tree,e),r=n.get(W);return r===void 0&&n.set(W,r=t()),r}values(){return new Tn(this,wn)}[Symbol.iterator](){return this.entries()}static from(t){let n=new e;for(let[e,r]of t)n.set(e,r);return n}static fromObject(t){return e.from(Object.entries(t))}},kn=(e,t,n=[])=>{if(t.length===0||e==null)return[e,n];for(let r of e.keys())if(r!==W&&t.startsWith(r))return n.push([e,r]),kn(e.get(r),t.slice(r.length),n);return n.push([e,t]),kn(void 0,``,n)},An=(e,t)=>{if(t.length===0||e==null)return e;for(let n of e.keys())if(n!==W&&t.startsWith(n))return An(e.get(n),t.slice(n.length))},jn=(e,t)=>{let n=t.length;outer:for(let r=0;e&&r<n;){for(let i of e.keys())if(i!==W&&t[r]===i[0]){let a=Math.min(n-r,i.length),o=1;for(;o<a&&t[r+o]===i[o];)++o;let s=e.get(i);if(o===i.length)e=s;else{let n=new Map;n.set(i.slice(o),s),e.set(t.slice(r,r+o),n),e.delete(i),e=n}r+=o;continue outer}let i=new Map;return e.set(t.slice(r),i),i}return e},Mn=(e,t)=>{let[n,r]=kn(e,t);if(n!==void 0){if(n.delete(W),n.size===0)Nn(r);else if(n.size===1){let[e,t]=n.entries().next().value;Pn(r,e,t)}}},Nn=e=>{if(e.length===0)return;let[t,n]=Fn(e);if(t.delete(n),t.size===0)Nn(e.slice(0,-1));else if(t.size===1){let[n,r]=t.entries().next().value;n!==W&&Pn(e.slice(0,-1),n,r)}},Pn=(e,t,n)=>{if(e.length===0)return;let[r,i]=Fn(e);r.set(i+t,n),r.delete(i)},Fn=e=>e[e.length-1],In=`or`,Ln=`and`,Rn=`and_not`,zn=class e{constructor(e){if(e?.fields==null)throw Error(`MiniSearch: option "fields" must be provided`);let t=e.autoVacuum==null||e.autoVacuum===!0?Xn:e.autoVacuum;this._options={...Gn,...e,autoVacuum:t,searchOptions:{...Kn,...e.searchOptions||{}},autoSuggestOptions:{...qn,...e.autoSuggestOptions||{}}},this._index=new On,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=Yn,this.addFields(this._options.fields)}add(e){let{extractField:t,stringifyField:n,tokenize:r,processTerm:i,fields:a,idField:o}=this._options,s=t(e,o);if(s==null)throw Error(`MiniSearch: document does not have ID field "${o}"`);if(this._idToShortId.has(s))throw Error(`MiniSearch: duplicate ID ${s}`);let c=this.addDocumentId(s);this.saveStoredFields(c,e);for(let o of a){let a=t(e,o);if(a==null)continue;let s=r(n(a,o),o),l=this._fieldIds[o],u=new Set(s).size;this.addFieldLength(c,l,this._documentCount-1,u);for(let e of s){let t=i(e,o);if(Array.isArray(t))for(let e of t)this.addTerm(l,c,e);else t&&this.addTerm(l,c,t)}}}addAll(e){for(let t of e)this.add(t)}addAllAsync(e,t={}){let{chunkSize:n=10}=t,r={chunk:[],promise:Promise.resolve()},{chunk:i,promise:a}=e.reduce(({chunk:e,promise:t},r,i)=>(e.push(r),(i+1)%n===0?{chunk:[],promise:t.then(()=>new Promise(e=>setTimeout(e,0))).then(()=>this.addAll(e))}:{chunk:e,promise:t}),r);return a.then(()=>this.addAll(i))}remove(e){let{tokenize:t,processTerm:n,extractField:r,stringifyField:i,fields:a,idField:o}=this._options,s=r(e,o);if(s==null)throw Error(`MiniSearch: document does not have ID field "${o}"`);let c=this._idToShortId.get(s);if(c==null)throw Error(`MiniSearch: cannot remove document with ID ${s}: it is not in the index`);for(let o of a){let a=r(e,o);if(a==null)continue;let s=t(i(a,o),o),l=this._fieldIds[o],u=new Set(s).size;this.removeFieldLength(c,l,this._documentCount,u);for(let e of s){let t=n(e,o);if(Array.isArray(t))for(let e of t)this.removeTerm(l,c,e);else t&&this.removeTerm(l,c,t)}}this._storedFields.delete(c),this._documentIds.delete(c),this._idToShortId.delete(s),this._fieldLength.delete(c),--this._documentCount}removeAll(e){if(e)for(let t of e)this.remove(t);else if(arguments.length>0)throw Error(`Expected documents to be present. Omit the argument to remove all documents.`);else this._index=new On,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldLength=new Map,this._avgFieldLength=[],this._storedFields=new Map,this._nextId=0}discard(e){let t=this._idToShortId.get(e);if(t==null)throw Error(`MiniSearch: cannot discard document with ID ${e}: it is not in the index`);this._idToShortId.delete(e),this._documentIds.delete(t),this._storedFields.delete(t),(this._fieldLength.get(t)||[]).forEach((e,n)=>{this.removeFieldLength(t,n,this._documentCount,e)}),this._fieldLength.delete(t),--this._documentCount,this._dirtCount+=1,this.maybeAutoVacuum()}maybeAutoVacuum(){if(this._options.autoVacuum===!1)return;let{minDirtFactor:e,minDirtCount:t,batchSize:n,batchWait:r}=this._options.autoVacuum;this.conditionalVacuum({batchSize:n,batchWait:r},{minDirtCount:t,minDirtFactor:e})}discardAll(e){let t=this._options.autoVacuum;try{this._options.autoVacuum=!1;for(let t of e)this.discard(t)}finally{this._options.autoVacuum=t}this.maybeAutoVacuum()}replace(e){let{idField:t,extractField:n}=this._options,r=n(e,t);this.discard(r),this.add(e)}vacuum(e={}){return this.conditionalVacuum(e)}conditionalVacuum(e,t){return this._currentVacuum?(this._enqueuedVacuumConditions=this._enqueuedVacuumConditions&&t,this._enqueuedVacuum??(this._enqueuedVacuum=this._currentVacuum.then(()=>{let t=this._enqueuedVacuumConditions;return this._enqueuedVacuumConditions=Yn,this.performVacuuming(e,t)})),this._enqueuedVacuum):this.vacuumConditionsMet(t)===!1?Promise.resolve():(this._currentVacuum=this.performVacuuming(e),this._currentVacuum)}async performVacuuming(e,t){let n=this._dirtCount;if(this.vacuumConditionsMet(t)){let t=e.batchSize||Jn.batchSize,r=e.batchWait||Jn.batchWait,i=1;for(let[e,n]of this._index){for(let[e,t]of n)for(let[r]of t)this._documentIds.has(r)||(t.size<=1?n.delete(e):t.delete(r));this._index.get(e).size===0&&this._index.delete(e),i%t===0&&await new Promise(e=>setTimeout(e,r)),i+=1}this._dirtCount-=n}await null,this._currentVacuum=this._enqueuedVacuum,this._enqueuedVacuum=null}vacuumConditionsMet(e){if(e==null)return!0;let{minDirtCount:t,minDirtFactor:n}=e;return t=t||Xn.minDirtCount,n=n||Xn.minDirtFactor,this.dirtCount>=t&&this.dirtFactor>=n}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}has(e){return this._idToShortId.has(e)}getStoredFields(e){let t=this._idToShortId.get(e);if(t!=null)return this._storedFields.get(t)}search(t,n={}){let{searchOptions:r}=this._options,i={...r,...n},a=this.executeQuery(t,n),o=[];for(let[e,{score:t,terms:n,match:r}]of a){let a=n.length||1,s={id:this._documentIds.get(e),score:t*a,terms:Object.keys(r),queryTerms:n,match:r};Object.assign(s,this._storedFields.get(e)),(i.filter==null||i.filter(s))&&o.push(s)}return t===e.wildcard&&i.boostDocument==null||o.sort($n),o}autoSuggest(e,t={}){t={...this._options.autoSuggestOptions,...t};let n=new Map;for(let{score:r,terms:i}of this.search(e,t)){let e=i.join(` `),t=n.get(e);t==null?n.set(e,{score:r,terms:i,count:1}):(t.score+=r,t.count+=1)}let r=[];for(let[e,{score:t,terms:i,count:a}]of n)r.push({suggestion:e,terms:i,score:t/a});return r.sort($n),r}get documentCount(){return this._documentCount}get termCount(){return this._index.size}static loadJSON(e,t){if(t==null)throw Error(`MiniSearch: loadJSON should be given the same options used when serializing the index`);return this.loadJS(JSON.parse(e),t)}static async loadJSONAsync(e,t){if(t==null)throw Error(`MiniSearch: loadJSON should be given the same options used when serializing the index`);return this.loadJSAsync(JSON.parse(e),t)}static getDefault(e){if(Gn.hasOwnProperty(e))return Bn(Gn,e);throw Error(`MiniSearch: unknown option "${e}"`)}static loadJS(e,t){let{index:n,documentIds:r,fieldLength:i,storedFields:a,serializationVersion:o}=e,s=this.instantiateMiniSearch(e,t);s._documentIds=tr(r),s._fieldLength=tr(i),s._storedFields=tr(a);for(let[e,t]of s._documentIds)s._idToShortId.set(t,e);for(let[e,t]of n){let n=new Map;for(let e of Object.keys(t)){let r=t[e];o===1&&(r=r.ds),n.set(parseInt(e,10),tr(r))}s._index.set(e,n)}return s}static async loadJSAsync(e,t){let{index:n,documentIds:r,fieldLength:i,storedFields:a,serializationVersion:o}=e,s=this.instantiateMiniSearch(e,t);s._documentIds=await nr(r),s._fieldLength=await nr(i),s._storedFields=await nr(a);for(let[e,t]of s._documentIds)s._idToShortId.set(t,e);let c=0;for(let[e,t]of n){let n=new Map;for(let e of Object.keys(t)){let r=t[e];o===1&&(r=r.ds),n.set(parseInt(e,10),await nr(r))}++c%1e3==0&&await rr(0),s._index.set(e,n)}return s}static instantiateMiniSearch(t,n){let{documentCount:r,nextId:i,fieldIds:a,averageFieldLength:o,dirtCount:s,serializationVersion:c}=t;if(c!==1&&c!==2)throw Error(`MiniSearch: cannot deserialize an index created with an incompatible version`);let l=new e(n);return l._documentCount=r,l._nextId=i,l._idToShortId=new Map,l._fieldIds=a,l._avgFieldLength=o,l._dirtCount=s||0,l._index=new On,l}executeQuery(t,n={}){if(t===e.wildcard)return this.executeWildcardQuery(n);if(typeof t!=`string`){let e={...n,...t,queries:void 0},r=t.queries.map(t=>this.executeQuery(t,e));return this.combineResults(r,e.combineWith)}let{tokenize:r,processTerm:i,searchOptions:a}=this._options,o={tokenize:r,processTerm:i,...a,...n},{tokenize:s,processTerm:c}=o,l=s(t).flatMap(e=>c(e)).filter(e=>!!e).map(Wn(o)).map(e=>this.executeQuerySpec(e,o));return this.combineResults(l,o.combineWith)}executeQuerySpec(e,t){let n={...this._options.searchOptions,...t},r=(n.fields||this._options.fields).reduce((e,t)=>({...e,[t]:Bn(n.boost,t)||1}),{}),{boostDocument:i,weights:a,maxFuzzy:o,bm25:s}=n,{fuzzy:c,prefix:l}={...Kn.weights,...a},u=this._index.get(e.term),d=this.termResults(e.term,e.term,1,e.termBoost,u,r,i,s),f,p;if(e.prefix&&(f=this._index.atPrefix(e.term)),e.fuzzy){let t=e.fuzzy===!0?.2:e.fuzzy,n=t<1?Math.min(o,Math.round(e.term.length*t)):t;n&&(p=this._index.fuzzyGet(e.term,n))}if(f)for(let[t,n]of f){let a=t.length-e.term.length;if(!a)continue;p?.delete(t);let o=l*t.length/(t.length+.3*a);this.termResults(e.term,t,o,e.termBoost,n,r,i,s,d)}if(p)for(let t of p.keys()){let[n,a]=p.get(t);if(!a)continue;let o=c*t.length/(t.length+a);this.termResults(e.term,t,o,e.termBoost,n,r,i,s,d)}return d}executeWildcardQuery(e){let t=new Map,n={...this._options.searchOptions,...e};for(let[e,r]of this._documentIds){let i=n.boostDocument?n.boostDocument(r,``,this._storedFields.get(e)):1;t.set(e,{score:i,terms:[],match:{}})}return t}combineResults(e,t=In){if(e.length===0)return new Map;let n=Vn[t.toLowerCase()];if(!n)throw Error(`Invalid combination operator: ${t}`);return e.reduce(n)||new Map}toJSON(){let e=[];for(let[t,n]of this._index){let r={};for(let[e,t]of n)r[e]=Object.fromEntries(t);e.push([t,r])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:e,serializationVersion:2}}termResults(e,t,n,r,i,a,o,s,c=new Map){if(i==null)return c;for(let l of Object.keys(a)){let u=a[l],d=this._fieldIds[l],f=i.get(d);if(f==null)continue;let p=f.size,m=this._avgFieldLength[d];for(let i of f.keys()){if(!this._documentIds.has(i)){this.removeTerm(d,i,t),--p;continue}let a=o?o(this._documentIds.get(i),t,this._storedFields.get(i)):1;if(!a)continue;let h=f.get(i),g=this._fieldLength.get(i)[d],v=Un(h,p,this._documentCount,g,m,s),y=n*r*u*a*v,b=c.get(i);if(b){b.score+=y,Zn(b.terms,e);let n=Bn(b.match,t);n?n.push(l):b.match[t]=[l]}else c.set(i,{score:y,terms:[e],match:{[t]:[l]}})}}return c}addTerm(e,t,n){let r=this._index.fetch(n,er),i=r.get(e);if(i==null)i=new Map,i.set(t,1),r.set(e,i);else{let e=i.get(t);i.set(t,(e||0)+1)}}removeTerm(e,t,n){if(!this._index.has(n)){this.warnDocumentChanged(t,e,n);return}let r=this._index.fetch(n,er),i=r.get(e);i==null||i.get(t)==null?this.warnDocumentChanged(t,e,n):i.get(t)<=1?i.size<=1?r.delete(e):i.delete(t):i.set(t,i.get(t)-1),this._index.get(n).size===0&&this._index.delete(n)}warnDocumentChanged(e,t,n){for(let r of Object.keys(this._fieldIds))if(this._fieldIds[r]===t){this._options.logger(`warn`,`MiniSearch: document with ID ${this._documentIds.get(e)} has changed before removal: term "${n}" was not present in field "${r}". Removing a document after it has changed can corrupt the index!`,`version_conflict`);return}}addDocumentId(e){let t=this._nextId;return this._idToShortId.set(e,t),this._documentIds.set(t,e),this._documentCount+=1,this._nextId+=1,t}addFields(e){for(let t=0;t<e.length;t++)this._fieldIds[e[t]]=t}addFieldLength(e,t,n,r){let i=this._fieldLength.get(e);i??this._fieldLength.set(e,i=[]),i[t]=r;let a=(this._avgFieldLength[t]||0)*n+r;this._avgFieldLength[t]=a/(n+1)}removeFieldLength(e,t,n,r){if(n===1){this._avgFieldLength[t]=0;return}let i=this._avgFieldLength[t]*n-r;this._avgFieldLength[t]=i/(n-1)}saveStoredFields(e,t){let{storeFields:n,extractField:r}=this._options;if(n==null||n.length===0)return;let i=this._storedFields.get(e);i??this._storedFields.set(e,i={});for(let e of n){let n=r(t,e);n!==void 0&&(i[e]=n)}}};zn.wildcard=Symbol(`*`);var Bn=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,Vn={[In]:(e,t)=>{for(let n of t.keys()){let r=e.get(n);if(r==null)e.set(n,t.get(n));else{let{score:e,terms:i,match:a}=t.get(n);r.score+=e,r.match=Object.assign(r.match,a),Qn(r.terms,i)}}return e},[Ln]:(e,t)=>{let n=new Map;for(let r of t.keys()){let i=e.get(r);if(i==null)continue;let{score:a,terms:o,match:s}=t.get(r);Qn(i.terms,o),n.set(r,{score:i.score+a,terms:i.terms,match:Object.assign(i.match,s)})}return n},[Rn]:(e,t)=>{for(let n of t.keys())e.delete(n);return e}},Hn={k:1.2,b:.7,d:.5},Un=(e,t,n,r,i,a)=>{let{k:o,b:s,d:c}=a;return Math.log(1+(n-t+.5)/(t+.5))*(c+e*(o+1)/(e+o*(1-s+s*r/i)))},Wn=e=>(t,n,r)=>({term:t,fuzzy:typeof e.fuzzy==`function`?e.fuzzy(t,n,r):e.fuzzy||!1,prefix:typeof e.prefix==`function`?e.prefix(t,n,r):e.prefix===!0,termBoost:typeof e.boostTerm==`function`?e.boostTerm(t,n,r):1}),Gn={idField:`id`,extractField:(e,t)=>e[t],stringifyField:(e,t)=>e.toString(),tokenize:e=>e.split(ir),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof(console==null?void 0:console[e])==`function`&&console[e](t)},autoVacuum:!0},Kn={combineWith:In,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:Hn},qn={combineWith:Ln,prefix:(e,t,n)=>t===n.length-1},Jn={batchSize:1e3,batchWait:10},Yn={minDirtFactor:.1,minDirtCount:20},Xn={...Jn,...Yn},Zn=(e,t)=>{e.includes(t)||e.push(t)},Qn=(e,t)=>{for(let n of t)e.includes(n)||e.push(n)},$n=({score:e},{score:t})=>t-e,er=()=>new Map,tr=e=>{let t=new Map;for(let n of Object.keys(e))t.set(parseInt(n,10),e[n]);return t},nr=async e=>{let t=new Map,n=0;for(let r of Object.keys(e))t.set(parseInt(r,10),e[r]),++n%1e3==0&&await rr(0);return t},rr=e=>new Promise(t=>setTimeout(t,e)),ir=/[\n\r\p{Z}\p{P}]+/u;function ar(e){return Object.assign(Error(e),{code:`NOT_FOUND`})}function or(e,t){switch(t){case`summary`:return e.meta?e.meta.description:null;case`headings`:return e[t].map(e=>e.title).join(` `);default:return e[t]}}var sr={extractField:or,fields:[`title`,`headings`,`summary`],searchOptions:{boost:{title:2}}};function cr(e){let t={};return e.terms.forEach(n=>{let r=RegExp(`(${n})`,`gi`);e.match[n].forEach(i=>{let a=e.doc[i];if(typeof a==`string`)t[i]=a.replace(r,`<mark>$1</mark>`);else if(i===`headings`){let e=a.reduce((e,t)=>(t.title.toLowerCase().includes(n)&&e.push({id:t.id,title:t.title.replace(r,`<mark>$1</mark>`)}),e),[]);t[i]=e.length?e:null}})}),t}var lr=class{constructor({pages:e,summaries:t,searchIndexes:n}){this._pages=e,this._summaries=t,this._searchIndexes=n,this._loadSearchIndex=V(this._loadSearchIndex),this._getSummary=V(this._getSummary),this._getItems=V(this._getItems),this.byCategories=V(this.byCategories),this.load=V(this.load)}async load(e,t){let n=this._pages[e][t];if(!n)throw ar(`Page with ${t} is not found`);return(await cn(n,{absoluteUrl:!0})).body}async _getSummary(e){return(await cn(this._summaries[e],{absoluteUrl:!0})).body}async _getItems(e,t=null){let n=await this.byCategories(e,t);return Object.keys(n).reduce((e,t)=>e.concat(n[t]),[])}async getNearestFor(e,t,n=null){let r=await this._getItems(e,n),i=r.findIndex(e=>e.id===t);if(i===-1)return[];let a=i-1,o=i+1;return[a<0?void 0:r[a],o>=r.length?void 0:r[o]]}async byCategories(e,t=null){let{items:n}=await this._getSummary(e),r={};return n.forEach(e=>{e.categories.forEach(t=>{r[t]=r[t]||[],r[t].push(e)})}),Array.isArray(t)?t.reduce((e,t)=>(e[t]=r[t],e),{}):r}async at(e,t){let{items:n}=await this._getSummary(e);return n[t]}async _loadSearchIndex(e){let t=this._searchIndexes[e],n=await cn(t,{absoluteUrl:!0});return zn.loadJS(n.body,sr)}async search(e,t,n){let[r,i]=await Promise.all([this._loadSearchIndex(e),this._getSummary(e)]);return r.search(t,n).slice(0,15).map(e=>{let[t]=i.byId[e.id];return e.doc=i.items[t],e.hints=cr(e),e})}},ur=s({pages:()=>dr,searchIndexes:()=>pr,summaries:()=>fr}),dr={en:{notfound:`/v7/assets/notfound.en-D3L7oOYD.json`,"support-casljs":`/v7/assets/support-casljs.en-DtnLLZtW.json`,"cookbook/claim-authorization":`/v7/assets/cookbook/claim-authorization.en-DLWiZr68.json`,"cookbook/less-confusing-can-api":`/v7/assets/cookbook/less-confusing-can-api.en-9iIUJS6_.json`,"cookbook/cache-rules":`/v7/assets/cookbook/cache-rules.en-DjSftmEe.json`,"cookbook/intro":`/v7/assets/cookbook/intro.en-CdYKdEd7.json`,"cookbook/roles-with-persisted-permissions":`/v7/assets/cookbook/roles-with-persisted-permissions.en-ytRFoT12.json`,"cookbook/roles-with-static-permissions":`/v7/assets/cookbook/roles-with-static-permissions.en-COnO76LG.json`,"api/casl-ability":`/v7/assets/api/casl-ability.en-DMwTtnKu.json`,"api/casl-ability-extra":`/v7/assets/api/casl-ability-extra.en-YENGcbwN.json`,"advanced/ability-inheritance":`/v7/assets/advanced/ability-inheritance.en-rv3lmhuz.json`,"advanced/ability-to-database-query":`/v7/assets/advanced/ability-to-database-query.en-C267nnw8.json`,"advanced/customize-ability":`/v7/assets/advanced/customize-ability.en-BQCPAwB0.json`,"advanced/debugging-testing":`/v7/assets/advanced/debugging-testing.en-C5dCOuu_.json`,"advanced/typescript":`/v7/assets/advanced/typescript.en-2IbiBTP0.json`,"guide/conditions-in-depth":`/v7/assets/guide/conditions-in-depth.en-DWTvJUEP.json`,"guide/define-aliases":`/v7/assets/guide/define-aliases.en-BDoC2UHw.json`,"guide/define-rules":`/v7/assets/guide/define-rules.en-C-ZrRB1F.json`,"guide/install":`/v7/assets/guide/install.en-CFTad0FM.json`,"guide/intro":`/v7/assets/guide/intro.en-DPvLmvI6.json`,"guide/restricting-fields":`/v7/assets/guide/restricting-fields.en-CUVe56Vz.json`,"guide/subject-type-detection":`/v7/assets/guide/subject-type-detection.en-DWk-idco.json`,"package/casl-angular":`/v7/assets/package/casl-angular.en-CaFU0IyE.json`,"package/casl-mongoose":`/v7/assets/package/casl-mongoose.en-BfUXh-gR.json`,"package/casl-react":`/v7/assets/package/casl-react.en-D_uO0L0Y.json`,"package/casl-prisma":`/v7/assets/package/casl-prisma.en-DV6YIh0A.json`,"package/casl-vue":`/v7/assets/package/casl-vue.en-BpaeqnI-.json`}},fr={en:`/v7/assets/content_pages_summaries.en-Cb7TX0Bj.json`},pr={en:`/v7/assets/content_pages_searchIndexes.en-DTprDIX_.json`},mr={page:new lr(ur)},hr=e=>{let t=mr[e];if(!t)throw TypeError(`Unknown content loader "${e}".`);return t};function gr(e){if(e.code===`NOT_FOUND`)return{body:A`<app-page name="notfound"></app-page>`};throw e}async function _r(e,t){if(!t.categories)return e.at(t.lang,0);let n=await e.byCategories(t.lang,t.categories);return n[t.categories.find(e=>n[e].length)][0]}var vr=e=>e,yr=(e=vr)=>async t=>{let n=e(t),r=hr(`page`);return n.id?n.id.endsWith(`/`)?n.redirectTo=n.id.slice(0,-1):[n.page,n.byCategories,n.nav]=await Promise.all([r.load(n.lang,n.id),n.categories.length?r.byCategories(n.lang,n.categories):null,r.getNearestFor(n.lang,n.id,n.categories)]):n.redirectTo=(await _r(r,n)).id,n},br=(e=>({match:t,error:n,resolved:r})=>n?gr(n):r.redirectTo?{redirect:{name:`page`,params:{id:r.redirectTo,lang:t.params.lang}}}:{body:e(r,t.params)})(e=>({main:A`
    <app-page name="${e.id}" .nav="${e.nav}"></app-page>
  `,sidebar:e.byCategories?A`<pages-by-categories .items="${e.byCategories}"></pages-by-categories>`:null})),xr=s({parse:()=>Sr,stringify:()=>Cr});function Sr(e){return e?JSON.parse(`{"${e.replace(/&/g,`","`).replace(/=/g,`":"`)}"}`):{}}function Cr(e){return e?Object.keys(e).reduce((t,n)=>(t.push(`${n}=${e[n]}`),t),[]).join(`&`):``}function wr(e){return e.restrictions?e.path.replace(/:([\w_-]+)(\?)?/g,(t,n,r=``)=>{let i=e.restrictions[n];return i?`:${n}(${i})${r}`:n+r}):e.path}function Tr(e,t){return e.map(e=>{let n=t[e.controller];if(!n)throw Error(`Did you forget to specify controller for route "${e.name}"?`);let r={name:e.name,path:wr(e),...n(e)};return e.meta&&e.meta.encode===!1&&(r.pathOptions={compile:{encode:e=>e}}),e.children&&(r.children=Tr(e.children,t)),r})}function Er(e,t){let n=!1,r=e.replace(/:([\w_-]+)\??/g,(e,r)=>((!t[r]||t[r]===`undefined`)&&(n=!0),t[r]));return n?null:r}var K=dt(Nt,vt(Tr(Pt.routes,{Home:()=>({respond:()=>({body:{main:A`<home-page></home-page>`}})}),Page(e){let t=e.meta?e.meta.categories:[];return{resolve:yr(({params:n})=>({...n,categories:t,id:Er(e.path,n)})),respond:br}}}).concat({name:`notFound`,path:`(.*)`,respond({match:e}){let{pathname:t}=e.location,n=t.indexOf(`/`,1),r=n===-1?t.slice(1):t.slice(1,n),{search:i,hash:a}=window.location;return gn.includes(r)?{body:A`<app-page name="notfound"></app-page>`}:{redirect:{url:`/${_n}${t}${i}${a}`}}}})),{history:{base:L.baseUrl?Ot(L.baseUrl):void 0,query:xr}}),Dr=K.url;K.url=e=>{let t={lang:vn(),...e.params};return Dr({...e,params:t})},`scrollRestoration`in window.history&&(window.history.scrollRestoration=`manual`);var Or=window.visualViewport||window;function kr(e,t){let n=window.matchMedia(e),r=()=>t(n.matches);return Or.addEventListener(`resize`,r),r(),()=>Or.removeEventListener(`resize`,r)}var Ar=xn,q=$t,J=tn;function jr(e){"@babel/helpers - typeof";return jr=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},jr(e)}function Mr(e,t){if(jr(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(jr(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function Nr(e){var t=Mr(e,`string`);return jr(t)==`symbol`?t:t+``}function Y(e,t,n){return(t=Nr(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Pr=class extends I{constructor(){super(),this.addEventListener(`content-error`,e=>{this.setAttribute(`data-content-error`,e.detail?.message||e.target.getAttribute(`data-content-error`)||`content request failed`)}),this._route=null,this._notificationsRoot=null,this._menu=null,this._isMobile=!1,this.ready=!1,this._routeVersion=0,this._routePath=``,this._unwatch=[],this._publishReadiness=this._publishReadiness.bind(this)}connectedCallback(){super.connectedCallback(),this._unwatch.push(K.observe(e=>{this.ready=!1,this._routeVersion+=1,this._route=e.response,this._routePath=`${window.location.pathname}${window.location.search}${window.location.hash}`,this.removeAttribute(`data-rendered-route`),this.removeAttribute(`data-content-error`),this.removeAttribute(`data-content-not-found`),this._closeMenu()},{initial:!0})),this._unwatch.push(kr(`(min-width: 768px)`,e=>this._isMobile=!e)),document.addEventListener(`keypress`,e=>{e.ctrlKey&&e.shiftKey&&e.keyCode===22&&console.log(`70c83a6`)},!1);let e=setTimeout(()=>console.warn(`Page did not report readiness in 10sec.`),1e4),t=()=>clearTimeout(e);this.addEventListener(`route-ready`,t,{once:!0,passive:!0}),this._unwatch.push(t)}disconnectedCallback(){super.disconnectedCallback(),this._unwatch.forEach(e=>e())}updated(){this._menu??(this._menu=this.shadowRoot.querySelector(`menu-drawer`))}async _publishReadiness(e){let t=e.composedPath()[0];if(!this.ready||!this._route||!t?.isConnected)return;let n=this._routeVersion,r=this._routePath;await this.updateComplete,t.isConnected&&n===this._routeVersion&&r===`${window.location.pathname}${window.location.search}${window.location.hash}`&&(this.toggleAttribute(`data-content-not-found`,e.detail?.notFound===!0),this.setAttribute(`data-rendered-route`,r),this.dispatchEvent(new CustomEvent(`route-ready`,{detail:{path:r}})))}_toggleMenu(){this._menu?.toggle()}_closeMenu(){this._menu?.close()}notify(e,t={}){let n=document.createElement(`app-notification`);n.message=e,typeof t.onClick==`function`&&n.addEventListener(`click`,t.onClick,!1),this._notificationsRoot=this._notificationsRoot||Fr(),this._notificationsRoot.appendChild(n)}_renderDrawerMenu(e){return this._isMobile?A`
      ${e}
      <h3>${q(`menu.root`)}</h3>
      <app-menu .items="${it.items}" expanded></app-menu>
    `:null}_getLayout(e){return this._route.name===`home`?``:this._isMobile?`col-1`:e?`col-2`:`col-1`}render(){if(!this._route||!this.ready)return null;let{body:e}=this._route,t=e.sidebar?rt(e.sidebar):``;return A`
      <menu-drawer ?disabled="${!this._isMobile}">
        <div slot="menu">${this._renderDrawerMenu(t)}</div>
        <app-root
          theme="${this._isMobile?`mobile`:`default`}"
          layout="${this._getLayout(!!t)}"
          .menu="${it}"
          .isContainerRestricted="${this._route.name===`home`}"
          @toggle-menu="${this._toggleMenu}"
        >
          <div slot="aside">${t}</div>
          <div @content-ready="${this._publishReadiness}">${rt(e.main||e)}</div>
        </app-root>
      </menu-drawer>
    `}};Y(Pr,`cName`,`casl-docs`),Y(Pr,`properties`,{ready:{type:Boolean},_isMobile:{type:Boolean},_route:{type:Object}}),Pr.styles=[g`
    :host {
      display: block;
    }
  `];function Fr(){let e=document.createElement(`div`);return Object.assign(e.style,{position:`fixed`,right:`10px`,bottom:`10px`,zIndex:50,width:`320px`}),document.body.appendChild(e),e}var Ir=g`
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
`,Lr=class extends I{constructor(){super(),this.theme=`default`,this.menu=null,this.layout=``}render(){return A`
      <app-header theme="${this.theme}" .menu="${this.menu}" .isContainerRestricted="${this.isContainerRestricted}"></app-header>
      <section class="content ${this.layout===`col-2`?`row`:this.layout}">
        <aside>
          <div class="aside">
            <slot name="aside"></slot>
          </div>
        </aside>
        <main><slot></slot></main>
      </section>
      <app-footer></app-footer>
    `}};Y(Lr,`cName`,`app-root`),Y(Lr,`properties`,{theme:{type:String},layout:{type:String},menu:{type:Object},isContainerRestricted:{type:Boolean}}),Lr.styles=[Ir,g`
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

    .aside {
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
  `];var Rr=g`
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
`,zr=g`
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
`,Br=g`
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
`,Vr=g`
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
`,Hr=g`
  /* other alert styles is in md.js */

  .alert-warning {
    border-left-color: #856404;
    background-color: #fff3cd;
  }

  .alert-warning:before {
    background: #856404;
    content: 'w';
  }
`,Ur={github:A`
    <svg aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub icon</title><path fill="#FFFFFF" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
  `,twitter:A`
    <svg aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon" lang="en">Twitter icon</title><path fill="#FFFFFF" d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>
  `,medium:A`
    <svg aria-labelledby="simpleicons-medium-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-medium-icon" lang="en">Medium icon</title><path fill="#FFFFFF" d="M2.846 6.36c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403H7.26l5.378 11.795 4.728-11.795H24v.403l-1.917 1.837c-.165.126-.247.333-.213.538v13.5c-.034.204.048.41.213.537l1.87 1.837v.403h-9.41v-.403l1.937-1.882c.19-.19.19-.246.19-.538V7.794l-5.39 13.688h-.727L4.278 7.794v9.174c-.052.386.076.774.347 1.053l2.52 3.06v.402H0v-.403l2.52-3.06c.27-.278.39-.67.326-1.052V6.36z"></path></svg>
  `},Wr=class extends I{constructor(...e){super(...e),Y(this,`year`,new Date().getFullYear())}render(){return A`
      <p class="links">
        ${it.footer.map(e=>A`
          <a href="${e.url}" target="_blank" rel="noopener">
            ${Ur[e.icon]}
          </a>
        `)}
      </p>
      <p class="copyright md">${J(`copyright`,{year:this.year})}</p>
    `}};Y(Wr,`cName`,`app-footer`),Wr.styles=[Rr,g`
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
  `];var Gr=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEVMaXF1dXW6QQOmAAAAAXRSTlMAQObYZgAAABZJREFUeNpjoAVg/g8EB7BSg9sUygEATXU49WmTHjIAAAAASUVORK5CYII=`,Kr=class extends I{constructor(){super(),this.theme=`default`,this.menu={items:[]},this._isCompactSearch=!1}_emitToggleMenu(){this.dispatchEvent(new CustomEvent(`toggle-menu`,{bubbles:!0,composed:!0}))}_renderControls(){return this.theme==="default"?A`
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
        <img src="${Gr}" width="24">
      </button>
    `:null}update(e){return e.has(`theme`)&&(this._isCompactSearch=this.theme===`mobile`),super.update(e)}render(){return A`
      <header>
        <div class="header ${this.isContainerRestricted?`container`:``}">
          ${this._renderMenuToggler()}
          <div class="logo-container">
            <app-link to="home" class="logo">${q(`name`)}</app-link>
            <div class="versions-picker">
              <versions-select></versions-select>
            </div>
          </div>
          ${this._renderControls()}
        </div>
      </header>
      <!-- <app-lang-picker></app-lang-picker> -->
    `}};Y(Kr,`cName`,`app-header`),Y(Kr,`properties`,{menu:{type:Object},theme:{type:String},isContainerRestricted:{type:Boolean},_isCompactSearch:{type:Boolean}}),Kr.styles=[Ir,g`
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

    .logo-container {
      display: flex;
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

    .versions-picker {
      display: flex;
      align-items: center;
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

      .versions-picker {
        flex-direction: column;
        gap: 4px;
      }
    }
  `];var qr=class extends I{constructor(){super(),this.to=``,this.active=!1,this.query=null,this.params=null,this.hash=``,this.nav=!1,this._url=null,this._unwatchRouter=null}_isActive(){let e=this._getUrl(),{pathname:t}=window.location;return e.length>t.length?!1:e===t||t.startsWith(e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this._navigate.bind(this),!1),this.nav&&(this._unwatchRouter=K.observe(()=>{this.active=this._isActive()},{initial:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}update(e){let t=[`to`,`query`,`params`,`hash`].some(t=>e.has(t));if((this._url===null||t)&&(this._url=this._generateUrl()),this.nav&&e.has(`active`)){let e=this.active?`add`:`remove`;this.classList[e](`active`)}return super.update(e)}_getUrl(){return this._url=this._url||this._generateUrl(),this._url}_generateUrl(){return K.url({name:this.to,hash:this.hash,params:this.params,query:this.query})}render(){return A`
      <a itemprop="url" href="${this._url}">
        <slot></slot>
      </a>
    `}_navigate(e){e.ctrlKey||(e.preventDefault(),K.navigate({url:this._url}))}};Y(qr,`cName`,`app-link`),Y(qr,`properties`,{to:{type:String},params:{type:Object},query:{type:Object},hash:{type:String},active:{type:Boolean},nav:{type:Boolean}}),qr.styles=g`
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
`;function Jr(e){if(e.heading)return A`<h4>${q(`menu.${e.heading}`)}</h4>`;let t=q(`menu.${e.name}`);return e.route===!1?A`<a class="link">${t}</a>`:e.url?A`<a href="${e.url}" target="_blank" rel="${e.rel||`nofollow`}">${t}</a>`:e.page?A`<app-link nav to="page" .params="${{id:e.page}}">${t}</app-link>`:A`<app-link nav to="${e.name}">${t}</app-link>`}var Yr=class extends I{constructor(){super(),this.items=[]}render(){return A`
      <nav
        role="navigation"
        itemscope
        itemtype="http://schema.org/SiteNavigationElement"
      >
        ${this._renderNav(this.items,`nav`)}
      </nav>
    `}_renderNav(e,t){return A`<ul class="${t}">${e.map(e=>A`
      <li class="${e.children?`menu-item-dropdown`:`menu-item`}">
        ${Jr(e)}
        ${this._renderItemNav(e)}
      </li>
    `)}</ul>`}_renderItemNav({children:e}){return e?this._renderNav(e,`dropdown ${this.expanded?``:`expandable`}`):``}};Y(Yr,`cName`,`app-menu`),Y(Yr,`properties`,{items:{type:Array},expanded:{type:Boolean}}),Yr.styles=g`
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

  .menu-item-dropdown + .menu-item {
    margin-left: 0.5rem;
  }

  .menu-item {
    margin: 0 0.2rem;
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
  }
`;var Xr=class extends I{constructor(){super(),this.article=null,this.category=``}render(){let{article:e}=this,t=this.category||e.categories[0];return A`
      <time datetime="${e.createdAt}" itemprop="datePublished">
        ${Ar(e.createdAt)}
      </time>
      <span>
        ${q(`article.author`)}
        <span itemprop="author">${q(`article.authors.${e.author}`)}</span>
      </span>
      <slot name="more">
        <app-link to="${t}" hash="comments" .params="${e}">
          <i class="icon-comment"></i>${e.commentsCount||0}
        </app-link>
        <app-link to="${t}" .params="${e}" class="more">${q(`article.readMore`)}</app-link>
      </slot>
    `}};Y(Xr,`cName`,`app-article-details`),Y(Xr,`properties`,{article:{type:Object,attribute:!1},category:{type:String}}),Xr.styles=[g`
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
  `];var Zr=class extends I{constructor(){super(),this._unwatchLang=null,this._locale=vn()}connectedCallback(){super.connectedCallback(),this._unwatchLang=Ht(e=>{this._locale=e,this.reload().then(()=>this.requestUpdate())})}disconnectedCallback(){this._unwatchLang(),super.disconnectedCallback()}reload(){return Promise.reject(Error(`${this.constructor.cName} should implement "reload" method`))}};function Qr(e){let t=e?`${e} - `:``;document.title=t+U(`name`),ei(`og:title`,document.title)}function $r(e){let t=document.head.querySelector(`meta[name="${e}"]`);return t||(t=document.createElement(`meta`),t.setAttribute(`name`,e),document.head.appendChild(t)),t}function ei(e,t){let n=Array.from(document.head.querySelectorAll(`meta[property="${e}"]`)),r=n.shift()||document.createElement(`meta`);r.setAttribute(`property`,e),r.setAttribute(`content`,t),r.isConnected||document.head.appendChild(r),n.forEach(e=>e.remove())}function X(e,t){if(typeof e==`object`){Object.keys(e).forEach(t=>X(t,e[t]));return}let n=U(`meta.${e}`),r=Array.isArray(t)?t.concat(n).join(`, `):t||n;$r(e).setAttribute(`content`,r.replace(/[\n\r]+/g,` `)),e===`description`&&ei(`og:description`,r.replace(/[\n\r]+/g,` `))}function ti({response:e}){let t=document.documentElement;t.lang!==e.params.lang&&(t.lang=e.params.lang);let n=`meta.${e.name}`;yn(n)?(Qr(U(`${n}.title`)),X(`keywords`,U(`${n}.keywords`)),X(`description`,U(`${n}.description`))):(Qr(),X(`keywords`),X(`description`)),ii()}function ni(e){let t=e.meta||{};Qr(e.title),X(`keywords`,t.keywords||``),X(`description`,t.description||``),ii()}var ri;function ii(){window.__sharethis__&&(ri??(ri=document.getElementById(`share-buttons`)),ri.setAttribute(`data-url`,window.location.href),ri.setAttribute(`data-title`,document.title),ri.setAttribute(`data-description`,$r(`description`).getAttribute(`content`)))}function ai(e,t){let n=e.getElementById(t);n&&(n.scrollIntoView(!0),document.documentElement.scrollTop-=85)}function oi(e,t){let n=e,r=0;for(;n&&r<3;){if(n.tagName===t)return n;n=n.parentNode,r++}return null}function si(e,t){let n;if(t.tagName[0]===`H`&&t.id)n=t.id;else{let n=oi(t,`A`),r=n?n.href.indexOf(`#`):-1;r!==-1&&ai(e,n.href.slice(r+1))}if(n){let{location:t}=K.current().response,r=`${t.pathname}${window.location.search}#${n}`;K.navigate({url:r}),ai(e,n)}}function ci(e){let{hash:t}=K.current().response.location;t?ai(e,t):window.scroll(0,0)}function li(e,t){return B(pn(e.content,t))}var ui=class extends Zr{constructor(){super(),this._page=null,this._loadVersion=0,this.nav=[],this.name=null,this.vars={},this.type=`page`,this.content=li}connectedCallback(){super.connectedCallback(),this._unwatchRouter=K.observe(()=>this.requestUpdate()),this.shadowRoot.addEventListener(`click`,e=>{si(this.shadowRoot,e.target)},!1)}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter?.(),this._unwatchRouter=null}async updated(e){this._page===null||e.has(`name`)||e.has(`type`)?await this.reload():this.hasAttribute(`data-content-ready`)&&await this._publishContentReady(this._loadVersion)}async reload(){let e=++this._loadVersion;this.removeAttribute(`data-content-ready`),this.removeAttribute(`data-content-error`);let t;try{if(t=await hr(this.type).load(vn(),this.name),!t||typeof t!=`object`||typeof t.content!=`string`)throw TypeError(`Page "${this.name}" did not return rendered content`);if(e!==this._loadVersion||!this.isConnected)return;this._page=t,ni(t)}catch(t){e===this._loadVersion&&this._publishContentError(t);return}await this._publishContentReady(e)}async _publishContentReady(e){if(this._page&&e===this._loadVersion&&this.isConnected){try{await this.updateComplete,await Promise.all(Array.from(this.shadowRoot.querySelectorAll(`app-link, app-page-nav`),e=>e.updateComplete))}catch(t){e===this._loadVersion&&this.isConnected&&this._publishContentError(t,`content update failed`);return}this._page&&e===this._loadVersion&&this.isConnected&&(ci(this.shadowRoot),this.setAttribute(`data-content-ready`,`true`),this.dispatchEvent(new CustomEvent(`content-ready`,{bubbles:!0,composed:!0,detail:{notFound:this.name===`notfound`}})))}}_publishContentError(e,t=`content request failed`){let n=e.message||t;this.setAttribute(`data-content-error`,n),this.dispatchEvent(new CustomEvent(`content-error`,{bubbles:!0,composed:!0,detail:{message:n}}))}_renderNav(){let[e,t]=this.nav;return A`
      <app-page-nav pageType="${this.type}" .prev="${e}" .next="${t}"></app-page-nav>
    `}render(){return this._page?A`
      <article itemscope itemtype="http://schema.org/Article">
        <h1>${pn(this._page.title)}</h1>
        <old-version-alert></old-version-alert>
        <div class="description md">${this.content(this._page,this.vars)}</div>
      </article>
      ${this.nav&&this.nav.length?this._renderNav():``}
    `:A``}};Y(ui,`cName`,`app-page`),Y(ui,`properties`,{type:{type:String},name:{type:String},vars:{type:Object,attribute:!1},content:{type:Function,attribute:!1},nav:{type:Array},_page:{type:Object}}),ui.styles=[zr,Rr,Vr,g`
    :host {
      display: block;
      padding-bottom: 30px;
    }

    app-page-nav {
      margin-top: 20px;
    }
  `];var di=class extends I{constructor(){super(),this.next=null,this.prev=null,this.pageType=`page`}_linkTo(e){let t=this[e];return t?A`
      <app-link to="${this.pageType}" .params="${t}" class="${e}">
        ${t.title}
      </app-link>
    `:``}render(){return A`
      ${this._linkTo(`prev`)}
      ${this._linkTo(`next`)}
    `}};Y(di,`cName`,`app-page-nav`),Y(di,`properties`,{next:{type:Object},prev:{type:Object},pageType:{type:String}}),di.styles=g`
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
`;var fi=`/v7/assets/casl-shield-Czvcyms2.png`,pi=[`isomorphic`,`versatile`,`declarative`,`typesafe`,`treeshakable`];function mi(e){return A`
    <section class="feature">
      <h3>${q(`features.${e}.title`)}</h3>
      <p>${J(`features.${e}.description`,{size:(6892/1024).toFixed(1)})}</p>
    </section>
  `}var hi=()=>A`
  <div class="features-band">
    <section class="features container">${pi.map(mi)}</section>
  </div>
`;hi.styles=[g`
    .features-band {
      background: #f7f7f7;
    }

    .features {
      padding: 2rem 0;
      display: -ms-grid;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      -ms-grid-columns: ${h(pi.map(()=>`minmax(200px, 1fr)`).join(` `))};
    }

    .feature {
      padding: 1rem;
    }

    .feature h3 {
      margin: 0 0 1rem;
      font-size: 1.4rem;
    }

    .feature p:last-child {
      margin-bottom: 0;
    }
  `];var gi=[{name:`Strapi`,url:`https://strapi.io/`,logo:`strapi.svg`},{name:`Infisical`,url:`https://infisical.com/`},{name:`Lightdash`,url:`https://www.lightdash.com/`},{name:`ToolJet`,url:`https://tooljet.com/`},{name:`Meshery`,url:`https://meshery.io/`,logo:`meshery.svg`},{name:`Automatisch`,url:`https://automatisch.io/`}],_i=()=>A`
  <section class="adoption" aria-labelledby="adoption-title">
    <h2 id="adoption-title">${q(`adoption.title`)}</h2>
    <ul class="adoption-projects">
      ${gi.filter(e=>e.logo).map(e=>A`
        <li>
          <a href="${e.url}" target="_blank" rel="noopener noreferrer">
            <img
              src="${`/v7/`}project-logos/${e.logo}"
              alt="${e.name}"
              width="144"
              height="36"
            >
          </a>
        </li>
      `)}
    </ul>
    <ul class="adoption-text-projects">
      ${gi.filter(e=>!e.logo).map((e,t)=>A`
        <li>
          ${t?A`<span aria-hidden="true">·</span>`:``}
          <a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.name}</a>
        </li>
      `)}
    </ul>
    <p class="adoption-contribute">
      <a href="https://github.com/stalniy/casl/discussions/1307" target="_blank" rel="noopener noreferrer">
        ${q(`adoption.contribute`)}
        <span aria-hidden="true">→</span>
      </a>
    </p>
  </section>
`;_i.styles=g`
  .adoption {
    box-sizing: border-box;
    max-width: 800px;
    margin: 0 auto;
    padding: 15px 1rem;
    background: #fff;
    text-align: center;
  }

  .adoption h2 {
    margin: 0 0 1.5rem;
    font-family: "Stardos Stencil", "Helvetica Neue", Arial, sans-serif;
  }

  .adoption ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .adoption .adoption-projects {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .5rem 1rem;
    max-width: 420px;
    margin: 0 auto;
  }

  .adoption .adoption-text-projects {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: .35rem .5rem;
    margin-top: 1.25rem;
    color: #555;
    font-size: .9375rem;
  }

  .adoption-text-projects li {
    display: flex;
    align-items: center;
    gap: .5rem;
  }

  .adoption-text-projects a {
    color: inherit;
    text-decoration: none;
  }

  .adoption-text-projects a:hover {
    text-decoration: underline;
  }

  .adoption-projects a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    color: inherit;
    font-size: 1.15rem;
    font-weight: 600;
    text-decoration: none;
  }

  .adoption-projects img {
    display: block;
    width: 144px;
    max-width: 100%;
    height: 36px;
    object-fit: contain;
  }

  .adoption-projects a:hover,
  .adoption-projects a:focus-visible {
    text-decoration: underline;
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }

  .adoption-contribute {
    font-size: .8125rem;
    margin: 1rem 0 0;
    color: #707070;
  }

  .adoption-contribute a {
    color: inherit;
    text-decoration: none;
  }

  .adoption-contribute a:hover,
  .adoption-contribute a:focus-visible {
    color: #333;
    text-decoration: underline;
  }
`;var vi=class extends I{connectedCallback(){super.connectedCallback(),this._publishVersion=(this._publishVersion||0)+1,this._publishContentReady(this._publishVersion)}async _publishContentReady(e){await this.updateComplete,await Promise.all(Array.from(this.shadowRoot.querySelectorAll(`app-link`),e=>e.updateComplete)),this.isConnected&&e===this._publishVersion&&this.dispatchEvent(new CustomEvent(`content-ready`,{bubbles:!0,composed:!0}))}render(){return A`
      <div class="bg">
        <header class="row wrap container">
          <div class="col row wrap align-start main">
            <img src="${fi}" width="250" height="302" class="col col-fixed">
            <div class="col details">
              <div class="hero">
                <h1 class="hero-title">${q(`hero.title`)}</h1>
              </div>
              <div class="buttons">
                <app-link to="page" .params="${{id:`guide/intro`}}" class="btn btn-lg">
                  ${q(`buttons.start`)}
                </app-link>
                <a href="${L.repoURL}" target="_blank" rel="noopener" class="btn btn-lg">
                  ${q(`buttons.source`)}
                </a>
                <div class="package-stats">
                  <github-button></github-button>
                  <npm-downloads-button></npm-downloads-button>
                </div>
              </div>
            </div>
          </div>
          <div class="col col-fixed col-example">
            <div class="example">${J(`exampleCode`)}</div>
          </div>
        </header>
      </div>
      ${_i()}
      ${hi()}
    `}};Y(vi,`cName`,`home-page`),vi.styles=[Ir,Br,hi.styles,_i.styles,Vr,g`
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

    .hero-title {
      margin-bottom: 0;
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

    @media (min-width: 768px) {
      .main > img {
        margin-right: 30px;
      }

      .hero-title {
        white-space: wrap;
        max-width: 552px;
        margin: 0 auto;
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

      .hero-title {
        white-space: pre-line;
        max-width: auto;
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
  `];var yi=`casl:github:stars:${L.repoURL}`,bi=864e5,xi=`https://api.github.com/repos/${new URL(L.repoURL).pathname.replace(/^\/|\/$/g,``).replace(/\.git$/,``)}`;function Si(){try{let e=JSON.parse(localStorage.getItem(yi));return e&&Number.isSafeInteger(e.stars)&&e.stars>=0&&Number.isFinite(e.timestamp)?e:null}catch{return null}}async function Ci(){let e=Si(),t=e?Date.now()-e.timestamp:1/0;if(t>=0&&t<bi)return e.stars;try{let e=await fetch(xi,{signal:typeof AbortSignal.timeout==`function`?AbortSignal.timeout(5e3):void 0});if(!e.ok)throw Error(`Failed to retrieve GitHub stars`);let{stargazers_count:t}=await e.json();if(!Number.isSafeInteger(t)||t<0)throw Error(`Invalid GitHub star count`);try{localStorage.setItem(yi,JSON.stringify({stars:t,timestamp:Date.now()}))}catch{}return t}catch{return e?e.stars:null}}var wi=null;function Ti(){return wi??(wi=Ci()),wi}var Ei=new Intl.NumberFormat(`en-US`,{notation:`compact`,maximumFractionDigits:1}),Di=class extends I{connectedCallback(){super.connectedCallback(),Ti().then(e=>{this.stars=e})}render(){return A`
      <a
        href="${L.repoURL}"
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
        <span class="star-count">${this.stars==null?`—`:Ei.format(this.stars)}</span>
      </a>
    `}};Y(Di,`cName`,`github-button`),Y(Di,`properties`,{stars:{type:Number}}),Di.styles=g`
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
`;var Oi=`casl:ability:monthly-downloads`,ki=864e5,Ai=`https://api.npmjs.org/downloads/point/last-month/@casl/ability`;function ji(){try{let e=JSON.parse(localStorage.getItem(Oi));return e&&Number.isSafeInteger(e.downloads)&&e.downloads>=0&&Number.isFinite(e.timestamp)?e:null}catch{return null}}async function Mi(){let e=ji(),t=e?Date.now()-e.timestamp:1/0;if(t>=0&&t<ki)return e.downloads;try{let e=await fetch(Ai,{signal:typeof AbortSignal.timeout==`function`?AbortSignal.timeout(5e3):void 0});if(!e.ok)throw Error(`Failed to retrieve npm downloads`);let{downloads:t}=await e.json();if(!Number.isSafeInteger(t)||t<0)throw Error(`Invalid npm download count`);try{localStorage.setItem(Oi,JSON.stringify({downloads:t,timestamp:Date.now()}))}catch{}return t}catch{return e?e.downloads:null}}var Ni=null;function Pi(){return Ni??(Ni=Mi()),Ni}var Fi=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2018%207'%20width='36'%20height='14'%3e%3cpath%20fill='%23fff'%20d='M0%200h18v6H9v1H5V6H0V0zm1%201v4h2V2h1v3h1V1H1zm5%200v5h2V5h2V1H6zm2%201h1v2H8V2zm3-1v4h2V2h1v3h1V2h1v3h1V1h-6z'/%3e%3c/svg%3e`,Ii=new Intl.NumberFormat(`en-US`,{notation:`compact`,maximumFractionDigits:1}),Li=class extends I{connectedCallback(){super.connectedCallback(),Pi().then(e=>{this.downloads=e})}render(){return A`
      <a
        href="https://www.npmjs.com/package/@casl/ability"
        target="_blank"
        rel="noopener"
        title="@casl/ability downloads over the last 30 available days"
      >
        <span class="label"><img src="${Fi}" alt="npm" width="24" height="9"></span>
        <span class="download-count">${this.downloads==null?`—`:`${Ii.format(this.downloads)}/month`}</span>
      </a>
    `}};Y(Li,`cName`,`npm-downloads-button`),Y(Li,`properties`,{downloads:{type:Number}}),Li.styles=g`
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
`;var Ri={dropdown(e){let t=e.hints.title||e.doc.title,n=e.hints.headings||e.doc.headings||[];return A`
      <div class="row item">
        <div class="col title">
          <app-link to="page" .params="${e.doc}">${B(t)}</app-link>
        </div>
        <div class="col">
          ${n.map(t=>A`
            <app-link to="page" .params="${e.doc}" hash="${t.id}">
              ${B(t.title)}
            </app-link>
          `)}
        </div>
      </div>
    `},page(e){let t=e.hints.title||e.doc.title;return A`
      ${(e.hints.headings||e.doc.headings||[]).map(n=>A`
        <app-link class="item" to="page" .params="${e.doc}" hash="${n.id}">
          ${B(`${t} › ${n.title}`)}
        </app-link>
      `)}
    `}};function zi(e,t){if(!e)return``;if(!e.length)return A`
      <div class="suggestions ${t}">
        ${q(`search.noMatch`)}
      </div>
    `;let n=Ri[t||`dropdown`];return A`
    <div class="suggestions ${t}">
      ${e.map(([e,t])=>A`
        <h5>${q(`categories.${e}`)}</h5>
        ${t.map(n)}
      `)}
    </div>
  `}var Bi=A`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px">
    <path d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z" />
  </svg>
`,Vi=A`
  <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
    <polyline points='268 112 412 256 268 400' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
    <line x1='392' y1='256' x2='100' y2='256' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/>
  </svg>
`,Hi=class extends I{constructor(){super(),this.value=``,this.suggestionsType=`dropdown`,this.compact=!1,this.toggler=!1,this._suggestions=null,this._clickOutside=this._clickOutside.bind(this),this._search=rn(this._search,500),this._unwatchRouter=null}_setValue(e){this.value=e.trim(),this.dispatchEvent(new CustomEvent(`update`,{detail:this.value}))}connectedCallback(){super.connectedCallback(),document.addEventListener(`click`,this._clickOutside,!1),this._unwatchRouter=K.observe(()=>this._reset())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener(`click`,this._clickOutside,!1),this._unwatchRouter()}_reset(){this.value&&(this._setValue(``),this._suggestions=null,this.dispatchEvent(new CustomEvent(`reset`)))}_clickOutside(e){this.shadowRoot.contains(e.target)||(this._suggestions=null)}async _search(){if(!this.value){this._suggestions=null;return}let e=(await hr(`page`).search(vn(),this.value,{prefix:!0})).reduce((e,t)=>{let n=t.doc.categories[0];return e.has(n)||e.set(n,[]),e.get(n).push(t),e},new Map);this._suggestions=Array.from(e)}_updateValue(e){this._setValue(e.target.value),this._search()}_emitIconClick(){this.dispatchEvent(new CustomEvent(`click-icon`))}render(){return A`
      <div class="search-form ${this.compact?`compact`:``}">
        <label class="input">
          <div class="icon" @click="${this._emitIconClick}">
            ${this.compact||!this.toggler?Bi:Vi}
          </div>

          <input
            autocomplete="off"
            autocorrect="off"
            placeholder="${q(`search.placeholder`)}"
            .value="${this.value}"
            @input="${this._updateValue}"
          >
        </label>
        ${zi(this._suggestions,this.suggestionsType)}
      </div>
    `}};Y(Hi,`cName`,`app-quick-search`),Y(Hi,`properties`,{value:{type:String},suggestionsType:{type:String},compact:{type:Boolean},toggler:{type:Boolean},_suggestions:{type:Array}}),Hi.styles=[Ir,g`
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
  `];var Ui=class extends I{render(){return A`
      <select @change="${this._changeLang}">
        <option value="ru">ru</option>
        <option value="uk">uk</option>
      </select>
    `}_changeLang(e){let t=e.target.value,n=K.current().response;K.navigate({url:K.url({name:n.name,params:{...n.params,lang:t},query:n.location.query,hash:n.location.hash})})}};Y(Ui,`cName`,`app-lang-picker`);var Wi=class extends I{render(){return A`
      <div class="options md">
        <a href="https://github.com/sponsors/stalniy" target="_blank" rel="noopener">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
          </svg>
          GitHub Sponsors
        </a>
      </div>
    `}};Y(Wi,`cName`,`one-time-donations`),Wi.styles=[Rr,g`
    .options {
      margin: 20px 0;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    svg {
      color: #db61a2;
      flex-shrink: 0;
    }
  `];var Gi=class extends I{constructor(){super(),this.items=null,this.type=`page`,this.categories=null}render(){return A`
      <nav>
        ${(this.categories||Object.keys(this.items)).map(e=>A`
          <h3>${q(`categories.${e}`)}</h3>
          <ul>
            ${this.items[e].map(e=>A`
              <li><app-link nav to="${this.type}" .params="${e}">${e.title}</app-link></li>
            `)}
          </ul>
        `)}
      </nav>
    `}};Y(Gi,`cName`,`pages-by-categories`),Y(Gi,`properties`,{items:{type:Object},type:{type:String},categories:{type:Array}}),Gi.styles=g`
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
`;var Ki=class extends I{constructor(){super(),this.type=`info`,this.message=``}render(){return A`${J(this.message)}`}};Y(Ki,`cName`,`app-notification`),Y(Ki,`properties`,{type:{type:String},message:{type:String}}),Ki.styles=g`
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
`;var qi=function(e,t,n){return e.addEventListener(t,n,!1),function(){return e.removeEventListener(t,n,!1)}};try{var Ji=Object.defineProperty({},"passive",{get:function(){return qi=function(e,t,n){return e.addEventListener(t,n,{passive:!0}),function(){return e.removeEventListener(t,n,{passive:!0})}},!0}});window.addEventListener(`test`,null,Ji)}catch{}var Yi=function(e,t,n){return qi(e,t,n)},Xi=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},Zi=window.document.documentElement,Qi=function(){for(var e=[`Webkit`,`Khtml`,`Moz`,`ms`,`O`],t=0;t<e.length;t++)if(e[t]+`Opacity`in Zi.style)return`-`+e[t].toLowerCase()+`-`;return``}();function Z(e,t,n){e.style[Qi+t]=n}var $i=window.navigator.msPointerEnabled,ea=window.document.documentElement,ta={start:$i?`MSPointerDown`:`touchstart`,move:$i?`MSPointerMove`:`touchmove`,end:$i?`MSPointerUp`:`touchend`,cancel:`touchcancel`},Q={end:`webkitTransitionEnd`in ea.style?`webkitTransitionEnd`:`transitionend`},na=window.document,ra=na.documentElement,ia=!1,aa=function(){function e(e){e===void 0&&(e={}),this.panel=e.panel,this.menu=e.menu,this.t=e.eventsEmitter||this.panel,this.i=0,this.s=0,this.o=!1,this.h=!1,this.u=!1,this.l=!1,this.v=e.touch===void 0||!!e.touch,this.p=e.side||`left`,this.m=e.easing||`ease`,this.M=parseInt(e.duration,10)||300,this.T=parseInt(e.tolerance,10)||70,this.g=parseInt(e.padding,10)||.8*window.innerWidth,this.k=this.g,this.I=this.p===`right`?-1:1,this.k*=this.I,this.O(),this.v&&(this.P(),this.v=this.v!==`manual`)}var t=e.prototype;return t.O=function(){var e=this.panel.classList,t=this.menu.classList;e.contains(`slideout-panel`)||e.add(`slideout-panel`),e.contains(`slideout-panel-`+this.p)||e.add(`slideout-panel-`+this.p),t.contains(`slideout-menu`)||t.add(`slideout-menu`),t.contains(`slideout-menu-`+this.p)||t.add(`slideout-menu-`+this.p)},t.S=function(e){return this.t.dispatchEvent(new window.CustomEvent(e)),this},t.on=function(e,t,n){var r=this;return this.t.addEventListener(e,t,n),function(){return r.t.removeEventListener(e,t,n)}},t.open=function(){this.S(`beforeopen`),ra.classList.contains(`slideout-open`)||ra.classList.add(`slideout-open`),this.X(),this.j(this.k),this.u=!0;var e=this;return this.panel.addEventListener(Q.end,(function t(){e.panel.removeEventListener(Q.end,t),Z(e.panel,`transition`,``),e.S(`open`)})),this},t.close=function(){if(!this.isOpen()&&!this.o)return this;this.S(`beforeclose`),this.X(),this.j(0),this.u=!1;var e=this;return this.panel.addEventListener(Q.end,(function t(){e.panel.removeEventListener(Q.end,t),ra.classList.remove(`slideout-open`),Z(e.panel,`transition`,``),Z(e.panel,`transform`,``),e.S(`close`)})),this},t.toggle=function(){return this.isOpen()?this.close():this.open()},t.isOpen=function(){return this.u},t.j=function(e){this.s=e,Z(this.panel,`transform`,`translateX(`+e+`px)`)},t.X=function(){Z(this.panel,`transition`,Qi+`transform `+this.M+`ms `+this.m)},t.P=function(){var e,t,n,r,i,a,o=this,s=function(){ia=!1};this.D=(n=function(){o.h||(clearTimeout(e),ia=!0,e=setTimeout(s,250))},i=!1,a=function(){n.call(t,r),i=!1},Yi(t=na,`scroll`,(function(e){r=e,i||(Xi(a),i=!0)}))),this.K=Yi(this.panel,ta.start,(function(e){e.touches!==void 0&&(o.h=!1,o.o=!1,o.i=e.touches[0].pageX,o.l=!o.v||!o.isOpen()&&o.menu.clientWidth!==0)})),this.U=Yi(this.panel,ta.cancel,(function(){o.h=!1,o.o=!1})),this.W=Yi(this.panel,ta.end,(function(){if(o.h){if(o.S(`translateend`),o.o&&Math.abs(o.s)>o.T)o.open();else if(o.k-Math.abs(o.s)<=o.T/2){o.X(),o.j(o.k);var e=o;o.panel.addEventListener(Q.end,(function t(){this.panel.removeEventListener(Q.end,t),Z(e.panel,`transition`,``)}))}else o.close()}o.h=!1})),this.q=Yi(this.panel,ta.move,(function(e){if(!(ia||o.l||e.touches===void 0||function(e){for(var t=e;t.parentNode;){if(t.getAttribute(`data-slideout-ignore`)!==null)return t;t=t.parentNode}return null}(e.target))){var t=e.touches[0].clientX-o.i,n=t;if(o.s=t,!(Math.abs(n)>o.g||Math.abs(t)<=20)){o.o=!0;var r=t*o.I;o.u&&r>0||!o.u&&r<0||(o.h||o.S(`translatestart`),r<=0&&(n=t+o.g*o.I,o.o=!1),o.h&&ra.classList.contains(`slideout-open`)||ra.classList.add(`slideout-open`),Z(o.panel,`transform`,`translateX(`+n+`px)`),o.S(`translate`,n),o.h=!0)}}}))},t.enableTouch=function(){return this.v=!0,this},t.disableTouch=function(){return this.v=!1,this},t.destroy=function(){this.close(),this.K(),this.U(),this.W(),this.q(),this.D()},e}(),oa=class extends I{constructor(){super(),this._drawer=null,this.isOpen=!1,this.disabled=!1,this._scrollTop=0}open(){this.isOpen=!0}close(){this.isOpen=!1}toggle(){this.isOpen=!this.isOpen}_createDrawer(){let[e,t]=this.shadowRoot.children;this._drawer=new aa({menu:e,panel:t,eventsEmitter:this,padding:270,touch:!1});let n=()=>this._drawer.close();this._drawer.on(`beforeopen`,()=>{this.isOpen=!0,this._scrollTop=window.pageYOffset,e.classList.add(`open`),t.style.top=`${-this._scrollTop}px`,t.addEventListener(`mousedown`,n,!1),t.addEventListener(`touchstart`,n,!1),window.scroll(0,0)}),this._drawer.on(`close`,()=>{this.isOpen=!1,e.classList.remove(`open`),t.style.top=``,window.scroll(0,this._scrollTop),t.removeEventListener(`mousedown`,n,!1),t.removeEventListener(`touchstart`,n,!1)})}updated(e){if(this._drawer||this._createDrawer(),this.isOpen!==this._drawer.isOpen()){let e=this.isOpen?`open`:`close`;this._drawer[e]()}if(e.has(`disabled`)){let e=this.disabled?`disableTouch`:`enableTouch`;this._drawer[e]()}}disconnectedCallback(){super.disconnectedCallback(),this._drawer.destroy(),this._drawer=null}render(){return A`
      <div class="menu">
        <slot name="menu"></slot>
      </div>
      <div class="panel">
        <slot></slot>
      </div>
    `}};Y(oa,`cName`,`menu-drawer`),Y(oa,`properties`,{isOpen:{type:Boolean},disabled:{type:Boolean}}),oa.styles=g`
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
`;function sa(){return`v7`}async function ca(){return(await cn(`/versions.txt`,{format:`txtArrayJSON`,cache:!0})).body}function la(e){return window.location.href.replace(`/${sa()}/`,`/${e}/`)}function ua(e){window.location.href=la(e.target.value)}var da=class extends I{constructor(){super(),this._versions=[],this._currentVersion=sa(),this._currentVersion&&this._versions.push({number:this._currentVersion})}async connectedCallback(){super.connectedCallback();let e=await ca();this._versions=e.slice(0).reverse(),this.requestUpdate()}render(){return A`
      <select @change=${ua}>
        ${this._versions.map(e=>A`
          <option .selected=${e.number===this._currentVersion}>${e.number}</option>
        `)}
      </select>
    `}};Y(da,`cName`,`versions-select`),da.styles=g`
  :host {
    display: block;
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
`;var fa=class extends I{constructor(){super(),this._versions=[],this._currentVersion=sa()||`unknown`}async connectedCallback(){super.connectedCallback(),this._unwatchRouter=K.observe(()=>this.requestUpdate()),this._versions=await ca(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}render(){let e=this._versions[this._versions.length-1];return!e||e.number===this._currentVersion?A``:A`
      <div class="alert alert-warning">
        ${J(`oldVersionAlert`,{latestVersion:e.number,currentVersion:this._currentVersion,latestVersionUrl:la(e.number)})}
      </div>
    `}};Y(fa,`cName`,`old-version-alert`),fa.styles=[Rr,Hr,g`
    a {
      color: inherit;
    }
  `];var pa=[Pr,Lr,Wr,Kr,qr,Yr,Xr,ui,vi,di,Hi,Ui,Di,Li,Gi,Wi,Ki,oa,da,fa];function ma(e){let t=document.querySelector(e);pa.forEach(e=>customElements.define(e.cName,e));let n=0;return K.observe(async e=>{let r=++n,i=e.response.params.lang||_n;vn()!==i&&await bn(i),r===n&&(ti(e),t.ready=!0)}),t}try{self[`workbox:window:7.4.0`]&&_()}catch{}function ha(e,t){return new Promise((function(n){var r=new MessageChannel;r.port1.onmessage=function(e){n(e.data)},e.postMessage(t,[r.port2])}))}function ga(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function _a(e,t,n){return t&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,ba(r.key),r)}}(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function va(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(e){if(typeof e==`string`)return ga(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ga(e,t):void 0}}(e))||t){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ya(e,t){return ya=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},ya(e,t)}function ba(e){var t=function(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return String(e)}(e,`string`);return typeof t==`symbol`?t:t+``}try{self[`workbox:core:7.4.0`]&&_()}catch{}var xa=function(){var e=this;this.promise=new Promise((function(t,n){e.resolve=t,e.reject=n}))};function Sa(e,t){var n=location.href;return new URL(e,n).href===new URL(t,n).href}var Ca=function(e,t){this.type=e,Object.assign(this,t)};function $(e,t,n){return e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e}function wa(){}var Ta={type:`SKIP_WAITING`};function Ea(e,t){return e&&e.then?e.then(wa):Promise.resolve()}var Da=function(e){function t(t,n){var r,i;return n===void 0&&(n={}),(r=e.call(this)||this).nn={},r.tn=0,r.rn=new xa,r.en=new xa,r.on=new xa,r.un=0,r.an=new Set,r.cn=function(){var e=r.fn,t=e.installing;r.tn>0||!Sa(t.scriptURL,r.sn.toString())||performance.now()>r.un+6e4?(r.vn=t,e.removeEventListener(`updatefound`,r.cn)):(r.hn=t,r.an.add(t),r.rn.resolve(t)),++r.tn,t.addEventListener(`statechange`,r.ln)},r.ln=function(e){var t=r.fn,n=e.target,i=n.state,a=n===r.vn,o={sw:n,isExternal:a,originalEvent:e};!a&&r.mn&&(o.isUpdate=!0),r.dispatchEvent(new Ca(i,o)),i===`installed`?r.wn=self.setTimeout((function(){i===`installed`&&t.waiting===n&&r.dispatchEvent(new Ca(`waiting`,o))}),200):i===`activating`&&(clearTimeout(r.wn),a||r.en.resolve(n))},r.yn=function(e){var t=r.hn,n=t!==navigator.serviceWorker.controller;r.dispatchEvent(new Ca(`controlling`,{isExternal:n,originalEvent:e,sw:t,isUpdate:r.mn})),n||r.on.resolve(t)},r.gn=(i=function(e){var t=e.data,n=e.ports,i=e.source;return $(r.getSW(),(function(){r.an.has(i)&&r.dispatchEvent(new Ca(`message`,{data:t,originalEvent:e,ports:n,sw:i}))}))},function(){var e=[...arguments];try{return Promise.resolve(i.apply(this,e))}catch(e){return Promise.reject(e)}}),r.sn=t,r.nn=n,navigator.serviceWorker.addEventListener(`message`,r.gn),r}var n,r=e;(n=t).prototype=Object.create(r.prototype),n.prototype.constructor=n,ya(n,r);var i=t.prototype;return i.register=function(e){var t=(e===void 0?{}:e).immediate,n=t!==void 0&&t;try{var r=this;return $(function(e,t){var n=e();return n&&n.then?n.then(t):t(n)}((function(){if(!n&&document.readyState!==`complete`)return Ea(new Promise((function(e){return window.addEventListener(`load`,e)})))}),(function(){return r.mn=!!navigator.serviceWorker.controller,r.dn=r.pn(),$(r.bn(),(function(e){r.fn=e,r.dn&&(r.hn=r.dn,r.en.resolve(r.dn),r.on.resolve(r.dn),r.dn.addEventListener(`statechange`,r.ln,{once:!0}));var t=r.fn.waiting;return t&&Sa(t.scriptURL,r.sn.toString())&&(r.hn=t,Promise.resolve().then((function(){r.dispatchEvent(new Ca(`waiting`,{sw:t,wasWaitingBeforeRegister:!0}))})).then((function(){}))),r.hn&&(r.rn.resolve(r.hn),r.an.add(r.hn)),r.fn.addEventListener(`updatefound`,r.cn),navigator.serviceWorker.addEventListener(`controllerchange`,r.yn),r.fn}))})))}catch(e){return Promise.reject(e)}},i.update=function(){try{return this.fn?$(Ea(this.fn.update())):$()}catch(e){return Promise.reject(e)}},i.getSW=function(){return this.hn===void 0?this.rn.promise:Promise.resolve(this.hn)},i.messageSW=function(e){try{return $(this.getSW(),(function(t){return ha(t,e)}))}catch(e){return Promise.reject(e)}},i.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&ha(this.fn.waiting,Ta)},i.pn=function(){var e=navigator.serviceWorker.controller;return e&&Sa(e.scriptURL,this.sn.toString())?e:void 0},i.bn=function(){try{var e=this;return $(function(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}((function(){return $(navigator.serviceWorker.register(e.sn,e.nn),(function(t){return e.un=performance.now(),t}))}),(function(e){throw e})))}catch(e){return Promise.reject(e)}},_a(t,[{key:`active`,get:function(){return this.en.promise}},{key:`controlling`,get:function(){return this.on.promise}}])}(function(){function e(){this.Pn=new Map}var t=e.prototype;return t.addEventListener=function(e,t){this.jn(e).add(t)},t.removeEventListener=function(e,t){this.jn(e).delete(t)},t.dispatchEvent=function(e){e.target=this;for(var t,n=va(this.jn(e.type));!(t=n()).done;)(0,t.value)(e)},t.jn=function(e){return this.Pn.has(e)||this.Pn.set(e,new Set),this.Pn.get(e)},e}());function Oa(e={}){if(!(`serviceWorker`in navigator))return;let t=new Da(`/v7/sw.js`,{updateViaCache:`none`,type:`classic`});t.addEventListener(`waiting`,()=>{navigator.serviceWorker.controller&&e.onUpdate&&e.onUpdate(()=>t.messageSkipWaiting())});let n=e=>{e.isUpdate&&(t.removeEventListener(`controlling`,n),window.location.reload())};return t.addEventListener(`controlling`,n),t.register().then(()=>Aa(t)).catch(e=>console.error(`Error during service worker registration:`,e))}var ka=3e5;function Aa(e){let t=Date.now();document.addEventListener(`visibilitychange`,()=>{document.visibilityState!==`visible`||Date.now()-t<ka||(t=Date.now(),e.update().catch(()=>{}))})}window.__isAppExecuted__=!0;var ja=ma(`casl-docs`),Ma=document.getElementById(`prerender-fallback`);ja.addEventListener(`route-ready`,({detail:e})=>{Ma&&e.path===`${window.location.pathname}${window.location.search}${window.location.hash}`&&(Ma.hidden=!0,Ma.setAttribute(`aria-hidden`,`true`),Ma.setAttribute(`inert`,``))}),Oa({onUpdate(e){ja.notify(`updateAvailable`,{onClick:e})}}),window.onShareThisLoaded=()=>{window.__sharethis__.config[`sticky-share-buttons`].id=`share-buttons`};
//# sourceMappingURL=index-BfLtY9u6.js.map