import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as k}from"./index-mIjS73Jk.js";import{c as N}from"./cx-Q3itr6B4.js";import"./_commonjsHelpers-CqkleIqs.js";const _=k.forwardRef(function({label:t,description:c,className:b,id:x,disabled:o,...n},S){const i=x??n.name;return e.jsxs("label",{className:N("kf-switch",o&&"kf-switch--disabled",b),htmlFor:i,"data-disabled":o||void 0,children:[e.jsx("input",{ref:S,id:i,type:"checkbox",role:"switch",className:"kf-switch__input",disabled:o,...n}),e.jsx("span",{className:"kf-switch__track","aria-hidden":!0,children:e.jsx("span",{className:"kf-switch__thumb"})}),(t||c)&&e.jsxs("span",{className:"kf-switch__text",children:[t?e.jsx("span",{className:"kf-switch__label",children:t}):null,c?e.jsx("span",{className:"kf-switch__desc",children:c}):null]})]})});_.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{label:{required:!1,tsType:{name:"ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""}}};const C={title:"Forms/Switch",component:_,tags:["autodocs"]},s={args:{label:"Passwordless login"}},a={args:{label:"Require SSO",description:"Force SSO for all users",defaultChecked:!0}},r={args:{label:"Managed by org policy",disabled:!0,defaultChecked:!0}};var l,d,m;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    label: 'Passwordless login'
  }
}`,...(m=(d=s.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,u,f;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Require SSO',
    description: 'Force SSO for all users',
    defaultChecked: true
  }
}`,...(f=(u=a.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var h,g,w;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    label: 'Managed by org policy',
    disabled: true,
    defaultChecked: true
  }
}`,...(w=(g=r.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};const F=["Off","On","Disabled"];export{r as Disabled,s as Off,a as On,F as __namedExportsOrder,C as default};
