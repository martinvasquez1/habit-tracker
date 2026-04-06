import 'dotenv/config'; 
import * as fs from "fs";

const inputPath = './open-api.json';

if (!inputPath) {
  console.error("Usage: ts-node open-api-preprocessing.ts");
  process.exit(1);
}

const outputPath = inputPath.replace(".json", ".sdk.json");

const spec = JSON.parse(fs.readFileSync(inputPath, "utf8"));

for (const route in spec.paths) {
  const methods = spec.paths[route];

  for (const method in methods) {
    const operation = methods[method];

    if (operation && typeof operation === "object") {
      operation.tags = ["Api"];
    }
  }
}

fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));

console.log(`New file created: ${outputPath}`);