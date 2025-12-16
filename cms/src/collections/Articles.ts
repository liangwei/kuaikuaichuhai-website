import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'status', 'publishedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: '文章标题',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL标识',
      admin: {
        description: '用于生成文章URL，如: how-to-seo',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: '文章描述',
      admin: {
        description: 'SEO描述，用于搜索引擎显示',
      },
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
      label: '文章内容',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: '文章分类',
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
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: '标签',
    },
    {
      name: 'author',
      type: 'text',
      label: '作者',
      defaultValue: '快快出海',
    },
    {
      name: 'viewCount',
      type: 'number',
      defaultValue: 0,
      label: '浏览量',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: '状态',
      options: [
        {
          label: '草稿',
          value: 'draft',
        },
        {
          label: '已发布',
          value: 'published',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: '发布时间',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
