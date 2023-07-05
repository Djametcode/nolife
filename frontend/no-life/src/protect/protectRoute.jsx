import Cookies from "js-cookie";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = (path, element) => {
  const token = Cookies.get("token");

  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
