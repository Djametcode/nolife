import axios from "axios";
import Cookies from "js-cookie";

const loginHandler = async (event, item, func, navigate) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v11/no-life/login-user",
      item
    );
    const datas = await response.data;

    const { token } = datas;

    await Cookies.set("token", token);
    await func(true);
    await navigate("/welcome/home/post");
    console.log(datas);
  } catch (error) {
    console.log(error);
  }
};

export { loginHandler };
