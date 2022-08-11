import React, { useCallback, useEffect } from 'react';
import {
  TextField, Tooltip, IconButton, Box,
} from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Column } from '../types/columns';
import { editColumn, setColumn } from '../store/columnSlice';
import { EDIT_COLUMN_TITLE } from '../constants/formfields';
import { DEFAULT_COLUMN } from '../constants/columns';
import { AppDispatch } from '../store/store';
import convertRulesRegExp from '../helpers/convertRulesRegExp';
import { FormField } from '../types/formTypes';

type Props = {
  hideInput: VoidFunction;
  dispatch: AppDispatch;
  column: Column;
};

type ListTitleField = {
  title: string;
};

const ListTitlteForm: React.FC<Props> = ({ hideInput, dispatch, column }) => {
  const { fields } = EDIT_COLUMN_TITLE;
  const [field] = fields as FormField[];
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ListTitleField>({ mode: 'onChange' });
  const { t } = useTranslation();

  const onSubmit = (data: ListTitleField) => {
    hideInput();
    dispatch(setColumn({ ...column, title: data.title }));
    dispatch(editColumn()).then(() => {
      dispatch(setColumn(DEFAULT_COLUMN));
    });
  };

  const hideOnEscBtn = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      hideInput();
    }
  }, [hideInput]);

  useEffect(() => {
    window.addEventListener('keydown', (e) => hideOnEscBtn(e), { once: true });
  }, [hideOnEscBtn]);

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        id="column-title-form"
        sx={{ bgcolor: 'white', borderRadius: '5px', p: '0.2rem 1rem' }}
      >
        <Controller
          key={field.name}
          name={field.name as keyof ListTitleField}
          control={control}
          rules={convertRulesRegExp(field.registerOptions)}
          defaultValue={column.title}
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="standard"
              type={field.type}
              placeholder={t(field.placeholder)}
              fullWidth
              onChange={onChange}
              value={value}
              autoComplete="off"
              error={!!errors[field.name as keyof typeof errors]}
              helperText={
                  errors[field.name as keyof typeof errors]
                  && t(`${errors[field.name as keyof typeof errors]?.message}`)
                }
            />
          )}
        />
      </Box>
      <Tooltip title={t('modal.submit')}>
        <IconButton type="submit" form="column-title-form">
          <DoneSharpIcon color="success" />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('modal.close')}>
        <IconButton onClick={hideInput}>
          <CloseSharpIcon color="action" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ListTitlteForm;
