import axios from "axios";

const loginHandler = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(
      "https://nolife-backend.vercel.app/api/v11/no-life/login-user",
      data
    );
    const result = await response.data;

    return console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default loginHandler;
