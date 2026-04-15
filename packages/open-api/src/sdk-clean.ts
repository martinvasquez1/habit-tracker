import "dotenv/config";

import * as fs from 'fs';

const target = './sdk';

if (!target) {
  console.error("No target for SDK clean");
  process.exit(1);
}

fs.rmSync(target, { recursive: true, force: true });

console.log(`Cleaned SDK output directory: ${target}`);