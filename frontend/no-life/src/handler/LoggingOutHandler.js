import Cookies from "js-cookie";
import { authAction } from "../redux/store";

const logOutHandler = (navigate, dispatch) => {
  Cookies.remove("token");
  dispatch(authAction.logOut());
  dispatch(authAction.closeNavMobile());
  navigate("/login");
};

export default logOutHandler;
