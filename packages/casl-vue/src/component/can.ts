import {
  Abilities,
  AbilityTuple,
  AnyAbility,
  Generics,
  IfString,
  MongoAbility,
  SubjectType
} from '@casl/ability';
import { ComponentCustomProperties, defineComponent } from 'vue';
import { useAbility } from '../useAbility';

type AbilityCanProps<
  T extends Abilities,
  Else = IfString<T, { do: T } | { I: T }>
> = T extends AbilityTuple
  ? { do: T[0], on: T[1], field?: string | string[] } |
  { I: T[0], a: Extract<T[1], SubjectType>, field?: string | string[] } |
  { I: T[0], an: Extract<T[1], SubjectType>, field?: string | string[] } |
  { I: T[0], this: Exclude<T[1], SubjectType>, field?: string | string[] }
  : Else;

export type CanProps<T extends AnyAbility> = AbilityCanProps<Generics<T>['abilities']> & {
  not?: boolean,
  passThrough?: boolean
};

type VueAbility = ComponentCustomProperties extends { $ability: AnyAbility }
  ? ComponentCustomProperties['$ability']
  : MongoAbility;

function detectSubjectProp(props: Record<string, unknown>) {
  if (props.a !== undefined) {
    return 'a';
  }

  if (props.this !== undefined) {
    return 'this';
  }

  if (props.an !== undefined) {
    return 'an';
  }

  return '';
}

export const Can = defineComponent<CanProps<VueAbility>>({
  name: 'Can',
  props: {
    I: String,
    do: String,
    a: [String, Function],
    an: [String, Function],
    this: [String, Function, Object],
    on: [String, Function, Object],
    not: Boolean,
    passThrough: Boolean,
    field: [String, Array]
  } as any,
  setup(props, { slots }) {
    const $props = props as Record<string, any>;
    let actionProp = 'do';
    let subjectProp = 'on';

    if ($props[actionProp] === undefined) {
      actionProp = 'I';
      subjectProp = detectSubjectProp(props);
    }

    if (!$props[actionProp]) {
      throw new Error('Neither `I` nor `do` prop was passed in <Can>');
    }

    if (!slots.default) {
      throw new Error('Expects to receive default slot');
    }

    const ability = useAbility<VueAbility>();

    return () => {
      const isAllowed = ability.can($props[actionProp], $props[subjectProp], $props.field);
      const canRender = props.not ? !isAllowed : isAllowed;

      if (!props.passThrough) {
        return canRender ? slots.default!() : null;
      }

      return slots.default!({
        allowed: canRender,
        ability,
      });
    };
  }
});
