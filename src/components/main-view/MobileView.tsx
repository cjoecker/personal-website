import * as React from 'react';
import styled from 'styled-components';
import { Title } from '../title/Title';
import { locations } from '../../constants/locations';
import Locations from '../locations/Locations';
import { skills } from '../../constants/skills';
import { Skills } from '../skills/Skills';
import { OtherApps } from '../other-apps/OtherApps';
import { MobileContainer } from './components/MobileContainer';
import { Languages } from '../languages/Languages';

export type MobileViewProps = {};
export const MobileView = ({}: MobileViewProps) => {
  return (
    <MainContainer>
      <MobileContainer>
        <Title />
      </MobileContainer>
      <MobileContainer tileName={'Past locations'}>
        <Locations locationEntries={locations} />
      </MobileContainer>
      <MobileContainer tileName={'Skills'} >
        <Skills skills={skills} />
      </MobileContainer>
      <MobileContainer tileName={'Languages'}>
        <Languages />
      </MobileContainer>
      <MobileContainer tileName={'Own apps'}>
        <OtherApps />
      </MobileContainer>

    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;
