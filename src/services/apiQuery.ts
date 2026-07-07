import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const apiQuery = createApi({
  reducerPath: "apiQuery",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "" }),
  endpoints: () => ({})
});
