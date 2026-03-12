import "dotenv/config";

import { rmSync } from "fs";

const target = process.env.SDK_OUTPUT_PATH;

if (!target) {
  console.error("No target for SDK clean");
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });

console.log(`Cleaned SDK output directory: ${target}`);