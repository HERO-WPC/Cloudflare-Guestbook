import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { FRONTEND_HTML } from './frontend'

interface Env {
  MESSAGES: KVNamespace
}

interface Message {
  id: string
  content: string
  name: string
  files: string[]
  createdAt: string
}

// 生成 UUID
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const app = new Hono<Env>()

// CORS 配置
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}))

// 文件上传功能已移除
app.post('/api/upload', async (c) => {
  return c.json({ success: false, error: '文件上传功能已禁用' }, 400)
})


// 获取所有留言
app.get('/api/messages', async (c) => {
  try {
    const list = await c.env.MESSAGES.list({ limit: 100 })
    const messages: Message[] = []

    for (const key of list.keys) {
      const data = await c.env.MESSAGES.get(key.name)
      if (data) {
        messages.push(JSON.parse(data as string))
      }
    }

    // 按时间倒序排列
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return c.json({ success: true, data: messages })
  } catch (error) {
    return c.json({ success: false, error: '获取留言失败' }, 500)
  }
})

// 创建留言
app.post('/api/messages', async (c) => {
  try {
    const body = await c.req.json()
    const { content, name, files = [] } = body

    if (!content || !name) {
      return c.json({ success: false, error: '内容和昵称不能为空' }, 400)
    }

    const id = generateUUID()
    const message: Message = {
      id,
      content,
      name: name.slice(0, 50),
      files,
      createdAt: new Date().toISOString()
    }

    await c.env.MESSAGES.put(`message:${id}`, JSON.stringify(message))

    return c.json({ success: true, data: message })
  } catch (error) {
    return c.json({ success: false, error: '创建留言失败' }, 500)
  }
})

// 前端页面
app.get('/', async (c) => {
  return c.html(FRONTEND_HTML)
})

export default app
