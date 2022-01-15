import { Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { SkillsType } from '../../constants/skills';

import Balls from './components/Balls';

interface SkillsProps {
  skills: SkillsType[];
}

export function Skills({ skills }: SkillsProps) {

    const style = useTheme()

  return (
    <MainWrapper backgroundColor={style.palette.background.default}>
      <Header>
        <HeaderContainer>
        <HeaderItem variant={'h4'} color={'primary'}>Frontend</HeaderItem>
        <HeaderItem variant={'h4'} isMiddleItem>+</HeaderItem>
        <HeaderItem variant={'h4'} color={'secondary'}>UX/UI Design</HeaderItem>
        </HeaderContainer>
      </Header>
      <BallsWrapper>
        <Balls skills={skills} />
      </BallsWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled(Paper)<{backgroundColor: string}>`
  width: 500px;
  height: 400px;
  position: relative;
 
`;
const BallsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: Yantramanav,serif;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;  
  z-index: 1;
  pointer-events: none;
`;
const HeaderContainer = styled.div`
  margin: var(--margin-s);
  display: flex;
  height: 50px;
`;
const HeaderItem = styled(Typography)<{ isMiddleItem?: boolean }>`
  flex: ${p => p.isMiddleItem ? 0 : 1};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  user-select: none;
`;
