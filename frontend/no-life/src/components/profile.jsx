/* eslint-disable react/jsx-key */
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logOutHandler from "../handler/LoggingOutHandler";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import getCurrentUser from "../handler/getCurrentUser";

const Profile = () => {
  const location = useLocation();
  const currentLocation = location.pathname;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogOut = useSelector((state) => state.auth.isLogOut);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getCurrUser = async () => {
      try {
        const item = await getCurrentUser();
        setUser(item.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrUser();
  }, []);

  return (
    <div className=" max-sm:flex-col flex shadow-md w-screen h-full">
      <div className=" max-sm:hidden max-sm:pt-0 pt-28 fixed max-sm:w-screen bg-slate-100 w-[300px] h-screen font-geologica p-10">
        <div className=" flex flex-col gap-3">
          {user.map((item) => (
            <div className=" flex h-12 rounded-lg shadow-sm items-center gap-3 text-black">
              {item.avatar === "" ? (
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className=" w-12 h-12"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                  />
                </svg>
              ) : (
                <div className=" w-12">
                  <img className=" rounded-full" src={item.avatar} />
                </div>
              )}
              <p className=" text-black">{item.username}</p>
            </div>
          ))}
          <Link
            className={`rounded-lg p-2 ${
              currentLocation === "/welcome"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
            to="/welcome"
          >
            Home
          </Link>
          <Link
            className={`rounded-lg p-2 ${
              currentLocation === "/welcome/post"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
            to="/welcome/post"
          >
            Post
          </Link>
          <Link
            className={`rounded-lg p-2 ${
              currentLocation === "/welcome/search"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
            to="/welcome/search"
          >
            Search
          </Link>
          <Link
            className={`rounded-lg p-2 ${
              currentLocation === "/welcome/activity"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
            to="/welcome/activity"
          >
            Activity
          </Link>
          <Link
            to="/welcome/account"
            className={`rounded-lg p-2 ${
              currentLocation === "/welcome/account"
                ? "bg-primary text-white"
                : "bg-white"
            }`}
          >
            Account
          </Link>
        </div>
        <div className=" absolute bottom-24">
          <button
            onClick={() => logOutHandler(navigate, dispatch)}
            className=" bg-slate-50 rounded-lg p-2 shadow"
          >
            {isLogOut ? "Logging out ..." : "Log Out"}
          </button>
        </div>
      </div>
      <div className=" max-sm:ml-0 ml-[325px] w-full md:w-1/2 md:flex h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
