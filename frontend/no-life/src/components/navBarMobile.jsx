import { Link } from "react-router-dom";

const NavMobile = () => {
  return (
    <div className=" md:hidden bg-black/25 h-screen z-30">
      <div className=" md:hidden fixed z-40 h-screen w-80 bg-slate-50 font-geologica flex flex-col p-5 gap-5 pt-20">
        <Link
          className=" bg-slate-100 p-2 rounded-lg shadow"
          to="/welcome/home/post"
        >
          Home
        </Link>
        <Link
          className=" bg-slate-100 p-2 rounded-lg shadow"
          to="/welcome/home/post"
        >
          Chat
        </Link>
        <Link
          className=" bg-slate-100 p-2 rounded-lg shadow"
          to="/welcome/home/post"
        >
          Account
        </Link>
        <div className=" bg-slate-200 p-2 rounded-lg absolute bottom-5 left-5">
          <button>LogOut</button>
        </div>
      </div>
    </div>
  );
};

export default NavMobile;
