# 快快出海网站 - 阿里云部署完全指南

本文档提供从零开始在阿里云平台部署快快出海网站的完整步骤。

## 📋 目录

- [1. 项目架构](#1-项目架构)
- [2. 部署方案选择](#2-部署方案选择)
- [3. 前置准备](#3-前置准备)
- [4. 方案一：轻量应用服务器部署（推荐）](#4-方案一轻量应用服务器部署推荐)
- [5. 方案二：ECS + 宝塔面板部署](#5-方案二ecs--宝塔面板部署)
- [6. 配置数据库持久化](#6-配置数据库持久化)
- [7. 配置图片存储（OSS）](#7-配置图片存储oss)
- [8. 配置域名和 SSL](#8-配置域名和-ssl)
- [9. 配置 CDN 加速](#9-配置-cdn-加速)
- [10. 监控和运维](#10-监控和运维)
- [11. 常见问题](#11-常见问题)
- [12. 成本估算](#12-成本估算)

---

## 1. 项目架构

### 1.1 技术栈

```
快快出海网站
├── 前端: Next.js 16 + React 19 + TypeScript + Tailwind CSS
└── 后端: Strapi 5.32.0 CMS + SQLite/MySQL
```

### 1.2 阿里云架构图

```
阿里云
├── 轻量应用服务器/ECS (计算资源)
│   ├── Nginx (反向代理)
│   ├── Next.js 前端 (端口 3000)
│   ├── Strapi 后端 (端口 1337)
│   └── MySQL/SQLite (数据库)
│
├── OSS 对象存储 (图片和静态资源)
├── CDN 内容分发网络 (加速)
└── 域名解析 (DNS)
```

**数据流**：
```
用户 → CDN → Nginx → Next.js 前端 → Strapi API → MySQL 数据库
                                    ↓
                                  OSS (图片)
```

---

## 2. 部署方案选择

### 2.1 方案对比

| 方案 | 适用场景 | 费用 | 难度 | 推荐度 |
|------|---------|------|------|--------|
| **轻量应用服务器** | 中小型项目 | ¥60-300/月 | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **ECS + 宝塔** | 需要更多控制 | ¥100-500/月 | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **函数计算 FC** | 低流量场景 | 按量计费 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **容器服务 ACK** | 大型项目 | ¥300+/月 | ⭐⭐⭐⭐⭐ | ⭐⭐ |

### 2.2 推荐方案

**对于本项目，推荐使用「轻量应用服务器」方案**：
- ✅ 性价比高（¥60-120/月即可满足需求）
- ✅ 配置简单（自带宝塔面板选项）
- ✅ 流量包含（1-5TB/月）
- ✅ 适合中小型网站

---

## 3. 前置准备

### 3.1 注册阿里云账号

1. 访问 [阿里云官网](https://www.aliyun.com)
2. 点击"免费注册"
3. 完成实名认证（个人/企业）

### 3.2 准备域名（可选）

1. 在阿里云购买域名
2. 完成域名实名认证
3. 如果网站面向中国大陆用户，需要进行**ICP备案**（约15-30天）

⚠️ **重要**：
- 使用阿里云服务器 + 绑定域名 = 必须备案
- 仅使用 IP 访问或非大陆用户 = 可以不备案

### 3.3 生成 Strapi 密钥

在本地运行以下命令生成 6 个密钥：

```bash
# Windows PowerShell 或 Mac/Linux 终端
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**运行 6 次**，保存输出结果：

```
密钥1: XHsxnRY9g51QeV0Q4Yg8G5PVmjJucqDEFiQBhzHQ5Xg=
密钥2: IRYVB15QaE2gJYf2y3ko2rI/agsED+oRdKDG+JDw6qk=
密钥3: PjmrAg5jh45O9xUkvvagdZtDc3Y21bRqLAHVa8rU9qA=
密钥4: r9L+gisMJW8ImOYaggwmfMP4q4oBMEkdtz3lGsjkjB4=
密钥5: lK8X8jyVBB+ykYGLYM26dRuBsxEnB7xmpFRkFUXL20Y=
密钥6: ie3XV++wSOapgxLEpKf8Z9SPd0Tl2GPhkT7kv9VuL88=
```

**保存这些密钥**，稍后配置时使用。

---

## 4. 方案一：轻量应用服务器部署（推荐）

### 4.1 购买轻量应用服务器

#### 登录控制台

1. 登录 [阿里云控制台](https://home.console.aliyun.com)
2. 搜索"轻量应用服务器"
3. 点击"创建服务器"

#### 选择配置

| 配置项 | 推荐选择 | 说明 |
|--------|---------|------|
| **地域** | 华东1（杭州）/ 华北2（北京） | 选择离目标用户最近的 |
| **镜像** | 应用镜像 → **宝塔Linux面板** | 自带可视化管理 |
| **套餐** | 2核2G / 2核4G | 2核2G起步即可 |
| **流量包** | 1TB-3TB | 根据预估流量选择 |
| **时长** | 1个月 / 1年 | 年付有折扣 |

#### 价格参考

- **2核2G 3M带宽 60GB存储 1TB流量**：约 **¥60/月**（年付更优惠）
- **2核4G 4M带宽 80GB存储 2TB流量**：约 **¥120/月**

点击"立即购买"并完成支付。

### 4.2 服务器初始化

#### 获取服务器信息

1. 进入"轻量应用服务器控制台"
2. 点击你的服务器实例
3. 在"概览"页面记录：
   - **公网IP**：例如 `47.xxx.xxx.xxx`
   - **宝塔面板地址**：通常是 `http://你的IP:8888`
   - **宝塔初始用户名和密码**（在"应用详情"中查看）

#### 配置安全组（防火墙）

1. 点击左侧菜单"防火墙"
2. 添加以下规则：

| 端口范围 | 协议 | 策略 | 说明 |
|---------|------|------|------|
| 22 | TCP | 允许 | SSH登录 |
| 80 | TCP | 允许 | HTTP |
| 443 | TCP | 允许 | HTTPS |
| 8888 | TCP | 允许 | 宝塔面板 |
| 3000 | TCP | 允许 | Next.js（临时，后面可关闭） |
| 1337 | TCP | 允许 | Strapi（临时，后面可关闭） |

⚠️ **安全提示**：生产环境建议只开放 80、443 端口，其他端口仅在必要时开放。

### 4.3 登录服务器

#### 方式一：使用控制台远程连接

1. 在服务器详情页，点击"远程连接"
2. 选择"立即登录"
3. 输入 root 密码（首次需要重置密码）

#### 方式二：使用 SSH 客户端

```bash
# Windows 使用 PowerShell 或 PuTTY
# Mac/Linux 使用终端
ssh root@你的服务器IP

# 例如：
ssh root@47.xxx.xxx.xxx
```

输入密码登录。

### 4.4 安装 Node.js 和必要软件

#### 更新系统

```bash
# CentOS/Alibaba Cloud Linux
yum update -y

# Ubuntu/Debian
# apt update && apt upgrade -y
```

#### 安装 Node.js 20.x（推荐使用 nvm）

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载配置
source ~/.bashrc

# 安装 Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# 验证安装
node -v  # 应该显示 v20.x.x
npm -v
```

#### 安装 Yarn

```bash
npm install -g yarn
yarn -v
```

#### 安装 PM2（进程管理器）

```bash
npm install -g pm2
pm2 -v
```

#### 安装 Git

```bash
# CentOS/Alibaba Cloud Linux
yum install -y git

# Ubuntu/Debian
# apt install -y git

git --version
```

### 4.5 克隆项目代码

#### 创建项目目录

```bash
# 创建网站根目录
mkdir -p /www/wwwroot
cd /www/wwwroot

# 克隆代码（替换为你的仓库地址）
git clone https://github.com/你的用户名/kuaikuaichuhai-website.git
cd kuaikuaichuhai-website
```

#### 如果仓库是私有的

```bash
# 方式一：使用 HTTPS + Personal Access Token
git clone https://用户名:token@github.com/你的用户名/kuaikuaichuhai-website.git

# 方式二：配置 SSH Key（推荐）
# 1. 生成 SSH Key
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 2. 查看公钥
cat ~/.ssh/id_rsa.pub

# 3. 复制公钥内容，添加到 GitHub：
#    Settings → SSH and GPG keys → New SSH key

# 4. 克隆代码
git clone git@github.com:你的用户名/kuaikuaichuhai-website.git
```

### 4.6 配置 Strapi 后端

#### 进入 CMS 目录

```bash
cd /www/wwwroot/kuaikuaichuhai-website/cms
```

#### 安装依赖

```bash
yarn install
```

#### 创建环境变量文件

```bash
nano .env
# 或使用 vim：vim .env
```

粘贴以下内容（**替换密钥和数据库配置**）：

```bash
# 基础配置
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# 数据库配置（SQLite - 简单方案）
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=./.tmp/data.db

# 数据库配置（MySQL - 推荐用于生产环境）
# DATABASE_CLIENT=mysql
# DATABASE_HOST=127.0.0.1
# DATABASE_PORT=3306
# DATABASE_NAME=strapi
# DATABASE_USERNAME=strapi_user
# DATABASE_PASSWORD=你的数据库密码
# DATABASE_SSL=false

# Strapi 密钥（使用第3步生成的密钥）
APP_KEYS=密钥1,密钥2
API_TOKEN_SALT=密钥3
ADMIN_JWT_SECRET=密钥4
TRANSFER_TOKEN_SALT=密钥5
JWT_SECRET=密钥6

# OSS 配置（稍后配置）
# OSS_REGION=oss-cn-hangzhou
# OSS_ACCESS_KEY_ID=你的AccessKeyId
# OSS_ACCESS_KEY_SECRET=你的AccessKeySecret
# OSS_BUCKET=你的Bucket名称
# OSS_DOMAIN=https://你的Bucket域名
```

保存文件（nano: `Ctrl+O` → `Enter` → `Ctrl+X`，vim: `Esc` → `:wq`）

#### 构建 Strapi

```bash
yarn build
```

#### 使用 PM2 启动 Strapi

```bash
pm2 start yarn --name "strapi" -- start
pm2 save
pm2 startup  # 设置开机自启
```

#### 验证 Strapi 运行

```bash
# 查看进程状态
pm2 status

# 查看日志
pm2 logs strapi

# 测试访问（在服务器上）
curl http://localhost:1337/admin
```

应该返回 HTML 内容。

#### 从浏览器访问

访问 `http://你的服务器IP:1337/admin`

如果能看到 Strapi 管理后台登录页面，说明部署成功！

⚠️ **首次访问**：创建管理员账号。

### 4.7 配置 Next.js 前端

#### 返回项目根目录

```bash
cd /www/wwwroot/kuaikuaichuhai-website
```

#### 安装依赖

```bash
yarn install
```

#### 创建环境变量文件

```bash
nano .env.production
```

粘贴以下内容：

```bash
# 生产环境配置
NODE_ENV=production

# Strapi API URL（如果在同一服务器）
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# 如果配置了域名
# NEXT_PUBLIC_STRAPI_URL=https://api.yourdomain.com
```

保存文件。

#### 构建 Next.js

```bash
yarn build
```

构建过程需要 3-5 分钟，请耐心等待。

#### 使用 PM2 启动 Next.js

```bash
pm2 start yarn --name "nextjs" -- start
pm2 save
```

#### 验证 Next.js 运行

```bash
# 查看进程
pm2 status

# 查看日志
pm2 logs nextjs

# 测试访问
curl http://localhost:3000
```

#### 从浏览器访问

访问 `http://你的服务器IP:3000`

如果能看到网站首页，说明部署成功！

### 4.8 配置 Nginx 反向代理

#### 安装 Nginx

```bash
# CentOS/Alibaba Cloud Linux
yum install -y nginx

# Ubuntu/Debian
# apt install -y nginx

# 启动 Nginx
systemctl start nginx
systemctl enable nginx

# 检查状态
systemctl status nginx
```

#### 创建 Nginx 配置文件

```bash
nano /etc/nginx/conf.d/kuaikuaichuhai.conf
```

粘贴以下配置（**替换域名和IP**）：

```nginx
# Next.js 前端配置
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;  # 替换为你的域名，或使用 IP

    # 日志
    access_log /var/log/nginx/kuaikuaichuhai_access.log;
    error_log /var/log/nginx/kuaikuaichuhai_error.log;

    # Next.js 反向代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Strapi API 配置
server {
    listen 80;
    server_name api.yourdomain.com;  # 替换为你的 API 子域名

    # 日志
    access_log /var/log/nginx/strapi_access.log;
    error_log /var/log/nginx/strapi_error.log;

    # 文件上传大小限制
    client_max_body_size 100M;

    # Strapi 反向代理
    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

⚠️ **如果暂时没有域名**，可以临时使用 IP：

```nginx
server {
    listen 80 default_server;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        # ... 其他配置同上
    }

    # Strapi 使用 /api 路径
    location /api {
        rewrite ^/api(/.*)$ $1 break;
        proxy_pass http://localhost:1337;
        # ... 其他配置同上
    }
}
```

保存文件。

#### 测试并重启 Nginx

```bash
# 测试配置文件语法
nginx -t

# 如果提示 OK，重新加载配置
systemctl reload nginx
```

#### 验证访问

访问 `http://你的服务器IP` 或 `http://yourdomain.com`

应该能看到网站首页（通过 Nginx 代理）。

### 4.9 配置 Strapi 权限

⚠️ **必须配置**，否则前端无法获取数据！

#### 登录 Strapi 后台

访问 `http://你的服务器IP:1337/admin` 或 `http://api.yourdomain.com/admin`

#### 配置 Public 角色权限

1. 左侧菜单选择 **Settings**（设置）
2. 在 "USERS & PERMISSIONS PLUGIN" 下，选择 **Roles**
3. 点击 **Public** 角色
4. 向下滚动，配置以下权限：

**Article（文章）**
- ✅ `find` - 查找所有文章
- ✅ `findOne` - 查找单个文章

**Service（服务）**
- ✅ `find` - 查找所有服务
- ✅ `findOne` - 查找单个服务

**Tag（标签）**
- ✅ `find` - 查找所有标签
- ✅ `findOne` - 查找单个标签

**Case（案例）**
- ✅ `find` - 查找所有案例
- ✅ `findOne` - 查找单个案例

**Contact（联系表单）**
- ✅ `create` - 创建联系记录

#### 保存配置

点击右上角 **"Save"** 按钮。

#### 验证权限

在浏览器访问 API：

```
http://api.yourdomain.com/api/services
http://api.yourdomain.com/api/articles
```

应该返回 JSON 数据（或空数组）。

### 4.10 PM2 常用命令

```bash
# 查看所有进程
pm2 list
pm2 status

# 查看日志
pm2 logs              # 所有进程
pm2 logs strapi       # Strapi 日志
pm2 logs nextjs       # Next.js 日志

# 重启服务
pm2 restart strapi
pm2 restart nextjs
pm2 restart all

# 停止服务
pm2 stop strapi
pm2 stop nextjs

# 删除进程
pm2 delete strapi
pm2 delete nextjs

# 监控
pm2 monit

# 保存进程列表（重启后自动恢复）
pm2 save

# 清空日志
pm2 flush
```

---

## 5. 方案二：ECS + 宝塔面板部署

### 5.1 购买 ECS 云服务器

1. 登录 [阿里云 ECS 控制台](https://ecs.console.aliyun.com)
2. 点击"创建实例"

#### 配置选择

| 配置项 | 推荐选择 |
|--------|---------|
| **付费模式** | 按量付费 / 包年包月 |
| **地域** | 华东1（杭州）/ 华北2（北京） |
| **实例规格** | ecs.t6-c1m2.large（2核2G）起 |
| **镜像** | CentOS 7.9 / Alibaba Cloud Linux 3 |
| **存储** | 高效云盘 40GB+ |
| **网络** | 按使用流量 / 按固定带宽（3M起） |

#### 价格参考

- **2核2G 3M带宽 40GB**：约 **¥100/月**（包年包月更优惠）
- **2核4G 5M带宽 60GB**：约 **¥200/月**

#### 配置安全组

添加入方向规则：

| 端口 | 协议 | 说明 |
|------|------|------|
| 22 | TCP | SSH |
| 80 | TCP | HTTP |
| 443 | TCP | HTTPS |
| 8888 | TCP | 宝塔面板 |

### 5.2 安装宝塔面板

#### 登录服务器

```bash
ssh root@你的ECS公网IP
```

#### 安装宝塔 Linux 面板

```bash
# CentOS 安装命令
yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec

# Ubuntu/Debian 安装命令
# wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
```

安装过程约 5-10 分钟，最后会显示：

```
==================================================================
Congratulations! Installed successfully!
==================================================================
外网面板地址: http://你的IP:8888/xxxxxxxx
内网面板地址: http://172.x.x.x:8888/xxxxxxxx
username: xxxxxxx
password: xxxxxxx
If you cannot access the panel,
release the following panel port [8888] in the security group
==================================================================
```

**记录**宝塔面板地址、用户名和密码。

#### 登录宝塔面板

1. 访问宝塔面板地址（例如 `http://你的IP:8888/xxxxxxxx`）
2. 输入用户名和密码登录
3. 首次登录会提示安装 LNMP 套件（Linux + Nginx + MySQL + PHP）

#### 安装软件

在宝塔面板首页，安装以下软件：

| 软件 | 版本 | 说明 |
|------|------|------|
| **Nginx** | 1.22+ | Web 服务器 |
| **MySQL** | 5.7 / 8.0 | 数据库（如果不用 SQLite） |
| **PM2** | 最新版 | Node.js 进程管理器 |

点击"一键安装"，等待完成（约 10-20 分钟）。

### 5.3 通过宝塔部署项目

#### 创建网站

1. 左侧菜单 → **网站** → **添加站点**
2. 配置：
   - **域名**：`yourdomain.com`（或留空使用 IP）
   - **根目录**：`/www/wwwroot/kuaikuaichuhai`
   - **PHP版本**：纯静态
   - **数据库**：不创建（或创建 MySQL）
3. 点击"提交"

#### 上传代码

方式一：使用宝塔文件管理器
1. 左侧菜单 → **文件**
2. 进入 `/www/wwwroot/kuaikuaichuhai`
3. 上传压缩包 → 解压

方式二：使用 Git（推荐）
```bash
# 在服务器终端
cd /www/wwwroot
git clone https://github.com/你的用户名/kuaikuaichuhai-website.git kuaikuaichuhai
```

#### 安装 Node.js

1. 左侧菜单 → **软件商店** → 搜索 "Node"
2. 安装 **Node.js 版本管理器**
3. 安装 Node.js 20.x

#### 部署 Strapi

在宝塔终端（或 SSH）：

```bash
cd /www/wwwroot/kuaikuaichuhai/cms
yarn install
# 创建 .env 文件（同方案一）
yarn build
pm2 start yarn --name "strapi" -- start
pm2 save
```

#### 部署 Next.js

```bash
cd /www/wwwroot/kuaikuaichuhai
yarn install
# 创建 .env.production 文件（同方案一）
yarn build
pm2 start yarn --name "nextjs" -- start
pm2 save
```

#### 配置 Nginx（通过宝塔）

1. 左侧菜单 → **网站** → 点击你的站点 → **设置**
2. 选择 **配置文件**
3. 替换为以下内容（参考方案一的 Nginx 配置）
4. 点击"保存"

宝塔会自动重载 Nginx。

---

## 6. 配置数据库持久化

### 6.1 使用 SQLite（简单方案）

SQLite 数据存储在文件中，只需确保文件路径正确：

```bash
# 在 .env 中配置
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=./.tmp/data.db
```

数据文件位置：`/www/wwwroot/kuaikuaichuhai/cms/.tmp/data.db`

#### 定期备份

创建备份脚本 `/root/backup-strapi.sh`：

```bash
#!/bin/bash
# 备份 Strapi 数据库
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/root/backups/strapi
mkdir -p $BACKUP_DIR

# 复制数据库文件
cp /www/wwwroot/kuaikuaichuhai/cms/.tmp/data.db $BACKUP_DIR/data_$DATE.db

# 压缩备份
tar -czf $BACKUP_DIR/strapi_backup_$DATE.tar.gz -C /www/wwwroot/kuaikuaichuhai/cms .tmp public/uploads

# 删除 30 天前的备份
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_DIR/strapi_backup_$DATE.tar.gz"
```

设置定时任务：

```bash
chmod +x /root/backup-strapi.sh

# 添加到 crontab（每天凌晨 2 点备份）
crontab -e
# 添加以下行：
0 2 * * * /root/backup-strapi.sh >> /var/log/strapi-backup.log 2>&1
```

### 6.2 使用 MySQL（推荐生产环境）

#### 安装 MySQL

```bash
# CentOS
yum install -y mysql-server
systemctl start mysqld
systemctl enable mysqld

# 或通过宝塔面板安装 MySQL 5.7/8.0
```

#### 创建数据库和用户

```bash
# 登录 MySQL
mysql -u root -p

# 创建数据库
CREATE DATABASE strapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建用户
CREATE USER 'strapi_user'@'localhost' IDENTIFIED BY '你的密码';

# 授权
GRANT ALL PRIVILEGES ON strapi.* TO 'strapi_user'@'localhost';
FLUSH PRIVILEGES;

EXIT;
```

#### 安装 MySQL 驱动

```bash
cd /www/wwwroot/kuaikuaichuhai/cms
yarn add mysql2
```

#### 修改 .env 配置

```bash
DATABASE_CLIENT=mysql
DATABASE_HOST=127.0.0.1
DATABASE_PORT=3306
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=你的密码
DATABASE_SSL=false
```

#### 重启 Strapi

```bash
pm2 restart strapi
pm2 logs strapi  # 查看日志，确认连接成功
```

#### MySQL 备份

使用宝塔面板的数据库定时备份功能，或创建脚本：

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/root/backups/mysql
mkdir -p $BACKUP_DIR

mysqldump -u strapi_user -p你的密码 strapi > $BACKUP_DIR/strapi_$DATE.sql
gzip $BACKUP_DIR/strapi_$DATE.sql

# 删除 30 天前的备份
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

---

## 7. 配置图片存储（OSS）

使用阿里云 OSS 存储图片，实现：
- ✅ 持久化存储（不受服务器重启影响）
- ✅ CDN 加速
- ✅ 无限扩展

### 7.1 创建 OSS Bucket

#### 开通 OSS 服务

1. 登录 [阿里云 OSS 控制台](https://oss.console.aliyun.com)
2. 点击"立即开通"（如果未开通）

#### 创建 Bucket

1. 点击"创建 Bucket"
2. 配置：

| 配置项 | 选择 |
|--------|------|
| **Bucket 名称** | `kuaikuaichuhai-uploads`（全局唯一） |
| **地域** | 与服务器同地域（如华东1杭州） |
| **存储类型** | 标准存储 |
| **读写权限** | 公共读 |
| **版本控制** | 不开启 |
| **服务端加密** | 不加密 |

3. 点击"确定"

### 7.2 配置跨域（CORS）

1. 进入 Bucket 详情页
2. 左侧菜单 → **权限管理** → **跨域设置**
3. 点击"创建规则"：

| 配置项 | 值 |
|--------|-----|
| **来源** | `*` 或 `https://yourdomain.com` |
| **允许Methods** | GET, POST, PUT, DELETE, HEAD |
| **允许Headers** | `*` |
| **暴露Headers** | `ETag, x-oss-request-id` |

4. 点击"确定"

### 7.3 创建 AccessKey

⚠️ **安全警告**：AccessKey 拥有账号所有权限，请妥善保管！

1. 点击右上角头像 → **AccessKey 管理**
2. 选择"使用子用户 AccessKey"（推荐）

#### 创建 RAM 子用户（推荐）

1. 访问 [RAM 控制台](https://ram.console.aliyun.com)
2. 左侧菜单 → **用户** → **创建用户**
3. 配置：
   - **登录名称**：`oss-strapi`
   - **访问方式**：✅ OpenAPI 调用访问
4. 点击"确定"，保存 **AccessKey ID** 和 **AccessKey Secret**

#### 授权子用户

1. 点击用户名 → **权限管理** → **新增授权**
2. 选择权限：**AliyunOSSFullAccess**（OSS 完全访问）
3. 点击"确定"

### 7.4 安装 Strapi OSS 插件

#### 安装依赖

```bash
cd /www/wwwroot/kuaikuaichuhai/cms
yarn add @strapi/provider-upload-ali-oss
```

#### 配置插件

创建/编辑 `cms/config/plugins.ts`：

```typescript
export default ({ env }) => ({
  upload: {
    config: {
      provider: 'ali-oss',
      providerOptions: {
        accessKeyId: env('OSS_ACCESS_KEY_ID'),
        accessKeySecret: env('OSS_ACCESS_KEY_SECRET'),
        region: env('OSS_REGION'), // 例如：oss-cn-hangzhou
        bucket: env('OSS_BUCKET'),   // 例如：kuaikuaichuhai-uploads
      },
      actionOptions: {
        upload: {
          // 自定义上传路径
          path: 'uploads',
        },
        uploadStream: {},
        delete: {},
      },
    },
  },
});
```

#### 修改 .env 配置

在 `cms/.env` 中添加：

```bash
# OSS 配置
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=你的AccessKeyId
OSS_ACCESS_KEY_SECRET=你的AccessKeySecret
OSS_BUCKET=kuaikuaichuhai-uploads
```

⚠️ **重要**：
- `OSS_REGION` 格式：`oss-cn-hangzhou`（不含 http://）
- `OSS_BUCKET` 为你创建的 Bucket 名称

#### 重启 Strapi

```bash
pm2 restart strapi
pm2 logs strapi  # 查看日志，确认配置成功
```

### 7.5 测试图片上传

1. 访问 Strapi 后台 `http://api.yourdomain.com/admin`
2. 左侧菜单 → **Media Library**
3. 点击"上传"，选择一张图片
4. 上传成功后，点击图片查看 URL

应该是 OSS 的 URL，例如：
```
https://kuaikuaichuhai-uploads.oss-cn-hangzhou.aliyuncs.com/uploads/xxx.jpg
```

✅ 如果能正常显示，说明 OSS 配置成功！

### 7.6 配置自定义域名（可选）

#### 绑定域名到 Bucket

1. 在 OSS Bucket 详情页
2. 左侧菜单 → **域名管理** → **绑定域名**
3. 输入域名：`cdn.yourdomain.com`
4. 开启 **自动添加 CNAME 记录**
5. 点击"提交"

#### 配置 SSL 证书

1. 在 **域名管理** → 点击域名 → **证书托管**
2. 上传 SSL 证书或使用阿里云免费证书
3. 开启 **HTTPS**

#### 修改 Strapi 配置

在 `cms/config/plugins.ts` 中添加：

```typescript
providerOptions: {
  // ... 其他配置
  domain: 'https://cdn.yourdomain.com',  // 自定义域名
},
```

重启 Strapi 后，图片 URL 会使用自定义域名。

---

## 8. 配置域名和 SSL

### 8.1 配置域名解析

#### 登录域名控制台

1. 访问 [阿里云域名控制台](https://dc.console.aliyun.com)
2. 点击你的域名 → **解析**

#### 添加解析记录

| 记录类型 | 主机记录 | 记录值 | 说明 |
|---------|---------|--------|------|
| A | @ | 你的服务器IP | 主域名 |
| A | www | 你的服务器IP | www子域名 |
| A | api | 你的服务器IP | API子域名 |
| CNAME | cdn | xxx.oss-cn-hangzhou.aliyuncs.com | CDN（OSS） |

⚠️ **如果使用了 CDN**，A 记录应该改为 CNAME 指向 CDN 域名。

#### 验证解析

```bash
# 在本地电脑运行
ping yourdomain.com
ping www.yourdomain.com
ping api.yourdomain.com
```

应该能 ping 通你的服务器 IP。

### 8.2 申请 SSL 证书

#### 方式一：使用阿里云免费证书（推荐）

1. 访问 [SSL 证书控制台](https://yundun.console.aliyun.com/?p=cas)
2. 点击"购买证书"
3. 选择 **DV 单域名证书（免费）**
4. 数量选择 **20** 张（每个域名一张）
5. 点击"立即购买"（免费）

#### 申请证书

1. 在证书列表，点击"创建证书"
2. 填写：
   - **证书绑定域名**：`yourdomain.com`
   - **域名验证方式**：自动 DNS 验证（推荐）
3. 点击"提交审核"
4. 等待签发（通常 5-30 分钟）

重复以上步骤，为 `www.yourdomain.com` 和 `api.yourdomain.com` 申请证书。

#### 下载证书

1. 证书签发后，点击"下载"
2. 选择 **Nginx** 类型
3. 下载 ZIP 文件，解压得到：
   - `xxx.pem`（证书文件）
   - `xxx.key`（私钥文件）

#### 方式二：使用 Let's Encrypt 免费证书

使用 Certbot 自动申请和续期（推荐自动化）：

```bash
# 安装 Certbot
yum install -y certbot python3-certbot-nginx

# 自动配置 Nginx + SSL
certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# 按提示输入邮箱，同意协议

# 自动续期（每天检查）
echo "0 0 * * * certbot renew --quiet" | crontab -
```

Certbot 会自动：
- 申请证书
- 配置 Nginx
- 设置自动续期（证书 90 天有效期）

### 8.3 配置 Nginx SSL

#### 上传证书文件

```bash
# 创建证书目录
mkdir -p /etc/nginx/ssl

# 上传证书文件（使用 SCP 或宝塔文件管理）
# 例如：
# scp xxx.pem root@你的IP:/etc/nginx/ssl/
# scp xxx.key root@你的IP:/etc/nginx/ssl/

# 设置权限
chmod 600 /etc/nginx/ssl/*.key
```

#### 修改 Nginx 配置

编辑 `/etc/nginx/conf.d/kuaikuaichuhai.conf`：

```nginx
# HTTP 自动跳转 HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS - Next.js 前端
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL 证书
    ssl_certificate /etc/nginx/ssl/yourdomain.com.pem;
    ssl_certificate_key /etc/nginx/ssl/yourdomain.com.key;

    # SSL 优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # 日志
    access_log /var/log/nginx/kuaikuaichuhai_ssl_access.log;
    error_log /var/log/nginx/kuaikuaichuhai_ssl_error.log;

    # Next.js 反向代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTP 自动跳转 HTTPS - API
server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS - Strapi API
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    # SSL 证书
    ssl_certificate /etc/nginx/ssl/api.yourdomain.com.pem;
    ssl_certificate_key /etc/nginx/ssl/api.yourdomain.com.key;

    # SSL 配置（同上）
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # 文件上传大小限制
    client_max_body_size 100M;

    # 日志
    access_log /var/log/nginx/strapi_ssl_access.log;
    error_log /var/log/nginx/strapi_ssl_error.log;

    # Strapi 反向代理
    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 测试并重启 Nginx

```bash
nginx -t
systemctl reload nginx
```

#### 更新环境变量

修改 `cms/.env`：

```bash
# Strapi URL（使用 HTTPS）
NEXT_PUBLIC_STRAPI_URL=https://api.yourdomain.com
```

修改 `.env.production`：

```bash
NEXT_PUBLIC_STRAPI_URL=https://api.yourdomain.com
```

#### 重新构建和重启

```bash
# 重新构建 Next.js
cd /www/wwwroot/kuaikuaichuhai
yarn build
pm2 restart nextjs

# 重启 Strapi
pm2 restart strapi
```

#### 验证 HTTPS

访问 `https://yourdomain.com` 和 `https://api.yourdomain.com`

浏览器地址栏应该显示锁图标 🔒

---

## 9. 配置 CDN 加速

使用阿里云 CDN 加速网站访问速度。

### 9.1 开通 CDN 服务

1. 访问 [阿里云 CDN 控制台](https://cdn.console.aliyun.com)
2. 点击"立即开通"

### 9.2 添加加速域名

#### 配置 CDN

1. 点击"添加域名"
2. 配置：

| 配置项 | 值 | 说明 |
|--------|-----|------|
| **加速域名** | `www.yourdomain.com` | 前端网站 |
| **业务类型** | 全站加速 | 动态+静态内容 |
| **源站信息** | 源站域名：`yourdomain.com` | 你的服务器 |
| **端口** | 443（HTTPS） | |
| **回源协议** | 跟随请求协议 | |

3. 点击"下一步"

#### 配置 HTTPS

1. 上传 SSL 证书（或选择已有证书）
2. 开启 **强制跳转 HTTPS**
3. 点击"确定"

#### 修改 DNS 解析

1. 回到域名解析控制台
2. 修改 `www` 记录：
   - 类型：CNAME
   - 值：CDN 提供的 CNAME 域名（例如 `xxx.w.kunlunsl.com`）

### 9.3 配置缓存规则

1. 在 CDN 域名详情页
2. 左侧菜单 → **缓存配置** → **缓存过期时间**
3. 添加规则：

| 目录/文件类型 | 过期时间 | 说明 |
|--------------|---------|------|
| `/_next/static/` | 1 年 | Next.js 静态资源（有哈希） |
| `.js .css` | 7 天 | 脚本和样式 |
| `.jpg .png .gif .webp` | 30 天 | 图片 |
| `/api/` | 不缓存 | API 接口 |
| `/` | 10 分钟 | HTML 页面 |

### 9.4 配置性能优化

#### 开启 GZIP 压缩

1. 左侧菜单 → **性能优化** → **智能压缩**
2. 开启 **GZIP 压缩**

#### 开启 Brotli 压缩

如果支持，开启 Brotli（比 GZIP 压缩率更高）

#### 开启 HTTP/2

在 **HTTPS 配置** 中开启 HTTP/2

### 9.5 验证 CDN

```bash
# 查询域名 CNAME
nslookup www.yourdomain.com

# 应该返回 CDN 的 CNAME
```

访问网站，检查响应头：

```
X-Cache: HIT  # 表示命中 CDN 缓存
```

---

## 10. 监控和运维

### 10.1 配置日志轮转

防止日志文件占满磁盘。

#### Nginx 日志轮转

编辑 `/etc/logrotate.d/nginx`：

```
/var/log/nginx/*.log {
    daily
    rotate 30
    missingok
    notifempty
    compress
    delaycompress
    sharedscripts
    postrotate
        if [ -f /var/run/nginx.pid ]; then
            kill -USR1 `cat /var/run/nginx.pid`
        fi
    endscript
}
```

#### PM2 日志管理

```bash
# 安装日志轮转模块
pm2 install pm2-logrotate

# 配置每天轮转，保留 30 天
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true
```

### 10.2 配置监控告警

#### 使用阿里云云监控

1. 访问 [云监控控制台](https://cloudmonitor.console.aliyun.com)
2. 左侧菜单 → **主机监控**
3. 安装监控插件（轻量应用服务器默认已安装）

#### 配置告警规则

1. 左侧菜单 → **报警服务** → **报警规则**
2. 创建规则：

| 监控项 | 阈值 | 通知方式 |
|--------|------|---------|
| CPU 使用率 | > 80% 持续 5 分钟 | 短信 + 邮件 |
| 内存使用率 | > 85% 持续 5 分钟 | 短信 + 邮件 |
| 磁盘使用率 | > 80% | 邮件 |
| 公网出带宽 | > 80% | 邮件 |

#### 监控网站可用性

使用阿里云"云拨测"服务：

1. 左侧菜单 → **新版云拨测** → **创建任务**
2. 配置：
   - 任务类型：HTTP(S)
   - 监控 URL：`https://yourdomain.com`
   - 拨测频率：5 分钟
   - 拨测点：国内主要城市（3-5个）

3. 配置告警：网站不可用时发送通知

### 10.3 安全加固

#### 修改 SSH 端口（可选）

```bash
# 编辑 SSH 配置
nano /etc/ssh/sshd_config

# 修改端口（例如改为 2222）
Port 2222

# 禁止 root 直接登录（推荐创建普通用户）
PermitRootLogin no

# 禁用密码登录，只允许密钥登录
PasswordAuthentication no

# 重启 SSH
systemctl restart sshd
```

⚠️ **重要**：修改前确保已配置 SSH 密钥，否则可能无法登录！

#### 配置防火墙

```bash
# 安装 firewalld
yum install -y firewalld
systemctl start firewalld
systemctl enable firewalld

# 允许端口
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --permanent --add-port=2222/tcp  # 新的 SSH 端口

# 重新加载
firewall-cmd --reload

# 查看规则
firewall-cmd --list-all
```

#### 配置 Fail2Ban（防暴力破解）

```bash
# 安装 Fail2Ban
yum install -y epel-release
yum install -y fail2ban

# 创建配置
cat > /etc/fail2ban/jail.local <<EOF
[sshd]
enabled = true
port = 2222
maxretry = 3
bantime = 3600
findtime = 600
EOF

# 启动服务
systemctl start fail2ban
systemctl enable fail2ban

# 查看状态
fail2ban-client status sshd
```

#### 定期更新系统

```bash
# 手动更新
yum update -y

# 或配置自动更新（CentOS）
yum install -y yum-cron
systemctl start yum-cron
systemctl enable yum-cron
```

### 10.4 备份策略

#### 自动备份脚本

创建 `/root/auto-backup.sh`：

```bash
#!/bin/bash
# 自动备份网站数据

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_ROOT=/root/backups
PROJECT_DIR=/www/wwwroot/kuaikuaichuhai

# 创建备份目录
mkdir -p $BACKUP_ROOT/{code,database,uploads}

echo "========================================"
echo "Backup started at $(date)"
echo "========================================"

# 1. 备份代码（排除 node_modules）
echo "Backing up code..."
tar --exclude='node_modules' --exclude='.next' --exclude='cms/build' \
    -czf $BACKUP_ROOT/code/code_$DATE.tar.gz -C /www/wwwroot kuaikuaichuhai

# 2. 备份数据库
echo "Backing up database..."
if [ -f "$PROJECT_DIR/cms/.tmp/data.db" ]; then
    # SQLite
    cp $PROJECT_DIR/cms/.tmp/data.db $BACKUP_ROOT/database/data_$DATE.db
    gzip $BACKUP_ROOT/database/data_$DATE.db
else
    # MySQL
    mysqldump -u strapi_user -p你的密码 strapi | gzip > $BACKUP_ROOT/database/mysql_$DATE.sql.gz
fi

# 3. 备份上传的文件（如果没用 OSS）
if [ -d "$PROJECT_DIR/cms/public/uploads" ]; then
    echo "Backing up uploads..."
    tar -czf $BACKUP_ROOT/uploads/uploads_$DATE.tar.gz -C $PROJECT_DIR/cms/public uploads
fi

# 4. 清理旧备份（保留 30 天）
echo "Cleaning old backups..."
find $BACKUP_ROOT -type f -mtime +30 -delete

# 5. 上传到 OSS（可选）
# 需要安装 ossutil：https://help.aliyun.com/document_detail/120075.html
# ossutil cp -r $BACKUP_ROOT oss://your-backup-bucket/backups/$DATE/

echo "========================================"
echo "Backup completed at $(date)"
echo "Backup size:"
du -sh $BACKUP_ROOT
echo "========================================"
```

#### 设置定时任务

```bash
chmod +x /root/auto-backup.sh

# 添加到 crontab（每天凌晨 3 点执行）
crontab -e

# 添加：
0 3 * * * /root/auto-backup.sh >> /var/log/auto-backup.log 2>&1
```

---

## 11. 常见问题

### 11.1 服务器连接不上

**检查清单**：
- ✅ 安全组/防火墙是否开放端口
- ✅ 服务器 IP 是否正确
- ✅ SSH 端口是否修改过
- ✅ 是否配置了密钥登录

**解决方案**：
```bash
# 通过阿里云控制台"远程连接"功能登录
# 检查防火墙状态
systemctl status firewalld
firewall-cmd --list-all

# 临时关闭防火墙（测试用）
systemctl stop firewalld
```

### 11.2 Node.js 进程频繁重启

**原因**：
- 内存不足（OOM）
- 代码错误导致崩溃

**查看日志**：
```bash
pm2 logs --lines 100
```

**解决方案**：
```bash
# 增加内存限制
pm2 delete nextjs
pm2 start yarn --name "nextjs" --max-memory-restart 1G -- start

# 或升级服务器配置（增加内存）
```

### 11.3 网站访问慢

**排查步骤**：

1. **测试服务器性能**：
```bash
# CPU 和内存
top

# 磁盘 IO
iostat -x 1

# 网络
iftop
```

2. **检查 CDN 是否生效**：
```bash
curl -I https://www.yourdomain.com
# 查看 X-Cache 头
```

3. **优化建议**：
- 开启 CDN
- 启用 Gzip/Brotli 压缩
- 优化图片（使用 WebP、压缩）
- 使用 MySQL 替代 SQLite（大数据量时）
- 升级服务器配置（增加带宽）

### 11.4 SSL 证书过期

**Let's Encrypt 证书**（90天有效期）：
```bash
# 手动续期
certbot renew

# 查看自动续期任务
crontab -l
```

**阿里云免费证书**（1年有效期）：
- 到期前重新申请
- 下载并替换证书文件
- 重新加载 Nginx

### 11.5 数据库连接失败

**SQLite 错误**：
```bash
# 检查文件权限
ls -la /www/wwwroot/kuaikuaichuhai/cms/.tmp/data.db

# 修复权限
chown -R root:root /www/wwwroot/kuaikuaichuhai/cms/.tmp
chmod -R 755 /www/wwwroot/kuaikuaichuhai/cms/.tmp
```

**MySQL 错误**：
```bash
# 检查 MySQL 是否运行
systemctl status mysqld

# 测试连接
mysql -u strapi_user -p -h 127.0.0.1

# 查看错误日志
tail -f /var/log/mysqld.log
```

### 11.6 图片上传失败

**OSS 配置错误**：
```bash
# 检查 Strapi 日志
pm2 logs strapi --lines 50

# 常见错误：
# - AccessKey 错误
# - Region 格式错误（应该是 oss-cn-hangzhou，不是 cn-hangzhou）
# - Bucket 名称错误
# - CORS 未配置
```

**验证 OSS 配置**：
```bash
# 安装 ossutil
wget http://gosspublic.alicdn.com/ossutil/1.7.15/ossutil64
chmod +x ossutil64
sudo mv ossutil64 /usr/local/bin/ossutil

# 配置
ossutil config

# 测试上传
echo "test" > test.txt
ossutil cp test.txt oss://your-bucket/test.txt
```

### 11.7 端口被占用

```bash
# 查看端口占用
lsof -i :3000
lsof -i :1337

# 杀死进程
kill -9 <PID>

# 或使用 PM2 管理
pm2 delete all
pm2 start ...
```

---

## 12. 成本估算

### 12.1 轻量应用服务器方案

| 项目 | 配置 | 费用 |
|------|------|------|
| **轻量应用服务器** | 2核2G 3M 60GB 1TB流量 | ¥60/月 |
| **OSS 存储** | 10GB 存储 + 10GB 流量 | ¥3/月 |
| **CDN** | 100GB 流量 | ¥20/月 |
| **域名** | .com 域名 | ¥69/年 ≈ ¥6/月 |
| **SSL 证书** | DV 单域名（免费） | ¥0 |
| **备案** | ICP 备案（如需要） | ¥0 |
| **总计** | | **¥89/月** |

### 12.2 ECS 方案

| 项目 | 配置 | 费用 |
|------|------|------|
| **ECS 云服务器** | 2核4G 3M 40GB | ¥120/月 |
| **云盘快照** | 按量备份 | ¥10/月 |
| **OSS 存储** | 同上 | ¥3/月 |
| **CDN** | 同上 | ¥20/月 |
| **域名 + SSL** | 同上 | ¥6/月 |
| **总计** | | **¥159/月** |

### 12.3 成本优化建议

#### 节省费用技巧

1. **年付优惠**：
   - 轻量应用服务器年付约 **8-9 折**
   - ECS 年付或 3 年付更优惠

2. **资源包**：
   - OSS 购买资源包（存储包 + 流量包）更便宜
   - CDN 购买流量包

3. **闲时释放**：
   - 如果是测试环境，可以按量付费 + 闲时关机

4. **合理配置**：
   - 初期使用 2核2G，流量增长后再升级
   - SQLite 够用就不用 MySQL（省去数据库费用）

#### OSS 费用详细

| 项目 | 免费额度 | 超出费用 |
|------|---------|---------|
| **标准存储** | 无 | ¥0.12/GB/月 |
| **外网流出流量** | 无 | ¥0.25-0.50/GB |
| **请求次数** | 无 | PUT: ¥0.01/万次, GET: ¥0.01/万次 |

**示例**：
- 10GB 图片存储：¥1.2/月
- 10GB 流量：¥2.5-5/月
- 总计：约 **¥3-6/月**

#### CDN 费用详细

| 流量 | 单价 | 月费（估算） |
|------|------|------------|
| 0-10TB | ¥0.24/GB | 100GB ≈ ¥24 |
| 10-50TB | ¥0.23/GB | |
| 50-100TB | ¥0.22/GB | |

**优化**：
- 购买 CDN 流量包（500GB ≈ ¥90，比按量便宜 60%）
- 图片压缩、WebP 格式减少流量
- 配置合理的缓存策略

### 12.4 月成本对比

| 方案 | 月成本 | 年成本 | 适用场景 |
|------|-------|-------|---------|
| **轻量应用服务器** | ¥89 | ¥1068 | 中小型网站 ⭐推荐 |
| **ECS + MySQL** | ¥159 | ¥1908 | 需要更多控制 |
| **函数计算（Serverless）** | ¥50-200 | ¥600-2400 | 低流量/不稳定流量 |

---

## 📚 附录

### A. 完整环境变量清单

#### Strapi 服务 (`cms/.env`)

```bash
# 基础配置
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# 数据库配置（SQLite）
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=./.tmp/data.db

# 数据库配置（MySQL）
# DATABASE_CLIENT=mysql
# DATABASE_HOST=127.0.0.1
# DATABASE_PORT=3306
# DATABASE_NAME=strapi
# DATABASE_USERNAME=strapi_user
# DATABASE_PASSWORD=你的密码
# DATABASE_SSL=false

# Strapi 密钥（必须）
APP_KEYS=密钥1,密钥2
API_TOKEN_SALT=密钥3
ADMIN_JWT_SECRET=密钥4
TRANSFER_TOKEN_SALT=密钥5
JWT_SECRET=密钥6

# OSS 配置
OSS_REGION=oss-cn-hangzhou
OSS_ACCESS_KEY_ID=你的AccessKeyId
OSS_ACCESS_KEY_SECRET=你的AccessKeySecret
OSS_BUCKET=kuaikuaichuhai-uploads
```

#### Next.js 服务 (`.env.production`)

```bash
# 生产环境配置
NODE_ENV=production

# Strapi API URL
NEXT_PUBLIC_STRAPI_URL=https://api.yourdomain.com
```

### B. Nginx 完整配置示例

保存为 `/etc/nginx/conf.d/kuaikuaichuhai.conf`：

```nginx
# Gzip 压缩配置
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
gzip_disable "msie6";

# HTTP 自动跳转 HTTPS - 主站
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://www.$host$request_uri;
}

# HTTPS - Next.js 前端
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL 证书
    ssl_certificate /etc/nginx/ssl/yourdomain.com.pem;
    ssl_certificate_key /etc/nginx/ssl/yourdomain.com.key;

    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # HSTS (可选，启用后必须保持 HTTPS)
    # add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # 日志
    access_log /var/log/nginx/kuaikuaichuhai_ssl_access.log;
    error_log /var/log/nginx/kuaikuaichuhai_ssl_error.log;

    # Next.js 反向代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 静态资源缓存（Next.js）
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 图片缓存
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://localhost:3000;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}

# HTTP 自动跳转 HTTPS - API
server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$host$request_uri;
}

# HTTPS - Strapi API
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    # SSL 证书
    ssl_certificate /etc/nginx/ssl/api.yourdomain.com.pem;
    ssl_certificate_key /etc/nginx/ssl/api.yourdomain.com.key;

    # SSL 配置（同上）
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;

    # 文件上传大小限制
    client_max_body_size 100M;

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # 日志
    access_log /var/log/nginx/strapi_ssl_access.log;
    error_log /var/log/nginx/strapi_ssl_error.log;

    # Strapi 反向代理
    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # 超时设置（文件上传可能需要更长时间）
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    # API 响应缓存（谨慎使用）
    # location /api {
    #     proxy_pass http://localhost:1337;
    #     proxy_cache_valid 200 5m;
    # }
}
```

### C. PM2 生态系统配置文件

创建 `ecosystem.config.js` 在项目根目录：

```javascript
module.exports = {
  apps: [
    {
      name: 'strapi',
      cwd: './cms',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '500M',
      error_file: '/var/log/pm2/strapi-error.log',
      out_file: '/var/log/pm2/strapi-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
    {
      name: 'nextjs',
      cwd: './',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      error_file: '/var/log/pm2/nextjs-error.log',
      out_file: '/var/log/pm2/nextjs-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
```

使用方式：

```bash
# 启动所有服务
pm2 start ecosystem.config.js

# 重启
pm2 restart ecosystem.config.js

# 停止
pm2 stop ecosystem.config.js

# 删除
pm2 delete ecosystem.config.js
```

### D. 有用的链接

- [阿里云官网](https://www.aliyun.com)
- [阿里云文档中心](https://help.aliyun.com)
- [轻量应用服务器文档](https://help.aliyun.com/product/59601.html)
- [ECS 文档](https://help.aliyun.com/product/25365.html)
- [OSS 文档](https://help.aliyun.com/product/31815.html)
- [CDN 文档](https://help.aliyun.com/product/27099.html)
- [SSL 证书文档](https://help.aliyun.com/product/28533.html)
- [Strapi 官方文档](https://docs.strapi.io)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [PM2 文档](https://pm2.keymetrics.io/docs)
- [Nginx 文档](https://nginx.org/en/docs/)

---

## ✅ 部署检查清单

完成部署后，逐项检查：

### 服务器基础设施
- [ ] 服务器购买并启动
- [ ] 安全组/防火墙规则配置正确
- [ ] SSH 可以正常登录
- [ ] 域名已备案（如需要）
- [ ] 域名解析配置正确

### 软件环境
- [ ] Node.js 20.x 安装成功
- [ ] Yarn 安装成功
- [ ] PM2 安装成功
- [ ] Nginx 安装并运行
- [ ] Git 安装成功
- [ ] MySQL 安装（如使用）

### Strapi 后端
- [ ] 代码克隆成功
- [ ] 依赖安装完成
- [ ] 环境变量配置正确
- [ ] 构建成功（yarn build）
- [ ] PM2 启动成功
- [ ] 可以访问 /admin 并登录
- [ ] Public 角色权限已配置
- [ ] API 接口可以正常访问

### Next.js 前端
- [ ] 依赖安装完成
- [ ] 环境变量配置正确
- [ ] 构建成功（yarn build）
- [ ] PM2 启动成功
- [ ] 可以访问首页
- [ ] 所有页面正常显示
- [ ] 能正确调用 Strapi API

### Nginx 配置
- [ ] 配置文件语法正确（nginx -t）
- [ ] 反向代理配置正确
- [ ] SSL 证书配置（如有域名）
- [ ] HTTP 自动跳转 HTTPS
- [ ] Gzip 压缩已启用

### 存储和数据
- [ ] 数据库连接成功
- [ ] 数据持久化验证（重启后数据还在）
- [ ] OSS 配置成功（如使用）
- [ ] 图片上传测试成功
- [ ] 备份脚本配置并测试

### CDN 和性能
- [ ] CDN 配置成功（如使用）
- [ ] CNAME 解析生效
- [ ] 缓存规则配置
- [ ] Gzip/Brotli 压缩启用
- [ ] HTTP/2 启用

### 监控和安全
- [ ] 云监控安装
- [ ] 告警规则配置
- [ ] 日志轮转配置
- [ ] 防火墙规则优化
- [ ] Fail2Ban 配置（可选）
- [ ] 定时备份任务运行

### 测试和验证
- [ ] 网站可以正常访问
- [ ] 所有页面功能正常
- [ ] API 接口响应正常
- [ ] 图片显示正常
- [ ] 联系表单可以提交
- [ ] 性能测试（加载速度）
- [ ] 移动端访问测试

---

## 🎉 部署完成！

恭喜！你已经成功将快快出海网站部署到阿里云。

### 下一步建议

1. **内容管理**
   - 登录 Strapi 后台添加真实内容
   - 上传高质量图片（优化后）
   - 创建文章、案例等

2. **SEO 优化**
   - 提交网站到百度站长平台
   - 提交网站到 Google Search Console
   - 生成并提交 sitemap.xml
   - 配置 robots.txt

3. **性能监控**
   - 配置 Google Analytics
   - 使用百度统计
   - 定期检查云监控数据

4. **安全加固**
   - 定期更新系统和软件
   - 审查安全组规则
   - 检查备份是否正常

5. **用户反馈**
   - 收集用户反馈
   - 优化用户体验
   - 持续改进

### 需要帮助？

- 📧 阿里云工单系统
- 📚 查看本文档的"常见问题"章节
- 💬 阿里云开发者社区
- 📖 Strapi 官方文档

---

**文档版本**: 1.0
**最后更新**: 2025-12-24
**作者**: Claude Code
**适用平台**: 阿里云轻量应用服务器 / ECS
**项目**: 快快出海网站 (Next.js 16 + Strapi 5)
