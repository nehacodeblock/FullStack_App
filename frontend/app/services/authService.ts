import { api } from "../util/api";

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface loginPayload {
  email: string;
  password: string;
}

export interface profileResponse {
  id: string;
  email: string;
  name: string;
}

export const signUpUser = async (data: SignUpPayload) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const loginUser = async (data: loginPayload) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const profile = async (): Promise<profileResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("NO TOKEN FOUND");
  }
  const res = await api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
