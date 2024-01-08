import Link from "next/link";
import LoginForm from "./auth/login/page";

export default function Home() {
  return (
   <div className="w-full h-[90vh] grid place-items-center relative overflow-hidden">
      <div className="flex items-center justify-center flex-col z-40">
        <span className="mb-2 text-md font-semibold text-black">Selamat Datang di</span>
        <h1 className="text-6xl italic mb-4 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500">Techno Cashier</h1>
        <Link href={'/auth/login'} className="btn btn-sm shadow-md text-white bg-amber-400 hover:bg-amber-500">
          <span>Login</span>
        </Link>
      </div>
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 absolute top-[12%] left-[6%] blur-sm opacity-35"></div>
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 absolute top-[14%] left-[50%] blur-sm opacity-35"></div>
      <div className="w-24 h-24 rounded-full bg-gradient-to-b from-yellow-300 to-orange-400 absolute bottom-[10%] left-[20%] blur-sm opacity-40"></div>
      <div className="w-16 h-16 rounded-full bg-gradient-to-b from-orange-400 to-red-500 absolute bottom-[30%] right-[8%] blur-sm opacity-35"></div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-950 absolute bottom-[14%] right-[30%] blur-sm opacity-35"></div>
   </div>
  );
}
