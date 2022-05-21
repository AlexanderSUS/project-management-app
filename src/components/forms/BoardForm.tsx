import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { closeModal, modalSelector } from '../../store/modalSlice';
import { FormData } from '../../types/formTypes';
import { modalText } from '../../constants/text';
import convertRulesRegExp from '../../helpers/ConvertRulesRegExp';

type BoardFormProps = {
  createOrUpdate: (data: FormData) => void;
};

const BoardForm: React.FC<BoardFormProps> = ({ createOrUpdate }) => {
  const { fields } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const { handleSubmit, control, formState: { errors } } = useForm<Parameters<typeof createOrUpdate>[0]>({ mode: 'onChange' });
  const { t } = useTranslation();

  const onSubmit = (data: FormData) => {
    createOrUpdate(data);
    dispatch(closeModal());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields && fields.map((input) => (
        <Controller
          key={input.name}
          name={input.name as keyof FormData}
          control={control}
          rules={convertRulesRegExp(input.registerOptions)}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              margin="normal"
              type={input.type}
              placeholder={input.placeholder}
              fullWidth
              label={input.label}
              onChange={onChange}
              value={value}
              autoComplete={input.autoComplete}
              error={!!errors[input.name as keyof typeof errors]}
              helperText={errors[input.name as keyof typeof errors]
              && t(`${errors[input.name as keyof typeof errors]?.message}`)}

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
