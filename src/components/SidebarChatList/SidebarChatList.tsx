'use client'

import React, { FC, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { SidebarChatListProps } from './SidebarChatList.interface'
import { chatHrefConstructor, toPusherKey } from '@/lib/utils'
import Image from 'next/image'
import { pusherClient } from '@/lib/pusher/pusher'
import { toast } from 'react-hot-toast'
import UnseenChatToast from '../UnseenChatToast/UnseenChatToast'

interface ExtendedMessage extends Message {
  senderImg: string
  senderName: string
}

const SidebarChatList: FC<SidebarChatListProps> = ({ sessionId, friends }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([])
  const [activeChats, setActiveChats] = useState<User[]>(friends)

  useEffect(() => {
    if (pathname.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId))
      })
    }
  }, [pathname])

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`))
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`))

    const chatHandler = (message: ExtendedMessage) => {
      const shouldNotify =
        pathname !==
        `/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`

      if (!shouldNotify) return

      toast.custom((t) => (
        <UnseenChatToast
          t={t}
          senderId={message.senderId}
          sessionId={sessionId}
          senderImg={message.senderImg}
          senderName={message.senderName}
          senderMessage={message.text}
        />
      ))

      setUnseenMessages((prev) => [...prev, message])
    }

    const newFriendHandler = () => {
      router.refresh()
    }

    pusherClient.bind('new_message', chatHandler)
    pusherClient.bind('new_friend', newFriendHandler)

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`))
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`))

      pusherClient.unbind('new_message', chatHandler)
      pusherClient.unbind('new_friend', newFriendHandler)
    }
  }, [pathname, router, sessionId])

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto -mx-2 space-y-1">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
          return unseenMessage.senderId === friend.id
        }).length

        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
              className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
            >
              {/* {friend.name} */}
              <div className="flex flex-1 items-center gap-x-2 px-2 py-1 text-sm font-semibold leading-4">
                <div className="relative h-6 w-6 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={friend.image || ''}
                    alt="Your profile picture"
                  />
                </div>

                <div className="flex flex-col">
                  <span aria-hidden="true">{friend.name}</span>
                </div>
              </div>
              {unseenMessagesCount > 0 ? (
                <div className="bg-indigo-600 font-medium text-xs text-white w-5 h-5 rounded-full flex justify-center items-center">
                  {unseenMessagesCount}
                </div>
              ) : null}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SidebarChatList
