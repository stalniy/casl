import { FunctionalComponentOptions, VNode } from 'vue';
import { SubjectType, Generics, AnyAbility, Abilities, IfString, AbilityTuple } from '@casl/ability';
import { VueAbility } from '../types';

type AbilityCanProps<
  T extends Abilities,
  Else = IfString<T, { do: T } | { I: T }>
> = T extends AbilityTuple
  ? { do: T[0], on: T[1], field?: string } |
  { I: T[0], a: Extract<T[1], SubjectType>, field?: string } |
  { I: T[0], an: Extract<T[1], SubjectType>, field?: string } |
  { I: T[0], this: Exclude<T[1], SubjectType>, field?: string }
  : Else;

export type AllCanProps<T extends AnyAbility> = AbilityCanProps<Generics<T>['abilities']> & {
  not?: boolean,
  passThrough?: boolean
};

const Can: FunctionalComponentOptions<AllCanProps<VueAbility>> = {
  name: 'Can',
  functional: true,
  props: {
    I: String,
    do: String,
    a: [String, Function],
    an: [String, Function],
    this: [String, Function, Object],
    on: [String, Function, Object],
    not: Boolean,
    passThrough: Boolean,
    field: String
  },
  render(h, { props, children, parent, data }): VNode | VNode[] {
    const mixed = props as any;
    const [action, field] = (mixed.I || mixed.do || '').split(' ');
    const subject = mixed.of || mixed.an || mixed.a || mixed.this || mixed.on;

    if (!action) {
      throw new Error('[Vue Can]: neither `I` nor `do` prop was passed in <Can>');
    }

    const isAllowed = parent.$can(action, subject, field);
    const canRender = props.not ? !isAllowed : isAllowed;

    if (!props.passThrough) {
      return canRender ? children : (null as unknown as VNode);
    }

    if (!data.scopedSlots || !data.scopedSlots.default) {
      throw new Error('[Vue Can]: `passThrough` expects default scoped slot to be specified');
    }

    return data.scopedSlots.default({
      allowed: canRender,
      ability: parent.$ability,
    }) as unknown as VNode[];
  }
};

export default Can;
