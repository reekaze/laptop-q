"use client";
import LoadSpin from "@/components/LoadSpin";
import Logo from "@/components/Logo";
import MyInput from "@/components/MyInput";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import qs from "query-string";

type AuthPageProps = {
  searchParams: {
    type?: string;
  };
};

const AuthPage = ({ searchParams: { type } }: AuthPageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogin = type === "login";

  useEffect(() => {
    if (type !== "login" && type !== "register") {
      return router.push("/auth?type=login");
    }

    return () => {};
  }, [router, type]);

  if (type !== "login" && type !== "register") {
    return <LoadSpin />;
  }

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          type: isLogin ? "register" : "login",
        },
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };

  return (
    <div className="relative">
      <div className="absolute w-full h-[100vh] bg-[url('/images/bg-cube-pattern.jpg')] bg-contain opacity-30"></div>
      <div className="absolute w-full h-[100vh] flex items-center justify-center">
        <div className="p-8 bg-primary/95 rounded-xl flex flex-col gap-4">
          <Logo />
          <p className="text-h3 font-bold text-white">
            {isLogin ? "Sign In" : "Register"}
          </p>
          {!isLogin && (
            <MyInput
              id="username"
              label="Username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value);
              }}
              value={username}
              type="text"
            />
          )}
          <MyInput
            id="email"
            label="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            type="text"
            value={email}
          />
          <MyInput
            id="password"
            label="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            type="password"
            value={password}
          />
          <Button className="py-6 mt-2 text-p font-bold bg-green-400 text-green-800 hover:bg-green-500">
            {isLogin ? "Login" : "Sign up"}
          </Button>

          <p className="text-neutral-400">
            {isLogin ? "First time?" : "Already had an account?"}
            <span
              className="text-white hover:underline cursor-pointer ml-1"
              onClick={onClick}
            >
              {isLogin ? "Create an account" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;