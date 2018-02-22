import sift from 'sift';

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

var Rule = function () {
  function Rule(params) {
    classCallCheck(this, Rule);

    this.conditions = params.conditions;
    this.actions = params.actions;
    this.subject = params.subject;
    this.inverted = !!params.inverted;
    this._matches = this.conditions ? sift(this.conditions) : null;
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
          var index = events[event].indexOf(handler);
          events[event].splice(index, 1);
          isAttached = false;
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
      var options = typeof params === 'function' ? {} : params;
      var define = params === options ? dsl : params;
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
        rules: builder.rules
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

function rulesToQuery(rules, convert) {
  var query = {};
  var ignoreOperators = {};

  for (var i = 0; i < rules.length; i++) {
    var rule = rules[i];
    var op = rule.inverted ? '$and' : '$or';

    if (!rule.conditions) {
      if (rule.inverted) {
        return null;
      }

      if (query[op]) {
        delete query[op];
      }

      ignoreOperators[op] = true;
    } else if (!ignoreOperators.hasOwnProperty(op)) {
      query[op] = query[op] || [];
      query[op].push(convert(rule));
    }
  }

  return rules.length > 0 ? query : null;
}

export { Ability, Rule, AbilityBuilder, ForbiddenError, rulesToQuery };
