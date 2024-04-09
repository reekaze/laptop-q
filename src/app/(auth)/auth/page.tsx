"use client";
import LoadSpin from "@/components/LoadSpin";
import Logo from "@/components/Logo";
import MyInput from "@/components/MyInput";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import axios from "axios";

import { useMutation } from "@tanstack/react-query";
import { AxiosOnError } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { registerFormSchema, loginFormSchema } from "@/lib/zodSchema";

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

  const switchAuthType = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          type: isLogin ? "register" : "login",
        },
      },
      {
        skipNull: true,
      },
    );

    router.push(url);
  };

  const login = async () => {
    loginFormSchema.parse({ email, password });

    await axios.post("/api/login", {
      email,
      password,
    });
  };

  const register = async () => {
    registerFormSchema.parse({ username, email, password });

    await axios.post("/api/register", {
      email,
      username,
      password,
    });
  };

  const {
    mutate: doRegister,
    isPending: isRegisterPending,
    isSuccess: isRegisterSuccess,
  } = useMutation({
    mutationFn: register,
    onError: AxiosOnError,
    onSuccess: (data) => {
      doLogin();
    },
  });

  const {
    mutate: doLogin,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: login,
    onError: AxiosOnError,
    onSuccess: (data) => {
      router.push("/");
      router.refresh();
    },
  });

  useEffect(() => {
    if (type !== "login" && type !== "register") {
      return router.push("/auth?type=login");
    }

    return () => {};
  }, [router, type]);

  if (type !== "login" && type !== "register") {
    return <LoadSpin />;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        isLogin ? doLogin() : doRegister();
      }}
    >
      <div className="relative">
        <div className="absolute h-[100vh] w-full bg-[url('/images/bg-cube-pattern.jpg')] bg-contain opacity-30"></div>
        <div className="absolute flex h-[100vh] w-full items-center justify-center">
          <div className="flex flex-col gap-4 rounded-xl bg-primary/95 p-8">
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
            <Button
              disabled={isLoginPending || isRegisterPending}
              type="submit"
              className="mt-2 bg-green-400 py-6 text-[16px] font-bold text-green-800 hover:bg-green-500"
            >
              {isLogin ? "Login" : "Sign up"}
              <div
                className={cn(
                  "ml-2",
                  isLoginPending || isRegisterPending ? "flex" : "hidden",
                )}
              >
                <LoadSpin color="text-white" size={20} />
              </div>
            </Button>

            <p className="text-p text-neutral-400">
              {isLogin ? "First time?" : "Already had an account?"}
              <span
                className="ml-1 cursor-pointer text-white hover:underline"
                onClick={switchAuthType}
              >
                {isLogin ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AuthPage;
