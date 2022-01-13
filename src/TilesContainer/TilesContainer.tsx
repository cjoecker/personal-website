import * as React from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { motion, useDragControls } from 'framer-motion';
import { postion } from '../App';

export type TilesContainerProps = {
  children: JSX.Element;
  tileName?: string;
  position: postion | undefined;
};

export const TilesContainer = forwardRef<HTMLDivElement, TilesContainerProps>(
  ({ children, tileName, position }: TilesContainerProps, ref) => {
    const dragControls = useDragControls();
    const onStartDrag = (event: any) => {
      dragControls.start(event, { snapToCursor: false });
    };
    return (
      <MainContainer
        style={{ x: position?.x, y: position?.y }}
        ref={ref}
        drag
        dragMomentum={false}
        dragListener={!tileName}
        dragControls={dragControls}
      >
        {tileName && (
          <TileName variant="h3" onPointerDown={onStartDrag}>
            {tileName}
          </TileName>
        )}
        <ChildrenContainer isDraggable={!tileName}>
          {children}
        </ChildrenContainer>
      </MainContainer>
    );
  }
);

const MainContainer = styled(motion.div)`
  max-width: 500px;
  position: absolute;
  user-select: none;
`;
const ChildrenContainer = styled.div<{ isDraggable: boolean }>`
  position: relative;
  cursor: ${p => (p.isDraggable ? 'grab' : 'undefined')};
`;
const TileName = styled(Typography)`
  display: block;
  text-align: left;
  cursor: grab;
  position: relative;
  user-select: none;
`;
