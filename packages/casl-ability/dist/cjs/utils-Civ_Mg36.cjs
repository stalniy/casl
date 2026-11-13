const t = Object.hasOwn || ((t, e) => Object.prototype.hasOwnProperty.call(t, e));

function e(t) {
    return Array.isArray(t) ? t : [ t ];
}

const r = new Set([ "__proto__", "constructor", "prototype" ]);

function n(e, n, o) {
    let u = e, c = n;
    if (-1 !== n.indexOf(".")) {
        const o = n.split(".");
        c = o.pop(), u = o.reduce((e, n) => {
            if (r.has(n)) return e;
            const o = t(e, n) ? e[n] : void 0;
            return e[n] = o && "object" == typeof o && !Array.isArray(o) ? o : Object.create(null), 
            e[n];
        }, e);
    }
    r.has(c) || (u[c] = o);
}

const o = "__caslSubjectType__", u = Symbol();

function c(e, r) {
    if (r) if (t(r, o)) {
        if (e !== r[o] || e !== r[u]) throw new Error(`Trying to cast object to subject type ${e} but previously it was casted to ${r[o]}`);
    } else Object.defineProperty(r, o, {
        value: e
    }), Object.defineProperty(r, u, {
        value: e
    });
    return r;
}

const i = t => {
    const e = typeof t;
    return "string" === e || "function" === e;
}, s = t => t.modelName || t.name;

function f(t) {
    return "string" == typeof t ? t : s(t);
}

const a = e => !e || t(e, "constructor") ? Object : e.constructor;

function b(e) {
    return t(e, o) ? (function(e) {
        if (t(e, o) && e[o] !== e[u]) throw new Error(`Untrusted subject type value "${e[o]}". Use "subject" helper to set the subject type.`);
    }(e), e[o]) : s(a(e));
}

const l = {
    function: a,
    string: b
};

function p(r, n, o) {
    let u = e(n), c = 0;
    for (;c < u.length; ) {
        const e = u[c++];
        t(r, e) && (u = o(u, r[e]));
    }
    return u;
}

const j = (t, e) => t.concat(e);

function y(t, e) {
    return e && !1 === e.skipValidate || function(t, e) {
        if (e in t) throw new Error(`Cannot use "${e}" as an alias because it's reserved action.`);
        const r = Object.keys(t), n = (t, r) => {
            const n = function(t, e) {
                if ("string" == typeof e && -1 !== t.indexOf(e)) return e;
                for (let r = 0; r < e.length; r++) if (-1 !== t.indexOf(e[r])) return e[r];
                return null;
            }(t, r);
            if (n) throw new Error(`Detected cycle ${n} -> ${t.join(", ")}`);
            if ("string" == typeof r && r === e || -1 !== t.indexOf(e) || Array.isArray(r) && -1 !== r.indexOf(e)) throw new Error(`Cannot make an alias to "${e}" because this is reserved action`);
            return t.concat(r);
        };
        for (let e = 0; e < r.length; e++) p(t, r[e], n);
    }(t, e && e.anyAction || "manage"), e => p(t, e, j);
}

function g(t, e, r) {
    for (let n = r; n < e.length; n++) t.push(e[n]);
}

function O(t, e) {
    if (!t || !t.length) return e || [];
    if (!e || !e.length) return t || [];
    let r = 0, n = 0;
    const o = [];
    for (;r < t.length && n < e.length; ) t[r].priority < e[n].priority ? (o.push(t[r]), 
    r++) : t[r].priority > e[n].priority ? (o.push(e[n]), n++) : (o.push(t[r]), r++, 
    n++);
    return g(o, t, r), g(o, e, n), o;
}

function m(t, e, r) {
    let n = t.get(e);
    return n || (n = r(), t.set(e, n)), n;
}

const w = t => t;

function x(t, e) {
    let r;
    for (let n = 0; n < t.length; n++) {
        const o = e(t[n]);
        r && o && r.push(t[n]), o || (r ?? (r = t.slice(0, n)));
    }
    return r || t;
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
        return f;
    }
}), Object.defineProperty(exports, "identity", {
    enumerable: !0,
    get: function() {
        return w;
    }
}), Object.defineProperty(exports, "isSubjectType", {
    enumerable: !0,
    get: function() {
        return i;
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
}), Object.defineProperty(exports, "wrapArray", {
    enumerable: !0,
    get: function() {
        return e;
    }
});
//# sourceMappingURL=utils-Civ_Mg36.cjs.map