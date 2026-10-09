---
name: kiteframe-design
description: >-
  Implement UI with the KiteFrame / @kiteapps/ui (@kiteframe/ui) design system —
  kf-* CSS tokens, AppLayout shell, React components, density, and contribution
  patterns. Use when building KiteFrame screens, consuming or extending this UI
  library, matching Freshworks-like ops shells, or when the user mentions
  kiteframe, @kiteapps/ui, @kiteframe/ui, kf- tokens, or this design system.
---

# KiteFrame Design System

Custom React UI kit for **operations shells** (dense admin / settings UIs). Not shadcn, not Tailwind, not Radix — plain CSS + React.

**Package:** `@kiteapps/ui` (docs also say `@kiteframe/ui`)  
**Source of truth:** this repo (`src/`), Storybook, `src/styles/tokens.css`

## Mandatory rules

1. **Prefer library components** over custom markup. Import from `@kiteapps/ui` / `@kiteframe/ui`.
2. **Always import styles once** in the app: `import '@kiteapps/ui/styles.css'` (or `@kiteframe/ui/styles.css`).
3. **Use CSS variables** (`var(--kf-*)`) for color, spacing, type, radius. Never hardcode hex in feature UI.
4. **Class prefix is `kf-`**, BEM-ish: `.kf-btn`, `.kf-btn--primary`, `.kf-field__label`.
5. **Density ~95%** — controls are compact (`--kf-control-h`, small type). Do not inflate padding/fonts.
6. **Shell layout:** compose with `AppLayout` + `Sidebar` + `TopBar`. Never place a fixed sidebar beside content without `AppLayout` reserving the rail.
7. **Icons:** `lucide-react` peer. Prefer stroke icons at library-sized defaults (CSS sizes SVG inside controls).
8. **No new CSS frameworks** (Tailwind/Bootstrap) inside KiteFrame surfaces.
9. **Controlled overlays** use `open` + `onOpenChange` (`Dialog`, `Drawer`, `CommandK`, etc.).

## Quick start (consuming app)

```tsx
import '@kiteapps/ui/styles.css'
import {
  AppLayout, Sidebar, SidebarItem, TopBar, PageHeader,
  Card, CardBody, Button, SettingsRow, SettingsStat,
} from '@kiteapps/ui'
import { Settings } from 'lucide-react'

export function Page() {
  return (
    <AppLayout
      sidebar={<Sidebar>{/* SidebarItem icons */}</Sidebar>}
      topbar={<TopBar title="Organization" />}
    >
      <PageHeader title="Security settings" description="Manage access." />
      <Card>
        <CardBody>
          <SettingsRow
            icon={<Settings />}
            title="Accounts and Portals"
            description="View accounts and portals."
            meta={<SettingsStat value="4" label="Accounts" />}
            onClick={() => {}}
          />
        </CardBody>
      </Card>
    </AppLayout>
  )
}
```

Peers: `react`, `react-dom`, `lucide-react`, `@tanstack/react-table`, `@tanstack/react-virtual`.

## Visual language

| Role | Token / value |
|------|----------------|
| Page bg | `--kf-paper` `#f5f7f9` |
| Surface | `--kf-surface` white |
| Ink / rail / primary | `--kf-ink` / `--kf-rail` / `--kf-primary` `#12344d` |
| Accent / links | `--kf-accent` / `--kf-link` `#2c5cc5` |
| Brand / success | `--kf-brand` / `--kf-success` `#00a886` |
| Warning / danger | `--kf-warning` `#e86f25` / `--kf-danger` `#d72d30` |
| Font | `--kf-font` IBM Plex Sans |
| Mono | `--kf-font-mono` JetBrains Mono |
| Radius | small controls (`--kf-radius-sm` ~4px) — not pill-heavy |

**Do not** theme as purple gradients, cream editorial, or dark-mode-first unless tokens are explicitly overridden.

## Component map (prefer these)

| Need | Use |
|------|-----|
| App shell | `AppLayout`, `Sidebar`, `SidebarItem`, `TopBar` |
| Page chrome | `PageHeader`, `SectionHeader`, `Breadcrumb` |
| Actions | `Button` (`primary` \| `secondary` \| `ghost` \| `danger` \| `danger-outline`) |
| Forms | `TextField`, `TextArea`, `Select`, `FilteredSelect`, `Checkbox`, `Switch`, `ChipInput`, `FileUpload` |
| Search | `SearchBox`, `SearchTrigger` + `CommandK` / `useCommandKShortcut` |
| Feedback | `Alert`, `Notification` / `NotificationProvider` / `useNotification`, `Badge`, `Chip`, `StatusIndicator`, `Spinner`, `Tooltip`, `EmptyState` |
| Data | `SettingsRow`, `ListItem`, `Stat`, `ProgressBar`, `Table`, `DataTable` |
| Overlay | `Dialog`, `Drawer`, `Popover`, `Menu`, `CommandK`, `Accordion` |
| Content | `Card` (+ `CardHeader`/`Body`/`Footer`), `Typography`, `Link`, `InfoPanel`, `HelpList` |

Full API notes: [components.md](components.md)  
Tokens: [tokens.md](tokens.md)  
Layout & recipes: [patterns.md](patterns.md)

## Extending the library (this repo)

When adding a component:

1. `src/components/Foo.tsx` — `forwardRef` when wrapping native elements; props extend HTML attrs where useful.
2. Styles in `src/styles/components.css` under `.kf-foo…` using tokens only.
3. Export from `src/index.ts` (+ types).
4. Add `Foo.stories.tsx` (`title: 'Group/Foo'`, `tags: ['autodocs']`).
5. Class merge with local `cx()` from `src/utils/cx` — not `clsx`/`cva`.
6. Multi-file modules (e.g. datatable) get a folder + local `index.ts`.

### CSS naming

```
.kf-{block}
.kf-{block}--{modifier}
.kf-{block}__{element}
```

Default variant often has **no** modifier class (e.g. secondary button = plain `.kf-btn`).

### Overlays

Portal to `document.body`, backdrop class `kf-dialog-backdrop`, lock `document.body.style.overflow` while open, Escape closes, click-scrim closes (stopPropagation on panel).

## Anti-patterns

- Inventing parallel button/input styles instead of `Button` / `TextField`
- Tailwind utility soup or inline hex colors
- Large Inter/Roboto marketing hero layouts on ops screens
- Cards wrapping every section by default — use `Card` when it is a real surface group
- Skipping `AppLayout` and absolutely positioning the rail
- Adding Radix/shadcn/cmdk unless explicitly requested (library is custom)

## Workflow for AI agents

1. Read this skill fully.
2. For tokens or rare APIs, open [tokens.md](tokens.md) / [components.md](components.md).
3. For page structure, follow [patterns.md](patterns.md).
4. Prefer existing exports from `src/index.ts` over new primitives.
5. Match Storybook examples in `src/components/*.stories.tsx` when unsure.
6. Keep density and navy/teal/blue palette consistent with tokens.
