"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { FriendRequestSidebarOptionsProps } from "./FriendRequestSidebarOptions.interface";
import style from "@/styles/components/FriendRequestSidebarOptions/friendRequestSidebarOptions.module.scss";
import { User } from "lucide-react";
import { pusherClient } from "@/lib/pusher/pusher";
import { toPusherKey } from "@/lib/utils";

const FriendRequestSidebarOptions: FC<FriendRequestSidebarOptionsProps> = ({
  sessionId,
  initialUnseenRequestCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );
    console.log("listening to ", `user:${sessionId}:incoming_friend_requests`);

    const friendRequestHandler = ({}) => {
      setUnseenRequestCount((prev) => prev + 1);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  return (
    <Link
      href="/dashboard/requests"
      className={style.requestsContainer + " group"}
    >
      <div>
        <User className={style.user} />
      </div>

      <p>Friend requests</p>

      {unseenRequestCount > 0 ? (
        <div className={style.unseenRequestCount}>{unseenRequestCount}</div>
      ) : null}
    </Link>
  );
};

export default FriendRequestSidebarOptions;
