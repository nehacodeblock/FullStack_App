import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .min(4, "Min 4 characters required")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password do not match")
    .required("password is required"),
});

export type signupSchemaType = yup.InferType<typeof signupSchema>;
