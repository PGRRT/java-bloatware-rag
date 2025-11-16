// import { apiClientBrowser } from "@/lib/api/backendApi";
// import { Credentials, RegisterData, User } from "@/types/user";

import backendApi from "@/api/backendApi";

export const userApi = {
  getChats: async (): Promise<any[]> => backendApi.get("/api/v1/chats"),
  createChat: async (title: string): Promise<any> => backendApi.post("/api/v1/chats", { title }),
  deleteChat: async (chatId: string): Promise<void> => backendApi.delete(`/api/v1/chats/${chatId}`),
  updateChat: async (chatId: string, title: string): Promise<any> =>
    backendApi.put(`/api/v1/chats/${chatId}`, { title }),

  getMessages: async (chatId: string): Promise<any[]> => backendApi.get(`/api/v1/chats/${chatId}/messages`),

  postMessage: async (chatId: string, content: string, sender = "USER"): Promise<void> =>
    backendApi.post(`/api/v1/chats/${chatId}/messages`, { content }), // userId


  // getUserClient: async () => apiClientBrowser.get("/api/v1/auth/me"),

  // loginUserClient: async (data: Credentials) => apiClientBrowser.post("/api/v1/auth/login", data),
  // saveUserClient: async (data: RegisterData) => apiClientBrowser.post("/api/v1/auth/register", data),
  // logoutUserClient: async () => apiClientBrowser.post("/api/v1/auth/logout"),
  // refreshUserClient: async () => apiClientBrowser.get("/api/v1/auth/refresh"),

  // createEmailVerificationPassword: async (email: string) => apiClientBrowser.post("/api/v1/user/create-otp", { email }),
};
