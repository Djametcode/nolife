"use client";

import registHandler from "@/handler/registHandler";
import Link from "next/link";
import { useState } from "react";

export default function RegistComponent() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    email: email,
    username: username,
    password: password,
  };

  const registAcc = async (event) => {
    event.preventDefault();
    try {
      const response = await registHandler(userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex justify-center items-center h-full w-full font-geologica">
      <form className=" flex flex-col gap-3 bg-slate-100 max-sm:m-5 max-sm:h-[350px] basis-[475px] h-[400px] max-sm:p-5 p-10 shadow-md rounded-lg">
        <div className=" flex gap-3 pb-3">
          <Link href="/auth">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </Link>

          <h1>Back to Login</h1>
        </div>
        <input
          className=" p-3 rounded-lg focus:outline-none max-sm:p-2 max-sm:text-sm"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=" p-3 rounded-lg focus:outline-none max-sm:p-2 max-sm:text-sm"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className=" p-3 rounded-lg focus:outline-none max-sm:p-2 max-sm:text-sm"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className=" text-xs italic text-warning"></div>
        <div className=" flex justify-center">
          <button
            onClick={(e) => registAcc(e)}
            className=" bg-white w-16 md:p-2 max-sm:p-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
