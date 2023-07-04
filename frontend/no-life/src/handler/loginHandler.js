import axios from "axios";
import Cookies from "js-cookie";
import { authAction } from "../redux/store";

const loginHandler = async (event, item, navigate, dispatch) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/login-user",
      item
    );
    const datas = await response.data;

    const { token, user } = datas;
    await Cookies.set("token", token);
    await Cookies.set("userId", user._id);
    await dispatch(authAction.login());
    setInterval(() => {
      navigate("/welcome");
    }, 3000);
    console.log(datas);
  } catch (error) {
    console.log(error);
  }
};

export { loginHandler };
