import * as React from 'react';
import { useRef, useState } from 'react';
import { DraggabableContainer } from './components/DraggabableContainer';
import { Title } from '../title/Title';
import Locations from '../locations/Locations';
import { locations } from '../../constants/locations';
import { Skills } from '../skills/Skills';
import { skills } from '../../constants/skills';
import { AppsMenu } from '../apps-menu/AppsMenu';
import { ZIndexProvider } from './components/ZIndexProvider';
import { postion } from '../../App';
import styled from 'styled-components';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useEffectUnsafe } from '../../unsafeHooks';

interface startPositions {
  title: postion;
  locations: postion;
  skills: postion;
  ownApps: postion;
}
export type HorizontalViewProps = {

};
export const HorizontalView = ({}: HorizontalViewProps) => {
  const [positions, setPositions] = useState<undefined | startPositions>(
    undefined
  );
  const titleRef = useRef<HTMLDivElement>(null);
  const locationsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const ownAppsRef = useRef<HTMLDivElement>(null);
  const {browserWidth, browserHeight} = useWindowSize();

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
  }, [browserWidth, browserHeight]);
  return (
    <ZIndexProvider>
      <DragContainer>
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
  );
};


const DragContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
