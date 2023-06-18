import { Message } from "@/lib/validations/message";

export interface MessagesProps {
  sessionId: string;
  initialMessages: Message[];
  chatId: string;
  sessionImg: string | null | undefined;
  chatPartner: User;
}
