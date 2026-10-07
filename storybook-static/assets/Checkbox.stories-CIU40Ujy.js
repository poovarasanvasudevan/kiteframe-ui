import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as C}from"./index-mIjS73Jk.js";import{c as D}from"./cx-Q3itr6B4.js";import"./_commonjsHelpers-CqkleIqs.js";const _=C.forwardRef(function({label:c,description:n,indeterminate:N,className:j,id:y,disabled:i,...d},a){const l=y??d.name;return e.jsxs("label",{className:D("kf-check",i&&"kf-check--disabled",j),htmlFor:l,"data-disabled":i||void 0,children:[e.jsx("input",{ref:s=>{typeof a=="function"?a(s):a&&(a.current=s),s&&(s.indeterminate=!!N)},id:l,type:"checkbox",className:"kf-check__input",disabled:i,...d}),e.jsx("span",{className:"kf-check__box","aria-hidden":!0}),(c||n)&&e.jsxs("span",{className:"kf-check__text",children:[c?e.jsx("span",{className:"kf-check__label",children:c}):null,n?e.jsx("span",{className:"kf-check__desc",children:n}):null]})]})});_.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{label:{required:!1,tsType:{name:"ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactNode"},description:""},indeterminate:{required:!1,tsType:{name:"boolean"},description:""}}};const R={title:"Forms/Checkbox",component:_,tags:["autodocs"]},r={args:{label:"Send weekly digest"}},t={args:{label:"Follow up with customer about Upgrade",description:"IN A DAY",defaultChecked:!0}},o={args:{label:"Locked option",disabled:!0,defaultChecked:!0}};var p,u,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Send weekly digest'
  }
}`,...(m=(u=r.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var f,h,k;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Follow up with customer about Upgrade',
    description: 'IN A DAY',
    defaultChecked: true
  }
}`,...(k=(h=t.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};var b,x,g;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Locked option',
    disabled: true,
    defaultChecked: true
  }
}`,...(g=(x=o.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};const q=["Default","WithDescription","Disabled"];export{r as Default,o as Disabled,t as WithDescription,q as __namedExportsOrder,R as default};
