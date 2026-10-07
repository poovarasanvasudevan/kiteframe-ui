import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as b}from"./cx-Q3itr6B4.js";import{X as I}from"./x-g_5yEgv9.js";import{c as i}from"./createLucideIcon-CV1y-rTQ.js";import{L as T}from"./Link-CAT2-2OB.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],D=i("circle-check",q);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],L=i("circle-x",z);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]],R=i("info",A);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],$=i("triangle-alert",M),C={info:e.jsx(R,{}),success:e.jsx(D,{}),warning:e.jsx($,{}),danger:e.jsx(L,{})};function _({tone:r="info",title:o,icon:t,onDismiss:c,dismissLabel:j="Dismiss",actions:l,className:w,children:d,...N}){const m=t===!1?null:t??C[r];return e.jsxs("div",{role:"status",className:b("kf-alert",`kf-alert--${r}`,w),...N,children:[m?e.jsx("span",{className:"kf-alert__icon","aria-hidden":!0,children:m}):null,e.jsxs("div",{className:"kf-alert__body",children:[o?e.jsx("div",{className:"kf-alert__title",children:o}):null,d?e.jsx("div",{className:"kf-alert__content",children:d}):null,l?e.jsx("div",{className:"kf-alert__actions",children:l}):null]}),c?e.jsx("button",{type:"button",className:"kf-alert__dismiss","aria-label":j,onClick:c,children:e.jsx(I,{})}):null]})}_.__docgenInfo={description:"Inline banner for important information, warnings, and status messages.",methods:[],displayName:"Alert",props:{tone:{required:!1,tsType:{name:"union",raw:"'info' | 'success' | 'warning' | 'danger'",elements:[{name:"literal",value:"'info'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'danger'"}]},description:"",defaultValue:{value:"'info'",computed:!1}},title:{required:!1,tsType:{name:"ReactNode"},description:""},icon:{required:!1,tsType:{name:"union",raw:"ReactNode | false",elements:[{name:"ReactNode"},{name:"literal",value:"false"}]},description:""},onDismiss:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},dismissLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Dismiss'",computed:!1}},actions:{required:!1,tsType:{name:"ReactNode"},description:""}}};const F={title:"Feedback/Alert",component:_,tags:["autodocs"]},n={args:{tone:"info",title:"Important Information",children:e.jsxs("ul",{children:[e.jsx("li",{children:"Moving an account transfers ownership to your organization."}),e.jsx("li",{children:"The account admin will be notified of the request."})]}),onDismiss:()=>{}}},a={args:{tone:"warning",children:"This is a sample dashboard. Dismiss for real data.",onDismiss:()=>{}}},s={args:{tone:"warning",title:"Don't find some of your accounts?",children:"Enter the account domain URL to move it into your organization.",actions:e.jsx(T,{href:"#",children:"Know more"})}};var u,f,p;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    tone: 'info',
    title: 'Important Information',
    children: <ul>
        <li>Moving an account transfers ownership to your organization.</li>
        <li>The account admin will be notified of the request.</li>
      </ul>,
    onDismiss: () => undefined
  }
}`,...(p=(f=n.parameters)==null?void 0:f.docs)==null?void 0:p.source}}};var h,g,y;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    tone: 'warning',
    children: 'This is a sample dashboard. Dismiss for real data.',
    onDismiss: () => undefined
  }
}`,...(y=(g=a.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var k,x,v;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    tone: 'warning',
    title: "Don't find some of your accounts?",
    children: 'Enter the account domain URL to move it into your organization.',
    actions: <Link href="#">Know more</Link>
  }
}`,...(v=(x=s.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const O=["Info","Warning","WithActions"];export{n as Info,a as Warning,s as WithActions,O as __namedExportsOrder,F as default};
