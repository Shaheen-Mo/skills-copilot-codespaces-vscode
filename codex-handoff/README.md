# ChaChaCha Ops Codex Handoff Folder

This folder is a copy/paste-ready handoff package for continuing the ChaChaCha Ops MVP in Codex or another coding agent.

## What to paste first

Paste the contents of [`COPY_THIS_TO_CODEX.md`](./COPY_THIS_TO_CODEX.md) into Codex as the starting instruction.

## What is included

| File | Purpose |
| --- | --- |
| `COPY_THIS_TO_CODEX.md` | Single prompt to paste into Codex to continue the project correctly. |
| `PROJECT_BRIEF.md` | Business context, modules, MVP goals, and non-negotiable rules. |
| `IMPLEMENTATION_PLAN.md` | Practical phase-by-phase plan to turn the scaffold into a proper app. |
| `DATABASE_BLUEPRINT.md` | Supabase/Postgres schema, RLS, and RPC checklist. |
| `APP_STRUCTURE.md` | Current file/folder map and where each concern belongs. |
| `ACCEPTANCE_CHECKLIST.md` | Definition of done for the proper MVP. |

## PDF option

A generated PDF is included at:

```txt
codex-handoff/chachacha-ops-codex-handoff.pdf
```

If it needs to be regenerated after edits, run:

```bash
python scripts/build_handoff_pdf.py
```
