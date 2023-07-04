/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Protectedroute = ({ element: Element, loader: getData, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    const getAllData = async () => {
      try {
        const data = await getData();
        if (token) {
          setIsAuth(true);
        }

        return data;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllData();
  }, [getData]);

  if (isLoading) {
    return <div>Loading ......</div>;
  }

  return isAuth ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default Protectedroute;
