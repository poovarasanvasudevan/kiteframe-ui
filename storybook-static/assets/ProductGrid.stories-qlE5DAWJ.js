import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as u}from"./cx-Q3itr6B4.js";import{c as t}from"./createLucideIcon-CV1y-rTQ.js";import{C as f,c as x}from"./Card-DTG3FaJ7.js";import{H as _}from"./headphones-DIxS_54J.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]],k=t("external-link",g);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]],y=t("message-circle",j);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]],b=t("shopping-bag",N);/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]],w=t("wrench",P);function s({icon:r,label:o,color:c,className:d,...n}){return e.jsxs("a",{className:u("kf-product-tile",d),...n,children:[e.jsx("span",{className:"kf-product-tile__icon",style:c?{background:c}:void 0,children:r}),e.jsx("span",{className:"kf-product-tile__label",children:o})]})}function i({title:r,externalHref:o,externalLabel:c="Open in new window",className:d,children:n,...m}){return e.jsxs("section",{className:u("kf-product-grid",d),...m,children:[(r||o)&&e.jsxs("div",{className:"kf-product-grid__header",children:[r?e.jsx("h3",{className:"kf-product-grid__title",children:r}):null,o?e.jsx("a",{className:"kf-product-grid__ext",href:o,target:"_blank",rel:"noreferrer","aria-label":c,children:e.jsx(k,{})}):null]}),e.jsx("div",{className:"kf-product-grid__items",children:n})]})}s.__docgenInfo={description:"",methods:[],displayName:"ProductTile",props:{icon:{required:!0,tsType:{name:"ReactNode"},description:""},label:{required:!0,tsType:{name:"ReactNode"},description:""},color:{required:!1,tsType:{name:"string"},description:""}}};i.__docgenInfo={description:"Horizontal/grid of product icons with labels (Explore Freshworks Products).",methods:[],displayName:"ProductGrid",props:{title:{required:!1,tsType:{name:"ReactNode"},description:""},externalHref:{required:!1,tsType:{name:"string"},description:""},externalLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Open in new window'",computed:!1}},children:{required:!0,tsType:{name:"ReactNode"},description:""}}};const H={title:"Content/ProductGrid",component:i,tags:["autodocs"]},a={render:()=>e.jsx(f,{children:e.jsx(x,{children:e.jsxs(i,{title:"Explore Freshworks Products",externalHref:"#",children:[e.jsx(s,{href:"#",icon:e.jsx(_,{}),label:"Freshdesk",color:"#25c16f"}),e.jsx(s,{href:"#",icon:e.jsx(w,{}),label:"Freshservice",color:"#2c5cc5"}),e.jsx(s,{href:"#",icon:e.jsx(b,{}),label:"Freshsales",color:"#e86f25"}),e.jsx(s,{href:"#",icon:e.jsx(y,{}),label:"Freshchat",color:"#7c3aed"})]})})})};var l,p,h;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <Card>
      <CardBody>
        <ProductGrid title="Explore Freshworks Products" externalHref="#">
          <ProductTile href="#" icon={<Headphones />} label="Freshdesk" color="#25c16f" />
          <ProductTile href="#" icon={<Wrench />} label="Freshservice" color="#2c5cc5" />
          <ProductTile href="#" icon={<ShoppingBag />} label="Freshsales" color="#e86f25" />
          <ProductTile href="#" icon={<MessageCircle />} label="Freshchat" color="#7c3aed" />
        </ProductGrid>
      </CardBody>
    </Card>
}`,...(h=(p=a.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};const B=["ExploreProducts"];export{a as ExploreProducts,B as __namedExportsOrder,H as default};
