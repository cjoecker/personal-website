import { ButtonBase, Typography } from '@mui/material';
import { motion, Reorder } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { ownApps } from '../../../constants/ownApps';

export type IconButtonProps = {
  item: string;
};
export const IconButton = ({ item }: IconButtonProps) => {
  const appInfo = ownApps.find(appInfo => appInfo.name === item);
  const images = require.context('../images', false);
  const imagePath = images(`./${appInfo?.icon}`);
  const [isDragging, setIsDragging] = useState(false);
  const onClick = () => {
    if (!isDragging) {
      window.open(appInfo?.link, '_blank');
    }
  };
  return (
    <ButtonWrapper
      id={item}
      value={item}
      whileDrag={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, opacity: 0.6 }}
      onDragStart={() => setIsDragging(true)}
      onMouseDown={() => setIsDragging(false)}
    >
        <div>
        <motion.div
          whileHover={{
            opacity: Array(5).fill(0.9),
            rotate: [0, -3, 0, 3, 0],
            transition: {
              duration: 0.5,
              times: [0, 0.25, 0.5, 0.75, 1],
              repeat: Number.POSITIVE_INFINITY,
            },
          }}
        >
          <Button disableTouchRipple background={imagePath} onClick={onClick} />
        </motion.div>
      <ButtonText variant={'caption'}>{appInfo?.name}</ButtonText>
        </div>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled(Reorder.Item)`
  margin: 10px 10px 0 10px;
`;

const Button = styled(ButtonBase)<{ background: string }>`
  width: 60px;
  height: 60px;
  background-image: url('${p => p.background}');
  border-radius: 10px;
  margin-bottom: 6px;
`;

const ButtonText = styled(Typography)`
  max-width: 60px;
  display: block;
  text-align: center;
  line-height: 1.2;
`;
