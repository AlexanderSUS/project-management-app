import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState, ModalPayload } from '../types/modal';
import initialState, { NEW_BOARD } from '../constants/modal';

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload: { form, dataId } }: PayloadAction<ModalPayload>) => {
      state.isOpen = true;
      state.form = form;
      if (dataId) {
        state.dataId = dataId;
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.form = NEW_BOARD;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;

export const modalSelector = (state: { modalStore: ModalState }) => state.modalStore;
