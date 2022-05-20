import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState, Content } from '../types/modal';
import initialState, { NEW_BOARD } from '../constants/modal';

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload: content }: PayloadAction<Content>) => {
      state.isOpen = true;
      state.fields = content.fields;
      state.title = content.modalTitle;
      state.action = content.action;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.fields = NEW_BOARD.fields;
      state.title = NEW_BOARD.modalTitle;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

export const modalSelector = (state: { modalStore: ModalState }) => state.modalStore;
