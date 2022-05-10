import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomizedGrid = styled(Grid)`
  flex-grow: 1;
`;

export default function GridFlexGrow(props: { children: React.ReactNode }) {
  const { children } = props;

  return <CustomizedGrid item>{children}</CustomizedGrid>;
}
