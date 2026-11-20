# Git Rules

`main` is protected. Do not commit or push directly to it. Always work on a branch and open a pull request.

## Branch naming

Use this format:

```
github-username/type/short-description
```

Examples:

- `ardituran/feat/member-reservation-scenarios`
- `ardituran/fix/date-picker-flicker`
- `ardituran/docs/setup-guide`

Branch types:

| Type | When to use |
| --- | --- |
| `feat` | A new feature, scenario, or test area |
| `fix` | A bug fix |
| `docs` | Documentation only |
| `test` | Adding or changing test cases |
| `refactor` | Cleanup without changing behavior |
| `chore` | Dependencies, tooling, housekeeping |
| `ci` | GitHub Actions and workflow changes |
| `revert` | Undoing a previous commit |

Keep the description short, lowercase, and use dashes instead of spaces. No ticket number needed here, because this repository is a personal portfolio.

## Commit message

Start with the same type as the branch, then a short summary in the imperative form:

```
docs: add setup guide for manual QA
feat: add date boundary scenarios for reservation
fix: wait for date picker before reading the value
```

Add a body when the change needs context. Explain why, not only what.

## Before opening a pull request

```bash
npm run format
npm run lint
npm test
```

Make sure the tests pass locally before asking for a review. If a scenario is still failing, say so in the pull request description instead of merging quietly.

## After the pull request is merged

Delete the branch, so the branch list stays short and only shows work in progress.
