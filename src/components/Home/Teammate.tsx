import React from 'react';
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import muiTheme from '../../constants/muiTheme';
import { TeamMate } from '../../types/teammate';

const { sm } = muiTheme.breakpoints.values;
const { primary, divider, text } = muiTheme.palette;

const LinkStyled = styled(Link)`
  display: grid;
  height: 100%;
  grid-template-columns: 25% 75%;
  align-items: center;
  gap: 15px;
  border-radius: 5px;
  color: ${text.primary};
  text-decoration: none;
  border: 1px solid ${divider};
  padding: 15px;
  transition: border-color 0.3s;

  @media screen and (max-width: ${sm}px) {
    padding: 10px;
  }

  svg {
    fill: ${primary.main};
    width: 100%;
    height: auto;
    grid-row: 1/3;
    grid-column: 1/2;
  }

  h4 {
    font-weight: bold;
    transition: color 0.3s;

    @media screen and (max-width: ${sm}px) {
      font-size: 1.5rem;
    }
  }

  h6 {
    @media screen and (max-width: ${sm}px) {
      font-size: 1rem;
    }
  }

  &:hover {
    border-color: ${primary.main};

    h4 {
      color: ${primary.main}
    }
  }
`;

const Teammate = (props: TeamMate) => {
  const { role, href, login } = props;

  return (
    <LinkStyled href={href} target="_blank">
      <GroupsSharpIcon />
      <Typography component="h4" variant="h4">
        {login}
      </Typography>
      <Typography component="h6" variant="h6">
        {role}
      </Typography>
    </LinkStyled>
  );
};

export default Teammate;
