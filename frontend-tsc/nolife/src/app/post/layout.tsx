"use client";

import Navbar from "@/component/navbar";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Children {
  children: React.ReactNode;
}

export default function PostLayout({ children }: Children) {
  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
    token ? router.push("/landing") : router.push("/auth");
  }, [router, token]);
  return (
    <div>
      <div className=" flex h-16 items-center p-3 gap-4 font-figtree">
        <Link href={"/landing"}>
          <IoClose size={30} />
        </Link>
        <h1 className=" text-lg">Postingan Baru</h1>
      </div>
      {children}
      <div className=" fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
}
