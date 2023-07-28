const { default: axios } = require("axios");

const registHandler = async (data) => {
  event.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v11/no-life/regist-user",
      data
    );
    const result = await response.data;

    return console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default registHandler;
