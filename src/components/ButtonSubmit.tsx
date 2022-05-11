import React from 'react';
import { Button, Typography } from '@mui/material';
import { AuthText } from '../constants/authorization';

function ButtonSubmit(): JSX.Element {
  return (
    <Button component="button" type="submit" variant="outlined">
      <Typography>{AuthText.SUBMIT}</Typography>
    </Button>
  );
}

export default ButtonSubmit;
