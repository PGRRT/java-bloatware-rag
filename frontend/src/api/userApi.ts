import apiClient from "@/api/apiClient";
import type { AxiosResponse } from "axios";

import type { Credentials, RegisterData, User } from "@/types/user";

export const userApi = {
  getMe: async () => apiClient.get("/api/v1/users/me"),
  deleteMe: async () => apiClient.delete("/api/v1/users/me"),
  createOtp: async (email: string) =>
    apiClient.post("/api/v1/users/otp", { email }),
};
