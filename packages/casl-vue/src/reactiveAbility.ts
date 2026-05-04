import { AnyAbility, SubjectType } from '@casl/ability';
import { ref } from 'vue';

const hasOwn: (o: object, v: PropertyKey) => boolean = Object.hasOwn ||
  ((obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop));

export function reactiveAbility(ability: AnyAbility) {
  if (hasOwn(ability, 'possibleRulesFor')) return ability;

  const watcher = ref(true);
  ability.on('updated', () => {
    watcher.value = !watcher.value;
  });

  const possibleRulesFor = ability.possibleRulesFor.bind(ability);
  ability.possibleRulesFor = (action: string, subject: SubjectType) => {
    watcher.value = watcher.value; // eslint-disable-line
    return possibleRulesFor(action, subject);
  };
  ability.can = ability.can.bind(ability);
  ability.cannot = ability.cannot.bind(ability);

  return ability;
}
