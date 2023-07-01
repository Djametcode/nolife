import { useState } from "react";

const HeaderComponent = () => {
  const [isLogin, setIslogin] = useState(false);
  return (
    <div className=" max-sm:z-10 max-sm:h-14 h-20 flex justify-start items-center font-geologica">
      <div>
        <h1 className=" text-primary-content max-sm:text-lg text-4xl pl-5">
          No-Life
        </h1>
      </div>
      {isLogin && (
        <div className=" absolute right-5 flex items-center gap-5">
          <ul className=" flex gap-2 text-lg text-primary-content items-center">
            <li>Beranda</li>
            <li>Chat</li>
            <li>Akun</li>
          </ul>
          <div className=" flex gap-3 items-center">
            <button className=" bg-accent-focus p-2 rounded-lg text-warning-content">
              Log Out
            </button>
          </div>
        </div>
      )}
      {/* {!isLogin && (
        <div className=" absolute right-5 bg-accent-focus p-2 rounded-lg text-warning-content">
          <button>Login</button>
        </div>
      )} */}
    </div>
  );
};

export default HeaderComponent;
