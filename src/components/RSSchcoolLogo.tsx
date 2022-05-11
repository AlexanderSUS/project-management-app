import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';
import { ReactComponent as RSSchcoolSVG } from './rs-school-js.svg';

const CustomizedLink = styled(Link)`
  display: block;
  width: 100px;
  transition: opacity 0.3s;

  :hover {
    opacity: 0.75;
  }
`;

function RSSchcoolLogo(): JSX.Element {
  return (
    <CustomizedLink href="https://rs.school/js/" target="_blank" rel="noreferrer">
      <RSSchcoolSVG />
    </CustomizedLink>
  );
}

export default RSSchcoolLogo;
