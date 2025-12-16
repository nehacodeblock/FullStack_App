"use client";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import { loginSchema, LoginSchemaType } from "@/app/schemas/loginSchema";
import { useState } from "react";
import { loginUser } from "@/app/services/authService";

const Login = () => {
  const methods = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
  });

  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmitData = async (data: LoginSchemaType) => {
    console.log("login!!!!");
    setLoading(true);
    setServerError("");
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", res.accessToken);

      router.push("/pages/dashboard");
    } catch (error: any) {
      setServerError(error?.response?.data?.message || "login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-y-auto py-10">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitData)}
          className="bg-white p-6 rounded-lg w-full max-w-sm  space-y-4"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}
          <FormInput
            label="Email"
            type="email"
            placeholder="enter email"
            name="email"
          ></FormInput>

          <FormInput
            label="Password"
            type="password"
            name="password"
          ></FormInput>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "login..." : "login"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
