import axios from "axios";

const loginHandler = async (event, item, func, navigate) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v11/no-life/login-user",
      item
    );
    const datas = await response.data;
    navigate("/landing-user");
    func(true);
    console.log(datas);
  } catch (error) {
    console.log(error);
  }
};

export { loginHandler };
