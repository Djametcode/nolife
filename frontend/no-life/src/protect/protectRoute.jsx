/* eslint-disable react/prop-types */
import { Navigate, Route } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ element: Component, ...rest }) {
  const token = Cookies.get("token");
  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/login" replace />}
    ></Route>
  );
}

export default ProtectedRoute;
