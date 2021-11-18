import { Paper, Typography, useTheme } from "@mui/material";
import React from 'react';
import styled from 'styled-components';
import { SkillsType } from "../Skills/components/Balls";

interface TimelineProps {
  timelineEntries: SkillsType[];
}

export function Timeline({ timelineEntries }: TimelineProps) {

    const style = useTheme()

  return (
    <MainWrapper backgroundColor={style.palette.background.default}>

    </MainWrapper>
  );
}

const MainWrapper = styled.div<{backgroundColor: string}>`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${p=>p.backgroundColor};
`;
