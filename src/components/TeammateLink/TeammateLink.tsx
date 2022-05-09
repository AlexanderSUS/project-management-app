import React from 'react';
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import { ReactComponent as GithubSVG } from './github.svg';
import { TeamMate } from '../../types/teammate';
import muiTheme from '../../app/constants/muiTheme';

const CustomizedGithubSVG = styled(GithubSVG)`
  display: inline-block;
  width: 25px;
  margin-right: 10px;
  vertical-align: middle;
`;

const CustomizedLink = styled(Link)`
  position: relative;
  min-width: 150px;
  color: ${muiTheme.palette.primary.contrastText};
  display: inline-block;
  transition: all 0.3s;
  text-align: center;

  span {
    display: inline-block;
    transition: inherit;

    &.hover {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.5);
      opacity: 0;
      white-space: nowrap;

      svg {
        display: inline-block;
        margin-right: 10px;
        width: 25px;
        height: auto;
      }
    }
  }

  :hover {
    color: ${muiTheme.palette.primary.contrastText};
    span {
      &:not(.hover) {
        transform: scale(0.5);
        opacity: 0;
      }

      &.hover {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }
  }

  @media screen and (max-width: ${muiTheme.breakpoints.values.sm}px) {
    span {
      &:not(.hover) {
        transform: scale(0.5);
        opacity: 0;
      }

      &.hover {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }
  }
`;

function TeammateLink(props: TeamMate): JSX.Element {
  const { href, name, login } = props;

  return (
    <CustomizedLink href={href} target="_blank" rel="noreferrer">
      <Typography component="span">{name}</Typography>
      <Typography component="span" className="hover">
        <CustomizedGithubSVG />
        {login}
      </Typography>
    </CustomizedLink>
  );
}

export default TeammateLink;
