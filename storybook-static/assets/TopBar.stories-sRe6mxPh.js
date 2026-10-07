import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as l}from"./TopBar-BDnJNQK1.js";import{A as d}from"./Avatar-BccPdtej.js";import{B as t}from"./Button-CHwF8LUD.js";import{B as A}from"./Breadcrumb-DSxgvmka.js";import{r as B}from"./index-mIjS73Jk.js";import{c as b}from"./cx-Q3itr6B4.js";import{c as k}from"./createLucideIcon-CV1y-rTQ.js";import{C as T}from"./circle-help-DyezTehc.js";import"./chevron-right-D7hZ4zpT.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],w=k("bell",z);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],_=k("search",O),v=B.forwardRef(function({className:n,shortcut:a,...r},c){return e.jsxs("label",{className:b("kf-search",n),children:[e.jsx("span",{className:"kf-search__icon","aria-hidden":!0,children:e.jsx(_,{size:14,strokeWidth:1.75})}),e.jsx("input",{ref:c,className:"kf-search__input",type:"search",...r}),a?e.jsx("kbd",{className:"kf-search__kbd",children:a}):null]})}),R=B.forwardRef(function({className:n,placeholder:a="Search…",shortcut:r="⌘ K",...c},N){return e.jsxs("button",{ref:N,type:"button",className:b("kf-search","kf-search--button",n),...c,children:[e.jsx("span",{className:"kf-search__icon","aria-hidden":!0,children:e.jsx(_,{size:14,strokeWidth:1.75})}),e.jsx("span",{className:"kf-search__placeholder",children:a}),r?e.jsx("kbd",{className:"kf-search__kbd",children:r}):null]})});v.__docgenInfo={description:"",methods:[],displayName:"SearchBox",props:{shortcut:{required:!1,tsType:{name:"ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};R.__docgenInfo={description:"",methods:[],displayName:"SearchTrigger",props:{placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Search…'",computed:!1}},shortcut:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"'⌘ K'",computed:!1}}}};const L={title:"Layout/TopBar",component:l,tags:["autodocs"],parameters:{docs:{description:{component:"Sticky application header chrome. Pass `title` / `leading` on the left and `actions` / `trailing` (avatar, utilities) on the right."}}}},s={args:{title:"Organization",trailing:e.jsx(d,{name:"Blake"})}},i={render:()=>e.jsx(l,{title:"Dashboard",actions:e.jsxs(e.Fragment,{children:[e.jsx(t,{variant:"secondary",size:"sm",children:"Request Demo"}),e.jsx(t,{variant:"primary",size:"sm",children:"Get started"})]}),trailing:e.jsxs(e.Fragment,{children:[e.jsx(t,{variant:"ghost",iconOnly:!0,"aria-label":"Notifications",children:e.jsx(w,{})}),e.jsx(t,{variant:"ghost",iconOnly:!0,"aria-label":"Help",children:e.jsx(T,{})}),e.jsx(d,{name:"Neo"})]})})},o={render:()=>e.jsx(l,{leading:e.jsx(A,{items:[{id:"sec",label:"Security",href:"#"},{id:"acc",label:"Accounts and Portals",current:!0}]}),trailing:e.jsxs(e.Fragment,{children:[e.jsx(v,{placeholder:"Search portals…",style:{width:220}}),e.jsx(d,{name:"Freshworks"})]})})};var m,p,h;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    title: 'Organization',
    trailing: <Avatar name="Blake" />
  }
}`,...(h=(p=s.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var u,f,g;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <TopBar title="Dashboard" actions={<>
          <Button variant="secondary" size="sm">Request Demo</Button>
          <Button variant="primary" size="sm">Get started</Button>
        </>} trailing={<>
          <Button variant="ghost" iconOnly aria-label="Notifications"><Bell /></Button>
          <Button variant="ghost" iconOnly aria-label="Help"><HelpCircle /></Button>
          <Avatar name="Neo" />
        </>} />
}`,...(g=(f=i.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var x,j,y;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <TopBar leading={<Breadcrumb items={[{
    id: 'sec',
    label: 'Security',
    href: '#'
  }, {
    id: 'acc',
    label: 'Accounts and Portals',
    current: true
  }]} />} trailing={<>
          <SearchBox placeholder="Search portals…" style={{
      width: 220
    }} />
          <Avatar name="Freshworks" />
        </>} />
}`,...(y=(j=o.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};const M=["TitleAndAvatar","WithActions","WithBreadcrumbsAndSearch"];export{s as TitleAndAvatar,i as WithActions,o as WithBreadcrumbsAndSearch,M as __namedExportsOrder,L as default};
