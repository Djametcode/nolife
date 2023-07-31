"use client";

import { usePathname } from "next/navigation";

const HeaderComponents = () => {
  const path = usePathname();
  return (
    <div
      className={`${
        path === "/auth" || path === "/auth/regist"
          ? "bg-primary"
          : "bg-slate-200"
      } w-full h-16 flex justify-start pl-5 text-xl items-center font-geologica ${
        path === "/auth" || path === "/auth/regist"
          ? "text-white"
          : "text-black"
      }`}
    >
      <h1>No Life</h1>
    </div>
  );
};

export default HeaderComponents;
