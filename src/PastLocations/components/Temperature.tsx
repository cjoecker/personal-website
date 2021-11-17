import {CircularProgress, Typography} from "@mui/material";
import React from 'react';
import styled from 'styled-components';

interface LocationSliderProps {
  temperature: number | null;
  isLoading: boolean;
}

export default function Temperature({ temperature, isLoading }: LocationSliderProps) {
    if(isLoading || !temperature){
        return (<CircularProgress />)
    }
    return (
    <TemperatureWrapper>
      <NumberTypography variant="body1">
        {temperature}
      </NumberTypography>
      <UnitTypography variant="body1">
        {'°C'}
      </UnitTypography>
    </TemperatureWrapper>
  );
}

const TemperatureWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const NumberTypography = styled(Typography)`
  &.MuiTypography-root {
    font-size: 36px;
    line-height: 1;
  }
`;
const UnitTypography = styled(Typography)`
  &.MuiTypography-root {
    margin-left: 2px;
    margin-top: 0px;
  }
`;

