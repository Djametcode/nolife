import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layout/rootLayout.jsx";
import SignUp from "./components/signUp";
import LoginComponents from "./components/login";
import NavigateLogin from "./components/navigateLogin";
import LandingUser from "./components/landingUser";
import Space from "./components/space";
import Greeting from "./components/greetings";
import { getAllPost } from "./handler/getAllPost";
import Profile from "./components/profile";
import { Provider } from "react-redux";
import store from "./redux/store";
import getCurrentUser from "./handler/getCurrentUser";
import Chat from "./components/chat";
import Account from "./components/account";
import MyPost from "./components/myPost";
import getMyPost from "./handler/getMyPost";
import PostForm from "./components/postForm";
import ProtectedRoute from "./protect/protectRoute";
import Protectedroute from "./protect/protectRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <div className=" h-full w-full  flex flex-col items-center">
            <Greeting />
          </div>
        ),
      },
      {
        path: "/login",
        element: (
          <div className=" w-full h-full flex max-sm:flex-col max-sm:mt-48">
            <Space />
            <div className=" basis-1/2 -translate-y-20">
              <h1 className=" flex justify-center items-center max-sm:translate-y-0 translate-y-56 font-geologica text-4xl">
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
          <div className=" w-full h-full flex max-sm:flex-col max-sm:mt-48">
            <Space />
            <div className=" basis-1/2 -translate-y-20">
              <h1 className=" flex justify-center items-center max-sm:translate-y-0 translate-y-56 font-geologica text-4xl">
                SignUp
              </h1>
              <SignUp />
            </div>
          </div>
        ),
      },
      {
        path: "/welcome",
        element: (
          <Protectedroute>
            <Profile />
          </Protectedroute>
        ),
        loader: getCurrentUser,
        children: [
          {
            path: "",
            element: (
              <Protectedroute>
                <LandingUser />
              </Protectedroute>
            ),
            loader: getAllPost,
          },
          {
            path: "chat",
            element: (
              <Protectedroute>
                <Chat />
              </Protectedroute>
            ),
          },
          {
            path: "account",
            element: (
              <Protectedroute>
                <Account />
              </Protectedroute>
            ),
            loader: getCurrentUser,
            children: [
              {
                path: "",
                element: (
                  <Protectedroute>
                    <MyPost />
                  </Protectedroute>
                ),
                loader: getMyPost,
              },
            ],
          },
          {
            path: "post",
            element: (
              <Protectedroute>
                <PostForm />
              </Protectedroute>
            ),
          },
        ],
      },
    ],
  },
]);

const routerElement = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout />}>
      <Route
        path="/"
        element={
          <div className=" h-full w-full  flex flex-col items-center">
            <Greeting />
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div className=" w-full h-full flex max-sm:flex-col max-sm:mt-48">
            <Space />
            <div className=" basis-1/2 -translate-y-20">
              <h1 className=" flex justify-center items-center max-sm:translate-y-0 translate-y-56 font-geologica text-4xl">
                Login
              </h1>
              <LoginComponents />
            </div>
          </div>
        }
      />
      <Route
        path="/signUp"
        element={
          <div className=" w-full h-full flex max-sm:flex-col max-sm:mt-48">
            <Space />
            <div className=" basis-1/2 -translate-y-20">
              <h1 className=" flex justify-center items-center max-sm:translate-y-0 translate-y-56 font-geologica text-4xl">
                SignUp
              </h1>
              <SignUp />
            </div>
          </div>
        }
      />
      <Route path="welcome" element={<Profile />} loader={getCurrentUser}>
        <Route path="" element={<LandingUser />} />
        <Route path="chat" element={<Chat />} />
        <Route path="account" loader={getCurrentUser}>
          <Route path="" element={<MyPost />} loader={getMyPost} />
        </Route>
        <Route path="post" element={<PostForm />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routerElement} />
    </Provider>
  </React.StrictMode>
);
