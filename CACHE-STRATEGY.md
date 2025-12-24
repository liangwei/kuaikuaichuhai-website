# 缓存策略配置说明

## 📋 问题描述

之前在 Strapi 后台修改文章或 Service 后，前台需要等待 60 秒才能看到更新。这是因为 Next.js 的数据缓存导致的。

## ✅ 已修复

现在已经优化了缓存策略：

### 开发环境
- **不缓存**（`cache: 'no-store'`）
- 每次请求都从 Strapi 获取最新数据
- 修改后立即在前台看到更新

### 生产环境
- **默认：实时更新**（`revalidate: 0`）
- 每次页面请求都会获取最新数据
- 可以通过环境变量自定义缓存时间

## 🔧 配置缓存时间（可选）

如果您的内容不经常更新，可以启用缓存以提高性能。

### 1. 编辑 `.env.local` 或 `.env.production`

```bash
# 不缓存（默认，实时更新）
NEXT_PUBLIC_REVALIDATE_TIME=0

# 缓存 1 分钟
NEXT_PUBLIC_REVALIDATE_TIME=60

# 缓存 5 分钟
NEXT_PUBLIC_REVALIDATE_TIME=300

# 缓存 1 小时
NEXT_PUBLIC_REVALIDATE_TIME=3600
```

### 2. 重启开发服务器

```bash
npm run dev
# 或
yarn dev
```

### 3. 生产环境部署

```bash
# 构建
npm run build

# 启动
npm run start
```

## 🧪 验证缓存配置

### 测试步骤

1. **修改内容**
   - 登录 Strapi 后台 `http://localhost:1337/admin`
   - 修改一篇文章的标题或内容
   - 点击"保存"并"发布"

2. **检查前台**
   - 刷新前台页面（例如 `http://localhost:3000/news`）
   - 查看修改是否立即生效

3. **验证缓存**
   ```bash
   # 开发环境：应该立即看到更新
   # 生产环境：
   #   - REVALIDATE_TIME=0：立即看到更新
   #   - REVALIDATE_TIME=60：最多等待 60 秒
   ```

## 📊 缓存策略对比

| 策略 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| **不缓存** (`revalidate: 0`) | 数据实时更新，修改立即生效 | 每次请求都访问 CMS，性能稍低 | 内容经常更新的网站 |
| **短时间缓存** (60-300秒) | 平衡性能和实时性 | 有短暂延迟 | 每天更新数次的内容 |
| **长时间缓存** (3600秒+) | 性能最优，减少 API 调用 | 更新延迟较长 | 很少更新的静态内容 |

## 🎯 推荐配置

### 开发环境
```bash
# 不需要配置，自动使用 no-store（不缓存）
```

### 生产环境 - 实时更新型网站（推荐）
```bash
NEXT_PUBLIC_REVALIDATE_TIME=0
```

### 生产环境 - 性能优先型网站
```bash
# 内容每小时更新，缓存 5 分钟
NEXT_PUBLIC_REVALIDATE_TIME=300
```

## 🔄 手动清除缓存

如果需要立即清除所有缓存，重启 Next.js 服务器：

```bash
# 开发环境
# Ctrl+C 停止服务器
npm run dev

# 生产环境
pm2 restart nextjs
# 或
npm run build && npm run start
```

## 🚀 性能优化建议

### 1. 使用 CDN
部署到阿里云后，配置 CDN 可以进一步提升性能，CDN 会缓存静态资源。

### 2. 图片优化
- 使用 WebP 格式
- 启用 OSS 图片处理（压缩、裁剪）
- 配置 CDN 缓存图片

### 3. 分级缓存策略
对不同类型的内容使用不同的缓存时间：

```typescript
// 在需要的地方自定义缓存时间
// lib/strapi.ts 中的函数支持传入 revalidate 参数

// 示例：首页数据缓存 5 分钟
const articles = await fetchAPI('/articles', {}, { revalidate: 300 });

// 文章详情实时更新
const article = await fetchAPI('/articles/1', {}, { revalidate: 0 });
```

## 📝 技术细节

### Next.js 缓存机制

Next.js 14+ 使用两种缓存：

1. **Data Cache（数据缓存）**
   - 通过 `fetch()` 的 `next.revalidate` 选项控制
   - 我们的修改主要针对这个

2. **Full Route Cache（路由缓存）**
   - 整个页面的缓存
   - 动态路由默认不缓存

### 缓存流程

```
用户请求页面
    ↓
Next.js 检查 Route Cache
    ↓
执行服务器组件
    ↓
fetch() 检查 Data Cache
    ↓
根据 revalidate 决定：
  - 命中缓存 → 返回缓存数据
  - 过期/不缓存 → 请求 Strapi API
    ↓
渲染页面返回给用户
```

## ❓ 常见问题

### Q1: 修改后还是看不到更新怎么办？

**A:** 按以下步骤检查：

1. 确认 Strapi 后台已保存并发布
2. 清除浏览器缓存（Ctrl+Shift+R 强制刷新）
3. 检查 `.env.local` 中的 `NEXT_PUBLIC_REVALIDATE_TIME`
4. 重启 Next.js 开发服务器
5. 检查浏览器控制台是否有错误

### Q2: 开发环境为什么有时还是有缓存？

**A:** 可能的原因：
- 浏览器缓存（使用强制刷新）
- Next.js 编译缓存（删除 `.next` 文件夹）
- Strapi 数据未真正保存

解决方案：
```bash
# 清除 Next.js 缓存
rm -rf .next

# 重新启动
npm run dev
```

### Q3: 生产环境如何快速更新内容？

**A:** 两种方式：

1. **设置 revalidate=0**（推荐）
   ```bash
   NEXT_PUBLIC_REVALIDATE_TIME=0
   ```

2. **使用 Next.js On-Demand Revalidation**
   - 在 Strapi 中配置 Webhook
   - 内容更新时自动触发 Next.js 重新验证
   - 参考：[Next.js Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation)

### Q4: 缓存会影响 SEO 吗？

**A:** 不会。
- 搜索引擎爬虫每次访问都会获取页面
- `revalidate: 0` 确保内容总是最新的
- 已配置时间因子，百度能正确识别更新时间

### Q5: 如何查看当前的缓存状态？

**A:** 在浏览器开发者工具中：

1. 打开 Network 面板
2. 刷新页面
3. 查看请求头：
   ```
   X-Next-Cache: HIT（命中缓存）
   X-Next-Cache: MISS（未命中，重新获取）
   X-Next-Cache: STALE（缓存过期，后台重新验证）
   ```

## 🔗 相关资源

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [Strapi Documentation](https://docs.strapi.io)

---

**最后更新**: 2024-12-24
**版本**: 1.0
