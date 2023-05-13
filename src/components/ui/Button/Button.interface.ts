import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./config";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}
