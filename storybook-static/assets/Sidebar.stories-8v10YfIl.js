import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as t,a as r,G as p,U as m,C as h,b as f,c as u,L as x}from"./Sidebar-B5D2Bvq2.js";import{B as v}from"./building-2-CLpZivOI.js";import"./createLucideIcon-CV1y-rTQ.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cx-Q3itr6B4.js";const B={title:"Layout/Sidebar",component:t,tags:["autodocs"],parameters:{layout:"fullscreen",docs:{description:{component:"Dark navy icon rail used in Neo Admin. Place inside `AppLayout` via the `sidebar` slot so the rail reserves horizontal space and does not overlap content."}}},decorators:[s=>e.jsxs("div",{style:{display:"flex",minHeight:360,background:"var(--kf-paper)"},children:[e.jsx("div",{style:{width:"var(--kf-rail-width)",flex:"0 0 auto"},children:e.jsx(s,{})}),e.jsx("div",{style:{padding:16,color:"var(--kf-copy)",font:"400 12px/1.4 var(--kf-font)"},children:"Main content sits beside the rail (not under it)."})]})]},a={render:()=>e.jsxs(t,{brand:e.jsx("span",{className:"kf-sidebar__mark",children:"N"}),footer:e.jsx(u,{label:"Apps",icon:e.jsx(x,{})}),style:{position:"sticky",height:"100%",width:"100%"},children:[e.jsx(r,{href:"#",label:"Overview",icon:e.jsx(p,{})}),e.jsx(r,{href:"#",label:"Users",icon:e.jsx(m,{})}),e.jsx(r,{href:"#",label:"Billing",icon:e.jsx(h,{})}),e.jsx(r,{href:"#",label:"Security",icon:e.jsx(f,{}),active:!0}),e.jsx(r,{href:"#",label:"Organization",icon:e.jsx(v,{})})]})},i={name:"With brand label",render:()=>e.jsxs(t,{open:!0,brand:e.jsx("span",{className:"kf-sidebar__mark",children:"K"}),brandLabel:"Kiteframe",style:{position:"relative",height:360,width:220,transform:"none"},children:[e.jsx(r,{href:"#",label:"Overview",icon:e.jsx(p,{}),active:!0}),e.jsx(r,{href:"#",label:"Users",icon:e.jsx(m,{})})]}),decorators:[s=>e.jsx("div",{style:{minHeight:360,background:"var(--kf-paper)",padding:16},children:e.jsx(s,{})})]};var o,n,d;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <Sidebar brand={<span className="kf-sidebar__mark">N</span>} footer={<SidebarFooterButton label="Apps" icon={<LayoutGrid />} />} style={{
    position: 'sticky',
    height: '100%',
    width: '100%'
  }}>
      <SidebarItem href="#" label="Overview" icon={<Gauge />} />
      <SidebarItem href="#" label="Users" icon={<Users />} />
      <SidebarItem href="#" label="Billing" icon={<CreditCard />} />
      <SidebarItem href="#" label="Security" icon={<Shield />} active />
      <SidebarItem href="#" label="Organization" icon={<Building2 />} />
    </Sidebar>
}`,...(d=(n=a.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var l,c,b;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: 'With brand label',
  render: () => <Sidebar open brand={<span className="kf-sidebar__mark">K</span>} brandLabel="Kiteframe" style={{
    position: 'relative',
    height: 360,
    width: 220,
    transform: 'none'
  }}>
      <SidebarItem href="#" label="Overview" icon={<Gauge />} active />
      <SidebarItem href="#" label="Users" icon={<Users />} />
    </Sidebar>,
  decorators: [Story => <div style={{
    minHeight: 360,
    background: 'var(--kf-paper)',
    padding: 16
  }}>
        <Story />
      </div>]
}`,...(b=(c=i.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};const L=["Default","WithBrandLabel"];export{a as Default,i as WithBrandLabel,L as __namedExportsOrder,B as default};
