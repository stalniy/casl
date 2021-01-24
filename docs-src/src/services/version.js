import { fetch } from './http';

export function getCurrentVersion() {
  return process.env.CASL_VERSION || null;
}

export async function fetchVersions() {
  const response = await fetch('/versions.txt', { format: 'txtArrayJSON', cache: true });
  return response.body;
}
