import { apiQuery } from "@/services/apiQuery";
import { LoginFormType, LoginResponse, RegisterRequest, RegisterResponse } from "./auth.type";

export const AuthApi = apiQuery.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormType>({
      query: (data) => ({
        url: "/authentication/login",
        method: "post",
        data: data,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/authentication/register",
        method: "post",
        data: data,
      }),
    }),
    getMe: builder.query<LoginResponse, void>({
      query: () => ({
        url: "/authentication/me",
        method: "get",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } = AuthApi;