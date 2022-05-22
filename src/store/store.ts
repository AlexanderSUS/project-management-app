import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './authSlice';
import boardSliceReducer from './boardSlice';
import modalSliceReducer from './modalSlice';
import columnSliceReducer from './columnSlice';
import taskSliceReducer from './taskSlice';
import notificationSliceReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    authStore: authSliceReducer,
    boardStore: boardSliceReducer,
    modalStore: modalSliceReducer,
    columnStore: columnSliceReducer,
    taskStore: taskSliceReducer,
    notificationStore: notificationSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
