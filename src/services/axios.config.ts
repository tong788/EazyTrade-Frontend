import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

// configurations
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

const headers: Partial<RawAxiosRequestHeaders> = {
  "Content-Type": "application/json",
};

const configurations: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 5000, // Request timeout in milliseconds
  headers: headers,
};

export const axiosInstance = axios.create(configurations);
