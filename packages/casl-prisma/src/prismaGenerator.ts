import { generatorHandler } from '@prisma/generator-helper';
import path from 'path';
import fsp from 'fs/promises';
import pkg from '../package.json';

generatorHandler({
  onManifest() {
    return {
      prettyName: 'CASL Adapter',
      version: pkg.version,
      requiresGenerators: ['prisma-client-js'],
      defaultOutput: 'node_modules/.prisma/casl-adapter.ts',
    };
  },
  async onGenerate(options) {
    const outputPath = options.generator.output?.value!;
    await fsp.mkdir(path.dirname(outputPath), { recursive: true });

    const clientLibraryLib = options.generator.config.clientLib || '@prisma/client';
    const whereInputs = options.dmmf.datamodel.models.map(model => `  ${model.name}: Prisma.${model.name}WhereInput;`);
    const content = `
import { Prisma } from "${clientLibraryLib}";

export type WhereInput<T extends Prisma.ModelName> = {
  ${whereInputs.join('\n')}
}[T];
export type ModelName = Prisma.ModelName;
    `;

    await fsp.writeFile(outputPath, content);
  },
});
