# 🌟 Cloudflare Guestbook

一个基于 Cloudflare Workers 的留言板应用，支持图片和视频上传。前端已内置，无需单独部署！

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-yellow)

## ✨ 功能特性

- 📝 发布文字留言
- 📎 支持图片上传 (JPG, PNG, GIF, WebP)
- 🎬 支持视频上传 (MP4, WebM, MOV)
- 🔒 单文件最大 10MB
- 📚 最多 5 个附件
- ☁️ 所有内容部署在一个 Workers 中

## 🏗️ 技术栈

- **后端**: Cloudflare Workers (Hono)
- **前端**: 原生 HTML + JS (内置)
- **数据存储**: Cloudflare KV
- **文件存储**: Cloudflare R2

## 🚀 部署步骤

### 1. 前置准备

- [Cloudflare](https://cloudflare.com) 账号
- 安装 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-update):
  ```bash
  npm install -g wrangler
  wrangler login
  ```

### 2. 创建 KV 命名空间

```bash
cd worker
wrangler kv:namespace create "MESSAGES"
```

### 3. 创建 R2 存储桶

在 [Cloudflare Dashboard](https://dash.cloudflare.com) 中：
- 进入 R2
- 创建存储桶，命名为 `guestbook-files`
- 设置为公开访问

### 4. 配置 wrangler.toml

编辑 `worker/wrangler.toml`，填入 KV ID：

```toml
name = "guestbook"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "MESSAGES"
id = "YOUR_KV_ID"  # 替换为你的 KV ID

[[r2_buckets]]
binding = "FILES"
bucket_name = "guestbook-files"
```

### 5. 部署

```bash
cd worker
npm install
npx wrangler deploy
```

部署完成后访问 `https://guestbook.你的用户名.workers.dev`

## 📁 项目结构

```
guestbook/
├── worker/              # Cloudflare Workers (前后端一体)
│   ├── src/
│   │   └── index.ts     # API + 前端页面
│   ├── package.json
│   ├── tsconfig.json
│   └── wrangler.toml    # 部署配置
├── frontend/            # 前端源码 (开发用，构建时不需要)
└── README.md
```

## 🔧 API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/` | 前端页面 |
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
