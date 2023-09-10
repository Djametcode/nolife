"use client";

import Navbar from "@/component/navbar";
import React, { Children, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Children {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: Children) {
  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
    token ? router.push("/landing") : router.push("/auth");
  }, [router, token]);
  return (
    <div>
      {children}
      <div className=" fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
