import { Message } from "@/lib/validations/message";

export interface MessagesProps {
  sessionId: string;
  initialMessages: Message[];
  sessionImg: string | null | undefined;
  chatPartner: User;
}
