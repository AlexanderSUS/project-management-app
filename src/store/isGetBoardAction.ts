import { isAsyncThunkAction } from '@reduxjs/toolkit';
import { getBoard } from './boardSlice';

const isGetBoardAction = isAsyncThunkAction(getBoard);

export default isGetBoardAction;
