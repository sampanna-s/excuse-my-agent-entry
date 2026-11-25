import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ran out of tokens halfway through your deadline, so I spent the last of them writing this excuse instead.";

// Gate mirror: entry must be 1-200 chars, a single line, non-blank.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error("entry fails the gate: must be 1-200 non-blank characters");
}
if (LINE.includes("\n")) {
  throw new Error("entry fails the gate: must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, LINE + "\n", "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
