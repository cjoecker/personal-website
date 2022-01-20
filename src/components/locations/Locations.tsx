import { easeSinInOut } from 'd3-ease';
import React, { useState } from 'react';
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import { ViewportProps } from 'react-map-gl/dist/es5/utils/map-state';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';

import { LocationsType } from '../../constants/locations';
import { useEffectUnsafe } from '../../unsafeHooks';

import Footer from './components/Footer';
import Header from './components/Header';
import { getLastLocation, locationUtils } from './utils/locationUtils';
import { useWindowSize } from '../../hooks/useWindowSize';

const queryClient = new QueryClient();

interface locationEntriesProps {
  locationEntries: LocationsType[];
}

//TODO move map access token to env
export default function Locations({locationEntries}:locationEntriesProps) {
  const lastLocation = locationEntries[0]
  const [location, setLocation] = useState(lastLocation);
  const {isMobile} = useWindowSize();
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: lastLocation.latitude,
    longitude: lastLocation.longitude,
    zoom: 15,
  });

  const [markerPos, setMarkerPos] = useState({
    latitude: lastLocation.latitude,
    longitude: lastLocation.longitude,
  });

  const handleYearChange = (year: number) => {
    setLocation(getLastLocation(year, locationEntries));
  };

  useEffectUnsafe(() => {
    setViewport({
      ...viewport,
      latitude: location.latitude,
      longitude: location.longitude,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 2000,
      transitionEasing: easeSinInOut,
    });
    setMarkerPos({
      latitude: location.latitude,
      longitude: location.longitude,
    });
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <LocationBox isMobile={isMobile}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/cjoecker/ckmpee9hy024v17o553pu11hv"
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
            <Header
              marks={locationUtils(locationEntries)}
              onChangeYear={handleYearChange}
            />
          </Margins>
        </StyledDiv>
        <StyledDiv position={'bottom'}>
          <Margins>
            <Footer location={location} />
          </Margins>
        </StyledDiv>
      </LocationBox>
    </QueryClientProvider>
  );
}

const LocationBox = styled.div<{isMobile: boolean}>`
  flex: 1;
  width: ${(p) => p.isMobile ? "500px" : "300px"};
  height: ${(p) => p.isMobile ? "350px" : "500px"};
  position: relative;
`;

const StyledDiv = styled.div<{ position: 'top' | 'bottom' }>`
  position: absolute;
  ${p => (p.position === 'top' ? 'top:0' : 'bottom:0')};
  width: 100%;
  z-index: 5;
`;
const Margins = styled.div`
  margin: var(--margin-s);
`;
