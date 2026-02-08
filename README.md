# Cloudflare Workers 留言板部署指南

## 准备工作

1. 注册 [Cloudflare](https://cloudflare.com) 账号
2. 安装 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/):
   ```bash
   npm install -g wrangler
   ```

3. 登录 Cloudflare:
   ```bash
   wrangler login
   ```

## 步骤 1: 创建 KV 命名空间

```bash
# 创建 KV 命名空间
wrangler kv:namespace create "MESSAGES"

# 记下输出的 ID，更新 wrangler.toml
```

## 步骤 2: 创建 R2 存储桶

1. 在 Cloudflare Dashboard 中进入 R2
2. 创建一个名为 `guestbook-files` 的存储桶
3. 在 Settings 中设置公开访问

或者使用命令行：
```bash
# R2 需要通过 Dashboard 创建，然后配置 wrangler.toml
```

## 步骤 3: 配置 wrangler.toml

编辑 `worker/wrangler.toml`:

```toml
name = "guestbook-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "MESSAGES"
id = "YOUR_KV_ID"  # 替换为你的 KV ID

[[r2_buckets]]
binding = "FILES"
bucket_name = "guestbook-files"  # 替换为你的 R2 桶名

[vars]
WORKER_URL = "https://your-worker-name.your-username.workers.dev"
```

## 步骤 4: 安装依赖并部署后端

```bash
cd worker
npm install
npm run deploy
```

## 步骤 5: 配置前端

创建 `frontend/.env.local`:
```env
VITE_API_URL=https://your-worker-name.your-username.workers.dev
```

## 步骤 6: 部署前端

前端可以部署到：
- Cloudflare Pages (推荐)
- Vercel
- Netlify

### Cloudflare Pages 部署：

```bash
cd frontend
npm install
npm run build
# 在 Cloudflare Dashboard 中创建 Pages 项目并上传 dist 文件夹
```

## 本地开发

### 后端：
```bash
cd worker
npm install
npm run dev
```

### 前端：
```bash
cd frontend
npm install
npm run dev
```

## 功能说明

- ✅ 发送文字留言
- ✅ 上传图片 (jpg, png, gif, webp)
- ✅ 上传视频 (mp4, webm, mov)
- ✅ 单文件最大 10MB
- ✅ 最多 5 个附件
- ✅ 留言按时间倒序排列

## 注意事项

1. R2 存储需要设置公开访问才能显示图片/视频
2. 免费额度：
   - Workers: 每天 10 万次请求
   - KV: 1000 次读/写操作
   - R2: 每月 10GB 存储 + 10GB 带宽

## 文件结构

```
留言板/
├── worker/              # Cloudflare Workers 后端
│   ├── src/index.ts     # API 逻辑
│   ├── package.json
│   └── wrangler.toml    # 部署配置
├── frontend/            # React 前端
│   ├── src/
│   │   ├── App.tsx
│   │   └── components/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```
