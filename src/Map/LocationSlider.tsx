import {Mark, Paper, Slider, Typography} from '@material-ui/core';
import { getYear } from 'date-fns';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useEffectUnsafe} from "../unsafeHooks";

function valuetext(value: number) {
  return `Year ${value}`;
}

interface LocationSliderProps {
  marks: Mark[];
  onChangeYear: (year:number) => void;
}

export default function LocationSlider({
  marks,
  onChangeYear,
}: LocationSliderProps) {
  const [year, setYear] = useState<number | number[]>(getYear(new Date()) - 5);

  const handleChange = (event: any, newValue: number | number[]) => {
    setYear(newValue);
  };

  useEffectUnsafe(() => {
    const debounceTimer = setTimeout(() => {
        if(!Array.isArray(year)){
          onChangeYear(year);
        }
    }, 100);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [year]);
//TODO add slider min max automatically
  return (
    <Paper>
      <TitleWrapper>
        <StyledTypography variant="h3">Year</StyledTypography>
      </TitleWrapper>
      <SliderWrapper>
        <Slider
          value={year}
          onChange={handleChange}
          defaultValue={2021}
          min={1991}
          max={2021}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </SliderWrapper>
    </Paper>
  );
}
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 0 0px;
`;

const StyledTypography = styled(Typography)`
  padding-top: 15px;
`;

const SliderWrapper = styled.div`
  padding: 0px 20px 5px;
`;
