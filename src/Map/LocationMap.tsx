import React, {useState} from 'react';
import ReactMapGL, {FlyToInterpolator, Marker, TransitionInterpolator} from 'react-map-gl';
import {ViewportProps} from "react-map-gl/dist/es5/utils/map-state";
import styled from 'styled-components';

import {getLastLocation, getLocationMarks} from '../getLocationMarks';

import { Locations } from './locations';
import LocationSlider from './LocationSlider';
import {easeCubic, easeCubicInOut, easeQuad, easeQuadInOut, easeSinInOut} from "d3-ease";




//TODO move map access token to env
export default function LocationMap() {
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
    const coordinates = getLastLocation(year,Locations)
    if(coordinates){
      setViewport({
        ...viewport,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeSinInOut
      })
      setMarkerPos({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      })

    }
  }

  return (
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
          <LocationSlider marks={getLocationMarks(Locations)} onChangeYear={handleYearChange} />
        </Margins>
      </StyledDiv>
      <StyledDiv position={'bottom'}>
        <Margins>
          {/*<LocationSlider marks={marks} />*/}
        </Margins>
      </StyledDiv>
    </LocationBox>
  );
}

const LocationBox = styled.div`
  max-width: 300px;
  height: 500px;
  background-color: red;
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
