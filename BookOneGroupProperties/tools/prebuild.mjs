import { mkdir, rm, writeFile } from "node:fs/promises";

await rm(".next", { recursive: true, force: true });
await mkdir(".next/types", { recursive: true });
await writeFile(".next/types/routes.d.ts", "", { encoding: "utf8" });
