import { apiQuery } from "@/services/apiQuery";
import { LoginFormType, LoginResponse, RegisterFormType, RegisterResponse } from "./auth.type";

export const AuthApi = apiQuery.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormType>({
      query: (data) => ({
        url: "/authentication/login",
        method: "post",
        data: data,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterFormType>({
      query: (data) => ({
        url: "/authentication/register",
        method: "post",
        data: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = AuthApi;

