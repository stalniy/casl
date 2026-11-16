export default {
  entry: { index: 'src/index.ts' },
  format: 'esm',
  platform: 'neutral',
  target: 'es2020',
  fixedExtension: true,
  outDir: 'dist/esm',
  clean: false,
  dts: false,
  sourcemap: true,
  tsconfig: 'tsconfig.build.json',
};
