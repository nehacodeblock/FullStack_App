"use client";
import Button from "@/app/components/Button";
import { logout, profile, profileResponse } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<profileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    profile()
      .then((data: profileResponse) => setUser(data))
      .catch(() => {
        logout();
        router.replace("/pages/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="mb-1 text-2xl font-bold text-gray-800">
          Welcome, {user?.name}
        </h1>

        <p className="mb-6 text-sm text-gray-500">{user?.email}</p>

        <div className="rounded border p-4 text-sm text-gray-700 mb-6">
          You are successfully logged in.
        </div>

        <Button
          onClick={() => {
            logout();
            router.push("/pages/login");
          }}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default dashboard;
