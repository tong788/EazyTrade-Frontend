import { apiQuery } from "@/services/apiQuery";
import { LoginFormType, LoginResponse } from "./auth.type";

export const AuthApi = apiQuery.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormType>({
      query: (data) => ({
        url: "/authentication/login",
        method: "post",
        data: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = AuthApi;
