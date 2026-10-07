import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as O}from"./cx-Q3itr6B4.js";import{S as I,a as t,G as N,U as _,C as F,b as T,c as R,L as U}from"./Sidebar-B5D2Bvq2.js";import{T as c}from"./TopBar-BDnJNQK1.js";import{A as d}from"./Avatar-BccPdtej.js";import{P as p}from"./PageHeader-CA99CMZr.js";import{S as M}from"./SectionHeader-S3AlxOO2.js";import{C as L,c as C}from"./Card-DTG3FaJ7.js";import{S as u,a as m,b as W,K as G}from"./SettingsRow-CA7Debfe.js";import{S as s}from"./StatusIndicator-NNbh-weS.js";import{I as q,H as V,a as g}from"./HelpList-COZLtqGB.js";import{T as K}from"./TextField-GAp5X81v.js";import{B as h}from"./Button-CHwF8LUD.js";import{B as D}from"./building-2-CLpZivOI.js";import"./createLucideIcon-CV1y-rTQ.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Link-CAT2-2OB.js";import"./circle-help-DyezTehc.js";import"./chevron-right-D7hZ4zpT.js";import"./x-g_5yEgv9.js";function i({sidebar:a,topbar:z,aside:l,className:B,children:H,...P}){return e.jsxs("div",{className:O("kf-layout",a?"kf-layout--with-sidebar":"kf-layout--no-sidebar",l?"kf-layout--with-aside":void 0,B),...P,children:[a?e.jsx("div",{className:"kf-layout__rail",children:a}):null,e.jsxs("div",{className:"kf-layout__main",children:[z,e.jsxs("div",{className:"kf-layout__body",children:[e.jsx("main",{className:"kf-layout__content",children:H}),l?e.jsx("aside",{className:"kf-layout__aside",children:l}):null]})]})]})}i.__docgenInfo={description:`Shell layout: icon rail + top bar + main work surface + optional right panel.
Compose with Sidebar, TopBar, Card, etc.`,methods:[],displayName:"AppLayout",props:{sidebar:{required:!1,tsType:{name:"ReactNode"},description:""},topbar:{required:!1,tsType:{name:"ReactNode"},description:""},aside:{required:!1,tsType:{name:"ReactNode"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};const ge={title:"Layout/AppLayout",component:i,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"Application shell that reserves a left rail for `Sidebar`, a sticky `TopBar`, main content, and an optional right `aside` panel. The rail column prevents the sidebar from overlapping the toolbar or page content."}}}};function A({active:a="security"}){return e.jsxs(I,{brand:e.jsx("span",{className:"kf-sidebar__mark",children:"N"}),footer:e.jsx(R,{label:"Apps",icon:e.jsx(U,{})}),children:[e.jsx(t,{href:"#",label:"Overview",icon:e.jsx(N,{}),active:a==="overview"}),e.jsx(t,{href:"#",label:"Users",icon:e.jsx(_,{}),active:a==="users"}),e.jsx(t,{href:"#",label:"Billing",icon:e.jsx(F,{}),active:a==="billing"}),e.jsx(t,{href:"#",label:"Security",icon:e.jsx(T,{}),active:a==="security"}),e.jsx(t,{href:"#",label:"Organization",icon:e.jsx(D,{}),active:a==="org"})]})}const r={name:"Security settings page",render:()=>e.jsx(i,{sidebar:e.jsx(A,{}),topbar:e.jsx(c,{title:"Security",trailing:e.jsx(d,{name:"Freshworks"})}),children:e.jsx(L,{children:e.jsxs(C,{children:[e.jsx(p,{title:"Security Settings",helpHref:"#",description:"Manage sign-in methods, accounts, portals, and related security policies for your organization."}),e.jsx(M,{title:"Signing in to Freshworks",description:"Choose default login methods and view accounts linked to this organization."}),e.jsx(u,{icon:e.jsx(W,{}),title:"Accounts and Portals",description:"View the list of accounts and portals in your organization.",meta:e.jsxs(e.Fragment,{children:[e.jsx(m,{value:"4",label:"Accounts"}),e.jsx(m,{value:"11",label:"Portals"})]})}),e.jsx(u,{icon:e.jsx(G,{}),title:"Default Login Methods",description:"Configure how users authenticate across Freshworks products.",meta:e.jsxs(e.Fragment,{children:[e.jsx(s,{tone:"success",icon:"check",label:"Freshworks Login"}),e.jsx(s,{tone:"success",icon:"check",label:"Google Login"}),e.jsx(s,{tone:"danger",icon:"cross",label:"SSO Login"}),e.jsx(s,{tone:"danger",icon:"cross",label:"Passwordless"})]})})]})})})},o={name:"With aside panel",render:()=>e.jsxs(i,{sidebar:e.jsx(A,{active:"org"}),topbar:e.jsx(c,{title:"Organization",trailing:e.jsx(d,{name:"Blake"})}),aside:e.jsxs(q,{title:"About Organization",children:[e.jsx("p",{children:"Organizations let you manage multiple Freshworks accounts from one place."}),e.jsxs("ul",{children:[e.jsx("li",{children:"Share security policies across accounts"}),e.jsx("li",{children:"Centralize billing and user access"})]}),e.jsxs(V,{title:"Help articles",children:[e.jsx(g,{href:"#",children:"What is an organization?"}),e.jsx(g,{href:"#",children:"Manage organization admins"})]})]}),children:[e.jsx(p,{title:"Organization details",description:"Update your organization name, branding, and URL."}),e.jsx(L,{children:e.jsxs(C,{style:{display:"grid",gap:16},children:[e.jsx(K,{label:"Organization name *",defaultValue:"Acme Corp"}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx(h,{variant:"primary",children:"Save"}),e.jsx(h,{variant:"ghost",children:"Cancel"})]})]})})]})},n={name:"Main only (no sidebar)",render:()=>e.jsx(i,{topbar:e.jsx(c,{title:"Standalone view",trailing:e.jsx(d,{name:"User"})}),children:e.jsx(p,{title:"Content without a rail",description:"Useful for auth or focused workflows."})})};var f,y,x;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  name: 'Security settings page',
  render: () => <AppLayout sidebar={<NeoSidebar />} topbar={<TopBar title="Security" trailing={<Avatar name="Freshworks" />} />}>
      <Card>
        <CardBody>
          <PageHeader title="Security Settings" helpHref="#" description="Manage sign-in methods, accounts, portals, and related security policies for your organization." />
          <SectionHeader title="Signing in to Freshworks" description="Choose default login methods and view accounts linked to this organization." />
          <SettingsRow icon={<Settings />} title="Accounts and Portals" description="View the list of accounts and portals in your organization." meta={<>
                <SettingsStat value="4" label="Accounts" />
                <SettingsStat value="11" label="Portals" />
              </>} />
          <SettingsRow icon={<KeyRound />} title="Default Login Methods" description="Configure how users authenticate across Freshworks products." meta={<>
                <StatusIndicator tone="success" icon="check" label="Freshworks Login" />
                <StatusIndicator tone="success" icon="check" label="Google Login" />
                <StatusIndicator tone="danger" icon="cross" label="SSO Login" />
                <StatusIndicator tone="danger" icon="cross" label="Passwordless" />
              </>} />
        </CardBody>
      </Card>
    </AppLayout>
}`,...(x=(y=r.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var j,S,b;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  name: 'With aside panel',
  render: () => <AppLayout sidebar={<NeoSidebar active="org" />} topbar={<TopBar title="Organization" trailing={<Avatar name="Blake" />} />} aside={<InfoPanel title="About Organization">
          <p>Organizations let you manage multiple Freshworks accounts from one place.</p>
          <ul>
            <li>Share security policies across accounts</li>
            <li>Centralize billing and user access</li>
          </ul>
          <HelpList title="Help articles">
            <HelpListItem href="#">What is an organization?</HelpListItem>
            <HelpListItem href="#">Manage organization admins</HelpListItem>
          </HelpList>
        </InfoPanel>}>
      <PageHeader title="Organization details" description="Update your organization name, branding, and URL." />
      <Card>
        <CardBody style={{
        display: 'grid',
        gap: 16
      }}>
          <TextField label="Organization name *" defaultValue="Acme Corp" />
          <div style={{
          display: 'flex',
          gap: 8
        }}>
            <Button variant="primary">Save</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </CardBody>
      </Card>
    </AppLayout>
}`,...(b=(S=o.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var v,w,k;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'Main only (no sidebar)',
  render: () => <AppLayout topbar={<TopBar title="Standalone view" trailing={<Avatar name="User" />} />}>
      <PageHeader title="Content without a rail" description="Useful for auth or focused workflows." />
    </AppLayout>
}`,...(k=(w=n.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};const he=["SecuritySettingsPage","WithAsidePanel","MainOnly"];export{n as MainOnly,r as SecuritySettingsPage,o as WithAsidePanel,he as __namedExportsOrder,ge as default};
