import { createListenerMiddleware, addListener } from '@reduxjs/toolkit';
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit';

import type { RootState, AppDispatch } from './store';

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const startBoardListening = listenerMiddleware.startListening as AppStartListening;

export const startColumsAndTasksListening = listenerMiddleware.startListening as AppStartListening;

export const stopAppListening = listenerMiddleware.stopListening;

export const addAppListener = addListener as TypedAddListener< RootState, AppDispatch >;
