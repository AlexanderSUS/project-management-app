import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
  isOpen: boolean;
};

const Loader: React.FC<Props> = ({ isOpen }) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isOpen}
  >
    <CircularProgress color="inherit" size={100} />
  </Backdrop>
);

export default Loader;
