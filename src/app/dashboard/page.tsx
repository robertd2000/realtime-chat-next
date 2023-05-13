import React from "react";
import { authOptions } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  return <pre>{JSON.stringify(session)}</pre>;
};

export default page;
