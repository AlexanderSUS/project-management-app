import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import CustomizedSnackbar from './CustomizedSnackbar';
import Footer from './Footer';
import Header from './Header';

const Layout = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <CustomizedSnackbar />
    <Outlet />
    <Footer />
  </Box>
);
export default Layout;
