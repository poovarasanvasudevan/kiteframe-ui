# KiteFrame layout & UI patterns

## 1. Operations shell (default page)

```
┌────┬─────────────────────────────┬──────────┐
│Rail│ TopBar                      │          │
│    ├─────────────────────────────┤  Aside   │
│    │ PageHeader                  │ (optional│
│    │ Card / content              │  help)   │
└────┴─────────────────────────────┴──────────┘
```

Rules:
- Rail is dark navy (`--kf-rail`), icon-only.
- Main sits on `--kf-paper`; content surfaces are white `Card`s.
- Right `InfoPanel` / `HelpList` for contextual help — not marketing copy.
- One primary action in `PageHeader` actions; secondary actions ghost/secondary.

## 2. Settings list

Use stacked `SettingsRow` inside `Card` > `CardBody` (often with dividers / gap via CSS already on rows).

```tsx
<Card>
  <CardBody>
    <SettingsRow
      icon={<Shield />}
      title="Authentication"
      description="SSO and session policies."
      meta={<SettingsStat value="On" label="SSO" />}
      onClick={() => navigate('/auth')}
    />
  </CardBody>
</Card>
```

## 3. Forms

- Vertical stack of `TextField` / `Select` / `Checkbox` with consistent field labels.
- Primary submit = `Button variant="primary"`; cancel = `ghost`.
- Validation: pass `error` string to the field — do not invent red border CSS.
- Destructive confirms: `Dialog` size `sm` + `Button variant="danger"`.

## 4. Dialogs vs drawers vs command palette

| Pattern | When |
|---------|------|
| `Dialog` | Focused task, confirmations, short forms |
| `Drawer` | Wider secondary context, filters, detail side sheet |
| `CommandK` | Global jump / actions (⌘K); pair with `SearchTrigger` |

## 5. Tables

- Simple markup: `Table` primitives.
- Sort/filter/virtualize: `DataTable` + TanStack peers.
- Keep row height dense; avoid card-per-row tables.

## 6. Empty & loading

- Loading: `Spinner` inline or centered in content area.
- No results: `EmptyState` with short title + one CTA `Button`.

## 7. Status & badges

- Semantic tones only (`success` / `warning` / `danger` / `accent` / `org`).
- `StatusIndicator` for live state; `Badge` for role labels (e.g. ORGANIZATION-ADMIN).

## 8. Adding a feature screen (checklist)

- [ ] `AppLayout` + sidebar item if navigable
- [ ] `PageHeader` with title + optional description/actions
- [ ] Content in `Card` / existing data components
- [ ] Forms use library fields
- [ ] Colors/spacing via tokens only
- [ ] Icons from `lucide-react`
- [ ] Story or page matches density of existing Storybook layouts

## 9. Extending CSS

```css
.kf-my-widget {
  background: var(--kf-surface);
  color: var(--kf-ink);
  border: 1px solid var(--kf-rule);
  border-radius: var(--kf-radius-md);
  padding: var(--kf-space-3);
  font: 400 var(--kf-font-md)/1.4 var(--kf-font);
}
```

No raw hex, no `rem`-based redesign of the type scale unless updating tokens.

## 10. What this system is not

- Not a marketing landing-page kit (no full-bleed heroes).
- Not a mobile-first consumer app kit (ops desktop density first; still keep layouts responsive where needed).
- Not shadcn: do not scaffold Radix primitives unless migrating the library deliberately.
