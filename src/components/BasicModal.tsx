import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { closeModal, modalSelector } from '../store/modalSlice';
import { ModalFormData } from '../types/modal';
import { modalAction } from '../constants/modal';
import { modalText } from '../constants/text';

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
  const { isOpen, form } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<ModalFormData>();

  const onSubmit = (data: ModalFormData) => {
    if (form) {
      dispatch(modalAction[form.action](data));
    }
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
              name={input.id as keyof ModalFormData}
              control={control}
              defaultValue={input.defaultValue}
              render={({ field: { onChange, value } }) => (
                <TextField margin="normal" required={input.required} placeholder={input.placeholder} fullWidth label={input.label} onChange={onChange} value={value} />
              )}
            />
          ))}
          <Button color="primary" type="submit">{modalText.submit}</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default BasicModal;
