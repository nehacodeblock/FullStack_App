import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { FormError } from "./FormError";

type inputSizes = "sm" | "md" | "lg";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  inputSize?: inputSizes;
}

const FormInput = ({
  label,
  name,
  inputSize = "md",
  ...props
}: FormInputProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };
  const { register } = useFormContext();
  return (
    <div>
      <label className="block mb-1 font-medium text-gray-700">{label}</label>
      <input
        {...register(name)}
        {...props}
        className={`w-full border rounded-md outline-none focus:border-blue-500 border-gray-300 ${sizeClasses[inputSize]}`}
      />
      <FormError name={name} />
    </div>
  );
};
export default FormInput;
