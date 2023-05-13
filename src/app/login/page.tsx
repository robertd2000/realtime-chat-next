"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button/Button";
import Google from "@/components/ui/logo/Google";
import style from "@/styles/pages/login/login.module.scss";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast.error("Something went wrong with your login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={style.loginWrapper}>
        <div>
          <div>
            logo
            <h2 className={style.loginTitle}>Sign in to your account</h2>
          </div>

          <Button
            isLoading={isLoading}
            type="button"
            className={style.loginButton}
            onClick={loginWithGoogle}
          >
            {isLoading ? null : <Google />}
            Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
