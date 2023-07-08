/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Outlet, useLocation } from "react-router-dom";
import HeaderComponent from "../components/header";
import Footer from "../components/footer";
import NavMobile from "../components/navBarMobile";
import { useSelector } from "react-redux";
import NavMobileFix from "../components/navMobile";

const RootLayout = () => {
  const isToggle = useSelector((state) => state.auth.isToggle);
  const isLoggin = useSelector((state) => state.auth.isLogin);
  const location = useLocation();
  return (
    <div className=" h-screen w-screen">
      {location.pathname === "/login" || location.pathname === "/signUp" ? (
        <div className={` fixed top-0 w-full z-20 bg-primary shadow-md`}>
          <HeaderComponent />
        </div>
      ) : null}
      {isToggle && <NavMobile />}
      <div className=" flex justify-start">
        <Outlet />
      </div>
      {location.pathname === "/login" || location.pathname === "/signUp" ? (
        <div className=" fixed bottom-0 w-full">
          <Footer />
        </div>
      ) : null}
      {isLoggin ? (
        <div className={`fixed bottom-0 w-full`}>
          <NavMobileFix />
        </div>
      ) : null}
    </div>
  );
};

export default RootLayout;
