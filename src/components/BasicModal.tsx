import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { clearDefaultValues, closeModal, modalSelector } from '../store/modalSlice';
import BoardForm from './ModalForm';
import { modalFormAction, modalConfirmAction } from '../constants/modal';
import ModalConfirmButtons from './ModalConfirmButtons';
import { FormData } from '../types/formTypes';
import { isConfirmAction, isFormAction, isShowAction } from '../helpers/modalFunctions';
import { AppDispatch } from '../store/store';
import ItemModalDescription from './ItemModalDescription';
import muiTheme from '../constants/muiTheme';
import scrollStyles from '../constants/scrollStyles';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: 'calc(100% - 1rem)',
  bgcolor: 'background.paper',
  border: `2px solid ${muiTheme.palette.divider}`,
  borderRadius: '5px',
  boxShadow: 24,
  overflow: 'auto',
  maxHeight: '100%',
  p: 4,
  [muiTheme.breakpoints.down('md')]: {
    p: 2,
  },
  [muiTheme.breakpoints.down('sm')]: {
    p: 1,
  },
  ...scrollStyles,
};

const BasicModal: React.FC = () => {
  const {
    isOpen, title, action, defaultValues,
  } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const closeWindow = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const getContent = useCallback(() => {
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

    if (isConfirmAction(action)) {
      return <ModalConfirmButtons close={closeWindow} confirm={confirm} />;
    }

    if (isFormAction(action)) {
      return <BoardForm createOrUpdate={createOrUpdate} />;
    }

    if (isShowAction(action) && defaultValues?.length) {
      return <ItemModalDescription fields={defaultValues} dispatch={dispatch} />;
    }

    return null;
  }, [action, defaultValues, dispatch, closeWindow]);

  useEffect(
    () => () => {
      dispatch(clearDefaultValues());
    },
    [dispatch],
  );

  return (
    <Modal
      open={isOpen}
      onClose={closeWindow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant={isConfirmAction(action) ? 'h6' : 'h4'} align="center">{t(title)}</Typography>
        {getContent()}
      </Box>
    </Modal>
  );
};

export default BasicModal;
