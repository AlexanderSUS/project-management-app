import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './authSlice';
import boardSliceReducer from './boardSlice';

export const store = configureStore({
  reducer: {
    authStore: authSliceReducer,
    boardStore: boardSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
