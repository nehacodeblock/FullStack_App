"use client";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { schema, SchemaType } from "@/app/schemas/schema";
import FormInput from "@/app/components/FormInput";

const Login = () => {
  const methods = useForm<SchemaType>({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const router = useRouter();

  const onSubmitData = async (data: SchemaType) => {
    console.log("login!!!!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-y-auto py-10">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitData)}
          className="bg-white p-6 rounded-lg w-full max-w-sm  space-y-4"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className={`py-2 mt-4 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "login..." : "login"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Login;
