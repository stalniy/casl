export type SubjectType = Function & { modelName: string };
export type AnyObject = { [key: string]: unknown | AnyObject };
export type AbilitySubject = string | SubjectType | object;
export type GetSubjectName = (subject: AbilitySubject) => string;
