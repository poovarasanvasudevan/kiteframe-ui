# Agent instructions — KiteFrame UI

This repository is the **KiteFrame design system** (`@kiteapps/ui` / `@kiteframe/ui`).

## Before building or changing UI

1. Read and follow **`skills/kiteframe-design/SKILL.md`**.
2. Use progressive refs as needed:
   - `skills/kiteframe-design/tokens.md` — CSS variables / palette
   - `skills/kiteframe-design/components.md` — component map
   - `skills/kiteframe-design/patterns.md` — shell, settings, forms

## Non-negotiables

- Prefer existing exports from `src/index.ts` over custom controls.
- Style with `kf-*` classes and `--kf-*` tokens only (see `src/styles/`).
- Compose shells with `AppLayout` + `Sidebar` + `TopBar`.
- Icons via peer `lucide-react`.
- Do not introduce Tailwind, shadcn, or Radix unless explicitly requested.

## Tool discovery

| Tool | Skill path |
|------|------------|
| Cursor | `.cursor/skills/kiteframe-design` → `skills/kiteframe-design` |
| Claude Code | `.claude/skills/kiteframe-design` → `skills/kiteframe-design` |
| Other agents | Read this file + `skills/kiteframe-design/SKILL.md` |
