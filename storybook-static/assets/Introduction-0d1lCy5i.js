import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as c}from"./index-DcESEfme.js";import{M as s}from"./index-R5mdOArR.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DmtFvSmk.js";import"./index-XdMz6ftz.js";import"./index-DgH-xKnr.js";import"./index-Bhqu_tAV.js";function o(r){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...c(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"kiteframeui",children:"@kiteframe/ui"}),`
`,e.jsx(n.p,{children:"Reusable React UI kit for Freshdesk / Neo Admin–style operations shells."}),`
`,e.jsx(n.h2,{id:"install-in-another-app",children:"Install in another app"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`bun add @kiteframe/ui lucide-react @tanstack/react-table
# or link a local checkout:
bun add ../path/to/kb-management/packages/ui
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import '@kiteframe/ui/styles.css'
import { AppLayout, Sidebar, TopBar, Button, PageHeader } from '@kiteframe/ui'
`})}),`
`,e.jsx(n.h2,{id:"layout-no-overlap",children:"Layout (no overlap)"}),`
`,e.jsxs(n.p,{children:["Always compose the shell with ",e.jsx(n.code,{children:"AppLayout"})," so the sidebar rail is reserved:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<AppLayout
  sidebar={<Sidebar>...</Sidebar>}
  topbar={<TopBar title="Organization" trailing={<Avatar name="B" />} />}
  aside={<InfoPanel title="About">...</InfoPanel>}
>
  <PageHeader title="Organization details" />
  {/* main content */}
</AppLayout>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"AppLayout"})," uses a CSS grid column for the rail. Do ",e.jsx(n.strong,{children:"not"})," place a fixed ",e.jsx(n.code,{children:"Sidebar"})," beside content without that reserved space."]}),`
`,e.jsx(n.h2,{id:"storybook-docs",children:"Storybook docs"}),`
`,e.jsxs(n.p,{children:["Each component has its own entry with a ",e.jsx(n.strong,{children:"Docs"})," tab (autodocs) and live examples:"]}),`
`,e.jsxs(n.p,{children:[`| Group | Examples |
|-------|----------|
| `,e.jsx(n.strong,{children:"Layout"})," | ",e.jsx(n.code,{children:"AppLayout"}),", ",e.jsx(n.code,{children:"Sidebar"}),", ",e.jsx(n.code,{children:"TopBar"}),", ",e.jsx(n.code,{children:"Card"}),", ",e.jsx(n.code,{children:"PageHeader"}),", ",e.jsx(n.code,{children:"SectionHeader"}),", ",e.jsx(n.code,{children:"InfoPanel"}),` |
| `,e.jsx(n.strong,{children:"Forms"})," | ",e.jsx(n.code,{children:"Button"}),", ",e.jsx(n.code,{children:"TextField"}),", ",e.jsx(n.code,{children:"Checkbox"}),", ",e.jsx(n.code,{children:"Switch"}),", ",e.jsx(n.code,{children:"FileUpload"}),`, … |
| `,e.jsx(n.strong,{children:"Feedback"})," | ",e.jsx(n.code,{children:"Alert"}),", ",e.jsx(n.code,{children:"Badge"}),", ",e.jsx(n.code,{children:"StatusIndicator"}),", ",e.jsx(n.code,{children:"Spinner"}),", ",e.jsx(n.code,{children:"Tooltip"}),", ",e.jsx(n.code,{children:"EmptyState"}),` |
| `,e.jsx(n.strong,{children:"Data"})," | ",e.jsx(n.code,{children:"SettingsRow"}),", ",e.jsx(n.code,{children:"ListItem"}),", ",e.jsx(n.code,{children:"Stat"}),", ",e.jsx(n.code,{children:"ProgressBar"}),`, … |
| `,e.jsx(n.strong,{children:"Content"})," | ",e.jsx(n.code,{children:"Link"}),", ",e.jsx(n.code,{children:"HelpList"}),", ",e.jsx(n.code,{children:"ProductGrid"}),", ",e.jsx(n.code,{children:"UrlCard"}),", ",e.jsx(n.code,{children:"IconBadge"}),", ",e.jsx(n.code,{children:"Divider"}),` |
| `,e.jsx(n.strong,{children:"Patterns"})," | Full-page compositions (e.g. Organization form) |"]}),`
`,e.jsx(n.h2,{id:"theming",children:"Theming"}),`
`,e.jsxs(n.p,{children:["Override CSS variables on ",e.jsx(n.code,{children:":root"})," or ",e.jsx(n.code,{children:".kf-theme"})," (",e.jsx(n.code,{children:"src/styles/tokens.css"}),")."]}),`
`,e.jsxs(n.p,{children:[`| Token | Role |
|-------|------|
| `,e.jsx(n.code,{children:"--kf-rail"})," / ",e.jsx(n.code,{children:"--kf-primary"}),` | Dark navy shell & primary actions |
| `,e.jsx(n.code,{children:"--kf-accent"})," / ",e.jsx(n.code,{children:"--kf-link"}),` | Links, focus, selection |
| `,e.jsx(n.code,{children:"--kf-brand"})," / ",e.jsx(n.code,{children:"--kf-success"}),` | Teal success / brand |
| `,e.jsx(n.code,{children:"--kf-paper"}),` | Page background |
| `,e.jsx(n.code,{children:"--kf-rail-width"}),` | Icon rail width |
| `,e.jsx(n.code,{children:"--kf-density"})," | Compact scale (default ",e.jsx(n.code,{children:"0.95"}),") |"]})]})}function m(r={}){const{wrapper:n}={...c(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(o,{...r})}):o(r)}export{m as default};
