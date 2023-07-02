import { useContext } from "react";
import { userContext } from "../context/context";

const HeaderComponent = () => {
  const { isLogin, logOut } = useContext(userContext);
  return (
    <div className=" max-sm:z-10 max-sm:h-16 h-20 flex gap-3 justify-start items-center font-geologica">
      <div className=" pl-5 md:hidden">
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className=" w-8 h-8 text-white"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
          />
        </svg>
      </div>
      <div>
        <h1 className=" text-white max-sm:text-lg text-4xl pl-5">No-Life</h1>
      </div>
      {/* {isLogin && (
        <div className=" absolute right-5 flex items-center gap-5">
          <ul className=" flex gap-2 text-lg text-primary-content items-center">
            <li>Beranda</li>
            <li>Chat</li>
            <li>Akun</li>
          </ul>
          <div className=" flex gap-3 items-center">
            <button
              onClick={logOut}
              className=" bg-accent-focus p-2 rounded-lg text-warning-content"
            >
              Log Out
            </button>
          </div>
        </div>
      )} */}
      {/* {!isLogin && (
        <div className=" absolute right-5 bg-accent-focus p-2 rounded-lg text-warning-content">
          <button>Login</button>
        </div>
      )} */}
    </div>
  );
};

export default HeaderComponent;
