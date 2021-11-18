import { Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { TimelineEntryType } from '../../constants/timelineEntries';
import { getFormattedDateRange } from '../utils/timelineUtils';

interface EntryProps {
  entry: TimelineEntryType;
}

export function Entry({ entry }: EntryProps) {
  const style = useTheme();

  const { position, startDate, endDate } = entry;
  const dateRange = getFormattedDateRange(startDate, endDate);

  return (
    <MainWrapper
      backgroundColor={style.palette.background.default}
      color={style.palette.text.primary}
    >
      <TitleWrapper>
        <PositionTypography variant="h2">{position}</PositionTypography>
        <PositionTypography variant="body1">{dateRange}</PositionTypography>
      </TitleWrapper>
      <CircleWrapper>
        <Circle color={style.palette.primary.main} />
      </CircleWrapper>
    </MainWrapper>
  );
}

const MainWrapper = styled.div<{ backgroundColor: string; color: string }>`
  width: 100%;
  position: relative;
  background-color: ${p => p.backgroundColor};
  color: ${p => p.color};
  display: flex;
  flex-direction: row;
`;

const CircleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div<{ color: string }>`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${p => p.color};
  display: inline-block;
  margin: var(--margin-m);
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const PositionTypography = styled(Typography)`
  display: flex;
`;
