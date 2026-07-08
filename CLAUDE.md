# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes.

These notes work best when merged with project-specific instructions.

**Tradeoff:** These guidelines favor caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions clearly. If you are unsure, ask.
- If there is more than one valid interpretation, show it instead of choosing silently.
- If a simpler approach exists, say so.
- If something is unclear, stop and name what is confusing.

## 2. Simplicity First

**Use the minimum code that solves the problem.**

- Do not add features that were not requested.
- Do not add abstractions for single-use code.
- Do not add flexibility that was not requested.
- Do not add error handling for impossible cases.
- If the code could be much shorter, simplify it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own changes.**

When editing existing code:

- Do not improve nearby code, comments, or formatting unless needed.
- Do not refactor things that are already working.
- Match the existing style, even if you would write it differently.
- If you notice unrelated dead code, mention it instead of deleting it.

When your changes create unused code:

- Remove imports, variables, or functions that your changes made unused.
- Do not remove pre-existing dead code unless asked.

The test: every changed line should connect directly to the user's request.

## 4. Goal-Driven Execution

**Define success clearly. Verify the result.**

Turn tasks into testable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass."
- "Fix the bug" → "Write a test that reproduces it, then make it pass."
- "Refactor X" → "Make sure tests pass before and after."

For multi-step tasks, use a short plan:

```text
1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]
```

Strong success criteria help you work independently. Weak criteria like "make it work" usually need more clarification.

---

These guidelines are working if there are fewer unnecessary changes, fewer rewrites, and clarifying questions happen before mistakes.
