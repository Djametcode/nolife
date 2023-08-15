"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import registHandler from "@/handler/signupHandler";
import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const data = {
    username: username,
    email: email,
    password: password,
  };

  const registAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registHandler(data);
      setUsername("");
      setEmail("");
      setPassword("");
      router.push("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-full w-full flex">
      <div className=" basis-1/3 max-sm:basis-full h-full flex flex-col gap-10 items-center justify-center bg-slate-50">
        <div className=" font-figtree text-center mb-12 mt-12 flex flex-col gap-1">
          <h1 className=" text-3xl font-extrabold font-figtree">
            Create Your Account
          </h1>
          <p className=" text-gray-500 text-sm">
            Create now and join with million user!
          </p>
        </div>
        <div className=" max-sm:w-96 w-[380px] h-full">
          <form className=" flex flex-col gap-4 font-figtree">
            <div className=" flex flex-col gap-2">
              <label htmlFor="email" className=" text-sm">
                Username
              </label>
              <input
                value={username ?? ""}
                className=" border p-2 placeholder:text-sm text-sm"
                type="text"
                id="email"
                placeholder="username"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label htmlFor="email" className=" text-sm">
                Email
              </label>
              <input
                value={email ?? ""}
                className=" border p-2 placeholder:text-sm text-sm"
                type="text"
                id="email"
                placeholder="email"
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
            </div>
            <div className=" flex flex-col gap-4 mt-12">
              <div className=" flex justify-center bg-black text-white p-3 rounded-3xl">
                <button onClick={registAccount} className=" text-sm">
                  Sign Up
                </button>
              </div>
              <div className=" flex gap-3 justify-center border p-3 rounded-3xl">
                <Image src="/google.svg" width={18} height={18} alt="google" />
                <button className=" text-sm">Sign Up With Google</button>
              </div>
            </div>
          </form>
        </div>
        <div className=" flex gap-3 justify-center font-figtree items-end pb-5 text-sm">
          <p className=" text-gray-500">Already Have account ?</p>
          <Link href="/auth">Back to Login Page</Link>
        </div>
      </div>
      <div className=" max-sm:hidden basis-2/3 bg-bg4 bg-center bg-no-repeat bg-slate-100"></div>
    </div>
  );
}
