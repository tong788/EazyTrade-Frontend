import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { AuthApi } from "@/app/authentication/auth.service";

type authState = {
  id: string | null;
  user: Account | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "success" | "failed";
};

export interface Account {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin" | "user" | "guest";
  imageUrl?: string;
}

const initialState: authState = {
  id: null,
  user: null,
  isAuthenticated: false,
  status: "idle",
};

function setCredentialsReducer(
  state: authState,
  action: PayloadAction<{ id: string; user: Account }>,
) {
  state.id = action.payload.id;
  state.user = action.payload.user;
  state.isAuthenticated = true;
  state.status = "success";
}

function resetAuthStateReducer(state: authState) {
  state.id = initialState.id;
  state.user = initialState.user;
  state.isAuthenticated = initialState.isAuthenticated;
  state.status = initialState.status;
}

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredentials: {
      // prepare data by putting id for reference in redux store
      prepare(userData: Account) {
        return {
          payload: {
            id: nanoid(),
            user: userData,
          },
        };
      },
      reducer: setCredentialsReducer,
    },
    resetAuthState: resetAuthStateReducer,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(AuthApi.endpoints.login.matchPending, (state) => {
        state.id = initialState.id;
        state.status = "loading";
        state.user = initialState.user;
        state.isAuthenticated = false;
      })
      .addMatcher(AuthApi.endpoints.login.matchFulfilled, (state, action) => {
        state.id = nanoid();
        state.status = "success";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addMatcher(AuthApi.endpoints.login.matchRejected, (state) => {
        state.status = "failed";
        state.isAuthenticated = false;
      });
  },
});

export const { setCredentials, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
