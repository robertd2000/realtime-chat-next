import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icons } from "@/components/icons/Icons";
import { sidebarOptions } from "./constants";
import style from "@/styles/pages/dashboard/dashboard.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getServerSession();
  if (!session) notFound();

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
          </ul>
        </nav>
      </div>

      {children}
    </div>
  );
};

export default DashboardLayout;
