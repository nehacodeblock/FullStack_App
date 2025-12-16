"use client";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { signupSchema, signupSchemaType } from "@/app/schemas/signupSchema";
import FormInput from "@/app/components/FormInput";
import { useState } from "react";
import { signUpUser } from "@/app/services/authService";
import Button from "@/app/components/Button";

const SignUpPage = () => {
  const methods = useForm<signupSchemaType>({
    resolver: yupResolver(signupSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmitData = async (data: signupSchemaType) => {
    setLoading(true);
    setServerError("");
    try {
      await signUpUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.replace("/pages/login");
    } catch (error: any) {
      setServerError(error?.response?.data?.message || "something went wrong");
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
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Name"
              inputSize="md"
              placeholder="enter your name"
              name="name"
            ></FormInput>
            <FormInput
              label="Email"
              inputSize="md"
              type="email"
              placeholder="enter email"
              name="email"
            ></FormInput>
          </div>

          <FormInput
            label="Password"
            type="password"
            name="password"
          ></FormInput>

          <FormInput
            label=" Confirm Password"
            type="password"
            name="confirmPassword"
          ></FormInput>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
