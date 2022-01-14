import * as React from 'react';
import { useState } from 'react';
import { Paper } from '@mui/material';
import { ownApps } from '../../constants/ownApps';
import { IconButton } from './components/IconButton';
import styled from 'styled-components';
import { Reorder } from 'framer-motion';

export type AppsDashboardProps = {};
export const AppsDashboard = ({}: AppsDashboardProps) => {
  const [items, setItems] = useState(() => ownApps.map(app => app.name));
  return (
    <ContainerWrapper >
      <DashboardContainer axis="x" values={items} onReorder={setItems}>
        {items.map(item => (
          <IconButton key={item} item={item} />
        ))}
      </DashboardContainer>
    </ContainerWrapper>
  );
};

const DashboardContainer = styled(Reorder.Group)`
  padding: 10px;
  display: flex;
  list-style-type: none;
  margin: 0;
`;
const ContainerWrapper = styled(Paper)`
  display: inline-block;
`;
