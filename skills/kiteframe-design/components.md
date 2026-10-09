# KiteFrame component API cheat sheet

Exports live in `src/index.ts`. Prefer reading the component file or Storybook when props are ambiguous.

## Buttons & actions

```tsx
<Button variant="primary" | "secondary" | "ghost" | "danger" | "danger-outline"
        size="sm" | "md" | "lg"
        iconOnly leftIcon={...} rightIcon={...} />
```

Default variant is **secondary**. Primary = navy fill.

## Forms

```tsx
<TextField label="Name" hint="Optional" error="Required" />
<TextArea label="Notes" />
<Select options={[{ value, label }]} />
<FilteredSelect options={...} />  // searchable
<Checkbox /> <Switch />
<ChipInput />  // tag entry
<FileUpload />
```

Field chrome: `label` / `hint` / `error` on `kf-field`. Error replaces hint.

## Shell

```tsx
<AppLayout
  sidebar={<Sidebar footer={...}><SidebarItem icon=... label=... active /></Sidebar>}
  topbar={<TopBar title="..." trailing={<Avatar name="A" />} />}
  aside={<InfoPanel title="About">...</InfoPanel>}
>
  <PageHeader title="..." description="..." actions={<Button />} />
  {children}
</AppLayout>
```

- `SidebarItem` / `SidebarFooterButton` for rail icons.
- Always use `AppLayout` so the rail column is reserved.

## Navigation & search

```tsx
<Breadcrumb items={[{ label, href? }]} />
<Tabs orientation="horizontal" | "vertical">
  <TabList><Tab value="a">A</Tab></TabList>
  <TabPanel value="a">...</TabPanel>
</Tabs>
<Pagination />
<SearchBox shortcut="⌘ K" />
<SearchTrigger onClick={() => setOpen(true)} />
<CommandK open={open} onOpenChange={setOpen} items={[{
  id, label, group?, shortcut?, icon?, keywords?, onSelect
}]} />
useCommandKShortcut(() => setOpen(v => !v))
```

## Feedback

| Component | Notes |
|-----------|--------|
| `Alert` | Inline soft banners (`tone`) |
| `Notification` | Presentational toast card |
| `NotificationViewport` | Fixed corner stack; portals to body |
| `NotificationProvider` | Queue + viewport; accepts custom `component` |
| `useNotification` | Context API (`notify`, `success`, `dismiss`, …) |
| `useNotifications` | Standalone queue hook (manual viewport) |
| `Badge` | `tone`: `neutral` \| `accent` \| `success` \| `warning` \| `danger` \| `org` |
| `Chip` / `ChipButton` | `tone` + optional `onRemove` |
| `StatusIndicator` | status dot + label |
| `Spinner` | loading |
| `Tooltip` | hover hint |
| `EmptyState` | no-data placeholder |

```tsx
// App root
<NotificationProvider placement="top-right" defaultDuration={4000} component={MyToast}>
  <App />
</NotificationProvider>

// Anywhere under provider
const { success, notify, dismiss } = useNotification()
success('Saved', { description: 'Preferences updated.' })
notify({ tone: 'info', title: '…', component: SpecialToast }) // per-item UI

// Custom display receives NotificationRenderProps
function MyToast({ tone, title, description, onDismiss }: NotificationRenderProps) {
  return (/* your markup */)
}
```

Use `Alert` for persistent in-page banners; notifications for ephemeral toasts.

## Data display

```tsx
<SettingsRow icon title description meta={<SettingsStat value label />} onClick />
<ListItem /> <IconBadge />
<Stat /> <StatBar /> <ProgressBar tone="..." />
<Table><THead/><TBody><TR><TH/><TD/></TR></TBody></Table>
<DataTable ... />  // TanStack table + virtual peers
<UrlCard />
```

## Overlays

```tsx
<Dialog open onOpenChange title description footer size="sm"|"md"|"lg" />
<Drawer open onOpenChange side size />
<Popover trigger={...} side open? onOpenChange?>
  <PopoverItem />
</Popover>
<Menu> <MenuItem /> <IconMenuItem /> <MenuSeparator /> <MenuLabel /> </Menu>
<Accordion> <AccordionItem> <AccordionTrigger /> <AccordionPanel /> </AccordionItem> </Accordion>
```

Pattern: controlled `open` / `onOpenChange`; portal + scrim for modal layers.

## Content

```tsx
<Card>
  <CardHeader><CardTitle /></CardHeader>
  <CardBody />
  <CardFooter />
</Card>
<Typography variant="..." />
<Link />
<ProductGrid><ProductTile /></ProductGrid>
<HelpList><HelpListItem /></HelpList>
<InfoPanel title>...</InfoPanel>
<Divider />
<Avatar /> <AvatarGroup />
<Icon name=... /> / <Icons />
```

## Utilities

```tsx
import { cx } from '@kiteapps/ui'           // class merge
import { useControllableState } from '@kiteapps/ui'
```

## Icons

Peer **`lucide-react`**. Pass React nodes into `leftIcon`, `icon`, `SidebarItem`, etc. Library CSS sizes SVGs inside buttons/fields — avoid oversized custom wrappers.
