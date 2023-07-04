import { Outlet, useLoaderData } from "react-router-dom";

const Account = () => {
  const items = useLoaderData();
  return (
    <div className=" mt-16 font-geologica flex flex-col gap-3 h-full">
      <div className=" max-sm:m-3 w-1/5 max-sm:w-fit flex justify-start items-center gap-3 m-3 rounded-lg">
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
        <p>{items.data.username}</p>
      </div>
      <div className=" m-5 max-sm:m-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
