import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { closeModal, modalSelector } from '../store/modalSlice';
import { modalText } from '../constants/text';
// import { modalAction } from '../constants/modal';
import modalActionReducer from '../helpers/modalActionReducer';
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
  const { isOpen, form, dataId } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  // const action = modalAction[form.action];
  const { handleSubmit, control } = useForm<ModalInputData>();
  // const { handleSubmit, control } = useForm<Parameters<typeof action>[0]>();

  const onSubmit = (data: ModalInputData) => {
  // const onSubmit = (data: Parameters<typeof action>[0]) => {
    modalActionReducer(form, data, dispatch, dataId);
    dispatch(closeModal());
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => { dispatch(closeModal()); }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {form && form.fields.map((input) => (
            <Controller
              key={input.id}
              name={input.id as keyof ModalInputData}
              // name={input.id as keyof Parameters<typeof action>[0]}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  margin="normal"
                  required={input.required}
                  placeholder={input.placeholder}
                  fullWidth
                  label={input.label}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          ))}
          <Button color="primary" type="submit">{modalText.submit}</Button>
        </form>
        <Button color="primary" onClick={() => { dispatch(closeModal()); }}>{modalText.close}</Button>
      </Box>
    </Modal>
  );
};

export default BasicModal;
