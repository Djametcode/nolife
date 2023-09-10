import axios from "axios";

interface Data {
    email: string | null,
    password: string | null
}

const loginHandler = async (data: Data) => {
    console.log(data);
    try {
        const response = await axios.post(
            "http://localhost:3000/api/v11/no-life/login-user",
            data
        );
        const result = await response.data;

        return result;
    } catch (error) {
        console.log(error);
    }
};

export default loginHandler;
