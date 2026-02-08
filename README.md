# 🌟 Cloudflare Guestbook

一个基于 Cloudflare Workers 的留言板应用，支持任意格式文件上传。

## ✨ 功能特性

- 📝 发布文字留言
- 📎 支持任意格式文件 (图片、视频、文档等)
- 🔒 单文件最大 100MB
- 📚 最多 5 个附件
- ☁️ 不支持文件上传

## ☁️ 部署步骤

### 1. 推送代码到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
# 在 GitHub 创建仓库，然后:
git remote add origin https://github.com/你的用户名/guestbook.git
git push -u origin master
```

### 2. Cloudflare 配置

#### 创建 KV 命名空间
```bash
cd worker
npm install
npx wrangler kv:namespace create "MESSAGES"
```
将输出的 ID 填入 `worker/wrangler.toml`

#### 绑定 KV 到 Workers
- 访问 https://dash.cloudflare.com
- Workers & Pages → 你的 Worker → Settings
- Variables → Add → KV namespace binding
- Variable name: `MESSAGES`
- 选择你创建的 KV 命名空间



### 4. 部署 Workers

在 Cloudflare Dashboard 中：
1. 访问 https://dash.cloudflare.com
2. Workers & Pages → Create → Deploy with Git
3. 选择你的 GitHub 仓库
4. 配置：
   - Build command: `cd worker && npm install && npx wrangler deploy`
   - Build output: 不需要
5. 点击 **Deploy！**

## 📁 项目结构

```
guestbook/
├── worker/              # Cloudflare Workers
│   ├── src/index.ts     # API + 前端页面
│   ├── src/frontend.ts   # 前端 HTML
│   ├── package.json
│   ├── tsconfig.json
│   └── wrangler.toml
└── README.md
```

## 🔧 wrangler.toml 配置

```toml
name = "guestbook"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "MESSAGES"
id = "YOUR_KV_ID"
```

## 💰 免费额度

| 服务 | 额度 |
|------|------|
| Workers | 每天 10 万次请求 |
| KV | 1000 次读/写操作/月 |

## 📝 许可证

MIT
