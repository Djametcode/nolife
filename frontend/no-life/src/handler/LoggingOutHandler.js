import Cookies from "js-cookie";
import { authAction } from "../redux/store";

const logOutHandler = (navigate, dispatch) => {
  Cookies.remove("token");
  dispatch(authAction.logOut());
  setInterval(() => {
    dispatch(authAction.closeNavMobile());
    navigate("/login");
  }, 3000);
};

export default logOutHandler;
