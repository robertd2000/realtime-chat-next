import React, { FC } from "react";
import { ChatPageProps } from "./page.interface";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { notFound } from "next/navigation";
import { fetchRedis } from "@/helpers/redis";
import { db } from "@/lib/db/db";
import { messageArrayValidator } from "@/lib/validations/message";

const getChatMessages = async (chatId: string) => {
  try {
    const result: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );
    const dbMessages = result.map((message) => JSON.parse(message) as Message);

    const reversedDbMessages = dbMessages.reverse();

    const messages = messageArrayValidator.parse(reversedDbMessages);

    return messages;
  } catch (error) {
    notFound();
  }
};

const ChatPage = async ({ params: { chatId } }: ChatPageProps) => {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (user.id !== userId1 && user.id !== userId2) notFound();

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;

  // const chatPartnerRaw = (await fetchRedis(
  //   'get',
  //   `user:${chatPartnerId}`
  // )) as string
  // const chatPartner = JSON.parse(chatPartnerRaw) as User
  // const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
  // const initialMeassages = getChatMessages(chatId);
  return <div>{chatId}</div>;
};

export default ChatPage;
