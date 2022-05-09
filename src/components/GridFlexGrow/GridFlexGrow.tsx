import React from 'react';
import { Grid } from '@mui/material';

export default function GridFlexGrow(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <Grid
      item
      sx={{
        flexGrow: 1,
      }}
    >
      {children}
    </Grid>
  );
}
