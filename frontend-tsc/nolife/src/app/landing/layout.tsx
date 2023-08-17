import SideBarLarge from "@/component/sidebar";

interface Children {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Children) {
  return (
    <div className="flex w-full h-full">
      <div className=" fixed w-72 h-full pt-8 pl-10 border-r bg-slate-100 font-figtree">
        <SideBarLarge />
      </div>
      <div className=" ml-72">{children}</div>
    </div>
  );
}
