import { Toast } from 'react-hot-toast'

export interface UnseenChatToastProps {
  t: Toast
  sessionId: string
  senderId: string
  senderImg: string
  senderName: string
  senderMessage: string
}
