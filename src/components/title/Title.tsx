import { Paper } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';

import { TitleText } from './TitleText';

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
