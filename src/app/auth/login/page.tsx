"use client";

import Image from "next/image";
import { Form, Input, Button, Checkbox } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "../auth.service";
import { LoginFormType } from "../auth.type";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ApiError } from "@/services/axiosBaseQuery";
import { Suspense } from "react";
import { SubmitHandler, useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../auth.type";

const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";
  const [loginMutation, { isLoading, isError, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (
    values: LoginFormType,
  ) => {
    try {
      await loginMutation(values).unwrap();
      router.push("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const getErrorMessage = (err: unknown): string => {
    if (!err) return "Invalid username or password. Please try again.";
    const apiError = err as ApiError;
    return (
      apiError.message || "An unexpected error occurred. Please try again."
    );
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
            Welcome to EazyTrade
          </h1>
          <p className="text-blue-100/80 text-lg font-medium leading-relaxed">
            A new-gen E-commerce platform for everyone. Connect, sell, and shop
            with absolute ease.
          </p>
        </div>
      </div>

      {/* Right grid UI (login form section) */}
      <div className="col-span-8 md:col-span-3 flex flex-col justify-center items-center min-h-screen p-8 sm:p-12 md:p-16 bg-white shadow-2xl z-10">
        <div className="w-full max-w-md">
          {/* Logo/Header for Mobile views */}
          <div className="flex flex-col items-center md:hidden mb-8">
            <Image
              src="/png/EazyTrade.png"
              alt="EazyTrade Logo"
              width={100}
              height={100}
              className="mb-3"
            />
            <h1 className="font-bold text-2xl text-[#122c3c]">EazyTrade</h1>
          </div>

          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight mb-2">
              Sign In
            </h2>
            <p className="text-stone-500 text-sm">
              Please log in to your account to continue
            </p>
          </div>

          {/* Success Message */}
          {isRegistered && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3 animate-slide-in">
              <svg
                className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-emerald-900 leading-tight">
                  Registration Successful
                </h4>
                <p className="text-xs text-emerald-700 mt-1 leading-normal">
                  Your account has been created. Please log in.
                </p>
              </div>
            </div>
          )}

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
                  Login Failed
                </h4>
                <p className="text-xs text-rose-700 mt-1 leading-normal">
                  {getErrorMessage(error)}
                </p>
              </div>
            </div>
          )}

          <form
            name="login"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="space-y-4"
          >
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
                    placeholder="Enter your username"
                    className="rounded-xl border-stone-200 focus:border-[#122c3c] focus:ring-1 focus:ring-[#122c3c]"
                  />
                )}
              />
            </Form.Item>

            <Form.Item
              label={
                <div className="flex justify-between items-center w-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Password
                  </span>
                </div>
              }
              validateStatus={errors.password ? "error" : ""}
              help={errors.password?.message}
              className="mb-2!"
            >
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    size="large"
                    placeholder="Enter your password"
                    className="rounded-xl border-stone-200 focus:border-[#122c3c] focus:ring-1 focus:ring-[#122c3c]"
                  />
                )}
              />
            </Form.Item>
            <Link
              href="#"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>

            <div className="flex items-center justify-between pt-1 mt-3">
              <Form.Item noStyle>
                <Controller
                  control={control}
                  name="remember"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="text-stone-600 font-medium select-none"
                    >
                      Keep me signed in
                    </Checkbox>
                  )}
                />
              </Form.Item>
            </div>

            <Form.Item className="pt-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{ height: "auto", padding: "12px 16px" }}
                className="bg-[#122c3c] hover:bg-[#1a3f56] active:bg-[#0d202c] border-none font-bold rounded-xl shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 transition-all duration-200 cursor-pointer text-base text-white"
              >
                Login
              </Button>
            </Form.Item>
          </form>

          <p className="mt-8 text-center text-sm text-stone-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
