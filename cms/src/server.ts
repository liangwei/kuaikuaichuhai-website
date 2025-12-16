import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'
import config from './payload.config.js'

dotenv.config()

const app = express()

const start = async () => {
  // 初始化 Payload，传入配置
  await payload.init({
    config,
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
    express: app,
    onInit: () => {
      console.log(`\n🚀 Payload CMS 已启动`)
      console.log(`📍 管理后台: http://localhost:${process.env.PORT || 3001}/admin`)
      console.log(`📡 API: http://localhost:${process.env.PORT || 3001}/api`)
    },
  })

  // 重定向根路径到 /admin
  app.get('/', (_, res) => {
    res.redirect('/admin')
  })

  // 启动 Express 服务器
  const port = process.env.PORT || 3001
  app.listen(port)
}

start().catch((error) => {
  console.error('Failed to start:', error)
  process.exit(1)
})

