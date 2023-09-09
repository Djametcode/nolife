"use client";

import Image from "next/image";
import Link from "next/link";
import loginHandler from "@/handler/loginHandler";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

/* eslint-disable @next/next/no-img-element */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFail, setIsFail] = useState(false);

  interface Data {
    email: string | null;
    password: string | null;
  }

  const data: Data = {
    email: email,
    password: password,
  };

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await loginHandler(data);
      const { msg, token } = response;
      Cookies.set("token", token);
      setEmail("");
      setPassword("");
      console.log(response);

      router.push("/landing");
    } catch (error) {
      console.log(error);
      setIsFail(true);
    }
  };

  return (
    <div className=" h-full w-full flex max-sm:flex-col">
      <div className=" basis-1/3 max-sm:basis-full h-full flex flex-col gap-10 items-center justify-center bg-slate-50">
        <div className=" font-figtree text-center mb-12 mt-12 flex flex-col gap-1">
          <h1 className=" text-3xl font-extrabold font-figtree">
            Welcome Back
          </h1>
          <p className=" text-gray-500 text-sm">Your friends is waiting you!</p>
        </div>
        <div className=" max-sm:w-96 max-sm:p-3 w-[380px] h-full">
          <form className=" flex flex-col w-full gap-4 font-figtree">
            <div className=" flex flex-col gap-2">
              <label htmlFor="email" className=" text-sm">
                Email
              </label>
              <input
                value={email ?? ""}
                className=" border p-2 placeholder:text-sm text-sm"
                type="text"
                id="email"
                placeholder="enter your email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label htmlFor="password" className=" text-sm">
                Password
              </label>
              <input
                value={password ?? ""}
                className="border p-2 placeholder:text-sm text-sm"
                type="password"
                id="password"
                placeholder="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <div className=" flex justify-between">
              <div className=" flex items-center gap-2 text-sm">
                <input type="checkbox" id="check" />
                <label htmlFor="check">Remember me</label>
              </div>
              <div className=" text-sm">
                <p>Forgot Password</p>
              </div>
            </div>
            <div className=" flex flex-col gap-4 mt-12">
              <div className=" flex justify-center bg-black text-white p-3 rounded-3xl">
                {isFail ? <p>Error</p> : null}
                {isLoading ? (
                  <button onClick={loginUser} className=" text-sm">
                    Signing ..
                  </button>
                ) : (
                  <button onClick={loginUser} className=" text-sm">
                    Sign In
                  </button>
                )}
              </div>
              <div className=" flex gap-3 justify-center border p-3 rounded-3xl">
                <Image src="/google.svg" width={18} height={18} alt="google" />
                <button className=" text-sm">Sign In With Google</button>
              </div>
            </div>
          </form>
        </div>
        <div className=" flex gap-3 justify-center font-figtree items-end pb-5">
          <p className=" text-gray-500 text-sm">Dont have an account ?</p>
          <Link href="/auth/signup" className=" text-sm">
            Sign Up
          </Link>
        </div>
      </div>
      <div className=" max-sm:hidden basis-2/3 bg-bg3 bg-center bg-no-repeat bg-slate-100"></div>
    </div>
  );
}
