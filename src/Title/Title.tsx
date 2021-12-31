import * as React from 'react';
import { Paper } from '@mui/material';
import { TitleText } from './TitleText';
import styled from 'styled-components';

export type TitleProps = {};
export const Title = ({}: TitleProps) => {
  return (
    <Paper>
      <TitleText type={'Title'} text='Christian Jöcker'/>
      <SubtitleWrapper>
      <TitleText type={'Subtitle'} text='Frontend Developer and UX/UI Designer'/>
      </SubtitleWrapper>
    </Paper>
  );
};

const SubtitleWrapper = styled.div`
  padding: 0 var(--margin-m) var(--margin-s) var(--margin-m);
  color: red;
`
