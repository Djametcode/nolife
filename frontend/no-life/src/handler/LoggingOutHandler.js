import Cookies from "js-cookie";
import { authAction } from "../redux/store";

const logOutHandler = (navigate, dispatch) => {
  Cookies.remove("token");
  dispatch(authAction.logOut());
  const item = setInterval(() => {
    dispatch(authAction.closeNavMobile());
    navigate("/login");
    clearInterval(item);
  }, 3000);
};

export default logOutHandler;
