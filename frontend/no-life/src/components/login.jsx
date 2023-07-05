import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginHandler } from "../handler/loginHandler";
import { useDispatch, useSelector } from "react-redux";

const LoginComponents = () => {
  const navigate = useNavigate();
  const [emailUser, setEmail] = useState("");
  const [passUser, setPass] = useState("");

  const data = {
    email: emailUser,
    password: passUser,
  };

  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.auth.isLogin);

  const [text, setText] = useState();
  const [isError, setIsError] = useState(false);

  return (
    <div className=" flex justify-center items-center h-full w-full font-geologica">
      <form className=" flex flex-col gap-3 bg-slate-100 max-sm:m-5 max-sm:h-[350px] basis-[475px] h-[400px] max-sm:p-5 p-10 shadow-md rounded-lg">
        <input
          className=" p-3 rounded-lg focus:outline-none max-sm:p-2 max-sm:text-sm"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className=" p-3 rounded-lg focus:outline-none max-sm:p-2 max-sm:text-sm"
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <div className=" text-xs italic text-warning">
          {isError ? <p>{text}</p> : null}
        </div>
        <div className=" flex justify-center">
          <button
            disabled={isLogin}
            onClick={(e) =>
              loginHandler(e, data, navigate, dispatch, setIsError, setText)
            }
            className=" bg-white w-16 md:p-2 max-sm:p-2 rounded-lg"
          >
            {isLogin ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Login"
            )}
          </button>
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
