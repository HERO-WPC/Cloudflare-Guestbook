# 🌟 Cloudflare Guestbook

一个基于 Cloudflare Workers 和 React 的留言板应用，支持图片和视频上传。

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ 功能特性

- 📝 发布文字留言
- 📎 支持图片上传 (JPG, PNG, GIF, WebP)
- 🎬 支持视频上传 (MP4, WebM, MOV)
- 🔒 单文件最大 10MB
- 📚 最多 5 个附件
- 📅 留言按时间倒序排列

## 🏗️ 技术栈

- **后端**: Cloudflare Workers (Hono)
- **前端**: React + TypeScript + Vite
- **数据存储**: Cloudflare KV
- **文件存储**: Cloudflare R2

## 🚀 快速开始

### 前置要求

- [Cloudflare](https://cloudflare.com) 账号
- [Node.js](https://nodejs.org/) 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-update)

### 安装 Wrangler

```bash
npm install -g wrangler
wrangler login
```

### 本地开发

1. **克隆仓库**

```bash
git clone https://github.com/你的用户名/guestbook.git
cd guestbook
```

2. **启动后端**

```bash
cd worker
npm install
npm run dev
```

3. **启动前端** (新终端)

```bash
cd frontend
npm install
npm run dev
```

访问 http://localhost:3000 查看效果。

## ☁️ 部署到 Cloudflare

### 1. 创建 KV 命名空间

```bash
cd worker
wrangler kv:namespace create "MESSAGES"
```

### 2. 创建 R2 存储桶

在 [Cloudflare Dashboard](https://dash.cloudflare.com) 中：
- 进入 R2
- 创建存储桶，命名为 `guestbook-files`
- 设置为公开访问

### 3. 配置 wrangler.toml

编辑 `worker/wrangler.toml`，填入你的 KV ID：

```toml
name = "guestbook-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "MESSAGES"
id = "YOUR_KV_ID"  # 替换为你的 KV ID

[[r2_buckets]]
binding = "FILES"
bucket_name = "guestbook-files"

[vars]
WORKER_URL = "https://your-worker.你的用户名.workers.dev"
```

### 4. 部署

```bash
cd worker
npm install
npm run deploy
```

### 5. 部署前端 (Cloudflare Pages)

```bash
cd frontend
npm install
npm run build
```

在 Cloudflare Dashboard 中创建 Pages 项目，上传 `dist` 文件夹。

## 📁 项目结构

```
guestbook/
├── worker/              # Cloudflare Workers 后端
│   ├── src/
│   │   └── index.ts     # API 路由
│   ├── package.json
│   ├── tsconfig.json
│   └── wrangler.toml    # 部署配置
├── frontend/            # React 前端
│   ├── src/
│   │   ├── App.tsx      # 主组件
│   │   ├── main.tsx     # 入口文件
│   │   └── components/  # 组件
│   │       ├── MessageForm.tsx
│   │       └── MessageList.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

## 🔧 API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/messages` | 获取所有留言 |
| POST | `/api/messages` | 创建留言 |
| POST | `/api/upload` | 上传文件 |
| GET | `/files/:key` | 获取文件 |

## 💰 免费额度

| 服务 | 额度 |
|------|------|
| Workers | 每天 10 万次请求 |
| KV | 1000 次读/写操作/月 |
| R2 | 10GB 存储 + 10GB 带宽/月 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 许可证

MIT License