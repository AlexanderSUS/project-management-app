import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeRepairServiceSharpIcon from '@mui/icons-material/HomeRepairServiceSharp';
import { useTranslation } from 'react-i18next';
import muiTheme from '../../constants/muiTheme';

const { sm } = muiTheme.breakpoints.values;
const { divider, secondary } = muiTheme.palette;

const Content = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px;
  border-radius: 5px;
  border: 1px solid ${divider};
  text-align: center;

  @media screen and (max-width: ${sm}px) {
    padding: 25px;
  }

  svg {
    width: 33.33%;
    height: auto;
    margin: 0 auto 25px;
    border-radius: 50%;
    padding :15px;
    background: ${secondary.main};
    fill: ${secondary.contrastText};

    @media screen and (max-width: ${sm}px) {
      margin-bottom: 15px;
    }
  }

  p {
    margin-top: auto;
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
