"use client";

import Image from "next/image";
import { Form, Input, Button, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "../auth.service";
import { RegisterFormType } from "../auth.type";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ApiError } from "@/services/axiosBaseQuery";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema } from "../auth.type";

const RegisterPage = () => {
  const router = useRouter();
  const [registerMutation, { isLoading, isError, error }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormType> = async (values: RegisterFormType) => {
    try {
      // Remove confirmPassword before sending to backend if the backend doesn't expect it
      const { confirmPassword, ...registerData } = values;
      await registerMutation(registerData).unwrap();
      message.success("Registration successful! Please log in.");
      router.push("/auth/login?registered=true");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const getErrorMessage = (err: unknown): string => {
    if (!err) return "Registration failed. Please try again.";
    const apiError = err as ApiError;
    return apiError.message || "An unexpected error occurred. Please try again.";
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 min-h-screen bg-[#fafaf9]">
      {/* Banner Section (Col span 5 on desktop) */}
      <div className="hidden md:flex md:col-span-5 flex-col justify-center items-center h-screen bg-linear-to-br from-[#122c3c] to-[#0d202c] text-[#ffffff] p-12 relative overflow-hidden">
        {/* Decorative subtle background glows */}
        <div className="absolute top-[-10%] right-[-10%] w-87.5 h-87.5 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-112.5 h-112.5 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        {/* left grid UI */}
        <div className="z-10 flex flex-col items-center max-w-lg text-center">
          <Image
            src="/png/EazyTrade.png"
            alt="EazyTrade Logo"
            width={180}
            height={180}
            className="mb-8 drop-shadow-xl"
            priority
          />
          <h1 className="font-extrabold text-4xl mb-4 tracking-tight">
            Join EazyTrade Today
          </h1>
          <p className="text-blue-100/80 text-lg font-medium leading-relaxed">
            Create an account to start shopping, selling, and connecting with
            buyers and sellers across our modern e-commerce ecosystem.
          </p>
        </div>
      </div>

      {/* Right grid UI (registration form section) */}
      <div className="col-span-8 md:col-span-3 flex flex-col justify-center items-center min-h-screen p-8 sm:p-12 md:p-16 bg-white shadow-2xl z-10 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          {/* Logo/Header for Mobile views */}
          <div className="flex flex-col items-center md:hidden mb-6">
            <Image
              src="/png/EazyTrade.png"
              alt="EazyTrade Logo"
              width={100}
              height={100}
              className="mb-3"
            />
            <h1 className="font-bold text-2xl text-[#122c3c]">EazyTrade</h1>
          </div>

          <div className="mb-6 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
              Create Account
            </h2>
            <p className="text-stone-500 text-sm">
              Enter your details to register a new account
            </p>
          </div>

          {/* Error Message */}
          {isError && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 animate-slide-in">
              <svg
                className="w-5 h-5 text-rose-500 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-rose-900 leading-tight">
                  Registration Failed
                </h4>
                <p className="text-xs text-rose-700 mt-1 leading-normal">
                  {getErrorMessage(error)}
                </p>
              </div>
            </div>
          )}

          <form
            name="register"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-4"
          >
            {/* First Name & Last Name in one row */}
            <div className="grid grid-cols-2 gap-4 mb-0!">
              <Form.Item
                label={
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    First Name
                  </span>
                }
                validateStatus={errors.firstname ? "error" : ""}
                help={errors.firstname?.message}
              >
                <Controller
                  control={control}
                  name="firstname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      placeholder="First name"
                      className="rounded-xl border-stone-200 focus:border-[#122c3c] focus:ring-1 focus:ring-[#122c3c]"
                    />
                  )}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Last Name
                  </span>
                }
                validateStatus={errors.lastname ? "error" : ""}
                help={errors.lastname?.message}
              >
                <Controller
                  control={control}
                  name="lastname"
                  render={({ field }) => (
                    <Input
                      {...field}
                      size="large"
                      placeholder="Last name"
                      className="rounded-xl border-stone-200 focus:border-[#122c3c] focus:ring-1 focus:ring-[#122c3c]"
                    />
                  )}
                />
              </Form.Item>
            </div>

            <Form.Item
              label={
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Username
                </span>
              }
              validateStatus={errors.username ? "error" : ""}
              help={errors.username?.message}
            >
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Choose a username"
                    className="rounded-xl border-stone-200 focus:border-[#122c3c] focus:ring-1 focus:ring-[#122c3c]"
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Email Address
                </span>
              }
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    placeholder="Enter your email"
                    className="rounded-xl border-stone-200 focus:border-[#122c3c] focus:ring-1 focus:ring-[#122c3c]"
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Password
                </span>
              }
              validateStatus={errors.password ? "error" : ""}
              help={errors.password?.message}
            >
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    size="large"
                    placeholder="Create a password"
                    className="rounded-xl border-stone-200 focus:border-[#122c3c] focus:ring-1 focus:ring-[#122c3c]"
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Confirm Password
                </span>
              }
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={errors.confirmPassword?.message}
            >
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    size="large"
                    placeholder="Confirm your password"
                    className="rounded-xl border-stone-200 focus:border-[#122c3c] focus:ring-1 focus:ring-[#122c3c]"
                  />
                )}
              />
            </Form.Item>

            <Form.Item className="pt-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{ height: "auto", padding: "12px 16px" }}
                className="bg-[#122c3c] hover:bg-[#1a3f56] active:bg-[#0d202c] border-none font-bold rounded-xl shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 transition-all duration-200 cursor-pointer text-base text-white"
              >
                Register
              </Button>
            </Form.Item>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
