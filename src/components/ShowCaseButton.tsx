import React from 'react';
import { IconButton } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';

type Props = {
  onClick: VoidFunction;
};

const ShowCaseButton: React.FC<Props> = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <PageviewIcon fontSize="inherit" color="warning" />
  </IconButton>

);

export default ShowCaseButton;
