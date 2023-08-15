import Link from "next/link";

export default function NavbarPc() {
  return (
    <div className=" h-screen w-72 mt-16 flex flex-col pl-10 gap-3 font-geologica pt-16">
      <Link href="/landing">Home</Link>
      <Link href="/search">Search</Link>
      <Link href="/create-post">Post</Link>
      <Link href="/profile">Account</Link>
    </div>
  );
}
