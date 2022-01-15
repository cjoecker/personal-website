import { ThemeProvider } from '@mui/material';
import React, { useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { AppsMenu } from './components/apps-menu/AppsMenu';
import { DraggabableContainer } from './components/draggable-container/DraggabableContainer';
import Locations from './components/locations/Locations';
import { ZIndexProvider } from './components/main-views/components/ZIndexProvider';
import { Skills } from './components/skills/Skills';
import { Title } from './components/title/Title';
import { locations } from './constants/locations';
import { skills } from './constants/skills';
import { useWindowSize } from './hooks/useWindowSize';
import muiTheme from './muiTheme';
import { useEffectUnsafe } from './unsafeHooks';

export interface postion {
  x: number;
  y: number;
}

interface startPositions {
  title: postion;
  locations: postion;
  skills: postion;
  ownApps: postion;
}

function App() {
  const [positions, setPositions] = useState<undefined | startPositions>(
    undefined
  );
  const titleRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const ownAppsRef = useRef<HTMLDivElement>(null);
  const [viewWidth, viewHeight] = useWindowSize();

  useEffectUnsafe(() => {
    const width = window.innerWidth;

    setPositions({
      title: {
        x: width * 0.5 - (titleRef.current?.offsetWidth ?? 0) / 2,
        y: 30,
      },
      locations: {
        x: 30,
        y: 40,
      },
      skills: {
        x: width - (skillsRef.current?.offsetWidth ?? 0) - 30,
        y: (titleRef.current?.offsetHeight ?? 0) + 40,
      },
      ownApps: {
        x: width / 2 - (ownAppsRef.current?.offsetWidth ?? 0),
        y: (titleRef.current?.offsetHeight ?? 0) + 70,
      },
    });
  }, [viewWidth, viewHeight]);

  return (
    <ThemeProvider theme={muiTheme}>
      <ZIndexProvider>
        <DragContainer>
          <GlobalStyle color={muiTheme.palette.text.primary} />
          <DraggabableContainer position={positions?.title} ref={titleRef}>
            <Title />
          </DraggabableContainer>
          <DraggabableContainer
            position={positions?.locations}
            tileName={'Past locations'}
            ref={locationsRef}
          >
            <Locations locationEntries={locations} />
          </DraggabableContainer>
          <DraggabableContainer
            position={positions?.skills}
            tileName={'Skills'}
            ref={skillsRef}
          >
            <Skills skills={skills} />
          </DraggabableContainer>
          <DraggabableContainer
            position={positions?.ownApps}
            tileName={'Own apps'}
            ref={ownAppsRef}
          >
            <AppsMenu />
          </DraggabableContainer>
        </DragContainer>
      </ZIndexProvider>
    </ThemeProvider>
  );
}

export default App;

export const GlobalStyle = createGlobalStyle<{ color?: string }>`
  html{
    height: 100%;
    background-color: #161616;
  }
 
  body {
    --margin-s: 5px;
    --margin-m: 10px;
    --margin-l: 20px;
    color: ${p => p.color ?? 'white'};
    background: linear-gradient(0deg,#2b2e34,#161616);
    text-align: center;
    min-height: 100%;
    overflow:auto;
    margin: 0;
    padding: 0;
  }
`;

const DragContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
