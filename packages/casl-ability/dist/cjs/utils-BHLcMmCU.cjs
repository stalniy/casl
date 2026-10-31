const e = Object.hasOwn || ((e, t) => Object.prototype.hasOwnProperty.call(e, t));

function t(e) {
    return Array.isArray(e) ? e : [ e ];
}

const r = new Set([ "__proto__", "constructor", "prototype" ]);

function n(t, n, o) {
    let u = t, c = n;
    if (-1 !== n.indexOf(".")) {
        const o = n.split(".");
        c = o.pop(), u = o.reduce((t, n) => {
            if (r.has(n)) return t;
            const o = e(t, n) ? t[n] : void 0;
            return t[n] = o && "object" == typeof o && !Array.isArray(o) ? o : Object.create(null), 
            t[n];
        }, t);
    }
    r.has(c) || (u[c] = o);
}

const o = "__caslSubjectType__", u = Symbol();

function c(t, r) {
    if (r) if (e(r, o)) {
        if (t !== r[o] || t !== r[u]) throw new Error(`Trying to cast object to subject type ${t} but previously it was casted to ${r[o]}`);
    } else Object.defineProperty(r, o, {
        value: t
    }), Object.defineProperty(r, u, {
        value: t
    });
    return r;
}

function i(t) {
    if (e(t, o) && t[o] !== t[u]) throw new Error(`Untrusted subject type value "${t[o]}". Use "subject" helper to set the subject type.`);
}

const s = e => {
    const t = typeof e;
    return "string" === t || "function" === t;
}, f = e => e.modelName || e.name;

function a(e) {
    return "string" == typeof e ? e : f(e);
}

function b(t) {
    return e(t, o) ? t[o] : f(t.constructor);
}

const l = {
    function: e => e.constructor,
    string: b
};

function p(r, n, o) {
    let u = t(n), c = 0;
    for (;c < u.length; ) {
        const t = u[c++];
        e(r, t) && (u = o(u, r[t]));
    }
    return u;
}

const j = (e, t) => e.concat(t);

function y(e, t) {
    return t && !1 === t.skipValidate || function(e, t) {
        if (t in e) throw new Error(`Cannot use "${t}" as an alias because it's reserved action.`);
        const r = Object.keys(e), n = (e, r) => {
            const n = function(e, t) {
                if ("string" == typeof t && -1 !== e.indexOf(t)) return t;
                for (let r = 0; r < t.length; r++) if (-1 !== e.indexOf(t[r])) return t[r];
                return null;
            }(e, r);
            if (n) throw new Error(`Detected cycle ${n} -> ${e.join(", ")}`);
            if ("string" == typeof r && r === t || -1 !== e.indexOf(t) || Array.isArray(r) && -1 !== r.indexOf(t)) throw new Error(`Cannot make an alias to "${t}" because this is reserved action`);
            return e.concat(r);
        };
        for (let t = 0; t < r.length; t++) p(e, r[t], n);
    }(e, t && t.anyAction || "manage"), t => p(e, t, j);
}

function g(e, t, r) {
    for (let n = r; n < t.length; n++) e.push(t[n]);
}

function O(e, t) {
    if (!e || !e.length) return t || [];
    if (!t || !t.length) return e || [];
    let r = 0, n = 0;
    const o = [];
    for (;r < e.length && n < t.length; ) e[r].priority < t[n].priority ? (o.push(e[r]), 
    r++) : e[r].priority > t[n].priority ? (o.push(t[n]), n++) : (o.push(e[r]), r++, 
    n++);
    return g(o, e, r), g(o, t, n), o;
}

function m(e, t, r) {
    let n = e.get(t);
    return n || (n = r(), e.set(t, n)), n;
}

const w = e => e;

function x(e, t) {
    let r;
    for (let n = 0; n < e.length; n++) {
        const o = t(e[n]);
        r && o && r.push(e[n]), o || (r ?? (r = e.slice(0, n)));
    }
    return r || e;
}

Object.defineProperty(exports, "DETECT_SUBJECT_TYPE_STRATEGY", {
    enumerable: !0,
    get: function() {
        return l;
    }
}), Object.defineProperty(exports, "createAliasResolver", {
    enumerable: !0,
    get: function() {
        return y;
    }
}), Object.defineProperty(exports, "detectSubjectType", {
    enumerable: !0,
    get: function() {
        return b;
    }
}), Object.defineProperty(exports, "filterWithLazyAllocation", {
    enumerable: !0,
    get: function() {
        return x;
    }
}), Object.defineProperty(exports, "getOrDefault", {
    enumerable: !0,
    get: function() {
        return m;
    }
}), Object.defineProperty(exports, "getSubjectTypeName", {
    enumerable: !0,
    get: function() {
        return a;
    }
}), Object.defineProperty(exports, "identity", {
    enumerable: !0,
    get: function() {
        return w;
    }
}), Object.defineProperty(exports, "isSubjectType", {
    enumerable: !0,
    get: function() {
        return s;
    }
}), Object.defineProperty(exports, "mergePrioritized", {
    enumerable: !0,
    get: function() {
        return O;
    }
}), Object.defineProperty(exports, "setByPath", {
    enumerable: !0,
    get: function() {
        return n;
    }
}), Object.defineProperty(exports, "setSubjectType", {
    enumerable: !0,
    get: function() {
        return c;
    }
}), Object.defineProperty(exports, "validateEnforcedSubjectType", {
    enumerable: !0,
    get: function() {
        return i;
    }
}), Object.defineProperty(exports, "wrapArray", {
    enumerable: !0,
    get: function() {
        return t;
    }
});
//# sourceMappingURL=utils-BHLcMmCU.cjs.map