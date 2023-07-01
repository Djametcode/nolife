/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/header";
import Footer from "../components/footer";
import Space from "../components/space";

const RootLayout = () => {
  return (
    <div className=" h-screen w-screen">
      <div className=" sticky top-0 z-20 bg-primary">
        <HeaderComponent />
      </div>
      <div className=" max-sm:z-0 max-sm:flex-col flex h-full w-full relative z-0">
        <Space />
        <div className=" flex flex-col basis-1/2 max-sm:pt-5 pt-20 gap-10">
          <div className=" font-geologica">
            <div className=" flex flex-col items-center">
              <h1 className=" max-sm:text-xl text-4xl">Welcome to No-Life</h1>
              <p>Your introvert area</p>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <div className=" fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
