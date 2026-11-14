import config from '../config/app.js';

const CACHE_KEY = `casl:github:stars:${config.repoURL}`;
const CACHE_TTL = 24 * 60 * 60 * 1000;
const STARS_URL = `https://api.github.com/repos/${new URL(config.repoURL).pathname.replace(/^\/|\/$/g, '').replace(/\.git$/, '')}`;

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    return cached && Number.isSafeInteger(cached.stars) && cached.stars >= 0
      && Number.isFinite(cached.timestamp) ? cached : null;
  } catch {
    return null;
  }
}

async function loadStars() {
  const cached = readCache();
  const age = cached ? Date.now() - cached.timestamp : Infinity;

  if (age >= 0 && age < CACHE_TTL) {
    return cached.stars;
  }

  try {
    const response = await fetch(STARS_URL, {
      signal: typeof AbortSignal.timeout === 'function' ? AbortSignal.timeout(5000) : undefined
    });
    if (!response.ok) throw new Error('Failed to retrieve GitHub stars');

    const { stargazers_count: stars } = await response.json();
    if (!Number.isSafeInteger(stars) || stars < 0) {
      throw new Error('Invalid GitHub star count');
    }

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ stars, timestamp: Date.now() }));
    } catch {
      // Keep displaying the count when browser storage is unavailable.
    }

    return stars;
  } catch {
    return cached ? cached.stars : null;
  }
}

let starsRequest = null;
export function repositoryStars() {
  starsRequest ??= loadStars();
  return starsRequest;
}
