import SideBarLarge from "@/component/sidebar";

interface Children {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Children) {
  return (
    <div className="flex w-full h-full">
      <div className=" fixed w-1/5 h-full basis-1/5 pt-8 pl-10 border-r bg-slate-100 font-figtree">
        <SideBarLarge />
      </div>
      {children}
    </div>
  );
}
