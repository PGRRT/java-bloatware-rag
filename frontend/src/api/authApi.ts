import apiClient from "@/api/apiClient";
import type { AxiosResponse } from "axios";

import type {
  Credentials,
  RegisterData,
  User,
  AuthResponse,
} from "@/types/user";

export const authApi = {
  login: async (data: Credentials): Promise<AxiosResponse<AuthResponse>> =>
    apiClient.post("/api/v1/auth/login", data),
  register: async (data: RegisterData): Promise<AxiosResponse<AuthResponse>> =>
    apiClient.post("/api/v1/auth/register", data),
  logout: async (): Promise<AxiosResponse<void>> =>
    apiClient.post("/api/v1/auth/logout"),
  refresh: async (): Promise<AxiosResponse<AuthResponse>> =>
    apiClient.get("/api/v1/auth/refresh"),
};
