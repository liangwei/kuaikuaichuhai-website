# 快快出海网站

基于 Next.js + Payload CMS 的企业出海营销服务网站。

## 项目结构

```
kuaikuaichuhai-website/
├── app/                    # Next.js App Router
│   ├── seo/               # SEO服务页面
│   ├── geo/               # GEO服务页面
│   ├── social/            # 社媒服务页面
│   ├── news/              # 技术动态列表和详情
│   ├── tag/               # 标签聚合页面
│   ├── sitemap.ts         # 动态sitemap生成
│   └── robots.ts          # robots.txt配置
├── cms/                   # Payload CMS后台
│   ├── src/
│   │   ├── collections/   # 数据模型定义
│   │   ├── payload.config.ts  # CMS配置
│   │   └── server.ts      # CMS服务器
│   └── package.json
├── components/            # React组件
├── lib/                   # 工具函数和API集成
│   └── payload.ts         # Payload CMS API客户端
└── public/                # 静态资源
```

## 技术栈

- **前端**: Next.js 16, React 19, TailwindCSS 4, Framer Motion
- **CMS**: Payload CMS 3
- **数据库**: SQLite
- **部署**: 支持Vercel、Netlify等平台

## 快速开始

### 1. 安装依赖

```bash
# 安装主项目依赖
npm install

# 安装CMS依赖
cd cms
yarn install
cd ..
```

### 2. 配置环境变量

复制环境变量示例文件并修改：

```bash
cp .env.example .env.local
cd cms
cp .env.example .env
cd ..
```

编辑 `.env.local`:
```env
NEXT_PUBLIC_PAYLOAD_API_URL=http://localhost:3001/api
```

编辑 `cms/.env`:
```env
DATABASE_URI=sqlite://./cms.db
PAYLOAD_SECRET=your-secret-key-here
PORT=3001
```

### 3. 启动开发环境

需要同时启动 CMS 后台和 Next.js 前端：

**终端 1 - 启动Payload CMS:**
```bash
cd cms
yarn dev
```

CMS将运行在 `http://localhost:3001`
- 管理后台: `http://localhost:3001/admin`
- API接口: `http://localhost:3001/api`

**终端 2 - 启动Next.js前端:**
```bash
npm run dev
```

前端将运行在 `http://localhost:3000`

### 4. 首次使用设置

1. 访问 `http://localhost:3001/admin`
2. 创建管理员账户
3. 登录后台开始管理内容:
   - **Articles (文章)**: 创建技术动态文章
   - **Tags (标签)**: 创建文章标签
   - **Services (服务)**: 配置三个服务页面内容
   - **Media (媒体)**: 上传图片等资源

## CMS内容管理

### 文章字段说明

- **title**: 文章标题
- **slug**: URL标识（用于生成文章链接）
- **description**: 文章描述（用于SEO）
- **coverImage**: 封面图片
- **content**: 文章正文（富文本）
- **type**: 文章分类（SEO服务/GEO服务/社媒服务）
- **tags**: 文章标签（多选）
- **author**: 作者
- **status**: 状态（草稿/已发布）
- **publishedAt**: 发布时间

### 服务页面字段

- **title**: 服务名称
- **slug**: 服务类型（seo/geo/social）
- **heroTitle**: 页面主标题
- **heroSubtitle**: 页面副标题
- **content**: 服务介绍内容
- **features**: 服务特点列表

## 页面路由

- `/` - 首页
- `/seo` - SEO服务页
- `/geo` - GEO服务页
- `/social` - 社媒服务页
- `/news` - 技术动态列表
- `/news/[slug]` - 文章详情页
- `/tag/[tagName]` - 标签聚合页

## 生产部署

### 构建项目

```bash
# 构建Next.js前端
npm run build

# 构建Payload CMS
cd cms
yarn build
cd ..
```

### 部署建议

#### 前端 (Next.js)
- 推荐使用 Vercel 部署
- 配置环境变量 `NEXT_PUBLIC_PAYLOAD_API_URL`

#### CMS后台
- 可部署到任何支持Node.js的服务器
- 或使用 Railway、Render 等平台
- 配置环境变量（数据库、密钥等）

## 开发命令

```bash
# Next.js 前端
npm run dev          # 开发模式
npm run build        # 生产构建
npm run start        # 运行生产版本

# Payload CMS
cd cms
yarn dev             # 开发模式
yarn build           # 生产构建
yarn start           # 运行生产版本
```

## SEO优化

项目已配置:
- ✅ 动态sitemap (`/sitemap.xml`)
- ✅ robots.txt
- ✅ Open Graph标签
- ✅ 动态页面元数据
- ✅ 语义化HTML结构

## 注意事项

1. **数据库**: 开发环境使用SQLite，生产环境建议使用PostgreSQL或MySQL
2. **富文本渲染**: 当前文章内容使用Lexical编辑器，需要实现专门的渲染组件
3. **图片优化**: 建议使用CDN或图片优化服务
4. **缓存策略**: 已配置ISR（增量静态再生成），可根据需求调整缓存时间

## 常见问题

**Q: CMS启动失败？**
A: 确保已安装依赖，并正确配置了`.env`文件

**Q: 前端无法获取CMS数据？**
A: 检查`NEXT_PUBLIC_PAYLOAD_API_URL`环境变量是否正确配置

**Q: 如何修改网站配色？**
A: 编辑`tailwind.config.js`和相关组件的className

## 技术支持

如有问题，请联系开发团队或查看[Payload CMS文档](https://payloadcms.com/docs)和[Next.js文档](https://nextjs.org/docs)。
