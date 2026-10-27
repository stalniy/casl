import { a as t, c as s, d as i, f as e, i as r, l as n, n as o, o as h, r as a, s as c, t as u } from "./utils-5VKvuays.mjs";

import { $all as l, $elemMatch as f, $eq as d, $exists as p, $gt as y, $gte as w, $in as g, $lt as $, $lte as m, $ne as b, $nin as v, $options as M, $regex as x, $size as A, all as E, and as j, createFactory as F, elemMatch as R, eq as C, exists as _, gt as z, gte as O, lt as S, lte as T, ne as q, nin as D, regex as L, size as N, within as P } from "@ucast/mongo2js";

var U = class {
    constructor(t, s, i = 0) {
        !function(t, s) {
            if (Array.isArray(t.fields) && !t.fields.length) throw new Error("The `rawRule.fields` array cannot be empty. https://bit.ly/390miLa");
            if (t.fields && !s.fieldMatcher) throw new Error('Cannot restrict access by fields without a "fieldMatcher" option');
            if (t.conditions && !s.conditionsMatcher) throw new Error('Cannot restrict access by conditions without a "conditionsMatcher" option. Please, provide a "conditionsMatcher" function to your Ability class or use "createMongoAbility" instead.');
        }(t, s), this.action = s.resolveAction(t.action), this.subject = t.subject, this.inverted = !!t.inverted, 
        this.conditions = t.conditions, this.reason = t.reason, this.origin = t, this.fields = t.fields ? e(t.fields) : void 0, 
        this.priority = i, this.t = s;
    }
    i() {
        return this.conditions && !this.o && (this.o = this.t.conditionsMatcher(this.conditions)), 
        this.o;
    }
    get ast() {
        const t = this.i();
        return t ? t.ast : void 0;
    }
    matchesConditions(t) {
        if (!this.conditions) return !0;
        if (!t || s(t)) {
            if (!this.inverted) return !0;
            const t = this.i();
            return !!t && (!0 === t.matchesAll || !!t.ast && (("and" === (i = t.ast).operator || "AND" === i.operator) && Array.isArray(i.value) && 0 === i.value.length));
        }
        var i;
        const e = this.i();
        return !!e && e(t);
    }
    matchesField(t) {
        return !this.fields || (t ? (this.h || (this.h = this.t.fieldMatcher(this.fields)), 
        !!this.h && this.h(t)) : !this.inverted);
    }
};

const k = () => ({
    rules: [],
    merged: !1
}), B = () => new Map;

var G = class {
    constructor(t = [], s = {}) {
        this.u = !1, this.l = new Map, this.p = {
            conditionsMatcher: s.conditionsMatcher,
            fieldMatcher: s.fieldMatcher,
            resolveAction: s.resolveAction || c
        }, this.$ = s.anyAction || "manage", this.m = s.anySubjectType || "all", this.v = t, 
        this.M = !!s.detectSubjectType, this.A = s.detectSubjectType || a, this.j(t);
    }
    get rules() {
        return this.v;
    }
    detectSubjectType(t) {
        return s(t) ? t : t ? this.A(t) : this.m;
    }
    update(t) {
        const s = {
            rules: t,
            ability: this,
            target: this
        };
        return this.F("update", s), this.u = !1, this.v = t, this.j(t), this.F("updated", s), 
        this;
    }
    j(s) {
        const i = new Map;
        let r;
        for (let n = s.length - 1; n >= 0; n--) {
            const o = s.length - n - 1, h = new U(s[n], this.p, o), a = e(h.action), c = e(h.subject || this.m);
            !this.u && h.fields && (this.u = !0);
            for (let s = 0; s < c.length; s++) {
                const e = t(i, c[s], B);
                void 0 === r && (r = typeof c[s]), typeof c[s] !== r && "mixed" !== r && (r = "mixed");
                for (let s = 0; s < a.length; s++) t(e, a[s], k).rules.push(h);
            }
        }
        if (this.l = i, "mixed" !== r && !this.M) {
            const t = u[r] || u.string;
            this.A = t;
        }
    }
    possibleRulesFor(t, i = this.m) {
        if (!s(i)) throw new Error('"possibleRulesFor" accepts only subject types (i.e., string or class) as the 2nd parameter');
        const e = this.l.get(i), r = e?.get(t);
        if (r?.merged) return r.rules;
        const o = t !== this.$ && e?.has(this.$) ? Object.freeze(e.get(this.$).rules) : void 0;
        let h = n(r?.rules, o);
        return i !== this.m && (h = n(h, this.possibleRulesFor(t, this.m))), r && (r.rules = Object.freeze(h), 
        r.merged = !0), h;
    }
    rulesFor(t, s, i) {
        const e = this.possibleRulesFor(t, s);
        if (i && "string" != typeof i) throw new Error("The 3rd, `field` parameter is expected to be a string. See https://casl.js.org/v6/en/api/casl-ability#can-of-ability for details");
        return this.u ? r(e, t => t.matchesField(i)) : e;
    }
    actionsFor(t) {
        if (!s(t)) throw new Error('"actionsFor" accepts only subject types (i.e., string or class) as a parameter');
        const i = new Set, e = this.l.get(t);
        e && Array.from(e.keys()).forEach(t => i.add(t));
        const r = t !== this.m ? this.l.get(this.m) : void 0;
        return r && Array.from(r.keys()).forEach(t => i.add(t)), Array.from(i);
    }
    on(t, s) {
        this.R = this.R || new Map;
        const i = this.R, e = function(t, s) {
            const i = {
                value: t,
                prev: s,
                next: null
            };
            return s && (s.next = i), i;
        }(s, i.get(t) || null);
        return i.set(t, e), () => {
            const s = i.get(t);
            e.next || e.prev || s !== e ? e === s && i.set(t, e.prev) : i.delete(t), function(t) {
                t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next), t.next = t.prev = null;
            }(e);
        };
    }
    F(t, s) {
        if (!this.R) return;
        let i = this.R.get(t) || null;
        const e = [];
        for (;null !== i; ) e.push(i.value), i = i.prev;
        for (let t = 0; t < e.length; t++) e[t](s);
    }
}, H = class extends G {
    can(t, s, i) {
        const e = this.relevantRuleFor(t, s, i);
        return !!e && !e.inverted;
    }
    relevantRuleFor(t, s, i) {
        const e = this.detectSubjectType(s), r = this.rulesFor(t, e, i);
        for (let t = 0, i = r.length; t < i; t++) if (r[t].matchesConditions(s)) return r[t];
        return null;
    }
    cannot(t, s, i) {
        return !this.can(t, s, i);
    }
};

const I = {
    $eq: d,
    $ne: b,
    $lt: $,
    $lte: m,
    $gt: y,
    $gte: w,
    $in: g,
    $nin: v,
    $all: l,
    $size: A,
    $regex: x,
    $options: M,
    $elemMatch: f,
    $exists: p
}, J = {
    eq: C,
    ne: q,
    lt: S,
    lte: T,
    gt: z,
    gte: O,
    in: P,
    nin: D,
    all: E,
    size: N,
    regex: L,
    elemMatch: R,
    exists: _,
    and: j
}, K = (t, s, i) => F({
    ...I,
    ...t
}, {
    ...J,
    ...s
}, i), Q = F(I, J), V = /[-/\\^$+?.()|[\]{}]/g, W = /\.?\*+\.?/g, X = /\*+/, Y = /\./g;

function Z(t, s, i) {
    const e = "*" === i[0] || "." === t[0] && "." === t[t.length - 1] ? "+" : "*", r = -1 === t.indexOf("**") ? "[^.]" : ".", n = t.replace(Y, "\\$&").replace(X, r + e);
    return s + t.length === i.length ? `(?:${n})?` : n;
}

function tt(t, s, i) {
    return "." !== t || "*" !== i[s - 1] && "*" !== i[s + 1] ? `\\${t}` : t;
}

const st = t => {
    let s;
    return i => (void 0 === s && (s = t.every(t => -1 === t.indexOf("*")) ? null : function(t) {
        const s = t.map(t => t.replace(V, tt).replace(W, Z)), i = s.length > 1 ? `(?:${s.join("|")})` : s[0];
        return new RegExp(`^${i}$`);
    }(t)), null === s ? -1 !== t.indexOf(i) : s.test(i));
};

function it(t = [], s = {}) {
    return new H(t, {
        conditionsMatcher: Q,
        fieldMatcher: st,
        ...s
    });
}

var et = class {
    constructor(t) {
        this.C = t;
    }
    because(t) {
        return this.C.reason = t, this;
    }
}, rt = class {
    constructor(t) {
        this.rules = [], this._ = t, this.can = (t, s, i, e) => this.O(t, s, i, e, !1), 
        this.cannot = (t, s, i, e) => this.O(t, s, i, e, !0), this.build = t => {
            return void 0 !== (s = this._).prototype && "function" == typeof s.prototype.possibleRulesFor ? new this._(this.rules, t) : this._(this.rules, t);
            var s;
        };
    }
    O(t, s, i, e, r) {
        const n = {
            action: t
        };
        return r && (n.inverted = r), s && (n.subject = s, Array.isArray(i) || "string" == typeof i ? n.fields = i : void 0 !== i && (n.conditions = i), 
        void 0 !== e && (n.conditions = e)), this.rules.push(n), new et(n);
    }
};

function nt(t, s) {
    const i = new rt(it), e = t(i.can, i.cannot);
    return e && "function" == typeof e.then ? e.then(() => i.build(s)) : i.build(s);
}

const ot = function(t) {
    this.message = t;
};

ot.prototype = Object.create(Error.prototype);

var ht = class extends ot {
    static setDefaultMessage(t) {
        this.S = "string" == typeof t ? () => t : t;
    }
    static from(t) {
        return new this(t);
    }
    constructor(t) {
        super(""), this.ability = t, "function" == typeof Error.captureStackTrace && (this.name = "ForbiddenError", 
        Error.captureStackTrace(this, this.constructor));
    }
    setMessage(t) {
        return this.message = t, this;
    }
    throwUnlessCan(t, s, i) {
        const e = this.unlessCan(t, s, i);
        if (e) throw e;
    }
    unlessCan(t, s, i) {
        const e = this.ability.relevantRuleFor(t, s, i);
        if (e && !e.inverted) return;
        this.action = t, this.subject = s, this.subjectType = h(this.ability.detectSubjectType(s)), 
        this.field = i;
        const r = e ? e.reason : "";
        return this.message = this.message || r || this.constructor.S(this), this;
    }
};

ht.S = t => `Cannot execute "${t.action}" on "${t.subjectType}"`;

export { H as Ability, rt as AbilityBuilder, ht as ForbiddenError, K as buildMongoQueryMatcher, o as createAliasResolver, it as createMongoAbility, nt as defineAbility, a as detectSubjectType, st as fieldPatternMatcher, Q as mongoQueryMatcher, i as subject, e as wrapArray };
//# sourceMappingURL=index.mjs.map