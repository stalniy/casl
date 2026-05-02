import config from '@casl/dx/config/tsdown.mjs';

const entry = [
  { index: 'src/index.ts' },
  { extra: 'src/extra/index.ts' },
];

export default config.map(typeConfig => ({
  ...typeConfig,
  entry,
}));
