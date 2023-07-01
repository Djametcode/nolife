import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className=" flex justify-center items-center h-full font-geologica">
      <form className=" flex flex-col gap-3 bg-slate-100 basis-[475px] h-[400px] p-10 shadow-md rounded-lg">
        <div>
          <Link
            to="/login"
            relative="path"
            className=" text-base underline underline-offset-2"
          >
            {` Back to Login`}
          </Link>
        </div>
        <input
          className=" p-3 rounded-lg focus:outline-none"
          type="email"
          placeholder="Email"
        />
        <input
          className=" p-3 rounded-lg focus:outline-none"
          type="text"
          placeholder="Username"
        />
        <input
          className=" p-3 rounded-lg focus:outline-none"
          type="password"
          placeholder="Password"
        />
        <div className=" flex justify-center">
          <button className=" bg-white p-3 rounded-lg">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
