import React, { useRef, useState } from 'react';
import './App.css';

import styled, { createGlobalStyle } from 'styled-components';
import Locations from './Locations/Locations';
import { locations } from './constants/locations';
import muiTheme from './muiTheme';
import { ThemeProvider } from '@mui/material';
import { TilesContainer } from './TilesContainer/TilesContainer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ocean from './videos/ocean.mp4';
import { Title } from './Title/Title';
import { useEffectUnsafe } from './unsafeHooks';
import { Skills } from './Skills/Skills';
import { skills } from './constants/skills';

export interface postion {
  x: number;
  y: number;
}

interface startPositions {
  title: postion;
  locations: postion;
  skills: postion;
}

function App() {
  const [positions, setPositions] = useState<undefined | startPositions>(
    undefined
  );
  const titleRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffectUnsafe(() => {
    const width = window.innerWidth;
    console.info(titleRef.current?.offsetWidth)
    console.info(skillsRef.current?.offsetWidth)
    setPositions({
      title: {
        x: width *0.5 - (titleRef.current?.offsetWidth ?? 0) / 2,
        y: 30,
      },
      locations: {
        x: 30,
        y: 40,
      },
      skills: {
        x: width  - (skillsRef.current?.offsetWidth ?? 0) - 30,
        y: (titleRef.current?.offsetHeight ?? 0) + 40,
      },
    });
  }, [skillsRef.current,titleRef.current, locationsRef.current]);

  return (
    <div className="App">
      {/*<Video className='videoTag' autoPlay loop muted>*/}
      {/*  <source src={ocean} type='video/mp4' />*/}
      {/*</Video>*/}
      <ThemeProvider theme={muiTheme}>
        <GlobalStyle color={muiTheme.palette.text.primary} />
        <TilesContainer position={positions?.title} ref={titleRef}>
          <Title />
        </TilesContainer>
        <TilesContainer
          position={positions?.locations}
          tileName={'Past Locations'}
          ref={locationsRef}
        >
          <Locations locationEntries={locations} />
        </TilesContainer>
        <TilesContainer
          position={positions?.skills}
          tileName={'Skills'}
          ref={skillsRef}
        >
          <Skills skills={skills} />
        </TilesContainer>
      </ThemeProvider>
    </div>
  );
}

export default App;

export const GlobalStyle = createGlobalStyle<{ color?: string }>`
  body {
    --margin-s: 5px;
    --margin-m: 10px;
    --margin-l: 20px;
    background-color: black;
    color: ${p => p.color ?? 'white'};
  }
`;

const Video = styled.video`
  z-index: 0;
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`;
