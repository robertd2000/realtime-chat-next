"use client";

import Link from "next/link";
import React, { FC, useState } from "react";
import { FriendRequestSidebarOptionsProps } from "./FriendRequestSidebarOptions.interface";
import style from "@/styles/components/FriendRequestSidebarOptions/friendRequestSidebarOptions.module.scss";
import { User } from "lucide-react";

const FriendRequestSidebarOptions: FC<FriendRequestSidebarOptionsProps> = ({
  sessionId,
  initialUnseenRequestCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );

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
