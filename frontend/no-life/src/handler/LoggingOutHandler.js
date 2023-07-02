import Cookies from "js-cookie";
import { authAction } from "../redux/store";

const logOutHandler = (navigate, dispatch) => {
  Cookies.remove("token");
  dispatch(authAction.logOut());
  navigate("/login");
};

export default logOutHandler;
