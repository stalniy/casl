import config from '../dx/config/tsdown.mjs';

export default config
  .map((userConfig) => ({
    ...userConfig,
    entry: { index: './.angular-build/index.js' },
    dts: false,
    tsconfig: false,
  }));
