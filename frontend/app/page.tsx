"use client";
import { useRouter } from "next/navigation";
import Button from "./components/Button";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">
      <h1 className="text-3xl font-bold">Welcome to FullStackApp</h1>
      <p className="text-gray-700">Please login or sign up to continue</p>
      <div className="flex gap-4">
        <Button onClick={() => router.push("pages/login")}>Login</Button>
        <Button onClick={() => router.push("/pages/signup")}>Sign Up</Button>
      </div>
    </div>
  );
}
