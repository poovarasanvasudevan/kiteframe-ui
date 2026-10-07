import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as B}from"./cx-Q3itr6B4.js";import{C as T}from"./chevron-right-D7hZ4zpT.js";import{I as c,Z as i}from"./IconBadge-BcQ5kOmX.js";import{C as q,a as b,b as A,c as F}from"./Card-DTG3FaJ7.js";import"./createLucideIcon-CV1y-rTQ.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";function t({icon:o,title:y,description:n,active:d,count:l,showChevron:C=!0,trailing:I,className:k,type:_="button",...N}){return e.jsxs("button",{type:_,"data-active":d||void 0,className:B("kf-list-item",d&&"kf-list-item--active",k),...N,children:[o?e.jsx("span",{className:"kf-list-item__icon",children:o}):null,e.jsxs("span",{className:"kf-list-item__text",children:[e.jsx("span",{className:"kf-list-item__title",children:y}),n?e.jsx("span",{className:"kf-list-item__desc",children:n}):null]}),I,l!=null?e.jsx("span",{className:"kf-list-item__count",children:l}):null,C?e.jsx("span",{className:"kf-list-item__chevron","aria-hidden":!0,children:e.jsx(T,{})}):null]})}t.__docgenInfo={description:`Selectable list row for accounts, portals, requests, etc.
Active state uses a light blue wash like Neo Admin account pickers.`,methods:[],displayName:"ListItem",props:{icon:{required:!1,tsType:{name:"ReactNode"},description:""},title:{required:!0,tsType:{name:"ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},active:{required:!1,tsType:{name:"boolean"},description:""},count:{required:!1,tsType:{name:"ReactNode"},description:""},showChevron:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},trailing:{required:!1,tsType:{name:"ReactNode"},description:""},type:{defaultValue:{value:"'button'",computed:!1},required:!1}}};const E={title:"Data/ListItem",component:t,tags:["autodocs"]},s={args:{icon:e.jsx(c,{color:"#2c5cc5",children:e.jsx(i,{})}),title:"Freshservice",description:"acme.freshservice.com"}},r={args:{...s.args,active:!0,count:11}},a={render:()=>e.jsxs(q,{style:{maxWidth:320},children:[e.jsx(b,{children:e.jsx(A,{children:"Accounts (4)"})}),e.jsxs(F,{style:{display:"grid",gap:8},children:[e.jsx(t,{active:!0,count:11,icon:e.jsx(c,{color:"#2c5cc5",children:e.jsx(i,{})}),title:"Freshservice",description:"acme.freshservice.com"}),e.jsx(t,{icon:e.jsx(c,{color:"#00a886",children:e.jsx(i,{})}),title:"Freshdesk",description:"acme.freshdesk.com"}),e.jsx(t,{icon:e.jsx(c,{color:"#e86f25",children:e.jsx(i,{})}),title:"Freshsales",description:"acme.freshsales.io"})]})]})};var m,p,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    icon: <IconBadge color="#2c5cc5"><Zap /></IconBadge>,
    title: 'Freshservice',
    description: 'acme.freshservice.com'
  }
}`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var h,f,x;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    active: true,
    count: 11
  }
}`,...(x=(f=r.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var g,j,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <Card style={{
    maxWidth: 320
  }}>
      <CardHeader>
        <CardTitle>Accounts (4)</CardTitle>
      </CardHeader>
      <CardBody style={{
      display: 'grid',
      gap: 8
    }}>
        <ListItem active count={11} icon={<IconBadge color="#2c5cc5"><Zap /></IconBadge>} title="Freshservice" description="acme.freshservice.com" />
        <ListItem icon={<IconBadge color="#00a886"><Zap /></IconBadge>} title="Freshdesk" description="acme.freshdesk.com" />
        <ListItem icon={<IconBadge color="#e86f25"><Zap /></IconBadge>} title="Freshsales" description="acme.freshsales.io" />
      </CardBody>
    </Card>
}`,...(v=(j=a.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};const P=["Default","ActiveWithCount","AccountPicker"];export{a as AccountPicker,r as ActiveWithCount,s as Default,P as __namedExportsOrder,E as default};
