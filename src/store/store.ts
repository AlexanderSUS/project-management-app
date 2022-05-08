import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './authSlice';

export const store = configureStore({
  reducer: {
    authStore: authSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
