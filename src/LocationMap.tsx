import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import styled from "styled-components";

import {getLocationMarks} from "./getLocationMarks";
import {Locations} from "./locations";
import LocationSlider from "./LocationSlider";

const marks = [
    {
        value: 1991,
        label: "'91"
    },
    {
        value: 1997,
        label: "'97"
    },
    {
        value: 2001,
        label: "'01"
    },
    {
        value: 2011,
        label: "'11"
    },
    {
        value: 2014,
        label: "'14"
    },
    {
        value: 2019,
        label: "'19"
    },
    {
        value: 2021,
        label: "'21"
    }]

//TODO move map access token to env
export default function LocationMap() {

    const [viewport, setViewport] = React.useState({
        latitude: 4.687175,
        longitude: -74.048476,
        zoom: 15
    });

    return <LocationBox>
        <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/dark-v8"
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            <Marker latitude={4.690086} longitude={-74.047863} offsetLeft={-20} offsetTop={-10}>
                <div>You are here</div>
            </Marker>
        </ReactMapGL>
        <StyledDiv position={"top"}>
            <Margins>
                <LocationSlider marks={getLocationMarks(Locations)}/>
            </Margins>
        </StyledDiv>
        <StyledDiv position={"bottom"}>
            <Margins>
                <LocationSlider marks={marks}/>
            </Margins>
        </StyledDiv>
    </LocationBox>;
}

const LocationBox = styled.div`
  max-width: 300px;
  height: 500px;
  background-color: red;
  position: relative;
`

const StyledDiv = styled.div<{ position: "top" | "bottom" }>`
  position: absolute;
  ${p => (p.position === "top" ? 'top:0' : 'bottom:0')};
  width: 100%;
  z-index: 5;
`
const Margins = styled.div`
  margin: 5px;
`

