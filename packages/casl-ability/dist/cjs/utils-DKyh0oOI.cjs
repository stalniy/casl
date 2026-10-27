const t = Object.hasOwn || ((t, e) => Object.prototype.hasOwnProperty.call(t, e));

function e(t) {
    return Array.isArray(t) ? t : [ t ];
}

const n = new Set([ "__proto__", "constructor", "prototype" ]);

function r(e, r, o) {
    let u = e, c = r;
    if (-1 !== r.indexOf(".")) {
        const o = r.split(".");
        c = o.pop(), u = o.reduce((e, r) => {
            if (n.has(r)) return e;
            const o = t(e, r) ? e[r] : void 0;
            return e[r] = o && "object" == typeof o && !Array.isArray(o) ? o : Object.create(null), 
            e[r];
        }, e);
    }
    n.has(c) || (u[c] = o);
}

const o = "__caslSubjectType__";

function u(e, n) {
    if (n) if (t(n, o)) {
        if (e !== n[o]) throw new Error(`Trying to cast object to subject type ${e} but previously it was casted to ${n[o]}`);
    } else Object.defineProperty(n, o, {
        value: e
    });
    return n;
}

const c = t => {
    const e = typeof t;
    return "string" === e || "function" === e;
}, i = t => t.modelName || t.name;

function s(t) {
    return "string" == typeof t ? t : i(t);
}

function f(e) {
    return t(e, o) ? e[o] : i(e.constructor);
}

const a = {
    function: t => t.constructor,
    string: f
};

function b(n, r, o) {
    let u = e(r), c = 0;
    for (;c < u.length; ) {
        const e = u[c++];
        t(n, e) && (u = o(u, n[e]));
    }
    return u;
}

const l = (t, e) => t.concat(e);

function p(t, e) {
    return e && !1 === e.skipValidate || function(t, e) {
        if (e in t) throw new Error(`Cannot use "${e}" as an alias because it's reserved action.`);
        const n = Object.keys(t), r = (t, n) => {
            const r = function(t, e) {
                if ("string" == typeof e && -1 !== t.indexOf(e)) return e;
                for (let n = 0; n < e.length; n++) if (-1 !== t.indexOf(e[n])) return e[n];
                return null;
            }(t, n);
            if (r) throw new Error(`Detected cycle ${r} -> ${t.join(", ")}`);
            if ("string" == typeof n && n === e || -1 !== t.indexOf(e) || Array.isArray(n) && -1 !== n.indexOf(e)) throw new Error(`Cannot make an alias to "${e}" because this is reserved action`);
            return t.concat(n);
        };
        for (let e = 0; e < n.length; e++) b(t, n[e], r);
    }(t, e && e.anyAction || "manage"), e => b(t, e, l);
}

function j(t, e, n) {
    for (let r = n; r < e.length; r++) t.push(e[r]);
}

function g(t, e) {
    if (!t || !t.length) return e || [];
    if (!e || !e.length) return t || [];
    let n = 0, r = 0;
    const o = [];
    for (;n < t.length && r < e.length; ) t[n].priority < e[r].priority ? (o.push(t[n]), 
    n++) : t[n].priority > e[r].priority ? (o.push(e[r]), r++) : (o.push(t[n]), n++, 
    r++);
    return j(o, t, n), j(o, e, r), o;
}

function y(t, e, n) {
    let r = t.get(e);
    return r || (r = n(), t.set(e, r)), r;
}

const O = t => t;

function m(t, e) {
    let n;
    for (let r = 0; r < t.length; r++) {
        const o = e(t[r]);
        n && o && n.push(t[r]), o || (n ?? (n = t.slice(0, r)));
    }
    return n || t;
}

Object.defineProperty(exports, "DETECT_SUBJECT_TYPE_STRATEGY", {
    enumerable: !0,
    get: function() {
        return a;
    }
}), Object.defineProperty(exports, "createAliasResolver", {
    enumerable: !0,
    get: function() {
        return p;
    }
}), Object.defineProperty(exports, "detectSubjectType", {
    enumerable: !0,
    get: function() {
        return f;
    }
}), Object.defineProperty(exports, "filterWithLazyAllocation", {
    enumerable: !0,
    get: function() {
        return m;
    }
}), Object.defineProperty(exports, "getOrDefault", {
    enumerable: !0,
    get: function() {
        return y;
    }
}), Object.defineProperty(exports, "getSubjectTypeName", {
    enumerable: !0,
    get: function() {
        return s;
    }
}), Object.defineProperty(exports, "identity", {
    enumerable: !0,
    get: function() {
        return O;
    }
}), Object.defineProperty(exports, "isSubjectType", {
    enumerable: !0,
    get: function() {
        return c;
    }
}), Object.defineProperty(exports, "mergePrioritized", {
    enumerable: !0,
    get: function() {
        return g;
    }
}), Object.defineProperty(exports, "setByPath", {
    enumerable: !0,
    get: function() {
        return r;
    }
}), Object.defineProperty(exports, "setSubjectType", {
    enumerable: !0,
    get: function() {
        return u;
    }
}), Object.defineProperty(exports, "wrapArray", {
    enumerable: !0,
    get: function() {
        return e;
    }
});
//# sourceMappingURL=utils-DKyh0oOI.cjs.map