import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{S as i,a as n,b as p,K as x}from"./SettingsRow-CA7Debfe.js";import{S as t}from"./StatusIndicator-NNbh-weS.js";import{C as j,c as w}from"./Card-DTG3FaJ7.js";import"./createLucideIcon-CV1y-rTQ.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cx-Q3itr6B4.js";import"./chevron-right-D7hZ4zpT.js";import"./x-g_5yEgv9.js";const C={title:"Data/SettingsRow",component:i,tags:["autodocs"],decorators:[b=>s.jsx(j,{children:s.jsx(w,{children:s.jsx(b,{})})})]},e={args:{icon:s.jsx(p,{}),title:"Accounts and Portals",description:"This section lets you view the list of accounts and portals in your organization.",meta:s.jsxs(s.Fragment,{children:[s.jsx(n,{value:"4",label:"Accounts"}),s.jsx(n,{value:"11",label:"Portals"})]})}},o={args:{icon:s.jsx(x,{}),title:"Default Login Methods",description:"Configure how users sign in to Freshworks products.",meta:s.jsxs(s.Fragment,{children:[s.jsx(t,{tone:"success",icon:"check",label:"Freshworks Login"}),s.jsx(t,{tone:"success",icon:"check",label:"Google Login"}),s.jsx(t,{tone:"danger",icon:"cross",label:"SSO Login"}),s.jsx(t,{tone:"danger",icon:"cross",label:"Passwordless"})]})}},a={render:()=>s.jsxs(s.Fragment,{children:[s.jsx(i,{icon:s.jsx(p,{}),title:"Accounts and Portals",description:"View and manage accounts and portals in your organization.",meta:s.jsxs(s.Fragment,{children:[s.jsx(n,{value:"4",label:"Accounts"}),s.jsx(n,{value:"11",label:"Portals"})]})}),s.jsx(i,{icon:s.jsx(x,{}),title:"Default Login Methods",description:"Choose which login methods are available by default.",meta:s.jsxs(s.Fragment,{children:[s.jsx(t,{tone:"success",icon:"check",label:"Freshworks Login"}),s.jsx(t,{tone:"success",icon:"check",label:"Google Login"}),s.jsx(t,{tone:"danger",icon:"cross",label:"SSO Login"})]})})]})};var r,c,l;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    icon: <Settings />,
    title: 'Accounts and Portals',
    description: 'This section lets you view the list of accounts and portals in your organization.',
    meta: <>
        <SettingsStat value="4" label="Accounts" />
        <SettingsStat value="11" label="Portals" />
      </>
  }
}`,...(l=(c=e.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var d,u,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    icon: <KeyRound />,
    title: 'Default Login Methods',
    description: 'Configure how users sign in to Freshworks products.',
    meta: <>
        <StatusIndicator tone="success" icon="check" label="Freshworks Login" />
        <StatusIndicator tone="success" icon="check" label="Google Login" />
        <StatusIndicator tone="danger" icon="cross" label="SSO Login" />
        <StatusIndicator tone="danger" icon="cross" label="Passwordless" />
      </>
  }
}`,...(g=(u=o.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var m,S,h;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <>
      <SettingsRow icon={<Settings />} title="Accounts and Portals" description="View and manage accounts and portals in your organization." meta={<>
            <SettingsStat value="4" label="Accounts" />
            <SettingsStat value="11" label="Portals" />
          </>} />
      <SettingsRow icon={<KeyRound />} title="Default Login Methods" description="Choose which login methods are available by default." meta={<>
            <StatusIndicator tone="success" icon="check" label="Freshworks Login" />
            <StatusIndicator tone="success" icon="check" label="Google Login" />
            <StatusIndicator tone="danger" icon="cross" label="SSO Login" />
          </>} />
    </>
}`,...(h=(S=a.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const D=["WithStats","WithStatusList","SecuritySettingsList"];export{a as SecuritySettingsList,e as WithStats,o as WithStatusList,D as __namedExportsOrder,C as default};
