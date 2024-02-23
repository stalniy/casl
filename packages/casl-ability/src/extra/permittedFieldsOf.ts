import { AnyAbility } from '../PureAbility';
import { Rule } from '../Rule';
import { RuleOf } from '../RuleIndex';
import { Subject, SubjectType } from '../types';

export type GetRuleFields<R extends Rule<any, any>> = (rule: R) => string[];

export interface PermittedFieldsOptions<T extends AnyAbility> {
  fieldsFrom: GetRuleFields<RuleOf<T>>
}

export function permittedFieldsOf<T extends AnyAbility>(
  ability: T,
  action: Parameters<T['can']>[0],
  subject: Parameters<T['can']>[1],
  options: PermittedFieldsOptions<T>
): string[] {
  const subjectType = ability.detectSubjectType(subject);
  const rules = ability.possibleRulesFor(action, subjectType);
  const uniqueFields = new Set<string>();
  const deleteItem = uniqueFields.delete.bind(uniqueFields);
  const addItem = uniqueFields.add.bind(uniqueFields);
  let i = rules.length;

  while (i--) {
    const rule = rules[i];
    if (rule.matchesConditions(subject)) {
      const toggle = rule.inverted ? deleteItem : addItem;
      options.fieldsFrom(rule).forEach(toggle);
    }
  }

  return Array.from(uniqueFields);
}

export type GetSubjectTypeAllFieldsExtractor = (subjectType: SubjectType) => string[];

/**
 * Helper class to make custom `accessibleFieldsBy` helper function
 */
export class AccessibleFields<T extends Subject> {
  constructor(
    private readonly _ability: AnyAbility,
    private readonly _action: string,
    private readonly _getAllFields: GetSubjectTypeAllFieldsExtractor
  ) {}

  /**
   * Returns accessible fields for Model type
   */
  ofType(subjectType: Extract<T, SubjectType>): string[] {
    return permittedFieldsOf(this._ability, this._action, subjectType, {
      fieldsFrom: this._getRuleFields(subjectType)
    });
  }

  /**
   * Returns accessible fields for particular document
   */
  of(subject: Exclude<T, SubjectType>): string[] {
    return permittedFieldsOf(this._ability, this._action, subject, {
      fieldsFrom: this._getRuleFields(this._ability.detectSubjectType(subject))
    });
  }

  private _getRuleFields(type: SubjectType): GetRuleFields<RuleOf<AnyAbility>> {
    return (rule) => (rule.fields || this._getAllFields(type));
  }
}
