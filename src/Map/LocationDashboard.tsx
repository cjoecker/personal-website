import { Paper, Typography } from '@material-ui/core';
import React, {useEffect} from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { fetchWeather } from '../api';
import { LocationsType } from '../constants/locations';
import {weatherCodes} from "../constants/weatherCodes";

import LocationTemperature from './LocationTemperature';
import {getWeatherImagePath} from "./utils/locationUtils";

interface LocationSliderProps {
  location: LocationsType;
}

export default function LocationDashboard({ location }: LocationSliderProps) {
  const {
    data,
    isLoading,
    error,
  } = useQuery(`weatherFrom${location.city}`, () => fetchWeather(location));

  const weatherCode = data ? data.current.condition.code : undefined

  useEffect(() => {
    if(error){
      console.error(error)
    }
  }, [error]);


  return (
    <Paper>
      <FlexBox>
        <LocationWrapper>
          <LocationTypography variant="h2">{location.city}</LocationTypography>
          <LocationTypography variant="h3">
            {location.country}
          </LocationTypography>
        </LocationWrapper>
        <TemperatureWrapper>
          <LocationTemperature
            temperature={data ? data.current.temp_c : null}
            isLoading={isLoading}
          />
        </TemperatureWrapper>
        {!isLoading && data && (
          <WeatherWrapper>
            <WeatherImageContainer>
            <img
              alt={weatherCodes.get(weatherCode)}
              src={require(`${getWeatherImagePath(weatherCode,data.current.is_day)}`).default}
            />
            </WeatherImageContainer>
          </WeatherWrapper>
        )}
      </FlexBox>
    </Paper>
  );
}



const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 0;
`;
const LocationWrapper = styled.div`
  flex: 1 1 100%;
  margin: 10px 0 5px 10px;
`;

const LocationTypography = styled(Typography)``;

const TemperatureWrapper = styled.div`
  flex: 0 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


const WeatherWrapper = styled.div`
  flex: 0 0 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WeatherImageContainer = styled.div`
  margin: 10px 10px 10px 10px;
`;