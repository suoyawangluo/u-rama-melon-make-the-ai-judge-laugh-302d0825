// Make the AI Judge Laugh — u-rama-melon-make-the-ai-judge-laugh-302d0825
// Writes one office-life joke, a single line under 200 characters, to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
//
// The joke: the office temperature war, settled the corporate way — a
// meeting, a survey, a committee — and the punch is that the process
// "solved" it by making everyone equally cold. True to office life
// (thermostat wars are universal), surprising last beat (equally cold),
// tight, and an angle the judge has not heard a hundred times.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

// The joke, assembled from named parts so each beat is visible.
const SETUP =
  "We held a meeting about the office temperature, ran a survey, formed a committee,";
const PUNCH = "and now everyone is equally cold.";

function buildEntry(): string {
  return `${SETUP} ${PUNCH}`;
}

type GateReport = { ok: boolean; reason: string; chars: number };

function validateEntry(text: string): GateReport {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    return { ok: false, reason: `length ${chars} outside 1-200`, chars };
  }
  if (text.trim().length === 0) {
    return { ok: false, reason: "blank", chars };
  }
  if (text.includes("\n")) {
    return { ok: false, reason: "more than one line", chars };
  }
  return { ok: true, reason: "gate passes", chars };
}

function verifyWritten(file: string): { sha256: string; text: string } {
  const text = readFileSync(file, "utf8");
  const sha256 = createHash("sha256").update(text, "utf8").digest("hex");
  return { sha256, text };
}

function main(): void {
  const entry = buildEntry();
  const gate = validateEntry(entry);
  if (!gate.ok) {
    throw new Error(`gate failed: ${gate.reason}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const file = join(outDir, "entry.txt");
  writeFileSync(file, entry, "utf8");
  const { sha256, text } = verifyWritten(file);
  console.log(
    `gate passes: ${gate.chars} characters, 1 line, sha256 ${sha256}`,
  );
  console.log(`wrote ${file}`);
  console.log(`verified: ${JSON.stringify(text)}`);
}

main();
