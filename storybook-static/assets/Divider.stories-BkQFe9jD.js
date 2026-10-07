import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as v}from"./cx-Q3itr6B4.js";function i({orientation:c="horizontal",className:p,...m}){return e.jsx("hr",{className:v("kf-divider",c==="vertical"&&"kf-divider--vertical",p),...m})}i.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"",defaultValue:{value:"'horizontal'",computed:!1}}}};const x={title:"Content/Divider",component:i,tags:["autodocs"]},r={render:()=>e.jsxs("div",{style:{maxWidth:320},children:[e.jsx("p",{style:{margin:0},children:"Above"}),e.jsx(i,{}),e.jsx("p",{style:{margin:0},children:"Below"})]})},t={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"stretch",height:40},children:[e.jsx("span",{children:"Left"}),e.jsx(i,{orientation:"vertical"}),e.jsx("span",{children:"Right"})]})};var a,s,n;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 320
  }}>
      <p style={{
      margin: 0
    }}>Above</p>
      <Divider />
      <p style={{
      margin: 0
    }}>Below</p>
    </div>
}`,...(n=(s=r.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var o,l,d;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'stretch',
    height: 40
  }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const f=["Horizontal","Vertical"];export{r as Horizontal,t as Vertical,f as __namedExportsOrder,x as default};
