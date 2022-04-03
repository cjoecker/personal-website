import * as React from 'react';
import { useLayoutEffect, useState } from 'react';
import { languages } from '../../constants/languages';

import { Canvas } from './Canvas';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Paper, Typography } from '@mui/material';
import { useEffectUnsafe } from '../../unsafeHooks';
import Pen from './images/pen.svg';

export type LanguagesProps = {};
export const Languages = ({}: LanguagesProps) => {
  const images = require.context('./images', false);
  const [shuffledAnswerOrder, setShuffledAnswerOrder] = useState<number[]>(
    languages.map((l, index) => index)
  );
  const [selectedSentence, setSelectedSentence] = useState<number | undefined>(
    undefined
  );
  const [correctSentenceOrder, setCorrectSentenceOrder] = useState(
    new Set<number>()
  );
  const [onLanguageHover, setOnLanguageHover] = useState<number | undefined>(
    undefined
  );
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  useLayoutEffect(() => {
    setShuffledAnswerOrder(order =>
      order
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
  }, []);
  useEffectUnsafe(() => {
    setIsAnswerCorrect(
      onLanguageHover !== undefined &&
        shuffledAnswerOrder[onLanguageHover] === selectedSentence
    );
  }, [onLanguageHover]);
  const onLanguageUp = () => {
    if (selectedSentence !== undefined && isAnswerCorrect) {
      setCorrectSentenceOrder(correctSentences =>
        correctSentences.add(selectedSentence)
      );
    }
    setSelectedSentence(undefined);
    setOnLanguageHover(undefined);
    setIsAnswerCorrect(false);
  };

  return (
    <MainWrapper>
      <CanvasWrapper>
        <Canvas
          languagesNumber={languages.length}
          onLanguageDown={languagePosition => {
            setOnLanguageHover(languagePosition);
            setSelectedSentence(languagePosition);
          }}
          onLanguageUp={onLanguageUp}
          onLanguageHover={languagePosition => {
            setOnLanguageHover(languagePosition);
          }}
          isAnswerCorrect={isAnswerCorrect}
        />
      </CanvasWrapper>
      <InfosContainer>
        <SentencesWrapper>
          {languages.map(({ sentence }, index) => {
            return (
              <SentenceWrapper
                key={sentence}
                animate={{
                  scale: selectedSentence === index ? 1.2 : 1,
                  transition: { type: 'spring', stiffness: 600 },
                }}
              >
                <LanguagesText
                  variant={'body1'}
                  isCorrect={correctSentenceOrder.has(index)}
                >
                  {sentence}
                </LanguagesText>
              </SentenceWrapper>
            );
          })}
        </SentencesWrapper>

        <LanguagesContainer>
          {languages.map((l, index) => {
            const unshuffledPosition = shuffledAnswerOrder[index];
            const language = languages[unshuffledPosition].language;
            return (
              <motion.div
                animate={{
                  scale: onLanguageHover === index ? 1.3 : 1,
                  transition: { type: 'spring', stiffness: 600 },
                }}
                key={language}
              >
                <FlagImage
                  width={30}
                  height={30}
                  alt={`${language} language flag`}
                  src={images(`./${language}.svg`)}
                  isCorrect={correctSentenceOrder.has(unshuffledPosition)}
                />
              </motion.div>
            );
          })}
        </LanguagesContainer>
      </InfosContainer>
      <CenterImageContainer>
        <img height={65} width={130} alt={'pen drawing a line'} src={Pen} />
      </CenterImageContainer>
    </MainWrapper>
  );
};

const MainWrapper = styled(Paper)`
  width: 600px;
  height: 200px;
  position: relative;
`;
const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
`;
const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;
const SentencesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 10px;
`;
const SentenceWrapper = styled(motion.div)`
  flex: 1;
  margin-top: 10px;
`;
const LanguagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const LanguagesText = styled(Typography)<{
  isCorrect: boolean;
}>`
  flex: 1;
  opacity: ${p => (p.isCorrect ? '50%' : undefined)};
`;

const FlagImage = styled.img<{
  isCorrect: boolean;
}>`
  opacity: ${p => (p.isCorrect ? '50%' : undefined)};
  padding: 10px;
`;

const CenterImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  `;

