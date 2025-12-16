import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '用户名',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        {
          label: '管理员',
          value: 'admin',
        },
        {
          label: '编辑',
          value: 'editor',
        },
      ],
    },
  ],
}
