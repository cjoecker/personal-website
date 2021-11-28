import { Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { TimelineEntryType } from '../../constants/timelineEntries';
import { getFormattedDateRange } from '../utils/timelineUtils';

interface EntryProps {
  entry: TimelineEntryType;
  isSameCompanyAsBefore: boolean;
  isLastEntry: boolean;
}

export function Entry({
  entry,
  isSameCompanyAsBefore,
  isLastEntry,
}: EntryProps) {
  const style = useTheme();

  const { position, startDate, endDate, company } = entry;
  const dateRange = getFormattedDateRange(startDate, endDate);
  const images = require.context('../images', false);

  return (
    <MainWrapper
      backgroundColor={style.palette.background.default}
      color={style.palette.text.primary}
    >
      <InfoWrapper>
        <TitleWrapper>
          <PositionTypography variant="h3">{position}</PositionTypography>
          <PositionTypography variant="body1">{dateRange}</PositionTypography>
        </TitleWrapper>
        <CircleWrapper>
          <CircleSpacing />
          <Circle
            color={style.palette.primary.main}
            isSameCompanyAsBefore={isSameCompanyAsBefore}
          />
          <CircleSpacing>
            {!isLastEntry && (
              <ConnectionLine color={style.palette.primary.main} />
            )}
          </CircleSpacing>
        </CircleWrapper>
        <LogoWrapper>
          {isSameCompanyAsBefore && (
            <Logo
              alt={`${company} logo`}
              src={images(`./${company}.svg`).default}
            />
          )}
        </LogoWrapper>
      </InfoWrapper>
      {!isLastEntry && (
        <LineEndingWrapper>
          <TitleWrapper />
          <CircleWrapper>
            <ConnectionLine color={style.palette.primary.main} />
          </CircleWrapper>
          <LogoWrapper />
        </LineEndingWrapper>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div<{ backgroundColor: string; color: string }>`
  width: 100%;
  position: relative;
  background-color: ${p => p.backgroundColor};
  color: ${p => p.color};
  display: flex;
  flex-direction: column;
  height: 100px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const LineEndingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const CircleWrapper = styled.div`
  min-width: 45px;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 0;
`;

const Circle = styled.div<{ color: string; isSameCompanyAsBefore: boolean }>`
  height: ${p => (p.isSameCompanyAsBefore ? '25px' : '15px')};
  width: ${p => (p.isSameCompanyAsBefore ? '25px' : '15px')};
  border-radius: 50%;
  background-color: ${p => p.color};
  display: inline-block;
  margin: var(--margin-s) 0;
`;

const CircleSpacing = styled.div`
  flex: 1;
`;

const ConnectionLine = styled.div<{ color: string }>`
  width: 3px;
  height: 100%;
  background-color: ${p => p.color};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;
const PositionTypography = styled(Typography)`
  display: flex;
  text-align: right;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0.6;
`;

const Logo = styled.img`
  max-width: 120px;
  height: 60px;
  object-fit: contain;
`;
