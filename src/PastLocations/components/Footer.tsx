import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { fetchWeather } from '../../api';
import { LocationsType } from '../../constants/locations';
import { weatherCodes } from '../../constants/weatherCodes';
import { getWeatherImagePath } from '../utils/locationUtils';

import Temperature from './Temperature';


interface FooterProps {
  location: LocationsType;
}

export default function Footer({ location }: FooterProps) {
  const { data, isLoading } = useQuery(['weather', location.city], () =>
    fetchWeather(location)
  );

  const [imgUrl, setImgUrl] = useState('');
  const weatherCode = data?.current?.condition?.code;
  const images = require.context('../images', false);

  useEffect(() => {
    if (images && weatherCode) {
      setImgUrl(
        images(`./${getWeatherImagePath(weatherCode, data.current.is_day)}`).default
      );
    }
  }, [data, weatherCode,images]);

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
          <Temperature
            temperature={data ? data.current.temp_c : null}
            isLoading={isLoading}
          />
        </TemperatureWrapper>
        {!isLoading && data && (
          <WeatherWrapper>
            <WeatherImageContainer>
              <img alt={weatherCodes.get(weatherCode)} src={imgUrl} />
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
  margin: var(--margin-m) 0 var(--margin-s) var(--margin-m);
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
  margin: var(--margin-m);
`;
