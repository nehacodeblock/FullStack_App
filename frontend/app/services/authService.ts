import { api } from "../util/api";

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export const signUpUser = async (data: SignUpPayload) => {
  const res = await api.post("/auth/signup,data");
  return res.data;
};
