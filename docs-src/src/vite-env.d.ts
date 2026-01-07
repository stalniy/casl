/// <reference types="vite/client" />

declare module '*.yml' {
  const content: Record<string, unknown>;
  export default content;
}

declare module '*.yaml' {
  const content: Record<string, unknown>;
  export default content;
}

declare module '*.i18n' {
  export const pages: Record<string, { default: string }>;
}

declare module '*.pages' {
  export const pages: Record<string, Record<string, string>>;
  export const summaries: Record<string, string>;
  export const searchIndexes: Record<string, string>;
}

interface ImportMetaEnv {
  readonly SUPPORTED_LANGS: string[];
  readonly BASE_URL_PATH: string;
  readonly REPO_URL?: string;
  readonly CASL_VERSION?: string;
  readonly COMMIT_HASH?: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
