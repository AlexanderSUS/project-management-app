import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks';
import { clearDefaultValues, closeModal, modalSelector } from '../store/modalSlice';
import { AppFormData } from '../types/formTypes';
import convertRulesRegExp from '../helpers/convertRulesRegExp';
import { DEFAULT_ROWS, DESCRIPTION, MULTILINE_ROWS } from '../constants/formfields';

type BoardFormProps = {
  createOrUpdate: (data: AppFormData) => void;
};

const BoardForm: React.FC<BoardFormProps> = ({ createOrUpdate }) => {
  const { fields, defaultValues } = useAppSelector(modalSelector);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Parameters<typeof createOrUpdate>[0]>({ mode: 'onChange' });
  const { t } = useTranslation();

  const onSubmit = (data: AppFormData) => {
    createOrUpdate(data);
    dispatch(closeModal());
  };

  useEffect(
    () => () => {
      dispatch(clearDefaultValues());
    },
    [dispatch],
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {fields
        && fields.map((input, index) => (
          <Controller
            key={input.name}
            name={input.name as keyof AppFormData}
            control={control}
            rules={convertRulesRegExp(input.registerOptions)}
            defaultValue={defaultValues[index] || ''}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                type={input.type}
                placeholder={t(input.placeholder)}
                fullWidth
                label={t(input.label)}
                onChange={onChange}
                value={value}
                autoComplete="off"
                multiline={input.name === DESCRIPTION}
                rows={input.name === DESCRIPTION ? MULTILINE_ROWS : DEFAULT_ROWS}
                error={!!errors[input.name as keyof typeof errors]}
                helperText={
                  errors[input.name as keyof typeof errors]
                  && t(`${errors[input.name as keyof typeof errors]?.message}`)
                }
              />
            )}
          />
        ))}
      <Box sx={{ display: 'flex' }}>
        <Button sx={{ ml: 'auto' }} color="success" type="submit">
          {t('modal.submit')}
        </Button>
        <Button
          color="warning"
          onClick={() => {
            dispatch(closeModal());
          }}
        >
          {t('modal.close')}
        </Button>
      </Box>
    </Box>
  );
};

export default BoardForm;
