import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className=" flex justify-start h-full font-geologica bg-slate-200">
      <div className=" basis-1/2 bg-landing"></div>
      <div className=" flex flex-col gap-3 basis-1/2 justify-center pl-32">
        <div>
          <h1 className=" text-5xl">Welcome to No-Life</h1>
          <p>Your introvert area</p>
        </div>
        <div>
          <Link className=" bg-slate-100 p-2 rounded-lg" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
