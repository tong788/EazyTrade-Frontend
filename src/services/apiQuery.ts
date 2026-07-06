import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosbaseQuery";

export const apiQuery = createApi({
  reducerPath: "apiQuery",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/authentication/login",
        method: "post",
        data: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = apiQuery;
