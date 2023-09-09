const { default: axios } = require("axios");

interface Data {
    email: string | null,
    password: string | null
}

const registHandler = async (data: Data) => {
    try {
        const response = await axios.post(
            "https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/regist-user",
            data
        );
        const result = await response.data;

        return console.log(result);
    } catch (error) {
        console.log(error);
    }
};

export default registHandler;
