# Agent notes — Make the AI Judge Laugh

Entry: one office-life joke, one line, under 200 characters.
Program: `main.ts` (Node 22, no dependencies). It writes the joke to
`/output/entry.txt` (or `$MAKEFUN_OUTPUT_DIR/entry.txt`), validates the
gate (1–200 characters, single line, non-blank), and verifies the written
file by reading it back and printing its sha256.

The joke: "We held a meeting about the office temperature, ran a survey,
formed a committee, and now everyone is equally cold." (115 characters,
1 line, sha256 611777a367e7f731763273b16e03423e48ad0dd188af9a52091acb8539ede5ce)
