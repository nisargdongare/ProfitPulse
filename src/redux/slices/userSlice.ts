import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginDetails {
  EMAIL: string;
  PASSWORD: string;
  // Add other user details that might come from login response
  token?: string;
  userId?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
}

interface UserState {
  loginDetails: LoginDetails | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loginDetails: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<LoginDetails>) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.loginDetails = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.loginDetails = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.loginDetails = null;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
