import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as u}from"./cx-Q3itr6B4.js";import{C as _,a as j,b as C,c as b}from"./Card-DTG3FaJ7.js";import{c as o}from"./createLucideIcon-CV1y-rTQ.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 16s-1.5-2-4-2-4 2-4 2",key:"epbg0q"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]],w=o("frown",N);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"8",x2:"16",y1:"15",y2:"15",key:"1xb1d9"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]],T=o("meh",B);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]],S=o("smile",P);function a({value:t,max:i=100,tone:v="accent",label:r,icon:l,showValue:c=!0,className:k,...h}){const d=Math.max(0,Math.min(100,t/i*100));return e.jsxs("div",{className:u("kf-progress",k),...h,children:[(r||l||c)&&e.jsxs("div",{className:"kf-progress__header",children:[e.jsxs("span",{className:"kf-progress__label",children:[l,r]}),c?e.jsxs("span",{className:"kf-progress__value",children:[Math.round(d),"%"]}):null]}),e.jsx("div",{className:"kf-progress__track",role:"progressbar","aria-valuenow":t,"aria-valuemin":0,"aria-valuemax":i,"aria-label":typeof r=="string"?r:void 0,children:e.jsx("div",{className:u("kf-progress__fill",`kf-progress__fill--${v}`),style:{width:`${d}%`}})})]})}a.__docgenInfo={description:"Labeled progress bar (e.g. customer satisfaction breakdown).",methods:[],displayName:"ProgressBar",props:{value:{required:!0,tsType:{name:"number"},description:""},max:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"100",computed:!1}},tone:{required:!1,tsType:{name:"union",raw:"'accent' | 'success' | 'warning' | 'danger' | 'neutral'",elements:[{name:"literal",value:"'accent'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'neutral'"}]},description:"",defaultValue:{value:"'accent'",computed:!1}},label:{required:!1,tsType:{name:"ReactNode"},description:""},icon:{required:!1,tsType:{name:"ReactNode"},description:""},showValue:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const E={title:"Data/ProgressBar",component:a,tags:["autodocs"]},s={args:{label:"Completion",value:72,tone:"accent"}},n={render:()=>e.jsxs(_,{style:{maxWidth:320},children:[e.jsx(j,{children:e.jsx(C,{children:"Customer Satisfaction"})}),e.jsxs(b,{style:{display:"grid",gap:12},children:[e.jsx("div",{style:{font:"600 13px/1.3 var(--kf-font)",color:"var(--kf-ink)"},children:"320 Responses received"}),e.jsx(a,{label:"Positive",icon:e.jsx(S,{}),value:90,tone:"success"}),e.jsx(a,{label:"Neutral",icon:e.jsx(T,{}),value:2,tone:"warning"}),e.jsx(a,{label:"Negative",icon:e.jsx(w,{}),value:8,tone:"danger"})]})]})};var m,p,y;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'Completion',
    value: 72,
    tone: 'accent'
  }
}`,...(y=(p=s.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};var x,f,g;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <Card style={{
    maxWidth: 320
  }}>
      <CardHeader>
        <CardTitle>Customer Satisfaction</CardTitle>
      </CardHeader>
      <CardBody style={{
      display: 'grid',
      gap: 12
    }}>
        <div style={{
        font: '600 13px/1.3 var(--kf-font)',
        color: 'var(--kf-ink)'
      }}>
          320 Responses received
        </div>
        <ProgressBar label="Positive" icon={<Smile />} value={90} tone="success" />
        <ProgressBar label="Neutral" icon={<Meh />} value={2} tone="warning" />
        <ProgressBar label="Negative" icon={<Frown />} value={8} tone="danger" />
      </CardBody>
    </Card>
}`,...(g=(f=n.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};const F=["Basic","CustomerSatisfaction"];export{s as Basic,n as CustomerSatisfaction,F as __namedExportsOrder,E as default};
