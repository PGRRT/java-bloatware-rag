export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id?: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

// export interface RegisterData extends User {
//   confirmPassword: string;
//   otp: string;
// }

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
  otp: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}
