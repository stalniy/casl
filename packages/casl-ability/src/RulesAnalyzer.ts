import { RawRuleFrom } from './RawRule';
import { Abilities, RuleOptions } from './types';

export default class RulesAnalyzer<A extends Abilities, C> {
  public _isAllInverted: boolean;
  public _hasPerFieldRules: boolean = false;
  public _hasRuleWithEmptyFields: boolean = false;

  constructor(hasRules: boolean) {
    this._isAllInverted = hasRules;
    this._analyze = this._analyze.bind(this);
  }

  _analyze({ fields, inverted }: RawRuleFrom<A, C>) {
    this._isAllInverted = this._isAllInverted && !!inverted;

    if (!this._hasRuleWithEmptyFields && Array.isArray(fields) && !fields.length) {
      this._hasRuleWithEmptyFields = true;
    }

    if (!this._hasPerFieldRules && fields && fields.length) {
      this._hasPerFieldRules = true;
    }
  }

  _validate(ruleOptions: RuleOptions<A, C>) {
    if (this._isAllInverted) {
      // eslint-disable-next-line
      console.warn('Make sure your ability has direct rules, not only inverted ones. Otherwise `ability.can` will always return `false`.');
    }

    if (this._hasRuleWithEmptyFields) {
      // eslint-disable-next-line
      console.warn('[error in next major version]: There are rules with `fields` property being an empty array. This results in the same as not passing fields at all. Make sure to remove empty array or pass fields.');
    }

    if (this._hasPerFieldRules && !ruleOptions.fieldMatcher) {
      throw new Error('Field level restrictions are ignored because "fieldMatcher" option is not specified. Did you unintentionally used PureAbility instead of Ability?');
    }
  }
}
