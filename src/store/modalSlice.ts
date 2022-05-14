import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState, ModalForm } from '../types/modal';
import initialState from '../constants/modal';

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }: PayloadAction<ModalForm>) => {
      state.isOpen = true;
      state.form = payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.form = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

export const modalSelector = (state: { modalStore: ModalState }) => state.modalStore;
