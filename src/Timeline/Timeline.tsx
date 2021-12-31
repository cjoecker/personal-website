import { useTheme } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { TimelineEntryType } from '../constants/timeline';
import { Entry } from './components/Entry';
import stringHash from 'string-hash';

interface TimelineProps {
  timelineEntries: TimelineEntryType[];
}

export function Timeline({ timelineEntries }: TimelineProps) {
  const style = useTheme();

  return (
    <MainWrapper backgroundColor={style.palette.background.default}>
      {timelineEntries.map((entry, index) => (
        <Entry
          key={stringHash(JSON.stringify(entry))}
          isSameCompanyAsBefore={
            timelineEntries[index - 1]?.company !== entry.company
          }
          isLastEntry={index === timelineEntries.length - 1}
          entry={entry}
        />
      ))}
    </MainWrapper>
  );
}

const MainWrapper = styled.div<{ backgroundColor: string }>`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${p => p.backgroundColor};
`;
