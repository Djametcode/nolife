import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../redux/store";
import { useState } from "react";

const HeaderComponent = () => {
  const dispatch = useDispatch();

  const [focus, setFocus] = useState(false);
  const toggleNavMobile = (dispatch) => {
    dispatch(authAction.toggleNavMobile());
  };

  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <div className=" max-sm:z-10 max-sm:h-16 h-16 flex gap-1 justify-start items-center font-geologica">
      <div
        onClick={() => toggleNavMobile(dispatch)}
        className=" cursor-pointer pl-5 md:hidden"
      >
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
      {isLogin && (
        <div className=" absolute right-5">
          <div className=" relative flex justify-start items-center gap-3">
            {!focus && (
              <div className=" absolute left-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            )}
            <input
              className=" pl-10 placeholder:pl-10 max-sm:p-1 p-2 focus:outline-none w-full rounded-lg"
              type="text"
              placeholder="Search .."
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
