import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { closeModal, modalSelector } from '../store/modalSlice';
import BoardForm from './ModalForm';
import { modalFormAction, modalConfirmAction } from '../constants/modal';
import ModalConfirmButtons from './ModalConfirmButtons';
import { FormData } from '../types/formTypes';
import isConfirmAction from '../helpers/modalFunctions';
import { AppDispatch } from '../store/store';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// TODO ADD TRANSLATION to this page
const BasicModal: React.FC = () => {
  const {
    isOpen, title, action,
  } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const closeWindow = () => {
    dispatch(closeModal());
  };

  const confirm = () => {
    if (isConfirmAction(action)) {
      dispatch(modalConfirmAction[action]() as Parameters<AppDispatch>[0]);
    }
    dispatch(closeModal());
  };

  // TODO try to chage type FormData to Partial<FormData>
  const createOrUpdate = (data: FormData) => {
    if (!isConfirmAction(action)) {
      dispatch(modalFormAction[action](data) as Parameters<AppDispatch>[0]);
    }
    dispatch(closeModal());
  };

  const content = isConfirmAction(action) ? (
    <ModalConfirmButtons close={closeWindow} confirm={confirm} />
  ) : <BoardForm createOrUpdate={createOrUpdate} />;
  return (
    <Modal
      open={isOpen}
      onClose={closeWindow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant={isConfirmAction(action) ? 'h6' : 'h4'} align="center">{title}</Typography>
        {content}
      </Box>
    </Modal>
  );
};

export default BasicModal;
