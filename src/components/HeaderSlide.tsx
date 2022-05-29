import React from 'react';
import { Slide, useScrollTrigger } from '@mui/material';

type HeaderSlideProps = {
  children: React.ReactElement;
};

const HeaderSlide = (props: HeaderSlideProps) => {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HeaderSlide;
