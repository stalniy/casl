var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=globalThis,r=n.ShadowRoot&&(n.ShadyCSS===void 0||n.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap,o=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(r&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=a.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&a.set(t,e))}return e}toString(){return this.cssText}},s=e=>new o(typeof e==`string`?e:e+``,void 0,i),c=(e,...t)=>new o(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,i),l=(e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let r of t){let t=document.createElement(`style`),i=n.litNonce;i!==void 0&&t.setAttribute(`nonce`,i),t.textContent=r.cssText,e.appendChild(t)}},u=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return s(t)})(e):e,d,{is:f,defineProperty:p,getOwnPropertyDescriptor:m,getOwnPropertyNames:h,getOwnPropertySymbols:g,getPrototypeOf:v}=Object,y=globalThis,b=y.trustedTypes,x=b?b.emptyScript:``,ee=y.reactiveElementPolyfillSupport,S=(e,t)=>e,te={toAttribute(e,t){switch(t){case Boolean:e=e?x:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ne=(e,t)=>!f(e,t),re={attribute:!0,type:String,converter:te,reflect:!1,useDefault:!1,hasChanged:ne};(d=Symbol).metadata??(d.metadata=Symbol(`metadata`)),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);var C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=re){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&p(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=m(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??re}static _$Ei(){if(this.hasOwnProperty(S(`elementProperties`)))return;let e=v(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(S(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S(`properties`))){let e=this.properties,t=[...h(e),...g(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(u(e))}else e!==void 0&&t.push(u(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?te:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?te:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??(n=a.getPropertyOptions(e)),!((n.hasChanged??ne)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:`open`},C[S(`elementProperties`)]=new Map,C[S(`finalized`)]=new Map,ee?.({ReactiveElement:C}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push(`2.1.2`);var w=globalThis,ie=e=>e,ae=w.trustedTypes,oe=ae?ae.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,se=`$lit$`,T=`lit$${Math.random().toFixed(9).slice(2)}$`,ce=`?`+T,le=`<${ce}>`,E=document,ue=()=>E.createComment(``),de=e=>e===null||typeof e!=`object`&&typeof e!=`function`,fe=Array.isArray,pe=e=>fe(e)||typeof e?.[Symbol.iterator]==`function`,me=`[ 	
\f\r]`,he=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ge=/-->/g,_e=/>/g,D=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ve=/'/g,ye=/"/g,be=/^(?:script|style|textarea|title)$/i,O=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),k=Symbol.for(`lit-noChange`),A=Symbol.for(`lit-nothing`),xe=new WeakMap,j=E.createTreeWalker(E,129);function Se(e,t){if(!fe(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return oe===void 0?t:oe.createHTML(t)}var Ce=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=he;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===he?c[1]===`!--`?o=ge:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=D):(be.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=D):o=_e:o===D?c[0]===`>`?(o=i??he,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?D:c[3]===`"`?ye:ve):o===ye||o===ve?o=D:o===ge||o===_e?o=he:(o=D,i=void 0);let d=o===D&&e[t+1].startsWith(`/>`)?` `:``;a+=o===he?n+le:l>=0?(r.push(s),n.slice(0,l)+se+n.slice(l)+T+d):n+T+(l===-2?t:d)}return[Se(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},we=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Ce(t,n);if(this.el=e.createElement(l,r),j.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=j.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(se)){let t=u[o++],n=i.getAttribute(e).split(T),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Oe:r[1]===`?`?ke:r[1]===`@`?Ae:De}),i.removeAttribute(e)}else e.startsWith(T)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(be.test(i.tagName)){let e=i.textContent.split(T),t=e.length-1;if(t>0){i.textContent=ae?ae.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],ue()),j.nextNode(),c.push({type:2,index:++a});i.append(e[t],ue())}}}else if(i.nodeType===8){if(i.data===ce)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(T,e+1))!==-1;)c.push({type:7,index:a}),e+=T.length-1}}a++}}static createElement(e,t){let n=E.createElement(`template`);return n.innerHTML=e,n}};function M(e,t,n=e,r){if(t===k)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=de(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??(n._$Co=[]))[r]=i),i!==void 0&&(t=M(e,i._$AS(e,t.values),i,r)),t}var Te=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??E).importNode(t,!0);j.currentNode=r;let i=j.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Ee(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new je(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=j.nextNode(),a++)}return j.currentNode=E,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Ee=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=M(this,e,t),de(e)?e===A||e==null||e===``?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==k&&this._(e):e._$litType$===void 0?e.nodeType===void 0?pe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&de(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=we.createElement(Se(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Te(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=xe.get(e.strings);return t===void 0&&xe.set(e.strings,t=new we(e)),t}k(t){fe(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(ue()),this.O(ue()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ie(e).nextSibling;ie(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},De=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=A}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=M(this,e,t,0),a=!de(e)||e!==this._$AH&&e!==k,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=M(this,r[n+o],t,o),s===k&&(s=this._$AH[o]),a||(a=!de(s)||s!==this._$AH[o]),s===A?e=A:e!==A&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Oe=class extends De{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}},ke=class extends De{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}},Ae=class extends De{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=M(this,e,t,0)??A)===k)return;let n=this._$AH,r=e===A&&n!==A||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==A&&(n===A||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},je=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}},Me={M:se,P:T,A:ce,C:1,L:Ce,R:Te,D:pe,V:M,I:Ee,H:De,N:ke,U:Ae,B:Oe,F:je},Ne=w.litHtmlPolyfillSupport;Ne?.(we,Ee),(w.litHtmlVersions??(w.litHtmlVersions=[])).push(`3.3.3`);var Pe=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Ee(t.insertBefore(ue(),e),e,void 0,n??{})}return i._$AI(e),i},Fe=globalThis,N=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};N._$litElement$=!0,N.finalized=!0,Fe.litElementHydrateSupport?.({LitElement:N});var Ie=Fe.litElementPolyfillSupport;Ie?.({LitElement:N}),(Fe.litElementVersions??(Fe.litElementVersions=[])).push(`4.2.2`);var Le={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Re=e=>(...t)=>({_$litDirective$:e,values:t}),ze=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:Be}=Me,Ve=e=>e,He=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t,Ue=e=>e?._$litType$?.h!=null,We=e=>e.strings===void 0,Ge=()=>document.createComment(``),Ke=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Be(r.insertBefore(Ge(),i),r.insertBefore(Ge(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Ve(e).nextSibling;Ve(r).insertBefore(e,i),e=t}}}return n},qe={},Je=(e,t=qe)=>e._$AH=t,Ye=e=>e._$AH,Xe=e=>{e._$AR()},Ze=e=>Ue(e)?e._$litType$.h:e.strings,Qe=Re(class extends ze{constructor(e){super(e),this.et=new WeakMap}render(e){return[e]}update(e,[t]){let n=He(this.it)?Ze(this.it):null,r=He(t)?Ze(t):null;if(n!==null&&(r===null||n!==r)){let t=Ye(e).pop(),r=this.et.get(n);r===void 0&&(r=Pe(A,document.createDocumentFragment()),r.setConnected(!1),this.et.set(n,r)),Je(r,[t]),Ke(r,void 0,t)}if(r!==null){if(n===null||n!==r){let t=this.et.get(r);if(t!==void 0){let n=Ye(t).pop();Xe(e),Ke(e,void 0,n),Je(e,[n])}}this.it=t}else this.it=void 0;return this.render(t)}}),$e={items:[{name:`learn`,route:!1,children:[{heading:`docs`},{name:`guide`,page:`guide/intro`},{name:`api`},{name:`examples`,url:`https://github.com/stalniy/casl-examples`},{name:`cookbook`,page:`cookbook/intro`}]},{name:`ecosystem`,route:!1,children:[{heading:`packages`},{name:`pkg-prisma`,page:`package/casl-prisma`},{name:`pkg-mongoose`,page:`package/casl-mongoose`},{name:`pkg-angular`,page:`package/casl-angular`},{name:`pkg-react`,page:`package/casl-react`},{name:`pkg-vue`,page:`package/casl-vue`},{heading:`help`},{name:`questions`,url:`https://stackoverflow.com/questions/tagged/casl`},{name:`chat`,url:`https://github.com/stalniy/casl/discussions`},{heading:`news`},{name:`tweeter`,url:`https://twitter.com/sergiy_stotskiy`},{name:`blog`,url:`https://sergiy-stotskiy.medium.com`}]},{name:`consulting`},{name:`about`,route:!1,children:[{name:`privacy`}]},{name:`support`,route:!1,children:[{name:`support-casl`},{name:`support-ukraine`,url:`https://prytulafoundation.org/en/home/support_page`,rel:`noopener noreferrer`}]}],footer:[{icon:`github`,url:`https://github.com/stalniy/casl`},{icon:`twitter`,url:`https://twitter.com/sergiy_stotskiy`},{icon:`medium`,url:`https://sergiy-stotskiy.medium.com`}]},et=function(e,t){return e.methods.pathname(t)};function tt(e){"@babel/helpers - typeof";return tt=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},tt(e)}function nt(e,t){if(tt(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(tt(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function rt(e){var t=nt(e,`string`);return tt(t)==`symbol`?t:t+``}function P(e,t,n){return(t=rt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var it=`/`,at=e=>e,ot=/^[$_\p{ID_Start}]$/u,st=/^[$\u200c\u200d\p{ID_Continue}]$/u;function F(e){return e.replace(/[.+*?^${}()[\]|/\\]/g,`\\$&`)}var I=class extends TypeError{constructor(e,t){super(e+(t?`: ${t}`:``)+`; visit https://git.new/pathToRegexpError for info`),P(this,`originalPath`,void 0),this.originalPath=t}};function ct(e,t={}){let{encodePath:n=at}=t,r=[...e],i=0;function a(t){let o=[],s=``;function c(){s&&(o.push({type:`text`,value:n(s)}),s=``)}for(;i<r.length;){let n=r[i++];if(n===t)return c(),o;if(n===`\\`){if(i===r.length)throw new I(`Unexpected end after \\ at index ${i}`,e);s+=r[i++]}else if(n===`:`||n===`*`){let t=n===`:`?`param`:`wildcard`,a=``;if(ot.test(r[i]))do a+=r[i++];while(st.test(r[i]));else if(r[i]===`"`){let t=i;for(;i<r.length;){if(r[++i]===`"`){i++,t=0;break}r[i]===`\\`&&i++,a+=r[i]}if(t)throw new I(`Unterminated quote at index ${t}`,e)}if(!a)throw new I(`Missing parameter name at index ${i}`,e);c(),o.push({type:t,name:a})}else if(n===`{`)c(),o.push({type:`group`,tokens:a(`}`)});else{if(`}()[]+?!`.includes(n))throw new I(`Unexpected ${n} at index ${i-1}`,e);s+=n}}if(t)throw new I(`Unexpected end at index ${i}, expected ${t}`,e);return c(),o}return{tokens:a(``),originalPath:e}}function lt(e,t={}){let{encode:n=encodeURIComponent,delimiter:r=it}=t,i=ut((typeof e==`object`?e:ct(e,t)).tokens,r,n);return function(e={}){let t=[],n=i(e,t);if(t.length)throw TypeError(`Missing parameters: ${t.join(`, `)}`);return n}}function ut(e,t,n){let r=e.map(e=>dt(e,t,n));return(e,t)=>{let n=``;for(let i of r)n+=i(e,t);return n}}function dt(e,t,n){if(e.type===`text`)return()=>e.value;if(e.type===`group`){let r=ut(e.tokens,t,n);return(e,t)=>{let n=t.length,i=r(e,t);return t.length===n?i:(t.length=n,``)}}let r=n||at;return e.type===`wildcard`&&n!==!1?(n,i)=>{let a=n[e.name];if(a==null)return i.push(e.name),``;if(!Array.isArray(a)||a.length===0)throw TypeError(`Expected "${e.name}" to be a non-empty array`);let o=``;for(let n=0;n<a.length;n++){if(typeof a[n]!=`string`)throw TypeError(`Expected "${e.name}/${n}" to be a string`);n>0&&(o+=t),o+=r(a[n])}if(!o)throw TypeError(`Expected "${e.name}" to be a non-empty array`);return o}:(t,n)=>{let i=t[e.name];if(i==null)return n.push(e.name),``;if(typeof i!=`string`||i.length===0)throw TypeError(`Expected "${e.name}" to be a non-empty string`);return r(i)}}function ft(e,t={}){let{delimiter:n=it,end:r=!0,sensitive:i=!1,trailing:a=!0}=t,o=[],s=``,c=0;function l(e){if(Array.isArray(e)){for(let t of e)l(t);return}let r=typeof e==`object`?e:ct(e,t);pt(r.tokens,0,[],e=>{if(c>=256)throw new I(`Too many path combinations`,r.originalPath);c>0&&(s+=`|`),s+=mt(e,n,o,r.originalPath,a),c++})}l(e);let u=`^(?:${s})`;return u+=r?`$`:`(?=`+F(n)+`|$)`,{regexp:new RegExp(u,i?``:`i`),keys:o}}function pt(e,t,n,r){for(;t<e.length;){let i=e[t++];if(i.type===`group`){let a=n.length;pt(i.tokens,0,n,n=>pt(e,t,n,r)),n.length=a}else n.push(i)}r(n)}function mt(e,t,n,r,i){let a=``,o=``,s=!1,c=!1,l=``,u=0;function d(t){for(;t<e.length;)if(e[t++].type===`wildcard`)return!0;return!1}function f(n){let r=``;for(;n<e.length;){let i=e[n++];if(i.type!==`text`)return r;if(i.value.includes(t))break;r+=i.value}}for(;u<e.length;){let i=e[u++];if(i.type===`text`){let e=F(i.value);a+=e,l+=e,o+=i.value,i.value.includes(t)&&(c=!1)}else if(i.type===`param`||i.type===`wildcard`){if(a&&!o)throw new I(`Missing text before "${i.name}" ${i.type}`,r);if(n.push(i),i.type===`param`){if(c){let e=ht(t,o);a+=`(${e}+?|${e}*${F(o)})`}else{let e=f(u);a+=e?`(?=(${ht(t,``)}+?)${F(e)})(?:\\${n.length})`:`(${ht(t,``)}+)`}}else s&&(a+=`)${l}`),s=d(u),a+=s?`(?=([^]+?)`:`([^]+)`,c=!0,l=``;l+=`(?:\\${n.length})`,o=``}else throw TypeError(`Unknown token type: ${i.type}`)}return i&&!o.endsWith(t)&&(a+=`(?:`+F(t)+`$)?`),a}function ht(e,t){return t.length>e.length?ht(t,e):(e===t&&(t=``),t.length>1?`(?:(?!${F(e)}|${F(t)})[^])`:e.length>1?`(?:(?!${F(e)})[^${F(t)}])`:`[^${F(e+t)}]`)}function gt(e,t,n){let r=ft(e,n);return t.push(...r.keys),r.regexp}gt.compile=e=>(t,n)=>lt(e,n)(t);var _t=function(e){return e.methods.resolve!==void 0},vt=function(e){return`externalURL`in e},yt=function(e,t){if(vt(e))return e;var n=e.name,r=e.params,i=e.query,a=e.hash;return{name:n,params:r,query:i,hash:a,state:e.state,url:`url`in e?e.url:t.url({name:n,params:r,query:i,hash:a})}},bt=function(e,t,n,r,i){var a=n||{},o=a.resolved,s=o===void 0?null:o,c=a.error,l=c===void 0?null:c,u={data:void 0,body:void 0,meta:void 0};for(var d in t)u[d]=t[d];if(!e.methods.respond)return u;var f=e.methods.respond({resolved:s,error:l,match:t,external:i});return f&&(u.meta=f.meta,u.body=f.body,u.data=f.data,f.redirect&&(u.redirect=yt(f.redirect,r))),u},xt=function(e,t,n){var r,i;n===void 0&&(n={});var a=(r=n.history,r===void 0?{}:r),o=n.sideEffects,s=n.external,c=(i=n.invisibleRedirects,i!==void 0&&i),l,u,d,f,p,m=[],h=[],g=[],v,y,b=function(){v=void 0,y=void 0},x=function(){v&&v(),b()},ee=function(){y&&y(),b()},S=function(e,t){return v=e,y=t,b},te=function(){p&&(p=void 0,m.forEach(function(e){e()}))},ne=function(e){h.forEach(function(t){t(e)})},re=function(e){g.splice(0).forEach(function(t){t(e)}),o&&o.forEach(function(t){t(e)})},C=function(e,t){if(!e.redirect||!c||vt(e.redirect)){d=e,f=t;var n={response:e,navigation:t,router:u};ne(n),re(n)}e.redirect!==void 0&&!vt(e.redirect)&&l.navigate(e.redirect,`replace`)},w=function(e,t,n,r,i){te(),n.finish();var a=bt(e,t,i,u,s);ee(),C(a,r)},ie=function(){m.length&&p===void 0&&(p=function(){l.cancel(),te(),x()},m.forEach(function(e){e(p)}))};return l=e(function(e){var n={action:e.action,previous:d},r=t.match(e.location);if(!r)e.finish(),ee();else{var i=r.route,a=r.match;_t(i)?(ie(),i.methods.resolve(a,s).then(function(e){return{resolved:e,error:null}},function(e){return{error:e,resolved:null}}).then(function(t){e.cancelled||w(i,a,e,n,t)})):w(i,a,e,n,null)}},a),u={route:t.route,history:l,external:s,observe:function(e,t){var n=(t||{}).initial,r=n===void 0||n;return h.push(e),d&&r&&e({response:d,navigation:f,router:u}),function(){h=h.filter(function(t){return t!==e})}},once:function(e,t){var n=(t||{}).initial;d&&(n===void 0||n)?e({response:d,navigation:f,router:u}):g.push(e)},cancel:function(e){return m.push(e),function(){m=m.filter(function(t){return t!==e})}},url:function(e){var t=e.name,n=e.params,r=e.hash,i=e.query,a;if(t){var o=u.route(t);o&&(a=et(o,n))}return l.url({pathname:a,hash:r,query:i})},navigate:function(e){x();var t=e.url,n=e.state,r=e.method;if(l.navigate({url:t,state:n},r),e.cancelled||e.finished)return S(e.cancelled,e.finished)},current:function(){return{response:d,navigation:f}},destroy:function(){l.destroy()}},l.current(),u},St=function(e){return e.charAt(0)===`/`?e:`/`+e},Ct=function(e){return e.charAt(e.length-1)===`/`?e:e+`/`},wt=function(e,t){return Ct(e)+t},Tt=function(e,t,n){n===void 0&&(n={path:``,keys:[]});var r=St(wt(n.path,e.path)),i=e.pathOptions||{},a=i.match,o=a===void 0?{}:a,s=i.compile,c=s===void 0?{}:s,l=o.end==null||o.end;e.children&&e.children.length&&(o.end=!1);var u=[],d=gt(St(e.path),u,o),f=u.map(function(e){return e.name});n.keys.length&&(f=n.keys.concat(f));var p=[],m=[];if(e.children)for(var h=0,g=e.children;h<g.length;h++){var v=g[h],y=Tt(v,t,{path:r,keys:f});p.push(y),m.push(y.public)}var b=gt.compile(r),x={public:{name:e.name,keys:f,parent:void 0,children:m,methods:{resolve:e.resolve,respond:e.respond,pathname:function(e){return b(e,c)}},extra:e.extra},matching:{re:d,keys:u,exact:l,parsers:e.params||{},children:p}};return t[e.name]=x.public,p.length&&p.forEach(function(e){e.public.parent=x.public}),x},Et=function(e,t){var n=e.matching,r=n.re,i=n.children,a=n.exact,o=r.exec(t);if(!o)return[];var s=o[0],c=[{route:e,parsed:o.slice(1)}],l=t.slice(s.length);if(!i.length||l===``)return c;for(var u=St(l),d=0,f=i;d<f.length;d++){var p=f[d],m=Et(p,u);if(m.length)return c.concat(m)}return a?[]:c},Dt=function(e,t){for(var n=e[e.length-1].route.public,r={},i=0,a=e;i<a.length;i++)for(var o=a[i],s=o.route,c=o.parsed,l=s.matching,u=l.keys,d=l.parsers,f=0,p=c.length;f<p;f++){var m=u[f].name,h=d[m]||decodeURIComponent;c[f]!==void 0&&(r[m]=h(c[f]))}return{route:n,match:{location:t,name:n.name,params:r}}},Ot=function(e){var t={},n=e.map(function(e){return Tt(e,t)});return{match:function(e){for(var t=0,r=n;t<r.length;t++){var i=r[t],a=Et(i,e.pathname);if(a.length)return Dt(a,e)}},route:function(e){return t[e]}}};function kt(e,t){return e?e.indexOf(t)===0?e:t+e:``}function At(e){return e||``}function jt(e){return e||``}function Mt(e){e===void 0&&(e={});var t=e.query,n=t===void 0?{}:t,r=n.parse,i=r===void 0?At:r,a=n.stringify,o=a===void 0?jt:a,s=e.base;return{location:function(e,t){var n=e.url,r=e.state;if(n===``||n.charAt(0)===`#`){t||(t={pathname:`/`,hash:``,query:i()});var a={pathname:t.pathname,hash:n.charAt(0)===`#`?n.substring(1):t.hash,query:t.query};return r&&(a.state=r),a}var o=n.indexOf(`#`),c;o===-1?c=``:(c=n.substring(o+1),n=n.substring(0,o));var l=n.indexOf(`?`),u;l!==-1&&(u=n.substring(l+1),n=n.substring(0,l));var d=i(u),f=s?s.remove(n):n;f===``&&(f=`/`);var p={hash:c,query:d,pathname:f};return r&&(p.state=r),p},keyed:function(e,t){return e.key=t,e},stringify:function(e){if(typeof e==`string`){var t=e.charAt(0);return t===`#`||t===`?`?e:s?s.add(e):e}return(e.pathname===void 0?``:s?s.add(e.pathname):e.pathname)+kt(o(e.query),`?`)+kt(e.hash,`#`)}}}function Nt(){var e=0;return{major:function(t){return t&&(e=t[0]+1),[e++,0]},minor:function(e){return[e[0],e[1]+1]}}}function Pt(e){var t=e.responseHandler,n=e.utils,r=e.keygen,i=e.current,a=e.push,o=e.replace,s;function c(e,t,n,r){var i={location:e,action:t,finish:function(){s===i&&(n(),s=void 0)},cancel:function(e){s===i&&(r(e),i.cancelled=!0,s=void 0)},cancelled:!1};return i}function l(e){s=e,t(e)}function u(e){s&&(s.cancel(e),s=void 0)}function d(e,t){var r=i(),a=n.location(e,r);switch(t){case`anchor`:return n.stringify(a)===n.stringify(r)?f(a):p(a);case`push`:return p(a);case`replace`:return f(a);default:throw Error(`Invalid navigation type: `+t)}}function f(e){var t=n.keyed(e,r.minor(i().key));return c(t,`replace`,o.finish(t),o.cancel)}function p(e){var t=n.keyed(e,r.major(i().key));return c(t,`push`,a.finish(t),a.cancel)}return{prepare:d,emitNavigation:l,createNavigation:c,cancelPending:u}}function Ft(){}function It(){var e;return{confirmNavigation:function(t,n,r){e?e(t,n,r||Ft):n()},confirm:function(t){e=t||null}}}function Lt(e,t){return RegExp(`^`+t+`(\\/|\\?|#|$)`,`i`).test(e)}function Rt(e,t){if(typeof e!=`string`||e.charAt(0)!==`/`||e.charAt(e.length-1)===`/`)throw Error(`The base segment "`+e+`" is not valid. The "base" option must begin with a forward slash and end with a non-forward slash character.`);var n=t||{},r=n.emptyRoot,i=r!==void 0&&r,a=n.strict,o=a!==void 0&&a;return{add:function(t){if(i){if(t===`/`)return e;if(t.startsWith(`/?`)||t.startsWith(`/#`))return``+e+t.substr(1)}else if(t.charAt(0)===`?`||t.charAt(0)===`#`)return t;return``+e+t},remove:function(t){if(t===``)return``;if(!Lt(t,e)){if(o)throw Error(`Expected a string that begins with "`+e+`", but received "`+t+`".`);return t}if(t===e){if(o&&!i)throw Error(`Received string "`+e+`", which is the same as the base, but "emptyRoot" is not true.`);return`/`}return t.substr(e.length)}}}function zt(){return!!(window&&window.location)}function Bt(e){return e.state===void 0&&navigator.userAgent.indexOf(`CriOS`)===-1}function Vt(){try{return window.history.state||{}}catch{return{}}}function Ht(){}function Ut(e,t){if(t===void 0&&(t={}),!zt())throw Error(`Cannot use @hickory/browser without a DOM`);var n=Mt(t),r=Nt(),i=It(),a=i.confirm,o=i.confirmNavigation;function s(e){var t=window.location,i=t.pathname,a=t.search,o=t.hash,s=i+a+o,c=e||Vt(),l=c.key,u=c.state;l||(l=r.major(),window.history.replaceState({key:l,state:u},``,s));var d=n.location({url:s,state:u});return n.keyed(d,l)}function c(e){return n.stringify(e)}var l=Vt().key===void 0?`push`:`pop`,u=Pt({responseHandler:e,utils:n,keygen:r,current:function(){return v.location},push:{finish:function(e){return function(){var t=c(e),n=e.key,r=e.state;try{window.history.pushState({key:n,state:r},``,t)}catch{window.location.assign(t)}v.location=e,l=`push`}},cancel:Ht},replace:{finish:function(e){return function(){var t=c(e),n=e.key,r=e.state;try{window.history.replaceState({key:n,state:r},``,t)}catch{window.location.replace(t)}v.location=e,l=`replace`}},cancel:Ht}}),d=u.emitNavigation,f=u.cancelPending,p=u.createNavigation,m=u.prepare,h=!1;function g(e){if(h)h=!1;else if(!Bt(e)){f(`pop`);var t=s(e.state),n=v.location.key[0]-t.key[0],r=function(){h=!0,window.history.go(n)};o({to:t,from:v.location,action:`pop`},function(){d(p(t,`pop`,function(){v.location=t,l=`pop`},function(e){e!==`pop`&&r()}))},r)}}window.addEventListener(`popstate`,g,!1);var v={location:s(),current:function(){d(p(v.location,l,Ht,Ht))},url:c,navigate:function(e,t){t===void 0&&(t=`anchor`);var n=m(e,t);f(n.action),o({to:n.location,from:v.location,action:n.action},function(){d(n)})},go:function(e){window.history.go(e)},confirm:a,cancel:function(){f()},destroy:function(){window.removeEventListener(`popstate`,g),d=Ht}};return v}var Wt={routes:[{name:`home`,path:`:lang`,restrictions:{lang:`en`},controller:`Home`,sitemap:{priority:1,changefreq:`yearly`,provider:`langs`},children:[{name:`consulting`,path:`consulting`,controller:`Consulting`,sitemap:{priority:.8,changefreq:`monthly`,lastmodFrom:`app/en.yml`}},{name:`api`,path:`api{/*id}`,restrictions:{id:`[\\w/-]+`},controller:`Page`,meta:{encode:!1,categories:[`api`],ignoreIdPrefix:!0},sitemap:{priority:.7,changefreq:`monthly`,provider:`pages`}},{name:`support-casl`,path:`support-casljs`,controller:`Page`,sitemap:{priority:1,changefreq:`yearly`,provider:`route`}},{name:`privacy`,path:`privacy`,controller:`Page`,sitemap:{priority:.3,changefreq:`yearly`,provider:`route`}},{name:`page`,path:`*id`,restrictions:{id:`[\\w/-]+`},controller:`Page`,meta:{encode:!1,categories:[`guide`,`advanced`,`package`,`cookbook`]},sitemap:{priority:1,changefreq:`monthly`,provider:`pages`}}]}]},L={repoURL:`https://github.com/stalniy/casl`,baseUrl:`/v7`},Gt=`langChanged`;function Kt(e,t,n){return Object.entries(Jt(t||{})).reduce((e,[t,n])=>e.replace(RegExp(`{{[  ]*${t}[  ]*}}`,`gm`),String(Jt(n))),e)}function qt(e,t){let n=e.split(`.`),r=t.strings;for(;r!=null&&n.length>0;)r=r[n.shift()];return r==null?null:r.toString()}function Jt(e){return typeof e==`function`?e():e}var Yt={loader:()=>Promise.resolve({}),empty:e=>`[${e}]`,lookup:qt,interpolate:Kt,translationCache:{}};function Xt(e){return Yt=Object.assign(Object.assign({},Yt),e)}function Zt(e){window.dispatchEvent(new CustomEvent(Gt,{detail:e}))}function Qt(e,t,n=Yt){Zt({previousStrings:n.strings,previousLang:n.lang,lang:n.lang=e,strings:n.strings=t})}function $t(e,t){let n=t=>e(t.detail);return window.addEventListener(Gt,n,t),()=>window.removeEventListener(Gt,n)}async function en(e,t=Yt){let n=await t.loader(e,t);t.translationCache={},Qt(e,n,t)}function tn(e,t,n=Yt){let r=n.translationCache[e]||(n.translationCache[e]=n.lookup(e,n)||n.empty(e,n));return t=t==null?null:Jt(t),t==null?r:n.interpolate(r,t,n)}var nn=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),nn(e,t);return!0},rn=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},an=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),cn(t)}};function on(e){this._$AN===void 0?this._$AM=e:(rn(this),this._$AM=e,an(this))}function sn(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0){if(t){if(Array.isArray(r))for(let e=n;e<r.length;e++)nn(r[e],!1),rn(r[e]);else r!=null&&(nn(r,!1),rn(r))}else nn(this,e)}}var cn=e=>{e.type==Le.CHILD&&(e._$AP??(e._$AP=sn),e._$AQ??(e._$AQ=on))},ln=class extends ze{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),an(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(nn(this,e),rn(this))}setValue(e){if(We(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},un=class extends ln{constructor(){super(...arguments),this.langChangedSubscription=null,this.getValue=(()=>``)}renderValue(e){return this.getValue=e,this.subscribe(),this.getValue()}langChanged(e){this.setValue(this.getValue(e))}subscribe(){this.langChangedSubscription??(this.langChangedSubscription=$t(this.langChanged.bind(this)))}unsubscribe(){this.langChangedSubscription!=null&&this.langChangedSubscription()}disconnected(){this.unsubscribe()}reconnected(){this.subscribe()}},dn=class extends un{render(e,t,n){return this.renderValue(()=>tn(e,t,n))}},fn=Re(dn),pn=class extends ze{constructor(e){if(super(e),this.it=A,e.type!==Le.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===A||e==null)return this._t=void 0,this.it=e;if(e===k)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};pn.directiveName=`unsafeHTML`,pn.resultType=1;var mn=Re(pn),hn=Re(class extends dn{render(e,t,n){return this.renderValue(()=>mn(tn(e,t,n)))}}),gn=(...e)=>JSON.stringify(e);function R(e,t=gn){let n=new Map,r=function(...r){let i=t(...r);return n.has(i)||n.set(i,e.apply(this,r)),n.get(i)};return r.cache=n,r}function _n(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>e.apply(this,r),t)}}var vn=e=>e,yn={json:JSON,raw:{parse:vn,stringify:vn},txtArrayJSON:{parse(e){let t=e.trim().replace(/[\r\n]+/g,`,`);return JSON.parse(`[${t}]`)},stringify(){throw Error(`"txtArrayJSON" format is not serializable`)}}};function bn(e,t={}){let n=yn[t.format||`json`];return new Promise((r,i)=>{let a=new XMLHttpRequest;a.open(t.method||`GET`,e),t.headers&&Object.keys(t.headers).forEach(e=>{a.setRequestHeader(e,t.headers[e])}),a.onload=()=>r({status:a.status,headers:{"content-type":a.getResponseHeader(`Content-Type`)},body:n.parse(a.responseText)}),a.ontimeout=a.onerror=i,a.send(t.data?n.stringify(t.data):null)})}var z=Object.create(null);function xn(e,t={}){let n=t.absoluteUrl?e:L.baseUrl+e;return(t.method||`GET`)===`GET`?(z[n]??(z[n]=bn(n,t)),t.cache===!0?z[n]:z[n].then(e=>(delete z[n],e)).catch(e=>(delete z[n],Promise.reject(e)))):bn(n,t)}var Sn={en:{default:`/v7/assets/default.en-CJ6cWGEO.json`}};function Cn(e,t){let n=e.split(`.`),r=t.strings;for(let e=0;e<n.length;e++){let t=n[e];if(!r||!r[t])return;r=r[t]}return r}function wn(e){return console.warn(`missing i18n key: ${e}`),e}var Tn=/%\{(\w+)\}/g;function En(e,t){return e.replace(Tn,(e,n)=>t[n])}var Dn=Xt({async loader(e){return(await xn(Sn[e].default,{absoluteUrl:!0})).body},lookup:Cn,interpolate:En,empty:wn}),On=R((e,t)=>new Intl.DateTimeFormat(e,tn(`dateTimeFormats.${t}`))),kn=[`en`],An=kn[0],B=()=>Dn.lang,V=tn,jn=e=>!!Cn(e,Dn);function Mn(e){if(!kn.includes(e))throw Error(`Locale ${e} is not supported. Supported: ${kn.join(`, `)}`);return en(e)}function Nn(e,t=`default`){let n=typeof e==`string`?new Date(e):e;return On(Dn.lang,t).format(n)}var Pn=`ENTRIES`,Fn=`KEYS`,In=`VALUES`,H=``,Ln=class{constructor(e,t){let n=e._tree,r=Array.from(n.keys());this.set=e,this._type=t,this._path=r.length>0?[{node:n,keys:r}]:[]}next(){let e=this.dive();return this.backtrack(),e}dive(){if(this._path.length===0)return{done:!0,value:void 0};let{node:e,keys:t}=U(this._path);if(U(t)===H)return{done:!1,value:this.result()};let n=e.get(U(t));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;let e=U(this._path).keys;e.pop(),e.length>0||(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:e})=>U(e)).filter(e=>e!==H).join(``)}value(){return U(this._path).node.get(H)}result(){switch(this._type){case In:return this.value();case Fn:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}},U=e=>e[e.length-1],Rn=(e,t,n)=>{let r=new Map;if(t===void 0)return r;let i=t.length+1,a=i+n,o=new Uint8Array(a*i).fill(n+1);for(let e=0;e<i;++e)o[e]=e;for(let e=1;e<a;++e)o[e*i]=e;return zn(e,t,n,r,o,1,i,``),r},zn=(e,t,n,r,i,a,o,s)=>{let c=a*o;key:for(let l of e.keys())if(l===H){let t=i[c-1];t<=n&&r.set(s,[e.get(l),t])}else{let c=a;for(let e=0;e<l.length;++e,++c){let r=l[e],a=o*c,s=a-o,u=i[a],d=Math.max(0,c-n-1),f=Math.min(o-1,c+n);for(let e=d;e<f;++e){let n=r!==t[e],o=i[s+e]+ +n,c=i[s+e+1]+1,l=i[a+e]+1,d=i[a+e+1]=Math.min(o,c,l);d<u&&(u=d)}if(u>n)continue key}zn(e.get(l),t,n,r,i,c,o,s+l)}},Bn=class e{constructor(e=new Map,t=``){this._size=void 0,this._tree=e,this._prefix=t}atPrefix(t){if(!t.startsWith(this._prefix))throw Error(`Mismatched prefix`);let[n,r]=Vn(this._tree,t.slice(this._prefix.length));if(n===void 0){let[n,i]=qn(r);for(let r of n.keys())if(r!==H&&r.startsWith(i)){let a=new Map;return a.set(r.slice(i.length),n.get(r)),new e(a,t)}}return new e(n,t)}clear(){this._size=void 0,this._tree.clear()}delete(e){return this._size=void 0,Wn(this._tree,e)}entries(){return new Ln(this,Pn)}forEach(e){for(let[t,n]of this)e(t,n,this)}fuzzyGet(e,t){return Rn(this._tree,e,t)}get(e){let t=Hn(this._tree,e);return t===void 0?void 0:t.get(H)}has(e){let t=Hn(this._tree,e);return t!==void 0&&t.has(H)}keys(){return new Ln(this,Fn)}set(e,t){if(typeof e!=`string`)throw Error(`key must be a string`);return this._size=void 0,Un(this._tree,e).set(H,t),this}get size(){if(this._size)return this._size;this._size=0;let e=this.entries();for(;!e.next().done;)this._size+=1;return this._size}update(e,t){if(typeof e!=`string`)throw Error(`key must be a string`);this._size=void 0;let n=Un(this._tree,e);return n.set(H,t(n.get(H))),this}fetch(e,t){if(typeof e!=`string`)throw Error(`key must be a string`);this._size=void 0;let n=Un(this._tree,e),r=n.get(H);return r===void 0&&n.set(H,r=t()),r}values(){return new Ln(this,In)}[Symbol.iterator](){return this.entries()}static from(t){let n=new e;for(let[e,r]of t)n.set(e,r);return n}static fromObject(t){return e.from(Object.entries(t))}},Vn=(e,t,n=[])=>{if(t.length===0||e==null)return[e,n];for(let r of e.keys())if(r!==H&&t.startsWith(r))return n.push([e,r]),Vn(e.get(r),t.slice(r.length),n);return n.push([e,t]),Vn(void 0,``,n)},Hn=(e,t)=>{if(t.length===0||e==null)return e;for(let n of e.keys())if(n!==H&&t.startsWith(n))return Hn(e.get(n),t.slice(n.length))},Un=(e,t)=>{let n=t.length;outer:for(let r=0;e&&r<n;){for(let i of e.keys())if(i!==H&&t[r]===i[0]){let a=Math.min(n-r,i.length),o=1;for(;o<a&&t[r+o]===i[o];)++o;let s=e.get(i);if(o===i.length)e=s;else{let n=new Map;n.set(i.slice(o),s),e.set(t.slice(r,r+o),n),e.delete(i),e=n}r+=o;continue outer}let i=new Map;return e.set(t.slice(r),i),i}return e},Wn=(e,t)=>{let[n,r]=Vn(e,t);if(n!==void 0){if(n.delete(H),n.size===0)Gn(r);else if(n.size===1){let[e,t]=n.entries().next().value;Kn(r,e,t)}}},Gn=e=>{if(e.length===0)return;let[t,n]=qn(e);if(t.delete(n),t.size===0)Gn(e.slice(0,-1));else if(t.size===1){let[n,r]=t.entries().next().value;n!==H&&Kn(e.slice(0,-1),n,r)}},Kn=(e,t,n)=>{if(e.length===0)return;let[r,i]=qn(e);r.set(i+t,n),r.delete(i)},qn=e=>e[e.length-1],Jn=`or`,Yn=`and`,Xn=`and_not`,Zn=class e{constructor(e){if(e?.fields==null)throw Error(`MiniSearch: option "fields" must be provided`);let t=e.autoVacuum==null||e.autoVacuum===!0?cr:e.autoVacuum;this._options={...rr,...e,autoVacuum:t,searchOptions:{...ir,...e.searchOptions||{}},autoSuggestOptions:{...ar,...e.autoSuggestOptions||{}}},this._index=new Bn,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=sr,this.addFields(this._options.fields)}add(e){let{extractField:t,stringifyField:n,tokenize:r,processTerm:i,fields:a,idField:o}=this._options,s=t(e,o);if(s==null)throw Error(`MiniSearch: document does not have ID field "${o}"`);if(this._idToShortId.has(s))throw Error(`MiniSearch: duplicate ID ${s}`);let c=this.addDocumentId(s);this.saveStoredFields(c,e);for(let o of a){let a=t(e,o);if(a==null)continue;let s=r(n(a,o),o),l=this._fieldIds[o],u=new Set(s).size;this.addFieldLength(c,l,this._documentCount-1,u);for(let e of s){let t=i(e,o);if(Array.isArray(t))for(let e of t)this.addTerm(l,c,e);else t&&this.addTerm(l,c,t)}}}addAll(e){for(let t of e)this.add(t)}addAllAsync(e,t={}){let{chunkSize:n=10}=t,r={chunk:[],promise:Promise.resolve()},{chunk:i,promise:a}=e.reduce(({chunk:e,promise:t},r,i)=>(e.push(r),(i+1)%n===0?{chunk:[],promise:t.then(()=>new Promise(e=>setTimeout(e,0))).then(()=>this.addAll(e))}:{chunk:e,promise:t}),r);return a.then(()=>this.addAll(i))}remove(e){let{tokenize:t,processTerm:n,extractField:r,stringifyField:i,fields:a,idField:o}=this._options,s=r(e,o);if(s==null)throw Error(`MiniSearch: document does not have ID field "${o}"`);let c=this._idToShortId.get(s);if(c==null)throw Error(`MiniSearch: cannot remove document with ID ${s}: it is not in the index`);for(let o of a){let a=r(e,o);if(a==null)continue;let s=t(i(a,o),o),l=this._fieldIds[o],u=new Set(s).size;this.removeFieldLength(c,l,this._documentCount,u);for(let e of s){let t=n(e,o);if(Array.isArray(t))for(let e of t)this.removeTerm(l,c,e);else t&&this.removeTerm(l,c,t)}}this._storedFields.delete(c),this._documentIds.delete(c),this._idToShortId.delete(s),this._fieldLength.delete(c),--this._documentCount}removeAll(e){if(e)for(let t of e)this.remove(t);else if(arguments.length>0)throw Error(`Expected documents to be present. Omit the argument to remove all documents.`);else this._index=new Bn,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldLength=new Map,this._avgFieldLength=[],this._storedFields=new Map,this._nextId=0}discard(e){let t=this._idToShortId.get(e);if(t==null)throw Error(`MiniSearch: cannot discard document with ID ${e}: it is not in the index`);this._idToShortId.delete(e),this._documentIds.delete(t),this._storedFields.delete(t),(this._fieldLength.get(t)||[]).forEach((e,n)=>{this.removeFieldLength(t,n,this._documentCount,e)}),this._fieldLength.delete(t),--this._documentCount,this._dirtCount+=1,this.maybeAutoVacuum()}maybeAutoVacuum(){if(this._options.autoVacuum===!1)return;let{minDirtFactor:e,minDirtCount:t,batchSize:n,batchWait:r}=this._options.autoVacuum;this.conditionalVacuum({batchSize:n,batchWait:r},{minDirtCount:t,minDirtFactor:e})}discardAll(e){let t=this._options.autoVacuum;try{this._options.autoVacuum=!1;for(let t of e)this.discard(t)}finally{this._options.autoVacuum=t}this.maybeAutoVacuum()}replace(e){let{idField:t,extractField:n}=this._options,r=n(e,t);this.discard(r),this.add(e)}vacuum(e={}){return this.conditionalVacuum(e)}conditionalVacuum(e,t){return this._currentVacuum?(this._enqueuedVacuumConditions=this._enqueuedVacuumConditions&&t,this._enqueuedVacuum??(this._enqueuedVacuum=this._currentVacuum.then(()=>{let t=this._enqueuedVacuumConditions;return this._enqueuedVacuumConditions=sr,this.performVacuuming(e,t)})),this._enqueuedVacuum):this.vacuumConditionsMet(t)===!1?Promise.resolve():(this._currentVacuum=this.performVacuuming(e),this._currentVacuum)}async performVacuuming(e,t){let n=this._dirtCount;if(this.vacuumConditionsMet(t)){let t=e.batchSize||or.batchSize,r=e.batchWait||or.batchWait,i=1;for(let[e,n]of this._index){for(let[e,t]of n)for(let[r]of t)this._documentIds.has(r)||(t.size<=1?n.delete(e):t.delete(r));this._index.get(e).size===0&&this._index.delete(e),i%t===0&&await new Promise(e=>setTimeout(e,r)),i+=1}this._dirtCount-=n}await null,this._currentVacuum=this._enqueuedVacuum,this._enqueuedVacuum=null}vacuumConditionsMet(e){if(e==null)return!0;let{minDirtCount:t,minDirtFactor:n}=e;return t=t||cr.minDirtCount,n=n||cr.minDirtFactor,this.dirtCount>=t&&this.dirtFactor>=n}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}has(e){return this._idToShortId.has(e)}getStoredFields(e){let t=this._idToShortId.get(e);if(t!=null)return this._storedFields.get(t)}search(t,n={}){let{searchOptions:r}=this._options,i={...r,...n},a=this.executeQuery(t,n),o=[];for(let[e,{score:t,terms:n,match:r}]of a){let a=n.length||1,s={id:this._documentIds.get(e),score:t*a,terms:Object.keys(r),queryTerms:n,match:r};Object.assign(s,this._storedFields.get(e)),(i.filter==null||i.filter(s))&&o.push(s)}return t===e.wildcard&&i.boostDocument==null||o.sort(dr),o}autoSuggest(e,t={}){t={...this._options.autoSuggestOptions,...t};let n=new Map;for(let{score:r,terms:i}of this.search(e,t)){let e=i.join(` `),t=n.get(e);t==null?n.set(e,{score:r,terms:i,count:1}):(t.score+=r,t.count+=1)}let r=[];for(let[e,{score:t,terms:i,count:a}]of n)r.push({suggestion:e,terms:i,score:t/a});return r.sort(dr),r}get documentCount(){return this._documentCount}get termCount(){return this._index.size}static loadJSON(e,t){if(t==null)throw Error(`MiniSearch: loadJSON should be given the same options used when serializing the index`);return this.loadJS(JSON.parse(e),t)}static async loadJSONAsync(e,t){if(t==null)throw Error(`MiniSearch: loadJSON should be given the same options used when serializing the index`);return this.loadJSAsync(JSON.parse(e),t)}static getDefault(e){if(rr.hasOwnProperty(e))return Qn(rr,e);throw Error(`MiniSearch: unknown option "${e}"`)}static loadJS(e,t){let{index:n,documentIds:r,fieldLength:i,storedFields:a,serializationVersion:o}=e,s=this.instantiateMiniSearch(e,t);s._documentIds=pr(r),s._fieldLength=pr(i),s._storedFields=pr(a);for(let[e,t]of s._documentIds)s._idToShortId.set(t,e);for(let[e,t]of n){let n=new Map;for(let e of Object.keys(t)){let r=t[e];o===1&&(r=r.ds),n.set(parseInt(e,10),pr(r))}s._index.set(e,n)}return s}static async loadJSAsync(e,t){let{index:n,documentIds:r,fieldLength:i,storedFields:a,serializationVersion:o}=e,s=this.instantiateMiniSearch(e,t);s._documentIds=await mr(r),s._fieldLength=await mr(i),s._storedFields=await mr(a);for(let[e,t]of s._documentIds)s._idToShortId.set(t,e);let c=0;for(let[e,t]of n){let n=new Map;for(let e of Object.keys(t)){let r=t[e];o===1&&(r=r.ds),n.set(parseInt(e,10),await mr(r))}++c%1e3==0&&await hr(0),s._index.set(e,n)}return s}static instantiateMiniSearch(t,n){let{documentCount:r,nextId:i,fieldIds:a,averageFieldLength:o,dirtCount:s,serializationVersion:c}=t;if(c!==1&&c!==2)throw Error(`MiniSearch: cannot deserialize an index created with an incompatible version`);let l=new e(n);return l._documentCount=r,l._nextId=i,l._idToShortId=new Map,l._fieldIds=a,l._avgFieldLength=o,l._dirtCount=s||0,l._index=new Bn,l}executeQuery(t,n={}){if(t===e.wildcard)return this.executeWildcardQuery(n);if(typeof t!=`string`){let e={...n,...t,queries:void 0},r=t.queries.map(t=>this.executeQuery(t,e));return this.combineResults(r,e.combineWith)}let{tokenize:r,processTerm:i,searchOptions:a}=this._options,o={tokenize:r,processTerm:i,...a,...n},{tokenize:s,processTerm:c}=o,l=s(t).flatMap(e=>c(e)).filter(e=>!!e).map(nr(o)).map(e=>this.executeQuerySpec(e,o));return this.combineResults(l,o.combineWith)}executeQuerySpec(e,t){let n={...this._options.searchOptions,...t},r=(n.fields||this._options.fields).reduce((e,t)=>({...e,[t]:Qn(n.boost,t)||1}),{}),{boostDocument:i,weights:a,maxFuzzy:o,bm25:s}=n,{fuzzy:c,prefix:l}={...ir.weights,...a},u=this._index.get(e.term),d=this.termResults(e.term,e.term,1,e.termBoost,u,r,i,s),f,p;if(e.prefix&&(f=this._index.atPrefix(e.term)),e.fuzzy){let t=e.fuzzy===!0?.2:e.fuzzy,n=t<1?Math.min(o,Math.round(e.term.length*t)):t;n&&(p=this._index.fuzzyGet(e.term,n))}if(f)for(let[t,n]of f){let a=t.length-e.term.length;if(!a)continue;p?.delete(t);let o=l*t.length/(t.length+.3*a);this.termResults(e.term,t,o,e.termBoost,n,r,i,s,d)}if(p)for(let t of p.keys()){let[n,a]=p.get(t);if(!a)continue;let o=c*t.length/(t.length+a);this.termResults(e.term,t,o,e.termBoost,n,r,i,s,d)}return d}executeWildcardQuery(e){let t=new Map,n={...this._options.searchOptions,...e};for(let[e,r]of this._documentIds){let i=n.boostDocument?n.boostDocument(r,``,this._storedFields.get(e)):1;t.set(e,{score:i,terms:[],match:{}})}return t}combineResults(e,t=Jn){if(e.length===0)return new Map;let n=$n[t.toLowerCase()];if(!n)throw Error(`Invalid combination operator: ${t}`);return e.reduce(n)||new Map}toJSON(){let e=[];for(let[t,n]of this._index){let r={};for(let[e,t]of n)r[e]=Object.fromEntries(t);e.push([t,r])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:e,serializationVersion:2}}termResults(e,t,n,r,i,a,o,s,c=new Map){if(i==null)return c;for(let l of Object.keys(a)){let u=a[l],d=this._fieldIds[l],f=i.get(d);if(f==null)continue;let p=f.size,m=this._avgFieldLength[d];for(let i of f.keys()){if(!this._documentIds.has(i)){this.removeTerm(d,i,t),--p;continue}let a=o?o(this._documentIds.get(i),t,this._storedFields.get(i)):1;if(!a)continue;let h=f.get(i),g=this._fieldLength.get(i)[d],v=tr(h,p,this._documentCount,g,m,s),y=n*r*u*a*v,b=c.get(i);if(b){b.score+=y,lr(b.terms,e);let n=Qn(b.match,t);n?n.push(l):b.match[t]=[l]}else c.set(i,{score:y,terms:[e],match:{[t]:[l]}})}}return c}addTerm(e,t,n){let r=this._index.fetch(n,fr),i=r.get(e);if(i==null)i=new Map,i.set(t,1),r.set(e,i);else{let e=i.get(t);i.set(t,(e||0)+1)}}removeTerm(e,t,n){if(!this._index.has(n)){this.warnDocumentChanged(t,e,n);return}let r=this._index.fetch(n,fr),i=r.get(e);i==null||i.get(t)==null?this.warnDocumentChanged(t,e,n):i.get(t)<=1?i.size<=1?r.delete(e):i.delete(t):i.set(t,i.get(t)-1),this._index.get(n).size===0&&this._index.delete(n)}warnDocumentChanged(e,t,n){for(let r of Object.keys(this._fieldIds))if(this._fieldIds[r]===t){this._options.logger(`warn`,`MiniSearch: document with ID ${this._documentIds.get(e)} has changed before removal: term "${n}" was not present in field "${r}". Removing a document after it has changed can corrupt the index!`,`version_conflict`);return}}addDocumentId(e){let t=this._nextId;return this._idToShortId.set(e,t),this._documentIds.set(t,e),this._documentCount+=1,this._nextId+=1,t}addFields(e){for(let t=0;t<e.length;t++)this._fieldIds[e[t]]=t}addFieldLength(e,t,n,r){let i=this._fieldLength.get(e);i??this._fieldLength.set(e,i=[]),i[t]=r;let a=(this._avgFieldLength[t]||0)*n+r;this._avgFieldLength[t]=a/(n+1)}removeFieldLength(e,t,n,r){if(n===1){this._avgFieldLength[t]=0;return}let i=this._avgFieldLength[t]*n-r;this._avgFieldLength[t]=i/(n-1)}saveStoredFields(e,t){let{storeFields:n,extractField:r}=this._options;if(n==null||n.length===0)return;let i=this._storedFields.get(e);i??this._storedFields.set(e,i={});for(let e of n){let n=r(t,e);n!==void 0&&(i[e]=n)}}};Zn.wildcard=Symbol(`*`);var Qn=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,$n={[Jn]:(e,t)=>{for(let n of t.keys()){let r=e.get(n);if(r==null)e.set(n,t.get(n));else{let{score:e,terms:i,match:a}=t.get(n);r.score+=e,r.match=Object.assign(r.match,a),ur(r.terms,i)}}return e},[Yn]:(e,t)=>{let n=new Map;for(let r of t.keys()){let i=e.get(r);if(i==null)continue;let{score:a,terms:o,match:s}=t.get(r);ur(i.terms,o),n.set(r,{score:i.score+a,terms:i.terms,match:Object.assign(i.match,s)})}return n},[Xn]:(e,t)=>{for(let n of t.keys())e.delete(n);return e}},er={k:1.2,b:.7,d:.5},tr=(e,t,n,r,i,a)=>{let{k:o,b:s,d:c}=a;return Math.log(1+(n-t+.5)/(t+.5))*(c+e*(o+1)/(e+o*(1-s+s*r/i)))},nr=e=>(t,n,r)=>({term:t,fuzzy:typeof e.fuzzy==`function`?e.fuzzy(t,n,r):e.fuzzy||!1,prefix:typeof e.prefix==`function`?e.prefix(t,n,r):e.prefix===!0,termBoost:typeof e.boostTerm==`function`?e.boostTerm(t,n,r):1}),rr={idField:`id`,extractField:(e,t)=>e[t],stringifyField:(e,t)=>e.toString(),tokenize:e=>e.split(gr),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof(console==null?void 0:console[e])==`function`&&console[e](t)},autoVacuum:!0},ir={combineWith:Jn,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:er},ar={combineWith:Yn,prefix:(e,t,n)=>t===n.length-1},or={batchSize:1e3,batchWait:10},sr={minDirtFactor:.1,minDirtCount:20},cr={...or,...sr},lr=(e,t)=>{e.includes(t)||e.push(t)},ur=(e,t)=>{for(let n of t)e.includes(n)||e.push(n)},dr=({score:e},{score:t})=>t-e,fr=()=>new Map,pr=e=>{let t=new Map;for(let n of Object.keys(e))t.set(parseInt(n,10),e[n]);return t},mr=async e=>{let t=new Map,n=0;for(let r of Object.keys(e))t.set(parseInt(r,10),e[r]),++n%1e3==0&&await hr(0);return t},hr=e=>new Promise(t=>setTimeout(t,e)),gr=/[\n\r\p{Z}\p{P}]+/u;function _r(e){return Object.assign(Error(e),{code:`NOT_FOUND`})}function vr(e,t){switch(t){case`summary`:return e.meta?e.meta.description:null;case`headings`:return e[t].map(e=>e.title).join(` `);default:return e[t]}}var yr={extractField:vr,fields:[`title`,`headings`,`summary`],searchOptions:{boost:{title:2}}};function br(e){let t={};return e.terms.forEach(n=>{let r=RegExp(`(${n})`,`gi`);e.match[n].forEach(i=>{let a=e.doc[i];if(typeof a==`string`)t[i]=a.replace(r,`<mark>$1</mark>`);else if(i===`headings`){let e=a.reduce((e,t)=>(t.title.toLowerCase().includes(n)&&e.push({id:t.id,title:t.title.replace(r,`<mark>$1</mark>`)}),e),[]);t[i]=e.length?e:null}})}),t}var xr=class{constructor({pages:e,summaries:t,searchIndexes:n}){this._pages=e,this._summaries=t,this._searchIndexes=n,this._loadSearchIndex=R(this._loadSearchIndex),this._getSummary=R(this._getSummary),this._getItems=R(this._getItems),this.byCategories=R(this.byCategories),this.load=R(this.load)}async load(e,t){let n=this._pages[e][t];if(!n)throw _r(`Page with ${t} is not found`);return(await xn(n,{absoluteUrl:!0})).body}async _getSummary(e){return(await xn(this._summaries[e],{absoluteUrl:!0})).body}async _getItems(e,t=null){let n=await this.byCategories(e,t);return Object.keys(n).reduce((e,t)=>e.concat(n[t]),[])}async getNearestFor(e,t,n=null){let r=await this._getItems(e,n),i=r.findIndex(e=>e.id===t);if(i===-1)return[];let a=i-1,o=i+1;return[a<0?void 0:r[a],o>=r.length?void 0:r[o]]}async byCategories(e,t=null){let{items:n}=await this._getSummary(e),r={};return n.forEach(e=>{e.categories.forEach(t=>{r[t]=r[t]||[],r[t].push(e)})}),Array.isArray(t)?t.reduce((e,t)=>(e[t]=r[t],e),{}):r}async at(e,t){let{items:n}=await this._getSummary(e);return n[t]}async _loadSearchIndex(e){let t=this._searchIndexes[e],n=await xn(t,{absoluteUrl:!0});return Zn.loadJS(n.body,yr)}async search(e,t,n){let[r,i]=await Promise.all([this._loadSearchIndex(e),this._getSummary(e)]);return r.search(t,n).slice(0,15).map(e=>{let[t]=i.byId[e.id];return e.doc=i.items[t],e.hints=br(e),e})}},Sr=t({pages:()=>Cr,searchIndexes:()=>Tr,summaries:()=>wr}),Cr={en:{notfound:`/v7/assets/notfound.en-D3L7oOYD.json`,privacy:`/v7/assets/privacy.en-B6Ehuz_E.json`,"support-casljs":`/v7/assets/support-casljs.en-DtnLLZtW.json`,"api/casl-ability":`/v7/assets/api/casl-ability.en-CBTSvjUY.json`,"api/casl-ability-extra":`/v7/assets/api/casl-ability-extra.en-YENGcbwN.json`,"cookbook/cache-rules":`/v7/assets/cookbook/cache-rules.en-Bl62ebAm.json`,"cookbook/claim-authorization":`/v7/assets/cookbook/claim-authorization.en-Bog9RGSq.json`,"cookbook/intro":`/v7/assets/cookbook/intro.en-CdYKdEd7.json`,"cookbook/less-confusing-can-api":`/v7/assets/cookbook/less-confusing-can-api.en-BNuZl-ln.json`,"cookbook/roles-with-persisted-permissions":`/v7/assets/cookbook/roles-with-persisted-permissions.en-DRzGcY1H.json`,"cookbook/roles-with-static-permissions":`/v7/assets/cookbook/roles-with-static-permissions.en-GL_-XF9c.json`,"guide/define-aliases":`/v7/assets/guide/define-aliases.en-BDoC2UHw.json`,"guide/conditions-in-depth":`/v7/assets/guide/conditions-in-depth.en-7490ZfXm.json`,"guide/define-rules":`/v7/assets/guide/define-rules.en-C-ZrRB1F.json`,"guide/install":`/v7/assets/guide/install.en-CFTad0FM.json`,"guide/intro":`/v7/assets/guide/intro.en-z2Fdvkyg.json`,"guide/restricting-fields":`/v7/assets/guide/restricting-fields.en-CA9ZwSUO.json`,"guide/subject-type-detection":`/v7/assets/guide/subject-type-detection.en-C3jEpgsE.json`,"package/casl-angular":`/v7/assets/package/casl-angular.en-BmGB_ufn.json`,"package/casl-mongoose":`/v7/assets/package/casl-mongoose.en-BbxvyL26.json`,"package/casl-prisma":`/v7/assets/package/casl-prisma.en-DV6YIh0A.json`,"package/casl-react":`/v7/assets/package/casl-react.en-DiBu8x5o.json`,"package/casl-vue":`/v7/assets/package/casl-vue.en-CPAraKAc.json`,"advanced/ability-to-database-query":`/v7/assets/advanced/ability-to-database-query.en-DM_8mgYs.json`,"advanced/ability-inheritance":`/v7/assets/advanced/ability-inheritance.en-rv3lmhuz.json`,"advanced/customize-ability":`/v7/assets/advanced/customize-ability.en-BQCPAwB0.json`,"advanced/debugging-testing":`/v7/assets/advanced/debugging-testing.en-B7DczpWT.json`,"advanced/typescript":`/v7/assets/advanced/typescript.en-2IbiBTP0.json`}},wr={en:`/v7/assets/content_pages_summaries.en-D2z34HvG.json`},Tr={en:`/v7/assets/content_pages_searchIndexes.en-DTKUTzIf.json`},Er={page:new xr(Sr)},Dr=e=>{let t=Er[e];if(!t)throw TypeError(`Unknown content loader "${e}".`);return t};function Or(e){if(e.code===`NOT_FOUND`)return{body:O`<app-page name="notfound"></app-page>`};throw e}async function kr(e,t){if(!t.categories)return e.at(t.lang,0);let n=await e.byCategories(t.lang,t.categories);return n[t.categories.find(e=>n[e].length)][0]}var Ar=e=>e,jr=(e=Ar)=>async t=>{let n=e(t),r=Dr(`page`);return n.id?n.id.endsWith(`/`)?n.redirectTo=n.id.slice(0,-1):[n.page,n.byCategories,n.nav]=await Promise.all([r.load(n.lang,n.id),n.categories.length?r.byCategories(n.lang,n.categories):null,r.getNearestFor(n.lang,n.id,n.categories)]):n.redirectTo=(await kr(r,n)).id,n},Mr=(e=>({match:t,error:n,resolved:r})=>n?Or(n):r.redirectTo?{redirect:{name:`page`,query:t.location.query,hash:t.location.hash,params:{id:r.redirectTo,lang:t.params.lang}}}:{body:e(r,t.params)})(e=>({main:O`
    <app-page name="${e.id}" .nav="${e.nav}"></app-page>
  `,sidebar:e.byCategories?O`<pages-by-categories .items="${e.byCategories}"></pages-by-categories>`:null})),Nr=t({parse:()=>Pr,stringify:()=>Fr});function Pr(e){return e?JSON.parse(`{"${e.replace(/&/g,`","`).replace(/=/g,`":"`)}"}`):{}}function Fr(e){return e?Object.keys(e).reduce((t,n)=>(t.push(`${n}=${e[n]}`),t),[]).join(`&`):``}function Ir(e,t){return e.map(e=>{let n=t[e.controller];if(!n)throw Error(`Did you forget to specify controller for route "${e.name}"?`);let r={name:e.name,path:e.path,extra:{restrictions:Object.entries(e.restrictions||{}).map(([e,t])=>[e,RegExp(`^(?:${t})$`,`i`)])},...n(e)};return e.meta?.encode===!1&&(r.pathOptions={compile:{encode:!1}}),e.children&&(r.children=Ir(e.children,t)),r})}function Lr(e){let t=Ot(e),n=Ot([e.find(e=>e.name===`notFound`)]);return{...t,match(e){let r=t.match(e);for(let t=r.route;t;t=t.parent)if((t.extra?.restrictions||[]).some(([e,t])=>r.match.params[e]!==void 0&&!t.test(r.match.params[e])))return n.match(e);return r}}}var W=xt(Ut,Lr(Ir(Wt.routes,{Home:()=>({respond:()=>({body:{main:O`<home-page></home-page>`}})}),Consulting:()=>({respond:()=>({body:{main:O`<consulting-page></consulting-page>`}})}),Page(e){let t=e.meta?e.meta.categories:[],n=lt(e.path,{encode:!1});return{resolve:jr(({params:r})=>({...r,categories:t,id:e.path.includes(`*id`)&&!r.id?null:n(r)})),respond:Mr}}}).concat({name:`notFound`,path:`{*path}`,pathOptions:{compile:{encode:!1}},respond({match:e}){let{pathname:t}=e.location,n=t.indexOf(`/`,1),r=n===-1?t.slice(1):t.slice(1,n),{search:i,hash:a}=window.location;return kn.includes(r)?{body:O`<app-page name="notfound"></app-page>`}:{redirect:{url:`/${An}${t}${i}${a}`}}}})),{history:{base:L.baseUrl?Rt(L.baseUrl):void 0,query:Nr}}),Rr=W.url;W.url=e=>{let t={lang:B(),...e.params};return Rr({...e,params:t})},`scrollRestoration`in window.history&&(window.history.scrollRestoration=`manual`);var zr=window.visualViewport||window;function Br(e,t){let n=window.matchMedia(e),r=()=>t(n.matches);return zr.addEventListener(`resize`,r),r(),()=>zr.removeEventListener(`resize`,r)}var Vr=Nn,G=fn,K=hn,Hr=class extends N{constructor(){super(),this.addEventListener(`content-error`,e=>{this.setAttribute(`data-content-error`,e.detail?.message||e.target.getAttribute(`data-content-error`)||`content request failed`)}),this._route=null,this._notificationsRoot=null,this._menu=null,this._isMobile=!1,this.ready=!1,this._routeVersion=0,this._routePath=``,this._unwatch=[],this._publishReadiness=this._publishReadiness.bind(this)}connectedCallback(){super.connectedCallback(),this._unwatch.push(W.observe(e=>{this.ready=!1,this._routeVersion+=1,this._route=e.response,this._routePath=`${window.location.pathname}${window.location.search}${window.location.hash}`,this.removeAttribute(`data-rendered-route`),this.removeAttribute(`data-content-error`),this.removeAttribute(`data-content-not-found`),this._closeMenu()},{initial:!0})),this._unwatch.push(Br(`(min-width: 768px)`,e=>this._isMobile=!e)),document.addEventListener(`keypress`,e=>{e.ctrlKey&&e.shiftKey&&e.keyCode===22&&console.log(`1556b87`)},!1);let e=setTimeout(()=>console.warn(`Page did not report readiness in 10sec.`),1e4),t=()=>clearTimeout(e);this.addEventListener(`route-ready`,t,{once:!0,passive:!0}),this._unwatch.push(t)}disconnectedCallback(){super.disconnectedCallback(),this._unwatch.forEach(e=>e())}updated(){this._menu??(this._menu=this.shadowRoot.querySelector(`menu-drawer`))}async _publishReadiness(e){let t=e.composedPath()[0];if(!this.ready||!this._route||!t?.isConnected)return;let n=this._routeVersion,r=this._routePath;await this.updateComplete,t.isConnected&&n===this._routeVersion&&r===`${window.location.pathname}${window.location.search}${window.location.hash}`&&(this.toggleAttribute(`data-content-not-found`,e.detail?.notFound===!0),this.setAttribute(`data-rendered-route`,r),this.dispatchEvent(new CustomEvent(`route-ready`,{detail:{path:r}})))}async _share(){try{await navigator.share({title:document.title,text:document.head.querySelector(`meta[name="description"]`)?.content||``,url:window.location.href})}catch(e){e.name!==`AbortError`&&console.error(`Unable to share page`,e)}}_toggleMenu(){this._menu?.toggle()}_closeMenu(){this._menu?.close()}notify(e,t={}){let n=document.createElement(`app-notification`);n.message=e,typeof t.onClick==`function`&&n.addEventListener(`click`,t.onClick,!1),this._notificationsRoot=this._notificationsRoot||Ur(),this._notificationsRoot.appendChild(n)}_renderDrawerMenu(e){return this._isMobile?O`
      ${e}
      <h3>${G(`menu.root`)}</h3>
      <app-menu .items="${$e.items}" expanded></app-menu>
    `:null}_getLayout(e){return this._route.name===`home`||this._route.name===`consulting`?``:this._isMobile?`col-1`:e?`col-2`:`col-1`}render(){if(!this._route||!this.ready)return null;let{body:e}=this._route,t=e?.sidebar?Qe(e.sidebar):``,n=e?.main||e;return O`
      <menu-drawer ?disabled="${!this._isMobile}">
        <div slot="menu">${this._renderDrawerMenu(t)}</div>
        <app-root
          theme="${this._isMobile?`mobile`:`default`}"
          layout="${this._getLayout(!!t)}"
          .menu="${$e}"
          .isContainerRestricted="${this._route.name===`home`}"
          @toggle-menu="${this._toggleMenu}"
        >
          <div slot="aside">${t}</div>
          <div @content-ready="${this._publishReadiness}">${n?Qe(n):null}</div>
        </app-root>
      </menu-drawer>
      <analytics-consent></analytics-consent>
      <div class="floating-actions">
        ${typeof navigator.share==`function`?O`
          <button type="button" class="action share" @click="${this._share}"
            aria-label="${G(`buttons.share`)}" title="${G(`buttons.share`)}">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"></path>
            </svg>
          </button>
        `:null}
        <a class="action question" href="https://github.com/stalniy/casl/discussions/categories/q-a"
          target="_blank" rel="noopener noreferrer"
          aria-label="${G(`buttons.askQuestion`)}" title="${G(`buttons.askQuestion`)}">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-3 3V11.5A8.5 8.5 0 0 1 9.5 3h3a8.5 8.5 0 0 1 8.5 8.5Z"></path>
            <path d="M8.5 8a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 3h.01"></path>
          </svg>
        </a>
      </div>
    `}};P(Hr,`cName`,`casl-docs`),P(Hr,`properties`,{ready:{type:Boolean},_isMobile:{type:Boolean},_route:{type:Object}}),Hr.styles=[c`
    :host {
      display: block;
    }

    .floating-actions {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 40;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #444c56;
      border-right: 0;
      border-radius: 4px 0 0 4px;
    }

    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 44px;
      height: 44px;
      padding: 10px;
      border: 0;
      background: #202428;
      color: #fff;
      font: 600 16px/1.5 "Helvetica Neue", Arial, sans-serif;
      cursor: pointer;
    }

    .action + .action {
      border-top: 1px solid #444c56;
    }

    .action:hover,
    .action:focus-visible {
      color: #58a6ff;
    }

    .action:focus-visible {
      outline: 2px solid #58a6ff;
      outline-offset: -3px;
    }

    .action svg {
      width: 24px;
      height: 24px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `];function Ur(){let e=document.createElement(`div`);return Object.assign(e.style,{position:`fixed`,right:`10px`,bottom:`10px`,zIndex:50,width:`320px`}),document.body.appendChild(e),e}var Wr=c`
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

  .row.space-between {
    justify-content: space-between;
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
`,Gr=class extends N{constructor(){super(),this.theme=`default`,this.menu=null,this.layout=``}render(){return O`
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
    `}};P(Gr,`cName`,`app-root`),P(Gr,`properties`,{theme:{type:String},layout:{type:String},menu:{type:Object},isContainerRestricted:{type:Boolean}}),Gr.styles=[Wr,c`
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
  `];var Kr=`casl:analytics-consent`,qr=1,Jr=15552e6,Yr=new Set,Xr=!1,q=null;function Zr(){try{let e=JSON.parse(localStorage.getItem(Kr)),t=Date.now()-e?.timestamp;return e?.version===qr&&[`accepted`,`rejected`].includes(e.choice)&&t>=0&&t<Jr?e.choice:null}catch{return null}}var J=Zr();function Qr(){return J}function $r(){q||(window.caslAnalyticsBeforeSend=(e,t)=>J===`accepted`&&t,q=document.createElement(`script`),q.src=`https://cloud.umami.is/script.js`,q.defer=!0,q.dataset.websiteId=`a67936cd-6691-41c2-ac9d-ebcd54f50acc`,q.dataset.beforeSend=`caslAnalyticsBeforeSend`,q.addEventListener(`error`,()=>{q.remove(),q=null},{once:!0}),document.head.appendChild(q))}function ei(e){let t=J===`accepted`&&q;J=e,Yr.forEach(e=>e(J)),J===`accepted`?$r():t&&window.location.reload()}function ti(){Xr||(Xr=!0,J===`accepted`&&$r(),window.addEventListener(`storage`,e=>{(e.key===Kr||e.key===null)&&ei(Zr())}))}function ni(e){if([`accepted`,`rejected`].includes(e)){try{localStorage.setItem(Kr,JSON.stringify({version:qr,choice:e,timestamp:Date.now()}))}catch{}ei(e)}}function ri(e){return Yr.add(e),()=>Yr.delete(e)}function ii(){window.dispatchEvent(new Event(`analytics-preferences`))}function ai(e,t){J===`accepted`&&window.umami?.track(e,t)}var oi=class extends N{constructor(){super(),this._open=Qr()===null,this._show=()=>{for(this._returnFocus=document.activeElement;this._returnFocus?.shadowRoot?.activeElement;)this._returnFocus=this._returnFocus.shadowRoot.activeElement;this._open=!0,this.updateComplete.then(()=>this.shadowRoot.querySelector(`button`)?.focus())}}connectedCallback(){super.connectedCallback(),this._unobserve=ri(e=>{this._open=e===null}),window.addEventListener(`analytics-preferences`,this._show)}disconnectedCallback(){this._unobserve(),window.removeEventListener(`analytics-preferences`,this._show),super.disconnectedCallback()}_choose(e){ni(e),this._returnFocus?.focus()}render(){return this._open?O`
      <section role="region" aria-labelledby="consent-title">
        <div>
          <h2 id="consent-title">${G(`analyticsConsent.title`)}</h2>
          <p>${G(`analyticsConsent.description`)} <app-link to="privacy">${G(`menu.privacy`)}</app-link></p>
        </div>
        <div class="actions">
          <button type="button" class="reject-btn" @click="${()=>this._choose(`rejected`)}">${G(`analyticsConsent.reject`)}</button>
          <button type="button" class="accept-btn" @click="${()=>this._choose(`accepted`)}">${G(`analyticsConsent.accept`)}</button>
        </div>
      </section>
    `:O``}};P(oi,`cName`,`analytics-consent`),P(oi,`properties`,{_open:{state:!0}}),oi.styles=c`
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
`;var Y=c`
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
`,si=c`
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
`,ci=c`
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
`,li=c`
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
`,ui=c`
  /* other alert styles is in md.js */

  .alert-warning {
    border-left-color: #856404;
    background-color: #fff3cd;
  }

  .alert-warning:before {
    background: #856404;
    content: 'w';
  }
`,di={github:O`
    <svg aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-github-icon" lang="en">GitHub icon</title><path fill="#FFFFFF" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
  `,twitter:O`
    <svg aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon" lang="en">Twitter icon</title><path fill="#FFFFFF" d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"></path></svg>
  `,medium:O`
    <svg aria-labelledby="simpleicons-medium-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-medium-icon" lang="en">Medium icon</title><path fill="#FFFFFF" d="M2.846 6.36c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403H7.26l5.378 11.795 4.728-11.795H24v.403l-1.917 1.837c-.165.126-.247.333-.213.538v13.5c-.034.204.048.41.213.537l1.87 1.837v.403h-9.41v-.403l1.937-1.882c.19-.19.19-.246.19-.538V7.794l-5.39 13.688h-.727L4.278 7.794v9.174c-.052.386.076.774.347 1.053l2.52 3.06v.402H0v-.403l2.52-3.06c.27-.278.39-.67.326-1.052V6.36z"></path></svg>
  `},fi=class extends N{constructor(...e){super(...e),P(this,`year`,new Date().getFullYear())}render(){return O`
      <p class="links">
        ${$e.footer.map(e=>O`
          <a href="${e.url}" target="_blank" rel="noopener">
            ${di[e.icon]}
          </a>
        `)}
      </p>
      <p class="copyright md">${K(`copyright`,{year:this.year})}</p>
      <p><button type="button" @click="${ii}">${G(`analyticsConsent.settings`)}</button></p>
    `}};P(fi,`cName`,`app-footer`),fi.styles=[Y,c`
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

    .links svg {
      width: 18px;
      height: 18px;
    }

    .links a {
      margin: 0 5px;
      text-decoration: none;
    }
  `];var pi=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwAQMAAABtzGvEAAAABlBMVEVMaXF1dXW6QQOmAAAAAXRSTlMAQObYZgAAABZJREFUeNpjoAVg/g8EB7BSg9sUygEATXU49WmTHjIAAAAASUVORK5CYII=`,mi=class extends N{constructor(){super(),this.theme=`default`,this.menu={items:[]}}_emitToggleMenu(){this.dispatchEvent(new CustomEvent(`toggle-menu`,{bubbles:!0,composed:!0}))}_renderControls(){return this.theme==="default"?O`
        <div class="row align-center">
          <app-quick-search></app-quick-search>
          <app-menu .items="${this.menu.items}"></app-menu>
        </div>
      `:O`
      <app-quick-search ?compact="${this.theme===`mobile`}"></app-quick-search>
    `}_renderMenuToggler(){return this.theme===`mobile`?O`
      <button type="button" class="menu-toggle" @click="${this._emitToggleMenu}">
        <img src="${pi}" width="24">
      </button>
    `:null}render(){return O`
      <header>
        <div class="header ${this.isContainerRestricted?`container`:``}">
          ${this._renderMenuToggler()}
          <div class="logo-container">
            <app-link to="home" class="logo">${G(`name`)}</app-link>
            <div class="versions-picker">
              <versions-select></versions-select>
            </div>
          </div>
          ${this._renderControls()}
        </div>
      </header>
      <!-- <app-lang-picker></app-lang-picker> -->
    `}};P(mi,`cName`,`app-header`),P(mi,`properties`,{menu:{type:Object},theme:{type:String},isContainerRestricted:{type:Boolean}}),mi.styles=[Wr,c`
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

    app-quick-search {
      position: absolute;
      right: 10px;
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

      .versions-picker {
        flex-direction: column;
        gap: 4px;
      }

      app-quick-search {
        position: static;
      }
    }
  `];var hi=class extends N{constructor(){super(),this.to=``,this.active=!1,this.query=null,this.params=null,this.hash=``,this.nav=!1,this._url=null,this._unwatchRouter=null}_isActive(){let e=this._getUrl(),{pathname:t}=window.location;return e.length>t.length?!1:e===t||t.startsWith(e)}connectedCallback(){super.connectedCallback(),this.addEventListener(`click`,this._navigate.bind(this),!1),this.nav&&(this._unwatchRouter=W.observe(()=>{this.active=this._isActive()},{initial:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}update(e){let t=[`to`,`query`,`params`,`hash`].some(t=>e.has(t));if((this._url===null||t)&&(this._url=this._generateUrl()),this.nav&&e.has(`active`)){let e=this.active?`add`:`remove`;this.classList[e](`active`)}return super.update(e)}_getUrl(){return this._url=this._url||this._generateUrl(),this._url}_generateUrl(){return W.url({name:this.to,hash:this.hash,params:this.params,query:this.query})}render(){return O`
      <a itemprop="url" href="${this._url}">
        <slot></slot>
      </a>
    `}_navigate(e){e.ctrlKey||(e.preventDefault(),W.navigate({url:this._url}))}};P(hi,`cName`,`app-link`),P(hi,`properties`,{to:{type:String},params:{type:Object},query:{type:Object},hash:{type:String},active:{type:Boolean},nav:{type:Boolean}}),hi.styles=c`
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
`;function gi(e){if(e.heading)return O`<h4>${G(`menu.${e.heading}`)}</h4>`;let t=G(`menu.${e.name}`);return e.route===!1?O`<a class="link">${t}</a>`:e.url?O`<a href="${e.url}" target="_blank" rel="${e.rel||`nofollow`}">${t}</a>`:e.page?O`<app-link nav to="page" .params="${{id:e.page}}">${t}</app-link>`:O`<app-link nav to="${e.name}">${t}</app-link>`}var _i=class extends N{constructor(){super(),this.items=[]}render(){return O`
      <nav
        role="navigation"
        itemscope
        itemtype="http://schema.org/SiteNavigationElement"
      >
        ${this._renderNav(this.items,`nav`)}
      </nav>
    `}_renderNav(e,t){return O`<ul class="${t}">${e.map(e=>O`
      <li class="${e.children?`menu-item-dropdown`:`menu-item`}">
        ${gi(e)}
        ${this._renderItemNav(e)}
      </li>
    `)}</ul>`}_renderItemNav({children:e}){return e?this._renderNav(e,`dropdown ${this.expanded?``:`expandable`}`):``}};P(_i,`cName`,`app-menu`),P(_i,`properties`,{items:{type:Array},expanded:{type:Boolean}}),_i.styles=c`
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
`;var vi=class extends N{constructor(){super(),this.article=null,this.category=``}render(){let{article:e}=this,t=this.category||e.categories[0];return O`
      <time datetime="${e.createdAt}" itemprop="datePublished">
        ${Vr(e.createdAt)}
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
    `}};P(vi,`cName`,`app-article-details`),P(vi,`properties`,{article:{type:Object,attribute:!1},category:{type:String}}),vi.styles=[c`
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
  `];var yi=class extends N{constructor(){super(),this._unwatchLang=null,this._locale=B()}connectedCallback(){super.connectedCallback(),this._unwatchLang=$t(e=>{this._locale=e,this.reload().then(()=>this.requestUpdate())})}disconnectedCallback(){this._unwatchLang(),super.disconnectedCallback()}reload(){return Promise.reject(Error(`${this.constructor.cName} should implement "reload" method`))}};function bi(e){let t=e?`${e} - `:``;document.title=t+V(`name`),Si(`og:title`,document.title)}function xi(e){let t=document.head.querySelector(`meta[name="${e}"]`);return t||(t=document.createElement(`meta`),t.setAttribute(`name`,e),document.head.appendChild(t)),t}function Si(e,t){let n=Array.from(document.head.querySelectorAll(`meta[property="${e}"]`)),r=n.shift()||document.createElement(`meta`);r.setAttribute(`property`,e),r.setAttribute(`content`,t),r.isConnected||document.head.appendChild(r),n.forEach(e=>e.remove())}function X(e,t){if(typeof e==`object`){Object.keys(e).forEach(t=>X(t,e[t]));return}let n=V(`meta.${e}`),r=Array.isArray(t)?t.concat(n).join(`, `):t||n;xi(e).setAttribute(`content`,r.replace(/[\n\r]+/g,` `)),e===`description`&&Si(`og:description`,r.replace(/[\n\r]+/g,` `))}function Ci({response:e}){let t=document.documentElement;t.lang!==e.params.lang&&(t.lang=e.params.lang||An);let n=`meta.${e.name}`;jn(n)?(bi(V(`${n}.title`)),X(`keywords`,jn(`${n}.keywords`)?V(`${n}.keywords`):void 0),X(`description`,jn(`${n}.description`)?V(`${n}.description`):void 0)):(bi(),X(`keywords`),X(`description`))}function wi(e){let t=e.meta||{};t.title?(document.title=t.title,Si(`og:title`,document.title)):bi(e.title),X(`keywords`,t.keywords||``),X(`description`,t.description||``)}function Ti(e,t){let n=e.getElementById(t);n&&(n.scrollIntoView(!0),document.documentElement.scrollTop-=85)}function Ei(e,t){let n=e,r=0;for(;n&&r<3;){if(n.tagName===t)return n;n=n.parentNode,r++}return null}function Di(e,t){let n;if(t.tagName[0]===`H`&&t.id)n=t.id;else{let n=Ei(t,`A`),r=n?n.href.indexOf(`#`):-1;r!==-1&&Ti(e,n.href.slice(r+1))}if(n){let{location:t}=W.current().response,r=`${t.pathname}${window.location.search}#${n}`;W.navigate({url:r}),Ti(e,n)}}function Oi(e){let{hash:t}=W.current().response.location;t?Ti(e,t):window.scroll(0,0)}function ki(e,t){return mn(En(e.content,t))}var Ai=class extends yi{constructor(){super(),this._page=null,this._loadVersion=0,this.nav=[],this.name=null,this.vars={},this.type=`page`,this.content=ki}connectedCallback(){super.connectedCallback(),this._unwatchRouter=W.observe(()=>this.requestUpdate()),this.shadowRoot.addEventListener(`click`,e=>{Di(this.shadowRoot,e.target)},!1)}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter?.(),this._unwatchRouter=null}async updated(e){this._page===null||e.has(`name`)||e.has(`type`)?await this.reload():this.hasAttribute(`data-content-ready`)&&await this._publishContentReady(this._loadVersion)}async reload(){let e=++this._loadVersion;this.removeAttribute(`data-content-ready`),this.removeAttribute(`data-content-error`);let t;try{if(t=await Dr(this.type).load(B(),this.name),!t||typeof t!=`object`||typeof t.content!=`string`)throw TypeError(`Page "${this.name}" did not return rendered content`);if(e!==this._loadVersion||!this.isConnected)return;this._page=t,wi(t)}catch(t){e===this._loadVersion&&this._publishContentError(t);return}await this._publishContentReady(e)}async _publishContentReady(e){if(this._page&&e===this._loadVersion&&this.isConnected){try{await this.updateComplete,await Promise.all(Array.from(this.shadowRoot.querySelectorAll(`app-link, app-page-nav`),e=>e.updateComplete))}catch(t){e===this._loadVersion&&this.isConnected&&this._publishContentError(t,`content update failed`);return}this._page&&e===this._loadVersion&&this.isConnected&&(Oi(this.shadowRoot),this.setAttribute(`data-content-ready`,`true`),this.dispatchEvent(new CustomEvent(`content-ready`,{bubbles:!0,composed:!0,detail:{notFound:this.name===`notfound`}})))}}_publishContentError(e,t=`content request failed`){let n=e.message||t;this.setAttribute(`data-content-error`,n),this.dispatchEvent(new CustomEvent(`content-error`,{bubbles:!0,composed:!0,detail:{message:n}}))}_renderNav(){let[e,t]=this.nav;return O`
      <app-page-nav pageType="${this.type}" .prev="${e}" .next="${t}"></app-page-nav>
    `}render(){return this._page?O`
      <article itemscope itemtype="http://schema.org/Article">
        <h1>${En(this._page.title)}</h1>
        <old-version-alert></old-version-alert>
        <div class="description md">${this.content(this._page,this.vars)}</div>
      </article>
      ${this.nav&&this.nav.length?this._renderNav():``}
    `:O``}};P(Ai,`cName`,`app-page`),P(Ai,`properties`,{type:{type:String},name:{type:String},vars:{type:Object,attribute:!1},content:{type:Function,attribute:!1},nav:{type:Array},_page:{type:Object}}),Ai.styles=[si,Y,li,c`
    :host {
      display: block;
      padding-bottom: 30px;
    }

    app-page-nav {
      margin-top: 20px;
    }
  `];var ji=class extends N{constructor(){super(),this.next=null,this.prev=null,this.pageType=`page`}_linkTo(e){let t=this[e];return t?O`
      <app-link to="${this.pageType}" .params="${t}" class="${e}">
        ${t.title}
      </app-link>
    `:``}render(){return O`
      ${this._linkTo(`prev`)}
      ${this._linkTo(`next`)}
    `}};P(ji,`cName`,`app-page-nav`),P(ji,`properties`,{next:{type:Object},prev:{type:Object},pageType:{type:String}}),ji.styles=c`
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
`;var Mi=`/v7/assets/casl-shield-Czvcyms2.png`,Ni=[`isomorphic`,`versatile`,`declarative`,`typesafe`,`treeshakable`];function Pi(e){return O`
    <section class="feature">
      <h3>${G(`features.${e}.title`)}</h3>
      <p>${K(`features.${e}.description`,{size:(6981/1024).toFixed(1)})}</p>
    </section>
  `}var Fi=()=>O`
  <section class="features">${Ni.map(Pi)}</section>
`;Fi.styles=[c`
    .features {
      display: -ms-grid;
      display: grid;
      justify-content: center;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      -ms-grid-columns: ${s(Ni.map(()=>`minmax(200px, 1fr)`).join(` `))};
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
  `];var Ii=[{name:`Strapi`,url:`https://strapi.io/`},{name:`Meshery`,url:`https://meshery.io/`},{name:`Infisical`,url:`https://infisical.com/`},{name:`Lightdash`,url:`https://www.lightdash.com/`}],Li=()=>O`
  <div class="adoption">
    <section aria-labelledby="adoption-title">
      <h2 id="adoption-title">${G(`adoption.title`)}</h2>
      <ul class="adoption-metrics">
        <li>
          <a href="https://github.com/stalniy/casl/network/dependents" target="_blank" rel="noopener noreferrer">
            <strong>100K+</strong>
            <span>${G(`adoption.githubDependents`)}</span>
          </a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/@casl/ability?activeTab=dependents" target="_blank" rel="noopener noreferrer">
            <strong>600+</strong>
            <span>${G(`adoption.npmDependents`)}</span>
          </a>
        </li>
      </ul>
    </section>
    <section aria-labelledby="adoption-projects-title">
      <h2 id="adoption-projects-title">${G(`adoption.projectsTitle`)}</h2>
      <ul class="adoption-projects" aria-labelledby="adoption-projects-label">
        ${Ii.map((e,t)=>O`
          <li>
            ${t?O`<span aria-hidden="true">·</span>`:``}
            <a href="${e.url}" target="_blank" rel="noopener noreferrer">
              ${e.name}
            </a>
          </li>
        `)}
      </ul>
      <p class="adoption-contribute">
        <a href="https://github.com/stalniy/casl/discussions/1307" target="_blank" rel="noopener noreferrer">
          ${G(`adoption.contribute`)}
          <span aria-hidden="true">→</span>
        </a>
      </p>
    </section>
  </div>
`;Li.styles=c`
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
`;var Ri=class extends N{connectedCallback(){super.connectedCallback(),this._publishVersion=(this._publishVersion||0)+1,this._publishContentReady(this._publishVersion)}async _publishContentReady(e){await this.updateComplete,await Promise.all(Array.from(this.shadowRoot.querySelectorAll(`app-link`),e=>e.updateComplete)),this.isConnected&&e===this._publishVersion&&this.dispatchEvent(new CustomEvent(`content-ready`,{bubbles:!0,composed:!0}))}render(){return O`
      <div class="bg">
        <header class="row wrap container">
          <div class="col row wrap align-start main">
            <div class="col details">
              <div class="row hero-row">
                <img src="${Mi}" width="126" height="152" class="col col-fixed logo">
                <div class="hero">
                  <p class="eyebrow">${G(`hero.heading`)}</p>
                  <h1 class="hero-title">${G(`hero.title`)}</h1>
                  <p class="description">${G(`hero.description`)}</p>
                  <div class="buttons">
                    <app-link to="page" .params="${{id:`guide/intro`}}" class="btn btn-lg">
                      ${G(`buttons.start`)}
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
            <div class="example">${K(`exampleCode`)}</div>
          </div>
        </header>
      </div>
      ${Li()}
      <section class="features-brand">
        <div class="container">
          <p class="eyebrow">POWERFUL PERMISSIONS. MINIMAL OVERHEAD</p>
          ${Fi()}
        </div>
      </section>
      <section class="capabilities container">
        <p class="eyebrow">${G(`home.evolution.heading`)}</p>
        <h2>${G(`home.evolution.title`)}</h2>
        <p class="capabilities-intro">${G(`home.evolution.subtitle`)}</p>
        <authorization-examples></authorization-examples>
        <p class="capabilities-note">${G(`home.evolution.note`)}</p>
      </section>
    `}};P(Ri,`cName`,`home-page`),Ri.styles=[Wr,ci,Fi.styles,Li.styles,li,c`
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
  `];function zi(e,t,n){let r={...n,session_id:crypto.randomUUID()},i=new Set,a=()=>{if(!Number.isFinite(e.duration)||e.duration<=0)return 0;let t=0;for(let n=0;n<e.played.length;n++)t+=e.played.end(n)-e.played.start(n);return Math.min(100,t/e.duration*100)},o=e=>{i.has(e)||(i.add(e),t(`casl_video_${e}`,r))},s=()=>{let e=a();[25,50,75].forEach(t=>{e>=t&&o(String(t))}),e>=99.9&&o(`complete`)};return o(`open`),{play:()=>o(`play`),progress:s,close(){s(),t(`casl_video_close`,{...r,watched_percentage:Number(a().toFixed(2)),position_seconds:Number(e.currentTime.toFixed(2))})}}}var Bi=`/v7/media/why-casl-v1`,Vi=class extends N{disconnectedCallback(){this._close(),super.disconnectedCallback()}_show(){if(this._session)return;let e=this.shadowRoot.querySelector(`dialog`),t=this.shadowRoot.querySelector(`video`);this._previousOverflow=document.body.style.overflow,this._previousPadding=document.body.style.paddingRight;let n=window.innerWidth-document.documentElement.clientWidth;n&&(document.body.style.paddingRight=`${parseFloat(getComputedStyle(document.body).paddingRight)+n}px`),document.body.style.overflow=`hidden`,this._session=zi(t,ai,{video:`why-casl`,version:`v1`}),this.shadowRoot.querySelector(`[role="status"]`).hidden=!0,t.poster=`${Bi}.webp`,t.src=`${Bi}.mp4`,e.showModal(),this.shadowRoot.querySelector(`.close`).focus(),t.play().catch(()=>{})}_close(){if(!this._session)return;let e=this.shadowRoot.querySelector(`video`);e.pause(),this._session.close(),this._session=null,e.currentTime=0,e.removeAttribute(`src`),e.removeAttribute(`poster`),e.load(),this.shadowRoot.querySelector(`dialog`).close(),document.body.style.overflow=this._previousOverflow,document.body.style.paddingRight=this._previousPadding,this.isConnected&&this.shadowRoot.querySelector(`.trigger`).focus()}_cancel(e){e.preventDefault(),this._close()}_backdrop(e){if(e.target!==e.currentTarget)return;let t=e.currentTarget.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&this._close()}render(){return O`
      <button class="btn trigger" type="button" aria-haspopup="dialog" @click="${this._show}">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
          fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">
          <rect x="3" y="6" width="12" height="12" rx="2" />
          <path d="m15 10 6-4v12l-6-4z" />
        </svg>
        ${G(`video.title`)}
      </button>
      <dialog aria-labelledby="video-title" @cancel="${this._cancel}" @click="${this._backdrop}">
        <header>
          <h2 id="video-title">${G(`video.title`)}</h2>
          <button class="close" type="button" @click="${this._close}">${G(`video.close`)} ×</button>
        </header>
        <video controls playsinline preload="none" aria-label="${G(`video.title`)}"
          @play="${()=>this._session?.play()}"
          @timeupdate="${()=>this._session?.progress()}"
          @ended="${()=>this._session?.progress()}"
          @error="${()=>{this.shadowRoot.querySelector(`[role="status"]`).hidden=!1}}">
          ${G(`video.unsupported`)}
        </video>
        <footer>
          <span role="status" hidden>${G(`video.error`)}</span>
          <a href="${Bi}.mp4" target="_blank" rel="noopener">${G(`video.fallback`)}</a>
        </footer>
      </dialog>
    `}};P(Vi,`cName`,`why-casl-video`),Vi.styles=[ci,c`
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
`];var Hi=`jeZRK9`,Ui=class extends N{connectedCallback(){if(super.connectedCallback(),!document.querySelector(`script[src="https://tally.so/widgets/embed.js"]`)){let e=document.createElement(`script`);e.src=`https://tally.so/widgets/embed.js`,e.async=!0,document.head.appendChild(e)}}_openInquiry(e){this._trackClick(`inquiry`),window.Tally?.openPopup&&(e.preventDefault(),window.Tally.openPopup(Hi,{layout:`modal`,width:700,autoClose:5e3,hideTitle:!0}))}_trackClick(e){ai(`consulting_cta_click`,{cta_location:this.getAttribute(`location`),cta_type:e})}render(){return O`
      <a class="btn" href="https://cal.com/sstotskyi/15min" @click="${()=>this._trackClick(`booking`)}">${G(`consulting.cta`)}</a>
      <a class="inquiry" href="https://tally.so/r/${Hi}" @click="${this._openInquiry}">${G(`consulting.inquiryCta`)}</a>
    `}};P(Ui,`cName`,`consulting-cta`),Ui.styles=[ci,c`
  :host {
    display: inline-block;
    margin: 1rem 0;
  }
  .btn {
    display: block;
    background: #202428;
    color: #fff;
    border-radius: 8px;
    padding: 12px 22px;
    text-align: center;
  }
  .btn:hover { background: #175d82; border-color: #175d82; }
  .btn:focus-visible { outline: 3px solid #175d82; outline-offset: 4px; }
  .inquiry {
    display: block;
    margin-top: 12px;
    color: #175d82;
    font-size: .85rem;
    text-align: center;
  }
  .inquiry:focus-visible { outline: 3px solid #175d82; outline-offset: 4px; }
`];var Wi=`/v7/assets/creator-photo-DkdobRBc.jpeg`,Gi=`/v7/assets/engineer-photo-BUNqpLSe.jpeg`,Ki=class extends yi{constructor(){super(),this._carouselIndices={architecture:0,engagement:0},this._comparisonMobile=!1,this._onComparisonBreakpoint=()=>{this._comparisonMobile=this._comparisonMedia.matches,this._carouselWidths=new WeakMap}}connectedCallback(){super.connectedCallback(),this._comparisonMedia=window.matchMedia(`(max-width: 767px)`),this._comparisonMedia.addEventListener(`change`,this._onComparisonBreakpoint),this._onComparisonBreakpoint(),this.requestUpdate(),this._unwatchRouter=W.observe(()=>this.requestUpdate()),this.shadowRoot.addEventListener(`click`,this._navigateToSection)}disconnectedCallback(){this._comparisonMedia.removeEventListener(`change`,this._onComparisonBreakpoint),this._comparisonObserver?.disconnect(),this._comparisonObserver=null,this._unwatchRouter?.(),this.shadowRoot.removeEventListener(`click`,this._navigateToSection),super.disconnectedCallback()}_navigateToSection(e){Di(e.currentTarget,e.target)}reload(){return Promise.resolve()}_syncCarousels(){this._comparisonMobile&&this.shadowRoot.querySelectorAll(`[data-carousel]`).forEach(e=>{let t=this._carouselIndices[e.dataset.carousel];this._carouselWidths.get(e)!==e.clientWidth&&(this._carouselWidths.set(e,e.clientWidth),e.scrollTo({left:t*e.clientWidth,behavior:`instant`}));let n=e.children[t];e.style.setProperty(`--carousel-height`,`${Math.ceil(n.getBoundingClientRect().height)}px`)})}_onCarouselScroll(e){if(!this._comparisonMobile)return;let t=e.currentTarget,n=t.dataset.carousel,r=t.clientWidth;if(!r||this._carouselWidths.get(t)!==r)return;let i=Math.min(1,Math.max(0,Math.round(t.scrollLeft/t.clientWidth)));i!==this._carouselIndices[n]&&(t.children[this._carouselIndices[n]].contains(this.shadowRoot.activeElement)&&this.shadowRoot.getElementById(`${n}-control-${i}`).focus({preventScroll:!0}),this._carouselIndices={...this._carouselIndices,[n]:i})}_scrollCarousel(e,t){let n=this.shadowRoot.querySelector(`[data-carousel="${e}"]`),r=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;n.scrollTo({left:t*n.clientWidth,behavior:r?`instant`:`smooth`})}_renderCarouselControls(e,t,n){return O`
      <div class="carousel-controls" role="group" aria-labelledby="${t}">
        ${n.map((t,n)=>O`
          <button type="button" id="${e}-control-${n}"
            aria-controls="${e}-slide-${n}" aria-pressed="${this._carouselIndices[e]===n}"
            @click="${()=>this._scrollCarousel(e,n)}">${G(t)}</button>
        `)}
      </div>
    `}async updated(){if(this._comparisonObserver||(this._comparisonObserver=new ResizeObserver(()=>this._syncCarousels()),this.shadowRoot.querySelectorAll(`[data-carousel] > *`).forEach(e=>this._comparisonObserver.observe(e))),this._syncCarousels(),wi({meta:{title:V(`consulting.meta.title`),description:V(`consulting.meta.description`),keywords:V(`consulting.meta.keywords`)}}),await Promise.all(Array.from(this.shadowRoot.querySelectorAll(`app-link, authorization-examples, consulting-cta`),e=>e.updateComplete)),!this.isConnected)return;let e=W.current().response;this._renderedRoute!==e&&(this._renderedRoute=e,Oi(this.shadowRoot)),this.dispatchEvent(new CustomEvent(`content-ready`,{bubbles:!0,composed:!0}))}render(){return O`
      <article>
        <p class="page-eyebrow">${G(`consulting.hero.eyebrow`)}<span class="eyebrow-detail"> / ${G(`consulting.hero.eyebrowDetail`)}</span></p>
        <h1 class="page-title">${G(`consulting.hero.title`)}</h1>
        <div class="description md">
          <div class="consulting">
            <div class="consulting-hero">
              <div class="lead">${G(`consulting.hero.lead`)}</div>
              <div class="tablet">${G(`consulting.hero.support`)}</div>
              <consulting-cta location="hero"></consulting-cta>
            </div>
            <h2 id="nearly-a-decade-of-authorization-expertise">${G(`consulting.proof.title`)}</h2>
            <div class="proof-metrics">
              <p><a href="https://github.com/stalniy/casl/commit/8694688a3b87ea9f2806b93ae6ba7b3b613012c5" target="_blank" rel="noopener nofollow"><strong>${G(`consulting.proof.since`)}</strong><span>${G(`consulting.proof.longevityLabel`)}</span></a></p>
              <p><a href="https://api.npmjs.org/downloads/point/last-month/@casl/ability" target="_blank" rel="noopener nofollow"><strong>${G(`consulting.proof.downloads`)}</strong><span>${G(`consulting.proof.downloadsLabel`)}</span></a></p>
              <p><a href="https://github.com/stalniy/casl/stargazers" target="_blank" rel="noopener nofollow"><strong>${G(`consulting.proof.stars`)}</strong><span>${G(`consulting.proof.starsLabel`)}</span></a></p>
            </div>
            <section class="adoption-proof" aria-labelledby="casl-adoption-title">
              <h3 id="casl-adoption-title">${G(`consulting.proof.adoptionTitle`)}</h3>
              <div class="lead">${G(`consulting.proof.adoptionDescription`)}</div>
              <ul class="adoption-text-projects">
                ${Ii.map((e,t)=>O`
                  <li>
                    ${t?O`<span aria-hidden="true">·</span>`:``}
                    <a href="${e.url}" target="_blank" rel="noopener noreferrer">${e.name}</a>
                  </li>
                `)}
              </ul>
            </section>
            <div class="ecosystem-recognition">
              <section aria-labelledby="ecosystem-recognition-title">
                <h3 id="ecosystem-recognition-title">${G(`consulting.proof.ecosystemTitle`)}</h3>
                <ul class="ecosystem-links">
                  <li><a href="https://www.openpolicyagent.org/docs/rest-api#compile-api" target="_blank" rel="noopener nofollow">${G(`consulting.proof.openPolicyAgent`)}</a> — ${G(`consulting.proof.opaRelationship`)}</li>
                  <li><a href="https://www.cerbos.dev/ecosystem/ucast" target="_blank" rel="noopener nofollow">${G(`consulting.proof.cerbos`)}</a> — ${G(`consulting.proof.cerbosRelationship`)}</li>
                  <li><a href="https://docs.permit.io/integrations/feature-flagging/casl/" target="_blank" rel="noopener nofollow">${G(`consulting.proof.permitIo`)}</a> — ${G(`consulting.proof.permitRelationship`)}</li>
                  <li><a href="https://docs.nestjs.com/v7/security/authorization#integrating-casl" target="_blank" rel="noopener nofollow">${G(`consulting.proof.nestjs`)}</a> — ${G(`consulting.proof.nestjsRelationship`)}</li>
                </ul>
              </section>
              <figure class="ucast-flow tablet">
                <figcaption>${G(`consulting.proof.flowTitle`)}</figcaption>
                <div class="filter-flow" role="img" aria-label="${G(`consulting.proof.flowLabel`)}">
                  <span>${G(`consulting.proof.opaRego`)}</span>
                  <b aria-hidden="true">→</b>
                  <span class="highlight-node">${G(`consulting.proof.ucast`)}</span>
                  <b aria-hidden="true">→</b>
                  <span>${G(`consulting.proof.dataFilter`)}</span>
                </div>
                <p>${G(`consulting.proof.flowCaption`)}</p>
              </figure>
            </div>
            <h2 id="authorization-becomes-architecture">${G(`consulting.problem.title`)}</h2>
            ${this._renderCarouselControls(`architecture`,`authorization-becomes-architecture`,[`consulting.problem.before`,`consulting.problem.after`])}
            <div class="architecture-comparison mobile-carousel" data-carousel="architecture" @scroll="${this._onCarouselScroll}">
              <figure class="architecture before" id="architecture-slide-0"
                ?inert="${this._comparisonMobile&&this._carouselIndices.architecture!==0}">
                <figcaption class="tablet"><span class="eyebrow">${G(`consulting.problem.before`)}</span><strong>${G(`consulting.problem.beforeTitle`)}</strong></figcaption>
                <div class="layer-grid scattered">
                  <div class="layer">${G(`consulting.problem.frontend`)}<code>roles.includes('admin')</code></div>
                  <div class="layer">${G(`consulting.problem.api`)}<code>user.tenantId === tenantId</code></div>
                  <div class="layer">${G(`consulting.problem.services`)}<code>roles.includes('admin')</code></div>
                  <div class="layer">${G(`consulting.problem.databaseQueries`)}<code>WHERE tenant_id = ?</code></div>
                </div>
                <p class="caption">${G(`consulting.problem.beforeCaption`)}</p>
              </figure>
              <figure class="architecture after" id="architecture-slide-1"
                ?inert="${this._comparisonMobile&&this._carouselIndices.architecture!==1}">
                <figcaption class="tablet"><span class="eyebrow">${G(`consulting.problem.after`)}</span><strong>${G(`consulting.problem.afterTitle`)}</strong></figcaption>
                <div class="policy-model">${K(`consulting.problem.sharedModel`)}</div>
                <div class="layer-grid consistent">
                  <div class="layer ui-layer">
                    ${G(`consulting.problem.frontend`)}
                    <small>${G(`consulting.problem.uiVisibilityOnly`)}</small>
                    <code>ability.can(<wbr>'update',<wbr> project)</code>
                  </div>
                  <div class="layer">
                    ${G(`consulting.problem.api`)}
                    <small>${G(`consulting.problem.enforceRequests`)}</small>
                    <code>ability.can(<wbr>'update',<wbr> project)</code>
                  </div>
                  <div class="layer">
                    ${G(`consulting.problem.servicesJobs`)}
                    <small>${G(`consulting.problem.enforceOperations`)}</small>
                    <code>ability.can(<wbr>'update',<wbr> project)</code>
                  </div>
                  <div class="layer">
                    ${G(`consulting.problem.databaseQueries`)}
                    <small>${G(`consulting.problem.filterAccessibleRecords`)}</small>
                    <code tabindex="0">accessibleBy(ability, 'update')<wbr>.ofType(<wbr>'Project')</code>
                  </div>
                </div>
                <p class="caption">${G(`consulting.problem.afterCaption`)}</p>
              </figure>
            </div>
            <h2 id="a-path-from-simple-claims-to-relationships">${G(`consulting.evolution.title`)}</h2>
            <p class="section-intro">${G(`consulting.evolution.intro`)}</p>
            <authorization-examples></authorization-examples>
            <p class="caption">${G(`consulting.evolution.caption`)}</p>
            <h2 id="expertise-where-your-team-needs-it">${G(`consulting.engagements.title`)}</h2>
            ${this._renderCarouselControls(`engagement`,`expertise-where-your-team-needs-it`,[`consulting.engagements.advisoryEyebrow`,`consulting.engagements.implementationEyebrow`])}
            <div class="engagement-comparison mobile-carousel" data-carousel="engagement" @scroll="${this._onCarouselScroll}">
              <div class="engagement" id="engagement-slide-0"
                ?inert="${this._comparisonMobile&&this._carouselIndices.engagement!==0}">
                <p class="eyebrow">${G(`consulting.engagements.advisoryEyebrow`)}</p>
                <h3>${G(`consulting.engagements.advisoryTitle`)}</h3>
                <p>${G(`consulting.engagements.advisoryIntro`)}</p>
                <ol class="engagement-steps">
                  <li><strong>${G(`consulting.engagements.assessment`)}</strong><span>${G(`consulting.engagements.assessmentDescription`)}</span></li>
                  <li><strong>${G(`consulting.engagements.systemDesign`)}</strong><span>${G(`consulting.engagements.designDescription`)}</span></li>
                  <li><strong>${G(`consulting.engagements.migrationRoadmap`)}</strong><span>${G(`consulting.engagements.roadmapDescription`)}</span></li></ol>
                <p class="engagement-outcome">${G(`consulting.engagements.advisoryOutcome`)}</p>
              </div>
              <div class="engagement implementation" id="engagement-slide-1"
                ?inert="${this._comparisonMobile&&this._carouselIndices.engagement!==1}">
                <p class="eyebrow">${G(`consulting.engagements.implementationEyebrow`)}</p>
                <h3>${G(`consulting.engagements.implementationTitle`)}</h3>
                <p>${G(`consulting.engagements.implementationIntro`)}</p>
                <ol class="engagement-steps">
                  <li><strong>${G(`consulting.engagements.architecture`)}</strong><span>${G(`consulting.engagements.architectureDescription`)}</span></li>
                  <li><strong>${G(`consulting.engagements.integration`)}</strong><span>${G(`consulting.engagements.integrationDescription`)}</span></li>
                  <li><strong>${G(`consulting.engagements.testingRollout`)}</strong><span>${G(`consulting.engagements.rolloutDescription`)}</span></li></ol>
                <p class="engagement-outcome">${G(`consulting.engagements.implementationOutcome`)}</p>
              </div>
            </div>
            <p class="engagement-terms">${G(`consulting.engagements.b2bTerms`)}</p>
            <h2 id="work-directly-with-experienced-engineers">${G(`consulting.team.title`)}</h2>
            <div class="team-summary">
              <div class="team-profile">
                <div class="team-portrait">
                  <img src="${Wi}" alt="${G(`consulting.team.creatorName`)}" width="104" height="104" loading="lazy" decoding="async">
                </div>
                <div>
                  <h3><a href="https://www.linkedin.com/in/sstotskyi/" target="_blank" rel="noopener nofollow">${G(`consulting.team.creatorName`)}</a></h3>
                  <p class="team-role">${G(`consulting.team.creatorRole`)}</p>
                  <p>${G(`consulting.team.creatorDescription`)}</p>
                </div>
              </div>
              <div class="team-profile">
                <div class="team-portrait">
                  <img class="engineer-portrait" src="${Gi}" alt="${G(`consulting.team.engineerName`)}" width="104" height="104" loading="lazy" decoding="async">
                </div>
                <div>
                  <h3><a href="https://www.linkedin.com/in/igryshaiev/" target="_blank" rel="noopener nofollow">${G(`consulting.team.engineerName`)}</a></h3>
                  <p class="team-role">${G(`consulting.team.engineerRole`)}</p>
                  <p>${G(`consulting.team.engineerDescription`)}</p>
                </div>
              </div>
            </div>
            <div class="team-collaboration">
              <p>${G(`consulting.team.collaborationDescription`)}</p>
            </div>
            <div class="consulting-contact">
              <h2 id="a-clearer-path-for-your-authorization-architecture">${G(`consulting.contact.title`)}</h2>
              <p>${G(`consulting.contact.description`)}</p>
              <p><consulting-cta location="footer"></consulting-cta></p>
              <p class="caption">${G(`consulting.contact.engagementMetadata`)}</p>
            </div>
        </div></div>
      </article>
    `}};P(Ki,`cName`,`consulting-page`),P(Ki,`properties`,{_carouselIndices:{state:!0},_comparisonMobile:{state:!0}}),Ki.styles=[si,Y,li,Wr,c`
  :host { display: block; padding-bottom: 30px; }

  :host article { max-width: 1120px; margin: auto; padding: 20px 6px 0; }
  :host article > h1 {
    max-width: 900px;
    margin: 10px 0 16px;
    font-size: 1.65rem;
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -.035em;
    cursor: auto;
  }
  :host .description { padding-left: 0; }
  .page-eyebrow { font-size: .72rem; letter-spacing: .12em; font-weight: 700; color: #526575; margin: 0; }
  .page-eyebrow .eyebrow-detail { display: none; }
  .consulting { color: #26333c; }
  .consulting * { box-sizing: border-box; }
  .consulting p { line-height: 1.6; }
  .consulting > h2 { margin: 36px 0 24px; padding-top: 24px; border-top: 1px solid #d9e2e8; border-bottom: 0; font-size: clamp(1.6rem, 3vw, 2rem); line-height: 1.2; letter-spacing: -.02em; font-weight: 600; cursor: auto; }
  .consulting-hero + h2 { margin-top: 28px; padding-top: 20px; margin-bottom: 20px; }
  .consulting h3 { font-size: 1.2rem; font-weight: 600; margin: 0 0 14px; cursor: auto; }
  .consulting h3::before { content: none; }
  .consulting a, .consulting app-link { color: #175d82; }
  .consulting a:focus-visible, .consulting summary:focus-visible { outline: 3px solid #175d82; outline-offset: 4px; }
  .consulting .caption { font-size: .82rem; color: #52616c; line-height: 1.5; }
  .consulting .eyebrow { display: block; font-size: .7rem; font-weight: 700; letter-spacing: .1em; color: #526575; margin-bottom: 10px; }
  .consulting .consulting-hero { max-width: 850px; }

  .adoption-proof .lead,
  .consulting-hero .lead {
    font-size: 1.1rem;
    color: #435764;
    margin-bottom: 8px;
    line-height: 1.5;
  }
  .consulting .consulting-hero consulting-cta { max-width: 100%; margin: 8px 0 0; }
  .consulting .consulting-hero > p:has(consulting-cta) { display: inline-block; margin-block: 0; }
  .consulting .consulting-hero > p:has(a) { display: block; margin-left: 0; }
  .consulting details { border-top: 1px solid #d9e2e8; margin: 16px 0; padding-top: 14px; font-size: .9rem; }
  .consulting summary { cursor: pointer; color: #175d82; padding: 4px 0; }
  .consulting details > p { max-width: 850px; }
  .consulting .takeaway { font-weight: 600; line-height: 1.6; padding-left: 18px; border-left: 3px solid #81a2be; }
  .consulting .proof-metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 12px; }
  .consulting .proof-metrics > p { margin: 0; border-left: 3px solid #aec6d5; padding-left: 10px; min-width: 0; }
  .consulting .proof-metrics a { text-decoration: none; display: block; color: #202428; }
  .consulting .proof-metrics a:hover { text-decoration: underline; }
  .consulting .proof-metrics strong { display: block; font-size: clamp(1.35rem, 5.5vw, 1.65rem); letter-spacing: -.035em; line-height: 1.3; }
  .consulting .proof-metrics span { display: block; font-size: .8125rem; color: #526575; text-wrap: pretty; }
  .consulting .adoption-proof { margin-top: 24px; }
  .consulting .adoption-proof > h3 { margin: 0; font-size: 1.15rem; color: #202428; }
  .consulting .adoption-logos { display: grid; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px; padding: 16px 0; grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .consulting .adoption-logos a { display: flex; align-items: center; justify-content: center; flex: 0 1 220px; max-width: 100%; min-height: 44px; min-width: 0; }
  .consulting .adoption-logos img { display: block; width: auto; max-width: 100%; height: clamp(20px, 5.5vw, 28px); object-fit: contain; }
  .consulting .adoption-text-projects { display: flex; flex-wrap: wrap; justify-content: flex-start; gap: .35rem .5rem; padding: 0; margin: 0 0 24px; list-style: none; color: #555; font-size: .9375rem; }
  .consulting .adoption-text-projects li { display: flex; align-items: center; gap: .5rem; }
  .consulting .adoption-text-projects a { color: inherit; text-decoration: none; }
  .consulting .adoption-text-projects a:hover { text-decoration: underline; }
  .adoption-proof .lead {
    margin-top: 10px;
  }
  .consulting .ecosystem-recognition { display: grid; grid-template-columns: 1fr; gap: 24px; padding-top: 24px; border-top: 1px solid #d9e2e8; }
  .consulting .ecosystem-recognition h3, .consulting .ucast-flow figcaption { font-size: 1rem; font-weight: 600; color: #526575; margin: 0 0 12px; line-height: 1.4; }
  .consulting .ecosystem-links { list-style: none; padding: 0; margin: 0; font-size: .82rem; color: #52616c; line-height: 1.6; }
  .consulting .ecosystem-links li + li { margin-top: 8px; }
  .consulting .ecosystem-links a { font-weight: 600; }
  .consulting .ucast-flow { min-width: 0; margin: 0; }
  .consulting .ucast-flow p { font-size: .82rem; color: #52616c; margin: 12px 0 0; }
  .consulting .filter-flow { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr); gap: 10px; align-items: center; text-align: center; }
  .consulting .filter-flow > span { padding: 8px 4px; border: 1px solid #d4dfe6; border-radius: 5px; font-size: .82rem; }
  .consulting .filter-flow .highlight-node { background: #edf3f6; border-color: #b9cedb; color: #175d82; font-weight: 600; }
  .consulting .filter-flow b, .consulting .decision-flow b, .consulting .mini-flow b { color: #668ba2; }
  .consulting .architecture-comparison, .consulting .relationship-options, .consulting .engagement-comparison, .consulting .team-summary { display: grid; grid-template-columns: 1fr; gap: 24px; }
  .carousel-controls { display: inline-flex; gap: 4px; padding: 4px; margin-bottom: 12px; border: 1px solid #b9cedb; border-radius: 8px; background: #edf3f6; }
  .carousel-controls button { padding: 8px 18px; border: 0; border-radius: 5px; background: transparent; color: #435764; font: inherit; font-size: .85rem; font-weight: 600; cursor: pointer; }
  .carousel-controls button[aria-pressed="true"] { background: #175d82; color: #fff; }
  .carousel-controls button:hover { box-shadow: inset 0 0 0 1px #175d82; }
  .carousel-controls button:focus-visible { outline: 3px solid #175d82; outline-offset: 2px; }
  @media (max-width: 767px) {
    .consulting .mobile-carousel {
      display: flex;
      align-items: flex-start;
      gap: 0;
      min-width: 0;
      max-width: 100%;
      height: var(--carousel-height, auto);
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      overscroll-behavior-x: contain;
      scrollbar-width: none;
    }
    .consulting .mobile-carousel::-webkit-scrollbar { display: none; }
    .consulting .mobile-carousel > * { box-sizing: border-box; min-width: 0; flex: 0 0 100%; scroll-snap-align: start; }
  }
  .consulting .architecture { position: relative; min-width: 0; margin: 0; border: 1px solid #d4dfe6; border-radius: 10px; padding: 12px; display: flex; flex-direction: column; }
  .consulting .architecture figcaption { margin-bottom: 10px; line-height: 1.3; }
  .consulting .architecture .eyebrow { margin-bottom: 6px; }
  .consulting .architecture figcaption strong { font-size: 1rem; }
  .consulting .architecture .caption { margin: 12px 0 0; }
  .consulting .architecture.after { background: #f1f6f8; border-color: #a5bfce; }
  .consulting .layer-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 8px; }
  .consulting .layer {
    position: relative;
    border: 1px solid #b6c7d1;
    border-radius: 6px;
    background: #fff;
    min-width: 0;
    padding: 6px 10px;
    text-align: left;
    font-weight: 600;
    font-size: .9rem;
    line-height: 1.4;
    min-height: 0;
  }
  .consulting .layer code, .consulting .layer small { display: block; white-space: normal; overflow-wrap: normal; font-size: .75rem; margin: 4px 0 0; font-weight: 400; }
  .consulting .layer code { white-space: pre; overflow-x: auto; line-height: 1.5; }
  .consulting .layer code wbr { display: none; }
  .consulting .layer code { color: #675a53; background: #f7f4f2; }
  .consulting .scattered {
    position: relative;
    padding-top: 0;
    gap: 8px;
    margin: 0;
  }
  .consulting .scattered::before, .consulting .scattered::after { content: none; position: absolute; left: 15%; top: 50%; width: 70%; border-top: 2px dashed #c2b7ad; transform: rotate(24deg); }
  .consulting .scattered::after { transform: rotate(-24deg); }
  .consulting .scattered .layer { z-index: 1; border-style: dashed; }
  .consulting .policy-model { position: relative; background: #175d82; border-radius: 6px; padding: 1px; }
  .consulting .policy-model pre { margin: 0; }
  .consulting .policy-model .hljs { margin: 0; padding: 12px 14px; box-shadow: none; font-size: .8rem; line-height: 1.5; }
  .consulting .consistent {
    position: relative;
    padding: 12px 0 0 12px;
    gap: 8px;
    grid-auto-rows: auto;
  }
  .consulting .consistent::before { content: ''; position: absolute; left: 0; top: 0; bottom: 29px; border-left: 1px solid #81a2be; transform: none; }
  .consulting .consistent .layer::before { content: ''; position: absolute; top: 50%; right: auto; left: -13px; width: 12px; border-top: 1px solid #81a2be; }
  .consulting .consistent .layer:nth-child(even)::before { right: auto; left: -13px; }
  .consulting .consistent .layer code { background: #edf3f6; color: #175d82; }
  .consulting .consistent .layer small { display: inline; color: #52616c; margin: 0 0 0 8px; }
  .consulting .architecture-takeaway { margin-top: 18px; font-size: .9rem; }
  .consulting .architecture-takeaway .caption { font-weight: 400; margin: 4px 0 0; }
  .consulting .ui-layer { border-style: dashed; }
  .consulting .section-intro { margin-bottom: 12px; }
  .consulting .relationship-figure { margin: 0 0 24px; border: 1px solid #d4dfe6; border-radius: 10px; padding: 20px; }
  .consulting .relationship-figure figcaption { font-weight: 600; margin-bottom: 20px; }
  .consulting .resource-graph { display: grid; grid-template-columns: 1fr; align-items: center; gap: 8px; text-align: center; }
  .consulting .resource-graph > span { padding: 10px; background: #edf3f6; border: 1px solid #b9cedb; border-radius: 6px; font-size: .9rem; font-weight: 600; width: 100%; }
  .consulting .resource-graph > small { font-size: .65rem; color: #526575; }
  .consulting .resource-graph > small b { display: inline-block; transform: rotate(90deg); }
  .consulting .relationship-figure .caption { margin: 18px 0 0; }
  .consulting .relationship-options > div { padding: 24px; background: #f4f6f8; border-radius: 8px; }
  .consulting .relationship-options p { font-size: .9rem; margin: 18px 0 0; }
  .consulting .mini-flow { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: .85rem; text-align: center; }
  .consulting .mini-flow > span { padding: 6px 10px; border: 1px solid #c7d5df; border-radius: 4px; background: #fff; width: 100%; }
  .consulting .mini-flow code { color: #175d82; white-space: normal; overflow-wrap: anywhere; padding: 8px; background: #e5eef4; }
  .consulting .engagement { border: 1px solid #c8d6df; border-radius: 10px; padding: 20px; }
  .consulting .engagement.implementation { border-top: 3px solid #175d82; padding-top: 26px; background: #f5f8fa; }
  .consulting .engagement-steps { list-style: none; padding: 0; counter-reset: step; margin: 24px 0; }
  .consulting .engagement-steps li { counter-increment: step; position: relative; padding: 0 0 24px 40px; border-left: 1px solid #b6cbd8; margin-left: 12px; }
  .consulting .engagement-steps li:last-child { padding-bottom: 0; border-color: transparent; }
  .consulting .engagement-steps li::before { content: counter(step); position: absolute; left: -13px; top: 0; width: 24px; height: 24px; border-radius: 50%; background: #e7eff4; color: #175d82; display: grid; place-items: center; font-size: .75rem; font-weight: 600; }
  .consulting .engagement-steps strong { display: block; }
  .consulting .engagement-steps span { display: block; font-size: .85rem; color: #526575; margin-top: 4px; }
  .consulting .engagement-outcome { border-top: 1px solid #d4dfe6; padding-top: 18px; font-size: .9rem; font-weight: 600; margin-bottom: 0; }
  .consulting .engagement-terms { border-top: 1px solid #d4dfe6; margin: 18px 0; padding-top: 12px; color: #526575; font-size: .85rem; }
  @media (max-width: 767px) {
    .consulting .engagement { padding: 17px; }
    .consulting .engagement.implementation { padding-top: 22px; }
    .consulting .engagement > .eyebrow { display: none; }
    .consulting .engagement-steps { margin: 18px 0; }
    .consulting .engagement-steps li { padding-bottom: 20px; }
    .consulting .engagement-steps li:last-child { padding-bottom: 0; }
    .consulting .engagement-outcome { padding-top: 14px; }
  }
  .consulting .decision-flow { display: flex; align-items: center; gap: 10px; background: #f1f5f7; padding: 20px; border-radius: 8px; font-size: .9rem; flex-direction: column; text-align: center; }
  .consulting .decision-flow b { transform: rotate(90deg); }
  .consulting .decision-flow span { flex: 1; }
  .consulting .decision-flow strong { flex: 1; color: #175d82; }
  .consulting .team-profile { display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 16px; align-items: start; }
  .consulting .team-profile h3 { margin-top: 0; }
  .consulting .team-portrait { width: 104px; height: 104px; border-radius: 50%; overflow: hidden; }
  .consulting .team-portrait img { display: block; width: 104px; height: 104px; object-fit: cover; object-position: center; }
  .consulting .team-portrait .engineer-portrait { transform: scale(1.85); transform-origin: 50% 38%; }
  .consulting .team-summary p { font-size: .95rem; margin-bottom: 0; }
  .consulting .team-summary .team-role { color: #526575; font-weight: 600; margin-top: 8px; }
  .consulting .team-collaboration { margin-top: 32px; }
  .consulting .team-collaboration p { font-size: .95rem; margin-bottom: 0; }
  .consulting .consulting-contact { margin: 48px 0 24px; background: #edf3f6; padding: 24px; border-radius: 10px; }
  .consulting .consulting-contact h2 { margin: 0 0 20px; border: 0; padding: 0; font-size: 1.8rem; line-height: 1.25; font-weight: 600; cursor: auto; }
  .consulting .consulting-contact .caption { margin-bottom: 0; }

  .tablet {
    display: none;
  }

  consulting-cta {
    display: block;
  }

  @media (min-width: 768px) {
    .carousel-controls { display: none; }
    .consulting .section-intro { margin-bottom: 1em; }
    .page-eyebrow .eyebrow-detail { display: inline; }
    :host article > h1 { font-size: clamp(2rem, 4.6vw, 2.9rem); line-height: 1.1; margin: 12px 0 24px; }
    .consulting .consulting-hero .lead { font-size: 1.25rem; line-height: inherit; margin-bottom: 10px; }
    .consulting .consulting-hero consulting-cta { max-width: none; margin: 1rem 0; }
    .consulting .adoption-proof { margin-top: 32px; }
    .consulting .adoption-proof > h3 { font-size: 1.35rem; }
    .consulting .adoption-logos { display: flex; grid-template-columns: none; gap: 24px 64px; padding: 28px 0; }
    .consulting .adoption-logos a { min-width: auto; max-width: 42%; min-height: 76px; }
    .consulting .adoption-logos img { width: 220px; height: 56px; }
    .consulting .ecosystem-recognition { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 32px; }
    :host article { padding: 48px 20px 0; }
    .consulting > h2 { margin-top: 56px; padding-top: 32px; }
    .consulting-hero + h2 { margin-top: 56px; padding-top: 32px; margin-bottom: 24px; }
    .consulting .architecture-comparison, .consulting .relationship-options, .consulting .engagement-comparison, .consulting .team-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .consulting .proof-metrics { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
    .consulting .proof-metrics > p { min-width: auto; padding-left: 20px; }
    .consulting .proof-metrics strong { font-size: clamp(1.9rem, 4vw, 2.9rem); }
    .consulting .proof-metrics span { font-size: .9rem; text-wrap: wrap; }
    .consulting .architecture { min-width: auto; padding: 24px; }
    .consulting .architecture figcaption { margin-bottom: 24px; line-height: inherit; }
    .consulting .architecture figcaption strong { font-size: 1.15rem; }
    .consulting .architecture .eyebrow { margin-bottom: 10px; }
    .consulting .architecture .caption { margin-top: 22px; }
    .consulting .layer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; }
    .consulting .layer { min-width: auto; padding: 14px 6px; text-align: center; line-height: inherit; min-height: 120px; }
    .consulting .layer code, .consulting .layer small { white-space: normal; overflow-wrap: anywhere; font-size: .7rem; margin-top: 8px; }
    .consulting .layer code { overflow-x: visible; line-height: inherit; }
    .consulting .layer code wbr { display: inline; }
    .consulting .scattered { padding-top: 20px; gap: 44px 16px; margin: auto 0; }
    .consulting .scattered::before, .consulting .scattered::after { content: ''; }
    .consulting .consistent { padding: 20px 0 0; gap: 44px 16px; grid-auto-rows: 1fr; }
    .consulting .consistent::before { left: 50%; bottom: calc(25% - 16px); border-left-width: 2px; transform: translateX(-1px); }
    .consulting .consistent .layer::before { right: -9px; left: auto; width: 8px; border-top-width: 2px; }
    .consulting .consistent .layer:nth-child(even)::before { right: auto; left: -9px; }
    .consulting .consistent .layer small { display: block; margin: 6px 0 0; }
    .consulting .relationship-figure { padding: 24px; }
    .consulting .engagement { padding: 28px; }
    .consulting .decision-flow { flex-direction: row; text-align: inherit; gap: 14px; }
    .consulting .decision-flow b { transform: none; }
    .consulting .consulting-contact { padding: 32px; }
    .consulting .consulting-hero > p:has(a) { display: inline-block; margin-left: 22px; }

    .tablet { display: block; }
    consulting-cta { display: inline-block; }
  }

  @media (min-width: 1024px) {
    .consulting .resource-graph { grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr; }
    .consulting .resource-graph > small b { display: inline; transform: none; }
    .consulting .resource-graph > span { width: auto; padding: 16px 8px; }
  }
`];var qi=class extends yi{constructor(){super(),this._rebacApproach=`denormalized`}reload(){return Promise.resolve()}async getUpdateComplete(){let e=await super.getUpdateComplete();return await this.shadowRoot.querySelector(`authorization-timeline`).updateComplete,e}render(){return O`
      <div class="md">
        <authorization-timeline .label="${G(`consulting.evolution.modelsLabel`)}">
          ${[`claims`,`actions`,`rbac`,`abac`,`rebac`].map(e=>{let t=e===`rebac`?`consulting.evolution.rebac.${this._rebacApproach}`:`consulting.evolution.${e}`;return O`
            <section data-stage="${e}" data-title="${G(`consulting.evolution.${e}.title`)}">
              <div class="stage-layout">
                <div class="stage-copy">
                  <div class="stage-heading">
                    <span class="eyebrow">${G(`consulting.evolution.${e}.eyebrow`)}</span>
                    <h3>${G(`consulting.evolution.${e}.title`)}</h3>
                  </div>
                  <p>${G(`consulting.evolution.${e}.description`)}</p>
                  ${e===`rebac`?O`
                    <div class="rebac-approaches" role="radiogroup"
                      aria-label="${G(`consulting.evolution.rebac.approachesLabel`)}">
                      ${[`denormalized`,`sql`].map(e=>O`
                        <label>
                          <input type="radio" name="rebac-approach" value="${e}"
                            .checked="${this._rebacApproach===e}"
                            aria-controls="rebac-example"
                            @change="${()=>{this._rebacApproach=e}}">
                          <span>${G(`consulting.evolution.rebac.${e}.label`)}</span>
                        </label>
                      `)}
                    </div>
                  `:``}
                  <div class="stage-detail">${K(`${t}.detail`)}</div>
                </div>
                <div class="stage-code" role="region" tabindex="0"
                  id="${e}-example"
                  aria-label="${G(`consulting.evolution.${e}.title`)} — ${G(`consulting.evolution.codeLabel`)}">
                  ${K(`${t}.example`)}
                </div>
              </div>
            </section>
          `})}
        </authorization-timeline>
      </div>
    `}};P(qi,`cName`,`authorization-examples`),P(qi,`properties`,{_rebacApproach:{state:!0}}),qi.styles=[Y,li,c`
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
`];var Ji=class extends N{constructor(){super(),this.label=``,this._selected=0,this._stages=[]}firstUpdated(){this._readStages()}_readStages(){this._stages=Array.from(this.querySelectorAll(`:scope > section`)),this._select(Math.min(this._selected,Math.max(0,this._stages.length-1)))}_select(e,t=!1){this._selected=e,this._stages.forEach((t,n)=>{t.toggleAttribute(`data-active`,n===e),t.hidden=n!==e,t.inert=n!==e,t.setAttribute(`aria-hidden`,String(n!==e))}),t&&this.updateComplete.then(()=>this.shadowRoot.getElementById(`stage-${e}`)?.focus())}_activateStage(e,t=!1){this._select(e,t),ai(`consulting_stage_select`,{stage:this._stages[e].dataset.stage})}_onKeydown(e){if(![`ArrowRight`,`ArrowLeft`,`Home`,`End`].includes(e.key))return;e.preventDefault();let t=this._selected;e.key===`ArrowRight`&&(t=(t+1)%this._stages.length),e.key===`ArrowLeft`&&(t=(t-1+this._stages.length)%this._stages.length),e.key===`Home`&&(t=0),e.key===`End`&&(t=this._stages.length-1),this._activateStage(t,!0)}render(){return O`
      <div role="tablist" aria-label="${this.label}" @keydown="${this._onKeydown}">
        ${this._stages.map((e,t)=>O`
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
    `}};P(Ji,`cName`,`authorization-timeline`),P(Ji,`properties`,{label:{type:String},_selected:{state:!0},_stages:{state:!0}}),Ji.styles=c`
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
`;var Yi=`casl:github:stars:${L.repoURL}`,Xi=864e5,Zi=`https://api.github.com/repos/${new URL(L.repoURL).pathname.replace(/^\/|\/$/g,``).replace(/\.git$/,``)}`;function Qi(){try{let e=JSON.parse(localStorage.getItem(Yi));return e&&Number.isSafeInteger(e.stars)&&e.stars>=0&&Number.isFinite(e.timestamp)?e:null}catch{return null}}async function $i(){let e=Qi(),t=e?Date.now()-e.timestamp:1/0;if(t>=0&&t<Xi)return e.stars;try{let e=await fetch(Zi,{signal:typeof AbortSignal.timeout==`function`?AbortSignal.timeout(5e3):void 0});if(!e.ok)throw Error(`Failed to retrieve GitHub stars`);let{stargazers_count:t}=await e.json();if(!Number.isSafeInteger(t)||t<0)throw Error(`Invalid GitHub star count`);try{localStorage.setItem(Yi,JSON.stringify({stars:t,timestamp:Date.now()}))}catch{}return t}catch{return e?e.stars:null}}var ea=null;function ta(){return ea??(ea=$i()),ea}var na=new Intl.NumberFormat(`en-US`,{notation:`compact`,maximumFractionDigits:1}),ra=class extends N{connectedCallback(){super.connectedCallback(),ta().then(e=>{this.stars=e})}render(){return O`
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
        <span class="star-count">${this.stars==null?`—`:na.format(this.stars)}</span>
      </a>
    `}};P(ra,`cName`,`github-button`),P(ra,`properties`,{stars:{type:Number}}),ra.styles=c`
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
`;var ia=`casl:ability:monthly-downloads`,aa=864e5,oa=`https://api.npmjs.org/downloads/point/last-month/@casl/ability`;function sa(){try{let e=JSON.parse(localStorage.getItem(ia));return e&&Number.isSafeInteger(e.downloads)&&e.downloads>=0&&Number.isFinite(e.timestamp)?e:null}catch{return null}}async function ca(){let e=sa(),t=e?Date.now()-e.timestamp:1/0;if(t>=0&&t<aa)return e.downloads;try{let e=await fetch(oa,{signal:typeof AbortSignal.timeout==`function`?AbortSignal.timeout(5e3):void 0});if(!e.ok)throw Error(`Failed to retrieve npm downloads`);let{downloads:t}=await e.json();if(!Number.isSafeInteger(t)||t<0)throw Error(`Invalid npm download count`);try{localStorage.setItem(ia,JSON.stringify({downloads:t,timestamp:Date.now()}))}catch{}return t}catch{return e?e.downloads:null}}var la=null;function ua(){return la??(la=ca()),la}var da=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2018%207'%20width='36'%20height='14'%3e%3cpath%20fill='%23fff'%20d='M0%200h18v6H9v1H5V6H0V0zm1%201v4h2V2h1v3h1V1H1zm5%200v5h2V5h2V1H6zm2%201h1v2H8V2zm3-1v4h2V2h1v3h1V2h1v3h1V1h-6z'/%3e%3c/svg%3e`,fa=new Intl.NumberFormat(`en-US`,{notation:`compact`,maximumFractionDigits:1}),pa=class extends N{connectedCallback(){super.connectedCallback(),ua().then(e=>{this.downloads=e})}render(){return O`
      <a
        href="https://www.npmjs.com/package/@casl/ability"
        target="_blank"
        rel="noopener"
        title="@casl/ability downloads over the last 30 available days"
      >
        <span class="label"><img src="${da}" alt="npm" width="24" height="9"></span>
        <span class="download-count">${this.downloads==null?`—`:`${fa.format(this.downloads)}/month`}</span>
      </a>
    `}};P(pa,`cName`,`npm-downloads-button`),P(pa,`properties`,{downloads:{type:Number}}),pa.styles=c`
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
`;var ma={url:`https://github.com/stalniy/casl-examples`,label:`menu.examples`},ha=[ma,{id:`guide/intro`,label:`menu.guide`},{id:`advanced/ability-to-database-query`,label:`search.databaseQuery`},{id:`cookbook/intro`,label:`menu.cookbook`}],ga=O`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px">
    <path d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z" />
  </svg>
`,_a=class extends N{constructor(){super(),this.value=``,this.compact=!1,this._suggestions=null,this._activeIndex=0,this._loading=!1,this._error=!1,this._requestId=0,this._open=!1,this._search=_n(this._search,300),this._unwatchRouter=null,this._isMac=/Mac|iPhone|iPad/i.test(navigator.userAgentData?.platform||navigator.platform),this._shortcut=this._shortcut.bind(this)}connectedCallback(){super.connectedCallback(),this._unwatchRouter=W.observe(()=>this._close()),document.addEventListener(`keydown`,this._shortcut)}disconnectedCallback(){this._close(),this._unwatchRouter?.(),document.removeEventListener(`keydown`,this._shortcut),super.disconnectedCallback()}_shortcut(e){!(this._isMac?e.metaKey:e.ctrlKey)||e.altKey||e.shiftKey||e.isComposing||e.defaultPrevented||e.key.toLowerCase()!==`k`||(e.preventDefault(),this._show())}_setValue(e){this.value=e,this.dispatchEvent(new CustomEvent(`update`,{detail:e.trim()}))}_show(){let e=this.shadowRoot.querySelector(`dialog`);e.open||(this._open=!0,this._previousOverflow=document.body.style.overflow,document.body.style.overflow=`hidden`,e.showModal(),this.shadowRoot.querySelector(`input`).focus())}_close(){this._open&&(this._open=!1,this._requestId+=1,this.shadowRoot.querySelector(`dialog`).close(),document.body.style.overflow=this._previousOverflow,this._setValue(``),this._suggestions=null,this._activeIndex=0,this._loading=!1,this._error=!1,this.dispatchEvent(new CustomEvent(`reset`)))}_cancel(e){e.preventDefault(),this._close()}_clickBackdrop(e){if(e.target!==e.currentTarget)return;let t=e.currentTarget.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&this._close()}async _search(){let e=this.value.trim();if(!this._open||!e)return;let t=this._requestId;try{let n=await Dr(`page`).search(B(),e,{prefix:!0});if(!this._open||t!==this._requestId)return;this._suggestions=n.flatMap(e=>{let t=e.hints.title||e.doc.title,n=e.hints.headings||e.doc.headings||[],r={doc:e.doc,title:t,category:e.doc.categories[0]};return[r,...n.map(t=>({...r,title:t.title,parent:e.doc.title,hash:t.id}))]});let r=e.toLowerCase().split(/\s+/).some(e=>`example`.startsWith(e));r&&(this._suggestions=[ma,...this._suggestions]),ai(`search`,{search_term:e,result_count:n.length+Number(r)})}catch{if(!this._open||t!==this._requestId)return;this._error=!0}finally{this._open&&t===this._requestId&&(this._loading=!1)}}_updateValue(e){this._setValue(e.target.value),this._requestId+=1,this._suggestions=null,this._activeIndex=0,this._error=!1,this._loading=!!this.value.trim(),this._search()}_items(){return this._loading?[]:this._suggestions?.length?this._suggestions:ha}_url(e){return e.url||W.url({name:`page`,params:e.doc||{id:e.id},hash:e.hash})}_dialogKeydown(e){if(e.isComposing)return;if(e.key===`Escape`){e.preventDefault(),this._close();return}if(e.key!==`Tab`)return;e.preventDefault();let t=this.shadowRoot.querySelector(`input`),n=this.shadowRoot.querySelector(`.close`);(this.shadowRoot.activeElement===t?n:t).focus()}async _keydown(e){if(e.isComposing)return;let t=this._items();if((e.key===`ArrowDown`||e.key===`ArrowUp`)&&t.length){e.preventDefault();let n=e.key===`ArrowDown`?1:-1;this._activeIndex=(this._activeIndex+n+t.length)%t.length,await this.updateComplete,this.shadowRoot.querySelector(`#search-result-${this._activeIndex}`)?.scrollIntoView({block:`nearest`})}else e.key===`Enter`&&t.length&&(e.preventDefault(),this._navigate(e,t[this._activeIndex]))}_navigate(e,t){if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();let n=this._url(t);this._close(),t.url?window.location.assign(n):W.navigate({url:n})}_renderItems(){let e=this._items(),t=!this._suggestions?.length;return O`
      <div class="results" id="search-results" role="listbox" aria-label="${G(`search.results`)}">
        ${e.map((n,r)=>O`
          ${!t&&n.category&&n.category!==e[r-1]?.category?O`
            <h2 role="presentation">${G(`categories.${n.category}`)}</h2>
          `:``}
          <a id="search-result-${r}" role="option" tabindex="-1"
            aria-selected="${r===this._activeIndex}"
            href="${this._url(n)}"
            @mousemove="${()=>{this._activeIndex=r}}"
            @click="${e=>this._navigate(e,n)}">
            <span class="result-icon" aria-hidden="true">${n.hash?`#`:`›`}</span>
            <span>
              ${n.parent?O`<small>${n.parent}</small>`:``}
              ${n.label?G(n.label):mn(n.title)}
              ${n.url?O`
                <span role="img" aria-label="${G(`search.externalLink`)}"
                  title="${G(`search.externalLink`)}">
                  <svg class="external-link-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5v5M14 2 7 9" />
                  </svg>
                </span>
              `:``}
            </span>
            <span class="enter" aria-hidden="true">↵</span>
          </a>
        `)}
      </div>
    `}render(){let e=this._items(),t=this._isMac?`⌘ K`:`Ctrl K`;return O`
      <button class="trigger ${this.compact?`compact`:``}" type="button"
        aria-label="${G(`search.placeholder`)}" aria-haspopup="dialog"
        aria-keyshortcuts="${this._isMac?`Meta+K`:`Control+K`}"
        title="${G(`search.placeholder`)} (${t})" @click="${this._show}">
        ${ga}
      </button>
      <dialog aria-label="${G(`search.title`)}" @cancel="${this._cancel}"
        @click="${this._clickBackdrop}" @keydown="${this._dialogKeydown}">
        <div class="search-bar">
          <label for="search-input">${ga}<span class="sr-only">${G(`search.placeholder`)}</span></label>
          <input id="search-input" type="search" role="combobox" aria-expanded="true"
            aria-autocomplete="list" aria-controls="search-results"
            aria-activedescendant="${e.length?`search-result-${this._activeIndex}`:``}"
            autocomplete="off" autocorrect="off" spellcheck="false"
            placeholder="${G(`search.placeholder`)}" .value="${this.value}"
            @input="${this._updateValue}" @keydown="${this._keydown}">
          <button class="close" type="button" @click="${this._close}">${G(`search.close`)}</button>
        </div>
        <div class="status" role="status">
          ${this._loading?G(`search.loading`):this._error?G(`search.error`):this._suggestions?.length?G(`search.resultCount`,{count:this._suggestions.length}):this._suggestions?G(`search.noMatch`):G(`search.recommendations`)}
        </div>
        ${this._renderItems()}
        <footer>
          <span><kbd>↑</kbd><kbd>↓</kbd> ${G(`search.navigate`)}</span>
          <span><kbd>↵</kbd> ${G(`search.select`)}</span>
          <span><kbd>esc</kbd> ${G(`search.dismiss`)}</span>
        </footer>
      </dialog>
    `}};P(_a,`cName`,`app-quick-search`),P(_a,`properties`,{value:{type:String},compact:{type:Boolean},_suggestions:{type:Array},_activeIndex:{type:Number},_loading:{type:Boolean},_error:{type:Boolean}}),_a.styles=c`
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
`;var va=class extends N{render(){return O`
      <select @change="${this._changeLang}">
        <option value="ru">ru</option>
        <option value="uk">uk</option>
      </select>
    `}_changeLang(e){let t=e.target.value,n=W.current().response;W.navigate({url:W.url({name:n.name,params:{...n.params,lang:t},query:n.location.query,hash:n.location.hash})})}};P(va,`cName`,`app-lang-picker`);var ya=class extends N{render(){return O`
      <div class="options md">
        <a href="https://github.com/sponsors/stalniy" target="_blank" rel="noopener">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
          </svg>
          GitHub Sponsors
        </a>
      </div>
    `}};P(ya,`cName`,`one-time-donations`),ya.styles=[Y,c`
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
  `];var ba=class extends N{constructor(){super(),this.items=null,this.type=`page`,this.categories=null}render(){return O`
      <nav>
        ${(this.categories||Object.keys(this.items)).map(e=>O`
          <h3>${G(`categories.${e}`)}</h3>
          <ul>
            ${this.items[e].map(e=>O`
              <li><app-link nav to="${this.type}" .params="${e}">${e.title}</app-link></li>
            `)}
          </ul>
        `)}
      </nav>
    `}};P(ba,`cName`,`pages-by-categories`),P(ba,`properties`,{items:{type:Object},type:{type:String},categories:{type:Array}}),ba.styles=c`
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
`;var xa=class extends N{constructor(){super(),this.type=`info`,this.message=``}render(){return O`${K(this.message)}`}};P(xa,`cName`,`app-notification`),P(xa,`properties`,{type:{type:String},message:{type:String}}),xa.styles=c`
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
`;var Sa=function(e,t,n){return e.addEventListener(t,n,!1),function(){return e.removeEventListener(t,n,!1)}};try{var Ca=Object.defineProperty({},"passive",{get:function(){return Sa=function(e,t,n){return e.addEventListener(t,n,{passive:!0}),function(){return e.removeEventListener(t,n,{passive:!0})}},!0}});window.addEventListener(`test`,null,Ca)}catch{}var wa=function(e,t,n){return Sa(e,t,n)},Ta=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e){return setTimeout(e,1e3/60)},Ea=window.document.documentElement,Da=function(){for(var e=[`Webkit`,`Khtml`,`Moz`,`ms`,`O`],t=0;t<e.length;t++)if(e[t]+`Opacity`in Ea.style)return`-`+e[t].toLowerCase()+`-`;return``}();function Z(e,t,n){e.style[Da+t]=n}var Oa=window.navigator.msPointerEnabled,ka=window.document.documentElement,Aa={start:Oa?`MSPointerDown`:`touchstart`,move:Oa?`MSPointerMove`:`touchmove`,end:Oa?`MSPointerUp`:`touchend`,cancel:`touchcancel`},Q={end:`webkitTransitionEnd`in ka.style?`webkitTransitionEnd`:`transitionend`},ja=window.document,Ma=ja.documentElement,Na=!1,Pa=function(){function e(e){e===void 0&&(e={}),this.panel=e.panel,this.menu=e.menu,this.t=e.eventsEmitter||this.panel,this.i=0,this.s=0,this.o=!1,this.h=!1,this.u=!1,this.l=!1,this.v=e.touch===void 0||!!e.touch,this.p=e.side||`left`,this.m=e.easing||`ease`,this.M=parseInt(e.duration,10)||300,this.T=parseInt(e.tolerance,10)||70,this.g=parseInt(e.padding,10)||.8*window.innerWidth,this.k=this.g,this.I=this.p===`right`?-1:1,this.k*=this.I,this.O(),this.v&&(this.P(),this.v=this.v!==`manual`)}var t=e.prototype;return t.O=function(){var e=this.panel.classList,t=this.menu.classList;e.contains(`slideout-panel`)||e.add(`slideout-panel`),e.contains(`slideout-panel-`+this.p)||e.add(`slideout-panel-`+this.p),t.contains(`slideout-menu`)||t.add(`slideout-menu`),t.contains(`slideout-menu-`+this.p)||t.add(`slideout-menu-`+this.p)},t.S=function(e){return this.t.dispatchEvent(new window.CustomEvent(e)),this},t.on=function(e,t,n){var r=this;return this.t.addEventListener(e,t,n),function(){return r.t.removeEventListener(e,t,n)}},t.open=function(){this.S(`beforeopen`),Ma.classList.contains(`slideout-open`)||Ma.classList.add(`slideout-open`),this.X(),this.j(this.k),this.u=!0;var e=this;return this.panel.addEventListener(Q.end,(function t(){e.panel.removeEventListener(Q.end,t),Z(e.panel,`transition`,``),e.S(`open`)})),this},t.close=function(){if(!this.isOpen()&&!this.o)return this;this.S(`beforeclose`),this.X(),this.j(0),this.u=!1;var e=this;return this.panel.addEventListener(Q.end,(function t(){e.panel.removeEventListener(Q.end,t),Ma.classList.remove(`slideout-open`),Z(e.panel,`transition`,``),Z(e.panel,`transform`,``),e.S(`close`)})),this},t.toggle=function(){return this.isOpen()?this.close():this.open()},t.isOpen=function(){return this.u},t.j=function(e){this.s=e,Z(this.panel,`transform`,`translateX(`+e+`px)`)},t.X=function(){Z(this.panel,`transition`,Da+`transform `+this.M+`ms `+this.m)},t.P=function(){var e,t,n,r,i,a,o=this,s=function(){Na=!1};this.D=(n=function(){o.h||(clearTimeout(e),Na=!0,e=setTimeout(s,250))},i=!1,a=function(){n.call(t,r),i=!1},wa(t=ja,`scroll`,(function(e){r=e,i||(Ta(a),i=!0)}))),this.K=wa(this.panel,Aa.start,(function(e){e.touches!==void 0&&(o.h=!1,o.o=!1,o.i=e.touches[0].pageX,o.l=!o.v||!o.isOpen()&&o.menu.clientWidth!==0)})),this.U=wa(this.panel,Aa.cancel,(function(){o.h=!1,o.o=!1})),this.W=wa(this.panel,Aa.end,(function(){if(o.h){if(o.S(`translateend`),o.o&&Math.abs(o.s)>o.T)o.open();else if(o.k-Math.abs(o.s)<=o.T/2){o.X(),o.j(o.k);var e=o;o.panel.addEventListener(Q.end,(function t(){this.panel.removeEventListener(Q.end,t),Z(e.panel,`transition`,``)}))}else o.close()}o.h=!1})),this.q=wa(this.panel,Aa.move,(function(e){if(!(Na||o.l||e.touches===void 0||function(e){for(var t=e;t.parentNode;){if(t.getAttribute(`data-slideout-ignore`)!==null)return t;t=t.parentNode}return null}(e.target))){var t=e.touches[0].clientX-o.i,n=t;if(o.s=t,!(Math.abs(n)>o.g||Math.abs(t)<=20)){o.o=!0;var r=t*o.I;o.u&&r>0||!o.u&&r<0||(o.h||o.S(`translatestart`),r<=0&&(n=t+o.g*o.I,o.o=!1),o.h&&Ma.classList.contains(`slideout-open`)||Ma.classList.add(`slideout-open`),Z(o.panel,`transform`,`translateX(`+n+`px)`),o.S(`translate`,n),o.h=!0)}}}))},t.enableTouch=function(){return this.v=!0,this},t.disableTouch=function(){return this.v=!1,this},t.destroy=function(){this.close(),this.K(),this.U(),this.W(),this.q(),this.D()},e}(),Fa=class extends N{constructor(){super(),this._drawer=null,this.isOpen=!1,this.disabled=!1,this._scrollTop=0}open(){this.isOpen=!0}close(){this.isOpen=!1}toggle(){this.isOpen=!this.isOpen}_createDrawer(){let[e,t]=this.shadowRoot.children;this._drawer=new Pa({menu:e,panel:t,eventsEmitter:this,padding:270,touch:!1});let n=()=>this._drawer.close();this._drawer.on(`beforeopen`,()=>{this.isOpen=!0,this._scrollTop=window.pageYOffset,e.classList.add(`open`),t.style.top=`${-this._scrollTop}px`,t.addEventListener(`mousedown`,n,!1),t.addEventListener(`touchstart`,n,!1),window.scroll(0,0)}),this._drawer.on(`close`,()=>{this.isOpen=!1,e.classList.remove(`open`),t.style.top=``,window.scroll(0,this._scrollTop),t.removeEventListener(`mousedown`,n,!1),t.removeEventListener(`touchstart`,n,!1)})}updated(e){if(this._drawer||this._createDrawer(),this.isOpen!==this._drawer.isOpen()){let e=this.isOpen?`open`:`close`;this._drawer[e]()}if(e.has(`disabled`)){let e=this.disabled?`disableTouch`:`enableTouch`;this._drawer[e]()}}disconnectedCallback(){super.disconnectedCallback(),this._drawer.destroy(),this._drawer=null}render(){return O`
      <div class="menu">
        <slot name="menu"></slot>
      </div>
      <div class="panel">
        <slot></slot>
      </div>
    `}};P(Fa,`cName`,`menu-drawer`),P(Fa,`properties`,{isOpen:{type:Boolean},disabled:{type:Boolean}}),Fa.styles=c`
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
`;function Ia(){return`v7`}async function La(){return(await xn(`/versions.txt`,{format:`txtArrayJSON`,cache:!0})).body}function Ra(e){return window.location.href.replace(`/${Ia()}/`,`/${e}/`)}function za(e){window.location.href=Ra(e.target.value)}var Ba=class extends N{constructor(){super(),this._versions=[],this._currentVersion=Ia(),this._currentVersion&&this._versions.push({number:this._currentVersion})}async connectedCallback(){super.connectedCallback();let e=await La();this._versions=e.slice(0).reverse(),this.requestUpdate()}render(){return O`
      <select @change=${za}>
        ${this._versions.map(e=>O`
          <option .selected=${e.number===this._currentVersion}>${e.number}</option>
        `)}
      </select>
    `}};P(Ba,`cName`,`versions-select`),Ba.styles=c`
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
`;var Va=class extends N{constructor(){super(),this._versions=[],this._currentVersion=Ia()||`unknown`}async connectedCallback(){super.connectedCallback(),this._unwatchRouter=W.observe(()=>this.requestUpdate()),this._versions=await La(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this._unwatchRouter&&this._unwatchRouter()}render(){let e=this._versions[this._versions.length-1];return!e||e.number===this._currentVersion?O``:O`
      <div class="alert alert-warning">
        ${K(`oldVersionAlert`,{latestVersion:e.number,currentVersion:this._currentVersion,latestVersionUrl:Ra(e.number)})}
      </div>
    `}};P(Va,`cName`,`old-version-alert`),Va.styles=[Y,ui,c`
    a {
      color: inherit;
    }
  `];var Ha=[Hr,Gr,oi,fi,mi,hi,_i,vi,Ai,Ri,Vi,Ui,Ki,Ji,qi,ji,_a,va,ra,pa,ba,ya,xa,Fa,Ba,Va];function Ua(e){let t=document.querySelector(e);Ha.forEach(e=>customElements.define(e.cName,e));let n=0;return W.observe(async e=>{let r=++n,i=e.response.params.lang||An;B()!==i&&await Mn(i),r===n&&(Ci(e),t.ready=!0)}),t}try{self[`workbox:window:7.4.0`]&&_()}catch{}function Wa(e,t){return new Promise((function(n){var r=new MessageChannel;r.port1.onmessage=function(e){n(e.data)},e.postMessage(t,[r.port2])}))}function Ga(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Ka(e,t,n){return t&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,`value`in r&&(r.writable=!0),Object.defineProperty(e,Ya(r.key),r)}}(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function qa(e,t){var n=typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(e){if(typeof e==`string`)return Ga(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ga(e,t):void 0}}(e))||t){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ja(e,t){return Ja=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},Ja(e,t)}function Ya(e){var t=function(e,t){if(typeof e!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return String(e)}(e,`string`);return typeof t==`symbol`?t:t+``}try{self[`workbox:core:7.4.0`]&&_()}catch{}var Xa=function(){var e=this;this.promise=new Promise((function(t,n){e.resolve=t,e.reject=n}))};function Za(e,t){var n=location.href;return new URL(e,n).href===new URL(t,n).href}var Qa=function(e,t){this.type=e,Object.assign(this,t)};function $(e,t,n){return e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e}function $a(){}var eo={type:`SKIP_WAITING`};function to(e,t){return e&&e.then?e.then($a):Promise.resolve()}var no=function(e){function t(t,n){var r,i;return n===void 0&&(n={}),(r=e.call(this)||this).nn={},r.tn=0,r.rn=new Xa,r.en=new Xa,r.on=new Xa,r.un=0,r.an=new Set,r.cn=function(){var e=r.fn,t=e.installing;r.tn>0||!Za(t.scriptURL,r.sn.toString())||performance.now()>r.un+6e4?(r.vn=t,e.removeEventListener(`updatefound`,r.cn)):(r.hn=t,r.an.add(t),r.rn.resolve(t)),++r.tn,t.addEventListener(`statechange`,r.ln)},r.ln=function(e){var t=r.fn,n=e.target,i=n.state,a=n===r.vn,o={sw:n,isExternal:a,originalEvent:e};!a&&r.mn&&(o.isUpdate=!0),r.dispatchEvent(new Qa(i,o)),i===`installed`?r.wn=self.setTimeout((function(){i===`installed`&&t.waiting===n&&r.dispatchEvent(new Qa(`waiting`,o))}),200):i===`activating`&&(clearTimeout(r.wn),a||r.en.resolve(n))},r.yn=function(e){var t=r.hn,n=t!==navigator.serviceWorker.controller;r.dispatchEvent(new Qa(`controlling`,{isExternal:n,originalEvent:e,sw:t,isUpdate:r.mn})),n||r.on.resolve(t)},r.gn=(i=function(e){var t=e.data,n=e.ports,i=e.source;return $(r.getSW(),(function(){r.an.has(i)&&r.dispatchEvent(new Qa(`message`,{data:t,originalEvent:e,ports:n,sw:i}))}))},function(){var e=[...arguments];try{return Promise.resolve(i.apply(this,e))}catch(e){return Promise.reject(e)}}),r.sn=t,r.nn=n,navigator.serviceWorker.addEventListener(`message`,r.gn),r}var n,r=e;(n=t).prototype=Object.create(r.prototype),n.prototype.constructor=n,Ja(n,r);var i=t.prototype;return i.register=function(e){var t=(e===void 0?{}:e).immediate,n=t!==void 0&&t;try{var r=this;return $(function(e,t){var n=e();return n&&n.then?n.then(t):t(n)}((function(){if(!n&&document.readyState!==`complete`)return to(new Promise((function(e){return window.addEventListener(`load`,e)})))}),(function(){return r.mn=!!navigator.serviceWorker.controller,r.dn=r.pn(),$(r.bn(),(function(e){r.fn=e,r.dn&&(r.hn=r.dn,r.en.resolve(r.dn),r.on.resolve(r.dn),r.dn.addEventListener(`statechange`,r.ln,{once:!0}));var t=r.fn.waiting;return t&&Za(t.scriptURL,r.sn.toString())&&(r.hn=t,Promise.resolve().then((function(){r.dispatchEvent(new Qa(`waiting`,{sw:t,wasWaitingBeforeRegister:!0}))})).then((function(){}))),r.hn&&(r.rn.resolve(r.hn),r.an.add(r.hn)),r.fn.addEventListener(`updatefound`,r.cn),navigator.serviceWorker.addEventListener(`controllerchange`,r.yn),r.fn}))})))}catch(e){return Promise.reject(e)}},i.update=function(){try{return this.fn?$(to(this.fn.update())):$()}catch(e){return Promise.reject(e)}},i.getSW=function(){return this.hn===void 0?this.rn.promise:Promise.resolve(this.hn)},i.messageSW=function(e){try{return $(this.getSW(),(function(t){return Wa(t,e)}))}catch(e){return Promise.reject(e)}},i.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&Wa(this.fn.waiting,eo)},i.pn=function(){var e=navigator.serviceWorker.controller;return e&&Za(e.scriptURL,this.sn.toString())?e:void 0},i.bn=function(){try{var e=this;return $(function(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}((function(){return $(navigator.serviceWorker.register(e.sn,e.nn),(function(t){return e.un=performance.now(),t}))}),(function(e){throw e})))}catch(e){return Promise.reject(e)}},Ka(t,[{key:`active`,get:function(){return this.en.promise}},{key:`controlling`,get:function(){return this.on.promise}}])}(function(){function e(){this.Pn=new Map}var t=e.prototype;return t.addEventListener=function(e,t){this.jn(e).add(t)},t.removeEventListener=function(e,t){this.jn(e).delete(t)},t.dispatchEvent=function(e){e.target=this;for(var t,n=qa(this.jn(e.type));!(t=n()).done;)(0,t.value)(e)},t.jn=function(e){return this.Pn.has(e)||this.Pn.set(e,new Set),this.Pn.get(e)},e}());function ro(e={}){if(!(`serviceWorker`in navigator))return;let t=new no(`/v7/sw.js`,{updateViaCache:`none`,type:`classic`});t.addEventListener(`waiting`,()=>{navigator.serviceWorker.controller&&e.onUpdate&&e.onUpdate(()=>t.messageSkipWaiting())});let n=e=>{e.isUpdate&&(t.removeEventListener(`controlling`,n),window.location.reload())};return t.addEventListener(`controlling`,n),t.register().then(()=>ao(t)).catch(e=>console.error(`Error during service worker registration:`,e))}var io=3e5;function ao(e){let t=Date.now();document.addEventListener(`visibilitychange`,()=>{document.visibilityState!==`visible`||Date.now()-t<io||(t=Date.now(),e.update().catch(()=>{}))})}window.__isAppExecuted__=!0,ti();var oo=Ua(`casl-docs`),so=document.getElementById(`prerender-fallback`);oo.addEventListener(`route-ready`,({detail:e})=>{so&&e.path===`${window.location.pathname}${window.location.search}${window.location.hash}`&&(so.hidden=!0,so.setAttribute(`aria-hidden`,`true`),so.setAttribute(`inert`,``))}),ro({onUpdate(e){oo.notify(`updateAvailable`,{onClick:e})}});
//# sourceMappingURL=index-uAZrGa3O.js.map