"use client";

import React, { useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { addFriendAPI } from "@/api/friends/friends.api";
import Button from "../ui/Button/Button";
import style from "@/styles/components/AddFriendButton/addFriendButton.module.scss";

import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton = () => {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await addFriendAPI(validatedEmail);

      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }

      setError("email", { message: "Something went wrong..." });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <label htmlFor="email">Add friend by E-Mail</label>

      <div className={style.inputWrapper}>
        <input
          {...register("email")}
          type="text"
          placeholder="you@example.com"
        />
        <Button>Add</Button>
      </div>

      <p className={style.errorMessage}>{errors.email?.message}</p>
      {showSuccessState ? (
        <p className={style.successMessage}>Friend request sent!</p>
      ) : null}
    </form>
  );
};

export default AddFriendButton;
