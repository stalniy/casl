import { MongoAbility, RawRuleOf } from "../src";

export class Post {
  title!: string;
  description!: string;
  author!: string;
  authorId!: number;
  published!: boolean;

  constructor(attrs?: Record<string, any>) {
    Object.assign(this, attrs)
  }
}

const fields = ['action', 'subject', 'conditions', 'fields', 'inverted', 'reason'] as const;
export function ruleToObject(rule: RawRuleOf<MongoAbility>) {
  return fields.reduce((object, field) => {
    if (rule[field]) {
      object[field] = rule[field]
    }
    return object
  }, {} as Record<string, any>)
}
