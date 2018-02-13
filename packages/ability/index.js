function ForbiddenError(message) {
  Error.call(this);
  this.message = message;
  this.constructor = ForbiddenError;

  if (typeof Error.captureStackTrace === 'function') {
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error(this.message).stack;
  }
}

ForbiddenError.prototype = Object.create(Error.prototype);

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sift = createCommonjsModule(function (module, exports) {
/*
 * Sift 3.x
 *
 * Copryright 2015, Craig Condon
 * Licensed under MIT
 *
 * Filter JavaScript objects with mongodb queries
 */

(function() {

  'use strict';

  /**
   */

  function isFunction(value) {
    return typeof value === 'function';
  }

  /**
   */

  function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  /**
   */

  function comparable(value) {
    if (value instanceof Date) {
      return value.getTime();
    } else if (isArray(value)) {
      return value.map(comparable);
    } else if (value && typeof value.toJSON === 'function') {
      return value.toJSON();
    } else {
      return value;
    }
  }

  function get(obj, key) {
    return isFunction(obj.get) ? obj.get(key) : obj[key];
  }

  /**
   */

  function or(validator) {
    return function(a, b) {
      if (!isArray(b) || !b.length) {
        return validator(a, b);
      }
      for (var i = 0, n = b.length; i < n; i++) {
        if (validator(a, get(b,i))) return true;
      }
      return false;
    }
  }

  /**
   */

  function and(validator) {
    return function(a, b) {
      if (!isArray(b) || !b.length) {
        return validator(a, b);
      }
      for (var i = 0, n = b.length; i < n; i++) {
        if (!validator(a, get(b, i))) return false;
      }
      return true;
    };
  }

  function validate(validator, b, k, o) {
    return validator.v(validator.a, b, k, o);
  }

  var OPERATORS = {

    /**
     */

    $eq: or(function(a, b) {
      return a(b);
    }),

    /**
     */

    $ne: and(function(a, b) {
      return !a(b);
    }),

    /**
     */

    $gt: or(function(a, b) {
      return sift.compare(comparable(b), a) > 0;
    }),

    /**
     */

    $gte: or(function(a, b) {
      return sift.compare(comparable(b), a) >= 0;
    }),

    /**
     */

    $lt: or(function(a, b) {
      return sift.compare(comparable(b), a) < 0;
    }),

    /**
     */

    $lte: or(function(a, b) {
      return sift.compare(comparable(b), a) <= 0;
    }),

    /**
     */

    $mod: or(function(a, b) {
      return b % a[0] == a[1];
    }),

    /**
     */

    $in: function(a, b) {

      if (b instanceof Array) {
        for (var i = b.length; i--;) {
          if (~a.indexOf(comparable(get(b, i)))) {
            return true;
          }
        }
      } else {
        var comparableB = comparable(b);
        if (comparableB === b && typeof b === 'object') {
          for (var i = a.length; i--;) {
            if (String(a[i]) === String(b) && String(b) !== '[object Object]') {
              return true;
            }
          }
        }

        /*
          Handles documents that are undefined, whilst also
          having a 'null' element in the parameters to $in.
        */
        if (typeof comparableB == 'undefined') {
          for (var i = a.length; i--;) {
            if (a[i] == null) {
              return true;
            }
          }
        }

        /*
          Handles the case of {'field': {$in: [/regexp1/, /regexp2/, ...]}}
        */
        for (var i = a.length; i--;) {
          var validator = createRootValidator(get(a, i), undefined);
          var result = validate(validator, b, i, a);
          if ((result) && (String(result) !== '[object Object]') && (String(b) !== '[object Object]')) {
            return true;
          }
        }

        return !!~a.indexOf(comparableB);
      }

      return false;
    },

    /**
     */

    $nin: function(a, b, k, o) {
      return !OPERATORS.$in(a, b, k, o);
    },

    /**
     */

    $not: function(a, b, k, o) {
      return !validate(a, b, k, o);
    },

    /**
     */

    $type: function(a, b) {
      return b != void 0 ? b instanceof a || b.constructor == a : false;
     },

    /**
     */

    $all: function(a, b, k, o) {
      return OPERATORS.$and(a, b, k, o);
    },

    /**
     */

    $size: function(a, b) {
      return b ? a === b.length : false;
    },

    /**
     */

    $or: function(a, b, k, o) {
      for (var i = 0, n = a.length; i < n; i++) if (validate(get(a, i), b, k, o)) return true;
      return false;
    },

    /**
     */

    $nor: function(a, b, k, o) {
      return !OPERATORS.$or(a, b, k, o);
    },

    /**
     */

    $and: function(a, b, k, o) {
      for (var i = 0, n = a.length; i < n; i++) {
        if (!validate(get(a, i), b, k, o)) {
          return false;
        }
      }
      return true;
    },

    /**
     */

    $regex: or(function(a, b) {
      return typeof b === 'string' && a.test(b);
    }),

    /**
     */

    $where: function(a, b, k, o) {
      return a.call(b, b, k, o);
    },

    /**
     */

    $elemMatch: function(a, b, k, o) {
      if (isArray(b)) {
        return !!~search(b, a);
      }
      return validate(a, b, k, o);
    },

    /**
     */

    $exists: function(a, b, k, o) {
      return o.hasOwnProperty(k) === a;
    }
  };

  /**
   */

  var prepare = {

    /**
     */

    $eq: function(a) {

      if (a instanceof RegExp) {
        return function(b) {
          return typeof b === 'string' && a.test(b);
        };
      } else if (a instanceof Function) {
        return a;
      } else if (isArray(a) && !a.length) {
        // Special case of a == []
        return function(b) {
          return (isArray(b) && !b.length);
        };
      } else if (a === null){
        return function(b){
          //will match both null and undefined
          return b == null;
        }
      }

      return function(b) {
        return sift.compare(comparable(b), a) === 0;
      };
    },

    /**
     */

    $ne: function(a) {
      return prepare.$eq(a);
    },

    /**
     */

    $and: function(a) {
      return a.map(parse);
    },

    /**
     */

    $all: function(a) {
      return prepare.$and(a);
    },

    /**
     */

    $or: function(a) {
      return a.map(parse);
    },

    /**
     */

    $nor: function(a) {
      return a.map(parse);
    },

    /**
     */

    $not: function(a) {
      return parse(a);
    },

    /**
     */

    $regex: function(a, query) {
      return new RegExp(a, query.$options);
    },

    /**
     */

    $where: function(a) {
      return typeof a === 'string' ? new Function('obj', 'return ' + a) : a;
    },

    /**
     */

    $elemMatch: function(a) {
      return parse(a);
    },

    /**
     */

    $exists: function(a) {
      return !!a;
    }
  };

  /**
   */

  function search(array, validator) {

    for (var i = 0; i < array.length; i++) {
      var result = get(array, i);
      if (validate(validator, get(array, i))) {
        return i;
      }
    }

    return -1;
  }

  /**
   */

  function createValidator(a, validate) {
    return { a: a, v: validate };
  }

  /**
   */

  function nestedValidator(a, b) {
    var values  = [];
    findValues(b, a.k, 0, b, values);

    if (values.length === 1) {
      var first = values[0];
      return validate(a.nv, first[0], first[1], first[2]);
    }

    for (var i = 0; i < values.length; i++) {
      var result = values[i];
      if (validate(a.nv, result[0], result[1], result[2])) {
        return true;
      }
    }

    return false;
  }

  /**
   */

  function findValues(current, keypath, index, object, values) {

    if (index === keypath.length || current == void 0) {
      values.push([current, keypath[index - 1], object]);
      return;
    }

    var k = get(keypath, index);

    // ensure that if current is an array, that the current key
    // is NOT an array index. This sort of thing needs to work:
    // sift({'foo.0':42}, [{foo: [42]}]);
    if (isArray(current) && isNaN(Number(k))) {
      for (var i = 0, n = current.length; i < n; i++) {
        findValues(get(current, i), keypath, index, current, values);
      }
    } else {
      findValues(get(current, k), keypath, index + 1, current, values);
    }
  }

  /**
   */

  function createNestedValidator(keypath, a) {
    return { a: { k: keypath, nv: a }, v: nestedValidator };
  }

  /**
   * flatten the query
   */

  function isVanillaObject(value) {
    return value && value.constructor === Object;
  }

  function parse(query) {
    query = comparable(query);

    if (!query || !isVanillaObject(query)) { // cross browser support
      query = { $eq: query };
    }

    var validators = [];

    for (var key in query) {
      var a = query[key];

      if (key === '$options') {
        continue;
      }

      if (OPERATORS[key]) {
        if (prepare[key]) a = prepare[key](a, query);
        validators.push(createValidator(comparable(a), OPERATORS[key]));
      } else {

        if (key.charCodeAt(0) === 36) {
          throw new Error('Unknown operation ' + key);
        }

        validators.push(createNestedValidator(key.split('.'), parse(a)));
      }
    }

    return validators.length === 1 ? validators[0] : createValidator(validators, OPERATORS.$and);
  }

  /**
   */

  function createRootValidator(query, getter) {
    var validator = parse(query);
    if (getter) {
      validator = {
        a: validator,
        v: function(a, b, k, o) {
          return validate(a, getter(b), k, o);
        }
      };
    }
    return validator;
  }

  /**
   */

  function sift(query, array, getter) {

    if (isFunction(array)) {
      getter = array;
      array  = void 0;
    }

    var validator = createRootValidator(query, getter);

    function filter(b, k, o) {
      return validate(validator, b, k, o);
    }

    if (array) {
      return array.filter(filter);
    }

    return filter;
  }

  /**
   */

  sift.use = function(plugin) {
    if (isFunction(plugin)) return plugin(sift);
    for (var key in plugin) {
      /* istanbul ignore else */
      if (key.charCodeAt(0) === 36) {
        OPERATORS[key] = plugin[key];
      }
    }
  };

  /**
   */

  sift.indexOf = function(query, array, getter) {
    return search(array, createRootValidator(query, getter));
  };

  /**
   */

  sift.compare = function(a, b) {
    if(a===b) return 0;
    if(typeof a === typeof b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
    }
  };

  /* istanbul ignore next */
  {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    module.exports = sift;
    exports['default'] = module.exports.default = sift;
  }

  /* istanbul ignore next */
  if (typeof window !== 'undefined') {
    window.sift = sift;
  }
})();
});

var sift$1 = unwrapExports(sift);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();



























var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var Rule = function () {
  function Rule(params) {
    classCallCheck(this, Rule);

    this.conditions = params.conditions;
    this.actions = params.actions;
    this.subject = params.subject;
    this.inverted = !!params.inverted;
    this._matches = this.conditions ? sift$1(this.conditions) : null;
  }

  createClass(Rule, [{
    key: 'matches',
    value: function matches(object) {
      return !this._matches || this._matches(object);
    }
  }]);
  return Rule;
}();

function getSubjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  var Type = (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' ? subject.constructor : subject;

  return Type.modelName || Type.name;
}

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

var DEFAULT_ALIASES = {
  manage: ['create', 'read', 'update', 'delete']
};
var PRIVATE_FIELD = typeof Symbol !== 'undefined' ? Symbol.for('private') : '__private' + Date.now();

var Ability = function () {
  createClass(Ability, null, [{
    key: 'addAlias',
    value: function addAlias(alias, actions) {
      if (alias === actions || Array.isArray(actions) && actions.indexOf(alias) !== -1) {
        throw new Error('Attempt to alias action to itself: ' + alias + ' -> ' + actions.toString());
      }

      DEFAULT_ALIASES[alias] = actions;
      return this;
    }
  }]);

  function Ability(rules) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$RuleType = _ref.RuleType,
        RuleType = _ref$RuleType === undefined ? Rule : _ref$RuleType,
        _ref$subjectName = _ref.subjectName,
        subjectName = _ref$subjectName === undefined ? getSubjectName : _ref$subjectName;

    classCallCheck(this, Ability);

    this[PRIVATE_FIELD] = {
      RuleType: RuleType,
      subjectName: subjectName,
      originalRules: rules,
      rules: {},
      events: {},
      aliases: clone(DEFAULT_ALIASES)
    };
    this.update(rules);
  }

  createClass(Ability, [{
    key: 'update',
    value: function update(rules) {
      if (Array.isArray(rules)) {
        var payload = { rules: rules, ability: this };

        this.emit('update', payload);
        this[PRIVATE_FIELD].originalRules = Object.freeze(rules.slice(0));
        this[PRIVATE_FIELD].rules = this.buildIndexFor(this.rules);
        this.emit('updated', payload);
      }

      return this;
    }
  }, {
    key: 'buildIndexFor',
    value: function buildIndexFor(rules) {
      var indexedRules = {};
      var RuleType = this[PRIVATE_FIELD].RuleType;

      for (var i = 0; i < rules.length; i++) {
        var rule = rules[i];
        var actions = this.expandActions(rule.actions);

        for (var j = 0; j < actions.length; j++) {
          var action = actions[j];
          var subjects = Array.isArray(rule.subject) ? rule.subject : [rule.subject];

          for (var k = 0; k < subjects.length; k++) {
            var subject = subjects[k];
            indexedRules[subject] = indexedRules[subject] || {};
            indexedRules[subject][action] = indexedRules[subject][action] || [];
            indexedRules[subject][action].unshift(new RuleType(rule));
          }
        }
      }

      return indexedRules;
    }
  }, {
    key: 'expandActions',
    value: function expandActions(rawActions) {
      var _this = this;

      var actions = Array.isArray(rawActions) ? rawActions : [rawActions];
      var aliases = this[PRIVATE_FIELD].aliases;

      return actions.reduce(function (expanded, action) {
        if (aliases.hasOwnProperty(action)) {
          return expanded.concat(_this.expandActions(aliases[action]));
        }

        return expanded;
      }, actions);
    }
  }, {
    key: 'can',
    value: function can(action, subject) {
      var subjectName = this[PRIVATE_FIELD].subjectName(subject);
      var rules = this.rulesFor(action, subject);

      if (subject === subjectName) {
        return rules.length > 0 && !rules[0].inverted;
      }

      for (var i = 0; i < rules.length; i++) {
        if (rules[i].matches(subject)) {
          return !rules[i].inverted;
        }
      }

      return false;
    }
  }, {
    key: 'rulesFor',
    value: function rulesFor(action, subject) {
      var subjectName = this[PRIVATE_FIELD].subjectName(subject);
      var rules = this[PRIVATE_FIELD].rules;
      var specificRules = rules.hasOwnProperty(subjectName) ? rules[subjectName][action] : null;
      var generalRules = rules.hasOwnProperty('all') ? rules.all[action] : null;

      return (generalRules || []).concat(specificRules || []);
    }
  }, {
    key: 'cannot',
    value: function cannot(action, subject) {
      return !this.can(action, subject);
    }
  }, {
    key: 'throwUnlessCan',
    value: function throwUnlessCan(action, subject) {
      if (this.cannot(action, subject)) {
        throw new ForbiddenError('Cannot execute "' + action + '" on "' + this[PRIVATE_FIELD].subjectName(subject) + '"');
      }
    }
  }, {
    key: 'on',
    value: function on(event, handler) {
      var events = this[PRIVATE_FIELD].events;
      var isAttached = true;

      if (!events[event]) {
        events[event] = [];
      }

      events[event].push(handler);

      return function () {
        if (isAttached) {
          isAttached = false;
          var index = events[event].indexOf(handler);
          events[event].splice(index, 1);
        }
      };
    }
  }, {
    key: 'emit',
    value: function emit(event, payload) {
      var handlers = this[PRIVATE_FIELD].events[event];

      if (handlers) {
        handlers.forEach(function (handler) {
          return handler(payload);
        });
      }
    }
  }, {
    key: 'rules',
    get: function get$$1() {
      return this[PRIVATE_FIELD].originalRules;
    }
  }]);
  return Ability;
}();

function isStringOrNonEmptyArray(value) {
  return typeof value === 'string' || Array.isArray(value) && value.length > 0;
}

var AbilityBuilder = function () {
  createClass(AbilityBuilder, null, [{
    key: 'define',
    value: function define(params, dsl) {
      var _ref = typeof params === 'function' ? [{}, params] : [params, dsl],
          _ref2 = slicedToArray(_ref, 2),
          options = _ref2[0],
          define = _ref2[1];

      var builder = new this();
      define(builder.can.bind(builder), builder.cannot.bind(builder));

      return new Ability(builder.rules, options);
    }
  }, {
    key: 'extract',
    value: function extract() {
      var builder = new this();

      return {
        can: builder.can.bind(builder),

        cannot: builder.cannot.bind(builder),

        get rules() {
          return builder.rules;
        }
      };
    }
  }]);

  function AbilityBuilder() {
    classCallCheck(this, AbilityBuilder);

    this.rules = [];
  }

  createClass(AbilityBuilder, [{
    key: 'can',
    value: function can(actions, subject, conditions) {
      if (!isStringOrNonEmptyArray(actions)) {
        throw new TypeError('AbilityBuilder#can expects the first parameter to be an action or array of actions');
      }

      if (!isStringOrNonEmptyArray(subject)) {
        throw new TypeError('AbilityBuilder#can expects the second argument to be a subject name or array of subject names');
      }

      var rule = { actions: actions, subject: subject };

      if ((typeof conditions === 'undefined' ? 'undefined' : _typeof(conditions)) === 'object' && conditions) {
        rule.conditions = conditions;
      }

      this.rules.push(rule);

      return rule;
    }
  }, {
    key: 'cannot',
    value: function cannot() {
      var rule = this.can.apply(this, arguments);
      rule.inverted = true;

      return rule;
    }
  }]);
  return AbilityBuilder;
}();

export { Ability, Rule, AbilityBuilder, ForbiddenError };
