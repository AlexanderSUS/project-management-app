import React from 'react';
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import { ReactComponent as GithubSVG } from '../assets/github.svg';
import { TeamMate } from '../types/teammate';
import muiTheme from '../constants/muiTheme';

const { sm } = muiTheme.breakpoints.values;

const CustomizedGithubSVG = styled(GithubSVG)`
  display: inline-block;
  width: 25px;
  margin-right: 10px;
  vertical-align: middle;
`;

const CustomizedLink = styled(Link)`
  position: relative;
  display: inline-block;
  min-width: 150px;
  color: ${muiTheme.palette.primary.contrastText};
  transition: all 0.3s;
  text-align: center;
  
  @media screen and (max-width: ${sm}px) {
    min-width: unset;
  }

  span {
    display: inline-block;
    transition: inherit;

    &.hover {
      white-space: nowrap;
      
      @media screen and (min-width: ${sm + 1}px) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0;
      }

      svg {
        display: inline-block;
        margin-right: 10px;
        width: 25px;
        height: auto;

        @media screen and (max-width: ${sm}px) {
          display: none;
        }
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

  @media screen and (max-width: ${sm}px) {
    span {
      &:not(.hover) {
        display: none;
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
