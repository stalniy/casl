import { FunctionalComponentOptions, VNode } from 'vue';
import { IfExtends, SubjectType, Subject, AnyAbility, AbilityParameters } from '@casl/ability';
import { VueAbility } from '../types';

type AbilityCanProps<A extends string, S extends Subject> = IfExtends<
S,
'all',
{ do: A } | { I: A },
{ field?: string } & (
  { do: A, on: S } |
  { I: A, a: Extract<S, SubjectType> } |
  { I: A, an: Extract<S, SubjectType> } |
  { I: A, of: S } |
  { I: A, this: Exclude<S, SubjectType> }
)
>;

export type AllCanProps<T extends AnyAbility> = AbilityCanProps<
AbilityParameters<T>['action'],
AbilityParameters<T>['subject']
> & {
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
    of: [String, Function, Object],
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
