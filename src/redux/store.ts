// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
// 1. Import the reducer from your tasks slice
import tasksReducer from './tasksSlice';

export const store = configureStore({
  reducer: {
    // 2. Add the tasks reducer to the store
    tasks: tasksReducer,
  },
});

// These types are useful for working with TypeScript and Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;