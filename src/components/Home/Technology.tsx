import React from 'react';
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import { TechnologyType } from '../../types/technology';
import muiTheme from '../../constants/muiTheme';

const { sm } = muiTheme.breakpoints.values;
const { divider } = muiTheme.palette;

const LinkStyled = styled(Link)`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${divider};
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;

  @media screen and (max-width: ${sm}px) {
    padding: 10px;
  }

  img {
    width: 50%;
    margin: 0 auto 25px;

    @media screen and (max-width: ${sm}px) {
      width: 75%;
      margin-bottom: 15px;
    }
  }

  p {
    margin-top: auto;

    @media screen and (max-width: ${sm}px) {
      font-size: 1rem;
    }
  }

  &:hover {
    background-color: ${divider};
  }
`;

const Technology = (props: TechnologyType) => {
  const { link, icon, name } = props;

  return (
    <LinkStyled href={link} target="_blank">
      <img src={icon} alt={name} />
      <Typography component="p" variant="h5">
        {name}
      </Typography>
    </LinkStyled>
  );
};

export default Technology;
