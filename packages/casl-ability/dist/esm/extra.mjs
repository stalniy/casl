import { f as t, u as r } from "./utils-5VKvuays.mjs";

import { CompoundCondition as n, buildAnd as e, buildOr as o } from "@ucast/mongo2js";

const i = t => Array.isArray(t) ? t.join(",") : t;

function s(r, n) {
    return r.map(r => {
        const e = [ i(r.action || r.actions), "function" == typeof n ? t(r.subject).map(n).join(",") : i(r.subject), r.conditions || 0, r.inverted ? 1 : 0, r.fields ? i(r.fields) : 0, r.reason || "" ];
        for (;e.length > 0 && !e[e.length - 1]; ) e.pop();
        return e;
    });
}

function u(t, r) {
    return t.map(([t, n, e, o, i, s]) => {
        const u = n.split(","), f = {
            inverted: !!o,
            action: t.split(","),
            subject: "function" == typeof r ? u.map(r) : u
        };
        return e && (f.conditions = e), i && (f.fields = i.split(",")), s && (f.reason = s), 
        f;
    });
}

function f(t, r, n, e) {
    const o = t.detectSubjectType(n), i = t.possibleRulesFor(r, o), s = new Set, u = s.delete.bind(s), f = s.add.bind(s);
    let c = i.length;
    for (;c--; ) {
        const t = i[c];
        if (t.matchesConditions(n)) {
            const r = t.inverted ? u : f;
            e.fieldsFrom(t).forEach(r);
        }
    }
    return Array.from(s);
}

var c = class {
    constructor(t, r, n) {
        this.t = t, this.o = r, this.i = n;
    }
    ofType(t) {
        return f(this.t, this.o, t, {
            fieldsFrom: this.u(t)
        });
    }
    of(t) {
        return f(this.t, this.o, t, {
            fieldsFrom: this.u(this.t.detectSubjectType(t))
        });
    }
    u(t) {
        return r => r.fields || this.i(t);
    }
};

function l(t, n, e) {
    return t.rulesFor(n, e).reduce((t, n) => n.inverted || !n.conditions ? t : Object.keys(n.conditions).reduce((t, e) => {
        const o = n.conditions[e];
        return o && o.constructor === Object || r(t, e, o), t;
    }, t), Object.create(null));
}

function a(t) {
    if (!t.ast) throw new Error(`Ability rule "${JSON.stringify(t)}" does not have "ast" property. So, cannot be used to generate AST`);
    return t.inverted ? new n("not", [ t.ast ]) : t.ast;
}

function h(t, r, n) {
    return m(t.rulesFor(r, n), a, {
        and: e,
        or: o,
        empty: () => e([])
    });
}

function m(t, r, n) {
    const e = [], o = [];
    let i = !1;
    for (let s = 0; s < t.length; s++) {
        const u = t[s];
        if (u.inverted) {
            if (!u.conditions) break;
            e.push(r(u));
        } else {
            if (!u.conditions) {
                i = !0;
                break;
            }
            let t = r(u);
            e.length > 0 && (t = n.and([ t, ...e ])), o.push(t);
        }
    }
    if (i) {
        if (0 === e.length) return n.empty();
        if (0 === o.length) return n.and(e);
        o.push(n.and(e));
    }
    return 0 === o.length ? null : n.or(o);
}

export { c as AccessibleFields, s as packRules, f as permittedFieldsOf, h as rulesToAST, m as rulesToCondition, l as rulesToFields, u as unpackRules };
//# sourceMappingURL=extra.mjs.map