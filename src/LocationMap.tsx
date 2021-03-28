import React from 'react';
import {Paper} from "@material-ui/core";
import styled from "styled-components";
import ReactMapGL, {Marker} from 'react-map-gl';

//TODO move map access token to env
export default function LocationMap() {

    const [viewport, setViewport] = React.useState({
        latitude: 4.687175,
        longitude: -74.048476,
        zoom: 15
    });

    return <LocationBox>    <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
    >
        <Marker latitude={4.690086} longitude={-74.047863} offsetLeft={-20} offsetTop={-10}>
            <div>You are here</div>
        </Marker>
    </ReactMapGL>
    </LocationBox>;
}

const LocationBox = styled(Paper)`
  max-width: 300px;
  height: 200px;
`