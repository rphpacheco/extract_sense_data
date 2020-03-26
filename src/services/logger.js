import path from 'path';
import * as fs from 'fs';

import { Console } from 'console';

const output = fs.createWriteStream(
  path.resolve(__dirname, '..', '..', 'logs', 'stdout.log')
);
const errorOutput = fs.createWriteStream(
  path.resolve(__dirname, '..', '..', 'logs', 'stderr.log')
);

export default (function logger() {
  return new Console({ stdout: output, stderr: errorOutput });
})();
