import { fetch } from './http';

export function getCurrentVersion() {
  return import.meta.env.CASL_VERSION || null;
}

export async function fetchVersions() {
  const response = await fetch('/versions.txt', { format: 'txtArrayJSON', cache: true });
  return response.body;
}

export function genCurrentUrlForVersion(version) {
  return window.location.href
    .replace(`/${getCurrentVersion()}/`, `/${version}/`);
}
