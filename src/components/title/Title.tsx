import * as React from 'react';
import { Paper } from '@mui/material';
import { TitleText } from './TitleText';
import styled from 'styled-components';

export type TitleProps = {};
export const Title = ({}: TitleProps) => {
  return (
    <TextContainer>
      <TitleText type={'title'} text='Christian Jöcker'/>
      <TitleText type={'subtitle'} text='Frontend Developer and UX/UI Designer'/>
    </TextContainer>
  );
};

const TextContainer = styled(Paper)`
padding: var(--margin-m);
`
