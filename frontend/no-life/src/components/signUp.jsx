import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className=" flex justify-center items-center h-full font-geologica">
      <form className=" flex flex-col gap-3 bg-slate-100 max-sm:m-5 max-sm:h-[350px] basis-[475px] h-[400px] p-10 shadow-md rounded-lg">
        <div>
          <Link to="/login" relative="path" className=" text-base">
            {` Back to Login`}
          </Link>
        </div>
        <input
          className=" p-3 max-sm:p-2 max-sm:text-sm rounded-lg focus:outline-none"
          type="email"
          placeholder="Email"
        />
        <input
          className=" p-3 max-sm:p-2 max-sm:text-sm rounded-lg focus:outline-none"
          type="text"
          placeholder="Username"
        />
        <input
          className=" p-3 max-sm:p-2 max-sm:text-sm rounded-lg focus:outline-none"
          type="password"
          placeholder="Password"
        />
        <div className=" flex justify-center">
          <button className=" bg-white max-sm:p-2 max-sm:text-sm p-3 rounded-lg">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
