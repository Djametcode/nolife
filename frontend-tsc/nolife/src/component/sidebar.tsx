import Image from "next/image";
import Link from "next/link";

export default function SideBarLarge() {
  return (
    <>
      <div className=" flex flex-col gap-10 items-start h-full">
        <div className=" text-3xl font-figtree">
          <h1>No Life</h1>
        </div>
        <div className=" flex flex-col gap-5 justify-start w-full h-full">
          <div className=" flex items-center gap-4">
            <Image src="/home.svg" height={30} width={30} alt={"home"} />
            <Link className=" text-base" href="/landing">
              Beranda
            </Link>
          </div>
          <div className=" flex items-center gap-4">
            <Image src="/messenger.svg" height={30} width={30} alt={"chat"} />
            <Link href="/landing">Chat</Link>
          </div>
          <div className=" flex items-center gap-4">
            <Image src="/add.svg" height={30} width={30} alt={"post"} />
            <Link href="/landing">post</Link>
          </div>
          <div className=" flex items-center gap-4">
            <Image
              src="/messenger.svg"
              height={30}
              width={30}
              alt={"account"}
            />
            <Link href="/user">Account</Link>
          </div>
        </div>
        <div className=" flex gap-5 items-center">
          <Image src="/hamburger.svg" height={30} width={30} alt={"account"} />
          <Link href="/user">Other</Link>
        </div>
      </div>
    </>
  );
}
