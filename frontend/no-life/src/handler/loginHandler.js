import axios from "axios";
import Cookies from "js-cookie";
import { authAction } from "../redux/store";

const loginHandler = async (event, item, navigate, dispatch) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "https://wandering-undershirt-dog.cyclic.app//api/v11/no-life/login-user",
      item
    );
    const datas = await response.data;

    const { token } = datas;
    await Cookies.set("token", token);
    await dispatch(authAction.login());
    await navigate("/welcome/home/post");
    console.log(datas);
  } catch (error) {
    console.log(error);
  }
};

export { loginHandler };
