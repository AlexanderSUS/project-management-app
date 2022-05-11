/* eslint-disable react/require-default-props */
import React from 'react';
import { Button } from '@mui/material';

type HeaderButtonProps = {
  text: string;
  onClick?: () => void;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({ text, onClick }) => (
  <Button color="inherit" onClick={onClick}>
    {text}
  </Button>
);

export default HeaderButton;
