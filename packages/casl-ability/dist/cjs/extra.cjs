Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
});

const t = require("./utils-DKyh0oOI.cjs");

let e = require("@ucast/mongo2js");

const r = t => Array.isArray(t) ? t.join(",") : t;

function n(t, e, r, n) {
    const o = t.detectSubjectType(r), s = t.possibleRulesFor(e, o), i = new Set, u = i.delete.bind(i), c = i.add.bind(i);
    let f = s.length;
    for (;f--; ) {
        const t = s[f];
        if (t.matchesConditions(r)) {
            const e = t.inverted ? u : c;
            n.fieldsFrom(t).forEach(e);
        }
    }
    return Array.from(i);
}

function o(t) {
    if (!t.ast) throw new Error(`Ability rule "${JSON.stringify(t)}" does not have "ast" property. So, cannot be used to generate AST`);
    return t.inverted ? new e.CompoundCondition("not", [ t.ast ]) : t.ast;
}

function s(t, e, r) {
    const n = [], o = [];
    let s = !1;
    for (let i = 0; i < t.length; i++) {
        const u = t[i];
        if (u.inverted) {
            if (!u.conditions) break;
            n.push(e(u));
        } else {
            if (!u.conditions) {
                s = !0;
                break;
            }
            let t = e(u);
            n.length > 0 && (t = r.and([ t, ...n ])), o.push(t);
        }
    }
    if (s) {
        if (0 === n.length) return r.empty();
        if (0 === o.length) return r.and(n);
        o.push(r.and(n));
    }
    return 0 === o.length ? null : r.or(o);
}

exports.AccessibleFields = class {
    constructor(t, e, r) {
        this.t = t, this.o = e, this.i = r;
    }
    ofType(t) {
        return n(this.t, this.o, t, {
            fieldsFrom: this.u(t)
        });
    }
    of(t) {
        return n(this.t, this.o, t, {
            fieldsFrom: this.u(this.t.detectSubjectType(t))
        });
    }
    u(t) {
        return e => e.fields || this.i(t);
    }
}, exports.packRules = function(e, n) {
    return e.map(e => {
        const o = [ r(e.action || e.actions), "function" == typeof n ? t.wrapArray(e.subject).map(n).join(",") : r(e.subject), e.conditions || 0, e.inverted ? 1 : 0, e.fields ? r(e.fields) : 0, e.reason || "" ];
        for (;o.length > 0 && !o[o.length - 1]; ) o.pop();
        return o;
    });
}, exports.permittedFieldsOf = n, exports.rulesToAST = function(t, r, n) {
    return s(t.rulesFor(r, n), o, {
        and: e.buildAnd,
        or: e.buildOr,
        empty: () => (0, e.buildAnd)([])
    });
}, exports.rulesToCondition = s, exports.rulesToFields = function(e, r, n) {
    return e.rulesFor(r, n).reduce((e, r) => r.inverted || !r.conditions ? e : Object.keys(r.conditions).reduce((e, n) => {
        const o = r.conditions[n];
        return o && o.constructor === Object || t.setByPath(e, n, o), e;
    }, e), Object.create(null));
}, exports.unpackRules = function(t, e) {
    return t.map(([t, r, n, o, s, i]) => {
        const u = r.split(","), c = {
            inverted: !!o,
            action: t.split(","),
            subject: "function" == typeof e ? u.map(e) : u
        };
        return n && (c.conditions = n), s && (c.fields = s.split(",")), i && (c.reason = i), 
        c;
    });
};
//# sourceMappingURL=extra.cjs.map