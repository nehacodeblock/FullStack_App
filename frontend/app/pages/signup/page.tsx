"use client";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { schema, SchemaType } from "@/app/schemas/schema";
import FormInput from "@/app/components/FormInput";
import { useState } from "react";
import { signUpUser } from "@/app/services/authService";

const SignUpPage = () => {
  const methods = useForm<SchemaType>({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onSubmitData = async (data: SchemaType) => {
    setLoading(true);
    setServerError("");
    try {
      await signUpUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.replace("pages/login");
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

          <button
            type="submit"
            disabled={loading}
            className={`py-2 mt-4 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUpPage;
