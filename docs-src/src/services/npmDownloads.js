const CACHE_KEY = 'casl:ability:monthly-downloads';
const CACHE_TTL = 24 * 60 * 60 * 1000;
const DOWNLOADS_URL = 'https://api.npmjs.org/downloads/point/last-month/@casl/ability';

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    return cached && Number.isSafeInteger(cached.downloads) && cached.downloads >= 0
      && Number.isFinite(cached.timestamp) ? cached : null;
  } catch {
    return null;
  }
}

async function loadDownloads() {
  const cached = readCache();
  const age = cached ? Date.now() - cached.timestamp : Infinity;

  if (age >= 0 && age < CACHE_TTL) {
    return cached.downloads;
  }

  try {
    const response = await fetch(DOWNLOADS_URL, {
      signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(5000) : undefined
    });
    if (!response.ok) throw new Error('Failed to retrieve npm downloads');

    const { downloads } = await response.json();
    if (!Number.isSafeInteger(downloads) || downloads < 0) {
      throw new Error('Invalid npm download count');
    }

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ downloads, timestamp: Date.now() }));
    } catch {
      // Keep displaying the count when browser storage is unavailable.
    }

    return downloads;
  } catch {
    return cached ? cached.downloads : null;
  }
}

let downloadsRequest = null;
export function monthlyDownloads() {
  downloadsRequest ??= loadDownloads();
  return downloadsRequest;
}
