import path from 'path'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users.js'
import { Articles } from './collections/Articles.js'
import { Tags } from './collections/Tags.js'
import { Services } from './collections/Services.js'
import { Media } from './collections/Media.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- 快快出海 CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  collections: [Users, Articles, Tags, Services, Media],
  editor: lexicalEditor(),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./cms.db',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [
    'http://localhost:3000',
    'https://www.kuaikuaichuhai.com',
  ],
  csrf: [
    'http://localhost:3000',
    'https://www.kuaikuaichuhai.com',
  ],
})
