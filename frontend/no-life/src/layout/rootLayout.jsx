/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HeaderComponent from "../components/header";
import Footer from "../components/footer";
// import NavMobile from "../components/navBarMobile";
// import { useSelector } from "react-redux";
import NavMobileFix from "../components/navMobile";
import { useEffect, useState } from "react";
import logOutHandler from "../handler/LoggingOutHandler";
import { useDispatch } from "react-redux";

const RootLayout = () => {
  // const isToggle = useSelector((state) => state.auth.isToggle);
  // const isLoggin = useSelector((state) => state.auth.isLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrollClass, setScrollClass] = useState("");
  const location = useLocation();
  function scrollTracker() {
    const scroll = window.scrollY;
    if (scroll > 0) {
      setScrollClass(
        `fixed ${
          location.pathname === "/welcome" ? "bg-slate-50" : "bg-slate-100"
        } top-0 w-full`
      );
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
      {location.pathname === "/welcome" ||
      location.pathname === "/welcome/account" ? (
        <div
          className={` ${scrollClass} p-4 ${
            location.pathname === "/welcome/account" ? "bg-slate-100" : ""
          } font-geologica z-50 flex justify-start items-center`}
        >
          <h1 className=" text-xl">No Life</h1>
          <div className=" absolute right-4 flex items-center">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className=" w-6 h-6"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            {location.pathname === "/welcome/account" ? (
              <div className="dropdown dropdown-end bg-transparent">
                <label tabIndex={0} className="btn m-1">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className=" w-6 h-6"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    {/* <p onClick={logOutHandler(navigate, dispatch)}>Log Out</p> */}
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
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
