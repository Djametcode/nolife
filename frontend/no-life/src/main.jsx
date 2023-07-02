import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/rootLayout.jsx";
import SignUp from "./components/signUp";
import LoginComponents from "./components/login";
import NavigateLogin from "./components/navigateLogin";
import LandingUser from "./components/landingUser";
import Space from "./components/space";
import Greeting from "./components/greetings";
import { getAllPost } from "./handler/getAllPost";
import Profile from "./components/profile";
import NavLanding from "./components/nav";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <div className=" h-full w-full  flex justify-center items-center">
            <div>
              <Greeting />
              <NavigateLogin />
            </div>
          </div>
        ),
      },
      {
        path: "/login",
        element: (
          <div className=" w-full h-full flex">
            <Space />
            <div className=" basis-1/2 -translate-y-20">
              <h1 className=" flex justify-center items-center translate-y-56 font-geologica text-4xl">
                Login
              </h1>
              <LoginComponents />
            </div>
          </div>
        ),
      },
      {
        path: "/signUp",
        element: (
          <div className=" w-full h-full flex">
            <Space />
            <div className=" basis-1/2 -translate-y-20">
              <h1 className=" flex justify-center items-center translate-y-56 font-geologica text-4xl">
                SignUp
              </h1>
              <SignUp />
            </div>
          </div>
        ),
      },
      {
        path: "welcome",
        element: <Profile />,
        children: [
          {
            path: "home",
            element: <NavLanding />,
            children: [
              {
                path: "post",
                element: <LandingUser />,
                loader: getAllPost,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
