const t = Object.hasOwn || ((t, n) => Object.prototype.hasOwnProperty.call(t, n));

function n(t) {
    return Array.isArray(t) ? t : [ t ];
}

const e = new Set([ "__proto__", "constructor", "prototype" ]);

function r(n, r, o) {
    let s = n, c = r;
    if (-1 !== r.indexOf(".")) {
        const o = r.split(".");
        c = o.pop(), s = o.reduce((n, r) => {
            if (e.has(r)) return n;
            const o = t(n, r) ? n[r] : void 0;
            return n[r] = o && "object" == typeof o && !Array.isArray(o) ? o : Object.create(null), 
            n[r];
        }, n);
    }
    e.has(c) || (s[c] = o);
}

const o = "__caslSubjectType__", s = Symbol();

function c(n, e) {
    if (e) if (t(e, o)) {
        if (n !== e[o] || n !== e[s]) throw new Error(`Trying to cast object to subject type ${n} but previously it was casted to ${e[o]}`);
    } else Object.defineProperty(e, o, {
        value: n
    }), Object.defineProperty(e, s, {
        value: n
    });
    return e;
}

function u(n) {
    if (t(n, o) && n[o] !== n[s]) throw new Error(`Untrusted subject type value "${n[o]}". Use "subject" helper to set the subject type.`);
}

const i = t => {
    const n = typeof t;
    return "string" === n || "function" === n;
}, f = t => t.modelName || t.name;

function a(t) {
    return "string" == typeof t ? t : f(t);
}

function l(n) {
    return t(n, o) ? n[o] : f(n.constructor);
}

const b = {
    function: t => t.constructor,
    string: l
};

function y(e, r, o) {
    let s = n(r), c = 0;
    for (;c < s.length; ) {
        const n = s[c++];
        t(e, n) && (s = o(s, e[n]));
    }
    return s;
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

export { _ as a, i as c, c as d, u as f, g as i, h as l, j as n, a as o, n as p, l as r, d as s, b as t, r as u };
//# sourceMappingURL=utils-DkYb5UoY.mjs.map