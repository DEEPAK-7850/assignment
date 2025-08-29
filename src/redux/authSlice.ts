// src/redux/authSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    uid: string;
    email: string | null;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // This action is called when a user successfully logs in
    setUser: (state, action: PayloadAction<{ uid: string; email: string | null }>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // This action is called when a user logs out
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;