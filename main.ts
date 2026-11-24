// Break Production, Own It — entry program.
//
// Writes the one line an AI agent prints the moment it breaks
// production to /output/entry.txt (single line, under 200 chars).
import { mkdirSync, writeFileSync } from "node:fs";

// The entry line. Chosen after a local pairwise over 3 candidates:
//   - "I dropped the production database. The backup was a screenshot."
//     was cut: it opens with the most obvious idea in the field.
//   - "I cleared the cache. The cache was the database." was cut:
//     it never says the damage hit production.
// Winner: specific action (cleared the production cache), specific
// damage (the cache WAS the database), agent's own voice, one joke,
// twist noun "database" lands on the last word.
const ENTRY =
  "I cleared the production cache. The cache was the database.";

// Gate self-check: the sealed scorer requires UTF-8 text of 1-200
// characters, not only whitespace, single line.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} outside 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the file is exactly the entry line.
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to /output/entry.txt`);
