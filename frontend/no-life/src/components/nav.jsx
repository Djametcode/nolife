import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const NavLanding = () => {
  return (
    <Fragment>
      <div className=" max-sm:hidden border-b shadow sticky top-20 z-20 mt-20 bg-slate-50 text-black flex items-center gap-3 font-geologica justify-start">
        <Link
          className=" flex flex-col border-r justify-center w-full text-center items-center h-14 hover:bg-primary-focus"
          to="/welcome/home/post"
        >
          Home
        </Link>
        <Link
          className=" flex flex-col border-r justify-center w-full text-center h-14 hover:bg-primary-focus"
          to="/welcome"
        >
          Chat
        </Link>
        <Link
          className=" flex flex-col justify-center w-full text-center h-14"
          to="/welcome"
        >
          Account
        </Link>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default NavLanding;
