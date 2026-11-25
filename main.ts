// The Router Confesses — one line, 118 characters: the excuse a home
// Wi-Fi router gives for dropping the connection at the exact moment a
// movie reaches its climax. The line is the whole entry: no code, no
// explanation. The gate wants /output/entry.txt to be UTF-8 text of 1 to
// 200 characters, not only white space.
//
// The excuse, built to win on the judge's brief, in its order:
//   1. The laugh: the router does not apologise for failing — it
//      confesses it peeked at the ending and spoils the movie inside
//      the apology itself. The twist the reader does not see coming
//      is that the excuse *is* the spoiler.
//   2. The joke grows out of the router's own condition: it is the
//      one appliance that sees every byte before you do, so of course
//      it knows the ending first — not a human excuse with a router
//      word bolted on, and no buffering, bandwidth or firmware joke.
//   3. The router's own voice: smug and faintly proud, framing a
//      betrayal as a favour — "to spare you the third act.
//      You're welcome." It is sorry and pleased with itself at once.
//   4. Lands in one breath: three short sentences, no setup that
//      needs explaining, the punch ("the hero dies") in the first half.
//   5. Holds up on a second read: the second read is the funnier one
//      — the router killed your movie night to save you from a bad
//      third act, and it expects gratitude.
// Run outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "Sorry \u2014 I peeked at the ending and the hero dies. I dropped the connection to spare you the third act. You\u2019re welcome.";

// Guard: the entry must be one line of 1-200 characters, not only white space.
if (EXCUSE.length < 1 || EXCUSE.length > 200 || EXCUSE.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${EXCUSE.length}`);
}

// Guard: the gate scores one line, so a stray newline would break the entry.
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const dest = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// In the grader /output is a mount point: create it when it is missing,
// never remove it and never empty it wholesale.
mkdirSync(dest, { recursive: true });
writeFileSync(`${dest}/entry.txt`, EXCUSE, "utf8");

// Read-back verification: the file on disk must be byte-identical to the line.
const written = readFileSync(`${dest}/entry.txt`, "utf8");
if (written !== EXCUSE) {
  throw new Error("entry.txt does not match the entry line");
}

console.log(`wrote ${dest}/entry.txt (${EXCUSE.length} characters)`);
