/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Outlet, useLocation } from "react-router-dom";
import HeaderComponent from "../components/header";
import Footer from "../components/footer";
// import NavMobile from "../components/navBarMobile";
// import { useSelector } from "react-redux";
import NavMobileFix from "../components/navMobile";
import { useEffect, useState } from "react";

const RootLayout = () => {
  // const isToggle = useSelector((state) => state.auth.isToggle);
  // const isLoggin = useSelector((state) => state.auth.isLogin);
  const [scrollClass, setScrollClass] = useState("");
  const location = useLocation();
  function scrollTracker() {
    const scroll = window.scrollY;
    if (scroll > 0) {
      setScrollClass("fixed top-0 w-full bg-slate-50");
    } else {
      setScrollClass("");
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", scrollTracker);

    return () => window.removeEventListener("scroll", scrollTracker);
  }, []);
  return (
    <div className=" h-screen w-screen">
      {location.pathname === "/login" || location.pathname === "/signUp" ? (
        <div className={` fixed top-0 w-full z-20 bg-primary shadow-md`}>
          <HeaderComponent />
        </div>
      ) : null}
      {location.pathname === "/welcome" ? (
        <div className={` ${scrollClass} p-4 font-geologica z-50`}>
          <h1 className=" text-xl">No Life</h1>
        </div>
      ) : null}
      <div className=" w-screen flex justify-end">
        <Outlet />
      </div>
      {location.pathname === "/login" || location.pathname === "/signUp" ? (
        <div className=" fixed bottom-0 w-full">
          <Footer />
        </div>
      ) : null}
      {location.pathname === "/welcome/account" ||
      location.pathname === "/welcome" ||
      location.pathname === "/welcome/account/reply" ||
      location.pathname === "/welcome/post" ||
      location.pathname === "/welcome/search" ||
      location.pathname === "/welcome/activity" ? (
        <div className={` md:hidden fixed bottom-0 w-full`}>
          <NavMobileFix />
        </div>
      ) : null}
    </div>
  );
};

export default RootLayout;
