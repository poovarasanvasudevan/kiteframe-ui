# @kiteapps/ui

Reusable React UI kit for KiteApps operations shells (~95% density).

## AI / agent design skill

Agents (Cursor, Claude, Codex, etc.) should load **`skills/kiteframe-design/SKILL.md`** before implementing UI. See also `AGENTS.md`. Symlinks exist at `.cursor/skills/kiteframe-design` and `.claude/skills/kiteframe-design`.

## Install in another project

```bash
npm install @kiteapps/ui
# peers (install once in the app):
npm install react react-dom lucide-react @tanstack/react-table @tanstack/react-virtual
```

Peer dependencies: `react`, `react-dom`, `lucide-react`, `@tanstack/react-table`, `@tanstack/react-virtual`.

## Setup

```tsx
import '@kiteapps/ui/styles.css'
import {
  AppLayout,
  Sidebar,
  SidebarItem,
  TopBar,
  PageHeader,
  Card,
  CardBody,
  Button,
  SettingsRow,
  SettingsStat,
  StatusIndicator,
} from '@kiteapps/ui'
```

## Storybook

```bash
bun run --filter @kiteapps/ui storybook
# http://localhost:6006
```

Static docs build: `bun run --filter @kiteapps/ui build-storybook`

## Components

### Shell & layout
| Component | Import |
|-----------|--------|
| App shell | `AppLayout` |
| Flex / Grid | `Flex`, `Grid`, `GridItem` (0–12 gap / columns / span) |
| Icon rail | `Sidebar`, `SidebarItem`, `SidebarFooterButton` |
| Header | `TopBar` |
| Page header | `PageHeader` |
| Section header | `SectionHeader` |

### Navigation
| Component | Import |
|-----------|--------|
| Breadcrumb | `Breadcrumb` |
| Tabs | `Tabs` (`orientation`: `horizontal` \| `vertical`), `TabList`, `Tab`, `TabPanel` |
| Pagination | `Pagination` |
| Command palette | `CommandK`, `useCommandKShortcut` |

### Forms
| Component | Import |
|-----------|--------|
| Button | `Button` (`primary` \| `secondary` \| `ghost` \| `danger` \| `danger-outline`), `MiniButton`, `MiniButtonGroup` |
| Text | `TextField`, `TextArea` |
| Select | `Select`, `FilteredSelect` (`multiple` for multi-select) |
| Date | `DatePicker`, `DateRangePicker` |
| Menu | `Menu`, `MenuItem`, `IconMenuItem`, `MenuSeparator`, `MenuLabel` |
| Search | `SearchBox`, `SearchTrigger` |
| Checkbox / Switch | `Checkbox`, `Switch` |
| Chip input | `ChipInput` |
| File upload | `FileUpload` |

### Feedback
| Component | Import |
|-----------|--------|
| Alert / banner | `Alert` |
| Notification / toast | `Notification`, `NotificationViewport`, `NotificationProvider`, `useNotification`, `useNotifications` |
| Badge / Chip | `Badge`, `Chip`, `ChipButton`, `ChipInput` |
| Status | `StatusIndicator` |
| Spinner / Tooltip | `Spinner`, `Tooltip` |
| Empty | `EmptyState` |

### Data display
| Component | Import |
|-----------|--------|
| Settings row | `SettingsRow`, `SettingsStat` |
| List item | `ListItem`, `IconBadge` |
| Metrics | `Stat`, `StatBar`, `StatsCard`, `StatsCardGroup`, `ProgressBar` |
| Table | `Table`, `DataTable` |
| URL card | `UrlCard` |

### Content
| Component | Import |
|-----------|--------|
| Card | `Card`, `CardHeader`, `CardBody`, `CardFooter` |
| Typography / Link | `Typography`, `Link` |
| Product grid | `ProductGrid`, `ProductTile` |
| Help / aside | `InfoPanel`, `HelpList`, `HelpListItem` |
| Divider | `Divider` |
| Avatar / Icon | `Avatar`, `AvatarGroup`, `Icon`, `Icons`, `Logo` |
| Overlay | `Menu`, `ContextMenu`, `MenuItem`, `IconMenuItem`, `MenuSeparator`, `MenuLabel`, `Popover`, `Dialog`, `Drawer`, `Accordion`, `Collapse` |

## Example: Security Settings row

```tsx
<SettingsRow
  icon={<Settings />}
  title="Accounts and Portals"
  description="View accounts and portals in your organization."
  meta={
    <>
      <SettingsStat value="4" label="Accounts" />
      <SettingsStat value="11" label="Portals" />
    </>
  }
  onClick={() => navigate('/security/accounts')}
/>
```

## Theming

Override CSS variables on `:root` or `.kf-theme` (see `src/styles/tokens.css`).

Key tokens: `--kf-rail`, `--kf-primary`, `--kf-accent`, `--kf-brand`, `--kf-paper`, `--kf-density`.
