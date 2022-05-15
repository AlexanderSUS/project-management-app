import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { closeModal, modalSelector } from '../../store/modalSlice';
import { modalText } from '../../constants/text';
import { ModalInputData } from '../../types/modal';

type BoardFormProps = {
  createOrUpdate: (data: ModalInputData) => void;
};

const BoardForm: React.FC<BoardFormProps> = ({ createOrUpdate }) => {
  const { fields } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<Parameters<typeof createOrUpdate>[0]>();

  const onSubmit = (data: ModalInputData) => {
    createOrUpdate(data);
    dispatch(closeModal());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields && fields.map((input) => (
        <Controller
          key={input.id}
          name={input.id as keyof ModalInputData}
          control={control}
          defaultValue=""
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
      <Box sx={{ display: 'flex' }}>
        <Button sx={{ ml: 'auto' }} color="primary" type="submit">{modalText.submit}</Button>
        <Button color="primary" onClick={() => { dispatch(closeModal()); }}>{modalText.close}</Button>
      </Box>
    </form>
  );
};

export default BoardForm;
