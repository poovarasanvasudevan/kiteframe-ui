import type { Meta, StoryObj } from '@storybook/react'
import { BookOpen, FileText, BarChart3, MessageCircle } from 'lucide-react'
import { ProductGrid, ProductTile } from './ProductGrid'
import { Card, CardBody } from './Card'

const meta: Meta<typeof ProductGrid> = {
  title: 'Content/ProductGrid',
  component: ProductGrid,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ProductGrid>

export const ExploreProducts: Story = {
  render: () => (
    <Card>
      <CardBody>
        <ProductGrid title="Explore KiteFrame Products" externalHref="#">
          <ProductTile href="#" icon={<BookOpen />} label="Knowledge" color="#25c16f" />
          <ProductTile href="#" icon={<FileText />} label="Articles" color="#2c5cc5" />
          <ProductTile href="#" icon={<BarChart3 />} label="Analytics" color="#e86f25" />
          <ProductTile href="#" icon={<MessageCircle />} label="Reviews" color="#7c3aed" />
        </ProductGrid>
      </CardBody>
    </Card>
  ),
}
