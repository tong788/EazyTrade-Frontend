import { useAppSelector } from "@/store";

export const useAuth = () => {
  const authData = useAppSelector((state) => state.auth);

    return {
        user: authData.user,
        isAuthenticated: authData.isAuthenticated,
        status: authData.status
  };
};
