import config from '../dx/config/tsdown.mjs';

const entry = [
  { index: 'src/index.ts' },
  { runtime: 'src/runtime.ts' },
];

export default config.map((userConfig) => ({
  ...userConfig,
  entry,
}));
