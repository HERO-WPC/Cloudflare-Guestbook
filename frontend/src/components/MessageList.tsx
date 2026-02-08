import './MessageList.css'

interface Props {
  messages: {
    id: string
    content: string
    name: string
    files: string[]
    createdAt: string
  }[]
}

function MessageList({ messages }: Props) {
  const formatTime = (time: string) => {
    const date = new Date(time)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|mov)$/i)
  }

  return (
    <div className="message-list">
      {messages.map(message => (
        <div key={message.id} className="message">
          <div className="message-header">
            <span className="message-name">👤 {message.name}</span>
            <span className="message-time">{formatTime(message.createdAt)}</span>
          </div>
          <div className="message-content">{message.content}</div>
          {message.files.length > 0 && (
            <div className="message-files">
              {message.files.map((file, index) => (
                <div key={index} className="message-file">
                  {isVideo(file) ? (
                    <video src={file} controls />
                  ) : (
                    <img src={file} alt={`附件 ${index + 1}`} loading="lazy" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MessageList
