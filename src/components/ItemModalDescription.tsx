import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { clearDefaultValues } from '../store/modalSlice';
import { AppDispatch } from '../store/store';

const overflowWrap = 'break-word';
const overflowY = 'scroll';
const maxHeight = '200px';

const showCaseTitleStyle = {
  overflowWrap,
};

const showCaseDescripitonStyle = {
  overflowWrap, overflowY, maxHeight,
};

const modalKeys = ['title', 'description', 'additional'];

type Props = {
  fields: string[];
  dispatch: AppDispatch;
};

const ItemModalDescription: React.FC<Props> = ({ fields, dispatch }) => {
  useEffect(
    () => () => {
      dispatch(clearDefaultValues());
    },
    [dispatch],
  );

  return (
    <Box>
      {fields.map((value, index) => (
        <Typography
          key={value + modalKeys[index]}
          variant={!index ? 'h5' : 'body2'}
          sx={!index ? showCaseTitleStyle : showCaseDescripitonStyle}
        >
          {value}
        </Typography>
      ))}
    </Box>
  );
};

export default ItemModalDescription;
