export interface LoginFormType {
  username?: string;
  password?: string;
  remember?: boolean;
}

export interface LoginResponse {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "user" | "guest";
  imageUrl?: string;
}

export interface RegisterFormType {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}

export interface RegisterResponse {
  message?: string;
  success?: boolean;
  username?: string;
  email?: string;
}

