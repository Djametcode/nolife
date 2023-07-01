import { Link } from "react-router-dom";

const LoginComponents = () => {
  return (
    <div className=" flex justify-center items-center h-full w-full font-geologica basis-1/2">
      <form className=" flex flex-col gap-3 bg-slate-100 max-sm:m-5 max-sm:h-[350px] basis-[475px] h-[400px] max-sm:p-5 p-10 shadow-md rounded-lg">
        <input
          className=" p-3 rounded-lg focus:outline-none max-sm:p-2"
          type="email"
          placeholder="Email"
        />
        <input
          className=" p-3 rounded-lg focus:outline-none max-sm:p-2"
          type="password"
          placeholder="Password"
        />
        <div className=" flex justify-center">
          <button className=" bg-white p-3 max-sm:p-2 rounded-lg">Login</button>
        </div>
        <div className=" flex justify-center gap-2 text-sm max-sm:text-xs">
          <p>No account ?</p>
          <Link to="/signUp" className=" underline">
            Create Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginComponents;
