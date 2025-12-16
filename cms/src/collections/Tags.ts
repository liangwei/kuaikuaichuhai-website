import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: '标签名称',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL标识',
      admin: {
        description: '用于URL，如: seo-optimization',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: '描述',
    },
  ],
}
