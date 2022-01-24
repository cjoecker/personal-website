import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import * as React from 'react';
import styled from 'styled-components';

export type TitleProps = {
  text: string;
  type: 'title' | 'subtitle';
};
export const TitleText = ({ text, type }: TitleProps) => {
  const variant = type === 'title' ? 'h1' : 'h2'
  return (
    <TitleWrapper
      variant={variant}
      color={type === 'title' ? undefined : 'primary'}
    >
      {text.split(' ').map((word, wordIdx) => (
        <WordWrapper
          variant={variant}
          isLastWord={wordIdx === text.split(' ').length}
          key={`${word}${wordIdx}`}
        >
          {word.split('').map((letter, index) => (
            <LetterSpan
              key={index}
              drag
              dragMomentum={false}
              whileHover={{
                rotate: index % 2 ? -3 : 3,
                scale: 1.5,
                transition: { type: 'spring', stiffness: 600 },
              }}
            >
              {letter}
            </LetterSpan>
          ))}
        </WordWrapper>
      ))}
    </TitleWrapper>
  );
};

const LetterSpan = styled(motion.span)`
  display: inline-block;
  cursor: grab;
`;

const WordWrapper = styled.div<{ isLastWord: boolean; variant: 'h1' | 'h2' }>`
  display: flex;
  margin-right: ${p => {
    if (p.isLastWord) {return undefined;}
    if (p.variant === 'h1') {return '10px';}
    else {return '7px';}
  }};
`;

const TitleWrapper = styled(Typography)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
