import z from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
export interface LoginResponse {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "user" | "guest";
  imageUrl?: string;
}

export const RegisterFormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "The passwords you entered do not match!",
  path: ["confirmPassword"],
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;

export type RegisterRequest = Omit<RegisterFormType, "confirmPassword">;

export interface RegisterResponse {
  message?: string;
  success?: boolean;
  username?: string;
  email?: string;
}
