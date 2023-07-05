/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/header";
import Footer from "../components/footer";
import NavMobile from "../components/navBarMobile";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const isToggle = useSelector((state) => state.auth.isToggle);

  return (
    <div className=" h-screen w-screen">
      <div className=" fixed top-0 w-full z-20 bg-primary shadow-md">
        <HeaderComponent />
      </div>
      {isToggle && <NavMobile />}
      <div className=" flex justify-start">
        <Outlet />
      </div>
      <div className=" fixed bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
