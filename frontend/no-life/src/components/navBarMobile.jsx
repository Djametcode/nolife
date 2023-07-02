import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authAction } from "../redux/store";
import logOutHandler from "../handler/LoggingOutHandler";

const NavMobile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentLocation = location.pathname;
  const navigate = useNavigate();
  return (
    <div className=" transition-all md:hidden bg-black/25 h-screen z-30">
      <div className=" md:hidden fixed z-40 h-screen w-80 bg-slate-100 rounded-tr-xl rounded-br-xl transition-all font-geologica flex flex-col p-5 gap-5 pt-20">
        <Link
          onClick={() => dispatch(authAction.closeNavMobile())}
          className={`rounded-lg p-2 ${
            currentLocation === "/welcome"
              ? "bg-primary text-white"
              : "bg-white"
          }`}
          to="/welcome"
        >
          Home
        </Link>
        <Link
          onClick={() => dispatch(authAction.closeNavMobile())}
          className={`rounded-lg p-2 ${
            currentLocation === "/welcome/chat"
              ? "bg-primary text-white"
              : "bg-white"
          }`}
          to="/welcome/chat"
        >
          Chat
        </Link>
        <Link
          onClick={() => dispatch(authAction.closeNavMobile())}
          className={`rounded-lg p-2 ${
            currentLocation === "/welcome/account"
              ? "bg-primary text-white"
              : "bg-white"
          }`}
          to="/welcome/account"
        >
          Account
        </Link>
        <div className=" bg-slate-200 p-2 rounded-lg absolute bottom-5 left-5">
          <button onClick={() => logOutHandler(navigate, dispatch)}>
            LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavMobile;
