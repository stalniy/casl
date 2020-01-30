import { Ability, AbilityOptions } from './ability';
import { getSubjectName, isObject, isStringOrNonEmptyArray, AbilitySubject, wrapArray } from './utils';
import { UnifiedRawRule } from './RawRule';

export class RuleBuilder {
  public rule: UnifiedRawRule;

  constructor(rule: UnifiedRawRule) {
    this.rule = rule;
  }

  because(reason: string): this {
    this.rule.reason = reason;
    return this;
  }
}

type SyncAbilityBuilderDSL = (can: Function, cannot: Function) => void;
type AsyncAbilityBuilderDSL = (can: Function, cannot: Function) => Promise<void>;

export type AbilityBuilderDSL = SyncAbilityBuilderDSL | AsyncAbilityBuilderDSL;

export type SubjectDefinition = string | string[] | AbilitySubject | AbilitySubject[];
export type Action = string | string[];

export class AbilityBuilder {
  static define(dsl: AsyncAbilityBuilderDSL): Promise<Ability>;
  static define(params: AbilityOptions, dsl: AsyncAbilityBuilderDSL): Promise<Ability>;
  static define(dsl: SyncAbilityBuilderDSL): Ability;
  static define(params: AbilityOptions, dsl: SyncAbilityBuilderDSL): Ability;
  static define(
    params: AbilityOptions | AbilityBuilderDSL,
    dsl?: AbilityBuilderDSL
  ): Ability | Promise<Ability> {
    let options: AbilityOptions;
    let define: AbilityBuilderDSL | AsyncAbilityBuilderDSL;

    if (typeof params === 'function') {
      define = params;
      options = {};
    } else if (typeof dsl === 'function') {
      options = params;
      define = dsl;
    } else {
      throw new Error('AbilityBuilder#define expects to receive either options and dsl function or only dsl function');
    }

    const builder = new this(options);
    const result = define(builder.can.bind(builder), builder.cannot.bind(builder));
    const buildAbility = () => new Ability(builder._rules, options); // eslint-disable-line

    return result && typeof result.then === 'function'
      ? result.then(buildAbility)
      : buildAbility();
  }

  static extract() {
    const builder = new this();

    return {
      can: builder.can.bind(builder),
      cannot: builder.cannot.bind(builder),
      rules: builder._rules, // eslint-disable-line
    };
  }

  private _rules: UnifiedRawRule[];

  private _subjectName: AbilityOptions['subjectName'];

  constructor({ subjectName = getSubjectName }: AbilityOptions = {}) {
    this._rules = [];
    this._subjectName = subjectName;
  }

  can(actions: Action, subject: SubjectDefinition, conditions?: UnifiedRawRule['conditions']): RuleBuilder
  can(actions: Action, subject: SubjectDefinition, fields: UnifiedRawRule['fields'], conditions?: UnifiedRawRule['conditions']): RuleBuilder
  can(actions: Action, subject: SubjectDefinition, conditionsOrFields?: UnifiedRawRule['fields'] | UnifiedRawRule['conditions'], conditions?: UnifiedRawRule['conditions']): RuleBuilder {
    if (!isStringOrNonEmptyArray(actions)) {
      throw new TypeError('AbilityBuilder#can expects the first parameter to be an action or array of actions');
    }

    const subjectName = wrapArray(subject).map(subjectType => this._subjectName!(subjectType));

    if (!isStringOrNonEmptyArray(subjectName)) {
      throw new TypeError('AbilityBuilder#can expects the second argument to be a subject name/type or an array of subject names/types');
    }

    const rule: UnifiedRawRule = { actions, subject: subjectName };

    if (Array.isArray(conditionsOrFields) || typeof conditionsOrFields === 'string') {
      rule.fields = conditionsOrFields;
    }

    if (isObject(conditions) || !rule.fields && isObject(conditionsOrFields)) {
      rule.conditions = conditions || conditionsOrFields as UnifiedRawRule['conditions'];
    }

    this._rules.push(rule);

    return new RuleBuilder(rule);
  }

  cannot(...args: [Action, SubjectDefinition, UnifiedRawRule['conditions']?]): RuleBuilder
  cannot(...args: [Action, SubjectDefinition, UnifiedRawRule['fields'], UnifiedRawRule['conditions']?]): RuleBuilder
  cannot(...args: [Action, SubjectDefinition, any?, UnifiedRawRule['conditions']?]): RuleBuilder {
    const builder = this.can(...args);
    builder.rule.inverted = true;
    return builder;
  }
}
