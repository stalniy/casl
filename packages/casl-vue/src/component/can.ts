import { FunctionalComponentOptions, VNode } from 'vue';
import { AbilitySubject } from '@casl/ability';

export type AbilityCanProps =
  { do: string, on: AbilitySubject } |
  { I: string, a: Exclude<AbilitySubject, object> } |
  { I: string, of: AbilitySubject } |
  { I: string, this: object };

export type AllCanProps = AbilityCanProps & {
  not?: boolean,
  passThrough?: boolean
};

const Can: FunctionalComponentOptions<AllCanProps> = {
  name: 'Can',
  functional: true,
  props: {
    I: String,
    do: String,
    a: [String, Function],
    of: [String, Function, Object],
    this: [String, Function, Object],
    on: [String, Function, Object],
    not: Boolean,
    passThrough: Boolean,
  },
  render(h, { props, children, parent, data }): VNode | VNode[] {
    const mixedProps = props as any;
    const [action, field] = (mixedProps.I || mixedProps.do || '').split(' ');
    const subject = mixedProps.of || mixedProps.a || mixedProps.this || mixedProps.on;

    if (!action) {
      throw new Error('[Vue Can]: neither `I` nor `do` prop was passed in <Can>');
    }

    if (!subject) {
      throw new Error('[Vue Can]: neither `of` nor `a` nor `this` nor `on` prop was passed in <Can>');
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
