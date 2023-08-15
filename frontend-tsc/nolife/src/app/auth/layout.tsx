import Link from "next/link";
import React from "react";

interface children {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: children) {
  const isLogin = false;
  return <div className=" w-full h-full flex flex-col">{children}</div>;
}
