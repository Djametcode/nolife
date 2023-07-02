/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Outlet, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/header";
import Footer from "../components/footer";
import { userContext } from "../context/context";
import { useState } from "react";
import Cookies from "js-cookie";
import NavMobile from "../components/navBarMobile";

const RootLayout = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    setIsLogin(false);
    Cookies.remove("token");
    navigate("/login");
  };

  const isToggle = false;
  return (
    <userContext.Provider value={{ isLogin, setIsLogin, logOut }}>
      <div className=" h-screen w-screen">
        <div className=" fixed top-0 w-full z-20 bg-primary shadow-md">
          <HeaderComponent />
        </div>
        {isToggle && <NavMobile />}
        {/* <div className=" max-sm:z-0 max-sm:flex-col flex h-full w-full relative z-0">
          {!isLogin && <Space />}
          <div className=" flex flex-col basis-1/2 max-sm:pt-0 pt-20 gap-10">
            {!isLogin && (
              <div className=" font-geologica md:bg-transparent bg-slate-300 max-sm:h-72 max-sm:pt-5">
                <div className=" flex flex-col items-center">
                  <h1 className=" max-sm:text-xl text-4xl">
                    Welcome to No-Life
                  </h1>
                  <p>Your introvert area</p>
                </div>
              </div>
            )}
            <div className=" max-sm:-translate-y-64">
              <Outlet />
            </div>
          </div>
          <div className=" max-sm:-translate-y-64 md:hidden p-5 font-geologica flex flex-col gap-3">
            <Information />
          </div>
        </div> */}
        <div className=" w-full h-full">
          <Outlet />
        </div>
        <div className=" fixed bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </userContext.Provider>
  );
};

export default RootLayout;
