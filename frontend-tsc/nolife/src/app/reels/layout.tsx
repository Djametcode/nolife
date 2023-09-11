"use client";

import Navbar from "@/component/navbar";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Children {
  children: React.ReactNode;
}

export default function ReelLayout({ children }: Children) {
  const router = useRouter();
  const token = Cookies.get("token");
  return (
    <div className=" w-screen h-screen">
      {children}
      <div className=" z-40 fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
