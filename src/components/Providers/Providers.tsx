"use client";

import React, { FC } from "react";
import { Toaster } from "react-hot-toast";
import { ProvidersProps } from "./Providers.interface";

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </>
  );
};

export default Providers;
