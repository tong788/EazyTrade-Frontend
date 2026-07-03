import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { api } from "@/services/axios.config";
import { LoginFormType } from "@/app/login/page";

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

export const login = createAsyncThunk(
  "/login",
  async (payload: LoginFormType) => {
    const response = await api.post("/authentication/login", payload);
    return response.data;
  },
);

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
      .addCase(login.pending, (state: authState) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state: authState, action: PayloadAction<Account>) => {
          state.id = nanoid();
          state.status = "success";
          state.user = action.payload;
          state.isAuthenticated = true;
        },
      )
      // action is to be handled (statusCode 500 or smt)
      .addCase(login.rejected, (state: authState) => {
        state.status = "failed";
        state.isAuthenticated = false;
      });
  },
});

export const { setCredentials, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
