"use client";

import Header from "@/components/header";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const path = usePathname();
  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center">
      <Header />
      <div className=" flex w-full h-full max-sm:flex-col max-sm:justify-star max-sm:pt-6:">
        <div className=" basis-1/2 max-sm:hidden">
          <img src="/landing.svg" alt="" />
        </div>
        <div className=" basis-1/2 flex flex-col max-sm:gap-6 max-sm:pt-10">
          <div className=" font-geologica text-3xl flex justify-center translate-y-40 max-sm:translate-y-0">
            <h1>{path === "/auth" ? "Login" : "Regist"}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
