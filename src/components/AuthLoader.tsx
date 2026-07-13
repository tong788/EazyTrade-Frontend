"use client";
import { useGetMeQuery } from "@/app/auth/auth.service";

export const AuthLoader = ({ children }: { children: React.ReactNode }) => {
  // Invoking this hook automatically launches the HTTP request on component mount.
  // The browser automatically attaches the HTTP-only cookie.
  const { isLoading } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">
          Verifying session...
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
