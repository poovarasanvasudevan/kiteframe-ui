import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from './Accordion'
import { Collapse } from './Collapse'
import { Button } from './Button'

const meta: Meta<typeof Accordion> = {
  title: 'Overlay/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Expand/collapse sections. Use `Accordion` for multi-item groups (`single` | `multiple`). Use `Collapse` for one standalone panel.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Accordion>

export const Single: Story = {
  render: () => (
    <Accordion type="single" defaultValue={['billing']} style={{ maxWidth: 480 }}>
      <AccordionItem value="billing">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionPanel>
          Invoices are generated on the 1st of each month. Update your payment method under Organization settings.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger>Security</AccordionTrigger>
        <AccordionPanel>
          Enforce SSO and session timeouts for all members in this organization.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="ports">
        <AccordionTrigger>Ports and domains</AccordionTrigger>
        <AccordionPanel>
          Map custom domains to portals. DNS changes may take up to 24 hours to propagate.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  name: 'Multiple open',
  render: () => (
    <Accordion type="multiple" defaultValue={['one', 'two']} style={{ maxWidth: 480 }}>
      <AccordionItem value="one">
        <AccordionTrigger>Accounts</AccordionTrigger>
        <AccordionPanel>4 linked accounts in this organization.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Portals</AccordionTrigger>
        <AccordionPanel>11 active portals.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="three">
        <AccordionTrigger>Members</AccordionTrigger>
        <AccordionPanel>Invite teammates and assign roles.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['details'])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" onClick={() => setValue(['details'])}>
            Open details
          </Button>
          <Button variant="ghost" onClick={() => setValue([])}>
            Collapse all
          </Button>
        </div>
        <Accordion type="single" value={value} onValueChange={setValue}>
          <AccordionItem value="details">
            <AccordionTrigger>Organization details</AccordionTrigger>
            <AccordionPanel>Legal name, timezone, and contact email.</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="advanced">
            <AccordionTrigger>Advanced</AccordionTrigger>
            <AccordionPanel>API tokens and webhook endpoints.</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    )
  },
}

export const DisabledItem: Story = {
  name: 'Disabled item',
  render: () => (
    <Accordion type="single" defaultValue={['open']} style={{ maxWidth: 480 }}>
      <AccordionItem value="open">
        <AccordionTrigger>Available</AccordionTrigger>
        <AccordionPanel>This section can be toggled.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="locked" disabled>
        <AccordionTrigger>Locked (requires admin)</AccordionTrigger>
        <AccordionPanel>You should not see this while disabled.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
}

export const CollapseStandalone: Story = {
  name: 'Collapse (single)',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        <Collapse title="Advanced options" defaultOpen>
          Extra filters and experimental flags for this workspace.
        </Collapse>
        <Collapse title="Controlled collapse" open={open} onOpenChange={setOpen}>
          Open state is controlled by the parent. Currently {open ? 'expanded' : 'collapsed'}.
        </Collapse>
        <Button variant="secondary" onClick={() => setOpen((v) => !v)}>
          Toggle controlled
        </Button>
      </div>
    )
  },
}
