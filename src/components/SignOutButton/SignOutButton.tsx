"use client";

import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../ui/Button/Button";
import { SignOutButtonProps } from "./SignOutButton.interface";
import style from "@/styles/components/SignOutButton/signOutButton.module.scss";

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const onSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      toast.error("There was a problem signing out");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Button {...props} variant="ghost" onClick={onSignOut}>
      {isSigningOut ? (
        <Loader2 className={style.loader} />
      ) : (
        <LogOut className={style.logOut} />
      )}
    </Button>
  );
};

export default SignOutButton;
