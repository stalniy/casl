import config from '@casl/dx/config/tsdown.mjs';
import { gzipSync } from 'node:zlib';

const entry = [
  { index: 'src/index.ts' },
  { extra: 'src/extra/index.ts' },
];

export default [
  ...config.map(typeConfig => ({
    ...typeConfig,
    entry,
  })),
  {
    ...config[0],
    name: 'size',
    entry: { index: 'src/index.ts' },
    // Measure all core exports and runtime dependencies without writing an artifact.
    write: false,
    minify: true,
    treeshake: true,
    sourcemap: false,
    report: false,
    deps: {
      alwaysBundle: [/.*/],
      onlyBundle: false,
      onlyImport: [],
    },
    outputOptions: { codeSplitting: false },
    plugins: [{
      name: 'report-min-gzip-size',
      generateBundle(options, bundle) {
        const core = Object.values(bundle).find(output => output.type === 'chunk' && output.isEntry);
        const size = gzipSync(core.code, { level: 9 }).byteLength;
        console.log(`CASL_MIN_GZIP_SIZE=${size}`);
      },
    }],
  },
];
