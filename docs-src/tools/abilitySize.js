import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export async function calculateAbilitySize() {
  const { stdout } = await execFileAsync('npm', ['run', 'build'], {
    cwd: fileURLToPath(new URL('../../packages/casl-ability/', import.meta.url)),
  });
  const match = stdout.match(/^CASL_MIN_GZIP_SIZE=(\d+)\r?$/m);
  if (!match) {
    throw new Error('The @casl/ability build did not report CASL_MIN_GZIP_SIZE');
  }
  return Number(match[1]);
}
