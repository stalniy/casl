import terser from '@rollup/plugin-terser';
import { defineConfig } from 'tsdown';
import process from "node:process";

const sharedConfig = {
  root: process.cwd(),
  cwd: process.cwd(),
  entry: { index: 'src/index.ts' },
  target: 'es2020',
  fixedExtension: true,
  minify: false,
  treeshake: false,
  sourcemap: true,
  plugins: [
    terser({
      format: {
        beautify: true,
      },
      mangle: {
        properties: {
          regex: /^_/,
          keep_quoted: "strict",
        },
      },
    })
  ],
};

console.log('here?')

export default defineConfig([
  {
    ...sharedConfig,
    clean: false,
    dts: false,
    format: 'esm',
    outDir: 'dist/esm',
    platform: 'neutral',
    tsconfig: 'tsconfig.build.json',
  },
  {
    ...sharedConfig,
    clean: false,
    dts: false,
    format: 'cjs',
    outDir: 'dist/cjs',
    tsconfig: 'tsconfig.build.json',
  },
]);
