import { Link } from "react-router-dom";

const NavigateLogin = () => {
  return (
    <div className=" flex justify-center font-geologica">
      <Link className=" p-3 bg-slate-300 rounded-xl" to="/login">
        Login
      </Link>
    </div>
  );
};

export default NavigateLogin;
