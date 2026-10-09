# KiteFrame tokens

Defined in `src/styles/tokens.css` on `:root, .kf-theme`. Override by setting variables on a parent (app root or `.kf-theme`).

## Density

```css
--kf-density: 0.95;
```

Most spacing, control height, radius, and font sizes multiply by density. Prefer `calc(Npx * var(--kf-density))` in new CSS.

## Color

| Token | Hex / value | Use |
|-------|-------------|-----|
| `--kf-paper` | `#f5f7f9` | Page / shell background |
| `--kf-surface` | `#ffffff` | Cards, inputs, panels |
| `--kf-surface-2` | `#eef1f6` | Hover wash, subtle fill |
| `--kf-ink` | `#12344d` | Primary text, headings |
| `--kf-copy` | `#475867` | Body / secondary text |
| `--kf-muted` | `#7b8e9f` | Hints, placeholders, meta |
| `--kf-rule` | `#ebeff3` | Dividers, light borders |
| `--kf-rule-strong` | `#cfd7df` | Control borders |
| `--kf-rail` | `#12344d` | Icon sidebar background |
| `--kf-rail-hover` | `#1a4664` | Rail item hover |
| `--kf-rail-active` | `#264966` | Rail item active |
| `--kf-brand` | `#00a886` | Brand / teal accent |
| `--kf-accent` | `#2c5cc5` | Links, focus, selection |
| `--kf-accent-dark` | `#1f4ba0` | Accent pressed |
| `--kf-accent-ink` | `#ffffff` | Text on accent/primary |
| `--kf-primary` | `#12344d` | Primary buttons |
| `--kf-primary-dark` | `#0b2336` | Primary hover |
| `--kf-success` | `#00a886` | Success |
| `--kf-warning` | `#e86f25` | Warning / org badge |
| `--kf-danger` | `#d72d30` | Destructive |
| `--kf-info` | `#2c5cc5` | Info |
| `--kf-info-soft` | `#eef3fb` | Soft info bg |
| `--kf-success-soft` | `#e6f7f3` | Soft success bg |
| `--kf-warning-soft` | `#fef3e8` | Soft warning bg |
| `--kf-danger-soft` | `#fdecec` | Soft danger bg |
| `--kf-badge-org` | `#e86f25` | Organization badge |
| `--kf-link` | `#2c5cc5` | Links |
| `--kf-scrim` | `rgb(18 52 77 / 0.34)` | Modal backdrop |

## Typography

| Token | Notes |
|-------|--------|
| `--kf-font` | `"IBM Plex Sans", "Segoe UI", system-ui, sans-serif` |
| `--kf-font-mono` | `"JetBrains Mono", ui-monospace, monospace` |
| `--kf-font-xs` | `calc(8px * density)` |
| `--kf-font-sm` | `calc(10px * density)` |
| `--kf-font-md` | `calc(11.5px * density)` — default control text |
| `--kf-font-lg` | `calc(13px * density)` |

Use `Typography` variants or `.kf-type` / `.kf-type--*` classes; do not invent large display type for ops pages.

## Space & size

| Token | Approx (at 0.95) | Use |
|-------|------------------|-----|
| `--kf-space-1` … `--kf-space-4` | 4 → 16px scaled | Gaps / padding |
| `--kf-control-h` | ~28.5px | Inputs, buttons |
| `--kf-icon-btn` | ~26.6px | Icon-only circular buttons |
| `--kf-rail-width` | ~53px | Sidebar rail |

## Radius & elevation

| Token | Use |
|-------|-----|
| `--kf-radius-sm` | Buttons, inputs (default) |
| `--kf-radius-md` | Cards, menus |
| `--kf-radius-lg` | Larger panels |
| `--kf-radius-pill` | Rare chips/pills only |
| `--kf-shadow-soft` | Light elevation |
| `--kf-shadow-dialog` | Dialogs / command palette |

## Z-index

| Token | Value |
|-------|-------|
| `--kf-z-popover` | 40 |
| `--kf-z-dialog` | 60 |

## Theming recipe

```css
.my-app.kf-theme {
  --kf-brand: #0d9488;
  --kf-density: 1; /* optional: roomier */
}
```

Keep semantic roles (ink/paper/accent/danger) intact; only recolor brand accents when product-branding.
