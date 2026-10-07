import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as p}from"./cx-Q3itr6B4.js";function a({label:t,value:l,layout:s="label-top",className:b,...x}){return e.jsx("div",{className:p("kf-stat",`kf-stat--${s}`,b),...x,children:s==="label-top"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"kf-stat__label",children:t}),e.jsx("div",{className:"kf-stat__value",children:l})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"kf-stat__value",children:l}),e.jsx("div",{className:"kf-stat__label",children:t})]})})}function v({className:t,children:l,...s}){return e.jsx("div",{className:p("kf-stat-bar",t),...s,children:l})}a.__docgenInfo={description:"KPI / metric tile used in dashboard summary bars.",methods:[],displayName:"Stat",props:{label:{required:!0,tsType:{name:"ReactNode"},description:""},value:{required:!0,tsType:{name:"ReactNode"},description:""},layout:{required:!1,tsType:{name:"union",raw:"'label-top' | 'value-top'",elements:[{name:"literal",value:"'label-top'"},{name:"literal",value:"'value-top'"}]},description:"Place label above value (dashboard metric) or below (settings stat).",defaultValue:{value:"'label-top'",computed:!1}}}};v.__docgenInfo={description:"Horizontal row of Stat tiles with dividers.",methods:[],displayName:"StatBar",props:{children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const S={title:"Data/Stat",component:a,tags:["autodocs"]},r={args:{label:"Unresolved",value:55}},n={render:()=>e.jsxs(v,{children:[e.jsx(a,{label:"Unresolved",value:55}),e.jsx(a,{label:"Overdue",value:4}),e.jsx(a,{label:"Due today",value:11}),e.jsx(a,{label:"Open",value:23}),e.jsx(a,{label:"On hold",value:7}),e.jsx(a,{label:"Unassigned",value:9})]})};var o,d,i;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    label: 'Unresolved',
    value: 55
  }
}`,...(i=(d=r.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var c,u,m;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <StatBar>
      <Stat label="Unresolved" value={55} />
      <Stat label="Overdue" value={4} />
      <Stat label="Due today" value={11} />
      <Stat label="Open" value={23} />
      <Stat label="On hold" value={7} />
      <Stat label="Unassigned" value={9} />
    </StatBar>
}`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};const j=["Single","DashboardBar"];export{n as DashboardBar,r as Single,j as __namedExportsOrder,S as default};
