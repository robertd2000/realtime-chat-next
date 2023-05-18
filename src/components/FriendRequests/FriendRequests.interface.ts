import { IncomingFriendRequest } from "@/types/pusher/pusher";

export interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}
