const t = Object.hasOwn || ((t, n) => Object.prototype.hasOwnProperty.call(t, n));

function n(t) {
    return Array.isArray(t) ? t : [ t ];
}

const r = new Set([ "__proto__", "constructor", "prototype" ]);

function e(n, e, o) {
    let c = n, s = e;
    if (-1 !== e.indexOf(".")) {
        const o = e.split(".");
        s = o.pop(), c = o.reduce((n, e) => {
            if (r.has(e)) return n;
            const o = t(n, e) ? n[e] : void 0;
            return n[e] = o && "object" == typeof o && !Array.isArray(o) ? o : Object.create(null), 
            n[e];
        }, n);
    }
    r.has(s) || (c[s] = o);
}

const o = "__caslSubjectType__";

function c(n, r) {
    if (r) if (t(r, o)) {
        if (n !== r[o]) throw new Error(`Trying to cast object to subject type ${n} but previously it was casted to ${r[o]}`);
    } else Object.defineProperty(r, o, {
        value: n
    });
    return r;
}

const s = t => {
    const n = typeof t;
    return "string" === n || "function" === n;
}, i = t => t.modelName || t.name;

function u(t) {
    return "string" == typeof t ? t : i(t);
}

function f(n) {
    return t(n, o) ? n[o] : i(n.constructor);
}

const a = {
    function: t => t.constructor,
    string: f
};

function l(r, e, o) {
    let c = n(e), s = 0;
    for (;s < c.length; ) {
        const n = c[s++];
        t(r, n) && (c = o(c, r[n]));
    }
    return c;
}

const y = (t, n) => t.concat(n);

function b(t, n) {
    return n && !1 === n.skipValidate || function(t, n) {
        if (n in t) throw new Error(`Cannot use "${n}" as an alias because it's reserved action.`);
        const r = Object.keys(t), e = (t, r) => {
            const e = function(t, n) {
                if ("string" == typeof n && -1 !== t.indexOf(n)) return n;
                for (let r = 0; r < n.length; r++) if (-1 !== t.indexOf(n[r])) return n[r];
                return null;
            }(t, r);
            if (e) throw new Error(`Detected cycle ${e} -> ${t.join(", ")}`);
            if ("string" == typeof r && r === n || -1 !== t.indexOf(n) || Array.isArray(r) && -1 !== r.indexOf(n)) throw new Error(`Cannot make an alias to "${n}" because this is reserved action`);
            return t.concat(r);
        };
        for (let n = 0; n < r.length; n++) l(t, r[n], e);
    }(t, n && n.anyAction || "manage"), n => l(t, n, y);
}

function p(t, n, r) {
    for (let e = r; e < n.length; e++) t.push(n[e]);
}

function w(t, n) {
    if (!t || !t.length) return n || [];
    if (!n || !n.length) return t || [];
    let r = 0, e = 0;
    const o = [];
    for (;r < t.length && e < n.length; ) t[r].priority < n[e].priority ? (o.push(t[r]), 
    r++) : t[r].priority > n[e].priority ? (o.push(n[e]), e++) : (o.push(t[r]), r++, 
    e++);
    return p(o, t, r), p(o, n, e), o;
}

function j(t, n, r) {
    let e = t.get(n);
    return e || (e = r(), t.set(n, e)), e;
}

const _ = t => t;

function g(t, n) {
    let r;
    for (let e = 0; e < t.length; e++) {
        const o = n(t[e]);
        r && o && r.push(t[e]), o || (r ?? (r = t.slice(0, e)));
    }
    return r || t;
}

export { j as a, s as c, c as d, n as f, g as i, w as l, b as n, u as o, f as r, _ as s, a as t, e as u };
//# sourceMappingURL=utils-5VKvuays.mjs.map