import { motion } from 'framer-motion';
import * as React from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

export type TitleProps = {
  text: string;
  type: 'title' | 'subtitle';
};
export const TitleText = ({ text, type }: TitleProps) => {
  return (
    <Typography variant={type === 'title' ? 'h1' : 'h2'} color={type === 'title' ? undefined : 'primary'}>
      {text.split('').map((letter, index) => (
        <LetterSpan
          key={index}
          whileHover={{
            rotate: index % 2 ? -3 : 3,
            scale: 1.5,
            transition: { type: 'spring', stiffness: 600 },
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </LetterSpan>
      ))}
    </Typography>
  );
};

const LetterSpan = styled(motion.span)`
  display: inline-block;
`;
