"use client";
import LoadSpin from "@/components/LoadSpin";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type AuthPageProps = {
  searchParams: {
    type?: string;
  };
};

const AuthPage = ({ searchParams: { type } }: AuthPageProps) => {
  const router = useRouter();
  useEffect(() => {
    if (type !== "login" && type !== "register") {
      return router.push("/auth?type=login");
    }

    return () => {};
  }, [router, type]);

  if (type !== "login" && type !== "register") {
    return <LoadSpin />;
  }

  return <div>{type}</div>;
};

export default AuthPage;
