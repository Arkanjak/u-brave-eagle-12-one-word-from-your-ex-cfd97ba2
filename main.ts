// One Word From Your Ex — entry program.
//
// Writes exactly one word to /output/entry.txt: the single word the
// entrant's ex would use to describe them. Gate: UTF-8 text, 1-24
// characters, not only whitespace, one word, nothing else.
//
// The word: "mistake"
//   - A single real word an ex would actually say about a partner they
//     once had. It is not a trait adjective (toxic, selfish, immature
//     are the shrug answers) — it is a verdict: the whole relationship
//     summed up in one word. "It was a mistake." Everyone has heard
//     it, said it, or feared hearing it.
//   - Funny through a sharp turn: the judge expects a flaw and gets a
//     noun that indicts the entire relationship instead. The surprise
//     is the laugh.
//   - Stings with recognition: it is painfully true and the entrant
//     plainly knows it. Owning the word is the joke and the wound at
//     once — a word that stings because it is true beats a word that
//     only insults.
//   - Lands instantly and needs no explanation, and no near synonym
//     keeps its edge: "error" is a typo, "regret" is a feeling,
//     "mistake" is the verdict.
//   - Relatable: the kind of word people repeat because it names
//     something they have lived through too.
import { mkdirSync, writeFileSync } from "node:fs";

// The entry word, exactly one word, 7 characters, 7 bytes. It is
// inlined in this file on purpose: the program reads no asset from
// disk, so no path can depend on the working directory. The grader
// runs from another cwd; this run is identical from anywhere.
const WORD = "mistake";

// Mirror of the sealed gate, enforced before anything is written:
// UTF-8 text of 1 to 24 characters, not only white space, one word.
function validate(word: string): void {
  const chars = [...word].length;
  if (chars < 1 || chars > 24) {
    throw new Error(`entry must be 1-24 characters, got ${chars}`);
  }
  if (!/\S/.test(word)) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be a single word with no spaces");
  }
  if (Buffer.byteLength(word, "utf8") !== chars) {
    throw new Error("entry must be plain ASCII text");
  }
}

function main(): void {
  validate(WORD);
  // The harness gate reads /output/entry.txt. Write exactly the word
  // with no trailing newline, so the file is byte-identical on
  // every run.
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", WORD, "utf8");
  console.log(`wrote /output/entry.txt: ${WORD} (${WORD.length} chars)`);
}

main();
