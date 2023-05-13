import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { buttonVariants } from "./config";
import { ButtonProps } from "./Button.interface";
import style from "@/styles/components/ui/Button/button.module.scss";

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className={style.buttonLoader} /> : null}
      {children}
    </button>
  );
};

export default Button;
