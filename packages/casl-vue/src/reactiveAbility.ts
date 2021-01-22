import { AnyAbility, SubjectType } from '@casl/ability';
import { ref } from 'vue';

export function reactiveAbility(ability: AnyAbility) {
  if (ability.hasOwnProperty('possibleRulesFor')) {
    return ability;
  }

  const watcher = ref(true);
  ability.on('updated', () => {
    watcher.value = !watcher.value;
  });

  const possibleRulesFor = ability.possibleRulesFor.bind(ability);
  ability.possibleRulesFor = (action: string, subject: SubjectType) => {
    watcher.value = watcher.value; // eslint-disable-line
    return possibleRulesFor(action, subject);
  };

  return ability;
}
