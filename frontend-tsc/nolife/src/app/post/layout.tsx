import Navbar from "@/component/navbar";
import Link from "next/link";
import React from "react";
import { IoClose } from "react-icons/io5";

interface Children {
  children: React.ReactNode;
}

export default function PostLayout({ children }: Children) {
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
