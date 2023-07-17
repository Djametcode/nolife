"use client";
import { useRouter } from "next/router";

export default function LoginComponent() {
  const navigate = useRouter();
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <form action="" className=" bg-slate-100 flex flex-col p-5 gap-2 h-80">
        <input
          type="text"
          placeholder="Type here"
          className="input input-sm w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs input-sm"
        />
      </form>
    </div>
  );
}
