/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomizedTextField = styled(TextField)`
  margin-bottom: 25px;
`;

export default function FormField(props: TextFieldProps) {
  return <CustomizedTextField {...props} />;
}
