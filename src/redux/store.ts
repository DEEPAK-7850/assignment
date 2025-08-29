// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import authReducer from './authSlice'; // 1. Import the new auth reducer

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer, // 2. Add the auth reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;