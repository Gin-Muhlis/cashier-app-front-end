import LoginForm from "./Auth/login";

export default function Home() {
  return (
    <div className="p-10 min-h-[90vh] flex justify-center items-center">
      {/* <div className="rounded w-2/5 overflow-hidden">
        <div className="text-xl text-center font-bold bg-amber-400 p-3 text-white">
          LOGIN
        </div>
        <div className="px-5 py-9 bg-white shadow shadow-md">
          <LoginForm />
        </div>
      </div> */}
      <h1>Techno Cashier</h1>
    </div>
  );
}
