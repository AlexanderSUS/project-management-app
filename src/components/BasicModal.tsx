import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { closeModal, modalSelector } from '../store/modalSlice';
import BoardForm from './ModalForm';
import { modalFormAction, modalConfirmAction } from '../constants/modal';
import ModalConfirmButtons from './ModalConfirmButtons';
import { FormData } from '../types/formTypes';
import { isConfirmAction, isFormAction, isShowAction } from '../helpers/modalFunctions';
import { AppDispatch } from '../store/store';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const overflowWrap = 'break-word';
const overflowY = 'scroll';
const maxHeight = '200px';

const showCaseTitleStyle = {
  overflowWrap,
};

const showCaseDescripitonStyle = {
  overflowWrap, overflowY, maxHeight,
};

const BasicModal: React.FC = () => {
  const {
    isOpen, title, action, defaultValues,
  } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
    if (isFormAction(action)) {
      dispatch(modalFormAction[action](data) as Parameters<AppDispatch>[0]);
    }
    dispatch(closeModal());
  };

  const content = (function getContent() {
    if (isConfirmAction(action)) {
      return <ModalConfirmButtons close={closeWindow} confirm={confirm} />;
    }

    if (isFormAction(action)) {
      return <BoardForm createOrUpdate={createOrUpdate} />;
    }

    if (isShowAction(action) && defaultValues?.length) {
      return defaultValues.map((value, index) => (
        <Typography variant={!index ? 'h5' : 'body2'} sx={!index ? showCaseTitleStyle : showCaseDescripitonStyle}>{value}</Typography>
      ));
    }

    return null;
  }());

  return (
    <Modal
      open={isOpen}
      onClose={closeWindow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant={isConfirmAction(action) ? 'h6' : 'h4'} align="center">{t(title)}</Typography>
        {content}
      </Box>
    </Modal>
  );
};

export default BasicModal;
