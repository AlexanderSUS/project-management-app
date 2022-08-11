import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeRepairServiceSharpIcon from '@mui/icons-material/HomeRepairServiceSharp';
import { useTranslation } from 'react-i18next';
import muiTheme from '../../constants/muiTheme';

const { sm, md } = muiTheme.breakpoints.values;
const { divider, secondary, primary } = muiTheme.palette;

const Content = styled('div')`
  height: 100%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid ${divider};
  text-align: center;

  @media screen and (max-width: ${sm}px) {
    padding: 10px;
  }

  svg {
    width: 50%;
    height: auto;
    margin: 0 auto 25px;
    border-radius: 50%;
    padding: 15px;
    background: ${primary.main};
    fill: ${secondary.contrastText};

    @media screen and (max-width: ${md}px) {
      width: 75%;
    }

    @media screen and (max-width: ${sm}px) {
      width: 50%;
      padding: 10px;
      margin-bottom: 15px;
    }
  }

  p {
    font-size: 1rem;
  }
`;

type AdvantagePropseType = {
  index: number;
};

const Advantage = (props: AdvantagePropseType) => {
  const { t } = useTranslation();
  const { index } = props;

  return (
    <Content>
      <HomeRepairServiceSharpIcon color="primary" />
      <Typography component="p" variant="h6">
        {t(`welcomePage.advantages.${index}`)}
      </Typography>
    </Content>
  );
};

export default Advantage;
