import React from 'react'
import {Paper, Slider, Typography} from "@material-ui/core";
import styled from "styled-components";


function valuetext(value: number) {
    return `Year ${value}`;
}

interface LocationSliderProps {
    marks: YearMarks[]
}

interface YearMarks {
    value: number,
    label: string
}

export default function LocationSlider({marks}: LocationSliderProps) {
    return (
        <Paper>
            <TitleWrapper>
                <StyledTypography variant="h3">
                    Year
                </StyledTypography>
            </TitleWrapper>
            <SliderWrapper>
            <Slider
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
    )
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
`

const SliderWrapper = styled.div`
  padding: 0px 20px 5px;
`

