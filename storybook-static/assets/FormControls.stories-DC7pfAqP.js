import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{T as s,a as l}from"./TextField-GAp5X81v.js";import{F as t}from"./FileUpload-C1wa5vYy.js";import{B as e}from"./Button-CHwF8LUD.js";import{U as d}from"./UrlCard-DhSu1VQc.js";import{C as c,c as m}from"./Card-DTG3FaJ7.js";import"./index-mIjS73Jk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cx-Q3itr6B4.js";const j={title:"Patterns/Organization form",tags:["autodocs"],parameters:{docs:{description:{component:"Example page composing TextField, TextArea, FileUpload, UrlCard, and Button. Individual controls have their own docs under Forms/."}}}},r={render:()=>a.jsx(c,{style:{maxWidth:640},children:a.jsxs(m,{style:{display:"grid",gap:16},children:[a.jsx(s,{label:"Organization name *",defaultValue:"Acme Corp"}),a.jsx(l,{label:"Address",rows:3,placeholder:"Street, city, country"}),a.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[a.jsx(t,{label:"Organization Icon",hint:"Recommended: 200×200 px, square",accept:"image/*"}),a.jsx(t,{label:"Organization Logo",hint:"Recommended: 400×100 px",accept:"image/*"})]}),a.jsx(d,{label:"Current Freshworks organization account URL",url:"https://acme.myfreshworks.com",action:a.jsx(e,{variant:"secondary",children:"Change Organization URL"})}),a.jsxs("div",{style:{display:"flex",gap:8},children:[a.jsx(e,{variant:"primary",children:"Save"}),a.jsx(e,{variant:"ghost",children:"Cancel"}),a.jsx(e,{variant:"danger-outline",style:{marginLeft:"auto"},children:"Delete Organization"})]})]})})};var o,i,n;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => <Card style={{
    maxWidth: 640
  }}>
      <CardBody style={{
      display: 'grid',
      gap: 16
    }}>
        <TextField label="Organization name *" defaultValue="Acme Corp" />
        <TextArea label="Address" rows={3} placeholder="Street, city, country" />
        <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }}>
          <FileUpload label="Organization Icon" hint="Recommended: 200×200 px, square" accept="image/*" />
          <FileUpload label="Organization Logo" hint="Recommended: 400×100 px" accept="image/*" />
        </div>
        <UrlCard label="Current Freshworks organization account URL" url="https://acme.myfreshworks.com" action={<Button variant="secondary">Change Organization URL</Button>} />
        <div style={{
        display: 'flex',
        gap: 8
      }}>
          <Button variant="primary">Save</Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="danger-outline" style={{
          marginLeft: 'auto'
        }}>
            Delete Organization
          </Button>
        </div>
      </CardBody>
    </Card>
}`,...(n=(i=r.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const B=["Default"];export{r as Default,B as __namedExportsOrder,j as default};
