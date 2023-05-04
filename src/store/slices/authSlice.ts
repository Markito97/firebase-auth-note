import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: string;
  email: string | null;
  accessToken: string | null;
  id: string | null;
}

const initialState: User = {
  isLoading: false,
  isSuccess: false,
  isError: "",
  email: null,
  accessToken: null,
  id: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentialsLoading(state) {
      state.isLoading = true;
    },
    setCredentials(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.isSuccess = true;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.id = action.payload.id;
    },
    removeCredentials(state) {
      state.email = null;
      state.accessToken = null;
      state.id = null;
      state.isLoading = false;
    },
  },
});

export const { setCredentials, removeCredentials, setCredentialsLoading } = authSlice.actions;

export default authSlice.reducer;
