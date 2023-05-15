import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons/Icons";
import SignOutButton from "@/components/SignOutButton/SignOutButton";
import { sidebarOptions } from "./constants";
import FriendRequestSidebarOptions from "@/components/FriendRequestSidebarOptions/FriendRequestSidebarOptions";
import { fetchRedis } from "@/helpers/redis";
import style from "@/styles/pages/dashboard/dashboard.module.scss";
import { User } from "@/types/db/db.interface";
import { authOptions } from "@/lib/auth/auth";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className={style.dashboardLayoutWrapper}>
      <div className={style.dashboardLayout}>
        <Link href="/dashboard" className={style.home}>
          <Icons.Logo className={style.logo} />
        </Link>

        <div className={style.chatsHeader}>Your chats</div>

        <nav className={style.chats}>
          <ul role={"list"}>
            <li>Chasts</li>
            <li>
              <div className={style.overview}>Overview</div>

              <ul role="list" className={style.chatOptions}>
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];

                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className={style.optionLink + " group"}
                      >
                        <span className={style.iconWrapper}>
                          <Icon className="h-4 w-4" />
                        </span>

                        <span className={style.name}>{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li>
              <FriendRequestSidebarOptions
                sessionId={session.user.id}
                initialUnseenRequestCount={unseenRequestCount}
              />
            </li>

            <li className={style.profileWrapper}>
              <div>
                <div className={style.imageWrapper}>
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    src={session.user.image || ""}
                    className={style.image}
                    alt="Your profile picture"
                  />
                </div>

                <span className={style.sr}>Your profile</span>

                <div className={style.userInfo}>
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>

              <SignOutButton className={style.signOut} />
            </li>
          </ul>
        </nav>
      </div>

      <aside className={style.childrenContainer}>{children}</aside>
    </div>
  );
};

export default DashboardLayout;
