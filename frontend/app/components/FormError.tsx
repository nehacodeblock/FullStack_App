import { useFormContext } from "react-hook-form";

interface FormErrorProps {
  name: string;
}
export const FormError = ({ name }: FormErrorProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const FiledError = errors[name];
  if (!FiledError) return null;
  return (
    <p className="text-red-500">
      {String(FiledError?.message ?? "Invalid value")}
    </p>
  );
};
