import { Paper } from '@mui/material';
import { Reorder } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { ownApps } from '../../constants/ownApps';

import { IconButton } from './components/IconButton';

export type AppsDashboardProps = {};
export const AppsMenu = ({}: AppsDashboardProps) => {
  const [items, setItems] = useState(() => ownApps.map(app => app.name));
  return (
    <ContainerWrapper >
      <MenuContainer axis="x" values={items} onReorder={setItems}>
        {items.map(item => (
          <IconButton key={item} item={item} />
        ))}
      </MenuContainer>
    </ContainerWrapper>
  );
};

const MenuContainer = styled(Reorder.Group)`
  padding: 10px;
  display: flex;
  list-style-type: none;
  margin: 0;
`;
const ContainerWrapper = styled(Paper)`
  flex: 1;
  justify-content: center;
  display: flex;
`;
