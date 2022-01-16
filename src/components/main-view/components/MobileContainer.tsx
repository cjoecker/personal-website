import { Typography } from '@mui/material';
import * as React from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';

export type TilesContainerProps = {
  children: JSX.Element;
  tileName?: string;
};

export const MobileContainer = forwardRef<HTMLDivElement, TilesContainerProps>(
  ({ children, tileName }: TilesContainerProps, ref) => {
    return (
      <MainContainer>
        {tileName && (
          <TileNameWrapper>
            <TileName variant="h3">
              {tileName}
            </TileName>
          </TileNameWrapper>
        )}
        <ChildrenContainer>{children}</ChildrenContainer>
      </MainContainer>
    );
  }
);

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
`;
const ChildrenContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const TileName = styled(Typography)``;
const TileNameWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
