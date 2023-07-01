import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/rootLayout.jsx";
import SignUp from "./components/signUp";
import LoginComponents from "./components/login";
import Landing from "./components/landing";
import NavigateLogin from "./components/navigateLogin";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <NavigateLogin />,
      },
      {
        path: "/login",
        element: <LoginComponents />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
