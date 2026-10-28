import { Ability } from '../Ability';
import { AnyObject, ExtractSubjectType } from '../types';
import { setByPath } from '../utils';

/**
 * Extracts rules condition values into an object of default values
 */
export function rulesToFields<T extends Ability<any, AnyObject, any>>(
  ability: T,
  action: Parameters<T['rulesFor']>[0],
  subjectType: ExtractSubjectType<Parameters<T['rulesFor']>[1]>,
): NullObject {
  return ability.rulesFor(action, subjectType)
    .reduce((values, rule) => {
      if (rule.inverted || !rule.conditions) {
        return values;
      }

      return Object.keys(rule.conditions).reduce((fields, fieldName) => {
        const value = rule.conditions![fieldName];

        if (!value || (value as any).constructor !== Object) {
          setByPath(fields, fieldName, value);
        }

        return fields;
      }, values);
    }, Object.create(null) as NullObject);
}

type NullObject = AnyObject & {
  hasOwnProperty?: never;
  toString?: never;
  valueOf?: never;
};
