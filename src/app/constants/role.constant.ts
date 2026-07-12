export const ROLE = {
  ADMIN: "admin",
  VENDOR: "vendor",
  CLIENT: "client",
} as const;

export type roleKey = (typeof ROLE)[keyof typeof ROLE];
