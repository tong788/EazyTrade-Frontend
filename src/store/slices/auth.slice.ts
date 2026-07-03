import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type authState = {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "success" | "failed";
};

export interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "user" | "guest";
  imageUrl?: string;
}

const initialState: authState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
};

function setCredentialsReducer(state: authState, action: PayloadAction<User>) {
  state.user = action.payload;
  state.isAuthenticated = true;
  state.status = "success";
}

function resetAuthStateReducer(state: authState) {
  state.user = initialState.user;
  state.isAuthenticated = initialState.isAuthenticated;
  state.status = initialState.status;
}

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredentials: setCredentialsReducer,
    resetAuthState: resetAuthStateReducer,
  },
});

export const { setCredentials, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
