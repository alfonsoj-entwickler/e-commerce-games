import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { LoginForm } from "./ui/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Login</h1>

      <div className="flex flex-col">
        <LoginForm />

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Create a new count
        </Link>
      </div>
    </div>
  );
}
