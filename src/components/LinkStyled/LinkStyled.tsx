/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import muiTheme from '../../app/constants/muiTheme';

const CustomizedLink = styled(Link)`
  color: ${muiTheme.palette.primary.contrastText};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  transition: color 0.3s;

  :hover {
    color: ${muiTheme.palette.action.active};
  }
`;

export default function LinkStyled(props: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
  return <CustomizedLink {...props} />;
}
