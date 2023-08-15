import Link from "next/link";

export default function LandingPage() {
  const isLogin = false;
  const date = new Date().getFullYear();
  return (
    <div className=" h-full">
      <div className=" sticky top-0 flex bg-slate-200/50 shadow-sm h-14 max-sm:pl-5 max-sm:pr-5 pl-16 pr-16 items-center gap-5 justify-between font-figtree">
        <div className=" text-3xl max-sm:text-2xl">
          <h1 className=" font-figtree">No Life</h1>
        </div>
        {isLogin ? (
          <div className=" flex gap-3 text-xl">
            <Link href="/">Home</Link>
            <Link href="/">Chat</Link>
            <Link href="/">Account</Link>
          </div>
        ) : null}
        <div className=" text-base border h-10 flex items-center pl-3 pr-3 rounded-xl">
          <Link className=" font-figtree" href="/auth/signup">
            Sign Up
          </Link>
        </div>
      </div>
      <div className=" h-full w-full bg-bg5 bg-no-repeat bg-cover bg-center flex flex-col items-center bg-slate-50 gap-4 justify-center text-center p-16 font-figtree">
        <div>
          <h1 className=" text-4xl max-sm:text-3xl text-gray-900">
            Welcome to No Life
          </h1>
          <p className=" text-sm text-gray-900">
            social media karya anak bangsa
          </p>
        </div>
        <div>
          <Link
            className=" hover:bg-slate-500 hover:border-none max-sm:text-white hover:text-white rounded-xl border p-2"
            href="/auth"
          >
            Login
          </Link>
        </div>
      </div>
      <div className=" max-sm:pl-5 pl-16 fixed w-full bottom-0 bg-slate-200/50 font-figtree text-sm flex justify-start items-center gap-5 h-14">
        <p>&copy; Copyright {date}</p> <p>| </p>
        <p>Djamet Coder</p>
      </div>
    </div>
  );
}
