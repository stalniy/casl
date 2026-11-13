const t = Object.hasOwn || ((t, n) => Object.prototype.hasOwnProperty.call(t, n));

function n(t) {
    return Array.isArray(t) ? t : [ t ];
}

const e = new Set([ "__proto__", "constructor", "prototype" ]);

function r(n, r, o) {
    let c = n, s = r;
    if (-1 !== r.indexOf(".")) {
        const o = r.split(".");
        s = o.pop(), c = o.reduce((n, r) => {
            if (e.has(r)) return n;
            const o = t(n, r) ? n[r] : void 0;
            return n[r] = o && "object" == typeof o && !Array.isArray(o) ? o : Object.create(null), 
            n[r];
        }, n);
    }
    e.has(s) || (c[s] = o);
}

const o = "__caslSubjectType__", c = Symbol();

function s(n, e) {
    if (e) if (t(e, o)) {
        if (n !== e[o] || n !== e[c]) throw new Error(`Trying to cast object to subject type ${n} but previously it was casted to ${e[o]}`);
    } else Object.defineProperty(e, o, {
        value: n
    }), Object.defineProperty(e, c, {
        value: n
    });
    return e;
}

const u = t => {
    const n = typeof t;
    return "string" === n || "function" === n;
}, i = t => t.modelName || t.name;

function f(t) {
    return "string" == typeof t ? t : i(t);
}

const a = n => !n || t(n, "constructor") ? Object : n.constructor;

function l(n) {
    return t(n, o) ? (function(n) {
        if (t(n, o) && n[o] !== n[c]) throw new Error(`Untrusted subject type value "${n[o]}". Use "subject" helper to set the subject type.`);
    }(n), n[o]) : i(a(n));
}

const b = {
    function: a,
    string: l
};

function y(e, r, o) {
    let c = n(r), s = 0;
    for (;s < c.length; ) {
        const n = c[s++];
        t(e, n) && (c = o(c, e[n]));
    }
    return c;
}

const p = (t, n) => t.concat(n);

function j(t, n) {
    return n && !1 === n.skipValidate || function(t, n) {
        if (n in t) throw new Error(`Cannot use "${n}" as an alias because it's reserved action.`);
        const e = Object.keys(t), r = (t, e) => {
            const r = function(t, n) {
                if ("string" == typeof n && -1 !== t.indexOf(n)) return n;
                for (let e = 0; e < n.length; e++) if (-1 !== t.indexOf(n[e])) return n[e];
                return null;
            }(t, e);
            if (r) throw new Error(`Detected cycle ${r} -> ${t.join(", ")}`);
            if ("string" == typeof e && e === n || -1 !== t.indexOf(n) || Array.isArray(e) && -1 !== e.indexOf(n)) throw new Error(`Cannot make an alias to "${n}" because this is reserved action`);
            return t.concat(e);
        };
        for (let n = 0; n < e.length; n++) y(t, e[n], r);
    }(t, n && n.anyAction || "manage"), n => y(t, n, p);
}

function w(t, n, e) {
    for (let r = e; r < n.length; r++) t.push(n[r]);
}

function h(t, n) {
    if (!t || !t.length) return n || [];
    if (!n || !n.length) return t || [];
    let e = 0, r = 0;
    const o = [];
    for (;e < t.length && r < n.length; ) t[e].priority < n[r].priority ? (o.push(t[e]), 
    e++) : t[e].priority > n[r].priority ? (o.push(n[r]), r++) : (o.push(t[e]), e++, 
    r++);
    return w(o, t, e), w(o, n, r), o;
}

function _(t, n, e) {
    let r = t.get(n);
    return r || (r = e(), t.set(n, r)), r;
}

const d = t => t;

function g(t, n) {
    let e;
    for (let r = 0; r < t.length; r++) {
        const o = n(t[r]);
        e && o && e.push(t[r]), o || (e ?? (e = t.slice(0, r)));
    }
    return e || t;
}

export { _ as a, u as c, s as d, n as f, g as i, h as l, j as n, f as o, l as r, d as s, b as t, r as u };
//# sourceMappingURL=utils-DKbKIB4O.mjs.map