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
