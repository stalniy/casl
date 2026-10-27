Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
});

const t = require("./utils-DKyh0oOI.cjs");

let s = require("@ucast/mongo2js");

var i = class {
    constructor(s, i, e = 0) {
        !function(t, s) {
            if (Array.isArray(t.fields) && !t.fields.length) throw new Error("The `rawRule.fields` array cannot be empty. https://bit.ly/390miLa");
            if (t.fields && !s.fieldMatcher) throw new Error('Cannot restrict access by fields without a "fieldMatcher" option');
            if (t.conditions && !s.conditionsMatcher) throw new Error('Cannot restrict access by conditions without a "conditionsMatcher" option. Please, provide a "conditionsMatcher" function to your Ability class or use "createMongoAbility" instead.');
        }(s, i), this.action = i.resolveAction(s.action), this.subject = s.subject, this.inverted = !!s.inverted, 
        this.conditions = s.conditions, this.reason = s.reason, this.origin = s, this.fields = s.fields ? t.wrapArray(s.fields) : void 0, 
        this.priority = e, this.t = i;
    }
    i() {
        return this.conditions && !this.o && (this.o = this.t.conditionsMatcher(this.conditions)), 
        this.o;
    }
    get ast() {
        const t = this.i();
        return t ? t.ast : void 0;
    }
    matchesConditions(s) {
        if (!this.conditions) return !0;
        if (!s || t.isSubjectType(s)) {
            if (!this.inverted) return !0;
            const t = this.i();
            return !!t && (!0 === t.matchesAll || !!t.ast && (("and" === (i = t.ast).operator || "AND" === i.operator) && Array.isArray(i.value) && 0 === i.value.length));
        }
        var i;
        const e = this.i();
        return !!e && e(s);
    }
    matchesField(t) {
        return !this.fields || (t ? (this.h || (this.h = this.t.fieldMatcher(this.fields)), 
        !!this.h && this.h(t)) : !this.inverted);
    }
};

const e = () => ({
    rules: [],
    merged: !1
}), r = () => new Map;

var n = class {
    constructor(s = [], i = {}) {
        this.u = !1, this.l = new Map, this.p = {
            conditionsMatcher: i.conditionsMatcher,
            fieldMatcher: i.fieldMatcher,
            resolveAction: i.resolveAction || t.identity
        }, this.$ = i.anyAction || "manage", this.v = i.anySubjectType || "all", this.m = s, 
        this.M = !!i.detectSubjectType, this.A = i.detectSubjectType || t.detectSubjectType, 
        this.j(s);
    }
    get rules() {
        return this.m;
    }
    detectSubjectType(s) {
        return t.isSubjectType(s) ? s : s ? this.A(s) : this.v;
    }
    update(t) {
        const s = {
            rules: t,
            ability: this,
            target: this
        };
        return this.F("update", s), this.u = !1, this.m = t, this.j(t), this.F("updated", s), 
        this;
    }
    j(s) {
        const n = new Map;
        let o;
        for (let h = s.length - 1; h >= 0; h--) {
            const c = s.length - h - 1, a = new i(s[h], this.p, c), u = t.wrapArray(a.action), l = t.wrapArray(a.subject || this.v);
            !this.u && a.fields && (this.u = !0);
            for (let s = 0; s < l.length; s++) {
                const i = t.getOrDefault(n, l[s], r);
                void 0 === o && (o = typeof l[s]), typeof l[s] !== o && "mixed" !== o && (o = "mixed");
                for (let s = 0; s < u.length; s++) t.getOrDefault(i, u[s], e).rules.push(a);
            }
        }
        if (this.l = n, "mixed" !== o && !this.M) {
            const s = t.DETECT_SUBJECT_TYPE_STRATEGY[o] || t.DETECT_SUBJECT_TYPE_STRATEGY.string;
            this.A = s;
        }
    }
    possibleRulesFor(s, i = this.v) {
        if (!t.isSubjectType(i)) throw new Error('"possibleRulesFor" accepts only subject types (i.e., string or class) as the 2nd parameter');
        const e = this.l.get(i), r = e?.get(s);
        if (r?.merged) return r.rules;
        const n = s !== this.$ && e?.has(this.$) ? Object.freeze(e.get(this.$).rules) : void 0;
        let o = t.mergePrioritized(r?.rules, n);
        return i !== this.v && (o = t.mergePrioritized(o, this.possibleRulesFor(s, this.v))), 
        r && (r.rules = Object.freeze(o), r.merged = !0), o;
    }
    rulesFor(s, i, e) {
        const r = this.possibleRulesFor(s, i);
        if (e && "string" != typeof e) throw new Error("The 3rd, `field` parameter is expected to be a string. See https://casl.js.org/v6/en/api/casl-ability#can-of-ability for details");
        return this.u ? t.filterWithLazyAllocation(r, t => t.matchesField(e)) : r;
    }
    actionsFor(s) {
        if (!t.isSubjectType(s)) throw new Error('"actionsFor" accepts only subject types (i.e., string or class) as a parameter');
        const i = new Set, e = this.l.get(s);
        e && Array.from(e.keys()).forEach(t => i.add(t));
        const r = s !== this.v ? this.l.get(this.v) : void 0;
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
}, o = class extends n {
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

const h = {
    $eq: s.$eq,
    $ne: s.$ne,
    $lt: s.$lt,
    $lte: s.$lte,
    $gt: s.$gt,
    $gte: s.$gte,
    $in: s.$in,
    $nin: s.$nin,
    $all: s.$all,
    $size: s.$size,
    $regex: s.$regex,
    $options: s.$options,
    $elemMatch: s.$elemMatch,
    $exists: s.$exists
}, c = {
    eq: s.eq,
    ne: s.ne,
    lt: s.lt,
    lte: s.lte,
    gt: s.gt,
    gte: s.gte,
    in: s.within,
    nin: s.nin,
    all: s.all,
    size: s.size,
    regex: s.regex,
    elemMatch: s.elemMatch,
    exists: s.exists,
    and: s.and
}, a = (0, s.createFactory)(h, c), u = /[-/\\^$+?.()|[\]{}]/g, l = /\.?\*+\.?/g, f = /\*+/, p = /\./g;

function d(t, s, i) {
    const e = "*" === i[0] || "." === t[0] && "." === t[t.length - 1] ? "+" : "*", r = -1 === t.indexOf("**") ? "[^.]" : ".", n = t.replace(p, "\\$&").replace(f, r + e);
    return s + t.length === i.length ? `(?:${n})?` : n;
}

function y(t, s, i) {
    return "." !== t || "*" !== i[s - 1] && "*" !== i[s + 1] ? `\\${t}` : t;
}

const w = t => {
    let s;
    return i => (void 0 === s && (s = t.every(t => -1 === t.indexOf("*")) ? null : function(t) {
        const s = t.map(t => t.replace(u, y).replace(l, d)), i = s.length > 1 ? `(?:${s.join("|")})` : s[0];
        return new RegExp(`^${i}$`);
    }(t)), null === s ? -1 !== t.indexOf(i) : s.test(i));
};

function x(t = [], s = {}) {
    return new o(t, {
        conditionsMatcher: a,
        fieldMatcher: w,
        ...s
    });
}

var g = class {
    constructor(t) {
        this.C = t;
    }
    because(t) {
        return this.C.reason = t, this;
    }
}, $ = class {
    constructor(t) {
        this.rules = [], this.q = t, this.can = (t, s, i, e) => this.O(t, s, i, e, !1), 
        this.cannot = (t, s, i, e) => this.O(t, s, i, e, !0), this.build = t => {
            return void 0 !== (s = this.q).prototype && "function" == typeof s.prototype.possibleRulesFor ? new this.q(this.rules, t) : this.q(this.rules, t);
            var s;
        };
    }
    O(t, s, i, e, r) {
        const n = {
            action: t
        };
        return r && (n.inverted = r), s && (n.subject = s, Array.isArray(i) || "string" == typeof i ? n.fields = i : void 0 !== i && (n.conditions = i), 
        void 0 !== e && (n.conditions = e)), this.rules.push(n), new g(n);
    }
};

const b = function(t) {
    this.message = t;
};

b.prototype = Object.create(Error.prototype);

var v = class extends b {
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
    unlessCan(s, i, e) {
        const r = this.ability.relevantRuleFor(s, i, e);
        if (r && !r.inverted) return;
        this.action = s, this.subject = i, this.subjectType = t.getSubjectTypeName(this.ability.detectSubjectType(i)), 
        this.field = e;
        const n = r ? r.reason : "";
        return this.message = this.message || n || this.constructor.S(this), this;
    }
};

v.S = t => `Cannot execute "${t.action}" on "${t.subjectType}"`, exports.Ability = o, 
exports.AbilityBuilder = $, exports.ForbiddenError = v, exports.buildMongoQueryMatcher = (t, i, e) => (0, 
s.createFactory)({
    ...h,
    ...t
}, {
    ...c,
    ...i
}, e), exports.createAliasResolver = t.createAliasResolver, exports.createMongoAbility = x, 
exports.defineAbility = function(t, s) {
    const i = new $(x), e = t(i.can, i.cannot);
    return e && "function" == typeof e.then ? e.then(() => i.build(s)) : i.build(s);
}, exports.detectSubjectType = t.detectSubjectType, exports.fieldPatternMatcher = w, 
exports.mongoQueryMatcher = a, exports.subject = t.setSubjectType, exports.wrapArray = t.wrapArray;
//# sourceMappingURL=index.cjs.map