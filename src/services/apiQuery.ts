import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./axios.config";

export const apiQuery = createApi({
  reducerPath: "apiQuery",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/authentication/login",
        method: "post",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = apiQuery;
