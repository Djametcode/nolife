import NavigateLogin from "./navigateLogin";

const Greeting = () => {
  return (
    <div className="  font-geologica md:bg-transparent max-sm:h-screen max-sm:flex max-sm:justify-center max-sm:items-center">
      <div className=" flex flex-col items-center">
        <h1 className=" max-sm:text-xl text-4xl">Welcome to No-Life</h1>
        <p>Your introvert area</p>
        <NavigateLogin />
      </div>
    </div>
  );
};

export default Greeting;
