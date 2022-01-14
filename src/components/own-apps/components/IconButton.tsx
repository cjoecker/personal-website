import * as React from 'react';
import { ownApps } from '../../../constants/ownApps';
import { ButtonBase, Typography } from '@mui/material';
import styled from 'styled-components';
import { motion, Reorder } from 'framer-motion';

export type IconButtonProps = {
  item: string;
};
export const IconButton = ({ item }: IconButtonProps) => {
  const appInfo = ownApps.find(appInfo => appInfo.name === item);
  const images = require.context('../images', false);
  const imagePath = images(`./${appInfo?.icon}`);
  return (
    <ButtonWrapper
      id={item}
      value={item}
      whileDrag={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, opacity: 0.6 }}

    >
      <motion.div
        whileHover={{
          opacity:Array(5).fill(0.9),
          rotate: [0, -3, 0, 3, 0],
          transition: {
            duration: 0.5,
            times: [0, 0.25, 0.5, 0.75, 1],
            repeat: Number.POSITIVE_INFINITY,
          },
        }}
      >
        <Button disableTouchRipple background={imagePath} />
      </motion.div>

      <ButtonText variant={'caption'}>{appInfo?.name}</ButtonText>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled(Reorder.Item)`
  margin: 10px;
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
