import React, {useEffect, useState} from 'react';
import ReactMapGL, {FlyToInterpolator, Marker, TransitionInterpolator} from 'react-map-gl';
import {ViewportProps} from "react-map-gl/dist/es5/utils/map-state";
import styled from 'styled-components';

import {getLastLocation, locationUtils} from './utils/locationUtils';

import { Locations } from '../constants/locations';
import LocationSlider from './LocationSlider';
import {easeCubic, easeCubicInOut, easeQuad, easeQuadInOut, easeSinInOut} from "d3-ease";
import LocationDashboard from "./LocationDashboard";
import {useEffectUnsafe} from "../unsafeHooks";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()


//TODO move map access token to env
export default function LocationMap() {
  const [location, setLocation] = useState(Locations[0]);

  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: Locations[0].latitude,
    longitude: Locations[0].longitude,
    zoom: 15,
  });

  const [markerPos, setMarkerPos] = useState({
    latitude: Locations[0].latitude,
    longitude: Locations[0].longitude,
  });

  const handleYearChange = (year: number)=>{
    setLocation(getLastLocation(year,Locations))
  }

  useEffectUnsafe(() => {
    setViewport({
      ...viewport,
      latitude: location.latitude,
      longitude: location.longitude,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 2000,
      transitionEasing: easeSinInOut
    })
    setMarkerPos({
      latitude: location.latitude,
      longitude: location.longitude,
    })
  }, [location]);


  return (
      <QueryClientProvider client={queryClient}>
    <LocationBox>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v8"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(viewport: ViewportProps) => setViewport(viewport)}
      >
        <Marker
          latitude={markerPos.latitude}
          longitude={markerPos.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <span role={'img'} aria-label={"christian's head"}>
            👨🏼‍🦲
          </span>
        </Marker>
      </ReactMapGL>
      <StyledDiv position={'top'}>
        <Margins>
          <LocationSlider marks={locationUtils(Locations)} onChangeYear={handleYearChange} />
        </Margins>
      </StyledDiv>
      <StyledDiv position={'bottom'}>
        <Margins>
          <LocationDashboard location={location}/>
        </Margins>
      </StyledDiv>
    </LocationBox>
      </QueryClientProvider>
  );
}

const LocationBox = styled.div`
  max-width: 300px;
  height: 500px;
  position: relative;
`;

const StyledDiv = styled.div<{ position: 'top' | 'bottom' }>`
  position: absolute;
  ${p => (p.position === 'top' ? 'top:0' : 'bottom:0')};
  width: 100%;
  z-index: 5;
`;
const Margins = styled.div`
  margin: 5px;
`;
