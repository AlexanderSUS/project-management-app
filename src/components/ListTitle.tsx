import React, { useState } from 'react';
import {
  Typography, TextField, Tooltip, IconButton, Box,
} from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Column } from '../types/columns';
import { editColumn, setColumn } from '../store/columnSlice';
import { REMOVE_COLUMN, EDIT_COLUMN_TITLE } from '../constants/formfields';
import { openModal } from '../store/modalSlice';
import { DEFAULT_COLUMN } from '../constants/columns';
import { modalText } from '../constants/text';
import { AppDispatch } from '../store/store';
import convertRulesRegExp from '../helpers/convertRulesRegExp';
import { FormField } from '../types/formTypes';
import muiTheme from '../constants/muiTheme';

type ListTitleProps = {
  column: Column;
  dispatch: AppDispatch;
};

type ListTitleField = {
  title: string;
};

const ListTitle: React.FC<ListTitleProps> = ({ column, dispatch }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { fields } = EDIT_COLUMN_TITLE;
  const [field] = fields as FormField[];
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ListTitleField>({ mode: 'onChange' });
  const { t } = useTranslation();

  const showInput = () => {
    setIsEdit(true);
  };

  const hideInput = () => {
    setIsEdit(false);
  };

  const onSubmit = (data: ListTitleField) => {
    dispatch(setColumn({ ...column, title: data.title }));
    dispatch(editColumn()).then(() => {
      dispatch(setColumn(DEFAULT_COLUMN));
    });
  };

  const deleteColumn = () => {
    dispatch(setColumn(column));
    dispatch(openModal(REMOVE_COLUMN));
  };

  if (isEdit) {
    return (
      <>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          id="column-title-form"
          sx={{ flexGrow: '1' }}
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
                placeholder={field.placeholder}
                fullWidth
                label={t(field.label)}
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
        <Tooltip title={modalText.submit}>
          <IconButton type="submit" form="column-title-form">
            <DoneSharpIcon color="success" />
          </IconButton>
        </Tooltip>
        <Tooltip title={modalText.close}>
          <IconButton onClick={hideInput}>
            <CloseSharpIcon color="action" />
          </IconButton>
        </Tooltip>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottom: `1px solid ${muiTheme.palette.divider}`,
      }}
    >
      <Tooltip title={t('boardPage.editBtn')} placement="right">
        <Typography
          onClick={showInput}
          variant="h6"
          sx={{
            mr: 'auto',
            ml: 'auto',
            textTransform: 'uppercase',
            fontSize: '1rem',
          }}
        >
          {column.title}
        </Typography>
      </Tooltip>
      <Tooltip title={t('boardPage.deleteBtn')} placement="right">
        <IconButton color="error" onClick={deleteColumn}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ListTitle;
