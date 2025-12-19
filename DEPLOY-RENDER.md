# 快快出海网站 - Render 部署完整指南

本文档提供从零开始在 Render 平台部署快快出海网站的完整步骤。

## 📋 目录

- [1. 项目架构](#1-项目架构)
- [2. 前置准备](#2-前置准备)
- [3. 生成 Strapi 密钥](#3-生成-strapi-密钥)
- [4. 部署 Strapi 后端](#4-部署-strapi-后端)
- [5. 配置 Strapi 数据持久化](#5-配置-strapi-数据持久化)
- [6. 部署 Next.js 前端](#6-部署-nextjs-前端)
- [7. 配置 Strapi 权限](#7-配置-strapi-权限)
- [8. 配置图片存储](#8-配置图片存储)
- [9. 配置自定义域名](#9-配置自定义域名可选)
- [10. 更新部署流程](#10-更新部署流程)
- [11. 常见问题](#11-常见问题)
- [12. 成本估算](#12-成本估算)

---

## 1. 项目架构

```
Render 账号
├── Strapi CMS (后端)
│   ├── Web Service
│   ├── Persistent Disk (存储数据库和图片)
│   └── URL: https://strapi-xxx.onrender.com
│
└── Next.js (前端)
    ├── Web Service
    └── URL: https://kuaikuaichuhai.onrender.com
```

**数据流**：
```
用户 → Next.js 前端 → Strapi API → SQLite 数据库 → Persistent Disk
```

---

## 2. 前置准备

### 2.1 注册账号

1. 访问 [Render](https://render.com)
2. 点击 **"Get Started"** 注册账号
3. 可以使用 GitHub、GitLab 或 Google 账号登录

### 2.2 准备 GitHub 仓库

确保你的代码已推送到 GitHub：

```bash
# 如果还没有推送
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2.3 连接 GitHub

1. 在 Render Dashboard 点击右上角头像
2. 选择 **"Account Settings"**
3. 左侧菜单选择 **"Connected Accounts"**
4. 点击 **"Connect"** 连接 GitHub 账号
5. 授权 Render 访问你的仓库

### 2.4 检查项目结构

确保项目结构正确：

```
kuaikuaichuhai-website/
├── cms/                    # Strapi 后端
│   ├── package.json
│   ├── .env (不提交)
│   └── ...
├── app/                    # Next.js 前端
├── package.json            # Next.js package.json
├── next.config.mjs
├── .env.local (不提交)
├── .env.production
└── README.md
```

---

## 3. 生成 Strapi 密钥

在本地运行以下命令生成 6 个密钥：

```bash
# Windows PowerShell 或 Mac/Linux 终端
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**运行 6 次**，保存输出结果，例如：

```
密钥1: XHsxnRY9g51QeV0Q4Yg8G5PVmjJucqDEFiQBhzHQ5Xg=
密钥2: IRYVB15QaE2gJYf2y3ko2rI/agsED+oRdKDG+JDw6qk=
密钥3: PjmrAg5jh45O9xUkvvagdZtDc3Y21bRqLAHVa8rU9qA=
密钥4: r9L+gisMJW8ImOYaggwmfMP4q4oBMEkdtz3lGsjkjB4=
密钥5: lK8X8jyVBB+ykYGLYM26dRuBsxEnB7xmpFRkFUXL20Y=
密钥6: ie3XV++wSOapgxLEpKf8Z9SPd0Tl2GPhkT7kv9VuL88=
```

**保存这些密钥**，稍后配置环境变量时会用到。

---

## 4. 部署 Strapi 后端

### 4.1 创建 Web Service

1. 在 Render Dashboard 点击 **"New +"**
2. 选择 **"Web Service"**
3. 选择你的 GitHub 仓库 `kuaikuaichuhai-website`
4. 点击 **"Connect"**

### 4.2 配置 Strapi 服务

填写以下配置：

| 字段 | 值 |
|------|-----|
| **Name** | `strapi` (或你喜欢的名字) |
| **Region** | `Oregon (US West)` (或离你最近的) |
| **Branch** | `main` |
| **Root Directory** | `cms` ⚠️ 重要！ |
| **Runtime** | `Node` |
| **Build Command** | `yarn install && yarn build` |
| **Start Command** | `yarn start` |

### 4.3 选择套餐

| 套餐 | 费用 | 说明 |
|------|------|------|
| **Free** | $0/月 | 休眠机制，适合测试 |
| **Starter** | $7/月 | 不休眠，适合生产 ⭐ 推荐 |

选择 **Starter** 套餐（生产环境推荐）。

### 4.4 配置环境变量

点击 **"Advanced"** → **"Add Environment Variable"**，添加以下变量：

#### 基础配置

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `HOST` | `0.0.0.0` |
| `PORT` | `10000` |

#### 数据库配置（SQLite）

| Key | Value |
|-----|-------|
| `DATABASE_CLIENT` | `sqlite` |
| `DATABASE_FILENAME` | `/data/data.db` |

#### Strapi 密钥（使用第3步生成的）

| Key | Value |
|-----|-------|
| `APP_KEYS` | `密钥1,密钥2` (两个密钥，用逗号分隔) |
| `API_TOKEN_SALT` | `密钥3` |
| `ADMIN_JWT_SECRET` | `密钥4` |
| `TRANSFER_TOKEN_SALT` | `密钥5` |
| `JWT_SECRET` | `密钥6` |

⚠️ **重要**：密钥不要有空格，直接复制粘贴。

### 4.5 创建服务

点击 **"Create Web Service"**。

Render 会开始构建和部署，这需要 **5-10 分钟**。

等待状态变为 **"Live"** 🟢

### 4.6 获取 Strapi URL

部署成功后，会得到一个 URL，例如：

```
https://strapi.onrender.com
或
https://strapi-xxxx.onrender.com
```

**记录这个 URL**，稍后配置前端时需要。

---

## 5. 配置 Strapi 数据持久化

⚠️ **关键步骤**：否则数据会在重启后丢失！

### 5.1 添加 Persistent Disk

1. 在 Strapi 服务页面，左侧菜单选择 **"Disks"**
2. 点击 **"Add Disk"**
3. 配置：

| 字段 | 值 |
|------|-----|
| **Name** | `strapi-data` |
| **Mount Path** | `/data` |
| **Size** | `1 GB` (可以选更大) |

4. 点击 **"Save"**

### 5.2 等待服务重启

添加 Disk 后，服务会自动重启，等待变为 **"Live"**。

### 5.3 验证数据持久化

1. 访问 `https://your-strapi.onrender.com/admin`
2. 创建管理员账号
3. 在 Render Dashboard 手动重启服务：**"Manual Deploy"** → **"Deploy latest commit"**
4. 再次访问 `/admin`，检查管理员账号是否还在

✅ 如果账号还在，说明数据持久化成功！

---

## 6. 部署 Next.js 前端

### 6.1 创建 Web Service

1. 在 Render Dashboard 点击 **"New +"**
2. 选择 **"Web Service"**
3. 选择**同一个** GitHub 仓库 `kuaikuaichuhai-website`
4. 点击 **"Connect"**

### 6.2 配置 Next.js 服务

| 字段 | 值 |
|------|-----|
| **Name** | `kuaikuaichuhai` (或你喜欢的名字) |
| **Region** | `Oregon (US West)` (与 Strapi 同区域) |
| **Branch** | `main` |
| **Root Directory** | 留空或填 `.` |
| **Runtime** | `Node` |
| **Build Command** | `yarn install && yarn build` |
| **Start Command** | `yarn start` |

### 6.3 选择套餐

同样选择 **Starter** ($7/月) 套餐。

### 6.4 配置环境变量

点击 **"Advanced"** → **"Add Environment Variable"**：

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `NEXT_PUBLIC_STRAPI_URL` | `https://your-strapi.onrender.com` |

⚠️ **重要**：将 `https://your-strapi.onrender.com` 替换为第 4.6 步记录的 Strapi URL。

### 6.5 创建服务

点击 **"Create Web Service"**。

等待构建完成（约 5-10 分钟），状态变为 **"Live"** 🟢

### 6.6 访问网站

访问 Render 提供的 URL，例如：

```
https://kuaikuaichuhai.onrender.com
```

✅ 如果能看到网站首页，说明部署成功！

---

## 7. 配置 Strapi 权限

⚠️ **必须配置**，否则前端无法获取数据！

### 7.1 登录 Strapi 后台

访问 `https://your-strapi.onrender.com/admin`

### 7.2 配置 Public 角色权限

1. 左侧菜单选择 **Settings**（设置）
2. 在 "USERS & PERMISSIONS PLUGIN" 下，选择 **Roles**
3. 点击 **Public** 角色
4. 向下滚动，配置以下权限：

#### Article（文章）

- ✅ `find` - 查找所有文章
- ✅ `findOne` - 查找单个文章

#### Service（服务）

- ✅ `find` - 查找所有服务
- ✅ `findOne` - 查找单个服务

#### Tag（标签）

- ✅ `find` - 查找所有标签
- ✅ `findOne` - 查找单个标签

#### Case（案例）

- ✅ `find` - 查找所有案例
- ✅ `findOne` - 查找单个案例

#### Contact（联系表单）

- ✅ `create` - 创建联系记录

### 7.3 保存配置

点击右上角 **"Save"** 按钮。

### 7.4 验证权限

访问前端网站，检查：

- ✅ 首页是否正常显示
- ✅ 服务页面（/seo, /geo, /social）是否有内容
- ✅ 文章列表（/news）是否显示
- ✅ 联系表单（/contact）是否能提交

---

## 8. 配置图片存储

Render 的文件系统是临时的，上传的图片需要持久化存储。

### 方案一：使用 Persistent Disk（已配置）

如果按第 5 步配置了 Disk，需要让 Strapi 上传到 `/data/uploads`。

#### 8.1 创建启动脚本

在本地项目中创建 `cms/start.sh`：

```bash
#!/bin/bash
set -e

echo "Setting up persistent storage..."

# 创建 uploads 目录
mkdir -p /data/uploads

# 创建符号链接
if [ ! -L "public/uploads" ]; then
  rm -rf public/uploads
  ln -sf /data/uploads public/uploads
  echo "Linked uploads directory to /data/uploads"
fi

echo "Starting Strapi..."
exec yarn start
```

#### 8.2 修改 package.json

编辑 `cms/package.json`，修改 `start` 脚本：

```json
{
  "scripts": {
    "develop": "strapi develop",
    "start": "chmod +x start.sh && ./start.sh",
    "build": "strapi build",
    "strapi": "strapi"
  }
}
```

#### 8.3 提交并重新部署

```bash
git add cms/start.sh cms/package.json
git commit -m "Add persistent uploads storage"
git push origin main
```

Render 会自动检测到更新并重新部署。

---

### 方案二：使用 Cloudinary（推荐）

Cloudinary 提供免费的图片存储和 CDN。

#### 8.4 注册 Cloudinary

1. 访问 [Cloudinary](https://cloudinary.com)
2. 注册免费账号
3. 进入 Dashboard，记录：
   - **Cloud name**
   - **API Key**
   - **API Secret**

#### 8.5 安装 Cloudinary 插件

在本地运行：

```bash
cd cms
yarn add @strapi/provider-upload-cloudinary
```

#### 8.6 配置插件

创建 `cms/config/plugins.ts`（如果已存在则修改）：

```typescript
export default ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
```

#### 8.7 添加环境变量

在 Render 的 Strapi 服务中添加：

| Key | Value |
|-----|-------|
| `CLOUDINARY_NAME` | 你的 Cloud name |
| `CLOUDINARY_KEY` | 你的 API Key |
| `CLOUDINARY_SECRET` | 你的 API Secret |

#### 8.8 提交并部署

```bash
git add cms/config/plugins.ts cms/package.json
git commit -m "Add Cloudinary image storage"
git push origin main
```

#### 8.9 验证

1. 访问 Strapi 后台
2. 上传测试图片
3. 检查 Cloudinary Dashboard，图片应该出现在那里

✅ **推荐使用 Cloudinary**，因为：
- 免费额度 25GB/月
- 自动 CDN 加速
- 图片自动优化
- 无需担心 Disk 空间

---

## 9. 配置自定义域名（可选）

### 9.1 配置 Strapi 域名

#### 在域名提供商添加 DNS 记录

| 类型 | 名称 | 值 |
|------|------|-----|
| CNAME | `api` | `strapi.onrender.com` |

#### 在 Render 添加自定义域名

1. 进入 Strapi 服务页面
2. 左侧菜单选择 **"Settings"**
3. 找到 **"Custom Domain"** 部分
4. 点击 **"Add Custom Domain"**
5. 输入 `api.yourdomain.com`
6. 点击 **"Save"**
7. 等待 DNS 生效（5-60 分钟）

Render 会自动配置免费的 SSL 证书。

### 9.2 配置 Next.js 域名

#### 在域名提供商添加 DNS 记录

| 类型 | 名称 | 值 |
|------|------|-----|
| CNAME | `www` | `kuaikuaichuhai.onrender.com` |
| CNAME | `@` 或留空 | `kuaikuaichuhai.onrender.com` |

#### 在 Render 添加自定义域名

1. 进入 Next.js 服务页面
2. 左侧菜单选择 **"Settings"**
3. 添加 `www.yourdomain.com` 和 `yourdomain.com`

### 9.3 更新 Next.js 环境变量

在 Next.js 服务的环境变量中，更新：

| Key | 新 Value |
|-----|---------|
| `NEXT_PUBLIC_STRAPI_URL` | `https://api.yourdomain.com` |

保存后会自动重新部署。

---

## 10. 更新部署流程

### 10.1 自动部署

Render 默认开启自动部署：

```
Git push → GitHub → Render 自动检测 → 自动部署
```

**工作流程**：

```bash
# 1. 本地修改代码
# 编辑文件...

# 2. 提交并推送
git add .
git commit -m "Update feature"
git push origin main

# 3. Render 自动部署
# 无需手动操作，约 5 分钟后更新完成
```

### 10.2 手动部署

如果需要手动触发部署：

1. 进入服务页面
2. 点击右上角 **"Manual Deploy"**
3. 选择 **"Deploy latest commit"**

### 10.3 查看部署日志

1. 进入服务页面
2. 左侧菜单选择 **"Logs"**
3. 实时查看构建和运行日志

### 10.4 回滚到之前的版本

1. 进入服务页面
2. 左侧菜单选择 **"Events"**
3. 找到想要回滚的部署
4. 点击 **"Rollback to this deploy"**

---

## 11. 常见问题

### 11.1 服务频繁休眠（Free 套餐）

**问题**：Free 套餐 15 分钟无访问会自动休眠。

**解决方案**：
- 升级到 Starter 套餐 ($7/月)
- 或使用定时 Ping 服务（UptimeRobot）

### 11.2 构建失败

**检查**：
1. 查看 Logs 中的错误信息
2. 确认 Root Directory 配置正确
3. 确认 Build Command 正确

**常见错误**：

```bash
# 错误：Module not found
# 解决：确认 package.json 中有该依赖

# 错误：Build timeout
# 解决：优化构建命令，或联系 Render 增加超时时间
```

### 11.3 前端无法获取数据

**检查清单**：
- ✅ Strapi 服务是否正常运行（状态为 Live）
- ✅ `NEXT_PUBLIC_STRAPI_URL` 环境变量是否正确
- ✅ Strapi 权限是否配置（Public 角色）
- ✅ Strapi 后台是否有数据

**测试 API**：
```bash
# 访问以下 URL，应该返回 JSON
https://your-strapi.onrender.com/api/services
https://your-strapi.onrender.com/api/articles
```

### 11.4 图片不显示

**Disk 方案**：
- 检查 `/data/uploads` 目录是否存在
- 检查符号链接是否创建成功
- 查看 Logs 中的启动脚本输出

**Cloudinary 方案**：
- 检查环境变量是否正确
- 访问 Cloudinary Dashboard 确认图片已上传
- 检查 `cms/config/plugins.ts` 配置

### 11.5 数据丢失

**原因**：没有配置 Persistent Disk

**解决**：
1. 按第 5 步配置 Disk
2. 确认 `DATABASE_FILENAME=/data/data.db`
3. 重新创建数据

**预防**：
- 定期导出 Strapi 数据（Settings → Transfer Tokens）
- 使用 Render 的 Database Backup 功能
- 考虑使用 PostgreSQL 替代 SQLite

### 11.6 性能慢

**优化建议**：

1. **启用 CDN**（Cloudinary）
2. **升级套餐**（更多 CPU/内存）
3. **使用 PostgreSQL**（比 SQLite 快）
4. **优化图片**（压缩、WebP 格式）
5. **减少 API 调用**（Next.js ISR 已经优化）

### 11.7 环境变量不生效

**解决**：
1. 确认保存了环境变量
2. 手动触发重新部署（Manual Deploy）
3. 清除浏览器缓存
4. 检查变量名称（区分大小写）

---

## 12. 成本估算

### 12.1 Render 费用

| 服务 | 套餐 | 费用 |
|------|------|------|
| Strapi | Starter | $7/月 |
| Next.js | Starter | $7/月 |
| Persistent Disk (1GB) | - | 包含在套餐内 |
| **总计** | - | **$14/月** |

### 12.2 Cloudinary 费用

| 项目 | 免费额度 | 超出费用 |
|------|---------|---------|
| 存储空间 | 25 GB | $0.18/GB/月 |
| 带宽 | 25 GB/月 | $0.08/GB |
| 转换次数 | 25,000次/月 | $0.0004/次 |

对于中小型网站，**免费额度完全够用**。

### 12.3 总成本

```
Render Starter × 2:  $14/月
Cloudinary Free:     $0/月
域名 (.com):         $60/年 ≈ $5/月
-------------------------
总计:                $19/月

年度总成本:          $228/年
```

---

## 📚 附录

### A. 完整环境变量清单

#### Strapi 服务

```bash
# 基础配置
NODE_ENV=production
HOST=0.0.0.0
PORT=10000

# 数据库
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=/data/data.db

# Strapi 密钥（必须）
APP_KEYS=密钥1,密钥2
API_TOKEN_SALT=密钥3
ADMIN_JWT_SECRET=密钥4
TRANSFER_TOKEN_SALT=密钥5
JWT_SECRET=密钥6

# Cloudinary（可选）
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret
```

#### Next.js 服务

```bash
# 基础配置
NODE_ENV=production

# Strapi API URL
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.onrender.com
```

### B. 项目文件清单

**必须提交到 Git**：
```
✅ cms/package.json
✅ cms/config/
✅ cms/src/
✅ package.json
✅ app/
✅ next.config.mjs
✅ .env.production (可选)
✅ cms/start.sh (如果使用 Disk 存储图片)
```

**不要提交到 Git**（添加到 .gitignore）：
```
❌ .env.local
❌ .env*.local
❌ cms/.tmp/
❌ cms/public/uploads/
❌ node_modules/
❌ .next/
❌ cms/build/
❌ *.db
```

### C. 有用的链接

- [Render 官方文档](https://render.com/docs)
- [Strapi 文档](https://docs.strapi.io)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Cloudinary 文档](https://cloudinary.com/documentation)

---

## ✅ 部署检查清单

完成部署后，检查以下所有项目：

### Strapi 后端
- [ ] 服务状态为 "Live" 🟢
- [ ] 可以访问 `/admin` 并登录
- [ ] Persistent Disk 已配置（1GB+）
- [ ] 环境变量全部配置
- [ ] Public 角色权限已配置
- [ ] 测试上传图片成功
- [ ] 重启服务后数据不丢失

### Next.js 前端
- [ ] 服务状态为 "Live" 🟢
- [ ] 可以访问首页
- [ ] 服务页面（/seo, /geo, /social）显示正常
- [ ] 文章列表（/news）显示文章
- [ ] 文章详情页面可以访问
- [ ] 案例页面（/cases）正常工作
- [ ] 联系表单（/contact）可以提交
- [ ] 图片正常加载

### 数据和内容
- [ ] Strapi 中有测试数据（服务、文章、案例）
- [ ] 前端能正确显示所有数据
- [ ] 图片 URL 正确（Cloudinary 或 Render URL）

### 自动部署
- [ ] Git push 后自动触发部署
- [ ] 查看部署日志无错误
- [ ] 部署完成后网站自动更新

---

## 🎉 完成！

恭喜！你已经成功将快快出海网站部署到 Render。

**下一步**：
1. 📝 在 Strapi 后台添加真实内容
2. 🎨 测试所有功能
3. 🔍 提交网站到搜索引擎（Google Search Console）
4. 📊 配置分析工具（Google Analytics）
5. 🚀 推广你的网站

**需要帮助？**
- 查看 [Render 官方文档](https://render.com/docs)
- 查看 [Strapi 社区](https://forum.strapi.io)
- 查看 [Next.js 文档](https://nextjs.org/docs)

---

**文档版本**: 1.0
**最后更新**: 2025-12-19
**作者**: Claude Code
