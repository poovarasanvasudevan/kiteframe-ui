import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as g}from"./cx-Q3itr6B4.js";function s({size:n="md",label:p="Loading",className:c,...u}){return e.jsx("span",{role:"status","aria-label":p,className:g("kf-spinner",n!=="md"&&`kf-spinner--${n}`,c),...u})}s.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Loading'",computed:!1}}}};const z={title:"Feedback/Spinner",component:s,tags:["autodocs"]},a={args:{size:"md"}},r={render:()=>e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[e.jsx(s,{size:"sm"}),e.jsx(s,{size:"md"}),e.jsx(s,{size:"lg"})]})};var i,t,d;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    size: 'md'
  }
}`,...(d=(t=a.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};var l,m,o;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
}`,...(o=(m=r.parameters)==null?void 0:m.docs)==null?void 0:o.source}}};const S=["Medium","Sizes"];export{a as Medium,r as Sizes,S as __namedExportsOrder,z as default};
