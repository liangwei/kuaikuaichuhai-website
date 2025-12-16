import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '服务名称',
    },
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      label: '服务类型',
      options: [
        {
          label: 'SEO服务',
          value: 'seo',
        },
        {
          label: 'GEO服务',
          value: 'geo',
        },
        {
          label: '社媒服务',
          value: 'social',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'SEO描述',
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: '页面主标题',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: '页面副标题',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: '封面图片',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: '服务内容介绍',
    },
    {
      name: 'features',
      type: 'array',
      label: '服务特点',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: '特点标题',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: '特点描述',
        },
        {
          name: 'icon',
          type: 'text',
          label: '图标名称',
          admin: {
            description: '使用lucide-react图标名称',
          },
        },
      ],
    },
  ],
}
