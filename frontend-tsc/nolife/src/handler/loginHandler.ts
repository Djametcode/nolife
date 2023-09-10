import axios from "axios";
import React from "react";

interface Data {
    email: string | null,
    password: string | null
}

const loginHandler = async (data: Data, e: React.FormEvent) => {
    e.preventDefault()
    try {
        const response = await axios.post(
            "https://wandering-undershirt-dog.cyclic.app/api/v11/no-life/login-user",
            data
        );
        const result = await response.data;

        return result;
    } catch (error) {
        console.log(error);
    }
};

export default loginHandler;
