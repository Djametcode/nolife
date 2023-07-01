import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    username: username,
    email: email,
    password: password,
  };

  console.log(userData);
  const registHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v11/no-life/regist-user",
        userData
      );
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=" p-3 max-sm:p-2 max-sm:text-sm rounded-lg focus:outline-none"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className=" p-3 max-sm:p-2 max-sm:text-sm rounded-lg focus:outline-none"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className=" flex justify-center">
          <button
            onClick={registHandler}
            className=" bg-white max-sm:p-2 max-sm:text-sm p-3 rounded-lg"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
