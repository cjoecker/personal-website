import { Paper, Typography, useTheme } from "@mui/material";
import React from 'react';
import styled from 'styled-components';

import Balls, { SkillsType } from './components/Balls';



interface SkillsMapProps {
  skills: SkillsType[];
}

export function SkillsMap({ skills }: SkillsMapProps) {

    const style = useTheme()

  return (
    <MainWrapper backgroundColor={style.palette.background.default}>
      <SkillsLegend>
        <SkillsLegendItem variant={'h2'} color={'secondary'}>Web Development</SkillsLegendItem>
        <SkillsLegendItem variant={'h2'} color={'primary'}>User Experience (UX)</SkillsLegendItem>
      </SkillsLegend>
      <BallsWrapper>
        <Balls skills={skills} />
      </BallsWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.div<{backgroundColor: string}>`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${p=>p.backgroundColor};
`;
const BallsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: Yantramanav,serif;
`;

const SkillsLegend = styled(Paper)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
`;
const SkillsLegendItem = styled(Typography)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
