import{j as E}from"./jsx-runtime-D_zvdyIk.js";import{T as x,a as b}from"./TextField-GAp5X81v.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cx-Q3itr6B4.js";const V={title:"Forms/TextField",component:x,tags:["autodocs"]},e={args:{label:"Organization name *",defaultValue:"Acme Corp"}},r={args:{label:"Account domain URL *",placeholder:"acme.myfreshworks.com",hint:"Enter the full domain without https://"}},a={args:{label:"Email",defaultValue:"not-an-email",error:"Enter a valid email address"}},t={render:f=>E.jsx(b,{...f}),args:{label:"Address",rows:3,placeholder:"Street, city, country"}};var o,s,n;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    label: 'Organization name *',
    defaultValue: 'Acme Corp'
  }
}`,...(n=(s=e.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var l,c,i;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    label: 'Account domain URL *',
    placeholder: 'acme.myfreshworks.com',
    hint: 'Enter the full domain without https://'
  }
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var m,d,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address'
  }
}`,...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var p,h,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <TextArea {...args} />,
  args: {
    label: 'Address',
    rows: 3,
    placeholder: 'Street, city, country'
  }
}`,...(g=(h=t.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const W=["Default","WithHint","WithError","Multiline"];export{e as Default,t as Multiline,a as WithError,r as WithHint,W as __namedExportsOrder,V as default};
