import Link from "next/link";

export default function Home() {
  return (
    <div className=" bg-slate-50 h-screen flex justify-center items-center">
      <div className=" font-montserrat">
        <h1 className=" text-3xl font-geologica">Welcome to No-life</h1>
        <div className=" flex justify-center">
          <button className=" bg-slate-100 p-2 rounded-lg shadow-sm">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
