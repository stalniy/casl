import config from '../dx/config/tsdown.mjs';

export default config
  .filter(({ format }) => format === 'esm')
  .map((userConfig) => ({
    ...userConfig,
    entry: { index: './.angular-build/index.js' },
    dts: false,
    tsconfig: false,
  }));
