import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { closeModal, modalSelector } from '../store/modalSlice';
import BoardForm from './forms/BoardForm';
import { modalFormAction, modalConfirmAction } from '../constants/modal';
import ModalConfirmButtons from './ModalConfirmButtons';
import { ModalInputData } from '../types/modal';

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

const BasicModal: React.FC = () => {
  const {
    isOpen, modalType, title, action,
  } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();

  const closeWindow = () => {
    dispatch(closeModal());
  };

  const confirm = () => {
    const confirmAction = modalConfirmAction[action as keyof typeof modalConfirmAction];
    dispatch(confirmAction());
    dispatch(closeModal());
  };

  const createOrUpdate = (data: ModalInputData) => {
    const formAction = modalFormAction[action as keyof typeof modalFormAction];
    dispatch(formAction(data));
    dispatch(closeModal());
  };

  const content = modalType === 'confirmation' ? (
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
        <Typography variant={modalType === 'form' ? 'h4' : 'h6'} align="center">{title}</Typography>
        {content}
      </Box>
    </Modal>
  );
};

export default BasicModal;
