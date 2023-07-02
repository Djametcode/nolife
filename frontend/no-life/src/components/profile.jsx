import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className=" max-sm:flex-col flex shadow-md">
      <div className=" max-sm:hidden pt-28 fixed max-sm:w-screen w-[300px] bg-slate-200 h-screen font-geologica p-10">
        <p>User Profile</p>
      </div>
      <div className=" max-sm:ml-0 ml-[300px] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
